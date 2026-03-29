# Email Service Setup Guide

## Overview

The Open House Marketplace website uses **Resend** for transactional email delivery. This guide walks through setup and configuration.

## Supported Email Addresses

All emails route to a single inbox for processing:

| Email Address | Purpose | Routes To |
|---|---|---|
| `contact@openhousemarketplace.com` | Contact form submissions | janet.duffy@bhhsnv.com |
| `leads@openhousemarketplace.com` | Open house sign-ins | janet.duffy@bhhsnv.com |
| `drjansells@openhousemarketplace.com` | Sales inquiries | janet.duffy@bhhsnv.com |
| `info@openhousemarketplace.com` | General info requests | janet.duffy@bhhsnv.com |
| `listings@openhousemarketplace.com` | Listing inquiries | janet.duffy@bhhsnv.com |
| `showings@openhousemarketplace.com` | Showing requests | janet.duffy@bhhsnv.com |
| `vegas@openhousemarketplace.com` | Las Vegas inquiries | janet.duffy@bhhsnv.com |
| `henderson@openhousemarketplace.com` | Henderson inquiries | janet.duffy@bhhsnv.com |
| `summerlin@openhousemarketplace.com` | Summerlin inquiries | janet.duffy@bhhsnv.com |
| `buyers@openhousemarketplace.com` | Buyer inquiries | janet.duffy@bhhsnv.com |
| `sellers@openhousemarketplace.com` | Seller inquiries | janet.duffy@bhhsnv.com |
| `investors@openhousemarketplace.com` | Investor inquiries | janet.duffy@bhhsnv.com |

## Step 1: Get Resend API Key

1. Go to [https://resend.com](https://resend.com)
2. Sign up or log in
3. Navigate to **API Keys** section
4. Generate a new API key
5. Copy the key (starts with `re_`)

## Step 2: Configure Environment Variables in Vercel

1. Go to your [Vercel Project Settings](https://vercel.com/dashboard)
2. Select the **openhousemarketplace.com** project
3. Go to **Settings → Environment Variables**
4. Add three new variables:

```
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=contact@openhousemarketplace.com
RESEND_NOTIFY_EMAIL=janet.duffy@bhhsnv.com
```

5. Ensure all three are set for **Production**, **Preview**, and **Development** environments
6. Click **Save**

## Step 3: Verify Sender Domain

In Resend:

1. Go to **Domains** section
2. Add `openhousemarketplace.com`
3. Follow DNS verification steps provided by Resend
4. Wait for verification (can take up to 24 hours)

## Step 4: Test Email Delivery

### Local Testing
In development, emails log to the console:
```
[Email] Resend not configured. Logging email instead:
To: janet.duffy@bhhsnv.com
Subject: New Contact: Website Inquiry
HTML: ...
```

### Production Testing
1. Deploy the site to Vercel
2. Submit a test contact form at `/contact`
3. Check `janet.duffy@bhhsnv.com` inbox
4. Emails should arrive within 1-2 minutes

## Email Routes

### Contact Form (`/app/api/contact/route.ts`)

**Triggered by:** Contact form submission
**Recipient:** `RESEND_NOTIFY_EMAIL` (janet.duffy@bhhsnv.com)
**Template:** Contact form details with message preview
**Fields:** Name, Email, Phone, Subject, Message, Contact Type

### Open House Sign-In (`/app/api/open-house-signin/route.ts`)

**Triggered by:** Open house sign-in form submission
**Recipient:** `RESEND_NOTIFY_EMAIL` (janet.duffy@bhhsnv.com)
**Template:** Lead details with property information
**Fields:** Full Name, Email, Phone, Listing Address, Listing ID

## Troubleshooting

### Emails Not Sending
- Verify `RESEND_API_KEY` is set in Vercel environment variables
- Check Resend dashboard for bounced emails or errors
- Ensure sender domain is verified in Resend

### Emails Going to Spam
- Add `openhousemarketplace.com` to SPF records
- Set up DKIM in Resend (recommended by provider)
- Monitor Resend analytics for spam complaints

### Testing in Development
- Create `.env.local` with dummy values:
  ```
  RESEND_API_KEY=test_key
  RESEND_FROM_EMAIL=contact@openhousemarketplace.com
  RESEND_NOTIFY_EMAIL=janet.duffy@bhhsnv.com
  ```
- Emails will log to console instead of sending
- No API key needed for development

## Email Service Integration Points

The email system is implemented in:

- **`lib/email.ts`** - Core email service functions
  - `sendEmail()` - Generic email sender
  - `sendContactFormEmail()` - Contact form handler
  - `sendOpenHouseSignInEmail()` - Open house sign-in handler

- **`app/api/contact/route.ts`** - Contact form API endpoint
- **`app/api/open-house-signin/route.ts`** - Open house sign-in endpoint
- **`env.mjs`** - Environment variable definitions
- **`.env.example`** - Example configuration

## Configuration

All settings are in `env.mjs`:

```typescript
server: {
  RESEND_API_KEY: z.string().optional(),           // API key from Resend
  RESEND_FROM_EMAIL: z.string().email().optional(), // Sender email
  RESEND_NOTIFY_EMAIL: z.string().email().optional(),  // Recipient email
}
```

## Migration from Previous System

The old email system used `simulateEmailSending()` which logged emails to console without actually sending them.

**What changed:**
- Now uses actual Resend API for production email delivery
- Console logging still works for development/testing
- No changes needed to contact form or sign-in form UI
- Lead data still syncs to Follow Up Boss independently

## Support

For issues with:
- **Resend API:** Visit [https://resend.com/docs](https://resend.com/docs)
- **Email bounces/deliverability:** Check [Resend Status page](https://status.resend.com)
- **Site integration:** Check `lib/email.ts` or logs in Vercel deployment
