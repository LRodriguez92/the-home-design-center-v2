import type { Service } from '../components/service-buttons'

// Import static images
import kitchenImage from '@/public/images/services/kitchen-hero.jpg'
import bathroomImage from '@/public/images/services/bathroom.jpg'
import designImage from '@/public/images/services/3D.png'
import ledImage from '@/public/images/services/LED.jpg'
import paintingImage from '@/public/images/services/painting.jpg'
import wallImage from '@/public/images/services/open-floor.jpg'
import flooringImage from '@/public/images/services/flooring-tiles.jpg'
import drywallImage from '@/public/images/services/drywall-repair.jpg'

export const services: Service[] = [
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