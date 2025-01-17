import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import type { Service } from '@/app/(routes)/(en)/en/components/service-buttons'
import ServiceCardSkeleton from './service-card-skeleton'

// Dynamically import ServiceCard with a more aggressive splitting strategy
const ServiceCard = dynamic(
  () => import('@/app/(routes)/(en)/en/components/service-card').then(mod => ({
    default: mod.default,
    __esModule: true,
  })),
  {
    ssr: true,
    loading: () => <ServiceCardSkeleton />
  }
)

interface ServicesGridProps {
  services: Service[]
}

export default function ServicesGrid({ services }: ServicesGridProps) {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <Suspense 
            key={service.id}
            fallback={<ServiceCardSkeleton />}
          >
            <ServiceCard 
              service={service}
              index={index}
            />
          </Suspense>
        ))}
      </div>
    </main>
  )
} 