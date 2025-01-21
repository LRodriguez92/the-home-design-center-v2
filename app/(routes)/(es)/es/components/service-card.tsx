import Image from 'next/image'
import type { Service } from './service-buttons'

interface ServiceCardProps {
  service: Service
  index: number
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  return (
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
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading={index <= 2 ? "eager" : "lazy"}
          placeholder="blur"
          quality={service.id === '3d-design' ? 80 : 65}
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
  )
} 