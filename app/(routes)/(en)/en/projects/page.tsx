'use client'

import ProjectGallery from '@/app/components/project-gallery'
import { useTranslations } from '@/app/lib/translations'
import { OptimizedImage } from '@/app/components/optimized-image'

const projects = [
  { id: 1, image: '/placeholder.svg?height=800&width=1200', tags: ['Kitchen', 'Modern'] },
  { id: 2, image: '/placeholder.svg?height=800&width=1200', tags: ['Bathroom', 'Luxury'] },
  { id: 3, image: '/placeholder.svg?height=800&width=1200', tags: ['Living Room', 'Cozy'] },
  { id: 4, image: '/placeholder.svg?height=800&width=1200', tags: ['Bedroom', 'Elegant'] },
  { id: 5, image: '/placeholder.svg?height=800&width=1200', tags: ['Whole House', 'Open Concept'] },
  { id: 6, image: '/placeholder.svg?height=800&width=1200', tags: ['Office', 'Minimalist'] },
  { id: 7, image: '/placeholder.svg?height=800&width=1200', tags: ['Outdoor', 'Kitchen'] },
  { id: 8, image: '/placeholder.svg?height=800&width=1200', tags: ['Dining Room', 'Contemporary'] },
]

const allTags = Array.from(new Set(projects.flatMap(project => project.tags))).sort()

export default function EnglishProjectsPage() {
  const { t } = useTranslations('en')

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-[#F5F5F5]">
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh]">
        <OptimizedImage
          src="/images/heroes/projects.jpg"
          alt="Showcase of our best projects"
          width={1920}
          height={1080}
          priority={true}
          quality={90}
          className="brightness-50"
          objectFit="cover"
          sizes="100vw"
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
        <ProjectGallery projects={projects} allTags={allTags} lang="en" />
      </div>
    </div>
  )
} 