import type { CalendarItem, ChurchEvent, EventOccurrence } from './types';
import { DAY_MS, dayKey, formatDayKey, fromLocal, parseDayKey, toLocal, TIME_ZONE, weekdayName } from './dates';

const MAX_OCCURRENCES = 400;
const WEEKDAYS = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

const lastDayOfMonth = (y: number, m: number) => new Date(Date.UTC(y, m + 1, 0)).getUTCDate();

/** e.g. "2nd Sunday" → { weekday: 0, nth: 2 }; days 29–31 count as "last". */
function weekdayOrdinal(startMs: number) {
	const local = toLocal(startMs);
	const nth = Math.ceil(local.getUTCDate() / 7);
	return { weekday: local.getUTCDay(), nth: nth >= 5 ? -1 : nth };
}

function nthWeekdayOfMonth(y: number, m: number, weekday: number, nth: number): number | null {
	const last = lastDayOfMonth(y, m);
	if (nth === -1) {
		const lastWeekday = new Date(Date.UTC(y, m, last)).getUTCDay();
		return last - ((lastWeekday - weekday + 7) % 7);
	}
	const firstWeekday = new Date(Date.UTC(y, m, 1)).getUTCDay();
	const day = 1 + ((weekday - firstWeekday + 7) % 7) + (nth - 1) * 7;
	return day <= last ? day : null;
}

function durationOf(event: ChurchEvent, startMs: number) {
	const endMs = event.end ? Date.parse(event.end) : NaN;
	return Number.isFinite(endMs) && endMs > startMs ? endMs - startMs : 0;
}

/** Expands a (possibly recurring) event into concrete occurrences within [fromMs, toMs]. */
export function expandEvent(event: ChurchEvent, fromMs: number, toMs: number): EventOccurrence[] {
	const startMs = Date.parse(event.start);
	if (!Number.isFinite(startMs)) return [];

	const duration = durationOf(event, startMs);
	const { frequency, until, exclude = [] } = event.recurrence;
	const untilMs = until ? fromLocal(...parseDayKey(until), 23, 59, 59).getTime() : Infinity;
	const limit = Math.min(toMs, untilMs);
	const excluded = new Set(exclude);
	const out: EventOccurrence[] = [];

	const push = (s: number) => {
		if (s + duration < fromMs || s > toMs) return;
		const day = dayKey(s);
		if (excluded.has(day)) return;
		out.push({
			key: `${event.id}-${day}`,
			day,
			start: new Date(s).toISOString(),
			end: duration ? new Date(s + duration).toISOString() : undefined,
			event,
		});
	};

	if (frequency === 'none') {
		push(startMs);
		return out;
	}

	if (frequency === 'weekly' || frequency === 'fortnightly') {
		const step = (frequency === 'weekly' ? 7 : 14) * DAY_MS;
		let i = Math.max(0, Math.floor((fromMs - duration - startMs) / step));
		for (let n = 0; n < MAX_OCCURRENCES; n++, i++) {
			const s = startMs + i * step;
			if (s > limit) break;
			push(s);
		}
		return out;
	}

	const local = toLocal(startMs);
	const [y, m, d] = [local.getUTCFullYear(), local.getUTCMonth(), local.getUTCDate()];
	const [h, min] = [local.getUTCHours(), local.getUTCMinutes()];
	const { weekday, nth } = weekdayOrdinal(startMs);
	const windowStart = toLocal(fromMs - duration);
	let i = Math.max(0, (windowStart.getUTCFullYear() - y) * 12 + windowStart.getUTCMonth() - m - 1);

	for (let n = 0; n < MAX_OCCURRENCES; n++, i++) {
		const ty = y + Math.floor((m + i) / 12);
		const tm = (m + i) % 12;
		if (fromLocal(ty, tm, 1).getTime() > limit) break;
		const day =
			frequency === 'monthlyDate'
				? d <= lastDayOfMonth(ty, tm) ? d : null
				: nthWeekdayOfMonth(ty, tm, weekday, nth);
		if (day == null) continue;
		const s = fromLocal(ty, tm, day, h, min).getTime();
		if (s < startMs) continue;
		if (s > limit) break;
		push(s);
	}
	return out;
}

