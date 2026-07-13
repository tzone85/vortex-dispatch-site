import { services } from "@/core";

export function Services() {
  return (
    <section
      id="services"
      className="scroll-mt-20 border-t border-line px-5 py-20 sm:px-8 sm:py-28"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="section-kicker">Services</p>
          <h2
            id="services-heading"
            className="font-display mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl"
          >
            Capabilities built for companies that buy software outcomes
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
            From greenfield products to modernisation of what already pays the bills —
            we engineer systems your team can run, extend, and trust.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <article
              key={service.id}
              className="glass-panel group rounded-3xl p-6 transition duration-200"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-xs text-ink-faint">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="h-px flex-1 bg-gradient-to-r from-line to-transparent" />
              </div>
              <h3 className="font-display mt-4 text-xl font-semibold text-ink">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                {service.summary}
              </p>
              <ul className="mt-5 space-y-2">
                {service.outcomes.map((outcome) => (
                  <li
                    key={outcome}
                    className="flex gap-2 text-sm text-ink-muted"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
