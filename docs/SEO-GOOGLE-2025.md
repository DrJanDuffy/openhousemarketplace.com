# Google 2025 SEO Setup

This doc covers optional env and data updates to complete the site’s Google 2025 SEO setup.

## 1. Google Business Profile (GBP) link in schema

**Purpose:** `sameAs` in Organization/LocalBusiness/WebSite publisher links the site to your Google Business Profile for E-E-A-T and knowledge panel.

**Steps:**

1. Get your GBP URL (e.g. `https://www.google.com/maps/place/...` or your `g.page` link).
2. Add to Vercel (or local) env:
   ```bash
   NEXT_PUBLIC_GOOGLE_BUSINESS_PROFILE_URL=https://www.google.com/maps/place/your-place-id
   ```
3. Redeploy. The WebSite publisher, Organization, and LocalBusiness schemas will include `sameAs: [your URL]`.

## 2. Real review data for star ratings

**Purpose:** `aggregateRating` in LocalBusiness should reflect real GBP reviews so rich results stay accurate and compliant.

**Current:** Pages pass placeholder `aggregateRating: { ratingValue: '5.0', reviewCount: '100' }` into `StructuredData type="LocalBusiness"`.

**Steps:**

1. Pull rating and review count from Google Business Profile (API or manual).
2. Where you render `<StructuredData type="LocalBusiness" ... />`, pass real values, e.g.:
   ```tsx
   <StructuredData
     type="LocalBusiness"
     data={{
       openingHours: ['Mo-Fr 09:00-18:00', 'Sa-Su 10:00-16:00'],
       aggregateRating: {
         ratingValue: '4.9',   // from GBP
         reviewCount: '127',   // from GBP
       },
     }}
   />
   ```
3. Consider a small server-side helper or env (e.g. `NEXT_PUBLIC_GBP_RATING`, `NEXT_PUBLIC_GBP_REVIEW_COUNT`) and use them in layout or key pages so one place controls the values.

## 3. What’s already in place

- WebSite + Organization + WebPage (author/publisher) structured data
- RealEstateAgent with license, worksFor, knowsAbout
- LocalBusiness with NAP, services, opening hours
- Default metadata, viewport, themeColor
- Single sitemap in `robots.txt`
- LCP priority on first property image
- AI crawlers allowed in `robots.ts`

## 4. Validation

- [Google Rich Results Test](https://search.google.com/test/rich-results): validate WebSite, Organization, LocalBusiness, FAQPage.
- [Google Search Console](https://search.google.com/search-console): submit sitemap, check Core Web Vitals and Enhancements.
