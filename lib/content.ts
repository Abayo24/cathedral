/**
 * Server-side content access. Every getter reads from Sanity and falls back to
 * the built-in content in lib/data.ts when the CMS has nothing to offer.
 */
import { cache } from 'react';
import { sanityFetch } from '@/sanity/lib/client';
import * as q from '@/sanity/lib/queries';
import { ACCOUNTS, FALLBACK_ALBUMS, FAQS, LEADERSHIP, MINISTRIES, SERMONS, SERVICE_SCHEDULE, SETTINGS } from './data';
import { DAY_MS } from './dates';
import type {
	Album,
	Announcement,
	Bulletin,
	ChurchEvent,
	Faq,
	GivingAccount,
	Img,
	Leader,
	Ministry,
	ServiceSchedule,
	Sermon,
	SiteSettings,
} from './types';

interface RawImage {
	src?: string;
	alt?: string;
	caption?: string;
	blur?: string;
	hotspot?: { x: number; y: number };
}

function toImg(raw: RawImage | null | undefined, fallbackAlt: string): Img | null {
	if (!raw?.src) return null;
	return {
		src: raw.src,
		alt: raw.alt || raw.caption || fallbackAlt,
		blur: raw.blur,
		position: raw.hotspot ? `${Math.round(raw.hotspot.x * 100)}% ${Math.round(raw.hotspot.y * 100)}%` : undefined,
	};
}

export const slugify = (s: string) =>
	s
		.toLowerCase()
		.normalize('NFKD')
		.replace(/[̀-ͯ]/g, '')
		.replace(/['’]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')
		.slice(0, 96);

/** Treat blank strings from the CMS as "not set". */
const pick = <T,>(value: T | null | undefined | '', fallback: T): T =>
	value === null || value === undefined || value === '' ? fallback : value;

/* ------------------------------------------------------------------ */

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
	const raw = await sanityFetch<Record<string, any>>(q.settingsQuery);
	if (!raw) return SETTINGS;
	const phone = pick<string>(raw.phone, SETTINGS.phone);
	const digits = phone.replace(/\D/g, '');
	return {
		name: pick(raw.name, SETTINGS.name),
		shortName: pick(raw.shortName, SETTINGS.shortName),
		tagline: pick(raw.tagline, SETTINGS.tagline),
		description: pick(raw.description, SETTINGS.description),
		phone,
		phoneIntl: digits.startsWith('0') ? `+254${digits.slice(1)}` : `+${digits}`,
		whatsapp: raw.whatsapp || undefined,
		emails: raw.emails?.length ? raw.emails : SETTINGS.emails,
		address: {
			street: raw.street || undefined,
			poBox: pick(raw.poBox, SETTINGS.address.poBox),
			locality: pick(raw.locality, SETTINGS.address.locality),
			region: pick(raw.region, SETTINGS.address.region),
			postalCode: pick(raw.postalCode, SETTINGS.address.postalCode),
			country: 'KE',
		},
		officeHours: raw.officeHours || undefined,
		mapQuery: pick(raw.mapQuery, SETTINGS.mapQuery),
		geo: raw.geo?.lat && raw.geo?.lng ? { lat: raw.geo.lat, lng: raw.geo.lng } : undefined,
		social: {
			facebook: raw.facebook || undefined,
			youtube: raw.youtube || undefined,
			instagram: raw.instagram || undefined,
			x: raw.x || undefined,
			tiktok: raw.tiktok || undefined,
		},
		livestreamUrl: pick(raw.livestreamUrl, raw.facebook || SETTINGS.livestreamUrl),
		paybill: pick(raw.paybill, SETTINGS.paybill),
		hero: {
			eyebrow: pick(raw.heroEyebrow, SETTINGS.hero.eyebrow),
			titleLine1: pick(raw.heroTitleLine1, SETTINGS.hero.titleLine1),
			titleLine2: pick(raw.heroTitleLine2, SETTINGS.hero.titleLine2),
			text: pick(raw.heroText, SETTINGS.hero.text),
			image: toImg(raw.heroImage, SETTINGS.hero.image.alt) ?? SETTINGS.hero.image,
		},
	};
});

export const getServiceSchedule = cache(async (): Promise<ServiceSchedule> => {
	const raw = await sanityFetch<Partial<ServiceSchedule>>(q.serviceScheduleQuery);
	if (!raw) return SERVICE_SCHEDULE;
	return {
		adult: raw.adult?.length ? raw.adult : SERVICE_SCHEDULE.adult,
		specialised: raw.specialised?.length ? raw.specialised : SERVICE_SCHEDULE.specialised,
		communion: raw.communion?.length ? raw.communion : SERVICE_SCHEDULE.communion,
		note: raw.note || undefined,
	};
});

