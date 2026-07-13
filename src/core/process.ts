import type { PipelineStage } from "./types";

/**
 * How work moves through the studio. This is the data behind the hand-built SVG
 * dispatch-pipeline diagram — five ordered stages, one signal travelling them.
 */
export const pipeline: readonly PipelineStage[] = [
  {
    id: "brief",
    index: 0,
    title: "Brief",
    detail: "We map the operational problem before a line of code — the real workflow, the edge cases, the money.",
  },
  {
    id: "architecture",
    index: 1,
    title: "Architecture",
    detail: "Clean boundaries first. A domain that survives change, drawn before it is built.",
  },
  {
    id: "build",
    index: 2,
    title: "Build · TDD",
    detail: "Tests come first, then the code that satisfies them. Nothing ships untested — that is the whole point.",
  },
  {
    id: "ship",
    index: 3,
    title: "Ship",
    detail: "Reviewed, gated, and deployed with observability from day one. A release you can trust, not hope in.",
  },
  {
    id: "run",
    index: 4,
    title: "Run",
    detail: "We stay. Monitoring, iteration, and support — software is owned, not handed over and forgotten.",
  },
] as const;
