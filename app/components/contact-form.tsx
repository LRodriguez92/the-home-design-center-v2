'use client'

import { useState } from 'react'

export default function ContactForm() {
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
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setSubmitStatus('success')
    setFormData({ firstName: '', lastName: '', email: '', phone: '', company: '', message: '' })
    setTimeout(() => setSubmitStatus('idle'), 3000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-[#B0B0B0] mb-1">
            First Name
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
            Last Name
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
          Email
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
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={`w-full px-3 py-2 bg-transparent text-[#F5F5F5] border-b-2 border-[#C9A227] focus:outline-none focus:border-[#8C7853] transition-colors`}
        />
      </div>
      <div>
        <label htmlFor="company" className="block text-sm font-medium text-[#B0B0B0] mb-1">
          Company
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
          Message
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
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
      {submitStatus === 'success' && (
        <p className="text-green-500 text-center">Message sent successfully!</p>
      )}
    </form>
  )
}

