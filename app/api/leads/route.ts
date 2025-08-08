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
    console.log('API route called - processing lead submission')
    const data = await request.json()
    console.log('Received data:', JSON.stringify(data, null, 2))
    
    if (!isValidLeadData(data)) {
      console.error('Invalid lead data format:', data)
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

    console.log('Processing lead for:', email, 'in neighborhood:', propertyAddress)

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

    console.log('Calling followupBossService.createOrUpdateLead...')
    const result = await followupBossService.createOrUpdateLead(leadData)
    console.log('FollowUpBoss service result:', result)
    
    if ('error' in result && result.error) {
      console.error('FollowUpBoss service error:', result.error)
      
      // If FollowUpBoss is not configured, still return success but log the data
      if (result.error.includes('not configured')) {
        console.log('FollowUpBoss not configured, but lead data received:', {
          firstName,
          lastName,
          email,
          phone,
          propertyAddress,
          source,
          registrationType
        })
        return NextResponse.json({ 
          success: true, 
          message: 'Lead received (FollowUpBoss not configured)',
          leadData: { firstName, lastName, email, phone, propertyAddress }
        })
      }
      
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      )
    }

    console.log('Lead created/updated successfully')

    // Track property interaction
    try {
      await followupBossService.trackPropertyInteraction({
        propertyId: propertyId || 'unknown',
        type: 'register',
        timestamp: new Date().toISOString(),
        leadEmail: email
      })
      console.log('Property interaction tracked')
    } catch (interactionError) {
      console.warn('Failed to track property interaction:', interactionError)
    }

    // Set up automated alerts if full registration
    if (registrationType === 'full') {
      try {
        await followupBossService.setupAutomation(email, propertyId || 'unknown')
        console.log('Automation setup completed')
      } catch (automationError) {
        console.warn('Failed to setup automation:', automationError)
      }
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
  interactionType: 'view' | 'save' | 'schedule' | 'register'
}

function isValidInteractionData(obj: any): obj is InteractionData {
  return obj &&
    typeof obj.email === 'string' &&
    typeof obj.propertyId === 'string' &&
    typeof obj.interactionType === 'string' &&
    ['view', 'save', 'schedule', 'register'].includes(obj.interactionType)
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
      type: interactionType as 'view' | 'save' | 'schedule' | 'register',
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
