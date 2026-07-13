import { describe, expect, it } from "vitest";
import { company, navigation, primaryCta } from "../company";

describe("company profile", () => {
  it("presents Vortex Dispatch as a commercial software studio for businesses", () => {
    expect(company.brandName).toBe("Vortex Dispatch");
    expect(company.legalName).toContain("Vortex Dispatch");
    expect(company.positioning.toLowerCase()).toMatch(/commercial software|software solutions|software for/);
    expect(company.heroHeadline.length).toBeGreaterThan(20);
    expect(company.heroSubhead.length).toBeGreaterThan(40);
    expect(company.positioning).toMatch(/companies|businesses|clients/i);
  });

  it("exposes a working contact path for client outreach", () => {
    expect(company.email).toMatch(/^[^@]+@[^@]+\.[^@]+$/);
    expect(primaryCta.href).toMatch(/mailto:|contact|#contact/);
    expect(primaryCta.label.length).toBeGreaterThan(0);
  });

  it("ships a stable site URL base for SEO wiring", () => {
    expect(company.siteUrl).toMatch(/^https:\/\//);
  });
});

describe("navigation", () => {
  it("links primary sections used on the homepage", () => {
    const ids = navigation.map((item) => item.id);
    expect(ids).toEqual(
      expect.arrayContaining(["services", "work", "process", "contact"]),
    );
    for (const item of navigation) {
      expect(item.href.startsWith("#") || item.href.startsWith("/")).toBe(true);
      expect(item.label.length).toBeGreaterThan(0);
    }
  });
});
