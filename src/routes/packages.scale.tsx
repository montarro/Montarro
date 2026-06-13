import { createFileRoute } from "@tanstack/react-router";
import { BarChart3 } from "lucide-react";
import { ProductPage } from "@/components/ProductPage";

export const Route = createFileRoute("/packages/scale")({
  head: () => ({
    meta: [
      { title: "Scale Package — Montarro" },
      { name: "description", content: "An in-house growth team, fully managed. The most senior tier of Montarro's growth infrastructure." },
      { property: "og:title", content: "Scale Package — Montarro" },
      { property: "og:description", content: "An in-house growth team, fully managed — engineered for serious operators." },
    ],
  }),
  component: () => (
    <ProductPage
      kind="package"
      eyebrow="Scale Package"
      title="Your growth team,"
      titleAccent="fully managed."
      tagline="The most senior tier we offer. A dedicated strategy lead, full creative + media pipeline, custom automations, and weekly cadence — operated as your in-house growth division."
      icon={BarChart3}
      heroStats={[
        { value: "Weekly", label: "Strategy Cadence" },
        { value: "Senior", label: "Dedicated Lead" },
        { value: "Custom", label: "Automation Builds" },
      ]}
      positioning="Scale is for operators who already understand the cost of doing this wrong. We take the entire growth function off your plate — strategy, creative, media, automation, optimisation — and run it as your team."
      includes={[
        { title: "Everything in Growth", desc: "The full Growth package — AI reception, content engine, paid media." },
        { title: "Dedicated Strategy Lead", desc: "A senior operator embedded in your business, weekly." },
        { title: "Custom Funnel Systems", desc: "Funnels engineered per offer, per audience, per channel." },
        { title: "Conversion Rate Optimisation", desc: "Continuous testing on offers, landing pages, and flows." },
        { title: "Custom Automation Builds", desc: "AI workflows tailored to your operations and stack." },
        { title: "Weekly Strategy Calls", desc: "Senior cadence — not account-manager check-ins." },
        { title: "Quarterly Roadmapping", desc: "Joint planning of revenue targets and infrastructure bets." },
        { title: "Priority Support", desc: "Direct line to the team. Same-day response window." },
      ]}
      sections={[
        {
          eyebrow: "Who this is for",
          title: "Operators scaling past their first ceiling.",
          body: "Companies doing $250k+/month ready to install a real growth division without hiring a CRO, head of marketing, and ops team to do it.",
        },
        {
          eyebrow: "The outcome",
          title: "A growth division on demand.",
          body: "After 90 days you own a fully operational acquisition + retention engine — staffed, instrumented, and optimised — without a single internal hire.",
        },
      ]}
      forWho={[
        "Companies doing $250k–5M/month",
        "Founders done managing agencies day-to-day",
        "Operators preparing for the next funding stage",
        "Brands needing custom automation + funnels",
        "Teams ready for senior strategic cadence",
        "Anyone who values speed and discretion",
      ]}
      outcomes={[
        "Install a complete growth division in under 90 days.",
        "Avoid 2–5 senior hires while gaining more output.",
        "Optimise conversion rates across the entire funnel.",
        "Compound revenue with custom automation + CRO.",
      ]}
      comparison={[
        { label: "Strategic cadence", before: "Monthly check-ins", after: "Weekly senior strategy" },
        { label: "Funnels", before: "One generic flow", after: "Custom per offer + channel" },
        { label: "Automation", before: "Off-the-shelf", after: "Bespoke, owned, documented" },
        { label: "Team depth", before: "Account manager", after: "Senior lead + full team" },
      ]}
      ctaLabel="Apply To Work With Montarro"
      ctaSub="Scale is selective. Let's see if it's the right fit."
    />
  ),
});
