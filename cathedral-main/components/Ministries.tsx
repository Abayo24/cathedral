import Image from 'next/image';
import {
	Shield,
	Heart,
	Users,
	BookOpen,
	Music,
	EarOff,
	HeartHandshake
} from 'lucide-react';
import { SectionHeader } from './ui/SectionHeader';
import { MINISTRIES } from '@/lib/data';

const icons = [Shield, Heart, Users, BookOpen, Music, EarOff, HeartHandshake];

export function Ministries() {
	return (
		<section className='section-pad bg-ivory'>
			<div className='container-main'>
				<SectionHeader
					label='Get Involved'
					title='Our Ministries & Fellowships'
					subtitle='Find your place to serve, grow, and connect within the Cathedral family.'
					centered
				/>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
					{MINISTRIES.map((m, i) => {
						const Icon = icons[i];
						return (
							<div
								key={i}
								className='relative h-72 sm:h-80 overflow-hidden rounded-3xl group cursor-pointer shadow-md hover:shadow-xl hover:shadow-navy/15 transition-all duration-300 hover:-translate-y-1'
							>
								<Image
									src={m.img}
									alt={m.name}
									fill
									className='object-cover transition-transform duration-700 group-hover:scale-105'
									sizes='(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw'
								/>
								<div className='absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/60 to-black/20' />
								<div
									className={`absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center z-10 shadow-md ${i % 2 === 0 ? 'bg-crimson' : 'bg-royal'}`}
								>
									<Icon size={17} className='text-white' />
								</div>
								<div className='absolute bottom-0 left-0 p-5 sm:p-6 z-10'>
									<div
										className={`font-ui text-[8px] tracking-[3px] uppercase mb-1.5 ${i % 2 === 0 ? 'text-red-300' : 'text-blue-300'}`}
									>
										{m.abbr}
									</div>
									<div className='font-display text-xl sm:text-2xl font-medium text-white mb-1.5 leading-tight'>
										{m.name}
									</div>
									<p className='font-body text-[0.78rem] text-white/65 leading-[1.7]'>
										{m.desc}
									</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
