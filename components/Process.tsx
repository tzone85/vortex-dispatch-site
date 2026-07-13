import { processSteps } from "@/core";

export function Process() {
  return (
    <section
      id="process"
      className="scroll-mt-20 border-t border-line px-5 py-20 sm:px-8 sm:py-28"
      aria-labelledby="process-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="section-kicker">How we work</p>
          <h2
            id="process-heading"
            className="font-display mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl"
          >
            A delivery path built for clarity
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
            Predictable collaboration, solid engineering practices, and continuous
            visibility — so stakeholders always know what is shipping next.
          </p>
        </div>

        <ol className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {processSteps.map((step, index) => (
            <li
              key={step.id}
              className="glass-panel relative rounded-3xl p-6"
            >
              <span className="font-display text-4xl font-bold text-cyan/25">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display mt-3 text-xl font-semibold text-ink">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                {step.description}
              </p>
              {index < processSteps.length - 1 ? (
                <div className="accent-rule absolute bottom-0 left-6 right-6 md:hidden" />
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
