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
    image: '/images/services/kitchen-hero.jpg',
    href: '/services#kitchen-remodel'
  },
  {
    title: t('services.bath.title'),
    description: t('services.bath.description'),
    icon: Bath,
    image: '/images/services/bathroom.jpg',
    href: '/services#bath-remodel'
  },
  {
    title: t('services.design.title'),
    description: t('services.design.description'),
    icon: Grid3X3,
    image: '/images/services/3D.png',
    href: '/services#3d-design'
  },
  {
    title: t('services.lighting.title'),
    description: t('services.lighting.description'),
    icon: Lightbulb,
    image: '/images/services/LED.jpg',
    href: '/services#led-lighting'
  },
  {
    title: t('services.painting.title'),
    description: t('services.painting.description'),
    icon: PaintBucket,
    image: '/images/services/painting.jpg',
    href: '/services#painting'
  },
  {
    title: t('services.wall.title'),
    description: t('services.wall.description'),
    icon: BrickWall,
    image: '/images/services/open-floor.jpg',
    href: '/services#wall-removal'
  },
  {
    title: t('services.flooring.title'),
    description: t('services.flooring.description'),
    icon: Palette,
    image: '/images/services/flooring-tiles.jpg',
    href: '/services#flooring'
  },
  {
    title: t('services.drywall.title'),
    description: t('services.drywall.description'),
    icon: Hammer,
    image: '/images/services/drywall-repair.jpg',
    href: '/services#drywall-texture'
  }
]

export default function ServicesSection({ lang }: ServicesSectionProps) {
  const theme = useTheme()
  const router = useRouter()
  const pathname = usePathname()
  const currentLang = lang || (pathname.startsWith('/es') ? 'es' : 'en')
  const { t } = useTranslations(currentLang)
  const services = getServices(t)

  const handleServiceClick = (href: string) => {
    const [path, hash] = href.split('#')
    router.push(`/${currentLang}${path}?scrollTo=${hash}`)
  }

  return (
    <section className={`py-16 md:py-24 bg-[${theme.colors.background}]`}>
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        <h2 className={`text-3xl md:text-4xl font-bold text-[${theme.colors.text}] mb-4 text-center`}>
          {t('services.title')}
        </h2>
        <p className={`text-[${theme.colors.primary}] text-lg max-w-3xl mx-auto text-center mb-12`}>
          {t('services.subtitle')}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <div
                key={service.title}
                onClick={() => handleServiceClick(service.href)}
                className={`group rounded-lg overflow-hidden border-2 border-[${theme.colors.surface}] transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:border-[${theme.colors.primary}] cursor-pointer`}
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={service.image}
                    alt={service.title}
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className={`absolute top-4 left-4 p-3 bg-[${theme.colors.primary}] rounded-full transform transition-transform duration-300 group-hover:scale-110`}>
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

