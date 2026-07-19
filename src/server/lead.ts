/**
 * Server-only lead handler for POST /api/lead (wired in src/server.ts).
 *
 * Never imported by any client-rendered route/component — this is the one
 * place GHL_PIT is read, and it must stay that way. Reads process.env
 * (Node runtime), not import.meta.env, so Vite never inlines it into the
 * browser bundle.
 */
import {
  REVENUE_OPTIONS,
  ENQUIRY_OPTIONS,
  BLOCKER_OPTIONS,
  GOAL_OPTIONS,
  normalizePackageValue,
} from "@/lib/leadFormOptions";
import { normalizeAuPhone } from "@/lib/phone";

const GHL_LOCATION_ID = "axHpl4eNmUrDfQxnhf4v";
const GHL_UPSERT_URL = "https://services.leadconnectorhq.com/contacts/upsert";
const GHL_API_VERSION = "2021-07-28";

const GHL_FIELD = {
  revenue: "IBCKtDKdboF7uIdgRR54",
  enquiries: "dYWmx6TJNoVGujrW5lc9",
  blockers: "i6Ilam65d2PFa90E2A6j",
  goals: "omERHbL67D39QCQELhe2",
  notes: "NWM64LTzEagaGujaRUbU",
  selectedPackage: "WTz8uuCzzwg4zFDBPJ1p",
} as const;

