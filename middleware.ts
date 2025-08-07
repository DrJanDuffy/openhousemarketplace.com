import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Subdomain configuration
const subdomainRoutes = {
  'theridges': '/neighborhoods/the-ridges',
  'redrock': '/neighborhoods/red-rock-country-club',
  'summerlincentre': '/neighborhoods/summerlin-centre',
  'suncity': '/neighborhoods/sun-city-summerlin',
  'openhouses': '/open-houses',
  'luxury': '/luxury-homes',
  'new': '/new-construction'
}

export function middleware(request: NextRequest) {
  // Get hostname (e.g. theridges.openhousemarketplace.com, openhousemarketplace.com)
  const hostname = request.headers.get('host') || ''
  
  // Check if this is a subdomain request
  const subdomain = hostname.split('.')[0]
  const isSubdomain = hostname.includes('.openhousemarketplace.com') && 
                     subdomain !== 'www' && 
                     subdomain !== 'openhousemarketplace'

  if (isSubdomain && subdomainRoutes[subdomain]) {
    // Rewrite the URL but keep the subdomain
    const url = request.nextUrl.clone()
    url.pathname = subdomainRoutes[subdomain] + url.pathname
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api|_next|static|[\\w-]+\\.\\w+).*)',
  ],
}
