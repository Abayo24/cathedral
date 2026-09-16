import { About } from '@/components/About';
import { PageHero } from '@/components/PageHero';
import { getLeaders } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
	title: 'About Us — History, Vision & Clergy',
	description:
		"The story of ACK St. Stephen's Cathedral Kisumu, known as \"Komulo\", built in 1913 and now seat of the Diocese of Maseno South. Our vision, mission, values and Cathedral clergy.",
	path: '/about',
});

export default async function AboutPage() {
	const leaders = await getLeaders();
	return (
		<>
			<PageHero
				label='Our Heritage'
				title='About the Cathedral'
				subtitle='Over a century of Anglican faith in the heart of Kisumu.'
				img='/clergy.jpg'
				breadcrumbs={[{ name: 'About', path: '/about' }]}
			/>
			<About leaders={leaders} />
		</>
	);
}
