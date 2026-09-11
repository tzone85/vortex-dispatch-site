import { brandAssets, brandUrl } from "./brand";
import type { CompanyProfile, FaqEntry, SeoMeta, WorkItem } from "./types";

/** Build the homepage search metadata from the canonical company profile. */
export function buildSeoMeta(c: CompanyProfile): SeoMeta {
  return {
    title: `${c.name} | AI-Native Software Engineering & Custom Software`,
    description: c.subhead,
    canonical: `${c.siteUrl}/`,
  };
}

/**
 * Static schema.org entity graph for the company, its open-source VXD project,
 * core engineering services and selected shipped software.
 */
export function buildOrganizationJsonLd(
  c: CompanyProfile,
  work: readonly WorkItem[],
): Record<string, unknown> {
  const organizationId = `${c.siteUrl}/#organization`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": organizationId,
        name: c.name,
        url: `${c.siteUrl}/`,
        logo: brandUrl(c.siteUrl, brandAssets.logo),
        image: brandUrl(c.siteUrl, brandAssets.logo512),
        email: c.email,
        foundingDate: String(c.foundedYear),
        slogan: c.tagline,
        description: c.positioning,
        disambiguatingDescription:
          "A software engineering company in Cape Town, South Africa. Vortex Dispatch builds production software and develops agent-orchestrated engineering systems. It is not a transport, trucking, fleet-dispatch or TMS business.",
        areaServed: {
          "@type": "Country",
          name: "South Africa",
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Cape Town",
          addressRegion: "Western Cape",
          addressCountry: "ZA",
        },
        sameAs: [
          "https://github.com/tzone85",
          "https://github.com/tzone85/vortex-dispatch",
        ],
        knowsAbout: [
          "Custom Software Development",
          "Software Architecture",
          "AI-Native Software Engineering",
          "AI Coding Agents",
          "AI Agent Orchestration",
          "Claude Code",
          "OpenAI Codex",
          "Gemini CLI",
          "Code Review Automation",
          "Software QA",
          "Marketplace Development",
          "Booking Platforms",
          "Compliance Software",
          "SaaS Development",
          "React Development",
          "Laravel Development",
          "Go Programming",
        ],
        hasService: [
          {
            "@type": "Service",
            "@id": `${c.siteUrl}/#service-custom-software`,
            name: "Custom Software Engineering",
            serviceType: "Custom software development and production engineering",
            provider: { "@id": organizationId },
            areaServed: { "@type": "Country", name: "South Africa" },
          },
          {
            "@type": "Service",
            "@id": `${c.siteUrl}/#service-engineering-pilot`,
            name: "AI Engineering Delivery Pilot",
            url: `${c.siteUrl}/engineering-pilot`,
            serviceType: "Agent-orchestrated software engineering evaluation",
            provider: { "@id": organizationId },
            areaServed: { "@type": "Country", name: "South Africa" },
          },
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
            },
          })),
      },
      {
        "@type": "WebSite",
        "@id": `${c.siteUrl}/#website`,
        url: `${c.siteUrl}/`,
        name: c.name,
        description: c.positioning,
        publisher: { "@id": organizationId },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${c.siteUrl}/#vxd`,
        name: "VXD",
        alternateName: "Vortex Dispatch",
        description:
          "Open-source AI coding-agent orchestration for planning, isolated implementation, code review, QA, recovery and delivery workflows.",
        applicationCategory: "DeveloperApplication",
        operatingSystem: "macOS, Linux, Windows via WSL2",
        codeRepository: "https://github.com/tzone85/vortex-dispatch",
        license: "https://www.apache.org/licenses/LICENSE-2.0",
        url: `${c.siteUrl}/open-source`,
        creator: { "@id": organizationId },
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
          provider: { "@id": organizationId },
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
 * Used by the Vite build so structured data ships in the static HTML.
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
