# Google Search Console + Google Business Profile runbook

Operational checklist for **openhousemarketplace.com** (canonical **`https://www.openhousemarketplace.com`**). Technical implementation lives in the repo; GSC and GBP are managed in Google’s UIs.

**Single source of truth for NAP, hours, and service-area copy:** [`config/gbp.ts`](../config/gbp.ts). The site footer imports [`GBP`](../config/gbp.ts) — keep visible copy and JSON-LD aligned with that file.

**Related:** [GOOGLE_SEARCH_CONSOLE_REDIRECTS.md](./GOOGLE_SEARCH_CONSOLE_REDIRECTS.md) (redirects, “Validate fix”, non-www property noise).

---

## Official Google references

| Topic | Link |
|--------|------|
| Top tasks (Search Console) | [Search Console Help](https://support.google.com/webmasters/answer/10351509) |
| Build and submit a sitemap | [Google Search Central](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) |
| Sitemaps report (GSC) | [Search Console Help](https://support.google.com/webmasters/answer/7451001) |
| Google Business Profile help | [Business Profile Help](https://support.google.com/business/) |

---

## Repository map (SEO / entity)

| Concern | Location |
|--------|----------|
| Canonical origin | [`lib/site.ts`](../lib/site.ts) — `getSiteUrl()` |
| Per-URL canonical | [`lib/metadata-utils.ts`](../lib/metadata-utils.ts), each `app/**/page.tsx` `metadata` |
| Sitemap | [`app/sitemap.ts`](../app/sitemap.ts) |
| robots.txt | [`app/robots.ts`](../app/robots.ts) |
| Redirects (apex / http → www) | [`middleware.ts`](../middleware.ts), [`vercel.json`](../vercel.json) |
| Sitewide JSON-LD (LocalBusiness + WebPage) | [`components/GoogleEnhancement.tsx`](../components/GoogleEnhancement.tsx) |
| WebSite + Organization | [`components/WebSiteSchema.tsx`](../components/WebSiteSchema.tsx) |
| GSC verification meta tag | [`app/layout.tsx`](../app/layout.tsx) — `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` (Vercel env) |
| Automated 404 / redirect checks | [`scripts/verify-gsc-404s.ts`](../scripts/verify-gsc-404s.ts) (`npm run verify-gsc-404s`) |

---

## Google Search Console (www property)

Use a property whose primary URL **matches the sitemap host** (`https://www.openhousemarketplace.com`). Submit: **`https://www.openhousemarketplace.com/sitemap.xml`**.

### Verification checklist (do in GSC)

1. **Property** — Prefer **URL-prefix** `https://www.openhousemarketplace.com/` (or domain property that includes `www`) as the main monitoring surface.
2. **Ownership** — Confirm verification; if using the HTML tag method, set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` in Vercel and redeploy.
3. **Sitemaps** — Submit `sitemap.xml`; in the Sitemaps report, confirm **Success** / no persistent fetch errors.
4. **URL Inspection** — Test **canonical www URLs** only for indexing decisions (e.g. `/`, `/open-houses`, `/contact`, key neighborhood URLs). Expect **HTTP**, **apex**, and **`/index`** variants to **redirect** to www — see [GOOGLE_SEARCH_CONSOLE_REDIRECTS.md](./GOOGLE_SEARCH_CONSOLE_REDIRECTS.md).
5. **Indexing reports** — “Discovered – currently not indexed” is often crawl queue / priority, not a single code bug. “Page with redirect” for **http**/**apex**/**/index** is **expected** when consolidating to `https://www`.
6. **Do not rely on “Validate fix”** for intentional redirect sources — see [GOOGLE_SEARCH_CONSOLE_REDIRECTS.md](./GOOGLE_SEARCH_CONSOLE_REDIRECTS.md).
7. **Core Web Vitals / Page experience** — Monitor trends; fix regressions without weakening CSP (see [`lib/csp-header.mjs`](../lib/csp-header.mjs) and [`docs/klb-vercel-playbook.md`](./klb-vercel-playbook.md)).

### Smoke checks (local or CI)

After deploy:

- `GET https://www.openhousemarketplace.com/sitemap.xml` — **200**, XML, absolute `https://www` URLs.
- `GET https://www.openhousemarketplace.com/robots.txt` — **200**, references `Sitemap: https://www.openhousemarketplace.com/sitemap.xml` (via [`app/robots.ts`](../app/robots.ts)).

Optional: `npm run verify-gsc-404s` — exercises www and non-www paths for **404** and redirect chains.

---

## Google Business Profile (dashboard)

All fields below should match **[`config/gbp.ts`](../config/gbp.ts)** and the live site (footer uses `GBP`).

### Checklist

| Field | Action |
|--------|--------|
| **Website** | Set to **`https://www.openhousemarketplace.com/`** (same as `GBP_WEBSITE_FIELD_URL` / `getSiteUrl()`). |
| **Name / category** | Match `GBP.name` and `GBP.category` (see comments in `gbp.ts`). |
| **Phone** | Match `GBP.phone` / `GBP.phoneE164`. |
| **Address** | Match `GBP.address` (street, city, state, ZIP). |
| **Hours** | Match `GBP.hours` schema; fix any typos in GBP (e.g. wrong AM/PM). |
| **Special hours** | Mirror `GBP.specialHoursClosed`; remove past dates from code after the holiday. |
| **Service area** | When set in GBP, mirror wording in `GBP_SERVICE_AREA.label`. |
| **Description** | Align or complement `GBP.description` for schema parity. |
| **Photos / posts / reviews** | Follow Google’s GBP guidance (regular photos, posts, review responses). |

---

## Sitemap coverage (marketing vs excluded routes)

[`app/sitemap.ts`](../app/sitemap.ts) lists **marketing** URLs only. **Excluded** from the sitemap (by design):

| Route pattern | Reason |
|----------------|--------|
| `/admin/*` | Admin UI; [`app/admin/layout.tsx`](../app/admin/layout.tsx) uses `noindex`. |
| `/test-form` | Internal test; [`app/test-form/layout.tsx`](../app/test-form/layout.tsx) uses `noindex`. |
| `/open-house-signin/*` | Sign-in flows; not primary search landing pages. |

When adding a new **public** marketing page under `app/`, add its URL to [`app/sitemap.ts`](../app/sitemap.ts) if it should be discovered via the sitemap.

---

## Success criteria (summary)

- **GSC (www):** Sitemap submitted and readable; priority www URLs return **200** and show correct `canonical` in URL Inspection.
- **GBP:** Website, NAP, hours, and service area match [`config/gbp.ts`](../config/gbp.ts).
- **Code:** One canonical host, no conflicting `robots` / sitemap signals, JSON-LD from a single NAP source.
