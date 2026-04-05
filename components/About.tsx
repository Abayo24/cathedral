import Image from 'next/image';
import { Users } from 'lucide-react';
import { CrossOrnament } from './ui/CrossOrnament';
import { SectionHeader } from './ui/SectionHeader';
import { HeraldRule } from './ui/HeraldRule';
import { LEADERSHIP, FOCUS } from '@/lib/data';

const values = [
	'Prayerfulness',
	'Integrity',
	'Trustworthiness',
	'Compassion',
	'Servanthood',
	'Excellence',
];

export function About() {
	return (
		<section className='section-pad bg-cream'>
			<div className='container-main'>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20'>
					{/* Left */}
					<div>
						<p className='label-tag'>Our Heritage</p>
						<h2 className='section-title'>
							About St. Stephen&apos;s
						</h2>
						<HeraldRule className='max-w-[120px] mb-6' />
						<p className='font-body text-base leading-8 text-muted mb-5'>
							The ACK St. Stephen&apos;s Cathedral in Kisumu,
							locally known as <em>&ldquo;Komulo&rdquo;</em> after
							pioneer priest Rev. Reuben Omulo, was originally
							built in 1913. Established by Anglican missionaries,
							it has grown to become the seat of the Diocese of
							Maseno South.
						</p>
						<p className='font-body text-base leading-8 text-muted mb-8'>
							In obedience to the Great Commission, the
							Cathedral&apos;s holistic ministry makes disciples,
							proclaims Good News, heals communities, challenges
							injustice, and safeguards creation.
						</p>
						<div className='grid grid-cols-2 gap-2'>
							{values.map((v, i) => (
								<div
									key={v}
									className={`flex items-center gap-2.5 px-4 py-3 bg-white rounded-xl border border-parchment/60 shadow-sm ${i % 2 === 0 ? 'border-l-[3px] border-l-crimson' : 'border-l-[3px] border-l-royal'}`}
								>
									<span className='font-ui text-[9.5px] tracking-[1.5px] uppercase text-navy-mid font-semibold leading-tight'>
										{v}
									</span>
								</div>
							))}
						</div>
					</div>

					{/* Right */}
					<div className='flex flex-col gap-4'>
						<div className='bg-royal rounded-2xl p-6 sm:p-8'>
							<div className='flex items-center gap-2 mb-4'>
								<CrossOrnament
									color='rgba(255,255,255,0.4)'
									size={12}
								/>
								<p className='label-tag-light mb-0'>Vision</p>
							</div>
							<p className='font-display text-2xl sm:text-3xl italic font-normal text-white leading-relaxed'>
								&ldquo;A wholesome Christian ministry for the
								glory of God.&rdquo;
							</p>
						</div>
						<div className='bg-white rounded-2xl p-6 sm:p-8 border border-parchment/60 shadow-sm'>
							<p className='label-tag'>Mission</p>
							<p className='font-body text-[0.9rem] leading-8 text-muted'>
								To proclaim Christ and to demonstrate the work
								of the Holy Spirit through worship, witnessing,
								and ministry to the community.
							</p>
						</div>
						<div className='bg-white rounded-2xl p-6 sm:p-8 border border-parchment/60 shadow-sm'>
							<p className='label-tag mb-5'>Strategic Focus</p>
							<div className='space-y-0'>
								{FOCUS.map((f, i) => (
									<div
										key={f.title}
										className='py-3.5 border-b border-parchment/60 last:border-0'
									>
										<div className='flex items-start justify-between gap-3 mb-1'>
											<div className='flex items-center gap-2 min-w-0'>
												<div
													className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${i % 2 === 0 ? 'bg-crimson' : 'bg-royal'}`}
												/>
												<div className='font-ui text-[10px] font-semibold text-navy-mid tracking-[1px]'>
													{f.title}
												</div>
											</div>
											<div
												className={`font-display text-[0.8rem] italic flex-shrink-0 ${i % 2 === 0 ? 'text-crimson' : 'text-royal'}`}
											>
												{f.verse}
											</div>
										</div>
										<p className='font-body text-[0.78rem] text-muted leading-[1.7] pl-4'>
											{f.desc}
										</p>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* Leadership */}
				<div className='border-t border-parchment pt-16'>
					<SectionHeader
						label='Our Clergy'
						title='Cathedral Leadership'
						centered
					/>

					<div className='flex flex-wrap justify-center gap-6 max-w-7xl mx-auto'>
    {LEADERSHIP.map((l, i) => (
        <div
            key={i}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:shadow-crimson/10 transition-all duration-300 hover:-translate-y-0.5 flex flex-col items-center text-center p-6 w-full sm:w-[calc(50%-1.5rem)] md:w-[calc(33.333%-1.5rem)] lg:w-[calc(25%-1.5rem)]"
        >
            {/* Enlarged Circular Image Section */}
            <div className='relative w-32 h-32 mb-6 overflow-hidden rounded-full ring-4 ring-slate-50 shadow-inner'>
                {l.img ? (
                    <Image
                        src={l.img}
                        alt={l.name}
                        fill
                        className='object-cover object-top'
                        sizes='128px'
                    />
                ) : (
                    <div className='w-full h-full flex items-center justify-center bg-gradient-to-br from-royal-dark to-navy'>
                        <Users
                            size={36}
                            className='text-gold/40'
                        />
                    </div>
                )}
            </div>

            {/* Text Content - Exactly as requested */}
            <div className='flex flex-col items-center'>
                <p className={`font-ui text-[8px] tracking-[2px] uppercase mb-1.5 leading-tight ${i % 2 === 0 ? 'text-crimson' : 'text-royal'}`}>
                    {l.role}
                </p>
                
                <div className={`w-6 h-[2px] rounded-full mb-2 ${i % 2 === 0 ? 'bg-crimson' : 'bg-royal'}`} />
                
                <div className='font-display text-[0.95rem] font-medium text-navy-mid leading-snug mb-2 min-h-[2.5rem] flex items-center justify-center'>
                    {l.name}
                </div>
                
                <p className='font-body text-[0.72rem] text-muted leading-[1.8]'>
                    {l.bio}
                </p>
            </div>
        </div>
    ))}
</div>

					{/* Community Banner */}
					<div className='mt-6 relative h-56 sm:h-64 rounded-3xl overflow-hidden'>
						<Image
							src='/community.jpg'
							alt='Cathedral community'
							fill
							className='object-cover'
							sizes='100vw'
						/>
						<div className='absolute inset-0 bg-gradient-to-r from-royal-dark/95 to-navy/70' />
						<div className='absolute inset-0 flex flex-col justify-center px-6 sm:px-10 md:px-16'>
							<p className='label-tag-light'>Community</p>
							<h3 className='font-display text-2xl sm:text-3xl font-normal text-white mb-2'>
								One Family in Christ
							</h3>
							<p className='hidden sm:block font-body text-[0.85rem] text-white/55 leading-7 max-w-sm'>
								Serving the Diocese of Maseno South together,
								united in worship, mission, and service.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
