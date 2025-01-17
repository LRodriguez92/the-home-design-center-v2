'use client'

import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import { CookingPot, Bath, Palette, Hammer, Lightbulb, Grid3X3, BrickWall, PaintBucket } from 'lucide-react'
import { useTheme } from './theme-provider'
import { useTranslations, type Language, type TranslationKey } from '@/app/lib/translations'

interface ServicesSectionProps {
  lang?: Language
}

const getServices = (t: (key: TranslationKey) => string) => [
  {
    title: t('services.kitchen.title'),
    description: t('services.kitchen.description'),
    icon: CookingPot,
    image: '/images/services/kitchen-hero.jpg'
  },
  {
    title: t('services.bath.title'),
    description: t('services.bath.description'),
    icon: Bath,
    image: '/images/services/bathroom.jpg'
  },
  {
    title: t('services.design.title'),
    description: t('services.design.description'),
    icon: Grid3X3,
    image: '/images/services/3D.png'
  },
  {
    title: t('services.lighting.title'),
    description: t('services.lighting.description'),
    icon: Lightbulb,
    image: '/images/services/LED.jpg'
  },
  {
    title: t('services.painting.title'),
    description: t('services.painting.description'),
    icon: PaintBucket,
    image: '/images/services/painting.jpg'
  },
  {
    title: t('services.wall.title'),
    description: t('services.wall.description'),
    icon: BrickWall,
    image: '/images/services/open-floor.jpg'
  },
  {
    title: t('services.flooring.title'),
    description: t('services.flooring.description'),
    icon: Palette,
    image: '/images/services/flooring-tiles.jpg'
  },
  {
    title: t('services.drywall.title'),
    description: t('services.drywall.description'),
    icon: Hammer,
    image: '/images/services/drywall-repair.jpg'
  }
]

export default function ServicesSection({ lang }: ServicesSectionProps) {
  const theme = useTheme()
  const router = useRouter()
  const pathname = usePathname()
  const currentLang = lang || (pathname.startsWith('/es') ? 'es' : 'en')
  const { t } = useTranslations(currentLang)
  const services = getServices(t)

  const handleServiceClick = () => {
    router.push(`/${currentLang}/services`)
  }

  return (
    <section 
      className={`py-16 md:py-24 bg-[${theme.colors.background}]`}
      aria-labelledby="services-title"
    >
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        <h2 
          id="services-title"
          className={`text-3xl md:text-4xl font-bold text-[${theme.colors.text}] mb-4 text-center`}
        >
          {t('services.title')}
        </h2>
        <p className={`text-[${theme.colors.primary}] text-lg max-w-3xl mx-auto text-center mb-12`}>
          {t('services.subtitle')}
        </p>
        <div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10"
          role="list"
          aria-label={t('services.title')}
        >
          {services.map((service) => {
            const Icon = service.icon
            return (
              <div
                key={service.title}
                onClick={handleServiceClick}
                className={`group rounded-lg overflow-hidden border-2 border-[${theme.colors.surface}] transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:border-[${theme.colors.primary}] cursor-pointer min-h-[48px] p-2 focus-within:ring-2 focus-within:ring-[${theme.colors.primary}] focus-within:ring-offset-2`}
                role="listitem"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleServiceClick()
                  }
                }}
                aria-label={`${service.title} - ${service.description}`}
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={service.image}
                    alt=""
                    layout="fill"
                    objectFit="cover"
                    aria-hidden="true"
                  />
                  <div 
                    className={`absolute top-4 left-4 p-4 bg-[${theme.colors.primary}] rounded-full transform transition-transform duration-300 group-hover:scale-110 min-h-[48px] min-w-[48px] flex items-center justify-center`}
                    aria-hidden="true"
                  >
                    <Icon className={`h-8 w-8 text-[${theme.colors.onPrimary}]`} />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className={`text-xl font-semibold text-[${theme.colors.text}] mb-2`}>
                    {service.title}
                  </h3>
                  <p className={`text-[${theme.colors.textMuted}] text-sm`}>
                    {service.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

