/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState, useEffect } from 'react'
import { Badge } from '@/app/components/ui/badge'
import { projectTags, type CloudinaryResource } from '@/app/lib/cloudinary'
import { useTheme } from './theme-provider'
import { motion, AnimatePresence } from 'framer-motion'
import { Dialog, DialogContent, DialogTitle } from '@/app/components/ui/dialog'
import { X } from 'lucide-react'
import { OptimizedImage } from './optimized-image'

interface ProjectGalleryProps {
  initialTag?: string;
  projects?: { id: number; image: string; tags: string[] }[];
  allTags?: string[];
  lang?: string;
}

const spanishTranslations: Record<string, string> = {
  'Flooring': 'Piso',
  'Walls': 'Paredes',
  'LED Lighting': 'Iluminación LED',
  'Painting': 'Pintura',
  'Cabinets': 'Gabinetes',
  'Kitchen': 'Cocina',
  'Bathroom': 'Baño',
  'Living Room': 'Sala de Estar',
  'Bedroom': 'Dormitorio',
  'Whole House': 'Casa Completa',
  'Office': 'Oficina',
  'Outdoor': 'Exterior',
  'Dining Room': 'Comedor'
}

export default function ProjectGallery({ initialTag, projects = [], allTags = [], lang = 'en' }: ProjectGalleryProps) {
  const theme = useTheme()
  const [selectedTag, setSelectedTag] = useState<string | undefined>(initialTag)
  const [images, setImages] = useState<CloudinaryResource[]>([])
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [selectedImage, setSelectedImage] = useState<CloudinaryResource | null>(null)

  const translateTag = (tag: string) => {
    return lang === 'es' ? spanishTranslations[tag] || tag : tag
  }

  useEffect(() => {
    const loadImages = async () => {
      try {
        // First try to fetch filtered images if a tag is selected
        if (selectedTag) {
          const filteredResponse = await fetch(`/api/cloudinary/projects?tag=${encodeURIComponent(selectedTag)}`, {
            cache: 'no-store'
          })
          if (!filteredResponse.ok) {
            throw new Error('Failed to fetch images')
          }
          const filteredData = await filteredResponse.json()
          
          // If no images found with the selected tag, fetch all images
          if (filteredData.images.length === 0) {
            const allResponse = await fetch('/api/cloudinary/projects', {
              cache: 'no-store'
            })
            if (!allResponse.ok) {
              throw new Error('Failed to fetch images')
            }
            const allData = await allResponse.json()
            setImages(allData.images)
            // Reset the selected tag since we're showing all images
            setSelectedTag(undefined)
          } else {
            setImages(filteredData.images)
          }
        } else {
          // If no tag selected, fetch all images
          const response = await fetch('/api/cloudinary/projects', {
            cache: 'no-store'
          })
          if (!response.ok) {
            throw new Error('Failed to fetch images')
          }
          const data = await response.json()
          setImages(data.images)
        }
      } catch (error) {
        console.error('Error loading images:', error)
      } finally {
        setIsInitialLoad(false)
      }
    }

    loadImages()
  }, [selectedTag])

  return (
    <div className="space-y-8">
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        <button
          onClick={() => setSelectedTag(undefined)}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-300 ${
            !selectedTag
              ? `bg-[${theme.colors.primary}] text-[${theme.colors.onPrimary}]`
              : `border border-[${theme.colors.primary}] text-[${theme.colors.primary}] hover:bg-[${theme.colors.primary}] hover:text-[${theme.colors.onPrimary}]`
          }`}
        >
          {lang === 'es' ? 'Todos' : 'All'}
        </button>
        {projectTags.map(tag => {
          const translatedTag = translateTag(tag);

          return (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-300 ${
                selectedTag === tag
                  ? `bg-[${theme.colors.primary}] text-[${theme.colors.onPrimary}]`
                  : `border border-[${theme.colors.primary}] text-[${theme.colors.primary}] hover:bg-[${theme.colors.primary}] hover:text-[${theme.colors.onPrimary}]`
              }`}
            >
              {translatedTag}
            </button>
          );
        })}
      </div>

      {isInitialLoad ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4"
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
                className="group relative h-64 md:h-72 overflow-hidden rounded-lg bg-gray-900 cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <OptimizedImage
                  src={image.secure_url}
                  alt="Project photo"
                  width={800}
                  height={800}
                  className="w-full h-full"
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex flex-wrap gap-1">
                      {image.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {translateTag(tag)}
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

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] w-auto h-auto bg-transparent border-none p-0">
          <DialogTitle className="sr-only">Project Image</DialogTitle>
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-6 w-6 text-[#C4A36C]" />
            <span className="sr-only">Close</span>
          </button>
          {selectedImage && (
            <div className="relative w-full h-full">
              <OptimizedImage
                src={selectedImage.secure_url}
                alt="Project photo"
                width={1920}
                height={1080}
                className="object-contain w-auto h-auto max-w-[95vw] max-h-[95vh]"
                style={{ objectFit: 'contain' }}
                quality={90}
                blur={false}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

