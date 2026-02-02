'use client'

import React, { useEffect, useRef } from 'react'
import { X } from 'lucide-react'

const CALENDLY_URL = 'https://calendly.com/drjanduffy/open-house-tour'

interface ExitIntentPopupProps {
  isVisible: boolean
  onClose: () => void
}

const ExitIntentPopup: React.FC<ExitIntentPopupProps> = ({ isVisible, onClose }) => {
  const widgetContainerRef = useRef<HTMLDivElement>(null)

  // Initialize Calendly inline widget when popup opens (script only scans DOM on load, so we must init manually)
  useEffect(() => {
    if (!isVisible || !widgetContainerRef.current) return

    const el = widgetContainerRef.current
    el.innerHTML = '' // avoid duplicate iframes if popup is reopened

    const init = () => {
      if (typeof window !== 'undefined' && window.Calendly?.initInlineWidget && el) {
        window.Calendly.initInlineWidget({
          url: CALENDLY_URL,
          parentElement: el,
        })
      }
    }

    if (window.Calendly?.initInlineWidget) {
      init()
    } else {
      // Script may not be loaded yet (e.g. badge loads afterInteractive); wait for it
      const check = setInterval(() => {
        if (window.Calendly?.initInlineWidget) {
          clearInterval(check)
          init()
        }
      }, 100)
      return () => clearInterval(check)
    }
  }, [isVisible])

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
        <div
          ref={widgetContainerRef}
          className="flex-1 min-h-[500px] w-full p-4"
          aria-label="Schedule a meeting with Dr. Jan Duffy"
        />
      </div>
    </div>
  )
}

export default ExitIntentPopup
