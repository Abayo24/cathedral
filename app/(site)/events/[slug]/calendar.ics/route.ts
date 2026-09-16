import { getEventBySlug, getSiteSettings } from '@/lib/content';
import { buildIcs } from '@/lib/events';
import { SITE_URL } from '@/lib/seo';

export const revalidate = 300;

export async function GET(_request: Request, { params }: { params: { slug: string } }) {
	const [event, settings] = await Promise.all([getEventBySlug(params.slug), getSiteSettings()]);
	if (!event) return new Response('Event not found', { status: 404 });

	const ics = buildIcs([event], {
		siteUrl: SITE_URL,
		calendarName: event.title,
		location: `${settings.name}, ${settings.address.locality}`,
	});

	return new Response(ics, {
		headers: {
			'Content-Type': 'text/calendar; charset=utf-8',
			'Content-Disposition': `attachment; filename="${event.slug}.ics"`,
		},
	});
}
