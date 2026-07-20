import { company, primaryCta, secondaryCta } from "@/core";
import { VortexField } from "./interactive/VortexField";
import { Starfield } from "./interactive/Starfield";

/**
 * Opening statement. Left: positioning + CTAs, staggered in on load.
 * Right: the signature vortex over a faint starfield.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden px-5 pb-24 pt-32 sm:px-8 sm:pb-32 sm:pt-36"
    >
      <Starfield
        className="pointer-events-none absolute inset-0 h-full w-full opacity-80"
        count={170}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-void" />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="hero-stagger">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-panel/50 px-3.5 py-1.5 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-signal" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
            </span>
            <span className="mono-meta uppercase tracking-[0.2em] text-bone-muted">
              Taking on new projects
            </span>
          </span>

          <h1 className="mt-7 max-w-2xl text-[2.6rem] leading-[1.02] text-bone sm:text-6xl lg:text-[4.1rem]">
            {company.headline}{" "}
            <span className="font-serif-accent text-copper-bright">
              {company.headlineAccent}
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-bone-muted sm:text-xl">
            {company.subhead}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3.5">
            <a href={primaryCta.mailto} className="btn-primary">
              {primaryCta.label}
              <Arrow />
            </a>
            <a href={secondaryCta.href} className="btn-ghost">
              {secondaryCta.label}
            </a>
          </div>

          <p className="mt-9 max-w-lg border-l-2 border-line-strong pl-4 text-sm leading-relaxed text-bone-faint">
            {company.positioning}
          </p>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <div className="aspect-square w-full max-w-[520px]">
            <VortexField />
          </div>
        </div>
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true" fill="none">
      <path
        d="M2 8h11M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
