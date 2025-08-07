'use client'

import React, { useState } from 'react'
import { User, Clock, CheckCircle, ArrowRight } from 'lucide-react'

interface DigitalSignInProps {
  propertyId?: string
  propertyAddress?: string
  openHouseTime?: string
  className?: string
}

const DigitalSignIn: React.FC<DigitalSignInProps> = ({
  propertyId = 'default',
  propertyAddress = 'Summerlin West Property',
  openHouseTime = 'Saturday 1-4 PM',
  className = ""
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Las Vegas',
    state: 'NV',
    zipCode: '',
    howDidYouHear: '',
    interestedIn: 'buying',
    timeline: 'within_6_months',
    budget: '',
    notes: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

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

    try {
      // Submit to Followup Boss CRM
      const crmPayload = {
        people: [{
          firstName: formData.firstName,
          lastName: formData.lastName,
          emails: [{ value: formData.email, type: 'work' }],
          phones: formData.phone ? [{ value: formData.phone, type: 'mobile' }] : [],
          addresses: formData.address ? [{
            address: formData.address,
            city: formData.city,
            state: formData.state,
            zip: formData.zipCode
          }] : [],
          tags: ['Open House Sign-In', 'Summerlin West', formData.howDidYouHear].filter(Boolean),
          customFields: {
            'Property Address': propertyAddress,
            'Open House Time': openHouseTime,
            'How Did You Hear': formData.howDidYouHear,
            'Interested In': formData.interestedIn,
            'Timeline': formData.timeline,
            'Budget': formData.budget,
            'Notes': formData.notes,
            'Lead Source': 'Digital Sign-In'
          }
        }]
      }

      const response = await fetch('https://api.followupboss.com/v1/people', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${btoa('fka_0N4mnNxym6FYyqt91G2eaemnqC8TTOSYru:')}`
        },
        body: JSON.stringify(crmPayload)
      })

      if (response.ok) {
        setIsSubmitted(true)
        
        // Store in localStorage for offline sync
        const offlineSubmission = {
          ...formData,
          propertyId,
          propertyAddress,
          openHouseTime,
          timestamp: new Date().toISOString(),
          synced: true
        }

        const existingSubmissions = JSON.parse(localStorage.getItem('offline_signins') || '[]') as any[]
        existingSubmissions.push(offlineSubmission)
        localStorage.setItem('offline_signins', JSON.stringify(existingSubmissions))

        console.log('Sign-in submitted successfully')
      } else {
        throw new Error('Failed to submit sign-in')
      }
    } catch (error) {
      console.error('Error submitting sign-in:', error)
      
      // Store for offline sync
      const offlineSubmission = {
        ...formData,
        propertyId,
        propertyAddress,
        openHouseTime,
        timestamp: new Date().toISOString(),
        synced: false
      }

      const existingSubmissions = JSON.parse(localStorage.getItem('offline_signins') || '[]') as any[]
      existingSubmissions.push(offlineSubmission)
      localStorage.setItem('offline_signins', JSON.stringify(existingSubmissions))
      
      setIsSubmitted(true) // Show success even if offline
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  if (isSubmitted) {
    return (
      <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
        <div className="text-center">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
          <p className="text-gray-600 mb-4">
            Your sign-in has been recorded. Dr. Jan Duffy will be in touch soon!
          </p>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-2">What's Next?</h4>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• Receive property details via email</li>
              <li>• Get notified about similar listings</li>
              <li>• Schedule a private tour</li>
              <li>• Access exclusive Summerlin West insights</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <div className="text-center mb-6">
        <User className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">Digital Sign-In</h3>
        <p className="text-gray-600">Welcome to {propertyAddress}</p>
        <div className="flex items-center justify-center mt-2 text-sm text-gray-500">
          <Clock className="h-4 w-4 mr-1" />
          {openHouseTime}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                                 <input
                   type="text"
                   name="firstName"
                   value={formData.firstName}
                   onChange={handleInputChange}
                   required
                   placeholder="Enter your first name"
                   title="Enter your first name"
                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                 />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                                 <input
                   type="text"
                   name="lastName"
                   value={formData.lastName}
                   onChange={handleInputChange}
                   required
                   placeholder="Enter your last name"
                   title="Enter your last name"
                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                 />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
                             <input
                 type="email"
                 name="email"
                 value={formData.email}
                 onChange={handleInputChange}
                 required
                 placeholder="Enter your email address"
                 title="Enter your email address"
                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
               />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                title="Enter your phone number"
                aria-label="Phone number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        )}

        {/* Step 2: Property Interest */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                How did you hear about this open house?
              </label>
              <select
                name="howDidYouHear"
                value={formData.howDidYouHear}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                aria-label="Select how you heard about this open house"
                title="Select how you heard about this open house"
              >
                <option value="">Select an option</option>
                <option value="Yard Sign">Yard Sign</option>
                <option value="Online Search">Online Search</option>
                <option value="Social Media">Social Media</option>
                <option value="Friend/Family">Friend/Family</option>
                <option value="Real Estate Agent">Real Estate Agent</option>
                <option value="Dr. Jan Duffy">Dr. Jan Duffy</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                What are you interested in?
              </label>
              <select
                name="interestedIn"
                value={formData.interestedIn}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                aria-label="Select what you are interested in"
                title="Select what you are interested in"
              >
                <option value="buying">Buying</option>
                <option value="selling">Selling</option>
                <option value="both">Both</option>
                <option value="just_browsing">Just Browsing</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Timeline
              </label>
              <select
                name="timeline"
                value={formData.timeline}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                aria-label="Select your timeline"
                title="Select your timeline"
              >
                <option value="immediately">Immediately</option>
                <option value="within_3_months">Within 3 months</option>
                <option value="within_6_months">Within 6 months</option>
                <option value="within_1_year">Within 1 year</option>
                <option value="no_timeline">No specific timeline</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Budget Range
              </label>
              <input
                type="text"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                placeholder="e.g., $500K - $1M"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        )}

        {/* Step 3: Additional Information */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Address (optional)
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Street address"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Enter city"
                  title="Enter city"
                  aria-label="City"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="Enter state"
                  title="Enter state"
                  aria-label="State"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ZIP Code
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  placeholder="Enter ZIP code"
                  title="Enter ZIP code"
                  aria-label="ZIP code"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={3}
                placeholder="Any specific requirements or questions..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between pt-4">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium"
            >
              Previous
            </button>
          )}
          
          {currentStep < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium flex items-center ml-auto"
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium flex items-center ml-auto"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting...
                </>
              ) : (
                <>
                  Submit Sign-In
                  <CheckCircle className="h-4 w-4 ml-2" />
                </>
              )}
            </button>
          )}
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center space-x-2 mt-4">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`w-3 h-3 rounded-full ${
                step <= currentStep ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </form>
    </div>
  )
}

export default DigitalSignIn
