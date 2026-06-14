import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  Activity,
  Phone,
  PhoneCall,
  Bot,
  CheckCircle2,
  CalendarCheck,
  Database,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { SiteNav, SiteFooter } from "./SiteChrome";
import { primaryCta } from "@/lib/cta";

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

export type ProductSection = {
  eyebrow: string;
  title: string;
  body: string;
  bullets?: string[];
  /** Optional operational metric revealed on hover. */
  metric?: string;
};

export type ForWho = string | { label: string; reveal: string };

export type ProductPageProps = {
  kind: "service" | "package";
  eyebrow: string;
  title: string;
  titleAccent?: string;
  tagline: string;
  icon: LucideIcon;
  heroStats?: { value: string; label: string }[];
  positioning: string;
  sections: ProductSection[];
  forWho: ForWho[];
  includes?: { title: string; desc: string }[];
  outcomes?: string[];
  comparison?: { label: string; before: string; after: string }[];
  ctaLabel: string;
  ctaSub: string;
  /** Render the live AI demo right in the hero (flagship experience). */
  heroLive?: boolean;
  /** Render the live AI demo module mid-page. */
  liveModule?: boolean;
  /** Phone number for the "Call the AI Receptionist" action. */
  tel?: string;
};

/* ----------------------- live infrastructure panels ----------------------- */

function LiveTranscript() {
  const msgs: { who: "ai" | "caller"; text: string; t: string }[] = [
    { who: "ai", text: "Montarro reception — how can I help?", t: "0:01" },
    { who: "caller", text: "Need a quote for a roof repair.", t: "0:04" },
    { who: "ai", text: "Happy to help. What suburb are you in?", t: "0:07" },
    { who: "caller", text: "Brunswick.", t: "0:10" },
    { who: "ai", text: "Booked an inspection — Thursday 3:00 PM. SMS sent.", t: "0:14" },
  ];
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-5 backdrop-blur-xl shadow-[0_40px_100px_-50px_rgba(0,0,0,0.85)] sm:p-6">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(16,185,129,0.45), transparent)" }} />
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-3.5">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/55">
          <Bot className="h-3.5 w-3.5 text-emerald-400" /> AI Receptionist <LiveDot /> <span className="text-emerald-300/80">Live</span>
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
            transition={{ delay: 0.15 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={`flex ${m.who === "caller" ? "justify-end" : "justify-start"}`}
          >
            <div className={`max-w-[82%] rounded-2xl border px-3.5 py-2.5 ${m.who === "ai" ? "border-emerald-500/15 bg-emerald-500/[0.05]" : "border-white/10 bg-white/[0.05]"}`}>
              <div className="text-[13px] leading-snug text-white/85">{m.text}</div>
              <div className="mt-1 text-[10px] tabular-nums text-white/30">{m.who === "ai" ? "Montarro AI" : "Caller"} · {m.t}</div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 border-t border-white/[0.06] pt-3 text-[11px] text-white/40">
        <span className="flex items-center gap-1">
          {[0, 1, 2].map((d) => (
            <motion.span key={d} className="h-1.5 w-1.5 rounded-full bg-emerald-400/70" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.1, repeat: Infinity, delay: d * 0.18 }} />
          ))}
        </span>
        AI is responding…
      </div>
    </div>
  );
}

