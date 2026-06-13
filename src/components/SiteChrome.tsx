import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { MobileMenu } from "@/components/MobileMenu";

const NAV_LINKS = [
  { label: "Services", href: "/#services" },
  { label: "Results", href: "/#results" },
  { label: "Case Study", href: "/#case" },
  { label: "Pricing", href: "/#pricing" },
];

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
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-background/70 border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <img src="/montarro-logo.png" alt="Montarro" className="h-[52px] w-auto" />
        </Link>
        <nav className="hidden md:flex items-center gap-10 text-[13px] text-muted-foreground">
          <Link to="/" hash="services" className="hover:text-foreground transition-colors tracking-wide">
            Services
          </Link>
          <Link to="/" hash="results" className="hover:text-foreground transition-colors tracking-wide">
            Results
          </Link>
          <Link to="/" hash="case" className="hover:text-foreground transition-colors tracking-wide">
            Case Study
          </Link>
          <Link to="/" hash="pricing" className="hover:text-foreground transition-colors tracking-wide">
            Pricing
          </Link>
        </nav>
        <Link
          to="/contact"
          className="group hidden md:inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-[12px] font-medium uppercase tracking-[0.14em] text-background transition-transform duration-300 hover:scale-[1.03]"
        >
          Book a Call
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
        <MobileMenu links={NAV_LINKS} />
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
                <li><Link to="/services/ai-receptionists" className="text-[13px] text-black/45 transition-colors duration-300 hover:text-black/80">AI Receptionists</Link></li>
                <li><Link to="/services/content-creation" className="text-[13px] text-black/45 transition-colors duration-300 hover:text-black/80">Content Creation</Link></li>
                <li><Link to="/services/automation-systems" className="text-[13px] text-black/45 transition-colors duration-300 hover:text-black/80">Automation Systems</Link></li>
                <li><Link to="/services/paid-advertising" className="text-[13px] text-black/45 transition-colors duration-300 hover:text-black/80">Paid Advertising</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[11px] font-medium uppercase tracking-[0.18em] text-black/35">
                Packages
              </h4>
              <ul className="mt-4 space-y-2">
                <li><Link to="/packages/starter" className="text-[13px] text-black/45 transition-colors duration-300 hover:text-black/80">Starter</Link></li>
                <li><Link to="/packages/growth" className="text-[13px] text-black/45 transition-colors duration-300 hover:text-black/80">Growth</Link></li>
                <li><Link to="/packages/scale" className="text-[13px] text-black/45 transition-colors duration-300 hover:text-black/80">Scale</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[11px] font-medium uppercase tracking-[0.18em] text-black/35">
                Company
              </h4>
              <ul className="mt-4 space-y-2">
                <li><Link to="/contact" className="text-[13px] text-black/45 transition-colors duration-300 hover:text-black/80">Contact</Link></li>
                <li><Link to="/contact" className="text-[13px] text-black/45 transition-colors duration-300 hover:text-black/80">Book A Call</Link></li>
                <li><a href="https://instagram.com/montarroaii" target="_blank" rel="noopener noreferrer" className="text-[13px] text-black/45 transition-colors duration-300 hover:text-black/80">Instagram</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-black/[0.06] pt-6 text-[12px] text-black/25 md:flex-row md:items-center">
          <div>© 2025 Montarro. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="transition-colors duration-300 hover:text-black/60">Privacy</a>
            <a href="#" className="transition-colors duration-300 hover:text-black/60">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
