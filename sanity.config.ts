'use client'

/**
 * Configuration for the admin dashboard (Sanity Studio) mounted at /admin
 * by `app/admin/[[...tool]]/page.tsx`.
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import { dashboardTool } from './sanity/dashboard'
import { apiVersion, dataset, projectId } from './sanity/env'
import { schema, SINGLETON_TYPES } from './sanity/schemaTypes'
import { structure } from './sanity/structure'

const NOT_CREATABLE = new Set([...Array.from(SINGLETON_TYPES), 'contactMessage'])

export default defineConfig({
  basePath: '/admin',
  projectId: projectId || 'unconfigured',
  dataset,
  title: "St. Stephen's Cathedral Admin",
  schema: {
    types: schema.types,
    // Singletons and inbox messages can't be created from the "+" menu.
    templates: (templates) => templates.filter(({ schemaType }) => !NOT_CREATABLE.has(schemaType)),
  },
  document: {
    actions: (actions, { schemaType }) => {
      if (SINGLETON_TYPES.has(schemaType)) {
        return actions.filter(({ action }) => action && ['publish', 'discardChanges', 'restore'].includes(action))
      }
      if (schemaType === 'contactMessage') return actions.filter(({ action }) => action !== 'duplicate')
      return actions
    },
  },
  plugins: [
    dashboardTool(),
    structureTool({ structure, title: 'Content' }),
    // The GROQ query playground is only useful to developers.
    ...(process.env.NODE_ENV === 'development' ? [visionTool({ defaultApiVersion: apiVersion })] : []),
  ],
})