function LiveCrmFeed() {
  const events = [
    { icon: PhoneCall, label: "New Lead Captured", meta: "+61 4•• ••• 218", live: true },
    { icon: CheckCircle2, label: "Lead Qualified", meta: "Roof repair · Brunswick" },
    { icon: CalendarCheck, label: "Appointment Booked", meta: "Thu · 3:00 PM" },
    { icon: Database, label: "CRM Updated", meta: "GoHighLevel · synced" },
    { icon: Workflow, label: "Follow-Up Triggered", meta: "SMS sequence" },
  ];
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-5 backdrop-blur-xl shadow-[0_40px_100px_-50px_rgba(0,0,0,0.85)] sm:p-6">
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
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 rounded-lg border border-white/[0.05] bg-white/[0.02] px-3 py-2.5 transition-colors duration-300 hover:border-emerald-500/20 hover:bg-white/[0.035]"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] text-emerald-400">
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 text-[13px] text-white/85"><span className="truncate">{e.label}</span>{e.live && <LiveDot />}</div>
                <div className="truncate text-[10.5px] text-white/40">{e.meta}</div>
              </div>
              {e.live ? (
                <span className="shrink-0 rounded-full border border-emerald-500/20 bg-emerald-500/[0.08] px-2 py-0.5 text-[10px] font-medium text-emerald-300">Live</span>
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

function HeroStatCard({ value, label, index }: { value: string; label: string; index: number }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-black/[0.07] bg-gradient-to-b from-white/85 to-white/45 px-5 py-5 text-left backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6),0_20px_50px_-32px_rgba(0,0,0,0.16)] transition-all duration-500 ease-out hover:-translate-y-1 hover:border-emerald-500/35 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.75),0_30px_70px_-32px_rgba(16,185,129,0.32)]">
      <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-40 transition-opacity duration-500 group-hover:opacity-100" />
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.10),transparent_60%)]" />
      <div className="relative flex items-start justify-between">
        <div className="font-display text-3xl tracking-tight text-gradient-chrome tabular-nums">{value}</div>
        {index === 0 && <Waveform />}
        {index === 1 && <LiveDot />}
        {index === 2 && <Activity className="h-4 w-4 text-emerald-500/70" />}
      </div>
      <div className="relative mt-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
      <div className="relative mt-3">
        {index === 0 && (
          <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-emerald-600"><LiveDot /> Live · monitoring</span>
        )}
        {index === 1 && (
          <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-emerald-600"><LiveDot /> System active · 99.9%</span>
        )}
        {index === 2 && (
          <div className="h-1 w-full overflow-hidden rounded-full bg-black/[0.08]">
            <motion.div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400" initial={{ width: 0 }} whileInView={{ width: "100%" }} viewport={{ once: true }} transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }} />
          </div>
        )}
      </div>
    </div>
  );
}

function LiveSystemModule({ tel }: { tel?: string }) {
  return (
    <>
      <div aria-hidden style={{ height: "90px", marginBottom: "-1px", background: "linear-gradient(180deg, #ffffff 0%, #d6d9d8 55%, #0a0c0b 100%)" }} />
      <section
        className="relative overflow-hidden py-20 lg:py-24"
        style={{ background: "radial-gradient(ellipse 70% 50% at 12% 0%, rgba(16,185,129,0.07), transparent 55%), radial-gradient(ellipse 60% 60% at 92% 100%, rgba(16,185,129,0.05), transparent 55%), linear-gradient(180deg, #0a0c0b 0%, #070908 55%, #0a0c0b 100%)" }}
      >
        <motion.div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[760px] -translate-x-1/2 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(16,185,129,0.10), transparent 70%)" }} animate={{ opacity: [0.5, 0.85, 0.5] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }} />
        <div className="relative mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-white/55 backdrop-blur">
                <LiveDot /> Live System
              </div>
              <h2 className="font-display text-4xl md:text-5xl leading-[1.05] tracking-[-0.02em]">
                <span className="bg-gradient-to-b from-white via-white to-white/65 bg-clip-text text-transparent">Watch a call become revenue.</span>
              </h2>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <Reveal><LiveTranscript /></Reveal>
            <Reveal delay={0.1}><LiveCrmFeed /></Reveal>
          </div>
          {tel && (
            <Reveal delay={0.2}>
              <div className="mt-9 text-center">
                <a href={`tel:${tel}`} className={`${primaryCta} inline-flex px-6 py-3 text-sm`}>
                  <Phone className="h-4 w-4" />
                  Call The AI Receptionist
                </a>
              </div>
            </Reveal>
          )}
        </div>
      </section>
      <div aria-hidden style={{ height: "90px", marginTop: "-1px", background: "linear-gradient(180deg, #0a0c0b 0%, #d6d9d8 55%, #ffffff 100%)" }} />
    </>
  );
}

