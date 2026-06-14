import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { ProductPage } from "@/components/ProductPage";

export const Route = createFileRoute("/services/content-creation")({
  head: () => ({
    meta: [
      { title: "Content Creation — Montarro" },
      { name: "description", content: "Performance-grade content engineered for attention, retention, and acquisition across every modern channel." },
      { property: "og:title", content: "Content Creation — Montarro" },
      { property: "og:description", content: "Content engineered for attention — designed to convert, not just look pretty." },
    ],
  }),
  component: () => (
    <ProductPage
      kind="service"
      eyebrow="Content Infrastructure"
      title="Content engineered"
      titleAccent="for attention."
      tagline="A managed content engine that produces short-form, long-form, and conversion-grade assets at the cadence the algorithm rewards — without the chaos."
      icon={Sparkles}
      heroStats={[
        { value: "60+", label: "Assets / Month" },
        { value: "10×", label: "Output Velocity" },
        { value: "1", label: "Brand Voice" },
      ]}
      positioning="Modern attention is won by operators who ship — daily, on-brand, and across every surface. We are the content infrastructure behind that velocity."
      sections={[
        {
          eyebrow: "What we produce",
          title: "Every asset, on rhythm.",
          body: "Hooks, shorts, ads, podcasts, long-form, posts. We operate a full creative pipeline — strategy, capture, edit, publish — sized for the channels that actually move pipeline.",
          bullets: [
            "Short-form video (Reels, TikTok, Shorts)",
            "Founder-led podcast & long-form",
            "Direct-response ad creative",
            "On-brand graphics + carousels",
          ],
          metric: "Publishing queue · 60+ assets/mo",
        },
        {
          eyebrow: "How we scale you",
          title: "A studio in a Slack channel.",
          body: "AI-assisted editing, structured creative briefs, and a senior strategist drive output 10× faster than agencies or in-house teams — without lowering the floor on quality.",
          bullets: [
            "Weekly capture days or remote pipelines",
            "Performance-tagged content library",
            "Hooks & scripts built from data",
            "Cross-platform repurposing engine",
          ],
          metric: "10× output velocity · pipeline synced",
        },
        {
          eyebrow: "The problem we solve",
          title: "In-house teams stall. Agencies dilute.",
          body: "We sit between both — owning the brand voice, the cadence, and the conversion outcome. You stop posting; you start compounding.",
        },
        {
          eyebrow: "Why it matters",
          title: "Attention is the new distribution.",
          body: "Companies that own a content engine acquire customers at a fraction of paid-only competitors. We build that engine and run it.",
        },
      ]}
      forWho={[
        { label: "Founders who are the face of the brand", reveal: "Personal reach stalls without a system behind the output." },
        { label: "Service brands in noisy local markets", reveal: "Inconsistent posting loses share of attention to competitors." },
        { label: "DTC & e-commerce chasing ad fatigue", reveal: "Creative burns out faster than it can be replaced." },
        { label: "Coaches, creators & personal brands", reveal: "Output plateaus the moment it depends on one person." },
        { label: "B2B companies productising expertise", reveal: "Knowledge stays trapped instead of compounding as distribution." },
        { label: "Anyone whose content output has plateaued", reveal: "No pipeline means cadence collapses under real workload." },
      ]}
      outcomes={[
        "Ship 4–8× more on-brand content per month.",
        "Cut cost-per-asset to a fraction of agency rates.",
        "Compound owned audience growth across 3+ channels.",
        "Feed paid media with creative that actually performs.",
      ]}
      ctaLabel="Build Your System"
      ctaSub="Let's turn your brand into a content compounding machine."
    />
  ),
});
