import { Services } from '@/components/Services';
import { Footer } from '@/components/Footer';
import { PageHero } from '@/components/PageHero';

export const metadata = { title: "Services — ACK St. Stephen's Cathedral" };

export default function ServicesPage() {
	return (
		<>
			<PageHero
				label='Worship With Us'
				title='Sunday Services'
				subtitle='Five congregations every Sunday. There is a seat for you.'
				img='/sunday-service.jpg'
			/>
			<Services />
			<Footer />
		</>
	);
}
