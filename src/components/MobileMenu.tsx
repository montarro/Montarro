import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { primaryCta } from "@/lib/cta";

export type NavLink = { label: string; href: string };

/**
 * Premium mobile navigation: a hamburger trigger (mobile/tablet only) that opens
 * a slide-in drawer. Desktop nav is untouched — this whole component is md:hidden.
 */
export function MobileMenu({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(true)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.08] bg-card/50 text-foreground backdrop-blur transition-colors duration-300 hover:border-foreground/30"
      >
        <Menu className="h-[18px] w-[18px]" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* backdrop overlay */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setOpen(false)}
              aria-hidden
              className="fixed inset-0 z-[60] bg-black/55 backdrop-blur-sm"
            />

            {/* drawer */}
            <motion.aside
              key="drawer"
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="fixed inset-y-0 right-0 z-[70] flex w-[82%] max-w-sm flex-col border-l border-white/10 bg-[#0b0b0c]/95 backdrop-blur-2xl shadow-[0_0_90px_-10px_rgba(0,0,0,0.7)]"
            >
              {/* subtle emerald top hairline */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px"
                style={{ background: "linear-gradient(to right, transparent, rgba(16,185,129,0.35), transparent)" }}
              />
              <div className="flex items-center justify-between px-6 pt-6">
                <Link to="/" onClick={() => setOpen(false)} className="flex items-center">
                  <img src="/montarro-logo.png" alt="Montarro" className="h-9 w-auto opacity-90 invert" />
                </Link>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors duration-300 hover:border-white/35 hover:text-white"
                >
                  <X className="h-[18px] w-[18px]" />
                </button>
              </div>

              <nav className="mt-10 flex flex-col px-6">
                {links.map((l, i) => (
                  <motion.a
                    key={l.label}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="group flex items-center justify-between border-b border-white/[0.08] py-4 text-lg tracking-tight text-white/70 transition-colors duration-300 hover:text-white"
                  >
                    {l.label}
                    <ArrowUpRight className="h-4 w-4 text-white/30 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-emerald-400" />
                  </motion.a>
                ))}
              </nav>

              <div className="mt-auto px-6 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className={`${primaryCta} flex w-full px-6 py-3.5 text-sm`}
                >
                  Book a Free Consultation
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
