import groq from 'groq'

/** Projects a Sanity image into the raw fields lib/content.ts maps to `Img`. */
const img = (field: string) =>
  `${field}{ "src": asset->url, alt, "blur": asset->metadata.lqip, hotspot }`

export const settingsQuery = groq`*[_id == "siteSettings"][0]{
  name, shortName, tagline, description, phone, whatsapp, emails,
  street, poBox, locality, region, postalCode, officeHours, mapQuery, geo,
  facebook, youtube, instagram, x, tiktok, livestreamUrl, paybill,
  heroEyebrow, heroTitleLine1, heroTitleLine2, heroText, ${img('heroImage')}
}`

export const serviceScheduleQuery = groq`*[_id == "serviceSchedule"][0]{
  "adult": adult[]{label, time, venue},
  "specialised": specialised[]{label, time, venue},
  "communion": communion[]{label, time, venue},
  note
}`

export const leadersQuery = groq`*[_type == "leader"] | order(orderRank asc, _createdAt asc){
  name, role, bio, ${img('photo')}
}`

export const ministriesQuery = groq`*[_type == "ministry"] | order(orderRank asc, _createdAt asc){
  name, abbr, description, meets, contact, ${img('image')}
}`

export const givingAccountsQuery = groq`*[_type == "givingAccount"] | order(orderRank asc, _createdAt asc){
  "id": _id, tab, bank, branch, name, number, paybill, purpose, swift
}`

export const faqsQuery = groq`*[_type == "faq"] | order(orderRank asc, _createdAt asc){ question, answer }`

export const sermonsQuery = groq`*[_type == "sermon" && defined(date)] | order(date desc)[0...60]{
  "id": _id, title, preacher, date, scripture, series, summary, videoUrl, audioUrl, featured,
  ${img('image')}
}`

const eventFields = `
  "id": _id, "slug": slug.current, title, summary, body, start, end, allDay, location, category,
  registrationUrl, contact, featured, cancelled, recurrence, ${img('image')}
`

// Recurring events stay in the result so their future occurrences can be expanded.
export const eventsQuery = groq`*[_type == "event" && defined(slug.current) && defined(start) && (
  coalesce(end, start) >= $since || (defined(recurrence.frequency) && recurrence.frequency != "none")
)] | order(start asc){ ${eventFields} }`

export const eventBySlugQuery = groq`*[_type == "event" && slug.current == $slug][0]{ ${eventFields} }`

export const eventSlugsQuery = groq`*[_type == "event" && defined(slug.current)].slug.current`

export const announcementsQuery = groq`*[_type == "announcement"
  && coalesce(publishedAt, _createdAt) <= now()
  && (!defined(expiresAt) || expiresAt > now())
] | order(pinned desc, coalesce(publishedAt, _createdAt) desc)[0...20]{
  "id": _id, title, body, link, linkLabel, "publishedAt": coalesce(publishedAt, _createdAt),
  expiresAt, "pinned": coalesce(pinned, false), "showBanner": coalesce(showBanner, false)
}`

export const bulletinsQuery = groq`*[_type == "bulletin" && defined(date)] | order(date desc)[0...52]{
  "id": _id, title, date, "fileUrl": file.asset->url, "highlights": coalesce(highlights, [])
}`

export const albumsQuery = groq`*[_type == "galleryItem" && count(images) > 0] | order(coalesce(date, _createdAt) desc){
  "id": _id, title, "slug": slug.current, "category": cat, date, description,
  ${img('coverImage')},
  "images": images[]{ "src": asset->url, alt, caption, "blur": asset->metadata.lqip, hotspot }
}`
