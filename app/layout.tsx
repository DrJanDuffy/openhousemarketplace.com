import "styles/tailwind.css"
import { Metadata, Viewport } from "next"
import Script from "next/script"
import SiteHeader from "@/components/SiteHeader"
import Footer from "@/components/Footer"
import WebSiteSchema from "@/components/WebSiteSchema"
import GoogleEnhancement from "@/components/GoogleEnhancement"
import CalendlyBadgeWidget from "@/components/CalendlyBadgeWidget"

// Google Analytics scripts must be in head as standard script tags for detection
// SEO: Google 2026 – metadata defaults, E-E-A-T, structured data, Core Web Vitals

const SITE_URL = 'https://www.openhousemarketplace.com'
const DEFAULT_TITLE = 'Summerlin West Open Houses | Dr. Jan Duffy Real Estate'
const DEFAULT_DESCRIPTION = 'Find Summerlin West open houses and schedule a private showing with Dr. Jan Duffy. Listings, neighborhood guides, and expert buying and selling in Summerlin and Las Vegas.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: '%s | Open House Market Place',
  },
  description: DEFAULT_DESCRIPTION,
  alternates: {
    canonical: 'https://www.openhousemarketplace.com/',
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
    images: [{ url: `${SITE_URL}/images/og/og-image.jpg`, width: 1200, height: 630, alt: 'Summerlin West Open Houses - Dr. Jan Duffy Real Estate' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
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
        <link rel="preconnect" href="https://assets.calendly.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
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
        <style
          dangerouslySetInnerHTML={{
            __html: `
          realscout-advanced-search {
            --rs-as-button-text-color: #ffffff;
            --rs-as-background-color: transparent;
            --rs-as-button-color: #DC2626;
            --rs-as-widget-width: 100% !important;
            --rs-as-border-radius: 0.5rem;
            --rs-as-font-family: system-ui, -apple-system, sans-serif;
            --rs-as-input-height: 48px;
            --rs-as-button-hover-color: #B91C1C;
          }
          .realscout-search-container { width: 100% !important; }
          realscout-advanced-search input {
            border: 1px solid #D1D5DB !important;
            border-radius: 0.5rem !important;
            padding: 0.75rem !important;
            font-size: 1rem !important;
          }
          realscout-advanced-search button {
            background-color: #DC2626 !important;
            border-radius: 0.5rem !important;
            font-weight: 500 !important;
            transition: background-color 0.2s !important;
          }
          realscout-advanced-search button:hover { background-color: #B91C1C !important; }
          @media (max-width: 640px) {
            realscout-advanced-search {
              --rs-as-widget-width: 100% !important;
              --rs-as-input-height: 44px;
              font-size: 16px !important;
            }
            .realscout-search-container { padding: 0; }
          }
        `,
          }}
        />
      </head>
      <body className="overflow-x-hidden">
        <WebSiteSchema />
        <GoogleEnhancement />
        <CalendlyBadgeWidget />
        <Script
          src="https://em.realscout.com/widgets/realscout-web-components.umd.js"
          type="module"
          strategy="afterInteractive"
        />
        <SiteHeader />
        {children}
        <Footer />
      </body>
    </html>
  )
}
