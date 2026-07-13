import type { CompanyProfile, SeoMeta, WorkItem } from "./types";

/** Build the page's <title>/description/canonical from the company profile. */
export function buildSeoMeta(c: CompanyProfile): SeoMeta {
  return {
    title: `${c.name} — ${c.tagline.replace(/\.$/, "")}`,
    description: c.subhead,
    canonical: c.siteUrl,
  };
}

/**
 * schema.org JSON-LD for an Organization plus its shipped products. Emitted once
 * in the document head; kept pure so the shape is testable.
 */
export function buildOrganizationJsonLd(
  c: CompanyProfile,
  work: readonly WorkItem[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: c.name,
    url: c.siteUrl,
    email: c.email,
    foundingDate: String(c.foundedYear),
    slogan: c.tagline,
    description: c.positioning,
    address: {
      "@type": "PostalAddress",
      addressLocality: c.location,
      addressCountry: "ZA",
    },
    makesOffer: work
      .filter((w) => w.status === "live")
      .map((w) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "SoftwareApplication",
          name: w.name,
          applicationCategory: w.domain,
          ...(w.href ? { url: w.href } : {}),
        },
      })),
  };
}
