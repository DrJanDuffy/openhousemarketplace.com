import { NextResponse } from 'next/server'

export async function GET() {
  const envCheck = {
    FOLLOWUPBOSS_API_KEY: !!process.env.FOLLOWUPBOSS_API_KEY,
    FOLLOWUPBOSS_API_KEY_LENGTH: process.env.FOLLOWUPBOSS_API_KEY?.length || 0,
    GOOGLE_MAPS_API_KEY: !!process.env.GOOGLE_MAPS_API_KEY,
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: !!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    FIREBASE_PROJECT_ID: !!process.env.FIREBASE_PROJECT_ID,
    NODE_ENV: process.env.NODE_ENV,
    VERCEL_ENV: process.env.VERCEL_ENV
  }

  return NextResponse.json({
    message: 'Environment variables check',
    envCheck,
    timestamp: new Date().toISOString()
  })
}
