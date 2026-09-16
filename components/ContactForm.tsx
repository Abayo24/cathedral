'use client';

import { type FormEvent, useEffect, useRef, useState, useTransition } from 'react';
import { CheckCircle2, Send } from 'lucide-react';
import { submitContact, type ContactResult } from '@/app/(site)/contact/actions';

const KINDS = [
	{ value: 'general', label: 'General enquiry' },
	{ value: 'prayer', label: 'Prayer request' },
	{ value: 'pastoral', label: 'Pastoral care or a visit' },
	{ value: 'sacrament', label: 'Baptism, wedding or dedication' },
];

const inputClass =
	'w-full rounded-xl border border-parchment bg-cream px-4 py-3 font-body text-base text-navy placeholder:text-faint focus:border-royal focus:bg-white aria-[invalid=true]:border-crimson';

export function ContactForm() {
	const [kind, setKind] = useState('general');
	const [result, setResult] = useState<ContactResult | null>(null);
	const [pending, startTransition] = useTransition();
	const startedAt = useRef(Date.now());
	const successRef = useRef<HTMLDivElement>(null);
	const errorRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const type = new URLSearchParams(window.location.search).get('type');
		if (type && KINDS.some((k) => k.value === type)) setKind(type);
	}, []);

	useEffect(() => {
		if (result?.ok) successRef.current?.focus();
		else if (result && !result.ok) errorRef.current?.focus();
	}, [result]);

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		startTransition(async () => {
			const res = await submitContact({
				kind,
				name: String(data.get('name') ?? ''),
				email: String(data.get('email') ?? ''),
				phone: String(data.get('phone') ?? ''),
				message: String(data.get('message') ?? ''),
				confidential: data.get('confidential') === 'on',
				website: String(data.get('website') ?? ''),
				startedAt: startedAt.current,
			});
			setResult(res);
		});
	};

	if (result?.ok) {
		return (
			<div ref={successRef} tabIndex={-1} role='status' className='rounded-3xl bg-white border border-parchment/70 p-8 text-center outline-none'>
				<CheckCircle2 size={40} className='mx-auto text-green-700 mb-4' aria-hidden />
				<h3 className='font-display text-3xl text-navy-mid mb-2'>Thank you</h3>
				<p className='font-body text-muted leading-8'>
					{kind === 'prayer'
						? 'Your prayer request has been received. Our clergy and prayer team will be praying with you.'
						: 'Your message has been received. A member of the Cathedral team will get back to you.'}
				</p>
			</div>
		);
	}

	const fieldErrors = result && !result.ok ? result.fieldErrors ?? {} : {};
	const pastoral = kind === 'prayer' || kind === 'pastoral';

	return (
		<form onSubmit={onSubmit} noValidate className='rounded-3xl bg-white border border-parchment/70 p-6 sm:p-8 space-y-5'>
			{result && !result.ok && (
				<div ref={errorRef} tabIndex={-1} role='alert' className='rounded-xl bg-crimson-light border border-crimson/30 p-4 font-ui text-sm text-crimson-dark outline-none'>
					{result.error}
				</div>
			)}

			<fieldset>
				<legend className='font-ui text-sm font-semibold text-navy-mid mb-2'>What can we help with?</legend>
				<div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
					{KINDS.map((k) => (
						<label
							key={k.value}
							className={`flex items-center gap-2.5 rounded-xl border px-4 py-3 cursor-pointer font-ui text-sm transition-colors ${
								kind === k.value ? 'border-royal bg-royal-light text-royal-dark' : 'border-parchment hover:border-royal/50'
							}`}
						>
							<input
								type='radio'
								name='kind'
								value={k.value}
								checked={kind === k.value}
								onChange={() => setKind(k.value)}
								className='accent-royal'
							/>
							{k.label}
						</label>
					))}
				</div>
			</fieldset>

			<div>
				<label htmlFor='contact-name' className='block font-ui text-sm font-semibold text-navy-mid mb-1.5'>
					Your name
				</label>
				<input
					id='contact-name'
					name='name'
					autoComplete='name'
					required
					maxLength={100}
					className={inputClass}
					aria-invalid={Boolean(fieldErrors.name)}
					aria-describedby={fieldErrors.name ? 'name-error' : undefined}
				/>
				{fieldErrors.name && (
					<p id='name-error' className='font-ui text-sm text-crimson mt-1.5'>
						{fieldErrors.name}
					</p>
				)}
			</div>

			<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
				<div>
					<label htmlFor='contact-email' className='block font-ui text-sm font-semibold text-navy-mid mb-1.5'>
						Email
					</label>
					<input
						id='contact-email'
						name='email'
						type='email'
						autoComplete='email'
						maxLength={200}
						className={inputClass}
						aria-invalid={Boolean(fieldErrors.contact)}
						aria-describedby='contact-hint'
					/>
				</div>
				<div>
					<label htmlFor='contact-phone' className='block font-ui text-sm font-semibold text-navy-mid mb-1.5'>
						Phone
					</label>
					<input
						id='contact-phone'
						name='phone'
						type='tel'
						autoComplete='tel'
						maxLength={30}
						className={inputClass}
						aria-invalid={Boolean(fieldErrors.contact)}
						aria-describedby='contact-hint'
					/>
				</div>
				<p id='contact-hint' className={`sm:col-span-2 font-ui text-sm -mt-2 ${fieldErrors.contact ? 'text-crimson' : 'text-muted'}`}>
					{fieldErrors.contact ?? 'Give at least one so we can reply.'}
				</p>
			</div>

			<div>
				<label htmlFor='contact-message' className='block font-ui text-sm font-semibold text-navy-mid mb-1.5'>
					{kind === 'prayer' ? 'Your prayer request' : 'Message'}
				</label>
				<textarea
					id='contact-message'
					name='message'
					required
					rows={6}
					maxLength={4000}
					className={inputClass}
					aria-invalid={Boolean(fieldErrors.message)}
					aria-describedby={fieldErrors.message ? 'message-error' : undefined}
				/>
				{fieldErrors.message && (
					<p id='message-error' className='font-ui text-sm text-crimson mt-1.5'>
						{fieldErrors.message}
					</p>
				)}
			</div>

			{pastoral && (
				<label className='flex items-start gap-3 font-ui text-sm text-navy-mid cursor-pointer'>
					<input type='checkbox' name='confidential' className='mt-1 accent-royal w-4 h-4' />
					<span>Keep this confidential — share only with the clergy.</span>
				</label>
			)}

			{/* Honeypot: hidden from people, tempting to bots */}
			<div aria-hidden className='absolute -left-[9999px] w-px h-px overflow-hidden'>
				<label htmlFor='contact-website'>Website</label>
				<input id='contact-website' name='website' tabIndex={-1} autoComplete='off' />
			</div>

			<button type='submit' disabled={pending} className='btn-crimson w-full sm:w-auto disabled:opacity-60 disabled:pointer-events-none'>
				<Send size={14} aria-hidden /> {pending ? 'Sending…' : 'Send message'}
			</button>
			<p className='font-ui text-xs text-muted'>Your details are only seen by Cathedral staff and are never shared.</p>
		</form>
	);
}
