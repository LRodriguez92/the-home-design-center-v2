'use client'

import { useState, useCallback } from 'react'
import { useTheme } from './theme-provider'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'
import { Checkbox } from '@/app/components/ui/checkbox'
import { X, Upload } from 'lucide-react'
import Image from 'next/image'

const tags = ['Kitchen', 'Bathroom', 'Living Room', 'Bedroom', 'Whole House', 'Office', 'Outdoor', 'Dining Room']

interface SelectedPhoto {
  file: File
  preview: string
  tags: string[]
}

export default function PhotoUpload() {
  const theme = useTheme()
  const [selectedPhotos, setSelectedPhotos] = useState<SelectedPhoto[]>([])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newPhotos = Array.from(e.target.files).map(file => ({
        file,
        preview: URL.createObjectURL(file),
        tags: []
      }))
      setSelectedPhotos(prev => [...prev, ...newPhotos])
    }
  }

  const handleRemovePhoto = (index: number) => {
    setSelectedPhotos(prev => {
      const newPhotos = [...prev]
      URL.revokeObjectURL(newPhotos[index].preview)
      newPhotos.splice(index, 1)
      return newPhotos
    })
  }

  const handleTagChange = (photoIndex: number, tag: string) => {
    setSelectedPhotos(prev => {
      const newPhotos = [...prev]
      const photo = newPhotos[photoIndex]
      if (photo.tags.includes(tag)) {
        photo.tags = photo.tags.filter(t => t !== tag)
      } else {
        photo.tags.push(tag)
      }
      return newPhotos
    })
  }

  const handleUpload = useCallback(async () => {
    // Here you would typically upload the files to your server
    console.log('Uploading files:', selectedPhotos.map(photo => ({
      name: photo.file.name,
      tags: photo.tags
    })))

    // Reset form after upload
    setSelectedPhotos([])
  }, [selectedPhotos])

  return (
    <div className="space-y-6">
      <div>
        <h2 className={`text-2xl font-semibold mb-4 text-[${theme.colors.text}]`}>Upload New Photos</h2>
        <p className={`text-sm text-[${theme.colors.textMuted}]`}>
          Select multiple photos and add relevant tags for better organization
        </p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="photo-upload">Select Photos</Label>
          <Button
            asChild
            className={`w-full bg-[${theme.colors.primary}] text-[#0F0F0F] hover:bg-[${theme.colors.primary}]/90 font-medium h-auto py-2 px-4`}
          >
            <label>
              <Input
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                multiple
                className="hidden"
              />
              Choose Files
            </label>
          </Button>
        </div>
        {selectedPhotos.length > 0 && (
          <div className="space-y-4">
            <h3 className={`text-lg font-semibold text-[${theme.colors.text}]`}>Selected Photos</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {selectedPhotos.map((photo, index) => (
                <div key={index} className={`relative p-4 border-2 border-[${theme.colors.primary}] rounded-lg`}>
                  <div className="relative h-40 mb-4">
                    <Image
                      src={photo.preview}
                      alt={`Selected photo ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                    />
                    <button
                      onClick={() => handleRemovePhoto(index)}
                      className={`absolute top-2 right-2 p-1 bg-[${theme.colors.primary}] text-[${theme.colors.onPrimary}] rounded-full hover:bg-[${theme.colors.primary}]/90 transition-colors`}
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <div className="space-y-2">
                    <p className={`text-sm font-medium text-[${theme.colors.text}] truncate`}>{photo.file.name}</p>
                    <div className="flex flex-wrap gap-2">
                      {tags.map(tag => (
                        <label key={tag} className="flex items-center space-x-2 cursor-pointer">
                          <Checkbox
                            id={`${index}-${tag}`}
                            checked={photo.tags.includes(tag)}
                            onCheckedChange={() => handleTagChange(index, tag)}
                            className={`border-2 border-[${theme.colors.primary}] data-[state=checked]:bg-[${theme.colors.primary}] data-[state=checked]:border-[${theme.colors.primary}]`}
                          />
                          <span className={`text-xs text-[${theme.colors.text}]`}>{tag}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {selectedPhotos.length > 0 && (
          <Button
            onClick={handleUpload}
            className={`w-full bg-[${theme.colors.primary}] text-[#0F0F0F] hover:bg-[${theme.colors.primary}]/90 flex items-center justify-center font-medium`}
          >
            <Upload className="mr-2" size={20} />
            Upload {selectedPhotos.length} Photo{selectedPhotos.length > 1 ? 's' : ''}
          </Button>
        )}
      </div>
    </div>
  )
}

