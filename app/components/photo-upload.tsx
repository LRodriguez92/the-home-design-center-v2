'use client'

import { useState, useCallback } from 'react'
import { useTheme } from './theme-provider'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'
import { Checkbox } from '@/app/components/ui/checkbox'
import { X, Upload, Loader2 } from 'lucide-react'
import Image from 'next/image'

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

interface SelectedPhoto {
  file: File
  preview: string
  tags: string[]
}

interface PhotoUploadProps {
  refreshPhotos: () => void
}

export default function PhotoUpload({ refreshPhotos }: PhotoUploadProps) {
  const theme = useTheme()
  const [selectedPhotos, setSelectedPhotos] = useState<SelectedPhoto[]>([])
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [uploadedDetails, setUploadedDetails] = useState<{name: string, tags: string[]}[]>([])
  const [isUploading, setIsUploading] = useState(false)

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

  const handleTagChange = (photoIndex: number, tag: string, checked: boolean) => {
    setSelectedPhotos(prev => {
      const newPhotos = [...prev]
      const photo = newPhotos[photoIndex]
      if (checked) {
        photo.tags = [...photo.tags, tag]
      } else {
        photo.tags = photo.tags.filter(t => t !== tag)
      }
      return newPhotos
    })
  }

  const handleUpload = useCallback(async () => {
    setUploadError(null)
    setIsUploading(true)
    try {
      const timestamp = Math.round(new Date().getTime() / 1000);
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;

      const uploadPromises = selectedPhotos.map(async (photo) => {
        // Get signature for this specific photo with its tags
        const signatureResponse = await fetch('/api/cloudinary/signature', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            timestamp,
            uploadPreset,
            tags: ['hdc_project', ...photo.tags].join(','),
          }),
        });

        if (!signatureResponse.ok) {
          throw new Error('Failed to get upload signature');
        }

        const { signature, apiKey } = await signatureResponse.json();

        const formData = new FormData();
        formData.append('file', photo.file);
        formData.append('upload_preset', uploadPreset);
        formData.append('timestamp', timestamp.toString());
        formData.append('signature', signature);
        formData.append('api_key', apiKey);
        if (photo.tags.length > 0) {
          formData.append('tags', ['hdc_project', ...photo.tags].join(','));
        } else {
          formData.append('tags', 'hdc_project');
        }

        const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
          method: 'POST',
          body: formData
        });

        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error?.message || `Upload failed for ${photo.file.name}`);
        }

        return {
          name: photo.file.name,
          tags: photo.tags,
          url: data.secure_url
        };
      });

      const uploadedFiles = await Promise.all(uploadPromises);
      
      setUploadedDetails(uploadedFiles.map(file => ({
        name: file.name,
        tags: [...new Set(file.tags)].filter(tag => tag !== 'hdc_project')
      })));
      setUploadSuccess(true);
      setSelectedPhotos([]);

      // Wait for Cloudinary to process the uploads
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Force revalidation of the images API route
      await fetch('/api/cloudinary/images', { 
        method: 'HEAD',
        headers: { 'x-force-revalidate': '1' }
      });
      
      refreshPhotos();

      setTimeout(() => {
        setUploadSuccess(false);
        setUploadedDetails([]);
      }, 5000);
    } catch (error) {
      console.error('Upload error:', error);
      setUploadError(error instanceof Error ? error.message : 'Failed to upload photos. Please try again.');
      
      setTimeout(() => {
        setUploadError(null);
      }, 5000);
    } finally {
      setIsUploading(false)
    }
  }, [selectedPhotos, refreshPhotos]);

  return (
    <div className="space-y-6">
      {uploadSuccess && (
        <div className="bg-green-500/20 border border-green-500 text-green-500 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">Successfully uploaded {uploadedDetails.length} photo{uploadedDetails.length > 1 ? 's' : ''}!</h4>
          <div className="space-y-2">
            {uploadedDetails.map((file, index) => (
              <div key={index} className="text-sm">
                <span className="font-medium">{file.name}</span>
                {file.tags.length > 0 && (
                  <span className="text-green-400"> - Tags: {file.tags.join(', ')}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      {uploadError && (
        <div className="bg-red-500/20 border border-red-500 text-red-500 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">Upload Error</h4>
          <p className="text-sm">{uploadError}</p>
        </div>
      )}
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
                            onCheckedChange={(checked) => handleTagChange(index, tag, checked as boolean)}
                            className="border-2 border-[#C9A227] data-[state=checked]:bg-[#C9A227] data-[state=checked]:border-[#C9A227] cursor-pointer"
                          />
                          <span className="text-xs text-[#F5F5F5]">{tag}</span>
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
            disabled={isUploading}
            className={`w-full bg-[${theme.colors.primary}] text-[#0F0F0F] hover:bg-[${theme.colors.primary}]/90 flex items-center justify-center font-medium ${isUploading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2" size={20} />
                Upload {selectedPhotos.length} Photo{selectedPhotos.length > 1 ? 's' : ''}
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  )
}

