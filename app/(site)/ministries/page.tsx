import { Ministries } from '@/components/Ministries';
import { PageHero } from '@/components/PageHero';
import { getMinistries } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
	title: 'Ministries & Fellowships',
	description:
		"Join a ministry at St. Stephen's Cathedral Kisumu — KAMA (Kenya Anglican Men's Association), Mothers Union, Youth & KAYO, Sunday School, Music & Choir, Deaf Ministry and Widows Ministry.",
	path: '/ministries',
});

export default async function MinistriesPage() {
	const ministries = await getMinistries();
	return (
		<>
			<PageHero
				label='Get Involved'
				title='Our Ministries'
				subtitle='Find your place to serve, grow, and connect within the Cathedral family.'
				img='/choir.jpg'
				breadcrumbs={[{ name: 'Ministries', path: '/ministries' }]}
			/>
			<Ministries ministries={ministries} />
		</>
	);
}
