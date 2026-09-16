import Link from 'next/link';
import { BookOpen, EarOff, Heart, HeartHandshake, Music, Shield, Users } from 'lucide-react';
import { CmsImage } from './ui/CmsImage';
import { SectionHeader } from './ui/SectionHeader';
import type { Ministry } from '@/lib/types';

const icons = [Shield, Heart, Users, BookOpen, Music, EarOff, HeartHandshake];

export function Ministries({ ministries }: { ministries: Ministry[] }) {
	return (
		<section className='section-pad bg-ivory' aria-labelledby='ministries-heading'>
			<div className='container-main'>
				<SectionHeader
					id='ministries-heading'
					label='Get Involved'
					title='Our Ministries & Fellowships'
					subtitle='Find your place to serve, grow, and connect within the Cathedral family.'
					centered
				/>
				<ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
					{ministries.map((m, i) => {
						const Icon = icons[i % icons.length];
						return (
							<li key={m.name} className='relative min-h-[20rem] overflow-hidden rounded-3xl group shadow-md flex flex-col justify-end'>
								<CmsImage
									image={m.image}
									alt=''
									fill
									className='object-cover transition-transform duration-700 group-hover:scale-105'
									sizes='(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw'
								/>
								<div className='absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-black/10' />
								<div
									className={`absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center z-10 shadow-md ${i % 2 === 0 ? 'bg-crimson' : 'bg-royal'}`}
								>
									<Icon size={17} className='text-white' aria-hidden />
								</div>
								<div className='relative p-5 sm:p-6 z-10'>
									{m.abbr && <p className='font-ui text-[11px] tracking-[2.5px] uppercase mb-1.5 text-gold-mid font-semibold'>{m.abbr}</p>}
									<h3 className='font-display text-2xl font-medium text-white mb-1.5 leading-tight'>{m.name}</h3>
									<p className='font-body text-sm text-white/85 leading-6'>{m.description}</p>
									{(m.meets || m.contact) && (
										<p className='font-ui text-xs text-white/80 mt-3 space-y-0.5'>
											{m.meets && <span className='block'>Meets: {m.meets}</span>}
											{m.contact && <span className='block'>Contact: {m.contact}</span>}
										</p>
									)}
								</div>
							</li>
						);
					})}
				</ul>
				<div className='mt-12 text-center'>
					<p className='font-body text-muted mb-4'>Would you like to join a ministry or fellowship?</p>
					<Link href='/contact' className='btn-crimson'>
						Get in touch
					</Link>
				</div>
			</div>
		</section>
	);
}
