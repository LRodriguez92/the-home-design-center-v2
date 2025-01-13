import cloudinary from '@/app/lib/cloudinary';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { publicId, tags } = await request.json();

    const result = await cloudinary.uploader.replace_tag(
      tags,
      [publicId],
      { resource_type: 'image' }
    );

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('Error updating tags:', error);
    return NextResponse.json(
      { error: 'Failed to update tags' },
      { status: 500 }
    );
  }
} 