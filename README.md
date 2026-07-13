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
3. **Production env (already set):** `NEXT_PUBLIC_SITE_URL=https://vortexdispatch.co.za`
4. **Custom domains (already attached on Vercel):** `vortexdispatch.co.za` + `www` (www → apex 308).
5. **DNS at xneelo (konsoleH)** — keep nameservers on host-h / dns-h so mail can stay put. Update zone records:

| Host | Type | Value |
|---|---|---|
| `@` (apex) | **A** | `76.76.21.21` (and/or `216.198.79.1` / `64.29.17.1` if Vercel lists them) |
| `www` | **CNAME** | `5546f580c9809447.vercel-dns-017.com.` |

Remove the old parking **A** `41.203.18.177`. Do **not** point MX away if you use xneelo mail.

Verify: `vercel domains verify vortexdispatch.co.za` then open https://vortexdispatch.co.za

Manual CLI deploy still works: `vercel --prod` from this directory.

No backend is required for contact: CTAs use `mailto:hello@vortexdispatch.co.za`. Point that mailbox (or a forwarder) once mail DNS is configured.

## Verification

```bash
npm test
npm run build
npm start   # then curl http://localhost:3000 and assert brand + hero copy
```
