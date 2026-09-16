import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { ContactForm } from '@/components/ContactForm';
import { PageHero } from '@/components/PageHero';
import { getSiteSettings } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';
import { mapUrl } from '@/lib/structured-data';

export const metadata = pageMetadata({
	title: 'Contact Us & Prayer Requests',
	description:
		"Contact ACK St. Stephen's Cathedral Kisumu by phone, email or online message. Send a prayer request, ask for pastoral care, or enquire about baptisms and weddings.",
	path: '/contact',
});

export default async function ContactPage() {
	const s = await getSiteSettings();

	const methods = [
		{ icon: Phone, label: 'Call', value: s.phone, href: `tel:${s.phoneIntl}` },
		...(s.whatsapp
			? [{ icon: MessageCircle, label: 'WhatsApp', value: s.whatsapp, href: `https://wa.me/${s.whatsapp.replace(/\D/g, '')}` }]
			: []),
		...s.emails.map((email) => ({ icon: Mail, label: 'Email', value: email, href: `mailto:${email}` })),
		{ icon: MapPin, label: 'Visit', value: `${s.address.poBox} – ${s.address.postalCode}, ${s.address.locality}`, href: mapUrl(s) },
	];

	return (
		<>
			<PageHero
				label='Get in Touch'
				title='Contact & Prayer Requests'
				subtitle="We'd love to hear from you — and we'd be honoured to pray with you."
				img='/faith.jpg'
				breadcrumbs={[{ name: 'Contact', path: '/contact' }]}
			/>
			<section className='section-pad bg-ivory'>
				<div className='container-main grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-12 items-start'>
					<div>
						<p className='label-tag'>Cathedral Office</p>
						<h2 className='section-title !text-4xl'>Reach Us Directly</h2>
						<ul className='space-y-3 mt-6'>
							{methods.map(({ icon: Icon, label, value, href }) => (
								<li key={`${label}-${value}`}>
									<a
										href={href}
										{...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
										className='flex items-center gap-4 rounded-2xl bg-white border border-parchment/70 p-4 hover:border-royal transition-colors no-underline group'
									>
										<span className='w-11 h-11 rounded-full bg-crimson/10 text-crimson flex items-center justify-center flex-shrink-0'>
											<Icon size={18} aria-hidden />
										</span>
										<span className='min-w-0'>
											<span className='block font-ui text-[11px] tracking-[2px] uppercase text-muted'>{label}</span>
											<span className='block font-body text-navy-mid break-words group-hover:text-royal'>{value}</span>
										</span>
									</a>
								</li>
							))}
						</ul>
						{s.officeHours && (
							<p className='mt-5 flex items-center gap-2 font-ui text-sm text-muted'>
								<Clock size={15} aria-hidden /> Office hours: {s.officeHours}
							</p>
						)}
					</div>
					<div>
						<h2 className='sr-only'>Send a message</h2>
						<ContactForm />
					</div>
				</div>
			</section>
		</>
	);
}
