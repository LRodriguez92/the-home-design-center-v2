'use client'

import { useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { CookingPot, Bath, Grid3X3, Lightbulb, PaintBucket, BrickWall, Palette, Hammer } from 'lucide-react'
import { useTranslations } from '@/app/lib/translations'
import { OptimizedImage } from '@/app/components/optimized-image'

function ServicesContent() {
  const searchParams = useSearchParams()
  const { t } = useTranslations('en')

  const services = [
    {
      id: 'kitchen-remodel',
      title: t('services.kitchen.title'),
      description: t('services.kitchen.description'),
      icon: CookingPot,
      image: '/images/services/kitchen-hero.jpg',
      details: JSON.parse(t('services.kitchen.details')),
    },
    {
      id: 'bath-remodel',
      title: t('services.bath.title'),
      description: t('services.bath.description'),
      icon: Bath,
      image: '/images/services/bathroom.jpg',
      details: JSON.parse(t('services.bath.details')),
    },
    {
      id: '3d-design',
      title: t('services.design.title'),
      description: t('services.design.description'),
      icon: Grid3X3,
      image: '/images/services/3D.png',
      details: JSON.parse(t('services.design.details')),
    },
    {
      id: 'led-lighting',
      title: t('services.lighting.title'),
      description: t('services.lighting.description'),
      icon: Lightbulb,
      image: '/images/services/LED.jpg',
      details: JSON.parse(t('services.lighting.details')),
    },
    {
      id: 'painting',
      title: t('services.painting.title'),
      description: t('services.painting.description'),
      icon: PaintBucket,
      image: '/images/services/painting.jpg',
      details: JSON.parse(t('services.painting.details')),
    },
    {
      id: 'wall-removal',
      title: t('services.wall.title'),
      description: t('services.wall.description'),
      icon: BrickWall,
      image: '/images/services/open-floor.jpg',
      details: JSON.parse(t('services.wall.details')),
    },
    {
      id: 'flooring',
      title: t('services.flooring.title'),
      description: t('services.flooring.description'),
      icon: Palette,
      image: '/images/services/flooring-tiles.jpg',
      details: JSON.parse(t('services.flooring.details')),
    },
    {
      id: 'drywall-repair',
      title: t('services.drywall.title'),
      description: t('services.drywall.description'),
      icon: Hammer,
      image: '/images/services/drywall-repair.jpg',
      details: JSON.parse(t('services.drywall.details')),
    }
  ]

  useEffect(() => {
    const scrollToService = searchParams.get('scrollTo')
    if (scrollToService) {
      const element = document.getElementById(scrollToService)
      if (element) {
        const yOffset = -80
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
        window.scrollTo({ top: y, behavior: 'smooth' })
      }
    }
  }, [searchParams])

  return (
    <div className="bg-[#0F0F0F] min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[#1C1F33] min-h-[25vh] md:min-h-[60vh]">
        <div className="absolute inset-0 overflow-hidden">
          <OptimizedImage
            src="/images/heroes/workers.jpg"
            alt={t('services.hero.image')}
            width={1920}
            height={1080}
            priority={true}
            quality={85}
            className="brightness-50 object-[center_65%]"
            objectFit="cover"
            sizes="100vw"
          />
        </div>
        <div className="relative container mx-auto px-4 z-10 flex flex-col items-center justify-center text-center h-full min-h-[inherit]">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F5F5F5] mb-0.5 md:mb-6">
            {t('services.title')}
          </h1>
          <p className="text-lg md:text-2xl text-[#B0B0B0] mb-0.5 md:mb-8 max-w-3xl">
            {t('services.subtitle')}
          </p>
        </div>
      </section>

      {/* Service Buttons Section */}
      <section className="bg-[#0F0F0F] py-2 md:py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {services.map((service) => (
              <a
                key={service.id}
                href={`#${service.id}`}
                className="inline-flex items-center px-4 py-2 border border-[#C9A227] rounded-md text-[#C9A227] hover:bg-[#C9A227] hover:text-[#0F0F0F] transition-colors duration-300"
                onClick={(e) => {
                  e.preventDefault()
                  const element = document.getElementById(service.id)
                  if (element) {
                    const yOffset = -80
                    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
                    window.scrollTo({ top: y, behavior: 'smooth' })
                    window.history.pushState(null, '', `#${service.id}`)
                  }
                }}
              >
                <service.icon className="w-5 h-5 mr-2" />
                {service.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Services List */}
      <main className="container mx-auto px-4 py-6 md:py-12">
        <div className="grid gap-8 md:gap-16">
          {services.map((service, index) => (
            <section key={service.id} id={service.id} className="border-2 border-[#C9A227] rounded-lg overflow-hidden shadow-lg mb-4 md:mb-8 scroll-mt-24">
              <div className={`flex flex-col h-full ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="w-full md:w-1/3 relative h-32 md:h-auto">
                  <OptimizedImage
                    src={service.image}
                    alt={service.title}
                    width={600}
                    height={400}
                    className="h-full w-full"
                    objectFit="cover"
                    quality={75}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-8 w-full md:w-2/3">
                  <div className="uppercase tracking-wide text-sm text-[#C9A227] font-semibold">{service.title}</div>
                  <p className="mt-2 text-[#F5F5F5]">{service.description}</p>
                  {service.details && (
                    <>
                      <h3 className="mt-4 text-lg font-semibold text-[#F5F5F5]">
                        {t('services.detailsTitle')}
                      </h3>
                      <ul className={`mt-2 list-disc list-inside text-[#B0B0B0] ${(service.id === 'kitchen-remodel' || service.id === 'flooring') ? 'columns-2 gap-x-8' : ''}`}>
                        {service.details.map((detail: string, index: number) => (
                          <li key={index}>{detail}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  )
}

export default function EnglishServicesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ServicesContent />
    </Suspense>
  )
} 