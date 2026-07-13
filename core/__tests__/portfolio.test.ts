import { describe, expect, it } from "vitest";
import { getPortfolioById, portfolio } from "../portfolio";

describe("portfolio registry", () => {
  it("includes commercial products from the workspace as proof", () => {
    const names = portfolio.map((p) => p.name.toLowerCase());
    expect(names.some((n) => n.includes("shiftsavvy"))).toBe(true);
    expect(names.some((n) => n.includes("foundersdesk"))).toBe(true);
    expect(names.some((n) => n.includes("mini suites") || n.includes("minisuites"))).toBe(
      true,
    );
    expect(portfolio.length).toBeGreaterThanOrEqual(5);
  });

  it("describes each entry with category, summary, stack, and highlight", () => {
    const ids = new Set(portfolio.map((p) => p.id));
    expect(ids.size).toBe(portfolio.length);
    for (const item of portfolio) {
      expect(item.category.length).toBeGreaterThan(2);
      expect(item.summary.length).toBeGreaterThan(40);
      expect(item.stack.length).toBeGreaterThanOrEqual(2);
      expect(item.highlight.length).toBeGreaterThan(10);
    }
  });

  it("looks up portfolio items by id through the shipped accessor", () => {
    const first = portfolio[0];
    expect(getPortfolioById(first.id)).toEqual(first);
    expect(getPortfolioById("missing")).toBeUndefined();
  });
});
