import { whatsappSalesDesk } from "@/core";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";

const rand = new Intl.NumberFormat("en-ZA", {
  style: "currency",
  currency: "ZAR",
  maximumFractionDigits: 0,
});

export function WhatsAppSalesDesk() {
  return (
    <section
      id="whatsapp-sales-desk"
      className="border-y border-line bg-panel-2/40 px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHead
          kicker="New service"
          title={
            <>
              Most businesses do not need more leads. <span className="font-serif-accent text-accent-bright">They need faster replies.</span>
            </>
          }
          lead={whatsappSalesDesk.promise}
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-[0.88fr_1.12fr]">
          <Reveal className="panel p-7 sm:p-9">
            <span className="kicker">Diagnostic first</span>
            <h3 className="mt-5 text-3xl text-bone">Inbox Audit</h3>
            <p className="mt-3 font-display text-4xl text-accent-bright">
              {rand.format(whatsappSalesDesk.diagnosticPrice)}
            </p>
            <p className="mt-5 leading-relaxed text-bone-muted">{whatsappSalesDesk.diagnostic}</p>
            <p className="mt-6 border-l-2 border-brass pl-4 text-sm leading-relaxed text-bone-muted">
              If the audit does not point to at least three fixable problems, the fee goes back.
            </p>
          </Reveal>

          <Reveal delay={100} className="border border-accent bg-accent-deep p-7 text-panel sm:p-9">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div>
                <span className="kicker !text-panel/65">Done-for-you setup</span>
                <h3 className="mt-5 text-3xl text-panel">{whatsappSalesDesk.name}</h3>
              </div>
              <div className="sm:text-right">
                <p className="font-display text-4xl text-panel">
                  {rand.format(whatsappSalesDesk.sprintPrice)}
                </p>
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.16em] text-panel/60">
                  once-off · {whatsappSalesDesk.durationDays} working days
                </p>
              </div>
            </div>

            <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {whatsappSalesDesk.deliverables.map((deliverable) => (
                <li key={deliverable} className="flex gap-3 text-sm leading-relaxed text-panel/82">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 bg-brass" />
                  {deliverable}
                </li>
              ))}
            </ul>

            <div className="mt-8 border-t border-panel/15 pt-7">
              <p className="text-sm leading-relaxed text-panel/75">{whatsappSalesDesk.qualification}</p>
              <p className="mt-3 text-sm leading-relaxed text-panel/75">{whatsappSalesDesk.guarantee}</p>
              <a
                href={whatsappSalesDesk.cta.mailto}
                className="mt-7 inline-flex bg-panel px-6 py-3.5 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-accent-deep transition-transform hover:-translate-y-0.5"
              >
                {whatsappSalesDesk.cta.label}
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={170} as="p" className="mt-6 text-sm leading-relaxed text-bone-faint">
          Not included: {whatsappSalesDesk.exclusions.join(" · ")}. This is a reply-flow cleanup, not a CRM migration dressed up with nicer fonts.
        </Reveal>
      </div>
    </section>
  );
}
