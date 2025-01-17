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
  title: 'Nuestros Servicios - HDC',
  description: 'Descubra nuestra amplia gama de servicios de mejoras y diseño para el hogar. Desde remodelaciones de cocinas hasta soluciones de iluminación personalizadas.',
}

const services: Service[] = [
  {
    id: 'kitchen-remodel',
    title: 'Remodelación de Cocina',
    description: 'Transforme su cocina en un espacio funcional y elegante.',
    iconName: 'CookingPot',
    image: kitchenImage,
    details: [
      'Gabinetes e islas personalizados',
      'Encimeras duraderas',
      'Diseños de iluminación modernos',
      'Puertas y cajones de calidad',
      'Hardware premium',
      'Accesorios'
    ]
  },
  {
    id: 'bath-remodel',
    title: 'Remodelación de Baño',
    description: 'Eleve la funcionalidad y el estilo de su baño con nuestros servicios de remodelación.',
    iconName: 'Bath',
    image: bathroomImage,
    details: [
      'Materiales de alta calidad',
      'Accesorios',
      'Diseños personalizados',
      'Soluciones de ahorro de agua',
      'Restauración'
    ]
  },
  {
    id: '3d-design',
    title: 'Diseño 3D',
    description: 'Visualice su nueva cocina antes de ordenar cualquier material con nuestros servicios de diseño 3D.',
    iconName: 'Grid3X3',
    image: designImage,
    details: [
      'Mediciones precisas',
      'Renderizados 3D precisos',
      'Consulta de diseño',
      'Visualización 3D realista'
    ]
  },
  {
    id: 'led-lighting',
    title: 'Iluminación LED',
    description: 'Ilumine su hogar con soluciones de iluminación LED elegantes y eficientes en energía.',
    iconName: 'Lightbulb',
    image: ledImage,
    details: [
      'Diseño de iluminación personalizado',
      'Soluciones eficientes en energía',
      'Integración de iluminación inteligente',
      'Iluminación de acento y tarea',
      'Iluminación LED exterior',
      'Servicios de actualización'
    ]
  },
  {
    id: 'painting',
    title: 'Pintura',
    description: 'Mejore la belleza y el ambiente de su hogar con nuestros servicios integrales de pintura interior.',
    iconName: 'PaintBucket',
    image: paintingImage,
    details: [
      'Preparación minuciosa de superficies',
      'Aplicación de pintura de alta calidad',
      'Instalación de hardware',
      'Pintura de molduras y acabados'
    ]
  },
  {
    id: 'wall-removal',
    title: 'Eliminación de Paredes',
    description: 'Transforme sus espacios eliminando paredes innecesarias para crear un diseño de concepto abierto.',
    iconName: 'BrickWall',
    image: wallImage,
    details: [
      'Paredes no estructurales',
      'Consulta de diseño',
      'Gestión eficiente de escombros'
    ]
  },
  {
    id: 'flooring',
    title: 'Pisos',
    description: 'Elija entre una amplia gama de soluciones de pisos para cada habitación de su hogar.',
    iconName: 'Palette',
    image: flooringImage,
    details: [
      'Baldosas de porcelana',
      'Baldosas cerámicas',
      'Madera sólida',
      'Madera laminada',
      'Madera de ingeniería',
      'Vinilo de lujo',
      'Alfombras',
      'Adoquines exteriores'
    ]
  },
  {
    id: 'drywall-repair',
    title: 'Reparación de Drywall',
    description: 'Mejore el interior de su hogar con reparación profesional de drywall.',
    iconName: 'Hammer',
    image: drywallImage,
    details: [
      'Aplicación profesional',
      'Mezcla perfecta',
      'Mejora de la atmósfera'
    ]
  }
]

export default function SpanishServicesPage() {
  return (
    <div className="bg-[#0F0F0F] min-h-screen">
      {/* Hero Section - Fixed height */}
      <div className="relative h-[40vh] md:h-[50vh] lg:h-[60vh] bg-[#1C1F33]">
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt="Servicios de Diseño del Hogar"
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
            Nuestros Servicios
          </h1>
          <p className="text-xl md:text-2xl text-[#B0B0B0] max-w-3xl mx-auto">
            Descubra nuestra amplia gama de servicios de mejoras y diseño para el hogar. Desde remodelaciones de cocinas hasta soluciones de iluminación personalizadas, estamos aquí para transformar su visión en realidad.
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