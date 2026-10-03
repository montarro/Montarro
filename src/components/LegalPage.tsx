import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";

/** A paragraph, or a bullet list when given as an array. */
export type LegalBlock = string | string[];
export type LegalSection = { id: string; h: string; body: LegalBlock[] };

// the fine engineered grid that sits on the mint hero canvas
const MINT_GRID =
  "linear-gradient(to right, rgba(6,78,59,0.09) 1px, transparent 1px), linear-gradient(to bottom, rgba(6,78,59,0.09) 1px, transparent 1px)";

/*
 * Shared layout for the legal pages: the mint hero and grid from the homepage,
 * a sticky contents list on desktop, then plain readable sections.
 */
export function LegalPage({
  eyebrow = "Legal",
  titleLines,
  intro,
  updated,
  sections,
}: {
  eyebrow?: string;
  titleLines: [string, string];
  intro: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <SiteNav />
      <main>
        <section className="relative isolate overflow-hidden bg-[#E9F7EE] pb-14 pt-28 lg:pb-20 lg:pt-36">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)]"
            style={{ backgroundImage: MINT_GRID, backgroundSize: "18px 18px" }}
          />
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-emerald-600/60" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-700 sm:tracking-[0.3em]">{eyebrow}</span>
              </div>
              <h1 className="mt-6 font-headline text-[clamp(2.4rem,4vw,3.6rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.02em] text-[#0a0b0b]">
                <span className="block">{titleLines[0]}</span>
                <span className="block text-emerald-600">{titleLines[1]}</span>
              </h1>
              <p className="mt-6 max-w-2xl text-[16px] font-medium leading-relaxed text-foreground/80 md:text-[17px]">{intro}</p>
              <p className="mt-5 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-foreground/50">Last updated: {updated}</p>
            </div>
          </div>
        </section>

        <section className="bg-white py-14 lg:py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <aside className="min-w-0 lg:col-span-3">
                <nav aria-label="On this page" className="lg:sticky lg:top-28">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/40">On this page</p>
                  <ol className="mt-4 space-y-2.5">
                    {sections.map((s, i) => (
                      <li key={s.id}>
                        <a
                          href={`#${s.id}`}
                          className="flex gap-3 text-[13.5px] font-medium text-foreground/60 transition-colors hover:text-emerald-700"
                        >
                          <span className="w-5 shrink-0 tabular-nums text-foreground/35">{String(i + 1).padStart(2, "0")}</span>
                          <span>{s.h}</span>
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </aside>

              <div className="min-w-0 lg:col-span-8 lg:col-start-5">
                <div className="space-y-12">
                  {sections.map((s, i) => (
                    <section key={s.id} id={s.id} className="scroll-mt-28">
                      <h2 className="flex items-baseline gap-3 text-[22px] font-bold tracking-tight text-[#0a0b0b]">
                        <span className="text-[13px] font-semibold tabular-nums text-emerald-600">{String(i + 1).padStart(2, "0")}</span>
                        {s.h}
                      </h2>
                      <div className="mt-4 space-y-4">
                        {s.body.map((block, j) =>
                          Array.isArray(block) ? (
                            <ul key={j} className="space-y-2.5">
                              {block.map((item) => (
                                <li key={item} className="flex gap-3 text-[15.5px] leading-relaxed text-foreground/80">
                                  <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p key={j} className="text-[15.5px] leading-relaxed text-foreground/80">
                              {block}
                            </p>
                          ),
                        )}
                      </div>
                    </section>
                  ))}
                </div>

                <div className="mt-14 rounded-2xl bg-[#081510] p-6 text-white sm:p-8">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-300">Questions?</div>
                  <p className="mt-3 max-w-lg text-[15px] font-medium leading-relaxed text-white/75">
                    If anything here is unclear, or you want to ask about your information, get in touch and we&rsquo;ll help.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-[14.5px] font-semibold">
                    <a href="mailto:team@montarro.com" className="inline-flex items-center gap-2 text-emerald-300 hover:text-emerald-200">
                      <Mail className="h-4 w-4" /> team@montarro.com
                    </a>
                    <a href="tel:0450731109" className="inline-flex items-center gap-2 text-emerald-300 hover:text-emerald-200">
                      <Phone className="h-4 w-4" /> 0450 731 109
                    </a>
                    <Link to="/contact" className="inline-flex items-center gap-1.5 text-white/85 hover:text-white">
                      Book a Strategy Call <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
