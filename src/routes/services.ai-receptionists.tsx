import { createFileRoute } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { ProductPage } from "@/components/ProductPage";

export const Route = createFileRoute("/services/ai-receptionists")({
  head: () => ({
    meta: [
      { title: "AI Receptionists — Montarro" },
      { name: "description", content: "Always-on AI receptionists that answer, qualify, and book every lead — engineered for modern operators." },
      { property: "og:title", content: "AI Receptionists — Montarro" },
      { property: "og:description", content: "Every lead, handled. 24/7 AI front desk for high-growth companies." },
    ],
  }),
  component: () => (
    <ProductPage
      kind="service"
      eyebrow="AI Receptionists"
      title="Every lead,"
      titleAccent="handled."
      tagline="An always-on AI front desk that answers, qualifies, and books every inbound call — at the speed of software, with the polish of a senior operator."
      icon={Phone}
      liveModule
      tel="+610345145084"
      heroStats={[
        { value: "<1s", label: "Pickup Time" },
        { value: "24/7", label: "Coverage" },
        { value: "100%", label: "Leads Captured" },
      ]}
      positioning="Most companies lose 40% of their inbound revenue before a human ever picks up. We rebuild that surface area with a voice-AI front desk engineered to convert."
      sections={[
        {
          eyebrow: "What it does",
          title: "A voice agent indistinguishable from your best rep.",
          body: "Trained on your offers, objections, scripts, and tone — your AI receptionist answers in under a second, qualifies the caller, and books straight into your calendar.",
          bullets: [
            "Natural, low-latency voice conversations",
            "Live calendar booking + CRM sync",
            "Custom qualification per service line",
            "Bilingual support out of the box",
          ],
          metric: "92% qualification accuracy",
        },
        {
          eyebrow: "How it scales you",
          title: "Capacity without headcount.",
          body: "Add lines, locations, and languages without hiring. Every call is logged, transcribed, and scored — you stop guessing where revenue leaks.",
          bullets: [
            "Unlimited concurrent calls",
            "Full transcripts + call scoring",
            "Routing to humans on high-intent calls",
            "Real-time performance dashboards",
          ],
          metric: "12 concurrent calls · realtime routing",
        },
        {
          eyebrow: "The problem we solve",
          title: "Missed calls are missed money.",
          body: "After-hours, lunch breaks, and overflow volume quietly drain pipelines. We close that gap permanently with infrastructure, not headcount.",
        },
        {
          eyebrow: "Why it matters",
          title: "Speed-to-lead is the new moat.",
          body: "Calling a lead in under a minute increases conversion by up to 391%. Our system replies in under a second — every time.",
        },
      ]}
      forWho={[
        { label: "High-volume inbound operators", reveal: "Overflow calls hit voicemail during peak hours — pipeline leaks before anyone picks up." },
        { label: "Multi-location service brands", reveal: "Branch routing breaks down and response times go inconsistent across sites." },
        { label: "Teams scaling faster than headcount", reveal: "Demand outpaces the front desk — booked revenue caps at human capacity." },
        { label: "Revenue teams running paid acquisition", reveal: "Paid leads call once. Miss it and the ad spend is gone." },
        { label: "Operators losing leads after-hours", reveal: "Nights and weekends quietly drain inbound demand to competitors." },
        { label: "Healthcare, legal, automotive & home services", reveal: "High-intent calls with zero margin for a missed connection." },
      ]}
      outcomes={[
        "Recover 30–50% of previously missed inbound revenue.",
        "Cut response time from minutes to under one second.",
        "Replace 1–3 reception hires with a single deployed system.",
        "Get a structured record of every conversation, automatically.",
      ]}
      ctaLabel="Build Your System"
      ctaSub="Deploy your AI front desk in days. We'll show you how."
    />
  ),
});
