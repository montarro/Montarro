import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Boxes, Handshake, TrendingUp } from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";
import { primaryCta } from "@/lib/cta";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Montarro — Revenue Infrastructure" },
      {
        name: "description",
        content:
          "Montarro builds AI revenue infrastructure for Australian service businesses — connected systems that compound, not campaigns that disappear.",
      },
      { property: "og:title", content: "About Montarro — Revenue Infrastructure" },
      {
        property: "og:description",
        content:
          "Why Montarro exists: revenue infrastructure instead of traditional marketing, built to grow with you for the long term.",
      },
    ],
  }),
  component: AboutPage,
});

const MINT_GRID =
  "linear-gradient(to right, rgba(6,78,59,0.09) 1px, transparent 1px), linear-gradient(to bottom, rgba(6,78,59,0.09) 1px, transparent 1px)";

const PRINCIPLES: { icon: typeof Boxes; title: string; lead: string; body: string }[] = [
  {
    icon: Boxes,
    title: "Infrastructure, not marketing.",
    lead: "Agencies sell you campaigns and hand you leads.",
    body: "We build the connected system underneath your growth — AI reception, CRM, routing, follow-up and reporting working as one. The result isn't a service you rent; it's infrastructure your business owns and runs on.",
  },
  {
    icon: TrendingUp,
    title: "Systems that compound.",
    lead: "Campaigns disappear the moment you stop paying for them.",
    body: "A system gets better every week it runs — more enquiries captured, faster follow-up, cleaner data, tighter automation. We build for compounding returns, so the value you create this month carries into every month after it.",
  },
  {
    icon: Handshake,
    title: "A long-term partner.",
    lead: "Most agencies deliver a project, then move on.",
    body: "We stay. We implement the infrastructure, manage it, and keep optimising it as your business grows — operating it alongside your team rather than handing over a login and walking away.",
  },
];

function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <SiteNav />
      <main>
        {/* HERO — mint canvas, who we are */}
        <section className="relative isolate overflow-hidden bg-[#E9F7EE] pt-36 pb-24 lg:pt-44 lg:pb-32">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_100%)]"
            style={{ backgroundImage: MINT_GRID, backgroundSize: "18px 18px" }}
          />
          <div className="relative mx-auto max-w-5xl px-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-700/80">
              About Montarro
            </p>
            <h1 className="mt-6 font-headline text-[clamp(2.75rem,7vw,6rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.02em] text-[#0a0b0b]">
              <span className="block">We build revenue</span>
              <span className="block">infrastructure.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-[17px] md:text-lg font-medium leading-relaxed text-foreground">
              Montarro is an AI revenue infrastructure company for Australian
              service businesses. We design, build and run the systems that
              capture every enquiry, qualify every lead and turn missed calls into
              booked revenue — so growth stops depending on who happens to answer
              the phone.
            </p>
          </div>
        </section>

        {/* WHY WE EXIST — white editorial */}
        <section className="bg-white py-24 lg:py-32">
          <div className="mx-auto max-w-5xl px-6">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 lg:items-start">
              <div className="lg:col-span-5">
                <div className="mb-6 flex items-center gap-3">
                  <span className="h-px w-10 bg-emerald-500/70" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-600">
                    Why we exist
                  </span>
                </div>
                <h2 className="font-display text-4xl md:text-5xl font-bold leading-[1.02] tracking-[-0.03em] text-[#0a0b0b]">
                  Good businesses lose revenue to bad systems.
                </h2>
              </div>
              <div className="space-y-6 text-[16px] md:text-[17px] font-medium leading-relaxed text-foreground lg:col-span-7">
                <p>
                  Most service businesses don't have a marketing problem. They
                  have a <span className="text-emerald-600">revenue infrastructure</span> problem.
                  Calls go unanswered, enquiries sit without follow-up, leads fall
                  between tools, and good marketing spend quietly leaks out the
                  bottom of a leaky funnel.
                </p>
                <p>
                  Montarro exists to close those gaps. We saw operators spending
                  more to generate enquiries while losing the ones they already
                  had — and decided the answer wasn't another campaign, but the
                  infrastructure to make sure no opportunity is ever dropped again.
                </p>
                <p>
                  We build one connected system that answers, qualifies, books and
                  follows up automatically — and we stay to run it with you.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PHILOSOPHY — three principles */}
        <section className="border-t border-black/[0.06] bg-[#fafaf9] py-24 lg:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-2xl">
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-10 bg-emerald-500/70" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-600">
                  How we think
                </span>
              </div>
              <h2 className="font-headline text-4xl md:text-6xl font-extrabold uppercase leading-[0.92] tracking-[-0.02em] text-[#0a0b0b]">
                This isn&rsquo;t an agency.
              </h2>
              <p className="mt-6 text-[16px] md:text-[17px] font-medium leading-relaxed text-foreground">
                It&rsquo;s a different model entirely — built on three principles
                that shape everything we do.
              </p>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {PRINCIPLES.map((p) => (
                <div
                  key={p.title}
                  className="flex flex-col rounded-2xl border border-black/[0.07] bg-white p-7 shadow-[0_24px_60px_-44px_rgba(0,0,0,0.22)]"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-600/20 bg-emerald-500/[0.08] text-emerald-600">
                    <p.icon className="h-5 w-5" strokeWidth={1.9} />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-foreground">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-[14.5px] font-medium leading-relaxed text-foreground">
                    <span className="font-semibold text-foreground">{p.lead}</span>{" "}
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MISSION — statement band */}
        <section className="bg-white py-24 lg:py-28">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-600">
              Our mission
            </p>
            <p className="mx-auto mt-7 max-w-3xl font-display text-[clamp(1.6rem,3.4vw,2.6rem)] font-semibold leading-[1.18] tracking-[-0.02em] text-[#0a0b0b]">
              To build systems that{" "}
              <span className="text-emerald-600">compound</span> — not campaigns
              that disappear. Infrastructure you own, that grows more valuable
              every month it runs.
            </p>
          </div>
        </section>

        {/* FINAL CTA — charcoal */}
        <section className="bg-background px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
          <div className="relative isolate overflow-hidden rounded-[28px] bg-[#111315] px-6 py-20 lg:py-28">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{ background: "radial-gradient(ellipse 50% 50% at 50% 60%, rgba(16,185,129,0.08), transparent 72%)" }}
            />
            <div className="relative mx-auto max-w-2xl text-center">
              <h2 className="font-headline text-[clamp(2.25rem,5.5vw,4.25rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.02em] text-white">
                Let&rsquo;s build yours.
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-[16px] md:text-[17px] font-medium leading-relaxed text-white/85">
                Book a strategy call and we&rsquo;ll map the revenue infrastructure
                built to help your business grow — no pressure, no generic sales
                pitch.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link to="/contact" className={`${primaryCta} inline-flex px-7 py-4 text-[15px]`}>
                  Book a Strategy Call
                  <ArrowUpRight className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link
                  to="/demo"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-7 py-4 text-[15px] font-semibold text-white/85 transition-all duration-300 hover:border-white/35 hover:text-white"
                >
                  Explore the System
                  <ArrowRight className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
