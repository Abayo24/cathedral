import Image from 'next/image';
import Link from 'next/link';
import { CrossOrnament } from './ui/CrossOrnament';

export function Hero() {
	return (
		<section className='relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-navy'>
			<Image
				src='/church.jpg'
				alt='Cathedral interior'
				fill
				className='object-cover opacity-20'
				priority
			/>
			<div className='absolute inset-0 bg-heraldic-hero' />

			<div className='relative z-10 w-full max-w-2xl mx-auto text-center px-4 sm:px-6 pt-20 pb-16 animate-fade-up'>
				<div className='flex justify-center mb-7'>
					<div className='relative'>
						<div className='absolute inset-0 rounded-full bg-white/10 blur-xl scale-150' />
						<Image
							src='/logo.png'
							alt='Cathedral Crest'
							width={100}
							height={100}
							className='relative object-contain drop-shadow-2xl w-20 h-20 sm:w-24 sm:h-24 md:w-[100px] md:h-[100px]'
							priority
						/>
					</div>
				</div>

				<div className='flex justify-center items-center gap-4 mb-5'>
					<div className='w-10 h-px bg-crimson/70' />
					<CrossOrnament color='#B91C2E' size={13} />
					<div className='w-10 h-px bg-royal/70' />
				</div>

				<p className='font-ui text-[9px] tracking-[3px] uppercase font-semibold text-gold-mid text-center mb-4'>
					Together in Christ · Est. 1913
				</p>

				<h1 className='font-display font-light text-[clamp(2.2rem,8vw,5.5rem)] text-white leading-[1.05] -tracking-[0.01em] mb-1'>
					A Wholesome
				</h1>
				<h1 className='font-display font-medium italic text-[clamp(2.2rem,8vw,5.5rem)] text-white leading-[1.05] mb-7'>
					Christian Ministry
				</h1>

				<div className='flex justify-center items-center gap-3 mb-6'>
					<div className='w-7 h-px bg-gold/60' />
					<p className='font-display text-base sm:text-lg font-light italic text-gold-mid tracking-wide'>
						For the Glory of God
					</p>
					<div className='w-7 h-px bg-gold/60' />
				</div>

				<p className='font-body text-sm sm:text-base leading-8 text-white/60 max-w-md mx-auto mb-9 px-2'>
					ACK St. Stephen&apos;s Cathedral Kisumu — making disciples,
					restoring communities, and safeguarding the integrity of
					creation since 1913.
				</p>

				<div className='flex flex-col sm:flex-row gap-3 justify-center items-center'>
					<Link
						href='/services'
						className='btn-outline-white w-full sm:w-auto no-underline text-center'
					>
						Plan Your Visit
					</Link>
					<Link
						href='/about'
						className='btn-crimson w-full sm:w-auto no-underline text-center'
					>
						Our Story
					</Link>
				</div>
			</div>
		</section>
	);
}
