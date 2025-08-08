#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const envTemplate = `# .env.local (DO NOT COMMIT THIS FILE)

# FollowUpBoss API
FOLLOWUPBOSS_API_KEY=fka_0N4mnNxym6FYyqt91G2eaemnqC8TTOSYru

# Google Maps API
GOOGLE_MAPS_API_KEY=AIzaSyDt84u_m6IGyrNZ9Eyc2W0fAIx6yD3peTo
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyDt84u_m6IGyrNZ9Eyc2W0fAIx6yD3peTo

# Firebase Admin SDK (Server-side) - Update with your Firebase project details
FIREBASE_PROJECT_ID=openhousemarketplace-com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\nYour\\nMulti\\nLine\\nKey\\nHere\\n-----END PRIVATE KEY-----\\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@openhousemarketplace-com.iam.gserviceaccount.com

# Firebase Client SDK (Client-side) - Update with your Firebase project details
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=openhousemarketplace-com.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=openhousemarketplace-com
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=openhousemarketplace-com.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=183961324071
NEXT_PUBLIC_FIREBASE_APP_ID=1:183961324071:web:demo
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-DEMO

# reCAPTCHA for Firebase App Check (Optional)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
`;

const envPath = path.join(process.cwd(), '.env.local');

if (fs.existsSync(envPath)) {
  console.log('❗ .env.local already exists. Skipping creation.');
  console.log('   If you want to recreate it, delete the existing file first.');
  process.exit(0);
}

try {
  fs.writeFileSync(envPath, envTemplate);
  console.log('✅ Created .env.local file with pre-configured API keys');
  console.log('📝 Edit .env.local to update Firebase configuration with your project details');
  console.log('🔑 The Google Maps and FollowUpBoss API keys are already configured');
  console.log('');
  console.log('Next steps:');
  console.log('1. Update Firebase configuration in .env.local');
  console.log('2. Add the same variables to your Vercel project settings');
  console.log('3. Run: npm run dev');
} catch (error) {
  console.error('❌ Error creating .env.local:', error.message);
  process.exit(1);
}
