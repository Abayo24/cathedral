import { Ministries } from '@/components/Ministries';
import { Footer } from '@/components/Footer';
import { PageHero } from '@/components/PageHero';

export const metadata = { title: "Ministries — ACK St. Stephen's Cathedral" };

export default function MinistriesPage() {
	return (
		<>
			<PageHero
				label='Get Involved'
				title='Our Ministries'
				subtitle='Find your place to serve, grow, and connect within the Cathedral family.'
				img='/choir.jpg'
			/>
			<Ministries />
			<Footer />
		</>
	);
}
