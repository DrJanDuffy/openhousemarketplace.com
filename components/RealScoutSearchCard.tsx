'use client'

import React, { useEffect, useState } from 'react'

export default function RealScoutSearchCard() {
  const [isWidgetLoaded, setIsWidgetLoaded] = useState(false)

  useEffect(() => {
    const checkWidget = setInterval(() => {
      if (typeof window !== 'undefined' && (window as any).customElements?.get('realscout-advanced-search')) {
        setIsWidgetLoaded(true)
        clearInterval(checkWidget)
      }
    }, 100)

    const timeout = setTimeout(() => clearInterval(checkWidget), 5000)
    return () => {
      clearInterval(checkWidget)
      clearTimeout(timeout)
    }
  }, [])

  return (
    <div>
      <div className="realscout-search-container">
        {!isWidgetLoaded && (
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded-lg mb-3"></div>
            <div className="h-12 bg-gray-200 rounded-lg mb-3"></div>
            <div className="h-12 bg-red-200 rounded-lg"></div>
          </div>
        )}
        {/* @ts-expect-error - Web component is defined at runtime */}
        <realscout-advanced-search
          agent-encoded-id="QWdlbnQtMjI1MDUw"
          class={isWidgetLoaded ? 'opacity-100' : 'opacity-0'}
          style={{ transition: 'opacity 0.3s ease-in-out' } as any}
        />
      </div>

      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200 mt-6">
        <div className="text-center">
          <div className="text-lg sm:text-2xl font-bold text-blue-600">6</div>
          <div className="text-xs text-gray-600">Open Houses</div>
        </div>
        <div className="text-center">
          <div className="text-lg sm:text-2xl font-bold text-blue-600">14</div>
          <div className="text-xs text-gray-600">Avg Days</div>
        </div>
        <div className="text-center">
          <div className="text-lg sm:text-2xl font-bold text-blue-600">98%</div>
          <div className="text-xs text-gray-600">Success Rate</div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <a
          href="https://drjanduffy.realscout.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block py-2.5 text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          Advanced Search Options →
        </a>
      </div>
    </div>
  )
}


