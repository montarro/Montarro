import { createFileRoute, Link } from "@tanstack/react-router";
import { Fragment, useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import {
  ArrowUpRight,
  ArrowDown,
  Phone,
  PhoneMissed,
  PhoneIncoming,
  Voicemail,
  UserX,
  Flag,
  Clock,
  Bot,
  Filter,
  CalendarCheck,
  Database,
  Bell,
  Trophy,
  Check,
  X,
  Headphones,
  Zap,
  BadgeDollarSign,
  TrendingUp,
  Wrench,
  Stethoscope,
  Scale,
  HardHat,
  Search,
  Settings,
  GraduationCap,
  FlaskConical,
  Sparkles,
  Rocket,
  Image as ImageIcon,
  BarChart3,
  AudioLines,
  type LucideIcon,
} from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";
import { primaryCta } from "@/lib/cta";

export const Route = createFileRoute("/consultation")({
  head: () => ({
    meta: [
      { title: "Consultation — Montarro" },
      {
        name: "description",
        content:
          "A premium walkthrough of how Montarro captures every lead — the cost of missed calls, the revenue leak, the system, and the business impact.",
      },
      { property: "og:title", content: "Consultation — Montarro" },
      {
        property: "og:description",
        content: "Your business doesn't have a lead problem. It has a response problem.",
      },
    ],
  }),
  component: ConsultationPage,
});

const RECEPTIONIST_TEL = "+610345145084";

/* --------------------------------- helpers --------------------------------- */
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
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
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
      <div className={`flex flex-col items-center gap-2 ${dark ? "text-white/40" : "text-muted-foreground/50"}`}>
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
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * target));
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

function ConsultationPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <SiteNav />
      <main>
        <Opening />
        <HiddenCost />
        <RevenueLeak />
        <Comparison />
        <TheSystem />
        <LiveDemonstration />
        <BusinessImpact />
        <IndustryExamples />
        <Implementation />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}

/* ----------------------------- 1 · OPENING ----------------------------- */
function Opening() {
  return (
    <section className="relative isolate overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-24">
      <div className="absolute inset-0 -z-10 bg-grid opacity-50 [mask-image:radial-gradient(ellipse_at_top,black_25%,transparent_72%)]" />
      <div className="absolute inset-0 -z-10 bg-radial-glow" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 mx-auto h-[420px] max-w-3xl rounded-full bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.06),transparent_70%)] blur-3xl" />

      <div className="mx-auto max-w-5xl px-6 text-center">
        <Reveal delay={0.05}>
          <Eyebrow>
            <LiveDot /> The Consultation
          </Eyebrow>
        </Reveal>
        <Reveal delay={0.15}>
          <h1 className="font-display text-balance mx-auto mt-7 max-w-[16ch] text-[clamp(2.4rem,6.6vw,5.5rem)] leading-[0.98] tracking-[-0.045em] text-gradient-chrome">
            Your Business Doesn&rsquo;t Have A Lead Problem.{" "}
            <span className="text-emerald-600">It Has A Response Problem.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.28}>
          <p className="mx-auto mt-7 max-w-xl text-pretty text-base md:text-lg text-muted-foreground leading-relaxed">
            Most businesses lose opportunities before they ever get the chance to sell.
          </p>
        </Reveal>
        <Reveal delay={0.4}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link to="/contact" className={`${primaryCta} inline-flex px-6 py-3 text-sm`}>
              Book a Free Consultation
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <a
              href={`tel:${RECEPTIONIST_TEL}`}
              className="group inline-flex items-center gap-2 rounded-xl border border-border bg-card/40 px-6 py-3 text-sm font-medium backdrop-blur transition-all duration-300 hover:border-foreground/40 hover:bg-card"
            >
              <Phone className="h-4 w-4" />
              Test The Receptionist
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.5}>
          <ImagePlaceholder
            label="Presentation Hero Visual"
            icon={BarChart3}
            className="mx-auto mt-14 aspect-[16/8] w-full max-w-4xl"
          />
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------- 2 · THE HIDDEN COST --------------------------- */
function HiddenCost() {
  const sequence: { icon: LucideIcon; label: string }[] = [
    { icon: PhoneMissed, label: "Missed Call" },
    { icon: Voicemail, label: "Voicemail" },
    { icon: UserX, label: "Customer Leaves" },
    { icon: Flag, label: "Competitor Answers" },
    { icon: BadgeDollarSign, label: "Revenue Lost" },
  ];
  return (
    <section className="relative isolate overflow-hidden border-t border-white/10 bg-[#0a0b0b] px-6 py-24 text-white lg:py-32">
      <div className="absolute inset-0 -z-10 bg-grid opacity-[0.06] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_72%)]" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-10 left-1/2 -z-10 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.12),transparent_70%)] blur-3xl"
      />
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <Eyebrow dark>The Hidden Cost</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mx-auto mt-6 max-w-[20ch] font-display text-4xl md:text-6xl leading-[1.0] tracking-[-0.035em]">
            <span className="bg-gradient-to-b from-white via-white to-white/65 bg-clip-text text-transparent">
              Every Missed Call Is Revenue You&rsquo;ll Never Get Back.
            </span>
          </h2>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-white/55">
            It takes five seconds for an opportunity to become someone else&rsquo;s customer.
          </p>
        </Reveal>
      </div>

      <div className="mx-auto mt-14 flex max-w-5xl flex-col items-stretch gap-3 lg:flex-row lg:items-center">
        {sequence.map((s, i) => {
          const Icon = s.icon;
          const last = i === sequence.length - 1;
          return (
            <Fragment key={s.label}>
              <Reveal delay={0.08 * i} className="flex-1">
                <div
                  className={`flex h-full flex-col items-center gap-3 rounded-2xl border px-4 py-7 text-center backdrop-blur ${
                    last
                      ? "border-red-500/30 bg-red-500/[0.06]"
                      : "border-white/10 bg-white/[0.02]"
                  }`}
                >
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-xl border ${
                      last
                        ? "border-red-500/30 bg-red-500/[0.08] text-red-400"
                        : "border-white/10 bg-white/[0.03] text-white/70"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className={`text-[13px] font-medium ${last ? "text-red-300" : "text-white/80"}`}>
                    {s.label}
                  </span>
                </div>
              </Reveal>
              {!last && (
                <div className="flex shrink-0 items-center justify-center text-white/25">
                  <ArrowDown className="h-5 w-5 lg:hidden" />
                  <ArrowUpRight className="hidden h-5 w-5 rotate-45 lg:block" />
                </div>
              )}
            </Fragment>
          );
        })}
      </div>
    </section>
  );
}

