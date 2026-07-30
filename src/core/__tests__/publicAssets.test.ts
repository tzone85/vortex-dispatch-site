import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath, URL } from "node:url";

/**
 * Guards the crawler-facing files in public/. These are what AI engines see
 * (most AI crawlers do not execute JavaScript), so a silent regression here
 * undoes the whole entity-disambiguation effort.
 */
function readPublic(name: string): string {
  return readFileSync(
    fileURLToPath(new URL(`../../../public/${name}`, import.meta.url)),
    "utf-8",
  );
}

describe("public/robots.txt", () => {
  const robots = readPublic("robots.txt");

  it("allows the current generation of AI crawlers by name", () => {
    for (const bot of [
      "GPTBot",
      "OAI-SearchBot",
      "ChatGPT-User",
      "ClaudeBot",
      "PerplexityBot",
      "Perplexity-User",
      "Google-Extended",
      "meta-externalagent",
    ]) {
      expect(robots).toContain(`User-agent: ${bot}`);
    }
  });

  it("sets no crawl delay", () => {
    expect(robots.toLowerCase()).not.toContain("crawl-delay");
  });

  it("still points at the sitemap", () => {
    expect(robots).toContain("Sitemap: https://vortexdispatch.co.za/sitemap.xml");
  });
});

describe("public/llms.txt", () => {
  const llms = readPublic("llms.txt");

  it("states the studio identity and location", () => {
    expect(llms.toLowerCase()).toContain("software studio");
    expect(llms).toContain("South Africa");
  });

  it("disambiguates away from transport/fleet dispatch software", () => {
    expect(llms.toLowerCase()).toMatch(/not .*(transport|fleet|dispatch)/);
  });

  it("carries the canonical url and contact email", () => {
    expect(llms).toContain("https://vortexdispatch.co.za");
    expect(llms).toContain("hello@vortexdispatch.co.za");
  });

  it("links the live portfolio", () => {
    expect(llms).toContain("https://minisuites.co.za");
    expect(llms).toContain("https://foundersdesk.co.za");
  });
});
