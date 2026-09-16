import { ClockIcon, CogIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    { name: 'general', title: 'General', default: true },
    { name: 'contact', title: 'Contact & location' },
    { name: 'social', title: 'Social & giving' },
    { name: 'home', title: 'Home page' },
  ],
  fields: [
    defineField({ name: 'name', title: 'Church name', type: 'string', group: 'general' }),
    defineField({ name: 'shortName', title: 'Short name', type: 'string', group: 'general' }),
    defineField({ name: 'tagline', type: 'string', group: 'general' }),
    defineField({
      name: 'description',
      title: 'Search engine description',
      description: 'About 150 characters. Shown by Google under the site name.',
      type: 'text',
      rows: 3,
      group: 'general',
      validation: (rule) => rule.max(300),
    }),
    defineField({ name: 'phone', type: 'string', group: 'contact' }),
    defineField({ name: 'whatsapp', title: 'WhatsApp number', type: 'string', group: 'contact', description: 'International format, e.g. +254115162026' }),
    defineField({ name: 'emails', type: 'array', of: [defineArrayMember({ type: 'string' })], group: 'contact' }),
    defineField({ name: 'street', title: 'Street / physical location', type: 'string', group: 'contact' }),
    defineField({ name: 'poBox', title: 'P.O. Box', type: 'string', group: 'contact' }),
    defineField({ name: 'locality', title: 'Town', type: 'string', group: 'contact' }),
    defineField({ name: 'region', title: 'County', type: 'string', group: 'contact' }),
    defineField({ name: 'postalCode', title: 'Postal code', type: 'string', group: 'contact' }),
    defineField({ name: 'officeHours', title: 'Office hours', type: 'string', group: 'contact', description: 'e.g. Mon–Fri 8:00 am – 5:00 pm' }),
    defineField({ name: 'mapQuery', title: 'Google Maps search text', type: 'string', group: 'contact' }),
    defineField({ name: 'geo', title: 'Map pin (optional)', type: 'geopoint', group: 'contact' }),
    defineField({ name: 'facebook', type: 'url', group: 'social' }),
    defineField({ name: 'youtube', type: 'url', group: 'social' }),
    defineField({ name: 'instagram', type: 'url', group: 'social' }),
    defineField({ name: 'x', title: 'X (Twitter)', type: 'url', group: 'social' }),
    defineField({ name: 'tiktok', title: 'TikTok', type: 'url', group: 'social' }),
    defineField({ name: 'livestreamUrl', title: 'Live stream link', type: 'url', group: 'social' }),
    defineField({ name: 'paybill', title: 'M-Pesa Paybill number', type: 'string', group: 'social' }),
    defineField({ name: 'heroEyebrow', title: 'Small text above the heading', type: 'string', group: 'home' }),
    defineField({ name: 'heroTitleLine1', title: 'Heading line 1', type: 'string', group: 'home' }),
    defineField({ name: 'heroTitleLine2', title: 'Heading line 2 (italic)', type: 'string', group: 'home' }),
    defineField({ name: 'heroText', title: 'Introduction', type: 'text', rows: 3, group: 'home' }),
    defineField({
      name: 'heroImage',
      title: 'Background photo',
      type: 'image',
      group: 'home',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Describe the photo', type: 'string' })],
    }),
  ],
  preview: { prepare: () => ({ title: 'Site Settings' }) },
})

const slot = defineArrayMember({
  type: 'object',
  name: 'serviceSlot',
  fields: [
    defineField({ name: 'label', title: 'Service', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'time', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'venue', type: 'string' }),
  ],
  preview: { select: { title: 'label', subtitle: 'time' } },
})

export const serviceSchedule = defineType({
  name: 'serviceSchedule',
  title: 'Service Times',
  type: 'document',
  icon: ClockIcon,
  fields: [
    defineField({ name: 'adult', title: 'Sunday — adult services', type: 'array', of: [slot] }),
    defineField({ name: 'specialised', title: 'Sunday — youth & specialised', type: 'array', of: [slot] }),
    defineField({ name: 'communion', title: 'Holy Communion schedule', type: 'array', of: [slot] }),
    defineField({ name: 'note', title: 'Special note', description: 'e.g. "Christmas Day service at 9:00 am only"', type: 'text', rows: 2 }),
  ],
  preview: { prepare: () => ({ title: 'Service Times' }) },
})
