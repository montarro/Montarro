import { createFileRoute } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Montarro" },
      { name: "description", content: "How Montarro collects, uses and protects your information." },
    ],
  }),
  component: PrivacyPage,
});

// Standard, editable boilerplate. Replace with your finalised legal copy.
const SECTIONS: { h: string; p: string[] }[] = [
  {
    h: "1. Introduction",
    p: [
      "This Privacy Policy explains how Montarro (“we”, “us”, “our”) collects, uses, discloses and safeguards your information when you visit our website or use our services. By using our site you agree to the practices described here.",
    ],
  },
  {
    h: "2. Information We Collect",
    p: [
      "We collect information you provide directly — such as your name, business name, email, phone number and the details you submit through our consultation form — as well as limited technical data (such as device and usage information) collected automatically to operate and improve the site.",
    ],
  },
  {
    h: "3. How We Use Your Information",
    p: [
      "We use your information to respond to enquiries, schedule and deliver consultations, provide and improve our services, communicate with you about your request, and meet our legal obligations. We do not sell your personal information.",
    ],
  },
  {
    h: "4. How We Share Information",
    p: [
      "We share information only with trusted service providers who help us operate (for example, CRM, scheduling, communications and automation platforms), and where required by law. These providers are bound to handle your information securely and only for the purposes we specify.",
    ],
  },
  {
    h: "5. Data Retention",
    p: [
      "We retain personal information for as long as necessary to fulfil the purposes described in this policy, unless a longer retention period is required or permitted by law.",
    ],
  },
  {
    h: "6. Your Rights",
    p: [
      "Subject to applicable law, you may request access to, correction of, or deletion of your personal information, and you may opt out of marketing communications at any time. To make a request, contact us using the details below.",
    ],
  },
  {
    h: "7. Cookies",
    p: [
      "We may use cookies and similar technologies to operate the site, remember preferences and understand usage. You can control cookies through your browser settings.",
    ],
  },
  {
    h: "8. Contact",
    p: [
      "If you have questions about this policy or your information, contact us at Team@montarro.com.",
    ],
  },
];

function PrivacyPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <SiteNav />
      <main className="mx-auto max-w-3xl px-6 pt-32 pb-20 lg:pt-40">
        <p className="text-[11px] uppercase tracking-[0.24em] text-emerald-700/80">Legal</p>
        <h1 className="mt-4 font-display text-4xl md:text-5xl tracking-[-0.03em] text-gradient-chrome">
          Privacy Policy
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
