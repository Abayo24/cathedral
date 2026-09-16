function StatItem({ label, value, sub }: { label: string; value: string; sub: string }) {
	return (
		<div className='text-center px-2 sm:px-8 flex flex-col-reverse'>
			<dt className='mt-1.5'>
				<span className='block font-ui text-[11px] tracking-[2px] uppercase text-white font-semibold mb-1'>{label}</span>
				<span className='hidden sm:block font-body text-xs italic text-white/75'>{sub}</span>
			</dt>
			<dd className='font-display text-4xl sm:text-5xl font-light text-gold-mid leading-none'>{value}</dd>
		</div>
	);
}

const Divider = () => <div aria-hidden className='w-px h-12 bg-white/20 flex-shrink-0 mx-2 sm:mx-8' />;

export function StatsBand({ congregations, ministries }: { congregations: number; ministries: number }) {
	return (
		<section className='bg-royal py-10 sm:py-14 px-4' aria-label='The Cathedral at a glance'>
			<dl className='container-main flex items-center justify-center'>
				<StatItem label='Founded' value='1913' sub='Over a century of worship' />
				<Divider />
				<StatItem label='Sunday Services' value={String(congregations)} sub='Congregations every Sunday' />
				<Divider />
				<StatItem label='Ministries' value={String(ministries)} sub='Active fellowships & guilds' />
			</dl>
		</section>
	);
}
