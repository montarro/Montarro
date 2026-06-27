import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { motion } from "motion/react";
import {
  PhoneCall,
  Phone,
  Bot,
  CheckCircle2,
  CalendarCheck,
  Database,
  Workflow,
  Zap,
  ArrowUpRight,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";
import { primaryCta } from "@/lib/cta";

// Replace with your real Retell AI receptionist phone number.
const RECEPTIONIST_TEL = "+610345145084";

export const Route = createFileRoute("/demo")({
  head: () => ({
    meta: [
      { title: "Live Demo — Montarro AI Receptionist" },
      {
        name: "description",
        content:
          "Experience Montarro's AI revenue infrastructure live — voice systems that capture, qualify, book, and sync inbound demand into your CRM automatically.",
      },
      { property: "og:title", content: "Live Demo — Montarro" },
      {
        property: "og:description",
        content:
          "AI voice infrastructure that captures, qualifies, and converts inbound demand automatically.",
      },
    ],
  }),
  component: DemoPage,
});

/* ------------------------------ helpers ------------------------------ */

function Reveal({
  children,
  delay = 0,
  y = 22,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
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

function Waveform({ count = 5, className = "" }: { count?: number; className?: string }) {
  return (
    <div className={`flex h-4 items-end gap-[3px] ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full bg-emerald-500"
          style={{ height: "35%" }}
          animate={{ height: ["35%", "100%", "55%", "85%", "35%"] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.13 }}
        />
      ))}
    </div>
  );
}

const DARK_BG =
  "radial-gradient(ellipse 70% 50% at 12% 0%, rgba(16,185,129,0.07), transparent 55%), radial-gradient(ellipse 60% 60% at 92% 100%, rgba(16,185,129,0.05), transparent 55%), linear-gradient(180deg, #0a0c0b 0%, #070908 55%, #0a0c0b 100%)";

function GridTexture({ dark = false }: { dark?: boolean }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${dark ? "opacity-[0.05]" : "opacity-[0.05]"} [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_72%)]`}
      style={{
        backgroundImage: dark
          ? "linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)"
          : "linear-gradient(to right, rgba(0,0,0,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.5) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
      }}
    />
  );
}

/* ----------------- SECTION 1 + 2 — TEST THE AI / LIVE DEMO ----------------- */

function TranscriptPanel() {
  const msgs: { who: "ai" | "caller"; text: string; t: string }[] = [
    { who: "ai", text: "Montarro reception — how can I help?", t: "0:01" },
    { who: "caller", text: "I need a quote for a roof repair.", t: "0:04" },
    { who: "ai", text: "Happy to help. What suburb are you in?", t: "0:07" },
    { who: "caller", text: "Brunswick.", t: "0:10" },
    { who: "ai", text: "Booked an inspection — Thursday 3:00 PM. Details sent by SMS.", t: "0:14" },
  ];
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.045] to-white/[0.01] p-5 backdrop-blur-xl shadow-[0_40px_100px_-50px_rgba(0,0,0,0.8)] sm:p-6">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(16,185,129,0.45), transparent)" }} />
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-3.5">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/55">
          <Bot className="h-3.5 w-3.5 text-emerald-400" /> AI Receptionist
          <LiveDot />
          <span className="text-emerald-300/80">Live</span>
        </div>
        <div className="flex items-center gap-2.5">
          <Waveform />
          <span className="text-[11px] tabular-nums text-white/35">00:14</span>
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
                m.who === "ai" ? "border-emerald-500/15 bg-emerald-500/[0.05]" : "border-white/10 bg-white/[0.05]"
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

      {/* typing indicator */}
      <div className="mt-3 flex items-center gap-2 border-t border-white/[0.06] pt-3 text-[11px] text-white/40">
        <span className="flex items-center gap-1">
          {[0, 1, 2].map((d) => (
            <motion.span
              key={d}
              className="h-1.5 w-1.5 rounded-full bg-emerald-400/70"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.1, repeat: Infinity, delay: d * 0.18 }}
            />
          ))}
        </span>
        AI is responding…
      </div>
    </div>
  );
}

