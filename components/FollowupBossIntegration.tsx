'use client'

/**
 * Market-updates lead form. Submits to `/api/leads` only — never call Follow Up Boss from the browser.
 * CRM sync (optional) uses `FOLLOWUPBOSS_API_KEY` on the server in `lib/followupboss-service.ts`.
 */
import React, { useState } from 'react'
import { Mail, Phone, User, MapPin, Send } from 'lucide-react'
import { trackMetaPixelEvent } from '@/lib/facebook-pixel'

interface LeadData {
  name: string
  email: string
  phone: string
  neighborhood: string
  message: string
  source: string
}

interface FollowupBossIntegrationProps {
  className?: string
  title?: string
  description?: string
  showPhone?: boolean
  showMessage?: boolean
  neighborhoods?: string[]
}

const FollowupBossIntegration: React.FC<FollowupBossIntegrationProps> = ({
  className = '',
  title = 'Get Summerlin Market Updates',
  description = 'Stay informed about new listings and market changes in Summerlin West',
  showPhone = true,
  showMessage = false,
  neighborhoods = [
    'The Ridges',
    'Red Rock Country Club',
    'Summerlin Centre',
    'Sun City Summerlin',
    'The Trails',
    'Willows',
    'Mesa Ridge',
    'Siena',
    'Regency',
  ],
}) => {
  const [formData, setFormData] = useState<LeadData>({
    name: '',
    email: '',
    phone: '',
    neighborhood: '',
    message: '',
    source: 'Website Lead Form',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const submitViaServer = async (leadData: LeadData) => {
    const trimmed = leadData.name.trim()
    const nameParts = trimmed.split(/\s+/)
    const firstName = nameParts[0] || trimmed
    const lastName = nameParts.slice(1).join(' ') || ''

    const notesParts = [`Interested in ${leadData.neighborhood} neighborhood`]
    if (leadData.message?.trim()) {
      notesParts.push(`Message: ${leadData.message.trim()}`)
    }

    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName,
        lastName,
        email: leadData.email,
        phone: leadData.phone || '',
        propertyAddress: leadData.neighborhood,
        source: leadData.source,
        registrationType: 'light',
        notes: notesParts.join(' · '),
      }),
    })

    if (!response.ok) {
      const errBody = (await response.json().catch(() => ({}))) as { error?: string }
      throw new Error(errBody.error || `HTTP ${response.status}`)
    }

    return response.json()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    try {
      await submitViaServer(formData)
      trackMetaPixelEvent('Lead', { content_name: 'market_updates', content_category: formData.neighborhood })
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        neighborhood: '',
        message: '',
        source: 'Website Lead Form',
      })
    } catch (error) {
      console.error('Lead form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={`bg-gray-800 rounded-lg p-6 ${className}`}>
      <h4 className="text-xl font-bold mb-4 text-white">{title}</h4>
      <p className="text-gray-300 mb-6">{description}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" aria-hidden />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
              required
              autoComplete="name"
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" aria-hidden />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              required
              autoComplete="email"
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {showPhone && (
          <div>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" aria-hidden />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number (optional)"
                value={formData.phone}
                onChange={handleInputChange}
                autoComplete="tel"
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
        )}

        <div>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" aria-hidden />
            <select
              name="neighborhood"
              value={formData.neighborhood}
              onChange={handleInputChange}
              required
              aria-label="Select interested neighborhood"
              title="Select interested neighborhood"
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-blue-500 focus:outline-none"
            >
              <option value="">Select Neighborhood</option>
              {neighborhoods.map((neighborhood) => (
                <option key={neighborhood} value={neighborhood}>
                  {neighborhood}
                </option>
              ))}
            </select>
          </div>
        </div>

        {showMessage && (
          <div>
            <textarea
              name="message"
              placeholder="Additional message (optional)"
              value={formData.message}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" aria-hidden />
              Submitting...
            </>
          ) : (
            <>
              <Send className="h-4 w-4 mr-2" aria-hidden />
              Get Market Updates
            </>
          )}
        </button>

        {submitStatus === 'success' && (
          <div className="text-green-400 text-sm text-center" role="status">
            Thank you! We&apos;ll be in touch with Summerlin West market updates.
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="text-red-400 text-sm text-center" role="alert">
            Something went wrong. Please try again or contact us directly.
          </div>
        )}
      </form>
    </div>
  )
}

export default FollowupBossIntegration
