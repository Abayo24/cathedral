import { createClient } from '@sanity/client'

import { apiVersion, dataset, isSanityConfigured, projectId } from '../env'

// Server-only: the token grants write access. Never import this from a client component.
const token = process.env.SANITY_API_WRITE_TOKEN

export const writeClient =
  isSanityConfigured && token
    ? createClient({ projectId, dataset, apiVersion, token, useCdn: false })
    : null
