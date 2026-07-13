import { principles } from "@/core";
import { SectionHead } from "./SectionHead";
import { Reveal } from "./Reveal";

/** The manifesto — where genuine care is stated plainly, not implied. */
export function Ethos() {
  return (
    <section className="border-t border-line bg-void-2/40">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <SectionHead
          kicker="How we work"
          title={
            <>
              We care about the boring parts,{" "}
              <span className="font-serif-accent text-copper-bright">because you will live in them.</span>
            </>
          }
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          {principles.map((p, i) => (
            <Reveal key={p.id} delay={i * 80} className="bg-void p-8 sm:p-10">
              <div className="flex items-start gap-5">
                <span className="font-mono text-sm text-copper/70">0{i + 1}</span>
                <div>
                  <h3 className="font-serif-accent text-2xl text-bone sm:text-[1.7rem]">{p.statement}</h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-bone-muted">{p.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
