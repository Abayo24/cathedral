import { HeraldRule } from './ui/HeraldRule';

export function Welcome() {
	return (
		<section className='section-pad bg-cream'>
			<div className='container-sm text-center px-4 sm:px-6'>
				<p className='label-tag text-center'>Welcome</p>
				<h2 className='font-display text-3xl sm:text-4xl md:text-5xl font-normal leading-tight -tracking-[0.01em] text-navy-mid mb-5 text-center'>
					A Cathedral at the Heart of <em>Lake Victoria</em>
				</h2>
				<HeraldRule className='max-w-[140px] mx-auto mb-8' />
				<p className='font-body text-base leading-8 text-muted mb-5'>
					Originally built in 1913 and locally known as{' '}
					<em>&ldquo;Komulo&rdquo;</em> in honour of pioneer priest
					Rev. Reuben Omulo, ACK St. Stephen&apos;s Cathedral stands
					as the mother church of the Diocese of Maseno South — a
					beacon of Anglican faith and community service in Kisumu.
				</p>
				<p className='font-body text-base leading-8 text-muted'>
					In obedience to the Great Commission, we proclaim Christ,
					make disciples, heal communities, and pursue justice —
					welcoming all who seek the living God.
				</p>
			</div>
		</section>
	);
}
