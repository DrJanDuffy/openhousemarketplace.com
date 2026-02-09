'use client'

import Link from 'next/link'
import { Home, Phone, Menu, Calendar, ChevronDown } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import CalendlyPopupLink from '@/components/CalendlyPopupLink'
import { GBP } from '@/config/gbp'

type NavItem = { href: string; label: string; primary?: boolean }
type NavGroup = { label: string; items: NavItem[] }

const NAV_GROUPS: NavGroup[] = [
  {
    label: 'Find a Home',
    items: [
      { href: '/tour/mls', label: 'Search Listings', primary: true },
      { href: '/buyers', label: 'Buyer Tools' },
    ],
  },
  {
    label: 'Open Houses',
    items: [
      { href: '/open-houses', label: 'Open Houses' },
      { href: '/open-house-guide', label: 'Open House Guide' },
    ],
  },
  {
    label: 'Locations & Map',
    items: [
      { href: '/store-locations', label: 'Find Our Stores' },
      { href: '/directions', label: 'Get Directions' },
      { href: '/amenity-map', label: 'Amenity Map' },
    ],
  },
]

const NAV_SINGLE: NavItem[] = [
  { href: '/neighborhoods', label: 'Neighborhoods' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

const PHONE = { display: GBP.phone, href: `tel:${GBP.phoneE164}` }
const FEATURED_ADDRESS = `${GBP.address.street}, ${GBP.address.locality}, ${GBP.address.region} ${GBP.address.postalCode}`

function NavDropdown({ group }: { group: NavGroup }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!open) return
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('click', close)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('click', close)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])
  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-0.5 px-3 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium transition-colors"
        aria-expanded={String(open)}
        aria-haspopup="true"
        aria-controls={`nav-menu-${group.label.replace(/\s+/g, '-')}`}
        id={`nav-trigger-${group.label.replace(/\s+/g, '-')}`}
      >
        {group.label}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden />
      </button>
      {open && (
        <ul
          id={`nav-menu-${group.label.replace(/\s+/g, '-')}`}
          role="menu"
          aria-labelledby={`nav-trigger-${group.label.replace(/\s+/g, '-')}`}
          className="absolute left-0 top-full mt-1 min-w-[200px] list-none rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
        >
          {group.items.map(({ href, label, primary }) => (
            <li key={href} role="menuitem">
              <Link
                href={href}
                className={
                  primary
                    ? 'block px-4 py-2 text-red-600 hover:bg-red-50 font-semibold'
                    : 'block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium'
                }
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileGroupOpen, setMobileGroupOpen] = useState<string | null>(null)

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-18">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-900 hover:text-blue-600 transition-colors"
            aria-label="Open House Market Place - Home"
          >
            <Home className="h-7 w-7 text-red-600 shrink-0" aria-hidden />
            <div>
              <span className="font-bold text-lg">Open House Market Place</span>
              <span className="hidden sm:block text-xs text-gray-500 font-normal">{FEATURED_ADDRESS}</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main">
            <Link href="/" className="px-3 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium transition-colors">
              Home
            </Link>
            <Link href="/tour/mls" className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 font-semibold transition-colors">
              Search Listings
            </Link>
            {NAV_GROUPS.map((group) => (
              <NavDropdown key={group.label} group={group} />
            ))}
            {NAV_SINGLE.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="px-3 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium transition-colors"
              >
                {label}
              </Link>
            ))}
            {/* Appointment CTAs – visible for one-click booking */}
            <span className="ml-2 flex items-center gap-1 border-l border-gray-200 pl-2">
              <CalendlyPopupLink className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0069ff] text-white hover:bg-[#0052cc] font-semibold transition-colors">
                <Calendar className="h-4 w-4" aria-hidden />
                <span>Book a showing</span>
              </CalendlyPopupLink>
              <Link
                href="/schedule-consultation"
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 font-semibold transition-colors"
              >
                <Calendar className="h-4 w-4" aria-hidden />
                <span>Free consultation</span>
              </Link>
              <a
                href={PHONE.href}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-semibold transition-colors"
              >
                <Phone className="h-4 w-4" aria-hidden />
                <span>{PHONE.display}</span>
              </a>
            </span>
          </nav>

          {/* Mobile menu button – 44px min touch target */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex items-center justify-center min-h-[44px] min-w-[44px] rounded-lg text-gray-600 hover:bg-gray-100"
            aria-expanded={String(mobileOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav
            className="md:hidden py-4 border-t border-gray-200"
            aria-label="Main mobile"
          >
            <ul className="space-y-1">
              <li>
                <Link href="/" onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium">
                  Home
                </Link>
              </li>
              {/* Appointment CTAs first – one tap to book */}
              <li className="pt-2 pb-2 border-b border-gray-200">
                <p className="px-4 text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Book now</p>
                <div className="flex flex-col gap-2">
                  <CalendlyPopupLink className="flex items-center gap-2 px-4 py-3 rounded-lg bg-[#0069ff] text-white hover:bg-[#0052cc] font-semibold">
                    <Calendar className="h-4 w-4" />
                    Book a showing
                  </CalendlyPopupLink>
                  <Link
                    href="/schedule-consultation"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 font-semibold"
                  >
                    <Calendar className="h-4 w-4" />
                    Free consultation
                  </Link>
                  <a
                    href={PHONE.href}
                    className="flex items-center gap-2 px-4 py-3 rounded-lg bg-blue-600 text-white font-semibold"
                  >
                    <Phone className="h-4 w-4" />
                    {PHONE.display}
                  </a>
                </div>
              </li>
              {NAV_GROUPS.map((group) => {
                const isOpen = mobileGroupOpen === group.label
                return (
                  <li key={group.label}>
                    <button
                      type="button"
                      onClick={() => setMobileGroupOpen(isOpen ? null : group.label)}
                      className="flex w-full items-center justify-between px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium"
                      aria-expanded={String(isOpen)}
                    >
                      {group.label}
                      <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                      <ul className="pl-4 pb-2 space-y-0.5">
                        {group.items.map(({ href, label, primary }) => (
                          <li key={href}>
                            <Link
                              href={href}
                              onClick={() => setMobileOpen(false)}
                              className={
                                primary
                                  ? 'block px-3 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 font-semibold text-sm'
                                  : 'block px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium text-sm'
                              }
                            >
                              {label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                )
              })}
              {NAV_SINGLE.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  )
}
