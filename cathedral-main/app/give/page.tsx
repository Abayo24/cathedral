import { Giving } from '@/components/Giving';
import { Footer } from '@/components/Footer';
import { PageHero } from '@/components/PageHero';

export const metadata = { title: "Give — ACK St. Stephen's Cathedral" };

export default function GivePage() {
	return (
		<>
			<PageHero
				label='Stewardship'
				title='Tithes & Offerings'
				subtitle="Support the mission of St. Stephen's Cathedral through your generous giving."
				img='/offering.jpg'
			/>
			<Giving />
			<Footer />
		</>
	);
}
