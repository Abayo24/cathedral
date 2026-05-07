import type { Metadata } from 'next';
import { Cormorant_Garamond, Libre_Baskerville, Jost } from 'next/font/google';
import { Navigation } from '@/components/Navigation';
// @ts-ignore: Next.js handles this global CSS side-effect import
import './globals.css';

const cormorant = Cormorant_Garamond({
	subsets: ['latin'],
	weight: ['300', '400', '500', '600'],
	style: ['normal', 'italic'],
	variable: '--font-cormorant',
});
const baskerville = Libre_Baskerville({
	subsets: ['latin'],
	weight: ['400', '700'],
	style: ['normal', 'italic'],
	variable: '--font-baskerville',
});
const jost = Jost({
	subsets: ['latin'],
	weight: ['300', '400', '500', '600'],
	variable: '--font-jost',
});

export const metadata: Metadata = {
  title: "St Stephens Cathedral Kisumu | Anglican Church Kenya Maseno South",
  description:
    "Official website of St Stephens Cathedral Kisumu (ACK). Find service times, church events, sermons, and community updates in Kisumu.",
  keywords: [
    "St Stephens Cathedral Kisumu",
    "ACK Kisumu",
    "Anglican Church Kisumu",
    "churches in Kisumu",
  ],
  icons: {
    icon: "/icon.png",
  },
  openGraph: {
    title: "St Stephens Cathedral Kisumu",
    description:
      "A wholesome Christian ministry for the glory of God.",
    url: "https://ststephenscathedralkisumu.org",
    siteName: "St Stephens Cathedral Kisumu",
  },
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang='en'
			className={`${cormorant.variable} ${baskerville.variable} ${jost.variable}`}
		>
			<body>
				<Navigation />
				<main>{children}</main>
			</body>
		</html>
	);
}
