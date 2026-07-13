import type { PortfolioItem } from "./types";

/**
 * Selected commercial work used as proof for client outreach.
 * Drawn from products already built and shipped in the portfolio.
 */
export const portfolio: readonly PortfolioItem[] = [
  {
    id: "shiftsavvy",
    name: "ShiftSavvy",
    category: "Marketplace",
    summary:
      "On-demand restaurant staffing marketplace: post a shift, match rated workers in minutes, and close the loop with mutual ratings after service.",
    stack: ["TypeScript", "Node", "Paystack", "Vercel"],
    href: "https://shiftsavvy.co.za",
    highlight: "Same-day staff fill for hospitality operators",
  },
  {
    id: "foundersdesk",
    name: "FoundersDesk",
    category: "SaaS / Compliance",
    summary:
      "Every legal document a new South African company needs — POPIA, PAIA, contracts, NDAs — generated in the browser from CIPC details.",
    stack: ["Next.js", "TypeScript", "docx", "Paystack"],
    href: "https://foundersdesk.co.za",
    highlight: "Compliance pack in minutes, not weeks",
  },
  {
    id: "mini-suites",
    name: "Mini Suites",
    category: "Hospitality platform",
    summary:
      "Direct-booking platform for a luxury short-term rental: dynamic pricing, dual payment gateways, guest flows, and a full host admin.",
    stack: ["Laravel", "Livewire", "Filament", "PayFast"],
    href: "https://minisuites.co.za",
    highlight: "Owner-operated booking without OTA lock-in",
  },
  {
    id: "playful-skills",
    name: "Playful Skills",
    category: "Consumer product",
    summary:
      "Polished commercial landing and product experience for parent-focused digital packs — conversion copy, trust design, and checkout-ready funnels.",
    stack: ["Static web", "Vercel", "Gumroad"],
    href: "https://playfulskills.co.za",
    highlight: "High-conversion seasonal product launches",
  },
  {
    id: "cashtask",
    name: "CashTask",
    category: "Platform",
    summary:
      "Pan-African microtask platform with multi-country payments, mobile offline-first clients, verification pipelines, and an operator admin.",
    stack: ["Node", "MongoDB", "React Native", "Paystack"],
    highlight: "Earn-by-task platform across SA, KE, NG rails",
  },
  {
    id: "returnready",
    name: "ReturnReady",
    category: "Tax tooling",
    summary:
      "SARS filing co-pilot for individuals: personalised plans, rental worksheets, and refund estimates — pure client-side engine with full unit tests.",
    stack: ["TypeScript", "Vite", "Vitest"],
    highlight: "Tax season clarity without a server holding data",
  },
] as const;

export function getPortfolioById(id: string): PortfolioItem | undefined {
  return portfolio.find((item) => item.id === id);
}
