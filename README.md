# Vortex Dispatch — company website

Flagship marketing site for **Vortex Dispatch**, a commercial software studio that designs, builds, and ships product-grade software for businesses.

This package is **separate** from the Go VXD CLI at `../vortex-dispatch/`. The CLI may appear as a delivery capability; this site presents the company to prospective clients.

## Stack

- Next.js 16 (App Router) + React 19
- TypeScript (strict)
- Tailwind CSS v4
- Vitest for pure domain / SEO unit tests
- Deploy target: **Vercel**

## Project layout

```
app/                 Pages, layout, robots, sitemap, OG image
components/          Section UI (Nav, Hero, Services, Work, Process, Contact, Footer)
core/                Pure content & SEO domain (unit-tested)
  company.ts
  services.ts
  portfolio.ts
  process.ts
  seo.ts
  __tests__/
public/              Static assets (favicon)
```

Content and SEO helpers live in `core/` with no framework I/O so they stay unit-testable (SOLID-friendly wiring: pages compose, domain owns data).

## Develop

```bash
npm install
npm run dev          # http://localhost:3000
npm test             # Vitest domain suite
npm run typecheck
npm run build && npm start
```

## Content edits

| Change | File |
|---|---|
| Positioning, email, hero copy | `core/company.ts` |
| Service cards | `core/services.ts` |
| Portfolio / proof items | `core/portfolio.ts` |
| Process steps | `core/process.ts` |
| SEO builders | `core/seo.ts` |

## Live deployment

- **GitHub:** https://github.com/tzone85/vortex-dispatch-site
- **Production (Vercel):** https://vortex-dispatch-site.vercel.app
- **Auto-deploy:** Vercel project `vortex-dispatch-site` is linked to this repo. Pushes to `main` deploy **Production**; other branches get Preview deployments.

## Deploy on Vercel

Git integration is already configured (`vercel git connect` → `tzone85/vortex-dispatch-site`, production branch `main`).

1. Push to `main` for production (or open a PR for a preview URL).
2. Framework preset: **Next.js** (see `vercel.json`).
3. Set env var when the apex domain is ready:
   - `NEXT_PUBLIC_SITE_URL=https://vortexdispatch.co.za` (or your final domain)
4. Attach the custom domain in the Vercel project → Domains. DNS can stay at your registrar (xneelo): add the records Vercel shows (usually A / `cname.vercel-dns.com`).
5. Domain provisioning can take time; the `*.vercel.app` URL is enough until DNS propagates.

Manual CLI deploy still works: `vercel --prod` from this directory.

No backend is required for contact: CTAs use `mailto:hello@vortexdispatch.co.za`. Point that mailbox (or a forwarder) once mail DNS is configured.

## Verification

```bash
npm test
npm run build
npm start   # then curl http://localhost:3000 and assert brand + hero copy
```
