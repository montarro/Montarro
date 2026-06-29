import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform, useInView, animate } from "motion/react";
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
import { QuickEnquiryForm } from "@/components/QuickEnquiryForm";

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
              <p className="mt-7 max-w-xl text-pretty text-base md:text-lg font-medium leading-relaxed text-foreground">
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
      <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight text-foreground">Capture Every Call</h3>
      <p className="mt-2 text-sm font-medium leading-relaxed text-foreground">
        <span className="font-semibold text-foreground">AI answers after-hours</span>, during busy periods, and when staff are unavailable.
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
      <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight text-foreground">Book More Jobs</h3>
      <p className="mt-2 text-sm font-medium leading-relaxed text-foreground">
        <span className="font-semibold text-foreground">Qualified leads</span> are routed into bookings, reminders, and follow-up flows.
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
      <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight text-foreground">Scale Without Hiring</h3>
      <p className="mt-2 text-sm font-medium leading-relaxed text-foreground">
        <span className="font-semibold text-foreground">Increase response speed and capacity</span> without adding receptionist overhead.
      </p>
      <div className="mt-auto pt-4 flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-muted-foreground/70">
        <Activity className="h-3.5 w-3.5 text-emerald-500" /> 5+ services automated
      </div>
    </div>
  );
}

/* ---------------- BEAT 3 · THE PROBLEM (typography-led reframe) ---------------- */
/* Premium, editorial, no UI: a large statement on the left, supporting copy on the
   right, set up to flow emotionally into the cost calculator below. */
function ProblemReframe() {
  return (
    <section id="problem" className="relative overflow-hidden bg-gradient-to-b from-white via-white to-[#f5f6f7] py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          {/* LEFT — the statement */}
          <Reveal>
            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-10 bg-emerald-500/70" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.34em] text-emerald-600">
                The Real Problem
              </span>
            </div>
            <h2 className="font-headline text-[2.6rem] font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-[#0a0b0b] sm:text-6xl lg:text-7xl">
              The problem isn&rsquo;t your leads.
              <span className="mt-3 block text-foreground/40">
                It&rsquo;s everything that happens after them.
              </span>
            </h2>
          </Reveal>

          {/* RIGHT — supporting copy, spaced idea by idea */}
          <Reveal delay={0.12}>
            <div className="max-w-md lg:pt-2">
              <p className="text-lg font-medium leading-relaxed text-foreground">
                Every enquiry already costs you money to generate.
              </p>

              <div className="mt-7 space-y-1.5 text-lg font-medium leading-relaxed text-foreground">
                <p>But if nobody answers it&hellip;</p>
                <p>If nobody follows it up&hellip;</p>
                <p>If nobody books it&hellip;</p>
                <p>If nobody tracks it&hellip;</p>
              </div>

              <p className="mt-7 font-headline text-3xl font-extrabold uppercase tracking-tight text-[#0a0b0b]">
                It disappears.
              </p>

              <div className="mt-10 space-y-2 text-lg leading-relaxed">
                <p className="font-medium text-foreground">
                  Most businesses don&rsquo;t have a marketing problem.
                </p>
                <p className="font-medium text-foreground">
                  They have a <span className="text-emerald-600">revenue infrastructure</span> problem.
                </p>
              </div>

              {/* minimal bridge into the cost calculator */}
              <Link
                to="/"
                hash="cost"
                className="group mt-10 inline-flex items-center gap-2 rounded-full border border-black/85 bg-white px-5 py-2.5 text-sm font-medium text-black transition-colors duration-300 ease-out hover:bg-black hover:text-white"
              >
                See what it&rsquo;s costing you
                <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              </Link>
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
    <section
      id="cost"
      className="relative overflow-hidden py-20 lg:py-28"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 85% 8%, rgba(16,185,129,0.06), transparent 55%), linear-gradient(180deg, #111315 0%, #0e1012 55%, #111315 100%)",
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
              <p className="mx-auto mt-5 max-w-md text-[15px] md:text-base font-medium leading-relaxed text-white/90">
                <span className="font-semibold text-white">Put in your own numbers.</span> This is what those gaps quietly cost you
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
            <p className="mx-auto mt-12 max-w-xl text-center text-[15px] md:text-base font-medium leading-relaxed text-white/90">
              Every month you wait, that number repeats.{" "}
              <span className="text-white">Now imagine it working for you instead.</span>
            </p>
          </Reveal>
        </div>
      </section>
  );
}

/* ---------------- BEAT 5 · LIFE AFTER MONTARRO (the transformation) ---------------- */

/* The "before" state — a business running without structure. Dark charcoal,
   subtle red accents, soft red ambient glow: stress and overload, not alarm. */
/* One interface, two states. The same card, the same rows, the same hierarchy —
   only the state (and its colour theme) changes between before and after, so the
   transformation reads at a glance. Left: charcoal + red. Right: emerald glass. */
