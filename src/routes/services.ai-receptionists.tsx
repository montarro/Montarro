import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  ArrowDown,
  Phone,
  PhoneCall,
  PhoneIncoming,
  PhoneMissed,
  UserX,
  TrendingDown,
  TrendingUp,
  Bot,
  Filter,
  CalendarCheck,
  Database,
  Bell,
  Check,
  X,
  Clock,
  Wrench,
  Zap,
  Stethoscope,
  Scale,
  Home,
  HardHat,
  Headphones,
  Rocket,
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
          "An AI receptionist that answers, qualifies and books appointments 24/7 — so plumbers, electricians, dentists, lawyers and local service businesses never miss a call or a customer again.",
      },
      { property: "og:title", content: "Every Call Answered. Every Lead Captured. — Montarro" },
      {
        property: "og:description",
        content:
          "Stop losing revenue to missed calls. An AI receptionist that answers, qualifies and books — 24/7.",
      },
    ],
  }),
  component: AiReceptionistPage,
});

const RECEPTIONIST_TEL = "+610345145084";

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

function AiReceptionistPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <SiteNav />
      <main>
        <Hero />
        <HiddenCost />
        <HowItWorks />
        <LiveDemonstration />
        <BeforeAfter />
        <BusinessImpact />
        <WhoThisIsFor />
        <Deployment />
      </main>
      <SiteFooter />
    </div>
  );
}

/* ----------------------------- 1 · HERO ----------------------------- */
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

