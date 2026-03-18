import { About } from '@/components/About';
import { Footer } from '@/components/Footer';
import { PageHero } from '@/components/PageHero';

export const metadata = { title: "About Us — ACK St. Stephen's Cathedral" };

export default function AboutPage() {
	return (
		<>
			<PageHero
				label='Our Heritage'
				title='About the Cathedral'
				subtitle='Over a century of Anglican faith in the heart of Kisumu.'
				img='/clergy.jpg'
			/>
			<About />
			<Footer />
		</>
	);
}
