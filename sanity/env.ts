export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-02-19'

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''

/**
 * When the CMS isn't configured the website still renders, using the
 * built-in content in lib/data.ts.
 */
export const isSanityConfigured = Boolean(projectId)
