import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useId, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, animate } from "motion/react";
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
  Star,
  ChevronLeft,
  ChevronRight,
  PhoneMissed,
  ClipboardList,
  RefreshCw,
  Inbox,
  ArrowDown,
  TrendingDown,
  Plus,
  Minus,
  AlertTriangle,
} from "lucide-react";
import { MobileMenu } from "@/components/MobileMenu";
import { primaryCta } from "@/lib/cta";

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
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/[0.08] bg-white shadow-[0_1px_2px_-1px_rgba(0,0,0,0.06)]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <a href="#top" className="flex items-center">
          <img src="/montarro-logo.png" alt="Montarro" className="h-14 w-auto" />
        </a>
        <nav className="hidden lg:flex items-center gap-7 text-[13.5px] font-semibold">
          {(() => {
            const cls = "tracking-tight text-foreground/75 transition-colors duration-300 hover:text-foreground";
            return (
              <>
                <a href="#system" className={cls}>The System</a>
                <Link to="/services/ai-receptionists" className={`group inline-flex items-center gap-1.5 ${cls}`}>
                  AI Receptionist
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500/60 animate-pulse-dot" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </span>
                </Link>
                <Link to="/demo" className={cls}>Live Demo</Link>
                <a href="#results" className={cls}>About</a>
                <a href="#faq" className={cls}>FAQ</a>
                <Link to="/contact" className={cls}>Contact</Link>
              </>
            );
          })()}
        </nav>
        <div className="flex items-center gap-3 lg:gap-4">
          {/* persistent bare call icon — all pages, mobile + desktop */}
          <a
            href="tel:0450731109"
            aria-label="Call Montarro"
            className="inline-flex items-center justify-center text-foreground/70 transition-colors duration-300 hover:text-foreground"
          >
            <Phone className="h-[18px] w-[18px]" />
          </a>
          <Link
            to="/contact"
            className={`${primaryCta} hidden lg:inline-flex px-5 py-2.5 text-[13px]`}
          >
            Book a Strategy Call
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          {/* mobile actions — single CTA + bare hamburger, kept clean */}
          <div className="flex items-center gap-4 lg:hidden">
            <Link to="/contact" className={`${primaryCta} inline-flex px-5 py-2.5 text-[13px]`}>
              Book a Call
            </Link>
            <MobileMenu />
          </div>
        </div>
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
          <stop offset="0%" stopColor="rgb(16,185,129)" stopOpacity="0.16" />
          <stop offset="55%" stopColor="rgb(16,185,129)" stopOpacity="0.06" />
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
        <div className="mt-6 h-24 w-full">
          <RevenueSparkline />
        </div>
      </div>
    </motion.div>
  );
}

/* --------------------- HERO LIVE OPERATING SYSTEM --------------------- */
function HeroTile({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl ${className}`}
    >
      <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
      {children}
    </motion.div>
  );
}

/** Inline number that counts up from zero once it scrolls into view — quick, energetic ease-out. */
function CountUp({ to, format, className = "" }: { to: number; format: (v: number) => string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, to, {
      duration: 1.7,
      ease: "easeOut", // smooth, controlled deceleration — confident roll, no jitter
      onUpdate(v) {
        node.textContent = format(v);
      },
      onComplete() {
        node.textContent = format(to);
      },
    });
    return () => controls.stop();
  }, [inView, to]);
  return (
    <span ref={ref} className={className}>
      {format(0)}
    </span>
  );
}

/** Headline metric for the hero dashboard — label above a dominant number. */
function HeroStat({ to, format, label }: { to: number; format: (v: number) => string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/[0.1] bg-gradient-to-b from-white/[0.06] to-white/[0.02] px-4 py-4 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
      <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/55">{label}</div>
      <CountUp
        to={to}
        format={format}
        className="mt-3 block font-display text-3xl sm:text-4xl font-extrabold leading-none tracking-tight tabular-nums text-white"
      />
    </div>
  );
}

function HeroDashboard() {
  const pill = "rounded-full border border-emerald-500/25 bg-emerald-500/[0.08] px-2 py-0.5 text-[10px] font-medium text-emerald-300";
  const events: { icon: typeof PhoneCall; label: string; meta: string; time: string; right: React.ReactNode }[] = [
    { icon: PhoneCall, label: "Incoming Call", meta: "+61 04•• ••• 218", time: "0:00", right: <Waveform /> },
    { icon: Bot, label: "AI Receptionist Answered", meta: "0.8s response time", time: "0:01", right: <span className={pill}>Live</span> },
    { icon: CheckCircle2, label: "Lead Qualified", meta: "High intent · roofing", time: "0:24", right: <span className={pill}>Qualified</span> },
    { icon: CalendarCheck, label: "Appointment Booked", meta: "Thu · 3:00 PM", time: "0:38", right: <span className={pill}>Confirmed</span> },
    { icon: Database, label: "CRM Updated", meta: "GoHighLevel · synced", time: "0:39", right: <CheckCircle2 className="h-4 w-4 text-emerald-400" /> },
    { icon: TrendingUp, label: "Revenue Captured", meta: "Job value added to pipeline", time: "0:40", right: <CountUp to={8650} format={(v) => `+$${Math.round(v).toLocaleString()}`} className="text-[12px] font-semibold tabular-nums text-emerald-400" /> },
  ];
  return (
    <div className="relative">
      {/* ambient halo — the dark UI against the bright hero is the centrepiece */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 -z-10 rounded-[44px] blur-3xl"
        style={{ background: "radial-gradient(ellipse at center, rgba(16,185,129,0.20), transparent 70%)" }}
      />
      <div className="overflow-hidden rounded-[26px] border border-white/10 bg-gradient-to-b from-[#181818] to-[#141414] shadow-[0_40px_90px_-48px_rgba(0,0,0,0.6)]">
        <span aria-hidden className="block h-px w-full bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

        {/* window chrome + integrated metrics */}
        <div className="border-b border-white/[0.07] px-5 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/[0.12] px-2.5 py-1">
              <LiveDot />
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-300">Live</span>
            </span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2.5">
            <HeroStat to={178} format={(v) => `${Math.round(v)}`} label="Bookings This Month" />
            <HeroStat to={96.2} format={(v) => `$${v.toFixed(1)}K`} label="EST. Monthly Revenue" />
          </div>
        </div>

        {/* live activity feed — one interface, the whole story */}
        <div className="relative px-5 py-5 sm:px-6">
          <div aria-hidden className="absolute left-[33px] top-7 bottom-7 w-px bg-white/10 sm:left-[37px]" />
          <motion.div
            aria-hidden
            className="absolute left-[33px] top-7 w-px origin-top bg-gradient-to-b from-emerald-500 via-emerald-500/60 to-transparent sm:left-[37px]"
            style={{ bottom: 28 }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          />
          <div className="space-y-2.5">
            {events.map((e, i) => {
              const Icon = e.icon;
              return (
                <motion.div
                  key={e.label}
                  className="relative flex items-center gap-3"
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: 0.25 + i * 0.18, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-emerald-500/30 bg-[#141414] shadow-[0_0_0_4px_rgba(20,20,20,1)]">
                    <Icon className="h-4 w-4 text-emerald-400" />
                  </span>
                  <div className="flex flex-1 items-center justify-between gap-2 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2">
                    <div className="min-w-0">
                      <div className="truncate text-[13px] font-medium text-white">{e.label}</div>
                      <div className="truncate text-[11px] text-white/45">{e.meta}</div>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      {e.right}
                      <span className="text-[10px] tabular-nums text-white/30">{e.time}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
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
      className="relative isolate min-h-screen overflow-hidden bg-[#E9F7EE] pt-28"
    >
      {/* fine engineered grid sitting directly on the flat emerald canvas */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(6,78,59,0.09) 1px, transparent 1px), linear-gradient(to bottom, rgba(6,78,59,0.09) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      <motion.div
        style={{ y, opacity }}
        className="relative mx-auto max-w-7xl px-6 pt-6 pb-28 sm:pt-10 sm:pb-24"
      >
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* LEFT — message */}
          <div className="text-left lg:col-span-7">
            <Reveal delay={0.05}>
              <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-emerald-800/70">
                AI Revenue Infrastructure for Aussie Businesses
              </p>
            </Reveal>

            <Reveal delay={0.15} className="w-full">
              <h1 className="font-headline mt-5 text-[clamp(3.25rem,6.8vw,6.5rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.02em] text-[#0a0b0b]">
                <span className="block">Never miss</span>
                <span className="block">
                  Another <span className="text-emerald-500">Lead.</span>
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.3}>
              <p className="mt-7 max-w-xl text-pretty text-base md:text-lg leading-relaxed text-muted-foreground">
                <span className="font-semibold text-foreground">Our AI</span> answers every
                call, qualifies every lead, books every opportunity and updates your CRM
                automatically. So your team spends more time winning work instead of
                chasing enquiries.
              </p>
            </Reveal>

            <Reveal delay={0.42}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <Link
                  to="/demo"
                  className={`${primaryCta} flex w-full items-center justify-center px-7 py-4 text-[15px] sm:w-auto`}
                >
                  Live Demo
                  <ArrowRight className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
                <a
                  href="#results"
                  className="btn-pulse-ring group flex w-full items-center justify-center gap-2 rounded-xl border border-black/40 bg-white px-7 py-4 text-[15px] font-semibold text-foreground transition-all duration-200 ease-out hover:-translate-y-[3px] hover:bg-black/[0.04] hover:shadow-[0_16px_34px_-16px_rgba(0,0,0,0.4)] sm:w-auto"
                >
                  See What&rsquo;s Missing
                  <ArrowRight className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>
              </div>
            </Reveal>

            {/* curiosity line — leads the eye toward exploring / booking */}
            <Reveal delay={0.5}>
              <a
                href="#reviews"
                className="group mt-7 inline-flex items-center gap-1.5 text-[13px] font-medium text-foreground/70 transition-colors duration-300 hover:text-foreground"
              >
                See why Melbourne businesses are switching
                <ArrowRight className="h-4 w-4 text-emerald-600 transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
            </Reveal>

            {/* Google review card + location — part of the wording column */}
            <Reveal delay={0.58}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <div className="inline-flex items-center gap-3 rounded-2xl border border-black/[0.06] bg-white px-5 py-3.5 shadow-[0_18px_40px_-22px_rgba(0,0,0,0.32)]">
                  <GoogleG className="h-5 w-5" />
                  <span className="text-[16px] font-semibold tabular-nums text-foreground">4.8</span>
                  <Stars />
                </div>
                <span className="text-[14px] font-medium text-foreground">Melbourne, VIC</span>
              </div>
            </Reveal>
          </div>

          {/* RIGHT — single live operating-system interface */}
          <div className="lg:col-span-5">
            <Reveal delay={0.25}>
              <HeroDashboard />
            </Reveal>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ------------------------------ TRUST ------------------------------ */


const TRUST_REVIEWS = [
  {
    name: "James R.",
    industry: "Roofing",
    time: "3 weeks ago",
    quote: "Answers every call while we're up on a roof. It picked up three jobs in the first month that we'd have missed completely.",
  },
  {
    name: "Sarah L.",
    industry: "Dental Clinic",
    time: "1 month ago",
    quote: "New patient enquiries are handled instantly and land straight in our system. The front desk finally has room to breathe.",
  },
  {
    name: "Michael T.",
    industry: "Law Firm",
    time: "2 months ago",
    quote: "It screens enquiries and books consultations without anyone lifting a finger. Professional, calm and genuinely reliable.",
  },
  {
    name: "Luke H.",
    industry: "Plumbing",
    time: "6 weeks ago",
    quote: "Answers everything, even after hours. The bookings are just waiting for me in the morning. Paid for itself almost immediately.",
  },
  {
    name: "Daniel K.",
    industry: "Electrical",
    time: "2 weeks ago",
    quote: "Most customers have no idea it isn't a person. It qualifies the lead and updates our CRM automatically — nothing to chase.",
  },
  {
    name: "Rebecca M.",
    industry: "Real Estate",
    time: "3 months ago",
    quote: "Responds instantly every time, day or night. Nothing slips through anymore and the whole office feels on top of things.",
  },
];

const reviewInitials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .join("");

// premium, muted avatar backgrounds — one tasteful colour per reviewer
const REVIEW_AVATARS = [
  { bg: "bg-emerald-500/15", text: "text-emerald-300" }, // deep emerald
  { bg: "bg-blue-500/15", text: "text-blue-300" }, // muted blue
  { bg: "bg-purple-500/15", text: "text-purple-300" }, // soft purple
  { bg: "bg-orange-500/15", text: "text-orange-300" }, // warm orange
  { bg: "bg-white/[0.08]", text: "text-white/80" }, // charcoal
  { bg: "bg-teal-500/15", text: "text-teal-300" }, // muted teal
];

function Trust() {
  const trackRef = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const drag = useRef({ down: false, startX: 0, startLeft: 0 });
  // duplicate the set so the strip can loop seamlessly
  const loop = [...TRUST_REVIEWS, ...TRUST_REVIEWS];

  // continuous right-to-left auto-scroll; wraps at the halfway point
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf = 0;
    let last = performance.now();
    const speed = 95; // px per second — dynamic but still readable
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (!paused.current && !drag.current.down) {
        el.scrollLeft += speed * dt;
      }
      // one set + its trailing gap = exact seamless loop point (gap-4 = 16px)
      const wrap = (el.scrollWidth + 16) / 2;
      if (wrap > 0) {
        if (el.scrollLeft >= wrap) el.scrollLeft -= wrap;
        else if (el.scrollLeft < 0) el.scrollLeft += wrap;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return; // touch uses native scroll
    const el = trackRef.current;
    if (!el) return;
    drag.current = { down: true, startX: e.clientX, startLeft: el.scrollLeft };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current.down) return;
    const el = trackRef.current;
    if (!el) return;
    el.scrollLeft = drag.current.startLeft - (e.clientX - drag.current.startX);
  };
  const endDrag = () => {
    drag.current.down = false;
  };
  const nudge = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <section id="reviews" className="relative overflow-hidden bg-[#141414] py-12 lg:py-16">
      <div className="mx-auto mb-7 flex max-w-7xl items-end justify-between gap-6 px-6">
        <Reveal>
          <div>
            <div className="flex items-center gap-2">
              <Stars rating={4.8} />
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/55">
                Trusted on Google
              </span>
            </div>
            <p className="mt-2 text-[15px] font-medium text-white/90">
              Rated 4.8 — trusted by operators across Melbourne.
            </p>
          </div>
        </Reveal>

        {/* subtle arrows */}
        <div className="hidden shrink-0 items-center gap-2 sm:flex">
          <button
            type="button"
            aria-label="Previous reviews"
            onClick={() => nudge(-1)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/50 transition-colors duration-300 hover:border-white/25 hover:text-white/90"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Next reviews"
            onClick={() => nudge(1)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/50 transition-colors duration-300 hover:border-white/25 hover:text-white/90"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* auto-scrolling trust strip — pauses on hover, swipe on mobile */}
      <div
        ref={trackRef}
        onMouseEnter={() => (paused.current = true)}
        onMouseLeave={() => (paused.current = false)}
        onTouchStart={() => (paused.current = true)}
        onTouchEnd={() => (paused.current = false)}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        className="no-scrollbar flex gap-4 overflow-x-auto px-6 pb-2 select-none"
      >
        {loop.map((r, i) => (
          <figure
            key={`${r.name}-${i}`}
            className="flex w-[280px] shrink-0 flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.16] hover:bg-white/[0.05]"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="relative shrink-0">
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-[12px] font-semibold ${REVIEW_AVATARS[i % REVIEW_AVATARS.length].bg} ${REVIEW_AVATARS[i % REVIEW_AVATARS.length].text}`}
                  >
                    {reviewInitials(r.name)}
                  </span>
                  {/* Google authenticity marker */}
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-[15px] w-[15px] items-center justify-center rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.35)] ring-1 ring-black/5">
                    <GoogleG className="h-2.5 w-2.5" />
                  </span>
                </div>
                <div className="min-w-0 leading-tight">
                  <div className="text-[13px] font-semibold text-white">{r.name}</div>
                  <div className="text-[11px] text-white/45">{r.industry}</div>
                </div>
              </div>
              <span className="shrink-0 whitespace-nowrap text-[11px] text-white/30">{r.time}</span>
            </div>
            <Stars className="mt-4" rating={4.8} />
            <blockquote className="mt-3 text-[13px] leading-relaxed text-white/65">
              {r.quote}
            </blockquote>
          </figure>
        ))}
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

