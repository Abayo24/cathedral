'use client';

import { type KeyboardEvent, type TouchEvent, useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { CmsImage } from './ui/CmsImage';
import type { Img } from '@/lib/types';

const bentoClasses = [
	'sm:col-span-2 sm:row-span-2',
	'',
	'',
	'sm:col-span-2',
	'sm:row-span-2',
	'',
];

/** Photo grid for one album, with an accessible full-screen lightbox. */
export function AlbumPhotos({ title, images }: { title: string; images: Img[] }) {
	const [openIndex, setOpenIndex] = useState<number | null>(null);
	const thumbs = useRef<(HTMLButtonElement | null)[]>([]);
	const dialog = useRef<HTMLDivElement>(null);
	const closeButton = useRef<HTMLButtonElement>(null);
	const touchStartX = useRef<number | null>(null);
	const lastOpened = useRef<number | null>(null);

	const count = images.length;
	const close = useCallback(() => setOpenIndex(null), []);
	const step = useCallback((delta: number) => setOpenIndex((i) => (i === null ? i : (i + delta + count) % count)), [count]);

	useEffect(() => {
		if (openIndex === null) {
			if (lastOpened.current !== null) thumbs.current[lastOpened.current]?.focus();
			lastOpened.current = null;
			return;
		}
		if (lastOpened.current === null) closeButton.current?.focus();
		lastOpened.current = openIndex;
		const previous = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = previous;
		};
	}, [openIndex]);

	const onDialogKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
		if (e.key === 'Escape') close();
		else if (e.key === 'ArrowRight') step(1);
		else if (e.key === 'ArrowLeft') step(-1);
		else if (e.key === 'Tab') {
			// Keep focus inside the dialog.
			const focusable = dialog.current?.querySelectorAll<HTMLElement>('button');
			if (!focusable?.length) return;
			const first = focusable[0];
			const last = focusable[focusable.length - 1];
			if (e.shiftKey && document.activeElement === first) {
				e.preventDefault();
				last.focus();
			} else if (!e.shiftKey && document.activeElement === last) {
				e.preventDefault();
				first.focus();
			}
		}
	};

	const onTouchStart = (e: TouchEvent) => {
		touchStartX.current = e.touches[0].clientX;
	};
	const onTouchEnd = (e: TouchEvent) => {
		if (touchStartX.current === null) return;
		const delta = e.changedTouches[0].clientX - touchStartX.current;
		if (Math.abs(delta) > 50) step(delta < 0 ? 1 : -1);
		touchStartX.current = null;
	};

	const current = openIndex !== null ? images[openIndex] : null;

	return (
		<>
			<ul className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 auto-rows-[160px] sm:auto-rows-[220px] grid-flow-row-dense'>
				{images.map((image, index) => (
					<li key={`${image.src}-${index}`} className={`relative ${bentoClasses[index % bentoClasses.length]}`}>
						<button
							type='button'
							ref={(el) => {
								thumbs.current[index] = el;
							}}
							onClick={() => setOpenIndex(index)}
							className='group absolute inset-0 overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-shadow'
							aria-label={`Open photo ${index + 1} of ${count}: ${image.alt}`}
						>
							<CmsImage
								image={image}
								alt=''
								fill
								sizes='(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw'
								className='object-cover transition-transform duration-500 group-hover:scale-105'
								priority={index < 4}
							/>
						</button>
					</li>
				))}
			</ul>

			{current && openIndex !== null && (
				<div
					ref={dialog}
					role='dialog'
					aria-modal='true'
					aria-label={`${title} — photo ${openIndex + 1} of ${count}`}
					onKeyDown={onDialogKeyDown}
					onTouchStart={onTouchStart}
					onTouchEnd={onTouchEnd}
					className='fixed inset-0 z-[60] bg-black/95 flex flex-col animate-fade-in'
				>
					<div className='flex items-center justify-between px-4 py-3 text-white'>
						<p className='font-ui text-sm text-white/85' aria-live='polite'>
							{openIndex + 1} / {count}
						</p>
						<button
							ref={closeButton}
							type='button'
							onClick={close}
							className='p-2.5 rounded-full hover:bg-white/15'
							aria-label='Close photo viewer'
						>
							<X size={26} aria-hidden />
						</button>
					</div>

					<div className='relative flex-1 mx-2 sm:mx-16' onClick={close}>
						<CmsImage
							key={current.src}
							image={current}
							fill
							sizes='100vw'
							className='object-contain'
							onClick={(e) => e.stopPropagation()}
							priority
						/>
					</div>

					<p className='min-h-[3rem] px-4 py-3 text-center font-body text-sm text-white/85'>{current.alt}</p>

					{count > 1 && (
						<>
							<button
								type='button'
								onClick={() => step(-1)}
								className='absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white'
								aria-label='Previous photo'
							>
								<ChevronLeft size={26} aria-hidden />
							</button>
							<button
								type='button'
								onClick={() => step(1)}
								className='absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white'
								aria-label='Next photo'
							>
								<ChevronRight size={26} aria-hidden />
							</button>
						</>
					)}
				</div>
			)}
		</>
	);
}
