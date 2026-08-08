'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { CrossOrnament } from './ui/CrossOrnament';
import { CHURCH } from '@/lib/data';

const links = [
	{ label: 'Home', href: '/' },
	{ label: 'About', href: '/about' },
	{ label: 'Services', href: '/services' },
	{ label: 'Ministries', href: '/ministries' },
	{ label: 'Gallery', href: '/gallery' },
	{ label: 'Give', href: '/give' },
	{ label: 'Sermons', href: '/sermons' },
];

export function Navigation() {
	const [open, setOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		const fn = () => setScrolled(window.scrollY > 40);
		window.addEventListener('scroll', fn, { passive: true });
		return () => window.removeEventListener('scroll', fn);
	}, []);

	// Close mobile menu on route change
	useEffect(() => {
		setOpen(false);
	}, [pathname]);

	const isActive = (href: string) =>
		href === '/' ? pathname === '/' : pathname.startsWith(href);

	return (
		<>
			{/* Diocese ribbon */}
			<div className='bg-royal-dark px-4 py-2 flex justify-between items-center overflow-hidden'>
				<span className='hidden md:flex items-center gap-2 font-ui text-[9px] tracking-[2px] text-white/50 uppercase truncate'>
					<CrossOrnament color='rgba(255,255,255,0.3)' size={10} />
					Anglican Church of Kenya · Diocese of Maseno South
				</span>
				<span className='font-ui text-[9px] tracking-[1.5px] text-white/70 uppercase ml-auto truncate'>
					{CHURCH.phone}
				</span>
			</div>

			{/* Main nav */}
			<nav
				className={`sticky top-0 z-50 transition-all duration-300 ${
					scrolled
						? 'bg-white/95 backdrop-blur-md shadow-lg shadow-navy/8 mx-2 sm:mx-4 mt-2 rounded-2xl border border-parchment/60'
						: 'bg-white border-b border-parchment/80'
				}`}
			>
				<div className='container-main flex items-center justify-between h-[68px] px-4 sm:px-6'>
					{/* Logo */}
					<Link
						href='/'
						className='flex items-center gap-3 flex-shrink-0 min-w-0'
					>
						<Image
							src='/logo.png'
							alt="ACK St. Stephen's Cathedral Crest"
							width={46}
							height={46}
							className='object-contain drop-shadow flex-shrink-0'
							priority
						/>
						<div className='text-left min-w-0'>
							<div className='font-display text-[16px] sm:text-[17px] font-medium text-navy-mid leading-tight truncate'>
								St. Stephen&apos;s Cathedral
							</div>
							<div className='font-ui text-[7px] tracking-[2px] uppercase text-royal mt-0.5'>
								Kisumu · Est. 1913
							</div>
						</div>
					</Link>

					{/* Desktop links */}
					<div className='hidden lg:flex items-center gap-1'>
						{links
							.filter((l) => l.href !== '/give')
							.map(({ label, href }) => (
								<Link
									key={href}
									href={href}
									className={`px-3.5 py-2 font-ui text-[10px] tracking-[1.5px] uppercase rounded-full transition-all duration-200 ${
										isActive(href)
											? 'text-crimson bg-crimson/8 font-semibold'
											: 'text-muted hover:text-royal hover:bg-royal/5'
									}`}
								>
									{label}
								</Link>
							))}
						<Link
							href='/give'
							className='btn-crimson ml-2 !py-2.5 !px-6 no-underline'
						>
							Give
						</Link>
					</div>

					{/* Burger */}
					<button
						onClick={() => setOpen(!open)}
						className='lg:hidden text-crimson p-2 rounded-full hover:bg-crimson/10 transition-colors'
						aria-label='Menu'
					>
						{open ? <X size={22} /> : <Menu size={22} />}
					</button>
				</div>

				{/* Mobile menu */}
				{open && (
					<div className='lg:hidden bg-white/98 border-t border-parchment/60 px-4 pb-5 pt-2 rounded-b-2xl'>
						{links.map(({ label, href }) => (
							<Link
								key={href}
								href={href}
								className={`block w-full text-left font-ui text-[10px] tracking-[2px] uppercase py-3 border-b border-ivory/80 last:border-0 transition-colors no-underline ${
									isActive(href)
										? 'text-crimson font-semibold'
										: 'text-muted hover:text-royal'
								}`}
							>
								{label}
							</Link>
						))}
					</div>
				)}
			</nav>
		</>
	);
}
