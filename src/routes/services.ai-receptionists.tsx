import { createFileRoute, Link } from "@tanstack/react-router";
import { Fragment } from "react";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  ArrowDown,
  ArrowRight,
  Moon,
  Users,
  Voicemail,
  Flag,
  X,
  Check,
  PhoneIncoming,
  Bot,
  Filter,
  CalendarCheck,
  Handshake,
  TrendingUp,
  Headphones,
  Zap,
  BadgeDollarSign,
  Wrench,
  Stethoscope,
  Scale,
  Image as ImageIcon,
  BarChart3,
  AudioLines,
  Building2,
  type LucideIcon,
} from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";
import { primaryCta } from "@/lib/cta";

export const Route = createFileRoute("/services/ai-receptionists")({
  head: () => ({
    meta: [
      { title: "AI Receptionist — Montarro" },
      {
        name: "description",
        content:
          "Every missed call is revenue you'll never get back. Montarro's AI front desk answers, qualifies and books 24/7 — recovering the leads your business is losing right now.",
      },
      { property: "og:title", content: "Every Call Answered. Every Lead Captured. — Montarro" },
      {
        property: "og:description",
        content:
          "Stop losing revenue to missed calls. An AI front desk that answers, qualifies and books — 24/7.",
      },
    ],
  }),
  component: AiReceptionistPage,
});

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function LiveDot({ className = "" }: { className?: string }) {
  return (
    <span className={`relative flex h-1.5 w-1.5 ${className}`}>
      <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500/60 animate-pulse-dot" />
      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
    </span>
  );
}

function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] uppercase tracking-[0.22em] backdrop-blur ${
        dark
          ? "border-white/15 bg-white/[0.04] text-white/70"
          : "border-emerald-500/25 bg-emerald-500/[0.06] text-emerald-700"
      }`}
    >
      {children}
    </span>
  );
}

/** Reusable image placeholder so real photography/screenshots drop in later. */
function ImagePlaceholder({
  label = "Image",
  icon: Icon = ImageIcon,
  className = "",
  dark = false,
}: {
  label?: string;
  icon?: LucideIcon;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-2xl border border-dashed ${
        dark ? "border-white/15 bg-white/[0.03]" : "border-black/15 bg-card/40"
      } ${className}`}
    >
      <div
        className={`flex flex-col items-center gap-2 ${
          dark ? "text-white/40" : "text-muted-foreground/50"
        }`}
      >
        <Icon className="h-6 w-6" />
        <span className="text-[10.5px] uppercase tracking-[0.18em]">{label}</span>
      </div>
    </div>
  );
}

function AiReceptionistPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <SiteNav />
      <main>
        <Hero />
        <Problem />
        <CostOfMissedCall />
        <RevenueRecoverySystem />
        <BusinessImpact />
        <IndustryExamples />
        <ResultsShowcase />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}

/* ----------------------------- HERO (unchanged) ----------------------------- */
function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="absolute inset-0 -z-10 bg-grid opacity-50 [mask-image:radial-gradient(ellipse_at_top,black_25%,transparent_72%)]" />
      <div className="absolute inset-0 -z-10 bg-radial-glow" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 mx-auto h-[420px] max-w-3xl rounded-full bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.06),transparent_70%)] blur-3xl" />

      <div className="mx-auto max-w-5xl px-6 text-center">
        <Reveal delay={0.05}>
          <Eyebrow>
            <LiveDot /> AI Receptionist
          </Eyebrow>
        </Reveal>
        <Reveal delay={0.15}>
          <h1 className="font-display text-balance mx-auto mt-7 max-w-[15ch] text-[clamp(2.5rem,7.5vw,6rem)] leading-[0.95] tracking-[-0.045em] text-gradient-chrome">
            Every Call Answered. Every Lead Captured.
          </h1>
        </Reveal>
        <Reveal delay={0.28}>
          <p className="mx-auto mt-7 max-w-2xl text-pretty text-base md:text-lg text-muted-foreground leading-relaxed">
            An AI receptionist that answers, qualifies and books appointments
            24/7 — ensuring no opportunity slips through the cracks.
          </p>
        </Reveal>
        <Reveal delay={0.4}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link to="/contact" className={`${primaryCta} inline-flex px-6 py-3 text-sm`}>
              Book Free Consultation
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              to="/demo"
              className="group inline-flex items-center gap-2 rounded-xl border border-border bg-card/40 px-6 py-3 text-sm font-medium backdrop-blur transition-all duration-300 hover:border-foreground/40 hover:bg-card"
            >
              Try Live Demo
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </Reveal>
        <Reveal delay={0.5}>
          <p className="mt-8 text-[12px] tracking-wide text-muted-foreground/70">
            No missed calls. No voicemail. No lost revenue.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------- 1 · THE PROBLEM --------------------------- */
