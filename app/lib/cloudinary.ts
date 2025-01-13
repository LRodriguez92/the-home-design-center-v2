import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export default cloudinary;

export const getProjectImages = async (tag?: string) => {
  try {
    let expression = 'resource_type:image';
    if (tag) {
      expression += ` AND tags=${tag}`;
    }

    const result = await cloudinary.search
      .expression(expression)
      .sort_by('created_at', 'desc')
      .with_field('tags')
      .max_results(100)
      .execute();
    
    return result.resources;
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
}; 