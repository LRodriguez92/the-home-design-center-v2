'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from './theme-provider'
import { useTranslations } from '@/app/lib/translations'
import { usePathname } from 'next/navigation'

interface HeroProps {
  title?: string
  subtitle?: string
}

export default function Hero({ 
  title = 'Elevate Your Living Space',
  subtitle = 'Experience unparalleled luxury with our bespoke home design and remodeling services.'
}: HeroProps) {
  const theme = useTheme()
  const pathname = usePathname()
  const { t } = useTranslations(pathname?.startsWith('/es') ? 'es' : 'en')
  const currentLang = pathname?.startsWith('/es') ? 'es' : 'en'

  return (
    <div className="relative h-screen flex items-center justify-center">
      {/* Background Image */}
      <Image
        src="/images/heroes/kitchen-service-2.jpg"
        alt={t('home.hero.image')}
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
        className="brightness-[0.6]"
      />
      
      {/* Overlay */}
      <div className={`absolute inset-0 bg-[${theme.colors.background}] bg-opacity-70`} />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[${theme.colors.text}]`}>
            {title}
          </h1>
          <p className={`mx-auto max-w-2xl text-xl sm:text-2xl text-[${theme.colors.textMuted}]`}>
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href={`/${currentLang}/contact`}
              className={`inline-flex items-center px-8 py-3 rounded-md bg-[${theme.colors.primary}] text-[#0F0F0F] text-lg font-semibold hover:bg-[${theme.colors.primary}]/90 transition duration-300`}
            >
              {t('home.hero.buttons.contact')}
            </Link>
            <Link 
              href={`/${currentLang}/projects`}
              className={`inline-flex items-center px-8 py-3 rounded-md border-2 border-[${theme.colors.secondary}] bg-transparent text-[${theme.colors.text}] text-lg font-semibold hover:bg-[${theme.colors.secondary}] hover:text-[${theme.colors.text}] transition duration-300`}
            >
              {t('home.hero.buttons.portfolio')}
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[${theme.colors.primary}] to-[${theme.colors.secondary}]`} />
    </div>
  )
}

