import type { CompanyProfile, NavItem } from "./types";

/**
 * Canonical identity for Vortex Dispatch. Pure data, consumed by every section
 * and by the SEO builders. Edit copy here - never in the components.
 */
export const company: CompanyProfile = {
  name: "Vortex Dispatch",
  tagline: "Production software, engineered to run.",
  headline: "Ship production software faster.",
  headlineAccent: "Keep the engineering bar high.",
  subhead:
    "Vortex Dispatch is a Cape Town software engineering company that combines senior engineering with agent-orchestrated delivery across planning, implementation, code review, QA and release.",
  positioning:
    "We build custom software and help engineering teams prove where AI coding agents improve throughput without surrendering architecture, testing, review or human control.",
  email: "hello@vortexdispatch.co.za",
  location: "Cape Town, South Africa",
  siteUrl: "https://vortexdispatch.co.za",
  foundedYear: 2024,
};

export const primaryCta = {
  label: "Book an engineering pilot",
  href: "/engineering-pilot",
  mailto: `mailto:${company.email}?subject=${encodeURIComponent(
    "Engineering Pilot: Vortex Dispatch",
  )}`,
} as const;

export const secondaryCta = {
  label: "See the work",
  href: "#work",
} as const;

export const navigation: readonly NavItem[] = [
  { id: "capabilities", label: "Capabilities", href: "#capabilities" },
  { id: "work", label: "Work", href: "#work" },
  { id: "engineering-pilot", label: "Engineering Pilot", href: "/engineering-pilot" },
  { id: "process", label: "How we build", href: "#process" },
  { id: "contact", label: "Contact", href: "#contact" },
] as const;
