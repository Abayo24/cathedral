import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Jost, Libre_Baskerville } from 'next/font/google';
import { SETTINGS } from '@/lib/data';
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from '@/lib/seo';

const cormorant = Cormorant_Garamond({
	subsets: ['latin'],
	weight: ['300', '400', '500'],
	style: ['normal', 'italic'],
	variable: '--font-cormorant',
	display: 'swap',
});
const baskerville = Libre_Baskerville({
	subsets: ['latin'],
	weight: ['400', '700'],
	style: ['normal', 'italic'],
	variable: '--font-baskerville',
	display: 'swap',
});
const jost = Jost({
	subsets: ['latin'],
	weight: ['400', '500', '600'],
	variable: '--font-jost',
	display: 'swap',
});

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: {
		default: "ACK St. Stephen's Cathedral Kisumu | Anglican Church, Diocese of Maseno South",
		template: "%s | St. Stephen's Cathedral Kisumu",
	},
	description: SETTINGS.description,
	applicationName: SITE_NAME,
	keywords: [
		"St Stephen's Cathedral Kisumu",
		'St Stephens Cathedral Kisumu',
		'ACK Kisumu',
		'Anglican Church Kisumu',
		'Diocese of Maseno South',
		'Komulo',
		'churches in Kisumu',
		'church services Kisumu',
		'Deaf church service Kisumu',
	],
	authors: [{ name: SITE_NAME, url: SITE_URL }],
	publisher: SITE_NAME,
	category: 'religion',
	alternates: { canonical: '/' },
	openGraph: {
		type: 'website',
		locale: 'en_KE',
		url: '/',
		siteName: SITE_NAME,
		title: SITE_NAME,
		description: SETTINGS.description,
		images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
	},
	twitter: { card: 'summary_large_image', title: SITE_NAME, description: SETTINGS.description, images: [DEFAULT_OG_IMAGE] },
	robots: {
		index: true,
		follow: true,
		googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
	},
	...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
		? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
		: {}),
};

export const viewport: Viewport = {
	themeColor: '#0F3872',
	width: 'device-width',
	initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en-KE' className={`${cormorant.variable} ${baskerville.variable} ${jost.variable}`}>
			<body>{children}</body>
		</html>
	);
}