function StateCard({ tone }: { tone: "before" | "after" }) {
  const before = tone === "before";
  const countRef = useCountUp(before ? 12 : 86, true);
  const rows: { icon: typeof PhoneCall; label: string; tag: string }[] = before
    ? [
        { icon: PhoneCall, label: "Missed call — Mark B.", tag: "missed" },
        { icon: CalendarCheck, label: "Appointment — not booked", tag: "lost" },
        { icon: ClipboardList, label: "Quote #1184 — overdue", tag: "3d late" },
        { icon: RefreshCw, label: "Follow-up — forgotten", tag: "—" },
        { icon: Database, label: "CRM — out of date", tag: "stale" },
      ]
    : [
        { icon: PhoneCall, label: "Call answered — Mark B.", tag: "0:42" },
        { icon: CalendarCheck, label: "Appointment booked", tag: "Thu 3:00" },
        { icon: ClipboardList, label: "Quote #1184 — sent", tag: "auto" },
        { icon: RefreshCw, label: "Follow-up — completed", tag: "done" },
        { icon: Database, label: "CRM — updated", tag: "synced" },
      ];

  const tag = before
    ? "border-red-500/25 bg-red-500/[0.08] text-red-300/90"
    : "border-emerald-400/25 bg-emerald-400/[0.10] text-emerald-200/90";

  return (
    <div
      className={`relative flex h-full flex-col overflow-hidden rounded-3xl border p-6 sm:p-7 ${
        before
          ? "border-white/[0.06] bg-gradient-to-b from-[#181311] to-[#0d0a09] shadow-[0_40px_90px_-50px_rgba(0,0,0,0.85)]"
          : "border-emerald-400/20 bg-gradient-to-b from-[#06281d] to-[#03120c] shadow-[0_40px_90px_-46px_rgba(16,185,129,0.5)]"
      }`}
    >
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 left-1/2 h-56 w-[130%] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background: before
            ? "radial-gradient(ellipse at center, rgba(208,66,58,0.16), transparent 65%)"
            : "radial-gradient(ellipse at center, rgba(16,185,129,0.2), transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent ${
          before ? "via-red-500/25" : "via-emerald-400/50"
        }`}
      />

      {/* header — status + time (identical structure on both cards) */}
      <div className="relative flex items-center justify-between">
        <span className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${tag}`}>
          {before ? (
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-red-500/90"
              animate={{ opacity: [1, 0.25, 1] }}
              transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
            />
          ) : (
            <LiveDot />
          )}
          {before ? "Overloaded" : "Running"}
        </span>
        <span className={`text-[12px] tabular-nums ${before ? "text-white/55" : "text-emerald-200/40"}`}>9:41 PM</span>
      </div>

      {/* metric — same position, same label, only the number + colour change */}
      <div className="relative mt-6 flex items-end gap-2.5">
        <span ref={countRef} className="font-headline text-6xl font-extrabold leading-none tabular-nums text-white">0</span>
        <span className="mb-1.5 text-[15px] font-medium text-white/90">{before ? "missed this week" : "captured this month"}</span>
      </div>

      {/* load bar — same component, opposite state */}
      <div className="relative mt-3 flex items-center gap-2.5">
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
          <motion.div
            className={`h-full rounded-full ${before ? "bg-red-500/55" : "bg-emerald-400/60"}`}
            initial={{ width: before ? "34%" : "70%" }}
            whileInView={{ width: before ? "96%" : "26%" }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          />
        </div>
        <span className={`text-[10px] font-medium uppercase tracking-[0.16em] ${before ? "text-red-400/70" : "text-emerald-300/80"}`}>Load</span>
      </div>

      {/* the rows — same items, same order, only the state changes */}
      <div className="relative mt-6 space-y-2">
        {rows.map((r, i) => {
          const I = r.icon;
          return (
            <Reveal key={r.label} delay={0.05 * i}>
              <div
                className={`flex items-center gap-3 rounded-xl border px-3.5 py-2.5 ${
                  before ? "border-white/[0.06] bg-white/[0.03]" : "border-emerald-400/[0.12] bg-emerald-400/[0.04]"
                }`}
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                    before ? "bg-white/[0.04] text-white/40" : "bg-emerald-400/[0.10] text-emerald-200"
                  }`}
                >
                  <I className="h-3.5 w-3.5" />
                </span>
                <span className={`flex-1 truncate text-[13px] ${before ? "text-white/85" : "text-emerald-50/90"}`}>{r.label}</span>
                <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-medium ${tag}`}>{r.tag}</span>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* footer — same position, mirrored truth */}
      <div className={`relative mt-auto flex items-center gap-3 pt-6 text-[10.5px] uppercase tracking-[0.2em] ${before ? "text-white/55" : "text-emerald-200/55"}`}>
        <span className={`h-px flex-1 ${before ? "bg-white/10" : "bg-emerald-400/15"}`} />
        {before ? "No system holding it together" : "One system, holding it together"}
        <span className={`h-px flex-1 ${before ? "bg-white/10" : "bg-emerald-400/15"}`} />
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
            <h2 className="font-headline text-5xl md:text-7xl font-extrabold uppercase leading-[0.92] tracking-[-0.02em] text-[#0a0b0b]">
              From chaos to control.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-xl text-lg md:text-xl font-medium leading-relaxed text-foreground">
              You&rsquo;re not missing skill. You&rsquo;re missing structure. One
              connected system answers, captures, follows up and books
              automatically &mdash; so your business finally runs with you, not
              against you.
            </p>
          </Reveal>
        </div>

        {/* the same interface, before → after */}
        <div className="mt-16 grid items-stretch gap-5 lg:mt-20 lg:grid-cols-[1fr_auto_1fr] lg:gap-7">
          <Reveal className="h-full">
            <StateCard tone="before" />
          </Reveal>

          {/* the transformation — the same business flowing from one state into the other */}
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
            <StateCard tone="after" />
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
              <p className="mt-4 max-w-xl text-base md:text-lg font-medium leading-relaxed text-foreground">
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
                    <p className="mt-1 text-[13.5px] font-medium leading-relaxed text-foreground">{s.d}</p>
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
          <div className="font-display text-2xl font-semibold tracking-tight text-foreground tabular-nums">6.4x</div>
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
          <p className={`mt-2 text-sm font-medium leading-relaxed ${dark ? "text-white/90" : "text-foreground"}`}>{desc}</p>
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

      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* LEFT — editorial header */}
          <div className="lg:pt-2">
            <Reveal>
              <div className="mb-7 flex items-center gap-3">
                <span className="h-px w-10 bg-emerald-500/70" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.34em] text-emerald-600">
                  Why Montarro
                </span>
              </div>
              <h2 className="font-headline text-4xl md:text-5xl font-extrabold uppercase leading-[0.92] tracking-[-0.02em] text-[#0a0b0b]">
                This isn&rsquo;t an agency.
                <br />
                It&rsquo;s <span className="text-emerald-600">revenue infrastructure.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-7 max-w-md text-[16px] font-medium leading-relaxed text-foreground">
                You can already see the problem, the cost, and what changes. The only
                question left is who builds it. Most companies sell you services and
                disappear. <span className="font-semibold text-foreground">We engineer one system that runs your growth</span> — and stay to
                run it with you.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-8 max-w-md text-lg leading-snug text-foreground">
                <span className="text-muted-foreground">You don&rsquo;t need another agency.</span>{" "}
                You need infrastructure that runs without you.
              </p>
            </Reveal>
          </div>

          {/* RIGHT — premium comparison panel */}
          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-3xl border border-black/[0.07] bg-white shadow-[0_30px_70px_-45px_rgba(0,0,0,0.22)]">
              {/* column headers */}
              <div className="grid grid-cols-2">
                <div className="px-6 py-5 text-[10.5px] font-semibold uppercase tracking-[0.22em] text-muted-foreground/50">
                  Most Agencies
                </div>
                <div className="border-l border-black/[0.06] px-6 py-5 text-[10.5px] font-semibold uppercase tracking-[0.22em] text-emerald-600">
                  Montarro
                </div>
              </div>

              {rows.map((r) => (
                <div
                  key={r.montarro}
                  className="grid grid-cols-2 border-t border-black/[0.06] transition-colors duration-300 hover:bg-black/[0.015]"
                >
                  {/* most agencies — receding, muted minus */}
                  <div className="flex items-start gap-3 px-6 py-6">
                    <Minus className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/40" strokeWidth={2.2} />
                    <span className="text-[14px] leading-snug text-muted-foreground/70">
                      {r.agency}
                    </span>
                  </div>
                  {/* montarro — confident, emerald check */}
                  <div className="flex items-start gap-3 border-l border-black/[0.06] px-6 py-6">
                    <span className="mt-px flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                      <Check className="h-3 w-3 text-emerald-600" strokeWidth={2.6} />
                    </span>
                    <span className="text-[14px] font-medium leading-snug text-foreground">
                      {r.montarro}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
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
      <section
        id="experience"
        className="relative overflow-hidden py-20 lg:py-24"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 12% 0%, rgba(16,185,129,0.07), transparent 55%), radial-gradient(ellipse 60% 60% at 92% 100%, rgba(16,185,129,0.05), transparent 55%), linear-gradient(180deg, #111315 0%, #0e1012 55%, #111315 100%)",
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
              <h2 className="font-display text-4xl md:text-6xl font-semibold leading-[1.04] tracking-[-0.02em]">
                <span className="bg-gradient-to-b from-white via-white to-white/65 bg-clip-text text-transparent">
                  Hear the AI receptionist answer.
                </span>
              </h2>
              <p className="mx-auto mt-5 max-w-md text-[15px] font-medium leading-relaxed text-white/90">
                <span className="font-semibold text-white">The core of the Montarro System</span> — it answers, qualifies and books
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

/* ---------------- SEE THE SYSTEM IN MOTION · dark scrollytelling ---------------- */
/* A cinematic dark section. Left: a vertical waterfall of text stages that scroll
   normally. Right: ONE sticky connected-system dashboard that stays fixed and morphs to
   match whichever stage is centred (IntersectionObserver center-line). Keeps the
   #results anchor (the 'About' nav links + hero secondary CTA). */

const HIW_STEPS: { title: string; icon: typeof Inbox; copy: string }[] = [
  { title: "Capture", icon: Inbox, copy: "Every call, form, Facebook lead and web enquiry enters one place instantly." },
  { title: "AI Receptionist", icon: Bot, copy: "The AI answers, qualifies the caller and books straight into your calendar — while your team keeps working." },
  { title: "CRM", icon: Database, copy: "Every enquiry is captured, tagged and organised in your CRM automatically." },
  { title: "Automation", icon: Workflow, copy: "Confirmations, reminders and follow-ups go out by email and SMS — automatically, no chasing." },
  { title: "Reporting", icon: BarChart3, copy: "Every lead becomes visible — response times, booked jobs, revenue and missed opportunities." },
];

function StageVisual({ step }: { step: number }) {
  if (step === 0) {
    const channels = [
      { icon: PhoneCall, label: "Phone call", meta: "+61 4•• 218" },
      { icon: MonitorSmartphone, label: "Website enquiry", meta: "Contact form" },
      { icon: Facebook, label: "Facebook lead", meta: "Lead Ad" },
      { icon: Mail, label: "Web form", meta: "Quote request" },
    ];
    return (
      <div className="space-y-2.5">
        <div className="text-[10.5px] uppercase tracking-[0.18em] text-white/40">Incoming · all channels</div>
        {channels.map((c) => {
          const I = c.icon;
          return (
            <div key={c.label} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-emerald-500/25 bg-emerald-500/10 text-emerald-300">
                <I className="h-3.5 w-3.5" />
              </span>
              <span className="flex-1 text-[13px] font-medium text-white/90">{c.label}</span>
              <span className="text-[10.5px] text-white/40">{c.meta}</span>
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
            </div>
          );
        })}
        <div className="pt-1 text-center text-[11px] font-medium text-emerald-300">↓ one inbox</div>
      </div>
    );
  }

  if (step === 1) {
    const bubbles: { who: "ai" | "caller"; text: string }[] = [
      { who: "ai", text: "Thanks for calling Montarro — how can I help?" },
      { who: "caller", text: "I need to book a roof inspection." },
      { who: "ai", text: "Booked — Thursday at 3:00 PM. Confirmation sent." },
    ];
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5">
          <span className="flex items-center gap-2 text-[12px] font-medium text-white/90">
            <PhoneCall className="h-3.5 w-3.5 text-emerald-300" /> Incoming call
          </span>
          <Waveform className="text-emerald-400" />
        </div>
        {bubbles.map((b, i) => (
          <div key={i} className={`flex ${b.who === "caller" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[82%] rounded-2xl border px-3.5 py-2.5 text-[13px] leading-snug ${b.who === "ai" ? "border-emerald-500/25 bg-emerald-500/10 text-white/90" : "border-white/10 bg-white/[0.05] text-white/80"}`}>
              {b.text}
            </div>
          </div>
        ))}
        <div className="flex items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-[12px] font-medium text-emerald-200">
          <CalendarCheck className="h-4 w-4" /> Appointment booked · Thu 3:00 PM
        </div>
      </div>
    );
  }

  if (step === 2) {
    const fields = [
      { l: "Tag", v: "Roofing" },
      { l: "Calendar", v: "Thu · 3:00 PM" },
      { l: "Source", v: "Facebook Lead" },
    ];
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/15 text-[12px] font-semibold text-emerald-200">MB</span>
          <div className="min-w-0 flex-1">
            <div className="text-[13px] font-semibold text-white/90">Mark B.</div>
            <div className="text-[11px] text-white/45">Roofing · new customer</div>
          </div>
          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-200">Qualified</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {fields.map((f) => (
            <div key={f.l} className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5">
              <div className="text-[10px] uppercase tracking-wider text-white/40">{f.l}</div>
              <div className="mt-0.5 text-[12.5px] font-semibold text-white/90">{f.v}</div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-[11px] text-white/50">
          <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Captured</span>
          <span className="h-px flex-1 bg-white/10" />
          <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Tagged</span>
          <span className="h-px flex-1 bg-white/10" />
          <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Synced</span>
        </div>
      </div>
    );
  }

  if (step === 3) {
    const autos = [
      { icon: PhoneCall, label: "Missed-call text sent" },
      { icon: Clock, label: "Reminder SMS scheduled" },
      { icon: Mail, label: "Email follow-up sent" },
      { icon: Star, label: "Review request queued" },
      { icon: Bot, label: "Team notified" },
    ];
    return (
      <div className="space-y-2">
        <div className="text-[10.5px] uppercase tracking-[0.18em] text-white/40">Automations · running</div>
        {autos.map((a) => {
          const I = a.icon;
          return (
            <div key={a.label} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-emerald-500/25 bg-emerald-500/10 text-emerald-300">
                <I className="h-3.5 w-3.5" />
              </span>
              <span className="flex-1 text-[13px] text-white/90">{a.label}</span>
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
            </div>
          );
        })}
      </div>
    );
  }

  // step 4 — reporting
  const kpis = [
    { v: "0.8s", l: "Response" },
    { v: "92%", l: "Conversion" },
    { v: "$96.2K", l: "Revenue" },
  ];
  const funnel = [
    { l: "Enquiries", n: 240, w: "100%" },
    { l: "Qualified", n: 198, w: "82%" },
    { l: "Booked", n: 176, w: "73%" },
  ];
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        {kpis.map((k) => (
          <div key={k.l} className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] px-3 py-3 text-center">
            <div className="font-display text-xl tabular-nums text-white">{k.v}</div>
            <div className="mt-0.5 text-[9.5px] uppercase tracking-[0.14em] text-white/45">{k.l}</div>
          </div>
        ))}
      </div>
      <div className="space-y-2.5">
        {funnel.map((f) => (
          <div key={f.l}>
            <div className="mb-1 flex items-center justify-between text-[11px] text-white/55">
              <span>{f.l}</span>
              <span className="tabular-nums text-white/80">{f.n}</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-300" style={{ width: f.w }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RailIcon({ active, i, Icon }: { active: number; i: number; Icon: typeof Inbox }) {
  const on = i === active;
  return (
    <span
      className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-500 ${
        on
          ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-300 shadow-[0_0_18px_-4px_rgba(16,185,129,0.7)]"
          : "border-transparent text-white/25"
      }`}
    >
      <Icon className="h-4 w-4" />
    </span>
  );
}

function HiwDashboard({ active }: { active: number }) {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#10130f] to-[#090b0a] shadow-[0_60px_140px_-50px_rgba(16,185,129,0.4),0_40px_90px_-40px_rgba(0,0,0,0.9)]">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />
      {/* window chrome — persistent */}
      <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/12" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/12" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/12" />
        </div>
        <span className="text-[11px] font-medium tracking-tight text-white/45">
          Connected system · <span className="text-white/90">{HIW_STEPS[active].title}</span>
        </span>
        <span className="inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-emerald-300">
          <LiveDot /> Live
        </span>
      </div>
      <div className="flex">
        {/* connected modules — real tools wired together, current one highlighted */}
        <div className="relative flex flex-col gap-1.5 border-r border-white/[0.07] p-2.5">
          <span aria-hidden className="absolute left-1/2 top-4 bottom-4 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-emerald-400/25 to-transparent" />
          {/* a live data pulse travelling through the connected modules */}
          <motion.span
            aria-hidden
            className="absolute left-1/2 h-6 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-emerald-300/70 to-transparent"
            animate={{ top: ["6%", "90%"], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
          />
          {HIW_STEPS.map((s, i) => (
            <RailIcon key={s.title} active={active} i={i} Icon={s.icon} />
          ))}
        </div>
        {/* body — morphs to the active stage. A keyed motion.div (no AnimatePresence
           mode=wait) so rapid scroll-driven key changes can never leave it empty:
           React remounts the new stage and it fades in; the old is dropped instantly. */}
        <div className="relative h-[360px] flex-1 overflow-hidden sm:h-[400px]">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex flex-col justify-center p-4 sm:p-5"
          >
            <StageVisual step={active} />
          </motion.div>
        </div>
      </div>
      {/* connected infrastructure — the real tools wired together, not a proprietary app */}
      <div className="flex items-center gap-2 border-t border-white/[0.07] px-4 py-2.5 text-[10px] text-white/40">
        <Workflow className="h-3 w-3 shrink-0 text-emerald-400/80" />
        <span className="truncate">AI Receptionist · CRM · Calendar · Workflows · Reporting</span>
        <span className="ml-auto shrink-0 text-emerald-300/80">connected</span>
      </div>
    </div>
  );
}

/* a single text stage in the left waterfall; reports itself active when it crosses
   the viewport centre line, and dims when it isn't the active stage */
function WaterfallBlock({
  stage,
  index,
  active,
  innerRef,
}: {
  stage: { title: string; copy: string };
  index: number;
  active: boolean;
  innerRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div ref={innerRef} className="flex min-h-[46vh] items-center lg:min-h-[58vh]">
      <div className={`transition-all duration-500 ${active ? "opacity-100" : "opacity-30"}`}>
        <div className="mb-4 flex items-center gap-3">
          <span className={`h-px transition-all duration-500 ${active ? "w-12 bg-emerald-400" : "w-8 bg-white/20"}`} />
          <span className={`text-[11px] font-semibold uppercase tracking-[0.3em] transition-colors duration-500 ${active ? "text-emerald-300" : "text-white/35"}`}>
            Stage {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <h3 className={`font-headline text-4xl font-extrabold uppercase leading-[0.95] tracking-[-0.02em] transition-colors duration-500 sm:text-5xl ${active ? "text-white" : "text-white/55"}`}>
          {stage.title}
        </h3>
        <p className={`mt-4 max-w-md text-lg font-medium leading-relaxed transition-colors duration-500 ${active ? "text-white/90" : "text-white/35"}`}>
          {stage.copy}
        </p>
      </div>
    </div>
  );
}

function HowItWorks() {
  const blocks = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  // active = the waterfall block whose centre is nearest the viewport centre.
  // Measured directly on scroll so it is exact and layout-independent (grid/sticky).
  useEffect(() => {
    let raf = 0;
    const compute = () => {
      raf = 0;
      const mid = window.innerHeight / 2;
      let best = 0;
      let bestDist = Infinity;
      for (let i = 0; i < blocks.current.length; i++) {
        const el = blocks.current[i];
        if (!el) continue;
        const r = el.getBoundingClientRect();
        const dist = Math.abs(r.top + r.height / 2 - mid);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      }
      setActive((p) => (p === best ? p : best));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <section
      id="results"
      className="relative overflow-clip bg-[#081510]"
    >
      {/* fine grid — kept, just quieter so the depth reads as space, not pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03] [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:py-32">
        {/* header */}
        <div className="max-w-2xl">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-emerald-400/70" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.34em] text-emerald-300">How It Works</span>
          </div>
          <h2 className="font-headline text-5xl font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-white sm:text-6xl lg:text-7xl">
            See the system in motion.
          </h2>
          <p className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-white/90">
            <span className="font-semibold text-white">One enquiry</span> moves through the entire revenue engine — from first contact
            to booked job, follow-up and reporting.
          </p>
        </div>

        {/* waterfall + sticky dashboard */}
        <div className="mt-8 lg:mt-4 lg:grid lg:grid-cols-2 lg:gap-16">
          {/* mobile sticky dashboard (direct child of the tall container) */}
          <div className="sticky top-[76px] z-10 mb-6 lg:hidden">
            <div className="relative">
              <div aria-hidden className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.16),transparent_72%)] blur-2xl" />
              <HiwDashboard active={active} />
            </div>
          </div>

          {/* LEFT — text waterfall */}
          <div>
            {HIW_STEPS.map((s, i) => (
              <WaterfallBlock
                key={s.title}
                stage={s}
                index={i}
                active={active === i}
                innerRef={(el) => {
                  blocks.current[i] = el;
                }}
              />
            ))}
          </div>

          {/* RIGHT — desktop sticky dashboard */}
          <div className="hidden lg:block">
            <div className="sticky top-0 flex h-screen items-center">
              <div className="relative w-full">
                <div aria-hidden className="pointer-events-none absolute -inset-16 -z-10 rounded-[60px] bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.16),transparent_72%)] blur-3xl" />
                <HiwDashboard active={active} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ PRICING ------------------------------ */

const TIERS = [
  {
    name: "AI Receptionist",
    taglineLead: "Stop missing enquiries.",
    tagline: "For businesses that just want their phone answered, every time.",
    cta: "Book an AI Receptionist Call",
    to: "/services/ai-receptionists",
    features: [
      "24/7 AI Receptionist",
      "Lead Qualification",
      "Appointment Booking",
      "Missed-Call Recovery",
      "Call Summaries",
      "CRM Sync",
    ],
    commitment: {
      metric: "5+",
      unit: "Qualified Leads / Month",
      note: "A guaranteed minimum of 5 qualified leads every month, or we'll continue working until that target is achieved.",
    },
  },
  {
    name: "Revenue Infrastructure",
    taglineLead: "The operating system behind your business —",
    tagline: "every part connected, automated and managed for you.",
    featured: true,
    cta: "Book an Infrastructure Call",
    to: "/contact",
    features: [
      "AI Receptionist",
      "CRM System",
      "Lead Routing",
      "Automated Follow-Up",
      "Review Generation",
      "Reporting Dashboard",
      "Revenue Tracking",
      "Website Integration",
      "Operational Automation",
    ],
    commitment: {
      metric: "15+",
      unit: "Qualified Leads / Month",
      note: "A guaranteed minimum of 15 qualified leads every month, backed by a complete revenue infrastructure.",
    },
  },
  {
    name: "Enterprise",
    taglineLead: "Built for multi-location and high-volume operations",
    tagline: "that want Montarro embedded in their team.",
    cta: "Book an Enterprise Strategy Call",
    to: "/contact",
    features: [
      "Multi-Location Support",
      "High-Volume Lead Generation",
      "Custom AI Workflows",
      "Dedicated Strategy",
      "Custom Integrations",
      "Priority Support",
      "Ongoing Optimisation",
    ],
    commitment: {
      metric: "50+",
      unit: "Qualified Leads / Month",
      note: "A guaranteed minimum of 50 qualified leads every month, supported by dedicated strategy, custom infrastructure and ongoing optimisation.",
    },
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
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[12px] uppercase tracking-[0.22em] text-emerald-600">
              Infrastructure Systems
            </p>
            <h2 className="mt-5 font-headline text-5xl md:text-7xl font-extrabold uppercase leading-[0.92] tracking-[-0.02em] text-[#0a0b0b]">
              Choose the infrastructure<br className="hidden sm:block" /> that fits your business.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-[15px] md:text-base font-medium leading-relaxed text-foreground">
              <span className="font-semibold text-foreground">Start with the system that matches your current stage</span> — then scale
              up as your business grows, without rebuilding from scratch.
            </p>
          </div>
        </Reveal>

        {/* the centre card is the flagship: wider, naturally taller, vertically centred
            against the side cards so it overhangs equally top and bottom (raised feel) */}
        <div className="mt-12 grid gap-5 md:mt-16 lg:grid-cols-[1fr_1.18fr_1fr] lg:items-center">
          {TIERS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <Link
                to={t.to}
                className={`group relative flex flex-col overflow-hidden rounded-2xl border backdrop-blur-xl transition-all duration-500 ease-out will-change-transform hover:-translate-y-1.5 active:scale-[0.99] ${
                  t.featured
                    ? "border-emerald-600/40 bg-[#E9F7EE] p-7 sm:p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.75),0_36px_82px_-34px_rgba(16,185,129,0.45)] hover:border-emerald-600/55 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.85),0_52px_112px_-34px_rgba(16,185,129,0.6)]"
                    : "border-black/[0.08] bg-gradient-to-b from-white/85 to-white/45 p-7 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6),0_20px_50px_-32px_rgba(0,0,0,0.16)] hover:border-emerald-500/40 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.75),0_36px_80px_-32px_rgba(16,185,129,0.32)]"
                }`}
              >
                {/* restrained emerald top sheen on hover (no heavy always-on glow) */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: "radial-gradient(ellipse 85% 50% at 50% 0%, rgba(16,185,129,0.08), transparent 65%)" }}
                />

                <div className="relative flex flex-col">
                  {/* header */}
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-2xl font-semibold tracking-tight text-gradient-chrome sm:text-[28px]">
                      {t.name}
                    </h3>
                    {t.featured && (
                      <span className="mt-1 shrink-0 rounded-full border border-emerald-600/30 bg-white/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-700">
                        Most Popular
                      </span>
                    )}
                  </div>
                  <p className="mt-2.5 min-h-[40px] text-[13px] font-medium leading-relaxed text-foreground">
                    <span className="font-semibold text-foreground">{t.taglineLead}</span> {t.tagline}
                  </p>

                  <div className="my-6 h-px w-full bg-black/[0.07]" />

                  {/* features */}
                  <ul className="space-y-2.5 text-[13.5px]">
                    {t.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5">
                        <span className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border ${t.featured ? "border-emerald-500/50 bg-emerald-500/10" : "border-black/[0.12]"}`}>
                          <Check className={`h-3 w-3 ${t.featured ? "text-emerald-600" : "text-foreground/50"}`} />
                        </span>
                        <span className="text-foreground/90">{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* commitment panel — tailored to this specific system */}
                  <div
                    className={`mt-6 rounded-xl border p-4 ${
                      t.featured
                        ? "border-emerald-600/25 bg-white/60"
                        : "border-black/[0.07] bg-black/[0.015]"
                    }`}
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-700/80">
                      Guaranteed
                    </p>
                    <div className="mt-2.5 flex items-baseline gap-2">
                      <span className="font-headline text-[34px] font-extrabold leading-none tracking-[-0.02em] text-emerald-700">
                        {t.commitment.metric}
                      </span>
                      <span className="text-[12px] font-medium leading-tight text-foreground/70">
                        {t.commitment.unit}
                      </span>
                    </div>
                    <p className="mt-2.5 text-[12px] font-medium leading-snug text-foreground">
                      {t.commitment.note}
                    </p>
                  </div>

                  {/* CTA — refined, names the conversation it starts */}
                  <div className="mt-6">
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
      <section
        id="case"
        className="relative overflow-hidden py-24 lg:py-28"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 12% 0%, rgba(16,185,129,0.07), transparent 55%), radial-gradient(ellipse 60% 60% at 92% 100%, rgba(16,185,129,0.05), transparent 55%), linear-gradient(180deg, #111315 0%, #0e1012 55%, #111315 100%)",
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
              <h2 className="font-display text-4xl md:text-5xl font-semibold leading-[1.12] tracking-[-0.02em]">
                <span className="bg-gradient-to-b from-white via-white to-white/65 bg-clip-text text-transparent">
                  Revenue capture,{" "}
                </span>
                <span className="text-emerald-400">instrumented.</span>
              </h2>
              <p className="mt-6 max-w-md text-[15px] font-medium leading-relaxed text-white/90">
                <span className="font-semibold text-white">A live system orchestrating inbound demand</span> — AI qualification,
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
                      <div key={l} className="bg-[#111315]/85 px-3 py-2.5 text-center">
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
  );
}


/* ------------------------------- CTA ------------------------------- */

function CTA() {
  return (
    <section id="cta" className="relative bg-[#E9F7EE] py-24 lg:py-36">
      <div className="relative mx-auto max-w-xl px-6">
        <div className="text-center">
          <Reveal delay={0.05}>
            <h2 className="font-display text-[clamp(2.75rem,7.5vw,5rem)] font-bold leading-[0.95] tracking-[-0.04em] text-[#0a0b0b]">
              Put the whole system to work.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-6 max-w-md text-[16px] font-medium leading-relaxed text-foreground">
              <span className="font-semibold text-foreground">Tell us about your business</span> and we'll map the right infrastructure for you.
            </p>
          </Reveal>
        </div>

        {/* quick homepage enquiry — short capture, no booking, same GHL workflow */}
        <QuickEnquiryForm className="mt-12" />
      </div>
    </section>
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

/* --------------------------------- FAQ --------------------------------- */
function Faq() {
  const items: { q: string; lead: string; a: string }[] = [
    { q: "Is this suitable for my business?", lead: "If you rely on inbound calls and enquiries to win work, yes.", a: "We build for Australian service businesses — trades, healthcare, automotive, legal, real estate, hospitality and multi-location operations — where missed calls and slow follow-up quietly cost real revenue." },
    { q: "How quickly can we get started?", lead: "Most businesses are live within two weeks:", a: "week one for setup and training on your services and scripts, week two for testing and launch. We handle the build — you simply review and approve." },
    { q: "What happens after I submit an enquiry?", lead: "We review your business and map the right infrastructure for your stage,", a: "then reach out within one business day to walk you through it on a strategy call. No obligation, no pressure." },
    { q: "Will the AI sound like a real person?", lead: "Yes — it holds a natural, low-latency conversation", a: "trained on your services, pricing and booking rules, so callers feel looked after rather than screened by a machine. It can warm-transfer to your team whenever a human is needed." },
    { q: "Can it work with my existing systems?", lead: "Yes — it connects to the tools you already use.", a: "It books directly into your calendar and syncs every conversation, contact and outcome into your CRM automatically, rather than asking you to replace anything." },
    { q: "What results can I realistically expect?", lead: "Fewer missed calls, faster follow-up and a calendar that fills with qualified appointments", a: "instead of voicemails. Each plan is backed by a guaranteed minimum of qualified leads per month, so the outcome is committed up front — not hoped for." },
    { q: "How is Montarro different from a traditional marketing agency?", lead: "We build and manage a complete, connected revenue infrastructure,", a: "not just ads and hand-off leads. It captures, qualifies, books and follows up automatically — strategy-first, integrated with your systems, and backed by a written lead guarantee." },
    { q: "What happens during the strategy call?", lead: "We review your current lead flow and map the infrastructure that fits your stage,", a: "then show you exactly how it would work for your business. It's a working session, not a sales pitch — you leave with clarity whether or not you proceed." },
  ];
  return (
    <section id="faq" className="relative bg-white py-24 lg:py-32">
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 lg:items-start">
          {/* LEFT — heading */}
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.02] tracking-[-0.03em] text-[#0a0b0b]">
                Questions Businesses Ask Us.
              </h2>
            </Reveal>
          </div>

          {/* RIGHT — divided rows with a circular +/x control */}
          <div className="lg:col-span-7">
            <div className="border-t border-black/[0.09]">
              {items.map((it, i) => (
                <Reveal key={it.q} delay={0.04 * i}>
                  <FaqRow q={it.q} lead={it.lead} a={it.a} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqRow({ q, lead, a }: { q: string; lead: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-black/[0.09]">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="group flex w-full items-center justify-between gap-6 py-7 pl-1 pr-1 text-left"
      >
        <span className="text-[17px] font-semibold tracking-tight text-foreground sm:text-[18px]">
          {q}
        </span>
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200 ease-out ${
            open
              ? "border-emerald-600 bg-emerald-600 text-white"
              : "border-emerald-600 text-emerald-600 group-hover:bg-emerald-500/10"
          }`}
        >
          <Plus
            className={`h-4 w-4 transition-transform duration-200 ease-out ${open ? "rotate-45" : ""}`}
            strokeWidth={2.5}
          />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-[52ch] pb-7 pl-1 pr-10 text-[14.5px] font-medium leading-relaxed text-foreground">
              <span className="font-semibold text-foreground">{lead}</span> {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
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
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <Trust />
        <ProblemReframe />
        <CostOfStandingStill />
        <LifeAfter />
        <WhyMontarro />
        <ExperienceInfra />
        <HowItWorks />
        <CaseStudy />
        <Pricing />
        <Faq />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
