/**
 * /llms.txt — a plain-language summary for AI assistants and answer engines
 * (https://llmstxt.org). Generated from the same content as the website.
 */
import { getFaqs, getEvents, getMinistries, getServiceSchedule, getSiteSettings } from '@/lib/content';
import { formatLongDate, formatTimeRange } from '@/lib/dates';
import { upcomingOccurrences } from '@/lib/events';
import { SITE_URL } from '@/lib/seo';

export const revalidate = 3600;

export async function GET() {
	const [s, schedule, faqs, events, ministries] = await Promise.all([
		getSiteSettings(),
		getServiceSchedule(),
		getFaqs(),
		getEvents(),
		getMinistries(),
	]);
	const upcoming = upcomingOccurrences(events, 10);
	const slot = (x: { label: string; time: string; venue: string }) => `- ${x.label}: ${x.time}${x.venue ? ` (${x.venue})` : ''}`;

	const lines = [
		`# ${s.name}`,
		'',
		`> ${s.description}`,
		'',
		'## Key facts',
		'- Denomination: Anglican Church of Kenya (ACK), seat of the Diocese of Maseno South',
		'- Founded: 1913; known locally as "Komulo" after pioneer priest Rev. Reuben Omulo',
		`- Address: ${[s.address.street, `${s.address.poBox} – ${s.address.postalCode}`, s.address.locality, 'Kenya'].filter(Boolean).join(', ')}`,
		`- Phone: ${s.phone}`,
		`- Email: ${s.emails.join(', ')}`,
		...(s.officeHours ? [`- Office hours: ${s.officeHours}`] : []),
		`- Live stream: ${s.livestreamUrl}`,
		`- Giving: M-Pesa Paybill ${s.paybill} — details at ${SITE_URL}/give`,
		'',
		'## Sunday services',
		...schedule.adult.map(slot),
		...schedule.specialised.map(slot),
		...(schedule.note ? ['', `Note: ${schedule.note}`] : []),
		'',
		'## Holy Communion schedule',
		...schedule.communion.map(slot),
		'',
		'## Ministries',
		...ministries.map((m) => `- ${m.name}${m.abbr ? ` (${m.abbr})` : ''}: ${m.description}`),
		'',
		'## Upcoming events',
		...(upcoming.length
			? upcoming.map(
					(o) =>
						`- ${formatLongDate(o.start)}, ${formatTimeRange(o.start, o.end, o.event.allDay)}: [${o.event.title}](${SITE_URL}/events/${o.event.slug})${o.event.cancelled ? ' — CANCELLED' : ''}`,
				)
			: ['- No special events currently listed.']),
		'',
		'## Pages',
		`- [Service times](${SITE_URL}/services)`,
		`- [Events calendar](${SITE_URL}/events) — iCalendar feed: ${SITE_URL}/events/feed.ics`,
		`- [Plan a visit & FAQ](${SITE_URL}/visit)`,
		`- [Notices & weekly bulletins](${SITE_URL}/bulletins)`,
		`- [About & clergy](${SITE_URL}/about)`,
		`- [Ministries](${SITE_URL}/ministries)`,
		`- [Sermons](${SITE_URL}/sermons)`,
		`- [Photo gallery](${SITE_URL}/gallery)`,
		`- [Give](${SITE_URL}/give)`,
		`- [Contact & prayer requests](${SITE_URL}/contact)`,
		'',
		'## Frequently asked questions',
		...faqs.flatMap((f) => ['', `### ${f.question}`, f.answer]),
		'',
	];

	return new Response(lines.join('\n'), {
		headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
	});
}
