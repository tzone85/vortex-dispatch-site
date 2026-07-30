import { brandAssets, brandUrl } from "./brand";
import type { CompanyProfile, FaqEntry, SeoMeta, WorkItem } from "./types";

/**
 * Build the page's <title>/description/canonical from the company profile.
 * The title states the trade and the country outright — "Vortex Dispatch"
 * collides with US truck-dispatching brands, so the entity must disambiguate
 * itself in the first line machines read.
 */
export function buildSeoMeta(c: CompanyProfile): SeoMeta {
  return {
    title: `${c.name} — commercial software studio in ${c.location}`,
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
        "@type": ["Organization", "ProfessionalService"],
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
        disambiguatingDescription:
          "A custom software studio in Cape Town, South Africa. Not a transport, trucking, fleet-dispatch, or TMS product — the name refers to how work is dispatched through the studio's build pipeline.",
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
          "Custom Software Development",
          "Web Application Development",
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

/** schema.org FAQPage built from the canonical FAQ copy. */
export function buildFaqJsonLd(
  entries: readonly FaqEntry[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

/**
 * Inject JSON-LD blocks into an HTML document, immediately before </head>.
 * Used by the Vite build so structured data ships in the static HTML —
 * most AI crawlers never execute JavaScript, so client-side injection alone
 * is invisible to them.
 */
export function injectJsonLdIntoHtml(
  html: string,
  blocks: readonly Record<string, unknown>[],
): string {
  if (!html.includes("</head>")) {
    throw new Error("injectJsonLdIntoHtml: document has no </head>");
  }
  const scripts = blocks
    .map(
      (b) => `<script type="application/ld+json">${JSON.stringify(b)}</script>`,
    )
    .join("\n    ");
  return html.replace("</head>", `    ${scripts}\n  </head>`);
}
