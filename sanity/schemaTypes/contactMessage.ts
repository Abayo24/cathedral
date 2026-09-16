import { EnvelopeIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const MESSAGE_KINDS = [
  { title: 'General enquiry', value: 'general' },
  { title: 'Prayer request', value: 'prayer' },
  { title: 'Pastoral care / visit', value: 'pastoral' },
  { title: 'Baptism, wedding or dedication', value: 'sacrament' },
]

/**
 * Created by the website's contact form. Documents are stored with an ID that
 * contains a dot ("inbox.…"), which Sanity keeps private even in a public
 * dataset — only logged-in admins can read them.
 */
export default defineType({
  name: 'contactMessage',
  title: 'Inbox Message',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'status',
      type: 'string',
      initialValue: 'new',
      options: {
        layout: 'radio',
        direction: 'horizontal',
        list: [
          { title: '🆕 New', value: 'new' },
          { title: '⏳ In progress', value: 'inProgress' },
          { title: '✅ Done', value: 'done' },
        ],
      },
    }),
    defineField({ name: 'notes', title: 'Staff notes', type: 'text', rows: 3 }),
    defineField({ name: 'kind', title: 'Type', type: 'string', readOnly: true, options: { list: MESSAGE_KINDS } }),
    defineField({ name: 'name', type: 'string', readOnly: true }),
    defineField({ name: 'email', type: 'string', readOnly: true }),
    defineField({ name: 'phone', type: 'string', readOnly: true }),
    defineField({ name: 'message', type: 'text', rows: 8, readOnly: true }),
    defineField({
      name: 'confidential',
      title: 'Keep confidential (clergy only)',
      type: 'boolean',
      readOnly: true,
    }),
    defineField({ name: 'receivedAt', type: 'datetime', readOnly: true }),
  ],
  orderings: [{ title: 'Newest first', name: 'receivedDesc', by: [{ field: 'receivedAt', direction: 'desc' }] }],
  preview: {
    select: { name: 'name', kind: 'kind', status: 'status', receivedAt: 'receivedAt', confidential: 'confidential' },
    prepare({ name, kind, status, receivedAt, confidential }) {
      const icon = status === 'done' ? '✅' : status === 'inProgress' ? '⏳' : '🆕'
      const label = MESSAGE_KINDS.find((k) => k.value === kind)?.title ?? 'Message'
      const when = receivedAt ? new Date(receivedAt).toLocaleDateString('en-GB', { timeZone: 'Africa/Nairobi' }) : ''
      return { title: `${icon} ${name || 'Anonymous'}`, subtitle: [label, confidential && '🔒', when].filter(Boolean).join(' · ') }
    },
  },
})
