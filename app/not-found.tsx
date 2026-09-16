import './globals.css';
import Link from 'next/link';
import { Footer } from '@/components/Footer';
import { Navigation } from '@/components/Navigation';
import { getSiteSettings } from '@/lib/content';

export const metadata = { title: 'Page not found', robots: { index: false } };

export default async function NotFound() {
	const settings = await getSiteSettings();
	return (
		<>
			<Navigation phone={settings.phone} phoneIntl={settings.phoneIntl} />
			<main id='main' className='section-pad bg-cream min-h-[60vh] flex items-center'>
				<div className='container-sm text-center'>
					<p className='label-tag'>Error 404</p>
					<h1 className='section-title'>We couldn&apos;t find that page</h1>
					<p className='font-body text-muted leading-8 mb-8'>
						The page may have moved, or the event may have ended. These links might help:
					</p>
					<div className='flex flex-wrap gap-3 justify-center'>
						<Link href='/' className='btn-crimson'>
							Home
						</Link>
						<Link href='/events' className='btn-outline'>
							Events
						</Link>
						<Link href='/services' className='btn-outline'>
							Service times
						</Link>
						<Link href='/contact' className='btn-outline'>
							Contact
						</Link>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}
