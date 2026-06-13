import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowUpRight, Mail, Instagram } from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Montarro" },
      {
        name: "description",
        content:
          "Speak with Montarro. Apply to work with us and deploy AI infrastructure designed to scale modern companies.",
      },
      { property: "og:title", content: "Contact — Montarro" },
      {
        property: "og:description",
        content: "Apply to work with Montarro — AI infrastructure for modern companies.",
      },
    ],
  }),
  component: ContactPage,
});

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

function ContactPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <SiteNav />

      <main>
        {/* HERO */}
        <section className="relative isolate overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-20">
          <div className="absolute inset-0 -z-10 bg-grid opacity-50 [mask-image:radial-gradient(ellipse_at_top,black_25%,transparent_72%)]" />
          <div className="absolute inset-0 -z-10 bg-radial-glow" />
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 mx-auto h-[420px] max-w-3xl rounded-full bg-[radial-gradient(ellipse_at_center,rgba(46,204,113,0.06),transparent_70%)] blur-3xl" />

          <div className="mx-auto max-w-4xl px-6 text-center">
            <Reveal delay={0.05}>
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.22em] text-muted-foreground backdrop-blur">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500/60 animate-pulse-dot" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </span>
                Now Accepting Applications
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <h1 className="font-display text-balance mx-auto max-w-[14ch] text-[clamp(2.5rem,7.5vw,6rem)] leading-[0.95] tracking-[-0.045em] text-gradient-chrome">
                Speak with Montarro.
              </h1>
            </Reveal>
            <Reveal delay={0.28}>
              <p className="mx-auto mt-6 max-w-xl text-pretty text-base md:text-lg text-muted-foreground leading-relaxed">
                Tell us about your company and the systems you need built. We respond to every serious application within one business day.
              </p>
            </Reveal>
          </div>
        </section>

        {/* FORM PLACEHOLDER */}
        <section className="relative pb-20 lg:pb-28">
          <div className="mx-auto max-w-3xl px-6">
            <Reveal>
              <div
                id="ghl-form"
                className="relative overflow-hidden rounded-3xl border border-black/[0.06] bg-card/60 backdrop-blur shadow-[0_30px_80px_-40px_rgba(0,0,0,0.18)]"
              >
                <span className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

                <div className="flex min-h-[520px] flex-col items-center justify-center px-8 py-20 text-center">
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-emerald-700">
                    Embed Slot
                  </div>
                  <p className="font-display text-2xl md:text-3xl tracking-tight text-foreground/80">
                    Contact form embed will be added here.
                  </p>
                  <p className="mt-4 max-w-md text-sm text-muted-foreground">
                    Your GoHighLevel form will mount inside this section. Replace this placeholder with the GHL embed code when ready.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Direct contact fallback */}
            <Reveal delay={0.15}>
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <a
                  href="mailto:hello@montarro.com"
                  className="group flex items-center justify-between rounded-2xl border border-black/[0.06] bg-card/40 px-5 py-4 backdrop-blur transition-all duration-500 hover:border-emerald-500/30 hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm text-foreground/90">hello@montarro.com</span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-foreground/30 transition-all group-hover:text-emerald-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href="https://instagram.com/montarroaii"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-2xl border border-black/[0.06] bg-card/40 px-5 py-4 backdrop-blur transition-all duration-500 hover:border-emerald-500/30 hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-3">
                    <Instagram className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm text-foreground/90">@montarroaii</span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-foreground/30 transition-all group-hover:text-emerald-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="mt-10 text-center">
                <Link to="/" className="text-[12px] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground">
                  ← Back to Montarro
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
