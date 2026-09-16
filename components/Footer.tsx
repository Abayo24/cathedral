import Image from 'next/image';
import Link from 'next/link';
import { CalendarDays, Clock, Facebook, Instagram, Mail, MapPin, Phone, Youtube } from 'lucide-react';
import { CrossOrnament } from './ui/CrossOrnament';
import { getServiceSchedule, getSiteSettings } from '@/lib/content';
import { mapUrl } from '@/lib/structured-data';

const quickLinks = [
	{ label: 'About the Cathedral', href: '/about' },
	{ label: 'Service Times', href: '/services' },
	{ label: 'Events Calendar', href: '/events' },
	{ label: 'Notices & Bulletins', href: '/bulletins' },
	{ label: 'Ministries', href: '/ministries' },
	{ label: 'Sermons', href: '/sermons' },
	{ label: 'Gallery', href: '/gallery' },
	{ label: 'Plan a Visit & FAQ', href: '/visit' },
	{ label: 'Contact & Prayer Requests', href: '/contact' },
	{ label: 'Tithes & Offerings', href: '/give' },
];

export async function Footer() {
	const [s, schedule] = await Promise.all([getSiteSettings(), getServiceSchedule()]);

	const socials = [
		{ Icon: Facebook, href: s.social.facebook, label: 'Facebook' },
		{ Icon: Youtube, href: s.social.youtube, label: 'YouTube' },
		{ Icon: Instagram, href: s.social.instagram, label: 'Instagram' },
	].filter((x): x is typeof x & { href: string } => Boolean(x.href));

	const address = [s.address.street, `${s.address.poBox} – ${s.address.postalCode}`, `${s.address.locality}, Kenya`]
		.filter(Boolean)
		.join(', ');

	return (
		<footer className='bg-navy text-white'>
			<div className='bg-royal-dark px-4 py-3'>
				<div className='container-main flex flex-wrap justify-between items-center gap-2'>
					<p className='flex items-center gap-2 font-ui text-[11px] tracking-[2px] uppercase text-white/75'>
						<CrossOrnament color='rgba(255,255,255,0.5)' size={10} />
						Anglican Church of Kenya · Diocese of Maseno South
					</p>
				</div>
			</div>

			<div className='container-main px-4 sm:px-6 py-14 sm:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] gap-10 lg:gap-12'>
				<div>
					<Link href='/' className='flex items-center gap-3.5 mb-5 no-underline'>
						<Image src='/logo.png' alt='' width={48} height={48} sizes='48px' className='object-contain flex-shrink-0' />
						<span className='min-w-0'>
							<span className='block font-display text-lg text-white'>St. Stephen&apos;s Cathedral</span>
							<span className='block font-ui text-[10px] tracking-[2.5px] uppercase text-gold-mid mt-0.5'>
								Kisumu · Est. 1913
							</span>
						</span>
					</Link>
					<p className='font-body text-sm text-white/75 leading-7 max-w-xs mb-6'>
						{s.tagline} Serving the Diocese of Maseno South from the shores of Lake Victoria.
					</p>
					{socials.length > 0 && (
						<ul className='flex gap-2'>
							{socials.map(({ Icon, href, label }) => (
								<li key={label}>
									<a
										href={href}
										target='_blank'
										rel='noopener noreferrer'
										aria-label={`${label} (opens in a new tab)`}
										className='w-10 h-10 flex items-center justify-center rounded-full border border-white/30 text-white/85 hover:border-gold-mid hover:text-gold-mid transition-colors'
									>
										<Icon size={16} aria-hidden />
									</a>
								</li>
							))}
						</ul>
					)}
				</div>

				<div>
					<h2 className='font-ui text-[11px] tracking-[3px] uppercase text-gold-mid mb-4 pb-3 border-b border-white/15'>
						Sunday Worship
					</h2>
					<ul className='space-y-2.5'>
						{schedule.adult.map((slot) => (
							<li key={slot.label} className='flex gap-2.5 items-start'>
								<Clock size={14} className='text-gold-mid mt-1 flex-shrink-0' aria-hidden />
								<span className='font-body text-sm text-white/80 leading-6'>
									{slot.time}
									<span className='block text-xs text-white/60'>{slot.venue}</span>
								</span>
							</li>
						))}
					</ul>
					<Link
						href='/events'
						className='mt-4 inline-flex items-center gap-2 font-ui text-[12px] tracking-[1.5px] uppercase text-white hover:text-gold-mid no-underline'
					>
						<CalendarDays size={14} aria-hidden /> All events
					</Link>
				</div>

				<address className='not-italic'>
					<h2 className='font-ui text-[11px] tracking-[3px] uppercase text-gold-mid mb-4 pb-3 border-b border-white/15'>
						Contact
					</h2>
					<ul className='space-y-3'>
						<li>
							<a href={mapUrl(s)} target='_blank' rel='noopener noreferrer' className='flex gap-2.5 items-start group'>
								<MapPin size={14} className='text-gold-mid mt-1 flex-shrink-0' aria-hidden />
								<span className='font-body text-sm text-white/80 leading-6 group-hover:text-white'>{address}</span>
							</a>
						</li>
						<li>
							<a href={`tel:${s.phoneIntl}`} className='flex gap-2.5 items-start group'>
								<Phone size={14} className='text-gold-mid mt-1 flex-shrink-0' aria-hidden />
								<span className='font-body text-sm text-white/80 leading-6 group-hover:text-white'>{s.phone}</span>
							</a>
						</li>
						{s.emails.map((email) => (
							<li key={email}>
								<a href={`mailto:${email}`} className='flex gap-2.5 items-start group'>
									<Mail size={14} className='text-gold-mid mt-1 flex-shrink-0' aria-hidden />
									<span className='font-body text-sm text-white/80 leading-6 break-all group-hover:text-white'>{email}</span>
								</a>
							</li>
						))}
						{s.officeHours && <li className='font-body text-sm text-white/70 leading-6 pl-6'>Office: {s.officeHours}</li>}
					</ul>
				</address>

				<nav aria-label='Footer'>
					<h2 className='font-ui text-[11px] tracking-[3px] uppercase text-gold-mid mb-4 pb-3 border-b border-white/15'>
						Explore
					</h2>
					<ul>
						{quickLinks.map(({ label, href }) => (
							<li key={href}>
								<Link
									href={href}
									className='block py-1.5 font-ui text-[13px] text-white/80 hover:text-gold-mid transition-colors no-underline'
								>
									{label}
								</Link>
							</li>
						))}
					</ul>
				</nav>
			</div>

			<div className='border-t border-white/10 px-4 sm:px-6 py-5'>
				<div className='container-main flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2'>
					<p className='font-ui text-xs text-white/65'>
						© {new Date().getFullYear()} {s.name}. All rights reserved.
					</p>
					<Link href='/admin' className='font-ui text-xs text-white/50 hover:text-white/80 no-underline' prefetch={false}>
						Staff login
					</Link>
				</div>
			</div>
		</footer>
	);
}
