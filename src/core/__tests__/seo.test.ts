import { describe, it, expect } from "vitest";
import { brandAssets, brandUrl } from "../brand";
import {
  buildSeoMeta,
  buildOrganizationJsonLd,
  buildFaqJsonLd,
  injectJsonLdIntoHtml,
} from "../seo";
import { company } from "../company";
import { work } from "../work";
import { faq } from "../faq";

/** True when a JSON-LD node's @type (string or array) includes the given type. */
function hasType(node: Record<string, unknown>, type: string): boolean {
  const t = node["@type"];
  return Array.isArray(t) ? t.includes(type) : t === type;
}

describe("buildSeoMeta", () => {
  const meta = buildSeoMeta(company);

  it("leads the title with the brand and carries no trailing period", () => {
    expect(meta.title.startsWith(company.name)).toBe(true);
    expect(meta.title.endsWith(".")).toBe(false);
  });

  it("disambiguates the entity: title names the studio and the country", () => {
    expect(meta.title.toLowerCase()).toContain("software studio");
    expect(meta.title).toContain("South Africa");
  });

  it("description names the studio and the country", () => {
    expect(meta.description.toLowerCase()).toContain("software studio");
    expect(meta.description).toContain("South Africa");
  });

  it("uses the subhead as the description and the site url as canonical", () => {
    expect(meta.description).toBe(company.subhead);
    expect(meta.canonical).toBe(company.siteUrl);
  });
});

describe("buildOrganizationJsonLd", () => {
  const ld = buildOrganizationJsonLd(company, work) as Record<string, unknown>;
  const graph = ld["@graph"] as Record<string, unknown>[];
  const org = graph.find((n) => hasType(n, "Organization")) as Record<
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

  it("is typed as both Organization and ProfessionalService", () => {
    expect(hasType(org, "ProfessionalService")).toBe(true);
  });

  it("disambiguates away from transport/fleet dispatch software", () => {
    const d = String(org.disambiguatingDescription ?? "").toLowerCase();
    expect(d).toContain("software studio");
    expect(d).toContain("not");
    expect(d).toMatch(/transport|fleet|dispatch/);
  });

  it("knowsAbout names the studio's actual trade", () => {
    const knows = org.knowsAbout as string[];
    expect(knows).toContain("Custom Software Development");
    expect(knows).toContain("Web Application Development");
  });
});

describe("buildFaqJsonLd", () => {
  const ld = buildFaqJsonLd(faq) as Record<string, unknown>;

  it("is a schema.org FAQPage with one Question per faq entry", () => {
    expect(ld["@context"]).toBe("https://schema.org");
    expect(ld["@type"]).toBe("FAQPage");
    const main = ld.mainEntity as Record<string, unknown>[];
    expect(main).toHaveLength(faq.length);
    for (const q of main) {
      expect(q["@type"]).toBe("Question");
      expect(String(q.name).length).toBeGreaterThan(0);
      const a = q.acceptedAnswer as Record<string, unknown>;
      expect(a["@type"]).toBe("Answer");
      expect(String(a.text).length).toBeGreaterThan(40);
    }
  });
});

describe("faq content", () => {
  it("covers all seven search-intent categories with unique ids", () => {
    const intents = new Set(faq.map((f) => f.intent));
    for (const intent of [
      "education",
      "service-navigation",
      "comparison",
      "pricing",
      "support",
      "recommendation",
      "purchase",
    ]) {
      expect(intents.has(intent as (typeof faq)[number]["intent"])).toBe(true);
    }
    expect(new Set(faq.map((f) => f.id)).size).toBe(faq.length);
  });

  it("answers the education question by naming studio, country, and the non-TMS identity", () => {
    const edu = faq.find((f) => f.intent === "education");
    expect(edu).toBeDefined();
    const a = (edu?.answer ?? "").toLowerCase();
    expect(a).toContain("software studio");
    expect(a).toContain("south africa");
    expect(a).toMatch(/not .*(transport|fleet|dispatch)/);
  });
});

describe("work proof points", () => {
  it("every live product carries a concrete, citable proof line", () => {
    for (const w of work.filter((x) => x.status === "live")) {
      expect(w.proof.length).toBeGreaterThan(20);
    }
  });
});

describe("injectJsonLdIntoHtml", () => {
  it("inserts a single ld+json script immediately before </head>", () => {
    const html = "<html><head><title>x</title></head><body></body></html>";
    const out = injectJsonLdIntoHtml(html, [
      { "@context": "https://schema.org", "@type": "FAQPage" },
    ]);
    expect(out).toContain('<script type="application/ld+json">');
    expect(out.indexOf("</head>")).toBeGreaterThan(
      out.indexOf("application/ld+json"),
    );
    expect(out).toContain('"@type":"FAQPage"');
  });

  it("throws when the html has no head to inject into", () => {
    expect(() => injectJsonLdIntoHtml("<html></html>", [])).toThrow();
  });
});
