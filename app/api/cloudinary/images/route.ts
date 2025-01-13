import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

interface CloudinarySearchResult {
  resources: Array<{
    public_id: string;
    secure_url: string;
    tags: string[];
    created_at: string;
  }>;
  total_count: number;
}

export async function GET() {
  try {
    const result = await cloudinary.search
      .expression('resource_type:image AND tags=hdc_project')
      .sort_by('created_at', 'desc')
      .with_field('tags')
      .max_results(100)
      .execute() as CloudinarySearchResult;

    if (!result?.resources) {
      throw new Error('No resources found in Cloudinary response');
    }

    return NextResponse.json({
      images: result.resources.map(resource => ({
        public_id: resource.public_id,
        secure_url: resource.secure_url,
        tags: resource.tags?.filter(tag => tag !== 'hdc_project') || [],
        created_at: resource.created_at
      }))
    });
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch images',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
} 