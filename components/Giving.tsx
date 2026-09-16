'use client';

import Image from 'next/image';
import { type KeyboardEvent, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { CrossOrnament } from './ui/CrossOrnament';
import { SectionHeader } from './ui/SectionHeader';
import type { GivingAccount } from '@/lib/types';

function CopyButton({ value, label }: { value: string; label: string }) {
	const [copied, setCopied] = useState(false);
	const copy = async () => {
		try {
			await navigator.clipboard.writeText(value);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch {
			// Clipboard can be blocked; the number is visible to copy manually.
		}
	};
	return (
		<button
			type='button'
			onClick={copy}
			className={`flex-shrink-0 border rounded-full px-3.5 py-2 flex items-center gap-1.5 font-ui text-[11px] tracking-[1.5px] uppercase transition-colors ${
				copied ? 'bg-green-50 border-green-300 text-green-800' : 'bg-white border-parchment text-muted hover:border-royal hover:text-royal'
			}`}
		>
			{copied ? <Check size={13} aria-hidden /> : <Copy size={13} aria-hidden />}
			<span aria-live='polite'>{copied ? 'Copied' : 'Copy'}</span>
			<span className='sr-only'> {label}</span>
		</button>
	);
}

export function Giving({ accounts, paybill }: { accounts: GivingAccount[]; paybill: string }) {
	const [activeIndex, setActiveIndex] = useState(0);
	const tabs = useRef<(HTMLButtonElement | null)[]>([]);
	const acc = accounts[activeIndex] ?? accounts[0];

	const onTabKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
		const n = accounts.length;
		const next = { ArrowRight: (i + 1) % n, ArrowLeft: (i - 1 + n) % n, Home: 0, End: n - 1 }[e.key];
		if (next === undefined) return;
		e.preventDefault();
		setActiveIndex(next);
		tabs.current[next]?.focus();
	};

	if (!acc) return null;

	return (
		<section className='section-pad bg-ivory'>
			<div className='container-md'>
				<SectionHeader label='Stewardship' title='Tithes & Offerings' centered />
				<p className='font-display text-xl sm:text-2xl italic text-muted text-center max-w-md mx-auto mb-10'>
					&ldquo;Commit your work to the Lord, and your plans will be established.&rdquo; — Proverbs 16:3
				</p>

				<div className='bg-white rounded-3xl overflow-hidden shadow-md shadow-navy/5 border border-parchment/60'>
					<div className='overflow-x-auto no-scrollbar bg-cream border-b border-parchment/60 px-2 pt-2'>
						<div role='tablist' aria-label='Giving funds' className='flex gap-1 min-w-max'>
							{accounts.map((a, i) => (
								<button
									key={a.id}
									ref={(el) => {
										tabs.current[i] = el;
									}}
									type='button'
									role='tab'
									id={`fund-tab-${a.id}`}
									aria-selected={i === activeIndex}
									aria-controls='fund-panel'
									tabIndex={i === activeIndex ? 0 : -1}
									onClick={() => setActiveIndex(i)}
									onKeyDown={(e) => onTabKeyDown(e, i)}
									className={`px-4 py-3 font-ui text-[12px] tracking-[1px] uppercase font-semibold whitespace-nowrap transition-colors rounded-t-xl ${
										i === activeIndex ? 'bg-white text-crimson shadow-sm' : 'text-muted hover:text-navy-mid hover:bg-white/60'
									}`}
								>
									{a.tab}
								</button>
							))}
						</div>
					</div>

					<div role='tabpanel' id='fund-panel' aria-labelledby={`fund-tab-${acc.id}`} className='grid grid-cols-1 md:grid-cols-2'>
						<div className='p-6 sm:p-8 md:p-10'>
							<h3 className='label-tag'>{acc.tab} Fund</h3>
							{acc.purpose && <p className='font-body text-base text-muted leading-8 mb-7'>{acc.purpose}</p>}

							<div className='bg-royal rounded-2xl p-6 mb-4'>
								<div className='flex flex-wrap justify-between items-center gap-2 mb-3'>
									<h4 className='label-tag-light !mb-0'>M-Pesa Paybill</h4>
									<span className='chip bg-gold-mid text-navy font-semibold'>Fastest</span>
								</div>
								<div className='flex items-center justify-between gap-3 flex-wrap'>
									<p className='font-display text-4xl sm:text-5xl font-light text-white tracking-[0.05em]'>{paybill}</p>
									<CopyButton value={paybill} label='paybill number' />
								</div>
								<p className='font-body text-sm text-white/85 mt-2'>
									Account: <span className='text-gold-mid font-semibold'>{acc.paybill}</span>
								</p>
							</div>

							{acc.number && (
								<div className='border border-parchment/60 rounded-2xl overflow-hidden'>
									<div className='bg-cream px-4 py-2.5 border-b border-parchment/60'>
										<h4 className='label-tag !mb-0'>Bank Transfer Details</h4>
									</div>
									<div className='p-4 sm:p-5'>
										<dl>
											{[
												['Bank', acc.bank],
												['Branch', acc.branch],
												['Account Name', acc.name],
												['SWIFT / BIC', acc.swift],
											]
												.filter(([, v]) => v)
												.map(([k, v]) => (
													<div key={k} className='flex flex-col sm:grid sm:grid-cols-[110px_1fr] gap-0.5 sm:gap-2 py-2 border-b border-ivory last:border-0'>
														<dt className='font-ui text-[11px] tracking-[1.5px] uppercase text-faint font-semibold'>{k}</dt>
														<dd className='font-body text-sm text-navy break-words'>{v}</dd>
													</div>
												))}
										</dl>
										<div className='mt-4 bg-cream border border-parchment/60 rounded-xl p-3 flex items-center justify-between gap-3 flex-wrap'>
											<div className='min-w-0'>
												<p className='font-ui text-[11px] tracking-[2px] uppercase text-muted mb-1'>Account Number</p>
												<p className='font-mono text-lg sm:text-xl font-bold text-navy-mid tracking-[0.04em] break-all'>{acc.number}</p>
											</div>
											<CopyButton value={acc.number} label='account number' />
										</div>
									</div>
								</div>
							)}
						</div>

						<div className='relative hidden md:block min-h-[400px] overflow-hidden'>
							<Image src='/offering.jpg' alt='' fill className='object-cover' sizes='450px' />
							<div className='absolute inset-0 bg-gradient-to-br from-royal-dark/95 to-navy/90' />
							<figure className='relative z-10 p-8 lg:p-10 h-full flex flex-col justify-center'>
								<CrossOrnament color='#E0AB20' size={22} className='mb-6' />
								<p className='label-tag-light'>Why We Give</p>
								<div aria-hidden className='w-9 h-[2px] rounded-full bg-crimson mb-6' />
								<blockquote className='font-display text-xl lg:text-2xl italic font-light text-white leading-[1.75] mb-5'>
									&ldquo;Each of you should give what you have decided in your heart to give, not reluctantly or under
									compulsion, for God loves a cheerful giver.&rdquo;
								</blockquote>
								<figcaption className='font-ui text-[11px] tracking-[3px] uppercase text-gold-mid'>— 2 Corinthians 9:7</figcaption>
							</figure>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
