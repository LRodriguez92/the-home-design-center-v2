'use client'

import { useEffect, Suspense } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { CookingPot, Bath, Grid3X3, Lightbulb, PaintBucket, BrickWall, Palette, Hammer } from 'lucide-react'

const services = [
  {
    id: 'kitchen-remodel',
    title: 'Kitchen Remodel',
    description: 'Transform your kitchen into a functional and stylish space.',
    icon: CookingPot,
    image: '/images/services/kitchen-hero.jpg',
    details: [
      'Custom cabinets and islands',
      'Durable countertops',
      'Modern lighting designs',
      'Quality doors and drawers',
      'Premium hardware',
      'Fixtures'
    ]
  },
  {
    id: 'bath-remodel',
    title: 'Bath Remodel',
    description: 'Elevate your bathroom&apos;s functionality and style with our remodeling services.',
    icon: Bath,
    image: '/images/services/bathroom.jpg',
    details: [
      'High-quality materials',
      'Fixtures',
      'Tailored designs',
      'Water-saving solutions',
      'Restoration'
    ]
  },
  {
    id: '3d-design',
    title: '3D Design',
    description: 'Visualize your new kitchen before any materials are ordered with our 3D design services.',
    icon: Grid3X3,
    image: '/images/services/3D.png',
    details: [
      'Precise measurements',
      'Accurate 3D renderings',
      'Design consultation',
      'Realistic 3D visualization'
    ]
  },
  {
    id: 'led-lighting',
    title: 'LED Lighting',
    description: 'Illuminate your home with energy-efficient, stylish LED lighting solutions.',
    icon: Lightbulb,
    image: '/images/services/LED.jpg',
    details: [
      'Custom lighting design',
      'Energy-efficient solutions',
      'Smart lighting integration',
      'Accent and task lighting',
      'Outdoor LED lighting',
      'Retrofit services'
    ]
  },
  {
    id: 'painting',
    title: 'Painting',
    description: 'Enhance the beauty and ambiance of your home with our comprehensive interior painting services.',
    icon: PaintBucket,
    image: '/images/services/painting.jpg',
    details: [
      'Thorough surface prep',
      'High-quality paint application',
      'Hardware installation',
      'Trim and molding painting'
    ]
  },
  {
    id: 'wall-removal',
    title: 'Wall Removal',
    description: 'Transform your living spaces by removing unnecessary walls to create an open-concept design.',
    icon: BrickWall,
    image: '/images/services/open-floor.jpg',
    details: [
      'Non load-bearing walls',
      'Design consultation',
      'Efficient debris management'
    ]
  },
  {
    id: 'flooring',
    title: 'Flooring',
    description: 'Choose from a wide range of flooring solutions to suit every room in your home.',
    icon: Palette,
    image: '/images/services/flooring-tiles.jpg',
    details: [
      'Procelain tile',
      'Ceramic tile',
      'Solid wood',
      'Laminate wood',
      'Engineered wood',
      'Luxury vinyl',
      'Carpeting',
      'Outdoor pavers'
    ]
  },
  {
    id: 'drywall-repair',
    title: 'Drywall Repair',
    description: 'Enhance your home&apos;s interior with professional drywall repair.',
    icon: Hammer,
    image: '/images/services/drywall-repair.jpg',
    details: [
      'Professional application',
      'Seamless blending',
      'Atmosphere enhancement'
    ]
  }
]

function ServicesContent() {
  const searchParams = useSearchParams()

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
      <section className="relative bg-[#1C1F33] py-24 md:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/heroes/workers.jpg"
            alt="Home Design Services"
            layout="fill"
            objectFit="cover"
            priority
            className="brightness-50"
          />
        </div>
        <div className="relative container mx-auto px-4 z-10 flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F5F5F5] mb-6">
            Our Services
          </h1>
          <p className="text-xl md:text-2xl text-[#B0B0B0] mb-8 max-w-3xl">
            Discover our comprehensive range of home improvement and design services. From kitchen remodels to custom lighting solutions, we&apos;re here to transform your vision into reality.
          </p>
        </div>
      </section>

      {/* Service Buttons Section */}
      <section className="bg-[#0F0F0F] py-16">
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
                    // Update the URL without triggering a page reload
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
      <main className="container mx-auto px-4 py-12">
        <div className="grid gap-16">
          {services.map((service, index) => (
            <section key={service.id} id={service.id} className="border-2 border-[#C9A227] rounded-lg overflow-hidden shadow-lg mb-8 scroll-mt-24">
              <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="md:w-1/3 flex-shrink-0">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={600}
                    height={400}
                    className="h-48 w-full object-cover md:h-full"
                    loading={index <= 1 ? "eager" : "lazy"}
                  />
                </div>
                <div className="p-8 md:w-2/3">
                  <div className="uppercase tracking-wide text-sm text-[#C9A227] font-semibold">{service.title}</div>
                  <p className="mt-2 text-[#F5F5F5]">{service.description}</p>
                  {service.details.length > 0 && (
                    <>
                      <h3 className="mt-4 text-lg font-semibold text-[#F5F5F5]">Our {service.title} services include:</h3>
                      <ul className="mt-2 list-disc list-inside text-[#B0B0B0]">
                        {service.details.map((detail, index) => (
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

export default function ServicesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ServicesContent />
    </Suspense>
  )
}

