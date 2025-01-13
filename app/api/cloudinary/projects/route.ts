import cloudinary from '@/app/lib/cloudinary.server';
import { NextResponse } from 'next/server';
import type { CloudinaryImage } from '@/app/lib/cloudinary';

interface CloudinaryResource {
  public_id: string;
  secure_url: string;
  tags: string[];
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get('tag');

  try {
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

    const images: CloudinaryImage[] = result.resources.map((resource: CloudinaryResource) => ({
      public_id: resource.public_id,
      secure_url: resource.secure_url,
      tags: resource.tags.filter(tag => tag !== 'hdc_project')
    }));

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json(
      { error: 'Failed to fetch images' },
      { status: 500 }
    );
  }
} 