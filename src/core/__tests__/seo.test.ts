import { describe, it, expect } from "vitest";
import { brandAssets, brandUrl } from "../brand";
import { buildSeoMeta, buildOrganizationJsonLd } from "../seo";
import { company } from "../company";
import { work } from "../work";

describe("buildSeoMeta", () => {
  const meta = buildSeoMeta(company);

  it("leads the title with the brand and drops the trailing period of the tagline", () => {
    expect(meta.title.startsWith(company.name)).toBe(true);
    expect(meta.title.endsWith(".")).toBe(false);
  });

  it("uses the subhead as the description and the site url as canonical", () => {
    expect(meta.description).toBe(company.subhead);
    expect(meta.canonical).toBe(company.siteUrl);
  });
});

describe("buildOrganizationJsonLd", () => {
  const ld = buildOrganizationJsonLd(company, work) as Record<string, unknown>;
  const graph = ld["@graph"] as Record<string, unknown>[];
  const org = graph.find((n) => n["@type"] === "Organization") as Record<
    string,
    unknown
  >;

  it("is a schema.org Organization graph", () => {
    expect(ld["@context"]).toBe("https://schema.org");
    expect(org).toBeDefined();
    expect(org.name).toBe(company.name);
  });

  it("includes brand logo assets", () => {
    expect(org.logo).toBe(brandUrl(company.siteUrl, brandAssets.logo));
    expect(org.image).toBe(brandUrl(company.siteUrl, brandAssets.logo512));
  });

  it("advertises only live products as offers", () => {
    const offers = org.makesOffer as unknown[];
    const liveCount = work.filter((w) => w.status === "live").length;
    expect(offers).toHaveLength(liveCount);
  });
});
