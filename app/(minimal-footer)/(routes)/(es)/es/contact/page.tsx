'use client'

import ContactForm from '@/app/components/contact-form'
import ContactInfo from '@/app/components/contact-info'
import Image from 'next/image'
import { useTranslations } from '@/app/lib/translations'

export default function SpanishContactPage() {
  const { t } = useTranslations('es')
  
  return (
    <div className="min-h-screen bg-[#0F0F0F] text-[#F5F5F5]">
      <div className="relative h-[40vh] md:h-[50vh] lg:h-[60vh]">
        <Image
          src="/images/heroes/contact.webp"
          alt="Diseño interior elegante"
          fill
          style={{ objectFit: 'cover' }}
          quality={100}
          className="brightness-50"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F5F5F5] mb-6">
            {t('contact.title')}
          </h1>
          <p className="text-xl md:text-2xl text-[#B0B0B0] mb-8 max-w-3xl">
            {t('contact.subtitle')}
          </p>
        </div>
        {/* Bottom Accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary" />
      </div>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <ContactForm lang="es" />
            <ContactInfo lang="es" />
          </div>
        </div>
      </div>
    </div>
  )
} 