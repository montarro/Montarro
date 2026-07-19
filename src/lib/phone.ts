import { parsePhoneNumberFromString } from "libphonenumber-js";

/**
 * Normalise any reasonable Australian phone format to E.164 (+61412345678).
 * Returns null when the input can't be resolved to a valid AU number —
 * callers treat that as a per-field validation error, never a server error.
 *
 * Shared by the form UIs (instant client-side feedback) and the /api/lead
 * server route (authoritative re-validation before the GoHighLevel upsert),
 * so both sides always agree on what "valid" means.
 *
 * Accepted, all → +61412345678:
 *   0412 345 678 · 0412345678 · 04 1234 5678 · +61 412 345 678
 *   +61412345678 · 61412345678 · 412345678
 * Landlines too: (03) 9123 4567 → +61391234567
 */
export function normalizeAuPhone(raw: string): string | null {
  const cleaned = raw.replace(/[\s().\-]/g, "");
  if (!cleaned) return null;
  // Country code typed without "+" (61412345678) — libphonenumber would
  // otherwise read this as an 11-digit national number and reject it.
  const candidate = /^61\d{9}$/.test(cleaned) ? `+${cleaned}` : cleaned;
  const parsed = parsePhoneNumberFromString(candidate, "AU");
  if (!parsed || !parsed.isValid() || parsed.countryCallingCode !== "61") return null;
  return parsed.number;
}
