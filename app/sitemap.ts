import type { MetadataRoute } from 'next';
import { getAlbums, getEvents } from '@/lib/content';
import { SITE_URL } from '@/lib/seo';

export const revalidate = 3600;

const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
	{ path: '/', priority: 1, changeFrequency: 'daily' },
	{ path: '/services', priority: 0.9, changeFrequency: 'monthly' },
	{ path: '/events', priority: 0.9, changeFrequency: 'daily' },
	{ path: '/visit', priority: 0.8, changeFrequency: 'monthly' },
	{ path: '/bulletins', priority: 0.7, changeFrequency: 'weekly' },
	{ path: '/about', priority: 0.7, changeFrequency: 'yearly' },
	{ path: '/ministries', priority: 0.7, changeFrequency: 'monthly' },
	{ path: '/sermons', priority: 0.6, changeFrequency: 'weekly' },
	{ path: '/gallery', priority: 0.6, changeFrequency: 'weekly' },
	{ path: '/give', priority: 0.6, changeFrequency: 'yearly' },
	{ path: '/contact', priority: 0.6, changeFrequency: 'yearly' },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const [events, albums] = await Promise.all([getEvents(), getAlbums()]);
	const now = new Date();

	return [
		...staticRoutes.map(({ path, priority, changeFrequency }) => ({
			url: `${SITE_URL}${path}`,
			lastModified: now,
			changeFrequency,
			priority,
		})),
		...events.map((e) => ({ url: `${SITE_URL}/events/${e.slug}`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.6 })),
		...albums.map((a) => ({ url: `${SITE_URL}/gallery/${a.slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.4 })),
	];
}
