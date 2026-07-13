import { work } from "@/core";
import type { WorkDomain } from "@/core";
import { SectionHead } from "./SectionHead";
import { Reveal } from "./Reveal";

const DOMAIN_LABEL: Record<WorkDomain, string> = {
  marketplace: "Marketplace",
  booking: "Booking",
  compliance: "Compliance",
  fintech: "Fintech",
  consumer: "Consumer",
  "ai-delivery": "AI delivery",
};

/** Selected shipped work — one per domain, to show range. */
export function Work() {
  return (
    <section id="work" className="border-t border-line bg-void-2/40">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <SectionHead
          kicker="Selected work"
          title={
            <>
              Real products,{" "}
              <span className="font-serif-accent text-copper-bright">
                running today.
              </span>
            </>
          }
          lead="A slice of what we have built — booking, marketplace, compliance, fintech, consumer, and our own delivery engine."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {work.map((w, i) => {
            const Card = w.href ? "a" : "div";
            return (
              <Reveal key={w.id} delay={(i % 3) * 90}>
                <Card
                  {...(w.href
                    ? { href: w.href, target: "_blank", rel: "noreferrer" }
                    : {})}
                  className="group panel flex h-full flex-col rounded-2xl p-6 sm:p-7"
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-copper">
                      {DOMAIN_LABEL[w.domain]}
                    </span>
                    <span className="flex items-center gap-1.5 font-mono text-[0.68rem] text-bone-faint">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          w.status === "live" ? "bg-signal" : "bg-brass"
                        }`}
                      />
                      {w.status === "live" ? "Live" : "In build"}
                    </span>
                  </div>

                  <h3 className="mt-5 flex items-center gap-2 font-display text-xl font-bold text-bone">
                    {w.name}
                    {w.href && (
                      <span className="translate-y-px text-copper opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100">
                        ↗
                      </span>
                    )}
                  </h3>

                  <p className="mt-3 flex-1 text-[0.9rem] leading-relaxed text-bone-muted">
                    {w.summary}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
                    <div className="flex flex-wrap items-center gap-1.5 font-mono text-[0.66rem] text-bone-faint">
                      {w.stack.map((s, si) => (
                        <span key={s} className="flex items-center gap-1.5">
                          {si > 0 && (
                            <span className="text-line-strong">·</span>
                          )}
                          {s}
                        </span>
                      ))}
                    </div>
                    <span className="font-mono text-[0.66rem] text-bone-faint">
                      ’{String(w.year).slice(2)}
                    </span>
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
