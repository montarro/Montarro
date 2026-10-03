import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, type LegalSection } from "@/components/LegalPage";

const DESCRIPTION = "The terms that apply when you use montarro.com or engage Montarro for paid ads, web development, systems and automation, or social media.";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Montarro" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Terms of Service — Montarro" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "https://montarro.com/terms" },
      { name: "twitter:title", content: "Terms of Service — Montarro" },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "https://montarro.com/terms" }],
  }),
  component: TermsPage,
});

// Draft wording. Review with an adviser before publishing.
const SECTIONS: LegalSection[] = [
  {
    id: "about-these-terms",
    h: "About these terms",
    body: [
      "These terms apply to your use of montarro.com and to services provided by Montarro (“we”, “us”, “our”). By using the site or engaging us, you agree to them.",
      "Each engagement is also governed by a written proposal or agreement. If the two conflict, the written agreement for that engagement applies.",
    ],
  },
  {
    id: "our-services",
    h: "Our services",
    body: [
      "Montarro provides:",
      [
        "Paid Ads: Google and Meta campaigns, including strategy, setup, management, tracking and reporting.",
        "Web Development: websites and landing pages, including design, build, enquiry forms and agreed connections.",
        "Systems & Automation: lead records, team alerts, lead assignment, follow-up tasks, agreed automated messages and pipeline visibility.",
        "Social Media: content or account support as agreed in writing.",
      ],
      "The scope, deliverables, timing, responsibilities and fees for any engagement are set out in a written proposal or agreement provided after a strategy call. Nothing on the site is an offer to provide a particular result or service until it is confirmed in writing.",
    ],
  },
  {
    id: "fees-and-third-party-costs",
    h: "Proposals, fees and third-party costs",
    body: [
      "Our fees are set out in your proposal or agreement, together with payment terms.",
      "Third-party costs are separate from our fees unless your agreement states otherwise. These include advertising spend paid to platforms such as Google and Meta, software subscriptions, messaging usage, domains and hosting. Those platforms' own terms apply to your accounts with them.",
    ],
  },
  {
    id: "your-responsibilities",
    h: "Your responsibilities",
    body: [
      "To deliver the services, we rely on you to:",
      [
        "provide accurate information and timely access to the accounts, websites and systems we need;",
        "keep staffing, routing and contact details current where our systems depend on them;",
        "handle sales conversations and customer contact with your own team, unless a service for that is agreed separately;",
        "make sure messages sent through systems we build for you comply with the laws that apply to your business, including spam and privacy laws.",
      ],
    ],
  },
  {
    id: "results",
    h: "Results",
    body: [
      "We agree what success means for each engagement and report on the relevant activity and outcomes. We do not guarantee lead volume, rankings, appointments, sales or revenue. Outcomes depend on factors including your offer, market, budget, competition and your team's follow-up.",
      "Demonstrations, example journeys and figures shown on the site use sample data to illustrate how a service works. They are not results achieved for a client.",
    ],
  },
  {
    id: "intellectual-property",
    h: "Intellectual property and ownership",
    body: [
      "The content of this site, including text, design, graphics, demonstrations and branding, is owned by or licensed to Montarro and may not be copied or reused without permission.",
      "Ownership and licensing of work we deliver, such as websites, creative, campaign assets and workflows, and of any third-party accounts or subscriptions used in an engagement, are set out in your agreement.",
    ],
  },
  {
    id: "use-of-the-site",
    h: "Use of the site",
    body: [
      "You agree to use the site lawfully and not to misuse, disrupt or attempt to gain unauthorised access to it, or to submit false or misleading information through it. Information on the site is general and may change without notice.",
    ],
  },
  {
    id: "third-parties",
    h: "Third-party sites and tools",
    body: [
      "The site may link to or rely on third-party sites and tools. We are not responsible for their content, availability or practices, and their own terms and privacy policies apply.",
    ],
  },
  {
    id: "liability",
    h: "Disclaimers and liability",
    body: [
      "The site and its content are provided as is. To the extent permitted by law, we are not liable for any indirect, incidental or consequential loss arising from your use of the site or our services.",
      "Nothing in these terms excludes, restricts or modifies any consumer guarantee or other right under the Australian Consumer Law that cannot lawfully be excluded.",
    ],
  },
  {
    id: "changes",
    h: "Changes to these terms",
    body: [
      "We may update these terms from time to time. The date at the top shows the current version. Continued use of the site after a change means you accept the updated terms. Changes do not affect an engagement already agreed in writing unless both parties agree.",
    ],
  },
  {
    id: "governing-law",
    h: "Governing law",
    body: ["These terms are governed by the laws of Victoria, Australia, and you submit to the courts of that state."],
  },
  {
    id: "contact",
    h: "Contact",
    body: ["Questions about these terms can be sent to team@montarro.com or by calling 0450 731 109."],
  },
];

function TermsPage() {
  return (
    <LegalPage
      titleLines={["Terms of", "service."]}
      intro="The terms that apply when you use montarro.com or engage Montarro for paid ads, web development, systems and automation, or social media."
      updated="3 October 2026"
      sections={SECTIONS}
    />
  );
}
