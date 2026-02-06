# Google Search Console – setup and 404 resolution

## Summary: "Not found (404)" for 24 URLs

GSC reported **Not found (404)** for 24 URLs (mix of `https://www.openhousemarketplace.com/...` and `https://openhousemarketplace.com/...`). All of these paths exist as valid routes and allowlist entries in the codebase. The 404s are not caused by missing pages.

**Root cause:** Either (1) requests to the **non-www** host did not reach Vercel (e.g. apex domain not configured or DNS not pointing to Vercel), so the redirect never ran and another server returned 404, or (2) **historical crawls** (many "Last crawled" dates are Aug–Dec 2025) when the site or DNS was different.

**No route or allowlist changes** were made; resolution is configuration (Vercel + DNS) and recrawling.

---

## Checklist

Use this to ensure the canonical www site is crawlable and non-www redirects.

- **Vercel**
  - Add the apex domain `openhousemarketplace.com` to the project (in addition to `www.openhousemarketplace.com`).
  - Both hostnames should point to the same project so Vercel serves (and redirects) non-www to www.

- **DNS (Cloudflare)**
  - Apex and www should point to Vercel per [Vercel’s docs](https://vercel.com/docs/concepts/projects/domains).
  - Avoid configurations that could return 404 for the apex (e.g. wrong proxy target).

- **Sitemap**
  - URL: **https://www.openhousemarketplace.com/sitemap.xml**
  - All sitemap URLs use the www base (see [app/sitemap.ts](app/sitemap.ts)).
  - Audit note: Sitemap uses www base; all allowlist routes (main pages, neighborhoods, zips, resources, builders, legal) are included. No non-www URLs; no missing routes from the current tree.

- **Canonicals**
  - `metadataBase` in [app/layout.tsx](app/layout.tsx) is `https://www.openhousemarketplace.com`.
  - All page-level `alternates.canonical` use `https://www.openhousemarketplace.com/...`.
  - Audit note: No conflicting non-www canonicals.

- **Redirects**
  - [vercel.json](vercel.json): non-www host → `https://www.openhousemarketplace.com/:path*` (all paths).
  - [middleware.ts](middleware.ts): non-www and http → https www (belt-and-suspenders if the request hits Next.js).
  - GSC example URLs use no trailing slash; Next.js serves without trailing slash. No extra trailing-slash redirect required for these URLs.

- **Robots**
  - [app/robots.ts](app/robots.ts): sitemap is `https://www.openhousemarketplace.com/sitemap.xml`.
  - Disallow: `/api/`, `/admin/`, `/private/`, `/_next/`, `/node_modules/` — none of these match the GSC 404 paths (e.g. `/contact`, `/neighborhoods`, `/tour/mls`).

---

## Verification script

A script checks each GSC 404 example URL (both www and non-www) and records HTTP status, redirect chain, and final URL.

- **Path:** [scripts/verify-gsc-404s.ts](scripts/verify-gsc-404s.ts)
- **Run:** `pnpm run verify-gsc-404s` or `npx tsx scripts/verify-gsc-404s.ts`
- **Output:** Writes `scripts/gsc-404-report.md` with a table (URL, status, redirect chain, final URL) and summary counts of OK (200 or 301→200) vs failed.

Run this after changing DNS or Vercel domains to confirm non-www redirects and www URLs return 200.

---

## Resolution notes

- **2026-02-05:** 404 analysis completed. Verification script and audits added. No route or allowlist changes. Checklist and script documented in this file.

---

## Related docs

- [docs/GOOGLE_SEARCH_CONSOLE_REDIRECTS.md](GOOGLE_SEARCH_CONSOLE_REDIRECTS.md) – "Page with redirect" and "Blocked by robots.txt" (canonical domain, redirect behavior, robots disallow for `/api/` and `/_next/`).
