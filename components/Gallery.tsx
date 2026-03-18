import Image from 'next/image';
import { SectionHeader } from './ui/SectionHeader';

const cells = [
	{
		cat: 'Exterior · Architectural',
		title: "St. Stephen's Cathedral",
		img: '/church.jpg',
		tall: true,
	},
	{ cat: 'Lake Victoria', title: 'Kisumu at Sunrise', img: '/lake.jpg' },
	{ cat: 'Worship', title: 'Cathedral Choir', img: '/choir.jpg' },
	{ cat: 'Sacraments', title: 'Holy Communion', img: '/holy-communion.jpg' },
	{ cat: 'Community', title: 'Youth Fellowship', img: '/youth.jpg' },
	{ cat: 'Interior', title: 'Stained Glass', img: '/sunday-service.jpg' },
];

export function Gallery() {
	return (
		<section className='section-pad bg-white'>
			<div className='container-main'>
				<SectionHeader
					label="Life at St. Stephen's"
					title='A Living, Vibrant Community'
					centered
					className='mb-10'
				/>

				{/* Mobile */}
				<div className='flex flex-col gap-3 sm:hidden'>
					{cells.map((c, i) => (
						<GalleryCell
							key={i}
							{...c}
							className='h-52 rounded-2xl'
						/>
					))}
				</div>

				{/* Tablet */}
				<div className='hidden sm:grid lg:hidden grid-cols-2 gap-3'>
					{cells.map((c, i) => (
						<GalleryCell
							key={i}
							{...c}
							className='h-56 rounded-2xl'
						/>
					))}
				</div>

				{/* Desktop bento */}
				<div
					className='hidden lg:grid grid-cols-4 gap-3'
					style={{ gridTemplateRows: '280px 280px' }}
				>
					<div className='col-span-2 row-span-2 relative img-zoom rounded-3xl overflow-hidden bg-parchment'>
						<Image
							src={cells[0].img}
							alt={cells[0].title}
							fill
							className='object-cover'
							sizes='50vw'
						/>
						<div className='absolute inset-0 bg-gradient-to-t from-navy/85 via-transparent to-transparent' />
						<CellCaption
							cat={cells[0].cat}
							title={cells[0].title}
						/>
					</div>
					{cells.slice(1, 5).map((c, i) => (
						<div
							key={i}
							className='col-span-1 row-span-1 relative img-zoom rounded-2xl overflow-hidden bg-parchment'
						>
							<Image
								src={c.img}
								alt={c.title}
								fill
								className='object-cover'
								sizes='25vw'
							/>
							<div className='absolute inset-0 bg-gradient-to-t from-navy/85 via-transparent to-transparent' />
							<CellCaption cat={c.cat} title={c.title} />
						</div>
					))}
					<div className='col-span-2 row-span-1 relative img-zoom rounded-2xl overflow-hidden bg-parchment'>
						<Image
							src={cells[5].img}
							alt={cells[5].title}
							fill
							className='object-cover'
							sizes='50vw'
						/>
						<div className='absolute inset-0 bg-gradient-to-t from-navy/85 via-transparent to-transparent' />
						<CellCaption
							cat={cells[5].cat}
							title={cells[5].title}
						/>
					</div>
				</div>

				{/* Drone + Interior */}
				<div className='grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3'>
					{[
						{
							label: 'Aerial View',
							title: 'Cathedral Compound',
							img: '/aerial.jpg',
							from: 'from-royal-dark/90',
							to: 'to-navy/80',
						},
						{
							label: 'Interior',
							title: 'The Sacred Nave',
							img: '/interior.jpg',
							from: 'from-navy/85',
							to: 'to-navy/50',
						},
					].map((c, i) => (
						<div
							key={i}
							className='relative h-36 sm:h-44 rounded-2xl overflow-hidden'
						>
							<Image
								src={c.img}
								alt={c.title}
								fill
								className='object-cover'
								sizes='50vw'
							/>
							<div
								className={`absolute inset-0 bg-gradient-to-r ${c.from} ${c.to}`}
							/>
							<div className='absolute inset-0 flex flex-col items-center justify-center text-center p-4'>
								<div className='font-ui text-[8px] tracking-[3px] uppercase text-gold mb-1'>
									{c.label}
								</div>
								<div className='font-display text-base sm:text-lg font-medium text-white'>
									{c.title}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

function GalleryCell({
	cat,
	title,
	img,
	className = '',
}: {
	cat: string;
	title: string;
	img: string;
	tall?: boolean;
	className?: string;
}) {
	return (
		<div
			className={`relative img-zoom overflow-hidden bg-parchment ${className}`}
		>
			<Image
				src={img}
				alt={title}
				fill
				className='object-cover'
				sizes='100vw'
			/>
			<div className='absolute inset-0 bg-gradient-to-t from-navy/85 via-transparent to-transparent' />
			<CellCaption cat={cat} title={title} />
		</div>
	);
}

function CellCaption({ cat, title }: { cat: string; title: string }) {
	return (
		<div className='absolute bottom-0 left-0 p-4 sm:p-5'>
			<div className='font-ui text-[7px] tracking-[2px] uppercase text-gold-mid mb-1'>
				{cat}
			</div>
			<div className='font-display text-base sm:text-lg font-medium text-white leading-tight'>
				{title}
			</div>
		</div>
	);
}
