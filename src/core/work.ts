import type { WorkItem } from "./types";

/**
 * Selected shipped work. One item per domain, chosen to show range rather than
 * volume. These are live products - links point at production.
 */
export const work: readonly WorkItem[] = [
  {
    id: "mini-suites",
    name: "Mini Suites",
    domain: "booking",
    year: 2025,
    summary:
      "A booking platform for a luxury short-stay rental: real-time availability, secure deposits, and iCal sync with the big channels.",
    proof:
      "Live on minisuites.co.za and taking paid bookings. The full booking-to-payment flow runs through Paystack in production.",
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
      "A same-shift staffing marketplace for restaurants: venues post gaps, vetted staff claim them, and the schedule fills itself.",
    proof:
      "Production PWA with a 109-test suite guarding the shift-matching and scheduling flows.",
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
      "A resource platform for founders: tools, guides, and intelligence to navigate the early stage journey.",
    proof:
      "Live on foundersdesk.co.za on its own domain, with a paid company document pack covering 11 South African legal and compliance documents.",
    stack: ["React", "Vite", "Next.js"],
    status: "live",
    href: "https://foundersdesk.co.za",
  },
  {
    id: "inkwenkwezi",
    name: "Inkwenkwezi",
    domain: "education",
    year: 2026,
    summary:
      "A CAPS study companion for Grades 8 to 12, named for the isiXhosa morning star: every topic gets theory, worked examples, flashcards, a quiz and a narrated mini-lesson. Pick a grade and watch a lesson play.",
    proof:
      "Live on inkwenkwezi.playfulskills.co.za with 747 topics across 71 subject blocks and 3,310 narrated clips, isiXhosa Home Language included. Keeps working offline.",
    stack: ["React", "Vite", "Canvas scenes"],
    status: "live",
    href: "https://inkwenkwezi.playfulskills.co.za",
  },
  {
    id: "speedreading",
    name: "SpeedReading",
    domain: "consumer",
    year: 2025,
    summary:
      "An interactive speed reading platform: progressive training, comprehension tracking, and personalized techniques to help users read faster while understanding more.",
    proof:
      "Live with progressive words-per-minute training tiers and comprehension checks after every session.",
    stack: ["React", "Vite", "Psychology-based"],
    status: "live",
    href: "https://speedreading.playfulskills.co.za",
  },
  {
    id: "sovereign-breath",
    name: "Sovereign Breath",
    domain: "wellness",
    year: 2026,
    summary:
      "A breathwork PWA: guided breathing patterns, a streak that forgives, and private circles that turn five minutes a day into a shared practice.",
    proof:
      "Offline-first PWA. Guided sessions keep working with no connection, and streaks forgive a missed day by design.",
    stack: ["React", "Vite", "Offline-first PWA"],
    status: "live",
    href: "https://breath.playfulskills.co.za",
  },
] as const;
