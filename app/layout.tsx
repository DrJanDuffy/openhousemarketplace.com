import "styles/tailwind.css"
import { Metadata } from "next"

export const metadata: Metadata = {
  metadataBase: new URL('https://www.openhousemarketplace.com'),
  alternates: {
    canonical: '/',
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
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <script
          src="https://em.realscout.com/widgets/realscout-web-components.umd.js"
          type="module"
          async
        />
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
      <body>{children}</body>
    </html>
  )
}
