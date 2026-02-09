# Site Audit – Optimization & Improvements

Summary of a site audit focused on conversion (private showings), SEO, accessibility, and consistency. Items marked **Done** were implemented; the rest are recommendations for future work.

---

## Completed (this audit)

- **CTA consistency:** All user-facing CTAs now use “Schedule a private showing” (or “Schedule a free consultation” only on the schedule-consultation page). Updated: about, schools, market-report, new-construction, open-house-signin, OpenHouseSignInForm.
- **Default metadata:** Root layout description now mentions “schedule a private showing” so SERPs align with site purpose.
- **Footer logo:** `alt="Open House Market Place"` for accessibility (was empty).
- **Calendly URL:** Removed duplicate `url` props from CalendlyInlineWidget where the default from `lib/calendly.ts` applies (about, SummerlinOpenHouseWebsite, etc.).

---

## Recommendations

### Performance

- **Images:** Hero/OG image at `/images/og/og-image.jpg` is referenced in layout; ensure the file exists (og folder had only .gitkeep). Use Next.js `Image` with `priority` for above-the-fold hero images where applicable.
- **LCP:** First property image in FeaturedOpenHouses already uses `priority={index === 0}`. Keep one priority image per listing view.
- **Bundle:** `optimizePackageImports: ['lucide-react']` is set in next.config; consider adding other large UI libs if used.

### SEO

- **Structured data:** LocalBusiness/RealEstateAgent and WebPage schema are in place via StructuredData and GoogleEnhancement. Optional: add `NEXT_PUBLIC_GOOGLE_BUSINESS_PROFILE_URL` for GBP `sameAs` (see `docs/SEO-GOOGLE-2026.md`).
- **Sitemap:** `app/sitemap.ts` includes main routes and neighborhood slugs; revalidate is daily. No change needed unless adding new route types.
- **Robots:** `/open-house-signin/` is disallowed; `/admin/`, `/api/` disallowed. Appropriate for current use.

### Accessibility

- **aria-expanded:** SiteHeader mobile menu button uses `aria-expanded={mobileOpen ? 'true' : 'false'}`; some linters flag the expression. Consider string literals if tooling requires it.
- **Focus:** Ensure Calendly popup and exit-intent modal restore focus on close (Calendly script typically handles this).
- **Contrast:** CTAs use #0069ff on white; verify contrast ratio (WCAG AA) if brand allows.

### Content & consistency

- **Year:** Open House Guide and metadata use 2026. “August 2024 NAR settlement” in copy is intentionally left as historical fact.
- **NAP:** Business name, address, phone match GBP usage in Footer and GoogleBusinessProfile.
- **Purpose:** `config/site.ts` defines `SITE_PURPOSE = 'Increase appointments for private showings.'` for future copy/feature alignment.

### Optional follow-ups

- **Done:** Listing cards “Schedule a private showing” now open Calendly (CalendlyPopupLink in FeaturedOpenHouses); RealScout action removed from card.
- Add `og-image.jpg` (1200×630) in `public/images/og/` when available—see `public/images/og/README.md`.
- Run Lighthouse (Performance, Accessibility, SEO, Best Practices) after deploy and fix any regressions.
- If listing cards “Schedule a private showing” should open Calendly instead of RealScout, switch the button in FeaturedOpenHouses to (already done—see “Done” bullet above).

---

*Last audit pass: 2026. Re-run after major feature or content changes.*
