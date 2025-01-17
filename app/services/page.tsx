import Image from 'next/image'
import { ServiceButtons } from './components/service-buttons'
import { Metadata } from 'next'

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

const services = [
  {
    id: 'kitchen-remodel',
    title: 'Kitchen Remodel',
    description: 'Transform your kitchen into a functional and stylish space.',
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
    image: flooringImage,
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
    image: drywallImage,
    details: [
      'Professional application',
      'Seamless blending',
      'Atmosphere enhancement'
    ]
  }
]

export default function ServicesPage() {
  return (
    <div className="bg-[#0F0F0F] min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh] lg:h-[60vh] bg-[#1C1F33]">
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt="Home Design Services"
            priority
            placeholder="blur"
            className="brightness-50 object-cover"
            sizes="100vw"
            quality={100}
            fill
          />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F5F5F5] mb-6">
            Our Services
          </h1>
          <p className="text-xl md:text-2xl text-[#B0B0B0] mb-8 max-w-3xl">
            Discover our comprehensive range of home improvement and design services. From kitchen remodels to custom lighting solutions, we&apos;re here to transform your vision into reality.
          </p>
        </div>
      </div>

      {/* Service Buttons Section */}
      <ServiceButtons />

      {/* Services List */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid gap-16">
          {services.map((service, index) => (
            <section 
              key={service.id} 
              id={service.id} 
              className="border-2 border-[#C9A227] rounded-lg overflow-hidden shadow-lg mb-8 scroll-mt-24 min-h-[24rem]"
            >
              <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="md:w-1/3 flex-shrink-0">
                  <div className="relative aspect-[3/2] w-full bg-[#1C1F33]">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      loading={index <= 1 ? "eager" : "lazy"}
                      placeholder="blur"
                      quality={85}
                    />
                  </div>
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

