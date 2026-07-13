import { describe, expect, it } from "vitest";
import { company } from "../company";
import { buildOrganizationJsonLd, buildSeo, buildWebsiteJsonLd } from "../seo";

describe("buildSeo", () => {
  it("builds title, description, canonical, Open Graph, and Twitter fields", () => {
    const seo = buildSeo({
      title: "Vortex Dispatch — Commercial software for companies",
      description:
        "Vortex Dispatch designs and ships commercial software products and platforms for businesses.",
      siteUrl: company.siteUrl,
      siteName: company.brandName,
      path: "/",
    });

    expect(seo.title).toContain("Vortex Dispatch");
    expect(seo.description.length).toBeGreaterThan(50);
    expect(seo.canonical).toBe(`${company.siteUrl}/`);
    expect(seo.openGraph.siteName).toBe("Vortex Dispatch");
    expect(seo.openGraph.type).toBe("website");
    expect(seo.openGraph.url).toBe(seo.canonical);
    expect(seo.twitter.card).toBe("summary_large_image");
    expect(seo.twitter.title).toBe(seo.title);
  });

  it("normalizes paths without double slashes", () => {
    const seo = buildSeo({
      title: "Work",
      description: "Selected commercial software built by Vortex Dispatch for real businesses.",
      siteUrl: "https://example.com",
      siteName: "Vortex Dispatch",
      path: "work",
    });
    expect(seo.canonical).toBe("https://example.com/work");
  });
});

describe("structured data builders", () => {
  it("emits Organization JSON-LD with brand and contact", () => {
    const org = buildOrganizationJsonLd(company);
    expect(org["@type"]).toBe("Organization");
    expect(org.name).toBe("Vortex Dispatch");
    expect(org.url).toBe(company.siteUrl);
    expect(org.email).toBe(company.email);
    expect(org.description).toMatch(/software/i);
  });

  it("emits WebSite JSON-LD tied to the same brand", () => {
    const site = buildWebsiteJsonLd(company);
    expect(site["@type"]).toBe("WebSite");
    expect(site.name).toBe("Vortex Dispatch");
    expect(site.url).toBe(company.siteUrl);
  });
});
