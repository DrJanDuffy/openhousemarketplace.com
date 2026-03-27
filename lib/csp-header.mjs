/**
 * Content-Security-Policy for Next.js + RealScout + Calendly + Google + Meta Pixel + GCS map embeds + Firebase App Check.
 * Imported by next.config.mjs (must be .mjs — Node does not load .ts here).
 */
export function getContentSecurityPolicy() {
  const scriptSrc = [
    "'self'",
    "'unsafe-inline'",
    "'unsafe-eval'",
    'https://www.googletagmanager.com',
    'https://www.google-analytics.com',
    'https://connect.facebook.net',
    'https://em.realscout.com',
    'https://www.realscout.com',
    'https://assets.calendly.com',
    'https://maps.googleapis.com',
    'https://apis.google.com',
  ].join(' ')

  const styleSrc = ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com', 'https://assets.calendly.com'].join(
    ' ',
  )

  const imgSrc = ["'self'", 'data:', 'blob:', 'https:'].join(' ')

  const fontSrc = ["'self'", 'https://fonts.gstatic.com', 'data:'].join(' ')

  const connectParts = [
    "'self'",
    'https://www.google-analytics.com',
    'https://region1.google-analytics.com',
    'https://analytics.google.com',
    'https://stats.g.doubleclick.net',
    'https://em.realscout.com',
    'https://www.realscout.com',
    'https://drjanduffy.realscout.com',
    'https://maps.googleapis.com',
    'https://firebase.googleapis.com',
    'https://firebaseinstallations.googleapis.com',
    'https://identitytoolkit.googleapis.com',
    'https://securetoken.googleapis.com',
    'https://www.google.com',
    'https://www.recaptcha.net',
    'https://api.qrserver.com',
    'https://www.facebook.com',
    'https://connect.facebook.net',
  ]
  if (process.env.NODE_ENV !== 'production') {
    connectParts.push('ws:', 'wss:')
  }

  const frameSrc = [
    "'self'",
    'https://www.google.com',
    'https://maps.google.com',
    'https://storage.googleapis.com',
    'https://calendly.com',
    'https://assets.calendly.com',
    'https://www.youtube.com',
    'https://www.youtube-nocookie.com',
    'https://player.vimeo.com',
    'https://my.matterport.com',
  ].join(' ')

  const workerSrc = ["'self'", 'blob:'].join(' ')

  return [
    "default-src 'self'",
    `script-src ${scriptSrc}`,
    `style-src ${styleSrc}`,
    `img-src ${imgSrc}`,
    `font-src ${fontSrc}`,
    `connect-src ${connectParts.join(' ')}`,
    `frame-src ${frameSrc}`,
    `worker-src ${workerSrc}`,
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self' https://calendly.com",
    'upgrade-insecure-requests',
    "frame-ancestors 'self'",
  ].join('; ')
}
