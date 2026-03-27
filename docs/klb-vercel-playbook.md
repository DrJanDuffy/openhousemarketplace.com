# KLB / Dr. Duffy: Vercel + Next.js Playbook

Internal reference for **openhousemarketplace.com** and greenfield KLB sites. Prefer App Router native patterns over legacy SEO packages unless hosting constraints require otherwise.

**Brand & implementation context:** [soul.md](./soul.md) (voice, NAP, audience) and [skill.md](./skill.md) (stack, integrations, boundaries). Root [AGENTS.md](../AGENTS.md) points agents here.

**Google Search Console + Google Business Profile:** [gsc-gbp-runbook.md](./gsc-gbp-runbook.md) — GSC www property checklist, GBP field alignment with [`config/gbp.ts`](../config/gbp.ts), repo file map, sitemap coverage notes.

## This repository (patterns)

| Concern | Location |
|--------|----------|
| Canonical origin | [`lib/site.ts`](../lib/site.ts) — `getSiteUrl()` reads `NEXT_PUBLIC_SITE_URL`, then `NEXT_PUBLIC_APP_URL`, then production default |
| Metadata & canonical helpers | [`lib/metadata-utils.ts`](../lib/metadata-utils.ts) — `BASE_URL`, `getCanonicalUrl()` |
| Root metadata | [`app/layout.tsx`](../app/layout.tsx) — `Metadata` API (not `next-seo`) |
| Sitemap / robots | [`app/sitemap.ts`](../app/sitemap.ts), [`app/robots.ts`](../app/robots.ts) |
| GSC + GBP operations | [gsc-gbp-runbook.md](./gsc-gbp-runbook.md) |
| JSON-LD (runtime) | [`components/StructuredData.tsx`](../components/StructuredData.tsx), [`components/WebSiteSchema.tsx`](../components/WebSiteSchema.tsx), [`components/GoogleEnhancement.tsx`](../components/GoogleEnhancement.tsx) |
| GBP / NAP | [`config/gbp.ts`](../config/gbp.ts) |
| Type-safe JSON-LD helpers | [`lib/schema/neighborhood.ts`](../lib/schema/neighborhood.ts) (`schema-dts`) |
| Claude (non-streaming) | [`app/api/claude/route.ts`](../app/api/claude/route.ts) |
| Claude (streaming, Vercel AI SDK) | [`app/api/chat/route.ts`](../app/api/chat/route.ts) — `streamText` + `toUIMessageStreamResponse()` |
| Rate limiting (API) | [`lib/rate-limit.ts`](../lib/rate-limit.ts) |
| My Maps / Maps Platform embeds | [`components/GoogleMyMapsEmbed.tsx`](../components/GoogleMyMapsEmbed.tsx), [`components/GoogleMapsCommutesEmbed.tsx`](../components/GoogleMapsCommutesEmbed.tsx), [`components/GoogleMapsNeighborhoodDiscoveryEmbed.tsx`](../components/GoogleMapsNeighborhoodDiscoveryEmbed.tsx) |
| Service area + office geo | [`config/gbp.ts`](../config/gbp.ts) — `GBP_SERVICE_AREA`, `OFFICE_GEO`, `getAreaServedJsonLd()`, `getGoogleMapsDirectionsUrlToOffice()` |

## GBP maintenance (hyperlocal)

- **Service area:** When you set **Service area** in Google Business Profile, mirror the same wording in `GBP_SERVICE_AREA.label` in [`config/gbp.ts`](../config/gbp.ts) (footer + contact card + JSON-LD alignment).
- **Office pin / directions:** `OFFICE_GEO` and encoded directions URL stay tied to the street address in `GBP.address`.
- **Special hours:** Closed dates live in `GBP.specialHoursClosed`; remove dates after they pass (e.g. Easter).
- **Description:** When you add a **Description** in GBP, consider aligning `GBP.description` for schema parity.

