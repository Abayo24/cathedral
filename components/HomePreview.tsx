import Image from 'next/image';
import Link from 'next/link';
import { CalendarDays, ChevronRight, Clock, Heart, Images, Music, Play } from 'lucide-react';
import { SectionHeader } from './ui/SectionHeader';

const previews = [
	{ href: '/services', label: 'Worship', title: 'Sunday Services', desc: 'Adult, youth, teens, Deaf and Sunday School congregations every Sunday from 7:00 am.', img: '/interior.jpg', icon: Clock },
	{ href: '/events', label: "What's On", title: 'Events Calendar', desc: 'Conferences, fellowships and celebrations — add them straight to your phone calendar.', img: '/community.jpg', icon: CalendarDays },
	{ href: '/ministries', label: 'Community', title: 'Ministries', desc: 'KAMA, Mothers Union, Youth, Sunday School, Choir, Deaf Ministry — find your place.', img: '/choir2.jpg', icon: Music },
	{ href: '/sermons', label: 'The Word', title: 'Sermons', desc: 'Watch and listen to messages from our clergy, live and on demand.', img: '/bishop.jpg', icon: Play },
	{ href: '/gallery', label: 'Gallery', title: 'Life at the Cathedral', desc: 'Worship, sacraments and community — captured in photographs.', img: '/choir3.jpg', icon: Images },
	{ href: '/give', label: 'Stewardship', title: 'Give & Support', desc: 'Tithes, offerings and development — M-Pesa and bank transfer available.', img: '/give.jpg', icon: Heart },
];

export function HomePreview() {
	return (
		<section className='section-pad bg-ivory' aria-labelledby='explore-heading'>
			<div className='container-main'>
				<SectionHeader
					id='explore-heading'
					label='Explore the Cathedral'
					title='Everything You Need'
					subtitle='Plan your visit, join a ministry, watch sermons, or give — all in one place.'
					centered
				/>

				<ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
					{previews.map(({ href, label, title, desc, img, icon: Icon }, i) => {
						const crimson = i % 2 === 0;
						return (
							<li key={href}>
								<Link
									href={href}
									className={`group h-full relative overflow-hidden rounded-3xl bg-white border border-parchment/60 shadow-sm hover:shadow-xl hover:shadow-navy/10 transition-all duration-300 hover:-translate-y-1 no-underline flex flex-col ${
										crimson ? 'hover:border-crimson' : 'hover:border-royal'
									}`}
								>
									<div className='relative h-52 overflow-hidden'>
										<Image
											src={img}
											alt=''
											fill
											className='object-cover transition-transform duration-700 group-hover:scale-105'
											sizes='(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw'
										/>
										<div className='absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent' />
										<div
											className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-md ${crimson ? 'bg-crimson' : 'bg-royal'}`}
										>
											<Icon size={17} className='text-white' aria-hidden />
										</div>
									</div>
									<div className='p-6 flex flex-col flex-1'>
										<p className={`font-ui text-[11px] tracking-[2.5px] uppercase font-semibold mb-2 ${crimson ? 'text-crimson' : 'text-royal'}`}>
											{label}
										</p>
										<h3 className='font-display text-2xl font-medium text-navy-mid mb-2 leading-snug'>{title}</h3>
										<p className='font-body text-sm text-muted leading-7 mb-4 flex-1'>{desc}</p>
										<span
											className={`flex items-center gap-1.5 font-ui text-[11px] tracking-[2px] uppercase font-semibold ${crimson ? 'text-crimson' : 'text-royal'}`}
										>
											Explore
											<ChevronRight size={14} aria-hidden className='transition-transform duration-200 group-hover:translate-x-1' />
										</span>
									</div>
								</Link>
							</li>
						);
					})}
				</ul>
			</div>
		</section>
	);
}
