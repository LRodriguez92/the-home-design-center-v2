import { StaticImageData } from 'next/image'
import ServiceButton from '@/app/components/service-button'

export type Service = {
  id: string
  title: string
  description: string
  iconName: string
  image: StaticImageData
  details: string[]
}

interface ServiceButtonsProps {
  services: Service[]
}

export default function ServiceButtons({ services }: ServiceButtonsProps) {
  return (
    <section className="bg-[#0F0F0F] py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-4">
          {services.map((service) => (
            <ServiceButton
              key={service.id}
              id={service.id}
              title={service.title}
              iconName={service.iconName}
            />
          ))}
        </div>
      </div>
    </section>
  )
} 