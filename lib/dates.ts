/**
 * All dates on the site are shown in Kenyan time. East Africa Time is UTC+3
 * all year round (no daylight saving), so a fixed offset is exact.
 *
 * Formatting is done by hand rather than with Intl so the server and every
 * browser produce identical strings (no hydration mismatches).
 */
export const TIME_ZONE = 'Africa/Nairobi';
const OFFSET_MS = 3 * 60 * 60 * 1000;
export const DAY_MS = 24 * 60 * 60 * 1000;

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

type DateInput = Date | string | number;

const ms = (d: DateInput) => (typeof d === 'number' ? d : typeof d === 'string' ? Date.parse(d) : d.getTime());

/** A Date whose UTC fields read as Nairobi wall-clock time. */
export function toLocal(d: DateInput): Date {
	return new Date(ms(d) + OFFSET_MS);
}

/** Real instant for a Nairobi wall-clock time (month is 0-based). */
export function fromLocal(y: number, m: number, d: number, h = 0, min = 0, s = 0): Date {
	return new Date(Date.UTC(y, m, d, h, min, s) - OFFSET_MS);
}

/** YYYY-MM-DD in Nairobi time. */
export function dayKey(d: DateInput): string {
	return toLocal(d).toISOString().slice(0, 10);
}

/** [year, monthIndex, day] from a YYYY-MM-DD key. */
export function parseDayKey(key: string): [number, number, number] {
	const [y, m, d] = key.split('-').map(Number);
	return [y, m - 1, d];
}

export const weekdayName = (index: number) => WEEKDAYS[index];
export const monthName = (index: number) => MONTHS[index];

export function formatLongDate(d: DateInput): string {
	const l = toLocal(d);
	return `${WEEKDAYS[l.getUTCDay()]} ${l.getUTCDate()} ${MONTHS[l.getUTCMonth()]} ${l.getUTCFullYear()}`;
}

export function formatMediumDate(d: DateInput): string {
	const l = toLocal(d);
	return `${WEEKDAYS[l.getUTCDay()].slice(0, 3)} ${l.getUTCDate()} ${MONTHS[l.getUTCMonth()].slice(0, 3)}`;
}

export function formatShortDate(d: DateInput): string {
	const l = toLocal(d);
	return `${l.getUTCDate()} ${MONTHS[l.getUTCMonth()].slice(0, 3)} ${l.getUTCFullYear()}`;
}

export function formatTime(d: DateInput): string {
	const l = toLocal(d);
	const h = l.getUTCHours();
	const min = String(l.getUTCMinutes()).padStart(2, '0');
	return `${h % 12 || 12}:${min} ${h < 12 ? 'am' : 'pm'}`;
}

export const formatMonthShort = (d: DateInput) => MONTHS[toLocal(d).getUTCMonth()].slice(0, 3);
export const formatDayNumber = (d: DateInput) => String(toLocal(d).getUTCDate());
export const formatMonthYear = (y: number, m: number) => `${MONTHS[m]} ${y}`;

/** Formats a YYYY-MM-DD key (e.g. a sermon date) without timezone drift. */
export function formatDayKey(key: string, style: 'long' | 'short' = 'short'): string {
	const [y, m, d] = parseDayKey(key);
	const instant = fromLocal(y, m, d, 12);
	return style === 'long' ? formatLongDate(instant) : formatShortDate(instant);
}

export function formatTimeRange(start: string, end: string | undefined, allDay: boolean): string {
	if (allDay) {
		return end && dayKey(start) !== dayKey(end) ? `All day, until ${formatMediumDate(end)}` : 'All day';
	}
	if (!end) return formatTime(start);
	if (dayKey(start) !== dayKey(end)) {
		return `${formatTime(start)} – ${formatMediumDate(end)}, ${formatTime(end)}`;
	}
	return `${formatTime(start)} – ${formatTime(end)}`;
}