export function occurrencesBetween(events: ChurchEvent[], fromMs: number, toMs: number): EventOccurrence[] {
	return events
		.flatMap((e) => expandEvent(e, fromMs, toMs))
		.sort((a, b) => a.start.localeCompare(b.start));
}

export function upcomingOccurrences(events: ChurchEvent[], limit: number, nowMs = Date.now()) {
	return occurrencesBetween(events, nowMs, nowMs + 400 * DAY_MS).slice(0, limit);
}

/** The next (or current) occurrence of an event, else its most recent one. */
export function nextOccurrence(event: ChurchEvent, nowMs = Date.now()): EventOccurrence | undefined {
	const future = expandEvent(event, nowMs, nowMs + 800 * DAY_MS)[0];
	if (future) return future;
	const past = expandEvent(event, Date.parse(event.start) - DAY_MS, nowMs);
	return past[past.length - 1];
}

export function toCalendarItem(o: EventOccurrence): CalendarItem {
	return {
		key: o.key,
		day: o.day,
		start: o.start,
		end: o.end,
		allDay: o.event.allDay,
		slug: o.event.slug,
		title: o.event.title,
		location: o.event.location,
		category: o.event.category,
		cancelled: o.event.cancelled,
	};
}

export function describeRecurrence(event: ChurchEvent): string | null {
	const { frequency, until } = event.recurrence;
	if (frequency === 'none') return null;
	const startMs = Date.parse(event.start);
	const local = toLocal(startMs);
	const dayName = weekdayName(local.getUTCDay());
	const { nth } = weekdayOrdinal(startMs);
	const ordinal = nth === -1 ? 'last' : ['first', 'second', 'third', 'fourth'][nth - 1];
	const base = {
		weekly: `Every ${dayName}`,
		fortnightly: `Every other ${dayName}`,
		monthlyDate: `Monthly on day ${local.getUTCDate()}`,
		monthlyWeekday: `Every ${ordinal} ${dayName} of the month`,
	}[frequency];
	return until ? `${base}, until ${formatDayKey(until)}` : base;
}

/* ------------------------------------------------------------------ */
/* iCalendar (.ics)                                                    */
/* ------------------------------------------------------------------ */

const compact = (iso: string) => iso.replace(/[-:]/g, '').replace(/\.\d{3}/, '');
const icsUtc = (msValue: number) => compact(new Date(msValue).toISOString());
const icsLocal = (msValue: number) => compact(toLocal(msValue).toISOString()).replace('Z', '');
const icsDate = (msValue: number) => dayKey(msValue).replace(/-/g, '');

const escapeText = (s: string) =>
	s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');

/** Folds a content line to the 75-octet limit required by RFC 5545. */
function fold(line: string): string {
	const encoder = new TextEncoder();
	const parts: string[] = [];
	let current = '';
	let bytes = 0;
	for (const char of line) {
		const size = encoder.encode(char).length;
		const max = parts.length === 0 ? 75 : 74;
		if (bytes + size > max) {
			parts.push(current);
			current = '';
			bytes = 0;
		}
		current += char;
		bytes += size;
	}
	parts.push(current);
	return parts.join('\r\n ');
}

function nextLocalDay(msValue: number) {
	const [y, m, d] = parseDayKey(dayKey(msValue));
	return fromLocal(y, m, d + 1).getTime();
}

