import { NextRequest, NextResponse } from 'next/server'
import { getAppCheck } from 'firebase-admin/app-check'
import { initializeApp, getApps, cert } from 'firebase-admin/app'

interface MapsRequestBody {
  endpoint: string
  params: Record<string, any>
}

// Type guard function for runtime validation
function isValidMapsRequest(obj: any): obj is MapsRequestBody {
  return obj && 
         typeof obj.endpoint === 'string' && 
         obj.params && 
         typeof obj.params === 'object'
}

// Firebase Admin initialization with proper validation
let adminApp: any = null

function initializeFirebaseAdmin() {
  if (adminApp) return adminApp

  // Only initialize in server runtime, not during build
  if (typeof window === 'undefined') {
    try {
      // Validate required environment variables
      const requiredEnvVars = [
        'FIREBASE_PROJECT_ID',
        'FIREBASE_CLIENT_EMAIL', 
        'FIREBASE_PRIVATE_KEY'
      ]
      
      for (const envVar of requiredEnvVars) {
        if (!process.env[envVar]) {
          console.error(`Missing required environment variable: ${envVar}`)
          throw new Error(`${envVar} environment variable is required`)
        }
      }

      // Create service account object
      const serviceAccount = {
        type: "service_account",
        project_id: process.env.FIREBASE_PROJECT_ID,
        private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${process.env.FIREBASE_CLIENT_EMAIL}`
      }

      // Validate service account has required fields
      if (!serviceAccount.project_id) {
        throw new Error('Firebase service account missing project_id')
      }

      if (!getApps().length) {
        adminApp = initializeApp({
          credential: cert(serviceAccount as any),
          projectId: serviceAccount.project_id
        })
      } else {
        adminApp = getApps()[0]
      }
    } catch (error) {
      console.error('Failed to initialize Firebase Admin:', error)
      // Don't throw during build time, just return null
      return null
    }
  }
  
  return adminApp
}

export async function POST(request: NextRequest) {
  try {
    // Initialize Firebase Admin
    const firebaseAdmin = initializeFirebaseAdmin()
    if (!firebaseAdmin) {
      return NextResponse.json(
        { error: 'Firebase Admin not initialized' },
        { status: 500 }
      )
    }

    // Get the App Check token from the request header
    const appCheckToken = request.headers.get('X-Firebase-AppCheck')
    
    if (!appCheckToken) {
      return NextResponse.json(
        { error: 'Missing App Check token' },
        { status: 401 }
      )
    }

    // Verify the App Check token
    try {
      await getAppCheck().verifyToken(appCheckToken)
    } catch (error) {
      console.error('App Check token verification failed:', error)
      return NextResponse.json(
        { error: 'Invalid App Check token' },
        { status: 401 }
      )
    }

    // Parse and validate the request body
    const body = await request.json()

    if (!isValidMapsRequest(body)) {
      return NextResponse.json(
        { error: 'Invalid request body format. Expected { endpoint: string, params: object }' },
        { status: 400 }
      )
    }

    const { endpoint, params } = body

    // Make the Google Maps API call
    const url = new URL(endpoint)
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value as string)
    })

    const response = await fetch(url.toString(), {
      headers: {
        'X-Goog-Api-Key': process.env.GOOGLE_MAPS_API_KEY || '',
      },
    })

    if (!response.ok) {
      throw new Error(`Google Maps API error: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)

  } catch (error) {
    console.error('Error in maps API route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
