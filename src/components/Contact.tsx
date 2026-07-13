import { company, primaryCta } from "@/core";
import { Reveal } from "./Reveal";

/** Closing call — a single, confident invitation. No form, just a real mailbox. */
export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden px-5 py-28 sm:px-8 sm:py-36">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(208,138,78,0.16),transparent_62%)]" />
      </div>

      <div className="mx-auto max-w-3xl text-center">
        <Reveal as="span" className="kicker">
          Contact
        </Reveal>
        <Reveal delay={80} as="h2" className="mt-6 text-4xl leading-tight text-bone sm:text-6xl">
          Have something that needs to{" "}
          <span className="font-serif-accent text-copper-bright">actually work?</span>
        </Reveal>
        <Reveal delay={150} as="p" className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-bone-muted">
          Tell us the operational problem. We will tell you honestly whether software is the right
          answer — and if it is, how we would build it.
        </Reveal>

        <Reveal delay={220} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a href={primaryCta.mailto} className="btn-primary">
            {primaryCta.label}
          </a>
          <a href={`mailto:${company.email}`} className="font-mono text-sm text-bone-muted transition-colors hover:text-copper-bright">
            {company.email}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
