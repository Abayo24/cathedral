// Import from @sanity/client, not next-sanity: the next-sanity root re-exports
// client components that would otherwise be bundled into every public page.
import { createClient, type QueryParams } from '@sanity/client'

import { apiVersion, dataset, isSanityConfigured, projectId } from '../env'

export const client = isSanityConfigured
  ? createClient({ projectId, dataset, apiVersion, useCdn: false, perspective: 'published' })
  : null

/**
 * Pages are statically cached and refreshed at most every minute. The
 * /api/revalidate webhook purges the 'sanity' tag so edits show up instantly.
 */
export const REVALIDATE_SECONDS = 60
export const SANITY_TAG = 'sanity'

/** Returns null when Sanity is not configured, errors, or has no content. */
export async function sanityFetch<T>(query: string, params: QueryParams = {}): Promise<T | null> {
  if (!client) return null
  try {
    const result = await client.fetch<T>(query, params, {
      next: { revalidate: REVALIDATE_SECONDS, tags: [SANITY_TAG] },
    })
    if (result == null || (Array.isArray(result) && result.length === 0)) return null
    return result
  } catch (error) {
    console.error('[sanity] Query failed — falling back to built-in content.', error)
    return null
  }
}
