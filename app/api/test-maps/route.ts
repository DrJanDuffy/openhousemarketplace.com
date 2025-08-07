import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Google Maps API key not configured' },
        { status: 500 }
      )
    }

    // Test the API key with a simple geocoding request
    const testAddress = 'Summerlin West, Las Vegas, NV'
    const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(testAddress)}&key=${apiKey}`
    
    const response = await fetch(geocodingUrl)
    const data = await response.json()

    if (data.status === 'OK') {
      return NextResponse.json({
        success: true,
        message: 'Google Maps API key is working correctly',
        testAddress,
        coordinates: data.results[0]?.geometry?.location,
        apiKeyConfigured: !!apiKey,
        apiKeyLength: apiKey.length
      })
    } else {
      return NextResponse.json({
        success: false,
        error: `API Error: ${data.status}`,
        message: data.error_message || 'Unknown error',
        apiKeyConfigured: !!apiKey,
        apiKeyLength: apiKey.length
      }, { status: 400 })
    }

  } catch (error) {
    console.error('Error testing Google Maps API:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to test Google Maps API',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
