import type { Service } from "./types";

/**
 * Capability catalogue for B2B buyers.
 * Kept framework-free so unit tests can assert the commercial offering.
 */
export const services: readonly Service[] = [
  {
    id: "product-engineering",
    title: "Product engineering",
    summary:
      "End-to-end design and delivery of commercial software products — SaaS platforms, customer portals, and revenue-critical applications.",
    outcomes: [
      "Shippable MVPs and production releases",
      "Clear product boundaries and data models",
      "Observability and ops from day one",
    ],
  },
  {
    id: "marketplaces-platforms",
    title: "Marketplaces & platforms",
    summary:
      "Two-sided markets, booking systems, and operational platforms with payments, ratings, and real-world workflows built in.",
    outcomes: [
      "Trust loops and matchmaking flows",
      "Local payment rails (Paystack, PayFast, and more)",
      "Admin tooling your operators can run",
    ],
  },
  {
    id: "web-mobile",
    title: "Web & mobile applications",
    summary:
      "Fast, accessible interfaces on modern stacks — Next.js, React Native/Expo, and server-side systems that stay maintainable.",
    outcomes: [
      "Responsive, conversion-ready experiences",
      "Offline-friendly mobile where it matters",
      "SEO and performance as first-class concerns",
    ],
  },
  {
    id: "ai-assisted-delivery",
    title: "AI-assisted delivery systems",
    summary:
      "Orchestration, agent pipelines, and internal tooling that accelerate engineering without sacrificing review, QA, or auditability.",
    outcomes: [
      "Reproducible agent workflows",
      "Event-sourced audit trails",
      "Human-in-the-loop escalation paths",
    ],
  },
  {
    id: "architecture-modernisation",
    title: "Architecture & modernisation",
    summary:
      "Solid foundations for growing products: modular backends, testable domain layers, secure APIs, and migrations that do not freeze the business.",
    outcomes: [
      "SOLID, testable domain models",
      "API design and integration strategy",
      "Incremental rewrites with measurable risk",
    ],
  },
  {
    id: "compliance-fintech",
    title: "Compliance & fintech-adjacent tools",
    summary:
      "Document generation, tax and filing co-pilots, and regulated-adjacent products that respect privacy, POPIA, and real SA business rules.",
    outcomes: [
      "Client-side where privacy is the product",
      "Accurate rule engines with full test coverage",
      "Trust copy and legal-grade polish",
    ],
  },
] as const;

export function getServiceById(id: string): Service | undefined {
  return services.find((service) => service.id === id);
}
