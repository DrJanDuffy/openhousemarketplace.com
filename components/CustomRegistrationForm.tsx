'use client'

import React, { useState } from 'react'
import { Home, User, Mail, Phone, MapPin, Calendar, Clock, Info } from 'lucide-react'

interface FormField {
  id: string
  label: string
  type: 'text' | 'email' | 'tel' | 'select' | 'textarea' | 'date' | 'time'
  required: boolean
  options?: string[]
  placeholder?: string
}

interface CustomRegistrationFormProps {
  propertyId?: string
  propertyAddress?: string
  formType: 'light' | 'full'
  onSubmit: (data: any) => void
  className?: string
}

const CustomRegistrationForm: React.FC<CustomRegistrationFormProps> = ({
  propertyId = 'default',
  propertyAddress = '',
  formType = 'light',
  onSubmit,
  className = ""
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    buyingTimeframe: '',
    priceRange: '',
    prequalified: '',
    currentlyWorking: '',
    notes: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const fields: FormField[] = [
    { id: 'firstName', label: 'First Name', type: 'text', required: true, placeholder: 'First Name' },
    { id: 'lastName', label: 'Last Name', type: 'text', required: true, placeholder: 'Last Name' },
    { id: 'email', label: 'Email', type: 'email', required: true, placeholder: 'Email' },
    { id: 'phone', label: 'Phone', type: 'tel', required: true, placeholder: 'Phone Number' }
  ]

  const fields = formType === 'light' ? lightFields : fullFields

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Add property info to form data
      const submitData = {
        ...formData,
        propertyId,
        propertyAddress,
        source: 'Open House Registration',
        registrationType: formType,
        registrationDate: new Date().toISOString()
      }

      await onSubmit(submitData)
      setSubmitStatus('success')
      
      // Reset form after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        preferredDate: '',
        preferredTime: '',
        buyingTimeframe: '',
        priceRange: '',
        prequalified: '',
        currentlyWorking: '',
        notes: ''
      })
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
      {/* Property Image Header */}
      {propertyAddress && (
        <div className="relative">
          <img 
            src={`/images/properties/${propertyId || 'default'}.jpg`}
            alt={propertyAddress}
            className="w-full h-48 object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/images/default-property.jpg';
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <div className="text-white">
              <div className="text-sm font-medium">{propertyAddress}</div>
              <div className="text-2xl font-bold">$720,000</div>
            </div>
          </div>
        </div>
      )}

      {/* Form Header */}
      <div className="p-6">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Open House Registration
          </h3>
          <p className="text-gray-600">
            Tuesday, July 4, 2023<br />
            8 AM - 5 PM
          </p>
        </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          {fields.slice(0, 2).map(field => (
            <input
              key={field.id}
              type={field.type}
              name={field.id}
              value={formData[field.id as keyof typeof formData]}
              onChange={handleInputChange}
              required={field.required}
              placeholder={field.placeholder}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-sm"
              aria-label={field.label}
            />
          ))}
        </div>
        
        {fields.slice(2).map(field => (
          <input
            key={field.id}
            type={field.type}
            name={field.id}
            value={formData[field.id as keyof typeof formData]}
            onChange={handleInputChange}
            required={field.required}
            placeholder={field.placeholder}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-sm"
            aria-label={field.label}
          />
        ))}

        <div className="flex items-center mt-2">
          <input
            type="checkbox"
            id="termsCheckbox"
            className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
          />
          <label htmlFor="termsCheckbox" className="ml-2 text-xs text-gray-500">
            I am interested and/or affiliated with properties on this market.
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-md font-medium text-sm uppercase tracking-wide mt-4"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 inline-block"></div>
              Submitting...
            </>
          ) : (
            'REGISTER'
          )}
        </button>
      </form>

      {submitStatus === 'success' && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 text-sm">
            Registration successful! We'll be in touch shortly.
          </p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 text-sm">
            There was an error submitting your registration. Please try again.
          </p>
        </div>
      )}
    </div>
  )
}

export default CustomRegistrationForm
