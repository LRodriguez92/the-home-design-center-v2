'use client'

import { useState, useEffect } from 'react'
import { Badge } from '@/app/components/ui/badge'
import { projectTags } from '@/app/lib/cloudinary'
import type { CloudinaryResource } from '@/app/lib/cloudinary'
import Image from 'next/image'
import { Dialog, DialogContent, DialogTitle } from '@/app/components/ui/dialog'
import { Trash2, Pencil } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface PhotoManagerProps {
  refreshTrigger?: number
}

export default function PhotoManager({ refreshTrigger }: PhotoManagerProps) {
  const [images, setImages] = useState<CloudinaryResource[]>([])
  const [loading, setLoading] = useState(true)
  const [editingImage, setEditingImage] = useState<string | null>(null)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showDeleteDialog, setShowDeleteDialog] = useState<string | null>(null)

  const fetchImages = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/cloudinary/images', {
        cache: 'no-store'
      })
      if (!response.ok) {
        throw new Error('Failed to fetch images')
      }
      const data = await response.json()
      if (!data.images) {
        throw new Error('Invalid response format')
      }
      setImages(data.images.map((img: CloudinaryResource) => ({
        ...img,
        tags: img.tags.filter((tag: string) => tag !== 'hdc_project')
      })))
    } catch (err) {
      console.error('Error fetching images:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchImages()
  }, [refreshTrigger])

  const handleUpdateTags = async (publicId: string) => {
    try {
      const response = await fetch('/api/cloudinary/update-tags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          publicId,
          tags: ['hdc_project', ...selectedTags]
        })
      })

      if (!response.ok) {
        throw new Error('Failed to update tags')
      }

      // Update local state with the new tags
      setImages(prevImages => prevImages.map(img => 
        img.public_id === publicId
          ? { ...img, tags: selectedTags.filter(tag => tag !== 'hdc_project') }
          : img
      ))
      setEditingImage(null)
    } catch (err) {
      console.error('Error updating tags:', err)
    }
  }

  const handleDelete = async (publicId: string) => {
    try {
      const response = await fetch('/api/cloudinary/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          publicId,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to delete image')
      }

      // Update local state
      setImages(prev => prev.filter(img => img.public_id !== publicId))
      setShowDeleteDialog(null)
    } catch (err) {
      console.error('Error deleting image:', err)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Manage Photos</h2>
      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
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
                className="relative aspect-square rounded-lg overflow-hidden bg-gray-900"
              >
                <Image
                  src={image.secure_url}
                  alt="Uploaded photo"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-100">
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      onClick={() => {
                        setEditingImage(image.public_id)
                        setSelectedTags(image.tags)
                      }}
                      className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      <Pencil className="w-4 h-4 text-white" />
                    </button>
                    <button
                      onClick={() => setShowDeleteDialog(image.public_id)}
                      className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-white" />
                    </button>
                  </div>
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="flex flex-wrap gap-1">
                      {image.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {editingImage === image.public_id && (
                  <Dialog open={true} onOpenChange={() => setEditingImage(null)}>
                    <DialogContent className="bg-black text-white">
                      <DialogTitle>Edit Tags</DialogTitle>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
                        {projectTags.map(tag => (
                          <label key={tag} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={selectedTags.includes(tag)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedTags(prev => [...prev, tag])
                                } else {
                                  setSelectedTags(prev => prev.filter(t => t !== tag))
                                }
                              }}
                              className="rounded border-[#C9A227]"
                            />
                            <span>{tag}</span>
                          </label>
                        ))}
                      </div>
                      <div className="flex justify-end gap-2 mt-4">
                        <button
                          onClick={() => setEditingImage(null)}
                          className="px-4 py-2 rounded-md border border-[#C9A227] text-[#C9A227] hover:bg-[#C9A227] hover:text-white transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleUpdateTags(image.public_id)}
                          className="px-4 py-2 rounded-md bg-[#C9A227] text-white hover:bg-opacity-80 transition-colors"
                        >
                          Save Changes
                        </button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      <Dialog open={!!showDeleteDialog} onOpenChange={() => setShowDeleteDialog(null)}>
        <DialogContent className="bg-black text-white">
          <DialogTitle>Confirm Deletion</DialogTitle>
          <p className="text-white">Are you sure you want to delete this image? This action cannot be undone.</p>
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => setShowDeleteDialog(null)}
              className="px-4 py-2 rounded-md border border-[#C9A227] text-[#C9A227] hover:bg-[#C9A227] hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => showDeleteDialog && handleDelete(showDeleteDialog)}
              className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 