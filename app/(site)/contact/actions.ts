'use server';

import { randomUUID } from 'crypto';
import { headers } from 'next/headers';
import { writeClient } from '@/sanity/lib/write-client';

export interface ContactInput {
	kind: string;
	name: string;
	email: string;
	phone: string;
	message: string;
	confidential: boolean;
	/** Honeypot — real visitors never fill this in. */
	website: string;
	/** Timestamp from when the form was shown; instant submissions are bots. */
	startedAt: number;
}

export type ContactResult = { ok: true } | { ok: false; error: string; fieldErrors?: Partial<Record<'name' | 'contact' | 'message', string>> };

const KINDS = new Set(['general', 'prayer', 'pastoral', 'sacrament']);
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Best-effort, per-instance rate limit (5 messages per 10 minutes per IP).
const recent = new Map<string, number[]>();
function isRateLimited(ip: string) {
	const now = Date.now();
	const hits = (recent.get(ip) ?? []).filter((t) => now - t < 10 * 60 * 1000);
	hits.push(now);
	recent.set(ip, hits);
	return hits.length > 5;
}

const clean = (value: unknown, max: number) => String(value ?? '').trim().slice(0, max);

export async function submitContact(input: ContactInput): Promise<ContactResult> {
	// Pretend success to bots so they don't retry.
	if (clean(input.website, 200) || Date.now() - Number(input.startedAt) < 2500) return { ok: true };

	const kind = KINDS.has(input.kind) ? input.kind : 'general';
	const name = clean(input.name, 100);
	const email = clean(input.email, 200);
	const phone = clean(input.phone, 30);
	const message = clean(input.message, 4000);

	const fieldErrors: NonNullable<Extract<ContactResult, { ok: false }>['fieldErrors']> = {};
	if (!name) fieldErrors.name = 'Please tell us your name.';
	if (!email && !phone) fieldErrors.contact = 'Please give an email address or phone number so we can reply.';
	else if (email && !EMAIL.test(email)) fieldErrors.contact = 'That email address doesn’t look right.';
	if (message.length < 5) fieldErrors.message = 'Please write your message.';
	if (Object.keys(fieldErrors).length) return { ok: false, error: 'Please check the highlighted fields.', fieldErrors };

	const ip = headers().get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
	if (isRateLimited(ip)) {
		return { ok: false, error: 'You have sent several messages recently. Please try again later or call the Cathedral office.' };
	}

	if (!writeClient) {
		return { ok: false, error: 'Online messages are temporarily unavailable. Please call or email the Cathedral office.' };
	}

	try {
		await writeClient.create({
			// A dot in the ID keeps the document private even if the dataset is public.
			_id: `inbox.${randomUUID()}`,
			_type: 'contactMessage',
			status: 'new',
			kind,
			name,
			email,
			phone,
			message,
			confidential: Boolean(input.confidential),
			receivedAt: new Date().toISOString(),
		});
		return { ok: true };
	} catch (error) {
		console.error('[contact] Failed to save message', error);
		return { ok: false, error: 'Sorry, your message could not be sent. Please call or email the Cathedral office.' };
	}
}
