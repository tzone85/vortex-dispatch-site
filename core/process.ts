import type { ProcessStep } from "./types";

export const processSteps: readonly ProcessStep[] = [
  {
    id: "discover",
    title: "Discover",
    description:
      "We map the business problem, buyers, constraints, and success metrics. No feature laundry lists until the outcome is clear.",
  },
  {
    id: "architect",
    title: "Architect",
    description:
      "Domain models, APIs, and delivery plan with testable boundaries. Risks are named early; stack choices follow the problem, not fashion.",
  },
  {
    id: "build",
    title: "Build",
    description:
      "Incremental shipping with TDD on pure logic, reviewable PRs, and UI that earns trust. You see working software every week, not a big-bang reveal.",
  },
  {
    id: "launch",
    title: "Launch & harden",
    description:
      "Production deploys, monitoring, payment and email paths, SEO/crawl readiness, and a handover your team can operate — or we stay on to iterate.",
  },
] as const;
