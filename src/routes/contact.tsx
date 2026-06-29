import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { MobileMenu } from "@/components/MobileMenu";
import { primaryCta } from "@/lib/cta";
import { StrategyCallForm } from "@/components/StrategyCallForm";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Apply to Work With Montarro" },
      {
        name: "description",
        content:
          "Apply to work with Montarro. Designed for modern companies ready to scale through AI, automation, and acquisition systems.",
      },
      { property: "og:title", content: "Apply to Work With Montarro" },
      {
        property: "og:description",
        content:
          "A private strategy application for modern companies scaling through AI and automation.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-black/[0.05]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <img src="/montarro-logo.png" alt="Montarro" className="h-12 w-auto" />
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-[13px] font-medium text-muted-foreground">
          {[
            ["Services", "/#services"],
            ["AI Receptionist", "/services/ai-receptionists"],
            ["Live Demo", "/demo"],
            ["Pricing", "/#pricing"],
          ].map(([l, h]) => (
            <a
              key={l}
              href={h}
              className="tracking-tight transition-colors duration-300 hover:text-foreground"
            >
              {l}
            </a>
          ))}
        </nav>
        <Link
          to="/contact"
          className={`${primaryCta} hidden md:inline-flex px-5 py-2.5 text-[13px]`}
        >
          Book a Free Consultation
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
        <MobileMenu />
      </div>
    </header>
  );
}

function ContactPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <ContactNav />
      <main>
        <section className="relative isolate min-h-screen overflow-hidden pt-24 pb-16">
          {/* backdrop */}
          <div className="absolute inset-0 -z-10 bg-grid opacity-[0.12] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)]" />
          <div className="absolute inset-0 -z-10 bg-radial-glow" />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[16%] -z-10 h-[560px] w-[860px] -translate-x-1/2 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(16,185,129,0.08), transparent 70%)",
            }}
            animate={{ opacity: [0.65, 1, 0.65], scale: [1, 1.06, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="mx-auto max-w-2xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <div className="mb-6 sm:mb-8 inline-flex items-center gap-2 rounded-full border border-black/[0.06] bg-card/40 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.24em] text-muted-foreground backdrop-blur">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500/60 animate-pulse-dot" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </span>
                Private Infrastructure Audit
              </div>
              <h1 className="font-display text-balance mx-auto max-w-[16ch] text-[clamp(2.25rem,6.2vw,4.75rem)] leading-[0.98] tracking-[-0.045em] text-gradient-chrome">
                Scale With Montarro.
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-pretty text-[15px] md:text-base text-muted-foreground leading-relaxed">
                Infrastructure engineered to capture, qualify, and compound revenue.
              </p>
              <p className="mx-auto mt-4 max-w-md text-[12px] tracking-wide text-muted-foreground/55">
                We partner with a limited number of operators each quarter.
              </p>
            </motion.div>

            <StrategyCallForm className="mt-6 sm:mt-10" />
          </div>
        </section>
      </main>
    </div>
  );
}
