import { describe, expect, it } from "vitest";
import { getServiceById, services } from "../services";

describe("services registry", () => {
  it("lists commercial software capabilities for B2B buyers", () => {
    expect(services.length).toBeGreaterThanOrEqual(4);
    const blob = services.map((s) => `${s.title} ${s.summary}`).join(" ").toLowerCase();
    expect(blob).toMatch(/product|platform|saas|software|application/);
    expect(blob).toMatch(/engineer|build|design|deliver|architect/);
  });

  it("gives each service a unique id, title, summary, and outcomes", () => {
    const ids = new Set(services.map((s) => s.id));
    expect(ids.size).toBe(services.length);
    for (const service of services) {
      expect(service.title.length).toBeGreaterThan(3);
      expect(service.summary.length).toBeGreaterThan(30);
      expect(service.outcomes.length).toBeGreaterThanOrEqual(2);
    }
  });

  it("looks up services by id through the shipped accessor", () => {
    const first = services[0];
    expect(getServiceById(first.id)).toEqual(first);
    expect(getServiceById("does-not-exist")).toBeUndefined();
  });
});