function Problem() {
  const cards: { icon: LucideIcon; title: string; body: string }[] = [
    { icon: Moon, title: "After-Hours Calls", body: "The phone rings at 7pm. Nobody's there. The customer moves on." },
    { icon: Users, title: "Busy Staff", body: "Your team is with a customer — so the next caller goes unanswered." },
    { icon: Voicemail, title: "Sent To Voicemail", body: "80% of callers won't leave a message. They simply hang up." },
    { icon: Flag, title: "Competitors Answer First", body: "The business that picks up first usually wins the job." },
  ];
  return (
    <section className="relative border-t border-black/[0.06] px-6 py-20 lg:py-28">
      <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-2">
        <div className="lg:sticky lg:top-28">
          <Reveal>
            <Eyebrow>The Problem</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 max-w-[16ch] font-display text-4xl md:text-5xl leading-[1.03] tracking-[-0.03em] text-gradient-chrome">
              Every Missed Call Is Revenue You&rsquo;ll Never Get Back.
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-5 max-w-md text-[15px] text-muted-foreground leading-relaxed">
              Most businesses don&rsquo;t lose customers because of price or
              quality. They lose them in the seconds a phone goes unanswered.
            </p>
          </Reveal>
          <Reveal delay={0.26}>
            <ImagePlaceholder
              label="Missed call / busy team"
              className="mt-8 hidden aspect-[4/3] w-full lg:flex"
            />
          </Reveal>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <Reveal key={c.title} delay={0.06 * i}>
                <div className="group h-full rounded-2xl border border-black/[0.07] bg-white/70 p-6 backdrop-blur transition-all duration-300 hover:border-red-500/25 hover:bg-white hover:shadow-[0_30px_70px_-50px_rgba(0,0,0,0.35)]">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/[0.05] text-red-500">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="mt-5 text-[15px] font-medium text-foreground">{c.title}</div>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">{c.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ----------------------- 2 · WHAT THE MISSED CALL COSTS ----------------------- */
function CostOfMissedCall() {
  const without = ["Call missed", "Goes to voicemail", "Lead calls a competitor", "Revenue lost"];
  const withUs = ["Call answered instantly", "Lead qualified", "Appointment booked", "Revenue captured"];
  return (
    <section className="relative border-t border-black/[0.06] bg-card/30 px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <Eyebrow>What That Missed Call Costs</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mx-auto mt-6 max-w-[20ch] font-display text-4xl md:text-5xl leading-[1.04] tracking-[-0.03em] text-gradient-chrome">
            The Same Call. Two Very Different Outcomes.
          </h2>
        </Reveal>
      </div>

      <div className="mx-auto mt-14 grid max-w-4xl gap-4 md:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-2xl border border-black/[0.07] bg-card/40 p-7 backdrop-blur">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground/70">
              <X className="h-4 w-4 text-red-500" /> Without Montarro
            </div>
            <ol className="mt-6 space-y-3">
              {without.map((t, i) => (
                <li key={t} className="flex items-center gap-3 text-[14.5px] text-muted-foreground">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-red-500/20 bg-red-500/[0.05] text-[11px] tabular-nums text-red-500">
                    {i + 1}
                  </span>
                  {t}
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative h-full overflow-hidden rounded-2xl border border-emerald-500/20 bg-white/85 p-7 backdrop-blur shadow-[0_30px_80px_-50px_rgba(16,185,129,0.5)]">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{ background: "linear-gradient(to right, transparent, rgba(16,185,129,0.5), transparent)" }}
            />
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-emerald-700">
              <Check className="h-4 w-4 text-emerald-500" /> With Montarro
            </div>
            <ol className="mt-6 space-y-3">
              {withUs.map((t, i) => (
                <li key={t} className="flex items-center gap-3 text-[14.5px] text-foreground">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-emerald-500/25 bg-emerald-500/[0.08] text-[11px] tabular-nums text-emerald-700">
                    {i + 1}
                  </span>
                  {t}
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------- 3 · THE REVENUE RECOVERY SYSTEM ------------------- */
function RevenueRecoverySystem() {
  const steps: { icon: LucideIcon; title: string }[] = [
    { icon: PhoneIncoming, title: "Call Comes In" },
    { icon: Bot, title: "AI Answers" },
    { icon: Filter, title: "AI Qualifies" },
    { icon: CalendarCheck, title: "AI Books" },
    { icon: Handshake, title: "Your Team Closes" },
  ];
  return (
    <section className="relative border-t border-black/[0.06] px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <Eyebrow>The Revenue Recovery System</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mx-auto mt-6 max-w-[18ch] font-display text-4xl md:text-5xl leading-[1.04] tracking-[-0.03em] text-gradient-chrome">
            Every Call Turned Into Booked Revenue.
          </h2>
        </Reveal>
      </div>

      <div className="mx-auto mt-14 flex max-w-6xl flex-col items-stretch gap-3 lg:flex-row lg:items-center">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <Fragment key={s.title}>
              <Reveal delay={0.06 * i} className="flex-1">
                <div className="group flex h-full flex-col items-center gap-3 rounded-2xl border border-black/[0.07] bg-white/70 px-4 py-7 text-center backdrop-blur transition-all duration-300 hover:border-emerald-500/30 hover:bg-white hover:shadow-[0_30px_70px_-50px_rgba(16,185,129,0.5)]">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] text-emerald-600 transition-transform duration-300 group-hover:-translate-y-0.5">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground/60 tabular-nums">
                    Step {i + 1}
                  </span>
                  <span className="text-[14px] font-medium leading-snug text-foreground">{s.title}</span>
                </div>
              </Reveal>
              {i < steps.length - 1 && (
                <div className="flex shrink-0 items-center justify-center text-emerald-500/50">
                  <ArrowDown className="h-5 w-5 lg:hidden" />
                  <ArrowRight className="hidden h-5 w-5 lg:block" />
                </div>
              )}
            </Fragment>
          );
        })}
      </div>
    </section>
  );
}

/* --------------------------- 4 · BUSINESS IMPACT --------------------------- */
function BusinessImpact() {
  const stats: { value: string; label: string; icon: LucideIcon }[] = [
    { value: "40%+", label: "More Leads Captured", icon: TrendingUp },
    { value: "24/7", label: "Coverage", icon: Headphones },
    { value: "<1s", label: "Response Time", icon: Zap },
    { value: "30–50%", label: "Recovered Revenue", icon: BadgeDollarSign },
  ];
  return (
    <section className="relative border-t border-black/[0.06] bg-card/30 px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <Eyebrow>Business Impact</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 font-display text-4xl md:text-5xl leading-[1.04] tracking-[-0.03em] text-gradient-chrome">
            The Numbers That Move The Business.
          </h2>
        </Reveal>
      </div>

      <div className="mx-auto mt-14 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <Reveal key={s.label} delay={0.06 * i}>
              <div className="group h-full rounded-2xl border border-black/[0.07] bg-white/70 p-7 backdrop-blur transition-all duration-300 hover:border-emerald-500/30 hover:bg-white hover:shadow-[0_30px_70px_-50px_rgba(16,185,129,0.5)]">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] text-emerald-600">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="mt-6 font-display text-5xl leading-none tracking-[-0.04em] text-gradient-chrome tabular-nums">
                  {s.value}
                </div>
                <p className="mt-3 text-[13px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                  {s.label}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* --------------------------- 5 · INDUSTRY EXAMPLES --------------------------- */
function IndustryExamples() {
  const examples: {
    icon: LucideIcon;
    industry: string;
    problem: string;
    solution: string;
    outcome: string;
  }[] = [
    {
      icon: Wrench,
      industry: "Plumber",
      problem: "Emergency calls after hours go to voicemail.",
      solution: "AI answers 24/7 and books the urgent callout.",
      outcome: "Captures high-value emergency jobs rivals miss.",
    },
    {
      icon: Stethoscope,
      industry: "Dentist",
      problem: "Front desk is busy with patients in-chair.",
      solution: "AI handles overflow calls and books appointments.",
      outcome: "A fuller calendar and fewer dropped enquiries.",
    },
    {
      icon: Scale,
      industry: "Law Firm",
      problem: "A missed enquiry can mean a lost retainer.",
      solution: "AI qualifies callers and schedules consultations.",
      outcome: "Every potential case captured and triaged.",
    },
    {
      icon: Zap,
      industry: "Electrician",
      problem: "On a job, hands full, can't reach the phone.",
      solution: "AI answers, gives basics and books the visit.",
      outcome: "More booked work without stopping the current job.",
    },
  ];
  return (
    <section className="relative border-t border-black/[0.06] px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <Eyebrow>Industry Examples</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 font-display text-4xl md:text-5xl leading-[1.04] tracking-[-0.03em] text-gradient-chrome">
            Built Around How You Actually Work.
          </h2>
        </Reveal>
      </div>

      <div className="mx-auto mt-14 grid max-w-5xl gap-4 sm:grid-cols-2">
        {examples.map((e, i) => {
          const Icon = e.icon;
          return (
            <Reveal key={e.industry} delay={0.06 * i}>
              <div className="h-full rounded-2xl border border-black/[0.07] bg-white/70 p-7 backdrop-blur transition-all duration-300 hover:border-emerald-500/30 hover:bg-white">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] text-emerald-600">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-display text-xl tracking-tight text-foreground">{e.industry}</span>
                </div>
                <div className="mt-6 space-y-3">
                  <div>
                    <div className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-red-500/80">Problem</div>
                    <div className="mt-1 text-[13.5px] text-muted-foreground">{e.problem}</div>
                  </div>
                  <div>
                    <div className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-muted-foreground/60">Solution</div>
                    <div className="mt-1 text-[13.5px] text-foreground">{e.solution}</div>
                  </div>
                  <div className="flex items-start gap-2 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.05] px-3.5 py-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    <div>
                      <div className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-emerald-700">Outcome</div>
                      <div className="mt-0.5 text-[13.5px] text-foreground">{e.outcome}</div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* ------------------- 6 · RESULTS / SOCIAL PROOF (placeholders) ------------------- */
function ResultsShowcase() {
  return (
    <section className="relative border-t border-black/[0.06] bg-card/30 px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <Eyebrow>Results</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 font-display text-4xl md:text-5xl leading-[1.04] tracking-[-0.03em] text-gradient-chrome">
            Your Results, Front And Centre.
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-5 max-w-lg text-[15px] text-muted-foreground leading-relaxed">
            This is where your client logos, recovered-revenue metrics, before
            &amp; after results and real call recordings will live.
          </p>
        </Reveal>
      </div>

      <div className="mx-auto mt-12 max-w-5xl space-y-4">
        {/* client logos */}
        <Reveal>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <ImagePlaceholder key={i} label="Client Logo" icon={Building2} className="aspect-[3/1] w-full" />
            ))}
          </div>
        </Reveal>
        {/* before/after + recording + metric */}
        <div className="grid gap-4 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <ImagePlaceholder label="Before / After Results" icon={BarChart3} className="aspect-[16/9] h-full w-full" />
          </Reveal>
          <Reveal delay={0.08}>
            <div className="flex h-full flex-col gap-4">
              <ImagePlaceholder label="Call Recording" icon={AudioLines} className="aspect-[16/7] w-full" />
              <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-black/15 bg-card/40 px-4 py-6 text-center">
                <div className="font-display text-4xl tracking-tight text-muted-foreground/40 tabular-nums">00%</div>
                <div className="mt-1 text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground/50">Metric</div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ 7 · FINAL CTA ------------------------------ */
function FinalCta() {
  return (
    <section className="relative isolate overflow-hidden border-t border-white/10 bg-[#0a0b0b] px-6 py-28 text-white lg:py-36">
      <div className="absolute inset-0 -z-10 bg-grid opacity-[0.08] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 mx-auto h-[460px] max-w-3xl -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.2),transparent_70%)] blur-3xl"
      />
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <Eyebrow dark>
            <LiveDot /> Deploy Your AI Front Desk
          </Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-7 font-display text-5xl md:text-7xl leading-[0.98] tracking-[-0.035em]">
            <span className="block bg-gradient-to-b from-white via-white to-white/60 bg-clip-text text-transparent">
              Stop Losing Revenue.
            </span>
            <span className="mt-1 block bg-gradient-to-b from-white via-white to-white/60 bg-clip-text text-transparent">
              Capture Every Lead.
            </span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-white/60">
            Deploy an AI front desk that answers, qualifies and books every call
            — so no opportunity slips through again.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link to="/contact" className={`${primaryCta} inline-flex px-7 py-3.5 text-sm`}>
              Book a Free Consultation
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              to="/demo"
              className="group inline-flex items-center gap-2 rounded-xl border border-white/15 px-7 py-3.5 text-sm font-medium text-white/85 transition-all duration-300 hover:border-white/35 hover:text-white"
            >
              Try The Live Demo
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
