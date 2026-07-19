import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { primaryCta } from "@/lib/cta";
import { normalizeAuPhone } from "@/lib/phone";

/*
 * Quick homepage enquiry form (RockMelon-style). A short, single-screen capture
 * for visitors who have finished reading the homepage — NOT the multi-step
 * /contact application and with NO appointment booking. It posts to the same
 * same-origin /api/lead route as the strategy-call form (formType "quick"),
 * which upserts straight into GoHighLevel server-side.
 *
 * Required: Full Name, Email, Phone. Optional: Business Name, Industry, notes.
 * Validation shows inline per field on blur and on submit (never mid-keystroke)
 * — the global error message is reserved for genuine server/API failures.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function splitName(full: string): { first: string; last: string } {
  const parts = full.trim().split(/\s+/).filter(Boolean);
  if (parts.length <= 1) return { first: parts[0] ?? "", last: "" };
  return { first: parts[0], last: parts.slice(1).join(" ") };
}

type QuickFormState = {
  fullName: string;
  businessName: string;
  phone: string;
  email: string;
  industry: string;
  notes: string;
};

type QuickFormErrors = Partial<Record<keyof QuickFormState, string>>;

// Only these three are required; validated per-field so blur and submit share
// the exact same rules. Format errors never show mid-keystroke.
function validateField(key: keyof QuickFormState, form: QuickFormState): string | undefined {
  switch (key) {
    case "fullName": {
      const v = form.fullName.trim();
      if (!v) return "Enter your full name.";
      if (v.length < 2) return "Name must be at least 2 characters.";
      return undefined;
    }
    case "email": {
      const v = form.email.trim();
      if (!v) return "Enter your email.";
      if (!EMAIL_RE.test(v)) return "Enter a valid email address.";
      return undefined;
    }
    case "phone": {
      const v = form.phone.trim();
      if (!v) return "Enter your phone number.";
      if (!normalizeAuPhone(v)) return "Enter a valid Australian phone number.";
      return undefined;
    }
    default:
      return undefined;
  }
}

const REQUIRED_KEYS = ["fullName", "email", "phone"] as const;

export function QuickEnquiryForm({ className = "" }: { className?: string }) {
  const [form, setForm] = useState<QuickFormState>({
    fullName: "",
    businessName: "",
    phone: "",
    email: "",
    industry: "",
    notes: "",
  });
  const [errors, setErrors] = useState<QuickFormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  // Honeypot — hidden from real visitors; a non-empty value tells the server
  // to silently drop the submission as a bot.
  const [hpField, setHpField] = useState("");

  function update<K extends keyof QuickFormState>(key: K, value: string) {
    setForm((p) => ({ ...p, [key]: value }));
    // Clearing (never setting) an error while typing keeps feedback calm.
    if (errors[key]) setErrors((p) => ({ ...p, [key]: undefined }));
  }

  function handleBlur(key: keyof QuickFormState) {
    setErrors((p) => ({ ...p, [key]: validateField(key, form) }));
  }

  function validate(): QuickFormErrors {
    const e: QuickFormErrors = {};
    for (const key of REQUIRED_KEYS) {
      const msg = validateField(key, form);
      if (msg) e[key] = msg;
    }
    return e;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting || submitted) return;
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length) return;
    setSubmitting(true);
    setSubmitError(false);
    try {
      const payload = {
        formType: "quick",
        fullName: form.fullName,
        businessName: form.businessName,
        email: form.email,
        phone: form.phone, // sent as typed — the server normalises to E.164
        industry: form.industry,
        notes: form.notes,
        hpRefCode: hpField,
      };
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data: { ok?: boolean; error?: string; fields?: Record<string, string> } = await res
        .json()
        .catch(() => ({}));
      if (res.ok && data.ok) {
        setSubmitted(true);
        return;
      }
      if (res.status === 400 && data.error === "validation" && data.fields) {
        // Server-side re-validation caught something the client missed —
        // surface it inline on the field, keep the form filled in, and do
        // NOT show the generic failure message.
        setErrors((p) => ({ ...p, ...(data.fields as QuickFormErrors) }));
        return;
      }
      throw new Error(`Lead API responded ${res.status}`);
    } catch (err) {
      // Genuine server/API failure only (network, 5xx, rate limit).
      console.error("[Montarro] Quick enquiry submission failed:", err);
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={`relative w-full ${className}`}
    >
      <div className="rounded-2xl border border-black/[0.06] bg-white p-8 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.18)] sm:p-10">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center py-6 text-center"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/30 bg-white shadow-[0_8px_24px_-12px_rgba(0,0,0,0.2)]">
                <Check className="h-6 w-6 text-emerald-600" strokeWidth={2.2} />
              </div>
              <h3 className="mt-7 font-display text-3xl font-bold leading-tight tracking-[-0.03em] text-[#0a0b0b]">
                Thanks, {splitName(form.fullName).first || "there"}.
              </h3>
              <p className="mt-4 max-w-sm text-[15px] font-medium leading-relaxed text-foreground">
                We'll review your business and contact you within one business day.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              noValidate
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
              transition={{ duration: 0.35 }}
              className="space-y-4 sm:space-y-5"
            >
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                <Field id="fullName" label="Full Name" required value={form.fullName} onChange={(v) => update("fullName", v)} onBlur={() => handleBlur("fullName")} error={errors.fullName} autoComplete="name" />
                <Field id="businessName" label="Business Name" value={form.businessName} onChange={(v) => update("businessName", v)} error={errors.businessName} autoComplete="organization" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                <Field id="phone" label="Phone" required type="tel" value={form.phone} onChange={(v) => update("phone", v)} onBlur={() => handleBlur("phone")} error={errors.phone} autoComplete="tel" inputMode="tel" />
                <Field id="email" label="Email" required type="email" value={form.email} onChange={(v) => update("email", v)} onBlur={() => handleBlur("email")} error={errors.email} autoComplete="email" inputMode="email" />
              </div>
              <Field id="industry" label="Business / Industry" value={form.industry} onChange={(v) => update("industry", v)} error={errors.industry} />
              {/* honeypot — visually unpaintable and unreachable by keyboard */}
              <div
                aria-hidden="true"
                className="absolute h-px w-px overflow-hidden whitespace-nowrap border-0 p-0"
                style={{ clip: "rect(0,0,0,0)", clipPath: "inset(50%)", margin: "-1px" }}
              >
                <label htmlFor="quick-hp-ref">Reference code</label>
                <input
                  id="quick-hp-ref"
                  name="quick-hp-ref"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={hpField}
                  onChange={(e) => setHpField(e.target.value)}
                />
              </div>
              <textarea
                id="notes"
                name="notes"
                aria-label="Tell us about your business"
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
                rows={4}
                placeholder="Tell us about your business…"
                className="w-full resize-none rounded-2xl border border-black/[0.08] bg-white px-5 py-4 text-[15px] leading-relaxed text-foreground placeholder:text-foreground/45 shadow-[0_2px_12px_-6px_rgba(0,0,0,0.12)] transition-all duration-300 focus:border-emerald-500/50 focus:shadow-[0_8px_24px_-8px_rgba(16,185,129,0.22)] focus:outline-none"
              />

              {submitError && (
                <p role="alert" className="rounded-2xl border border-red-500/20 bg-red-500/[0.06] px-4 py-3 text-[13px] leading-relaxed text-red-600">
                  Something went wrong sending your enquiry. Please try again — or
                  email us at montarromedia@outlook.com.
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className={`${primaryCta} flex h-[58px] w-full items-center justify-center px-7 text-[14px] disabled:opacity-70 disabled:hover:translate-y-0`}
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending
                  </>
                ) : (
                  <>
                    Book My Strategy Call
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  required = false,
  type = "text",
  autoComplete,
  inputMode,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  error?: string;
  required?: boolean;
  type?: string;
  autoComplete?: string;
  inputMode?: "text" | "tel" | "email" | "numeric" | "search" | "url" | "none" | "decimal";
}) {
  return (
    <div>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder={required ? `${label} *` : label}
        aria-label={label}
        aria-required={required || undefined}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`h-[58px] w-full rounded-2xl border bg-white px-5 text-[15px] text-foreground caret-emerald-500 selection:bg-emerald-500/20 placeholder:text-foreground/45 shadow-[0_2px_12px_-6px_rgba(0,0,0,0.12)] transition-all duration-300 focus:outline-none ${
          error
            ? "border-red-400/60"
            : "border-black/[0.08] focus:border-emerald-500/50 focus:shadow-[0_8px_24px_-8px_rgba(16,185,129,0.22)]"
        }`}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 pl-1 text-[11px] text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
