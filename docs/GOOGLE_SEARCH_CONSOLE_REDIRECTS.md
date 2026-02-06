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

---

## "Blocked by robots.txt"

If GSC reports **Blocked by robots.txt** for URLs such as:

- `/_next/static/css/...` (Next.js build assets)
- `/api/placeholder/...` (API routes)

this is **intentional**. Those paths are disallowed in [app/robots.ts](app/robots.ts) so that build artifacts and API endpoints are not indexed. They should remain non-indexed.

**In Search Console:** You can mark **Done fixing** for this issue. No code change is required; you are confirming that the current block is what you want.
