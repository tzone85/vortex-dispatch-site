import { capabilities } from "@/core";
import { SectionHead } from "./SectionHead";
import { Reveal } from "./Reveal";

/** What the studio sells — four cards, indexed, with deliverables. */
export function Capabilities() {
  return (
    <section id="capabilities" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <SectionHead
        kicker="Capabilities"
        title={
          <>
            Four things we do,{" "}
            <span className="font-serif-accent text-copper-bright">done properly.</span>
          </>
        }
        lead="Depth over breadth. Each line is something we have shipped to production, more than once."
      />

      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {capabilities.map((c, i) => (
          <Reveal key={c.id} delay={i * 90} className="group panel rounded-2xl p-7 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-display text-xl font-bold text-bone sm:text-2xl">{c.title}</h3>
              <span className="font-mono text-sm text-copper/80 transition-colors group-hover:text-copper-bright">
                {c.index}
              </span>
            </div>
            <p className="mt-4 text-[0.97rem] leading-relaxed text-bone-muted">{c.summary}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {c.deliverables.map((d) => (
                <li
                  key={d}
                  className="rounded-full border border-line px-3 py-1 font-mono text-[0.7rem] tracking-wide text-bone-faint transition-colors group-hover:border-line-strong group-hover:text-bone-muted"
                >
                  {d}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
