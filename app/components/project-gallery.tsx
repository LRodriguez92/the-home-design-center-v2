'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTheme } from './theme-provider'
import { Dialog, DialogContent } from '@/app/components/ui/dialog'
import { Badge } from '@/app/components/ui/badge'

interface Project {
  id: number
  image: string
  tags: string[]
}

interface ProjectGalleryProps {
  projects: Project[]
  allTags: string[]
}

export default function ProjectGallery({ projects, allTags }: ProjectGalleryProps) {
  const theme = useTheme()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  const filteredProjects = selectedTags.length > 0
  ? projects.filter(project => project.tags.some(tag => selectedTags.includes(tag)))
  : projects

  return (
    <>
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-300 ${
              selectedTags.includes(tag)
                ? `bg-[${theme.colors.primary}] text-[${theme.colors.onPrimary}]`
                : `border border-[${theme.colors.primary}] text-[${theme.colors.primary}] hover:bg-[${theme.colors.primary}] hover:text-[${theme.colors.onPrimary}]`
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredProjects.map((project, index) => (
          <div
            key={project.id}
            className={`relative overflow-hidden rounded-lg cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 ${
              index % 7 === 0 || index % 7 === 6 ? 'sm:col-span-2 lg:col-span-4' : ''
            }`}
            onClick={() => setSelectedProject(project)}
          >
            <Image
              src={project.image}
              alt={`Project ${project.id}`}
              width={1200}
              height={800}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="text-white text-center">
                {project.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="m-1">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-4xl w-full bg-[#1C1F33] border-[#C9A227] p-0">
          {selectedProject && (
            <div className="relative aspect-video">
              <Image
                src={selectedProject.image}
                alt={`Project ${selectedProject.id}`}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

