import type { Metadata } from 'next';

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://ststephenscathedralkisumu.org').replace(/\/$/, '');
export const SITE_NAME = "ACK St. Stephen's Cathedral Kisumu";
export const DEFAULT_OG_IMAGE = '/og.jpg';

interface PageMetaInput {
	title: string;
	description: string;
	path: string;
	image?: string;
	type?: 'website' | 'article';
	noIndex?: boolean;
	/** Skip the "| St. Stephen's Cathedral Kisumu" suffix (for titles that already name the church). */
	absoluteTitle?: boolean;
}

/**
 * Next merges metadata shallowly, so each page must restate openGraph/twitter
 * in full — this helper keeps that consistent.
 */
export function pageMetadata({ title, description, path, image, type = 'website', noIndex, absoluteTitle }: PageMetaInput): Metadata {
	const images = [{ url: image || DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: title }];
	return {
		title: absoluteTitle ? { absolute: title } : title,
		description,
		alternates: { canonical: path },
		openGraph: { title, description, url: path, siteName: SITE_NAME, locale: 'en_KE', type, images },
		twitter: { card: 'summary_large_image', title, description, images: images.map((i) => i.url) },
		...(noIndex ? { robots: { index: false, follow: true } } : {}),
	};
}

export const absoluteUrl = (path: string) => (path.startsWith('http') ? path : `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`);
