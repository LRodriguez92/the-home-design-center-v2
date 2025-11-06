'use client'

import { Suspense } from 'react'
import ProjectGallery from '@/app/components/project-gallery'
import { useTranslations } from '@/app/lib/translations'
import { OptimizedImage } from '@/app/components/optimized-image'

const projects = [
  { id: 1, image: '/placeholder.svg?height=800&width=1200', tags: ['Cocina', 'Moderno'] },
  { id: 2, image: '/placeholder.svg?height=800&width=1200', tags: ['Baño', 'Lujo'] },
  { id: 3, image: '/placeholder.svg?height=800&width=1200', tags: ['Sala de Estar', 'Acogedor'] },
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
      <section className="w-full h-[600px] md:h-[400px] relative border-b-4 border-[#C4A36C]">
        <div className="absolute inset-0">
          <div className="relative w-full h-full">
            <OptimizedImage
              src="/images/heroes/projects.webp"
              alt="Muestra de nuestros mejores proyectos"
              width={1920}
              height={1080}
              priority={true}
              quality={90}
              className="brightness-[.75]"
              style={{ objectFit: "cover" }}
              sizes="100vw"
            />
          </div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F5F5F5] mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            {t('projects.title')}
          </h1>
          <p className="text-xl md:text-2xl text-[#B0B0B0] max-w-3xl drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
            {t('projects.subtitle')}
          </p>
        </div>
      </section>

      {/* Projects Gallery Section */}
      <section className="w-full bg-[#0F0F0F]">
        <div className="container mx-auto px-4 py-6 md:py-16">
          <Suspense fallback={<div>Loading projects...</div>}>
            <ProjectGallery projects={projects} allTags={allTags} lang="es" />
          </Suspense>
        </div>
      </section>
    </div>
  )
} 