## Environment variables (Vercel)

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Optional override of public origin (no trailing slash); preview deployments |
| `NEXT_PUBLIC_APP_URL` | Fallback if `NEXT_PUBLIC_SITE_URL` unset (see [`vercel.json`](../vercel.json)) |
| `ANTHROPIC_API_KEY` | Required at runtime for `/api/claude` and `/api/chat` (reads `process.env.ANTHROPIC_API_KEY`) |
| `ANTHROPIC_MODEL` | Optional; defaults to `claude-sonnet-4-20250514` |
| `NEXT_PUBLIC_GOOGLE_MY_MAPS_EMBED_URL` | Optional; overrides default My Maps iframe URL ([`lib/google-my-maps.ts`](../lib/google-my-maps.ts)) |
| `NEXT_PUBLIC_GOOGLE_MAPS_COMMUTES_EMBED_URL` | Optional; Commutes solution HTML ([`lib/google-maps-commutes.ts`](../lib/google-maps-commutes.ts)) |
| `NEXT_PUBLIC_GOOGLE_MAPS_NEIGHBORHOOD_DISCOVERY_EMBED_URL` | Optional; Neighborhood Discovery HTML ([`lib/google-maps-neighborhood-discovery.ts`](../lib/google-maps-neighborhood-discovery.ts)) |
| `FOLLOWUPBOSS_API_KEY` | **Optional.** Calendly is primary for scheduling/leads UX; no FUB key is required. Set only if you enable server-side CRM sync ([`lib/followupboss-service.ts`](../lib/followupboss-service.ts), [`app/api/leads/route.ts`](../app/api/leads/route.ts), open-house hooks). |
| `FOLLOWUPBOSS_BASE_URL` | Optional; defaults to `https://api.followupboss.com/v1` |

If the key is already defined in **Vercel** (e.g. team-level or shared “global” environment variables), you do **not** need to add it again on this project—Vercel injects it into builds and serverless functions the same way. Use `.env.local` only for local development.

Do not commit secrets. `.env.local` is gitignored.

## Greenfield checklist (new repos)

1. **Bootstrap** — `create-next-app` (TypeScript, Tailwind, App Router); GitHub; `vercel link`; set env in Vercel.
2. **Dependencies** — Add AI packages only if needed: `@anthropic-ai/sdk`, `ai`, `@ai-sdk/anthropic`; optional `schema-dts`.
3. **SEO** — Use `metadata` in `layout.tsx` and `generateMetadata` on routes. Avoid `next-seo` in App Router unless you accept duplicate-meta risk.
4. **Sitemap** — Prefer `app/sitemap.ts` + `app/robots.ts`. Use `next-sitemap` only if you need static XML in `public/` or non-Next hosting.
5. **JSON-LD** — Single NAP source matching GBP; optional `schema-dts` for helpers at scale.
6. **AI routes** — Server Route Handlers only; validate inputs (e.g. Zod); rate-limit public endpoints; ensure `ANTHROPIC_API_KEY` is available in the deployment environment (project or shared/global Vercel env).
7. **Cloudflare + Vercel** — DNS-only (gray cloud) to avoid double TLS; SSL Full (strict); cache bypass or conservative rules for `/api/*`; public URL env without trailing slash.
8. **Deploy** — Push to main → build → verify `/sitemap.xml`, `/robots.txt`, key pages; smoke-test AI routes if enabled.

## Next.js 16 upgrade (separate track)

This project targets **Next.js 15.x** (see `package.json`). Moving to Next 16 is a **dedicated upgrade**: follow the [official upgrade guide](https://nextjs.org/docs/app/building-your-application/upgrading), run `pnpm run build:vercel` or `vercel build`, fix breaking changes, and re-check middleware, `metadata`, and ESLint. Do not upgrade solely to chase a CVE without confirming advisories for your current minor line.

## Content-Security-Policy

- Policy is built in [`lib/csp-header.mjs`](../lib/csp-header.mjs) and sent via [`next.config.mjs`](../next.config.mjs) (`Content-Security-Policy` header).
- When adding scripts, iframes, or new third-party domains, update **script-src**, **connect-src**, and **frame-src** there. RealScout requires **both** `em.realscout.com` and `www.realscout.com` in **script-src** and **connect-src** (see workspace rules).
- `unsafe-inline` / `unsafe-eval` are required for Next.js + inline analytics today; stricter setups use nonces (separate migration).

## Intentionally not used here

- **`next-seo`** — Conflicts with App Router `Metadata` / duplicate tags.
- **`next-sitemap` postbuild** — Replaced by native sitemap convention.

## Google Search Console — "Page with redirect"

If GSC lists non-www or HTTP URLs under **Page with redirect**, that is usually **expected** for a www-canonical site. See [GOOGLE_SEARCH_CONSOLE_REDIRECTS.md](GOOGLE_SEARCH_CONSOLE_REDIRECTS.md) for interpretation, a **www-property checklist**, curl verification, why **Validate fix** often fails for intentional redirects, and **Crawled - currently not indexed** on non-www URLs (e.g. `openhousemarketplace.com/neighborhoods/...`).
