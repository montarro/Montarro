import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  TrendingUp,
  Workflow,
  Zap,
  Map,
  Wrench,
  Briefcase,
  Stethoscope,
  HardHat,
  Home,
  Building2,
  Target,
  Search,
  Settings,
  ListChecks,
  Cpu,
  PhoneMissed,
  Clock,
  Users,
  TrendingDown,
  AlertTriangle,
  Headphones,
  Repeat,
  Filter,
  Database,
  BarChart3,
  Gauge,
  Layers,
  LineChart,
  Check,
  Image as ImageIcon,
  type LucideIcon,
} from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";
import { primaryCta } from "@/lib/cta";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book a Free Consultation — Montarro" },
      {
        name: "description",
        content:
          "Book a free 30-minute growth audit. We'll uncover missed opportunities, operational bottlenecks, revenue leaks and where automation creates immediate ROI.",
      },
      { property: "og:title", content: "Book a Free Consultation — Montarro" },
      {
        property: "og:description",
        content: "A strategic growth audit, not a sales demo. Walk away with a clear action plan.",
      },
    ],
  }),
  component: BookPage,
});

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
      initial={{ opacity: 0, y: 24 }}
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

function BookCta({ className = "" }: { className?: string }) {
  return (
    <Link to="/contact" className={`${primaryCta} inline-flex px-6 py-3 text-sm ${className}`}>
      Book Your Free Consultation
      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}

function BookPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <SiteNav />
      <main>
        <Hero />
        <WhatWeCover />
        <WhoFor />
        <WalkAway />
        <WhyWait />
        <SocialProof />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}

