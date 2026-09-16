import { Giving } from '@/components/Giving';
import { PageHero } from '@/components/PageHero';
import { getGivingAccounts, getSiteSettings } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
	title: 'Give — Tithes & Offerings via M-Pesa or Bank',
	description:
		"Give to ACK St. Stephen's Cathedral Kisumu via M-Pesa Paybill 827450 or bank transfer. Tithes and offerings, development, welfare and bookshop accounts.",
	path: '/give',
});

export default async function GivePage() {
	const [accounts, settings] = await Promise.all([getGivingAccounts(), getSiteSettings()]);
	return (
		<>
			<PageHero
				label='Stewardship'
				title='Tithes & Offerings'
				subtitle="Support the mission of St. Stephen's Cathedral through your generous giving."
				img='/offering.jpg'
				breadcrumbs={[{ name: 'Give', path: '/give' }]}
			/>
			<Giving accounts={accounts} paybill={settings.paybill} />
		</>
	);
}
