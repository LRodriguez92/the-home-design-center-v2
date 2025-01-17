import Image from 'next/image'
import { Metadata } from 'next'
import ServiceButtons from '../components/service-buttons'
import type { Service } from '../components/service-buttons'

// Import static images
import heroImage from '@/public/images/heroes/workers.jpg'
import kitchenImage from '@/public/images/services/kitchen-hero.jpg'
import bathroomImage from '@/public/images/services/bathroom.jpg'
import designImage from '@/public/images/services/3D.png'
import ledImage from '@/public/images/services/LED.jpg'
import paintingImage from '@/public/images/services/painting.jpg'
import wallImage from '@/public/images/services/open-floor.jpg'
import flooringImage from '@/public/images/services/flooring-tiles.jpg'
import drywallImage from '@/public/images/services/drywall-repair.jpg'

export const metadata: Metadata = {
  title: 'Our Services - HDC',
  description: 'Discover our comprehensive range of home improvement and design services. From kitchen remodels to custom lighting solutions.',
}

const services: Service[] = [
  {
    id: 'kitchen-remodel',
    title: 'Kitchen Remodel',
    description: 'Transform your kitchen into a functional and stylish space.',
    iconName: 'CookingPot',
    image: kitchenImage,
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
    iconName: 'Bath',
    image: bathroomImage,
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
    iconName: 'Grid3X3',
    image: designImage,
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
    iconName: 'Lightbulb',
    image: ledImage,
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
    iconName: 'PaintBucket',
    image: paintingImage,
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
    iconName: 'BrickWall',
    image: wallImage,
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
    iconName: 'Palette',
    image: flooringImage,
    details: [
      'Porcelain tile',
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
    iconName: 'Hammer',
    image: drywallImage,
    details: [
      'Professional application',
      'Seamless blending',
      'Atmosphere enhancement'
    ]
  }
]

export default function EnglishServicesPage() {
  return (
    <div className="bg-[#0F0F0F] min-h-screen">
      {/* Hero Section - Fixed height */}
      <div className="relative h-[40vh] md:h-[50vh] lg:h-[60vh] bg-[#1C1F33]">
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt="Home Design Services"
            priority
            placeholder="blur"
            className="brightness-50 object-cover"
            fill
            sizes="100vw"
            quality={85}
          />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F5F5F5] mb-6">
            Our Services
          </h1>
          <p className="text-xl md:text-2xl text-[#B0B0B0] max-w-3xl mx-auto">
            Discover our comprehensive range of home improvement and design services. From kitchen remodels to custom lighting solutions, we&apos;re here to transform your vision into reality.
          </p>
        </div>
      </div>

      {/* Service Buttons Section */}
      <ServiceButtons services={services} />

      {/* Services List */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <section 
              key={service.id} 
              id={service.id} 
              className="border-2 border-[#C9A227] rounded-lg overflow-hidden shadow-lg scroll-mt-24 bg-[#0F0F0F] flex flex-col"
            >
              <div className="relative aspect-[3/2] w-full bg-[#0F0F0F]">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="lazy"
                  placeholder="blur"
                  quality={85}
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="uppercase tracking-wide text-sm text-[#C9A227] font-semibold mb-3">{service.title}</div>
                <p className="text-[#F5F5F5] mb-4">{service.description}</p>
                {service.details.length > 0 && (
                  <ul className="text-[#B0B0B0] list-disc list-inside space-y-1">
                    {service.details.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  )
} 