/* ------------------------------- 1 · HERO ------------------------------- */
function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-24">
      <div className="absolute inset-0 -z-10 bg-grid opacity-50 [mask-image:radial-gradient(ellipse_at_top,black_25%,transparent_72%)]" />
      <div className="absolute inset-0 -z-10 bg-radial-glow" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 mx-auto h-[420px] max-w-3xl rounded-full bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.06),transparent_70%)] blur-3xl" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
        <div>
          <Reveal delay={0.05}>
            <Eyebrow>
              <LiveDot /> Free Growth Audit
            </Eyebrow>
          </Reveal>
          <Reveal delay={0.15}>
            <h1 className="mt-7 max-w-[15ch] font-display text-[clamp(2.4rem,5.6vw,4.5rem)] leading-[1.0] tracking-[-0.04em] text-gradient-chrome">
              Let&rsquo;s Identify What&rsquo;s Holding Your Business Back.
            </h1>
          </Reveal>
          <Reveal delay={0.28}>
            <p className="mt-6 max-w-xl text-pretty text-base md:text-lg text-muted-foreground leading-relaxed">
              In 30 minutes we&rsquo;ll uncover missed opportunities, bottlenecks,
              revenue leaks, and where automation can create immediate ROI.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="mt-9">
              <BookCta />
            </div>
          </Reveal>
          <Reveal delay={0.5}>
            <p className="mt-6 text-[12px] tracking-wide text-muted-foreground/70">
              30 minutes · No obligation · A clear action plan to keep.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <ImagePlaceholder
            label="Owner Reviewing Operational Dashboard"
            icon={LineChart}
            className="aspect-[4/3] w-full"
          />
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------- 2 · WHAT WE'LL COVER ------------------------- */
function WhatWeCover() {
  const cards: { icon: LucideIcon; title: string; body: string }[] = [
    { icon: TrendingUp, title: "Revenue Opportunities", body: "Identify where leads, calls and enquiries are being lost." },
    { icon: Workflow, title: "Operational Bottlenecks", body: "Discover where manual processes are slowing growth." },
    { icon: Zap, title: "Automation Potential", body: "See which tasks can be automated immediately." },
    { icon: Map, title: "Growth Roadmap", body: "Walk away with a clear action plan." },
  ];
  return (
    <section className="relative border-t border-black/[0.06] bg-card/30 px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <Eyebrow>What Happens On The Call</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 font-display text-4xl md:text-5xl leading-[1.04] tracking-[-0.03em] text-gradient-chrome">
            What We&rsquo;ll Cover.
          </h2>
        </Reveal>
      </div>

      <div className="mx-auto mt-14 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c, i) => {
          const Icon = c.icon;
          return (
            <Reveal key={c.title} delay={0.06 * i}>
              <div className="group h-full rounded-2xl border border-black/[0.07] bg-white/70 p-6 backdrop-blur transition-all duration-300 hover:border-emerald-500/30 hover:bg-white hover:shadow-[0_30px_70px_-50px_rgba(16,185,129,0.5)]">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] text-emerald-600">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="mt-5 text-[15px] font-medium text-foreground">{c.title}</div>
                <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">{c.body}</p>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* framework diagram: business -> systems -> automation -> revenue */}
      <Reveal delay={0.2}>
        <div className="mx-auto mt-10 flex max-w-3xl flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          {["Business", "Systems", "Automation", "Revenue"].map((node, i, arr) => (
            <Fragmentish key={node} last={i === arr.length - 1}>
              <div className="flex-1 rounded-xl border border-black/[0.07] bg-white/70 px-4 py-3 text-center text-[13px] font-medium text-foreground backdrop-blur">
                {node}
              </div>
            </Fragmentish>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

// Tiny connector helper for the framework diagram.
function Fragmentish({ children, last }: { children: React.ReactNode; last: boolean }) {
  return (
    <>
      {children}
      {!last && (
        <span className="flex shrink-0 items-center justify-center text-emerald-500/50">
          <ArrowUpRight className="h-4 w-4 rotate-45 sm:rotate-0" />
        </span>
      )}
    </>
  );
}

/* ------------------------- 3 · WHO THIS IS FOR ------------------------- */
function WhoFor() {
  const industries: { icon: LucideIcon; label: string }[] = [
    { icon: Wrench, label: "Trades & Home Services" },
    { icon: Briefcase, label: "Professional Services" },
    { icon: Stethoscope, label: "Medical & Dental" },
    { icon: HardHat, label: "Construction" },
    { icon: Home, label: "Real Estate" },
    { icon: Building2, label: "Multi-Location Businesses" },
  ];
  return (
    <section className="relative border-t border-black/[0.06] px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <Eyebrow>Who This Is For</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 font-display text-4xl md:text-5xl leading-[1.04] tracking-[-0.03em] text-gradient-chrome">
            Built For Businesses Ready To Scale.
          </h2>
        </Reveal>
      </div>

      <div className="mx-auto mt-14 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {industries.map((ind, i) => {
          const Icon = ind.icon;
          return (
            <Reveal key={ind.label} delay={0.05 * i}>
              <div className="group h-full overflow-hidden rounded-2xl border border-black/[0.07] bg-white/70 backdrop-blur transition-all duration-300 hover:border-emerald-500/30 hover:bg-white">
                <ImagePlaceholder label={ind.label} icon={Icon} className="aspect-[16/10] w-full rounded-b-none border-x-0 border-t-0" />
                <div className="flex items-center gap-3 p-5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/[0.06] text-emerald-600">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-[14.5px] font-medium text-foreground">{ind.label}</span>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* ------------------- 4 · WHAT YOU'LL WALK AWAY WITH ------------------- */
function WalkAway() {
  const items: { icon: LucideIcon; label: string }[] = [
    { icon: Target, label: "Clear understanding of your biggest growth bottlenecks" },
    { icon: Search, label: "Opportunities you're currently missing" },
    { icon: Settings, label: "Recommended systems and automations" },
    { icon: ListChecks, label: "Actionable next steps" },
    { icon: Cpu, label: "Technology recommendations" },
  ];
  return (
    <section className="relative border-t border-black/[0.06] bg-card/30 px-6 py-20 lg:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div>
          <Reveal>
            <Eyebrow>What You&rsquo;ll Walk Away With</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 max-w-[16ch] font-display text-4xl md:text-5xl leading-[1.03] tracking-[-0.03em] text-gradient-chrome">
              Value On The Call — Even If We Never Work Together.
            </h2>
          </Reveal>
          <div className="mt-8 space-y-3">
            {items.map((it, i) => {
              const Icon = it.icon;
              return (
                <Reveal key={it.label} delay={0.05 * i}>
                  <div className="flex items-center gap-3 rounded-xl border border-black/[0.07] bg-white/70 px-4 py-3.5 backdrop-blur">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/[0.06] text-emerald-600">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="text-[14px] text-foreground">{it.label}</span>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
        <Reveal delay={0.15}>
          <ImagePlaceholder label="Executive Strategy Document" icon={ListChecks} className="aspect-[4/5] w-full" />
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------- 5 · WHY MOST BUSINESSES WAIT TOO LONG ----------------- */
function WhyWait() {
  const problems: { icon: LucideIcon; label: string }[] = [
    { icon: PhoneMissed, label: "Missed calls" },
    { icon: Clock, label: "Slow response times" },
    { icon: Filter, label: "Leads falling through the cracks" },
    { icon: Users, label: "Staff overloaded" },
    { icon: TrendingDown, label: "Revenue leakage" },
  ];
  const infra: { icon: LucideIcon; label: string }[] = [
    { icon: Headphones, label: "24/7 AI Receptionist" },
    { icon: Repeat, label: "Automated Follow-Up" },
    { icon: Filter, label: "Lead Qualification" },
    { icon: Database, label: "CRM Automation" },
    { icon: BarChart3, label: "Real-Time Reporting" },
  ];
  return (
    <section className="relative border-t border-black/[0.06] px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <Eyebrow>The Cost Of Waiting</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 font-display text-4xl md:text-5xl leading-[1.04] tracking-[-0.03em] text-gradient-chrome">
            Why Most Businesses Wait Too Long.
          </h2>
        </Reveal>
      </div>

      <div className="mx-auto mt-14 grid max-w-6xl items-stretch gap-4 lg:grid-cols-2">
        {/* left — overwhelmed */}
        <Reveal>
          <div className="flex h-full flex-col rounded-2xl border border-black/[0.07] bg-card/40 p-7 backdrop-blur">
            <ImagePlaceholder label="Owner Overwhelmed By Calls & Admin" icon={AlertTriangle} className="aspect-[16/9] w-full" />
            <div className="mt-6 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground/70">
              <AlertTriangle className="h-4 w-4 text-red-500" /> Operating Without Systems
            </div>
            <ul className="mt-5 space-y-3">
              {problems.map((p) => {
                const Icon = p.icon;
                return (
                  <li key={p.label} className="flex items-center gap-3 text-[14px] text-muted-foreground">
                    <Icon className="h-4 w-4 shrink-0 text-red-500/70" />
                    {p.label}
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
        {/* right — infrastructure */}
        <Reveal delay={0.1}>
          <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-emerald-500/25 bg-white/85 p-7 backdrop-blur shadow-[0_30px_80px_-50px_rgba(16,185,129,0.5)]">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{ background: "linear-gradient(to right, transparent, rgba(16,185,129,0.5), transparent)" }}
            />
            <ImagePlaceholder label="Real-Time Operations Dashboard" icon={Gauge} className="aspect-[16/9] w-full" />
            <div className="mt-6 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-emerald-700">
              <Check className="h-4 w-4 text-emerald-500" /> Montarro Infrastructure
            </div>
            <ul className="mt-5 space-y-3">
              {infra.map((p) => {
                const Icon = p.icon;
                return (
                  <li key={p.label} className="flex items-center gap-3 text-[14px] text-foreground">
                    <Icon className="h-4 w-4 shrink-0 text-emerald-500" />
                    {p.label}
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------- 6 · SOCIAL PROOF --------------------------- */
function SocialProof() {
  const cards: { icon: LucideIcon; title: string; stat: string }[] = [
    { icon: Target, title: "Never Miss Opportunities", stat: "100%" },
    { icon: Zap, title: "Faster Response Times", stat: "<1s" },
    { icon: Gauge, title: "Operational Efficiency", stat: "24/7" },
    { icon: Layers, title: "Scalable Systems", stat: "∞" },
    { icon: LineChart, title: "Predictable Growth", stat: "↑" },
  ];
  return (
    <section className="relative border-t border-black/[0.06] bg-card/30 px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <Eyebrow>Why Montarro</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 font-display text-4xl md:text-5xl leading-[1.04] tracking-[-0.03em] text-gradient-chrome">
            Why Businesses Choose Montarro.
          </h2>
        </Reveal>
      </div>

      <div className="mx-auto mt-14 grid max-w-6xl gap-4 lg:grid-cols-3">
        {/* dashboard placeholder spanning two rows on desktop */}
        <Reveal className="lg:col-span-2 lg:row-span-2">
          <ImagePlaceholder label="Live Performance Dashboard" icon={BarChart3} className="aspect-[16/10] h-full w-full lg:aspect-auto" />
        </Reveal>
        {cards.map((c, i) => {
          const Icon = c.icon;
          return (
            <Reveal key={c.title} delay={0.05 * i}>
              <div className="flex h-full items-center gap-4 rounded-2xl border border-black/[0.07] bg-white/70 p-5 backdrop-blur">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] text-emerald-600">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-display text-2xl leading-none tracking-tight text-gradient-chrome">{c.stat}</div>
                  <div className="mt-1 text-[13px] text-muted-foreground">{c.title}</div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* ------------------------------ 7 · FINAL CTA ------------------------------ */
function FinalCta() {
  return (
    <section className="relative isolate overflow-hidden border-t border-white/10 bg-[#0a0b0b] px-6 py-28 text-white lg:py-40">
      <div className="absolute inset-0 -z-10 bg-grid opacity-[0.08] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 mx-auto h-[520px] max-w-4xl -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.22),transparent_70%)] blur-3xl"
      />
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <Eyebrow dark>
            <LiveDot /> Book Your Audit
          </Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mx-auto mt-7 max-w-[20ch] font-display text-4xl md:text-6xl leading-[1.02] tracking-[-0.035em]">
            <span className="bg-gradient-to-b from-white via-white to-white/60 bg-clip-text text-transparent">
              Your Next Growth Bottleneck Is Already Costing You Money.
            </span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-lg text-[15px] leading-relaxed text-white/60">
            The question isn&rsquo;t whether your business needs better systems.
            It&rsquo;s how much longer you&rsquo;re willing to operate without them.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link to="/contact" className={`${primaryCta} inline-flex px-7 py-3.5 text-sm`}>
              Book Free Consultation
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              to="/services/ai-receptionists"
              className="group inline-flex items-center gap-2 rounded-xl border border-white/15 px-7 py-3.5 text-sm font-medium text-white/85 transition-all duration-300 hover:border-white/35 hover:text-white"
            >
              View Our Systems
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
