'use client'

import React from 'react'
import { X } from 'lucide-react'
import CalendlyInlineWidget from './CalendlyInlineWidget'

interface ExitIntentPopupProps {
  isVisible: boolean
  onClose: () => void
}

const ExitIntentPopup: React.FC<ExitIntentPopupProps> = ({ isVisible, onClose }) => {
  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 border-b shrink-0">
          <h3 className="text-xl font-bold text-gray-900">
            Schedule Your Private Tour with Dr. Jan
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            aria-label="Close popup"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="flex-1 min-h-0 p-4">
          <CalendlyInlineWidget
            url="https://calendly.com/drjanduffy/open-house-tour"
            minWidth={320}
            height={600}
            className="rounded-lg overflow-hidden w-full"
          />
        </div>
      </div>
    </div>
  )
}

export default ExitIntentPopup
