import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { JsonLd } from './ui/JsonLd';
import { breadcrumbJsonLd } from '@/lib/structured-data';

interface Crumb {
	name: string;
	path: string;
}

interface PageHeroProps {
	label: string;
	title: string;
	subtitle?: string;
	img: string;
	/** Trail after "Home"; the last item is the current page. */
	breadcrumbs: Crumb[];
	children?: React.ReactNode;
}

export function PageHero({ label, title, subtitle, img, breadcrumbs, children }: PageHeroProps) {
	const trail = [{ name: 'Home', path: '/' }, ...breadcrumbs];

	return (
		<section className='relative min-h-[320px] sm:min-h-[380px] flex items-end overflow-hidden bg-navy'>
			<Image src={img} alt='' fill className='object-cover opacity-30' priority sizes='100vw' quality={60} />
			<div className='absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-navy/20' />
			<div className='absolute inset-0 bg-gradient-to-r from-royal-dark/40 to-crimson/20' />

			<div className='relative z-10 container-main px-4 sm:px-6 pt-16 pb-12 sm:pb-14 w-full'>
				<nav aria-label='Breadcrumb' className='mb-5'>
					<ol className='flex flex-wrap items-center gap-1.5'>
						{trail.map((crumb, i) => {
							const isLast = i === trail.length - 1;
							return (
								<li key={crumb.path} className='flex items-center gap-1.5'>
									{i > 0 && <ChevronRight size={11} className='text-white/50' aria-hidden />}
									{isLast ? (
										<span aria-current='page' className='font-ui text-[11px] tracking-[2px] uppercase text-gold-mid'>
											{crumb.name}
										</span>
									) : (
										<Link
											href={crumb.path}
											className='flex items-center gap-1 font-ui text-[11px] tracking-[2px] uppercase text-white/75 hover:text-white transition-colors no-underline'
										>
											{i === 0 && <Home size={11} aria-hidden />}
											{crumb.name}
										</Link>
									)}
								</li>
							);
						})}
					</ol>
				</nav>

				<p className='font-ui text-[11px] tracking-[3px] uppercase font-semibold text-gold-mid mb-3'>{label}</p>
				<h1 className='font-display text-4xl sm:text-5xl md:text-6xl font-normal text-white leading-tight -tracking-[0.01em] mb-4 max-w-4xl'>
					{title}
				</h1>
				{subtitle && <p className='font-body text-base text-white/80 max-w-xl leading-8'>{subtitle}</p>}
				{children}
			</div>
			<JsonLd data={breadcrumbJsonLd(trail)} />
		</section>
	);
}
