import { revenueLeakOffer } from "@/core";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";

const rand = new Intl.NumberFormat("en-ZA", {
  style: "currency",
  currency: "ZAR",
  maximumFractionDigits: 0,
});

export function RevenueLeakOffer() {
  return (
    <section
      id="revenue-leak-fix"
      className="border-y border-line bg-panel-2/60 px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHead
          kicker="Fixed-scope pilot"
          title={
            <>
              Your website is live. <span className="font-serif-accent text-accent-bright">Now make it earn its keep.</span>
            </>
          }
          lead={revenueLeakOffer.promise}
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
          <Reveal className="panel p-7 sm:p-9">
            <span className="kicker">Start with the evidence</span>
            <h3 className="mt-5 text-3xl text-bone">Leak Audit</h3>
            <p className="mt-3 font-display text-4xl text-accent-bright">
              {rand.format(revenueLeakOffer.auditPrice)}
            </p>
            <p className="mt-5 leading-relaxed text-bone-muted">{revenueLeakOffer.audit}</p>
            <p className="mt-6 border-l-2 border-brass pl-4 text-sm leading-relaxed text-bone-muted">
              Upgrade within seven days and the full audit fee is credited toward the Sprint.
            </p>
          </Reveal>

          <Reveal delay={100} className="border border-accent bg-accent-deep p-7 text-panel sm:p-9">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div>
                <span className="kicker !text-panel/65">Implementation-led</span>
                <h3 className="mt-5 text-3xl text-panel">{revenueLeakOffer.name}</h3>
              </div>
              <div className="sm:text-right">
                <p className="font-display text-4xl text-panel">
                  {rand.format(revenueLeakOffer.sprintPrice)}
                </p>
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.16em] text-panel/60">
                  once-off · {revenueLeakOffer.durationDays} working days
                </p>
              </div>
            </div>

            <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {revenueLeakOffer.deliverables.map((deliverable) => (
                <li key={deliverable} className="flex gap-3 text-sm leading-relaxed text-panel/82">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 bg-brass" />
                  {deliverable}
                </li>
              ))}
            </ul>

            <div className="mt-8 border-t border-panel/15 pt-7">
              <p className="text-sm leading-relaxed text-panel/75">{revenueLeakOffer.qualification}</p>
              <p className="mt-3 text-sm leading-relaxed text-panel/75">{revenueLeakOffer.guarantee}</p>
              <a
                href={revenueLeakOffer.cta.mailto}
                className="mt-7 inline-flex bg-panel px-6 py-3.5 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-accent-deep transition-transform hover:-translate-y-0.5"
              >
                {revenueLeakOffer.cta.label}
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={170} as="p" className="mt-6 text-sm leading-relaxed text-bone-faint">
          Not included: {revenueLeakOffer.exclusions.join(" · ")}. No percentage-uplift theatre; low-traffic sites need honest measurement, not statistical cosplay.
        </Reveal>
      </div>
    </section>
  );
}
