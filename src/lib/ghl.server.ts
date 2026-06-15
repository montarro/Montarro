import process from "node:process";
import { randomUUID } from "node:crypto";

// Server-only GoHighLevel forwarder. The .server.ts suffix keeps this file out
// of the client bundle — no endpoint URLs, location ids, or future keys ever
// reach the browser. Read env INSIDE the function so it resolves per-request.

/** Shape mirrors the existing Montarro contact form state. */
export type LeadInput = {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  stage: string;
  goal: string; // interested service
  budget: string; // budget / monthly revenue
  notes: string; // operational bottleneck + goals / current growth limitations
};

/** Diagnostic result returned to the caller (and logged) so the exact GHL
 *  response can be inspected — values are never logged, only field keys. */
export type GhlForwardResult =
  | { ok: true; endpoint: string; status: number; sentKeys: string[] }
  | {
      ok: false;
      endpoint: string | null;
      status: number | null;
      body: string;
      sentKeys: string[];
      reason: string;
    };

// The GHL form provided as the backend target/reference.
const GHL_FORM_ID = "TycKFwq8GrSYOxNlQGaE";
const DEFAULT_FORM_SUBMIT_URL = "https://backend.leadconnectorhq.com/forms/submit";

function splitName(full: string): { first: string; last: string } {
  const parts = full.trim().split(/\s+/).filter(Boolean);
  if (parts.length <= 1) return { first: parts[0] ?? "", last: "" };
  return { first: parts[0], last: parts.slice(1).join(" ") };
}

/**
 * Forward a Montarro lead into GoHighLevel.
 *
 * Server-configured paths (no secrets in frontend), in priority order:
 *   1. GHL_LOCATION_ID  — PRIMARY. POST to the GHL widget form-submit endpoint
 *                         for form TycKFwq8GrSYOxNlQGaE so its own
 *                         "Form submitted" workflow trigger fires.
 *   2. GHL_WEBHOOK_URL  — FALLBACK. POST JSON to a GHL Inbound Webhook trigger.
 *
 * Always returns a GhlForwardResult and logs the endpoint, payload KEYS, and
 * the exact GHL status + response body on failure (visible in Vercel function
 * logs and returned to the caller). Field VALUES are never logged.
 */
export async function forwardLeadToGhl(lead: LeadInput): Promise<GhlForwardResult> {
  const webhookUrl = process.env.GHL_WEBHOOK_URL?.trim();
  const locationId = process.env.GHL_LOCATION_ID?.trim();
  const formSubmitUrl =
    process.env.GHL_FORM_SUBMIT_URL?.trim() || DEFAULT_FORM_SUBMIT_URL;

  const { first, last } = splitName(lead.fullName);

  // Canonical field mapping shared by both transports.
  const mapped: Record<string, string> = {
    first_name: first,
    last_name: last,
    full_name: lead.fullName,
    name: lead.fullName,
    email: lead.email,
    phone: lead.phone,
    company_name: lead.company,
    budget_monthly_revenue: lead.budget,
    interested_service: lead.goal,
    operational_bottleneck: lead.notes,
    goals_notes: lead.notes,
    industry: lead.industry,
    stage: lead.stage,
    source: "Montarro Website — Consultation Form",
    form_id: GHL_FORM_ID,
  };

  // 1) Widget form-submit endpoint (PRIMARY) — fires the form's own trigger.
  if (locationId) {
    // Only fields confirmed to exist on the GHL form. Custom fields (budget,
    // interested_service, industry, stage, operational_bottleneck) are
    // intentionally omitted for now, until their exact GHL field IDs are
    // confirmed — sending unknown keys is what makes the submit fail.
    const formFields: Record<string, string> = {
      first_name: first,
      last_name: last,
      full_name: lead.fullName,
      email: lead.email,
      phone: lead.phone,
      company_name: lead.company,
      goals_notes: lead.notes,
    };
    const fd = new FormData();
    fd.set("formId", GHL_FORM_ID);
    fd.set("locationId", locationId);
    for (const [key, value] of Object.entries(formFields)) {
      fd.set(key, value ?? "");
    }
    fd.set(
      "eventData",
      JSON.stringify({
        source: "",
        page: { url: "https://www.montarro.com/contact", title: "Apply to Work With Montarro" },
        timestamp: Date.now(),
        type: "page-visit",
        domain: "montarro.com",
        version: "v2",
        medium: "form",
        mediaId: GHL_FORM_ID,
      }),
    );
    fd.set("sessionId", randomUUID());

    const sentKeys = Array.from(fd.keys());
    console.log("[GHL] submit →", { endpoint: formSubmitUrl, sentKeys });

    let res: Response;
    try {
      res = await fetch(formSubmitUrl, { method: "POST", body: fd });
    } catch (e) {
      const reason = e instanceof Error ? e.message : String(e);
      console.error("[GHL] submit fetch threw", { endpoint: formSubmitUrl, reason });
      return { ok: false, endpoint: formSubmitUrl, status: null, body: "", sentKeys, reason };
    }
    const body = await res.text().catch(() => "");
    if (!res.ok) {
      console.error("[GHL] submit FAILED", {
        endpoint: formSubmitUrl,
        status: res.status,
        sentKeys,
        body: body.slice(0, 1500),
      });
      return {
        ok: false,
        endpoint: formSubmitUrl,
        status: res.status,
        body: body.slice(0, 2000),
        sentKeys,
        reason: "non_2xx",
      };
    }
    console.log("[GHL] submit OK", { endpoint: formSubmitUrl, status: res.status });
    return { ok: true, endpoint: formSubmitUrl, status: res.status, sentKeys };
  }

  // 2) Inbound Webhook (FALLBACK).
  if (webhookUrl) {
    const sentKeys = Object.keys(mapped);
    console.log("[GHL] webhook →", { endpoint: webhookUrl, sentKeys });
    let res: Response;
    try {
      res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(mapped),
      });
    } catch (e) {
      const reason = e instanceof Error ? e.message : String(e);
      console.error("[GHL] webhook fetch threw", { reason });
      return { ok: false, endpoint: webhookUrl, status: null, body: "", sentKeys, reason };
    }
    const body = await res.text().catch(() => "");
    if (!res.ok) {
      console.error("[GHL] webhook FAILED", { status: res.status, body: body.slice(0, 1500) });
      return {
        ok: false,
        endpoint: webhookUrl,
        status: res.status,
        body: body.slice(0, 2000),
        sentKeys,
        reason: "non_2xx",
      };
    }
    console.log("[GHL] webhook OK", { status: res.status });
    return { ok: true, endpoint: webhookUrl, status: res.status, sentKeys };
  }

  // Neither configured.
  console.error("[GHL] not configured: set GHL_LOCATION_ID or GHL_WEBHOOK_URL");
  return {
    ok: false,
    endpoint: null,
    status: null,
    body: "",
    sentKeys: Object.keys(mapped),
    reason: "not_configured",
  };
}
