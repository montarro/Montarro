import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, type LegalSection } from "@/components/LegalPage";

const DESCRIPTION = "How Montarro collects, uses, shares and protects personal information when you visit our website or work with us.";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Montarro" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Privacy Policy — Montarro" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "https://montarro.com/privacy" },
      { name: "twitter:title", content: "Privacy Policy — Montarro" },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "https://montarro.com/privacy" }],
  }),
  component: PrivacyPage,
});

// Draft wording. Review with an adviser before publishing.
const SECTIONS: LegalSection[] = [
  {
    id: "who-we-are",
    h: "Who we are",
    body: [
      "Montarro (“we”, “us”, “our”) is a Melbourne-based business providing paid advertising, web development, systems and automation, and social media services to Australian businesses.",
      "This policy explains how we handle personal information when you visit montarro.com, contact us or work with us. We handle personal information in line with the Australian Privacy Principles under the Privacy Act 1988 (Cth).",
    ],
  },
  {
    id: "what-we-collect",
    h: "What we collect",
    body: [
      "We collect information in three ways.",
      [
        "Details you give us: your name, business name, email, phone number, the services you are interested in and anything you type into an enquiry form or tell us on a call.",
        "Details from working together: information about your business, customers and campaigns, access you grant to advertising accounts, websites or CRMs, and billing details.",
        "Technical data: your device, browser, pages visited and the source that brought you to the site, collected through cookies and similar technologies described below.",
      ],
      "You can browse the site without giving us personal information. If you choose not to provide details we ask for, we may not be able to respond to your enquiry or deliver a service.",
    ],
  },
  {
    id: "how-we-use-it",
    h: "How we use it",
    body: [
      "We use personal information to:",
      [
        "respond to your enquiry and arrange a strategy call;",
        "scope, deliver, support and bill the services you engage us for;",
        "send service communications about your enquiry or project;",
        "measure and improve the website and our own advertising;",
        "meet legal, accounting and record-keeping obligations.",
      ],
      "We do not sell personal information. We send marketing only where the law allows, and you can opt out at any time using the link in the message or by contacting us.",
    ],
  },
  {
    id: "who-we-share-with",
    h: "Who we share it with",
    body: [
      "We share personal information only with providers that help us operate, with professional advisers, and where the law requires it. Our main providers are:",
      [
        "GoHighLevel: our CRM, which stores enquiries and sends agreed email and SMS communications.",
        "Meta: advertising measurement through the Meta Pixel.",
        "Vercel: website hosting.",
        "Google: web fonts loaded when the site displays.",
      ],
      "When we build or run systems for a client, we handle that client's customer information on the client's behalf and under the client's instructions. The client's own privacy policy applies to that information.",
    ],
  },
  {
    id: "cookies-and-tracking",
    h: "Cookies and tracking",
    body: [
      "The site uses cookies and similar technologies to operate, to attribute enquiries to their source and to measure advertising.",
      [
        "Meta Pixel records page views and enquiry events so we can measure our Meta advertising and reach people who have visited the site. You can manage this in your Meta ad preferences.",
        "GoHighLevel tracking links an enquiry to the campaign or page that led to it.",
      ],
      "You can block or delete cookies in your browser settings. Some parts of the site may not work as intended without them.",
    ],
  },
  {
    id: "storage-and-security",
    h: "Storage and security",
    body: [
      "Personal information is stored with the providers listed above. Some of them store information outside Australia, including in the United States.",
      "We take reasonable steps to protect personal information from misuse, loss, unauthorised access and disclosure, including access controls and secure connections. No method of storage or transmission is completely secure.",
    ],
  },
  {
    id: "retention",
    h: "How long we keep it",
    body: [
      "We keep personal information for as long as it is needed for the purposes above, or for as long as the law requires. Enquiry details are kept while we consider working together and for a reasonable period afterwards. Project and billing records are kept for the period required for tax and accounting purposes.",
    ],
  },
  {
    id: "your-rights",
    h: "Your choices and rights",
    body: [
      "You can ask us to access, correct or delete the personal information we hold about you, and you can opt out of marketing at any time. Contact us using the details below and we will respond within a reasonable time.",
      "If you are not satisfied with how we handle a privacy concern, you can complain to the Office of the Australian Information Commissioner (OAIC).",
    ],
  },
  {
    id: "changes",
    h: "Changes to this policy",
    body: [
      "We may update this policy from time to time. The date at the top shows the current version, and the latest version always applies.",
    ],
  },
  {
    id: "contact",
    h: "Contact",
    body: ["Questions about this policy or your information can be sent to team@montarro.com or by calling 0450 731 109."],
  },
];

function PrivacyPage() {
  return (
    <LegalPage
      titleLines={["Privacy", "policy."]}
      intro="How we collect, use, share and protect personal information when you visit montarro.com, contact us or work with us."
      updated="3 October 2026"
      sections={SECTIONS}
    />
  );
}