export const getLeaders = cache(async (): Promise<Leader[]> => {
	const raw = await sanityFetch<(Omit<Leader, 'image'> & { photo?: RawImage })[]>(q.leadersQuery);
	if (!raw) return LEADERSHIP;
	return raw.map((l) => ({ name: l.name, role: l.role, bio: l.bio || '', image: toImg(l.photo, l.name) }));
});

export const getMinistries = cache(async (): Promise<Ministry[]> => {
	const raw = await sanityFetch<(Omit<Ministry, 'image'> & { image?: RawImage })[]>(q.ministriesQuery);
	if (!raw) return MINISTRIES;
	return raw.map((m) => ({
		...m,
		description: m.description || '',
		image: toImg(m.image, m.name) ?? { src: '/choir.jpg', alt: m.name },
	}));
});

export const getGivingAccounts = cache(async (): Promise<GivingAccount[]> => {
	return (await sanityFetch<GivingAccount[]>(q.givingAccountsQuery)) ?? ACCOUNTS;
});

export const getFaqs = cache(async (): Promise<Faq[]> => {
	return (await sanityFetch<Faq[]>(q.faqsQuery)) ?? FAQS;
});

export const getSermons = cache(async (): Promise<Sermon[]> => {
	const raw = await sanityFetch<(Omit<Sermon, 'image'> & { image?: RawImage })[]>(q.sermonsQuery);
	if (!raw) return SERMONS;
	return raw.map((s) => ({ ...s, image: toImg(s.image, s.title) ?? { src: '/sermon.jpg', alt: s.title } }));
});

function toEvent(raw: Record<string, any>): ChurchEvent {
	return {
		id: raw.id,
		slug: raw.slug,
		title: raw.title || 'Untitled event',
		summary: raw.summary || '',
		body: raw.body || undefined,
		start: raw.start,
		end: raw.end || undefined,
		allDay: Boolean(raw.allDay),
		location: raw.location || undefined,
		category: raw.category || undefined,
		image: toImg(raw.image, raw.title) ?? undefined,
		registrationUrl: raw.registrationUrl || undefined,
		contact: raw.contact || undefined,
		featured: Boolean(raw.featured),
		cancelled: Boolean(raw.cancelled),
		recurrence: {
			frequency: raw.recurrence?.frequency || 'none',
			until: raw.recurrence?.until || undefined,
			exclude: raw.recurrence?.exclude || [],
		},
	};
}

export const getEvents = cache(async (): Promise<ChurchEvent[]> => {
	const since = new Date(Date.now() - 120 * DAY_MS).toISOString();
	const raw = await sanityFetch<Record<string, any>[]>(q.eventsQuery, { since });
	return raw ? raw.map(toEvent) : [];
});

export const getEventBySlug = cache(async (slug: string): Promise<ChurchEvent | null> => {
	const raw = await sanityFetch<Record<string, any>>(q.eventBySlugQuery, { slug });
	return raw ? toEvent(raw) : null;
});

export const getEventSlugs = async () => (await sanityFetch<string[]>(q.eventSlugsQuery)) ?? [];

export const getAnnouncements = cache(async (): Promise<Announcement[]> => {
	return (await sanityFetch<Announcement[]>(q.announcementsQuery)) ?? [];
});

export const getBulletins = cache(async (): Promise<Bulletin[]> => {
	return (await sanityFetch<Bulletin[]>(q.bulletinsQuery)) ?? [];
});

export const getAlbums = cache(async (): Promise<Album[]> => {
	const raw = await sanityFetch<Record<string, any>[]>(q.albumsQuery);
	if (!raw) return FALLBACK_ALBUMS;
	const seen = new Set<string>();
	return raw.map((a) => {
		const title = a.title || 'Untitled album';
		let slug = a.slug || slugify(title) || a.id;
		if (seen.has(slug)) slug = `${slug}-${a.id.slice(-6)}`;
		seen.add(slug);
		const images = (a.images as RawImage[])
			.map((image, i) => toImg(image, `${title} — photo ${i + 1}`))
			.filter((image): image is Img => image !== null);
		return {
			id: a.id,
			slug,
			title,
			category: a.category || undefined,
			date: a.date || undefined,
			description: a.description || undefined,
			cover: toImg(a.coverImage, title) ?? images[0],
			images,
		};
	}).filter((a) => a.images.length > 0);
});

export const getAlbumBySlug = cache(async (slug: string) => {
	return (await getAlbums()).find((a) => a.slug === slug) ?? null;
});
