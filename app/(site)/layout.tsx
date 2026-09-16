import '../globals.css';
import { AnnouncementBanner } from '@/components/AnnouncementBanner';
import { Footer } from '@/components/Footer';
import { Navigation } from '@/components/Navigation';
import { JsonLd } from '@/components/ui/JsonLd';
import { getAnnouncements, getSiteSettings } from '@/lib/content';
import { churchJsonLd } from '@/lib/structured-data';

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
	const [settings, announcements] = await Promise.all([getSiteSettings(), getAnnouncements()]);
	const banner = announcements.find((a) => a.showBanner);

	return (
		<>
			<a href='#main' className='skip-link'>
				Skip to main content
			</a>
			{banner && (
				<AnnouncementBanner id={banner.id} title={banner.title} link={banner.link} linkLabel={banner.linkLabel} />
			)}
			<Navigation phone={settings.phone} phoneIntl={settings.phoneIntl} />
			<main id='main' tabIndex={-1} className='outline-none'>
				{children}
			</main>
			<Footer />
			<JsonLd data={churchJsonLd(settings)} />
		</>
	);
}
