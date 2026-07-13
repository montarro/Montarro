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
  ArrowRight,
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

// Same dark canvas + ambient glow treatment as the About section (#111315 family).
const DARK_BG =
  "radial-gradient(ellipse 70% 45% at 50% 0%, rgba(16,185,129,0.07), transparent 55%), linear-gradient(180deg, #111315 0%, #0e1012 55%, #111315 100%)";

function GridTexture() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.05] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
      }}
    />
  );
}

function Kicker({ children }: { children: ReactNode }) {
  return (
    <div className="mb-7 flex items-center justify-center gap-3">
      <span className="h-px w-10 bg-emerald-500/60" />
      <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-400">
        {children}
      </span>
      <span className="h-px w-10 bg-emerald-500/60" />
    </div>
  );
}

/* ----------------------------- the call ----------------------------- */

function TranscriptPanel() {
  const msgs: { who: "ai" | "caller"; text: string; t: string }[] = [
    { who: "ai", text: "Montarro reception — how can I help?", t: "0:01" },
    { who: "caller", text: "I need a quote for a roof repair.", t: "0:04" },
    { who: "ai", text: "Happy to help. What suburb are you in?", t: "0:07" },
    { who: "caller", text: "Brunswick.", t: "0:10" },
    { who: "ai", text: "Booked an inspection — Thursday 3:00 PM. Details sent by SMS.", t: "0:14" },
  ];
  return (
    <div className="relative h-full overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] p-5 sm:p-6">
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-3.5">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/55">
          <Bot className="h-3.5 w-3.5 text-emerald-400" /> AI Receptionist
          <LiveDot />
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
                m.who === "ai" ? "border-emerald-500/15 bg-emerald-500/[0.06]" : "border-white/10 bg-white/[0.05]"
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
    <div className="relative h-full overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] p-5 sm:p-6">
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
              className="flex items-center gap-3 rounded-lg border border-white/[0.05] bg-white/[0.02] px-3 py-2.5"
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
    <div className="relative mx-auto max-w-2xl overflow-hidden rounded-[26px] border border-emerald-500/20 bg-white/[0.05] p-9 text-center sm:p-11">
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
        <span className="relative flex h-[72px] w-[72px] items-center justify-center rounded-full border border-emerald-500/50 bg-emerald-500/15 text-emerald-300">
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
        className={`${primaryCta} mt-7 inline-flex w-full justify-center px-8 py-4 text-base sm:w-auto`}
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
          <div key={l} className="bg-[#111315] px-3 py-2.5">
            <div className="text-[13px] font-semibold tabular-nums text-white">{v}</div>
            <div className="mt-0.5 text-[9px] uppercase tracking-[0.14em] text-white/40">{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------ the page ------------------------------ */
/*
 * One continuous dark canvas, told as a single story — hero, the journey,
 * the close — mirroring the About section's typography, spacing and flat,
 * gradient-free surfaces rather than a stack of separate feature sections.
 */

function DemoStory() {
  return (
    <section className="relative overflow-hidden pt-32 pb-28 lg:pt-40 lg:pb-40" style={{ background: DARK_BG }}>
      <GridTexture />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[680px] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(ellipse, rgba(16,185,129,0.10), transparent 70%)" }}
        animate={{ opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ---- hero: call it now ---- */}
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <Kicker>The Live System</Kicker>
          <h1 className="font-headline text-[clamp(2.75rem,6vw,5rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.02em] text-white">
            Built to answer.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[17px] font-medium leading-relaxed text-white/65 md:text-[19px]">
            This isn&rsquo;t a demo video. Call the number below and the AI
            receptionist answers — live, right now — exactly as it does for
            every business running on it.
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="mt-12">
            <TestCallCard />
          </div>
        </Reveal>
      </div>

      {/* ---- the journey: one call, start to finish ---- */}
      <div className="relative mx-auto mt-24 max-w-3xl px-6 text-center lg:mt-32">
        <Reveal>
          <Kicker>The Journey</Kicker>
          <h2 className="font-headline text-[clamp(2.25rem,5vw,4rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-white">
            One phone call.
            <br />
            <span className="text-emerald-400">One booked job.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[17px] font-medium leading-relaxed text-white/65 md:text-[19px]">
            Nothing below is staged. It&rsquo;s the same call, captured
            exactly as it happens — answered, qualified, booked and synced,
            start to finish.
          </p>
        </Reveal>
      </div>

      <div className="relative mx-auto mt-14 max-w-5xl px-6 lg:mt-16">
        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal><TranscriptPanel /></Reveal>
          <Reveal delay={0.1}><CrmFeedPanel /></Reveal>
        </div>
      </div>

      <div className="relative mx-auto mt-14 max-w-2xl px-6 text-center lg:mt-16">
        <Reveal y={16}>
          <p className="font-headline text-[24px] font-extrabold uppercase leading-[1.2] tracking-[-0.01em] text-white md:text-[30px]">
            Answered, qualified, booked and synced —
            <br />
            <span className="text-emerald-400">before the caller&rsquo;s even hung up.</span>
          </p>
        </Reveal>
      </div>

      {/* ---- close: book a call ---- */}
      <div className="relative mx-auto mt-24 max-w-2xl px-6 text-center lg:mt-32">
        <Reveal>
          <Kicker>Ready When You Are</Kicker>
          <h2 className="font-headline text-[clamp(2.25rem,5vw,3.5rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-white">
            Now imagine it answering for you.
          </h2>
          <p className="mx-auto mt-6 max-w-md text-[17px] font-medium leading-relaxed text-white/65 md:text-[19px]">
            The same system, running on your number, for every call you&rsquo;d
            otherwise miss.
          </p>
          <div className="mt-9">
            <Link to="/contact" className={`${primaryCta} inline-flex px-8 py-4 text-sm`}>
              Book a Free Consultation
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function DemoPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <SiteNav />
      <main>
        <DemoStory />
      </main>
      <SiteFooter />
    </div>
  );
}
