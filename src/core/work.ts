import type { WorkItem } from "./types";

/**
 * Selected shipped work. One item per domain, chosen to show range rather than
 * volume. These are live products — links point at production.
 */
export const work: readonly WorkItem[] = [
  {
    id: "mini-suites",
    name: "Mini Suites",
    domain: "booking",
    year: 2025,
    summary:
      "A booking platform for a luxury short-stay rental — real-time availability, secure deposits, and iCal sync with the big channels.",
    stack: ["Laravel", "Paystack", "Laravel Cloud"],
    status: "live",
    href: "https://minisuites.co.za",
  },
  {
    id: "shiftsavvy",
    name: "ShiftSavvy",
    domain: "marketplace",
    year: 2025,
    summary:
      "A same-shift staffing marketplace for restaurants — venues post gaps, vetted staff claim them, and the schedule fills itself.",
    stack: ["React", "Vite", "PWA"],
    status: "live",
  },
  {
    id: "popiapaper",
    name: "POPIAPaper",
    domain: "compliance",
    year: 2025,
    summary:
      "A generated POPIA compliance pack — policies and registers assembled from a business's real answers, ready to sign.",
    stack: ["Next.js", "Document engine"],
    status: "live",
  },
  {
    id: "returnready",
    name: "ReturnReady",
    domain: "fintech",
    year: 2026,
    summary:
      "A filing-season co-pilot for SARS tax returns — a client-side rules engine that walks people through their submission, privately.",
    stack: ["React", "Vite", "Rules engine"],
    status: "live",
  },
  {
    id: "nexus-dispatch",
    name: "Nexus Dispatch",
    domain: "ai-delivery",
    year: 2026,
    summary:
      "Offline-first AI agent orchestration — hand off a requirement and it decomposes, dispatches parallel local-LLM agents, reviews, QAs, and merges. No API keys, no cloud.",
    stack: ["Go", "Local LLMs", "Ollama"],
    status: "live",
    href: "https://github.com/tzone85/nexus-dispatch",
  },
  {
    id: "vxd",
    name: "VXD Delivery",
    domain: "ai-delivery",
    year: 2026,
    summary:
      "Our own agentic build pipeline — multi-agent planning, TDD, and a security gate that ships production software from a written brief.",
    stack: ["Go", "Multi-agent", "TDD"],
    status: "in-build",
  },
] as const;
