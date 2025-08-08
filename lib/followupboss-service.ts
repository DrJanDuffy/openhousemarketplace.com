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

const API_KEY = process.env.FOLLOWUPBOSS_API_KEY || 'fka_0N4mnNxym6FYyqt91G2eaemnqC8TTOSYru'
const API_URL = process.env.FOLLOWUPBOSS_BASE_URL || 'https://api.followupboss.com/v1'

// Cache for tracking property interactions
const interactionCache = new Map<string, PropertyInteraction[]>()

export const followupBossService = {
  async createOrUpdateLead(data: LeadData) {
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

    try {
      // Search for existing lead
      const searchResponse = await fetch(`${API_URL}/people?email=${encodeURIComponent(email)}`, {
        headers: {
          'Authorization': `Basic ${Buffer.from(API_KEY + ':').toString('base64')}`,
          'Content-Type': 'application/json'
        }
      })

      const searchData = await searchResponse.json() as FollowUpBossSearchResponse
      
      if (searchData._items?.length > 0 && searchData._items[0]?.id) {
        // Update existing lead
        const leadId = searchData._items[0].id
        const response = await fetch(`${API_URL}/people/${leadId}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Basic ${Buffer.from(API_KEY + ':').toString('base64')}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(leadData)
        })

        if (!response.ok) {
          throw new Error(`FollowUpBoss API error: ${response.status}`)
        }

        return response.json() as Promise<LeadData>
      } else {
        // Create new lead
        const response = await fetch(`${API_URL}/people`, {
          method: 'POST',
          headers: {
            'Authorization': `Basic ${Buffer.from(API_KEY + ':').toString('base64')}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(leadData)
        })

        if (!response.ok) {
          throw new Error(`FollowUpBoss API error: ${response.status}`)
        }

        return response.json() as Promise<LeadData>
      }
    } catch (error) {
      console.error('Error in FollowupBoss API:', error)
      throw error
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
      
      if (searchData._items?.length > 0 && searchData._items[0]?.id) {
        const lead = searchData._items[0]
        const existingTags = lead.tags || []
        const updatedTags = [...new Set([...existingTags, ...tags])]

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
      
      if (searchData._items?.length > 0 && searchData._items[0]?.id) {
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
