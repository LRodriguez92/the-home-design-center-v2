'use client'

import { useState, useRef } from 'react'
import { useTranslations, type Language } from '@/app/lib/translations'
import ReCAPTCHA from "react-google-recaptcha"

interface ContactFormProps {
  lang?: Language
}

export default function ContactForm({ lang }: ContactFormProps) {
  const { t } = useTranslations(lang || 'en')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  })
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const captcha = useRef<ReCAPTCHA>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!captchaToken) {
      setSubmitStatus('error')
      return
    }

    setIsSubmitting(true)
    
    // Read honeypot value directly from DOM (bots fill DOM, not React state)
    const honeypotValue = (e.currentTarget as HTMLFormElement).elements.namedItem('email_confirm') as HTMLInputElement
    const honeypotFilled = honeypotValue?.value || ''

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          honeypot: honeypotFilled,  // Use DOM value, not React state
          captchaToken,
          formData: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            company: formData.company,
            message: formData.message,
          },
          subject: 'New Contact Form Submission - The Home Design Center',
        }),
      })

      if (response.ok) {
        const result = await response.json()
        // Check if it was silently rejected (honeypot caught)
        if (result.success && !result.proceed) {
          // Bot was caught, but show success to not alert them
          setSubmitStatus('success')
        } else if (result.proceed) {
          // Honeypot passed - now call Web3Forms directly from client
          try {
            const web3formsResponse = await fetch('https://api.web3forms.com/submit', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                phone: formData.phone,
                company: formData.company,
                message: formData.message,
                subject: 'New Contact Form Submission - The Home Design Center',
                // No captcha token - validated on backend only
              }),
            })

            if (web3formsResponse.ok) {
              setSubmitStatus('success')
              // Track Google Ads conversion
              if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('event', 'conversion', {
                  'send_to': 'AW-17707114672/ogZTCLeemL4bELDBtPtB'
                })
              }
              setFormData({ firstName: '', lastName: '', email: '', phone: '', company: '', message: '' })
            } else {
              // Log the error response for debugging
              const errorData = await web3formsResponse.json().catch(() => ({}))
              console.error('Web3Forms error:', {
                status: web3formsResponse.status,
                statusText: web3formsResponse.statusText,
                error: errorData
              })
              setSubmitStatus('error')
            }
          } catch (error) {
            console.error('Web3Forms request failed:', error)
            setSubmitStatus('error')
          }
        } else {
          setSubmitStatus('success')
        }
        if (captcha.current) {
          captcha.current.reset()
        }
        setCaptchaToken(null)
        // Reset honeypot field in DOM
        if (honeypotValue) {
          honeypotValue.value = ''
        }
      } else {
        setSubmitStatus('error')
        if (captcha.current) {
          captcha.current.reset()
        }
        setCaptchaToken(null)
      }
    } catch {
      setSubmitStatus('error')
      if (captcha.current) {
        captcha.current.reset()
      }
      setCaptchaToken(null)
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus('idle'), 3000)
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-[#B0B0B0] mb-1">
            {t('contact.form.firstName')} <span className="text-[#C9A227]">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className={`w-full px-3 py-2 bg-transparent text-[#F5F5F5] border-b-2 border-[#C9A227] focus:outline-none focus:border-[#8C7853] transition-colors`}
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-[#B0B0B0] mb-1">
            {t('contact.form.lastName')} <span className="text-[#C9A227]">*</span>
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className={`w-full px-3 py-2 bg-transparent text-[#F5F5F5] border-b-2 border-[#C9A227] focus:outline-none focus:border-[#8C7853] transition-colors`}
          />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[#B0B0B0] mb-1">
          {t('contact.form.email')} <span className="text-[#C9A227]">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className={`w-full px-3 py-2 bg-transparent text-[#F5F5F5] border-b-2 border-[#C9A227] focus:outline-none focus:border-[#8C7853] transition-colors`}
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-[#B0B0B0] mb-1">
          {t('contact.form.phone')} <span className="text-[#C9A227]">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className={`w-full px-3 py-2 bg-transparent text-[#F5F5F5] border-b-2 border-[#C9A227] focus:outline-none focus:border-[#8C7853] transition-colors`}
        />
      </div>
      <div>
        <label htmlFor="company" className="block text-sm font-medium text-[#B0B0B0] mb-1">
          {t('contact.form.company')}
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className={`w-full px-3 py-2 bg-transparent text-[#F5F5F5] border-b-2 border-[#C9A227] focus:outline-none focus:border-[#8C7853] transition-colors`}
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-[#B0B0B0] mb-1">
          {t('contact.form.message')} <span className="text-[#C9A227]">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={4}
          className={`w-full px-3 py-2 bg-transparent text-[#F5F5F5] border-2 border-[#C9A227] focus:outline-none focus:border-[#8C7853] transition-colors rounded-md resize-none`}
        ></textarea>
      </div>

      {/* Honeypot field - hidden from users but visible to bots */}
      <input
        type="text"
        name="email_confirm"
        defaultValue=""
        style={{
          position: 'absolute',
          left: '-9999px',
          opacity: 0,
          pointerEvents: 'none',
        }}
        tabIndex={-1}
        aria-hidden="true"
        autoComplete="off"
      />

      {/* reCAPTCHA integration */}
      <div className="flex justify-center my-6">
        <ReCAPTCHA
          ref={captcha}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
          onChange={(token) => setCaptchaToken(token)}
          onExpired={() => setCaptchaToken(null)}
          theme="dark"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !captchaToken}
        className={`w-full px-6 py-3 bg-[#C9A227] text-black font-semibold rounded-md hover:bg-[#8C7853] hover:text-black transition-colors duration-300 disabled:opacity-50`}
      >
        {isSubmitting ? t('contact.form.sending') : t('contact.form.submit')}
      </button>
      {submitStatus === 'success' && (
        <p className="text-green-500 text-center">{t('contact.form.success')}</p>
      )}
      {submitStatus === 'error' && (
        <p className="text-red-500 text-center">{t('contact.form.error')}</p>
      )}
    </form>
  )
}

