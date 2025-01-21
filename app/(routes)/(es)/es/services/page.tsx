import { Suspense } from 'react'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { services } from './data'
import ServicesHero from '@/app/components/services-hero'

const ServiceButtons = dynamic(() => import('../components/service-buttons'), {
  ssr: true,
  loading: () => <div className="h-24 bg-[#0F0F0F]" />
})

const ServicesGrid = dynamic(() => import('@/app/components/services-grid'), {
  ssr: true
})

export const metadata: Metadata = {
  title: 'Nuestros Servicios - The HDC',
  description: 'Descubre nuestra amplia gama de servicios de mejoras y diseño para el hogar. Desde remodelaciones de cocina hasta soluciones de iluminación personalizadas.',
}

export default function SpanishServicesPage() {
  return (
    <div className="bg-[#0F0F0F] min-h-screen">
      <ServicesHero 
        title="Nuestros Servicios"
        description="Descubra nuestra amplia gama de servicios de mejoras y diseño para el hogar. Desde remodelaciones de cocinas hasta soluciones de iluminación personalizadas, estamos aquí para transformar su visión en realidad."
      />

      <Suspense fallback={<div className="h-24 bg-[#0F0F0F]" />}>
        <ServiceButtons services={services} />
      </Suspense>

      <Suspense fallback={<div className="container mx-auto px-4 py-12 animate-pulse" />}>
        <ServicesGrid services={services} />
      </Suspense>
    </div>
  )
} 