import { MetadataRoute } from 'next'
import { getSiteUrl } from '@/lib/site'

const baseUrl = getSiteUrl()

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Do not disallow /_next/static — Google needs JS/CSS to render; blanket /_next/ hurts GSC/crawl.
        disallow: ['/api/', '/admin/', '/private/', '/open-house-signin/'],
      },
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'Claude-Web', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
    ],
    sitemap: [`${baseUrl}/sitemap.xml`],
  }
}
