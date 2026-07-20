import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { primaryCta } from "@/lib/cta";

// Shared success-state content for both lead forms (the /contact form and
// the homepage QuickEnquiryForm) — a single source of truth so the copy
// can't drift out of sync between the two the way it did before. Each
// caller keeps its own entrance-animation wrapper and card chrome (the
// /contact form already renders inside a card; the homepage form doesn't),
// so this only renders the icon, heading, copy line and CTA button.
export function BookingSuccessCard({
  firstName,
  headingLevel = "h2",
}: {
  firstName: string;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  return (
    <>
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/[0.08]">
        <Check className="h-5 w-5 text-emerald-600" strokeWidth={2.4} />
      </div>
      <Heading className="mt-5 font-display text-3xl font-bold leading-tight tracking-[-0.03em] text-[#0a0b0b]">
        Thanks, {firstName}.
      </Heading>
      <p className="mt-3 max-w-sm text-[15px] font-medium leading-relaxed text-foreground">
        We&rsquo;ll call you shortly. Want it sooner? Pick a time that suits.
      </p>
      <Link
        to="/book"
        className={`${primaryCta} mt-6 inline-flex px-7 py-3.5 text-[14.5px]`}
      >
        Pick your time
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      </Link>
    </>
  );
}
