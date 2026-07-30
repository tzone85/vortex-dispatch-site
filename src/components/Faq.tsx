import { faq } from "@/core";
import { SectionHead } from "./SectionHead";
import { Reveal } from "./Reveal";

/**
 * Straight answers, one per question a buyer (or an answer engine) actually
 * asks. Native <details> keeps it accessible with zero JS; the copy itself
 * lives in core/faq.ts and also ships as FAQPage JSON-LD in the static head.
 */
export function Faq() {
  return (
    <section id="faq" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <SectionHead
          kicker="Straight answers"
          title={
            <>
              The questions we get,{" "}
              <span className="font-serif-accent text-accent-bright">
                answered without the pitch.
              </span>
            </>
          }
        />

        <div className="mt-14 overflow-hidden rounded-2xl border border-line">
          {faq.map((f, i) => (
            <Reveal key={f.id} delay={i * 40}>
              <details className="group border-b border-line bg-void last:border-b-0">
                <summary className="flex cursor-pointer items-baseline gap-5 px-6 py-5 transition-colors hover:bg-void-2/60 sm:px-8">
                  <span className="font-mono text-sm text-accent/70">
                    0{i + 1}
                  </span>
                  <span className="flex-1 font-display text-lg font-bold text-bone sm:text-xl">
                    {f.question}
                  </span>
                  <span
                    className="font-mono text-sm text-bone-faint transition-transform group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p className="px-6 pb-6 pl-[3.6rem] text-[0.95rem] leading-relaxed text-bone-muted sm:px-8 sm:pl-[4.1rem]">
                  {f.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
