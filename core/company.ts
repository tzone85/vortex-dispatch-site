import type { CompanyProfile, NavItem } from "./types";

/**
 * Canonical company identity for the flagship site.
 * Pure data — consumed by pages, SEO helpers, and JSON-LD.
 */
export const company: CompanyProfile = {
  legalName: "Vortex Dispatch",
  brandName: "Vortex Dispatch",
  tagline: "Commercial software, engineered for companies that ship.",
  heroHeadline: "We build commercial software that companies actually run on.",
  heroSubhead:
    "Vortex Dispatch designs, builds, and ships product-grade software for businesses — from marketplaces and booking platforms to compliance tools and AI-assisted delivery systems.",
  positioning:
    "Vortex Dispatch is a commercial software studio for companies that need more than a brochure site. We turn operational problems into durable products: clean architecture, tested code, and interfaces your clients will trust.",
  email: "hello@vortexdispatch.co.za",
  location: "South Africa",
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://vortexdispatch.co.za",
};

export const primaryCta = {
  label: "Start a conversation",
  href: "#contact",
  mailto: `mailto:${company.email}?subject=${encodeURIComponent("Project inquiry — Vortex Dispatch")}`,
} as const;

export const secondaryCta = {
  label: "See our work",
  href: "#work",
} as const;

export const navigation: readonly NavItem[] = [
  { id: "services", label: "Services", href: "#services" },
  { id: "work", label: "Work", href: "#work" },
  { id: "process", label: "Process", href: "#process" },
  { id: "contact", label: "Contact", href: "#contact" },
] as const;
