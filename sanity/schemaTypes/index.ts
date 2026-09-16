import { type SchemaTypeDefinition } from 'sanity'

import announcement from './announcement'
import blockContent from './blockContent'
import bulletin from './bulletin'
import contactMessage from './contactMessage'
import event from './event'
import galleryItem from './galleryItem'
import { faq, givingAccount, leader, ministry } from './people'
import sermon from './sermon'
import { serviceSchedule, siteSettings } from './singletons'

/** Document types that exist exactly once and can't be created or deleted. */
export const SINGLETON_TYPES = new Set(['siteSettings', 'serviceSchedule'])

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContent,
    event,
    announcement,
    bulletin,
    sermon,
    galleryItem,
    leader,
    ministry,
    givingAccount,
    faq,
    siteSettings,
    serviceSchedule,
    contactMessage,
  ],
}
