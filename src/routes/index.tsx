import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useId, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, animate } from "motion/react";
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
  Activity,
  CalendarCheck,
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

function useCountUp(target: number, duration = 2) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    // For very small targets, Math.floor would show "0" for nearly the entire
    // animation. Show the final value immediately instead.
    if (target <= 1) {
      node.textContent = target.toLocaleString();
      return;
    }
    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) {
        node.textContent = Math.floor(v).toLocaleString();
      },
      onComplete() {
        node.textContent = target.toLocaleString();
      },
    });
    return () => controls.stop();
  }, [inView, target, duration]);
  return ref;
}

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
            scale revenue without hiring more staff.
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

function MissedRevenue() {
  const cards = [
    {
      icon: Phone,
      title: "Capture Every Call",
      desc: "AI answers after-hours, during busy periods, and when staff are unavailable.",
    },
    {
      icon: CalendarCheck,
      title: "Book More Jobs",
      desc: "Qualified leads are routed into bookings, reminders, and follow-up flows.",
    },
    {
      icon: TrendingUp,
      title: "Scale Without Hiring",
      desc: "Increase response speed and capacity without adding receptionist overhead.",
    },
  ];
  return (
    <section className="relative py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
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
            <p className="mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-muted-foreground">
              Every unanswered call is a customer choosing someone else. Our AI
              receptionist answers instantly, qualifies the lead, books the
              appointment, and pushes everything into your CRM.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <Reveal key={c.title} delay={i * 0.08}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-black/[0.08] bg-card/60 p-6 lg:p-8 backdrop-blur transition-all duration-500 ease-out hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-[0_30px_80px_-30px_rgba(16,185,129,0.28)] shadow-[0_1px_0_0_rgba(0,0,0,0.02),0_10px_40px_-20px_rgba(0,0,0,0.08)]">
                  <span className="absolute left-0 top-0 h-px w-0 bg-gradient-to-r from-transparent via-emerald-500/70 to-transparent transition-all duration-700 ease-out group-hover:w-full" />
                  <div className="inline-flex rounded-full border border-black/[0.08] p-2.5 transition-all duration-500 ease-out group-hover:border-emerald-500/50 group-hover:shadow-[0_0_24px_-4px_rgba(16,185,129,0.45)]">
                    <Icon className="h-5 w-5 text-foreground/70 transition-colors duration-500 group-hover:text-emerald-600" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl tracking-tight text-foreground">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {c.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
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
    desc: "Performance driven by data.",
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

function Stat({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const ref = useCountUp(value, 2.4);
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-card/60 border border-black/[0.04] px-6 pt-8 pb-6 transition-all duration-500 ease-out hover:border-emerald-500/30 hover:shadow-[0_20px_60px_-25px_rgba(46,204,113,0.35)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-10 h-32 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.06),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(ellipse_at_top,rgba(46,204,113,0.12),transparent_60%)]"
      />
      <div className="relative flex items-baseline gap-0.5 font-display text-6xl md:text-7xl text-gradient-chrome tabular-nums">
        <span ref={ref}>{value.toLocaleString()}</span>
        <span>{suffix}</span>
      </div>
      <div className="relative mt-2 text-[11px] uppercase tracking-[0.32em] text-muted-foreground/80 font-medium">
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
            Numbers that compound.
          </h2>
        </Reveal>

        <div className="mt-12 md:mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Reveal delay={0.05}>
            <Stat value={100} suffix="+" label="Companies Integrated" />
          </Reveal>
          <Reveal delay={0.15}>
            <Stat value={1} suffix="M+" label="Leads Generated" />
          </Reveal>
          <Reveal delay={0.25}>
            <Stat value={98} suffix="%" label="Client Retention" />
          </Reveal>
          <Reveal delay={0.35}>
            <Stat value={1} suffix="M+" label="Ad Spend Managed" />
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
              Increase in Booked Calls
            </div>

            <div className="mt-8 rounded-2xl border border-hairline-light bg-graphite-elevated p-6 backdrop-blur transition-all duration-500 hover:border-emerald-500/20 glow-emerald-soft">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-white/30 to-white/10" />
                <div>
                  <div className="text-sm font-medium text-white">Daniel Rhodes</div>
                  <div className="text-xs text-white/50">
                    CEO, Nordhaus Studio
                  </div>
                </div>
              </div>
              <p className="mt-4 text-pretty text-white/80">
                "Montarro rebuilt our entire acquisition engine. We tripled
                qualified bookings in a single quarter — without lifting a
                finger."
              </p>
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
                  Performance · Last 90 days
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
              <p className="mt-2 text-[13px] leading-relaxed text-black/40">
                AI infrastructure for modern companies.
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
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] text-black/45 transition-colors duration-300 hover:text-black/80"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="#"
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
          <div className="flex gap-6">
            <a
              href="#"
              className="transition-colors duration-300 hover:text-black/60"
            >
              Privacy
            </a>
            <a
              href="#"
              className="transition-colors duration-300 hover:text-black/60"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
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
