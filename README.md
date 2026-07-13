# Vortex Dispatch — company site

The flagship one-page site for **Vortex Dispatch**, a commercial software studio.
A "night observatory" aesthetic: near-black obsidian, warm parchment ink, a
molten-copper accent, and a single cold signal-teal reserved for live states.
No purple, no neon, no system fonts.

- **Production:** https://vortexdispatch.co.za (+ `www`)
- **Host:** Vercel project `vortex-dispatch-site` (Git-integrated, branch `main`)
- **DNS:** xneelo (nameservers kept on host-h for mail); apex + `www` A-records → Vercel

## Stack

- **Vite 7 + React 19 + TypeScript** (strict)
- **Tailwind CSS v4** (`@tailwindcss/vite`), design-token layer in `src/index.css`
- **Vitest** for the pure domain + geometry
- Type: Bricolage Grotesque (display) · Instrument Serif (accent) · Hanken Grotesk (body) · JetBrains Mono (technical)

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # 29 unit tests — domain + SVG geometry
npm run typecheck  # strict, no errors
npm run build      # tsc --noEmit && vite build  ->  dist/
```

## Deploy

Vercel is Git-integrated: **push to `main` → production deploy**, other branches → preview.
Framework is pinned to Vite in `vercel.json` (`framework: "vite"`, output `dist/`).
No env vars required — `core/company.ts` hard-codes the canonical `siteUrl`.

The custom domain is already attached to the project and resolves via xneelo DNS,
so a production deploy serves `vortexdispatch.co.za` automatically — no DNS changes.

## Architecture (SOLID: domain owns data, components render it)

```
src/
  core/                 pure, framework-free domain — unit-tested, no React/DOM
    company · capabilities · work · process · principles · seo · geometry · types
    __tests__/          geometry / content / seo suites (29 tests)
  components/
    interactive/
      VortexField.tsx   signature hero vortex (SVG, driven by tested geometry)
      Starfield.tsx     deterministic seeded starfield
    Nav · Hero · SignalStrip · Capabilities · Work
    Process.tsx         hand-built SVG dispatch-pipeline diagram (no mermaid)
    Ethos · Contact · Footer · SectionHead · Reveal · JsonLd
    hooks.ts            useReveal (IntersectionObserver) + usePrefersReducedMotion
  App.tsx               composition only — a table of contents
  main.tsx              React entry
```

Every visual (vortex arcs, pipeline conduit, JSON-LD, all copy) is generated from
pure functions and data in `core/`. That is why 29 tests run in ~8ms with no DOM,
and the UI can be restyled without touching a single assertion.

## Diagrams (hand-authored SVG, no mermaid)

- **Hero vortex** — logarithmic-spiral arcs (`vortexArcs`) drawing inward to a bright
  core, with dispatched signal dots on a counter-rotating orbit.
- **Dispatch pipeline** — nodes laid out by `pipelineLayout`, joined by `pipelinePath`,
  with `dispatchDots` riding the path via SMIL `animateMotion`.

## Accessibility & motion

`prefers-reduced-motion` disables the vortex spin, travelling dots, and reveals.
Skip link, focus-visible rings, `aria-label`s on the decorative SVGs.

## Content edits

| Change | File |
|---|---|
| Positioning, hero copy, email | `core/company.ts` |
| Service cards | `core/capabilities.ts` |
| Portfolio | `core/work.ts` |
| Build stages | `core/process.ts` |
| Ethos statements | `core/principles.ts` |

## No backend (intentional)

Static single page. Contact is a `mailto:` to `hello@vortexdispatch.co.za` — point
that mailbox (or a forwarder) at xneelo mail.
