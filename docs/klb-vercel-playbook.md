# KLB / Dr. Duffy: Vercel + Next.js Playbook

Internal reference for **openhousemarketplace.com** and greenfield KLB sites. Prefer App Router native patterns over legacy SEO packages unless hosting constraints require otherwise.

## This repository (patterns)

| Concern | Location |
|--------|----------|
| Canonical origin | [`lib/site.ts`](../lib/site.ts) — `getSiteUrl()` reads `NEXT_PUBLIC_SITE_URL`, then `NEXT_PUBLIC_APP_URL`, then production default |
| Metadata & canonical helpers | [`lib/metadata-utils.ts`](../lib/metadata-utils.ts) — `BASE_URL`, `getCanonicalUrl()` |
| Root metadata | [`app/layout.tsx`](../app/layout.tsx) — `Metadata` API (not `next-seo`) |
| Sitemap / robots | [`app/sitemap.ts`](../app/sitemap.ts), [`app/robots.ts`](../app/robots.ts) |
| JSON-LD (runtime) | [`components/StructuredData.tsx`](../components/StructuredData.tsx), [`components/WebSiteSchema.tsx`](../components/WebSiteSchema.tsx), [`components/GoogleEnhancement.tsx`](../components/GoogleEnhancement.tsx) |
| GBP / NAP | [`config/gbp.ts`](../config/gbp.ts) |
| Type-safe JSON-LD helpers | [`lib/schema/neighborhood.ts`](../lib/schema/neighborhood.ts) (`schema-dts`) |
| Claude (non-streaming) | [`app/api/claude/route.ts`](../app/api/claude/route.ts) |
| Claude (streaming, Vercel AI SDK) | [`app/api/chat/route.ts`](../app/api/chat/route.ts) — `streamText` + `toUIMessageStreamResponse()` |
| Rate limiting (API) | [`lib/rate-limit.ts`](../lib/rate-limit.ts) |

## Environment variables (Vercel)

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Optional override of public origin (no trailing slash); preview deployments |
| `NEXT_PUBLIC_APP_URL` | Fallback if `NEXT_PUBLIC_SITE_URL` unset (see [`vercel.json`](../vercel.json)) |
| `ANTHROPIC_API_KEY` | Required for `/api/claude` and `/api/chat` |
| `ANTHROPIC_MODEL` | Optional; defaults to `claude-sonnet-4-20250514` |

Do not commit secrets. `.env.local` is gitignored.

## Greenfield checklist (new repos)

1. **Bootstrap** — `create-next-app` (TypeScript, Tailwind, App Router); GitHub; `vercel link`; set env in Vercel.
2. **Dependencies** — Add AI packages only if needed: `@anthropic-ai/sdk`, `ai`, `@ai-sdk/anthropic`; optional `schema-dts`.
3. **SEO** — Use `metadata` in `layout.tsx` and `generateMetadata` on routes. Avoid `next-seo` in App Router unless you accept duplicate-meta risk.
4. **Sitemap** — Prefer `app/sitemap.ts` + `app/robots.ts`. Use `next-sitemap` only if you need static XML in `public/` or non-Next hosting.
5. **JSON-LD** — Single NAP source matching GBP; optional `schema-dts` for helpers at scale.
6. **AI routes** — Server Route Handlers only; validate inputs (e.g. Zod); rate-limit public endpoints; store `ANTHROPIC_API_KEY` in Vercel.
7. **Cloudflare + Vercel** — DNS-only (gray cloud) to avoid double TLS; SSL Full (strict); cache bypass or conservative rules for `/api/*`; public URL env without trailing slash.
8. **Deploy** — Push to main → build → verify `/sitemap.xml`, `/robots.txt`, key pages; smoke-test AI routes if enabled.

## Next.js 16 upgrade (separate track)

This project targets **Next.js 15.x** (see `package.json`). Moving to Next 16 is a **dedicated upgrade**: follow the [official upgrade guide](https://nextjs.org/docs/app/building-your-application/upgrading), run `pnpm run build:vercel` or `vercel build`, fix breaking changes, and re-check middleware, `metadata`, and ESLint. Do not upgrade solely to chase a CVE without confirming advisories for your current minor line.

## Intentionally not used here

- **`next-seo`** — Conflicts with App Router `Metadata` / duplicate tags.
- **`next-sitemap` postbuild** — Replaced by native sitemap convention.
