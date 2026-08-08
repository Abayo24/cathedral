import { Sermons } from '@/components/Sermons';
import { Footer } from '@/components/Footer';
import { PageHero } from '@/components/PageHero';

export const metadata = { title: "Sermons — ACK St. Stephen's Cathedral" };

export default function SermonsPage() {
	return (
		<>
			<PageHero
				label='The Word'
				title='Sermons & Messages'
				subtitle='Receive the Word of God wherever you are — live and on demand.'
				img='/sermon.jpg'
			/>
			<Sermons />
			<Footer />
		</>
	);
}
