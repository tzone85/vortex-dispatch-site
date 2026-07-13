import { pipeline, pipelineLayout, pipelinePath, dispatchDots } from "@/core";
import { SectionHead } from "./SectionHead";
import { Reveal } from "./Reveal";
import { usePrefersReducedMotion } from "./hooks";

const VW = 1000;
const VH = 130;
const NODE_Y = 58;
const MARGIN = 96;
const DUR = 7; // seconds for a signal to traverse the pipeline

/**
 * "How we build" — a hand-authored SVG conduit. Nodes and the connecting path
 * come from the pure, unit-tested layout functions; three signals ride the path
 * (SMIL animateMotion) unless the visitor prefers reduced motion.
 */
export function Process() {
  const reduced = usePrefersReducedMotion();
  const nodes = pipelineLayout({ count: pipeline.length, width: VW, y: NODE_Y, margin: MARGIN });
  const pathD = pipelinePath(nodes);
  const dots = dispatchDots(3);

  return (
    <section id="process" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <SectionHead
        kicker="How we build"
        title={
          <>
            A brief goes in.{" "}
            <span className="font-serif-accent text-copper-bright">Running software comes out.</span>
          </>
        }
        lead="The same five stages every time. Tests lead, review gates, and we stay for the running — that discipline is the product."
      />

      <Reveal className="mt-14">
        <div className="panel rounded-2xl px-4 py-8 sm:px-8">
          <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" role="img" aria-label="The Vortex Dispatch build pipeline: Brief, Architecture, Build with TDD, Ship, Run">
            <defs>
              <linearGradient id="pipe-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#a5652f" />
                <stop offset="50%" stopColor="#e9a96a" />
                <stop offset="100%" stopColor="#5fb6b0" />
              </linearGradient>
              <filter id="dot-glow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="2.4" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* faint base conduit */}
            <path id="pipe-path" d={pathD} fill="none" stroke="rgba(236,229,216,0.12)" strokeWidth={2} />
            {/* flowing gradient conduit */}
            <path
              d={pathD}
              fill="none"
              stroke="url(#pipe-grad)"
              strokeWidth={2}
              strokeLinecap="round"
              strokeDasharray="4 10"
              style={reduced ? undefined : { animation: "dash-drift 26s linear infinite" }}
            />

            {/* travelling signals */}
            {!reduced &&
              dots.map((d) => (
                <circle key={d.id} r={4} fill="#fbe4c0" filter="url(#dot-glow)">
                  <animateMotion dur={`${DUR}s`} repeatCount="indefinite" begin={`-${d.offset * DUR}s`}>
                    <mpath href="#pipe-path" />
                  </animateMotion>
                </circle>
              ))}

            {/* nodes + labels */}
            {nodes.map((n, i) => (
              <g key={pipeline[i].id}>
                <circle cx={n.x} cy={n.y} r={13} fill="#0d0c10" stroke="rgba(236,229,216,0.18)" strokeWidth={1} />
                <circle cx={n.x} cy={n.y} r={5} fill={i === 2 ? "#5fb6b0" : "#d08a4e"} />
                <text
                  x={n.x}
                  y={n.y - 26}
                  textAnchor="middle"
                  className="font-mono"
                  fontSize={11}
                  fill="#6e6a61"
                  letterSpacing="1.5"
                >
                  {String(i + 1).padStart(2, "0")}
                </text>
                <text
                  x={n.x}
                  y={n.y + 40}
                  textAnchor="middle"
                  className="font-display"
                  fontSize={17}
                  fontWeight={700}
                  fill="#ece5d8"
                >
                  {pipeline[i].title}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </Reveal>

      {/* stage detail cards */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {pipeline.map((stage, i) => (
          <Reveal key={stage.id} delay={i * 70} className="rounded-xl border border-line bg-void-2/40 p-5">
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-xs text-copper">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-display text-sm font-bold text-bone">{stage.title}</span>
            </div>
            <p className="mt-3 text-[0.82rem] leading-relaxed text-bone-muted">{stage.detail}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
