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

// Initialize Firebase Admin if not already initialized
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  })
}

export async function POST(request: NextRequest) {
  try {
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
