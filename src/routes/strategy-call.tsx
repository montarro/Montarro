import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "./contact";

// Package CTAs (e.g. the AI Receptionist package) route here instead of the
// hidden /services/ai-receptionists page. Renders the same, already-approved
// strategy-call form as /contact — see contact.tsx for the implementation;
// this file only registers the additional route.
export const Route = createFileRoute("/strategy-call")({
  head: () => ({
    meta: [
      { title: "Book a Strategy Call — Montarro" },
      {
        name: "description",
        content:
          "Book a strategy call with Montarro. Tell us where your business is at and we'll show you the clearest revenue-infrastructure path forward.",
      },
      { property: "og:title", content: "Book a Strategy Call — Montarro" },
      {
        property: "og:description",
        content:
          "A tailored strategy session for service businesses ready to stop missing leads and run one connected system.",
      },
    ],
  }),
  component: ContactPage,
});
