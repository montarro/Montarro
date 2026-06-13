import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
import { primaryCta } from "@/lib/cta";

type SubItem = { label: string; to: string; hash?: string };
type Group = { label: string; items: SubItem[] };

/**
 * Global mobile navigation groups. Page items route directly; section items
 * point at the homepage with a hash — the root ScrollToTop handler navigates
 * home (if needed) and smooth-scrolls to the target, resetting scroll cleanly.
 */
const GROUPS: Group[] = [
  {
    label: "Infrastructure",
    items: [
      { label: "Revenue Capture", to: "/services/ai-receptionists" },
      { label: "Demand Acquisition", to: "/services/paid-advertising" },
      { label: "Operational Automation", to: "/services/automation-systems" },
      { label: "Attention Systems", to: "/services/content-creation" },
    ],
  },
  {
    label: "Packages",
    items: [
      { label: "Starter", to: "/packages/starter" },
      { label: "Growth", to: "/packages/growth" },
      { label: "Scale", to: "/packages/scale" },
    ],
  },
  {
    label: "Company",
    items: [
      { label: "About", to: "/", hash: "top" },
      { label: "Contact", to: "/contact" },
      { label: "Book a Free Consultation", to: "/contact" },
    ],
  },
  {
    label: "Resources",
    items: [
      { label: "How It Works", to: "/", hash: "how-it-works" },
      { label: "Infrastructure Modules", to: "/", hash: "services" },
      { label: "Pricing", to: "/", hash: "pricing" },
      { label: "FAQ", to: "/contact" },
    ],
  },
];

export function MobileMenu({ scrolled = false }: { scrolled?: boolean }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [openGroup, setOpenGroup] = useState<number | null>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => setMounted(true), []);
  // close the drawer whenever the route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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
        className={`inline-flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur transition-colors duration-300 ${
          scrolled
            ? "border-white/15 bg-white/[0.06] text-white/90 hover:border-white/35"
            : "border-black/[0.08] bg-card/50 text-foreground hover:border-foreground/30"
        }`}
      >
        <Menu className="h-[18px] w-[18px]" />
      </button>

      {mounted &&
        createPortal(
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
                  className="fixed inset-y-0 right-0 z-[70] flex w-[84%] max-w-sm flex-col border-l border-white/10 bg-[#0b0b0c]/95 backdrop-blur-2xl shadow-[0_0_90px_-10px_rgba(0,0,0,0.7)]"
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

                  <nav className="mt-7 flex-1 overflow-y-auto px-4">
                    {GROUPS.map((group, i) => {
                      const groupOpen = openGroup === i;
                      return (
                        <div key={group.label} className="border-b border-white/[0.07]">
                          <button
                            type="button"
                            aria-expanded={groupOpen}
                            onClick={() => setOpenGroup(groupOpen ? null : i)}
                            className="flex w-full items-center justify-between px-2 py-4 text-left text-[15px] font-medium text-white/85 transition-colors duration-200 hover:text-white"
                          >
                            {group.label}
                            <ChevronDown
                              className={`h-4 w-4 transition-transform duration-300 ${
                                groupOpen ? "rotate-180 text-emerald-400" : "text-white/40"
                              }`}
                            />
                          </button>
                          <AnimatePresence initial={false}>
                            {groupOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                className="overflow-hidden"
                              >
                                <div className="flex flex-col gap-0.5 pb-3">
                                  {group.items.map((item) => (
                                    <Link
                                      key={item.label}
                                      to={item.to}
                                      hash={item.hash}
                                      onClick={() => setOpen(false)}
                                      className="group/sub flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-white/55 transition-colors duration-200 hover:bg-white/[0.05] hover:text-white active:bg-white/[0.08]"
                                    >
                                      <span>{item.label}</span>
                                      <ArrowUpRight className="h-3.5 w-3.5 text-white/20 transition-all duration-200 group-hover/sub:translate-x-0.5 group-hover/sub:-translate-y-0.5 group-hover/sub:text-emerald-400" />
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </nav>

                  <div className="px-6 pt-5 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
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
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}
