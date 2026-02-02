'use client'

import { useState } from 'react'
import CalendlyInlineWidget from '@/components/CalendlyInlineWidget'
import CalendlyPopupLink from '@/components/CalendlyPopupLink'

export default function TestForm() {
  const [result, setResult] = useState<any>(null)

  const testEnv = async () => {
    try {
      const response = await fetch('/api/test-env')
      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    }
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">API Test Page</h1>

      <h2 className="text-xl font-semibold mb-2">About This Page</h2>
      <p className="text-gray-600 mb-4">
        Use the button below to test environment variables. To schedule a tour with Dr. Jan Duffy, use the Calendly widget.
      </p>

      <h2 className="text-xl font-semibold mb-2">Schedule a Tour</h2>
      <p className="text-gray-600 mb-4">Book a private tour or consultation with Dr. Jan Duffy.</p>
      <CalendlyPopupLink className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium mb-6">
        Schedule Your Private Tour with Dr. Jan
      </CalendlyPopupLink>

      <CalendlyInlineWidget
        url="https://calendly.com/drjanduffy/open-house-tour"
        minWidth={320}
        height={600}
        className="rounded-xl overflow-hidden mb-8"
      />

      <h2 className="text-xl font-semibold mb-2">Test Actions</h2>
      <div className="space-y-4 mb-6">
        <button
          onClick={testEnv}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Test Environment Variables
        </button>
      </div>

      {result && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Result</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}
