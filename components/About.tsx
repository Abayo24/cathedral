import Image from 'next/image';
import { Users } from 'lucide-react';
import { CmsImage } from './ui/CmsImage';
import { CrossOrnament } from './ui/CrossOrnament';
import { HeraldRule } from './ui/HeraldRule';
import { SectionHeader } from './ui/SectionHeader';
import { FOCUS, VALUES } from '@/lib/data';
import type { Leader } from '@/lib/types';

export function About({ leaders }: { leaders: Leader[] }) {
	return (
		<section className='section-pad bg-cream'>
			<div className='container-main'>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20'>
					<div>
						<p className='label-tag'>Our Heritage</p>
						<h2 className='section-title'>About St. Stephen&apos;s</h2>
						<HeraldRule className='max-w-[120px] mb-6' />
						<p className='font-body text-base leading-8 text-muted mb-5'>
							The ACK St. Stephen&apos;s Cathedral in Kisumu, locally known as <em>&ldquo;Komulo&rdquo;</em> after pioneer
							priest Rev. Reuben Omulo, was originally built in 1913. Established by Anglican missionaries, it has grown to
							become the seat of the Diocese of Maseno South.
						</p>
						<p className='font-body text-base leading-8 text-muted mb-8'>
							In obedience to the Great Commission, the Cathedral&apos;s holistic ministry makes disciples, proclaims Good
							News, heals communities, challenges injustice, and safeguards creation.
						</p>
						<h3 className='label-tag'>Our Values</h3>
						<ul className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
							{VALUES.map((v, i) => (
								<li
									key={v}
									className={`px-4 py-3 bg-white rounded-xl border border-parchment/60 shadow-sm border-l-[3px] font-ui text-[13px] tracking-[1.5px] uppercase text-navy-mid font-semibold ${
										i % 2 === 0 ? 'border-l-crimson' : 'border-l-royal'
									}`}
								>
									{v}
								</li>
							))}
						</ul>
					</div>

					<div className='flex flex-col gap-4'>
						<div className='bg-royal rounded-2xl p-6 sm:p-8'>
							<div className='flex items-center gap-2 mb-4'>
								<CrossOrnament color='rgba(255,255,255,0.5)' size={12} />
								<h3 className='label-tag-light !mb-0'>Vision</h3>
							</div>
							<p className='font-display text-2xl sm:text-3xl italic font-normal text-white leading-relaxed'>
								&ldquo;A wholesome Christian ministry for the glory of God.&rdquo;
							</p>
						</div>
						<div className='bg-white rounded-2xl p-6 sm:p-8 border border-parchment/60 shadow-sm'>
							<h3 className='label-tag'>Mission</h3>
							<p className='font-body text-base leading-8 text-muted'>
								To proclaim Christ and to demonstrate the work of the Holy Spirit through worship, witnessing, and ministry
								to the community.
							</p>
						</div>
						<div className='bg-white rounded-2xl p-6 sm:p-8 border border-parchment/60 shadow-sm'>
							<h3 className='label-tag !mb-5'>Strategic Focus</h3>
							<ul>
								{FOCUS.map((f, i) => (
									<li key={f.title} className='py-3.5 border-b border-parchment/60 last:border-0'>
										<div className='flex items-start justify-between gap-3 mb-1'>
											<div className='flex items-center gap-2 min-w-0'>
												<span aria-hidden className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${i % 2 === 0 ? 'bg-crimson' : 'bg-royal'}`} />
												<h4 className='font-ui text-base font-semibold text-navy-mid'>{f.title}</h4>
											</div>
											<span className={`font-display text-base italic flex-shrink-0 ${i % 2 === 0 ? 'text-crimson' : 'text-royal'}`}>
												{f.verse}
											</span>
										</div>
										<p className='font-body text-sm text-muted leading-7 pl-4'>{f.desc}</p>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>

				<div className='pt-8' id='clergy'>
					<SectionHeader label='Our Clergy' title='Cathedral Leadership' centered />

					<ul className='flex flex-wrap justify-center gap-6 max-w-7xl mx-auto'>
						{leaders.map((l, i) => (
							<li
								key={`${l.role}-${l.name}`}
								className='bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center p-6 w-full sm:w-[calc(50%-1.5rem)] md:w-[calc(33.333%-1.5rem)] lg:w-[calc(25%-1.5rem)]'
							>
								<div className='relative w-32 h-32 mb-6 overflow-hidden rounded-full ring-4 ring-ivory'>
									{l.image ? (
										<CmsImage image={l.image} alt={l.name} fill className='object-cover object-top' sizes='128px' />
									) : (
										<div className='w-full h-full flex items-center justify-center bg-gradient-to-br from-royal-dark to-navy'>
											<Users size={36} className='text-gold/50' aria-hidden />
										</div>
									)}
								</div>
								<p className={`font-ui text-[11px] tracking-[1.5px] uppercase mb-1.5 leading-tight font-semibold ${i % 2 === 0 ? 'text-crimson' : 'text-royal'}`}>
									{l.role}
								</p>
								<div aria-hidden className={`w-6 h-[2px] rounded-full mb-2 ${i % 2 === 0 ? 'bg-crimson' : 'bg-royal'}`} />
								<h3 className='font-display text-lg font-medium text-navy-mid leading-snug mb-2 min-h-[2.5rem] flex items-center justify-center'>
									{l.name}
								</h3>
								<p className='font-body text-[13px] text-muted leading-6'>{l.bio}</p>
							</li>
						))}
					</ul>

					<div className='mt-10 relative h-56 sm:h-64 rounded-3xl overflow-hidden'>
						<Image src='/community.jpg' alt='' fill className='object-cover' sizes='(max-width:1280px) 100vw, 1280px' />
						<div className='absolute inset-0 bg-gradient-to-r from-royal-dark/95 to-navy/70' />
						<div className='absolute inset-0 flex flex-col justify-center px-6 sm:px-10 md:px-16'>
							<p className='label-tag-light'>Community</p>
							<h3 className='font-display text-2xl sm:text-3xl font-normal text-white mb-2'>One Family in Christ</h3>
							<p className='hidden sm:block font-body text-sm text-white/80 leading-7 max-w-sm'>
								Serving the Diocese of Maseno South together, united in worship, mission, and service.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
