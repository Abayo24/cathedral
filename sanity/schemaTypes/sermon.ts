import { PlayIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'sermon',
  title: 'Sermon',
  type: 'document',
  icon: PlayIcon,
  fields: [
    defineField({ name: 'title', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'preacher', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'date', type: 'date', validation: (rule) => rule.required() }),
    defineField({ name: 'scripture', title: 'Bible reading', type: 'string', description: 'e.g. John 8:12' }),
    defineField({ name: 'series', title: 'Series or occasion', type: 'string', description: 'e.g. Easter Sunday 2026' }),
    defineField({ name: 'summary', type: 'text', rows: 3 }),
    defineField({
      name: 'image',
      title: 'Thumbnail',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Describe the image', type: 'string' })],
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video link',
      description: 'Facebook or YouTube link to the recording',
      type: 'url',
    }),
    defineField({ name: 'audioUrl', title: 'Audio link', type: 'url' }),
    defineField({
      name: 'featured',
      title: 'Feature at the top of the Sermons page',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  orderings: [{ title: 'Newest first', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] }],
  preview: {
    select: { title: 'title', preacher: 'preacher', date: 'date', media: 'image' },
    prepare: ({ title, preacher, date, media }) => ({ title, subtitle: [date, preacher].filter(Boolean).join(' · '), media }),
  },
})
