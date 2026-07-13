import { company, primaryCta } from "@/core";

export function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-20 border-t border-line px-5 py-20 sm:px-8 sm:py-28"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="glass-panel relative overflow-hidden rounded-[2rem] px-6 py-12 sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-cyan/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-violet/15 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="section-kicker">Contact</p>
              <h2
                id="contact-heading"
                className="font-display mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl"
              >
                Ready to put your best product forward?
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
                Tell us what you are building, what is broken, or what needs to ship
                before a deadline. We respond with a clear next step — not a generic
                sales deck.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={primaryCta.mailto} className="btn-primary">
                  Email {company.email}
                </a>
                <a href={`mailto:${company.email}`} className="btn-secondary">
                  {primaryCta.label}
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-line bg-void/50 p-6">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-ink-faint">
                Engagement fit
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-ink-muted">
                <li className="flex gap-2">
                  <span className="text-cyan">▹</span>
                  New product builds with a defined buyer and outcome
                </li>
                <li className="flex gap-2">
                  <span className="text-cyan">▹</span>
                  Platforms needing payments, ops, and production polish
                </li>
                <li className="flex gap-2">
                  <span className="text-cyan">▹</span>
                  Teams that value architecture, tests, and honest timelines
                </li>
              </ul>
              <div className="mt-6 border-t border-line pt-5">
                <p className="text-sm text-ink-faint">Primary contact</p>
                <a
                  href={`mailto:${company.email}`}
                  className="mt-1 block font-display text-lg font-semibold text-ink hover:text-cyan"
                >
                  {company.email}
                </a>
                <p className="mt-2 text-sm text-ink-faint">{company.location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
