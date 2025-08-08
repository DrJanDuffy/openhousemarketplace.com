'use client'

import React, { useState } from 'react'
import { Mail, Phone, User, MapPin, Send } from 'lucide-react'

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
  className = "",
  title = "Get Summerlin Market Updates",
  description = "Stay informed about new listings and market changes in Summerlin West",
  showPhone = true,
  showMessage = false,
  neighborhoods = [
    "The Ridges",
    "Red Rock Country Club", 
    "Summerlin Centre",
    "Sun City Summerlin",
    "The Trails",
    "Willows",
    "Mesa Ridge",
    "Siena",
    "Regency"
  ]
}) => {
  const [formData, setFormData] = useState<LeadData>({
    name: '',
    email: '',
    phone: '',
    neighborhood: '',
    message: '',
    source: 'Website Lead Form'
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const submitToFollowupBoss = async (leadData: LeadData) => {
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: leadData.name.split(' ')[0] || leadData.name,
          lastName: leadData.name.split(' ').slice(1).join(' ') || '',
          email: leadData.email,
          phone: leadData.phone,
          propertyAddress: leadData.neighborhood,
          source: leadData.source,
          registrationType: 'light',
          notes: leadData.message
        })
      })

      if (response.ok) {
        const result = await response.json()
        return { success: true, data: result }
      } else {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`)
      }
    } catch (error) {
      console.error('Lead submission error:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const result = await submitToFollowupBoss(formData)
      
      if (result.success) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          neighborhood: '',
          message: '',
          source: 'Website Lead Form'
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
      console.error('Form submission error:', error)
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
            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>
        
        <div>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>
        
        {showPhone && (
          <div>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number (optional)"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
        )}
        
        <div>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
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
              {neighborhoods.map(neighborhood => (
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
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Submitting...
            </>
          ) : (
            <>
              <Send className="h-4 w-4 mr-2" />
              Get Market Updates
            </>
          )}
        </button>
        
        {submitStatus === 'success' && (
          <div className="text-green-400 text-sm text-center">
            Thank you! We'll be in touch with Summerlin West market updates.
          </div>
        )}
        
        {submitStatus === 'error' && (
          <div className="text-red-400 text-sm text-center">
            Something went wrong. Please try again or contact us directly.
          </div>
        )}
      </form>
    </div>
  )
}

export default FollowupBossIntegration
