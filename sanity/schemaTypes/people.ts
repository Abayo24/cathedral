import { CreditCardIcon, HelpCircleIcon, UserIcon, UsersIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

const orderRank = defineField({
  name: 'orderRank',
  title: 'Display order',
  description: 'Lower numbers are shown first.',
  type: 'number',
  initialValue: 100,
})

export const leader = defineType({
  name: 'leader',
  title: 'Clergy & Leadership',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({ name: 'name', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'role', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'bio', type: 'text', rows: 4 }),
    defineField({
      name: 'photo',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Describe the photo', type: 'string' })],
    }),
    orderRank,
  ],
  orderings: [{ title: 'Display order', name: 'order', by: [{ field: 'orderRank', direction: 'asc' }] }],
  preview: { select: { title: 'name', subtitle: 'role', media: 'photo' } },
})

export const ministry = defineType({
  name: 'ministry',
  title: 'Ministry & Fellowship',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({ name: 'name', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'abbr', title: 'Short name', type: 'string', description: 'e.g. KAMA, MU' }),
    defineField({ name: 'description', type: 'text', rows: 3, validation: (rule) => rule.required().max(400) }),
    defineField({ name: 'meets', title: 'When & where it meets', type: 'string' }),
    defineField({ name: 'contact', title: 'Contact person / phone', type: 'string' }),
    defineField({
      name: 'image',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Describe the image', type: 'string' })],
    }),
    orderRank,
  ],
  orderings: [{ title: 'Display order', name: 'order', by: [{ field: 'orderRank', direction: 'asc' }] }],
  preview: { select: { title: 'name', subtitle: 'abbr', media: 'image' } },
})

export const givingAccount = defineType({
  name: 'givingAccount',
  title: 'Giving Account',
  type: 'document',
  icon: CreditCardIcon,
  fields: [
    defineField({ name: 'tab', title: 'Fund name (tab label)', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'purpose', type: 'string' }),
    defineField({ name: 'paybill', title: 'M-Pesa account name', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'bank', type: 'string' }),
    defineField({ name: 'branch', type: 'string' }),
    defineField({ name: 'name', title: 'Account name', type: 'string' }),
    defineField({ name: 'number', title: 'Account number', type: 'string' }),
    defineField({ name: 'swift', title: 'SWIFT / BIC', type: 'string' }),
    orderRank,
  ],
  orderings: [{ title: 'Display order', name: 'order', by: [{ field: 'orderRank', direction: 'asc' }] }],
  preview: { select: { title: 'tab', subtitle: 'bank' } },
})

export const faq = defineType({
  name: 'faq',
  title: 'Frequently Asked Question',
  type: 'document',
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: 'question',
      type: 'string',
      description: 'Write it the way a visitor would ask it, e.g. "What time is the youth service?"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'answer',
      type: 'text',
      rows: 4,
      description: 'Answer directly in the first sentence. Search engines and AI assistants quote this.',
      validation: (rule) => rule.required(),
    }),
    orderRank,
  ],
  orderings: [{ title: 'Display order', name: 'order', by: [{ field: 'orderRank', direction: 'asc' }] }],
  preview: { select: { title: 'question', subtitle: 'answer' } },
})
