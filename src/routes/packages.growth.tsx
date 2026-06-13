import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp } from "lucide-react";
import { ProductPage } from "@/components/ProductPage";

export const Route = createFileRoute("/packages/growth")({
  head: () => ({
    meta: [
      { title: "Growth Package — Montarro" },
      { name: "description", content: "Full-stack growth infrastructure — AI reception, content, paid media, and conversion — engineered to scale modern companies." },
      { property: "og:title", content: "Growth Package — Montarro" },
      { property: "og:description", content: "Full-stack acquisition and optimisation, deployed and managed by Montarro." },
    ],
  }),
  component: () => (
    <ProductPage
      kind="package"
      eyebrow="Growth Package · Most Popular"
      title="Full-stack"
      titleAccent="acquisition."
      tagline="The package most modern operators choose. We install the foundation, plug in content + paid media, and run the entire acquisition engine end-to-end."
      icon={TrendingUp}
      heroStats={[
        { value: "+215%", label: "Avg Booking Lift" },
        { value: "4–8×", label: "ROAS" },
        { value: "60+", label: "Assets / Month" },
      ]}
      positioning="Everything in Starter, plus the demand side of the equation: content engineered for attention and paid media engineered for ROAS — wired into the same data layer."
      includes={[
        { title: "AI Receptionist", desc: "Always-on voice agent for every inbound call." },
        { title: "Content Engine", desc: "60+ assets/month across short-form, ads, and long-form." },
        { title: "Meta Ads Management", desc: "Full-funnel campaigns with weekly creative iteration." },
        { title: "Google Ads Management", desc: "Search + Performance Max engineered for booked calls." },
        { title: "Website Optimisation", desc: "Landing pages and offer pages tuned for conversion." },
        { title: "CRM + Lead Routing", desc: "Modern CRM, automated qualification, instant follow-up." },
        { title: "Bi-Weekly Strategy Calls", desc: "Senior strategist embedded in your growth motion." },
        { title: "Performance Dashboard", desc: "Live view across content, media, bookings, ROAS." },
      ]}
      sections={[
        {
          eyebrow: "Who this is for",
          title: "Companies ready to scale acquisition seriously.",
          body: "Growth-stage operators doing $50k–500k/month who are done piecing together five agencies and want one team running the entire growth engine.",
        },
        {
          eyebrow: "The outcome",
          title: "A compounding pipeline.",
          body: "Within 90 days you have a tested creative library, profitable paid channels, an AI-handled front desk, and a dashboard that shows it all in one view.",
        },
      ]}
      forWho={[
        "Companies doing $50k–500k/month in revenue",
        "Operators consolidating multiple agencies",
        "Brands ready to invest in compounding content",
        "Teams scaling paid media past plateau",
        "Founders who want a single accountable partner",
        "Anyone tired of disjointed growth efforts",
      ]}
      outcomes={[
        "Lift booked calls by 100–300% within 90 days.",
        "Run profitable paid acquisition across 2–4 channels.",
        "Ship more on-brand content than any in-house team.",
        "Replace 3–5 vendors with one accountable system.",
      ]}
      comparison={[
        { label: "Acquisition surface", before: "1 channel, fragile", after: "Multi-channel, redundant" },
        { label: "Creative velocity", before: "Few assets/quarter", after: "60+ assets/month" },
        { label: "ROAS", before: "Break-even or unclear", after: "Tracked, 4–8× target" },
        { label: "Accountability", before: "5 vendors, no owner", after: "One partner, one dashboard" },
      ]}
      ctaLabel="Apply To Work With Montarro"
      ctaSub="Most clients choose Growth. Let's see if you're a fit."
    />
  ),
});
