# Site Audit - Retest (March 2026)

## Status: ⚠️ CRITICAL ISSUES BLOCKING BUILD

### Build Failures

#### 1. **CRITICAL: Conflicting Sitemap Routes**
- **Issue**: Both `app/sitemap/page.tsx` (visual page) and `app/sitemap.ts` (XML route) exist
- **Impact**: Next.js 15 treats this as a route conflict; build fails
- **Error**: `Conflicting page and metadata at /sitemap: page at /sitemap/page and metadata at /sitemap/route`
- **Fix Required**: Remove the visual `/sitemap/page.tsx` OR rename it to `/sitemap-page/page.tsx`

#### 2. **CRITICAL: Invalid next.config.mjs Option**
- **Issue**: `experimental.transitionIndicator` is not a valid Next.js 15 option
- **Error**: `Unrecognized key(s) in object: 'transitionIndicator' at "experimental"`
- **Fix Required**: Remove this configuration line from `next.config.mjs`

---

## Email Service Status: ⚠️ NOT ACTUALLY IMPLEMENTED

### Contact Form (`app/api/contact/route.ts`)
- **Current State**: Still using `simulateEmailSending()` placeholder
- **Status**: NOT FUNCTIONAL for production
- **Issue**: Despite you mentioning Cloudflare setup, no Cloudflare email integration found in:
  - `env.mjs` (no Cloudflare env vars)
  - `.env.example` (no Cloudflare config documented)
  - `package.json` (no Cloudflare email package like `mailchannels`)
  - API route code (still uses simulation function)
  
### Open House Sign-In Form (`app/api/open-house-signin/route.ts`)
- **Current State**: Has TODO comment: "Send email notification to Dr. Jan Duffy"
- **Status**: Email NOT IMPLEMENTED
- **What IS Working**: Sends lead to FollowUp Boss + stores in Vercel KV

---

## Email Service Analysis

### What's Actually Configured
✅ **Working:**
- Vercel KV (Redis) for open house sign-in storage
- Follow Up Boss integration for lead sync
- Resend package installed (v4.0.0) but NOT USED

### What's NOT Configured
❌ **Missing:**
- No Cloudflare email integration code
- No API keys for Cloudflare (or SendGrid/Mailgun/AWS SES)
- No SMTP configuration
- Email service is selected but not implemented

---

## Detailed Findings

### HIGH PRIORITY - Must Fix Before Production

| Issue | File | Impact | Fix |
|-------|------|--------|-----|
| Sitemap route conflict | `app/sitemap.ts` + `app/sitemap/page.tsx` | Build fails | Remove page or rename |
| Invalid config option | `next.config.mjs` | Build fails | Delete `transitionIndicator` |
| Email not implemented | `app/api/contact/route.ts` | No lead capture | Implement Cloudflare/Resend/SendGrid |
| Email not implemented | `app/api/open-house-signin/route.ts` | No notifications | Implement email service |
| Console.log in production | Multiple API routes | Debug noise | Remove or use structured logging |

### MEDIUM PRIORITY - Should Fix for Quality

| Issue | File | Impact |
|-------|------|--------|
| Dark mode tokens unused | `styles/tailwind.css` | Dead code, 50+ lines of unused CSS |
| External image dependencies | `components/SummerlinOpenHouseWebsite.tsx` | Unsplash URL dependency, could break |
| Missing OG image | No `/public/images/og/og-image.jpg` | Poor social sharing preview |
| Hero gradient colors | `components/SummerlinOpenHouseWebsite.tsx` | `from-blue-600 to-red-600` mixes warm/cool |

### LOW PRIORITY - Nice to Have

| Issue | Type |
|-------|------|
| Test coverage | Only 1 test file; core flows untested |
| Env var strictness | Many optional vars; should require critical ones |

---

## What's Working Well ✅

- **SEO**: Comprehensive schemas (LocalBusiness, FAQPage, WebSite), proper metadata
- **Security**: Strong CSP headers, HSTS, frame options, XSS protection
- **Performance**: Image optimization, lazy loading, preconnect hints
- **Accessibility**: ARIA labels, focus states, semantic HTML
- **Infrastructure**: Well-organized components, centralized config (gbp.ts, seo.ts)
- **Integrations**: Calendly bookings, Follow Up Boss leads, Firebase Auth, Vercel KV
- **Analytics**: Google Analytics, Facebook Pixel, LinkedIn tracking

---

## Recommended Implementation Order

### Phase 1: Fix Build (MUST DO)
1. Resolve sitemap conflict
2. Remove invalid config option
3. Test build passes locally

### Phase 2: Implement Email (CRITICAL FOR BUSINESS)
1. Choose email service (Cloudflare, Resend, or SendGrid)
2. Implement contact form email
3. Implement open house sign-in notification email
4. Remove console.log simulation code

### Phase 3: Polish (Before Launch)
1. Add OG image
2. Remove dark mode CSS if not using
3. Localize external images
4. Add basic test coverage

---

## Questions for Dr. Jan Duffy

1. **Cloudflare Email**: Is Cloudflare Mail Routing configured? If yes, what's the SMTP/API endpoint?
2. **Preferred Service**: Since Resend is already installed, should we use that instead?
3. **Email Recipients**: 
   - Contact form → goes to whom? (drjanduffy@? or business email?)
   - Open house sign-in → notification to whom?
4. **Template**: Do you want email templates designed, or just send raw text?

---

## File Checklist for Fixes

- [ ] `next.config.mjs` - Remove `transitionIndicator`
- [ ] `app/sitemap.ts` or `app/sitemap/page.tsx` - Resolve conflict
- [ ] `app/api/contact/route.ts` - Implement real email service
- [ ] `app/api/open-house-signin/route.ts` - Implement email notification
- [ ] `styles/tailwind.css` - Remove unused dark mode CSS (optional)
- [ ] `components/SummerlinOpenHouseWebsite.tsx` - Fix hero gradient (optional)

---

**Last Updated**: March 29, 2026  
**Status**: Awaiting email service clarification
