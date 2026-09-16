import Link from 'next/link';
import { ArrowRight, Bell, FileText, Pin } from 'lucide-react';
import { EventRow } from './events/EventRow';
import { SectionHeader } from './ui/SectionHeader';
import { formatDayKey, formatShortDate } from '@/lib/dates';
import { toCalendarItem } from '@/lib/events';
import type { Announcement, Bulletin, EventOccurrence } from '@/lib/types';

interface Props {
	upcoming: EventOccurrence[];
	announcements: Announcement[];
	latestBulletin?: Bulletin;
}

/** Home page "what's happening" block: upcoming events, notices and the latest bulletin. */
export function ThisWeek({ upcoming, announcements, latestBulletin }: Props) {
	return (
		<section className='section-pad bg-ivory' aria-labelledby='this-week-heading'>
			<div className='container-main'>
				<SectionHeader
					id='this-week-heading'
					label="What's Happening"
					title='This Week at the Cathedral'
					subtitle='Upcoming events, notices and the latest bulletin.'
					centered
				/>

				<div className='grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8'>
					<div>
						<div className='flex items-center justify-between mb-4'>
							<h3 className='font-display text-2xl text-navy-mid'>Upcoming events</h3>
							<Link href='/events' className='font-ui text-[11px] tracking-[2px] uppercase font-semibold text-royal hover:text-crimson inline-flex items-center gap-1.5 no-underline'>
								Full calendar <ArrowRight size={14} aria-hidden />
							</Link>
						</div>
						{upcoming.length > 0 ? (
							<ul className='space-y-3'>
								{upcoming.map((o) => (
									<EventRow key={o.key} item={toCalendarItem(o)} />
								))}
							</ul>
						) : (
							<div className='rounded-2xl bg-white border border-parchment/70 p-6'>
								<p className='font-body text-muted leading-7'>
									No special events listed this week. Join us for Sunday worship at 7:00, 9:00 or 11:00 am.
								</p>
								<Link href='/services' className='btn-outline mt-4'>
									Service times
								</Link>
							</div>
						)}
					</div>

					<div className='space-y-5'>
						<div className='bg-white rounded-3xl border border-parchment/70 p-6'>
							<h3 className='font-display text-2xl text-navy-mid mb-4 flex items-center gap-2'>
								<Bell size={20} className='text-crimson' aria-hidden /> Notices
							</h3>
							{announcements.length > 0 ? (
								<ul className='divide-y divide-parchment/70'>
									{announcements.slice(0, 3).map((a) => (
										<li key={a.id} className='py-3 first:pt-0 last:pb-0'>
											<p className='font-display text-lg font-medium text-navy-mid flex items-start gap-1.5'>
												{a.pinned && <Pin size={14} className='text-crimson mt-1 flex-shrink-0' aria-label='Pinned' />}
												{a.title}
											</p>
											<p className='font-body text-sm text-muted leading-6 mt-1 line-clamp-2'>{a.body}</p>
											<p className='font-body text-xs text-faint mt-1'>{formatShortDate(a.publishedAt)}</p>
										</li>
									))}
								</ul>
							) : (
								<p className='font-body text-sm text-muted'>No new notices.</p>
							)}
							<Link href='/bulletins' className='mt-4 font-ui text-[11px] tracking-[2px] uppercase font-semibold text-royal hover:text-crimson inline-flex items-center gap-1.5 no-underline'>
								All notices <ArrowRight size={14} aria-hidden />
							</Link>
						</div>

						{latestBulletin && (
							<div className='bg-royal rounded-3xl p-6 text-white'>
								<p className='label-tag-light !mb-2'>Latest bulletin</p>
								<h3 className='font-display text-2xl leading-snug'>{latestBulletin.title}</h3>
								<p className='font-body text-sm text-white/80 mt-1'>{formatDayKey(latestBulletin.date, 'long')}</p>
								<div className='flex flex-wrap gap-3 mt-5'>
									{latestBulletin.fileUrl && (
										<a href={latestBulletin.fileUrl} target='_blank' rel='noopener noreferrer' className='btn-crimson !py-2.5 !px-5'>
											<FileText size={14} aria-hidden /> Read PDF
										</a>
									)}
									<Link href='/bulletins' className='btn-outline-white !py-2.5 !px-5'>
										Highlights
									</Link>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
