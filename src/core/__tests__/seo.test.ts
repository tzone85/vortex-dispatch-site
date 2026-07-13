import { describe, it, expect } from "vitest";
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

  it("is a schema.org Organization", () => {
    expect(ld["@context"]).toBe("https://schema.org");
    expect(ld["@type"]).toBe("Organization");
    expect(ld.name).toBe(company.name);
  });

  it("advertises only live products as offers", () => {
    const offers = ld.makesOffer as unknown[];
    const liveCount = work.filter((w) => w.status === "live").length;
    expect(offers).toHaveLength(liveCount);
  });
});
