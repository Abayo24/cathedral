'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { CrossOrnament } from './ui/CrossOrnament';
import { SectionHeader } from './ui/SectionHeader';
import { ACCOUNTS, CHURCH } from '@/lib/data';

export function Giving() {
	const [active, setActive] = useState(ACCOUNTS[0].id);
	const [copied, setCopied] = useState<number | null>(null);
	const acc = ACCOUNTS.find((a) => a.id === active)!;

	const copy = (text: string, id: number) => {
		navigator.clipboard.writeText(text).catch(() => {});
		setCopied(id);
		setTimeout(() => setCopied(null), 2000);
	};

	return (
		<section className='section-pad bg-ivory'>
			<div className='container-md'>
				<SectionHeader
					label='Stewardship'
					title='Tithes & Offerings'
					centered
				/>
				<p className='font-display text-xl sm:text-2xl italic text-muted text-center max-w-md mx-auto mb-10'>
					&ldquo;Commit your work to the Lord, and your plans will be
					established.&rdquo; — Proverbs 16:3
				</p>

				<div className='bg-white rounded-3xl overflow-hidden shadow-md shadow-navy/6 border border-parchment/60'>
					{/* Tabs */}
					<div className='overflow-x-auto no-scrollbar bg-cream/80 border-b border-parchment/60 px-2 pt-2'>
						<div className='flex gap-1 min-w-max'>
							{ACCOUNTS.map((a) => (
								<button
									key={a.id}
									onClick={() => setActive(a.id)}
									className={`px-4 py-2.5 font-ui text-[9px] tracking-[1.5px] uppercase font-semibold whitespace-nowrap transition-all duration-200 rounded-t-xl ${
										active === a.id
											? 'bg-white text-crimson shadow-sm'
											: 'text-muted hover:text-navy-mid hover:bg-white/60'
									}`}
								>
									{a.tab}
								</button>
							))}
						</div>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2'>
						<div className='p-6 sm:p-8 md:p-10'>
							<p className='label-tag'>{acc.tab} Fund</p>
							<p className='font-body text-[0.88rem] text-muted leading-8 mb-7'>
								{acc.purpose}
							</p>

							{/* M-Pesa */}
							<div className='bg-royal rounded-2xl p-6 mb-4'>
								<div className='flex flex-wrap justify-between items-center gap-2 mb-3'>
									<p className='label-tag-light mb-0'>
										M-Pesa Paybill
									</p>
									<span className='font-ui text-[8px] tracking-[2px] bg-gold/90 text-white px-3 py-1 rounded-full uppercase'>
										Fastest
									</span>
								</div>
								<div className='font-display text-4xl sm:text-5xl font-light text-white tracking-[0.05em]'>
									{CHURCH.paybill}
								</div>
								<p className='font-ui text-[9px] tracking-[2px] text-white/50 mt-1.5'>
									Account:{' '}
									<span className='text-gold-mid font-semibold'>
										{acc.paybill}
									</span>
								</p>
							</div>

							{/* Bank */}
							<div className='border border-parchment/60 rounded-2xl overflow-hidden'>
								<div className='bg-cream/80 px-4 py-2.5 border-b border-parchment/60'>
									<p className='label-tag mb-0'>
										Bank Transfer Details
									</p>
								</div>
								<div className='p-4 sm:p-5'>
									{[
										['Bank', acc.bank],
										['Branch', acc.branch],
										['Account Name', acc.name],
										['Swift / BIC', acc.swift],
									].map(([k, v]) => (
										<div
											key={k}
											className='flex flex-col sm:grid sm:grid-cols-[90px_1fr] gap-0.5 sm:gap-2 py-2 border-b border-ivory/80 last:border-0'
										>
											<span className='font-ui text-[8px] tracking-[2px] uppercase text-faint font-semibold'>
												{k}
											</span>
											<span className='font-body text-[0.8rem] text-navy break-words'>
												{v}
											</span>
										</div>
									))}
									<div className='mt-4 bg-cream/80 border border-parchment/60 rounded-xl p-3 flex items-center justify-between gap-3 flex-wrap'>
										<div className='min-w-0'>
											<div className='font-ui text-[8px] tracking-[3px] uppercase text-muted mb-1'>
												Account Number
											</div>
											<div className='font-mono text-lg sm:text-xl font-bold text-navy-mid tracking-[0.04em] break-all'>
												{acc.number}
											</div>
										</div>
										<button
											onClick={() =>
												copy(acc.number, acc.id)
											}
											className={`flex-shrink-0 border rounded-full px-3 py-1.5 flex items-center gap-1.5 transition-all duration-200 ${
												copied === acc.id
													? 'bg-green-50 border-green-200'
													: 'bg-white border-parchment hover:border-crimson/30 hover:bg-crimson/5'
											}`}
										>
											{copied === acc.id ? (
												<>
													<Check
														size={13}
														className='text-green-700'
													/>
													<span className='font-ui text-[8px] tracking-[2px] uppercase text-green-700'>
														Copied
													</span>
												</>
											) : (
												<>
													<Copy
														size={13}
														className='text-muted'
													/>
													<span className='font-ui text-[8px] tracking-[2px] uppercase text-muted'>
														Copy
													</span>
												</>
											)}
										</button>
									</div>
								</div>
							</div>
						</div>

						{/* Quote panel */}
						<div className='relative hidden md:block min-h-[400px] overflow-hidden rounded-br-3xl'>
							<Image
								src='/offering.jpg'
								alt='Congregation giving'
								fill
								className='object-cover'
								sizes='50vw'
							/>
							<div className='absolute inset-0 bg-gradient-to-br from-royal-dark/95 to-navy/90' />
							<div className='relative z-10 p-8 lg:p-10 h-full flex flex-col justify-center'>
								<CrossOrnament
									color='#B91C2E'
									size={22}
									className='mb-6'
								/>
								<p className='label-tag-light'>Why We Give</p>
								<div className='w-9 h-[2px] rounded-full bg-crimson mb-6' />
								<blockquote className='font-display text-xl lg:text-2xl italic font-light text-white leading-[1.75] mb-5'>
									&ldquo;Each of you should give what you have
									decided in your heart to give, not
									reluctantly or under compulsion, for God
									loves a cheerful giver.&rdquo;
								</blockquote>
								<cite className='font-ui text-[9px] tracking-[3px] uppercase text-gold not-italic'>
									— 2 Corinthians 9:7
								</cite>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
