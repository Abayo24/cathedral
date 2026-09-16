'use client';

import { type KeyboardEvent, useEffect, useMemo, useRef, useState } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';
import { EventRow } from './EventRow';
import { formatDayKey, formatMonthYear, parseDayKey, weekdayName } from '@/lib/dates';
import type { CalendarItem } from '@/lib/types';

interface Props {
	items: CalendarItem[];
	todayKey: string;
	categories: string[];
	/** YYYY-MM-DD bounds of the data window; navigation stops at these months. */
	minKey: string;
	maxKey: string;
}

const pad = (n: number) => String(n).padStart(2, '0');
const keyOf = (y: number, m: number, d: number) => `${y}-${pad(m + 1)}-${pad(d)}`;
const daysIn = (y: number, m: number) => new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
const monthIndex = (y: number, m: number) => y * 12 + m;
const ARROW_DELTAS: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };

export function EventCalendar({ items, todayKey, categories, minKey, maxKey }: Props) {
	const [todayY, todayM] = parseDayKey(todayKey);
	const [minY, minM] = parseDayKey(minKey);
	const [maxY, maxM] = parseDayKey(maxKey);

	const [month, setMonth] = useState({ y: todayY, m: todayM });
	const [selected, setSelected] = useState<string | null>(null);
	const [category, setCategory] = useState('all');
	const [focusKey, setFocusKey] = useState<string | null>(null);
	const dayButtons = useRef(new Map<string, HTMLButtonElement>());

	const filtered = useMemo(
		() => (category === 'all' ? items : items.filter((i) => i.category === category)),
		[items, category],
	);

	const byDay = useMemo(() => {
		const map = new Map<string, CalendarItem[]>();
		for (const item of filtered) {
			const list = map.get(item.day);
			if (list) list.push(item);
			else map.set(item.day, [item]);
		}
		return map;
	}, [filtered]);

	// Move keyboard focus once the target day's button has rendered.
	useEffect(() => {
		if (!focusKey) return;
		dayButtons.current.get(focusKey)?.focus();
		setFocusKey(null);
	}, [focusKey, month]);

	const current = monthIndex(month.y, month.m);
	const canPrev = current > monthIndex(minY, minM);
	const canNext = current < monthIndex(maxY, maxM);

	const goToMonth = (index: number) => {
		setMonth({ y: Math.floor(index / 12), m: index % 12 });
		setSelected(null);
	};

	const onDayKeyDown = (e: KeyboardEvent<HTMLButtonElement>, d: number) => {
		const delta = ARROW_DELTAS[e.key];
		if (delta === undefined) return;
		e.preventDefault();
		const target = new Date(Date.UTC(month.y, month.m, d + delta));
		const [ty, tm] = [target.getUTCFullYear(), target.getUTCMonth()];
		const index = monthIndex(ty, tm);
		if (index < monthIndex(minY, minM) || index > monthIndex(maxY, maxM)) return;
		if (index !== current) setMonth({ y: ty, m: tm });
		setFocusKey(keyOf(ty, tm, target.getUTCDate()));
	};

	const offset = new Date(Date.UTC(month.y, month.m, 1)).getUTCDay();
	const total = daysIn(month.y, month.m);
	const cells: (number | null)[] = Array.from({ length: Math.ceil((offset + total) / 7) * 7 }, (_, i) => {
		const d = i - offset + 1;
		return d >= 1 && d <= total ? d : null;
	});
	const weeks = Array.from({ length: cells.length / 7 }, (_, w) => cells.slice(w * 7, w * 7 + 7));

	const monthPrefix = `${month.y}-${pad(month.m + 1)}`;
	const selectedInMonth = selected?.startsWith(monthPrefix) ? selected : null;
	const tabStop = selectedInMonth ?? (todayKey.startsWith(monthPrefix) ? todayKey : keyOf(month.y, month.m, 1));
	const listItems = selectedInMonth ? byDay.get(selectedInMonth) ?? [] : filtered.filter((i) => i.day.startsWith(monthPrefix));
	const monthLabel = formatMonthYear(month.y, month.m);

	return (
		<div className='grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-6 lg:gap-8 items-start'>
			<div className='bg-white rounded-3xl border border-parchment/70 shadow-sm p-3 sm:p-6'>
				<div className='flex flex-wrap items-center justify-between gap-3 mb-4 px-1'>
					<h3 className='font-display text-2xl sm:text-3xl text-navy-mid' aria-live='polite'>
						{monthLabel}
					</h3>
					<div className='flex items-center gap-1.5'>
						<button
							type='button'
							onClick={() => goToMonth(current - 1)}
							disabled={!canPrev}
							className='p-2.5 rounded-full border border-parchment hover:border-royal hover:text-royal disabled:opacity-40 disabled:pointer-events-none'
							aria-label='Previous month'
						>
							<ChevronLeft size={18} aria-hidden />
						</button>
						<button
							type='button'
							onClick={() => goToMonth(monthIndex(todayY, todayM))}
							className='btn-outline !py-2 !px-4'
						>
							Today
						</button>
						<button
							type='button'
							onClick={() => goToMonth(current + 1)}
							disabled={!canNext}
							className='p-2.5 rounded-full border border-parchment hover:border-royal hover:text-royal disabled:opacity-40 disabled:pointer-events-none'
							aria-label='Next month'
						>
							<ChevronRight size={18} aria-hidden />
						</button>
					</div>
				</div>

				{categories.length > 1 && (
					<div className='flex items-center gap-2 mb-4 px-1'>
						<label htmlFor='event-category' className='font-ui text-sm text-muted'>
							Show
						</label>
						<select
							id='event-category'
							value={category}
							onChange={(e) => setCategory(e.target.value)}
							className='font-ui text-sm border border-parchment rounded-full px-3 py-1.5 bg-cream text-navy-mid'
						>
							<option value='all'>All events</option>
							{categories.map((c) => (
								<option key={c} value={c}>
									{c}
								</option>
							))}
						</select>
					</div>
				)}

				<table className='w-full table-fixed border-separate border-spacing-0.5 sm:border-spacing-1'>
					<caption className='sr-only'>
						{monthLabel}. Use the arrow keys to move between days and Enter to show a day&apos;s events.
					</caption>
					<thead>
						<tr>
							{Array.from({ length: 7 }, (_, i) => (
								<th key={i} scope='col' className='font-ui text-[11px] sm:text-xs tracking-[1px] uppercase text-muted font-semibold pb-2'>
									<abbr title={weekdayName(i)} className='no-underline'>
										{weekdayName(i).slice(0, 3)}
									</abbr>
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{weeks.map((week, w) => (
							<tr key={w}>
								{week.map((d, i) => {
									if (d === null) return <td key={i} />;
									const key = keyOf(month.y, month.m, d);
									const dayItems = byDay.get(key) ?? [];
									const isToday = key === todayKey;
									const isSelected = key === selectedInMonth;
									const count = dayItems.length;
									return (
										<td key={i} className='align-top p-0'>
											<button
												type='button'
												ref={(el) => {
													if (el) dayButtons.current.set(key, el);
													else dayButtons.current.delete(key);
												}}
												tabIndex={key === tabStop ? 0 : -1}
												aria-pressed={isSelected}
												aria-current={isToday ? 'date' : undefined}
												aria-label={`${formatDayKey(key, 'long')}${count ? `, ${count} event${count > 1 ? 's' : ''}` : ', no events'}`}
												onKeyDown={(e) => onDayKeyDown(e, d)}
												onClick={() => setSelected(isSelected ? null : key)}
												className={`w-full h-14 sm:h-24 rounded-lg sm:rounded-xl p-1 sm:p-2 flex flex-col items-center sm:items-start text-left transition-colors ${
													isSelected
														? 'bg-royal text-white'
														: count
															? 'bg-royal-light/60 hover:bg-royal-light text-navy-mid'
															: 'hover:bg-cream text-muted'
												}`}
											>
												<span
													className={`font-ui text-xs sm:text-sm font-semibold inline-flex w-6 h-6 items-center justify-center rounded-full ${
														isToday && !isSelected ? 'bg-crimson text-white' : ''
													}`}
												>
													{d}
												</span>
												{count > 0 && (
													<>
														<span aria-hidden className='sm:hidden mt-auto flex gap-0.5 pb-0.5'>
															{dayItems.slice(0, 3).map((item) => (
																<span key={item.key} className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-crimson'}`} />
															))}
														</span>
														<span aria-hidden className='hidden sm:flex flex-col gap-0.5 mt-1 w-full min-w-0'>
															{dayItems.slice(0, 2).map((item) => (
																<span
																	key={item.key}
																	className={`truncate font-ui text-[11px] leading-tight px-1.5 py-0.5 rounded ${
																		isSelected ? 'bg-white/20' : 'bg-white text-navy-mid'
																	} ${item.cancelled ? 'line-through' : ''}`}
																>
																	{item.title}
																</span>
															))}
															{count > 2 && <span className='font-ui text-[11px] px-1.5'>+{count - 2} more</span>}
														</span>
													</>
												)}
											</button>
										</td>
									);
								})}
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div aria-live='polite'>
				<div className='flex items-center justify-between gap-3 mb-4'>
					<h3 className='font-display text-2xl text-navy-mid'>
						{selectedInMonth ? formatDayKey(selectedInMonth, 'long') : `Events in ${monthLabel}`}
					</h3>
					{selectedInMonth && (
						<button type='button' onClick={() => setSelected(null)} className='font-ui text-sm text-royal underline underline-offset-4'>
							Whole month
						</button>
					)}
				</div>
				{listItems.length > 0 ? (
					<ul className='space-y-3'>
						{listItems.map((item) => (
							<EventRow key={item.key} item={item} />
						))}
					</ul>
				) : (
					<div className='rounded-2xl border border-dashed border-parchment bg-white/60 p-8 text-center'>
						<CalendarDays className='mx-auto text-faint mb-3' size={28} aria-hidden />
						<p className='font-body text-muted'>
							{selectedInMonth ? 'No events on this day.' : 'No events listed for this month yet.'}
						</p>
						<p className='font-body text-sm text-muted mt-1'>Regular Sunday services take place every week.</p>
					</div>
				)}
			</div>
		</div>
	);
}
