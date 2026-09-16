import Link from 'next/link';
import { Clock, MapPin } from 'lucide-react';
import { DateBadge } from './DateBadge';
import { CmsImage } from '../ui/CmsImage';
import { CrossOrnament } from '../ui/CrossOrnament';
import { formatMediumDate, formatTimeRange } from '@/lib/dates';
import type { EventOccurrence } from '@/lib/types';

export function EventCard({ occurrence, headingLevel = 'h3' }: { occurrence: EventOccurrence; headingLevel?: 'h2' | 'h3' }) {
	const e = occurrence.event;
	const Heading = headingLevel;

	return (
		<article className='group relative flex flex-col rounded-3xl overflow-hidden bg-white border border-parchment/60 shadow-sm hover:shadow-xl hover:shadow-navy/10 transition-all duration-300 hover:-translate-y-1'>
			<div className='relative h-44 bg-royal-dark overflow-hidden'>
				{e.image ? (
					<CmsImage
						image={e.image}
						alt=''
						fill
						sizes='(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw'
						className='object-cover transition-transform duration-700 group-hover:scale-105'
					/>
				) : (
					<div className='absolute inset-0 bg-royal-dark flex items-center justify-center'>
						<CrossOrnament size={44} color='rgba(255,255,255,0.14)' />
					</div>
				)}
				<DateBadge iso={occurrence.start} className='absolute top-4 left-4' />
				{e.cancelled && <span className='absolute top-4 right-4 chip bg-crimson text-white'>Cancelled</span>}
			</div>
			<div className='p-6 flex flex-col flex-1'>
				{e.category && <p className='label-tag !mb-2'>{e.category}</p>}
				<Heading className='font-display text-2xl text-navy-mid leading-snug mb-3'>
					<Link
						href={`/events/${e.slug}`}
						className='no-underline after:absolute after:inset-0 after:rounded-3xl group-hover:text-royal transition-colors'
					>
						{e.title}
					</Link>
				</Heading>
				<p className='font-body text-sm text-muted flex items-start gap-1.5'>
					<Clock size={14} aria-hidden className='text-royal mt-0.5 flex-shrink-0' />
					{formatMediumDate(occurrence.start)} · {formatTimeRange(occurrence.start, occurrence.end, e.allDay)}
				</p>
				{e.location && (
					<p className='font-body text-sm text-muted flex items-center gap-1.5 mt-1'>
						<MapPin size={14} aria-hidden className='text-royal flex-shrink-0' />
						{e.location}
					</p>
				)}
				{e.summary && <p className='font-body text-sm text-muted leading-7 mt-3 line-clamp-3'>{e.summary}</p>}
			</div>
		</article>
	);
}
