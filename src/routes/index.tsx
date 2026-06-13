import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useId, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Phone,
  Sparkles,
  TrendingUp,
  Megaphone,
  MonitorSmartphone,
  Workflow,
  Check,
  CheckCircle2,
  Activity,
  CalendarCheck,
  PhoneCall,
  Bot,
  Database,
  Clock,
  BarChart3,
  Users,
  PlayCircle,
  Mail,
  Instagram,
  Facebook,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Montarro — Built to Scale" },
      {
        name: "description",
        content:
          "Montarro builds AI receptionists, content, ads, and websites for modern brands. Premium media and AI automation engineered to scale.",
      },
      { property: "og:title", content: "Montarro — Built to Scale" },
      {
        property: "og:description",
        content:
          "AI receptionists, content, ads, and websites for modern brands.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Landing,
});

/* ----------------------------- helpers ----------------------------- */

function Reveal({
  children,
  delay = 0,
  y = 24,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------- NAV ------------------------------- */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-background/70 border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2.5">
          <img src="/montarro-logo.png" alt="Montarro" className="h-[52px] w-auto" />
        </a>
        <nav className="hidden md:flex items-center gap-10 text-[13px] text-muted-foreground">
          {[
            ["Services", "#services"],
            ["Results", "#results"],
            ["Case Study", "#case"],
            ["Pricing", "#pricing"],
          ].map(([l, h]) => (
            <a
              key={l}
              href={h}
              className="hover:text-foreground transition-colors tracking-wide"
            >
              {l}
            </a>
          ))}
        </nav>
        <Link
          to="/contact"
          className="group inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-[12px] font-medium uppercase tracking-[0.14em] text-background transition-transform duration-300 hover:scale-[1.03]"
        >
          Book a Call
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </header>
  );
}

/* ------------------------ floating dashboards ------------------------ */

