import { portfolio } from "@/core";

export function Work() {
  return (
    <section
      id="work"
      className="scroll-mt-20 border-t border-line px-5 py-20 sm:px-8 sm:py-28"
      aria-labelledby="work-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="section-kicker">Selected work</p>
            <h2
              id="work-heading"
              className="font-display mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl"
            >
              Proof in production products
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
              Commercial software already in the wild — marketplaces, compliance tools,
              hospitality platforms, and consumer products for real buyers.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {portfolio.map((item) => {
            const Card = (
              <article className="glass-panel group relative flex h-full flex-col overflow-hidden rounded-3xl p-6 sm:p-7">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-line bg-void/50 px-2.5 py-1 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-cyan">
                    {item.category}
                  </span>
                  {item.href ? (
                    <span className="ml-auto text-xs text-ink-faint transition group-hover:text-cyan">
                      Visit →
                    </span>
                  ) : null}
                </div>
                <h3 className="font-display mt-4 text-2xl font-semibold text-ink">
                  {item.name}
                </h3>
                <p className="mt-2 text-sm font-medium text-violet">
                  {item.highlight}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
                  {item.summary}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-line bg-panel-2/60 px-2 py-1 text-xs text-ink-faint"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            );

            if (item.href) {
              return (
                <a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-3xl focus-visible:outline-offset-4"
                >
                  {Card}
                </a>
              );
            }

            return <div key={item.id}>{Card}</div>;
          })}
        </div>
      </div>
    </section>
  );
}
