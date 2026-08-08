function StatItem({
	label,
	value,
	sub,
}: {
	label: string;
	value: string;
	sub: string;
}) {
	return (
		<div className='text-center px-3 sm:px-8'>
			<div className='font-display text-4xl sm:text-5xl font-light text-gold-mid leading-none'>
				{value}
			</div>
			<div className='font-ui text-[9px] tracking-[2px] uppercase text-white font-semibold mt-1.5 mb-1'>
				{label}
			</div>
			<div className='font-body text-[10px] italic text-white/50'>
				{sub}
			</div>
		</div>
	);
}

export function StatsBand() {
	return (
		<section className='bg-royal py-10 sm:py-14 px-4'>
			<div className='container-main flex items-center justify-center'>
				<StatItem
					label='Founded'
					value='1913'
					sub='Over a century of worship'
				/>
				<div className='w-px h-12 bg-white/20 flex-shrink-0 mx-4 sm:mx-8' />
				<StatItem
					label='Sunday Services'
					value='5+'
					sub='Multiple congregations weekly'
				/>
				<div className='w-px h-12 bg-white/20 flex-shrink-0 mx-4 sm:mx-8' />
				<StatItem
					label='Ministries'
					value='9'
					sub='Active fellowships & guilds'
				/>
			</div>
		</section>
	);
}
