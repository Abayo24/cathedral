'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Phone, X } from 'lucide-react';
import { CrossOrnament } from './ui/CrossOrnament';

const links = [
	{ label: 'Home', href: '/', mobileOnly: true },
	{ label: 'About', href: '/about' },
	{ label: 'Services', href: '/services' },
	{ label: 'Events', href: '/events' },
	{ label: 'Ministries', href: '/ministries' },
	{ label: 'Sermons', href: '/sermons' },
	{ label: 'Gallery', href: '/gallery' },
	{ label: 'Bulletins', href: '/bulletins' },
	{ label: 'Plan a Visit', href: '/visit', mobileOnly: true },
	{ label: 'Contact', href: '/contact' },
];

export function Navigation({ phone, phoneIntl }: { phone: string; phoneIntl: string }) {
	const [open, setOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 40);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	useEffect(() => setOpen(false), [pathname]);

	useEffect(() => {
		if (!open) return;
		const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [open]);

	const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

	return (
		<>
			{/* Diocese ribbon */}
			<div className='bg-royal-dark px-4 py-2'>
				<div className='container-main flex justify-between items-center gap-4'>
					<span className='hidden md:flex items-center gap-2 font-ui text-[11px] tracking-[2px] text-white/75 uppercase truncate'>
						<CrossOrnament color='rgba(255,255,255,0.5)' size={10} />
						Anglican Church of Kenya · Diocese of Maseno South
					</span>
					<a
						href={`tel:${phoneIntl}`}
						className='flex items-center gap-1.5 font-ui text-[11px] tracking-[1.5px] text-white/90 uppercase ml-auto hover:text-gold-mid transition-colors'
					>
						<Phone size={11} aria-hidden />
						<span className='sr-only'>Call the Cathedral office: </span>
						{phone}
					</a>
				</div>
			</div>

			<nav
				aria-label='Main'
				className={`sticky top-0 z-50 transition-[background-color,box-shadow,border-radius] duration-300 ${
					scrolled
						? 'bg-white/95 backdrop-blur-md shadow-lg shadow-navy/10 border-b border-parchment/60'
						: 'bg-white border-b border-parchment/80'
				}`}
			>
				<div className='container-main flex items-center justify-between h-[68px] px-4 sm:px-6'>
					<Link href='/' className='flex items-center gap-3 flex-shrink-0 min-w-0 no-underline'>
						<Image
							src='/logo.png'
							alt=''
							width={46}
							height={46}
							sizes='46px'
							className='object-contain drop-shadow flex-shrink-0'
							priority
						/>
						<span className='text-left min-w-0'>
							<span className='block font-display text-[17px] sm:text-[18px] font-medium text-navy-mid leading-tight truncate'>
								St. Stephen&apos;s Cathedral
							</span>
							<span className='block font-ui text-[10px] tracking-[2px] uppercase text-royal mt-0.5'>
								Kisumu · Est. 1913
							</span>
						</span>
					</Link>

					<ul className='hidden xl:flex items-center gap-0.5'>
						{links
							.filter((l) => !l.mobileOnly)
							.map(({ label, href }) => (
								<li key={href}>
									<Link
										href={href}
										aria-current={isActive(href) ? 'page' : undefined}
										className={`px-3 py-2 font-ui text-[12px] tracking-[1.2px] uppercase rounded-full transition-colors duration-200 no-underline ${
											isActive(href)
												? 'text-crimson bg-crimson/10 font-semibold'
												: 'text-muted hover:text-royal hover:bg-royal/5'
										}`}
									>
										{label}
									</Link>
								</li>
							))}
						<li>
							<Link href='/give' className='btn-crimson ml-2 !py-2.5 !px-6'>
								Give
							</Link>
						</li>
					</ul>

					<div className='flex items-center gap-2 xl:hidden'>
						<Link href='/give' className='btn-crimson !py-2 !px-4 sm:!px-5'>
							Give
						</Link>
						<button
							type='button'
							onClick={() => setOpen(!open)}
							className='text-crimson p-2.5 rounded-full hover:bg-crimson/10 transition-colors'
							aria-expanded={open}
							aria-controls='mobile-menu'
							aria-label={open ? 'Close menu' : 'Open menu'}
						>
							{open ? <X size={24} aria-hidden /> : <Menu size={24} aria-hidden />}
						</button>
					</div>
				</div>

				<div
					id='mobile-menu'
					hidden={!open}
					className='xl:hidden bg-white border-t border-parchment/60 px-4 pb-5 pt-2 max-h-[calc(100vh-110px)] overflow-y-auto'
				>
					<ul>
						{links.map(({ label, href }) => (
							<li key={href} className='border-b border-ivory last:border-0'>
								<Link
									href={href}
									aria-current={isActive(href) ? 'page' : undefined}
									className={`block w-full font-ui text-[13px] tracking-[1.5px] uppercase py-3.5 transition-colors no-underline ${
										isActive(href) ? 'text-crimson font-semibold' : 'text-navy-mid hover:text-royal'
									}`}
								>
									{label}
								</Link>
							</li>
						))}
					</ul>
				</div>
			</nav>
		</>
	);
}
