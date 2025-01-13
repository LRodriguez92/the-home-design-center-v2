import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

interface CloudinaryResource {
  public_id: string;
  secure_url: string;
  tags: string[];
  created_at: string;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tag = searchParams.get('tag');

    let expression = 'resource_type:image AND tags=hdc_project';
    if (tag) {
      expression += ` AND tags=${tag}`;
    }

    const result = await cloudinary.search
      .expression(expression)
      .sort_by('created_at', 'desc')
      .with_field('tags')
      .max_results(100)
      .execute();

    return NextResponse.json({
      images: result.resources.map((resource: CloudinaryResource) => ({
        public_id: resource.public_id,
        secure_url: resource.secure_url,
        tags: resource.tags?.filter((tag: string) => tag !== 'hdc_project') || [],
        created_at: resource.created_at
      }))
    });
  } catch (error) {
    console.error('Error fetching project images:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch project images',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
} 