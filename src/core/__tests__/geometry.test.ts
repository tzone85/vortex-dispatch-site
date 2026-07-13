import { describe, it, expect } from "vitest";
import {
  spiralPoint,
  vortexArcs,
  pipelineLayout,
  pipelinePath,
  dispatchDots,
} from "../geometry";

describe("spiralPoint", () => {
  it("sits at radius a when theta is 0 (e^0 = 1)", () => {
    const p = spiralPoint({ cx: 100, cy: 100, a: 20, b: 0.3, theta: 0 });
    // theta 0 => point straight to the right of centre at distance a
    expect(p.x).toBeCloseTo(120, 5);
    expect(p.y).toBeCloseTo(100, 5);
  });

  it("grows the radius exponentially with theta", () => {
    const center = { cx: 0, cy: 0, a: 10, b: 0.4 };
    const near = spiralPoint({ ...center, theta: 1 });
    const far = spiralPoint({ ...center, theta: 3 });
    const rNear = Math.hypot(near.x, near.y);
    const rFar = Math.hypot(far.x, far.y);
    expect(rFar).toBeGreaterThan(rNear);
    expect(rNear).toBeCloseTo(10 * Math.exp(0.4 * 1), 5);
  });
});

describe("vortexArcs", () => {
  const arcs = vortexArcs({ count: 6, cx: 200, cy: 200, turns: 2.5, maxRadius: 180 });

  it("produces exactly `count` arcs", () => {
    expect(arcs).toHaveLength(6);
  });

  it("every arc is a valid SVG path starting with a move command", () => {
    for (const arc of arcs) {
      expect(arc.d.startsWith("M")).toBe(true);
      expect(arc.d.length).toBeGreaterThan(10);
    }
  });

  it("gives each arc a distinct rotation and a positive animation delay budget", () => {
    const rotations = arcs.map((a) => a.rotation);
    expect(new Set(rotations).size).toBe(arcs.length);
    for (const arc of arcs) expect(arc.delay).toBeGreaterThanOrEqual(0);
  });

  it("keeps all sampled points within the max radius of the centre", () => {
    const nums = arcs[0].d.match(/-?\d+(\.\d+)?/g)!.map(Number);
    for (let i = 0; i < nums.length; i += 2) {
      const r = Math.hypot(nums[i] - 200, nums[i + 1] - 200);
      expect(r).toBeLessThanOrEqual(180 + 0.5);
    }
  });
});

describe("pipelineLayout", () => {
  const nodes = pipelineLayout({ count: 5, width: 1000, y: 60, margin: 80 });

  it("returns one node per stage", () => {
    expect(nodes).toHaveLength(5);
  });

  it("spaces nodes left-to-right with monotonically increasing x", () => {
    for (let i = 1; i < nodes.length; i++) {
      expect(nodes[i].x).toBeGreaterThan(nodes[i - 1].x);
    }
  });

  it("anchors the first and last node to the margins", () => {
    expect(nodes[0].x).toBeCloseTo(80, 5);
    expect(nodes[nodes.length - 1].x).toBeCloseTo(920, 5);
  });

  it("throws rather than dividing by zero for a single node", () => {
    expect(() => pipelineLayout({ count: 1, width: 1000, y: 60, margin: 80 })).toThrow();
  });
});

describe("pipelinePath", () => {
  it("connects every node into one continuous path", () => {
    const nodes = pipelineLayout({ count: 4, width: 800, y: 50, margin: 60 });
    const d = pipelinePath(nodes);
    expect(d.startsWith("M")).toBe(true);
    // one move + three curve/line segments joining four nodes
    expect(d.match(/[CL]/g) ?? []).toHaveLength(3);
  });
});

describe("dispatchDots", () => {
  it("returns evenly-phased dots for a travelling-signal animation", () => {
    const dots = dispatchDots(4);
    expect(dots).toHaveLength(4);
    expect(dots.map((d) => d.offset)).toEqual([0, 0.25, 0.5, 0.75]);
  });
});
