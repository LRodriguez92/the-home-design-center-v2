'use client';

import { CldUploadWidget } from 'next-cloudinary';
import type { CloudinaryUploadWidgetResults } from 'next-cloudinary';
import { useState } from 'react';
import { Button } from './ui/button';

interface CloudinaryResponse {
  public_id: string;
  secure_url: string;
  format: string;
  width: number;
  height: number;
  tags: string[];
}

interface CloudinaryUploadProps {
  onUploadSuccess?: (result: CloudinaryResponse) => void;
  tags?: string[];
}

export default function CloudinaryUpload({ onUploadSuccess, tags = [] }: CloudinaryUploadProps) {
  const [uploading, setUploading] = useState(false);

  return (
    <CldUploadWidget
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
      options={{
        maxFiles: 10,
        tags: tags,
        sources: ['local', 'url', 'camera'],
        styles: {
          palette: {
            window: '#FFFFFF',
            windowBorder: '#90A0B3',
            tabIcon: '#0078FF',
            menuIcons: '#5A616A',
            textDark: '#000000',
            textLight: '#FFFFFF',
            link: '#0078FF',
            action: '#FF620C',
            inactiveTabIcon: '#0E2F5A',
            error: '#F44235',
            inProgress: '#0078FF',
            complete: '#20B832',
            sourceBg: '#E4EBF1'
          }
        }
      }}
      onUpload={(results: CloudinaryUploadWidgetResults) => {
        setUploading(false);
        if (results.event === 'success' && onUploadSuccess) {
          onUploadSuccess(results.info as CloudinaryResponse);
        }
      }}
      onOpen={() => setUploading(true)}
    >
      {({ open }) => (
        <Button 
          onClick={() => open()} 
          disabled={uploading}
          className="w-full"
        >
          {uploading ? 'Uploading...' : 'Upload Images'}
        </Button>
      )}
    </CldUploadWidget>
  );
} 