#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Placeholders only — never commit real API keys. Copy values from Vercel → Settings → Environment Variables.
const envTemplate = `# .env.local (DO NOT COMMIT THIS FILE)

# Scheduling / leads: Calendly is primary (no FUB key required unless you enable legacy CRM sync).
# FOLLOWUPBOSS_API_KEY=your_followupboss_api_key

# Google Maps API
GOOGLE_MAPS_API_KEY=your_google_maps_server_key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_browser_key

# Firebase Admin SDK (Server-side) - Update with your Firebase project details
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\nYour\\nMulti\\nLine\\nKey\\nHere\\n-----END PRIVATE KEY-----\\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@your-project.iam.gserviceaccount.com

# Firebase Client SDK (Client-side) - Update with your Firebase project details
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

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
  console.log('✅ Created .env.local from template (placeholders only).');
  console.log('📝 Add real keys from Vercel → Project → Settings → Environment Variables.');
  console.log('📅 Calendly handles scheduling/leads UX; FUB vars are optional legacy only.');
  console.log('');
  console.log('Next steps:');
  console.log('1. Fill in .env.local with your keys');
  console.log('2. Mirror the same variables in Vercel for production');
  console.log('3. Run: npm run dev');
} catch (error) {
  console.error('❌ Error creating .env.local:', error.message);
  process.exit(1);
}