/* -------------------- 2 · THE HIDDEN COST OF MISSED CALLS -------------------- */
function HiddenCost() {
  const funnel: { icon: LucideIcon; value: string; label: string; danger?: boolean }[] = [
    { icon: PhoneIncoming, value: "100", label: "Inbound calls a month" },
    { icon: PhoneMissed, value: "20", label: "Go unanswered", danger: true },
    { icon: UserX, value: "4", label: "Customers lost to a competitor", danger: true },
    { icon: TrendingDown, value: "Thousands", label: "In revenue, gone — every month", danger: true },
  ];
  return (
    <section className="relative border-t border-black/[0.06] px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <Eyebrow>The Hidden Cost</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mx-auto mt-6 max-w-[20ch] font-display text-4xl md:text-5xl leading-[1.04] tracking-[-0.03em] text-gradient-chrome">
            The Calls You&rsquo;re Missing Are Costing You More Than You Think.
          </h2>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="mx-auto mt-5 max-w-xl text-[15px] text-muted-foreground leading-relaxed">
            Every call that rings out is a customer who calls the next business
            on the list. It adds up faster than most owners realise.
          </p>
        </Reveal>
      </div>

      <div className="mx-auto mt-14 flex max-w-md flex-col items-stretch gap-0">
        {funnel.map((step, i) => {
          const Icon = step.icon;
          return (
            <Reveal key={step.label} delay={0.08 * i}>
              <div
                className={`relative flex items-center gap-4 rounded-2xl border px-5 py-5 backdrop-blur ${
                  step.danger
                    ? "border-red-500/20 bg-red-500/[0.03]"
                    : "border-black/[0.07] bg-white/70"
                } shadow-[0_1px_0_0_rgba(255,255,255,0.8)_inset,0_24px_50px_-40px_rgba(0,0,0,0.3)]`}
              >
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${
                    step.danger
                      ? "border-red-500/25 bg-red-500/[0.06] text-red-500"
                      : "border-black/[0.08] bg-card/50 text-foreground"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <div className="text-left">
                  <div
                    className={`font-display text-2xl tracking-tight tabular-nums ${
                      step.danger ? "text-red-600" : "text-foreground"
                    }`}
                  >
                    {step.value}
                  </div>
                  <div className="text-[13px] text-muted-foreground">{step.label}</div>
                </div>
              </div>
              {i < funnel.length - 1 && (
                <div className="flex justify-center py-2">
                  <ArrowDown className="h-4 w-4 text-muted-foreground/40" />
                </div>
              )}
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* ----------------------- 3 · HOW THE SYSTEM WORKS ----------------------- */
function HowItWorks() {
  const steps: { icon: LucideIcon; label: string }[] = [
    { icon: Phone, label: "Customer Calls" },
    { icon: Bot, label: "AI Answers Instantly" },
    { icon: Filter, label: "Qualifies Lead" },
    { icon: CalendarCheck, label: "Books Appointment" },
    { icon: Database, label: "Updates CRM" },
    { icon: Bell, label: "Business Gets Notified" },
  ];
  return (
    <section className="relative border-t border-black/[0.06] bg-card/30 px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <Eyebrow>How It Works</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mx-auto mt-6 max-w-[18ch] font-display text-4xl md:text-5xl leading-[1.04] tracking-[-0.03em] text-gradient-chrome">
            One Call. Handled Start To Finish.
          </h2>
        </Reveal>
      </div>

      <div className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <Reveal key={step.label} delay={0.06 * i}>
              <div className="group flex h-full flex-col items-center gap-3 rounded-2xl border border-black/[0.07] bg-white/70 px-4 py-6 text-center backdrop-blur transition-all duration-300 hover:border-emerald-500/30 hover:bg-white">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] text-emerald-600">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground/60 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[13px] font-medium leading-snug text-foreground">
                  {step.label}
                </span>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* ----------------------- 4 · LIVE DEMONSTRATION ----------------------- */
function LiveDemonstration() {
  const convo: { who: "ai" | "caller"; text: string }[] = [
    { who: "caller", text: "Hi, do you do emergency callouts tonight?" },
    { who: "ai", text: "We do. What suburb are you in, and what's happening?" },
    { who: "caller", text: "Brunswick — burst pipe under the sink." },
    { who: "ai", text: "Got it. I can book a plumber for 7:30pm tonight. Shall I lock it in?" },
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
              <LiveDot /> Live Demonstration
            </Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-4xl md:text-6xl leading-[1.0] tracking-[-0.03em]">
              <span className="bg-gradient-to-b from-white via-white to-white/65 bg-clip-text text-transparent">
                Experience It Yourself.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/60">
              Don&rsquo;t take our word for it. Call the AI receptionist right now,
              or watch the full system in action.
            </p>
          </Reveal>
          <Reveal delay={0.26}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href={`tel:${RECEPTIONIST_TEL}`} className={`${primaryCta} inline-flex px-6 py-3.5 text-sm`}>
                <Phone className="h-4 w-4" />
                Test The Receptionist
              </a>
              <Link
                to="/demo"
                className="group inline-flex items-center gap-2 rounded-xl border border-white/15 px-6 py-3.5 text-sm font-medium text-white/85 transition-all duration-300 hover:border-white/35 hover:text-white"
              >
                See It In Action
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </Reveal>
        </div>

        {/* sample conversation */}
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
                <div
                  key={i}
                  className={`flex ${m.who === "caller" ? "justify-end" : "justify-start"}`}
                >
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

/* ------------------------- 5 · BEFORE VS AFTER ------------------------- */
function BeforeAfter() {
  const before = [
    "Missed calls",
    "Straight to voicemail",
    "Slow follow-up",
    "Lost leads",
    "Manual booking",
  ];
  const after = [
    "Every call answered",
    "Instant lead qualification",
    "Automated appointment booking",
    "Leads captured automatically",
    "Immediate notifications",
  ];
  return (
    <section className="relative border-t border-black/[0.06] px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <Eyebrow>Before vs After</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mx-auto mt-6 max-w-[18ch] font-display text-4xl md:text-5xl leading-[1.04] tracking-[-0.03em] text-gradient-chrome">
            From Missed Calls To Booked Jobs.
          </h2>
        </Reveal>
      </div>

      <div className="mx-auto mt-14 grid max-w-4xl gap-4 md:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-2xl border border-black/[0.07] bg-card/40 p-7 backdrop-blur">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground/70">
              <X className="h-4 w-4 text-red-500" /> Without Montarro
            </div>
            <ul className="mt-6 space-y-3.5">
              {before.map((t) => (
                <li key={t} className="flex items-center gap-3 text-[14.5px] text-muted-foreground">
                  <X className="h-4 w-4 shrink-0 text-red-500/70" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative h-full overflow-hidden rounded-2xl border border-emerald-500/20 bg-white/80 p-7 backdrop-blur shadow-[0_30px_80px_-50px_rgba(16,185,129,0.5)]">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{ background: "linear-gradient(to right, transparent, rgba(16,185,129,0.5), transparent)" }}
            />
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-emerald-700">
              <Check className="h-4 w-4 text-emerald-500" /> With Montarro
            </div>
            <ul className="mt-6 space-y-3.5">
              {after.map((t) => (
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

/* ------------------------- 6 · BUSINESS IMPACT ------------------------- */
function BusinessImpact() {
  const cards: { icon: LucideIcon; stat: string; body: string }[] = [
    { icon: TrendingUp, stat: "30–50%", body: "Of previously missed revenue, recovered." },
    { icon: Clock, stat: "<1 sec", body: "Response time on every single call." },
    { icon: Headphones, stat: "24/7", body: "Reception coverage — no wages, no roster." },
    { icon: Database, stat: "100%", body: "Of conversations captured automatically." },
  ];
  return (
    <section className="relative border-t border-black/[0.06] bg-card/30 px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <Eyebrow>Business Impact</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 font-display text-4xl md:text-5xl leading-[1.04] tracking-[-0.03em] text-gradient-chrome">
            Results That Compound.
          </h2>
        </Reveal>
      </div>

      <div className="mx-auto mt-14 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c, i) => {
          const Icon = c.icon;
          return (
            <Reveal key={c.stat} delay={0.06 * i}>
              <div className="group h-full rounded-2xl border border-black/[0.07] bg-white/70 p-6 backdrop-blur transition-all duration-300 hover:border-emerald-500/30 hover:bg-white hover:shadow-[0_30px_70px_-50px_rgba(16,185,129,0.5)]">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] text-emerald-600">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="mt-5 font-display text-3xl tracking-tight text-gradient-chrome tabular-nums">
                  {c.stat}
                </div>
                <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">{c.body}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* ------------------------- 7 · WHO THIS IS FOR ------------------------- */
function WhoThisIsFor() {
  const industries: { icon: LucideIcon; label: string }[] = [
    { icon: Wrench, label: "Plumbing" },
    { icon: Zap, label: "Electrical" },
    { icon: Stethoscope, label: "Dental" },
    { icon: Scale, label: "Legal" },
    { icon: Home, label: "Real Estate" },
    { icon: HardHat, label: "Trades" },
    { icon: Headphones, label: "Service Businesses" },
  ];
  return (
    <section className="relative border-t border-black/[0.06] px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <Eyebrow>Who It&rsquo;s For</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mx-auto mt-6 max-w-[20ch] font-display text-4xl md:text-5xl leading-[1.04] tracking-[-0.03em] text-gradient-chrome">
            Built For Businesses That Run On Phone Calls.
          </h2>
        </Reveal>
      </div>

      <div className="mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-3">
        {industries.map((ind, i) => {
          const Icon = ind.icon;
          return (
            <Reveal key={ind.label} delay={0.05 * i}>
              <div className="inline-flex items-center gap-2.5 rounded-full border border-black/[0.08] bg-white/70 px-5 py-3 text-[14px] font-medium text-foreground backdrop-blur transition-all duration-300 hover:border-emerald-500/30 hover:bg-white">
                <Icon className="h-4 w-4 text-emerald-600" />
                {ind.label}
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* --------------------------- 8 · DEPLOYMENT --------------------------- */
function Deployment() {
  const weeks: { week: string; title: string; body: string }[] = [
    { week: "Week 1", title: "Setup & Training", body: "We build and train your AI receptionist on your services, pricing and booking rules." },
    { week: "Week 2", title: "Testing & Launch", body: "We test against real call scenarios, connect your calendar and CRM, then go live." },
  ];
  return (
    <section className="relative isolate overflow-hidden border-t border-black/[0.06] bg-card/30 px-6 py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 mx-auto h-[360px] max-w-3xl rounded-full bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.07),transparent_70%)] blur-3xl" />
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <Eyebrow>
            <Rocket className="h-3 w-3 text-emerald-500" /> Deployment
          </Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 font-display text-4xl md:text-5xl leading-[1.04] tracking-[-0.03em] text-gradient-chrome">
            Ready To Deploy?
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-5 max-w-lg text-[15px] text-muted-foreground leading-relaxed">
            Live in two weeks. We handle the build — you start capturing every call.
          </p>
        </Reveal>
      </div>

      <div className="mx-auto mt-12 grid max-w-3xl gap-4 md:grid-cols-2">
        {weeks.map((w, i) => (
          <Reveal key={w.week} delay={0.1 * i}>
            <div className="h-full rounded-2xl border border-black/[0.07] bg-white/70 p-7 backdrop-blur">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-emerald-700">
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-emerald-500/25 bg-emerald-500/[0.08] font-display text-[12px] tabular-nums text-emerald-700">
                  {i + 1}
                </span>
                {w.week}
              </div>
              <div className="mt-5 font-display text-xl tracking-tight text-foreground">{w.title}</div>
              <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">{w.body}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <div className="mt-12 flex justify-center">
          <Link to="/contact" className={`${primaryCta} inline-flex px-7 py-3.5 text-sm`}>
            Book Free Consultation
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