function FloatingCard({
  className = "",
  children,
  delay = 0,
  float = "slow",
}: {
  className?: string;
  children: React.ReactNode;
  delay?: number;
  float?: "slow" | "slower";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute hidden lg:block ${className}`}
    >
      <div
        className={`relative rounded-xl border border-border/80 bg-card/70 p-4 backdrop-blur-xl glow-soft ${
          float === "slow" ? "animate-float-slow" : "animate-float-slower"
        }`}
      >
        {children}
      </div>
    </motion.div>
  );
}

function MiniBars() {
  const bars = [40, 65, 35, 80, 55, 90, 70];
  return (
    <div className="flex h-12 items-end gap-1.5">
      {bars.map((h, i) => (
        <motion.span
          key={i}
          initial={{ height: 0 }}
          animate={{ height: `${h}%` }}
          transition={{ delay: 1 + i * 0.06, duration: 0.8, ease: "easeOut" }}
          className="w-2 rounded-sm bg-gradient-to-t from-black/30 to-black"
        />
      ))}
    </div>
  );
}

function HeroGrowthChart() {
  const gradientId = useId();

  return (
    <svg viewBox="0 0 190 74" preserveAspectRatio="none" className="h-full w-full" aria-label="Growth line graph">
      <defs>
        <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.36" />
          <stop offset="62%" stopColor="currentColor" stopOpacity="0.14" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M4 56 C28 54 38 49 54 43 C72 36 82 41 98 31 C116 19 130 24 146 16 C160 9 174 7 186 4 L186 74 L4 74 Z"
        fill={`url(#${gradientId})`}
        className="text-white"
      />
      <path
        d="M4 56 C28 54 38 49 54 43 C72 36 82 41 98 31 C116 19 130 24 146 16 C160 9 174 7 186 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-emerald-400"
      />
    </svg>
  );
}

/* ----------------- mobile 3D rotating card carousel ----------------- */

function RotatingCardStage({ cards }: { cards: React.ReactNode[] }) {
  const [index, setIndex] = useState(0);
  const count = cards.length;
  // Card face dimensions (px). Width drives the cube radius.
  const W = 260;
  const H = 220;
  // Radius so each face sits flush on a square cube
  const radius = Math.round(W / 2 / Math.tan(Math.PI / count));

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => i + 1), 3200);
    return () => clearInterval(id);
  }, []);

  const rotation = -(360 / count) * index;

  return (
    <div className="mt-10 flex flex-col items-center">
      <div
        className="relative mx-auto"
        style={{ width: W, height: H, perspective: 1400 }}
      >
        <motion.div
          className="relative h-full w-full"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: rotation }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {cards.map((c, i) => {
            const angle = (360 / count) * i;
            return (
              <div
                key={i}
                className="absolute inset-0 rounded-xl border border-border/80 bg-card/70 p-4 backdrop-blur-xl glow-soft"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  backfaceVisibility: "hidden",
                }}
              >
                {c}
              </div>
            );
          })}
        </motion.div>
      </div>
      <div className="mt-6 flex items-center justify-center gap-2">
        {cards.map((_, i) => (
          <button
            key={i}
            aria-label={`Show card ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index % count
                ? "w-6 bg-emerald-500"
                : "w-1.5 bg-foreground/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* --------------------- live revenue dashboard card --------------------- */

function RevenueSparkline() {
  const gradientId = useId();
  const line =
    "M0,54 L36,48 L72,52 L108,38 L144,42 L180,26 L216,30 L252,16 L288,18 L320,8";
  return (
    <svg
      viewBox="0 0 320 64"
      preserveAspectRatio="none"
      className="h-full w-full"
      aria-hidden
    >
      <defs>
        <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="rgb(16,185,129)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="rgb(16,185,129)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={`${line} L320,64 L0,64 Z`}
        fill={`url(#${gradientId})`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
      />
      <motion.path
        d={line}
        fill="none"
        stroke="rgb(5,150,105)"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.95, duration: 1.7, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  );
}

function RevenueCard() {
  const metrics = [
    { label: "Missed Calls Recovered", value: "128" },
    { label: "Jobs Booked", value: "34" },
    { label: "Avg Response Time", value: "0.8s" },
    { label: "Follow-ups Sent", value: "412" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto mt-12 w-full max-w-md"
    >
      {/* ambient emerald glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[34px] blur-2xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(16,185,129,0.14), transparent 70%)",
        }}
      />
      <div className="relative overflow-hidden rounded-2xl border border-black/[0.08] bg-card/80 p-5 text-left backdrop-blur-xl shadow-[0_1px_0_0_rgba(255,255,255,0.6)_inset,0_40px_80px_-30px_rgba(0,0,0,0.28),0_0_0_1px_rgba(0,0,0,0.02)] sm:p-6">
        {/* top emerald accent line */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"
        />

        {/* header */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Revenue Captured
          </span>
          <span className="inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-emerald-600">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500/60 animate-pulse-dot" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            Live System
          </span>
        </div>

        {/* main number */}
        <div className="mt-4 font-display text-5xl tracking-tight text-foreground tabular-nums sm:text-6xl">
          $42.8K
        </div>
        <div className="mt-1.5 flex items-center gap-1.5 text-[13px] font-medium text-emerald-600">
          <TrendingUp className="h-3.5 w-3.5" />
          +31% recovered this month
        </div>

        {/* mini metrics */}
        <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-black/[0.06] bg-black/[0.06]">
          {metrics.map((m) => (
            <div key={m.label} className="bg-card/95 px-3.5 py-3">
              <div className="text-lg font-semibold tracking-tight text-foreground tabular-nums">
                {m.value}
              </div>
              <div className="mt-0.5 text-[10px] uppercase leading-tight tracking-[0.1em] text-muted-foreground">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* animated revenue line */}
        <div className="mt-5 h-16 w-full">
          <RevenueSparkline />
        </div>

        <div className="mt-3 text-center text-[10px] uppercase tracking-[0.18em] text-muted-foreground/45">
          Example dashboard
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------- HERO ------------------------------- */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate min-h-screen overflow-hidden pt-24"
    >
      {/* backdrop */}
      <div className="absolute inset-0 -z-10 bg-grid opacity-[0.11] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="absolute inset-0 -z-10 bg-radial-glow" />
      {/* subtle emerald radial lighting from the top */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 mx-auto h-[560px] max-w-5xl"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(16,185,129,0.07), transparent 70%)",
        }}
      />
      <div className="absolute inset-x-0 top-1/3 -z-10 mx-auto h-[420px] max-w-4xl rounded-full bg-black/[0.04] blur-3xl" />

      <motion.div
        style={{ y, opacity }}
        className="relative mx-auto flex max-w-7xl flex-col items-center px-6 pt-8 pb-16 text-center sm:pt-14 sm:pb-20"
      >
        <Reveal delay={0.05}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.22em] text-muted-foreground backdrop-blur">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500/60 animate-pulse-dot" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-600" />
            </span>
            RECOVERING REVENUE 24/7
          </div>
        </Reveal>

        <Reveal delay={0.15} className="w-full">
          <h1 className="font-display text-balance mx-auto max-w-[14ch] text-[clamp(2.85rem,9vw,8rem)] leading-[0.92] tracking-[-0.05em]">
            <span className="block text-gradient-chrome">NEVER MISS</span>
            <span className="block text-gradient-chrome">A LEAD.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="mt-6 max-w-2xl text-pretty text-base md:text-lg text-muted-foreground">
            AI revenue systems that capture calls, qualify leads, book jobs, and
            scale revenue — without hiring more staff.
          </p>
        </Reveal>

        <Reveal delay={0.38}>
          <p className="mt-3 text-[12px] tracking-wide text-muted-foreground/70">
            Aussie-trained AI voice. Privacy Act compliant. Local data handling.
          </p>
        </Reveal>

        <Reveal delay={0.45}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/contact"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-all duration-300 ease-out hover:scale-[1.02]"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/40 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
              Get Revenue Audit
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <a
              href="#services"
              className="group inline-flex items-center gap-2 rounded-xl border border-border bg-card/40 px-6 py-2.5 text-sm font-medium backdrop-blur transition-all duration-300 ease-out hover:border-foreground/40 hover:bg-card"
            >
              See The System
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </Reveal>

        {/* Premium live revenue dashboard card */}
        <RevenueCard />

        {/* Proof bar */}
        <Reveal delay={0.7} className="w-full">
          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-xl border border-black/[0.06] bg-black/[0.06] sm:grid-cols-4">
            {[
              ["24/7", "AI Response"],
              ["128", "Missed Calls Recovered"],
              ["34", "Jobs Booked"],
              ["$42.8K", "Revenue Captured"],
            ].map(([v, l]) => (
              <div
                key={l}
                className="bg-background/85 px-4 py-4 text-center backdrop-blur"
              >
                <div className="font-display text-xl tracking-tight text-foreground tabular-nums">
                  {v}
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  {l}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </motion.div>


    </section>
  );
}

/* ------------------------------ TRUST ------------------------------ */


function Trust() {
  const industries = [
    "HVAC",
    "DENTAL",
    "LEGAL",
    "MEDICAL",
    "PLUMBING",
    "AUTOMOTIVE",
    "CONSTRUCTION",
  ];
  return (
    <section className="relative bg-graphite py-14 overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px divider-emerald-glow" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-px divider-emerald-glow opacity-60" />
      <div className="mx-auto max-w-5xl px-6 text-center">
        <Reveal>
          <h2 className="text-base md:text-xl font-medium uppercase tracking-[0.22em] text-white/85">
            Revenue Infrastructure for Ambitious Operators
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] uppercase tracking-[0.26em] text-white/45 sm:text-xs">
            {industries.map((it, i) => (
              <span key={it} className="flex items-center gap-4">
                {i !== 0 && (
                  <span aria-hidden className="text-emerald-500/50">
                    •
                  </span>
                )}
                {it}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------- MISSED REVENUE --------------------------- */

function Waveform({ count = 5, className = "" }: { count?: number; className?: string }) {
  return (
    <div className={`flex h-4 items-end gap-[3px] ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full bg-emerald-500"
          style={{ height: "35%" }}
          animate={{ height: ["35%", "100%", "55%", "85%", "35%"] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.13,
          }}
        />
      ))}
    </div>
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

function PanelAccent() {
  return (
    <span
      aria-hidden
      className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"
    />
  );
}

const cardShell =
  "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-black/[0.08] bg-gradient-to-b from-white/95 to-white/65 p-5 backdrop-blur-xl transition-all duration-500 ease-out hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-[0_44px_90px_-40px_rgba(16,185,129,0.32)] shadow-[0_1px_0_0_rgba(255,255,255,0.7)_inset,0_22px_50px_-30px_rgba(0,0,0,0.18)]";
const miniPanel =
  "rounded-xl border border-black/[0.06] bg-white/70 p-3 backdrop-blur";
const pill =
  "rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-700";

/* Right-side live AI receptionist workflow */
function LiveWorkflow() {
  const steps = [
    { icon: PhoneCall, label: "Incoming Call", meta: "+61 4•• ••• 218", right: <Waveform /> },
    { icon: Bot, label: "AI Receptionist Answers", meta: "0.8s response time", right: <LiveDot /> },
    { icon: CheckCircle2, label: "Lead Qualified", meta: "High intent · roofing", right: <span className={pill}>Qualified</span> },
    { icon: CalendarCheck, label: "Appointment Booked", meta: "Thu · 3:00 PM", right: <span className={pill}>Confirmed</span> },
    { icon: Database, label: "CRM Updated", meta: "GoHighLevel · synced", right: <CheckCircle2 className="h-4 w-4 text-emerald-500" /> },
  ];
  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[36px] blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(16,185,129,0.13), transparent 70%)",
        }}
      />
      <div className="relative overflow-hidden rounded-2xl border border-black/[0.08] bg-gradient-to-b from-white/95 to-white/72 p-5 backdrop-blur-xl shadow-[0_1px_0_0_rgba(255,255,255,0.7)_inset,0_44px_90px_-35px_rgba(0,0,0,0.26)] sm:p-6">
        <PanelAccent />
        {/* header */}
        <div className="flex items-center justify-between border-b border-black/[0.06] pb-3">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            <LiveDot /> AI Receptionist · Live
          </div>
          <span className="text-[11px] tabular-nums text-muted-foreground">00:42</span>
        </div>

        {/* pipeline */}
        <div className="relative mt-5">
          <div aria-hidden className="absolute left-[17px] top-5 bottom-5 w-px bg-black/10" />
          <motion.div
            aria-hidden
            className="absolute left-[17px] top-5 w-px origin-top bg-gradient-to-b from-emerald-500 via-emerald-500/70 to-emerald-500/0"
            style={{ bottom: 20 }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          />
          <div className="space-y-3">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.label}
                  className="relative flex items-center gap-3"
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: 0.25 + i * 0.16, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-emerald-500/30 bg-white shadow-[0_0_0_4px_rgba(255,255,255,1),0_8px_20px_-8px_rgba(16,185,129,0.45)]">
                    <Icon className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div className="flex flex-1 items-center justify-between rounded-lg border border-black/[0.06] bg-white/75 px-3 py-2 backdrop-blur">
                    <div>
                      <div className="text-[13px] font-medium leading-tight text-foreground">{s.label}</div>
                      <div className="text-[11px] text-muted-foreground">{s.meta}</div>
                    </div>
                    {s.right}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* footer */}
        <div className="mt-5 flex items-center justify-between rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] px-4 py-3">
          <span className="text-[11px] uppercase tracking-[0.16em] text-emerald-700/80">Revenue recovered</span>
          <span className="flex items-center gap-2">
            <span className="font-display text-xl tabular-nums text-foreground">$42.8K</span>
            <span className="text-[11px] font-medium text-emerald-600">+31%</span>
          </span>
        </div>
      </div>
    </div>
  );
}

function CaptureCard() {
  return (
    <div className={cardShell}>
      <PanelAccent />
      <div className={miniPanel}>
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          <span className="flex items-center gap-1.5"><LiveDot /> Live Calls</span>
          <span className="tabular-nums">03</span>
        </div>
        <div className="mt-3 flex items-center gap-2.5 rounded-lg border border-black/[0.06] bg-white px-2.5 py-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/10">
            <PhoneCall className="h-3.5 w-3.5 text-emerald-600" />
          </span>
          <div className="flex-1">
            <div className="text-[12px] font-medium leading-tight text-foreground">Incoming · +61 4•• 218</div>
            <div className="text-[10px] text-muted-foreground">AI answering…</div>
          </div>
          <Waveform />
        </div>
        <div className="mt-2 flex items-center justify-between rounded-lg bg-emerald-500/[0.07] px-2.5 py-1.5">
          <span className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-700">
            <CheckCircle2 className="h-3.5 w-3.5" /> Lead Qualified
          </span>
          <span className="text-[10px] text-emerald-600">0.8s</span>
        </div>
      </div>
      <h3 className="mt-5 font-display text-2xl tracking-tight text-foreground">Capture Every Call</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        AI answers after-hours, during busy periods, and when staff are unavailable.
      </p>
      <div className="mt-auto pt-4 flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-muted-foreground/70">
        <TrendingUp className="h-3.5 w-3.5 text-emerald-500" /> 128 recovered this month
      </div>
    </div>
  );
}

function BookingCard() {
  return (
    <div className={cardShell}>
      <PanelAccent />
      <div className={miniPanel}>
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          <span>Bookings</span>
          <span>Today</span>
        </div>
        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-between rounded-lg border border-black/[0.06] bg-white px-2.5 py-2">
            <span className="flex items-center gap-2 text-[12px] text-foreground">
              <CalendarCheck className="h-3.5 w-3.5 text-emerald-600" /> Thu · 3:00 PM
            </span>
            <span className={pill}>Confirmed</span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-black/[0.06] bg-white px-2.5 py-2">
            <span className="flex items-center gap-2 text-[12px] text-foreground">
              <Clock className="h-3.5 w-3.5 text-muted-foreground" /> Reminder sent
            </span>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-center justify-between text-[10px] text-muted-foreground">
            <span>Pipeline</span>
            <span className="tabular-nums">68%</span>
          </div>
          <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-black/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
              initial={{ width: 0 }}
              whileInView={{ width: "68%" }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 1.3, ease: "easeOut", delay: 0.2 }}
            />
          </div>
        </div>
      </div>
      <h3 className="mt-5 font-display text-2xl tracking-tight text-foreground">Book More Jobs</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Qualified leads are routed into bookings, reminders, and follow-up flows.
      </p>
      <div className="mt-auto pt-4 flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-muted-foreground/70">
        <CalendarCheck className="h-3.5 w-3.5 text-emerald-500" /> 34 jobs booked this week
      </div>
    </div>
  );
}

function ScaleCard() {
  const convos = [
    { n: "HVAC · Call", s: "Qualifying" },
    { n: "Dental · Call", s: "Booking" },
    { n: "Legal · Call", s: "Answering" },
  ];
  return (
    <div className={cardShell}>
      <PanelAccent />
      <div className={miniPanel}>
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          <span className="flex items-center gap-1.5"><LiveDot /> Active Conversations</span>
          <span className="tabular-nums">12</span>
        </div>
        <div className="mt-3 space-y-1.5">
          {convos.map((c, i) => (
            <div key={c.n} className="flex items-center gap-2.5 rounded-lg border border-black/[0.06] bg-white px-2.5 py-1.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/10 text-[10px] font-semibold text-emerald-700">
                {i + 1}
              </span>
              <span className="flex-1 text-[12px] text-foreground">{c.n}</span>
              <span className={pill}>{c.s}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-black/[0.06] pt-2.5">
          <span className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Avg response</span>
          <span className="flex items-center gap-2">
            <span className="block h-5 w-16"><RevenueSparkline /></span>
            <span className="text-[12px] font-semibold tabular-nums text-foreground">0.8s</span>
          </span>
        </div>
      </div>
      <h3 className="mt-5 font-display text-2xl tracking-tight text-foreground">Scale Without Hiring</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Increase response speed and capacity without adding receptionist overhead.
      </p>
      <div className="mt-auto pt-4 flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-muted-foreground/70">
        <Activity className="h-3.5 w-3.5 text-emerald-500" /> 5+ services automated
      </div>
    </div>
  );
}

function MissedRevenue() {
  return (
    <section className="relative overflow-hidden border-y border-black/[0.05] py-20 lg:py-28">
      {/* tonal background + radial lighting for section rhythm and depth */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-[#fafafb] via-white to-[#f6f7f8]" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 85% 12%, rgba(16,185,129,0.07), transparent 70%)",
        }}
      />
      <div className="absolute inset-0 -z-10 bg-grid opacity-[0.05] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_72%)]" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* LEFT */}
          <div>
            <Reveal>
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-10 bg-emerald-500/70" />
                <span className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                  The Problem
                </span>
              </div>
              <h2 className="font-display text-4xl md:text-6xl leading-[1.02] tracking-tight text-gradient-chrome">
                MISSED CALLS ARE LOST REVENUE.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-base md:text-lg leading-relaxed text-muted-foreground">
                Every unanswered call is a customer choosing someone else. Our AI
                receptionist answers instantly, qualifies the lead, books the
                appointment, and pushes everything into your CRM.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-8 grid max-w-md grid-cols-3 gap-px overflow-hidden rounded-xl border border-black/[0.06] bg-black/[0.06]">
                {[
                  ["100%", "Calls answered"],
                  ["0.8s", "Avg response"],
                  ["24/7", "Coverage"],
                ].map(([v, l]) => (
                  <div key={l} className="bg-white/85 px-3 py-3 text-center backdrop-blur">
                    <div className="font-display text-lg tracking-tight text-foreground tabular-nums">{v}</div>
                    <div className="mt-0.5 text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{l}</div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.26}>
              <Link
                to="/contact"
                className="group mt-8 inline-flex items-center gap-2 overflow-hidden rounded-xl bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-all duration-300 ease-out hover:scale-[1.02]"
              >
                Get Revenue Audit
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Reveal>
          </div>

          {/* RIGHT — live workflow */}
          <Reveal delay={0.15}>
            <LiveWorkflow />
          </Reveal>
        </div>

        {/* three live-UI cards */}
        <div className="mt-14 grid gap-4 md:grid-cols-3 lg:mt-20">
          <Reveal delay={0.05}>
            <CaptureCard />
          </Reveal>
          <Reveal delay={0.13}>
            <BookingCard />
          </Reveal>
          <Reveal delay={0.21}>
            <ScaleCard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}


/* ----------------------------- SERVICES ----------------------------- */

const SERVICES = [
  {
    title: "AI Receptionists",
    desc: "Every lead, handled.",
    icon: Phone,
    href: "/services/ai-receptionists" as const,
  },
  {
    title: "Content Creation",
    desc: "Content engineered for attention.",
    icon: Sparkles,
    href: "/services/content-creation" as const,
  },
  {
    title: "Automation Systems",
    desc: "Built to scale operations.",
    icon: Workflow,
    href: "/services/automation-systems" as const,
  },
  {
    title: "Paid Advertising",
    desc: "Performance-driven ads across Meta, Google & TikTok.",
    icon: Megaphone,
    href: "/services/paid-advertising" as const,
  },
];

function Services() {
  return (
    <section id="services" className="relative py-20 lg:py-24">
      {/* cinematic emerald glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[480px] overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(46,204,113,0.10),transparent_65%)] blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="flex items-end justify-between gap-8">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-10 bg-emerald-500/70" />
                <span className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                  Systems
                </span>
              </div>
              <h2 className="font-display text-5xl md:text-7xl leading-[1.05] tracking-tight text-gradient-chrome">
                Growth Infrastructure.
              </h2>
            </div>
            <p className="hidden md:block max-w-sm text-muted-foreground leading-relaxed">
              AI systems engineered for modern growth.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 md:mt-12 lg:mt-16 grid gap-4 md:grid-cols-2">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.title} delay={i * 0.08}>
                <Link
                  to={s.href}
                  className="group relative block overflow-hidden rounded-2xl border border-black/[0.08] bg-card/60 p-5 sm:p-6 lg:p-8 backdrop-blur transition-all duration-500 ease-out hover:border-emerald-500/40 hover:-translate-y-1 hover:shadow-[0_30px_80px_-30px_rgba(46,204,113,0.28)] shadow-[0_1px_0_0_rgba(0,0,0,0.02),0_10px_40px_-20px_rgba(0,0,0,0.08)]"
                >
                  {/* top emerald accent line */}
                  <span className="absolute left-0 top-0 h-px w-0 bg-gradient-to-r from-transparent via-emerald-500/70 to-transparent transition-all duration-700 ease-out group-hover:w-full" />

                  {/* hover emerald glow */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100">
                    <div className="absolute -top-40 left-1/2 h-72 w-[120%] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(46,204,113,0.18),transparent_60%)] blur-3xl" />
                  </div>

                  <div className="relative flex flex-col gap-5 sm:gap-6">
                    <div className="flex items-start justify-between">
                      <ArrowUpRight className="h-4 w-4 text-foreground/30 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:text-emerald-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      <div className="rounded-full border border-black/[0.08] p-2 transition-all duration-500 ease-out group-hover:border-emerald-500/50 group-hover:shadow-[0_0_24px_-4px_rgba(46,204,113,0.45)]">
                        <Icon className="h-4 w-4 text-foreground/70 transition-colors duration-500 group-hover:text-emerald-500" />
                      </div>
                    </div>

                    <div>
                      <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight text-foreground">
                        {s.title.split(" ").map((word, i) => (
                          <span key={i} className="block">
                            {word}
                          </span>
                        ))}
                      </h3>
                      <p className="mt-2 text-sm sm:text-base text-muted-foreground">{s.desc}</p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ RESULTS ------------------------------ */

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-card/60 border border-black/[0.04] px-6 pt-8 pb-6 transition-all duration-500 ease-out hover:border-emerald-500/30 hover:shadow-[0_20px_60px_-25px_rgba(16,185,129,0.35)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-10 h-32 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.06),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.12),transparent_60%)]"
      />
      <div className="relative font-display text-5xl md:text-6xl text-gradient-chrome tabular-nums">
        {value}
      </div>
      <div className="relative mt-2 text-[11px] uppercase tracking-[0.26em] text-muted-foreground/80 font-medium">
        {label}
      </div>
    </div>
  );
}

function Results() {
  return (
    <section id="results" className="relative border-t border-black/[0.04] py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <h2 className="max-w-3xl font-display text-5xl md:text-7xl leading-[0.95] text-gradient-chrome">
            Engineered for performance.
          </h2>
          <p className="mt-5 max-w-xl text-muted-foreground">
            Built for long-term partnerships — capability you can rely on, not
            vanity metrics.
          </p>
        </Reveal>

        <div className="mt-12 md:mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Reveal delay={0.05}>
            <Stat value="24/7" label="Always-on AI response" />
          </Reveal>
          <Reveal delay={0.15}>
            <Stat value="<1s" label="Average response time" />
          </Reveal>
          <Reveal delay={0.25}>
            <Stat value="1,000+" label="Calls handled / client / month" />
          </Reveal>
          <Reveal delay={0.35}>
            <Stat value="5+" label="Integrated growth services" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ PRICING ------------------------------ */

const TIERS = [
  {
    name: "Starter",
    tagline: "Foundations to capture every lead.",
    href: "/packages/starter" as const,
    features: [
      "AI Receptionist",
      "CRM Setup",
      "Lead Capture",
      "Monthly Reporting",
    ],
  },
  {
    name: "Growth",
    tagline: "Full-stack acquisition and optimisation.",
    featured: true,
    href: "/packages/growth" as const,
    features: [
      "AI Receptionist",
      "Content Creation",
      "Meta Ads",
      "Google Ads",
      "Website Optimisation",
    ],
  },
  {
    name: "Scale",
    tagline: "An in-house growth team, fully managed.",
    href: "/packages/scale" as const,
    features: [
      "Everything Included",
      "Dedicated Strategy",
      "Funnel Systems",
      "Conversion Optimisation",
      "Weekly Calls",
    ],
  },
];

function Pricing() {
  return (
    <section id="pricing" className="relative border-t border-border py-20 lg:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 -bottom-px h-6 bg-gradient-to-b from-transparent to-white/60" />
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="text-center">
            <h2 className="font-display text-5xl md:text-7xl leading-[1.1] text-gradient-chrome">
              Packages tailored to your{" "}
              <span className="text-emerald-500">growth.</span>
            </h2>
            <Reveal delay={0.1}>
              <p className="mt-5 text-[12px] uppercase tracking-[0.22em] text-emerald-600">
                Now onboarding founding Melbourne clients.
              </p>
            </Reveal>
          </div>
        </Reveal>

        <div className="mt-12 md:mt-16 grid gap-5 lg:grid-cols-3">
          {TIERS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <Link
                to={t.href}
                className={`group relative block h-full overflow-hidden rounded-2xl border p-8 transition-all duration-500 hover:-translate-y-1 ${
                  t.featured
                    ? "border-emerald-500/40 bg-card/80 glow-ring"
                    : "border-border bg-card/30 hover:border-foreground/30 hover:bg-card/60"
                }`}
              >
                {t.featured && (
                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -top-40 left-1/2 h-80 w-[140%] -translate-x-1/2 rounded-full bg-black/[0.08] blur-3xl" />
                  </div>
                )}
                <div className="relative flex h-full flex-col">
                  {t.featured && (
                    <span className="absolute right-2 top-2 sm:right-3 sm:top-3 lg:right-4 lg:top-4 animate-pulse rounded-full bg-emerald-500 px-3 py-1 text-xs font-medium uppercase tracking-widest text-white shadow-[0_0_20px_-4px_oklch(0.7_0.18_155/0.6)]">
                      Most Popular
                    </span>
                  )}

                  <div className="font-display text-5xl tracking-tight text-gradient-chrome">
                    {t.name}
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {t.tagline}
                  </p>

                  <div className="my-8 h-px w-full bg-border" />

                  <ul className="space-y-4 text-sm">
                    {t.features.map((f) => (
                      <li key={f} className="flex items-center gap-3">
                        <span className={`flex h-5 w-5 items-center justify-center rounded-full border ${t.featured ? "border-emerald-500/50" : "border-border"}`}>
                          <Check className={`h-3 w-3 ${t.featured ? "text-emerald-400" : ""}`} />
                        </span>
                        <span className="text-foreground/90">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <span
                    className={`mt-10 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all duration-300 ${
                      t.featured
                        ? "bg-foreground text-background group-hover:scale-[1.02]"
                        : "border border-border group-hover:border-foreground/40 group-hover:bg-card"
                    }`}
                  >
                    Explore Package
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- CASE STUDY ----------------------------- */

function CaseStudy() {
  return (
    <>
      <div
        aria-hidden
        style={{
          height: "160px",
          marginBottom: "-40px",
          position: "relative",
          overflow: "hidden",
          filter: "blur(0px)",
          background:
            "linear-gradient(to bottom, #f5f5f5 0%, #efefef 15%, #d9d9d9 30%, #9e9e9e 45%, #5e5e5e 60%, #1f1f1f 78%, #121212 92%, #0D0D0D 100%)",
        }}
      >
        {/* soft center overlay */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at center, rgba(255,255,255,0.12) 0%, transparent 55%)",
          }}
        />
        {/* subtle blur halo behind center */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: "60%",
            height: "60%",
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(ellipse at center, rgba(255,255,255,0.08), transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        {/* grain/noise texture */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.35,
            mixBlendMode: "overlay",
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.35 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }}
        />
      </div>
    <section id="case" className="relative bg-graphite-radial py-20 lg:py-24 overflow-hidden">
      {/* Atmospheric emerald glow */}
      <div aria-hidden className="pointer-events-none absolute -left-40 top-1/4 h-[420px] w-[420px] rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(46,204,113,0.10), transparent 70%)" }} />
      <div aria-hidden className="pointer-events-none absolute -right-32 bottom-10 h-[380px] w-[380px] rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.04), transparent 70%)" }} />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <h2 className="font-display text-4xl md:text-5xl leading-[1.15] pb-2">
              <span className="bg-gradient-to-b from-white via-white to-white/70 bg-clip-text text-transparent">
                Turning Attention Into{" "}
              </span>
              <span className="text-emerald-400">Revenue.</span>
            </h2>
            <p className="mt-6 max-w-md text-white/55">
              A 90-day infrastructure deployment across AI reception, paid acquisition and funnel optimisation — engineered to compound qualified bookings without scaling headcount.
            </p>


            <div className="mt-8 flex items-baseline gap-3">
              <div className="font-display text-7xl md:text-8xl text-gradient-white-grey">
                +215%
              </div>
              <TrendingUp className="h-6 w-6 text-emerald-400" />
            </div>
            <div className="mt-2 text-sm uppercase tracking-[0.24em] text-white/50">
              Illustrative · booked-call uplift
            </div>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-2xl border border-hairline-light bg-graphite-elevated p-6 backdrop-blur glow-emerald-ring">
              {/* subtle top emerald accent */}
              <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(46,204,113,0.4), transparent)" }} />
              {/* dashboard header */}
              <div className="flex items-center justify-between border-b border-hairline-light pb-4">
                <div className="flex items-center gap-2 text-xs text-white/50">
                  <span aria-hidden className="text-sm leading-none">⚡</span>
                  Example performance · illustrative
                </div>
                <div className="flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-white/20" />
                  <span className="h-2 w-2 rounded-full bg-white/20" />
                  <span className="h-2 w-2 rounded-full bg-emerald-400/70 shadow-[0_0_8px_rgba(46,204,113,0.6)]" />
                </div>
              </div>

              {/* KPI row */}
              <div className="mt-6 grid grid-cols-3 gap-4">
                {[
                  { l: "Bookings", v: "1,482", d: "+215%" },
                  { l: "CPL", v: "$4.20", d: "−38%" },
                  { l: "ROAS", v: "6.4x", d: "+92%" },
                ].map((k) => (
                  <div
                    key={k.l}
                    className="group rounded-lg border border-hairline-light bg-[#0D0D0D] p-4 transition-all duration-300 hover-graphite hover:border-emerald-500/20"
                  >
                    <div className="text-[10px] uppercase tracking-widest text-white/50">
                      {k.l}
                    </div>
                    <div className="mt-2 text-2xl font-semibold tracking-tight text-white">
                      {k.v}
                    </div>
                    <div className="mt-1 text-xs text-emerald-400 transition-all duration-300 group-hover:[text-shadow:0_0_12px_rgba(46,204,113,0.6)]">{k.d}</div>
                  </div>
                ))}
              </div>

              {/* chart */}
              <div className="relative mt-6 h-56 w-full text-white">
                <div aria-hidden className="pointer-events-none absolute inset-0 -z-0" style={{ background: "radial-gradient(ellipse 60% 80% at 50% 100%, rgba(46,204,113,0.12), transparent 70%)" }} />
                <HeroGrowthChart />
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
    </>
  );
}


/* ------------------------------- CTA ------------------------------- */

function CTA() {
  return (
    <div className="bg-background px-4 pt-10 pb-16 sm:px-6 lg:px-8 lg:pt-14 lg:pb-24">
      <section
        id="cta"
        className="relative isolate overflow-hidden rounded-[28px] border border-white/[0.04] bg-[#111111] pt-16 pb-20 lg:pt-20 lg:pb-24 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.5),0_1px_0_0_rgba(255,255,255,0.03)_inset]"
      >
        {/* faint grid texture */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.06] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_72%)]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        {/* layered atmospheric lighting */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 50% 60%, rgba(46,204,113,0.02), transparent 65%), radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,255,255,0.03), transparent 70%)",
          }}
        />
        {/* soft grain */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }}
        />

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <Reveal delay={0.1}>
            <h2 className="font-display text-gradient-white-grey text-[clamp(2.25rem,7.5vw,5.25rem)] leading-[0.95] tracking-[-0.035em]">
              READY TO GROW?
            </h2>
          </Reveal>
          <Reveal delay={0.22}>
            <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed tracking-[-0.01em] text-white/50">
              We'll show you exactly how to scale.
            </p>
          </Reveal>
          <Reveal delay={0.36}>
            <div className="relative mt-7 inline-block">
              {/* ambient emerald halo behind button */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-10 -z-10 rounded-full blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(46,204,113,0.02), transparent 70%)",
                }}
              />
              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-black shadow-[0_8px_30px_-10px_rgba(0,0,0,0.25)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.03] hover:shadow-[0_20px_60px_-14px_rgba(0,0,0,0.35)] hover:bg-white/90"
              >
                <PlayCircle className="h-[16px] w-[16px] text-black/40 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-emerald-500/60 group-hover:rotate-[6deg]" />
                Book a Free Strategy Call
                <ArrowUpRight className="h-3.5 w-3.5 text-black/40 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-emerald-500/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

/* ------------------------------ FOOTER ------------------------------ */

function Footer() {
  return (
    <footer className="border-t border-black/[0.06] bg-background">
      <div className="mx-auto max-w-7xl px-6 pt-10 pb-8 lg:pt-12 lg:pb-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          {/* LEFT — refined brand */}
          <div className="flex flex-col justify-between lg:col-span-4">
            <div>
              <a href="#top" className="inline-block">
                <img src="/montarro-logo.png" alt="Montarro" className="h-[34px] w-auto" />
              </a>
              <p className="mt-3 text-[13px] leading-relaxed text-black/40">
                AI infrastructure for modern companies.
              </p>
              <p className="mt-2 text-[12px] font-medium text-black/55">
                Melbourne-based · Australian-owned
              </p>
            </div>
            <p className="mt-6 text-[11px] tracking-[0.12em] uppercase text-black/20 lg:mt-0">
              Built for companies scaling through AI.
            </p>
          </div>

          {/* RIGHT — navigation */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            {/* Infrastructure */}
            <div>
              <h4 className="text-[11px] font-medium uppercase tracking-[0.18em] text-black/35">
                Infrastructure
              </h4>
              <ul className="mt-4 space-y-2">
                {[
                  "AI Receptionists",
                  "Content Creation",
                  "Automation Systems",
                  "Paid Advertising",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#services"
                      className="text-[13px] text-black/45 transition-colors duration-300 hover:text-black/80"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-[11px] font-medium uppercase tracking-[0.18em] text-black/35">
                Company
              </h4>
              <ul className="mt-4 space-y-2">
                <li>
                  <a
                    href="#top"
                    className="text-[13px] text-black/45 transition-colors duration-300 hover:text-black/80"
                  >
                    About
                  </a>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-[13px] text-black/45 transition-colors duration-300 hover:text-black/80"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-[13px] text-black/45 transition-colors duration-300 hover:text-black/80"
                  >
                    Book A Call
                  </Link>
                </li>
              </ul>
            </div>

            {/* Socials */}
            <div>
              <h4 className="text-[11px] font-medium uppercase tracking-[0.18em] text-black/35">
                Socials
              </h4>
              <ul className="mt-4 space-y-2">
                <li>
                  <a
                    href="https://instagram.com/montarroaii"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] text-black/45 transition-colors duration-300 hover:text-black/80"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/montarroaii"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] text-black/45 transition-colors duration-300 hover:text-black/80"
                  >
                    X / Twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-black/[0.06] pt-6 text-[12px] text-black/25 md:flex-row md:items-center">
          <div>© 2025 Montarro. All rights reserved.</div>
          <div className="text-black/25">Melbourne, Australia</div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------------------- INTEGRATIONS ---------------------------- */

function Integrations() {
  const tools = ["GoHighLevel", "Cal.com", "Twilio", "Google Calendar"];
  return (
    <section className="relative border-t border-black/[0.04] py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center gap-6 text-center">
          <span className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground/70">
            Integrates with your stack
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {tools.map((t) => (
              <span
                key={t}
                className="text-sm font-medium tracking-tight text-foreground/65 transition-colors duration-300 hover:text-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ PAGE ------------------------------ */

function Landing() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <Trust />
        <MissedRevenue />
        <Integrations />
        <Services />
        <Results />
        <CaseStudy />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
