import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Phone, Mail, Facebook, Globe, Youtube } from 'lucide-react';
import { CrossOrnament } from './ui/CrossOrnament';
import { CHURCH } from '@/lib/data';

const quickLinks = [
	{ label: 'Our History', href: '/about' },
	{ label: 'Service Times', href: '/services' },
	{ label: 'Ministries', href: '/ministries' },
	{ label: 'Gallery', href: '/gallery' },
	{ label: 'Tithes & Offerings', href: '/give' },
	{ label: 'Sermons', href: '/sermons' },
];
const socials = [
	{
		I: Facebook,
		href: CHURCH.facebook,
		label: 'Facebook',
		tw: 'border-royal/30 text-royal/60 hover:border-royal hover:text-royal hover:bg-royal/10',
	},
	{
		I: Youtube,
		href: 'CHURCH.facebook',
		label: 'YouTube',
		tw: 'border-crimson/30 text-crimson/60 hover:border-crimson hover:text-crimson hover:bg-crimson/10',
	},
	{
		I: Globe,
		href: `https://${CHURCH.domain}`,
		label: 'Website',
		tw: 'border-gold/30 text-gold/60 hover:border-gold hover:text-gold hover:bg-gold/10',
	},
];

export function Footer() {
	return (
		<footer className='bg-navy'>
			{/* Royal top bar */}
			<div className='bg-royal-dark px-4 py-3'>
				<div className='container-main flex flex-wrap justify-between items-center gap-2'>
					<div className='flex items-center gap-2'>
						<CrossOrnament
							color='rgba(255,255,255,0.3)'
							size={10}
						/>
						<span className='hidden sm:block font-ui text-[8px] tracking-[2px] uppercase text-white/50 truncate'>
							Anglican Church of Kenya · Diocese of Maseno South
						</span>
					</div>
					<span className='font-ui text-[8px] tracking-[1.5px] text-white/35'>
						{CHURCH.domain}
					</span>
				</div>
			</div>

			<div className='container-main px-4 sm:px-6 py-14 sm:py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] gap-10 lg:gap-16'>
				{/* Brand */}
				<div className='sm:col-span-2 lg:col-span-1'>
					<Link
						href='/'
						className='flex items-center gap-3.5 mb-5 no-underline'
					>
						<Image
							src='/logo.png'
							alt='Cathedral Crest'
							width={48}
							height={48}
							className='object-contain opacity-90 flex-shrink-0'
						/>
						<div className='min-w-0'>
							<div className='font-display text-[1.05rem] text-white truncate'>
								St. Stephen&apos;s Cathedral
							</div>
							<div className='font-ui text-[7px] tracking-[2.5px] uppercase text-gold/75 mt-0.5'>
								Kisumu · Est. 1913
							</div>
						</div>
					</Link>
					<p className='font-body text-[0.82rem] text-white/35 leading-8 max-w-xs mb-6'>
						A wholesome Christian ministry for the glory of God.
						Serving the Diocese of Maseno South from the shores of
						Lake Victoria.
					</p>
					<div className='flex gap-2'>
						{socials.map(({ I, href, label, tw }) => (
							<a
								key={label}
								href={href}
								target='_blank'
								rel='noopener noreferrer'
								aria-label={label}
								className={`w-9 h-9 flex items-center justify-center rounded-full border transition-all duration-200 ${tw}`}
							>
								<I size={15} />
							</a>
						))}
					</div>
				</div>

				{/* Contact */}
				<div>
					<div className='font-ui text-[9px] tracking-[3px] uppercase text-crimson mb-4 pb-3 border-b border-crimson/20'>
						Contact
					</div>
					{[
						{ I: MapPin, text: CHURCH.address },
						{ I: Phone, text: CHURCH.phone },
						{ I: Mail, text: CHURCH.emails[0] },
					].map(({ I, text }, i) => (
						<div key={i} className='flex gap-2.5 items-start mb-3'>
							<I
								size={13}
								className='text-royal mt-0.5 flex-shrink-0'
							/>
							<span className='font-body text-[0.78rem] text-white/40 leading-[1.7] break-words min-w-0'>
								{text}
							</span>
						</div>
					))}
				</div>

				{/* Quick links */}
				<div>
					<div className='font-ui text-[9px] tracking-[3px] uppercase text-royal mb-4 pb-3 border-b border-royal/20'>
						Quick Links
					</div>
					{quickLinks.map(({ label, href }) => (
						<Link
							key={href}
							href={href}
							className='flex items-center gap-2 py-2 font-ui text-[9.5px] tracking-[1.5px] uppercase text-white/30 border-b border-white/[0.04] hover:text-crimson transition-colors duration-200 no-underline'
						>
							<span className='text-crimson/40 flex-shrink-0'>
								›
							</span>
							<span className='truncate'>{label}</span>
						</Link>
					))}
				</div>
			</div>

			<div className='border-t border-white/[0.05] px-4 sm:px-6 py-4'>
				<div className='container-main flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2'>
					<span className='font-ui text-[8px] tracking-[1.5px] text-white/22'>
						© {new Date().getFullYear()} ACK St. Stephen&apos;s
						Cathedral Kisumu. All rights reserved.
					</span>
					<a
						href={`https://${CHURCH.domain}`}
						className='font-ui text-[8px] tracking-[1.5px] text-gold/45 no-underline hover:text-gold/70 transition-colors'
					>
						{CHURCH.domain}
					</a>
				</div>
			</div>
		</footer>
	);
}
