import { useMemo } from "react";

/** Deterministic PRNG (mulberry32) so stars keep their positions across renders. */
function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface StarfieldProps {
  count?: number;
  className?: string;
}

/** A faint, warm starfield — texture for the night sky behind the vortex. */
export function Starfield({ count = 150, className = "" }: StarfieldProps) {
  const stars = useMemo(() => {
    const next = rng(20240711);
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: next() * 100,
      y: next() * 100,
      // viewBox is 100 units but the svg is stretched to full width, so a "unit"
      // is ~10-15px on screen. Keep radii tiny so stars stay pin-pricks, not blobs.
      r: 0.05 + next() * 0.13,
      o: 0.2 + next() * 0.5,
      warm: next() > 0.82,
    }));
  }, [count]);

  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {stars.map((s) => (
        <circle
          key={s.id}
          cx={s.x}
          cy={s.y}
          r={s.r}
          fill={s.warm ? "#e9a96a" : "#ece5d8"}
          opacity={s.o}
        />
      ))}
    </svg>
  );
}
