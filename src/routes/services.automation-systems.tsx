import { createFileRoute } from "@tanstack/react-router";
import { Workflow } from "lucide-react";
import { ProductPage } from "@/components/ProductPage";

export const Route = createFileRoute("/services/automation-systems")({
  head: () => ({
    meta: [
      { title: "Automation Systems — Montarro" },
      { name: "description", content: "Custom AI automation systems that compress operations, eliminate manual work, and let companies scale without hiring." },
      { property: "og:title", content: "Automation Systems — Montarro" },
      { property: "og:description", content: "Built to scale operations. AI-native back office for modern companies." },
    ],
  }),
  component: () => (
    <ProductPage
      kind="service"
      eyebrow="Automation Systems"
      title="Built to scale"
      titleAccent="operations."
      tagline="Custom AI-native workflows that handle the work no one wants to do — so your team can stop drowning in admin and start operating like a software company."
      icon={Workflow}
      heroStats={[
        { value: "70%", label: "Manual Work Removed" },
        { value: "24/7", label: "Always-On" },
        { value: "1 Day", label: "Time-to-Value" },
      ]}
      positioning="Most teams hit a ceiling because their ops scale linearly with headcount. We collapse that ceiling by engineering AI workers into the systems you already use."
      sections={[
        {
          eyebrow: "What we build",
          title: "AI workers, wired into your stack.",
          body: "From lead routing to invoice generation to client onboarding — we map the operations slowing you down and replace them with bulletproof automated workflows.",
          bullets: [
            "Lead capture → CRM → assignment in seconds",
            "AI-generated proposals, contracts, follow-ups",
            "Automated onboarding & client comms",
            "Reporting pipelines that run themselves",
          ],
        },
        {
          eyebrow: "How we scale you",
          title: "Headcount becomes optional.",
          body: "Every workflow we ship removes a recurring task from a human's day. Your team moves up the value stack — strategy, sales, craft — while infrastructure handles the rest.",
          bullets: [
            "Native integrations with CRMs, calendars, comms",
            "Custom AI agents for support, sales, ops",
            "Real-time monitoring + failure alerts",
            "Documented, owned, handed over",
          ],
        },
        {
          eyebrow: "The problem we solve",
          title: "Manual work is the silent killer of margin.",
          body: "If a process has rules, it shouldn't need a human. We find every recurring task that drains your team and rebuild it as infrastructure.",
        },
        {
          eyebrow: "Why it matters",
          title: "Software companies scale. Service companies hire.",
          body: "We give service companies the leverage of a SaaS business — by turning your operations into code.",
        },
      ]}
      forWho={[
        "Operators capped by admin and ops overhead",
        "Teams running 3+ tools that don't talk to each other",
        "Agencies, clinics, firms drowning in fulfilment",
        "Companies scaling past 10 employees rapidly",
        "Founders still doing $20/hr work daily",
        "Anyone hiring to fix what should be automated",
      ]}
      outcomes={[
        "Eliminate 20–40 hours/week of manual work per team.",
        "Cut onboarding and admin cycle times by 80%+.",
        "Scale revenue without adding ops headcount.",
        "Get a documented, owned system — not a black box.",
      ]}
      ctaLabel="Build Your System"
      ctaSub="Map the bottleneck. We'll engineer it away."
    />
  ),
});
