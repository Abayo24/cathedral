import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CalendarPlus, Clock, Download, ExternalLink, MapPin, Phone, Repeat } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { CmsImage } from '@/components/ui/CmsImage';
import { JsonLd } from '@/components/ui/JsonLd';
import { PortableBody } from '@/components/ui/PortableBody';
import { getEventBySlug, getEventSlugs, getSiteSettings } from '@/lib/content';
import { DAY_MS, formatLongDate, formatTimeRange } from '@/lib/dates';
import { describeRecurrence, expandEvent, googleCalendarUrl, nextOccurrence } from '@/lib/events';
import { pageMetadata, SITE_URL } from '@/lib/seo';
import { eventJsonLd } from '@/lib/structured-data';

export const revalidate = 900;

export async function generateStaticParams() {
	return (await getEventSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
	const event = await getEventBySlug(params.slug);
	if (!event) return { title: 'Event not found', robots: { index: false } };
	const occurrence = nextOccurrence(event);
	const when = occurrence ? `${formatLongDate(occurrence.start)}, ${formatTimeRange(occurrence.start, occurrence.end, event.allDay)}` : '';
	return pageMetadata({
		title: event.title,
		description: [when, event.summary].filter(Boolean).join(' — ').slice(0, 300),
		path: `/events/${event.slug}`,
		image: event.image?.src ? `${event.image.src}?w=1200&h=630&fit=crop&auto=format` : undefined,
		type: 'article',
	});
}

export default async function EventPage({ params }: { params: { slug: string } }) {
	const [event, settings] = await Promise.all([getEventBySlug(params.slug), getSiteSettings()]);
	if (!event) notFound();

	const now = Date.now();
	const occurrence = nextOccurrence(event, now);
	const isPast = occurrence ? Date.parse(occurrence.end ?? occurrence.start) < now : true;
	const recurrence = describeRecurrence(event);
	const laterDates = recurrence ? expandEvent(event, now, now + 180 * DAY_MS).slice(1, 7) : [];
	const fallbackLocation = `${settings.name}, ${settings.address.locality}`;

	return (
		<>
			<PageHero
				label={event.category || 'Event'}
				title={event.title}
				subtitle={event.summary}
				img={event.image?.src ?? '/community.jpg'}
				breadcrumbs={[
					{ name: 'Events', path: '/events' },
					{ name: event.title, path: `/events/${event.slug}` },
				]}
			/>

			<section className='section-pad bg-cream'>
				<div className='container-main grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-14 items-start'>
					<div className='min-w-0 order-2 lg:order-1'>
						{event.cancelled && (
							<div role='status' className='mb-6 rounded-2xl bg-crimson text-white p-5 font-body'>
								<strong>This event has been cancelled.</strong>
								{event.contact ? ` For details contact ${event.contact}.` : ''}
							</div>
						)}
						{isPast && !event.cancelled && (
							<div role='status' className='mb-6 rounded-2xl bg-ivory border border-parchment p-5 font-body text-muted'>
								This event has already taken place.{' '}
								<Link href='/events' className='text-royal underline underline-offset-4'>
									See upcoming events
								</Link>
							</div>
						)}
						{event.image && (
							<div className='relative aspect-[16/9] rounded-3xl overflow-hidden mb-8 shadow-lg shadow-navy/10'>
								<CmsImage image={event.image} fill priority sizes='(max-width:1024px) 100vw, 60vw' className='object-cover' />
							</div>
						)}
						{event.body?.length ? (
							<PortableBody value={event.body} />
						) : (
							<p className='font-body text-base leading-8 text-muted'>{event.summary}</p>
						)}

						{laterDates.length > 0 && (
							<div className='mt-10'>
								<h2 className='font-display text-2xl text-navy-mid mb-4'>Following dates</h2>
								<ul className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
									{laterDates.map((o) => (
										<li key={o.key} className='font-body text-sm bg-white border border-parchment/70 rounded-xl px-4 py-3 text-navy-mid'>
											{formatLongDate(o.start)}
										</li>
									))}
								</ul>
							</div>
						)}

						<Link href='/events' className='btn-outline mt-10'>
							<ArrowLeft size={15} aria-hidden /> All events
						</Link>
					</div>

					<aside className='order-1 lg:order-2 lg:sticky lg:top-24 bg-white rounded-3xl border border-parchment/70 shadow-sm p-6 sm:p-7'>
						<h2 className='label-tag'>Event details</h2>
						<dl className='space-y-4 font-body text-base text-navy-mid'>
							{occurrence && (
								<div className='flex gap-3'>
									<dt className='sr-only'>When</dt>
									<Clock size={18} className='text-crimson mt-0.5 flex-shrink-0' aria-hidden />
									<dd>
										<span className='block font-semibold'>{formatLongDate(occurrence.start)}</span>
										<span className='block text-muted'>{formatTimeRange(occurrence.start, occurrence.end, event.allDay)}</span>
									</dd>
								</div>
							)}
							{recurrence && (
								<div className='flex gap-3'>
									<dt className='sr-only'>Repeats</dt>
									<Repeat size={18} className='text-crimson mt-0.5 flex-shrink-0' aria-hidden />
									<dd>{recurrence}</dd>
								</div>
							)}
							<div className='flex gap-3'>
								<dt className='sr-only'>Where</dt>
								<MapPin size={18} className='text-crimson mt-0.5 flex-shrink-0' aria-hidden />
								<dd>
									{event.location || settings.shortName}
									<span className='block text-muted text-sm'>{settings.name}, {settings.address.locality}</span>
								</dd>
							</div>
							{event.contact && (
								<div className='flex gap-3'>
									<dt className='sr-only'>Contact</dt>
									<Phone size={18} className='text-crimson mt-0.5 flex-shrink-0' aria-hidden />
									<dd>{event.contact}</dd>
								</div>
							)}
						</dl>

						{!event.cancelled && !isPast && occurrence && (
							<div className='mt-6 pt-6 border-t border-parchment/70 flex flex-col gap-2.5'>
								{event.registrationUrl && (
									<a href={event.registrationUrl} target='_blank' rel='noopener noreferrer' className='btn-crimson'>
										Register / more info <ExternalLink size={14} aria-hidden />
									</a>
								)}
								<a
									href={googleCalendarUrl(occurrence, SITE_URL, fallbackLocation)}
									target='_blank'
									rel='noopener noreferrer'
									className='btn-royal'
								>
									<CalendarPlus size={15} aria-hidden /> Add to Google Calendar
								</a>
								<a href={`/events/${event.slug}/calendar.ics`} className='btn-outline' download>
									<Download size={15} aria-hidden /> Apple / Outlook (.ics)
								</a>
							</div>
						)}
					</aside>
				</div>
			</section>

			{occurrence && <JsonLd data={eventJsonLd(occurrence, settings)} />}
		</>
	);
}
