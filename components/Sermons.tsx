import { Headphones, Play } from 'lucide-react';
import { CmsImage } from './ui/CmsImage';
import { HeraldRule } from './ui/HeraldRule';
import { SectionHeader } from './ui/SectionHeader';
import { formatDayKey } from '@/lib/dates';
import type { Sermon } from '@/lib/types';

const external = { target: '_blank', rel: 'noopener noreferrer' } as const;

export function Sermons({ sermons, livestreamUrl }: { sermons: Sermon[]; livestreamUrl: string }) {
	const featured = sermons.find((s) => s.featured) ?? sermons[0];
	const rest = sermons.filter((s) => s !== featured);

	return (
		<section className='section-pad bg-cream'>
			<div className='container-main'>
				<SectionHeader
					label='The Word'
					title='Sermons & Messages'
					subtitle='Receive the Word of God wherever you are. Sunday services stream live on Facebook.'
					centered
				/>

				{featured && (
					<a
						href={featured.videoUrl || livestreamUrl}
						{...external}
						className='relative block h-72 sm:h-80 md:h-[420px] rounded-3xl overflow-hidden mb-6 group shadow-xl shadow-navy/20 no-underline'
					>
						<CmsImage
							image={featured.image}
							alt=''
							fill
							className='object-cover transition-transform duration-700 group-hover:scale-[1.02]'
							sizes='(max-width:1280px) 100vw, 1280px'
						/>
						<div className='absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/50 to-navy/10' />
						<div className='absolute inset-0 flex items-center justify-center'>
							<div className='w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-white/70 flex items-center justify-center bg-crimson/40 backdrop-blur-sm group-hover:bg-crimson/80 transition-all duration-300 group-hover:scale-110 shadow-lg'>
								<Play size={24} className='text-white ml-1' aria-hidden />
							</div>
						</div>
						<div className='absolute bottom-0 left-0 p-6 sm:p-8 md:p-12'>
							<p className='label-tag-light'>Featured Sermon</p>
							<h3 className='font-display text-2xl md:text-4xl font-normal text-white mb-3 leading-tight max-w-2xl'>
								{featured.title}
								<span className='sr-only'> — watch (opens in a new tab)</span>
							</h3>
							<p className='flex items-center gap-2 flex-wrap'>
								{[featured.series, featured.scripture, featured.preacher].filter(Boolean).map((tag) => (
									<span key={tag} className='chip bg-white/15 text-white'>
										{tag}
									</span>
								))}
							</p>
						</div>
					</a>
				)}

				{rest.length > 0 && (
					<ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6'>
						{rest.map((s) => (
							<li key={s.id} className='group relative rounded-2xl overflow-hidden bg-white border border-parchment/60 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1'>
								<div className='relative h-44 sm:h-48 overflow-hidden'>
									<CmsImage
										image={s.image}
										alt=''
										fill
										className='object-cover transition-transform duration-700 group-hover:scale-105'
										sizes='(max-width:640px) 100vw, 33vw'
									/>
									<div className='absolute inset-0 bg-navy/40 group-hover:bg-navy/25 transition-colors duration-300' />
									<div className='absolute inset-0 flex items-center justify-center'>
										<div className='w-12 h-12 rounded-full border border-white/70 flex items-center justify-center bg-crimson/60 shadow-md'>
											<Play size={16} className='text-white ml-0.5' aria-hidden />
										</div>
									</div>
								</div>
								<div className='p-5'>
									{s.scripture && <span className='chip bg-crimson/10 text-crimson-dark'>{s.scripture}</span>}
									<h3 className='font-display text-xl font-medium text-navy-mid leading-snug mt-3 mb-3'>
										<a href={s.videoUrl || livestreamUrl} {...external} className='no-underline after:absolute after:inset-0'>
											{s.title}
											<span className='sr-only'> (opens in a new tab)</span>
										</a>
									</h3>
									<HeraldRule className='mb-3' />
									<p className='font-body text-sm text-muted mb-1'>{s.preacher}</p>
									<p className='font-ui text-xs tracking-[1px] uppercase text-faint'>
										<time dateTime={s.date}>{formatDayKey(s.date)}</time>
									</p>
									{s.audioUrl && (
										<a href={s.audioUrl} {...external} className='relative z-10 mt-3 inline-flex items-center gap-1.5 font-ui text-sm text-royal hover:text-crimson'>
											<Headphones size={14} aria-hidden /> Listen
										</a>
									)}
								</div>
							</li>
						))}
					</ul>
				)}

				<div className='bg-royal rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-md shadow-royal/20'>
					<div className='min-w-0'>
						<p className='label-tag-light'>Live Streaming</p>
						<h3 className='font-display text-2xl text-white font-normal'>Join Us Live Every Sunday</h3>
						<p className='font-body text-sm text-white/80 mt-1 leading-7'>
							We stream our Sunday services on Facebook. Follow us to never miss a message.
						</p>
					</div>
					<a href={livestreamUrl} {...external} className='btn-crimson shrink-0 w-full sm:w-auto'>
						Watch on Facebook
					</a>
				</div>
			</div>
		</section>
	);
}
