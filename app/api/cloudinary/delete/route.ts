import cloudinary from '@/app/lib/cloudinary';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { publicId } = await request.json();

    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: 'image'
    });

    if (result.result !== 'ok') {
      throw new Error('Failed to delete image');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    );
  }
} 