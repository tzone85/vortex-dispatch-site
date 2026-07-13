import { describe, expect, it } from "vitest";
import { processSteps } from "../process";

describe("process steps", () => {
  it("describes a clear delivery path for commercial software work", () => {
    expect(processSteps.length).toBeGreaterThanOrEqual(3);
    const blob = processSteps.map((s) => `${s.title} ${s.description}`).join(" ");
    expect(blob.toLowerCase()).toMatch(/discover|scope|design|build|ship|launch|deliver/);
    for (const step of processSteps) {
      expect(step.id.length).toBeGreaterThan(0);
      expect(step.title.length).toBeGreaterThan(2);
      expect(step.description.length).toBeGreaterThan(30);
    }
  });
});
