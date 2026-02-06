import { MetadataRoute } from 'next'

const baseUrl = 'https://www.openhousemarketplace.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/private/', '/open-house-signin/', '/_next/', '/node_modules/'],
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
