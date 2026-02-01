import { MetadataRoute } from 'next'

const baseUrl = 'https://www.openhousemarketplace.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/private/', '/_next/', '/node_modules/'],
      },
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'Claude-Web', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      'https://theridges.openhousemarketplace.com/sitemap.xml',
      'https://redrock.openhousemarketplace.com/sitemap.xml',
      'https://summerlincentre.openhousemarketplace.com/sitemap.xml',
      'https://suncity.openhousemarketplace.com/sitemap.xml',
      'https://openhouses.openhousemarketplace.com/sitemap.xml',
      'https://luxury.openhousemarketplace.com/sitemap.xml',
      'https://new.openhousemarketplace.com/sitemap.xml',
    ],
  }
}
