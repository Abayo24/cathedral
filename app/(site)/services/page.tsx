import Link from 'next/link';
import { PageHero } from '@/components/PageHero';
import { Services } from '@/components/Services';
import { getServiceSchedule } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
	title: 'Church Service Times in Kisumu — Sunday Worship & Holy Communion',
	description:
		"Service times at St. Stephen's Cathedral Kisumu: Sunday services at 7:00, 9:00 and 11:00 am, Youth 8:00 am, Deaf service 10:30 am, Teens and Sunday School, plus Wednesday mid-week services.",
	path: '/services',
});

export default async function ServicesPage() {
	const schedule = await getServiceSchedule();
	return (
		<>
			<PageHero
				label='Worship With Us'
				title='Sunday Services'
				subtitle='Several congregations every Sunday. There is a seat for you.'
				img='/sunday-service.jpg'
				breadcrumbs={[{ name: 'Services', path: '/services' }]}
			/>
			<Services schedule={schedule} />
			<section className='px-4 pb-16 bg-ivory'>
				<div className='container-md text-center'>
					<p className='font-body text-muted leading-8 mb-5'>
						First time visiting? Find directions, what to expect and answers to common questions.
					</p>
					<div className='flex flex-col sm:flex-row gap-3 justify-center'>
						<Link href='/visit' className='btn-royal'>
							Plan a Visit
						</Link>
						<Link href='/events' className='btn-outline'>
							Special events
						</Link>
					</div>
				</div>
			</section>
		</>
	);
}
