import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Subdomain configuration
const subdomainRoutes: Record<string, string> = {
  'theridges': '/neighborhoods/the-ridges',
  'redrock': '/neighborhoods/red-rock-country-club',
  'summerlincentre': '/neighborhoods/summerlin-centre',
  'suncity': '/neighborhoods/sun-city-summerlin',
  'openhouses': '/open-houses',
  'luxury': '/luxury-homes',
  'new': '/new-construction'
}

const CANONICAL_ORIGIN = 'https://www.openhousemarketplace.com'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const protocol = request.nextUrl.protocol
  const pathname = request.nextUrl.pathname
  const search = request.nextUrl.search

  // /index and /index/ → canonical root (avoids "Alternate page with proper canonical tag" in GSC)
  if (pathname === '/index' || pathname === '/index/') {
    return NextResponse.redirect(`${CANONICAL_ORIGIN}/${search}`, 301)
  }

  // Main domain: primary is https://www; both www and non-www are in use. Redirect non-www and http to www (single 301, no chain). Belt-and-suspenders with vercel.json so non-www always redirects even if Vercel edge redirect does not run.
  const isMainDomain = hostname === 'openhousemarketplace.com' || hostname === 'www.openhousemarketplace.com'
  const needsCanonicalRedirect =
    isMainDomain &&
    (protocol === 'http:' || hostname === 'openhousemarketplace.com')

  if (needsCanonicalRedirect) {
    return NextResponse.redirect(`${CANONICAL_ORIGIN}${pathname}${search}`, 301)
  }

  // HTTPS for other hosts (e.g. subdomains)
  if (protocol === 'http:') {
    const httpsUrl = new URL(`https://${hostname}${pathname}${search}`, request.url)
    return NextResponse.redirect(httpsUrl, 301)
  }
  
  // Check if this is a subdomain request
  const subdomain = hostname.split('.')[0]
  const isSubdomain = hostname.includes('.openhousemarketplace.com') && 
                     subdomain !== 'www' && 
                     subdomain !== 'openhousemarketplace'

  if (isSubdomain && subdomain && subdomain in subdomainRoutes) {
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
     * Match page routes only; skip api, _next, static, and static files (favicon, etc.)
     */
    '/((?!api|_next|static|favicon\\.ico|robots\\.txt|sitemap\\.xml|[\\w-]+\\.(?:ico|png|jpg|jpeg|gif|webp|svg|woff2?|css|js)$).*)',
  ],
}
