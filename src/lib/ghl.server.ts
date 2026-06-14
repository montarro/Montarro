import process from "node:process";

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
  notes: string; // operational bottleneck + goals
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
 * Forward a Montarro lead into GoHighLevel so it triggers the Montarro
 * Consultation Form / Lead Management workflow.
 *
 * Two server-configured paths (no secrets in frontend):
 *   1. GHL_WEBHOOK_URL  — POST JSON to a GHL Inbound Webhook trigger.
 *                         Recommended: reliable, keeps every field by name.
 *   2. GHL_LOCATION_ID  — POST to the GHL widget form-submit endpoint for
 *                         form TycKFwq8GrSYOxNlQGaE, so the form's own
 *                         "Form submitted" workflow fires.
 * Override the submit endpoint with GHL_FORM_SUBMIT_URL if needed.
 */
export async function forwardLeadToGhl(lead: LeadInput): Promise<void> {
  const webhookUrl = process.env.GHL_WEBHOOK_URL?.trim();
  const locationId = process.env.GHL_LOCATION_ID?.trim();
  const formSubmitUrl =
    process.env.GHL_FORM_SUBMIT_URL?.trim() || DEFAULT_FORM_SUBMIT_URL;

  const { first, last } = splitName(lead.fullName);

  // Canonical field mapping shared by both transports.
  const mapped = {
    first_name: first,
    last_name: last,
    full_name: lead.fullName,
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

  // 1) Inbound Webhook (recommended).
  if (webhookUrl) {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(mapped),
    });
    if (!res.ok) {
      throw new Error(`GoHighLevel webhook responded ${res.status}`);
    }
    return;
  }

  // 2) Widget form-submit endpoint (fires the form's own workflow).
  if (locationId) {
    const fd = new FormData();
    fd.set("formId", GHL_FORM_ID);
    fd.set("locationId", locationId);
    for (const [key, value] of Object.entries(mapped)) {
      fd.set(key, value ?? "");
    }
    // Bundle everything into a single note too, so no answer is lost even if
    // the GHL form's custom-field keys differ from the mapping above.
    fd.set(
      "message",
      [
        `Company: ${lead.company}`,
        `Budget / Monthly revenue: ${lead.budget}`,
        `Interested service: ${lead.goal}`,
        `Industry: ${lead.industry}`,
        `Stage: ${lead.stage}`,
        `Operational bottleneck / goals: ${lead.notes}`,
      ].join("\n"),
    );
    fd.set(
      "eventData",
      JSON.stringify({ source: "montarro-website", type: "page", formId: GHL_FORM_ID }),
    );

    const res = await fetch(formSubmitUrl, { method: "POST", body: fd });
    if (!res.ok) {
      throw new Error(`GoHighLevel form submit responded ${res.status}`);
    }
    return;
  }

  // Neither configured: fail loudly server-side so the UI shows its error state.
  throw new Error(
    "GoHighLevel is not configured. Set GHL_WEBHOOK_URL (recommended) or GHL_LOCATION_ID.",
  );
}
