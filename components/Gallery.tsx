import Link from 'next/link';
import { Images } from 'lucide-react';
import { CmsImage } from './ui/CmsImage';
import { SectionHeader } from './ui/SectionHeader';
import { formatDayKey } from '@/lib/dates';
import type { Album } from '@/lib/types';

/** Album overview for /gallery. Each album links to its own crawlable page. */
export function Gallery({ albums }: { albums: Album[] }) {
	return (
		<section className='section-pad bg-ivory'>
			<div className='container-main'>
				<SectionHeader
					label='Visual Journey'
					title='Life at the Cathedral'
					subtitle='A look back at our services, celebrations, and the moments that bring us together.'
					centered
				/>

				{albums.length === 0 ? (
					<p className='text-center font-body text-muted py-12'>Photo albums are coming soon.</p>
				) : (
					<ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
						{albums.map((album, index) => (
							<li
								key={album.id}
								className={`group relative overflow-hidden rounded-3xl shadow-md hover:shadow-2xl transition-shadow duration-500 h-72 ${
									index === 0 ? 'sm:col-span-2 lg:row-span-2 lg:h-auto lg:min-h-[36rem]' : ''
								}`}
							>
								<CmsImage
									image={album.cover}
									alt=''
									fill
									sizes={index === 0 ? '(max-width:1024px) 100vw, 66vw' : '(max-width:640px) 100vw, 33vw'}
									className='object-cover transition-transform duration-700 group-hover:scale-105'
									priority={index === 0}
								/>
								<div className='absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent' />
								<div className='absolute bottom-0 left-0 w-full p-6 md:p-8'>
									{album.category && <p className='label-tag-light !mb-1.5'>{album.category}</p>}
									<h3 className='font-display text-2xl md:text-3xl text-white mb-2'>
										<Link href={`/gallery/${album.slug}`} className='no-underline after:absolute after:inset-0'>
											{album.title}
										</Link>
									</h3>
									<p className='flex flex-wrap items-center gap-2'>
										<span className='chip bg-black/45 text-white backdrop-blur-md'>
											<Images size={12} className='mr-1.5' aria-hidden />
											{album.images.length} {album.images.length === 1 ? 'photo' : 'photos'}
										</span>
										{album.date && <span className='chip bg-black/45 text-white backdrop-blur-md'>{formatDayKey(album.date)}</span>}
									</p>
								</div>
							</li>
						))}
					</ul>
				)}
			</div>
		</section>
	);
}
