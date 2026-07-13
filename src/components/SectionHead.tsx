import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

interface SectionHeadProps {
  kicker: string;
  title: ReactNode;
  lead?: ReactNode;
}

/** Consistent kicker + heading + optional lead, used to open each section. */
export function SectionHead({ kicker, title, lead }: SectionHeadProps) {
  return (
    <div className="max-w-2xl">
      <Reveal>
        <div className="flex items-center gap-3">
          <span className="kicker">{kicker}</span>
          <span className="h-px w-12 bg-line-strong" />
        </div>
      </Reveal>
      <Reveal delay={80} as="h2" className="mt-5 text-3xl text-bone sm:text-4xl lg:text-[2.9rem]">
        {title}
      </Reveal>
      {lead && (
        <Reveal delay={140} as="p" className="mt-5 text-lg leading-relaxed text-bone-muted">
          {lead}
        </Reveal>
      )}
    </div>
  );
}