type LeadPayload = {
  // "quick" = the short homepage enquiry form (contact details + free text
  // only); anything else = the full /contact strategy-call form with the
  // four qualification enums. The server decides what's required from this,
  // never from which fields happen to be present.
  formType?: unknown;
  fullName?: unknown;
  businessName?: unknown;
  email?: unknown;
  phone?: unknown;
  revenue?: unknown;
  enquiries?: unknown;
  blockers?: unknown;
  goals?: unknown;
  industry?: unknown; // quick form only
  notes?: unknown;
  selectedPackage?: unknown;
  hpRefCode?: unknown; // honeypot
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ---------------------------------------------------------------------------
// Basic in-memory rate limiting. Best-effort only: state lives per warm
// serverless instance, not shared across concurrent/cold instances. That's a
// real limitation for a high-traffic endpoint, but it stops the obvious case
// (one client hammering the endpoint) without provisioning external infra
// that wasn't asked for. Swap for a durable store (Upstash/Redis) if this
// endpoint needs a stronger guarantee.
// ---------------------------------------------------------------------------
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const rateLimitBuckets = new Map<string, { count: number; windowStart: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  // Opportunistic cleanup so the map doesn't grow unbounded on a long-lived instance.
  if (rateLimitBuckets.size > 5000) {
    for (const [key, bucket] of rateLimitBuckets) {
      if (now - bucket.windowStart > RATE_LIMIT_WINDOW_MS) rateLimitBuckets.delete(key);
    }
  }
  const bucket = rateLimitBuckets.get(ip);
  if (!bucket || now - bucket.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitBuckets.set(ip, { count: 1, windowStart: now });
    return false;
  }
  bucket.count += 1;
  return bucket.count > RATE_LIMIT_MAX;
}

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

function splitFullName(full: string): { firstName: string; lastName: string } {
  const trimmed = full.trim().replace(/\s+/g, " ");
  const spaceIndex = trimmed.indexOf(" ");
  if (spaceIndex === -1) return { firstName: trimmed, lastName: "" };
  return { firstName: trimmed.slice(0, spaceIndex), lastName: trimmed.slice(spaceIndex + 1) };
}

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

/**
 * Per-field validation errors, keyed by the client form's field names so the
 * UI can render them inline on the exact field — never as a generic
 * "something went wrong" (that message is reserved for genuine
 * server/upstream failures).
 */
export type FieldErrors = Record<string, string>;

type ValidationResult =
  | { ok: true; value: {
      isQuick: boolean;
      fullName: string;
      businessName: string;
      email: string;
      phone: string;
      revenue: string;
      enquiries: string;
      blockers: string[];
      goals: string;
      industry: string;
      notes: string;
      selectedPackage: ReturnType<typeof normalizePackageValue>;
    } }
  | { ok: false; fields: FieldErrors };

// Server never trusts the client: required fields, formats and every enum
// value are re-checked here against the same shared constants/normaliser the
// UI is built from, independent of what the UI actually sent.
export function validate(body: LeadPayload): ValidationResult {
  const fields: FieldErrors = {};
  const isQuick = body.formType === "quick";

  const fullName = isNonEmptyString(body.fullName) ? body.fullName.trim() : "";
  if (!fullName) fields.fullName = "Enter your full name.";
  else if (fullName.length < 2) fields.fullName = "Name must be at least 2 characters.";

  // Required on the strategy-call form; optional on the quick homepage form.
  const businessName = isNonEmptyString(body.businessName) ? body.businessName.trim() : "";
  if (!isQuick && !businessName) fields.businessName = "Enter your business name.";

  const email = isNonEmptyString(body.email) ? body.email.trim() : "";
  if (!email) fields.email = "Enter your email.";
  else if (!EMAIL_RE.test(email)) fields.email = "Enter a valid email address.";

  const phoneRaw = isNonEmptyString(body.phone) ? body.phone.trim() : "";
  const phone = phoneRaw ? normalizeAuPhone(phoneRaw) : null;
  if (!phoneRaw) fields.phone = "Enter your phone number.";
  else if (!phone) fields.phone = "Enter a valid Australian phone number.";

  // Qualification enums exist only on the strategy-call form.
  const revenue = isNonEmptyString(body.revenue) ? body.revenue : "";
  const enquiries = isNonEmptyString(body.enquiries) ? body.enquiries : "";
  const blockersRaw = Array.isArray(body.blockers) ? body.blockers : [];
  const blockers = blockersRaw.filter((b): b is string => typeof b === "string");
  const goals = isNonEmptyString(body.goals) ? body.goals : "";
  if (!isQuick) {
    if (!(REVENUE_OPTIONS as readonly string[]).includes(revenue)) fields.revenue = "Please choose an option.";
    if (!(ENQUIRY_OPTIONS as readonly string[]).includes(enquiries)) fields.enquiries = "Please choose an option.";
    if (blockers.length === 0 || blockers.some((b) => !(BLOCKER_OPTIONS as readonly string[]).includes(b))) {
      fields.blockers = "Please choose an option.";
    }
    if (!(GOAL_OPTIONS as readonly string[]).includes(goals)) fields.goals = "Please choose an option.";
  }

  const industry = typeof body.industry === "string" ? body.industry.trim() : "";
  const notes = typeof body.notes === "string" ? body.notes.trim() : "";

  // selected_package explicitly defaults rather than rejects, per spec.
  const selectedPackage = normalizePackageValue(body.selectedPackage);

  if (Object.keys(fields).length > 0) return { ok: false, fields };

  return {
    ok: true,
    value: { isQuick, fullName, businessName, email, phone: phone!, revenue, enquiries, blockers, goals, industry, notes, selectedPackage },
  };
}

function jsonResponse(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

export async function handleLeadRequest(request: Request): Promise<Response> {
  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    console.warn(`[lead-api] rate limited: ip=${ip}`);
    return jsonResponse(429, { ok: false, error: "rate_limited" });
  }

  let body: LeadPayload;
  try {
    body = await request.json();
  } catch {
    return jsonResponse(400, { ok: false, error: "invalid_json" });
  }

  // Honeypot: bots that fill every field get a generic success without
  // anything actually being written, so they don't learn to avoid it.
  if (isNonEmptyString(body.hpRefCode)) {
    console.warn(`[lead-api] honeypot triggered, dropping silently: ip=${ip}`);
    return jsonResponse(200, { ok: true });
  }

  const result = validate(body);
  if (!result.ok) {
    // User-input problem, not a server failure: 400 with per-field messages
    // the client renders inline. Raw payload still logged for recovery.
    console.warn(`[lead-api] validation failed: ip=${ip}`, result.fields, "raw payload:", JSON.stringify(body));
    return jsonResponse(400, { ok: false, error: "validation", fields: result.fields });
  }

  const { isQuick, fullName, businessName, email, phone, revenue, enquiries, blockers, goals, industry, notes, selectedPackage } =
    result.value;
  const { firstName, lastName } = splitFullName(fullName);

  const ghlPit = process.env.GHL_PIT;
  if (!ghlPit) {
    // Fail loudly server-side; never expose this detail to the client.
    console.error("[lead-api] GHL_PIT is not configured — cannot deliver lead. Raw payload:", JSON.stringify(body));
    return jsonResponse(502, { ok: false, error: "upstream_not_configured" });
  }

  // The quick form has no dedicated GHL field for "industry", so it's folded
  // into the notes custom field rather than dropped or mapped to a guessed id.
  const quickNotes = [industry ? `Industry: ${industry}` : "", notes].filter(Boolean).join("\n\n");

  const ghlBody = {
    locationId: GHL_LOCATION_ID,
    firstName,
    lastName,
    email,
    phone,
    ...(businessName ? { companyName: businessName } : {}),
    source: "Montarro Website",
    tags: ["source: website", "lifecycle: lead"],
    customFields: isQuick
      ? [
          { id: GHL_FIELD.notes, field_value: quickNotes },
          { id: GHL_FIELD.selectedPackage, field_value: selectedPackage },
        ]
      : [
          { id: GHL_FIELD.revenue, field_value: revenue },
          { id: GHL_FIELD.enquiries, field_value: enquiries },
          { id: GHL_FIELD.blockers, field_value: blockers },
          { id: GHL_FIELD.goals, field_value: goals },
          { id: GHL_FIELD.notes, field_value: notes },
          { id: GHL_FIELD.selectedPackage, field_value: selectedPackage },
        ],
  };

  let ghlRes: Response;
  try {
    ghlRes = await fetch(GHL_UPSERT_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ghlPit}`,
        Version: GHL_API_VERSION,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ghlBody),
    });
  } catch (err) {
    console.error(
      "[lead-api] GHL request threw:",
      err,
      "raw payload:",
      JSON.stringify(body),
    );
    return jsonResponse(502, { ok: false, error: "upstream_unreachable" });
  }

  if (!ghlRes.ok) {
    const responseText = await ghlRes.text().catch(() => "<unreadable response body>");
    console.error(
      `[lead-api] GHL upstream error: status=${ghlRes.status} body=${responseText}`,
      "raw inbound payload:",
      JSON.stringify(body),
    );
    return jsonResponse(502, { ok: false, error: "upstream" });
  }

  return jsonResponse(200, { ok: true });
}
