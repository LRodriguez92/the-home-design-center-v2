'use client'

import { CookingPot, Bath, Grid3X3, Lightbulb, PaintBucket, BrickWall, Palette, Hammer } from 'lucide-react'

const services = [
  {
    id: 'kitchen-remodel',
    title: 'Kitchen Remodel',
    icon: CookingPot,
  },
  {
    id: 'bath-remodel',
    title: 'Bath Remodel',
    icon: Bath,
  },
  {
    id: '3d-design',
    title: '3D Design',
    icon: Grid3X3,
  },
  {
    id: 'led-lighting',
    title: 'LED Lighting',
    icon: Lightbulb,
  },
  {
    id: 'painting',
    title: 'Painting',
    icon: PaintBucket,
  },
  {
    id: 'wall-removal',
    title: 'Wall Removal',
    icon: BrickWall,
  },
  {
    id: 'flooring',
    title: 'Flooring',
    icon: Palette,
  },
  {
    id: 'drywall-repair',
    title: 'Drywall Repair',
    icon: Hammer,
  }
]

export function ServiceButtons() {
  return (
    <section className="bg-[#0F0F0F] py-16">
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
                  // Update the URL without triggering a page reload
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