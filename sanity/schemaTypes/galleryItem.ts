import { ImagesIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

// Field names (title, cat, images) are kept from the original schema so existing albums keep working.
export default defineType({
  name: 'galleryItem',
  title: 'Photo Album',
  type: 'document',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Album title',
      type: 'string',
      description: 'e.g. Mothering Sunday 2026',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Web address',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
    }),
    defineField({ name: 'date', title: 'Date of the event', type: 'date' }),
    defineField({
      name: 'cat',
      title: 'Category',
      type: 'string',
      options: { list: ['Worship', 'Sacraments', 'Community', 'Youth', 'Choir', 'Celebrations', 'Clergy', 'Other'] },
    }),
    defineField({ name: 'description', type: 'text', rows: 2 }),
    defineField({
      name: 'coverImage',
      title: 'Cover photo',
      description: 'Optional — the first photo is used if empty.',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'images',
      title: 'Photos',
      description: 'Drag and drop many photos at once.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Describe the photo', type: 'string' }),
            defineField({ name: 'caption', type: 'string' }),
          ],
        }),
      ],
      options: { layout: 'grid' },
    }),
  ],
  orderings: [{ title: 'Newest first', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] }],
  preview: {
    select: { title: 'title', date: 'date', media: 'images.0', count: 'images.length' },
    prepare: ({ title, date, media, count }) => ({
      title,
      subtitle: [date, count ? `${count} photos` : 'No photos'].filter(Boolean).join(' · '),
      media,
    }),
  },
})
