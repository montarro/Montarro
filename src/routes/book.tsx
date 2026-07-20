import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { CalendarClock, Clock3, PhoneCall, Target } from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";
import { readAndClearBookingPrefill, type BookingPrefill } from "@/lib/bookingPrefill";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Pick Your Time — Montarro" },
      {
        name: "description",
        content: "Pick a time for your Montarro strategy call.",
      },
    ],
  }),
  component: BookPage,
});

const MINT_GRID =
  "linear-gradient(to right, rgba(6,78,59,0.09) 1px, transparent 1px), linear-gradient(to bottom, rgba(6,78,59,0.09) 1px, transparent 1px)";

// GoHighLevel Strategy Call calendar share link — paste the exact link from
// GHL's calendar Share settings here verbatim. Do NOT construct this from a
// calendar ID. Until this is set, the page shows a graceful fallback instead
// of a broken/blank iframe.
const GHL_BOOKING_URL: string = "";

function buildEmbedSrc(prefill: BookingPrefill | null): string {
  if (!GHL_BOOKING_URL) return "";
  if (!prefill) return GHL_BOOKING_URL;
  const params = new URLSearchParams();
  if (prefill.firstName) params.set("first_name", prefill.firstName);
  if (prefill.lastName) params.set("last_name", prefill.lastName);
  if (prefill.email) params.set("email", prefill.email);
  if (prefill.phone) params.set("phone", prefill.phone);
  const query = params.toString();
  if (!query) return GHL_BOOKING_URL;
  return `${GHL_BOOKING_URL}${GHL_BOOKING_URL.includes("?") ? "&" : "?"}${query}`;
}

function BookPage() {
  const [prefill, setPrefill] = useState<BookingPrefill | null>(null);
  const [ready, setReady] = useState(false);

  // Client-only: read once on mount (avoids an SSR/CSR hydration mismatch,
  // same pattern used elsewhere in this app), then clear immediately so a
  // refresh or a later direct visit renders unprefilled rather than stale.
  useEffect(() => {
    setPrefill(readAndClearBookingPrefill());
    setReady(true);
  }, []);

  const firstName = prefill?.firstName;
  const embedSrc = buildEmbedSrc(prefill);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <SiteNav />
      <main>
        <section className="relative isolate overflow-hidden bg-[#E9F7EE] pt-36 pb-16 lg:pt-44 lg:pb-20">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)]"
            style={{ backgroundImage: MINT_GRID, backgroundSize: "18px 18px" }}
          />
          <div className="relative mx-auto max-w-2xl px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-700/80">
                You&rsquo;re In
              </p>
              <h1 className="mt-6 font-headline text-[clamp(2.25rem,4.6vw,3.75rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-[#0a0b0b]">
                {ready && firstName ? `${firstName}, pick a time.` : "Pick a time that suits."}
              </h1>
              <p className="mt-6 max-w-lg text-[16px] font-medium leading-relaxed text-foreground mx-auto">
                We&rsquo;ve got your details. Choose a time below and we&rsquo;ll walk
                you through exactly how Montarro would fit your business.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="bg-[#E9F7EE] pb-20 lg:pb-28">
          <div className="mx-auto max-w-2xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden rounded-3xl border border-[#D8F2E8] bg-white shadow-[0_30px_80px_-50px_rgba(0,0,0,0.22)]"
            >
              {embedSrc ? (
                <iframe
                  src={embedSrc}
                  style={{ width: "100%", border: "none", overflow: "hidden" }}
                  scrolling="no"
                  id="montarro-strategy-call-calendar"
                  title="Book your Montarro strategy call"
                />
              ) : (
                <div className="flex flex-col items-center px-8 py-14 text-center sm:px-12">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/[0.08]">
                    <CalendarClock className="h-6 w-6 text-emerald-600" strokeWidth={2.2} />
                  </div>
                  <h2 className="mt-6 font-display text-2xl font-bold leading-tight tracking-[-0.02em] text-[#0a0b0b]">
                    Our booking calendar is being finalised.
                  </h2>
                  <p className="mt-3 max-w-sm text-[15px] font-medium leading-relaxed text-foreground">
                    You&rsquo;re already in our system — our team will follow up
                    shortly to lock in your strategy call. Want to sort a time right
                    now instead?
                  </p>
                  <a
                    href="tel:0450731109"
                    className="mt-6 inline-flex items-center gap-2 font-semibold text-emerald-700 transition-colors duration-300 hover:text-emerald-600"
                  >
                    <PhoneCall className="h-4 w-4" />
                    Call 0450 731 109
                  </a>
                </div>
              )}
            </motion.div>

            {/* GHL's embed widget script — auto-resizes the iframe to its
                content height once the real booking URL above is set. */}
            {embedSrc && <script src="https://link.msgsndr.com/js/form_embed.js" type="text/javascript" />}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 grid gap-4 sm:grid-cols-3"
            >
              {[
                { icon: Clock3, title: "30 minutes", copy: "A focused session — no filler, no wasted time." },
                { icon: Target, title: "Tailored to you", copy: "We map your infrastructure, not a generic pitch." },
                { icon: CalendarClock, title: "No pressure", copy: "Leave with clarity, whether or not you proceed." },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-[#D8F2E8] bg-white p-5 text-center shadow-[0_2px_12px_-6px_rgba(0,0,0,0.08)]"
                >
                  <item.icon className="mx-auto h-5 w-5 text-emerald-600" strokeWidth={2.2} />
                  <p className="mt-3 text-[14px] font-bold text-foreground">{item.title}</p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{item.copy}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
