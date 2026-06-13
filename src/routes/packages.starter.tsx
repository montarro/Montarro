import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { ProductPage } from "@/components/ProductPage";

export const Route = createFileRoute("/packages/starter")({
  head: () => ({
    meta: [
      { title: "Starter Package — Montarro" },
      { name: "description", content: "Foundational AI infrastructure to capture every lead and put the basics of modern growth in place." },
      { property: "og:title", content: "Starter Package — Montarro" },
      { property: "og:description", content: "Foundations to capture every lead. The entry point to Montarro's growth infrastructure." },
    ],
  }),
  component: () => (
    <ProductPage
      kind="package"
      eyebrow="Starter Package"
      title="Foundations"
      titleAccent="installed."
      tagline="The infrastructure layer every modern company needs before it scales — AI reception, CRM, lead capture, and reporting deployed in days, not quarters."
      icon={Sparkles}
      heroStats={[
        { value: "2 Wks", label: "Time to Live" },
        { value: "100%", label: "Leads Captured" },
        { value: "1", label: "Single Source of Truth" },
      ]}
      positioning="If you're growing but losing leads in cracks, this is the package. We install the foundation — so every dollar you spend on acquisition actually lands."
      includes={[
        { title: "AI Receptionist", desc: "Always-on voice agent that answers, qualifies and books every inbound call." },
        { title: "CRM Setup", desc: "Clean install of a modern CRM, fully configured for your sales motion." },
        { title: "Lead Capture System", desc: "Forms, routing, instant follow-up, and SMS confirmations wired in." },
        { title: "Monthly Reporting", desc: "Plain-English performance reports — bookings, sources, conversion." },
        { title: "Onboarding Sprint", desc: "Two weeks of focused deployment with a senior strategist." },
        { title: "Ongoing Support", desc: "Slack-based support and quarterly tune-ups." },
      ]}
      sections={[
        {
          eyebrow: "Who this is for",
          title: "Operators ready to stop losing leads.",
          body: "Service businesses, clinics, agencies, and local market leaders doing $20k+/month in revenue who don't yet have a real growth stack underneath them.",
        },
        {
          eyebrow: "The outcome",
          title: "Every lead, captured and tracked.",
          body: "After deployment, no inbound call goes unanswered, no form goes cold, and no booking gets lost in a spreadsheet. You finally see what's working.",
        },
      ]}
      forWho={[
        "Service businesses doing $20k–80k/month",
        "Local operators with high inbound call volume",
        "Companies still running on spreadsheets",
        "Founders without a CRM or with a broken one",
        "Teams losing leads after hours",
        "Anyone preparing to scale paid acquisition",
      ]}
      outcomes={[
        "Capture 100% of inbound leads — calls, forms, DMs.",
        "Replace ad-hoc tooling with a clean, owned stack.",
        "Get a single dashboard for what actually matters.",
        "Be ready to layer on paid acquisition with confidence.",
      ]}
      comparison={[
        { label: "Inbound coverage", before: "Office hours only", after: "24/7 AI front desk" },
        { label: "Lead tracking", before: "Spreadsheets / memory", after: "Single CRM source of truth" },
        { label: "Follow-up", before: "Hours to days", after: "Seconds, automated" },
        { label: "Reporting", before: "None or vibes-based", after: "Monthly executive report" },
      ]}
      ctaLabel="Discuss This Package"
      ctaSub="Get the foundation right. Then scale on top of it."
    />
  ),
});
