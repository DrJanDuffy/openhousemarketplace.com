'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import Script from 'next/script'
import { getFacebookPixelId } from '@/config/facebook'

const PIXEL_ID = getFacebookPixelId()

/**
 * Meta Pixel: loads fbevents.js when NEXT_PUBLIC_FACEBOOK_PIXEL_ID is set.
 * Fires PageView on first load from the script; on client navigations only after that.
 */
export default function FacebookPixel() {
  const pathname = usePathname()
  const isFirstPath = useRef(true)

  useEffect(() => {
    if (!PIXEL_ID) return
    if (isFirstPath.current) {
      isFirstPath.current = false
      return
    }
    if (typeof window.fbq !== 'function') return
    window.fbq('track', 'PageView')
  }, [pathname])

  if (!PIXEL_ID) return null

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', ${JSON.stringify(PIXEL_ID)});
fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img
          height={1}
          width={1}
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${encodeURIComponent(PIXEL_ID)}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  )
}
