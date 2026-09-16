import { Hero } from '@/components/Hero';
import { HomePreview } from '@/components/HomePreview';
import { StatsBand } from '@/components/StatsBand';
import { ThisWeek } from '@/components/ThisWeek';
import { Welcome } from '@/components/Welcome';
import { JsonLd } from '@/components/ui/JsonLd';
import { getAnnouncements, getBulletins, getEvents, getMinistries, getServiceSchedule, getSiteSettings } from '@/lib/content';
import { upcomingOccurrences } from '@/lib/events';
import { pageMetadata } from '@/lib/seo';
import { eventJsonLd } from '@/lib/structured-data';

export const revalidate = 900;

export const metadata = pageMetadata({
	title: "ACK St. Stephen's Cathedral Kisumu | Anglican Church, Diocese of Maseno South",
	description:
		"ACK St. Stephen's Cathedral Kisumu (\"Komulo\"), seat of the Diocese of Maseno South since 1913. Sunday services 7:00, 9:00 & 11:00 am, youth and Deaf services, events, sermons and giving.",
	path: '/',
	absoluteTitle: true,
});

export default async function HomePage() {
	const [settings, events, announcements, bulletins, ministries, schedule] = await Promise.all([
		getSiteSettings(),
		getEvents(),
		getAnnouncements(),
		getBulletins(),
		getMinistries(),
		getServiceSchedule(),
	]);

	const upcoming = upcomingOccurrences(events, 12);
	const featuredFirst = [...upcoming.filter((o) => o.event.featured), ...upcoming.filter((o) => !o.event.featured)].slice(0, 4);
	featuredFirst.sort((a, b) => a.start.localeCompare(b.start));

	return (
		<>
			<Hero hero={settings.hero} />
			<StatsBand congregations={schedule.adult.length + schedule.specialised.length} ministries={ministries.length} />
			<ThisWeek upcoming={featuredFirst} announcements={announcements} latestBulletin={bulletins[0]} />
			<Welcome />
			<HomePreview />
			{featuredFirst.map((o) => (
				<JsonLd key={o.key} data={eventJsonLd(o, settings)} />
			))}
		</>
	);
}
