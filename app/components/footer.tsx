'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react'
import { useTheme } from './theme-provider'

export default function Footer() {
  const theme = useTheme()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  })
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitStatus('success')
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      message: ''
    })
    setTimeout(() => setSubmitStatus('idle'), 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <footer className={`bg-[${theme.colors.background}] text-[${theme.colors.text}]`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-white mb-4">We'd love to hear from you!</h2>
              <p className={`text-[${theme.colors.text}] text-lg`}>
                Whether you have a question about our services, want to discuss a new project, or just want to say hello, our team is here to help.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className={`mr-3 h-5 w-5 text-[${theme.colors.primary}]`} />
                <a href="mailto:TheHomeDesignCenterOrlando@gmail.com" className={`hover:text-[${theme.colors.primary}] transition-colors`}>
                  TheHomeDesignCenterOrlando@gmail.com
                </a>
              </div>
              <div className="flex items-center">
                <Phone className={`mr-3 h-5 w-5 text-[${theme.colors.primary}]`} />
                <span>+1 (201) 555-0123</span>
              </div>
              <div className="flex items-start">
                <MapPin className={`mr-3 h-5 w-5 text-[${theme.colors.primary}] flex-shrink-0`} />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-2">
                  <span>Orlando</span>
                  <span>Casselberry</span>
                  <span>Winter Park</span>
                  <span>Oviedo</span>
                  <span>Winter Garden</span>
                  <span>Baldwin Park</span>
                  <span>Windermere</span>
                  <span>Lake Nona</span>
                  <span>Altamonte Springs</span>
                  <span>Maitland</span>
                  <span>Dr. Phillips</span>
                  <span>Lake Mary</span>
                  <span>Longwood</span>
                  <span>Winter Springs</span>
                  <span>Sanford</span>
                  <span>Apopka</span>
                  <span>Clermont</span>
                  <span>Kissimmee</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className={`border-2 border-[${theme.colors.surface}] p-6 rounded-lg`}>
            <h3 className="text-2xl font-bold text-white mb-6">Contact Us</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-1 text-[${theme.colors.textMuted}]">
                    First Name <span className={`text-[${theme.colors.primary}]`}>*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className={`w-full px-3 py-2 text-[${theme.colors.onBackground}] border-b-2 border-[${theme.colors.textMuted}] bg-transparent focus:outline-none focus:border-b-2 focus:border-[${theme.colors.primary}]`}
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-1 text-[${theme.colors.textMuted}]">
                    Last Name <span className={`text-[${theme.colors.primary}]`}>*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className={`w-full px-3 py-2 text-[${theme.colors.onBackground}] border-b-2 border-[${theme.colors.textMuted}] bg-transparent focus:outline-none focus:border-b-2 focus:border-[${theme.colors.primary}]`}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1 text-[${theme.colors.textMuted}]">
                  Email <span className={`text-[${theme.colors.primary}]`}>*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full px-3 py-2 text-[${theme.colors.onBackground}] border-b-2 border-[${theme.colors.textMuted}] bg-transparent focus:outline-none focus:border-b-2 focus:border-[${theme.colors.primary}]`}
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1 text-[${theme.colors.textMuted}]">
                  Phone Number <span className={`text-[${theme.colors.primary}]`}>*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className={`w-full px-3 py-2 text-[${theme.colors.onBackground}] border-b-2 border-[${theme.colors.textMuted}] bg-transparent focus:outline-none focus:border-b-2 focus:border-[${theme.colors.primary}]`}
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium mb-1 text-[${theme.colors.textMuted}]">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 text-[${theme.colors.onBackground}] border-b-2 border-[${theme.colors.textMuted}] bg-transparent focus:outline-none focus:border-b-2 focus:border-[${theme.colors.primary}]`}
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1 text-[${theme.colors.textMuted}]">
                  Message <span className={`text-[${theme.colors.primary}]`}>*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className={`w-full px-3 py-2 text-[${theme.colors.onBackground}] border-b-2 border-[${theme.colors.textMuted}] bg-transparent resize-none focus:outline-none focus:border-b-2 focus:border-[${theme.colors.primary}]`}
                ></textarea>
              </div>
              <button
                type="submit"
                className={`w-full px-4 py-3 bg-[${theme.colors.primary}] text-[${theme.colors.onPrimary}] font-semibold rounded-md hover:bg-[${theme.colors.primary}]/90 transition-colors`}
              >
                Submit Inquiry
              </button>
              {submitStatus === 'success' && (
                <p className="text-green-500">Message sent successfully!</p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={`mt-12 pt-8 border-t border-[${theme.colors.surface}]`}>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <nav className="flex space-x-6">
              <Link href="/" className={`hover:text-[${theme.colors.primary}] transition-colors`}>Home</Link>
              <Link href="/services" className={`hover:text-[${theme.colors.primary}] transition-colors`}>Services</Link>
              <Link href="/projects" className={`hover:text-[${theme.colors.primary}] transition-colors`}>Projects</Link>
              <Link href="/about" className={`hover:text-[${theme.colors.primary}] transition-colors`}>About Us</Link>
              <Link href="/contact" className={`hover:text-[${theme.colors.primary}] transition-colors`}>Contact Us</Link>
            </nav>
            <div className="flex space-x-4">
              <a href="#" className={`text-[${theme.colors.text}] hover:text-[${theme.colors.primary}] transition-colors`}>
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className={`text-[${theme.colors.text}] hover:text-[${theme.colors.primary}] transition-colors`}>
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="mt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} The Home Design Center. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

