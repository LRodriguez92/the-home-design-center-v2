import ProjectGallery from '../components/project-gallery'
import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Our Projects | Home Design Center',
  description: 'Explore our portfolio of stunning home design and remodeling projects.',
}

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

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-[#0F0F0F] text-[#F5F5F5]">
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh]">
        <Image
          src="/images/heroes/projects.jpg"
          alt="Showcase of our best projects"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
          className="brightness-50"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F5F5F5] mb-4">
            Our Projects
          </h1>
          <p className="text-xl md:text-2xl text-[#B0B0B0] max-w-3xl">
            Discover the transformations we&apos;ve created for our clients, from stunning kitchens to luxurious bathrooms and beyond.
          </p>
        </div>
      </div>

      {/* Projects Gallery Section */}
      <div className="container mx-auto px-4 py-16">
        <ProjectGallery projects={projects} allTags={allTags} />
      </div>
    </div>
  )
}

