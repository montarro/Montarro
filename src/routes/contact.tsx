import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  CalendarCheck,
  Check,
  CheckCircle2,
  Database,
  Loader2,
  PhoneCall,
} from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Book a Strategy Call — Montarro" },
      {
        name: "description",
        content:
          "Book a strategy call with Montarro. Tell us where your business is at and we'll show you the clearest revenue-infrastructure path forward.",
      },
      { property: "og:title", content: "Book a Strategy Call — Montarro" },
      {
        property: "og:description",
        content:
          "A tailored strategy session for service businesses ready to stop missing leads and run one connected system.",
      },
    ],
  }),
  component: ContactPage,
});

const MINT_GRID =
  "linear-gradient(to right, rgba(6,78,59,0.09) 1px, transparent 1px), linear-gradient(to bottom, rgba(6,78,59,0.09) 1px, transparent 1px)";

const LEAD_WEBHOOK_URL = import.meta.env.VITE_MONTARRO_LEAD_WEBHOOK_URL?.trim();
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const QUESTIONS: { key: keyof FormState; q: string; options: string[] }[] = [
  {
    key: "revenue",
    q: "What's your average monthly revenue?",
    options: ["Under $30k", "$30k to $60k", "$60k to $150k", "$150k+"],
  },
  {
    key: "headcount",
    q: "How many people work in the business, including you?",
    options: ["Just me", "2 to 4", "5 to 10", "10+"],
  },
  {
    key: "platforms",
    q: "What social platforms are you currently using?",
    options: ["Facebook", "Instagram", "TikTok", "Google", "LinkedIn", "Not active yet"],
  },
  {
    key: "goals",
    q: "What does the next 60 days need to look like?",
    options: [
      "More qualified enquiries coming through",
      "Fewer missed calls and lost opportunities",
      "More booked jobs without chasing people",
      "A clearer system for leads, follow-up and growth",
    ],
  },
];

function splitName(full: string): { first: string; last: string } {
  const parts = full.trim().split(/\s+/).filter(Boolean);
  if (parts.length <= 1) return { first: parts[0] ?? "", last: "" };
  return { first: parts[0], last: parts.slice(1).join(" ") };
}

function ContactPage() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <SiteNav />
      <main>
        <ContactHero />
        <ContactFormSection />
      </main>
      <SiteFooter />
    </div>
  );
}

/* ------------------------------- HERO ------------------------------- */

