import Image from 'next/image';
import Link from 'next/link';
import { CrossOrnament } from './ui/CrossOrnament';
import { CmsImage } from './ui/CmsImage';
import type { SiteSettings } from '@/lib/types';

export function Hero({ hero }: { hero: SiteSettings['hero'] }) {
	return (
		<section className='relative min-h-[88vh] flex items-center justify-center overflow-hidden bg-navy'>
			<CmsImage image={hero.image} alt='' fill sizes='100vw' quality={60} className='object-cover opacity-20' priority />
			<div className='absolute inset-0 bg-heraldic-hero' />

			<div className='relative z-10 w-full max-w-3xl mx-auto text-center px-4 sm:px-6 pt-16 pb-16 animate-fade-up'>
				<div className='flex justify-center mb-7'>
					<div className='relative'>
						<div className='absolute inset-0 rounded-full bg-white/10 blur-xl scale-150' />
						<Image
							src='/logo.png'
							alt="St. Stephen's Cathedral crest"
							width={100}
							height={100}
							sizes='100px'
							className='relative object-contain drop-shadow-2xl w-20 h-20 sm:w-24 sm:h-24 md:w-[100px] md:h-[100px]'
						/>
					</div>
				</div>

				<div className='flex justify-center items-center gap-4 mb-5' aria-hidden>
					<div className='w-10 h-px bg-crimson/70' />
					<CrossOrnament color='#E0AB20' size={13} />
					<div className='w-10 h-px bg-royal/70' />
				</div>

				<p className='font-ui text-[11px] tracking-[3px] uppercase font-semibold text-gold-mid mb-4'>{hero.eyebrow}</p>

				<h1 className='font-display text-[clamp(2.4rem,8vw,5.5rem)] text-white leading-[1.05] -tracking-[0.01em] mb-7'>
					<span className='block font-light'>{hero.titleLine1}</span>
					<span className='block font-medium italic'>{hero.titleLine2}</span>
				</h1>

				<div className='flex justify-center items-center gap-3 mb-6'>
					<div className='w-7 h-px bg-gold/60' aria-hidden />
					<p className='font-display text-lg sm:text-xl font-light italic text-gold-mid tracking-wide'>For the Glory of God</p>
					<div className='w-7 h-px bg-gold/60' aria-hidden />
				</div>

				<p className='font-body text-base leading-8 text-white/85 max-w-lg mx-auto mb-9 px-2'>{hero.text}</p>

				<div className='flex flex-col sm:flex-row gap-3 justify-center items-center'>
					<Link href='/visit' className='btn-outline-white w-full sm:w-auto'>
						Plan Your Visit
					</Link>
					<Link href='/events' className='btn-crimson w-full sm:w-auto'>
						What&apos;s On
					</Link>
				</div>
			</div>
		</section>
	);
}
