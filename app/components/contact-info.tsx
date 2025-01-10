'use client'

import { Phone, Mail, Clock } from 'lucide-react'
import { useTheme } from './theme-provider'
import { useTranslations, type Language } from '@/app/lib/translations'

interface ContactInfoProps {
  lang?: Language
}

export default function ContactInfo({ lang }: ContactInfoProps) {
  const theme = useTheme()
  const { t } = useTranslations(lang || 'en')

  return (
    <div className="space-y-8">
      <div>
        <h2 className={`text-2xl font-semibold mb-4 text-[${theme.colors.primary}]`}>
          {t('contact.info.title')}
        </h2>
        <p className="text-[#B0B0B0]">
          {t('contact.info.description')}
        </p>
      </div>
      <div className="space-y-4">
        <div className="flex items-center">
          <Phone className={`w-6 h-6 mr-4 text-[${theme.colors.primary}]`} />
          <div>
            <p className="font-medium">{t('contact.info.phone.label')}</p>
            <a href="tel:+14078071328" className="text-[#B0B0B0] hover:text-[#C9A227] transition-colors">
              {t('contact.info.phone.value')}
            </a>
          </div>
        </div>
        <div className="flex items-center">
          <Mail className={`w-6 h-6 mr-4 text-[${theme.colors.primary}]`} />
          <div>
            <p className="font-medium">{t('contact.info.email.label')}</p>
            <a href="mailto:TheHomeDesignCenterOrlando@gmail.com" className="text-[#B0B0B0] hover:text-[#C9A227] transition-colors">
              {t('contact.info.email.value')}
            </a>
          </div>
        </div>
        <div className="flex items-start">
          <Clock className={`w-6 h-6 mr-4 text-[${theme.colors.primary}] mt-1`} />
          <div>
            <p className="font-medium">{t('contact.info.hours.label')}</p>
            <p className="text-[#B0B0B0] whitespace-pre-line">
              {t('contact.info.hours.value')}
            </p>
          </div>
        </div>
      </div>
      <div>
        <h3 className={`text-xl font-semibold mb-2 text-[${theme.colors.primary}]`}>
          {t('contact.info.areas.label')}
        </h3>
        <p className="text-[#B0B0B0]">
          {t('contact.info.areas.value')}
        </p>
      </div>
    </div>
  )
}

