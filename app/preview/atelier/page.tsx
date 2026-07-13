import {
  company,
  navigation,
  portfolio,
  primaryCta,
  processSteps,
  secondaryCta,
  services,
} from "@/core";
import "./atelier.css";

export default function AtelierPreviewPage() {
  return (
    <div className="theme-atelier">
      <header className="a-nav">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <a href="/preview/atelier" className="a-display text-lg font-semibold">
            {company.brandName}
          </a>
          <nav className="hidden gap-7 text-sm text-[var(--a-ink-soft)] md:flex">
            {navigation.map((item) => (
              <a key={item.id} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <a href={primaryCta.href} className="a-btn text-sm">
            {primaryCta.label}
          </a>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-6xl px-5 pb-20 pt-16 sm:px-8 sm:pt-24">
          <p className="a-kicker">Commercial software studio · {company.location}</p>
          <div className="a-rule mt-5" />
          <h1 className="a-display mt-6 max-w-3xl text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl">
            {company.heroHeadline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--a-ink-soft)]">
            {company.heroSubhead}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href={primaryCta.href} className="a-btn">
              {primaryCta.label}
            </a>
            <a href={secondaryCta.href} className="a-btn-ghost">
              {secondaryCta.label}
            </a>
          </div>
          <p className="mt-8 max-w-xl text-sm leading-relaxed text-[var(--a-ink-soft)]">
            {company.positioning}
          </p>
          <p className="mt-6 text-xs text-[var(--a-ink-soft)]">
            Preview option B ·{" "}
            <a href="/preview" className="underline">
              Compare all
            </a>
          </p>
        </section>

        <section id="services" className="border-t border-[var(--a-line)] px-5 py-20 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <p className="a-kicker">Services</p>
            <h2 className="a-display mt-3 text-3xl font-bold sm:text-4xl">
              Capabilities for companies that buy outcomes
            </h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s) => (
                <article key={s.id} className="a-card">
                  <h3 className="a-display text-xl font-semibold">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--a-ink-soft)]">
                    {s.summary}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className="border-t border-[var(--a-line)] bg-[var(--a-paper-2)] px-5 py-20 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <p className="a-kicker">Selected work</p>
            <h2 className="a-display mt-3 text-3xl font-bold sm:text-4xl">
              Proof in production products
            </h2>
            <div className="mt-10 grid gap-4 lg:grid-cols-2">
              {portfolio.map((item) => (
                <article key={item.id} className="a-card">
                  <p className="a-kicker">{item.category}</p>
                  <h3 className="a-display mt-3 text-2xl font-semibold">{item.name}</h3>
                  <p className="mt-2 text-sm font-medium text-[var(--a-forest)]">
                    {item.highlight}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--a-ink-soft)]">
                    {item.summary}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="border-t border-[var(--a-line)] px-5 py-20 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <p className="a-kicker">How we work</p>
            <h2 className="a-display mt-3 text-3xl font-bold sm:text-4xl">
              A delivery path built for clarity
            </h2>
            <ol className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {processSteps.map((step, i) => (
                <li key={step.id} className="a-card">
                  <span className="a-display text-3xl font-bold text-[var(--a-gold)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="a-display mt-2 text-xl font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--a-ink-soft)]">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="contact" className="border-t border-[var(--a-line)] px-5 py-20 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="a-card bg-[var(--a-ink)] !text-[var(--a-paper)]">
              <p className="a-kicker !text-[var(--a-gold)]">Contact</p>
              <h2 className="a-display mt-3 text-3xl font-bold !text-[var(--a-paper)] sm:text-4xl">
                Ready to put your best product forward?
              </h2>
              <p className="mt-4 max-w-xl text-[var(--a-paper-2)] opacity-90">
                Tell us what you are building. We respond with a clear next step.
              </p>
              <a
                href={primaryCta.mailto}
                className="a-btn mt-8 !bg-[var(--a-gold)] !text-[var(--a-ink)]"
              >
                Email {company.email}
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--a-line)] px-5 py-10 text-sm text-[var(--a-ink-soft)] sm:px-8">
        <div className="mx-auto max-w-6xl">
          © {new Date().getFullYear()} {company.legalName}. Preview option B — Atelier Light.
        </div>
      </footer>
    </div>
  );
}
