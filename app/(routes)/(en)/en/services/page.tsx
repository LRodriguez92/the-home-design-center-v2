'use client'

import { Suspense } from 'react'
import { CookingPot, Bath, Grid3X3, Lightbulb, PaintBucket, BrickWall, Palette, Hammer } from 'lucide-react'
import { useTranslations } from '@/app/lib/translations'
import { OptimizedImage } from '@/app/components/optimized-image'
import ServiceButtons from './components/service-buttons'

function ServicesContent() {
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

      {/* Service Buttons Section - Client Component */}
      <ServiceButtons services={services} />

      {/* Services List */}
      <main className="bg-[#0F0F0F] py-16 px-4 scroll-mt-16 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6 lg:gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className="bg-[#0F0F0F] border-2 border-[#F5F5F5] rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:-translate-y-1 scroll-mt-24 w-full max-w-[400px] mx-auto"
              >
                <div className="relative h-48 w-full">
                  <OptimizedImage
                    src={service.image}
                    alt={service.title}
                    width={400}
                    height={300}
                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                    objectFit="cover"
                    quality={85}
                    sizes="400px"
                    priority={index <= 1}
                  />
                </div>
                <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
                  <h3 className="uppercase tracking-wide text-base sm:text-lg text-[#C9A227] font-semibold mb-2">{service.title}</h3>
                  <p className="text-[#F5F5F5] text-sm sm:text-base mb-4">{service.description}</p>
                  {service.details && (
                    <ul className={`text-[#B0B0B0] text-sm sm:text-base space-y-2 flex-grow ${
                      service.details.length > 4 ? 'xl:columns-2 xl:gap-x-8' : ''
                    }`}>
                      {service.details.map((detail: string, index: number) => (
                        <li key={index} className="relative pl-6 before:content-['•'] before:text-[#C9A227] before:absolute before:left-0">
                          {detail}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
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