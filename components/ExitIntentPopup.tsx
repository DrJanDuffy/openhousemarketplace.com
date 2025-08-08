'use client'

import React, { useState, useEffect } from 'react'
import { X, Download, Star } from 'lucide-react'

interface ExitIntentPopupProps {
  isVisible: boolean
  onClose: () => void
}

const ExitIntentPopup: React.FC<ExitIntentPopupProps> = ({ isVisible, onClose }) => {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitted(true)
    setIsSubmitting(false)
    
    // Close popup after 3 seconds
    setTimeout(() => {
      onClose()
    }, 3000)
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full shadow-2xl">
        <div className="relative">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
            aria-label="Close popup"
          >
            <X className="h-6 w-6" />
          </button>
          
          {/* Content */}
          <div className="p-8">
            {!isSubmitted ? (
              <>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Download className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Wait! Don't Miss Out
                  </h3>
                  <p className="text-gray-600">
                    Get your FREE 2025 Summerlin West Pricing Guide before you go
                  </p>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">What's Inside:</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-2" />
                      Current market trends & predictions
                    </li>
                    <li className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-2" />
                      Neighborhood price comparisons
                    </li>
                    <li className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-2" />
                      Investment opportunities
                    </li>
                    <li className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-2" />
                      Exclusive buyer/seller tips
                    </li>
                  </ul>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      'Sending...'
                    ) : (
                      <>
                        <Download className="h-4 w-4 mr-2" />
                        Get My FREE Guide
                      </>
                    )}
                  </button>
                </form>
                
                <p className="text-xs text-gray-500 text-center mt-4">
                  No spam. Unsubscribe anytime. Your privacy is protected.
                </p>
              </>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Thank You!
                </h3>
                <p className="text-gray-600">
                  Your 2025 Summerlin West Pricing Guide is on its way to your inbox.
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Check your email in the next few minutes.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExitIntentPopup
