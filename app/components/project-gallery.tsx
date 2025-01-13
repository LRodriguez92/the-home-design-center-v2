'use client'

import { useState, useEffect } from 'react'
import { Badge } from '@/app/components/ui/badge'
import { projectTags, type CloudinaryImage } from '@/app/lib/cloudinary'
import Image from 'next/image'
import { useTheme } from './theme-provider'
import { motion, AnimatePresence } from 'framer-motion'

interface ProjectGalleryProps {
  initialTag?: string
}

export default function ProjectGallery({ initialTag }: ProjectGalleryProps) {
  const theme = useTheme()
  const [selectedTag, setSelectedTag] = useState<string | undefined>(initialTag)
  const [images, setImages] = useState<CloudinaryImage[]>([])
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  useEffect(() => {
    const loadImages = async () => {
      try {
        const url = selectedTag 
          ? `/api/cloudinary/projects?tag=${encodeURIComponent(selectedTag)}`
          : '/api/cloudinary/projects'
        
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error('Failed to fetch images')
        }
        const data = await response.json()
        setImages(data.images)
      } catch (error) {
        console.error('Error loading images:', error)
      } finally {
        setIsInitialLoad(false)
      }
    }

    loadImages()
  }, [selectedTag])

  return (
    <div className="space-y-6">
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        <button
          onClick={() => setSelectedTag(undefined)}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-300 ${
            !selectedTag
              ? `bg-[${theme.colors.primary}] text-[${theme.colors.onPrimary}]`
              : `border border-[${theme.colors.primary}] text-[${theme.colors.primary}] hover:bg-[${theme.colors.primary}] hover:text-[${theme.colors.onPrimary}]`
          }`}
        >
          All
        </button>
        {projectTags.map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-300 ${
              selectedTag === tag
                ? `bg-[${theme.colors.primary}] text-[${theme.colors.onPrimary}]`
                : `border border-[${theme.colors.primary}] text-[${theme.colors.primary}] hover:bg-[${theme.colors.primary}] hover:text-[${theme.colors.onPrimary}]`
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {isInitialLoad ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
        >
          <AnimatePresence>
            {images.map((image) => (
              <motion.div 
                key={image.public_id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative aspect-square overflow-hidden rounded-lg bg-gray-900"
              >
                <Image
                  src={image.secure_url}
                  alt="Project photo"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex flex-wrap gap-1">
                      {image.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  )
}

