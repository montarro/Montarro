import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Phone } from "lucide-react";
import { MobileMenu } from "@/components/MobileMenu";
import { primaryCta } from "@/lib/cta";

// Solid white, fully opaque navbar — identical on every page, no scroll/colour change.
export function SiteNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/[0.08] bg-white shadow-[0_1px_2px_-1px_rgba(0,0,0,0.06)]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center">
          <img src="/montarro-logo.png" alt="Montarro" className="h-14 w-auto" />
        </Link>
        <nav className="hidden lg:flex items-center gap-7 text-[13.5px] font-semibold">
          {(() => {
            const cls = "tracking-tight text-foreground/75 transition-colors duration-300 hover:text-foreground";
            return (
              <>
                <Link to="/" hash="system" className={cls}>The System</Link>
                <Link to="/demo" className={cls}>Live AI Demo</Link>
                <Link to="/" hash="about" className={cls}>About</Link>
                <Link to="/" hash="faq" className={cls}>FAQ</Link>
                <Link to="/" hash="cta" className={cls}>Contact</Link>
              </>
            );
          })()}
        </nav>
        <div className="flex items-center gap-3 lg:gap-4">
          {/* persistent bare call icon — all pages, mobile + desktop */}
          <a
            href="tel:0450731109"
            aria-label="Call Montarro"
            className="inline-flex items-center justify-center text-foreground/70 transition-colors duration-300 hover:text-foreground"
          >
            <Phone className="h-[18px] w-[18px]" />
          </a>
          <Link
            to="/contact"
            className={`${primaryCta} hidden lg:inline-flex px-5 py-2.5 text-[13px]`}
          >
            Book a Strategy Call
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          {/* mobile actions — qualify CTA beside the hamburger */}
          <div className="flex items-center gap-3 lg:hidden">
            <Link to="/contact" className={`${primaryCta} inline-flex px-4 py-2 text-[12px]`}>
              Do I Qualify?
            </Link>
            <MobileMenu />
          </div>
        </div>
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
                <li><Link to="/" hash="system" className="text-[13px] text-black/45 transition-colors duration-300 hover:text-black/80">CRM &amp; Automation</Link></li>
                <li><Link to="/" hash="system" className="text-[13px] text-black/45 transition-colors duration-300 hover:text-black/80">Lead Generation</Link></li>
                <li><Link to="/demo" className="text-[13px] text-black/45 transition-colors duration-300 hover:text-black/80">Live Demo</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[11px] font-medium uppercase tracking-[0.18em] text-black/35">
                Explore
              </h4>
              <ul className="mt-4 space-y-2">
                <li><Link to="/" hash="system" className="text-[13px] text-black/45 transition-colors duration-300 hover:text-black/80">The System</Link></li>
                <li><Link to="/" hash="about" className="text-[13px] text-black/45 transition-colors duration-300 hover:text-black/80">About</Link></li>
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
