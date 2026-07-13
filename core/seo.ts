import type { BuiltSeo, CompanyProfile, SeoInput } from "./types";

function joinUrl(siteUrl: string, path = "/"): string {
  const base = siteUrl.replace(/\/+$/, "");
  if (!path || path === "/") {
    return `${base}/`;
  }
  const normalised = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalised}`;
}

/**
 * Builds the SEO / social metadata object used by the Next.js metadata API.
 */
export function buildSeo(input: SeoInput): BuiltSeo {
  const canonical = joinUrl(input.siteUrl, input.path);

  return {
    title: input.title,
    description: input.description,
    canonical,
    openGraph: {
      title: input.title,
      description: input.description,
      url: canonical,
      siteName: input.siteName,
      type: "website",
      locale: "en_ZA",
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
    },
  };
}

export function buildOrganizationJsonLd(profile: CompanyProfile) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: profile.brandName,
    legalName: profile.legalName,
    url: profile.siteUrl,
    email: profile.email,
    description: profile.positioning,
    address: {
      "@type": "PostalAddress",
      addressCountry: "ZA",
      addressRegion: profile.location,
    },
    areaServed: "ZA",
    knowsAbout: [
      "Commercial software development",
      "SaaS product engineering",
      "Marketplace platforms",
      "Software architecture",
    ],
  } as const;
}

export function buildWebsiteJsonLd(profile: CompanyProfile) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: profile.brandName,
    url: profile.siteUrl,
    description: profile.tagline,
    publisher: {
      "@type": "Organization",
      name: profile.brandName,
    },
  } as const;
}

/** Default homepage SEO derived from the company profile. */
export function homepageSeo(profile: CompanyProfile): BuiltSeo {
  return buildSeo({
    title: `${profile.brandName} — Commercial software for companies`,
    description: profile.heroSubhead,
    siteUrl: profile.siteUrl,
    siteName: profile.brandName,
    path: "/",
  });
}
