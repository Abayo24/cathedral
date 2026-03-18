import { CrossOrnament } from './ui/CrossOrnament';
import { SectionHeader } from './ui/SectionHeader';

const adult = [
	{ slot: 'First Service', time: '7:00 – 8:30 am', venue: 'Main Sanctuary' },
	{
		slot: 'Second Service',
		time: '9:00 – 10:30 am',
		venue: 'Main Sanctuary',
	},
	{
		slot: 'Third Service',
		time: '11:00 am – 12:30 pm',
		venue: 'Main Sanctuary',
	},
];
const specialised = [
	{ slot: 'Youth Service', time: '8:00 – 10:00 am', venue: 'Old Sanctuary' },
	{
		slot: 'Deaf Service',
		time: '10:30 am – 12:30 pm',
		venue: 'Old Sanctuary',
	},
	{
		slot: 'Sunday School',
		time: '7:00 / 9:00 / 11:00 am',
		venue: 'Provisional',
	},
	{
		slot: 'Teens Service',
		time: '11:00 am – 12:30 pm',
		venue: 'Provisional',
	},
];
const communion = [
	{ sunday: '1st Sunday', time: '9:00 – 10:30 am', venue: 'Main Sanctuary' },
	{
		sunday: '2nd Sunday',
		time: '7:00 – 8:30 am & 11:00 am – 12:30 pm',
		venue: 'Main Sanctuary',
	},
	{ sunday: '3rd Sunday', time: '8:00 – 10:00 am', venue: 'Old Sanctuary' },
	{
		sunday: '4th Sunday',
		time: '10:30 am – 12:30 pm',
		venue: 'Old Sanctuary',
	},
	{
		sunday: 'Wednesday Mid-Week',
		time: '8:00 – 9:00 am & 5:00 – 6:00 pm',
		venue: 'Old / Main',
	},
];

function ServiceRow({
	slot,
	time,
	venue,
	accent = 'crimson',
}: {
	slot: string;
	time: string;
	venue: string;
	accent?: 'crimson' | 'royal';
}) {
	return (
		<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-4 border-b border-parchment/70 last:border-0'>
			<div>
				<div
					className={`font-ui text-[9px] tracking-[2px] uppercase mb-1 ${accent === 'crimson' ? 'text-crimson' : 'text-royal'}`}
				>
					{slot}
				</div>
				<div className='font-display text-xl sm:text-2xl font-medium text-navy-mid'>
					{time}
				</div>
			</div>
			<div
				className={`inline-flex font-ui text-[9px] tracking-[1px] uppercase px-3 py-1 rounded-full self-start sm:self-center ${accent === 'crimson' ? 'bg-crimson/8 text-crimson' : 'bg-royal/8 text-royal'}`}
			>
				{venue}
			</div>
		</div>
	);
}

export function Services() {
	return (
		<section className='section-pad bg-ivory'>
			<div className='container-main'>
				<SectionHeader
					label='Join Us for Worship'
					title='Weekly Service Schedule'
					centered
				/>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-8'>
					<div className='bg-white rounded-2xl p-6 sm:p-8 shadow-sm shadow-navy/5'>
						<div className='flex items-center gap-2.5 mb-6'>
							<div className='w-1 h-5 bg-crimson rounded-full flex-shrink-0' />
							<p className='font-ui text-[10px] tracking-[3px] uppercase font-semibold text-crimson'>
								Sunday · Adult Services
							</p>
						</div>
						{adult.map((s) => (
							<ServiceRow key={s.slot} {...s} />
						))}
					</div>
					<div className='bg-white rounded-2xl p-6 sm:p-8 shadow-sm shadow-navy/5'>
						<div className='flex items-center gap-2.5 mb-6'>
							<div className='w-1 h-5 bg-royal rounded-full flex-shrink-0' />
							<p className='font-ui text-[10px] tracking-[3px] uppercase font-semibold text-royal'>
								Sunday · Youth & Specialised
							</p>
						</div>
						{specialised.map((s) => (
							<ServiceRow key={s.slot} {...s} accent='royal' />
						))}
					</div>
				</div>

				{/* Communion block */}
				<div className='bg-crimson rounded-3xl p-6 sm:p-8 md:p-10'>
					<div className='flex items-center gap-3 mb-7'>
						<CrossOrnament
							color='rgba(255,255,255,0.55)'
							size={16}
						/>
						<p className='font-ui text-[10px] tracking-[3px] uppercase font-semibold text-gold-mid'>
							Schedule of Holy Communion
						</p>
					</div>
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5'>
						{communion.map((c) => (
							<div
								key={c.sunday}
								className='bg-white/10 rounded-xl p-4'
							>
								<div className='font-ui text-[9px] tracking-[2px] uppercase text-white/65 mb-1.5'>
									{c.sunday}
								</div>
								<div className='font-display text-base sm:text-lg text-white font-normal mb-1 leading-snug'>
									{c.time}
								</div>
								<div className='font-ui text-[9px] text-white/45'>
									{c.venue}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
