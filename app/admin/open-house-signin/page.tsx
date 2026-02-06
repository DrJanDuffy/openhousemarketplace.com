'use client'

import { useState, useEffect } from 'react'

type Submission = {
  id: string
  listingId: string
  listingAddress: string
  fullName: string
  email: string
  phone: string
  workingWithAgent: boolean
  agentName?: string
  hearAboutSource: string
  preApproved: string
  purchaseTimeline: string
  interestedNeighborhoods?: string[]
  submittedAt: string
}

export default function AdminOpenHouseSignInPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loginSubmitting, setLoginSubmitting] = useState(false)

  const [listingId, setListingId] = useState('')
  const [listingAddress, setListingAddress] = useState('')
  const [qrUrl, setQrUrl] = useState<string | null>(null)
  const [saveSubmitting, setSaveSubmitting] = useState(false)

  const [fetchListingId, setFetchListingId] = useState('')
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [submissionsLoading, setSubmissionsLoading] = useState(false)
  const [submissionsError, setSubmissionsError] = useState('')

  useEffect(() => {
    fetch('/api/open-house-signin', { credentials: 'include' })
      .then((r) => {
        if (r.status === 401) setAuthenticated(false)
        else setAuthenticated(true)
      })
      .catch(() => setAuthenticated(false))
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    setLoginSubmitting(true)
    try {
      const res = await fetch('/api/open-house-signin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ password }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        if (res.status === 503) {
          setLoginError('Admin not configured. Set OPEN_HOUSE_ADMIN_PASSWORD in the environment.')
        } else {
          setLoginError((data as { error?: string }).error || 'Login failed')
        }
        return
      }
      setAuthenticated(true)
      setPassword('')
    } finally {
      setLoginSubmitting(false)
    }
  }

  const handleSaveAndGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    const id = listingId.trim()
    if (!id) return
    setSaveSubmitting(true)
    setQrUrl(null)
    try {
      await fetch('/api/open-house-signin/listing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ listingId: id, listingAddress: listingAddress.trim() }),
      })
      setQrUrl(`/api/open-house-signin/qr?listingId=${encodeURIComponent(id)}`)
    } finally {
      setSaveSubmitting(false)
    }
  }

  const handleLoadSubmissions = async (e: React.FormEvent) => {
    e.preventDefault()
    const id = fetchListingId.trim()
    if (!id) return
    setSubmissionsLoading(true)
    setSubmissionsError('')
    try {
      const res = await fetch(`/api/open-house-signin?listingId=${encodeURIComponent(id)}`, {
        credentials: 'include',
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setSubmissionsError((data as { error?: string }).error || 'Failed to load')
        setSubmissions([])
        return
      }
      setSubmissions((data as { submissions?: Submission[] }).submissions ?? [])
    } finally {
      setSubmissionsLoading(false)
    }
  }

  if (authenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600">Loading...</p>
      </div>
    )
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <form onSubmit={handleLogin} className="bg-white rounded-lg shadow p-6 w-full max-w-sm">
          <h1 className="text-xl font-bold text-gray-900 mb-4">Open House Sign-In Admin</h1>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 mb-4"
            placeholder="Admin password"
            required
            disabled={loginSubmitting}
          />
          {loginError && <p className="text-red-600 text-sm mb-2">{loginError}</p>}
          <button
            type="submit"
            disabled={loginSubmitting}
            className="w-full rounded-lg bg-blue-600 text-white font-semibold py-2 hover:bg-blue-700 disabled:opacity-50"
          >
            {loginSubmitting ? 'Logging in…' : 'Log in'}
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold text-gray-900">Open House Sign-In Admin</h1>

        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Generate QR code</h2>
          <form onSubmit={handleSaveAndGenerate} className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Listing ID</label>
              <input
                type="text"
                value={listingId}
                onChange={(e) => setListingId(e.target.value)}
                placeholder="e.g. 123-main-st or MLS ID"
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                required
                disabled={saveSubmitting}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Listing address (optional)
              </label>
              <input
                type="text"
                value={listingAddress}
                onChange={(e) => setListingAddress(e.target.value)}
                placeholder="e.g. 123 Main St, Summerlin"
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                disabled={saveSubmitting}
              />
            </div>
            <button
              type="submit"
              disabled={saveSubmitting}
              className="rounded-lg bg-blue-600 text-white font-semibold px-4 py-2 hover:bg-blue-700 disabled:opacity-50"
            >
              {saveSubmitting ? 'Saving…' : 'Save & generate QR'}
            </button>
          </form>
          {qrUrl && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-2">Scan or download the QR code:</p>
              <img
                src={qrUrl}
                alt="QR code for open house sign-in"
                className="inline-block border border-gray-200 rounded"
              />
              <div className="mt-2">
                <a
                  href={qrUrl}
                  download={`open-house-signin-${listingId}.png`}
                  className="text-blue-600 font-medium hover:underline"
                >
                  Download PNG
                </a>
              </div>
            </div>
          )}
        </section>

        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">View submissions</h2>
          <form onSubmit={handleLoadSubmissions} className="flex gap-2 mb-4">
            <input
              type="text"
              value={fetchListingId}
              onChange={(e) => setFetchListingId(e.target.value)}
              placeholder="Listing ID"
              className="flex-1 rounded-lg border border-gray-300 px-3 py-2"
              disabled={submissionsLoading}
            />
            <button
              type="submit"
              disabled={submissionsLoading}
              className="rounded-lg bg-gray-700 text-white font-semibold px-4 py-2 hover:bg-gray-800 disabled:opacity-50"
            >
              {submissionsLoading ? 'Loading…' : 'Load'}
            </button>
          </form>
          {submissionsError && (
            <p className="text-red-600 text-sm mb-2">{submissionsError}</p>
          )}
          {submissions.length === 0 && !submissionsLoading && (
            <p className="text-gray-500 text-sm">Enter a listing ID and click Load.</p>
          )}
          {submissions.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-left">
                    <th className="py-2 pr-2">Name</th>
                    <th className="py-2 pr-2">Email</th>
                    <th className="py-2 pr-2">Phone</th>
                    <th className="py-2 pr-2">Heard from</th>
                    <th className="py-2 pr-2">Pre-approved</th>
                    <th className="py-2 pr-2">Timeline</th>
                    <th className="py-2">Submitted</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((s) => (
                    <tr key={s.id} className="border-b border-gray-100">
                      <td className="py-2 pr-2">{s.fullName}</td>
                      <td className="py-2 pr-2">{s.email}</td>
                      <td className="py-2 pr-2">{s.phone}</td>
                      <td className="py-2 pr-2">{s.hearAboutSource}</td>
                      <td className="py-2 pr-2">{s.preApproved}</td>
                      <td className="py-2 pr-2">{s.purchaseTimeline}</td>
                      <td className="py-2">
                        {new Date(s.submittedAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