function CrmFeedPanel() {
  const events = [
    { icon: PhoneCall, label: "New Lead Captured", meta: "+61 4•• ••• 218", t: "0:02", live: true },
    { icon: CheckCircle2, label: "Lead Qualified", meta: "Roof repair · Brunswick", t: "0:08" },
    { icon: CalendarCheck, label: "Appointment Booked", meta: "Thu · 3:00 PM", t: "0:14" },
    { icon: Database, label: "CRM Updated", meta: "GoHighLevel · synced", t: "0:15" },
    { icon: Workflow, label: "Follow-Up Triggered", meta: "SMS + reminder", t: "0:16" },
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
              <span className="shrink-0 text-[10px] tabular-nums text-white/30">{e.t}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function TestCallCard() {
  return (
    <div className="relative mx-auto max-w-2xl overflow-hidden rounded-[26px] border border-emerald-500/20 bg-gradient-to-b from-white/[0.07] to-white/[0.015] p-9 text-center backdrop-blur-xl shadow-[0_70px_150px_-50px_rgba(0,0,0,0.9),0_0_60px_-30px_rgba(16,185,129,0.4)] ring-1 ring-emerald-500/10 sm:p-11">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(16,185,129,0.7), transparent)" }} />
      <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full border border-emerald-500/40"
          animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
        />
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full border border-emerald-500/40"
          animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 1.1 }}
        />
        <span className="relative flex h-[72px] w-[72px] items-center justify-center rounded-full border border-emerald-500/50 bg-emerald-500/15 text-emerald-300 shadow-[0_0_55px_-8px_rgba(16,185,129,0.75)]">
          <Phone className="h-7 w-7" />
        </span>
      </div>

      <div className="mt-7 flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/60">
        <LiveDot /> AI Receptionist · Available 24/7
      </div>
      <div className="mt-4 flex items-center justify-center">
        <Waveform count={9} />
      </div>

      <a
        href={`tel:${RECEPTIONIST_TEL}`}
        className={`${primaryCta} mt-7 inline-flex w-full justify-center px-8 py-4 text-base shadow-[0_24px_60px_-18px_rgba(5,150,105,0.7)] sm:w-auto`}
      >
        <Phone className="h-5 w-5" />
        Call The AI Receptionist
      </a>

      <div className="mt-7 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.05]">
        {[
          ["0.8s", "Avg response"],
          ["24/7", "Coverage"],
          ["100%", "Calls answered"],
        ].map(([v, l]) => (
          <div key={l} className="bg-[#0a0c0b]/85 px-3 py-2.5">
            <div className="text-[13px] font-semibold tabular-nums text-white">{v}</div>
            <div className="mt-0.5 text-[9px] uppercase tracking-[0.14em] text-white/40">{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LiveDemoBlock() {
  return (
    <>
      <div aria-hidden style={{ height: "90px", marginBottom: "-1px", background: "linear-gradient(180deg, #ffffff 0%, #d6d9d8 55%, #0a0c0b 100%)" }} />
      <section className="relative overflow-hidden pb-20 pt-16 lg:pb-24 lg:pt-20" style={{ background: DARK_BG }}>
        <GridTexture dark />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[760px] -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(16,185,129,0.10), transparent 70%)" }}
          animate={{ opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative mx-auto max-w-7xl px-6">
          {/* SECTION 1 — Test the AI Receptionist (landing / primary action) */}
          <div id="test" className="scroll-mt-24">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-white/55 backdrop-blur">
                  <LiveDot /> Live System
                </div>
                <h1 className="font-display text-4xl md:text-6xl leading-[1.04] tracking-[-0.02em]">
                  <span className="bg-gradient-to-b from-white via-white to-white/65 bg-clip-text text-transparent">
                    Test the AI Receptionist
                  </span>
                </h1>
                <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-white/55">
                  Call the live AI receptionist and experience exactly how Montarro
                  answers, qualifies and books enquiries in real time. No demo videos.
                  No simulations. Just the live system.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-10">
                <TestCallCard />
              </div>
            </Reveal>
          </div>

          {/* SECTION 2 — Watch the infrastructure work */}
          <div id="live-demo" className="mt-20 scroll-mt-24 lg:mt-28">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-white/55 backdrop-blur">
                  <LiveDot /> Live System
                </div>
                <h2 className="font-display text-4xl md:text-6xl leading-[1.04] tracking-[-0.02em]">
                  <span className="bg-gradient-to-b from-white via-white to-white/65 bg-clip-text text-transparent">
                    Watch the infrastructure work.
                  </span>
                </h2>
                <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-white/55">
                  A single inbound call, captured, qualified, booked, and synced —
                  in seconds.
                </p>
              </div>
            </Reveal>

            <div className="mt-12 grid gap-5 lg:grid-cols-2">
              <Reveal><TranscriptPanel /></Reveal>
              <Reveal delay={0.1}><CrmFeedPanel /></Reveal>
            </div>
          </div>
        </div>
      </section>
      <div aria-hidden style={{ height: "90px", marginTop: "-1px", background: "linear-gradient(180deg, #0a0c0b 0%, #d6d9d8 55%, #ffffff 100%)" }} />
    </>
  );
}

/* ------------------ SECTION 4 — OPERATIONAL BENEFITS ------------------ */

const BENEFITS: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: PhoneCall, title: "Never Miss A Call", desc: "Every inbound call answered instantly — after-hours, weekends, and peak periods." },
  { icon: Zap, title: "Instant Response", desc: "Sub-second pickup. No hold music, no voicemail, no lost demand." },
  { icon: CheckCircle2, title: "Lead Qualification", desc: "Intent, service, and urgency captured and scored on every call." },
  { icon: Database, title: "CRM Synchronization", desc: "Contacts, notes, and bookings written straight into your CRM." },
  { icon: Workflow, title: "Automated Follow-Up", desc: "Reminders and follow-up sequences triggered the moment a call ends." },
  { icon: ShieldCheck, title: "Revenue Protection", desc: "Missed-call revenue recovered and accounted for, end to end." },
];

function Benefits() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 mx-auto h-[420px] max-w-4xl"
        style={{ background: "radial-gradient(ellipse 55% 60% at 50% 0%, rgba(16,185,129,0.05), transparent 70%)" }}
      />
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-emerald-500/70" />
            <span className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">Capabilities</span>
          </div>
          <h2 className="max-w-3xl font-display text-4xl md:text-6xl leading-[1.02] tracking-tight text-gradient-chrome">
            Software-grade revenue operations.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b, i) => {
            const Icon = b.icon;
            return (
              <Reveal key={b.title} delay={i * 0.06}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-black/[0.08] bg-gradient-to-b from-white/80 to-white/40 p-6 backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6),0_20px_50px_-32px_rgba(0,0,0,0.16)] transition-all duration-500 ease-out hover:-translate-y-1 hover:border-emerald-500/35 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.7),0_34px_80px_-34px_rgba(16,185,129,0.32)]">
                  <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-40 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="inline-flex rounded-xl border border-black/[0.08] bg-white p-2.5 text-foreground/70 transition-all duration-500 group-hover:border-emerald-500/40 group-hover:text-emerald-600 group-hover:shadow-[0_0_22px_-6px_rgba(16,185,129,0.5)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-display text-xl tracking-tight text-foreground">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* --------------- SECTION 5 — HOW THE INFRASTRUCTURE WORKS --------------- */

const FLOW: { icon: LucideIcon; label: string; desc: string }[] = [
  { icon: PhoneCall, label: "Capture", desc: "Answer every inbound call instantly." },
  { icon: CheckCircle2, label: "Qualify", desc: "Score intent, service, and urgency." },
  { icon: Workflow, label: "Automate", desc: "Trigger bookings and follow-ups." },
  { icon: Database, label: "Integrate", desc: "Sync everything into your CRM." },
  { icon: TrendingUp, label: "Convert", desc: "Turn demand into booked revenue." },
];

function HowItWorks() {
  return (
    <section id="how" className="relative overflow-hidden border-t border-black/[0.04] py-20 lg:py-24 scroll-mt-24">
      <GridTexture />
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-emerald-500/70" />
            <span className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">Architecture</span>
          </div>
          <h2 className="max-w-3xl font-display text-4xl md:text-6xl leading-[1.02] tracking-tight text-gradient-chrome">
            How the infrastructure works.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-5">
          {FLOW.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.label} delay={i * 0.08}>
                <div className="relative flex h-full flex-col items-center text-center md:items-start md:text-left">
                  {/* connector */}
                  {i < FLOW.length - 1 && (
                    <div aria-hidden className="absolute right-[-10px] top-6 hidden h-px w-5 md:block">
                      <div className="h-px w-full bg-gradient-to-r from-emerald-500/40 to-transparent" />
                    </div>
                  )}
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-black/[0.08] bg-white text-emerald-600 shadow-[0_10px_30px_-14px_rgba(16,185,129,0.4)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-[11px] font-medium tabular-nums text-emerald-600">0{i + 1}</span>
                    <h3 className="font-display text-lg tracking-tight text-foreground">{s.label}</h3>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------- SECTION 6 — CRM INTEGRATION ------------------- */

function CrmDashboard() {
  const rows = [
    { name: "M. Hassan", service: "Roof repair", status: "Booked", time: "3m ago", tone: "emerald" },
    { name: "S. Whitfield", service: "Inspection", status: "Qualified", time: "11m ago", tone: "neutral" },
    { name: "D. Okafor", service: "Quote", status: "Follow-up", time: "24m ago", tone: "amber" },
    { name: "L. Romano", service: "Emergency", status: "Booked", time: "38m ago", tone: "emerald" },
    { name: "A. Petrov", service: "Maintenance", status: "Qualified", time: "52m ago", tone: "neutral" },
  ];
  const toneClass: Record<string, string> = {
    emerald: "border-emerald-500/25 bg-emerald-500/[0.10] text-emerald-300",
    neutral: "border-white/15 bg-white/[0.06] text-white/70",
    amber: "border-amber-400/25 bg-amber-400/[0.10] text-amber-200",
  };
  return (
    <>
      <div aria-hidden style={{ height: "90px", marginBottom: "-1px", background: "linear-gradient(180deg, #ffffff 0%, #d6d9d8 55%, #0a0c0b 100%)" }} />
      <section className="relative overflow-hidden py-20 lg:py-24" style={{ background: DARK_BG }}>
        <GridTexture dark />
        <div className="relative mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-white/55 backdrop-blur">
                <LiveDot /> Pipeline · Live
              </div>
              <h2 className="font-display text-4xl md:text-5xl leading-[1.05] tracking-[-0.02em]">
                <span className="bg-gradient-to-b from-white via-white to-white/65 bg-clip-text text-transparent">
                  Every lead, in your CRM.
                </span>
              </h2>
              <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-white/55">
                Calls become qualified, structured records — synced and moving
                through your pipeline in real time.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-12 overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.045] to-white/[0.01] backdrop-blur-xl shadow-[0_44px_110px_-55px_rgba(0,0,0,0.85)]">
              <div aria-hidden className="pointer-events-none absolute inset-x-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(16,185,129,0.4), transparent)" }} />
              {/* header */}
              <div className="grid grid-cols-[1.4fr_1.2fr_1fr_auto] items-center gap-3 border-b border-white/[0.08] px-4 py-3 text-[10px] uppercase tracking-[0.16em] text-white/40 sm:px-6">
                <span>Lead</span>
                <span className="hidden sm:block">Service</span>
                <span>Status</span>
                <span className="text-right">Updated</span>
              </div>
              {rows.map((r, i) => (
                <motion.div
                  key={r.name}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="grid grid-cols-[1.4fr_1.2fr_1fr_auto] items-center gap-3 border-b border-white/[0.05] px-4 py-3.5 transition-colors duration-300 last:border-0 hover:bg-white/[0.025] sm:px-6"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-[10px] font-semibold text-white/70">
                      {r.name.split(" ").map((p) => p[0]).join("")}
                    </span>
                    <span className="truncate text-[13px] text-white/85">{r.name}</span>
                  </div>
                  <span className="hidden truncate text-[13px] text-white/55 sm:block">{r.service}</span>
                  <span>
                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-medium ${toneClass[r.tone]}`}>
                      {r.tone !== "neutral" && <span className={`h-1 w-1 rounded-full ${r.tone === "emerald" ? "bg-emerald-400" : "bg-amber-300"}`} />}
                      {r.status}
                    </span>
                  </span>
                  <span className="text-right text-[11px] tabular-nums text-white/35">{r.time}</span>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
      <div aria-hidden style={{ height: "90px", marginTop: "-1px", background: "linear-gradient(180deg, #0a0c0b 0%, #d6d9d8 55%, #ffffff 100%)" }} />
    </>
  );
}

/* --------------------- SECTION 7 — FINAL CTA --------------------- */

function DemoCTA() {
  return (
    <div className="bg-background px-4 pt-6 pb-16 sm:px-6 lg:px-8 lg:pb-24">
      <section className="relative isolate overflow-hidden rounded-[28px] border border-white/[0.06] bg-gradient-to-b from-[#171717] to-[#0a0a0a] pt-20 pb-20 lg:pt-24 lg:pb-24 shadow-[0_50px_120px_-50px_rgba(0,0,0,0.7),0_1px_0_0_rgba(255,255,255,0.04)_inset]">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(16,185,129,0.4), transparent)" }} />
        <div aria-hidden className="absolute inset-0 opacity-[0.06] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_72%)]" style={{ backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "72px 72px" }} />
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 16%, rgba(16,185,129,0.07), transparent 60%), radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,255,255,0.04), transparent 70%)" }} />
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 52%, rgba(0,0,0,0.5) 100%)" }} />

        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <Reveal delay={0.05}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-white/55 backdrop-blur">
              <LiveDot /> Deploy Your Infrastructure
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <h2 className="font-display text-gradient-white-grey text-[clamp(2.25rem,7vw,4.75rem)] leading-[0.95] tracking-[-0.035em]">
              Build infrastructure that scales.
            </h2>
          </Reveal>
          <Reveal delay={0.24}>
            <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-white/50">
              Deploy AI revenue infrastructure built for modern operators.
            </p>
          </Reveal>
          <Reveal delay={0.36}>
            <div className="mt-8">
              <Link to="/contact" className={`${primaryCta} inline-flex px-8 py-4 text-sm`}>
                Book a Free Consultation
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

/* ------------------------------ PAGE ------------------------------ */

function DemoPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <SiteNav />
      <main>
        <LiveDemoBlock />
        <Benefits />
        <HowItWorks />
        <CrmDashboard />
        <DemoCTA />
      </main>
      <SiteFooter />
    </div>
  );
}