/* ---------------- BEAT 3 · THE HIDDEN PROBLEM (revenue leaks) ---------------- */

/* A thin track whose fill quietly recedes once in view — money draining away. */
function LeakBar() {
  return (
    <div className="relative h-1 w-24 overflow-hidden rounded-full bg-black/[0.06]">
      <motion.div
        className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-black/30 to-black/10"
        initial={{ width: "100%" }}
        whileInView={{ width: "22%" }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1.7, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
      />
    </div>
  );
}

function HiddenLeaks() {
  const leaks: { icon: typeof Clock; title: string; desc: string }[] = [
    { icon: Clock, title: "Slow responses", desc: "Leads go cold in minutes. Reply late and they've already called someone else." },
    { icon: PhoneMissed, title: "Missed calls", desc: "On a job, after hours, double-booked — every call you can't take is handed to a competitor." },
    { icon: ClipboardList, title: "Manual admin", desc: "Hours lost to data entry, callbacks and chasing — instead of billable work." },
    { icon: RefreshCw, title: "Weak follow-up", desc: "Most enquiries need five touches to convert. Most businesses stop after one." },
    { icon: Inbox, title: "Lost enquiries", desc: "Forms, DMs and voicemails that slip through the cracks and never come back." },
  ];
  return (
    <section id="problem" className="relative overflow-hidden border-y border-black/[0.05] py-20 lg:py-28">
      {/* tonal background + faint grid — same material language as the rest of the page */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-[#fafafb] to-[#f5f6f7]" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid opacity-[0.05] [mask-image:radial-gradient(ellipse_at_center,black_15%,transparent_72%)]" />

      <div className="mx-auto max-w-6xl px-6">
        {/* editorial intro — deliberately not a card grid */}
        <div className="max-w-3xl">
          <Reveal>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-emerald-500/70" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.34em] text-emerald-600">
                The Hidden Problem
              </span>
            </div>
            <h2 className="font-headline text-5xl md:text-7xl font-extrabold uppercase leading-[0.92] tracking-[-0.02em] text-[#0a0b0b]">
              The real problem isn&rsquo;t missed calls.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg md:text-xl leading-relaxed text-muted-foreground">
              It&rsquo;s everything that leaks out around them — the slow replies, the
              dropped follow-ups, the enquiries no one ever saw. Each gap looks small.
              Together, they cost you more than any single lost job.
            </p>
          </Reveal>
        </div>

        {/* the leak ledger — hairline rows, revenue quietly draining */}
        <div className="mt-14 lg:mt-16">
          <Reveal>
            <div className="mb-4 flex items-center justify-between text-[10.5px] uppercase tracking-[0.28em] text-muted-foreground/60">
              <span>Where the revenue goes</span>
              <span className="hidden sm:inline">Leaking</span>
            </div>
          </Reveal>
          <div className="border-t border-black/[0.08]">
            {leaks.map((l, i) => {
              const Icon = l.icon;
              return (
                <Reveal key={l.title} delay={0.06 * i}>
                  <div className="group flex items-center gap-5 border-b border-black/[0.08] py-6 transition-colors duration-300 hover:bg-black/[0.015]">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-black/[0.08] bg-white text-foreground/70 transition-colors duration-300 group-hover:border-black/15 group-hover:text-foreground">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-[16px] md:text-[17px] font-semibold tracking-tight text-foreground">{l.title}</div>
                      <p className="mt-1 max-w-xl text-[13.5px] md:text-sm leading-relaxed text-muted-foreground">{l.desc}</p>
                    </div>
                    <div className="hidden shrink-0 items-center gap-3 sm:flex">
                      <LeakBar />
                      <ArrowDown className="h-4 w-4 text-foreground/25" />
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* the turn — pulls the eye toward the cost of standing still */}
          <Reveal delay={0.1}>
            <div className="mt-12 flex flex-col items-center gap-4 text-center">
              <p className="text-[15px] md:text-base font-medium text-foreground/80">
                And that&rsquo;s one week. Now count every week you&rsquo;ve been open.
              </p>
              <motion.span
                aria-hidden
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.08] text-foreground/40"
              >
                <ArrowDown className="h-4 w-4" />
              </motion.span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- BEAT 4 · THE COST OF STANDING STILL ---------------- */

/* Precise −/+ control — engineered feel, full visual control on the dark canvas. */
function Stepper({
  label,
  value,
  onChange,
  min,
  max,
  step,
  format,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
}) {
  const set = (v: number) => onChange(Math.min(max, Math.max(min, v)));
  const btn =
    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.04] text-white/70 transition-all duration-200 hover:border-emerald-500/40 hover:text-white active:scale-95 disabled:opacity-30 disabled:hover:border-white/[0.12]";
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="text-[11px] uppercase tracking-[0.22em] text-white/45">{label}</div>
      <div className="mt-3 flex items-center justify-between gap-3">
        <button type="button" aria-label={`Decrease ${label}`} disabled={value <= min} onClick={() => set(value - step)} className={btn}>
          <Minus className="h-4 w-4" />
        </button>
        <div className="font-display text-3xl tabular-nums text-white">{format(value)}</div>
        <button type="button" aria-label={`Increase ${label}`} disabled={value >= max} onClick={() => set(value + step)} className={btn}>
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

/* Tween a currency figure to its new value — counts up on entry, eases on change. */
function AnimatedMoney({ value, className = "" }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const prev = useRef(0);
  const started = useRef(false);
  const inView = useInView(ref, { margin: "-40px" });
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!started.current && !inView) {
      node.textContent = `$${Math.round(value).toLocaleString()}`;
      return;
    }
    started.current = true;
    const controls = animate(prev.current, value, {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) {
        node.textContent = `$${Math.round(v).toLocaleString()}`;
      },
    });
    prev.current = value;
    return () => controls.stop();
  }, [value, inView]);
  return (
    <span ref={ref} className={className}>{`$${Math.round(value).toLocaleString()}`}</span>
  );
}

function CostOfStandingStill() {
  const [missed, setMissed] = useState(15);
  const [avgJob, setAvgJob] = useState(400);
  const BOOK_RATE = 0.3;
  const perYear = Math.round(missed * 52 * avgJob * BOOK_RATE);
  const perMonth = Math.round(perYear / 12);
  return (
    <>
      {/* fade from the light story into the dark tension beat */}
      <div
        aria-hidden
        style={{
          height: "100px",
          marginBottom: "-1px",
          background: "linear-gradient(180deg, #f5f6f7 0%, #d6d9d8 45%, #0a0c0b 100%)",
        }}
      />
      <section
        id="cost"
        className="relative overflow-hidden py-20 lg:py-28"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 85% 8%, rgba(16,185,129,0.06), transparent 55%), linear-gradient(180deg, #0a0c0b 0%, #070908 55%, #0a0c0b 100%)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.05] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        <div className="relative mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <div className="mb-6 inline-flex items-center gap-3">
                <span className="h-px w-10 bg-emerald-500/70" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/55">
                  The Cost of Standing Still
                </span>
                <span className="h-px w-10 bg-emerald-500/70" />
              </div>
              <h2 className="font-headline text-5xl md:text-7xl font-extrabold uppercase leading-[0.92] tracking-[-0.02em]">
                <span className="bg-gradient-to-b from-white via-white to-white/60 bg-clip-text text-transparent">
                  Standing still isn&rsquo;t free.
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-5 max-w-md text-[15px] md:text-base leading-relaxed text-white/55">
                Put in your own numbers. This is what those gaps quietly cost you
                every single year.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-2 lg:items-center">
            {/* inputs */}
            <Reveal>
              <div className="grid gap-4 sm:grid-cols-2">
                <Stepper label="Missed calls / week" value={missed} onChange={setMissed} min={0} max={80} step={1} format={(v) => `${v}`} />
                <Stepper label="Average job value" value={avgJob} onChange={setAvgJob} min={50} max={5000} step={50} format={(v) => `$${v.toLocaleString()}`} />
              </div>
            </Reveal>

            {/* result */}
            <Reveal delay={0.12}>
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-7 backdrop-blur-xl shadow-[0_40px_100px_-50px_rgba(0,0,0,0.8)]">
                <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(16,185,129,0.45), transparent)" }} />
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/45">
                  <TrendingDown className="h-4 w-4 text-white/40" /> Revenue lost / year
                </div>
                <AnimatedMoney value={perYear} className="mt-2 block font-headline text-5xl md:text-6xl font-extrabold tabular-nums text-white" />
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-white/[0.08] pt-4 text-[13px] text-white/55">
                  <span><AnimatedMoney value={perMonth} className="font-semibold text-white/80" /> / month</span>
                  <span className="text-white/25">·</span>
                  <span>at a conservative {Math.round(BOOK_RATE * 100)}% booking rate</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* the turn toward the solution */}
          <Reveal delay={0.1}>
            <p className="mx-auto mt-12 max-w-xl text-center text-[15px] md:text-base leading-relaxed text-white/60">
              Every month you wait, that number repeats.{" "}
              <span className="text-white">Now imagine it working for you instead.</span>
            </p>
          </Reveal>
        </div>
      </section>
      {/* fade back out of the dark beat into the light story */}
      <div
        aria-hidden
        style={{
          height: "100px",
          marginTop: "-1px",
          background: "linear-gradient(180deg, #0a0c0b 0%, #d6d9d8 55%, #ffffff 100%)",
        }}
      />
    </>
  );
}

/* ---------------- BEAT 5 · LIFE AFTER MONTARRO (the transformation) ---------------- */

/* The "before" state — a business running without structure. Dark charcoal,
   subtle red accents, soft red ambient glow: stress and overload, not alarm. */
function BeforeState() {
  const missedRef = useCountUp(12, true);
  const pile = [
    { icon: PhoneMissed, label: "Missed call · Mark R.", tag: "2m" },
    { icon: Mail, label: "Voicemail", tag: "unread" },
    { icon: ClipboardList, label: "Quote #1184", tag: "overdue 3d" },
    { icon: RefreshCw, label: "Follow-up · Sarah", tag: "forgotten" },
  ];
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-b from-[#181311] to-[#0d0a09] p-6 shadow-[0_40px_90px_-50px_rgba(0,0,0,0.85)] sm:p-7">
      {/* soft red ambient glow — stress, not alarm */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 right-[-12%] h-60 w-72 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(208,66,58,0.18), transparent 65%)" }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/25 to-transparent" />

      {/* late, and the phone is still ringing with no one to answer */}
      <div className="relative flex items-center justify-between">
        <span className="inline-flex items-center gap-2 text-[12px] font-medium text-white/45">
          <motion.span
            className="h-2 w-2 rounded-full bg-red-500/90"
            animate={{ opacity: [1, 0.2, 1], scale: [1, 0.8, 1] }}
            transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
          />
          Ringing — no answer
        </span>
        <span className="text-[12px] tabular-nums text-white/30">9:41 PM</span>
      </div>

      {/* overwhelm — the number that keeps climbing */}
      <div className="relative mt-6 flex items-end gap-2.5">
        <span ref={missedRef} className="font-headline text-6xl font-extrabold leading-none tabular-nums text-white">0</span>
        <span className="mb-1.5 text-[13px] text-white/40">missed this week</span>
      </div>
      <div className="relative mt-3 flex items-center gap-2.5">
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
          <motion.div
            className="h-full rounded-full bg-red-500/55"
            initial={{ width: "34%" }}
            whileInView={{ width: "96%" }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          />
        </div>
        <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-red-400/70">Overloaded</span>
      </div>

      {/* the pile — disconnected scraps, nothing tying them together */}
      <div className="relative mt-6 space-y-2">
        {pile.map((p, i) => {
          const I = p.icon;
          return (
            <Reveal key={p.label} delay={0.05 * i}>
              <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] px-3.5 py-2.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] text-white/40">
                  <I className="h-3.5 w-3.5" />
                </span>
                <span className="flex-1 truncate text-[13px] text-white/65">{p.label}</span>
                <span className="shrink-0 rounded-full border border-red-500/25 bg-red-500/[0.08] px-2 py-0.5 text-[10px] font-medium text-red-300/90">
                  {p.tag}
                </span>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* the real problem, named */}
      <div className="relative mt-auto flex items-center gap-3 pt-6 text-[10.5px] uppercase tracking-[0.2em] text-white/30">
        <span className="h-px flex-1 bg-white/10" />
        No system holding it together
        <span className="h-px flex-1 bg-white/10" />
      </div>
    </div>
  );
}

/* The "after" state — one connected operating system. Deep emerald glass, soft
   green glow: confidence, automation and control. */
function AfterState() {
  const flow = [
    { icon: PhoneCall, label: "Answer" },
    { icon: CheckCircle2, label: "Qualify" },
    { icon: CalendarCheck, label: "Book" },
    { icon: Database, label: "Sync" },
    { icon: Workflow, label: "Nurture" },
  ];
  const stats = [
    { v: "0", l: "Missed" },
    { v: "0.8s", l: "Response" },
    { v: "100%", l: "Booked" },
  ];
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-emerald-400/20 bg-gradient-to-b from-[#06281d] to-[#03120c] p-6 shadow-[0_40px_90px_-46px_rgba(16,185,129,0.5)] sm:p-7">
      {/* soft green ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-56 w-[130%] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(ellipse at center, rgba(16,185,129,0.2), transparent 65%)" }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />

      {/* one connected system, always on */}
      <div className="relative flex items-center justify-between">
        <span className="inline-flex items-center gap-2 text-[12px] font-medium text-emerald-100/85">
          <LiveDot /> One connected system
        </span>
        <span className="text-[12px] tabular-nums text-emerald-200/40">24/7</span>
      </div>

      {/* the pipeline — one flow, automation moving through it */}
      <div className="relative mt-8 flex items-center justify-between">
        {flow.map((n, i) => {
          const I = n.icon;
          return (
            <div key={n.label} className="flex flex-1 flex-col items-center last:flex-none">
              <div className="relative flex w-full items-center justify-center">
                <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-emerald-400/25 bg-emerald-400/[0.08] text-emerald-200">
                  <I className="h-4 w-4" />
                </span>
                {i < flow.length - 1 && (
                  <div className="relative mx-1 h-px flex-1 bg-emerald-400/20">
                    <motion.span
                      className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.9)]"
                      animate={{ left: ["-6px", "100%"] }}
                      transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut", delay: i * 0.35 }}
                    />
                  </div>
                )}
              </div>
              <span className="mt-2 text-[9px] uppercase tracking-wider text-emerald-200/55">{n.label}</span>
            </div>
          );
        })}
      </div>

      {/* calm proof */}
      <div className="relative mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-emerald-400/15 bg-emerald-400/[0.06]">
        {stats.map((s) => (
          <div key={s.l} className="bg-[#04160f]/85 px-3 py-3 text-center">
            <div className="font-display text-lg tabular-nums text-white">{s.v}</div>
            <div className="mt-0.5 text-[9.5px] uppercase tracking-[0.14em] text-emerald-200/45">{s.l}</div>
          </div>
        ))}
      </div>

      <div className="relative mt-auto pt-6 text-[12px] font-medium text-emerald-100/75">
        Nothing waiting. Nothing slipping. It just runs.
      </div>
    </div>
  );
}

function LifeAfter() {
  return (
    <section id="transformation" className="relative overflow-hidden py-24 lg:py-32">
      {/* bright, airy canvas — the two states sit on it as dark UI panels */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-white" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[460px]"
        style={{ background: "radial-gradient(ellipse 62% 70% at 50% 0%, rgba(16,185,129,0.08), transparent 70%)" }}
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid opacity-[0.04] [mask-image:radial-gradient(ellipse_at_center,black_15%,transparent_70%)]" />

      <div className="mx-auto max-w-6xl px-6">
        {/* intro */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <div className="mb-6 inline-flex items-center gap-3">
              <span className="h-px w-10 bg-emerald-500/70" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-600">
                Life After Montarro
              </span>
              <span className="h-px w-10 bg-emerald-500/70" />
            </div>
            <h2 className="font-headline text-5xl md:text-7xl font-extrabold uppercase leading-[0.92] tracking-[-0.02em] text-[#0a0b0b]">
              From chaos to control.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-xl text-lg md:text-xl leading-relaxed text-muted-foreground">
              You&rsquo;re not missing skill. You&rsquo;re missing structure. One
              connected system answers, captures, follows up and books
              automatically &mdash; so your business finally runs with you, not
              against you.
            </p>
          </Reveal>
        </div>

        {/* two states of the business — overloaded chaos → one calm system */}
        <div className="mt-16 grid items-stretch gap-5 lg:mt-20 lg:grid-cols-[1fr_auto_1fr] lg:gap-7">
          <Reveal className="h-full">
            <BeforeState />
          </Reveal>

          {/* the transformation — the business flowing from one state into the other */}
          <div className="relative flex items-center justify-center py-1 lg:py-0">
            {/* horizontal conduit (desktop) */}
            <div aria-hidden className="absolute left-1/2 top-1/2 hidden h-px w-28 -translate-x-1/2 -translate-y-1/2 lg:block">
              <div className="h-full w-full rounded-full bg-gradient-to-r from-white/10 via-emerald-500/40 to-emerald-400/70" />
              <motion.span
                className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(16,185,129,1)]"
                animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            {/* vertical conduit (mobile) */}
            <div aria-hidden className="absolute left-1/2 top-1/2 block h-16 w-px -translate-x-1/2 -translate-y-1/2 lg:hidden">
              <div className="h-full w-full rounded-full bg-gradient-to-b from-white/10 via-emerald-500/40 to-emerald-400/70" />
              <motion.span
                className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(16,185,129,1)]"
                animate={{ top: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            {/* node */}
            <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-emerald-400/30 bg-[#04160f] text-emerald-300 shadow-[0_14px_34px_-12px_rgba(16,185,129,0.7)]">
              <motion.span
                aria-hidden
                className="absolute inset-0 rounded-full border border-emerald-400/40"
                animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              />
              <ArrowRight className="h-5 w-5 rotate-90 lg:rotate-0" />
            </span>
          </div>

          <Reveal className="h-full" delay={0.12}>
            <AfterState />
          </Reveal>
        </div>

        {/* the takeaway */}
        <Reveal delay={0.1}>
          <p className="mt-16 text-center font-headline text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-[#0a0b0b]">
            Same business.{" "}
            <span className="text-emerald-600">Completely different system.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function MissedRevenue() {
  return (
    <section id="ai-receptionist" className="relative overflow-hidden border-y border-black/[0.05] py-20 lg:py-28">
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
                <span className="text-[11px] font-semibold uppercase tracking-[0.34em] text-emerald-600">
                  The Problem
                </span>
              </div>
              <h2 className="font-headline text-5xl md:text-7xl font-extrabold uppercase leading-[0.92] tracking-[-0.02em] text-[#0a0b0b]">
                Missed calls are lost revenue.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-base md:text-lg font-medium text-foreground">
                Every missed call costs you money.
              </p>
              <p className="mt-4 max-w-xl text-base md:text-lg leading-relaxed text-muted-foreground">
                Most businesses don&rsquo;t lose work because they&rsquo;re bad at what
                they do&mdash;they lose it because no one answers the phone. While
                you&rsquo;re on-site, with another customer or after hours, new
                enquiries keep coming in. Every unanswered call is another customer
                choosing your competitor instead.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <Link
                to="/demo"
                className={`${primaryCta} mt-8 inline-flex px-6 py-3 text-sm`}
              >
                <PlayCircle className="h-4 w-4" />
                Try the AI Receptionist Live
              </Link>
            </Reveal>
          </div>

          {/* RIGHT — how the AI receptionist handles every call (clean process list) */}
          <Reveal delay={0.15}>
            <ol className="space-y-3">
              {[
                { t: "Answers instantly", d: "Picks up every call in under a second, 24/7 — even after hours and on weekends." },
                { t: "Qualifies the enquiry", d: "Asks the right questions and identifies the high-intent leads worth your time." },
                { t: "Captures every detail", d: "Records the caller, the job and the context, so nothing is lost or forgotten." },
                { t: "Moves it into your CRM", d: "Books the appointment and syncs the lead automatically — ready for your team." },
              ].map((s, i) => (
                <li
                  key={s.t}
                  className="flex gap-4 rounded-2xl border border-black/[0.08] bg-white/80 p-4 backdrop-blur transition-all duration-300 hover:border-emerald-500/30 hover:bg-white hover:shadow-[0_24px_60px_-44px_rgba(16,185,129,0.4)]"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-emerald-500/25 bg-emerald-500/10 font-display text-sm font-semibold tabular-nums text-emerald-700">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <div className="text-[15px] font-semibold text-foreground">{s.t}</div>
                    <p className="mt-1 text-[13.5px] leading-relaxed text-muted-foreground">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
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

/* -------------------------- INFRASTRUCTURE MODULES -------------------------- */

function ModuleAreaChart() {
  const id = useId();
  const line =
    "M0,46 C20,44 30,40 46,34 C64,27 76,30 92,22 C110,13 124,16 140,10 C156,5 176,5 200,3";
  return (
    <svg viewBox="0 0 200 56" preserveAspectRatio="none" className="h-full w-full">
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="rgb(16,185,129)" stopOpacity="0.26" />
          <stop offset="100%" stopColor="rgb(16,185,129)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={`${line} L200,56 L0,56 Z`}
        fill={`url(#${id})`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        className="transition-opacity duration-500 group-hover:opacity-90"
      />
      <motion.path
        d={line}
        fill="none"
        stroke="rgb(5,150,105)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      />
    </svg>
  );
}

function RevenueCaptureViz() {
  return (
    <div className="flex h-full flex-col justify-center gap-1.5">
      <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5">
        <PhoneCall className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
        <span className="flex-1 truncate text-[11px] text-white/80">Incoming · +61 4•• 218</span>
        <Waveform />
      </div>
      <div className="flex items-center justify-between rounded-lg border border-emerald-500/20 bg-emerald-500/[0.08] px-2.5 py-1.5">
        <span className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-300">
          <CheckCircle2 className="h-3.5 w-3.5" /> Lead Qualified
        </span>
        <span className="text-[10px] text-emerald-300/80">0.8s</span>
      </div>
      <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5">
        <span className="flex items-center gap-1.5 text-[11px] text-white/80">
          <CalendarCheck className="h-3.5 w-3.5 text-emerald-400" /> Appointment Booked
        </span>
        <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[9px] font-medium text-emerald-300">Thu 3:00 PM</span>
      </div>
    </div>
  );
}

function DemandViz() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-end justify-between">
        <div className="transition-transform duration-500 group-hover:-translate-y-0.5">
          <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">ROAS</div>
          <div className="font-display text-2xl tracking-tight text-foreground tabular-nums">6.4x</div>
        </div>
        <span className="text-[11px] font-medium text-emerald-600">+92%</span>
      </div>
      <div className="relative mt-1 min-h-0 flex-1 origin-bottom transition-transform duration-500 group-hover:scale-[1.03]">
        <ModuleAreaChart />
      </div>
      <div className="mt-1 flex justify-between text-[10px] text-muted-foreground tabular-nums">
        <span>Spend $48.2K</span>
        <span>Conv 4.8%</span>
        <span>CPL $4.20</span>
      </div>
    </div>
  );
}

function AutomationViz() {
  const nodes = [
    { icon: Activity, label: "Trigger" },
    { icon: Bot, label: "AI Engine" },
    { icon: Database, label: "CRM" },
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-3">
      <div className="flex items-center">
        {nodes.map((n, i) => {
          const Icon = n.icon;
          return (
            <div key={n.label} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center gap-1">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-black/[0.08] bg-white text-emerald-600 transition-all duration-500 group-hover:border-emerald-500/40 group-hover:shadow-[0_0_18px_-4px_rgba(16,185,129,0.5)]">
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-[9px] uppercase tracking-wider text-muted-foreground">{n.label}</span>
              </div>
              {i < nodes.length - 1 && (
                <div className="relative mx-1 mb-4 h-px flex-1 bg-emerald-500/25">
                  <motion.span
                    className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"
                    animate={{ left: ["-4px", "100%"] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center justify-between rounded-lg border border-black/[0.06] bg-white px-2.5 py-1.5 text-[11px] text-foreground">
          <span className="flex items-center gap-1.5"><Workflow className="h-3.5 w-3.5 text-emerald-600" /> Webhook received</span>
          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
        </div>
        <div className="flex items-center justify-between rounded-lg border border-black/[0.06] bg-white px-2.5 py-1.5 text-[11px] text-foreground">
          <span className="flex items-center gap-1.5"><Database className="h-3.5 w-3.5 text-emerald-600" /> Contact synced · GoHighLevel</span>
          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
        </div>
      </div>
    </div>
  );
}

function AttentionViz() {
  const bars = [38, 54, 46, 68, 58, 82, 96];
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-end justify-between">
        <div className="transition-transform duration-500 group-hover:-translate-y-0.5">
          <div className="text-[10px] uppercase tracking-[0.14em] text-white/50">Reach</div>
          <div className="font-display text-2xl tracking-tight text-white tabular-nums">1.2M</div>
        </div>
        <span className="text-[11px] font-medium text-emerald-400">+38%</span>
      </div>
      <div className="mt-2 flex min-h-0 flex-1 items-end gap-1.5 origin-bottom transition-transform duration-500 group-hover:scale-[1.03]">
        {bars.map((h, i) => (
          <motion.span
            key={i}
            className="flex-1 rounded-sm bg-gradient-to-t from-emerald-500/30 to-emerald-400"
            initial={{ height: 0 }}
            whileInView={{ height: `${h}%` }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.06, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </div>
    </div>
  );
}

function ModuleCard({
  dark = false,
  href,
  hash,
  eyebrow,
  title,
  desc,
  size = "lg",
  status,
  children,
}: {
  dark?: boolean;
  href?: string;
  hash?: string;
  eyebrow: string;
  title: string;
  desc: string;
  size?: "lg" | "sm";
  status?: string[];
  children: React.ReactNode;
}) {
  const isLg = size === "lg";
  return (
    <Link
      to={hash ? "/" : (href ?? "/")}
      hash={hash}
      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl p-5 sm:p-6 transition-all duration-500 ease-out hover:-translate-y-1 ${
        dark
          ? "border border-white/10 bg-gradient-to-b from-[#171717] to-[#0b0b0b] text-white shadow-[0_30px_80px_-42px_rgba(0,0,0,0.7)] hover:border-emerald-500/40 hover:shadow-[0_46px_100px_-45px_rgba(16,185,129,0.5)]"
          : "border border-black/[0.08] bg-gradient-to-b from-white via-white to-[#f3f4f6] text-foreground backdrop-blur-xl shadow-[0_1px_0_0_rgba(255,255,255,0.85)_inset,0_-26px_55px_-44px_rgba(0,0,0,0.10)_inset,0_22px_50px_-30px_rgba(0,0,0,0.16)] hover:border-emerald-500/40 hover:shadow-[0_46px_90px_-40px_rgba(16,185,129,0.32)]"
      }`}
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-100"
      />
      {!dark && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-40 opacity-70"
          style={{ background: "radial-gradient(ellipse 70% 100% at 50% 0%, rgba(255,255,255,0.9), transparent 70%)" }}
        />
      )}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
        <div
          className="absolute -top-32 left-1/2 h-64 w-[120%] -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: "radial-gradient(ellipse at center, rgba(16,185,129,0.18), transparent 60%)" }}
        />
      </div>

      {/* live UI visual */}
      <div
        className={`relative flex ${isLg ? "h-48 sm:h-52" : "h-48"} w-full flex-col overflow-hidden rounded-2xl border p-3.5 backdrop-blur ${
          dark ? "border-white/10 bg-white/[0.03]" : "border-black/[0.06] bg-white/60"
        }`}
      >
        <div className={`mb-2 flex items-center text-[10px] uppercase tracking-[0.16em] ${dark ? "text-white/50" : "text-muted-foreground"}`}>
          <span className="flex items-center gap-1.5"><LiveDot /> {eyebrow}</span>
        </div>
        <div className="relative min-h-0 flex-1">{children}</div>
      </div>

      {/* heading + description + micro-CTA */}
      <div className="relative mt-5 flex items-end justify-between gap-4">
        <div>
          <h3 className={`font-display tracking-tight ${isLg ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"} ${dark ? "text-white" : "text-foreground"}`}>
            {title}
          </h3>
          <p className={`mt-2 text-sm leading-relaxed ${dark ? "text-white/55" : "text-muted-foreground"}`}>{desc}</p>
        </div>
        <span className={`mb-0.5 inline-flex shrink-0 -translate-x-0.5 items-center gap-1 whitespace-nowrap text-[11px] font-medium opacity-45 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:opacity-100 ${dark ? "text-emerald-300" : "text-emerald-600"}`}>
          View System
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>

      {/* operational status — softly revealed on hover */}
      {status && (
        <div className="relative grid grid-rows-[0fr] transition-all duration-500 ease-out group-hover:grid-rows-[1fr]">
          <div className="overflow-hidden">
            <div
              className={`mt-4 flex flex-wrap gap-x-4 gap-y-1.5 border-t pt-3 ${
                dark ? "border-white/10" : "border-black/[0.06]"
              }`}
            >
              {status.map((s) => (
                <span
                  key={s}
                  className={`inline-flex items-center gap-1.5 text-[11px] ${
                    dark ? "text-white/55" : "text-muted-foreground"
                  }`}
                >
                  <LiveDot /> {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </Link>
  );
}

/* ---------------- BEAT 6 · WHY BUSINESSES CHOOSE MONTARRO ---------------- */
/* Premium editorial positioning — typical agency vs Montarro. Carries the
   #system nav anchor so the existing "The System" links keep resolving. */

function WhyMontarro() {
  const rows: { agency: string; montarro: string }[] = [
    { agency: "Sells you services.", montarro: "Engineers your revenue infrastructure." },
    { agency: "Delivers a project, then moves on.", montarro: "Builds systems that compound." },
    { agency: "A patchwork of disconnected tools.", montarro: "One connected ecosystem." },
    { agency: "Reports clicks and impressions.", montarro: "Measured on booked jobs and revenue." },
    { agency: "Manual follow-up, when there's time.", montarro: "AI that follows up instantly, every time." },
    { agency: "Reactive support.", montarro: "A long-term operational partner." },
  ];
  return (
    <section id="system" className="relative overflow-hidden bg-[#fafaf9] py-24 lg:py-36">
      {/* hairline top edge to separate from the transformation beat */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-black/[0.06]" />

      <div className="mx-auto max-w-5xl px-6">
        {/* editorial header — left-aligned, generous air */}
        <div className="max-w-3xl">
          <Reveal>
            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-10 bg-emerald-500/70" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.34em] text-emerald-600">
                Why Montarro
              </span>
            </div>
            <h2 className="font-headline text-5xl md:text-7xl font-extrabold uppercase leading-[0.9] tracking-[-0.02em] text-[#0a0b0b]">
              This isn&rsquo;t an agency.
              <br />
              It&rsquo;s <span className="text-emerald-600">revenue infrastructure.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
              You can already see the problem, the cost, and what changes. The only
              question left is who builds it. Most companies sell you services and
              disappear. We engineer one system that runs your growth — and stay to
              run it with you.
            </p>
          </Reveal>
        </div>

        {/* the comparison — borderless editorial spine, deliberately not cards */}
        <div className="mt-16 lg:mt-24">
          {/* column labels */}
          <Reveal>
            <div className="grid grid-cols-2">
              <div className="pb-5 pr-4 text-[10.5px] font-semibold uppercase tracking-[0.28em] text-muted-foreground/45 sm:pr-10">
                Most agencies
              </div>
              <div className="border-l border-black/10 pb-5 pl-4 text-[10.5px] font-semibold uppercase tracking-[0.28em] text-emerald-600 sm:pl-10">
                Montarro
              </div>
            </div>
          </Reveal>

          {rows.map((r, i) => (
            <Reveal key={r.montarro} delay={0.05 * i}>
              <div className="group grid grid-cols-2 border-t border-black/[0.08]">
                {/* agency — receding */}
                <div className="py-7 pr-4 sm:pr-10">
                  <span className="text-[15px] font-light leading-snug text-muted-foreground/70 transition-colors duration-500 group-hover:text-muted-foreground/45 sm:text-lg">
                    {r.agency}
                  </span>
                </div>
                {/* montarro — confident, anchored to the spine */}
                <div className="relative border-l border-black/10 py-7 pl-4 sm:pl-10">
                  <span
                    aria-hidden
                    className="absolute -left-[3.5px] top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-emerald-500/60 transition-all duration-500 group-hover:h-2 group-hover:w-2 group-hover:bg-emerald-500"
                  />
                  <span className="relative inline-block text-[15px] font-medium leading-snug text-foreground sm:text-lg">
                    {r.montarro}
                    <span
                      aria-hidden
                      className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-emerald-500/60 transition-transform duration-500 ease-out group-hover:scale-x-100"
                    />
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
          <div aria-hidden className="border-t border-black/[0.08]" />
        </div>

        {/* the takeaway */}
        <Reveal delay={0.1}>
          <p className="mt-16 max-w-2xl text-xl leading-snug text-foreground sm:text-2xl">
            <span className="text-muted-foreground">You don&rsquo;t need another agency.</span>{" "}
            You need infrastructure that runs without you.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------- EXPERIENCE THE INFRASTRUCTURE --------------------- */

// Replace with your real Retell AI receptionist phone number.
const RECEPTIONIST_TEL = "+610345145084";

function TranscriptPanel() {
  const msgs: { who: "ai" | "caller"; text: string; t: string }[] = [
    { who: "ai", text: "Thanks for calling Montarro — how can I help today?", t: "0:01" },
    { who: "caller", text: "Hi, I need to book a roof inspection.", t: "0:05" },
    { who: "ai", text: "Happy to help. What day works best for you?", t: "0:09" },
    { who: "caller", text: "Thursday afternoon, if possible.", t: "0:13" },
    { who: "ai", text: "Booked — Thursday at 3:00 PM. Confirmation sent.", t: "0:16" },
  ];
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.045] to-white/[0.01] p-5 backdrop-blur-xl shadow-[0_40px_100px_-50px_rgba(0,0,0,0.8)] sm:p-6">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(16,185,129,0.45), transparent)" }} />
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-3.5">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/55">
          <PhoneCall className="h-3.5 w-3.5 text-emerald-400" /> AI Receptionist
          <LiveDot />
        </div>
        <div className="flex items-center gap-2.5">
          <Waveform />
          <span className="text-[11px] tabular-nums text-white/35">00:16</span>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {msgs.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: 0.15 + i * 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={`flex ${m.who === "caller" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[82%] rounded-2xl border px-3.5 py-2.5 ${
                m.who === "ai"
                  ? "border-emerald-500/15 bg-emerald-500/[0.05]"
                  : "border-white/10 bg-white/[0.05]"
              }`}
            >
              <div className="text-[13px] leading-snug text-white/85">{m.text}</div>
              <div className="mt-1 text-[10px] tabular-nums text-white/30">
                {m.who === "ai" ? "Montarro AI" : "Caller"} · {m.t}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2 border-t border-white/[0.06] pt-3 text-[11px] text-white/45">
        <Waveform /> AI speaking…
      </div>
    </div>
  );
}

function CrmFeedPanel() {
  const events = [
    { icon: PhoneCall, label: "Incoming Call", meta: "+61 4•• ••• 218", live: true },
    { icon: CheckCircle2, label: "Lead Qualified", meta: "High intent · roofing" },
    { icon: CalendarCheck, label: "Appointment Booked", meta: "Thu · 3:00 PM" },
    { icon: Database, label: "CRM Updated", meta: "GoHighLevel · synced" },
    { icon: Workflow, label: "Follow-Up Triggered", meta: "SMS sequence" },
  ];
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.045] to-white/[0.01] p-5 backdrop-blur-xl shadow-[0_40px_100px_-50px_rgba(0,0,0,0.8)] sm:p-6">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(16,185,129,0.45), transparent)" }} />
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-3.5 text-[11px] uppercase tracking-[0.18em] text-white/55">
        <span className="flex items-center gap-2"><LiveDot /> CRM Activity</span>
        <span className="tabular-nums text-white/35">Live</span>
      </div>

      <div className="mt-4 space-y-2">
        {events.map((e, i) => {
          const Icon = e.icon;
          return (
            <motion.div
              key={e.label}
              initial={{ opacity: 0, x: -6 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: 0.2 + i * 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 rounded-lg border border-white/[0.05] bg-white/[0.02] px-3 py-2.5 transition-colors duration-300 hover:border-emerald-500/20 hover:bg-white/[0.035]"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] text-emerald-400">
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 text-[13px] text-white/85">
                  <span className="truncate">{e.label}</span>
                  {e.live && <LiveDot />}
                </div>
                <div className="truncate text-[10.5px] text-white/40">{e.meta}</div>
              </div>
              {e.live ? (
                <span className="shrink-0 rounded-full border border-emerald-500/20 bg-emerald-500/[0.08] px-2 py-0.5 text-[10px] font-medium text-emerald-300">
                  Live
                </span>
              ) : (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function ExperienceInfra() {
  return (
    <>
      {/* fade into the dark environment */}
      <div
        aria-hidden
        style={{
          height: "90px",
          marginBottom: "-1px",
          background: "linear-gradient(180deg, #ffffff 0%, #d6d9d8 55%, #0a0c0b 100%)",
        }}
      />
      <section
        id="experience"
        className="relative overflow-hidden py-20 lg:py-24"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 12% 0%, rgba(16,185,129,0.07), transparent 55%), radial-gradient(ellipse 60% 60% at 92% 100%, rgba(16,185,129,0.05), transparent 55%), linear-gradient(180deg, #0a0c0b 0%, #070908 55%, #0a0c0b 100%)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.05] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[760px] -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(16,185,129,0.10), transparent 70%)" }}
          animate={{ opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-white/55 backdrop-blur">
                <LiveDot /> Part of the System · AI Receptionist
              </div>
              <h2 className="font-display text-4xl md:text-6xl leading-[1.04] tracking-[-0.02em]">
                <span className="bg-gradient-to-b from-white via-white to-white/65 bg-clip-text text-transparent">
                  Hear the AI receptionist answer.
                </span>
              </h2>
              <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-white/55">
                The core of the Montarro System — it answers, qualifies and books
                every call in real time, 24/7.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <a href={`tel:${RECEPTIONIST_TEL}`} className={`${primaryCta} inline-flex px-6 py-3 text-sm`}>
                  <Phone className="h-4 w-4" />
                  Call the AI Receptionist
                </a>
                <Link
                  to="/services/ai-receptionists"
                  className="group inline-flex items-center gap-2 rounded-xl border border-white/15 px-6 py-3 text-sm font-medium text-white/80 transition-all duration-300 hover:border-white/35 hover:text-white"
                >
                  Explore the AI Receptionist
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <Reveal>
              <TranscriptPanel />
            </Reveal>
            <Reveal delay={0.1}>
              <CrmFeedPanel />
            </Reveal>
          </div>
        </div>
      </section>
      {/* fade back out into the light section */}
      <div
        aria-hidden
        style={{
          height: "90px",
          marginTop: "-1px",
          background: "linear-gradient(180deg, #0a0c0b 0%, #d6d9d8 55%, #ffffff 100%)",
        }}
      />
    </>
  );
}

/* ------------------------------ RESULTS ------------------------------ */

function useCountUp(target: number, enabled: boolean) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  useEffect(() => {
    if (!enabled || !inView || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, target, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) {
        node.textContent = Math.round(v).toLocaleString();
      },
      onComplete() {
        node.textContent = target.toLocaleString();
      },
    });
    return () => controls.stop();
  }, [enabled, inView, target]);
  return ref;
}

type Metric = {
  display?: string;
  numeric?: number;
  suffix?: string;
  label: string;
  primary?: boolean;
};

function StatCard({ metric }: { metric: Metric }) {
  const isNum = metric.numeric != null;
  const ref = useCountUp(metric.numeric ?? 0, isNum);
  return (
    <div
      className={`group relative h-full overflow-hidden rounded-2xl border px-6 pt-7 pb-6 backdrop-blur-xl transition-all duration-500 ease-out hover:-translate-y-1 ${
        metric.primary
          ? "border-emerald-500/25 bg-gradient-to-b from-emerald-500/[0.04] to-white/[0.02] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6),0_24px_60px_-34px_rgba(16,185,129,0.4)] hover:border-emerald-500/45 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.7),0_34px_80px_-34px_rgba(16,185,129,0.5)]"
          : "border-black/[0.06] bg-gradient-to-b from-white/80 to-white/40 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6),0_20px_50px_-32px_rgba(0,0,0,0.16)] hover:border-emerald-500/30 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.7),0_30px_70px_-32px_rgba(16,185,129,0.32)]"
      }`}
    >
      <span
        aria-hidden
        className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent transition-opacity duration-500 ${
          metric.primary ? "opacity-100" : "opacity-40 group-hover:opacity-100"
        }`}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.10),transparent_60%)]"
      />
      {metric.primary && (
        <div className="absolute right-4 top-4 inline-flex items-center gap-1.5 text-[9px] font-medium uppercase tracking-[0.16em] text-emerald-600">
          <LiveDot /> Live
        </div>
      )}
      <div className="relative font-display text-5xl md:text-6xl text-gradient-chrome tabular-nums">
        {isNum ? (
          <>
            <span ref={ref}>0</span>
            {metric.suffix}
          </>
        ) : (
          metric.display
        )}
      </div>
      <div className="relative mt-2 text-[11px] uppercase tracking-[0.26em] text-muted-foreground/80 font-medium">
        {metric.label}
      </div>
    </div>
  );
}

function BackgroundGraph() {
  return (
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="h-full w-full">
      <motion.path
        d="M0,92 C160,84 250,62 400,56 C560,50 660,74 820,50 C980,28 1080,42 1200,18"
        fill="none"
        stroke="rgba(16,185,129,0.16)"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  );
}

function Results() {
  const metrics: Metric[] = [
    { display: "24/7", label: "Always-on AI response", primary: true },
    { display: "<1s", label: "Average response time", primary: true },
    { numeric: 1000, suffix: "+", label: "Calls handled / client · month" },
    { numeric: 5, suffix: "+", label: "Integrated growth services" },
  ];
  return (
    <section id="results" className="relative overflow-hidden border-t border-black/[0.04] py-20 lg:py-28">
      {/* layered background depth */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white via-[#fbfcfc] to-white" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 mx-auto h-[440px] max-w-4xl"
        style={{ background: "radial-gradient(ellipse 55% 60% at 50% 0%, rgba(16,185,129,0.06), transparent 70%)" }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-[0.05] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_72%)]" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.02] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-16 -z-10 mx-auto h-28 max-w-5xl px-6">
        <BackgroundGraph />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.05] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-emerald-700 backdrop-blur">
            <LiveDot /> Live Infrastructure
          </div>
          <h2 className="max-w-3xl font-display text-5xl md:text-7xl leading-[0.95] text-gradient-chrome">
            Engineered for performance.
          </h2>
          <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">
            Systems designed to capture, qualify, and compound demand at scale.
          </p>
        </Reveal>

        <div className="mt-12 md:mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <Reveal key={m.label} delay={0.05 + i * 0.1}>
              <StatCard metric={m} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ PRICING ------------------------------ */

const TIERS = [
  {
    name: "Starter",
    tagline: "Core infrastructure to capture every lead.",
    cta: "View Infrastructure",
    features: [
      "AI Reception System",
      "CRM Setup",
      "Lead Capture Flows",
      "Call & Form Routing",
      "Appointment Automation",
      "Monthly Reporting",
    ],
  },
  {
    name: "Growth",
    tagline: "Full acquisition and revenue systems, engineered.",
    featured: true,
    cta: "Scale With Montarro",
    features: [
      "Everything in Starter",
      "CRM Automation Systems",
      "Website Optimisation",
      "Paid Acquisition Systems",
      "Content Infrastructure",
      "Follow-Up Sequences",
      "Conversion Tracking",
    ],
  },
  {
    name: "Scale",
    tagline: "A complete revenue operation, fully managed.",
    cta: "Apply For Partnership",
    features: [
      "Full Revenue Infrastructure",
      "Dedicated Strategy",
      "Multi-Channel Acquisition",
      "Funnel Systems",
      "Conversion Optimisation",
      "Weekly Growth Reviews",
      "Priority Support",
      "Ongoing System Expansion",
    ],
  },
];

function Pricing() {
  return (
    <section id="packages" className="relative overflow-hidden border-t border-border py-20 lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 mx-auto h-[420px] max-w-4xl"
        style={{ background: "radial-gradient(ellipse 55% 60% at 50% 0%, rgba(16,185,129,0.05), transparent 70%)" }}
      />
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

        <div className="mt-12 md:mt-16 grid items-stretch gap-5 lg:grid-cols-3">
          {TIERS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <Link
                to="/contact"
                className={`group relative block h-full overflow-hidden rounded-2xl border p-8 backdrop-blur-xl transition-all duration-500 ease-out will-change-transform hover:-translate-y-1.5 hover:scale-[1.02] active:scale-[0.99] ${
                  t.featured
                    ? "border-emerald-500/45 bg-gradient-to-b from-emerald-500/[0.06] to-white/55 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.7),0_30px_70px_-34px_rgba(16,185,129,0.4)] hover:border-emerald-500/60 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8),0_48px_100px_-34px_rgba(16,185,129,0.55)]"
                    : "border-black/[0.08] bg-gradient-to-b from-white/80 to-white/40 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6),0_20px_50px_-32px_rgba(0,0,0,0.16)] hover:border-emerald-500/40 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.75),0_40px_90px_-32px_rgba(16,185,129,0.38)]"
                }`}
              >
                {t.featured && (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[140%] -translate-x-1/2 rounded-full blur-3xl"
                    style={{ background: "radial-gradient(ellipse at center, rgba(16,185,129,0.10), transparent 65%)" }}
                  />
                )}
                {/* soft emerald glow on hover (this card only) */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: "radial-gradient(ellipse 85% 55% at 50% 0%, rgba(16,185,129,0.10), transparent 65%)" }}
                />
                <div className="relative flex h-full flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div className="font-display text-5xl tracking-tight text-gradient-chrome">
                      {t.name}
                    </div>
                    {t.featured && (
                      <span className="mt-1.5 shrink-0 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-emerald-700">
                        Most Popular
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {t.tagline}
                  </p>

                  <div className="my-8 h-px w-full bg-black/[0.07]" />

                  <ul className="space-y-3.5 text-sm">
                    {t.features.map((f) => (
                      <li key={f} className="flex items-center gap-3">
                        <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${t.featured ? "border-emerald-500/50" : "border-black/[0.12]"}`}>
                          <Check className={`h-3 w-3 ${t.featured ? "text-emerald-600" : "text-foreground/50"}`} />
                        </span>
                        <span className="text-foreground/90">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div style={{ marginTop: "auto" }} className="pt-10">
                    <span
                      className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-[13px] transition-all duration-300 ${
                        t.featured
                          ? "bg-gradient-to-b from-emerald-600 to-emerald-700 font-semibold text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18),0_12px_30px_-14px_rgba(5,150,105,0.6)] group-hover:from-emerald-500 group-hover:to-emerald-600 group-hover:shadow-[0_22px_48px_-16px_rgba(5,150,105,0.7)]"
                          : "border border-black/[0.12] font-medium text-foreground/80 group-hover:border-emerald-500/45 group-hover:bg-emerald-500/[0.04] group-hover:text-foreground"
                      }`}
                    >
                      {t.cta}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </div>
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

/* Thin, data-system precision line — sharp segments, subtle grid, faint edge glow */
function PrecisionChart() {
  const id = useId();
  const line =
    "M0,40 L24,38 L48,33 L72,35 L96,27 L120,29 L144,21 L168,23 L192,15 L216,17 L240,10 L264,12 L288,5";
  return (
    <svg viewBox="0 0 288 48" preserveAspectRatio="none" className="h-full w-full">
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="rgb(16,185,129)" stopOpacity="0.12" />
          <stop offset="100%" stopColor="rgb(16,185,129)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[12, 24, 36].map((y) => (
        <line key={y} x1="0" x2="288" y1={y} y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
      ))}
      <motion.path
        d={`${line} L288,48 L0,48 Z`}
        fill={`url(#${id})`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
      />
      <motion.path
        d={line}
        fill="none"
        stroke="rgb(16,185,129)"
        strokeWidth="1.25"
        strokeLinejoin="round"
        strokeLinecap="round"
        className="[filter:drop-shadow(0_0_3px_rgba(16,185,129,0.45))]"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      />
    </svg>
  );
}

function CaseStudy() {
  const events = [
    { icon: PhoneCall, label: "Incoming Call", meta: "+61 4•• ••• 218", tag: "Qualifying", live: true },
    { icon: CheckCircle2, label: "Lead Qualified", meta: "High intent · roofing", tag: "92%" },
    { icon: CalendarCheck, label: "Appointment Booked", meta: "Thu · 3:00 PM", tag: "Confirmed" },
    { icon: Workflow, label: "Follow-Up Triggered", meta: "Sequence 2 · SMS", tag: "Sent" },
    { icon: Database, label: "CRM Synced", meta: "GoHighLevel", tag: "Synced" },
    { icon: TrendingUp, label: "Revenue Captured", meta: "Job value", tag: "$1,200" },
  ];
  const secondary = [
    ["CPL", "$4.20"],
    ["ROAS", "6.4x"],
    ["Avg Response", "0.8s"],
    ["Qualified", "92%"],
  ];

  return (
    <>
      {/* tight cinematic fade from the white section into the dark environment */}
      <div
        aria-hidden
        className="relative"
        style={{
          height: "120px",
          marginBottom: "-1px",
          background:
            "linear-gradient(180deg, #ffffff 0%, #f7f8f8 22%, #d6d9d8 42%, #5b605e 62%, #161918 84%, #0a0c0b 100%)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
          style={{
            background:
              "radial-gradient(ellipse 50% 100% at 50% 100%, rgba(16,185,129,0.08), transparent 70%)",
          }}
        />
      </div>

      <section
        id="case"
        className="relative overflow-hidden py-24 lg:py-28"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 12% 0%, rgba(16,185,129,0.07), transparent 55%), radial-gradient(ellipse 60% 60% at 92% 100%, rgba(16,185,129,0.05), transparent 55%), linear-gradient(180deg, #0a0c0b 0%, #070908 55%, #0a0c0b 100%)",
        }}
      >
        {/* faint structural grid + slow ambient breathing */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.05] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -left-40 top-1/4 h-[460px] w-[460px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(16,185,129,0.10), transparent 70%)" }}
          animate={{ opacity: [0.55, 0.9, 0.55] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            {/* LEFT — infrastructure narrative */}
            <Reveal className="lg:col-span-5">
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-10 bg-emerald-500/70" />
                <span className="text-[11px] uppercase tracking-[0.28em] text-white/45">
                  Operational Intelligence
                </span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl leading-[1.12] tracking-[-0.02em]">
                <span className="bg-gradient-to-b from-white via-white to-white/65 bg-clip-text text-transparent">
                  Revenue capture,{" "}
                </span>
                <span className="text-emerald-400">instrumented.</span>
              </h2>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/55">
                A live system orchestrating inbound demand — AI qualification,
                booking, follow-up, and CRM sync — so every lead is captured,
                qualified, and accounted for. Not a dashboard. Infrastructure.
              </p>

              <div className="mt-8 flex items-baseline gap-3">
                <div className="font-display text-7xl md:text-8xl text-gradient-white-grey tabular-nums">
                  +215%
                </div>
                <TrendingUp className="h-6 w-6 text-emerald-400" />
              </div>
              <div className="mt-2 text-[12px] uppercase tracking-[0.24em] text-white/45">
                Qualified-booking lift · illustrative
              </div>
            </Reveal>

            {/* RIGHT — live operational console */}
            <Reveal delay={0.15} className="lg:col-span-7">
              <div className="relative">
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] blur-3xl"
                  style={{ background: "radial-gradient(ellipse at center, rgba(16,185,129,0.12), transparent 70%)" }}
                  animate={{ opacity: [0.5, 0.85, 0.5] }}
                  transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.045] to-white/[0.01] p-5 backdrop-blur-xl shadow-[0_50px_120px_-55px_rgba(0,0,0,0.85)] sm:p-6">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-px"
                    style={{ background: "linear-gradient(to right, transparent, rgba(16,185,129,0.45), transparent)" }}
                  />

                  {/* status bar — no browser chrome */}
                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-3.5 text-[11px] uppercase tracking-[0.18em] text-white/50">
                    <span className="flex items-center gap-2"><LiveDot /> Revenue Infrastructure</span>
                    <span className="tabular-nums text-white/35">AU · 0.8s</span>
                  </div>

                  {/* dominant metric */}
                  <div className="mt-5">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                      Qualified Bookings · 30d
                    </div>
                    <div className="mt-1 flex items-baseline gap-2.5">
                      <span className="font-display text-4xl md:text-5xl tracking-tight text-white tabular-nums">
                        1,482
                      </span>
                      <span className="flex items-center gap-1 text-[12px] font-medium text-emerald-400">
                        <TrendingUp className="h-3.5 w-3.5" />
                        +215%
                      </span>
                    </div>
                    <div className="mt-3 h-14 w-full">
                      <PrecisionChart />
                    </div>
                  </div>

                  {/* live event feed */}
                  <div className="mt-5 space-y-1.5">
                    {events.map((e, i) => {
                      const Icon = e.icon;
                      return (
                        <motion.div
                          key={e.label}
                          initial={{ opacity: 0, x: -6 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: "-40px" }}
                          transition={{ delay: 0.15 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                          className="flex items-center gap-3 rounded-lg border border-white/[0.05] bg-white/[0.02] px-3 py-2 transition-colors duration-300 hover:border-emerald-500/20 hover:bg-white/[0.035]"
                        >
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] text-emerald-400">
                            <Icon className="h-3.5 w-3.5" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 text-[12.5px] text-white/85">
                              <span className="truncate">{e.label}</span>
                              {e.live && <LiveDot />}
                            </div>
                            <div className="truncate text-[10.5px] text-white/40">{e.meta}</div>
                          </div>
                          <span className="shrink-0 rounded-full border border-emerald-500/20 bg-emerald-500/[0.08] px-2 py-0.5 text-[10px] font-medium tabular-nums text-emerald-300">
                            {e.tag}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* secondary metrics */}
                  <div className="mt-5 grid grid-cols-4 gap-px overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.05]">
                    {secondary.map(([l, v]) => (
                      <div key={l} className="bg-[#0a0c0b]/85 px-3 py-2.5 text-center">
                        <div className="text-[13px] font-semibold tabular-nums text-white">{v}</div>
                        <div className="mt-0.5 text-[9px] uppercase tracking-[0.14em] text-white/40">{l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* smooth fade out of the dark environment into the next section */}
      <div
        aria-hidden
        style={{
          height: "110px",
          marginTop: "-1px",
          background:
            "linear-gradient(180deg, #0a0c0b 0%, #161918 28%, #5b605e 56%, #d6d9d8 80%, #ffffff 100%)",
        }}
      />
    </>
  );
}


/* ------------------------------- CTA ------------------------------- */

function CTA() {
  return (
    <div className="bg-background px-4 pt-10 pb-16 sm:px-6 lg:px-8 lg:pt-16 lg:pb-24">
      <section
        id="cta"
        className="relative isolate overflow-hidden rounded-[28px] border border-white/[0.06] bg-gradient-to-b from-[#171717] to-[#0a0a0a] pt-20 pb-20 lg:pt-24 lg:pb-24 shadow-[0_50px_120px_-50px_rgba(0,0,0,0.7),0_1px_0_0_rgba(255,255,255,0.04)_inset]"
      >
        {/* top emerald hairline */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{ background: "linear-gradient(to right, transparent, rgba(16,185,129,0.4), transparent)" }}
        />
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
        {/* layered atmospheric + emerald lighting */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 16%, rgba(16,185,129,0.07), transparent 60%), radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,255,255,0.04), transparent 70%)",
          }}
        />
        {/* soft vignette edges */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse at center, transparent 52%, rgba(0,0,0,0.5) 100%)" }}
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
          <Reveal delay={0.05}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-white/55 backdrop-blur">
              <LiveDot /> Begin Deployment
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <h2 className="font-display text-gradient-white-grey text-[clamp(2.5rem,8vw,5.5rem)] leading-[0.92] tracking-[-0.04em]">
              Put the whole system to work.
            </h2>
          </Reveal>
          <Reveal delay={0.24}>
            <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed tracking-[-0.01em] text-white/50">
              Book a free consultation and we&rsquo;ll map your growth system in 30 minutes — no obligation.
            </p>
          </Reveal>
          <Reveal delay={0.36}>
            <div className="relative mt-8 inline-flex flex-wrap items-center justify-center gap-3">
              {/* ambient emerald halo behind button */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-10 -z-10 rounded-full blur-3xl"
                style={{ background: "radial-gradient(circle, rgba(16,185,129,0.10), transparent 70%)" }}
              />
              <Link
                to="/contact"
                className={`${primaryCta} inline-flex px-8 py-4 text-sm`}
              >
                Book a Free Consultation
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                to="/demo"
                className="group inline-flex items-center gap-2 rounded-xl border border-white/15 px-7 py-4 text-sm font-medium text-white/80 transition-all duration-300 hover:border-white/35 hover:text-white"
              >
                Try the Live Demo
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
    <footer className="relative border-t border-black/[0.06] bg-gradient-to-b from-white to-[#fafbfb]">
      {/* subtle emerald divider + ambient depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(16,185,129,0.22), transparent)" }}
      />
      <div className="mx-auto max-w-7xl px-6 pt-14 pb-10 lg:pt-20 lg:pb-12">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          {/* LEFT — refined brand */}
          <div className="flex flex-col justify-between lg:col-span-4">
            <div>
              <a href="#top" className="inline-block">
                <img src="/montarro-logo.png" alt="Montarro" className="h-9 w-auto" />
              </a>
              <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-black/40">
                AI revenue infrastructure for modern companies.
              </p>
              <p className="mt-3 text-[12px] font-medium text-black/55">
                Melbourne-based · Australian-owned
              </p>
            </div>
            <p className="mt-8 text-[11px] tracking-[0.12em] uppercase text-black/20 lg:mt-0">
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
                    Book a Free Consultation
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
        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-black/[0.06] pt-6 text-[12px] text-black/30 md:flex-row md:items-center lg:mt-16">
          <div>© 2025 Montarro. All rights reserved.</div>
          <div className="flex items-center gap-2 text-black/30">
            <span className="h-1 w-1 rounded-full bg-emerald-500/60" />
            Melbourne, Australia
          </div>
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

/* --------------------------------- FAQ --------------------------------- */
function Faq() {
  const items: { q: string; a: string }[] = [
    { q: "What is the AI Receptionist?", a: "An always-on voice agent that answers your calls, qualifies the caller, books appointments and updates your CRM — in under a second, 24/7." },
    { q: "How quickly can we go live?", a: "Most businesses are live within two weeks: week one for setup and training, week two for testing and launch." },
    { q: "Will it sound robotic?", a: "No. It holds a natural, low-latency conversation trained on your services, pricing and booking rules." },
    { q: "Does it work after hours?", a: "Yes — it answers every call day or night, so after-hours enquiries become booked jobs instead of voicemails." },
    { q: "How does it connect to my calendar and CRM?", a: "It books directly into your calendar and syncs every conversation into your CRM automatically." },
    { q: "What does it cost?", a: "Pricing is tailored to your business. Book a free consultation and we'll scope it to your call volume and goals." },
  ];
  return (
    <section id="faq" className="relative border-t border-black/[0.06] py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <div className="text-center">
            <div className="mb-6 inline-flex items-center gap-3">
              <span className="h-px w-10 bg-emerald-500/70" />
              <span className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">FAQ</span>
              <span className="h-px w-10 bg-emerald-500/70" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl leading-[1.04] tracking-tight text-gradient-chrome">
              Questions, Answered.
            </h2>
          </div>
        </Reveal>
        <div className="mt-12 space-y-3">
          {items.map((it, i) => (
            <Reveal key={it.q} delay={0.04 * i}>
              <details className="group rounded-2xl border border-black/[0.07] bg-white/70 px-5 py-4 backdrop-blur transition-colors duration-300 hover:border-emerald-500/30 open:border-emerald-500/30">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-medium text-foreground">
                  {it.q}
                  <ArrowRight className="h-4 w-4 shrink-0 text-emerald-600 transition-transform duration-300 group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">{it.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ REVIEWS ------------------------------ */
function GoogleWordmark() {
  const letters: [string, string][] = [
    ["G", "#4285F4"], ["o", "#EA4335"], ["o", "#FBBC05"],
    ["g", "#4285F4"], ["l", "#34A853"], ["e", "#EA4335"],
  ];
  return (
    <span className="font-semibold tracking-tight" aria-label="Google">
      {letters.map(([c, col], i) => (
        <span key={i} style={{ color: col }}>{c}</span>
      ))}
    </span>
  );
}

function GoogleG({ className = "h-[18px] w-[18px]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-label="Google" role="img">
      <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
      <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
      <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z" />
      <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
    </svg>
  );
}

function Stars({ className = "", rating = 5 }: { className?: string; rating?: number }) {
  const pct = Math.max(0, Math.min(100, (rating / 5) * 100));
  return (
    <span
      className={`relative inline-flex items-center ${className}`}
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {/* unfilled base */}
      <span className="inline-flex items-center gap-0.5" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 text-white/25" />
        ))}
      </span>
      {/* gold fill clipped to the rating */}
      <span
        className="absolute inset-0 inline-flex items-center gap-0.5 overflow-hidden"
        style={{ width: `${pct}%` }}
        aria-hidden
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 shrink-0 fill-[#FBBC05] text-[#FBBC05]" />
        ))}
      </span>
    </span>
  );
}

function Reviews() {
  const reviews = [
    { quote: "We were missing calls every afternoon. Montarro answers everything now — we've booked jobs we would have lost completely.", name: "Daniel R.", role: "Plumbing · Melbourne" },
    { quote: "It books straight into our calendar and updates the CRM automatically. Our front desk finally has breathing room.", name: "Sarah K.", role: "Dental Practice" },
    { quote: "Live in two weeks. Within the first month the system had already paid for itself in recovered work.", name: "James T.", role: "Electrical Contractor" },
  ];
  return (
    <section id="reviews" className="relative border-t border-black/[0.06] py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 mx-auto h-[360px] max-w-4xl rounded-full bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.05),transparent_70%)] blur-3xl" />
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-black/[0.08] bg-card/50 px-4 py-2 text-[13px] backdrop-blur">
              <GoogleWordmark />
              <span aria-hidden className="h-3.5 w-px bg-black/10" />
              <Stars />
              <span className="font-semibold tabular-nums text-foreground">5.0</span>
            </div>
            <h2 className="mt-7 font-display text-4xl md:text-6xl leading-[1.04] tracking-[-0.03em] text-gradient-chrome">
              Operators who can&rsquo;t afford to miss a call.
            </h2>
            <p className="mx-auto mt-5 max-w-lg leading-relaxed text-muted-foreground">
              Real outcomes from the businesses running on the Montarro System.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={0.08 * i}>
              <figure className="flex h-full flex-col rounded-2xl border border-black/[0.08] bg-gradient-to-b from-white to-[#f6f7f8] p-7 shadow-[0_1px_0_0_rgba(255,255,255,0.85)_inset,0_24px_60px_-44px_rgba(0,0,0,0.22)]">
                <Stars />
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-foreground/90">
                  &ldquo;{r.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-black/[0.06] pt-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 font-display text-sm font-semibold text-emerald-700">
                    {r.name.charAt(0)}
                  </span>
                  <div className="flex-1">
                    <div className="text-[14px] font-medium text-foreground">{r.name}</div>
                    <div className="text-[12px] text-muted-foreground">{r.role}</div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.14em] text-muted-foreground/70">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Google
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 text-center">
            <a href="#" className="group inline-flex items-center gap-2 text-[13px] font-medium text-emerald-700 transition-colors hover:text-emerald-600">
              Read more reviews on Google
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Landing() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <Trust />
        <HiddenLeaks />
        <CostOfStandingStill />
        <LifeAfter />
        <WhyMontarro />
        <ExperienceInfra />
        <Results />
        <CaseStudy />
        <Integrations />
        <Pricing />
        <Faq />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
