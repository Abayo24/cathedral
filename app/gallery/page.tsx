import { Gallery } from '@/components/Gallery';
import { Footer } from '@/components/Footer';
import { PageHero } from '@/components/PageHero';

export const metadata = { title: "Gallery — ACK St. Stephen's Cathedral" };

export default function GalleryPage() {
	return (
		<>
			<PageHero
				label='Life at the Cathedral'
				title='Our Gallery'
				subtitle='Worship, sacraments, community — captured in photographs.'
				img='/gallery.jpg'
			/>
			<Gallery />
			<Footer />
		</>
	);
}
