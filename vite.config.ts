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

// Structured data must live in static HTML because many search and answer-engine
// crawlers do not execute the client application. Organization data can appear
// site-wide; FAQ schema is only valid on the homepage where the FAQ is visible.
function staticJsonLd(): Plugin {
  return {
    name: "static-json-ld",
    transformIndexHtml(html, ctx) {
      const blocks = [buildOrganizationJsonLd(company, work)];
      if (ctx.path === "/" || ctx.path === "/index.html") {
        blocks.push(buildFaqJsonLd(faq));
      }
      return injectJsonLdIntoHtml(html, blocks);
    },
  };
}

// Vite + React + Tailwind v4. Build the SPA homepage plus crawlable static
// entries for high-value acquisition pages.
export default defineConfig({
  plugins: [react(), tailwindcss(), staticJsonLd()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL("./index.html", import.meta.url)),
        openSource: fileURLToPath(new URL("./open-source.html", import.meta.url)),
        engineeringPilot: fileURLToPath(
          new URL("./engineering-pilot.html", import.meta.url),
        ),
      },
    },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
