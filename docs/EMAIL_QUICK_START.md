# Quick Reference: Email Configuration

## 3-Minute Setup

### Step 1: Get API Key
1. Go to https://resend.com
2. Create account
3. Generate API key (copy it)

### Step 2: Add to Vercel
In your Vercel project settings → Environment Variables, add:

```
RESEND_API_KEY=re_your_key_here
RESEND_FROM_EMAIL=contact@openhousemarketplace.com
RESEND_NOTIFY_EMAIL=janet.duffy@bhhsnv.com
```

### Step 3: Verify Domain
In Resend dashboard → Domains:
1. Add `openhousemarketplace.com`
2. Copy DNS records
3. Add to your domain registrar
4. Wait for verification (up to 24 hrs)

### Step 4: Test
1. Deploy to Vercel
2. Submit contact form
3. Check janet.duffy@bhhsnv.com inbox

## What's Configured

| Setting | Value |
|---------|-------|
| **Sender Email** | contact@openhousemarketplace.com |
| **Recipient** | janet.duffy@bhhsnv.com |
| **Service** | Resend |
| **Contact Forms** | Both enabled (contact + open house) |
| **Fallback** | Console.log in development |

## Testing Locally

1. Create `.env.local`:
   ```
   RESEND_API_KEY=test_key
   RESEND_FROM_EMAIL=contact@openhousemarketplace.com
   RESEND_NOTIFY_EMAIL=janet.duffy@bhhsnv.com
   ```

2. Emails will log to console:
   ```
   [Email] Resend not configured. Logging email instead:
   To: janet.duffy@bhhsnv.com
   Subject: New Contact: Website Inquiry
   ```

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Emails not sending | Check `RESEND_API_KEY` in Vercel env vars |
| Going to spam | Domain verification required in Resend |
| Not receiving | Check janet.duffy@bhhsnv.com spam folder |
| API errors | Check Resend dashboard for bounces |

## Files Modified

- `lib/email.ts` - Email service (NEW)
- `app/api/contact/route.ts` - Updated to use Resend
- `app/api/open-house-signin/route.ts` - Updated to use Resend
- `env.mjs` - Added config variables
- `.env.example` - Added example values

## Status

✅ **Production Ready** - Awaiting Resend API key configuration

For full setup guide, see: `docs/EMAIL_SETUP.md`
