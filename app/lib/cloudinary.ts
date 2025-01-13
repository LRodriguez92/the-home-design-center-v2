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
  'Dining Room'
] as const;

export type ProjectTag = typeof projectTags[number];

export interface CloudinaryImage {
  public_id: string;
  secure_url: string;
  tags: string[];
} 