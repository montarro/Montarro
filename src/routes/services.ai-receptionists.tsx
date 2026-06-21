import { createFileRoute, Link } from "@tanstack/react-router";
import { Fragment, useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
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
  Clock,
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

function useCountUp(target: number, start: boolean, duration = 1200) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);
  return val;
}

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const val = useCountUp(to, inView);
  return (
    <span ref={ref} className="tabular-nums">
      {val}
      {suffix}
    </span>
  );
}

function AiReceptionistPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <SiteNav />
      <main>
        <Hero />
        <Problem />
        <RevenueLeak />
        <CostOfMissedCall />
        <RevenueRecoverySystem />
        <IndustryExamples />
        <BusinessImpact />
        <ResultsShowcase />
        <LiveDemo />
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
            <div className="mt-8 hidden gap-4 lg:grid lg:grid-cols-2">
              <ImagePlaceholder label="Customer Calling After-Hours" icon={Moon} className="aspect-[3/4] w-full" />
              <ImagePlaceholder label="Busy Office Receptionist" icon={Users} className="aspect-[3/4] w-full" />
            </div>
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

      <Reveal delay={0.25}>
        <ImagePlaceholder
          label="Booking Confirmation Screen"
          icon={CalendarCheck}
          className="mx-auto mt-10 aspect-[16/7] w-full max-w-3xl"
        />
      </Reveal>
    </section>
  );
}

/* --------------------------- 4 · BUSINESS IMPACT --------------------------- */
function BusinessImpact() {
  const kpis: { node: React.ReactNode; label: string; icon: LucideIcon }[] = [
    { node: <CountUp to={40} suffix="%+" />, label: "More Leads Captured", icon: TrendingUp },
    { node: "24/7", label: "Coverage", icon: Headphones },
    { node: "<1s", label: "Response Time", icon: Zap },
  ];
  const bars = [26, 38, 34, 50, 58, 72, 90];
  return (
    <section className="relative isolate overflow-hidden border-t border-white/10 bg-[#0a0b0b] px-6 py-24 text-white lg:py-32">
      <div className="absolute inset-0 -z-10 bg-grid opacity-[0.07] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_72%)]" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-10 left-1/2 -z-10 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.18),transparent_70%)] blur-3xl"
      />

      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <Eyebrow dark>
            <LiveDot /> Business Impact
          </Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mx-auto mt-6 max-w-[20ch] font-display text-4xl md:text-6xl leading-[1.0] tracking-[-0.035em]">
            <span className="bg-gradient-to-b from-white via-white to-white/65 bg-clip-text text-transparent">
              The Numbers That Move The Business.
            </span>
          </h2>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-white/55">
            Most businesses don&rsquo;t realise how much revenue slips away
            through missed calls, slow responses, and manual handling.
          </p>
        </Reveal>
      </div>

      {/* enterprise dashboard panel */}
      <Reveal delay={0.1}>
        <div className="relative mx-auto mt-14 max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.01] p-6 backdrop-blur-xl shadow-[0_60px_140px_-60px_rgba(0,0,0,0.9)] sm:p-8">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{ background: "linear-gradient(to right, transparent, rgba(16,185,129,0.4), transparent)" }}
          />
          <div className="grid gap-8 lg:grid-cols-5">
            {/* featured metric + revenue-growth visual */}
            <div className="flex flex-col justify-between lg:col-span-2">
              <div>
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-emerald-300/80">
                  <BadgeDollarSign className="h-3.5 w-3.5" /> Recovered Revenue
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-4 font-display text-7xl leading-none tracking-[-0.045em] md:text-8xl"
                >
                  <span className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">30–50%</span>
                </motion.div>
                <p className="mt-3 max-w-xs text-[13.5px] leading-relaxed text-white/55">
                  Of previously missed revenue, recovered — every month.
                </p>
              </div>
              <div className="mt-8 flex h-24 items-end gap-2">
                {bars.map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0, opacity: 0 }}
                    whileInView={{ height: `${h}%`, opacity: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.8, delay: 0.15 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className="flex-1 rounded-t bg-gradient-to-t from-emerald-600/30 to-emerald-400"
                  />
                ))}
              </div>
            </div>

            {/* supporting KPI strip + CRM dashboard placeholder */}
            <div className="flex flex-col gap-4 lg:col-span-3">
              <div className="grid grid-cols-1 divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                {kpis.map((k) => {
                  const Icon = k.icon;
                  return (
                    <div key={k.label} className="px-5 py-6 text-center">
                      <Icon className="mx-auto h-4 w-4 text-emerald-400/80" />
                      <div className="mt-3 font-display text-4xl leading-none tracking-[-0.03em] text-white">
                        {k.node}
                      </div>
                      <div className="mt-2 text-[11px] font-medium uppercase tracking-[0.14em] text-white/45">
                        {k.label}
                      </div>
                    </div>
                  );
                })}
              </div>
              <ImagePlaceholder dark label="CRM Dashboard" icon={BarChart3} className="aspect-[16/9] w-full flex-1" />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* --------------------------- 5 · INDUSTRY EXAMPLES --------------------------- */
