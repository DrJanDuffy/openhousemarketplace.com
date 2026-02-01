'use client'

import { useState } from 'react'

export default function TestForm() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const testForm = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: 'Test',
          lastName: 'User',
          email: 'test@example.com',
          phone: '555-1234',
          propertyAddress: 'Test Neighborhood',
          source: 'Test Form',
          registrationType: 'light',
          notes: 'Test submission'
        })
      })

      const data = await response.json()
      setResult({
        status: response.status,
        ok: response.ok,
        data
      })
    } catch (error) {
      setResult({
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    } finally {
      setLoading(false)
    }
  }

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
      <p className="text-gray-600 mb-4">Use the buttons below to test environment variables and lead form submission.</p>

      <h2 className="text-xl font-semibold mb-2">Test Actions</h2>
      <div className="space-y-4 mb-6">
        <button
          onClick={testEnv}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Test Environment Variables
        </button>

        <button
          onClick={testForm}
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          {loading ? 'Testing...' : 'Test Form Submission'}
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
