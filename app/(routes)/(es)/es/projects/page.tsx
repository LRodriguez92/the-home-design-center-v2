'use client'

import ProjectGallery from '@/app/components/project-gallery'
import Image from 'next/image'
import { useTranslations } from '@/app/lib/translations'

const projects = [
  { id: 1, image: '/placeholder.svg?height=800&width=1200', tags: ['Cocina', 'Moderno'] },
  { id: 2, image: '/placeholder.svg?height=800&width=1200', tags: ['Baño', 'Lujo'] },
  { id: 3, image: '/placeholder.svg?height=800&width=1200', tags: ['Sala', 'Acogedor'] },
  { id: 4, image: '/placeholder.svg?height=800&width=1200', tags: ['Dormitorio', 'Elegante'] },
  { id: 5, image: '/placeholder.svg?height=800&width=1200', tags: ['Casa Completa', 'Concepto Abierto'] },
  { id: 6, image: '/placeholder.svg?height=800&width=1200', tags: ['Oficina', 'Minimalista'] },
  { id: 7, image: '/placeholder.svg?height=800&width=1200', tags: ['Exterior', 'Cocina'] },
  { id: 8, image: '/placeholder.svg?height=800&width=1200', tags: ['Comedor', 'Contemporáneo'] },
]

const allTags = Array.from(new Set(projects.flatMap(project => project.tags))).sort()

export default function SpanishProjectsPage() {
  const { t } = useTranslations('es')

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-[#F5F5F5]">
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh]">
        <Image
          src="/images/heroes/projects.jpg"
          alt="Muestra de nuestros mejores proyectos"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
          className="brightness-50"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F5F5F5] mb-4">
            {t('projects.title')}
          </h1>
          <p className="text-xl md:text-2xl text-[#B0B0B0] max-w-3xl">
            {t('projects.subtitle')}
          </p>
        </div>
      </div>

      {/* Projects Gallery Section */}
      <div className="container mx-auto px-4 py-16">
        <ProjectGallery projects={projects} allTags={allTags} lang="es" />
      </div>
    </div>
  )
} 