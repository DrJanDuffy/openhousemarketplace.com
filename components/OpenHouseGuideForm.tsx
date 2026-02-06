'use client'

import { useState } from 'react'

const TO_EMAIL = 'buyers@openhousemarketplace.com'

export default function OpenHouseGuideForm() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('submitting')
    setErrorMessage('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim() || 'Open House Guide Request',
          email: email.trim(),
          phone: '',
          subject: 'Free Open House Touring Guide',
          message: 'I would like to receive the free Open House Touring Guide.',
          contactType: 'buyer',
          toEmail: TO_EMAIL,
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error((data as { error?: string }).error || `Request failed: ${res.status}`)
      }
      setStatus('success')
      setEmail('')
      setName('')
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="guide-email" className="block text-sm font-medium text-gray-700 mb-1">
          Email <span className="text-red-600">*</span>
        </label>
        <input
          id="guide-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          placeholder="you@example.com"
          disabled={status === 'submitting'}
        />
      </div>
      <div>
        <label htmlFor="guide-name" className="block text-sm font-medium text-gray-700 mb-1">
          Name (optional)
        </label>
        <input
          id="guide-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          placeholder="Your name"
          disabled={status === 'submitting'}
        />
      </div>
      {status === 'success' && (
        <p className="text-green-700 font-medium">Thanks! We&apos;ll send your guide shortly.</p>
      )}
      {status === 'error' && (
        <p className="text-red-600 font-medium">{errorMessage || 'Something went wrong. Please try again.'}</p>
      )}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
      >
        {status === 'submitting' ? 'Sending…' : 'Get My Free Guide'}
      </button>
    </form>
  )
}
