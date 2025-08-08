import { NextRequest, NextResponse } from 'next/server'

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
    console.log('Contact API route called - processing contact submission')
    const data = await request.json()
    console.log('Received contact data:', JSON.stringify(data, null, 2))
    
    if (!isValidContactData(data)) {
      console.error('Invalid contact data format:', data)
      return NextResponse.json(
        { error: 'Invalid contact data format' },
        { status: 400 }
      )
    }

    const { name, email, phone, subject, message, contactType, toEmail } = data

    console.log('Processing contact from:', email, 'to:', toEmail)

    // For now, we'll use a simple email service
    // In production, you might want to use SendGrid, Mailgun, or similar
    const emailContent = `
New Contact Form Submission

From: ${name} (${email})
Phone: ${phone || 'Not provided'}
Contact Type: ${contactType}
Subject: ${subject}

Message:
${message}

---
This message was sent from the Open House Marketplace contact form.
    `.trim()

    // For development/testing, we'll just log the email
    // In production, you would send this via an email service
    console.log('Email would be sent to:', toEmail)
    console.log('Email content:', emailContent)

    // TODO: Implement actual email sending
    // You can use services like:
    // - SendGrid (recommended for production)
    // - Mailgun
    // - AWS SES
    // - Resend
    // - Or use a simple SMTP service

    // For now, we'll simulate success
    // In production, replace this with actual email sending logic
    const emailSent = await simulateEmailSending(toEmail, emailContent)

    if (emailSent) {
      console.log('Contact email processed successfully')
      return NextResponse.json({ 
        success: true, 
        message: 'Contact message sent successfully',
        toEmail: toEmail
      })
    } else {
      throw new Error('Failed to send email')
    }

  } catch (error) {
    console.error('Error processing contact:', error)
    return NextResponse.json(
      { error: 'Failed to send contact message' },
      { status: 500 }
    )
  }
}

// Simulate email sending (replace with actual email service)
async function simulateEmailSending(toEmail: string, content: string): Promise<boolean> {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Log the email details for debugging
    console.log('=== EMAIL SIMULATION ===')
    console.log('To:', toEmail)
    console.log('Content:', content)
    console.log('=== END EMAIL SIMULATION ===')
    
    // For now, always return true (simulate success)
    // In production, this would be replaced with actual email sending
    return true
  } catch (error) {
    console.error('Email sending simulation failed:', error)
    return false
  }
}
