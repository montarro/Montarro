// Hands the just-submitted lead's name/email/phone to /book without ever
// putting personal data in a URL (browser history, referrer headers, and
// analytics all log page URLs). Written on successful lead submission, read
// once by /book to prefill the booking calendar, then cleared immediately.
const STORAGE_KEY = "montarro_booking_prefill";

export type BookingPrefill = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export function writeBookingPrefill(data: BookingPrefill) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // sessionStorage can throw in private-browsing/locked-down contexts —
    // booking prefill is a nicety, never worth failing the lead submission over.
  }
}

export function readAndClearBookingPrefill(): BookingPrefill | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as BookingPrefill;
  } catch {
    return null;
  }
}
