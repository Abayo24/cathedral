import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { AlbumPhotos } from '@/components/GalleryClient';
import { PageHero } from '@/components/PageHero';
import { JsonLd } from '@/components/ui/JsonLd';
import { getAlbumBySlug, getAlbums } from '@/lib/content';
import { formatDayKey } from '@/lib/dates';
import { pageMetadata } from '@/lib/seo';
import { albumJsonLd } from '@/lib/structured-data';

export async function generateStaticParams() {
	return (await getAlbums()).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
	const album = await getAlbumBySlug(params.slug);
	if (!album) return { title: 'Album not found', robots: { index: false } };
	return pageMetadata({
		title: `${album.title} — Photos`,
		description:
			album.description ||
			`${album.images.length} photos from ${album.title} at ACK St. Stephen's Cathedral Kisumu.`,
		path: `/gallery/${album.slug}`,
		image: album.cover.src.startsWith('https://cdn.sanity.io/') ? `${album.cover.src}?w=1200&h=630&fit=crop&auto=format` : album.cover.src,
	});
}

export default async function AlbumPage({ params }: { params: { slug: string } }) {
	const album = await getAlbumBySlug(params.slug);
	if (!album) notFound();

	const subtitle = [album.date && formatDayKey(album.date, 'long'), `${album.images.length} photos`].filter(Boolean).join(' · ');

	return (
		<>
			<PageHero
				label={album.category || 'Album'}
				title={album.title}
				subtitle={album.description ? `${album.description} ${subtitle}` : subtitle}
				img={album.cover.src}
				breadcrumbs={[
					{ name: 'Gallery', path: '/gallery' },
					{ name: album.title, path: `/gallery/${album.slug}` },
				]}
			/>
			<section className='section-pad bg-ivory'>
				<div className='container-main'>
					<AlbumPhotos title={album.title} images={album.images} />
					<Link href='/gallery' className='btn-outline mt-10'>
						<ArrowLeft size={15} aria-hidden /> All albums
					</Link>
				</div>
			</section>
			<JsonLd data={albumJsonLd(album)} />
		</>
	);
}
