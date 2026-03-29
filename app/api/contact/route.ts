import { NextRequest, NextResponse } from 'next/server'
import { sendContactFormEmail } from '@/lib/email'
import { env } from '@/env.mjs'

interface ContactData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
  contactType: 'buyer' | 'seller' | 'investor' | 'general'
  toEmail: string
}

function isValidContactData(obj: any): obj is ContactData {
  return obj &&
    typeof obj.name === 'string' &&
    typeof obj.email === 'string' &&
    typeof obj.phone === 'string' &&
    typeof obj.subject === 'string' &&
    typeof obj.message === 'string' &&
    typeof obj.contactType === 'string' &&
    typeof obj.toEmail === 'string' &&
    ['buyer', 'seller', 'investor', 'general'].includes(obj.contactType)
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    if (!isValidContactData(data)) {
      return NextResponse.json(
        { error: 'Invalid contact data format' },
        { status: 400 }
      )
    }

    const { name, email, phone, subject, message, contactType, toEmail } = data

    // Send email using Resend service
    const emailResult = await sendContactFormEmail(
      {
        name,
        email,
        phone,
        subject,
        message,
        contactType,
      },
      toEmail
    )

    if (!emailResult.success) {
      console.error('Contact form email failed:', emailResult.error)
      return NextResponse.json(
        { error: 'Failed to send contact message' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Contact message sent successfully',
      toEmail: toEmail,
    })
  } catch (error) {
    console.error('Error processing contact:', error)
    return NextResponse.json(
      { error: 'Failed to send contact message' },
      { status: 500 }
    )
  }
}

