'use client'

import { useState } from 'react'
import CalendlyPopupLink from '@/components/CalendlyPopupLink'
import {
  HEAR_ABOUT_SOURCES,
  PURCHASE_TIMELINES,
  PRE_APPROVED_OPTIONS,
  type OpenHouseSignInBody,
  openHouseSignInBodySchema,
} from '@/lib/open-house-signin-schema'
import { NEIGHBORHOODS } from '@/lib/neighborhoods'

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 10)
  if (digits.length <= 3) return digits ? `(${digits}` : ''
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

type FormErrors = Partial<Record<keyof OpenHouseSignInBody, string>>

type Props = {
  listingId: string
  listingAddress?: string
}

export default function OpenHouseSignInForm({ listingId, listingAddress }: Props) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [workingWithAgent, setWorkingWithAgent] = useState<boolean>(false)
  const [agentName, setAgentName] = useState('')
  const [hearAboutSource, setHearAboutSource] = useState<string>('')
  const [preApproved, setPreApproved] = useState<string>('')
  const [purchaseTimeline, setPurchaseTimeline] = useState<string>('')
  const [interestedNeighborhoods, setInterestedNeighborhoods] = useState<string[]>([])
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value)
    setPhone(formatted)
  }

  const toggleNeighborhood = (slug: string) => {
    setInterestedNeighborhoods((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')
    setErrors({})
    const phoneDigits = phone.replace(/\D/g, '')
    const payload = {
      listingId,
      listingAddress: listingAddress ?? '',
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phoneDigits,
      workingWithAgent,
      agentName: agentName.trim() || undefined,
      hearAboutSource: hearAboutSource || undefined,
      preApproved: (preApproved || undefined) as 'yes' | 'no' | 'cash' | undefined,
      purchaseTimeline: purchaseTimeline || undefined,
      interestedNeighborhoods: interestedNeighborhoods.length ? interestedNeighborhoods : undefined,
    }
    const parsed = openHouseSignInBodySchema.safeParse(payload)
    if (!parsed.success) {
      const fieldErrors: FormErrors = {}
      for (const issue of parsed.error.issues) {
        const path = issue.path[0] as keyof OpenHouseSignInBody
        if (path) fieldErrors[path] = issue.message
      }
      setErrors(fieldErrors)
      setStatus('error')
      setErrorMessage(parsed.error.issues.map((i) => i.message).join('. '))
      return
    }
    setStatus('submitting')
    try {
      const res = await fetch('/api/open-house-signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data as OpenHouseSignInBody),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error((data as { error?: string }).error || `Request failed: ${res.status}`)
      }
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-xl bg-white p-6 shadow-lg border border-gray-100 space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 text-center">Thank you for visiting!</h2>
        <p className="text-gray-600 text-center">
          We&apos;ll follow up with you soon. In the meantime:
        </p>
        <div className="flex flex-col gap-3">
          <a
            href="/open-houses"
            className="block w-full text-center rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-3 transition-colors"
          >
            Browse more open houses
          </a>
          <CalendlyPopupLink className="block w-full text-center rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-4 py-3 transition-colors">
            Schedule a private showing
          </CalendlyPopupLink>
          <a
            href="/open-houses"
            className="block w-full text-center text-blue-600 font-medium hover:underline"
          >
            View open houses
          </a>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="oh-fullName" className="block text-sm font-medium text-gray-700 mb-1">
          Full name <span className="text-red-600">*</span>
        </label>
        <input
          id="oh-fullName"
          type="text"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          placeholder="Jane Smith"
          disabled={status === 'submitting'}
        />
        {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
      </div>
      <div>
        <label htmlFor="oh-email" className="block text-sm font-medium text-gray-700 mb-1">
          Email <span className="text-red-600">*</span>
        </label>
        <input
          id="oh-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          placeholder="jane@example.com"
          disabled={status === 'submitting'}
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="oh-phone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone <span className="text-red-600">*</span>
        </label>
        <input
          id="oh-phone"
          type="tel"
          required
          value={phone}
          onChange={handlePhoneChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          placeholder="(702) 555-1234"
          disabled={status === 'submitting'}
        />
        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
      </div>
      <div>
        <p className="block text-sm font-medium text-gray-700 mb-2">Are you working with an agent?</p>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="workingWithAgent"
              checked={workingWithAgent === true}
              onChange={() => setWorkingWithAgent(true)}
              disabled={status === 'submitting'}
              className="rounded-full border-gray-300"
            />
            <span>Yes</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="workingWithAgent"
              checked={workingWithAgent === false}
              onChange={() => setWorkingWithAgent(false)}
              disabled={status === 'submitting'}
              className="rounded-full border-gray-300"
            />
            <span>No</span>
          </label>
        </div>
        {workingWithAgent && (
          <input
            type="text"
            value={agentName}
            onChange={(e) => setAgentName(e.target.value)}
            placeholder="Agent name (optional)"
            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 text-base focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            disabled={status === 'submitting'}
          />
        )}
      </div>
      <div>
        <label htmlFor="oh-hearAbout" className="block text-sm font-medium text-gray-700 mb-1">
          How did you hear about this open house? <span className="text-red-600">*</span>
        </label>
        <select
          id="oh-hearAbout"
          required
          value={hearAboutSource}
          onChange={(e) => setHearAboutSource(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          disabled={status === 'submitting'}
        >
          <option value="">Select...</option>
          {HEAR_ABOUT_SOURCES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {errors.hearAboutSource && (
          <p className="mt-1 text-sm text-red-600">{errors.hearAboutSource}</p>
        )}
      </div>
      <div>
        <p className="block text-sm font-medium text-gray-700 mb-2">
          Are you pre-approved for a mortgage? <span className="text-red-600">*</span>
        </p>
        <div className="flex flex-wrap gap-3">
          {PRE_APPROVED_OPTIONS.map((opt) => (
            <label key={opt} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="preApproved"
                value={opt}
                checked={preApproved === opt}
                onChange={(e) => setPreApproved(e.target.value)}
                disabled={status === 'submitting'}
                className="rounded-full border-gray-300"
              />
              <span className="capitalize">{opt === 'cash' ? 'Cash buyer' : opt}</span>
            </label>
          ))}
        </div>
        {errors.preApproved && <p className="mt-1 text-sm text-red-600">{errors.preApproved}</p>}
      </div>
      <div>
        <label htmlFor="oh-timeline" className="block text-sm font-medium text-gray-700 mb-1">
          What is your timeline to purchase? <span className="text-red-600">*</span>
        </label>
        <select
          id="oh-timeline"
          required
          value={purchaseTimeline}
          onChange={(e) => setPurchaseTimeline(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          disabled={status === 'submitting'}
        >
          <option value="">Select...</option>
          {PURCHASE_TIMELINES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        {errors.purchaseTimeline && (
          <p className="mt-1 text-sm text-red-600">{errors.purchaseTimeline}</p>
        )}
      </div>
      <div>
        <p className="block text-sm font-medium text-gray-700 mb-2">
          What neighborhoods are you interested in? (optional)
        </p>
        <div className="flex flex-col gap-2 max-h-40 overflow-y-auto rounded-lg border border-gray-200 p-3">
          {NEIGHBORHOODS.map((n) => (
            <label key={n.slug} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={interestedNeighborhoods.includes(n.slug)}
                onChange={() => toggleNeighborhood(n.slug)}
                disabled={status === 'submitting'}
                className="rounded border-gray-300"
              />
              <span>{n.label}</span>
            </label>
          ))}
        </div>
      </div>
      {status === 'error' && (
        <p className="text-red-600 font-medium">{errorMessage}</p>
      )}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full rounded-lg bg-blue-600 px-4 py-4 text-lg font-semibold text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
      >
        {status === 'submitting' ? 'Submitting…' : 'Submit'}
      </button>
    </form>
  )
}
