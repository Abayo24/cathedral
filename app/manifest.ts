import type { MetadataRoute } from 'next';
import { SETTINGS } from '@/lib/data';

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: SETTINGS.name,
		short_name: "St. Stephen's",
		description: SETTINGS.description,
		start_url: '/',
		display: 'standalone',
		background_color: '#faf7f2',
		theme_color: '#0F3872',
		icons: [
			{ src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
			{ src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
			{ src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
		],
	};
}
