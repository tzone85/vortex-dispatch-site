import { company, primaryCta, secondaryCta } from "@/core";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden px-5 pb-24 pt-16 sm:px-8 sm:pt-24"
      aria-labelledby="hero-heading"
    >
      <div className="pointer-events-none absolute inset-0 grid-fade opacity-70" />
      <div className="relative mx-auto max-w-6xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-line bg-panel/60 px-3 py-1.5">
          <span className="relative flex h-2 w-2">
            <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-cyan opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
          </span>
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-muted">
            Commercial software studio · {company.location}
          </span>
        </div>

        <div className="mt-8 grid items-end gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h1
              id="hero-heading"
              className="font-display max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl"
            >
              {company.heroHeadline}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted sm:text-xl">
              {company.heroSubhead}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href={primaryCta.href} className="btn-primary">
                {primaryCta.label}
              </a>
              <a href={secondaryCta.href} className="btn-secondary">
                {secondaryCta.label}
              </a>
            </div>
            <p className="mt-8 max-w-xl text-sm leading-relaxed text-ink-faint">
              {company.positioning}
            </p>
          </div>

          <aside
            className="glass-panel float-soft relative overflow-hidden rounded-3xl p-6 sm:p-7"
            aria-label="Delivery highlights"
          >
            <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-cyan/10 blur-3xl" />
            <div className="absolute -bottom-12 -left-8 h-36 w-36 rounded-full bg-violet/15 blur-3xl" />
            <p className="section-kicker">What clients get</p>
            <ul className="relative mt-5 space-y-4">
              {[
                {
                  label: "Product-grade delivery",
                  detail: "Ship production software, not prototypes left on a hard drive.",
                },
                {
                  label: "Tested foundations",
                  detail: "TDD on domain logic, clear architecture, and reviewable changes.",
                },
                {
                  label: "Business-ready polish",
                  detail: "Payments, SEO, ops, and UX that stand up to real customers.",
                },
              ].map((item) => (
                <li
                  key={item.label}
                  className="rounded-2xl border border-line/80 bg-void/40 px-4 py-3"
                >
                  <p className="font-display text-base font-semibold text-ink">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                    {item.detail}
                  </p>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
