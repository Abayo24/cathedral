import { Hero } from '@/components/Hero';
import { StatsBand } from '@/components/StatsBand';
import { Welcome } from '@/components/Welcome';
import { HomePreview } from '@/components/HomePreview';
import { Footer } from '@/components/Footer';

export default function Home() {
	return (
		<>
			<Hero />
			<StatsBand />
			<Welcome />
			<HomePreview />
			<Footer />
		</>
	);
}
