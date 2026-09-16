import { CalendarIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const EVENT_CATEGORIES = [
  'Worship',
  'Holy Communion',
  'Fellowship',
  'Youth',
  'Children',
  'Mothers Union',
  'KAMA',
  'Music',
  'Outreach',
  'Prayer',
  'Conference',
  'Fundraising',
  'Diocesan',
  'Other',
]

export default defineType({
  name: 'event',
  title: 'Calendar Event',
  type: 'document',
  icon: CalendarIcon,
  groups: [
    { name: 'details', title: 'Details', default: true },
    { name: 'schedule', title: 'Date & repeat' },
    { name: 'more', title: 'More' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Event title',
      type: 'string',
      group: 'details',
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Web address',
      description: 'Click "Generate". This becomes the page link, e.g. /events/youth-conference-2026',
      type: 'slug',
      group: 'details',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Short summary',
      description: 'One or two sentences. Shown on the calendar, in search results and when shared.',
      type: 'text',
      rows: 3,
      group: 'details',
      validation: (rule) => rule.required().max(300),
    }),
    defineField({
      name: 'category',
      type: 'string',
      group: 'details',
      options: { list: EVENT_CATEGORIES },
    }),
    defineField({
      name: 'location',
      type: 'string',
      group: 'details',
      description: 'e.g. Main Sanctuary, Old Sanctuary, Cathedral Grounds',
      initialValue: 'Main Sanctuary',
    }),
    defineField({
      name: 'image',
      title: 'Poster / photo',
      type: 'image',
      group: 'details',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Describe the image (for blind visitors)', type: 'string' })],
    }),
    defineField({
      name: 'start',
      title: 'Starts',
      type: 'datetime',
      group: 'schedule',
      options: { timeStep: 15 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'end',
      title: 'Ends',
      type: 'datetime',
      group: 'schedule',
      options: { timeStep: 15 },
      validation: (rule) =>
        rule.custom((end, context) => {
          const start = (context.document as { start?: string } | undefined)?.start
          if (end && start && Date.parse(end) < Date.parse(start)) return 'The end must be after the start'
          return true
        }),
    }),
    defineField({
      name: 'allDay',
      title: 'All-day event',
      type: 'boolean',
      group: 'schedule',
      initialValue: false,
    }),
    defineField({
      name: 'recurrence',
      title: 'Repeats',
      type: 'object',
      group: 'schedule',
      options: { collapsible: false },
      fields: [
        defineField({
          name: 'frequency',
          title: 'How often',
          type: 'string',
          initialValue: 'none',
          options: {
            layout: 'radio',
            list: [
              { title: 'Does not repeat', value: 'none' },
              { title: 'Every week (same weekday)', value: 'weekly' },
              { title: 'Every two weeks', value: 'fortnightly' },
              { title: 'Every month on the same date (e.g. the 15th)', value: 'monthlyDate' },
              { title: 'Every month on the same weekday (e.g. 1st Sunday)', value: 'monthlyWeekday' },
            ],
          },
        }),
        defineField({
          name: 'until',
          title: 'Repeat until',
          description: 'Leave empty to repeat indefinitely.',
          type: 'date',
          hidden: ({ parent }) => !parent?.frequency || parent.frequency === 'none',
        }),
        defineField({
          name: 'exclude',
          title: 'Skip these dates',
          description: 'Dates when this repeating event will NOT happen (e.g. public holidays).',
          type: 'array',
          of: [defineArrayMember({ type: 'date' })],
          hidden: ({ parent }) => !parent?.frequency || parent.frequency === 'none',
        }),
      ],
    }),
    defineField({
      name: 'body',
      title: 'Full description',
      type: 'blockContent',
      group: 'more',
    }),
    defineField({
      name: 'registrationUrl',
      title: 'Registration / more info link',
      type: 'url',
      group: 'more',
      validation: (rule) => rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'contact',
      title: 'Contact person / phone',
      type: 'string',
      group: 'more',
    }),
    defineField({
      name: 'featured',
      title: 'Feature on the home page',
      type: 'boolean',
      group: 'more',
      initialValue: false,
    }),
    defineField({
      name: 'cancelled',
      title: 'Cancelled',
      description: 'Keeps the event visible but clearly marked as cancelled.',
      type: 'boolean',
      group: 'more',
      initialValue: false,
    }),
  ],
  orderings: [
    { title: 'Date (soonest first)', name: 'startAsc', by: [{ field: 'start', direction: 'asc' }] },
    { title: 'Date (latest first)', name: 'startDesc', by: [{ field: 'start', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'title', start: 'start', media: 'image', frequency: 'recurrence.frequency', cancelled: 'cancelled' },
    prepare({ title, start, media, frequency, cancelled }) {
      const date = start
        ? new Date(start).toLocaleString('en-GB', { timeZone: 'Africa/Nairobi', dateStyle: 'medium', timeStyle: 'short' })
        : 'No date'
      const repeat = frequency && frequency !== 'none' ? ' · repeats' : ''
      return { title: cancelled ? `❌ ${title}` : title, subtitle: `${date}${repeat}`, media }
    },
  },
})
