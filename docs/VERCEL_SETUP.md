# Vercel Environment Variables Setup

## Quick Setup Instructions

1. **Go to your Vercel Dashboard**: https://vercel.com/dashboard
2. **Select your project**: openhousemarketplace.com
3. **Navigate to Settings**: Click on "Settings" tab
4. **Go to Environment Variables**: Click on "Environment Variables" in the sidebar

## Required Environment Variables

Add these variables in Vercel with the following settings:

### 1. FollowUpBoss API
```
Name: FOLLOWUPBOSS_API_KEY
Value: fka_0N4mnNxym6FYyqt91G2eaemnqC8TTOSYru
Environment: Production, Preview, Development
Sensitive: ✅ Yes
```

### 2. Google Maps API
```
Name: GOOGLE_MAPS_API_KEY
Value: AIzaSyDt84u_m6IGyrNZ9Eyc2W0fAIx6yD3peTo
Environment: Production, Preview, Development
Sensitive: ✅ Yes
```

```
Name: NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
Value: AIzaSyDt84u_m6IGyrNZ9Eyc2W0fAIx6yD3peTo
Environment: Production, Preview, Development
Sensitive: ❌ No (public variable)
```

### 3. Firebase Configuration (Update with your Firebase project details)

#### Server-side Firebase Admin:
```
Name: FIREBASE_PROJECT_ID
Value: openhousemarketplace-com
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
Value: firebase-adminsdk@openhousemarketplace-com.iam.gserviceaccount.com
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
Value: openhousemarketplace-com.firebaseapp.com
Environment: Production, Preview, Development
Sensitive: ❌ No (public variable)
```

```
Name: NEXT_PUBLIC_FIREBASE_PROJECT_ID
Value: openhousemarketplace-com
Environment: Production, Preview, Development
Sensitive: ❌ No (public variable)
```

```
Name: NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
Value: openhousemarketplace-com.firebasestorage.app
Environment: Production, Preview, Development
Sensitive: ❌ No (public variable)
```

```
Name: NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
Value: 183961324071
Environment: Production, Preview, Development
Sensitive: ❌ No (public variable)
```

```
Name: NEXT_PUBLIC_FIREBASE_APP_ID
Value: 1:183961324071:web:your_app_id
Environment: Production, Preview, Development
Sensitive: ❌ No (public variable)
```

### 4. Optional: reCAPTCHA for Firebase App Check
```
Name: NEXT_PUBLIC_RECAPTCHA_SITE_KEY
Value: your_recaptcha_site_key
Environment: Production, Preview, Development
Sensitive: ❌ No (public variable)
```

## Important Notes

1. **After adding variables**: Trigger a new deployment by pushing to your repository
2. **Firebase setup**: You'll need to get your actual Firebase configuration from the Firebase Console
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
