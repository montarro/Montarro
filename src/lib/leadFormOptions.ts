/**
 * Single source of truth for the /contact lead-qualification form's option
 * strings and package allow-list. Imported by BOTH the form UI
 * (src/routes/contact.tsx) and the server-side lead handler
 * (src/server/lead.ts) so the browser can never submit a value the CRM
 * custom-field enum will silently reject.
 *
 * These strings are matched byte-for-byte against GoHighLevel custom-field
 * options. Do not retype them:
 *   - Revenue bands use an EN DASH "–" (U+2013), not a hyphen "-".
 *   - The "holding back" options use CURLY apostrophes "'" (U+2019) in
 *     "aren’t" / "don’t", not a straight apostrophe.
 * A mismatch does not throw — the CRM field just saves empty.
 */

export const REVENUE_OPTIONS = [
  "Under $30,000",
  "$30,000 – $60,000",
  "$60,000 – $150,000",
  "Over $150,000",
] as const;

export const ENQUIRY_OPTIONS = ["Under 20", "20-50", "50-100", "Over 100"] as const;

export const BLOCKER_OPTIONS = [
  "Not enough qualified enquiries",
  "Too many missed calls",
  "Leads aren’t converting into customers",
  "Too much manual admin",
  "Our systems don’t work together",
  "Not sure yet",
] as const;

export const GOAL_OPTIONS = [
  "More qualified enquiries",
  "Fewer missed calls and lost opportunities",
  "More booked jobs without chasing people",
  "Better systems and automation",
] as const;

export const PACKAGE_VALUES = [
  "ai-receptionist",
  "revenue-infrastructure",
  "enterprise",
  "general-enquiry",
] as const;

export const PACKAGE_LABELS: Record<(typeof PACKAGE_VALUES)[number], string> = {
  "ai-receptionist": "AI Receptionist",
  "revenue-infrastructure": "Revenue Infrastructure",
  enterprise: "Enterprise",
  "general-enquiry": "General Enquiry",
};

export type PackageValue = (typeof PACKAGE_VALUES)[number];

export function isPackageValue(value: unknown): value is PackageValue {
  return typeof value === "string" && (PACKAGE_VALUES as readonly string[]).includes(value);
}

export function normalizePackageValue(value: unknown): PackageValue {
  return isPackageValue(value) ? value : "general-enquiry";
}
