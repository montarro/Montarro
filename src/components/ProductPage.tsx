import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowUpRight, Check, type LucideIcon } from "lucide-react";
import { SiteNav, SiteFooter } from "./SiteChrome";

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

export type ProductSection = {
  eyebrow: string;
  title: string;
  body: string;
  bullets?: string[];
};

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
  forWho: string[];
  includes?: { title: string; desc: string }[];
  outcomes?: string[];
  comparison?: { label: string; before: string; after: string }[];
  ctaLabel: string;
  ctaSub: string;
};

export function ProductPage(p: ProductPageProps) {
  const Icon = p.icon;
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <SiteNav />

      <main>
        {/* HERO */}
        <section className="relative isolate overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
          <div className="absolute inset-0 -z-10 bg-grid opacity-50 [mask-image:radial-gradient(ellipse_at_top,black_25%,transparent_72%)]" />
          <div className="absolute inset-0 -z-10 bg-radial-glow" />
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 mx-auto h-[420px] max-w-3xl rounded-full bg-[radial-gradient(ellipse_at_center,rgba(46,204,113,0.06),transparent_70%)] blur-3xl" />

          <div className="mx-auto max-w-5xl px-6 text-center">
            <Reveal delay={0.05}>
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.22em] text-muted-foreground backdrop-blur">
                <Icon className="h-3 w-3 text-emerald-500" />
                {p.eyebrow}
              </div>
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
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-transform duration-300 hover:scale-[1.03]"
                >
                  {p.ctaLabel}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-6 py-3.5 text-sm font-medium backdrop-blur transition-all duration-300 hover:border-foreground/40 hover:bg-card"
                >
                  Back to Overview
                </Link>
              </div>
            </Reveal>

            {p.heroStats && (
              <Reveal delay={0.55}>
                <div className="mx-auto mt-16 grid max-w-3xl gap-4 sm:grid-cols-3">
                  {p.heroStats.map((s) => (
                    <div
                      key={s.label}
                      className="rounded-2xl border border-black/[0.06] bg-card/50 px-5 py-5 backdrop-blur"
                    >
                      <div className="font-display text-3xl tracking-tight text-gradient-chrome">
                        {s.value}
                      </div>
                      <div className="mt-1 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}
          </div>
        </section>

        {/* POSITIONING */}
        <section className="relative border-t border-black/[0.05] py-20 lg:py-28">
          <div className="mx-auto max-w-5xl px-6">
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

        {/* DETAIL SECTIONS */}
        <section className="relative border-t border-black/[0.05] py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-5 md:grid-cols-2">
              {p.sections.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.06}>
                  <div className="group relative h-full overflow-hidden rounded-2xl border border-black/[0.06] bg-card/60 p-8 backdrop-blur transition-all duration-500 ease-out hover:border-emerald-500/30 hover:-translate-y-1 hover:shadow-[0_30px_80px_-30px_rgba(46,204,113,0.22)]">
                    <span className="absolute left-0 top-0 h-px w-0 bg-gradient-to-r from-transparent via-emerald-500/70 to-transparent transition-all duration-700 ease-out group-hover:w-full" />
                    <div className="text-[11px] uppercase tracking-[0.24em] text-emerald-600/80">
                      {s.eyebrow}
                    </div>
                    <h3 className="mt-3 font-display text-3xl md:text-4xl tracking-tight text-foreground">
                      {s.title}
                    </h3>
                    <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                      {s.body}
                    </p>
                    {s.bullets && (
                      <ul className="mt-6 space-y-3">
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
                    <span className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                      What's Included
                    </span>
                  </div>
                  <h2 className="font-display text-4xl md:text-6xl leading-[1.05] tracking-tight text-gradient-chrome">
                    Every system, deployed.
                  </h2>
                </div>
              </Reveal>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {p.includes.map((it, i) => (
                  <Reveal key={it.title} delay={i * 0.05}>
                    <div className="h-full rounded-2xl border border-black/[0.06] bg-card/50 p-6 backdrop-blur transition-all duration-500 hover:border-emerald-500/30">
                      <div className="flex items-start gap-3">
                        <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-emerald-500/40">
                          <Check className="h-3 w-3 text-emerald-500" />
                        </span>
                        <div>
                          <div className="text-sm font-medium text-foreground">{it.title}</div>
                          <div className="mt-1 text-[13px] text-muted-foreground leading-relaxed">
                            {it.desc}
                          </div>
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
                <span className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                  Who it's for
                </span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl leading-[1.05] tracking-tight text-gradient-chrome">
                Built for operators who refuse to lose deals to ops.
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-7">
              <ul className="grid gap-3 sm:grid-cols-2">
                {p.forWho.map((w) => (
                  <li
                    key={w}
                    className="rounded-2xl border border-black/[0.06] bg-card/40 px-5 py-4 text-sm text-foreground/90 backdrop-blur transition-colors hover:border-emerald-500/30"
                  >
                    {w}
                  </li>
                ))}
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
                    <span className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                      Expected Outcomes
                    </span>
                  </div>
                  <h2 className="font-display text-4xl md:text-6xl leading-[1.05] tracking-tight text-gradient-chrome">
                    Numbers that compound.
                  </h2>
                </div>
              </Reveal>
              <div className="grid gap-4 md:grid-cols-2">
                {p.outcomes.map((o, i) => (
                  <Reveal key={o} delay={i * 0.06}>
                    <div className="flex items-start gap-4 rounded-2xl border border-black/[0.06] bg-card/40 p-6 backdrop-blur transition-colors hover:border-emerald-500/30">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-emerald-500/50">
                        <Check className="h-3.5 w-3.5 text-emerald-500" />
                      </span>
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
                    <span className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                      Before / After
                    </span>
                  </div>
                  <h2 className="font-display text-4xl md:text-6xl leading-[1.05] tracking-tight text-gradient-chrome">
                    The shift.
                  </h2>
                </div>
              </Reveal>
              <div className="overflow-hidden rounded-2xl border border-black/[0.06] bg-card/40 backdrop-blur">
                <div className="grid grid-cols-3 border-b border-black/[0.06] bg-card/60 px-6 py-4 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  <div></div>
                  <div>Before</div>
                  <div>After</div>
                </div>
                {p.comparison.map((c) => (
                  <div
                    key={c.label}
                    className="grid grid-cols-3 items-start gap-4 border-b border-black/[0.04] px-6 py-5 last:border-0 transition-colors hover:bg-card/60"
                  >
                    <div className="text-sm font-medium text-foreground">{c.label}</div>
                    <div className="text-sm text-muted-foreground line-through decoration-black/20">
                      {c.before}
                    </div>
                    <div className="text-sm text-emerald-600">{c.after}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <div className="bg-background px-4 pt-10 pb-16 sm:px-6 lg:px-8 lg:pt-14 lg:pb-24">
          <section className="relative isolate overflow-hidden rounded-[28px] border border-white/[0.04] bg-[#111111] pt-16 pb-20 lg:pt-20 lg:pb-24 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.5),0_1px_0_0_rgba(255,255,255,0.03)_inset]">
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.06] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_72%)]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
                backgroundSize: "72px 72px",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 50% 40% at 50% 60%, rgba(46,204,113,0.04), transparent 65%), radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,255,255,0.04), transparent 70%)",
              }}
            />
            <div className="relative mx-auto max-w-4xl px-6 text-center">
              <Reveal delay={0.1}>
                <h2 className="font-display text-gradient-white-grey text-[clamp(2.25rem,7.5vw,5.25rem)] leading-[0.95] tracking-[-0.035em]">
                  {p.kind === "service" ? "READY TO DEPLOY?" : "READY TO SCALE?"}
                </h2>
              </Reveal>
              <Reveal delay={0.22}>
                <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed tracking-[-0.01em] text-white/55">
                  {p.ctaSub}
                </p>
              </Reveal>
              <Reveal delay={0.36}>
                <div className="mt-7">
                  <Link
                    to="/contact"
                    className="group inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-black shadow-[0_8px_30px_-10px_rgba(0,0,0,0.25)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.03] hover:shadow-[0_20px_60px_-14px_rgba(0,0,0,0.35)]"
                  >
                    {p.ctaLabel}
                    <ArrowUpRight className="h-3.5 w-3.5 text-black/40 transition-transform duration-700 group-hover:text-emerald-500/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
