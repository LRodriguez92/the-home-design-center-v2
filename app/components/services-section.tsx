'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { CookingPot, Bath, Palette, Hammer, Lightbulb, Grid3X3, BrickWall, PaintBucket } from 'lucide-react'
import { useTheme } from './theme-provider'

const services = [
  {
    title: 'Kitchen Remodel',
    description: 'Transform your kitchen into a stunning, functional space.',
    icon: CookingPot,
    image: '/images/services/kitchen-hero.jpg',
    href: '/services#kitchen-remodel'
  },
  {
    title: 'Bath Remodel',
    description: 'Create your perfect bathroom sanctuary with our renovation solutions.',
    icon: Bath,
    image: '/images/services/bathroom.jpg',
    href: '/services#bath-remodel'
  },
  {
    title: '3D Design',
    description: 'Visualize your dream space with our 3D design services.',
    icon: Grid3X3,
    image: '/images/services/kitchen-service-1.png',
    href: '/services#3d-design'
  },
  {
    title: 'LED Lighting',
    description: 'Enhance your home with modern, energy-efficient LED lighting.',
    icon: Lightbulb,
    image: '/images/services/LED.jpg',
    href: '/services#led-lighting'
  },
  {
    title: 'Painting',
    description: 'Revitalize your space with professional painting services.',
    icon: PaintBucket,
    image: '/images/services/drywall-texture.jpg',
    href: '/services#painting'
  },
  {
    title: 'Wall Removal',
    description: 'Open up your living space with our wall removal services.',
    icon: BrickWall,
    image: '/images/services/flooring.jpg',
    href: '/services#wall-removal'
  },
  {
    title: 'Flooring',
    description: 'Install beautiful, durable flooring solutions for your home.',
    icon: Palette,
    image: '/images/services/flooring.jpg',
    href: '/services#flooring'
  },
  {
    title: 'Custom Cabinetry',
    description: 'Enhance your space with bespoke cabinetry solutions.',
    icon: Hammer,
    image: '/images/services/kitchen-service-2.jpg',
    href: '/services#custom-cabinetry'
  }
]

export default function ServicesSection() {
  const theme = useTheme()
  const router = useRouter()

  const handleServiceClick = (href: string) => {
    const [path, hash] = href.split('#')
    router.push(`${path}?scrollTo=${hash}`)
  }

  return (
    <section className={`py-16 md:py-24 bg-[${theme.colors.background}]`}>
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        <h2 className={`text-3xl md:text-4xl font-bold text-[${theme.colors.text}] mb-4 text-center`}>
          Our Services
        </h2>
        <p className={`text-[${theme.colors.primary}] text-lg max-w-3xl mx-auto text-center mb-12`}>
          Discover our range of home improvement and design services.
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

