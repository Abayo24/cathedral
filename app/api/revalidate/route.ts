/**
 * Sanity webhook target. When staff publish in the admin dashboard, Sanity
 * calls this endpoint and the site's cached pages are refreshed immediately.
 * Set up in https://www.sanity.io/manage → API → Webhooks (see README).
 */
import { revalidatePath, revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';
import { SANITY_TAG } from '@/sanity/lib/client';

export async function POST(request: NextRequest) {
	const secret = process.env.SANITY_REVALIDATE_SECRET;
	if (!secret) {
		return NextResponse.json({ message: 'SANITY_REVALIDATE_SECRET is not set' }, { status: 500 });
	}

	try {
		const { isValidSignature, body } = await parseBody<{ _type?: string }>(request, secret, true);
		if (!isValidSignature) {
			return NextResponse.json({ message: 'Invalid signature' }, { status: 401 });
		}

		revalidateTag(SANITY_TAG);
		// Pages that compute "upcoming" from the clock are also refreshed.
		revalidatePath('/', 'layout');
		return NextResponse.json({ revalidated: true, type: body?._type ?? null, now: Date.now() });
	} catch (error) {
		console.error('[revalidate]', error);
		return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
	}
}
