# Google Search Console – "Page with redirect" and indexing

## Domain setup

- **Primary domain:** **https://www.openhousemarketplace.com** (with `www`) — this is the canonical domain for indexing and branding.
- **Both hostnames in use:** Users and links may use either `openhousemarketplace.com` or `www.openhousemarketplace.com`. Traffic that arrives on non-www (or HTTP) is redirected to the primary www URL so there is a single canonical version in search.

## Why you see "Page with redirect"

The site is configured so **https://www.openhousemarketplace.com** is the only canonical domain. All other variants redirect to it with a **301 (permanent)** redirect:

- `http://openhousemarketplace.com/*` → `https://www.openhousemarketplace.com/*`
- `https://openhousemarketplace.com/*` → `https://www.openhousemarketplace.com/*`
- `http://www.openhousemarketplace.com/*` → `https://www.openhousemarketplace.com/*`

So when Google crawls the non‑www or HTTP URLs, it gets a redirect. Google **does not index the redirecting URL**; it indexes the **destination** (the www URL). That’s correct behavior.

In GSC, "Page with redirect" means: *these URLs redirect, so they are not indexed*. The **8 “affected” URLs** in your report are the **redirect sources**. They are not supposed to be indexed; the **www** versions are.

## What "Validation Failed" means here

If you ran **Validate fix** for this issue, validation can still show as failed because:

- The “fix” Google tests is whether those URLs can be indexed.
- They still redirect by design, so they still aren’t indexed.
- So the “affected” count doesn’t go to zero, and validation appears to fail.

That’s expected. The goal is not to index the redirecting URLs; it’s to have the **canonical www** URLs indexed.

### Do not rely on "Validate fix" for redirect sources

For **Page with redirect** issues where the redirect is **intentional** (consolidation to `https://www`), **do not expect** Google’s **Validate fix** to pass. The tool checks whether the listed URLs become indexable; they should **keep** redirecting. Treat this document as the source of truth for that behavior. In GSC you may use **Dismiss** / acknowledge the issue, or focus on the **www** property indexing (below) instead of clearing the redirect report.

## Manual verification checklist (www property)

Complete these in Search Console for **`https://www.openhousemarketplace.com`** (not the bare-domain property):

1. Open **Indexing → Pages** (or **Page indexing**).
2. Confirm the homepage and priority URLs show **Indexed** — e.g. `/`, `/open-houses`, `/neighborhoods/the-ridges`, `/neighborhoods/summerlin-centre`, `/neighborhoods/sun-city-summerlin`, `/neighborhoods/red-rock-country-club`.
3. Use **URL Inspection** only on **canonical** URLs (`https://www.openhousemarketplace.com/...`). Do not use inspection on `http://` or `https://openhousemarketplace.com/...` as the primary signal; those are expected to report a redirect.
4. If a **www** URL is not indexed, request indexing for that **www** URL after confirming it returns **200** and matches your `robots`/metadata rules.
5. Ensure **Sitemaps** includes `https://www.openhousemarketplace.com/sitemap.xml`.

## What to do in Search Console

1. **Use the correct property**
   - Add (or use) a property for the **canonical** domain: **`https://www.openhousemarketplace.com`**.
   - You can keep a property for `openhousemarketplace.com` (no www) to monitor; it will keep showing "Page with redirect" for the same URLs. That’s normal.

2. **Check indexing for www**
   - In the **www** property, open **Pages** (or **Indexing** → **Pages**).
   - Confirm that **https://www.openhousemarketplace.com/** and important URLs (e.g. `/open-houses`, `/neighborhoods/...`) are **Indexed**, not "Redirect" or "Excluded".

3. **Request indexing for key www URLs** (if needed)
   - Use **URL Inspection** for the canonical URL (e.g. `https://www.openhousemarketplace.com/`).
   - Click **Request indexing** so Google recrawls the **destination** URL.

4. **Submit the sitemap in the www property**
   - Sitemap URL: **https://www.openhousemarketplace.com/sitemap.xml**
   - All URLs in the sitemap are already **https://www.openhousemarketplace.com/...**, so Google discovers the canonical versions.

## Technical reference (this repo)

- **Canonical base:** `https://www.openhousemarketplace.com` (see `app/layout.tsx`, `middleware.ts`, `app/sitemap.ts`, `app/robots.ts`).
- **Redirects:** `vercel.json` (non‑www → www) and `middleware.ts` (http and non‑www → https www).
- **Sitemap / robots:** `app/sitemap.ts` and `app/robots.ts` use the same base URL.

No code change is required for "Page with redirect"; the setup is correct. Use the **www** property and the sitemap to get the canonical pages indexed.

## Automated redirect check (curl)

Use these to confirm non-www and HTTP URLs resolve to **https://www** (Vercel may use **301**, **307**, or **308**; all are acceptable for permanent consolidation):

```bash
curl -sI "http://openhousemarketplace.com/"
curl -sI "https://openhousemarketplace.com/open-houses"
curl -sI "http://www.openhousemarketplace.com/"
curl -sI "https://www.openhousemarketplace.com/index"
curl -sI "https://www.openhousemarketplace.com/"
```

**Last verified (repo check):** Non-www and HTTP requests return redirects toward `https://www.openhousemarketplace.com/...`; `/index` returns **301** with `Location: /` on www; the www homepage returns **200 OK**.

---

## "Crawled - currently not indexed" (non-www URL)

If GSC lists a URL like **`https://openhousemarketplace.com/neighborhoods/summerlin-centre`** (hostname **without** `www`) under **Crawled - currently not indexed**, that is usually **consistent with canonical consolidation**:

- The hostname **`openhousemarketplace.com`** is not the indexed duplicate; **`www.openhousemarketplace.com`** is.
- Google may crawl the non-www URL, follow the redirect to **www**, and **not** index the non-www URL as its own document. The page you care about for search is **`https://www.openhousemarketplace.com/neighborhoods/summerlin-centre`**.

**What to do:**

1. In URL Inspection, test **`https://www.openhousemarketplace.com/neighborhoods/summerlin-centre`** (www). Confirm **Indexing allowed**, **User-declared canonical** matches **Google-selected canonical** (both should prefer **www**).
2. Confirm the page is listed in [app/sitemap.ts](app/sitemap.ts) under the **www** base (it includes `summerlin-centre` in the neighborhoods list).
3. If the **www** URL is indexed and healthy, you can mark **Done fixing** for the non-www report row, or ignore it as duplicate-host noise in a non-www property.

If the **www** URL itself shows **Crawled - currently not indexed** or **Excluded**, investigate that URL (content quality, `noindex`, robots, manual actions)—not the non-www copy alone.

---

## "Blocked by robots.txt"

If GSC reports **Blocked by robots.txt** for URLs such as:

- `/_next/static/css/...` (Next.js build assets)
- `/api/placeholder/...` (API routes)

this is **intentional**. Those paths are disallowed in [app/robots.ts](app/robots.ts) so that build artifacts and API endpoints are not indexed. They should remain non-indexed.

**In Search Console:** You can mark **Done fixing** for this issue. No code change is required; you are confirming that the current block is what you want.
