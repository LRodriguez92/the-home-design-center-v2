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
  title: 'Our Services - The HDC',
  description: 'Discover our comprehensive range of home improvement and design services. From kitchen remodels to custom lighting solutions.',
}

export default function EnglishServicesPage() {
  return (
    <div className="bg-[#0F0F0F] min-h-screen">
      <ServicesHero 
        title="Our Services"
        description="Discover our comprehensive range of home improvement and design services. From kitchen remodels to custom lighting solutions, we're here to transform your vision into reality."
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