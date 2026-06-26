import { createFileRoute } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Montarro" },
      { name: "description", content: "The terms governing your use of the Montarro website and services." },
    ],
  }),
  component: TermsPage,
});

// Standard, editable boilerplate. Replace with your finalised legal copy.
const SECTIONS: { h: string; p: string[] }[] = [
  {
    h: "1. Acceptance of Terms",
    p: [
      "By accessing or using the Montarro website and services, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use the site.",
    ],
  },
  {
    h: "2. Our Services",
    p: [
      "Montarro provides AI receptionist, CRM, lead capture, automation, follow-up, appointment booking and advertising services for businesses. Specific deliverables, scope and fees are set out in a separate agreement provided after consultation.",
    ],
  },
  {
    h: "3. Use of the Site",
    p: [
      "You agree to use the site lawfully and not to misuse, disrupt, or attempt to gain unauthorised access to it. Information on the site is provided for general purposes and does not constitute a binding offer unless confirmed in writing.",
    ],
  },
  {
    h: "4. Intellectual Property",
    p: [
      "All content on this site — including text, design, graphics and branding — is owned by or licensed to Montarro and may not be copied or reused without permission.",
    ],
  },
  {
    h: "5. Disclaimers",
    p: [
      "The site and its content are provided “as is” without warranties of any kind. Any performance figures or examples are illustrative and not guarantees of results.",
    ],
  },
  {
    h: "6. Limitation of Liability",
    p: [
      "To the maximum extent permitted by law, Montarro is not liable for any indirect, incidental or consequential loss arising from your use of the site or services.",
    ],
  },
  {
    h: "7. Changes to These Terms",
    p: [
      "We may update these Terms from time to time. Continued use of the site after changes take effect constitutes acceptance of the revised Terms.",
    ],
  },
  {
    h: "8. Contact",
    p: ["Questions about these Terms can be sent to Team@montarro.com."],
  },
];

function TermsPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <SiteNav />
      <main className="mx-auto max-w-3xl px-6 pt-32 pb-20 lg:pt-40">
        <p className="text-[11px] uppercase tracking-[0.24em] text-emerald-700/80">Legal</p>
        <h1 className="mt-4 font-display text-4xl md:text-5xl tracking-[-0.03em] text-gradient-chrome">
          Terms &amp; Conditions
        </h1>
        <p className="mt-4 text-[13px] text-muted-foreground/70">Last updated: 2026</p>
        <div className="mt-12 space-y-10">
          {SECTIONS.map((s) => (
            <section key={s.h}>
              <h2 className="font-display text-xl tracking-tight text-foreground">{s.h}</h2>
              {s.p.map((para, i) => (
                <p key={i} className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                  {para}
                </p>
              ))}
            </section>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
