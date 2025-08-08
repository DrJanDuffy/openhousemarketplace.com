import { NextRequest, NextResponse } from 'next/server'
import followupBossService from '@/lib/followupboss-service'

interface LeadData {
  firstName: string
  lastName: string
  email: string
  phone: string
  propertyId?: string
  propertyAddress?: string
  source?: string
  registrationType: 'light' | 'full'
  buyingTimeframe?: string
  priceRange?: string
  prequalified?: string
  currentlyWorking?: string
  notes?: string
}

// Type guard for lead data
function isValidLeadData(obj: any): obj is LeadData {
  return obj &&
    typeof obj.firstName === 'string' &&
    typeof obj.lastName === 'string' &&
    typeof obj.email === 'string' &&
    typeof obj.phone === 'string' &&
    typeof obj.registrationType === 'string' &&
    (obj.registrationType === 'light' || obj.registrationType === 'full')
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    if (!isValidLeadData(data)) {
      return NextResponse.json(
        { error: 'Invalid lead data format' },
        { status: 400 }
      )
    }

    const { 
      firstName,
      lastName,
      email,
      phone,
      propertyId,
      propertyAddress,
      source,
      registrationType,
      buyingTimeframe,
      priceRange,
      prequalified,
      currentlyWorking,
      notes
    } = data

    // Determine tags based on form data
    const tags = ['Website Lead']
    
    if (registrationType === 'full') {
      tags.push('Full Registration')
      
      if (buyingTimeframe === 'Immediately' || buyingTimeframe === 'Within 3 months') {
        tags.push('Hot Lead')
      } else if (buyingTimeframe === 'Within 6 months') {
        tags.push('Warm Lead')
      } else {
        tags.push('Long Term')
      }

      if (prequalified === 'Yes') {
        tags.push('Pre-Qualified')
      }

      if (currentlyWorking === 'No') {
        tags.push('Unrepresented')
      }
    } else {
      tags.push('Quick Registration')
    }

    // Create or update lead in FollowupBoss
    const leadData = {
      firstName,
      lastName,
      email,
      phone,
      propertyId,
      propertyAddress,
      source,
      tags,
      notes,
      customFields: {
        registrationType,
        buyingTimeframe,
        priceRange,
        prequalified,
        currentlyWorking
      }
    }

    await followupBossService.createOrUpdateLead(leadData)

    // Track property interaction
    await followupBossService.trackPropertyInteraction({
      propertyId: propertyId || 'unknown',
      type: 'register',
      timestamp: new Date().toISOString(),
      leadEmail: email
    })

    // Set up automated alerts if full registration
    if (registrationType === 'full') {
      await followupBossService.setupAutomation(email, propertyId || 'unknown')
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Error processing lead:', error)
    return NextResponse.json(
      { error: 'Failed to process registration' },
      { status: 500 }
    )
  }
}

interface InteractionData {
  email: string
  propertyId: string
  interactionType: string
}

function isValidInteractionData(obj: any): obj is InteractionData {
  return obj &&
    typeof obj.email === 'string' &&
    typeof obj.propertyId === 'string' &&
    typeof obj.interactionType === 'string'
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json()
    
    if (!isValidInteractionData(data)) {
      return NextResponse.json(
        { error: 'Invalid interaction data format' },
        { status: 400 }
      )
    }
    
    const { email, propertyId, interactionType } = data

    // Track property interaction
    await followupBossService.trackPropertyInteraction({
      propertyId,
      type: interactionType,
      timestamp: new Date().toISOString(),
      leadEmail: email
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Error tracking interaction:', error)
    return NextResponse.json(
      { error: 'Failed to track interaction' },
      { status: 500 }
    )
  }
}
