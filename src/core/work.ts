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
    href: "https://shiftsavvy.co.za",
  },
  {
    id: "foundersdesk",
    name: "FoundersDesk",
    domain: "consumer",
    year: 2025,
    summary:
      "A resource platform for founders — tools, guides, and intelligence to navigate the early stage journey.",
    stack: ["React", "Vite", "Next.js"],
    status: "live",
    href: "https://foundersdesk.co.za",
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
    href: "https://returnready-black.vercel.app",
  },
  {
    id: "speedreading",
    name: "SpeedReading",
    domain: "consumer",
    year: 2025,
    summary:
      "An interactive speed reading platform — progressive training, comprehension tracking, and personalized techniques to help users read faster while understanding more.",
    stack: ["React", "Vite", "Psychology-based"],
    status: "live",
    href: "https://speedreading.playfulskills.co.za",
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
