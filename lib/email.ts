import { Resend } from 'resend'
import { env } from '@/env.mjs'

// Initialize Resend client if API key is available
const resend = env.RESEND_API_KEY ? new Resend(env.RESEND_API_KEY) : null

interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

/**
 * Send email using Resend service
 * Falls back to console.log if Resend is not configured
 */
export async function sendEmail(options: EmailOptions): Promise<{ success: boolean; error?: string }> {
  try {
    if (!resend) {
      console.warn('[Email] Resend not configured. Logging email instead:')
      console.log(`To: ${options.to}`)
      console.log(`Subject: ${options.subject}`)
      console.log(`HTML: ${options.html}`)
      return { success: true }
    }

    const fromEmail = env.RESEND_FROM_EMAIL || 'noreply@openhousemarketplace.com'

    const result = await resend.emails.send({
      from: fromEmail,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    })

    if (result.error) {
      console.error('[Email] Resend error:', result.error)
      return { success: false, error: result.error.message }
    }

    console.log('[Email] Sent successfully:', result.data?.id)
    return { success: true }
  } catch (error) {
    console.error('[Email] Exception:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Send contact form email
 */
export async function sendContactFormEmail(
  contactData: {
    name: string
    email: string
    phone: string
    subject: string
    message: string
    contactType: string
  },
  toEmail: string
): Promise<{ success: boolean; error?: string }> {
  const html = `
    <h2>New Contact Form Submission</h2>
    <p><strong>From:</strong> ${contactData.name} (${contactData.email})</p>
    <p><strong>Phone:</strong> ${contactData.phone || 'Not provided'}</p>
    <p><strong>Contact Type:</strong> ${contactData.contactType}</p>
    <p><strong>Subject:</strong> ${contactData.subject}</p>
    <hr />
    <p><strong>Message:</strong></p>
    <p>${contactData.message.replace(/\n/g, '<br />')}</p>
    <hr />
    <p style="font-size: 12px; color: #888;">This message was sent from Open House Market Place contact form.</p>
  `

  const text = `
New Contact Form Submission

From: ${contactData.name} (${contactData.email})
Phone: ${contactData.phone || 'Not provided'}
Contact Type: ${contactData.contactType}
Subject: ${contactData.subject}

Message:
${contactData.message}

---
This message was sent from Open House Market Place contact form.
  `.trim()

  return sendEmail({
    to: toEmail,
    subject: `New Contact: ${contactData.subject}`,
    html,
    text,
  })
}

/**
 * Send open house sign-in confirmation
 */
export async function sendOpenHouseSignInEmail(
  signInData: {
    fullName: string
    email: string
    phone: string
    listingAddress?: string
    listingId: string
  },
  toEmail: string
): Promise<{ success: boolean; error?: string }> {
  const html = `
    <h2>Open House Sign-In Received</h2>
    <p><strong>Name:</strong> ${signInData.fullName}</p>
    <p><strong>Email:</strong> ${signInData.email}</p>
    <p><strong>Phone:</strong> ${signInData.phone}</p>
    <p><strong>Property:</strong> ${signInData.listingAddress || signInData.listingId}</p>
    <hr />
    <p style="font-size: 12px; color: #888;">Submitted from Open House Market Place</p>
  `

  const text = `
Open House Sign-In Received

Name: ${signInData.fullName}
Email: ${signInData.email}
Phone: ${signInData.phone}
Property: ${signInData.listingAddress || signInData.listingId}

---
Submitted from Open House Market Place
  `.trim()

  return sendEmail({
    to: toEmail,
    subject: `Open House Sign-In: ${signInData.fullName} at ${signInData.listingAddress || signInData.listingId}`,
    html,
    text,
  })
}
