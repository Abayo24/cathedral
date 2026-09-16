import Link from 'next/link';
import { Clock, MapPin } from 'lucide-react';
import { DateBadge } from './DateBadge';
import { formatLongDate, formatTimeRange } from '@/lib/dates';
import type { CalendarItem } from '@/lib/types';

export function EventRow({ item }: { item: CalendarItem }) {
	return (
		<li>
			<Link
				href={`/events/${item.slug}`}
				className='group flex gap-4 p-4 rounded-2xl bg-white border border-parchment/70 hover:border-royal hover:shadow-md transition-all no-underline'
			>
				<DateBadge iso={item.start} />
				<div className='min-w-0 flex-1'>
					<p className='font-display text-xl text-navy-mid leading-snug group-hover:text-royal transition-colors'>
						<span className='sr-only'>{formatLongDate(item.start)}: </span>
						{item.cancelled && <span className='chip bg-crimson text-white mr-2 align-middle !text-[10px]'>Cancelled</span>}
						<span className={item.cancelled ? 'line-through decoration-crimson/60' : ''}>{item.title}</span>
					</p>
					<p className='font-body text-sm text-muted mt-1.5 flex flex-wrap gap-x-4 gap-y-1'>
						<span className='inline-flex items-center gap-1.5'>
							<Clock size={13} aria-hidden className='text-royal' />
							{formatTimeRange(item.start, item.end, item.allDay)}
						</span>
						{item.location && (
							<span className='inline-flex items-center gap-1.5'>
								<MapPin size={13} aria-hidden className='text-royal' />
								{item.location}
							</span>
						)}
					</p>
				</div>
				{item.category && (
					<span className='chip hidden sm:inline-flex self-start bg-royal/10 text-royal whitespace-nowrap'>{item.category}</span>
				)}
			</Link>
		</li>
	);
}
