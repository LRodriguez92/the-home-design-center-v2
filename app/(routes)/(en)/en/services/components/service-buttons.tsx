'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { LucideIcon } from 'lucide-react'

interface Service {
  id: string
  title: string
  icon: LucideIcon
}

interface ServiceButtonsProps {
  services: Service[]
}

export default function ServiceButtons({ services }: ServiceButtonsProps) {
  const searchParams = useSearchParams()

  useEffect(() => {
    const scrollToService = searchParams.get('scrollTo')
    if (scrollToService) {
      const element = document.getElementById(scrollToService)
      if (element) {
        const yOffset = -80
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
        window.scrollTo({ top: y, behavior: 'smooth' })
      }
    }
  }, [searchParams])

  return (
    <section className="bg-[#0F0F0F] py-2 md:py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-4">
          {services.map((service) => (
            <a
              key={service.id}
              href={`#${service.id}`}
              className="inline-flex items-center px-4 py-2 border border-[#C9A227] rounded-md text-[#C9A227] hover:bg-[#C9A227] hover:text-[#0F0F0F] transition-colors duration-300"
              onClick={(e) => {
                e.preventDefault()
                const element = document.getElementById(service.id)
                if (element) {
                  const yOffset = -80
                  const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
                  window.scrollTo({ top: y, behavior: 'smooth' })
                  window.history.pushState(null, '', `#${service.id}`)
                }
              }}
            >
              <service.icon className="w-5 h-5 mr-2" />
              {service.title}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
} 