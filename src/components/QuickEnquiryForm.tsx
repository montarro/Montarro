import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Check, Loader2 } from "lucide-react";

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
      <div className="relative rounded-3xl border border-black/[0.07] bg-white px-6 py-8 shadow-[0_1px_0_0_rgba(255,255,255,0.9)_inset,0_24px_60px_-40px_rgba(0,0,0,0.18)] sm:px-9 sm:py-10">

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center py-8 text-center"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/[0.08]">
                <Check className="h-6 w-6 text-emerald-600" strokeWidth={2.2} />
              </div>
              <p className="mt-7 text-[11px] uppercase tracking-[0.32em] text-emerald-600/80">
                Enquiry Received
              </p>
              <h3 className="mt-3 font-display text-3xl leading-tight tracking-[-0.03em] text-foreground">
                Thanks, {splitName(form.fullName).first || "there"}.
              </h3>
              <p className="mt-4 max-w-sm text-[14.5px] leading-relaxed text-muted-foreground">
                We'll review your business, map the right infrastructure and
                contact you within one business day.
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
            >
              <div className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
                <Field id="fullName" label="Full Name" value={form.fullName} onChange={(v) => update("fullName", v)} error={errors.fullName} autoComplete="name" />
                <Field id="businessName" label="Business Name" value={form.businessName} onChange={(v) => update("businessName", v)} error={errors.businessName} autoComplete="organization" />
                <Field id="phone" label="Mobile Number" type="tel" value={form.phone} onChange={(v) => update("phone", v)} error={errors.phone} autoComplete="tel" inputMode="tel" />
                <Field id="email" label="Email" type="email" value={form.email} onChange={(v) => update("email", v)} error={errors.email} autoComplete="email" inputMode="email" />
                <div className="sm:col-span-2">
                  <Field id="industry" label="Business / Industry" value={form.industry} onChange={(v) => update("industry", v)} error={errors.industry} />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="notes" className="block text-[10.5px] uppercase tracking-[0.28em] text-muted-foreground/80">
                    Tell us about your business
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={form.notes}
                    onChange={(e) => update("notes", e.target.value)}
                    rows={4}
                    placeholder="What you do, where you're at, and what you'd like to improve…"
                    className="mt-3 w-full resize-none rounded-2xl border border-black/[0.10] bg-black/[0.015] p-4 text-[15px] leading-relaxed text-foreground placeholder:text-muted-foreground/50 transition-colors duration-500 hover:border-black/20 focus:border-emerald-500/40 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              {submitError && (
                <p role="alert" className="mt-6 rounded-xl border border-red-500/20 bg-red-500/[0.06] px-4 py-3 text-[13px] leading-relaxed text-red-600">
                  Something went wrong sending your enquiry. Please try again — or
                  email us at montarromedia@outlook.com.
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="group relative mt-9 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-b from-emerald-500 to-emerald-600 px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.18em] text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18),0_18px_44px_-18px_rgba(5,150,105,0.7)] transition-all duration-300 ease-out hover:-translate-y-[1px] hover:from-emerald-400 hover:to-emerald-500 hover:shadow-[0_26px_56px_-18px_rgba(5,150,105,0.8)] disabled:opacity-70 disabled:hover:translate-y-0"
              >
                <span aria-hidden className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending
                  </>
                ) : (
                  <>
                    Request My Strategy Call
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </>
                )}
              </button>

              <p className="mx-auto mt-5 max-w-md text-center text-[13px] leading-relaxed text-muted-foreground">
                <span className="font-semibold text-foreground">We'll review your business</span>, map the right infrastructure and
                contact you within one business day.
              </p>
              <p className="mt-2 text-center text-[12px] text-muted-foreground/70">
                No obligation. No spam. Just a tailored growth strategy.
              </p>
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
    <div className="group relative">
      <label
        htmlFor={id}
        className="block text-[10.5px] uppercase tracking-[0.28em] text-muted-foreground/80 transition-colors duration-300 group-focus-within:text-emerald-600/90"
      >
        {label}
      </label>
      <div className="relative mt-2.5">
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          inputMode={inputMode}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`peer block w-full border-0 border-b bg-transparent px-0 py-3 text-[15px] text-foreground caret-emerald-500 selection:bg-emerald-500/20 placeholder:text-muted-foreground/50 transition-colors duration-500 focus:outline-none focus:ring-0 ${
            error ? "border-destructive/60" : "border-black/[0.12] focus:border-emerald-500/70"
          }`}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/80 to-emerald-500/0 transition-transform duration-700 ease-out peer-focus:scale-x-100"
        />
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-2 text-[11px] text-muted-foreground">
          {error}
        </p>
      )}
    </div>
  );
}
