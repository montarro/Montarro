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
  fullName?: unknown;
  businessName?: unknown;
  email?: unknown;
  phone?: unknown;
  revenue?: unknown;
  enquiries?: unknown;
  blockers?: unknown;
  goals?: unknown;
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

/** Normalises AU numbers to E.164 (0412 345 678 -> +61412345678). Returns null if it can't. */
function normalizeAuPhone(raw: string): string | null {
  const digits = raw.trim();
  const hasPlus = digits.startsWith("+");
  const stripped = digits.replace(/[^\d]/g, "");
  if (hasPlus && stripped.startsWith("61") && stripped.length === 11) {
    return `+${stripped}`;
  }
  if (stripped.startsWith("61") && stripped.length === 11) {
    return `+${stripped}`;
  }
  if (stripped.startsWith("0") && stripped.length === 10) {
    return `+61${stripped.slice(1)}`;
  }
  if (stripped.length === 9) {
    return `+61${stripped}`;
  }
  return null;
}

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

type ValidationResult =
  | { ok: true; value: {
      fullName: string;
      businessName: string;
      email: string;
      phone: string;
      revenue: string;
      enquiries: string;
      blockers: string[];
      goals: string;
      notes: string;
      selectedPackage: ReturnType<typeof normalizePackageValue>;
    } }
  | { ok: false; details: string[] };

// Server never trusts the client: every enum value is re-checked against the
// same shared constants the UI is built from, independent of what the UI
// actually sent.
function validate(body: LeadPayload): ValidationResult {
  const details: string[] = [];

  const fullName = isNonEmptyString(body.fullName) ? body.fullName.trim() : "";
  if (!fullName) details.push("fullName is required");

  const businessName = isNonEmptyString(body.businessName) ? body.businessName.trim() : "";
  if (!businessName) details.push("businessName is required");

  const email = isNonEmptyString(body.email) ? body.email.trim() : "";
  if (!email) details.push("email is required");
  else if (!EMAIL_RE.test(email)) details.push("email is invalid");

  const phoneRaw = isNonEmptyString(body.phone) ? body.phone.trim() : "";
  const phone = phoneRaw ? normalizeAuPhone(phoneRaw) : null;
  if (!phoneRaw) details.push("phone is required");
  else if (!phone) details.push("phone could not be normalised to E.164");

  const revenue = isNonEmptyString(body.revenue) ? body.revenue : "";
  if (!(REVENUE_OPTIONS as readonly string[]).includes(revenue)) details.push("revenue is not a recognised option");

  const enquiries = isNonEmptyString(body.enquiries) ? body.enquiries : "";
  if (!(ENQUIRY_OPTIONS as readonly string[]).includes(enquiries)) details.push("enquiries is not a recognised option");

  const blockersRaw = Array.isArray(body.blockers) ? body.blockers : [];
  const blockers = blockersRaw.filter((b): b is string => typeof b === "string");
  if (blockers.length === 0) details.push("blockers requires at least one selection");
  else if (blockers.some((b) => !(BLOCKER_OPTIONS as readonly string[]).includes(b))) {
    details.push("blockers contains an unrecognised option");
  }

  const goals = isNonEmptyString(body.goals) ? body.goals : "";
  if (!(GOAL_OPTIONS as readonly string[]).includes(goals)) details.push("goals is not a recognised option");

  const notes = typeof body.notes === "string" ? body.notes.trim() : "";

  // selected_package explicitly defaults rather than rejects, per spec.
  const selectedPackage = normalizePackageValue(body.selectedPackage);

  if (details.length > 0) return { ok: false, details };

  return {
    ok: true,
    value: { fullName, businessName, email, phone: phone!, revenue, enquiries, blockers, goals, notes, selectedPackage },
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
    console.warn(`[lead-api] validation failed: ip=${ip}`, result.details, "raw payload:", JSON.stringify(body));
    return jsonResponse(400, { ok: false, error: "validation", details: result.details });
  }

  const { fullName, businessName, email, phone, revenue, enquiries, blockers, goals, notes, selectedPackage } =
    result.value;
  const { firstName, lastName } = splitFullName(fullName);

  const ghlPit = process.env.GHL_PIT;
  if (!ghlPit) {
    // Fail loudly server-side; never expose this detail to the client.
    console.error("[lead-api] GHL_PIT is not configured — cannot deliver lead. Raw payload:", JSON.stringify(body));
    return jsonResponse(502, { ok: false, error: "upstream_not_configured" });
  }

  const ghlBody = {
    locationId: GHL_LOCATION_ID,
    firstName,
    lastName,
    email,
    phone,
    companyName: businessName,
    source: "Montarro Website",
    tags: ["source: website", "lifecycle: lead"],
    customFields: [
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
