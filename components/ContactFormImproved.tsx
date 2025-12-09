'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Mail, Phone, User, MessageSquare, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  contactType: 'buyer' | 'seller' | 'investor' | 'general'
}

interface ContactFormImprovedProps {
  className?: string
  title?: string
  description?: string
  onSuccess?: () => void
}

const ContactFormImproved: React.FC<ContactFormImprovedProps> = ({
  className = "",
  title = "Send Us a Message",
  description = "Get in touch with Dr. Jan Duffy for all your Summerlin West real estate needs",
  onSuccess
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [contactType, setContactType] = useState<string>('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<ContactFormData>()

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      let emailAddress = 'contact@openhousemarketplace.com'
      
      switch (data.contactType) {
        case 'buyer':
          emailAddress = 'buyers@openhousemarketplace.com'
          break
        case 'seller':
          emailAddress = 'sellers@openhousemarketplace.com'
          break
        case 'investor':
          emailAddress = 'investors@openhousemarketplace.com'
          break
        default:
          emailAddress = 'contact@openhousemarketplace.com'
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          toEmail: emailAddress
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `HTTP ${response.status}`)
      }

      setSubmitStatus('success')
      reset()
      setContactType('')
      
      if (onSuccess) {
        setTimeout(() => onSuccess(), 2000)
      } else {
        setTimeout(() => setSubmitStatus('idle'), 5000)
      }

    } catch (error) {
      console.error('Email submission error:', error)
      setSubmitStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send message. Please try again.')
      
      setTimeout(() => {
        setSubmitStatus('idle')
        setErrorMessage('')
      }, 10000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Success Message */}
        {submitStatus === 'success' && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
            <span className="text-green-800">Thank you! Your message has been sent. We'll get back to you soon.</span>
          </div>
        )}

        {/* Error Message */}
        {submitStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
            <span className="text-red-800">{errorMessage}</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                {...register('name', { 
                  required: 'Name is required',
                  minLength: { value: 2, message: 'Name must be at least 2 characters' }
                })}
                type="text"
                placeholder="Your Name"
                className={cn(
                  "pl-10",
                  errors.name && "border-destructive"
                )}
              />
            </div>
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Please enter a valid email address'
                  }
                })}
                type="email"
                placeholder="Email Address"
                className={cn(
                  "pl-10",
                  errors.email && "border-destructive"
                )}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone (optional)</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="phone"
                {...register('phone', {
                  pattern: {
                    value: /^[\+]?[1-9][\d]{0,15}$/,
                    message: 'Please enter a valid phone number'
                  }
                })}
                type="tel"
                placeholder="Phone Number"
                className={cn(
                  "pl-10",
                  errors.phone && "border-destructive"
                )}
              />
            </div>
            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactType">How can we help you?</Label>
            <Select
              value={contactType}
              onValueChange={(value) => {
                setContactType(value)
                setValue('contactType', value as ContactFormData['contactType'])
              }}
            >
              <SelectTrigger id="contactType" className={errors.contactType ? "border-destructive" : ""}>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="buyer">I want to buy a home</SelectItem>
                <SelectItem value="seller">I want to sell my home</SelectItem>
                <SelectItem value="investor">I'm an investor</SelectItem>
                <SelectItem value="general">General inquiry</SelectItem>
              </SelectContent>
            </Select>
            {errors.contactType && (
              <p className="text-sm text-destructive">{errors.contactType.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              {...register('subject', { 
                required: 'Subject is required',
                minLength: { value: 5, message: 'Subject must be at least 5 characters' }
              })}
              type="text"
              placeholder="Subject"
              className={errors.subject ? "border-destructive" : ""}
            />
            {errors.subject && (
              <p className="text-sm text-destructive">{errors.subject.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Textarea
                id="message"
                {...register('message', { 
                  required: 'Message is required',
                  minLength: { value: 10, message: 'Message must be at least 10 characters' }
                })}
                placeholder="Your message"
                rows={4}
                className={cn(
                  "pl-10 resize-none",
                  errors.message && "border-destructive"
                )}
              />
            </div>
            {errors.message && (
              <p className="text-sm text-destructive">{errors.message.message}</p>
            )}
          </div>
          
          <Button 
            type="submit"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              'Send Message'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default ContactFormImproved

