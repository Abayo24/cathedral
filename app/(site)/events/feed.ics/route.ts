import { getEvents, getSiteSettings } from '@/lib/content';
import { buildIcs } from '@/lib/events';
import { SITE_URL } from '@/lib/seo';

// Subscribable calendar feed: webcal://<domain>/events/feed.ics
export const revalidate = 900;

export async function GET() {
	const [events, settings] = await Promise.all([getEvents(), getSiteSettings()]);

	const ics = buildIcs(events, {
		siteUrl: SITE_URL,
		calendarName: `${settings.shortName} Events`,
		location: `${settings.name}, ${settings.address.locality}`,
	});

	return new Response(ics, {
		headers: {
			'Content-Type': 'text/calendar; charset=utf-8',
			'Content-Disposition': 'inline; filename="st-stephens-cathedral-events.ics"',
			'Cache-Control': 'public, max-age=900',
		},
	});
}