function ContactHero() {
  const pills = ["60-second enquiry", "No pressure", "Tailored strategy"];
  return (
    <section className="relative isolate overflow-hidden bg-[#E9F7EE] pt-36 pb-20 lg:pt-44 lg:pb-24">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)]"
        style={{ backgroundImage: MINT_GRID, backgroundSize: "18px 18px" }}
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
          {/* LEFT — copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-700/80">
              Private Strategy Session
            </p>
            <h1 className="mt-6 font-headline text-[clamp(2.75rem,5.4vw,4.75rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.02em] text-[#0a0b0b]">
              Book a strategy call.
            </h1>
            <p className="mt-7 max-w-xl text-[16px] md:text-[17px] font-medium leading-relaxed text-foreground">
              Montarro is built for service businesses ready to stop missing
              leads, chasing follow-ups and running disconnected systems. Tell us
              where your business is at and we&rsquo;ll show you the clearest
              infrastructure path forward.
            </p>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {pills.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1.5 rounded-full border border-emerald-600/20 bg-white/70 px-3.5 py-1.5 text-[12.5px] font-semibold text-emerald-800"
                >
                  <Check className="h-3.5 w-3.5 text-emerald-600" strokeWidth={2.6} />
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — dark results / system card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            <ResultsCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ResultsCard() {
  const stats: [string, string, string][] = [
    ["Qualified Leads", "142", "+18%"],
    ["Calls Answered", "318", "100%"],
    ["Appointments", "96", "+11"],
  ];
  const feed: { icon: typeof PhoneCall; label: string; meta: string; tag: string }[] = [
    { icon: PhoneCall, label: "Incoming call", meta: "+61 4•• ••• 218", tag: "Qualifying" },
    { icon: CheckCircle2, label: "Lead qualified", meta: "High intent · roofing", tag: "92%" },
    { icon: CalendarCheck, label: "Appointment booked", meta: "Thu · 3:00 PM", tag: "Confirmed" },
    { icon: Database, label: "CRM synced", meta: "GoHighLevel", tag: "Synced" },
  ];
  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 -z-10 rounded-[44px] bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.16),transparent_72%)] blur-3xl"
      />
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111315] p-5 shadow-[0_40px_100px_-50px_rgba(0,0,0,0.8)] sm:p-6">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{ background: "linear-gradient(to right, transparent, rgba(16,185,129,0.45), transparent)" }}
        />
        {/* header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-white/55">
            <span className="flex gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
            </span>
            Revenue Infrastructure
          </div>
          <span className="inline-flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.2em] text-emerald-300">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500/60 animate-pulse-dot" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            Live
          </span>
        </div>

        {/* stat tiles */}
        <div className="mt-5 grid grid-cols-3 gap-2.5">
          {stats.map(([label, value, delta]) => (
            <div key={label} className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3">
              <div className="text-[9.5px] uppercase tracking-[0.14em] text-white/45">{label}</div>
              <div className="mt-1.5 font-display text-2xl font-semibold tabular-nums text-white">{value}</div>
              <div className="mt-0.5 text-[10px] font-semibold text-emerald-400">{delta}</div>
            </div>
          ))}
        </div>

        {/* live enquiry feed */}
        <div className="mt-5">
          <div className="mb-2.5 text-[10px] uppercase tracking-[0.2em] text-white/40">Live enquiry feed</div>
          <div className="space-y-2">
            {feed.map((e) => (
              <div
                key={e.label}
                className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-3 py-2.5"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/[0.08] text-emerald-400">
                  <e.icon className="h-3.5 w-3.5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[12.5px] font-medium text-white">{e.label}</div>
                  <div className="truncate text-[11px] text-white/45">{e.meta}</div>
                </div>
                <span className="shrink-0 rounded-full border border-emerald-500/20 bg-emerald-500/[0.08] px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                  {e.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------- FORM ------------------------------- */

type FormState = {
  revenue: string;
  headcount: string;
  platforms: string;
  goals: string;
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  notes: string;
};
type FormErrors = Partial<Record<keyof FormState, string>>;

const TOTAL_STEPS = 5;

function ContactFormSection() {
  const [form, setForm] = useState<FormState>({
    revenue: "",
    headcount: "",
    platforms: "",
    goals: "",
    fullName: "",
    businessName: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  function update<K extends keyof FormState>(key: K, value: string) {
    setForm((p) => ({ ...p, [key]: value }));
    if (errors[key]) setErrors((p) => ({ ...p, [key]: undefined }));
  }

  function validate(): FormErrors {
    const e: FormErrors = {};
    QUESTIONS.forEach((qq) => {
      if (!form[qq.key]) e[qq.key] = "Please choose an option.";
    });
    if (!form.fullName.trim()) e.fullName = "Required.";
    if (!form.businessName.trim()) e.businessName = "Required.";
    if (!form.email.trim()) e.email = "Required.";
    else if (!EMAIL_RE.test(form.email.trim())) e.email = "Enter a valid email.";
    if (!form.phone.trim()) e.phone = "Required.";
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
      if (!LEAD_WEBHOOK_URL) throw new Error("VITE_MONTARRO_LEAD_WEBHOOK_URL is not configured");
      const { first, last } = splitName(form.fullName);
      const payload = {
        full_name: form.fullName,
        first_name: first,
        last_name: last,
        email: form.email,
        phone: form.phone,
        company_name: form.businessName,
        budget_monthly_revenue: form.revenue,
        team_size: form.headcount,
        social_platforms: form.platforms,
        goal: form.goals,
        goals_notes: form.notes,
        source: "Montarro Website",
        form_type: "Strategy Call Page",
      };
      const res = await fetch(LEAD_WEBHOOK_URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Lead webhook responded ${res.status}`);
      setSubmitted(true);
    } catch (err) {
      console.error("[Montarro] Strategy-call submission failed:", err);
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  }

  // Progress reflects how many sections are complete (whole form shown at once).
  const contactComplete = !!(
    form.fullName.trim() &&
    form.businessName.trim() &&
    form.email.trim() &&
    form.phone.trim()
  );
  const completed =
    QUESTIONS.filter((q) => !!form[q.key]).length + (contactComplete ? 1 : 0);
  const currentStep = Math.min(TOTAL_STEPS, completed + 1);
  const progress = (currentStep / TOTAL_STEPS) * 100;

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-2xl px-6">
        <div className="rounded-3xl border border-[#D8F2E8] bg-white p-7 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.22)] sm:p-10 lg:p-12">
          <AnimatePresence mode="wait">
            {submitted ? (
              <SuccessState key="done" firstName={splitName(form.fullName).first || "there"} />
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                noValidate
                exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
                transition={{ duration: 0.35 }}
              >
                {/* progress bar */}
                <div className="mb-9">
                  <div className="mb-2.5">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
                      Step {currentStep} of {TOTAL_STEPS}
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-black/[0.06]">
                    <motion.div
                      className="h-full rounded-full bg-emerald-600"
                      initial={false}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                </div>

                <div className="space-y-8">
                  {/* qualification questions (1–4) — all visible at once */}
                  {QUESTIONS.map((qq, i) => (
                    <OptionGroup
                      key={qq.key}
                      index={i + 1}
                      question={qq.q}
                      options={qq.options}
                      value={form[qq.key]}
                      onChange={(v) => update(qq.key, v)}
                      error={errors[qq.key]}
                    />
                  ))}

                  {/* contact details */}
                  <div>
                    <NumberedHeader index={5} title="Your contact details" />
                    <div className="mt-4 grid gap-4 sm:grid-cols-2 sm:gap-5">
                      <Field id="fullName" label="Full Name" value={form.fullName} onChange={(v) => update("fullName", v)} error={errors.fullName} autoComplete="name" />
                      <Field id="businessName" label="Business Name" value={form.businessName} onChange={(v) => update("businessName", v)} error={errors.businessName} autoComplete="organization" />
                      <Field id="email" label="Email" type="email" value={form.email} onChange={(v) => update("email", v)} error={errors.email} autoComplete="email" inputMode="email" />
                      <Field id="phone" label="Best Mobile" type="tel" value={form.phone} onChange={(v) => update("phone", v)} error={errors.phone} autoComplete="tel" inputMode="tel" />
                    </div>
                    <textarea
                      id="notes"
                      name="notes"
                      aria-label="Tell us anything else about your business"
                      value={form.notes}
                      onChange={(e) => update("notes", e.target.value)}
                      rows={4}
                      placeholder="Tell us anything else about your business…"
                      className="mt-4 w-full resize-none rounded-2xl border border-black/[0.08] bg-white px-5 py-4 text-[15px] leading-relaxed text-foreground placeholder:text-foreground/45 shadow-[0_2px_12px_-6px_rgba(0,0,0,0.12)] transition-all duration-300 focus:border-emerald-500/50 focus:shadow-[0_8px_24px_-8px_rgba(16,185,129,0.22)] focus:outline-none"
                    />
                  </div>

                  {submitError && (
                    <p role="alert" className="rounded-2xl border border-red-500/20 bg-red-500/[0.06] px-4 py-3 text-[13px] leading-relaxed text-red-600">
                      Something went wrong sending your enquiry. Please try again — or
                      email us at montarromedia@outlook.com.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="group inline-flex h-[58px] w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-emerald-600 to-emerald-700 px-7 text-[14px] font-semibold text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18),0_14px_34px_-14px_rgba(5,150,105,0.6)] transition-all duration-300 ease-out hover:-translate-y-[2px] hover:from-emerald-500 hover:to-emerald-600 hover:shadow-[0_22px_48px_-16px_rgba(5,150,105,0.7)] disabled:opacity-70 disabled:hover:translate-y-0"
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

                  <div className="text-center">
                    <p className="text-[13px] font-medium leading-relaxed text-foreground">
                      No pressure. No generic sales pitch. Just a tailored strategy
                      showing how Montarro would fit your business.
                    </p>
                    <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
                      Not ready yet?{" "}
                      <Link to="/" hash="system" className="font-semibold text-emerald-700 transition-colors duration-300 hover:text-emerald-600">
                        Explore the System →
                      </Link>{" "}
                      <span className="px-1 text-foreground/30">·</span>{" "}
                      or call{" "}
                      <a href="tel:0450731109" className="font-semibold text-emerald-700 transition-colors duration-300 hover:text-emerald-600">
                        0450 731 109
                      </a>
                    </p>
                  </div>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function NumberedHeader({ index, title }: { index: number; title: string }) {
  return (
    <div className="flex items-baseline gap-2.5">
      <span className="font-display text-[17px] font-bold tabular-nums text-emerald-600">{index}.</span>
      <h3 className="text-[15.5px] font-semibold text-foreground">{title}</h3>
    </div>
  );
}

function SuccessState({ firstName }: { firstName: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center py-10 text-center"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.05 }}
        className="relative flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/[0.08]"
      >
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full border border-emerald-500/40"
          initial={{ scale: 1, opacity: 0.7 }}
          animate={{ scale: 1.7, opacity: 0 }}
          transition={{ duration: 1.1, ease: "easeOut", delay: 0.25 }}
        />
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.18 }}
        >
          <Check className="h-6 w-6 text-emerald-600" strokeWidth={2.4} />
        </motion.span>
      </motion.div>
      <h2 className="mt-7 font-display text-3xl font-bold leading-tight tracking-[-0.03em] text-[#0a0b0b]">
        Thanks, {firstName}.
      </h2>
      <p className="mt-4 max-w-md text-[15px] font-medium leading-relaxed text-foreground">
        You&rsquo;re all set. Our team will give you a call shortly to schedule
        your strategy session and map out a tailored revenue infrastructure for
        your business.
      </p>
    </motion.div>
  );
}

function OptionGroup({
  index,
  question,
  options,
  value,
  onChange,
  error,
}: {
  index: number;
  question: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  return (
    <div>
      <div className="flex items-baseline gap-2.5">
        <span className="font-display text-[17px] font-bold tabular-nums text-emerald-600">{index}.</span>
        <h3 className="text-[15.5px] font-semibold text-foreground">{question}</h3>
      </div>
      <div className="mt-4 flex flex-wrap gap-2.5">
        {options.map((opt) => {
          const selected = value === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              aria-pressed={selected}
              className={`rounded-xl border px-4 py-2.5 text-[13.5px] font-medium transition-all duration-200 ease-out ${
                selected
                  ? "border-emerald-600 bg-emerald-600 text-white shadow-[0_10px_24px_-12px_rgba(5,150,105,0.6)]"
                  : "border-black/[0.1] bg-white text-foreground/80 hover:-translate-y-px hover:border-emerald-500/50 hover:bg-emerald-500/[0.05] hover:text-foreground"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {error && <p className="mt-2.5 text-[11px] text-red-600">{error}</p>}
    </div>
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
        className={`h-[58px] w-full rounded-2xl border bg-white px-5 text-[15px] text-foreground caret-emerald-500 placeholder:text-foreground/45 shadow-[0_2px_12px_-6px_rgba(0,0,0,0.12)] transition-all duration-300 focus:outline-none ${
          error
            ? "border-red-400/60"
            : "border-black/[0.08] focus:border-emerald-500/50 focus:shadow-[0_8px_24px_-8px_rgba(16,185,129,0.22)]"
        }`}
      />
      {error && <p className="mt-1.5 pl-1 text-[11px] text-red-600">{error}</p>}
    </div>
  );
}
