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
    const { publicId } = await request.json();

    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: 'image'
    });

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json({ 
      error: 'Failed to delete image',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
} 