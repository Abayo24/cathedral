import { Info } from 'lucide-react';
import { CrossOrnament } from './ui/CrossOrnament';
import { SectionHeader } from './ui/SectionHeader';
import type { ServiceSchedule, ServiceSlot } from '@/lib/types';

function ServiceRow({ label, time, venue, accent }: ServiceSlot & { accent: 'crimson' | 'royal' }) {
	return (
		<li className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-4 border-b border-parchment/70 last:border-0'>
			<div>
				<h4 className={`font-ui text-[11px] tracking-[2px] uppercase font-semibold mb-1 ${accent === 'crimson' ? 'text-crimson' : 'text-royal'}`}>
					{label}
				</h4>
				<p className='font-display text-xl sm:text-2xl font-medium text-navy-mid'>{time}</p>
			</div>
			{venue && (
				<p className={`chip self-start sm:self-center ${accent === 'crimson' ? 'bg-crimson/10 text-crimson-dark' : 'bg-royal/10 text-royal'}`}>
					{venue}
				</p>
			)}
		</li>
	);
}

function ScheduleCard({ title, slots, accent }: { title: string; slots: ServiceSlot[]; accent: 'crimson' | 'royal' }) {
	return (
		<div className='bg-white rounded-2xl p-6 sm:p-8 shadow-sm shadow-navy/5'>
			<div className='flex items-center gap-2.5 mb-4'>
				<div aria-hidden className={`w-1 h-5 rounded-full flex-shrink-0 ${accent === 'crimson' ? 'bg-crimson' : 'bg-royal'}`} />
				<h3 className={`font-ui text-[12px] tracking-[2.5px] uppercase font-semibold ${accent === 'crimson' ? 'text-crimson' : 'text-royal'}`}>
					{title}
				</h3>
			</div>
			<ul>
				{slots.map((s) => (
					<ServiceRow key={s.label} {...s} accent={accent} />
				))}
			</ul>
		</div>
	);
}

export function Services({ schedule }: { schedule: ServiceSchedule }) {
	return (
		<section className='section-pad bg-ivory' aria-labelledby='schedule-heading'>
			<div className='container-main'>
				<SectionHeader id='schedule-heading' label='Join Us for Worship' title='Weekly Service Schedule' centered />

				{schedule.note && (
					<div role='note' className='mb-8 flex items-start gap-3 rounded-2xl bg-gold-pale border border-gold/40 p-5 max-w-3xl mx-auto'>
						<Info size={18} className='text-gold mt-1 flex-shrink-0' aria-hidden />
						<p className='font-body text-navy-mid leading-7'>{schedule.note}</p>
					</div>
				)}

				<div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-8'>
					<ScheduleCard title='Sunday · Adult Services' slots={schedule.adult} accent='crimson' />
					<ScheduleCard title='Sunday · Youth & Specialised' slots={schedule.specialised} accent='royal' />
				</div>

				<div className='bg-crimson rounded-3xl p-6 sm:p-8 md:p-10'>
					<div className='flex items-center gap-3 mb-7'>
						<CrossOrnament color='rgba(255,255,255,0.7)' size={16} />
						<h3 className='font-ui text-[12px] tracking-[2.5px] uppercase font-semibold text-gold-pale'>Schedule of Holy Communion</h3>
					</div>
					<ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4'>
						{schedule.communion.map((c) => (
							<li key={c.label} className='bg-white/10 rounded-xl p-4'>
								<h4 className='font-ui text-[11px] tracking-[2px] uppercase text-white/90 font-semibold mb-1.5'>{c.label}</h4>
								<p className='font-display text-lg text-white font-normal mb-1 leading-snug'>{c.time}</p>
								{c.venue && <p className='font-ui text-xs text-white/80'>{c.venue}</p>}
							</li>
						))}
					</ul>
				</div>
			</div>
		</section>
	);
}
