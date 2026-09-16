import { Gallery } from '@/components/Gallery';
import { PageHero } from '@/components/PageHero';
import { getAlbums } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
	title: 'Photo Gallery',
	description:
		"Photos from worship, Holy Communion, ordinations, choirs, youth, Mothers Union and community life at ACK St. Stephen's Cathedral Kisumu.",
	path: '/gallery',
});

export default async function GalleryPage() {
	const albums = await getAlbums();
	return (
		<>
			<PageHero
				label='Life at the Cathedral'
				title='Our Gallery'
				subtitle='Worship, sacraments, community — captured in photographs.'
				img='/gallery.jpg'
				breadcrumbs={[{ name: 'Gallery', path: '/gallery' }]}
			/>
			<Gallery albums={albums} />
		</>
	);
}
