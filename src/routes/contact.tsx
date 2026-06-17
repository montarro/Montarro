import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Check, Mail, Phone, Instagram, Loader2 } from "lucide-react";
import { MobileMenu } from "@/components/MobileMenu";
import { primaryCta } from "@/lib/cta";

// Generic lead webhook (public — handled by Make/Zapier/GHL automation
// separately). The Montarro form POSTs its payload straight here.
// Referenced as import.meta.env.VITE_* so Vite statically inlines it at build.
const LEAD_WEBHOOK_URL = import.meta.env.VITE_MONTARRO_LEAD_WEBHOOK_URL?.trim();

function splitName(full: string): { first: string; last: string } {
  const parts = full.trim().split(/\s+/).filter(Boolean);
  if (parts.length <= 1) return { first: parts[0] ?? "", last: "" };
  return { first: parts[0], last: parts.slice(1).join(" ") };
}

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Apply to Work With Montarro" },
      {
        name: "description",
        content:
          "Apply to work with Montarro. Designed for modern companies ready to scale through AI, automation, and acquisition systems.",
      },
      { property: "og:title", content: "Apply to Work With Montarro" },
      {
        property: "og:description",
        content:
          "A private strategy application for modern companies scaling through AI and automation.",
      },
    ],
  }),
  component: ContactPage,
});

type FormState = {
  company: string;
  fullName: string;
  email: string;
  phone: string;
  industry: string;
  stage: string;
  goal: string;
  budget: string;
  notes: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INDUSTRIES = [
  "Construction",
  "Healthcare",
  "Legal",
  "Automotive",
  "Hospitality",
  "Real Estate",
  "E-Commerce",
  "Service-Based",
  "Multi-Location",
  "Other",
];

const STAGES = [
  "Pre-Revenue",
  "Early Growth",
  "Scaling Operations",
  "Established Brand",
  "Multi-Location / Enterprise",
];

const GOALS = [
  "Lead Generation",
  "AI Reception Systems",
  "Content Creation",
  "Paid Advertising",
  "Automation",
  "Complete Revenue System",
];

const BUDGETS = ["$2k–5k", "$5k–10k", "$10k–25k", "$25k+", "Need Guidance"];

const TOTAL_STEPS = 6;

function ContactNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-black/[0.05]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <img src="/montarro-logo.png" alt="Montarro" className="h-12 w-auto" />
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-[13px] font-medium text-muted-foreground">
          {[
            ["Services", "/#services"],
            ["AI Receptionist", "/services/ai-receptionists"],
            ["Live Demo", "/demo"],
            ["Pricing", "/#pricing"],
          ].map(([l, h]) => (
            <a
              key={l}
              href={h}
              className="tracking-tight transition-colors duration-300 hover:text-foreground"
            >
              {l}
            </a>
          ))}
        </nav>
        <Link
          to="/contact"
          className={`${primaryCta} hidden md:inline-flex px-5 py-2.5 text-[13px]`}
        >
          Book a Free Consultation
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
        <MobileMenu />
      </div>
    </header>
  );
}

const STEP_TITLES: Record<number, { eyebrow: string; heading: string }> = {
  1: { eyebrow: "Company", heading: "Tell us about your company." },
  2: { eyebrow: "Industry", heading: "What best describes your business?" },
  3: { eyebrow: "Stage", heading: "What stage is your company currently at?" },
  4: { eyebrow: "Focus", heading: "What are you looking to solve?" },
  5: { eyebrow: "Budget", heading: "What growth investment range are you currently comfortable with?" },
  6: { eyebrow: "Goals", heading: "What's currently limiting growth?" },
};

