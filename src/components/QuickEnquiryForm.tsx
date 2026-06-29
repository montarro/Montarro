import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check, Loader2 } from "lucide-react";

/*
 * Quick homepage enquiry form (RockMelon-style). A short, single-screen capture
 * for visitors who have finished reading the homepage — NOT the multi-step
 * /contact application and with NO appointment booking. It posts straight into
 * the same GoHighLevel workflow as every other Montarro lead form.
 */

const LEAD_WEBHOOK_URL = import.meta.env.VITE_MONTARRO_LEAD_WEBHOOK_URL?.trim();
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

  function update<K extends keyof QuickFormState>(key: K, value: string) {
    setForm((p) => ({ ...p, [key]: value }));
    if (errors[key]) setErrors((p) => ({ ...p, [key]: undefined }));
  }

  function validate(): QuickFormErrors {
    const e: QuickFormErrors = {};
    if (!form.fullName.trim()) e.fullName = "Required.";
    if (!form.businessName.trim()) e.businessName = "Required.";
    if (!form.phone.trim()) e.phone = "Required.";
    if (!form.email.trim()) e.email = "Required.";
    else if (!EMAIL_RE.test(form.email.trim())) e.email = "Enter a valid email.";
    if (!form.industry.trim()) e.industry = "Required.";
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
      if (!LEAD_WEBHOOK_URL) {
        throw new Error("VITE_MONTARRO_LEAD_WEBHOOK_URL is not configured");
      }
      const { first, last } = splitName(form.fullName);
      const payload = {
        full_name: form.fullName,
        first_name: first,
        last_name: last,
        email: form.email,
        phone: form.phone,
        company_name: form.businessName,
        industry: form.industry,
        goals_notes: form.notes,
        operational_bottleneck: form.notes,
        source: "Montarro Website",
        form_type: "Homepage Quick Enquiry",
      };
      const res = await fetch(LEAD_WEBHOOK_URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Lead webhook responded ${res.status}`);
      setSubmitted(true);
    } catch (err) {
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
      className={`relative mx-auto w-full max-w-xl ${className}`}
    >
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
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-foreground/80">
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
              <Field id="fullName" label="Full Name" value={form.fullName} onChange={(v) => update("fullName", v)} error={errors.fullName} autoComplete="name" />
              <Field id="businessName" label="Business Name" value={form.businessName} onChange={(v) => update("businessName", v)} error={errors.businessName} autoComplete="organization" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
              <Field id="phone" label="Phone" type="tel" value={form.phone} onChange={(v) => update("phone", v)} error={errors.phone} autoComplete="tel" inputMode="tel" />
              <Field id="email" label="Email" type="email" value={form.email} onChange={(v) => update("email", v)} error={errors.email} autoComplete="email" inputMode="email" />
            </div>
            <Field id="industry" label="Business / Industry" value={form.industry} onChange={(v) => update("industry", v)} error={errors.industry} />
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
              className="group inline-flex h-[58px] w-full items-center justify-center gap-2 rounded-2xl bg-[#0a0b0b] px-7 text-[14px] font-semibold text-white shadow-[0_12px_30px_-12px_rgba(0,0,0,0.5)] transition-all duration-300 ease-out hover:-translate-y-[2px] hover:bg-black hover:shadow-[0_20px_44px_-14px_rgba(0,0,0,0.55)] disabled:opacity-70 disabled:hover:translate-y-0"
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

            <p className="pt-1 text-center text-[13px] leading-relaxed text-foreground/70">
              We'll review your business and contact you within one business day.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
  inputMode,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
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
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder={label}
        aria-label={label}
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
