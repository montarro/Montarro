import { createFileRoute } from "@tanstack/react-router";
import { Megaphone } from "lucide-react";
import { ProductPage } from "@/components/ProductPage";

export const Route = createFileRoute("/services/paid-advertising")({
  head: () => ({
    meta: [
      { title: "Paid Advertising — Montarro" },
      { name: "description", content: "Performance-engineered paid media on Meta, Google, TikTok and YouTube — built to compound, not just spend." },
      { property: "og:title", content: "Paid Advertising — Montarro" },
      { property: "og:description", content: "Performance driven by data. Modern paid acquisition for serious operators." },
    ],
  }),
  component: () => (
    <ProductPage
      kind="service"
      eyebrow="Demand Acquisition"
      title="Performance"
      titleAccent="driven by data."
      tagline="A full-stack paid acquisition engine — creative, media buying, tracking, and optimisation — engineered to compound qualified pipeline month over month."
      icon={Megaphone}
      heroStats={[
        { value: "4–8×", label: "Average ROAS" },
        { value: "−38%", label: "Cost / Lead" },
        { value: "Daily", label: "Optimisation" },
      ]}
      positioning="Paid media is no longer a channel — it's an operating system for growth. We run it as one: creative testing, attribution, and offer optimisation in a single feedback loop."
      sections={[
        {
          eyebrow: "What we run",
          title: "Every modern channel, one engine.",
          body: "Meta, Google, TikTok, YouTube, LinkedIn. One strategy, one creative pipeline, one data layer — instead of three disconnected agencies underperforming in silos.",
          bullets: [
            "Full-funnel campaigns across Meta + Google",
            "Direct-response creative testing weekly",
            "Server-side tracking + attribution rebuild",
            "Landing pages + offer engineering",
          ],
          metric: "ROAS 6.4× · live optimisation",
        },
        {
          eyebrow: "How we scale you",
          title: "More spend, lower CAC.",
          body: "Every account we run is treated like a portfolio. We find winning creative, scale it intelligently, then engineer the next winner before fatigue hits.",
          bullets: [
            "Weekly performance reviews",
            "Creative iteration loop with our studio",
            "Audience + offer testing matrix",
            "Transparent reporting — no smoke",
          ],
          metric: "CPL −38% · spend scaling",
        },
        {
          eyebrow: "The problem we solve",
          title: "Most ad accounts leak money in plain sight.",
          body: "Broken tracking, recycled creative, no offer testing. We audit, rebuild, and run accounts as if every dollar were our own.",
        },
        {
          eyebrow: "Why it matters",
          title: "Acquisition is the moat.",
          body: "Companies that crack paid acquisition can grow on demand. We give you that lever — and the team to pull it.",
        },
      ]}
      forWho={[
        { label: "Brands spending $5k–250k/month on paid", reveal: "Budget at scale magnifies every tracking gap and creative miss." },
        { label: "Operators scaling past plateaued agencies", reveal: "Generalist vendors cap out; performance flattens and CAC creeps." },
        { label: "DTC, info, services & lead-gen businesses", reveal: "High-intent traffic with no margin for leaked attribution." },
        { label: "Founders consolidating creative + media buying", reveal: "Disconnected vendors mean no single feedback loop." },
        { label: "Anyone bleeding budget on broken attribution", reveal: "You can't optimise what you can't measure server-side." },
        { label: "Companies whose growth is capped by CAC", reveal: "Unit economics break before spend can scale." },
      ]}
      outcomes={[
        "Lift ROAS by 2–4× within the first 90 days.",
        "Cut CPL by 30–60% with re-engineered offers.",
        "Scale spend predictably without breaking unit economics.",
        "Own a tested creative library that compounds.",
      ]}
      ctaLabel="Build Your System"
      ctaSub="Stop renting your acquisition. Start owning it."
    />
  ),
});