function ContactPage() {
  const [form, setForm] = useState<FormState>({
    company: "",
    fullName: "",
    email: "",
    phone: "",
    industry: "",
    stage: "",
    goal: "",
    budget: "",
    notes: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [finalStepReady, setFinalStepReady] = useState(false);

  useEffect(() => {
    if (step !== TOTAL_STEPS) {
      setFinalStepReady(false);
      return;
    }

    setFinalStepReady(false);
    const readyTimer = window.setTimeout(() => setFinalStepReady(true), 650);
    return () => window.clearTimeout(readyTimer);
  }, [step]);

  function update<K extends keyof FormState>(key: K, value: string) {
    setForm((p) => ({ ...p, [key]: value }));
    if (errors[key]) setErrors((p) => ({ ...p, [key]: undefined }));
  }

  function validateStep(s: number): FormErrors {
    const e: FormErrors = {};
    if (s === 1) {
      if (!form.company.trim()) e.company = "Required.";
      if (!form.fullName.trim()) e.fullName = "Required.";
      if (!form.email.trim()) e.email = "Required.";
      else if (!EMAIL_RE.test(form.email.trim())) e.email = "Enter a valid email.";
      if (!form.phone.trim()) e.phone = "Required.";
    }
    if (s === 2 && !form.industry) e.industry = "Please select an option.";
    if (s === 3 && !form.stage) e.stage = "Please select an option.";
    if (s === 4 && !form.goal) e.goal = "Please select an option.";
    if (s === 5 && !form.budget) e.budget = "Please select an option.";
    return e;
  }

  function handleNext(e?: React.MouseEvent<HTMLButtonElement>) {
    e?.preventDefault();
    e?.stopPropagation();
    const v = validateStep(step);
    setErrors(v);
    if (Object.keys(v).length) return;
    setStep((s) => Math.min(TOTAL_STEPS, s + 1));
  }

  function handleBack() {
    setErrors({});
    setStep((s) => Math.max(1, s - 1));
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  async function handleFinalSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (step !== TOTAL_STEPS || !finalStepReady) return;
    // Prevent duplicate submissions (in-flight or already submitted).
    if (submitting || submitted) return;
    const v = validateStep(step);
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
        company_name: form.company,
        goals_notes: form.notes,
        budget_monthly_revenue: form.budget,
        interested_service: form.goal,
        industry: form.industry,
        stage: form.stage,
        operational_bottleneck: form.notes,
        source: "Montarro Website",
      };
      const res = await fetch(LEAD_WEBHOOK_URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        throw new Error(`Lead webhook responded ${res.status}`);
      }
      setSubmitted(true);
    } catch (err) {
      console.error("[Montarro] Lead webhook submission failed:", err);
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  }

  const progress = (step / TOTAL_STEPS) * 100;

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <ContactNav />
      <main>
        <section className="relative isolate min-h-screen overflow-hidden pt-24 pb-16">
          {/* backdrop */}
          <div className="absolute inset-0 -z-10 bg-grid opacity-[0.12] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)]" />
          <div className="absolute inset-0 -z-10 bg-radial-glow" />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[16%] -z-10 h-[560px] w-[860px] -translate-x-1/2 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(16,185,129,0.08), transparent 70%)",
            }}
            animate={{ opacity: [0.65, 1, 0.65], scale: [1, 1.06, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="mx-auto max-w-2xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <div className="mb-6 sm:mb-8 inline-flex items-center gap-2 rounded-full border border-black/[0.06] bg-card/40 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.24em] text-muted-foreground backdrop-blur">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500/60 animate-pulse-dot" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </span>
                Private Infrastructure Audit
              </div>
              <h1 className="font-display text-balance mx-auto max-w-[16ch] text-[clamp(2.25rem,6.2vw,4.75rem)] leading-[0.98] tracking-[-0.045em] text-gradient-chrome">
                Scale With Montarro.
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-pretty text-[15px] md:text-base text-muted-foreground leading-relaxed">
                Infrastructure engineered to capture, qualify, and compound revenue.
              </p>
              <p className="mx-auto mt-4 max-w-md text-[12px] tracking-wide text-muted-foreground/55">
                We partner with a limited number of operators each quarter.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative mt-6 sm:mt-10"
            >
              {/* radial lighting behind the form card */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-x-10 -top-10 bottom-0 -z-10 rounded-[40px] blur-3xl"
                style={{
                  background:
                    "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(16,185,129,0.10), transparent 70%)",
                }}
              />
              {/* ultra-light gradient texture behind the card */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-x-8 -top-8 bottom-0 -z-10 bg-grid opacity-[0.04] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
              />
              <div className="relative overflow-hidden rounded-3xl border border-black/[0.07] bg-gradient-to-b from-white/90 via-white/80 to-[#f3f4f6]/70 backdrop-blur-xl shadow-[0_1px_0_0_rgba(255,255,255,0.85)_inset,0_-26px_55px_-44px_rgba(0,0,0,0.10)_inset,0_36px_90px_-45px_rgba(0,0,0,0.22)]">
                {/* soft emerald lighting */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[600px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.12),transparent_70%)] blur-2xl"
                />

                {submitted ? (
                  <BookingScreen />
                ) : (
                  <div className="relative">
                    {/* Progress bar */}
                    <div className="relative h-[2px] w-full overflow-hidden bg-black/[0.05]">
                      <motion.div
                        initial={false}
                        animate={{ width: `${progress}%` }}
                        transition={{ type: "spring", stiffness: 110, damping: 20, mass: 0.6 }}
                        className="absolute inset-y-0 left-0 overflow-hidden bg-gradient-to-r from-emerald-500/70 via-emerald-500 to-emerald-400 shadow-[0_0_18px_rgba(16,185,129,0.6)]"
                      >
                        <motion.span
                          aria-hidden
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                          animate={{ x: ["-120%", "120%"] }}
                          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                        />
                      </motion.div>
                    </div>

                    <form onSubmit={onSubmit} noValidate className="px-7 py-10 md:px-12 md:py-12">
                      {/* Step meta */}
                      <div className="flex items-center justify-between">
                        <span className="text-[10.5px] uppercase tracking-[0.32em] text-muted-foreground/80">
                          {STEP_TITLES[step].eyebrow}
                        </span>
                        <span className="text-[10.5px] uppercase tracking-[0.32em] text-muted-foreground/80 tabular-nums">
                          {String(step).padStart(2, "0")} / {String(TOTAL_STEPS).padStart(2, "0")}
                        </span>
                      </div>

                      <AnimatePresence mode="wait">
                        <motion.div
                          key={step}
                          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                          exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
                          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                          className="mt-6"
                        >
                          <h2 className="font-display text-3xl md:text-[2.4rem] leading-[1.05] tracking-[-0.035em] text-gradient-chrome max-w-[20ch]">
                            {STEP_TITLES[step].heading}
                          </h2>

                          <div className="mt-10">
                            {step === 1 && (
                              <div className="grid gap-5 sm:grid-cols-2">
                                <Field
                                  id="company"
                                  label="Company / Brand"
                                  value={form.company}
                                  onChange={(v) => update("company", v)}
                                  error={errors.company}
                                  autoComplete="organization"
                                />
                                <Field
                                  id="fullName"
                                  label="Contact Name"
                                  value={form.fullName}
                                  onChange={(v) => update("fullName", v)}
                                  error={errors.fullName}
                                  autoComplete="name"
                                />
                                <Field
                                  id="email"
                                  label="Work Email"
                                  type="email"
                                  value={form.email}
                                  onChange={(v) => update("email", v)}
                                  error={errors.email}
                                  autoComplete="email"
                                  inputMode="email"
                                />
                                <Field
                                  id="phone"
                                  label="Phone Number"
                                  type="tel"
                                  value={form.phone}
                                  onChange={(v) => update("phone", v)}
                                  error={errors.phone}
                                  autoComplete="tel"
                                  inputMode="tel"
                                />
                              </div>
                            )}

                            {step === 2 && (
                              <ChoiceGrid
                                options={INDUSTRIES}
                                value={form.industry}
                                onChange={(v) => update("industry", v)}
                                error={errors.industry}
                                columns={2}
                              />
                            )}
                            {step === 3 && (
                              <ChoiceGrid
                                options={STAGES}
                                value={form.stage}
                                onChange={(v) => update("stage", v)}
                                error={errors.stage}
                                columns={1}
                              />
                            )}
                            {step === 4 && (
                              <ChoiceGrid
                                options={GOALS}
                                value={form.goal}
                                onChange={(v) => update("goal", v)}
                                error={errors.goal}
                                columns={2}
                              />
                            )}
                            {step === 5 && (
                              <ChoiceGrid
                                options={BUDGETS}
                                value={form.budget}
                                onChange={(v) => update("budget", v)}
                                error={errors.budget}
                                columns={1}
                              />
                            )}
                            {step === 6 && (
                              <div className="space-y-6">
                                <p className="text-[14.5px] leading-relaxed text-muted-foreground">
                                  Share anything relevant about your company, current challenges, or what you're looking to achieve.
                                </p>
                                <textarea
                                  id="notes"
                                  name="notes"
                                  value={form.notes}
                                  onChange={(e) => update("notes", e.target.value)}
                                  rows={6}
                                  placeholder="Missed calls, inconsistent lead flow, poor follow-up systems, low conversion rates, operational bottlenecks, scaling limitations…"
                                  className="w-full resize-none rounded-2xl border border-black/[0.06] bg-card/40 p-6 text-[15px] leading-relaxed text-foreground placeholder:text-muted-foreground/50 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] transition-all duration-500 hover:border-black/[0.12] hover:shadow-[0_4px_20px_-6px_rgba(0,0,0,0.08)] focus:border-emerald-500/40 focus:bg-card/60 focus:shadow-[0_0_30px_-8px_rgba(16,185,129,0.28),0_4px_20px_-6px_rgba(0,0,0,0.08)] focus:outline-none"
                                />
                              </div>
                            )}
                          </div>
                        </motion.div>
                      </AnimatePresence>

                      {step === TOTAL_STEPS && submitError && (
                        <p
                          role="alert"
                          className="mt-6 rounded-xl border border-red-500/20 bg-red-500/[0.06] px-4 py-3 text-[13px] leading-relaxed text-red-600"
                        >
                          Something went wrong submitting your application. Please try again — if it keeps happening, email us at montarromedia@outlook.com.
                        </p>
                      )}

                      {/* Footer controls */}
                      <div className="mt-10 flex items-center justify-between gap-4 border-t border-black/[0.05] pt-6">
                        <button
                          type="button"
                          onClick={handleBack}
                          disabled={step === 1}
                          className="text-[12px] uppercase tracking-[0.24em] text-muted-foreground transition-colors duration-300 hover:text-foreground disabled:opacity-30 disabled:hover:text-muted-foreground"
                        >
                          Back
                        </button>

                        {step < TOTAL_STEPS ? (
                          <button
                            key="continue-step"
                            type="button"
                            onClick={handleNext}
                            className={`${primaryCta} inline-flex overflow-hidden px-7 py-3.5 text-[12px] uppercase tracking-[0.22em]`}
                          >
                            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                            Continue
                            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </button>
                        ) : (
                          <button
                            key="submit-application"
                            type="submit"
                            data-final-submit="true"
                            onClick={handleFinalSubmit}
                            disabled={submitting || !finalStepReady}
                            className={`${primaryCta} inline-flex overflow-hidden px-7 py-3.5 text-[12px] uppercase tracking-[0.22em] disabled:opacity-70 disabled:hover:translate-y-0`}
                          >
                            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                            {submitting ? (
                              <>
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                Submitting
                              </>
                            ) : (
                              <>
                                Submit Application
                                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                )}
              </div>

              {/* contact alternates */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[13px] text-muted-foreground">
                <a href="mailto:Team@montarro.com" className="inline-flex items-center gap-2 hover:text-foreground transition-colors">
                  <Mail className="h-4 w-4" /> Team@montarro.com
                </a>
                <a href="tel:0450731109" className="inline-flex items-center gap-2 hover:text-foreground transition-colors">
                  <Phone className="h-4 w-4" /> 0450 731 109
                </a>
                <a href="https://instagram.com/montarroaii" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-foreground transition-colors">
                  <Instagram className="h-4 w-4" /> @montarroaii
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}

// Public calendar embed URL (no secret — embeds are public). Set
// VITE_GHL_CALENDAR_URL in the environment to enable in-page booking.
// Referenced as import.meta.env.VITE_* so Vite statically inlines it at build;
// .trim() so an empty/whitespace value falls back instead of rendering blank.
const GHL_CALENDAR_URL = import.meta.env.VITE_GHL_CALENDAR_URL?.trim();

const GHL_EMBED_SCRIPT = "https://link.msgsndr.com/js/form_embed.js";

/**
 * Final stage of the consultation flow. After the form submits to GoHighLevel
 * the user smoothly transitions here to book a time on the GHL calendar —
 * without leaving the page. Booking completion (detected via the calendar's
 * postMessage) reveals a premium confirmation state.
 */
function BookingScreen() {
  const [outcome, setOutcome] = useState<"booked" | "callback" | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  // Cinematic entrance: bring the booking stage into view smoothly.
  useEffect(() => {
    const t = window.setTimeout(() => {
      rootRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 120);
    return () => window.clearTimeout(t);
  }, []);

  // Diagnostic: make a missing calendar URL obvious in the console.
  useEffect(() => {
    if (!GHL_CALENDAR_URL) {
      console.warn(
        "[Montarro] VITE_GHL_CALENDAR_URL is not set in this build — showing the booking fallback. Add it in Vercel → Environment Variables and redeploy (it is a build-time VITE_ var).",
      );
    }
  }, []);

  // Load the GHL embed helper once (responsive iframe auto-resize).
  useEffect(() => {
    if (!GHL_CALENDAR_URL) return;
    if (document.querySelector(`script[src="${GHL_EMBED_SCRIPT}"]`)) return;
    const s = document.createElement("script");
    s.src = GHL_EMBED_SCRIPT;
    s.async = true;
    document.body.appendChild(s);
  }, []);

  // Detect a completed booking from the GHL calendar iframe (best-effort).
  // Conservative matching avoids resize/height chatter triggering it early.
  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (!/leadconnectorhq\.com|msgsndr\.com|gohighlevel\.com/.test(e.origin || "")) {
        return;
      }
      let text = "";
      try {
        text = typeof e.data === "string" ? e.data : JSON.stringify(e.data ?? "");
      } catch {
        return;
      }
      if (/height|resize|scroll|form_embed|hsform/i.test(text)) return;
      if (/appointment|booking|booked|scheduled/i.test(text)) setOutcome("booked");
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  if (outcome === "booked") return <BookingConfirmation />;
  if (outcome === "callback") return <CallbackConfirmation />;

  return (
    <motion.div
      ref={rootRef}
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
      className="relative px-7 py-12 text-center md:px-12 md:py-14"
    >
      {/* subtle emerald accent lighting */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-56 w-[560px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.12),transparent_70%)] blur-2xl"
      />

      <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] px-3.5 py-1.5 text-[11px] uppercase tracking-[0.24em] text-emerald-700/90">
        <Check className="h-3.5 w-3.5" strokeWidth={2.4} />
        Details received
      </div>

      <h2 className="mx-auto font-display text-3xl md:text-4xl leading-tight tracking-[-0.035em] text-gradient-chrome max-w-[18ch]">
        Book Your Free Consultation
      </h2>
      <p className="mx-auto mt-5 max-w-xl text-[14.5px] text-muted-foreground leading-relaxed">
        Choose a time to discuss your current lead flow, missed calls, and AI
        receptionist setup with the Montarro team.
      </p>

      {/* glass panel around the calendar */}
      <div className="relative mx-auto mt-10 max-w-xl">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-x-6 -top-6 bottom-0 -z-10 rounded-[32px] blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(16,185,129,0.12), transparent 70%)",
          }}
        />
        <div className="relative overflow-hidden rounded-2xl border border-black/[0.07] bg-gradient-to-b from-white/90 to-[#f3f4f6]/70 backdrop-blur-xl shadow-[0_1px_0_0_rgba(255,255,255,0.85)_inset,0_36px_90px_-50px_rgba(0,0,0,0.22)]">
          {/* emerald top hairline */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(16,185,129,0.45), transparent)",
            }}
          />
          {GHL_CALENDAR_URL ? (
            <iframe
              title="Book your Montarro consultation"
              src={GHL_CALENDAR_URL}
              id="ghl-consultation-calendar"
              scrolling="no"
              className="block h-[680px] w-full md:h-[720px]"
              style={{ border: "none" }}
            />
          ) : (
            <div className="flex min-h-[320px] flex-col items-center justify-center px-7 py-16 text-center">
              <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/5">
                <Check className="relative h-5 w-5 text-emerald-500" strokeWidth={2.2} />
              </div>
              <p className="mt-6 max-w-sm text-[14.5px] text-muted-foreground leading-relaxed">
                Your details are in. A Montarro strategist will reach out shortly.
              </p>
            </div>
          )}
        </div>

        {/* fallback: prefer a callback instead of booking */}
        <div className="mt-8 flex flex-col items-center">
          <button
            type="button"
            onClick={() => setOutcome("callback")}
            className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-card/40 px-6 py-3 text-[12px] uppercase tracking-[0.22em] backdrop-blur transition-all duration-500 hover:border-emerald-500/40 hover:shadow-[0_18px_50px_-25px_rgba(16,185,129,0.45)]"
          >
            Prefer We Call You?
          </button>
          <p className="mt-3 max-w-sm text-[13px] text-muted-foreground leading-relaxed">
            No problem — our team will follow up if you don't book a time.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function BookingConfirmation() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col items-center px-7 py-20 text-center md:px-12"
    >
      <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/5">
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.25),transparent_70%)] blur-md" />
        <Check className="relative h-6 w-6 text-emerald-500" strokeWidth={2.2} />
      </div>
      <h2 className="mt-8 font-display text-3xl md:text-4xl leading-tight tracking-[-0.035em] text-gradient-chrome max-w-[18ch]">
        Consultation Confirmed.
      </h2>
      <p className="mt-5 max-w-md text-[14.5px] text-muted-foreground leading-relaxed">
        Our team will review your business infrastructure before the call to
        identify operational bottlenecks, automation opportunities, and revenue
        recovery potential.
      </p>
      <p className="mt-6 max-w-sm text-[12px] uppercase tracking-[0.18em] text-muted-foreground/60">
        Check your inbox for the calendar invite and confirmation details.
      </p>
      <Link
        to="/"
        className="mt-10 inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-card/40 px-6 py-3 text-[12px] uppercase tracking-[0.22em] backdrop-blur transition-all duration-500 hover:border-emerald-500/40 hover:shadow-[0_18px_50px_-25px_rgba(16,185,129,0.45)]"
      >
        Back to home
        <ArrowUpRight className="h-3.5 w-3.5" />
      </Link>
    </motion.div>
  );
}

