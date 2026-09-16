/**
 * The church admin dashboard (Sanity Studio). Staff sign in with the account
 * they were invited with at https://www.sanity.io/manage.
 */
import { NextStudio } from 'next-sanity/studio';

import { isSanityConfigured } from '@/sanity/env';
import config from '../../../sanity.config';

export const dynamic = 'force-static';

export { metadata, viewport } from 'next-sanity/studio';

export default function AdminPage() {
	if (!isSanityConfigured) {
		return (
			<div style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 640, margin: '10vh auto', padding: '0 24px', lineHeight: 1.6 }}>
				<h1>Admin dashboard not configured</h1>
				<p>
					Set <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> and <code>NEXT_PUBLIC_SANITY_DATASET</code> in your
					environment (see <code>.env.example</code>), then restart the site.
				</p>
			</div>
		);
	}
	return <NextStudio config={config} />;
}
