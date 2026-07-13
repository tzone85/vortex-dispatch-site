/**
 * Pure geometry for the studio's signature visuals.
 *
 * Two hand-built SVG pieces depend on this module: the hero *vortex* (a set of
 * logarithmic-spiral arcs) and the *dispatch pipeline* diagram. Keeping the maths
 * here — free of React and the DOM — means the shapes are unit-testable and the
 * components stay dumb renderers. (Single-responsibility: geometry computes, JSX draws.)
 */

export interface Point {
  readonly x: number;
  readonly y: number;
}

export interface SpiralPointOpts {
  readonly cx: number;
  readonly cy: number;
  /** base radius (radius at theta = 0) */
  readonly a: number;
  /** growth rate of the log spiral */
  readonly b: number;
  /** angle in radians */
  readonly theta: number;
}

/** A point on the logarithmic spiral r = a·e^(b·θ). */
export function spiralPoint({ cx, cy, a, b, theta }: SpiralPointOpts): Point {
  const r = a * Math.exp(b * theta);
  return { x: cx + r * Math.cos(theta), y: cy + r * Math.sin(theta) };
}

export interface VortexArc {
  readonly id: number;
  readonly d: string;
  /** starting rotation of the arc, in degrees */
  readonly rotation: number;
  /** suggested animation delay (s) so arcs stagger in */
  readonly delay: number;
}

export interface VortexOpts {
  readonly count: number;
  readonly cx: number;
  readonly cy: number;
  /** how many full turns each arc sweeps */
  readonly turns: number;
  /** outermost radius the vortex is allowed to reach */
  readonly maxRadius: number;
  /** samples per arc (higher = smoother path) */
  readonly samples?: number;
}

/**
 * Build `count` interleaved spiral arcs that fill a disc of `maxRadius`.
 * Each arc is a smooth SVG path; arcs are evenly rotated around the centre so
 * the set reads as one rotating vortex.
 */
export function vortexArcs(opts: VortexOpts): VortexArc[] {
  const { count, cx, cy, turns, maxRadius, samples = 48 } = opts;
  if (count <= 0) throw new Error("vortexArcs: count must be > 0");

  const thetaMax = turns * 2 * Math.PI;
  // Pick `b` so the spiral reaches (just inside) maxRadius at thetaMax, from a
  // small inner radius `a`. r(thetaMax) = a·e^(b·thetaMax) = maxRadius.
  const a = maxRadius * 0.06;
  const b = Math.log(maxRadius / a) / thetaMax;

  const arcs: VortexArc[] = [];
  for (let i = 0; i < count; i++) {
    const phase = (i / count) * 2 * Math.PI;
    const pts: Point[] = [];
    for (let s = 0; s <= samples; s++) {
      const t = (s / samples) * thetaMax;
      pts.push(spiralPoint({ cx, cy, a, b, theta: t + phase }));
    }
    arcs.push({
      id: i,
      d: toSmoothPath(pts),
      rotation: (360 / count) * i,
      delay: (i / count) * 0.9,
    });
  }
  return arcs;
}

/** Catmull-Rom → cubic-bezier smoothing for an organic, non-jagged spiral. */
function toSmoothPath(pts: readonly Point[]): string {
  if (pts.length === 0) return "";
  if (pts.length < 3) return `M ${fmt(pts[0].x)} ${fmt(pts[0].y)}`;

  let d = `M ${fmt(pts[0].x)} ${fmt(pts[0].y)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${fmt(c1x)} ${fmt(c1y)}, ${fmt(c2x)} ${fmt(c2y)}, ${fmt(p2.x)} ${fmt(p2.y)}`;
  }
  return d;
}

export interface PipelineNode extends Point {
  readonly index: number;
}

export interface PipelineLayoutOpts {
  readonly count: number;
  readonly width: number;
  readonly y: number;
  readonly margin: number;
}

/** Evenly space `count` nodes across `width`, anchored to the margins. */
export function pipelineLayout({ count, width, y, margin }: PipelineLayoutOpts): PipelineNode[] {
  if (count < 2) throw new Error("pipelineLayout: need at least 2 nodes");
  const span = width - margin * 2;
  const step = span / (count - 1);
  return Array.from({ length: count }, (_, i) => ({
    index: i,
    x: margin + step * i,
    y,
  }));
}

/**
 * Join nodes with a gentle S-curve between each pair, so the pipeline reads as a
 * living conduit rather than a ruler line.
 */
export function pipelinePath(nodes: readonly PipelineNode[]): string {
  if (nodes.length === 0) return "";
  let d = `M ${fmt(nodes[0].x)} ${fmt(nodes[0].y)}`;
  for (let i = 1; i < nodes.length; i++) {
    const prev = nodes[i - 1];
    const curr = nodes[i];
    const midX = (prev.x + curr.x) / 2;
    d += ` C ${fmt(midX)} ${fmt(prev.y)}, ${fmt(midX)} ${fmt(curr.y)}, ${fmt(curr.x)} ${fmt(curr.y)}`;
  }
  return d;
}

export interface DispatchDot {
  readonly id: number;
  /** phase offset in [0,1) along the animated path */
  readonly offset: number;
}

/** Evenly-phased dots that ride the pipeline path as "dispatched" signals. */
export function dispatchDots(count: number): DispatchDot[] {
  if (count <= 0) return [];
  return Array.from({ length: count }, (_, i) => ({ id: i, offset: i / count }));
}

/** Trim float noise so generated SVG stays compact and diff-friendly. */
function fmt(n: number): number {
  return Math.round(n * 100) / 100;
}
