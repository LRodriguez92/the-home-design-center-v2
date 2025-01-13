'use client'

import { useState, useEffect } from 'react'
import { useTheme } from './theme-provider'
import { Button } from '@/app/components/ui/button'
import { Badge } from '@/app/components/ui/badge'
import { Checkbox } from '@/app/components/ui/checkbox'
import { Trash2, Pencil, X, Check } from 'lucide-react'
import Image from 'next/image'
import { Dialog, DialogContent } from '@/app/components/ui/dialog'

// Use the same tags as photo upload
const tags = [
  'Flooring',
  'Walls',
  'LED Lighting',
  'Painting',
  'Cabinets',
  'Kitchen',
  'Bathroom',
  'Living Room',
  'Bedroom',
  'Whole House',
  'Office',
  'Outdoor',
  'Dining Room'
]

interface CloudinaryImage {
  public_id: string
  secure_url: string
  tags: string[]
}

interface PhotoManagerProps {
  refreshTrigger: number
}

export default function PhotoManager({ refreshTrigger }: PhotoManagerProps) {
  const theme = useTheme()
  const [images, setImages] = useState<CloudinaryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingImage, setEditingImage] = useState<CloudinaryImage | null>(null)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showDeleteDialog, setShowDeleteDialog] = useState<CloudinaryImage | null>(null)

  // Fetch images
  useEffect(() => {
    fetchImages()
  }, [refreshTrigger])

  const fetchImages = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/cloudinary/images', {
        next: { revalidate: 3600 }, // Cache for 1 hour
        cache: 'no-store' // Don't cache during development for easier testing
      })
      if (!response.ok) {
        throw new Error('Failed to fetch images')
      }
      const data = await response.json()
      if (!data.images) {
        throw new Error('Invalid response format')
      }
      setImages(data.images.map((img: CloudinaryImage) => ({
        ...img,
        tags: img.tags.filter((tag: string) => tag !== 'hdc_project')
      })))
    } catch (error) {
      console.error('Error fetching images:', error)
      setError('Failed to load images')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (image: CloudinaryImage) => {
    setEditingImage(image)
    setSelectedTags(image.tags)
  }

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  const handleUpdateTags = async () => {
    if (!editingImage) return

    try {
      const response = await fetch('/api/cloudinary/update-tags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          publicId: editingImage.public_id,
          tags: ['hdc_project', ...selectedTags]
        })
      })

      if (!response.ok) {
        throw new Error('Failed to update tags')
      }

      // Update local state with the new tags
      setImages(prevImages => prevImages.map(img => 
        img.public_id === editingImage.public_id
          ? { ...img, tags: selectedTags.filter(tag => tag !== 'hdc_project') }
          : img
      ))
      setEditingImage(null)
    } catch (error) {
      console.error('Error updating tags:', error)
      setError('Failed to update tags')
    }
  }

  const handleDelete = async (image: CloudinaryImage) => {
    try {
      const response = await fetch('/api/cloudinary/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          publicId: image.public_id,
        }),
      })

      if (!response.ok) throw new Error('Failed to delete image')

      // Update local state
      setImages(prev => prev.filter(img => img.public_id !== image.public_id))
      setShowDeleteDialog(null)
    } catch (error) {
      setError('Failed to delete image')
      console.error('Delete error:', error)
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div className="space-y-6">
      <h2 className={`text-2xl font-semibold text-[${theme.colors.text}]`}>Manage Photos</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map(image => (
          <div 
            key={image.public_id} 
            className={`relative p-4 border-2 border-[${theme.colors.primary}] rounded-lg`}
          >
            <div className="relative h-48 mb-4">
              <Image
                src={image.secure_url}
                alt="Project photo"
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>

            {editingImage?.public_id === image.public_id ? (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <label key={tag} className="flex items-center space-x-2 cursor-pointer">
                      <Checkbox
                        checked={selectedTags.includes(tag)}
                        onCheckedChange={() => handleTagToggle(tag)}
                        className="border-2 border-[#C9A227] data-[state=checked]:bg-[#C9A227] data-[state=checked]:border-[#C9A227]"
                      />
                      <span className="text-xs text-[#F5F5F5]">{tag}</span>
                    </label>
                  ))}
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    onClick={() => setEditingImage(null)}
                    variant="outline"
                    size="sm"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={handleUpdateTags}
                    size="sm"
                  >
                    <Check className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-1">
                  {image.tags.map(tag => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    onClick={() => handleEdit(image)}
                    variant="outline"
                    size="sm"
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => setShowDeleteDialog(image)}
                    variant="destructive"
                    size="sm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {showDeleteDialog && (
        <Dialog open={!!showDeleteDialog} onOpenChange={() => setShowDeleteDialog(null)}>
          <DialogContent>
            <div className="p-4 space-y-4">
              <h3 className="text-lg font-semibold text-white">Confirm Deletion</h3>
              <p className="text-white">Are you sure you want to delete this image? This action cannot be undone.</p>
              <div className="flex justify-end space-x-2">
                <Button
                  onClick={() => setShowDeleteDialog(null)}
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => showDeleteDialog && handleDelete(showDeleteDialog)}
                  variant="destructive"
                >
                  Delete
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
} 