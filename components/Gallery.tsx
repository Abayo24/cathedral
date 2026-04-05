// src/components/Gallery.tsx
import { client } from '@/sanity/client'; 
import GalleryClient from './GalleryClient';

export const revalidate = 0; 

export async function Gallery() {
  const query = `*[_type == "galleryItem"]{
    _id,
    title,
    images
  }`;

  // Force Next.js to bypass cache so new albums show up instantly
  const albums = await client.fetch(query, {}, { cache: 'no-store' });

  if (!albums || albums.length === 0) {
    return <div className="text-center py-12">No albums found.</div>;
  }

  const allImages: any[] = [];
  // Start our list of buttons with 'All'
  const albumTitles = new Set(['All']);

  albums.forEach((album: any) => {
    // 1. Add the Album Title to our button list automatically
    if (album.title) {
      albumTitles.add(album.title);
    }

    // 2. Attach the title to every image inside that album so we can filter them
    if (album.images && album.images.length > 0) {
      album.images.forEach((img: any) => {
        allImages.push({
          source: img, 
          title: album.title || 'Untitled', // We use title here now!
        });
      });
    }
  });

  // Pass the images and the automatically generated titles to the Client
  return <GalleryClient images={allImages} albumTitles={Array.from(albumTitles)} />;
}