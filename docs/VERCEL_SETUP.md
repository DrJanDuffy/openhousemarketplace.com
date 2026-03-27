# Vercel Environment Variables Setup

## Quick Setup Instructions

1. **Go to your Vercel Dashboard**: https://vercel.com/dashboard
2. **Select your project**: openhousemarketplace.com
3. **Navigate to Settings**: Click on "Settings" tab
4. **Go to Environment Variables**: Click on "Environment Variables" in the sidebar

## Required Environment Variables

Add these variables in Vercel with the following settings (use **your own** values from Firebase / Google Cloud; never commit live keys to git).

### 1. Google Maps API

```
Name: GOOGLE_MAPS_API_KEY
Value: your_google_maps_server_key
Environment: Production, Preview, Development
Sensitive: ✅ Yes
```

```
Name: NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
Value: your_google_maps_browser_key
Environment: Production, Preview, Development
Sensitive: ❌ No (public variable)
```

### 2. Firebase Configuration (update with your Firebase project details)

#### Server-side Firebase Admin:

```
Name: FIREBASE_PROJECT_ID
Value: your_firebase_project_id
Environment: Production, Preview, Development
Sensitive: ❌ No
```

```
Name: FIREBASE_PRIVATE_KEY
Value: -----BEGIN PRIVATE KEY-----\nYour\nMulti\nLine\nKey\nHere\n-----END PRIVATE KEY-----\n
Environment: Production, Preview, Development
Sensitive: ✅ Yes
```

```
Name: FIREBASE_CLIENT_EMAIL
Value: firebase-adminsdk@your-project.iam.gserviceaccount.com
Environment: Production, Preview, Development
Sensitive: ❌ No
```

#### Client-side Firebase Config:

```
Name: NEXT_PUBLIC_FIREBASE_API_KEY
Value: your_firebase_api_key
Environment: Production, Preview, Development
Sensitive: ❌ No (public variable)
```

```
Name: NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
Value: your-project.firebaseapp.com
Environment: Production, Preview, Development
Sensitive: ❌ No (public variable)
```

```
Name: NEXT_PUBLIC_FIREBASE_PROJECT_ID
Value: your_firebase_project_id
Environment: Production, Preview, Development
Sensitive: ❌ No (public variable)
```

```
Name: NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
Value: your-project.firebasestorage.app
Environment: Production, Preview, Development
Sensitive: ❌ No (public variable)
```

```
Name: NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
Value: your_sender_id
Environment: Production, Preview, Development
Sensitive: ❌ No (public variable)
```

```
Name: NEXT_PUBLIC_FIREBASE_APP_ID
Value: your_firebase_app_id
Environment: Production, Preview, Development
Sensitive: ❌ No (public variable)
```

### 3. Optional: reCAPTCHA for Firebase App Check

```
Name: NEXT_PUBLIC_RECAPTCHA_SITE_KEY
Value: your_recaptcha_site_key
Environment: Production, Preview, Development
Sensitive: ❌ No (public variable)
```

### 4. Optional: Follow Up Boss (legacy CRM)

Scheduling and lead capture use **Calendly**; a Follow Up Boss key is **not** required. Add only if you enable server-side CRM sync (see `lib/followupboss-service.ts`):

```
Name: FOLLOWUPBOSS_API_KEY
Value: your_followupboss_api_key
Environment: Production, Preview, Development
Sensitive: ✅ Yes
```

```
Name: FOLLOWUPBOSS_BASE_URL
Value: https://api.followupboss.com/v1
Environment: Production, Preview, Development
Sensitive: ❌ No (optional override)
```

## Important Notes

1. **After adding variables**: Trigger a new deployment by pushing to your repository
2. **Firebase setup**: Get actual configuration from the Firebase Console
3. **API key restrictions**: Set up domain restrictions in Google Cloud Console and Firebase Console for security
4. **Regular rotation**: Change API keys every 90 days for security

## Getting Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project or create a new one
3. **For client config**: Project Settings → General → Your apps → Web app
4. **For admin config**: Project Settings → Service accounts → Generate new private key

## Security Checklist

- ✅ All sensitive values marked as "Sensitive" in Vercel
- ✅ API keys restricted by domain/referrer
- ✅ No hardcoded keys in your codebase
- ✅ Different keys for development vs production (recommended)
- ✅ Regular key rotation schedule in place
