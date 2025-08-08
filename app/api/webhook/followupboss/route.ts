import { NextRequest, NextResponse } from 'next/server'

const FOLLOWUPBOSS_API_KEY = process.env.FOLLOWUPBOSS_API_KEY
const FOLLOWUPBOSS_API_URL = 'https://api.followupboss.com/v1'

export async function POST(request: NextRequest) {
  try {
    console.log('Webhook received - processing form submission')
    
    const formData = await request.formData()
    
    // Extract form data
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const neighborhood = formData.get('neighborhood') as string
    
    console.log('Form data received:', { name, email, phone, neighborhood })
    
    if (!name || !email || !neighborhood) {
      console.error('Missing required fields:', { name: !!name, email: !!email, neighborhood: !!neighborhood })
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (!FOLLOWUPBOSS_API_KEY) {
      console.error('FollowUpBoss API key not configured')
      return NextResponse.json(
        { error: 'FollowUpBoss service not configured' },
        { status: 500 }
      )
    }

    // Split name into first and last
    const nameParts = name.trim().split(' ')
    const firstName = nameParts[0] || name
    const lastName = nameParts.slice(1).join(' ') || ''

    // Prepare FollowUpBoss payload
    const leadData = {
      firstName,
      lastName,
      emails: [{ value: email, type: 'work' }],
      phones: phone ? [{ value: phone, type: 'mobile' }] : [],
      tags: ['Website Lead', 'Summerlin West', neighborhood],
      customFields: {
        'Neighborhood Interest': neighborhood,
        'Lead Source': 'Vercel Form',
        'Form Type': 'Market Updates'
      }
    }

    console.log('Sending to FollowUpBoss:', JSON.stringify(leadData, null, 2))

    // Send to FollowUpBoss
    const response = await fetch(`${FOLLOWUPBOSS_API_URL}/people`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(FOLLOWUPBOSS_API_KEY + ':').toString('base64')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(leadData)
    })

    console.log('FollowUpBoss response status:', response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('FollowUpBoss API error:', response.status, errorText)
      throw new Error(`FollowUpBoss API error: ${response.status} - ${errorText}`)
    }

    const result = await response.json()
    console.log('Lead created in FollowUpBoss:', result)

    // Return success
    return NextResponse.json({ 
      success: true, 
      message: 'Lead submitted successfully',
      leadId: result.id
    })

  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Failed to process lead' },
      { status: 500 }
    )
  }
}
