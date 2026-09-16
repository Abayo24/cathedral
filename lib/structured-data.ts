import type { Album, EventOccurrence, Faq, SiteSettings } from './types';
import { absoluteUrl, DEFAULT_OG_IMAGE, SITE_URL } from './seo';

const CHURCH_ID = `${SITE_URL}/#church`;

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

export function churchJsonLd(s: SiteSettings) {
	const sameAs = Object.values(s.social).filter(Boolean);
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
