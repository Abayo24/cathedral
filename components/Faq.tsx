import { ChevronDown } from 'lucide-react';
import type { Faq as FaqItem } from '@/lib/types';

/** Native <details> accordion: keyboard and screen-reader friendly with no JavaScript. */
export function Faq({ faqs }: { faqs: FaqItem[] }) {
	return (
		<div className='space-y-3'>
			{faqs.map((f, i) => (
				<details key={f.question} className='group bg-white rounded-2xl border border-parchment/70 open:shadow-md' open={i === 0}>
					<summary className='flex items-center justify-between gap-4 cursor-pointer list-none p-5 sm:p-6 [&::-webkit-details-marker]:hidden'>
						<h3 className='font-display text-xl text-navy-mid leading-snug'>{f.question}</h3>
						<ChevronDown size={20} className='text-crimson flex-shrink-0 transition-transform group-open:rotate-180' aria-hidden />
					</summary>
					<p className='px-5 sm:px-6 pb-6 -mt-1 font-body text-base text-muted leading-8'>{f.answer}</p>
				</details>
			))}
		</div>
	);
}
