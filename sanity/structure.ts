import {
  BellIcon,
  CalendarIcon,
  ClockIcon,
  CogIcon,
  CreditCardIcon,
  DocumentPdfIcon,
  EnvelopeIcon,
  HelpCircleIcon,
  ImagesIcon,
  PlayIcon,
  UserIcon,
  UsersIcon,
} from '@sanity/icons'
import type { StructureBuilder, StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet

const REPEATING = 'coalesce(recurrence.frequency, "none") != "none"'

const singleton = (S: StructureBuilder, id: string, title: string, icon: typeof CogIcon) =>
  S.listItem().title(title).id(id).icon(icon).child(S.document().schemaType(id).documentId(id).title(title))

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Calendar Events')
        .icon(CalendarIcon)
        .child(
          S.list()
            .title('Calendar Events')
            .items([
              S.listItem()
                .title('Upcoming & repeating')
                .icon(CalendarIcon)
                .child(
                  S.documentTypeList('event')
                    .title('Upcoming & repeating')
                    .filter(`_type == "event" && (coalesce(end, start) >= now() || ${REPEATING})`)
                    .defaultOrdering([{ field: 'start', direction: 'asc' }]),
                ),
              S.listItem()
                .title('Past events')
                .icon(CalendarIcon)
                .child(
                  S.documentTypeList('event')
                    .title('Past events')
                    .filter(`_type == "event" && coalesce(end, start) < now() && !(${REPEATING})`)
                    .defaultOrdering([{ field: 'start', direction: 'desc' }]),
                ),
              S.listItem().title('All events').icon(CalendarIcon).child(S.documentTypeList('event').title('All events')),
            ]),
        ),
      S.documentTypeListItem('announcement').title('Notices & Announcements').icon(BellIcon),
      S.documentTypeListItem('bulletin').title('Weekly Bulletins').icon(DocumentPdfIcon),
      S.divider(),
      S.documentTypeListItem('sermon').title('Sermons').icon(PlayIcon),
      S.documentTypeListItem('galleryItem').title('Photo Albums').icon(ImagesIcon),
      S.divider(),
      singleton(S, 'serviceSchedule', 'Service Times', ClockIcon),
      S.documentTypeListItem('leader').title('Clergy & Leadership').icon(UserIcon),
      S.documentTypeListItem('ministry').title('Ministries').icon(UsersIcon),
      S.documentTypeListItem('givingAccount').title('Giving Accounts').icon(CreditCardIcon),
      S.documentTypeListItem('faq').title('FAQs').icon(HelpCircleIcon),
      S.divider(),
      S.listItem()
        .title('Inbox')
        .icon(EnvelopeIcon)
        .child(
          S.list()
            .title('Inbox')
            .items([
              S.listItem()
                .title('New')
                .icon(EnvelopeIcon)
                .child(
                  S.documentTypeList('contactMessage')
                    .title('New messages')
                    .filter('_type == "contactMessage" && coalesce(status, "new") == "new"')
                    .defaultOrdering([{ field: 'receivedAt', direction: 'desc' }]),
                ),
              S.listItem()
                .title('In progress')
                .icon(EnvelopeIcon)
                .child(
                  S.documentTypeList('contactMessage')
                    .title('In progress')
                    .filter('_type == "contactMessage" && status == "inProgress"')
                    .defaultOrdering([{ field: 'receivedAt', direction: 'desc' }]),
                ),
              S.listItem()
                .title('All messages')
                .icon(EnvelopeIcon)
                .child(
                  S.documentTypeList('contactMessage')
                    .title('All messages')
                    .defaultOrdering([{ field: 'receivedAt', direction: 'desc' }]),
                ),
            ]),
        ),
      singleton(S, 'siteSettings', 'Site Settings', CogIcon),
    ])
