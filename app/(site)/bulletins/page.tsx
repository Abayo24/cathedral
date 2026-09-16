import Link from 'next/link';
import { Bell, ExternalLink, FileText, Pin } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { getAnnouncements, getBulletins } from '@/lib/content';
import { formatDayKey, formatShortDate } from '@/lib/dates';
import { pageMetadata } from '@/lib/seo';

export const revalidate = 900;

export const metadata = pageMetadata({
	title: 'Notices & Weekly Bulletins',
	description:
		"Latest announcements and weekly Sunday bulletins from ACK St. Stephen's Cathedral Kisumu — readings, parish notices, collections and upcoming activities.",
	path: '/bulletins',
});

export default async function BulletinsPage() {
	const [announcements, bulletins] = await Promise.all([getAnnouncements(), getBulletins()]);

	return (
		<>
			<PageHero
				label='Stay Informed'
				title='Notices & Bulletins'
				subtitle='Parish announcements and the weekly Sunday bulletin.'
				img='/church.jpg'
				breadcrumbs={[{ name: 'Bulletins', path: '/bulletins' }]}
			/>

			<section className='section-pad bg-cream' aria-labelledby='notices-heading'>
				<div className='container-md'>
					<SectionHeader id='notices-heading' label='Announcements' title='Parish Notices' centered />
					{announcements.length > 0 ? (
						<ul className='space-y-4'>
							{announcements.map((a) => {
								const external = a.link?.startsWith('http');
								return (
									<li key={a.id} className={`bg-white rounded-2xl border p-6 sm:p-7 ${a.pinned ? 'border-crimson/40 shadow-md' : 'border-parchment/70'}`}>
										<article>
											<div className='flex items-start justify-between gap-4 mb-2'>
												<h3 className='font-display text-2xl text-navy-mid leading-snug flex items-start gap-2'>
													{a.pinned ? (
														<Pin size={18} className='text-crimson mt-1.5 flex-shrink-0' aria-label='Pinned' />
													) : (
														<Bell size={18} className='text-royal mt-1.5 flex-shrink-0' aria-hidden />
													)}
													{a.title}
												</h3>
												<time dateTime={a.publishedAt} className='font-ui text-xs text-faint whitespace-nowrap mt-2'>
													{formatShortDate(a.publishedAt)}
												</time>
											</div>
											<p className='font-body text-base text-muted leading-8 whitespace-pre-line'>{a.body}</p>
											{a.link && (
												<Link
													href={a.link}
													className='btn-outline mt-4 !py-2.5'
													{...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
												>
													{a.linkLabel || 'Learn more'}
													{external && <ExternalLink size={13} aria-hidden />}
												</Link>
											)}
										</article>
									</li>
								);
							})}
						</ul>
					) : (
						<p className='text-center font-body text-muted'>There are no current notices.</p>
					)}
				</div>
			</section>

			<section className='section-pad bg-ivory' aria-labelledby='bulletins-heading'>
				<div className='container-md'>
					<SectionHeader id='bulletins-heading' label='Every Sunday' title='Weekly Bulletins' centered />
					{bulletins.length > 0 ? (
						<ul className='space-y-4'>
							{bulletins.map((b, i) => (
								<li key={b.id} className='bg-white rounded-2xl border border-parchment/70 p-6 sm:p-7'>
									<article>
										<div className='flex flex-col sm:flex-row sm:items-start justify-between gap-4'>
											<div>
												{i === 0 && <p className='label-tag !mb-1.5'>Latest</p>}
												<h3 className='font-display text-2xl text-navy-mid leading-snug'>{b.title}</h3>
												<p className='font-ui text-sm text-muted mt-1'>
													<time dateTime={b.date}>{formatDayKey(b.date, 'long')}</time>
												</p>
											</div>
											{b.fileUrl && (
												<a href={`${b.fileUrl}?dl=`} className='btn-royal !py-2.5 !px-5 self-start' target='_blank' rel='noopener noreferrer'>
													<FileText size={14} aria-hidden /> PDF<span className='sr-only'> of {b.title}</span>
												</a>
											)}
										</div>
										{b.highlights.length > 0 && (
											<ul className='mt-4 space-y-1.5 list-disc pl-5 font-body text-base text-muted leading-7 marker:text-crimson'>
												{b.highlights.map((h, j) => (
													<li key={j}>{h}</li>
												))}
											</ul>
										)}
									</article>
								</li>
							))}
						</ul>
					) : (
						<p className='text-center font-body text-muted'>Weekly bulletins will be published here.</p>
					)}
				</div>
			</section>
		</>
	);
}
