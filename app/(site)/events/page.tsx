import Link from 'next/link';
import { CalendarPlus, Download } from 'lucide-react';
import { EventCalendar } from '@/components/events/EventCalendar';
import { EventCard } from '@/components/events/EventCard';
import { PageHero } from '@/components/PageHero';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { JsonLd } from '@/components/ui/JsonLd';
import { getEvents, getSiteSettings } from '@/lib/content';
import { DAY_MS, dayKey } from '@/lib/dates';
import { occurrencesBetween, toCalendarItem } from '@/lib/events';
import { pageMetadata, SITE_URL } from '@/lib/seo';
import { eventJsonLd } from '@/lib/structured-data';

// "Upcoming" depends on the current time, so re-render regularly even without CMS edits.
export const revalidate = 900;

export const metadata = pageMetadata({
	title: 'Events Calendar',
	description:
		"What's on at ACK St. Stephen's Cathedral Kisumu — worship, fellowships, conferences, youth, Mothers Union and KAMA events. Add events to your phone's calendar or subscribe.",
	path: '/events',
});

export default async function EventsPage() {
	const [events, settings] = await Promise.all([getEvents(), getSiteSettings()]);
	const now = Date.now();
	const from = now - 62 * DAY_MS;
	const to = now + 366 * DAY_MS;
	const occurrences = occurrencesBetween(events, from, to);
	const upcoming = occurrences.filter((o) => Date.parse(o.end ?? o.start) >= now).slice(0, 6);
	const categories = Array.from(new Set(events.map((e) => e.category).filter((c): c is string => Boolean(c)))).sort();
	const feedHost = new URL(SITE_URL).host;

	return (
		<>
			<PageHero
				label="What's On"
				title='Events Calendar'
				subtitle='Services, fellowships, celebrations and gatherings at the Cathedral. Everyone is welcome.'
				img='/community.jpg'
				breadcrumbs={[{ name: 'Events', path: '/events' }]}
			/>

			<section className='section-pad bg-ivory' aria-labelledby='upcoming-heading'>
				<div className='container-main'>
					<SectionHeader id='upcoming-heading' label='Coming Up' title='Next at the Cathedral' centered />
					{upcoming.length > 0 ? (
						<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
							{upcoming.map((o) => (
								<EventCard key={o.key} occurrence={o} />
							))}
						</div>
					) : (
						<div className='max-w-xl mx-auto text-center bg-white rounded-3xl border border-parchment/70 p-8'>
							<p className='font-body text-muted leading-8'>
								No special events are listed right now — please check back soon. Our Sunday services take place every
								week.
							</p>
							<Link href='/services' className='btn-royal mt-5'>
								See service times
							</Link>
						</div>
					)}
				</div>
			</section>

			<section className='section-pad bg-cream' aria-labelledby='calendar-heading'>
				<div className='container-main'>
					<SectionHeader id='calendar-heading' label='Plan Ahead' title='Full Calendar' centered />
					<EventCalendar
						items={occurrences.map(toCalendarItem)}
						todayKey={dayKey(now)}
						categories={categories}
						minKey={dayKey(from)}
						maxKey={dayKey(to)}
					/>

					<div className='mt-10 bg-royal rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-5'>
						<div>
							<h3 className='font-display text-2xl text-white'>Never miss an event</h3>
							<p className='font-body text-sm text-white/80 leading-7 mt-1 max-w-xl'>
								Subscribe once and new Cathedral events appear automatically in Google Calendar, Apple Calendar or
								Outlook.
							</p>
						</div>
						<div className='flex flex-col sm:flex-row gap-3'>
							<a href={`webcal://${feedHost}/events/feed.ics`} className='btn-crimson'>
								<CalendarPlus size={15} aria-hidden /> Subscribe
							</a>
							<a href='/events/feed.ics' className='btn-outline-white' download>
								<Download size={15} aria-hidden /> Download .ics
							</a>
						</div>
					</div>
				</div>
			</section>

			{upcoming.map((o) => (
				<JsonLd key={o.key} data={eventJsonLd(o, settings)} />
			))}
		</>
	);
}
