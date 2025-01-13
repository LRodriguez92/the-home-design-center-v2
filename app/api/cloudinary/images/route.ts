import cloudinary from '@/app/lib/cloudinary';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic'; // Opt out of static generation

export async function GET(request: Request) {
  // Check if this is a revalidation request
  if (request.headers.get('x-force-revalidate')) {
    revalidatePath('/api/cloudinary/images');
    return new NextResponse(null, { status: 200 });
  }

  try {
    const result = await cloudinary.search
      .expression('resource_type:image AND tags=hdc_project')
      .sort_by('created_at', 'desc')
      .with_field('tags')
      .max_results(100)
      .execute();

    return NextResponse.json({ images: result.resources }, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
      }
    });
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json(
      { error: 'Failed to fetch images' },
      { status: 500 }
    );
  }
} 