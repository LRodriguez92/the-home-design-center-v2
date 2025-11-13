'use client'

import { useState, useRef } from 'react'
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react'
import { useTheme } from './theme-provider'
import { useTranslations } from '@/app/lib/translations'
import { usePathname } from 'next/navigation'
import HCaptcha from "@hcaptcha/react-hcaptcha"

export default function Footer() {
  const { colors } = useTheme()
  const pathname = usePathname()
  const { t } = useTranslations(pathname?.startsWith('/es') ? 'es' : 'en')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  })
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const captcha = useRef<HCaptcha>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const isContactPage = pathname?.endsWith('/contact') || 
    pathname?.endsWith('/es/contact') || 
    pathname?.endsWith('/admin') ||
    pathname?.endsWith('/es/admin') ||
    pathname?.endsWith('/admin/login') ||
    pathname?.endsWith('/es/admin/login')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!captchaToken) {
      setSubmitStatus('error')
      return
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
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
          subject: 'New Footer Contact Form Submission - The Home Design Center',
          'h-captcha-response': captchaToken,
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        // Track Google Ads conversion
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'conversion', {
            'send_to': 'AW-17707114672/ogZTCLeemL4bELDBtPtB'
          })
        }
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          company: '',
          message: ''
        })
        if (captcha.current) {
          captcha.current.resetCaptcha()
        }
        setCaptchaToken(null)
      } else {
        setSubmitStatus('error')
        if (captcha.current) {
          captcha.current.resetCaptcha()
        }
        setCaptchaToken(null)
      }
    } catch {
      setSubmitStatus('error')
      if (captcha.current) {
        captcha.current.resetCaptcha()
      }
      setCaptchaToken(null)
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
    <footer className={'w-full transition-colors duration-300 ' + 
      (colors.background === '#0F0F0F' ? 'bg-[#0F0F0F]' : 'bg-[#F5F5F5]')
    }>
      <div className="h-1 bg-gradient-to-r from-primary to-secondary" />
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isContactPage ? 'py-6' : 'py-12'}`}>
        {!isContactPage && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column */}
            <div className="space-y-8">
              <div>
                <h2 className={`text-4xl font-bold text-[${colors.text}] mb-4`}>{t('contact.info.title')}</h2>
                <p className={`text-[${colors.text}] text-lg`}>
                  {t('contact.info.description')}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className={`mr-3 h-5 w-5 text-[${colors.primary}]`} />
                  <a href="mailto:TheHomeDesignCenterOrlando@gmail.com" className={`text-[${colors.text}] hover:text-[${colors.primary}] transition-colors`}>
                    {t('contact.info.email.value')}
                  </a>
                </div>
                <div className="flex items-center">
                  <Phone className={`mr-3 h-5 w-5 text-[${colors.primary}]`} />
                  <span className={`text-[${colors.text}]`}>{t('contact.info.phone.value')}</span>
                </div>
                <div className="flex items-start">
                  <MapPin className={`mr-3 h-5 w-5 text-[${colors.primary}] flex-shrink-0`} />
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-2">
                    {t('contact.info.areas.value').split(', ').map((area) => (
                      <span key={area} className={`text-[${colors.text}]`}>{area}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className={`border-2 border-[${colors.surface}] p-6 rounded-lg`}>
              <h3 className={`text-2xl font-bold text-[${colors.text}] mb-6`}>Contact Us</h3>
              <form 
                ref={formRef}
                onSubmit={handleSubmit} 
                className="space-y-4"
                role="form"
                aria-label="Contact form"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className={`block text-sm font-medium mb-1 text-[${colors.textMuted}]`}>
                      {t('contact.form.firstName')} <span className={`text-[${colors.primary}]`}>*</span>
                      <span className="sr-only">(Required)</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className={`w-full px-3 py-2 text-[${colors.text}] border-b-2 border-[${colors.textMuted}] bg-transparent focus:outline-none focus:border-[${colors.primary}]`}
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className={`block text-sm font-medium mb-1 text-[${colors.textMuted}]`}>
                      {t('contact.form.lastName')} <span className={`text-[${colors.primary}]`}>*</span>
                      <span className="sr-only">(Required)</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className={`w-full px-3 py-2 text-[${colors.text}] border-b-2 border-[${colors.textMuted}] bg-transparent focus:outline-none focus:border-[${colors.primary}]`}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className={`block text-sm font-medium mb-1 text-[${colors.textMuted}]`}>
                    {t('contact.form.email')} <span className={`text-[${colors.primary}]`}>*</span>
                    <span className="sr-only">(Required)</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full px-3 py-2 text-[${colors.text}] border-b-2 border-[${colors.textMuted}] bg-transparent focus:outline-none focus:border-[${colors.primary}]`}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className={`block text-sm font-medium mb-1 text-[${colors.textMuted}]`}>
                    {t('contact.form.phone')} <span className={`text-[${colors.primary}]`}>*</span>
                    <span className="sr-only">(Required)</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    pattern="[0-9]{3}[-. ]?[0-9]{3}[-. ]?[0-9]{4}"
                    className={`w-full px-3 py-2 text-[${colors.text}] border-b-2 border-[${colors.textMuted}] bg-transparent focus:outline-none focus:border-[${colors.primary}]`}
                  />
                </div>
                <div>
                  <label htmlFor="company" className={`block text-sm font-medium mb-1 text-[${colors.textMuted}]`}>
                    {t('contact.form.company')}
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 text-[${colors.text}] border-b-2 border-[${colors.textMuted}] bg-transparent focus:outline-none focus:border-[${colors.primary}]`}
                  />
                </div>
                <div>
                  <label htmlFor="message" className={`block text-sm font-medium mb-1 text-[${colors.textMuted}]`}>
                    {t('contact.form.message')} <span className={`text-[${colors.primary}]`}>*</span>
                    <span className="sr-only">(Required)</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className={`w-full px-3 py-2 text-[${colors.text}] border-b-2 border-[${colors.textMuted}] bg-transparent resize-none focus:outline-none focus:border-[${colors.primary}]`}
                  ></textarea>
                </div>

                {/* hCaptcha integration */}
                <div className="flex justify-center my-4">
                  <HCaptcha
                    ref={captcha}
                    sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
                    onVerify={(token) => setCaptchaToken(token)}
                    theme="dark"
                    size="normal"
                    onExpire={() => setCaptchaToken(null)}
                    reCaptchaCompat={false}
                  />
                </div>

                <button
                  type="submit"
                  disabled={!captchaToken}
                  className={`w-full px-4 py-3 bg-[${colors.primary}] text-[${colors.onPrimary}] font-semibold rounded-md hover:bg-[${colors.primary}]/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50`}
                  aria-label={t('contact.form.submit')}
                >
                  {t('contact.form.submit')}
                </button>
                {submitStatus === 'success' && (
                  <p className="text-green-500" role="alert" aria-live="polite">{t('contact.form.success')}</p>
                )}
                {submitStatus === 'error' && (
                  <p className={`text-red-500`} role="alert" aria-live="polite">{t('contact.form.error')}</p>
                )}
              </form>
            </div>
          </div>
        )}
        
        {/* Bottom Section */}
        <div className={`${isContactPage ? '' : 'mt-12 pt-8 border-t border-[' + colors.surface + ']'}`}>
          <div className="flex justify-center space-x-4">
            <a 
              href="https://www.facebook.com/homedesigncenterorlando/" 
              className={`text-[${colors.text}] hover:text-[${colors.primary}] transition-colors`}
              aria-label="Visit our Facebook page"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="h-6 w-6" aria-hidden="true" />
            </a>
            <a 
              href="https://www.instagram.com/the_homedesigncenter/" 
              className={`text-[${colors.text}] hover:text-[${colors.primary}] transition-colors`}
              aria-label="Visit our Instagram page"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="h-6 w-6" aria-hidden="true" />
            </a>
          </div>
          <div className="mt-4 text-center">
            <p className={`text-sm text-[${colors.textMuted}]`}>
              {pathname?.startsWith('/es') ? 'Sitio web construido por' : 'Website developed by'} <a 
                href="https://www.codedbyleo.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`text-[${colors.primary}] hover:text-[${colors.primary}]/80 transition-colors font-medium`}
              >
                CodedByLeo
              </a>
            </p>
          </div>
          <div className="mt-4 text-center text-sm">
            <p role="contentinfo" className={`text-[${colors.text}]`}>&copy; {new Date().getFullYear()} {t('navigation.title')}. {t('footer.copyright')}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}