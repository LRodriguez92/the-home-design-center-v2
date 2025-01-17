import { CookingPot, Bath, Grid3X3, Lightbulb, PaintBucket, BrickWall, Palette, Hammer } from 'lucide-react'
import { StaticImageData } from 'next/image'

const iconMap = {
  CookingPot,
  Bath,
  Grid3X3,
  Lightbulb,
  PaintBucket,
  BrickWall,
  Palette,
  Hammer
} as const

type IconName = keyof typeof iconMap

export type Service = {
  id: string
  title: string
  description: string
  iconName: IconName
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
          {services.map((service) => {
            const Icon = iconMap[service.iconName]
            return (
              <a
                key={service.id}
                href={`#${service.id}`}
                className="inline-flex items-center px-4 py-2 border border-[#C9A227] rounded-md text-[#C9A227] hover:bg-[#C9A227] hover:text-black transition-colors duration-300"
              >
                <Icon className="w-5 h-5 mr-2" />
                {service.title}
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
} 