/* ----------------------- 3 · REVENUE LEAK VISUALISATION ----------------------- */
function RevenueLeak() {
  const leaks: { icon: LucideIcon; label: string; pct: number }[] = [
    { icon: Clock, label: "After-Hours Enquiries", pct: 24 },
    { icon: PhoneMissed, label: "Missed Calls", pct: 20 },
    { icon: TrendingUp, label: "Slow Follow-Up", pct: 16 },
    { icon: Settings, label: "Admin Bottlenecks", pct: 12 },
    { icon: Filter, label: "Unqualified Enquiries", pct: 10 },
  ];
  const captured = 100 - leaks.reduce((s, l) => s + l.pct, 0);
  return (
    <section className="relative border-t border-black/[0.06] bg-card/30 px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <Eyebrow>Revenue Leak</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mx-auto mt-6 max-w-[20ch] font-display text-4xl md:text-5xl leading-[1.04] tracking-[-0.03em] text-gradient-chrome">
            Where The Money Quietly Disappears.
          </h2>
        </Reveal>
      </div>

      <Reveal delay={0.12}>
        <div className="mx-auto mt-14 max-w-4xl">
          <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-muted-foreground/60">
            <span>A month of demand</span>
            <span className="text-emerald-700">Captured today</span>
          </div>
          <div className="mt-3 flex h-6 w-full overflow-hidden rounded-full border border-black/[0.07] bg-card/50">
            {leaks.map((l, i) => (
              <motion.div
                key={l.label}
                initial={{ width: 0 }}
                whileInView={{ width: `${l.pct}%` }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="h-full border-r border-white/40 bg-red-500/30"
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

      <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {leaks.map((l, i) => {
          const Icon = l.icon;
          return (
            <Reveal key={l.label} delay={0.06 * i}>
              <div className="flex h-full flex-col gap-2 rounded-2xl border border-black/[0.07] bg-white/70 p-4 backdrop-blur">
                <div className="flex items-center justify-between">
                  <Icon className="h-4 w-4 text-red-500/80" />
                  <span className="font-display text-lg tabular-nums text-red-600">−{l.pct}%</span>
                </div>
                <span className="text-[12.5px] leading-snug text-muted-foreground">{l.label}</span>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* -------------------- 4 · WITHOUT vs WITH MONTARRO -------------------- */
function Comparison() {
  const without = ["Missed calls", "Voicemail", "Lost leads", "Manual admin", "Slow response"];
  const withUs = [
    "Instant answer",
    "Lead qualification",
    "Appointment booking",
    "CRM updates",
    "Immediate notifications",
  ];
  return (
    <section className="relative border-t border-black/[0.06] px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <Eyebrow>The Difference</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 font-display text-4xl md:text-5xl leading-[1.04] tracking-[-0.03em] text-gradient-chrome">
            Without Montarro vs With Montarro.
          </h2>
        </Reveal>
      </div>

      <div className="mx-auto mt-14 grid max-w-4xl gap-4 md:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-2xl border border-white/10 bg-[#0a0b0b] p-7 text-white">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/55">
              <X className="h-4 w-4 text-red-400" /> Without Montarro
            </div>
            <ul className="mt-6 space-y-3.5">
              {without.map((t) => (
                <li key={t} className="flex items-center gap-3 text-[14.5px] text-white/70">
                  <X className="h-4 w-4 shrink-0 text-red-400/80" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative h-full overflow-hidden rounded-2xl border border-emerald-500/25 bg-white/85 p-7 shadow-[0_30px_80px_-50px_rgba(16,185,129,0.5)]">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{ background: "linear-gradient(to right, transparent, rgba(16,185,129,0.5), transparent)" }}
            />
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-emerald-700">
              <Check className="h-4 w-4 text-emerald-500" /> With Montarro
            </div>
            <ul className="mt-6 space-y-3.5">
              {withUs.map((t) => (
                <li key={t} className="flex items-center gap-3 text-[14.5px] text-foreground">
                  <Check className="h-4 w-4 shrink-0 text-emerald-500" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------- 5 · THE MONTARRO SYSTEM --------------------------- */
function TheSystem() {
  const steps: { icon: LucideIcon; title: string }[] = [
    { icon: PhoneIncoming, title: "Call Comes In" },
    { icon: Bot, title: "AI Answers" },
    { icon: Filter, title: "AI Qualifies" },
    { icon: CalendarCheck, title: "AI Books" },
    { icon: Database, title: "CRM Updated" },
    { icon: Bell, title: "Team Notified" },
    { icon: Trophy, title: "Job Won" },
  ];
  return (
    <section className="relative border-t border-black/[0.06] px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <Eyebrow>The Montarro System</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 font-display text-4xl md:text-5xl leading-[1.04] tracking-[-0.03em] text-gradient-chrome">
            One Call. Seven Steps. A Won Job.
          </h2>
        </Reveal>
      </div>

      <div className="relative mx-auto mt-14 max-w-2xl">
        <div aria-hidden className="absolute left-[27px] top-2 bottom-2 w-px bg-gradient-to-b from-emerald-500/10 via-emerald-500/40 to-emerald-500/10" />
        <div className="space-y-3">
          {steps.map((s, i) => {
            const Icon = s.icon;
            const last = i === steps.length - 1;
            return (
              <Reveal key={s.title} delay={0.05 * i}>
                <div
                  className={`relative flex items-center gap-4 rounded-2xl border px-5 py-4 backdrop-blur ${
                    last
                      ? "border-emerald-500/30 bg-emerald-500/[0.06]"
                      : "border-black/[0.07] bg-white/70"
                  }`}
                >
                  <span
                    className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border ${
                      last
                        ? "border-emerald-500/40 bg-emerald-500/[0.1] text-emerald-600"
                        : "border-emerald-500/20 bg-emerald-500/[0.06] text-emerald-600"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground/60 tabular-nums">
                      Step {i + 1}
                    </div>
                    <div className="text-[15px] font-medium text-foreground">{s.title}</div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- 6 · LIVE DEMONSTRATION --------------------------- */
function LiveDemonstration() {
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
            <LiveDot /> Live Demonstration
          </Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-7 font-display text-5xl md:text-7xl leading-[0.98] tracking-[-0.035em]">
            <span className="bg-gradient-to-b from-white via-white to-white/60 bg-clip-text text-transparent">
              Experience It Yourself.
            </span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-white/60">
            Don&rsquo;t imagine it. Call the AI receptionist live, or hear it handle real calls.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a href={`tel:${RECEPTIONIST_TEL}`} className={`${primaryCta} inline-flex px-7 py-3.5 text-sm`}>
              <Phone className="h-4 w-4" />
              Test The Receptionist
            </a>
            <Link
              to="/demo"
              className="group inline-flex items-center gap-2 rounded-xl border border-white/15 px-7 py-3.5 text-sm font-medium text-white/85 transition-all duration-300 hover:border-white/35 hover:text-white"
            >
              <AudioLines className="h-4 w-4" />
              Listen To Example Calls
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------- 7 · BUSINESS IMPACT --------------------------- */
function BusinessImpact() {
  return (
    <section className="relative border-t border-black/[0.06] px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <Eyebrow>Business Impact</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mx-auto mt-6 max-w-[20ch] font-display text-4xl md:text-5xl leading-[1.04] tracking-[-0.03em] text-gradient-chrome">
            What Happens When Every Lead Is Captured?
          </h2>
        </Reveal>
      </div>

      {/* asymmetric bento — not identical KPI cards */}
      <div className="mx-auto mt-14 grid max-w-5xl gap-4 md:grid-cols-3">
        <Reveal className="md:row-span-2">
          <div className="flex h-full flex-col justify-between rounded-3xl border border-emerald-500/20 bg-gradient-to-b from-emerald-500/[0.06] to-transparent p-8 backdrop-blur">
            <div>
              <Headphones className="h-5 w-5 text-emerald-600" />
              <div className="mt-6 font-display text-7xl leading-none tracking-[-0.04em] text-gradient-chrome">24/7</div>
              <p className="mt-3 text-[14px] text-muted-foreground">Coverage — every call answered, day or night.</p>
            </div>
            <ImagePlaceholder label="CRM Dashboard" icon={BarChart3} className="mt-8 aspect-[16/9] w-full" />
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="h-full rounded-3xl border border-black/[0.07] bg-white/70 p-7 backdrop-blur">
            <Zap className="h-5 w-5 text-emerald-600" />
            <div className="mt-5 font-display text-5xl leading-none tracking-[-0.04em] text-gradient-chrome">&lt;1s</div>
            <p className="mt-2 text-[13.5px] text-muted-foreground">Response time on every call.</p>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="h-full rounded-3xl border border-black/[0.07] bg-white/70 p-7 backdrop-blur">
            <TrendingUp className="h-5 w-5 text-emerald-600" />
            <div className="mt-5 font-display text-5xl leading-none tracking-[-0.04em] text-gradient-chrome">
              <CountUp to={40} suffix="%+" />
            </div>
            <p className="mt-2 text-[13.5px] text-muted-foreground">More leads captured.</p>
          </div>
        </Reveal>

        <Reveal delay={0.16} className="md:col-span-2">
          <div className="flex h-full flex-wrap items-center justify-between gap-6 rounded-3xl border border-black/[0.07] bg-white/70 p-7 backdrop-blur">
            <div className="flex items-center gap-3">
              <CalendarCheck className="h-5 w-5 text-emerald-600" />
              <span className="text-[15px] font-medium text-foreground">More Appointments Booked</span>
            </div>
            <div className="h-8 w-px bg-black/10" />
            <div className="flex items-center gap-3">
              <BadgeDollarSign className="h-5 w-5 text-emerald-600" />
              <span className="text-[15px] font-medium text-foreground">More Revenue Recovered</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------- 8 · INDUSTRY EXAMPLES --------------------------- */
function IndustryExamples() {
  const examples: { icon: LucideIcon; industry: string; image: string; scenario: string; outcome: string }[] = [
    { icon: Wrench, industry: "Plumbing", image: "Tradie On-Site", scenario: "After-hours burst-pipe call.", outcome: "Booked as an emergency job — that night." },
    { icon: Zap, industry: "Electrical", image: "Electrician Van", scenario: "On a job, can't reach the phone.", outcome: "AI books the next visit without missing a beat." },
    { icon: Stethoscope, industry: "Dentists", image: "Dental Clinic", scenario: "Front desk swamped at peak hours.", outcome: "Overflow calls answered, calendar stays full." },
    { icon: Scale, industry: "Law Firms", image: "Law Office", scenario: "New-client enquiry after close.", outcome: "Qualified and a consult scheduled instantly." },
    { icon: HardHat, industry: "Construction", image: "Job Site", scenario: "Quote requests pile up unread.", outcome: "Each caller captured, triaged and followed up." },
  ];
  return (
    <section className="relative border-t border-black/[0.06] bg-card/30 px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <Eyebrow>Industry Examples</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 font-display text-4xl md:text-5xl leading-[1.04] tracking-[-0.03em] text-gradient-chrome">
            Real Scenarios. Real Outcomes.
          </h2>
        </Reveal>
      </div>

      <div className="mx-auto mt-14 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {examples.map((e, i) => {
          const Icon = e.icon;
          return (
            <Reveal key={e.industry} delay={0.06 * i}>
              <div className="h-full overflow-hidden rounded-2xl border border-black/[0.07] bg-white/70 backdrop-blur transition-all duration-300 hover:border-emerald-500/30 hover:bg-white">
                <ImagePlaceholder label={e.image} icon={e.icon} className="aspect-[16/9] w-full rounded-b-none border-x-0 border-t-0" />
                <div className="p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/[0.06] text-emerald-600">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="font-display text-lg tracking-tight text-foreground">{e.industry}</span>
                  </div>
                  <p className="mt-4 text-[13.5px] text-muted-foreground">{e.scenario}</p>
                  <div className="mt-3 flex items-start gap-2 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.05] px-3.5 py-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    <span className="text-[13.5px] text-foreground">{e.outcome}</span>
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

/* --------------------------- 9 · IMPLEMENTATION --------------------------- */
function Implementation() {
  const plan: { week: string; items: { icon: LucideIcon; label: string }[] }[] = [
    {
      week: "Week 1",
      items: [
        { icon: Search, label: "Discovery" },
        { icon: Settings, label: "Setup" },
        { icon: GraduationCap, label: "Training" },
      ],
    },
    {
      week: "Week 2",
      items: [
        { icon: FlaskConical, label: "Testing" },
        { icon: Sparkles, label: "Optimisation" },
        { icon: Rocket, label: "Launch" },
      ],
    },
  ];
  return (
    <section className="relative border-t border-black/[0.06] px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <Eyebrow>Implementation</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 font-display text-4xl md:text-5xl leading-[1.04] tracking-[-0.03em] text-gradient-chrome">
            Live In Two Weeks.
          </h2>
        </Reveal>
      </div>

      <div className="mx-auto mt-14 grid max-w-4xl gap-4 md:grid-cols-2">
        {plan.map((p, wi) => (
          <Reveal key={p.week} delay={0.1 * wi}>
            <div className="h-full rounded-2xl border border-black/[0.07] bg-white/70 p-7 backdrop-blur">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-emerald-700">
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-emerald-500/25 bg-emerald-500/[0.08] font-display text-[12px] tabular-nums text-emerald-700">
                  {wi + 1}
                </span>
                {p.week}
              </div>
              <div className="mt-6 space-y-3">
                {p.items.map((it) => {
                  const Icon = it.icon;
                  return (
                    <div key={it.label} className="flex items-center gap-3 rounded-xl border border-black/[0.06] bg-card/40 px-4 py-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/[0.06] text-emerald-600">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="text-[14.5px] font-medium text-foreground">{it.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------ 10 · FINAL CTA ------------------------------ */
function FinalCta() {
  return (
    <section className="relative isolate overflow-hidden border-t border-white/10 bg-[#0a0b0b] px-6 py-28 text-white lg:py-40">
      <div className="absolute inset-0 -z-10 bg-grid opacity-[0.08] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 mx-auto h-[520px] max-w-4xl -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.22),transparent_70%)] blur-3xl"
      />
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <Eyebrow dark>
            <LiveDot /> The Real Question
          </Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mx-auto mt-7 max-w-[22ch] font-display text-4xl md:text-6xl leading-[1.02] tracking-[-0.035em]">
            <span className="bg-gradient-to-b from-white via-white to-white/60 bg-clip-text text-transparent">
              The Question Isn&rsquo;t Whether You Can Afford This. It&rsquo;s Whether You Can Afford To Keep Missing Leads.
            </span>
          </h2>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link to="/contact" className={`${primaryCta} inline-flex px-7 py-3.5 text-sm`}>
              Book A Free Consultation
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <a
              href={`tel:${RECEPTIONIST_TEL}`}
              className="group inline-flex items-center gap-2 rounded-xl border border-white/15 px-7 py-3.5 text-sm font-medium text-white/85 transition-all duration-300 hover:border-white/35 hover:text-white"
            >
              <Phone className="h-4 w-4" />
              Test The Receptionist
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
