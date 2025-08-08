import { initializeApp, getApps, cert, App } from 'firebase-admin/app'

let adminApp: App | null = null

interface ServiceAccount {
  type: string
  project_id: string
  private_key_id: string
  private_key: string
  client_email: string
  client_id: string
  auth_uri: string
  token_uri: string
  auth_provider_x509_cert_url: string
  client_x509_cert_url: string
}

export function getFirebaseAdmin(): App | null {
  // Don't initialize during build phase
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    console.log('Skipping Firebase admin initialization during build')
    return null
  }
  
  if (adminApp) return adminApp
  
  try {
    // Check if we have the required environment variables
    if (!process.env.FIREBASE_PROJECT_ID) {
      console.warn('FIREBASE_PROJECT_ID not found - Firebase admin not available')
      return null
    }
    
    const serviceAccount: ServiceAccount = {
      type: "service_account",
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID || '',
      private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n') || '',
      client_email: process.env.FIREBASE_CLIENT_EMAIL || '',
      client_id: process.env.FIREBASE_CLIENT_ID || '',
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL || ''
    }
    
    // Validate required fields
    if (!serviceAccount.project_id || !serviceAccount.private_key || !serviceAccount.client_email) {
      console.warn('Missing required Firebase environment variables')
      return null
    }
    
    if (!getApps().length) {
      adminApp = initializeApp({
        credential: cert(serviceAccount as any),
        projectId: serviceAccount.project_id
      })
    } else {
      adminApp = getApps()[0]
    }
    
    return adminApp
  } catch (error) {
    console.error('Firebase admin initialization failed:', error)
    return null
  }
}

// Export for backward compatibility if needed
export const firebaseAdmin = getFirebaseAdmin
export default getFirebaseAdmin
