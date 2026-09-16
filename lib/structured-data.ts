import type { Album, EventOccurrence, Faq, ServiceSchedule, SiteSettings } from './types';
import { absoluteUrl, DEFAULT_OG_IMAGE, SITE_URL } from './seo';

const CHURCH_ID = `${SITE_URL}/#church`;

/**
 * Public references to this exact church. They tell search engines that the
 * site and the known "St Stephen's Cathedral, Kisumu" entity are the same
 * place, which is what earns the knowledge panel and map placement.
 */
const ENTITY_REFERENCES = [
	"https://en.wikipedia.org/wiki/St_Stephen's_Cathedral,_Kisumu",
	'https://www.wikidata.org/wiki/Q86752551',
];

const TIME_RANGE = /(\d{1,2})(?::(\d{2}))?\s*(am|pm)?\s*(?:–|—|-|to)\s*(\d{1,2})(?::(\d{2}))?\s*(am|pm)/gi;

/** Turns "7:00 – 8:30 am" into { opens: '07:00', closes: '08:30' }. */
function parseRanges(text: string) {
	const ranges: { opens: string; closes: string }[] = [];
	for (const match of Array.from(text.matchAll(TIME_RANGE))) {
		const [, h1, m1 = '00', ap1, h2, m2 = '00', ap2] = match;
		const to24 = (hour: string, meridiem?: string) => {
			const period = (meridiem || ap2 || '').toLowerCase();
			const n = Number(hour) % 12;
			return String(period === 'pm' ? n + 12 : n).padStart(2, '0');
		};
		ranges.push({ opens: `${to24(h1, ap1)}:${m1}`, closes: `${to24(h2, ap2)}:${m2}` });
	}
	return ranges;
}

function openingHours(schedule: ServiceSchedule) {
	const specs: { '@type': string; dayOfWeek: string; opens: string; closes: string }[] = [];

	const sunday = [...schedule.adult, ...schedule.specialised].flatMap((s) => parseRanges(s.time));
	if (sunday.length) {
		specs.push({
			'@type': 'OpeningHoursSpecification',
			dayOfWeek: 'https://schema.org/Sunday',
			opens: sunday.reduce((a, b) => (a.opens < b.opens ? a : b)).opens,
			closes: sunday.reduce((a, b) => (a.closes > b.closes ? a : b)).closes,
		});
	}

	for (const slot of schedule.communion) {
		const day = /wednesday/i.test(slot.label) ? 'Wednesday' : null;
		if (!day) continue;
		for (const range of parseRanges(slot.time)) {
			specs.push({ '@type': 'OpeningHoursSpecification', dayOfWeek: `https://schema.org/${day}`, ...range });
		}
	}
	return specs;
}

function postalAddress(s: SiteSettings) {
	return {
		'@type': 'PostalAddress',
		...(s.address.street ? { streetAddress: s.address.street } : {}),
		postOfficeBoxNumber: s.address.poBox.replace(/^P\.?\s*O\.?\s*Box\s*/i, ''),
		addressLocality: s.address.locality,
		addressRegion: s.address.region,
		postalCode: s.address.postalCode,
		addressCountry: s.address.country,
	};
}

export function mapUrl(s: SiteSettings) {
	return s.geo
		? `https://www.google.com/maps/search/?api=1&query=${s.geo.lat},${s.geo.lng}`
		: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.mapQuery)}`;
}

export function churchJsonLd(s: SiteSettings, schedule?: ServiceSchedule) {
	const sameAs = [...Object.values(s.social).filter(Boolean), ...ENTITY_REFERENCES];
	const hours = schedule ? openingHours(schedule) : [];
	return {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': ['Church', 'Organization'],
				'@id': CHURCH_ID,
				name: s.name,
				alternateName: ['Komulo', "St Stephen's Cathedral Kisumu", 'St Stephens Cathedral Kisumu', "ACK St. Stephen's Cathedral"],
				description: s.description,
				slogan: s.tagline,
				url: SITE_URL,
				logo: absoluteUrl('/logo.png'),
				image: absoluteUrl(DEFAULT_OG_IMAGE),
				telephone: s.phoneIntl,
				email: s.emails[0],
				foundingDate: '1913',
				address: postalAddress(s),
				...(s.geo ? { geo: { '@type': 'GeoCoordinates', latitude: s.geo.lat, longitude: s.geo.lng } } : {}),
				hasMap: mapUrl(s),
				isAccessibleForFree: true,
				publicAccess: true,
				...(hours.length ? { openingHoursSpecification: hours } : {}),
				areaServed: [
					{ '@type': 'City', name: s.address.locality },
					{ '@type': 'AdministrativeArea', name: s.address.region },
				],
				containedInPlace: { '@type': 'City', name: s.address.locality, address: { '@type': 'PostalAddress', addressCountry: 'KE' } },
				parentOrganization: { '@type': 'Organization', name: 'Anglican Church of Kenya — Diocese of Maseno South' },
				...(sameAs.length ? { sameAs } : {}),
			},
			{
				'@type': 'WebSite',
				'@id': `${SITE_URL}/#website`,
				url: SITE_URL,
				name: s.name,
				inLanguage: 'en-KE',
				publisher: { '@id': CHURCH_ID },
			},
		],
	};
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			name: item.name,
			item: absoluteUrl(item.path),
		})),
	};
}

export function faqJsonLd(faqs: Faq[]) {
	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqs.map((f) => ({
			'@type': 'Question',
			name: f.question,
			acceptedAnswer: { '@type': 'Answer', text: f.answer },
		})),
	};
}

export function eventJsonLd(o: EventOccurrence, s: SiteSettings) {
	const e = o.event;
	return {
		'@context': 'https://schema.org',
		'@type': 'Event',
		name: e.title,
		description: e.summary,
		startDate: e.allDay ? o.day : o.start,
		...(o.end ? { endDate: e.allDay ? o.end.slice(0, 10) : o.end } : {}),
		eventStatus: e.cancelled ? 'https://schema.org/EventCancelled' : 'https://schema.org/EventScheduled',
		eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
		location: {
			'@type': 'Place',
			name: e.location || s.name,
			address: postalAddress(s),
		},
		image: [e.image ? absoluteUrl(e.image.src) : absoluteUrl(DEFAULT_OG_IMAGE)],
		organizer: { '@type': 'Organization', name: s.name, url: SITE_URL },
		url: absoluteUrl(`/events/${e.slug}`),
		isAccessibleForFree: true,
	};
}

export function albumJsonLd(album: Album) {
	return {
		'@context': 'https://schema.org',
		'@type': 'ImageGallery',
		name: album.title,
		...(album.description ? { description: album.description } : {}),
		url: absoluteUrl(`/gallery/${album.slug}`),
		image: album.images.slice(0, 20).map((img) => ({
			'@type': 'ImageObject',
			contentUrl: absoluteUrl(img.src),
			...(img.alt ? { caption: img.alt } : {}),
		})),
	};
}
