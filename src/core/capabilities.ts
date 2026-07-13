import type { Capability } from "./types";

/** What the studio actually sells. Four focused lines, not a laundry list. */
export const capabilities: readonly Capability[] = [
  {
    id: "product",
    index: "01",
    title: "Product engineering",
    summary:
      "End-to-end builds — from a first architecture sketch to a shipped, monitored product your team can extend without us.",
    deliverables: ["Web & PWA applications", "APIs & data models", "Auth, billing & payments", "CI, tests & observability"],
  },
  {
    id: "platforms",
    index: "02",
    title: "Platforms & marketplaces",
    summary:
      "Two-sided systems where supply meets demand — matching, scheduling, payouts, and the trust surfaces that make people transact.",
    deliverables: ["Marketplace & booking flows", "Scheduling & availability", "Payment orchestration", "Admin & operations tooling"],
  },
  {
    id: "compliance",
    index: "03",
    title: "Compliance & document systems",
    summary:
      "Software that produces correct, defensible artefacts — legal, regulatory, and financial documents generated from real rules, not templates.",
    deliverables: ["Rules & policy engines", "Document generation (.docx / PDF)", "Regression-locked outputs", "Jurisdiction-aware content"],
  },
  {
    id: "ai-delivery",
    index: "04",
    title: "AI-assisted delivery",
    summary:
      "We use agent pipelines to build faster and safer — planning, TDD, and adversarial review baked into how the work gets done.",
    deliverables: ["Agentic build pipelines", "Automated test generation", "Security & quality gates", "Self-hosted, no lock-in"],
  },
] as const;
