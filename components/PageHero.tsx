import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface PageHeroProps {
	label: string;
	title: string;
	subtitle: string;
	img: string;
	breadcrumb?: string;
}

export function PageHero({
	label,
	title,
	subtitle,
	img,
	breadcrumb,
}: PageHeroProps) {
	return (
		<section className='relative h-[340px] sm:h-[400px] flex items-end overflow-hidden bg-navy'>
			<Image
				src={img}
				alt={title}
				fill
				className='object-cover opacity-30'
				priority
				sizes='100vw'
			/>
			<div className='absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-navy/20' />
			<div className='absolute inset-0 bg-gradient-to-r from-royal-dark/40 to-crimson/20' />

			<div className='relative z-10 container-main px-4 sm:px-6 pb-12 sm:pb-16 w-full'>
				{/* Breadcrumb */}
				<div className='flex items-center gap-1.5 mb-5'>
					<Link
						href='/'
						className='flex items-center gap-1 font-ui text-[9px] tracking-[2px] uppercase text-white/40 hover:text-white/70 transition-colors no-underline'
					>
						<Home size={10} />
						<span>Home</span>
					</Link>
					<ChevronRight size={10} className='text-white/30' />
					<span className='font-ui text-[9px] tracking-[2px] uppercase text-crimson/80'>
						{label}
					</span>
				</div>

				<p className='font-ui text-[10px] tracking-[4px] uppercase font-semibold text-gold-mid mb-3'>
					{label}
				</p>
				<h1 className='font-display text-4xl sm:text-5xl md:text-6xl font-normal text-white leading-tight -tracking-[0.01em] mb-4'>
					{title}
				</h1>
				<p className='font-body text-base text-white/60 max-w-xl leading-8'>
					{subtitle}
				</p>
			</div>
		</section>
	);
}
