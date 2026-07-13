import type { CompanyProfile, NavItem } from "./types";

/**
 * Canonical identity for Vortex Dispatch. Pure data, consumed by every section
 * and by the SEO builders. Edit copy here — never in the components.
 */
export const company: CompanyProfile = {
  name: "Vortex Dispatch",
  tagline: "Commercial software, engineered to run.",
  headline: "We turn operational problems into software that",
  headlineAccent: "companies run on.",
  subhead:
    "A commercial software studio. We design, build, and ship product-grade systems — marketplaces, booking platforms, compliance tooling, and AI-assisted delivery — then stay to keep them running.",
  positioning:
    "Not a brochure-site shop. We build the software a business operates on: clean architecture, tested by default, and interfaces your customers will trust on the first click.",
  email: "hello@vortexdispatch.co.za",
  location: "Cape Town, South Africa",
  siteUrl: "https://vortexdispatch.co.za",
  foundedYear: 2024,
};

export const primaryCta = {
  label: "Start a conversation",
  href: "#contact",
  mailto: `mailto:${company.email}?subject=${encodeURIComponent(
    "Project inquiry — Vortex Dispatch",
  )}`,
} as const;

export const secondaryCta = {
  label: "See the work",
  href: "#work",
} as const;

export const navigation: readonly NavItem[] = [
  { id: "capabilities", label: "Capabilities", href: "#capabilities" },
  { id: "work", label: "Work", href: "#work" },
  { id: "process", label: "How we build", href: "#process" },
  { id: "contact", label: "Contact", href: "#contact" },
] as const;
