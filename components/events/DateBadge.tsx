import { formatDayNumber, formatMonthShort } from '@/lib/dates';

/** Visual calendar-leaf date. Decorative — pair it with a text date for screen readers. */
export function DateBadge({ iso, className = '' }: { iso: string; className?: string }) {
	return (
		<div
			aria-hidden
			className={`flex-shrink-0 w-14 text-center rounded-xl overflow-hidden border border-parchment bg-white shadow-sm ${className}`}
		>
			<div className='bg-crimson text-white font-ui text-[11px] tracking-[1.5px] uppercase py-0.5'>
				{formatMonthShort(iso)}
			</div>
			<div className='font-display text-2xl font-medium text-navy-mid py-1 leading-none'>{formatDayNumber(iso)}</div>
		</div>
	);
}
