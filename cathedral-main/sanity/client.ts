// src/sanity/client.ts
import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  // Tell Next.js to grab the ID from your .env.local file
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, 
  
  // It's a good idea to do the same for the dataset, which is usually 'production'
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production', 
  
  apiVersion: '2024-04-02', 
  useCdn: false, 
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}