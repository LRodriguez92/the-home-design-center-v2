// Define available tags
export const projectTags = [
  'Flooring',
  'Walls',
  'LED Lighting',
  'Painting',
  'Cabinets',
  'Kitchen',
  'Bathroom',
  'Living Room',
  'Bedroom',
  'Whole House',
  'Office',
  'Outdoor',
  'Dining Room',
  'Counter Tops',
  'Backsplash',
  'Laundry',
  'Efficiency Units',
  '3D Design'
] as const

export type ProjectTag = typeof projectTags[number]

export interface CloudinaryResource {
  public_id: string
  secure_url: string
  tags: string[]
  created_at: string
} 