function IndustryExamples() {
  const examples: {
    icon: LucideIcon;
    industry: string;
    image: string;
    problem: string;
    solution: string;
    outcome: string;
  }[] = [
    {
      icon: Wrench,
      industry: "Plumber",
      image: "Tradie On-Site Taking Calls",
      problem: "Emergency calls after hours go to voicemail.",
      solution: "AI answers 24/7 and books the urgent callout.",
      outcome: "Captures high-value emergency jobs rivals miss.",
    },
    {
      icon: Stethoscope,
      industry: "Dentist",
      image: "Dentist Front Desk",
      problem: "Front desk is busy with patients in-chair.",
      solution: "AI handles overflow calls and books appointments.",
      outcome: "A fuller calendar and fewer dropped enquiries.",
    },
    {
      icon: Scale,
      industry: "Law Firm",
      image: "Lawyer Office",
      problem: "A missed enquiry can mean a lost retainer.",
      solution: "AI qualifies callers and schedules consultations.",
      outcome: "Every potential case captured and triaged.",
    },
    {
      icon: Zap,
      industry: "Electrician",
      image: "Electrician In Work Van",
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
              <div className="h-full overflow-hidden rounded-2xl border border-black/[0.07] bg-white/70 backdrop-blur transition-all duration-300 hover:border-emerald-500/30 hover:bg-white">
                <ImagePlaceholder label={e.image} icon={e.icon} className="aspect-[16/9] w-full rounded-b-none border-x-0 border-t-0" />
                <div className="p-7">
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

/* -------------------- REVENUE LEAK VISUALISATION -------------------- */
function RevenueLeak() {
  const leaks: { icon: LucideIcon; label: string; pct: number }[] = [
    { icon: Moon, label: "After-Hours Calls", pct: 22 },
    { icon: Voicemail, label: "Voicemails", pct: 18 },
    { icon: Users, label: "Busy Staff", pct: 16 },
    { icon: Clock, label: "Missed Follow-Ups", pct: 14 },
    { icon: TrendingUp, label: "Slow Responses", pct: 12 },
  ];
  const captured = 100 - leaks.reduce((s, l) => s + l.pct, 0);
  return (
    <section className="relative isolate overflow-hidden border-t border-white/10 bg-[#0a0b0b] px-6 py-24 text-white lg:py-32">
      <div className="absolute inset-0 -z-10 bg-grid opacity-[0.06] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_72%)]" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-10 left-1/2 -z-10 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.12),transparent_70%)] blur-3xl"
      />
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <Eyebrow dark>Revenue Leak</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mx-auto mt-6 max-w-[20ch] font-display text-4xl md:text-6xl leading-[1.0] tracking-[-0.035em]">
            <span className="bg-gradient-to-b from-white via-white to-white/65 bg-clip-text text-transparent">
              Where Your Revenue Quietly Leaks Away.
            </span>
          </h2>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-white/55">
            Picture a month of inbound demand. Here&rsquo;s where most of it
            disappears — long before anyone talks price.
          </p>
        </Reveal>
      </div>

      {/* stacked leak bar */}
      <Reveal delay={0.12}>
        <div className="mx-auto mt-14 max-w-4xl">
          <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-white/45">
            <span>A month of demand</span>
            <span className="text-emerald-300/80">Captured today</span>
          </div>
          <div className="mt-3 flex h-5 w-full overflow-hidden rounded-full border border-white/10 bg-white/[0.03]">
            {leaks.map((l, i) => (
              <motion.div
                key={l.label}
                initial={{ width: 0 }}
                whileInView={{ width: `${l.pct}%` }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="h-full border-r border-black/30 bg-red-500/35"
                style={{ opacity: 1 - i * 0.1 }}
              />
            ))}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${captured}%` }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.1 + leaks.length * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400"
            />
          </div>
        </div>
      </Reveal>

      {/* leak legend */}
      <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {leaks.map((l, i) => {
          const Icon = l.icon;
          return (
            <Reveal key={l.label} delay={0.06 * i}>
              <div className="flex h-full flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.02] p-4 backdrop-blur">
                <div className="flex items-center justify-between">
                  <Icon className="h-4 w-4 text-red-400/80" />
                  <span className="font-display text-lg tabular-nums text-red-400/90">−{l.pct}%</span>
                </div>
                <span className="text-[12.5px] leading-snug text-white/65">{l.label}</span>
              </div>
            </Reveal>
          );
        })}
      </div>
      <Reveal delay={0.2}>
        <p className="mx-auto mt-10 max-w-md text-center text-[14px] text-white/55">
          That&rsquo;s up to{" "}
          <span className="font-medium text-white">{100 - captured}% of your pipeline</span>{" "}
          — gone to the business that answered first.
        </p>
      </Reveal>
    </section>
  );
}

/* -------------------------- LIVE DEMO (anticipation) -------------------------- */
function LiveDemo() {
  const convo: { who: "ai" | "caller"; text: string }[] = [
    { who: "caller", text: "Hi, do you do emergency callouts tonight?" },
    { who: "ai", text: "We do. What suburb are you in, and what's happening?" },
    { who: "caller", text: "Brunswick — burst pipe under the sink." },
    { who: "ai", text: "Booked — a plumber will be there by 7:30pm. SMS confirmation sent." },
  ];
  return (
    <section className="relative isolate overflow-hidden border-t border-white/10 bg-[#0a0b0b] px-6 py-24 text-white lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 mx-auto h-[420px] max-w-3xl rounded-full bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.16),transparent_70%)] blur-3xl"
      />
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div>
          <Reveal>
            <Eyebrow dark>
              <LiveDot /> Live Demo
            </Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-4xl md:text-6xl leading-[1.0] tracking-[-0.03em]">
              <span className="bg-gradient-to-b from-white via-white to-white/65 bg-clip-text text-transparent">
                Don&rsquo;t Take Our Word For It.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/60">
              Hear the AI handle a real call — answer, qualify and book — in
              seconds. Then imagine it working every hour you&rsquo;re closed.
            </p>
          </Reveal>
          <Reveal delay={0.26}>
            <Link to="/demo" className={`${primaryCta} mt-8 inline-flex px-7 py-3.5 text-sm`}>
              Open The Live Demo
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-5 backdrop-blur-xl shadow-[0_40px_100px_-50px_rgba(0,0,0,0.85)] sm:p-6">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{ background: "linear-gradient(to right, transparent, rgba(16,185,129,0.45), transparent)" }}
            />
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3.5 text-[11px] uppercase tracking-[0.18em] text-white/55">
              <span className="flex items-center gap-2">
                <Bot className="h-3.5 w-3.5 text-emerald-400" /> Sample Call
              </span>
              <span className="flex items-center gap-2 text-emerald-300/80">
                <LiveDot /> Live
              </span>
            </div>
            <div className="mt-4 space-y-3">
              {convo.map((m, i) => (
                <div key={i} className={`flex ${m.who === "caller" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[82%] rounded-2xl border px-3.5 py-2.5 text-[13px] leading-snug ${
                      m.who === "ai"
                        ? "border-emerald-500/15 bg-emerald-500/[0.06] text-white/90"
                        : "border-white/10 bg-white/[0.05] text-white/80"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2 border-t border-white/[0.06] pt-3 text-[11px] text-emerald-300/80">
              <CalendarCheck className="h-3.5 w-3.5" /> Appointment booked · 7:30pm · SMS sent
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------ FINAL CTA ------------------------------ */
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