function vevent(event: ChurchEvent, siteUrl: string, stamp: string, fallbackLocation: string): string[] {
	const startMs = Date.parse(event.start);
	const duration = durationOf(event, startMs) || (event.allDay ? 0 : 90 * 60 * 1000);
	const host = new URL(siteUrl).host;
	const lines = ['BEGIN:VEVENT', `UID:${event.id}@${host}`, `DTSTAMP:${stamp}`];

	if (event.allDay) {
		lines.push(`DTSTART;VALUE=DATE:${icsDate(startMs)}`);
		lines.push(`DTEND;VALUE=DATE:${icsDate(nextLocalDay(startMs + duration))}`);
	} else {
		lines.push(`DTSTART;TZID=${TIME_ZONE}:${icsLocal(startMs)}`);
		lines.push(`DTEND;TZID=${TIME_ZONE}:${icsLocal(startMs + duration)}`);
	}

	const { frequency, until, exclude = [] } = event.recurrence;
	if (frequency !== 'none') {
		const local = toLocal(startMs);
		const { weekday, nth } = weekdayOrdinal(startMs);
		let rule = {
			weekly: 'FREQ=WEEKLY',
			fortnightly: 'FREQ=WEEKLY;INTERVAL=2',
			monthlyDate: `FREQ=MONTHLY;BYMONTHDAY=${local.getUTCDate()}`,
			monthlyWeekday: `FREQ=MONTHLY;BYDAY=${nth}${WEEKDAYS[weekday]}`,
		}[frequency];
		if (until) {
			const untilMs = fromLocal(...parseDayKey(until), 23, 59, 59).getTime();
			rule += event.allDay ? `;UNTIL=${until.replace(/-/g, '')}` : `;UNTIL=${icsUtc(untilMs)}`;
		}
		lines.push(`RRULE:${rule}`);
		const [h, min] = [local.getUTCHours(), local.getUTCMinutes()];
		for (const day of exclude) {
			const [y, m, d] = parseDayKey(day);
			lines.push(
				event.allDay
					? `EXDATE;VALUE=DATE:${day.replace(/-/g, '')}`
					: `EXDATE;TZID=${TIME_ZONE}:${icsLocal(fromLocal(y, m, d, h, min).getTime())}`,
			);
		}
	}

	const url = `${siteUrl}/events/${event.slug}`;
	lines.push(`SUMMARY:${escapeText(event.cancelled ? `CANCELLED: ${event.title}` : event.title)}`);
	lines.push(`DESCRIPTION:${escapeText([event.summary, url].filter(Boolean).join('\n\n'))}`);
	lines.push(`LOCATION:${escapeText(event.location || fallbackLocation)}`);
	lines.push(`URL:${url}`);
	lines.push(`STATUS:${event.cancelled ? 'CANCELLED' : 'CONFIRMED'}`);
	lines.push('END:VEVENT');
	return lines;
}

export function buildIcs(events: ChurchEvent[], opts: { siteUrl: string; calendarName: string; location: string }): string {
	const stamp = icsUtc(Date.now());
	const lines = [
		'BEGIN:VCALENDAR',
		'VERSION:2.0',
		"PRODID:-//ACK St Stephen's Cathedral Kisumu//Events//EN",
		'CALSCALE:GREGORIAN',
		'METHOD:PUBLISH',
		`X-WR-CALNAME:${escapeText(opts.calendarName)}`,
		`X-WR-TIMEZONE:${TIME_ZONE}`,
		'BEGIN:VTIMEZONE',
		`TZID:${TIME_ZONE}`,
		'BEGIN:STANDARD',
		'DTSTART:19700101T000000',
		'TZOFFSETFROM:+0300',
		'TZOFFSETTO:+0300',
		'TZNAME:EAT',
		'END:STANDARD',
		'END:VTIMEZONE',
		...events.flatMap((e) => vevent(e, opts.siteUrl, stamp, opts.location)),
		'END:VCALENDAR',
	];
	return lines.map(fold).join('\r\n') + '\r\n';
}

export function googleCalendarUrl(o: EventOccurrence, siteUrl: string, fallbackLocation: string): string {
	const startMs = Date.parse(o.start);
	const endMs = o.end ? Date.parse(o.end) : startMs + 90 * 60 * 1000;
	const dates = o.event.allDay
		? `${icsDate(startMs)}/${icsDate(nextLocalDay(endMs))}`
		: `${icsUtc(startMs)}/${icsUtc(endMs)}`;
	const params = new URLSearchParams({
		action: 'TEMPLATE',
		text: o.event.title,
		dates,
		details: `${o.event.summary}\n\n${siteUrl}/events/${o.event.slug}`,
		location: o.event.location || fallbackLocation,
		ctz: TIME_ZONE,
	});
	return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
