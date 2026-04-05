// src/components/GalleryClient.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { urlFor } from '@/sanity/client'; 

export default function GalleryClient({ images, albumTitles }: { images: any[], albumTitles: string[] }) {
  const [activeTitle, setActiveTitle] = useState('All');
  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  
  // NEW: State to track if the popped-up image is still loading
  const [isImageLoading, setIsImageLoading] = useState(true);

  const filteredImages = activeTitle === 'All' 
    ? images 
    : images.filter((img) => img.title === activeTitle);

  return (
    <div className="w-full font-sans pt-16 md:pt-20 pb-12 px-4 md:px-8">
      
      {/* FILTER BUTTONS */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {albumTitles.map((title) => (
          <button
            key={title}
            onClick={() => setActiveTitle(title)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeTitle === title 
                ? 'bg-blue-900 text-white shadow-md transform scale-105' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
            }`}
          >
            {title}
          </button>
        ))}
      </div>

      {/* IMAGE GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
        {filteredImages.map((image, index) => (
          <div 
            key={index} 
            className="relative h-64 w-full cursor-pointer group overflow-hidden rounded-xl shadow-sm hover:shadow-xl transition-all duration-300"
            onClick={() => {
              // Open the modal AND reset the loading state to true for the new image
              setSelectedImage(image);
              setIsImageLoading(true);
            }}
          >
            <Image
              src={urlFor(image.source).width(800).auto('format').url()}
              alt={`${image.title} photo ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN88B8AAsUB4ZtvxCcAAAAASUVORK5CYII=" 
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </div>
        ))}
      </div>

      {filteredImages.length === 0 && (
        <div className="text-center py-12 text-gray-500">No photos found.</div>
      )}

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-8 cursor-zoom-out transition-opacity duration-300"
          onClick={() => setSelectedImage(null)} 
        >
          {/* Close Button */}
          <button 
            className="fixed top-5 right-5 text-white/70 hover:text-white text-5xl font-light p-2 z-[60] transition-colors"
            onClick={() => setSelectedImage(null)}
            aria-label="Close fullscreen image"
          >
            &times;
          </button>

          {/* NEW: Loading Spinner (only shows when isImageLoading is true) */}
          {isImageLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none">
              <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-white/80"></div>
            </div>
          )}

          {/* High-Resolution Image */}
          <img
            src={urlFor(selectedImage.source).auto('format').url()}
            alt="Gallery fullscreen"
            // NEW: Tell React the image is done loading
            onLoad={() => setIsImageLoading(false)}
            // NEW: Keep the image invisible (opacity-0) until it loads, then fade it in smoothly (opacity-100)
            className={`max-w-full max-h-[75vh] md:max-h-[85vh] object-contain cursor-default rounded-md shadow-2xl transition-opacity duration-500 ${
              isImageLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onClick={(e) => e.stopPropagation()} 
          />
          
          {/* The title text has been entirely removed! */}
        </div>
      )}

    </div>
  );
}