function CallbackConfirmation() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col items-center px-7 py-20 text-center md:px-12"
    >
      <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/5">
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.25),transparent_70%)] blur-md" />
        <Check className="relative h-6 w-6 text-emerald-500" strokeWidth={2.2} />
      </div>
      <h2 className="mt-8 font-display text-3xl md:text-4xl leading-tight tracking-[-0.035em] text-gradient-chrome max-w-[18ch]">
        We'll Be In Touch.
      </h2>
      <p className="mt-5 max-w-md text-[14.5px] text-muted-foreground leading-relaxed">
        Your details are in — a Montarro strategist will reach out shortly to set
        up your consultation.
      </p>
      <Link
        to="/"
        className="mt-10 inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-card/40 px-6 py-3 text-[12px] uppercase tracking-[0.22em] backdrop-blur transition-all duration-500 hover:border-emerald-500/40 hover:shadow-[0_18px_50px_-25px_rgba(16,185,129,0.45)]"
      >
        Back to home
        <ArrowUpRight className="h-3.5 w-3.5" />
      </Link>
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
            error ? "border-destructive/60" : "border-black/[0.10] focus:border-emerald-500/70"
          }`}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/80 to-emerald-500/0 shadow-[0_0_12px_rgba(16,185,129,0.45)] transition-transform duration-700 ease-out peer-focus:scale-x-100"
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

function ChoiceGrid({
  options,
  value,
  onChange,
  error,
  columns,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  error?: string;
  columns: 1 | 2;
}) {
  return (
    <div>
      <div
        className={`grid gap-3 ${
          columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-1"
        }`}
      >
        {options.map((opt) => {
          const selected = value === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              aria-pressed={selected}
              className={`group relative flex items-center justify-between overflow-hidden rounded-2xl border px-5 py-4 text-left text-[14px] backdrop-blur transition-all duration-500 ease-out hover:-translate-y-0.5 active:scale-[0.99] ${
                selected
                  ? "border-emerald-500/50 bg-emerald-500/[0.06] text-foreground shadow-[0_18px_50px_-25px_rgba(16,185,129,0.5)]"
                  : "border-black/[0.07] bg-background/40 text-muted-foreground hover:text-foreground hover:border-emerald-500/30 hover:shadow-[0_16px_40px_-25px_rgba(16,185,129,0.4)]"
              }`}
            >
              <span
                aria-hidden
                className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ${
                  selected ? "opacity-100" : "group-hover:opacity-100"
                } bg-[radial-gradient(ellipse_at_top_left,rgba(16,185,129,0.12),transparent_60%)]`}
              />
              <span className="relative">{opt}</span>
              <span
                className={`relative flex h-4 w-4 items-center justify-center rounded-full border transition-all duration-500 ${
                  selected
                    ? "border-emerald-500 bg-emerald-500"
                    : "border-black/[0.15] group-hover:border-emerald-500/50"
                }`}
              >
                {selected && <Check className="h-2.5 w-2.5 text-background" strokeWidth={3} />}
              </span>
            </button>
          );
        })}
      </div>
      {error && (
        <p className="mt-4 text-[11px] text-muted-foreground">{error}</p>
      )}
    </div>
  );
}
