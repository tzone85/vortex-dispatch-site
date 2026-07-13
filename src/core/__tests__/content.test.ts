import { describe, it, expect } from "vitest";
import { company, primaryCta, secondaryCta, navigation } from "../company";
import { capabilities } from "../capabilities";
import { work } from "../work";
import { pipeline } from "../process";
import { principles } from "../principles";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function uniqueIds(items: readonly { id: string }[]): boolean {
  return new Set(items.map((i) => i.id)).size === items.length;
}

describe("company profile", () => {
  it("carries a valid contact email", () => {
    expect(company.email).toMatch(EMAIL);
  });

  it("keeps a headline and a distinct accent fragment for the hero", () => {
    expect(company.headline.length).toBeGreaterThan(8);
    expect(company.headlineAccent.length).toBeGreaterThan(2);
  });

  it("builds a mailto CTA that pre-fills a subject", () => {
    expect(primaryCta.mailto).toContain(`mailto:${company.email}`);
    expect(primaryCta.mailto).toContain("subject=");
  });

  it("points the secondary CTA at an on-page anchor", () => {
    expect(secondaryCta.href.startsWith("#")).toBe(true);
  });

  it("exposes navigation whose hrefs are all in-page anchors", () => {
    expect(navigation.length).toBeGreaterThanOrEqual(3);
    for (const item of navigation) expect(item.href.startsWith("#")).toBe(true);
  });
});

describe("capabilities", () => {
  it("offers a focused set of services with unique ids", () => {
    expect(capabilities.length).toBeGreaterThanOrEqual(3);
    expect(uniqueIds(capabilities)).toBe(true);
  });

  it("gives every capability a zero-padded index and at least two deliverables", () => {
    for (const c of capabilities) {
      expect(c.index).toMatch(/^\d{2}$/);
      expect(c.deliverables.length).toBeGreaterThanOrEqual(2);
    }
  });
});

describe("selected work", () => {
  it("has unique ids and shows range across domains", () => {
    expect(uniqueIds(work)).toBe(true);
    const domains = new Set(work.map((w) => w.domain));
    expect(domains.size).toBeGreaterThanOrEqual(4);
  });

  it("labels every item live or in-build and dates it plausibly", () => {
    for (const w of work) {
      expect(["live", "in-build"]).toContain(w.status);
      expect(w.year).toBeGreaterThanOrEqual(2023);
      expect(w.stack.length).toBeGreaterThanOrEqual(1);
    }
  });

  it("only attaches https links when present", () => {
    for (const w of work) {
      if (w.href) expect(w.href.startsWith("https://")).toBe(true);
    }
  });
});

describe("build pipeline", () => {
  it("is an ordered five-stage flow", () => {
    expect(pipeline).toHaveLength(5);
    pipeline.forEach((stage, i) => expect(stage.index).toBe(i));
  });

  it("names TDD somewhere in the flow (it is the point of the studio)", () => {
    const joined = pipeline.map((s) => `${s.title} ${s.detail}`).join(" ").toLowerCase();
    expect(joined).toMatch(/test|tdd/);
  });
});

describe("principles", () => {
  it("states at least three with unique ids", () => {
    expect(principles.length).toBeGreaterThanOrEqual(3);
    expect(uniqueIds(principles)).toBe(true);
  });
});
