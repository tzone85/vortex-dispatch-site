import { brandAssets, brandUrl } from "./brand";
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
 * Comprehensive schema.org JSON-LD for an Organization plus its shipped products.
 * Optimized for AI agents, search engines, and structured data consumers.
 */
export function buildOrganizationJsonLd(
  c: CompanyProfile,
  work: readonly WorkItem[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${c.siteUrl}/#organization`,
        name: c.name,
        url: c.siteUrl,
        logo: brandUrl(c.siteUrl, brandAssets.logo),
        image: brandUrl(c.siteUrl, brandAssets.logo512),
        email: c.email,
        telephone: null,
        foundingDate: String(c.foundedYear),
        foundingLocation: c.location,
        slogan: c.tagline,
        description: c.positioning,
        areaServed: {
          "@type": "Place",
          name: "South Africa",
          geo: {
            "@type": "GeoShape",
            box: "-33.9250,18.4241,-33.9250,18.4241",
          },
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: c.location,
          addressCountry: "ZA",
        },
        sameAs: [
          "https://github.com/tzone85",
          "https://github.com/vortex-dispatch",
        ],
        knowsAbout: [
          "Software Development",
          "Marketplace Development",
          "Booking Platforms",
          "Compliance Tools",
          "AI Integration",
          "SaaS Development",
          "React Development",
          "Next.js Development",
          "Laravel Development",
          "Go Programming",
        ],
        makesOffer: work
          .filter((w) => w.status === "live")
          .map((w) => ({
            "@type": "Offer",
            "@id": `${c.siteUrl}/#offer-${w.id}`,
            itemOffered: {
              "@type": "SoftwareApplication",
              name: w.name,
              description: w.summary,
              applicationCategory: `Business/${w.domain}`,
              url: w.href,
              offers: {
                "@type": "Offer",
                priceCurrency: "ZAR",
                price: "custom",
              },
            },
          })),
        hasService: [
          {
            "@type": "LocalBusiness",
            name: "Software Development",
            description: "Custom software development and engineering",
            areaServed: "ZA",
          },
          {
            "@type": "LocalBusiness",
            name: "Technical Consulting",
            description: "Software architecture and technical strategy",
            areaServed: "ZA",
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${c.siteUrl}/#website`,
        url: c.siteUrl,
        name: c.name,
        description: c.positioning,
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${c.siteUrl}/?s={search_term_string}`,
          },
          query: "required",
        },
      },
      ...work
        .filter((w) => w.status === "live" && w.href)
        .map((w) => ({
          "@type": "SoftwareApplication",
          "@id": `${c.siteUrl}/#product-${w.id}`,
          name: w.name,
          description: w.summary,
          url: w.href,
          applicationCategory: `Business/${w.domain}`,
          operatingSystem: "Web",
          provider: {
            "@type": "Organization",
            "@id": `${c.siteUrl}/#organization`,
          },
          releaseDate: `${w.year}-01-01`,
        })),
    ],
  };
}
