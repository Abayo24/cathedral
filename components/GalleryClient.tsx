'use client';

import { useState } from 'react';
import Image from 'next/image';
import { urlFor } from '@/sanity/client';
import { SectionHeader } from './ui/SectionHeader';

export default function GalleryClient({
    images,
    albumTitles,
}: {
    images: any[];
    albumTitles: string[];
}) {
    // NEW: Track which album the user has clicked into. null = looking at all albums.
    const [activeAlbum, setActiveAlbum] = useState<string | null>(null);
    
    const [selectedImage, setSelectedImage] = useState<any | null>(null);
    const [isImageLoading, setIsImageLoading] = useState(true);

    const actualAlbums = albumTitles.filter(title => title !== 'All');

    return (
        <div className='w-full font-sans pt-16 md:pt-20 pb-12 px-4 md:px-8 max-w-7xl mx-auto'>
            {/* Header changes based on whether we are looking at albums or inside one */}
            <SectionHeader
                label={activeAlbum ? 'Album' : 'Visual Journey'}
                title={activeAlbum ? activeAlbum : 'Life at the Cathedral'}
                subtitle={
                    activeAlbum 
                        ? 'Browse photos from this collection.' 
                        : 'A look back at our recent services, celebrations, and the moments that bring us together.'
                }
                centered
            />

            {images.length === 0 ? (
                <div className='text-center py-12 text-gray-500'>
                    No photos found.
                </div>
            ) : (
                <>
                    {/* VIEW 1: ALBUM COVERS */}
                    {!activeAlbum && (
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8'>
                            {actualAlbums.map((albumTitle) => {
                                // Find all images for this album, use the first one as the cover
                                const albumImages = images.filter((img) => img.title === albumTitle);
                                if (albumImages.length === 0) return null;
                                const coverImage = albumImages[0];

                                return (
                                    <div 
                                        key={albumTitle} 
                                        className='group cursor-pointer flex flex-col gap-3'
                                        onClick={() => setActiveAlbum(albumTitle)}
                                    >
                                        <div className='relative h-64 w-full overflow-hidden rounded-2xl shadow-md group-hover:shadow-xl transition-all duration-300'>
                                            <Image
                                                src={urlFor(coverImage.source).width(800).auto('format').url()}
                                                alt={`${albumTitle} cover`}
                                                fill
                                                sizes='(max-width: 768px) 100vw, 33vw'
                                                className='object-cover transition-transform duration-500 group-hover:scale-105'
                                                placeholder='blur'
                                                blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN88B8AAsUB4ZtvxCcAAAAASUVORK5CYII='
                                            />
                                            <div className='absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300' />
                                            
                                            {/* Photo Count Badge */}
                                            <div className='absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-sm'>
                                                {albumImages.length} {albumImages.length === 1 ? 'Photo' : 'Photos'}
                                            </div>
                                        </div>
                                        <h3 className='text-xl font-bold text-gray-900 px-1 group-hover:text-blue-700 transition-colors'>
                                            {albumTitle}
                                        </h3>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* VIEW 2: INSIDE A SPECIFIC ALBUM */}
                    {activeAlbum && (
                        <div className='mt-8'>
                            {/* Back Button */}
                            <button 
                                onClick={() => setActiveAlbum(null)}
                                className='mb-8 flex items-center text-blue-900 font-semibold hover:text-blue-700 transition-colors group'
                            >
                                <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back to all albums
                            </button>

                            {/* Grid of photos for the selected album */}
                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                                {images
                                    .filter((img) => img.title === activeAlbum)
                                    .map((image, index) => (
                                    <div
                                        key={index}
                                        className='relative h-64 w-full cursor-pointer group overflow-hidden rounded-xl shadow-sm hover:shadow-xl transition-all duration-300'
                                        onClick={() => {
                                            setSelectedImage(image);
                                            setIsImageLoading(true);
                                        }}
                                    >
                                        <Image
                                            src={urlFor(image.source).width(800).auto('format').url()}
                                            alt={`${image.title} photo ${index + 1}`}
                                            fill
                                            sizes='(max-width: 768px) 100vw, 33vw'
                                            className='object-cover transition-transform duration-500 group-hover:scale-110'
                                            placeholder='blur'
                                            blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN88B8AAsUB4ZtvxCcAAAAASUVORK5CYII='
                                        />
                                        <div className='absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300' />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            )}

            {/* FULLSCREEN LIGHTBOX MODAL */}
            {selectedImage && (
                <div
                    className='fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-8 cursor-zoom-out transition-opacity duration-300'
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className='fixed top-5 right-5 text-white/70 hover:text-white text-5xl font-light p-2 z-[60] transition-colors'
                        onClick={() => setSelectedImage(null)}
                        aria-label='Close fullscreen image'
                    >
                        &times;
                    </button>

                    {isImageLoading && (
                        <div className='absolute inset-0 flex items-center justify-center z-40 pointer-events-none'>
                            <div className='animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-white/80'></div>
                        </div>
                    )}

                    <img
                        src={urlFor(selectedImage.source).auto('format').url()}
                        alt='Gallery fullscreen'
                        onLoad={() => setIsImageLoading(false)}
                        className={`max-w-full max-h-[75vh] md:max-h-[85vh] object-contain cursor-default rounded-md shadow-2xl transition-opacity duration-500 ${
                            isImageLoading ? 'opacity-0' : 'opacity-100'
                        }`}
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </div>
    );
}