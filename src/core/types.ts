/**
 * Framework-free domain types for the Vortex Dispatch studio site.
 * Nothing here imports React or the DOM — the domain is the stable core,
 * and presentation depends on it (never the reverse).
 */

export interface CompanyProfile {
  readonly name: string;
  readonly tagline: string;
  readonly headline: string;
  readonly headlineAccent: string;
  readonly subhead: string;
  readonly positioning: string;
  readonly email: string;
  readonly location: string;
  readonly siteUrl: string;
  readonly foundedYear: number;
}

export interface NavItem {
  readonly id: string;
  readonly label: string;
  readonly href: string;
}

export interface Capability {
  readonly id: string;
  readonly index: string;
  readonly title: string;
  readonly summary: string;
  readonly deliverables: readonly string[];
}

export type WorkDomain =
  | "marketplace"
  | "booking"
  | "compliance"
  | "fintech"
  | "consumer"
  | "ai-delivery";

export interface WorkItem {
  readonly id: string;
  readonly name: string;
  readonly domain: WorkDomain;
  readonly year: number;
  readonly summary: string;
  readonly stack: readonly string[];
  readonly status: "live" | "in-build";
  readonly href?: string;
}

export interface PipelineStage {
  readonly id: string;
  readonly index: number;
  readonly title: string;
  readonly detail: string;
}

export interface Principle {
  readonly id: string;
  readonly statement: string;
  readonly body: string;
}

export interface SeoMeta {
  readonly title: string;
  readonly description: string;
  readonly canonical: string;
}
