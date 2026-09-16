import type { PortableTextBlock } from '@portabletext/types';

/** A display-ready image, from either /public or the Sanity CDN. */
export interface Img {
	src: string;
	alt: string;
	/** Tiny base64 placeholder (Sanity LQIP). */
	blur?: string;
	/** CSS object-position derived from the Sanity hotspot. */
	position?: string;
}

export interface SocialLinks {
	facebook?: string;
	youtube?: string;
	instagram?: string;
	x?: string;
	tiktok?: string;
}

export interface SiteSettings {
	name: string;
	shortName: string;
	tagline: string;
	description: string;
	phone: string;
	/** E.164 format, used for tel: links and structured data. */
	phoneIntl: string;
	whatsapp?: string;
	emails: string[];
	address: {
		street?: string;
		poBox: string;
		locality: string;
		region: string;
		postalCode: string;
		country: string;
	};
	officeHours?: string;
	mapQuery: string;
	geo?: { lat: number; lng: number };
	social: SocialLinks;
	livestreamUrl: string;
	paybill: string;
	hero: {
		eyebrow: string;
		titleLine1: string;
		titleLine2: string;
		text: string;
		image: Img;
	};
}

export interface Leader {
	name: string;
	role: string;
	bio: string;
	image: Img | null;
}

export interface Ministry {
	name: string;
	abbr: string;
	description: string;
	image: Img;
	meets?: string;
	contact?: string;
}

export interface ServiceSlot {
	label: string;
	time: string;
	venue: string;
}

export interface ServiceSchedule {
	adult: ServiceSlot[];
	specialised: ServiceSlot[];
	communion: ServiceSlot[];
	note?: string;
}

export interface GivingAccount {
	id: string;
	tab: string;
	bank: string;
	branch: string;
	name: string;
	number: string;
	paybill: string;
	purpose: string;
	swift: string;
}

export interface Sermon {
	id: string;
	title: string;
	preacher: string;
	/** YYYY-MM-DD */
	date: string;
	scripture?: string;
	series?: string;
	summary?: string;
	image: Img;
	videoUrl?: string;
	audioUrl?: string;
	featured?: boolean;
}

export interface Faq {
	question: string;
	answer: string;
}

export interface Announcement {
	id: string;
	title: string;
	body: string;
	link?: string;
	linkLabel?: string;
	publishedAt: string;
	expiresAt?: string;
	pinned: boolean;
	showBanner: boolean;
}

export interface Bulletin {
	id: string;
	title: string;
	/** YYYY-MM-DD */
	date: string;
	fileUrl?: string;
	highlights: string[];
}

export type RecurrenceFrequency =
	| 'none'
	| 'weekly'
	| 'fortnightly'
	| 'monthlyDate'
	| 'monthlyWeekday';

export interface Recurrence {
	frequency: RecurrenceFrequency;
	/** YYYY-MM-DD, inclusive */
	until?: string;
	/** YYYY-MM-DD dates on which the event does not take place */
	exclude?: string[];
}

export interface ChurchEvent {
	id: string;
	slug: string;
	title: string;
	summary: string;
	body?: PortableTextBlock[];
	/** ISO datetime */
	start: string;
	/** ISO datetime */
	end?: string;
	allDay: boolean;
	location?: string;
	category?: string;
	image?: Img;
	registrationUrl?: string;
	contact?: string;
	recurrence: Recurrence;
	featured: boolean;
	cancelled: boolean;
}

export interface EventOccurrence {
	key: string;
	/** YYYY-MM-DD in Nairobi time */
	day: string;
	start: string;
	end?: string;
	event: ChurchEvent;
}

/** Slim, serialisable shape passed to the client-side calendar. */
export interface CalendarItem {
	key: string;
	day: string;
	start: string;
	end?: string;
	allDay: boolean;
	slug: string;
	title: string;
	location?: string;
	category?: string;
	cancelled: boolean;
}

export interface Album {
	id: string;
	slug: string;
	title: string;
	category?: string;
	date?: string;
	description?: string;
	cover: Img;
	images: Img[];
}
