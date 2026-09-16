'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Megaphone, X } from 'lucide-react';

interface Props {
	id: string;
	title: string;
	link?: string;
	linkLabel?: string;
}

export function AnnouncementBanner({ id, title, link, linkLabel }: Props) {
	const storageKey = `banner-dismissed:${id}`;
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		try {
			if (localStorage.getItem(storageKey)) setVisible(false);
		} catch {
			// Storage can be unavailable (private mode) — just keep showing the banner.
		}
	}, [storageKey]);

	if (!visible) return null;

	const dismiss = () => {
		setVisible(false);
		try {
			localStorage.setItem(storageKey, '1');
		} catch {}
	};

	const isExternal = link?.startsWith('http');

	return (
		<div role='region' aria-label='Important notice' className='bg-crimson text-white'>
			<div className='container-main flex items-center gap-3 px-4 py-2.5'>
				<Megaphone size={16} aria-hidden className='flex-shrink-0' />
				<p className='font-ui text-sm leading-snug flex-1 min-w-0'>
					<span className='font-semibold'>{title}</span>
					{link && (
						<>
							{' '}
							<Link
								href={link}
								className='underline underline-offset-4 hover:no-underline whitespace-nowrap'
								{...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
							>
								{linkLabel || 'Learn more'}
							</Link>
						</>
					)}
					{!link && (
						<>
							{' '}
							<Link href='/bulletins' className='underline underline-offset-4 hover:no-underline whitespace-nowrap'>
								Read notice
							</Link>
						</>
					)}
				</p>
				<button
					type='button'
					onClick={dismiss}
					className='p-1.5 rounded-full hover:bg-white/15 flex-shrink-0'
					aria-label='Dismiss notice'
				>
					<X size={16} aria-hidden />
				</button>
			</div>
		</div>
	);
}
