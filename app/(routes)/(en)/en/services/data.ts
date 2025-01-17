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