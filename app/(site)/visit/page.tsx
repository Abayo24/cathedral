import Link from 'next/link';
import { Accessibility, Baby, Clock, MapPin, Navigation2, Phone, Video } from 'lucide-react';
import { Faq } from '@/components/Faq';
import { PageHero } from '@/components/PageHero';
import { JsonLd } from '@/components/ui/JsonLd';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { getFaqs, getServiceSchedule, getSiteSettings } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';
import { faqJsonLd, mapUrl } from '@/lib/structured-data';

export const metadata = pageMetadata({
	title: 'Plan a Visit — Location, Service Times & FAQ',
	description:
		"Visiting St. Stephen's Cathedral Kisumu? Find directions, Sunday service times, the Deaf service, Sunday School, live streaming, and answers to common questions.",
	path: '/visit',
});

export default async function VisitPage() {
	const [settings, schedule, faqs] = await Promise.all([getSiteSettings(), getServiceSchedule(), getFaqs()]);
	const embedQuery = settings.geo ? `${settings.geo.lat},${settings.geo.lng}` : settings.mapQuery;

	const highlights = [
		{ icon: Clock, title: 'Sunday worship', text: schedule.adult.map((s) => s.time.split('–')[0].trim()).join(', ') + ' in the Main Sanctuary.' },
		{ icon: Accessibility, title: 'Deaf service', text: 'Sign language ministry every Sunday in the Old Sanctuary.' },
		{ icon: Baby, title: 'Children & youth', text: 'Sunday School during services, plus Youth and Teens congregations.' },
		{ icon: Video, title: 'Watch online', text: 'Sunday services stream live on our Facebook page.' },
	];

	return (
		<>
			<PageHero
				label="I'm New"
				title='Plan Your Visit'
				subtitle="Whether it's your first time or you're returning home, you are welcome at St. Stephen's."
				img='/interior.jpg'
				breadcrumbs={[{ name: 'Plan a Visit', path: '/visit' }]}
			/>

			<section className='section-pad bg-cream' aria-labelledby='expect-heading'>
				<div className='container-main'>
					<SectionHeader
						id='expect-heading'
						label='What to Expect'
						title='Worship in the Anglican Tradition'
						subtitle='Our services follow the Anglican Church of Kenya liturgy, with hymns led by the Cathedral choirs, Bible readings, a sermon, prayers and — on scheduled Sundays — Holy Communion.'
						centered
					/>
					<ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
						{highlights.map(({ icon: Icon, title, text }) => (
							<li key={title} className='bg-white rounded-2xl border border-parchment/70 p-6'>
								<Icon size={24} className='text-crimson mb-3' aria-hidden />
								<h3 className='font-display text-xl text-navy-mid mb-1.5'>{title}</h3>
								<p className='font-body text-sm text-muted leading-7'>{text}</p>
							</li>
						))}
					</ul>
					<div className='text-center mt-8'>
						<Link href='/services' className='btn-royal'>
							Full service schedule
						</Link>
					</div>
				</div>
			</section>

			<section className='section-pad bg-ivory' aria-labelledby='location-heading'>
				<div className='container-main grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-8 items-stretch'>
					<div className='bg-white rounded-3xl border border-parchment/70 p-6 sm:p-8'>
						<p className='label-tag'>Find Us</p>
						<h2 id='location-heading' className='font-display text-3xl sm:text-4xl text-navy-mid mb-5'>
							Location & Contact
						</h2>
						<address className='not-italic space-y-4 font-body text-base text-muted leading-7'>
							<p className='flex gap-3'>
								<MapPin size={18} className='text-crimson mt-1 flex-shrink-0' aria-hidden />
								<span>
									{settings.name}
									<br />
									{settings.address.street && (
										<>
											{settings.address.street}
											<br />
										</>
									)}
									{settings.address.poBox} – {settings.address.postalCode}, {settings.address.locality}, Kenya
								</span>
							</p>
							<p className='flex gap-3'>
								<Phone size={18} className='text-crimson mt-1 flex-shrink-0' aria-hidden />
								<a href={`tel:${settings.phoneIntl}`} className='text-royal hover:text-crimson'>
									{settings.phone}
								</a>
							</p>
							{settings.officeHours && (
								<p className='flex gap-3'>
									<Clock size={18} className='text-crimson mt-1 flex-shrink-0' aria-hidden />
									<span>Office hours: {settings.officeHours}</span>
								</p>
							)}
						</address>
						<div className='flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 mt-7'>
							<a href={mapUrl(settings)} target='_blank' rel='noopener noreferrer' className='btn-crimson'>
								<Navigation2 size={15} aria-hidden /> Get directions
							</a>
							<Link href='/contact' className='btn-outline'>
								Send a message
							</Link>
						</div>
					</div>
					<div className='rounded-3xl overflow-hidden border border-parchment/70 min-h-[320px] bg-parchment'>
						<iframe
							title={`Map showing ${settings.name}`}
							src={`https://www.google.com/maps?q=${encodeURIComponent(embedQuery)}&output=embed`}
							className='w-full h-full min-h-[320px] border-0'
							loading='lazy'
							referrerPolicy='no-referrer-when-downgrade'
						/>
					</div>
				</div>
			</section>

			<section className='section-pad bg-cream' aria-labelledby='faq-heading'>
				<div className='container-md'>
					<SectionHeader id='faq-heading' label='Questions' title='Frequently Asked Questions' centered />
					<Faq faqs={faqs} />
				</div>
			</section>

			<JsonLd data={faqJsonLd(faqs)} />
		</>
	);
}
