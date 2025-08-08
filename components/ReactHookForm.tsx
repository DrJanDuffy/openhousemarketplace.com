'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Mail, Phone, User, MapPin, Loader2, CheckCircle, AlertCircle } from 'lucide-react'

interface FormData {
  name: string
  email: string
  phone?: string
  neighborhood: string
}

interface ReactHookFormProps {
  className?: string
  title?: string
  description?: string
  neighborhoods?: string[]
}

const ReactHookForm: React.FC<ReactHookFormProps> = ({
  className = "",
  title = "Get Summerlin Market Updates",
  description = "Stay informed about new listings and market changes in Summerlin West",
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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      // Split name into first and last
      const nameParts = data.name.trim().split(' ')
      const firstName = nameParts[0] || data.name
      const lastName = nameParts.slice(1).join(' ') || ''

      // Prepare FollowUpBoss payload (for logging purposes)
      const _leadData = {
        firstName,
        lastName,
        emails: [{ value: data.email, type: 'work' }],
        phones: data.phone ? [{ value: data.phone, type: 'mobile' }] : [],
        tags: ['Website Lead', 'Summerlin West', data.neighborhood],
        customFields: {
          'Neighborhood Interest': data.neighborhood,
          'Lead Source': 'React Hook Form',
          'Form Type': 'Market Updates'
        }
      }

      // Send directly to FollowUpBoss API
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email: data.email,
          phone: data.phone || '',
          propertyAddress: data.neighborhood,
          source: 'React Hook Form',
          registrationType: 'light',
          notes: `Interested in ${data.neighborhood} neighborhood`
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error((errorData as { error?: string }).error || `HTTP ${response.status}: ${response.statusText}`)
      }

      const result = await response.json()
      console.log('API response:', result)
      
      setSubmitStatus('success')
      reset() // Clear the form
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)

    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Failed to submit form. Please try again.')
      
      // Reset error message after 10 seconds
      setTimeout(() => {
        setSubmitStatus('idle')
        setErrorMessage('')
      }, 10000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={`bg-gray-800 rounded-lg p-6 ${className}`}>
      <h4 className="text-xl font-bold mb-4 text-white">{title}</h4>
      <p className="text-gray-300 mb-6">{description}</p>
      
      {/* Success Message */}
      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-900 border border-green-600 rounded-lg flex items-center">
          <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
          <span className="text-green-100">Thank you! We'll keep you updated on Summerlin West market changes.</span>
        </div>
      )}

      {/* Error Message */}
      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-900 border border-red-600 rounded-lg flex items-center">
          <AlertCircle className="h-5 w-5 text-red-400 mr-3" />
          <span className="text-red-100">{errorMessage}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              {...register('name', { 
                required: 'Name is required',
                minLength: { value: 2, message: 'Name must be at least 2 characters' }
              })}
              type="text"
              placeholder="Your Name"
              className={`w-full pl-10 pr-4 py-2 rounded-lg bg-gray-700 border text-white placeholder-gray-400 focus:outline-none ${
                errors.name ? 'border-red-500 focus:border-red-500' : 'border-gray-600 focus:border-blue-500'
              }`}
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
          )}
        </div>
        
        <div>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Please enter a valid email address'
                }
              })}
              type="email"
              placeholder="Email Address"
              className={`w-full pl-10 pr-4 py-2 rounded-lg bg-gray-700 border text-white placeholder-gray-400 focus:outline-none ${
                errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-600 focus:border-blue-500'
              }`}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
          )}
        </div>
        
        <div>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              {...register('phone', {
                pattern: {
                  value: /^[\+]?[1-9][\d]{0,15}$/,
                  message: 'Please enter a valid phone number'
                }
              })}
              type="tel"
              placeholder="Phone Number (optional)"
              className={`w-full pl-10 pr-4 py-2 rounded-lg bg-gray-700 border text-white placeholder-gray-400 focus:outline-none ${
                errors.phone ? 'border-red-500 focus:border-red-500' : 'border-gray-600 focus:border-blue-500'
              }`}
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-sm text-red-400">{errors.phone.message}</p>
          )}
        </div>
        
        <div>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <select 
              {...register('neighborhood', { 
                required: 'Please select a neighborhood' 
              })}
              aria-label="Select interested neighborhood"
              title="Select interested neighborhood"
              className={`w-full pl-10 pr-4 py-2 rounded-lg bg-gray-700 border text-white focus:outline-none ${
                errors.neighborhood ? 'border-red-500 focus:border-red-500' : 'border-gray-600 focus:border-blue-500'
              }`}
            >
              <option value="">Select Neighborhood</option>
              {neighborhoods.map(neighborhood => (
                <option key={neighborhood} value={neighborhood}>
                  {neighborhood}
                </option>
              ))}
            </select>
          </div>
          {errors.neighborhood && (
            <p className="mt-1 text-sm text-red-400">{errors.neighborhood.message}</p>
          )}
        </div>
        
        <button 
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            'Get Market Updates'
          )}
        </button>
      </form>
    </div>
  )
}

export default ReactHookForm