export function ProductPage(p: ProductPageProps) {
  const Icon = p.icon;
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <SiteNav />

      <main>
        {/* HERO */}
        <section className="relative isolate overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-24">
          <div className="absolute inset-0 -z-10 bg-grid opacity-50 [mask-image:radial-gradient(ellipse_at_top,black_25%,transparent_72%)]" />
          <div className="absolute inset-0 -z-10 bg-radial-glow" />
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 mx-auto h-[420px] max-w-3xl rounded-full bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.06),transparent_70%)] blur-3xl" />

          <div className="mx-auto max-w-5xl px-6 text-center">
            <Reveal delay={0.05}>
              {p.heroLive ? (
                <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/[0.06] px-3.5 py-1.5 text-[11px] uppercase tracking-[0.22em] text-emerald-700 backdrop-blur">
                  <LiveDot /> Live Infrastructure
                </div>
              ) : (
                <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.22em] text-muted-foreground backdrop-blur">
                  <Icon className="h-3 w-3 text-emerald-500" />
                  {p.eyebrow}
                </div>
              )}
            </Reveal>
            <Reveal delay={0.15}>
              <h1 className="font-display text-balance mx-auto max-w-[14ch] text-[clamp(2.5rem,7.5vw,6.5rem)] leading-[0.95] tracking-[-0.045em] text-gradient-chrome">
                {p.title}
                {p.titleAccent && (
                  <>
                    {" "}
                    <span className="text-emerald-500">{p.titleAccent}</span>
                  </>
                )}
              </h1>
            </Reveal>
            <Reveal delay={0.28}>
              <p className="mx-auto mt-7 max-w-2xl text-pretty text-base md:text-lg text-muted-foreground leading-relaxed">
                {p.tagline}
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                {p.heroLive && p.tel ? (
                  <>
                    <a href={`tel:${p.tel}`} className={`${primaryCta} inline-flex px-6 py-3 text-sm`}>
                      <Phone className="h-4 w-4" />
                      Call The AI Receptionist
                    </a>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/40 px-6 py-3 text-sm font-medium backdrop-blur transition-all duration-300 hover:border-foreground/40 hover:bg-card"
                    >
                      Book a Free Consultation
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/contact" className={`${primaryCta} inline-flex px-6 py-3 text-sm`}>
                      Book a Free Consultation
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                    <Link
                      to="/"
                      className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/40 px-6 py-3 text-sm font-medium backdrop-blur transition-all duration-300 hover:border-foreground/40 hover:bg-card"
                    >
                      Back to Overview
                    </Link>
                  </>
                )}
              </div>
            </Reveal>

            {/* flagship live demo — centerpiece */}
            {p.heroLive && (
              <Reveal delay={0.5}>
                <div className="relative mx-auto mt-16 max-w-5xl">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -inset-x-8 -top-8 bottom-0 -z-10 rounded-[40px] blur-3xl"
                    style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(16,185,129,0.12), transparent 70%)" }}
                  />
                  <div className="grid gap-5 text-left lg:grid-cols-2">
                    <LiveTranscript />
                    <LiveCrmFeed />
                  </div>
                </div>
              </Reveal>
            )}

            {p.heroStats && (
              <Reveal delay={p.heroLive ? 0.62 : 0.55}>
                <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
                  {p.heroStats.map((s, i) => (
                    <HeroStatCard key={s.label} value={s.value} label={s.label} index={i} />
                  ))}
                </div>
              </Reveal>
            )}
          </div>
        </section>

        {/* POSITIONING */}
        <section className="relative overflow-hidden border-t border-black/[0.05] py-20 lg:py-28">
          <svg aria-hidden viewBox="0 0 1200 200" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-[0.5]">
            <motion.path
              d="M0,150 C200,150 240,90 420,90 C620,90 660,150 860,150 C1020,150 1060,70 1200,70"
              fill="none"
              stroke="rgba(16,185,129,0.14)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
            />
            {[120, 420, 860, 1080].map((x, i) => (
              <motion.circle key={x} cx={x} cy={i === 1 ? 90 : i === 3 ? 70 : 150} r="3" fill="rgba(16,185,129,0.35)" animate={{ opacity: [0.25, 0.7, 0.25] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }} />
            ))}
          </svg>
          <div className="relative mx-auto max-w-5xl px-6">
            <Reveal>
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-10 bg-emerald-500/70" />
                <span className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                  {p.kind === "service" ? "Positioning" : "Overview"}
                </span>
              </div>
              <p className="font-display text-3xl md:text-5xl leading-[1.15] tracking-tight text-gradient-chrome text-balance">
                {p.positioning}
              </p>
            </Reveal>
          </div>
        </section>

        {/* LIVE SYSTEM MODULE (when not already in hero) */}
        {p.liveModule && !p.heroLive && <LiveSystemModule tel={p.tel} />}

        {/* DETAIL SECTIONS */}
        <section className="relative border-t border-black/[0.05] py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-5 md:grid-cols-2">
              {p.sections.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.06}>
                  <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-black/[0.07] bg-gradient-to-b from-white/80 to-white/40 p-8 backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6),0_20px_50px_-32px_rgba(0,0,0,0.16)] transition-all duration-500 ease-out hover:-translate-y-1 hover:border-emerald-500/35 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.75),0_34px_80px_-34px_rgba(16,185,129,0.32)]">
                    <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent opacity-40 transition-opacity duration-500 group-hover:opacity-100" />
                    <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.08),transparent_60%)]" />
                    <div className="relative text-[11px] uppercase tracking-[0.24em] text-emerald-600/80">{s.eyebrow}</div>
                    <h3 className="relative mt-3 font-display text-3xl md:text-4xl tracking-tight text-foreground">{s.title}</h3>
                    <p className="relative mt-4 text-[15px] leading-relaxed text-muted-foreground">{s.body}</p>
                    {s.bullets && (
                      <ul className="relative mt-6 space-y-3">
                        {s.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-3 text-sm text-foreground/90">
                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-emerald-500/40">
                              <Check className="h-3 w-3 text-emerald-500" />
                            </span>
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="relative mt-auto pt-6">
                      <div className="flex items-center gap-2 border-t border-black/[0.06] pt-4 text-[11px] font-medium text-emerald-600 opacity-0 -translate-y-1 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                        <LiveDot /> {s.metric ?? "Realtime · system active"}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* INCLUDES (packages) */}
        {p.includes && (
          <section className="relative border-t border-black/[0.05] py-20 lg:py-24">
            <div className="mx-auto max-w-7xl px-6">
              <Reveal>
                <div className="mb-12">
                  <div className="mb-6 flex items-center gap-3">
                    <span className="h-px w-10 bg-emerald-500/70" />
                    <span className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">What's Included</span>
                  </div>
                  <h2 className="font-display text-4xl md:text-6xl leading-[1.05] tracking-tight text-gradient-chrome">Every system, deployed.</h2>
                </div>
              </Reveal>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {p.includes.map((it, i) => (
                  <Reveal key={it.title} delay={i * 0.05}>
                    <div className="h-full rounded-2xl border border-black/[0.06] bg-card/50 p-6 backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-[0_30px_70px_-34px_rgba(16,185,129,0.3)]">
                      <div className="flex items-start gap-3">
                        <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-emerald-500/40">
                          <Check className="h-3 w-3 text-emerald-500" />
                        </span>
                        <div>
                          <div className="text-sm font-medium text-foreground">{it.title}</div>
                          <div className="mt-1 text-[13px] text-muted-foreground leading-relaxed">{it.desc}</div>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* WHO IT'S FOR */}
        <section className="relative border-t border-black/[0.05] py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-10 bg-emerald-500/70" />
                <span className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">Who it's for</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl leading-[1.05] tracking-tight text-gradient-chrome">
                Built for operators who refuse to lose deals to ops.
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-7">
              <ul className="grid gap-3 sm:grid-cols-2">
                {p.forWho.map((w) => {
                  const label = typeof w === "string" ? w : w.label;
                  const reveal = typeof w === "string" ? null : w.reveal;
                  return (
                    <li
                      key={label}
                      className="group relative overflow-hidden rounded-2xl border border-black/[0.06] bg-gradient-to-b from-white/70 to-white/40 px-5 py-4 backdrop-blur transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-emerald-500/30 hover:shadow-[0_26px_60px_-34px_rgba(16,185,129,0.3)]"
                    >
                      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(ellipse_at_top_left,rgba(16,185,129,0.08),transparent_60%)]" />
                      <div className="relative flex items-center justify-between gap-3">
                        <span className="text-sm font-medium text-foreground/90">{label}</span>
                        <LiveDot className="opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      </div>
                      {reveal && (
                        <div className="relative grid grid-rows-[0fr] transition-all duration-500 ease-out group-hover:grid-rows-[1fr]">
                          <div className="overflow-hidden">
                            <p className="pt-2.5 text-[12px] leading-relaxed text-muted-foreground">{reveal}</p>
                          </div>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* OUTCOMES */}
        {p.outcomes && (
          <section className="relative border-t border-black/[0.05] py-20 lg:py-24">
            <div className="mx-auto max-w-7xl px-6">
              <Reveal>
                <div className="mb-12">
                  <div className="mb-6 flex items-center gap-3">
                    <span className="h-px w-10 bg-emerald-500/70" />
                    <span className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">Expected Outcomes</span>
                  </div>
                  <h2 className="font-display text-4xl md:text-6xl leading-[1.05] tracking-tight text-gradient-chrome">Numbers that compound.</h2>
                </div>
              </Reveal>
              <div className="grid gap-4 md:grid-cols-2">
                {p.outcomes.map((o, i) => (
                  <Reveal key={o} delay={i * 0.06}>
                    <div className="group flex items-start gap-4 rounded-2xl border border-black/[0.06] bg-gradient-to-b from-white/70 to-white/40 p-6 backdrop-blur transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-emerald-500/30 hover:shadow-[0_26px_60px_-34px_rgba(16,185,129,0.3)]">
                      <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ delay: 0.1 + i * 0.06, type: "spring", stiffness: 220, damping: 14 }}
                        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-emerald-500/50 bg-emerald-500/[0.06] transition-shadow duration-500 group-hover:shadow-[0_0_18px_-4px_rgba(16,185,129,0.6)]"
                      >
                        <Check className="h-3.5 w-3.5 text-emerald-500" />
                      </motion.span>
                      <p className="text-[15px] leading-relaxed text-foreground/90">{o}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* COMPARISON (packages) */}
        {p.comparison && (
          <section className="relative border-t border-black/[0.05] py-20 lg:py-24">
            <div className="mx-auto max-w-7xl px-6">
              <Reveal>
                <div className="mb-12">
                  <div className="mb-6 flex items-center gap-3">
                    <span className="h-px w-10 bg-emerald-500/70" />
                    <span className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">Before / After</span>
                  </div>
                  <h2 className="font-display text-4xl md:text-6xl leading-[1.05] tracking-tight text-gradient-chrome">The shift.</h2>
                </div>
              </Reveal>
              <div className="overflow-hidden rounded-2xl border border-black/[0.06] bg-card/40 backdrop-blur">
                <div className="grid grid-cols-3 border-b border-black/[0.06] bg-card/60 px-6 py-4 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  <div></div>
                  <div>Before</div>
                  <div>After</div>
                </div>
                {p.comparison.map((c) => (
                  <div key={c.label} className="grid grid-cols-3 items-start gap-4 border-b border-black/[0.04] px-6 py-5 last:border-0 transition-colors hover:bg-card/60">
                    <div className="text-sm font-medium text-foreground">{c.label}</div>
                    <div className="text-sm text-muted-foreground line-through decoration-black/20">{c.before}</div>
                    <div className="text-sm text-emerald-600">{c.after}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <div className="bg-background px-4 pt-10 pb-16 sm:px-6 lg:px-8 lg:pt-14 lg:pb-24">
          <section className="relative isolate overflow-hidden rounded-[28px] border border-white/[0.06] bg-gradient-to-b from-[#171717] to-[#0a0a0a] pt-20 pb-20 lg:pt-24 lg:pb-24 shadow-[0_50px_120px_-50px_rgba(0,0,0,0.7),0_1px_0_0_rgba(255,255,255,0.04)_inset]">
            <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(16,185,129,0.4), transparent)" }} />
            <div aria-hidden className="absolute inset-0 opacity-[0.06] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_72%)]" style={{ backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "72px 72px" }} />
            <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 16%, rgba(16,185,129,0.07), transparent 60%), radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,255,255,0.04), transparent 70%)" }} />
            <motion.div aria-hidden className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[680px] -translate-x-1/2 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(16,185,129,0.10), transparent 70%)" }} animate={{ opacity: [0.45, 0.8, 0.45] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />
            <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 52%, rgba(0,0,0,0.5) 100%)" }} />

            <div className="relative mx-auto max-w-4xl px-6 text-center">
              <Reveal delay={0.05}>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-white/55 backdrop-blur">
                  <LiveDot /> {p.kind === "service" ? "Deploy The System" : "Begin Deployment"}
                </div>
              </Reveal>
              <Reveal delay={0.12}>
                <h2 className="font-display text-gradient-white-grey text-[clamp(2.25rem,7.5vw,5.25rem)] leading-[0.95] tracking-[-0.035em]">
                  {p.kind === "service" ? "READY TO DEPLOY?" : "READY TO SCALE?"}
                </h2>
              </Reveal>
              <Reveal delay={0.24}>
                <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed tracking-[-0.01em] text-white/50">{p.ctaSub}</p>
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
      </main>

      <SiteFooter />
    </div>
  );
}
