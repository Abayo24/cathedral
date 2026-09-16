import { BellIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'announcement',
  title: 'Notice / Announcement',
  type: 'document',
  icon: BellIcon,
  fields: [
    defineField({ name: 'title', type: 'string', validation: (rule) => rule.required().max(120) }),
    defineField({
      name: 'body',
      title: 'Message',
      type: 'text',
      rows: 5,
      validation: (rule) => rule.required().max(1200),
    }),
    defineField({
      name: 'link',
      title: 'Link (optional)',
      description: 'A web address, or a page on this site such as /events or /give',
      type: 'string',
    }),
    defineField({
      name: 'linkLabel',
      title: 'Link button text',
      type: 'string',
      initialValue: 'Learn more',
      hidden: ({ parent }) => !parent?.link,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Show from',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'expiresAt',
      title: 'Hide after',
      description: 'The notice disappears automatically after this date. Leave empty to keep it up.',
      type: 'datetime',
    }),
    defineField({
      name: 'pinned',
      title: 'Pin to the top',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'showBanner',
      title: 'Show as a banner across the top of every page',
      description: 'Use sparingly — for urgent or very important notices.',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  orderings: [
    { title: 'Newest first', name: 'publishedDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'body', pinned: 'pinned', banner: 'showBanner', expiresAt: 'expiresAt' },
    prepare({ title, subtitle, pinned, banner, expiresAt }) {
      const expired = expiresAt && Date.parse(expiresAt) < Date.now()
      const flags = [expired && '⏱ expired', banner && '📣 banner', pinned && '📌 pinned'].filter(Boolean).join(' · ')
      return { title, subtitle: flags || subtitle }
    },
  },
})
