import "styles/tailwind.css"
import { Metadata, Viewport } from "next"
import Script from "next/script"
import SiteHeader from "@/components/SiteHeader"
import Footer from "@/components/Footer"
import WebSiteSchema from "@/components/WebSiteSchema"
import GoogleEnhancement from "@/components/GoogleEnhancement"
import StructuredData from "@/components/StructuredData"
import CalendlyBadgeWidget from "@/components/CalendlyBadgeWidget"
import CalendlyCSS from "@/components/CalendlyCSS"
import { getSiteUrl } from "@/lib/site"
import { SEO_HOME_DESCRIPTION, SEO_HOME_TITLE } from "@/config/seo"
import { getFacebookAppId } from "@/config/facebook"
import FacebookPixel from "@/components/FacebookPixel"
import RealScoutOfficeListingsBandsDynamic from "@/components/RealScoutOfficeListingsBandsDynamic"

// Google Analytics scripts must be in head as standard script tags for detection
// SEO: Google 2026 – metadata defaults, E-E-A-T, structured data, Core Web Vitals

const SITE_URL = getSiteUrl()
const DEFAULT_TITLE = SEO_HOME_TITLE
const DEFAULT_DESCRIPTION = SEO_HOME_DESCRIPTION
const FB_APP_ID = getFacebookAppId()

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: '%s | Open House Market Place',
  },
  description: DEFAULT_DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Open House Market Place',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [{ url: `${SITE_URL}/images/og/og-image.jpg`, width: 1200, height: 630, alt: 'Summerlin Las Vegas Open Houses - Dr. Jan Duffy Real Estate' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  ...(FB_APP_ID ? { facebook: { appId: FB_APP_ID } } : {}),
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2563eb',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://em.realscout.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.realscout.com" />
        <link rel="preconnect" href="https://assets.calendly.com" crossOrigin="anonymous" />
        {process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID ? (
          <link rel="preconnect" href="https://connect.facebook.net" crossOrigin="anonymous" />
        ) : null}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="preload" href="/images/team/dr-jan-duffy.jpg" as="image" fetchPriority="high" />
        <noscript>
          <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
        </noscript>
        {/* Google tag (gtag.js) - load afterInteractive to avoid blocking LCP */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-G22H2J3EMX"
          strategy="afterInteractive"
        />
        <Script id="gtag-config" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-G22H2J3EMX', {
              page_path: window.location.pathname,
              cookie_domain: 'auto',
              cookie_flags: 'SameSite=None;Secure'
            });
          `}
        </Script>
      </head>
      <body className="overflow-x-hidden">
        {/* RealScout: afterInteractive avoids render-blocking head script (PSI / LCP). Script once site-wide. */}
        <Script
          id="realscout-web-components"
          src="https://em.realscout.com/widgets/realscout-web-components.umd.js"
          strategy="afterInteractive"
        />
        <CalendlyCSS />
        <FacebookPixel />
        <WebSiteSchema />
        <GoogleEnhancement />
        <StructuredData type="RealEstateAgent" />
        <CalendlyBadgeWidget />
        <SiteHeader />
        {children}
        <RealScoutOfficeListingsBandsDynamic />
        <Footer />
      </body>
    </html>
  )
}
