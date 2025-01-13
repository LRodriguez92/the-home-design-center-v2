import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

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
    return NextResponse.json({ 
      error: 'Failed to update tags',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
} 