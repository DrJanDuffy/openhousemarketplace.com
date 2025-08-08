# Environment Variables Setup

## Required Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# FollowUpBoss API
FOLLOWUPBOSS_API_KEY=fka_0N4mnNxym6FYyqt91G2eaemnqC8TTOSYru

# Google Maps API
GOOGLE_MAPS_API_KEY=AIzaSyDt84u_m6IGyrNZ9Eyc2W0fAIx6yD3peTo
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyDt84u_m6IGyrNZ9Eyc2W0fAIx6yD3peTo

# Firebase Admin SDK (Server-side) - Get from Firebase Console
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour\nMulti\nLine\nKey\nHere\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@your-project.iam.gserviceaccount.com
FIREBASE_DATABASE_URL=https://your-project.firebaseio.com

# Firebase Client SDK (Client-side) - Get from Firebase Console
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## Vercel Dashboard Setup

Add these same environment variables in your Vercel project:
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add each variable above
3. Set Environment to "Production, Preview, Development"
4. Mark sensitive values (API keys) as "Sensitive"

## Security Notes

- Never commit `.env.local` or any file containing actual API keys
- Use different API keys for production vs development when possible
- Rotate API keys regularly (every 90 days recommended)
- Restrict API keys by domain in their respective service dashboards
