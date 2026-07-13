import {
  company,
  navigation,
  portfolio,
  primaryCta,
  processSteps,
  secondaryCta,
  services,
} from "@/core";
import "./signal.css";

export default function SignalPreviewPage() {
  return (
    <div className="theme-signal">
      <header className="s-nav">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:px-8">
          <a href="/preview/signal" className="s-display text-sm font-bold tracking-wide">
            {company.brandName}
          </a>
          <nav className="hidden gap-6 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-[var(--s-muted)] md:flex">
            {navigation.map((item) => (
              <a key={item.id} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <a href={primaryCta.href} className="s-btn">
            {primaryCta.label}
          </a>
        </div>
      </header>

      <main>
        <section className="s-stripe border-b border-[var(--s-line)] px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="inline-block border border-[var(--s-lime)] px-3 py-1">
              <span className="s-kicker">// commercial software · {company.location}</span>
            </div>
            <h1 className="s-display mt-8 max-w-4xl text-4xl font-extrabold leading-[0.95] sm:text-5xl lg:text-6xl">
              {company.heroHeadline}
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-[var(--s-muted)] sm:text-lg normal-case tracking-normal">
              {company.heroSubhead}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href={primaryCta.href} className="s-btn">
                {primaryCta.label}
              </a>
              <a href={secondaryCta.href} className="s-btn-ghost">
                {secondaryCta.label}
              </a>
            </div>
            <p className="mt-8 max-w-xl text-sm text-[var(--s-faint)] normal-case tracking-normal">
              {company.positioning}
            </p>
            <p className="mt-6 font-mono text-xs text-[var(--s-faint)]">
              PREVIEW OPTION C ·{" "}
              <a href="/preview" className="text-[var(--s-lime)]">
                COMPARE ALL
              </a>
            </p>
          </div>
        </section>

        <section id="services" className="border-b border-[var(--s-line)] px-5 py-16 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <p className="s-kicker">01 — Services</p>
            <h2 className="s-display mt-3 text-3xl font-bold sm:text-4xl">
              Capabilities. No fluff.
            </h2>
            <div className="mt-10 grid gap-0 border border-[var(--s-line)] sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s, i) => (
                <article
                  key={s.id}
                  className="s-card border-0 border-b border-r border-[var(--s-line)]"
                >
                  <span className="font-mono text-xs text-[var(--s-lime)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="s-display mt-3 text-lg font-bold normal-case tracking-tight">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--s-muted)] normal-case tracking-normal">
                    {s.summary}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className="border-b border-[var(--s-line)] px-5 py-16 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <p className="s-kicker">02 — Work</p>
            <h2 className="s-display mt-3 text-3xl font-bold sm:text-4xl">
              Shipped. Not slideware.
            </h2>
            <div className="mt-10 grid gap-3 lg:grid-cols-2">
              {portfolio.map((item) => (
                <article key={item.id} className="s-card">
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-[var(--s-lime)]">
                    {item.category}
                  </p>
                  <h3 className="s-display mt-3 text-2xl font-bold normal-case tracking-tight">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--s-lime)] normal-case tracking-normal">
                    {item.highlight}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--s-muted)] normal-case tracking-normal">
                    {item.summary}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="border-b border-[var(--s-line)] px-5 py-16 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <p className="s-kicker">03 — Process</p>
            <h2 className="s-display mt-3 text-3xl font-bold sm:text-4xl">Clear path. Weekly software.</h2>
            <ol className="mt-10 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {processSteps.map((step, i) => (
                <li key={step.id} className="s-card">
                  <span className="font-mono text-2xl text-[var(--s-lime)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="s-display mt-2 text-lg font-bold normal-case tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--s-muted)] normal-case tracking-normal">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="contact" className="px-5 py-16 sm:px-8">
          <div className="mx-auto max-w-6xl border border-[var(--s-lime)] bg-[var(--s-panel)] p-8 sm:p-12">
            <p className="s-kicker">04 — Contact</p>
            <h2 className="s-display mt-3 text-3xl font-bold sm:text-4xl">
              Ship with us.
            </h2>
            <p className="mt-4 max-w-xl text-[var(--s-muted)] normal-case tracking-normal">
              {company.email} · no deck, just next steps.
            </p>
            <a href={primaryCta.mailto} className="s-btn mt-8 inline-flex">
              Email {company.email}
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--s-line)] px-5 py-8 font-mono text-xs text-[var(--s-faint)] sm:px-8">
        <div className="mx-auto max-w-6xl">
          © {new Date().getFullYear()} {company.legalName} · PREVIEW OPTION C — SIGNAL MONO
        </div>
      </footer>
    </div>
  );
}
