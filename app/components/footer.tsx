'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react'
import { useTheme } from './theme-provider'
import { useTranslations } from '@/app/lib/translations'
import { usePathname } from 'next/navigation'

export default function Footer() {
  const theme = useTheme()
  const pathname = usePathname()
  const { t } = useTranslations(pathname?.startsWith('/es') ? 'es' : 'en')
  const currentLang = pathname?.startsWith('/es') ? 'es' : 'en'
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  })
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const isContactPage = pathname?.endsWith('/contact') || 
    pathname?.endsWith('/es/contact') || 
    pathname?.endsWith('/admin') ||
    pathname?.endsWith('/es/admin') ||
    pathname?.endsWith('/admin/login') ||
    pathname?.endsWith('/es/admin/login')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
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
          subject: 'New Footer Contact Form Submission - The Home Design Center',
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          company: '',
          message: ''
        })
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    }
    
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
        {!isContactPage && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold text-white mb-4">{t('contact.info.title')}</h2>
                <p className={`text-[${theme.colors.text}] text-lg`}>
                  {t('contact.info.description')}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className={`mr-3 h-5 w-5 text-[${theme.colors.primary}]`} />
                  <a href="mailto:TheHomeDesignCenterOrlando@gmail.com" className={`hover:text-[${theme.colors.primary}] transition-colors`}>
                    {t('contact.info.email.value')}
                  </a>
                </div>
                <div className="flex items-center">
                  <Phone className={`mr-3 h-5 w-5 text-[${theme.colors.primary}]`} />
                  <span>{t('contact.info.phone.value')}</span>
                </div>
                <div className="flex items-start">
                  <MapPin className={`mr-3 h-5 w-5 text-[${theme.colors.primary}] flex-shrink-0`} />
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-2">
                    {t('contact.info.areas.value').split(', ').map((area) => (
                      <span key={area}>{area}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className={`border-2 border-[${theme.colors.surface}] p-6 rounded-lg`}>
              <h3 className="text-2xl font-bold text-white mb-6">{t('contact.title')}</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium mb-1 text-[${theme.colors.textMuted}]">
                      {t('contact.form.firstName')} <span className={`text-[${theme.colors.primary}]`}>*</span>
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
                      {t('contact.form.lastName')} <span className={`text-[${theme.colors.primary}]`}>*</span>
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
                    {t('contact.form.email')} <span className={`text-[${theme.colors.primary}]`}>*</span>
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
                    {t('contact.form.phone')} <span className={`text-[${theme.colors.primary}]`}>*</span>
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
                    {t('contact.form.company')}
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
                    {t('contact.form.message')} <span className={`text-[${theme.colors.primary}]`}>*</span>
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
                  {t('contact.form.submit')}
                </button>
                {submitStatus === 'success' && (
                  <p className="text-green-500">{t('contact.form.success')}</p>
                )}
                {submitStatus === 'error' && (
                  <p className={`text-red-500`}>{t('contact.form.error')}</p>
                )}
              </form>
            </div>
          </div>
        )}

        {/* Bottom Section */}
        <div className={`mt-12 pt-8 border-t border-[${theme.colors.surface}]`}>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <nav className="flex space-x-6">
              <Link href={`/${currentLang}`} className={`hover:text-[${theme.colors.primary}] transition-colors`}>{t('navigation.home')}</Link>
              <Link href={`/${currentLang}/services`} className={`hover:text-[${theme.colors.primary}] transition-colors`}>{t('navigation.services')}</Link>
              <Link href={`/${currentLang}/projects`} className={`hover:text-[${theme.colors.primary}] transition-colors`}>{t('navigation.projects')}</Link>
              <Link href={`/${currentLang}/contact`} className={`hover:text-[${theme.colors.primary}] transition-colors`}>{t('navigation.contact')}</Link>
            </nav>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/homedesigncenterorlando/" className={`text-[${theme.colors.text}] hover:text-[${theme.colors.primary}] transition-colors`}>
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://www.instagram.com/the_homedesigncenter/" className={`text-[${theme.colors.text}] hover:text-[${theme.colors.primary}] transition-colors`}>
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="mt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} {t('navigation.title')}. {t('footer.copyright')}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

