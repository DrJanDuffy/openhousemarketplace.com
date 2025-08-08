interface LeadData {
  firstName: string
  lastName?: string
  email: string
  phone?: string
  propertyId?: string
  propertyAddress?: string
  source?: string
  tags?: string[]
  notes?: string
  customFields?: Record<string, any>
}

interface PropertyInteraction {
  propertyId: string
  type: 'view' | 'save' | 'schedule' | 'register'
  timestamp: string
  leadEmail: string
}

interface FollowUpBossSearchResponse {
  _items?: {
    id: string
    firstName?: string
    lastName?: string
    email?: string
    phones?: { value: string }[]
    tags?: string[]
    notes?: { content: string, type: string }[]
    customFields?: Record<string, any>
  }[]
  _totalItems?: number
  _links?: Record<string, any>
}

const API_KEY = process.env.FOLLOWUPBOSS_API_KEY

if (!API_KEY) {
  console.warn('FOLLOWUPBOSS_API_KEY environment variable is not set. FollowUpBoss integration will not work.')
}
const API_URL = process.env.FOLLOWUPBOSS_BASE_URL || 'https://api.followupboss.com/v1'

// Cache for tracking property interactions
const interactionCache = new Map<string, PropertyInteraction[]>()

export const followupBossService = {
  async createOrUpdateLead(data: LeadData): Promise<LeadData | { error: string }> {
    console.log('FollowupBoss service: createOrUpdateLead called')
    console.log('API_KEY configured:', !!API_KEY)
    
    if (!API_KEY) {
      console.error('FollowUpBoss API key not configured')
      return { error: 'FollowUpBoss service not configured' }
    }
    
    const { firstName, lastName, email, phone, propertyId, propertyAddress, source, tags = [], notes, customFields = {} } = data

    // Prepare the lead data
    const leadData = {
      firstName,
      lastName,
      emails: [{ value: email }],
      phones: phone ? [{ value: phone }] : [],
      source: source || 'Website Registration',
      tags: [...tags, 'Website Lead'],
      notes: notes ? [{
        content: notes,
        type: 'system'
      }] : [],
      customFields: {
        ...customFields,
        lastPropertyViewed: propertyAddress,
        propertyId
      }
    }

    console.log('Prepared lead data:', JSON.stringify(leadData, null, 2))

    try {
      // Search for existing lead
      console.log('Searching for existing lead with email:', email)
      const searchResponse = await fetch(`${API_URL}/people?email=${encodeURIComponent(email)}`, {
        headers: {
          'Authorization': `Basic ${Buffer.from(API_KEY + ':').toString('base64')}`,
          'Content-Type': 'application/json'
        }
      })

      console.log('Search response status:', searchResponse.status)
      
      if (!searchResponse.ok) {
        const errorText = await searchResponse.text()
        console.error('Search request failed:', searchResponse.status, errorText)
        throw new Error(`FollowUpBoss search API error: ${searchResponse.status} - ${errorText}`)
      }

      const searchData = await searchResponse.json() as FollowUpBossSearchResponse
      console.log('Search response data:', JSON.stringify(searchData, null, 2))
      
      if ((searchData._items?.length ?? 0) > 0 && searchData._items?.[0]?.id) {
        // Update existing lead
        console.log('Updating existing lead with ID:', searchData._items[0].id)
        const leadId = searchData._items[0].id
        const response = await fetch(`${API_URL}/people/${leadId}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Basic ${Buffer.from(API_KEY + ':').toString('base64')}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(leadData)
        })

        console.log('Update response status:', response.status)
        
        if (!response.ok) {
          const errorText = await response.text()
          console.error('Update request failed:', response.status, errorText)
          throw new Error(`FollowUpBoss API error: ${response.status} - ${errorText}`)
        }

        const result = await response.json()
        console.log('Update successful:', result)
        return result as LeadData
      } else {
        // Create new lead
        console.log('Creating new lead')
        const response = await fetch(`${API_URL}/people`, {
          method: 'POST',
          headers: {
            'Authorization': `Basic ${Buffer.from(API_KEY + ':').toString('base64')}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(leadData)
        })

        console.log('Create response status:', response.status)
        
        if (!response.ok) {
          const errorText = await response.text()
          console.error('Create request failed:', response.status, errorText)
          throw new Error(`FollowUpBoss API error: ${response.status} - ${errorText}`)
        }

        const result = await response.json()
        console.log('Create successful:', result)
        return result as LeadData
      }
    } catch (error) {
      console.error('Error in FollowupBoss API:', error)
      if (error instanceof Error) {
        throw new Error(`FollowUpBoss API Error: ${error.message}`)
      }
      throw new Error('FollowUpBoss API Error: Unknown error occurred')
    }
  },

  async addTags(email: string, tags: string[]) {
    try {
      // Search for lead
      const searchResponse = await fetch(`${API_URL}/people?email=${encodeURIComponent(email)}`, {
        headers: {
          'Authorization': `Basic ${Buffer.from(API_KEY + ':').toString('base64')}`,
          'Content-Type': 'application/json'
        }
      })

      const searchData = await searchResponse.json() as FollowUpBossSearchResponse
      
      if ((searchData._items?.length ?? 0) > 0 && searchData._items?.[0]?.id) {
        const lead = searchData._items[0]
        const existingTags = lead.tags || []
        const updatedTags = Array.from(new Set([...existingTags, ...tags]))

        // Update lead with new tags
        const response = await fetch(`${API_URL}/people/${lead.id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Basic ${Buffer.from(API_KEY + ':').toString('base64')}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            tags: updatedTags
          })
        })

        if (!response.ok) {
          throw new Error(`FollowUpBoss API error: ${response.status}`)
        }

        return response.json() as Promise<LeadData>
      }
    } catch (error) {
      console.error('Error adding tags:', error)
      throw error
    }
  },

  async trackPropertyInteraction(interaction: PropertyInteraction) {
    const { propertyId, type, leadEmail } = interaction

    // Update interaction cache
    const leadInteractions = interactionCache.get(leadEmail) || []
    leadInteractions.push(interaction)
    interactionCache.set(leadEmail, leadInteractions)

    // Analyze behavior and add appropriate tags
    const propertyInteractions = leadInteractions.filter(i => i.propertyId === propertyId)
    const tags: string[] = []

    // Multiple views of same property
    if (propertyInteractions.filter(i => i.type === 'view').length >= 3) {
      tags.push('High Interest')
    }

    // Saved property
    if (propertyInteractions.some(i => i.type === 'save')) {
      tags.push('Property Saved')
    }

    // Scheduled viewing
    if (propertyInteractions.some(i => i.type === 'schedule')) {
      tags.push('Viewing Scheduled')
    }

    // Registered for open house
    if (propertyInteractions.some(i => i.type === 'register')) {
      tags.push('Open House Registered')
    }

    // Add behavior-based tags
    if (tags.length > 0) {
      await this.addTags(leadEmail, tags)
    }

    // Create a note about the interaction
    const noteContent = `Property Interaction: ${type} - Property ID: ${propertyId}`
    await this.createNote(leadEmail, noteContent)
  },

  async createNote(email: string, content: string) {
    try {
      // Search for lead
      const searchResponse = await fetch(`${API_URL}/people?email=${encodeURIComponent(email)}`, {
        headers: {
          'Authorization': `Basic ${Buffer.from(API_KEY + ':').toString('base64')}`,
          'Content-Type': 'application/json'
        }
      })

      const searchData = await searchResponse.json() as FollowUpBossSearchResponse
      
      if ((searchData._items?.length ?? 0) > 0 && searchData._items?.[0]?.id) {
        const leadId = searchData._items[0].id

        // Create note
        const response = await fetch(`${API_URL}/notes`, {
          method: 'POST',
          headers: {
            'Authorization': `Basic ${Buffer.from(API_KEY + ':').toString('base64')}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            personId: leadId,
            content,
            type: 'system'
          })
        })

        if (!response.ok) {
          throw new Error(`FollowUpBoss API error: ${response.status}`)
        }

        return response.json() as Promise<{ id: string; content: string; type: string }>
      }
    } catch (error) {
      console.error('Error creating note:', error)
      throw error
    }
  },

  async setupAutomation(email: string, propertyId: string) {
    // Add automation-specific tags
    await this.addTags(email, ['Price Alert', 'Similar Listings Alert'])

    // Create a note about automation setup
    const noteContent = `Automation Setup: Price alerts and similar listings notifications enabled for Property ID: ${propertyId}`
    await this.createNote(email, noteContent)
  }
}

export default followupBossService
