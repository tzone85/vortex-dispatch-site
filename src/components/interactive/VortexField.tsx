import { useMemo } from "react";
import { vortexArcs, spiralPoint } from "@/core";
import { usePrefersReducedMotion } from "../hooks";

const SIZE = 480;
const C = SIZE / 2;
const MAX_R = 208;

/**
 * The studio's signature: a logarithmic-spiral vortex that draws operational
 * complexity inward to a bright core, then dispatches it back out as signal dots.
 * Geometry is pure and unit-tested (see core/geometry) — this component only draws.
 */
export function VortexField() {
  const reduced = usePrefersReducedMotion();

  const arcs = useMemo(
    // Three arms, like the nav mark — sparse enough to read as a galaxy,
    // not a fingerprint. All arms stay inside MAX_R (see core/geometry).
    () => vortexArcs({ count: 3, cx: C, cy: C, turns: 2.6, maxRadius: MAX_R }),
    [],
  );

  // Four "dispatched" signals resting on a mid orbit, evenly placed.
  const dispatched = useMemo(() => {
    const r = MAX_R * 0.72;
    return Array.from({ length: 4 }, (_, i) => {
      const theta = (i / 4) * 2 * Math.PI - Math.PI / 5;
      return { id: i, x: C + r * Math.cos(theta), y: C + r * Math.sin(theta) };
    });
  }, []);

  // A point far enough out to hang the "you are here" tick on.
  const tick = useMemo(
    () => spiralPoint({ cx: C, cy: C, a: MAX_R * 0.06, b: 0.34, theta: 6.6 }),
    [],
  );

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      role="img"
      aria-label="Vortex Dispatch mark: spiral arcs drawing inward to a bright core"
      className="h-full w-full max-w-[520px]"
    >
      <defs>
        <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fbe4c0" stopOpacity="1" />
          <stop offset="35%" stopColor="#e9a96a" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#d08a4e" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="arc-stroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e9a96a" stopOpacity="0.05" />
          <stop offset="55%" stopColor="#d08a4e" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#fbe4c0" stopOpacity="0.95" />
        </linearGradient>
        <filter id="soft-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* instrument rings — the "observatory" scaffold */}
      {[0.42, 0.62, 0.82, 1].map((f, i) => (
        <circle
          key={f}
          cx={C}
          cy={C}
          r={MAX_R * f}
          fill="none"
          stroke="rgba(236,229,216,0.09)"
          strokeWidth={1}
          strokeDasharray={i === 3 ? "2 7" : undefined}
        />
      ))}

      {/* the spiral vortex, slowly rotating as one body */}
      <g
        style={
          reduced
            ? undefined
            : {
                transformOrigin: `${C}px ${C}px`,
                animation: "spin-slow 46s linear infinite",
              }
        }
      >
        {arcs.map((arc) => (
          <path
            key={arc.id}
            d={arc.d}
            fill="none"
            stroke="url(#arc-stroke)"
            strokeWidth={1.4}
            strokeLinecap="round"
          />
        ))}
      </g>

      {/* dispatched signals — one is "live" (cold signal teal), the rest copper */}
      <g
        style={
          reduced
            ? undefined
            : {
                transformOrigin: `${C}px ${C}px`,
                animation: "spin-reverse 30s linear infinite",
              }
        }
      >
        {dispatched.map((d) => (
          <circle
            key={d.id}
            cx={d.x}
            cy={d.y}
            r={d.id === 0 ? 4.5 : 3}
            fill={d.id === 0 ? "#5fb6b0" : "#e9a96a"}
            filter="url(#soft-glow)"
          />
        ))}
      </g>

      {/* survey tick — a small "you are here" marker on the outer spiral */}
      <g>
        <circle cx={tick.x} cy={tick.y} r={2.5} fill="#c9a227" />
        <line
          x1={tick.x}
          y1={tick.y}
          x2={tick.x + 26}
          y2={tick.y}
          stroke="rgba(201,162,39,0.5)"
          strokeWidth={1}
        />
      </g>

      {/* bright core */}
      <circle
        cx={C}
        cy={C}
        r={54}
        fill="url(#core-glow)"
        style={
          reduced
            ? undefined
            : {
                transformOrigin: `${C}px ${C}px`,
                animation: "pulse-core 4.5s ease-in-out infinite",
              }
        }
      />
      <circle cx={C} cy={C} r={7} fill="#fdf1dc" filter="url(#soft-glow)" />
      <circle
        cx={C}
        cy={C}
        r={7}
        fill="none"
        stroke="#5fb6b0"
        strokeWidth={1.2}
        opacity={0.7}
        className="pulse-ring"
        style={{ transformOrigin: `${C}px ${C}px` }}
      />
    </svg>
  );
}
