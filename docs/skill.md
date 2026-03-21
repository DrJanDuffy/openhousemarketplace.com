# Skill — Open House Market Place (technical)

Internal reference for **implementation** on this repo: stack, boundaries, and where to change behavior. Pair with [soul.md](./soul.md) for brand and voice.

## Stack

- **Framework:** Next.js 15 App Router, React, TypeScript, Tailwind CSS v4.
- **Deploy:** Vercel; DNS often Cloudflare **DNS-only** (gray cloud) — do not orange-cloud proxy to Vercel.
- **Build check:** Prefer `vercel build` for production parity (see workspace rules).

## Canonical URLs & env

- **Origin:** [`lib/site.ts`](../lib/site.ts) — `getSiteUrl()` ← `NEXT_PUBLIC_SITE_URL` → `NEXT_PUBLIC_APP_URL` → default `https://www.openhousemarketplace.com`.
- **Metadata helpers:** [`lib/metadata-utils.ts`](../lib/metadata-utils.ts) — `BASE_URL`, `getCanonicalUrl()`.

## SEO & structured data

- **Root metadata:** [`app/layout.tsx`](../app/layout.tsx) — `Metadata` API (not `next-seo`).
- **Sitemap / robots:** [`app/sitemap.ts`](../app/sitemap.ts), [`app/robots.ts`](../app/robots.ts).
- **JSON-LD:** [`components/GoogleEnhancement.tsx`](../components/GoogleEnhancement.tsx) (client, every route), [`components/StructuredData.tsx`](../components/StructuredData.tsx), [`components/WebSiteSchema.tsx`](../components/WebSiteSchema.tsx).
- **GBP / NAP / service area:** [`config/gbp.ts`](../config/gbp.ts) — single source; `OFFICE_GEO`, `GBP_SERVICE_AREA`, hours, special closures.

## Integrations

| Integration | Notes |
|-------------|--------|
| **RealScout** | Script once in layout pattern; widgets use `dangerouslySetInnerHTML` where applicable. **CSP:** `em.realscout.com` + `www.realscout.com` in `script-src` and `connect-src` — see [`lib/csp-header.mjs`](../lib/csp-header.mjs). |
| **Calendly** | Popup / inline widgets; badge script loaded with deferred strategy where configured. |
| **Google Analytics** | gtag in [`app/layout.tsx`](../app/layout.tsx); `afterInteractive` or as tuned for perf. |
| **Google Maps** | API key via env; Maps Platform embeds (My Maps, Commutes, Neighborhood Discovery) URLs in `lib/google-*.ts`. |
| **Follow Up Boss** | Server-side [`lib/followupboss-service.ts`](../lib/followupboss-service.ts); API keys in env. |
| **Claude / AI** | [`app/api/claude/route.ts`](../app/api/claude/route.ts), [`app/api/chat/route.ts`](../app/api/chat/route.ts); rate limit [`lib/rate-limit.ts`](../lib/rate-limit.ts). |

## Security

- **CSP:** [`lib/csp-header.mjs`](../lib/csp-header.mjs) + [`next.config.mjs`](../next.config.mjs). **Update when adding any new script, iframe, or API domain.**
- **Secrets:** Never commit `.env`; use Vercel project env.

## Boundaries (do not break without explicit approval)

- **`components/idx/*`:** MLS/IDX compliance — **do not modify** unless product owner explicitly requests.
- **GBP:** Business name in schema/copy is **Open House Market Place**; agent marketing may feature Dr. Jan Duffy — keep both consistent with legal/disclaimer pages.

## Performance (2026)

- Prefer **server components**; **dynamic** + `ssr: false` for heavy third-party (e.g. RealScout, deferred map embeds on home).
- **Images:** `next/image`, AVIF/WebP in [`next.config.mjs`](../next.config.mjs); remote patterns for known hosts only.
- **Maps iframes:** `loading="lazy"`; optional `deferEmbed` on homepage map section to protect LCP.

## Key files quick map

| Area | Path |
|------|------|
| Store / directions pin | [`data/storeLocations.ts`](../data/storeLocations.ts) |
| Footer NAP | [`components/Footer.tsx`](../components/Footer.tsx) |
| Header phone | [`components/SiteHeader.tsx`](../components/SiteHeader.tsx) |
| Homepage hero | [`components/SummerlinOpenHouseWebsite.tsx`](../components/SummerlinOpenHouseWebsite.tsx) |

## Docs

- [klb-vercel-playbook.md](./klb-vercel-playbook.md) — Vercel, env, CSP, GBP, greenfield checklist.

## Cursor (IDE)

- [`.cursor/rules/openhousemarketplace.mdc`](../.cursor/rules/openhousemarketplace.mdc) — always-on project rules for the AI agent (NAP, idx boundary, RealScout/CSP, App Router).
