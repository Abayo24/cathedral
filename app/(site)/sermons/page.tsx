import { PageHero } from '@/components/PageHero';
import { Sermons } from '@/components/Sermons';
import { getSermons, getSiteSettings } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
	title: 'Sermons & Live Streams',
	description:
		"Watch and listen to sermons from the clergy of ACK St. Stephen's Cathedral Kisumu. Sunday services are streamed live on Facebook.",
	path: '/sermons',
});

export default async function SermonsPage() {
	const [sermons, settings] = await Promise.all([getSermons(), getSiteSettings()]);
	return (
		<>
			<PageHero
				label='The Word'
				title='Sermons & Messages'
				subtitle='Receive the Word of God wherever you are — live and on demand.'
				img='/sermon.jpg'
				breadcrumbs={[{ name: 'Sermons', path: '/sermons' }]}
			/>
			<Sermons sermons={sermons} livestreamUrl={settings.livestreamUrl} />
		</>
	);
}
