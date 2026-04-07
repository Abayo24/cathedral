'use client';

import { useState, useEffect } from 'react';
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
	const [activeAlbum, setActiveAlbum] = useState<string | null>(null);
	const [selectedImage, setSelectedImage] = useState<any | null>(null);
	const [isImageLoading, setIsImageLoading] = useState(true);

	const [randomCovers, setRandomCovers] = useState<Record<string, number>>(
		{},
	);

	const actualAlbums = albumTitles.filter((title) => title !== 'All');

	useEffect(() => {
		const indices: Record<string, number> = {};
		actualAlbums.forEach((albumTitle) => {
			const albumImages = images.filter(
				(img) => img.title === albumTitle,
			);
			if (albumImages.length > 0) {
				indices[albumTitle] = Math.floor(
					Math.random() * albumImages.length,
				);
			}
		});
		setRandomCovers(indices);
	}, [albumTitles, images]);

	const getAlbumLayoutClasses = (index: number) => {
		if (index === 0) {
			return 'md:col-span-1 md:row-span-2';
		}
		return 'md:col-span-1 md:row-span-1';
	};

	const getPhotoBentoClasses = (index: number) => {
		const pattern = index % 6;
		switch (pattern) {
			case 0:
				return 'md:col-span-2 md:row-span-2';
			case 1:
				return 'md:col-span-1 md:row-span-1';
			case 2:
				return 'md:col-span-1 md:row-span-1';
			case 3:
				return 'md:col-span-2 md:row-span-1';
			case 4:
				return 'md:col-span-1 md:row-span-2';
			case 5:
				return 'md:col-span-1 md:row-span-1';
			default:
				return 'md:col-span-1 md:row-span-1';
		}
	};

	return (
		<div className='w-full bg-ivory'>
			<div className='pt-16 md:pt-20 pb-12 px-4 md:px-8 max-w-7xl mx-auto'>
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
						{/* VIEW 1: 3-ALBUM LAYOUT */}
						{!activeAlbum && (
							<div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[300px] mt-8'>
								{actualAlbums.map((albumTitle, index) => {
									const albumImages = images.filter(
										(img) => img.title === albumTitle,
									);
									if (albumImages.length === 0) return null;

									const randomImageIndex =
										randomCovers[albumTitle] || 0;
									const coverImage =
										albumImages[randomImageIndex];

									return (
										<div
											key={albumTitle}
											className={`group cursor-pointer relative overflow-hidden rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 ${getAlbumLayoutClasses(index)}`}
											onClick={() =>
												setActiveAlbum(albumTitle)
											}
										>
											<Image
												src={urlFor(coverImage.source)
													.width(1200)
													.auto('format')
													.url()}
												alt={`${albumTitle} cover`}
												fill
												sizes='(max-width: 768px) 100vw, 50vw'
												className='object-cover transition-transform duration-700 group-hover:scale-105'
												placeholder='blur'
												blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN88B8AAsUB4ZtvxCcAAAAASUVORK5CYII='
											/>

											<div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300' />

											<div className='absolute bottom-0 left-0 w-full p-6 md:p-8 flex flex-col justify-end'>
												<h3 className='text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors'>
													{albumTitle}
												</h3>
												<span className='text-white/80 text-sm md:text-base font-medium inline-block bg-black/40 backdrop-blur-md px-3 py-1 rounded-full w-max'>
													{albumImages.length}{' '}
													{albumImages.length === 1
														? 'Photo'
														: 'Photos'}
												</span>
											</div>
										</div>
									);
								})}
							</div>
						)}

						{/* VIEW 2: INSIDE A SPECIFIC ALBUM */}
						{activeAlbum && (
							// NEW: Added pb-24 so the floating button doesn't hide the bottom row of photos
							<div className='mt-8 relative pb-24'>
								{/* Grid of photos for the selected album */}
								<div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[250px] grid-flow-row-dense'>
									{images
										.filter(
											(img) => img.title === activeAlbum,
										)
										.map((image, index) => (
											<div
												key={index}
												className={`relative cursor-pointer group overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 ${getPhotoBentoClasses(index)}`}
												onClick={() => {
													setSelectedImage(image);
													setIsImageLoading(true);
												}}
											>
												<Image
													src={urlFor(image.source)
														.width(1200)
														.auto('format')
														.url()}
													alt={`${image.title} photo ${index + 1}`}
													fill
													sizes='(max-width: 768px) 100vw, 50vw'
													className='object-cover transition-transform duration-500 group-hover:scale-110'
													placeholder='blur'
													blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN88B8AAsUB4ZtvxCcAAAAASUVORK5CYII='
												/>
												<div className='absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300' />
											</div>
										))}
								</div>

								{/* NEW: Truly Fixed Floating Back Button */}
								<div className='fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[45]'>
									<button
										onClick={() => setActiveAlbum(null)}
										className='flex items-center bg-white/95 backdrop-blur-md shadow-2xl border border-gray-200 text-blue-900 px-8 py-3.5 rounded-full font-bold hover:bg-blue-50 hover:text-blue-700 hover:scale-105 active:scale-95 transition-all duration-300 group'
									>
										<svg
											className='w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'
											xmlns='http://www.w3.org/2000/svg'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M10 19l-7-7m0 0l7-7m-7 7h18'
											/>
										</svg>
										Back to Albums
									</button>
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
							src={urlFor(selectedImage.source)
								.auto('format')
								.url()}
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
		</div>
	);
}
