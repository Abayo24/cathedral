import { DocumentPdfIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'bulletin',
  title: 'Weekly Bulletin',
  type: 'document',
  icon: DocumentPdfIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      description: 'e.g. "Sunday Bulletin — 15th Sunday after Trinity"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Sunday date',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'file',
      title: 'Bulletin file (PDF)',
      type: 'file',
      options: { accept: 'application/pdf' },
    }),
    defineField({
      name: 'highlights',
      title: 'Key points',
      description: 'Short bullet points shown on the website (readings, notices, collections, etc.).',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
  ],
  orderings: [{ title: 'Newest first', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] }],
  preview: {
    select: { title: 'title', date: 'date', file: 'file.asset' },
    prepare({ title, date, file }) {
      return { title, subtitle: `${date ?? 'No date'}${file ? ' · PDF attached' : ''}` }
    },
  },
})
