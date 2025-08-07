# Firebase App Check Setup Guide

This guide will help you set up Firebase App Check to secure your Google Maps API keys and prevent unauthorized access.

## Prerequisites

1. Google Cloud Console project
2. Firebase project
3. Google Maps API key
4. reCAPTCHA v3 site key

## Step 1: Set up Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing project
3. Enable App Check:
   - Go to Project Settings → App Check
   - Click "Get Started"
   - Select "reCAPTCHA v3" as the provider
   - Add your domain to the allowed domains list

## Step 2: Get reCAPTCHA v3 Site Key

1. Go to [reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Create a new site
3. Choose reCAPTCHA v3
4. Add your domain
5. Copy the Site Key

## Step 3: Get Firebase Service Account Key

1. In Firebase Console, go to Project Settings → Service Accounts
2. Click "Generate new private key"
3. Download the JSON file
4. Extract the following values:
   - `project_id`
   - `client_email`
   - `private_key`

## Step 4: Configure Environment Variables

### Client-side (NEXT_PUBLIC_*)
Add these to your Vercel environment variables:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
```

### Server-side (private)
Add these to your Vercel environment variables:

```
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your_project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

## Step 5: Configure Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Enable the following APIs:
   - Maps JavaScript API
   - Places API
   - Geocoding API
   - Directions API

4. Set up API key restrictions:
   - Go to APIs & Services → Credentials
   - Click on your API key
   - Under "Application restrictions", select "HTTP referrers"
   - Add your domain: `*.openhousemarketplace.com/*`
   - Under "API restrictions", select "Restrict key"
   - Select the APIs you enabled above

## Step 6: Test the Implementation

1. Deploy your application
2. Open the browser console
3. Check for Firebase App Check initialization messages
4. Test the map functionality
5. Verify that API calls include the App Check token

## Security Benefits

With Firebase App Check enabled:

✅ **API Key Protection**: Your Google Maps API key is never exposed to the client
✅ **Request Validation**: All API calls are validated through Firebase App Check
✅ **Bot Protection**: reCAPTCHA v3 prevents automated abuse
✅ **Domain Restriction**: Only requests from your domain are accepted
✅ **Token Expiration**: App Check tokens expire automatically

## Troubleshooting

### Common Issues

1. **App Check not initializing**
   - Check that Firebase config is correct
   - Verify reCAPTCHA site key is valid
   - Ensure domain is added to reCAPTCHA allowed domains

2. **API calls failing**
   - Verify server-side environment variables are set
   - Check that Firebase Admin SDK is properly configured
   - Ensure API key restrictions allow your domain

3. **Token verification failing**
   - Check that App Check is enabled in Firebase Console
   - Verify service account credentials are correct
   - Ensure private key is properly formatted

### Debug Mode

For development, you can enable debug mode:

```typescript
// In lib/firebase.ts
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''),
  isTokenAutoRefreshEnabled: true,
  debug: process.env.NODE_ENV === 'development' // Enable debug mode in development
})
```

## Monitoring

1. **Firebase Console**: Monitor App Check usage and errors
2. **Google Cloud Console**: Monitor API usage and costs
3. **Application Logs**: Check for authentication errors

## Cost Considerations

- **Firebase App Check**: Free tier includes 10,000 requests/month
- **reCAPTCHA v3**: Free for up to 1 million requests/month
- **Google Maps APIs**: Standard pricing applies

## Next Steps

1. Set up monitoring and alerting
2. Configure rate limiting
3. Implement caching for API responses
4. Add error handling and fallbacks
