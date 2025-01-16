'use client'

import { useState } from 'react'
import { useTranslations, type Language } from '@/app/lib/translations'

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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: '3733e3a3-283c-4c1f-b332-0dfa2bdaa616',
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          message: formData.message,
          subject: 'New Contact Form Submission - The Home Design Center',
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ firstName: '', lastName: '', email: '', phone: '', company: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus('idle'), 3000)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full px-6 py-3 bg-[#C9A227] text-[#0F0F0F] font-semibold rounded-md hover:bg-[#8C7853] transition-colors duration-300 disabled:opacity-50`}
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

