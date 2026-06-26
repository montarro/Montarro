import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { MobileMenu } from "@/components/MobileMenu";
import { primaryCta } from "@/lib/cta";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out ${
        scrolled
          ? "border-b border-white/10 bg-[#0a0b0b]/70 backdrop-blur-xl shadow-[0_12px_34px_-14px_rgba(0,0,0,0.55)]"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-500 ease-out ${
          scrolled ? "h-14" : "h-16"
        }`}
      >
        <Link to="/" className="flex items-center">
          <img
            src="/montarro-logo.png"
            alt="Montarro"
            className={`w-auto transition-all duration-500 ease-out ${
              scrolled ? "h-9 invert" : "h-[52px]"
            }`}
          />
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-[13px] font-medium">
          {(() => {
            const cls = `tracking-tight transition-colors duration-300 ${
              scrolled ? "text-white/70 hover:text-white" : "text-muted-foreground hover:text-foreground"
            }`;
            return (
              <>
                <Link to="/" hash="system" className={cls}>The System</Link>
                <Link to="/services/ai-receptionists" className={`group relative inline-flex items-center gap-1.5 ${cls}`}>
                  AI Receptionist
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500/60 animate-pulse-dot" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </span>
                  <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-[#0b0b0c]/95 px-2.5 py-1 text-[10px] font-normal tracking-tight text-white/80 opacity-0 shadow-lg backdrop-blur transition-all duration-300 group-hover:opacity-100">
                    Test the infrastructure live
                  </span>
                </Link>
                <Link to="/demo" className={cls}>Live Demo</Link>
                <Link to="/" hash="packages" className={cls}>Packages</Link>
              </>
            );
          })()}
        </nav>
        <Link
          to="/contact"
          className={`${primaryCta} hidden md:inline-flex px-5 py-2.5 text-[13px] ${
            scrolled ? "ring-1 ring-emerald-400/25" : ""
          }`}
        >
          Book a Free Consultation
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
        <MobileMenu scrolled={scrolled} />
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-black/[0.06] bg-background">
      <div className="mx-auto max-w-7xl px-6 pt-10 pb-8 lg:pt-12 lg:pb-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col justify-between lg:col-span-4">
            <div>
              <Link to="/" className="inline-block">
                <img src="/montarro-logo.png" alt="Montarro" className="h-[34px] w-auto" />
              </Link>
              <p className="mt-2 text-[13px] leading-relaxed text-black/40">
                AI infrastructure for modern companies.
              </p>
            </div>
            <p className="mt-6 text-[11px] tracking-[0.12em] uppercase text-black/20 lg:mt-0">
              Built for companies scaling through AI.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            <div>
              <h4 className="text-[11px] font-medium uppercase tracking-[0.18em] text-black/35">
                Infrastructure
              </h4>
              <ul className="mt-4 space-y-2">
                <li><Link to="/services/ai-receptionists" className="text-[13px] text-black/45 transition-colors duration-300 hover:text-black/80">AI Receptionist</Link></li>
                <li><Link to="/" hash="crm-automation" className="text-[13px] text-black/45 transition-colors duration-300 hover:text-black/80">CRM &amp; Automation</Link></li>
                <li><Link to="/" hash="lead-generation" className="text-[13px] text-black/45 transition-colors duration-300 hover:text-black/80">Lead Generation</Link></li>
                <li><Link to="/demo" className="text-[13px] text-black/45 transition-colors duration-300 hover:text-black/80">Live Demo</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[11px] font-medium uppercase tracking-[0.18em] text-black/35">
                Explore
              </h4>
              <ul className="mt-4 space-y-2">
                <li><Link to="/" hash="system" className="text-[13px] text-black/45 transition-colors duration-300 hover:text-black/80">The System</Link></li>
                <li><Link to="/" hash="packages" className="text-[13px] text-black/45 transition-colors duration-300 hover:text-black/80">Packages</Link></li>
                <li><Link to="/" hash="faq" className="text-[13px] text-black/45 transition-colors duration-300 hover:text-black/80">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[11px] font-medium uppercase tracking-[0.18em] text-black/35">
                Company
              </h4>
              <ul className="mt-4 space-y-2">
                <li><Link to="/contact" className="text-[13px] text-black/45 transition-colors duration-300 hover:text-black/80">Contact</Link></li>
                <li><Link to="/contact" className="text-[13px] text-black/45 transition-colors duration-300 hover:text-black/80">Book a Free Consultation</Link></li>
                <li><a href="https://instagram.com/montarroaii" target="_blank" rel="noopener noreferrer" className="text-[13px] text-black/45 transition-colors duration-300 hover:text-black/80">Instagram</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-black/[0.06] pt-6 text-[12px] text-black/25 md:flex-row md:items-center">
          <div>© 2025 Montarro. All rights reserved.</div>
          <div className="flex gap-6">
            <Link to="/privacy" className="transition-colors duration-300 hover:text-black/60">Privacy</Link>
            <Link to="/terms" className="transition-colors duration-300 hover:text-black/60">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
