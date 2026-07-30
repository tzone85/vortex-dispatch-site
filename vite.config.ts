/// <reference types="vitest/config" />
import { fileURLToPath, URL } from "node:url";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import {
  buildOrganizationJsonLd,
  buildFaqJsonLd,
  injectJsonLdIntoHtml,
} from "./src/core/seo";
import { company } from "./src/core/company";
import { work } from "./src/core/work";
import { faq } from "./src/core/faq";

// Structured data must live in the static HTML: most AI crawlers (GPTBot,
// ClaudeBot, PerplexityBot) never execute JavaScript, so client-side JSON-LD
// injection is invisible to them.
function staticJsonLd(): Plugin {
  return {
    name: "static-json-ld",
    transformIndexHtml(html) {
      return injectJsonLdIntoHtml(html, [
        buildOrganizationJsonLd(company, work),
        buildFaqJsonLd(faq),
      ]);
    },
  };
}

// Vite + React + Tailwind v4. Vitest runs the pure `core/` domain in a
// node environment — no DOM needed, since the studio keeps all logic in
// framework-free modules (SOLID: presentation depends on domain, not vice versa).
export default defineConfig({
  plugins: [react(), tailwindcss(), staticJsonLd()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
