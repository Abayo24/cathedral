/**
 * Copies the website's built-in content (lib/data.ts) into the CMS so staff
 * can edit it from the admin dashboard. Safe to run more than once: documents
 * that already exist are left untouched.
 *
 *   npm run seed
 *
 * (Runs `sanity exec` with your logged-in Sanity account — run `npx sanity login` first.)
 */
import { createReadStream, existsSync } from 'node:fs'
import path from 'node:path'
import { getCliClient } from 'sanity/cli'

import { ACCOUNTS, FAQS, LEADERSHIP, MINISTRIES, SERMONS, SERVICE_SCHEDULE, SETTINGS } from '../lib/data'
import { fromLocal, toLocal } from '../lib/dates'

const client = getCliClient({ apiVersion: '2025-02-19' })

const slug = (s: string) =>
  s.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/['’]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80)
const key = () => Math.random().toString(36).slice(2, 12)

const uploads = new Map<string, string>()
async function image(src: string | undefined, alt?: string) {
  if (!src?.startsWith('/')) return undefined
  const file = path.join(process.cwd(), 'public', src)
  if (!existsSync(file)) return undefined
  let assetId = uploads.get(src)
  if (!assetId) {
    const asset = await client.assets.upload('image', createReadStream(file), { filename: path.basename(file) })
    assetId = asset._id
    uploads.set(src, assetId)
    console.log(`  uploaded ${src}`)
  }
  return { _type: 'image', asset: { _type: 'reference', _ref: assetId }, ...(alt ? { alt } : {}) }
}

/** Next Wednesday at the given Nairobi time. */
function nextWednesday(hour: number) {
  const now = toLocal(Date.now())
  const daysAhead = (3 - now.getUTCDay() + 7) % 7 || 7
  return fromLocal(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + daysAhead, hour).toISOString()
}

async function main() {
  const docs: Record<string, unknown>[] = []

  docs.push({
    _id: 'siteSettings',
    _type: 'siteSettings',
    name: SETTINGS.name,
    shortName: SETTINGS.shortName,
    tagline: SETTINGS.tagline,
    description: SETTINGS.description,
    phone: SETTINGS.phone,
    emails: SETTINGS.emails,
    poBox: SETTINGS.address.poBox,
    locality: SETTINGS.address.locality,
    region: SETTINGS.address.region,
    postalCode: SETTINGS.address.postalCode,
    mapQuery: SETTINGS.mapQuery,
    facebook: SETTINGS.social.facebook,
    livestreamUrl: SETTINGS.livestreamUrl,
    paybill: SETTINGS.paybill,
    heroEyebrow: SETTINGS.hero.eyebrow,
    heroTitleLine1: SETTINGS.hero.titleLine1,
    heroTitleLine2: SETTINGS.hero.titleLine2,
    heroText: SETTINGS.hero.text,
    heroImage: await image(SETTINGS.hero.image.src, SETTINGS.hero.image.alt),
  })

  const slots = (list: { label: string; time: string; venue: string }[]) =>
    list.map((s) => ({ _key: key(), _type: 'serviceSlot', ...s }))
  docs.push({
    _id: 'serviceSchedule',
    _type: 'serviceSchedule',
    adult: slots(SERVICE_SCHEDULE.adult),
    specialised: slots(SERVICE_SCHEDULE.specialised),
    communion: slots(SERVICE_SCHEDULE.communion),
  })

  for (const [i, l] of LEADERSHIP.entries()) {
    docs.push({
      _id: `leader-${slug(l.role)}`,
      _type: 'leader',
      name: l.name,
      role: l.role,
      bio: l.bio,
      photo: await image(l.image?.src, l.image?.alt),
      orderRank: (i + 1) * 10,
    })
  }

  for (const [i, m] of MINISTRIES.entries()) {
    docs.push({
      _id: `ministry-${slug(m.abbr || m.name)}`,
      _type: 'ministry',
      name: m.name,
      abbr: m.abbr,
      description: m.description,
      image: await image(m.image.src, m.image.alt),
      orderRank: (i + 1) * 10,
    })
  }

  ACCOUNTS.forEach(({ id, ...a }, i) => docs.push({ _id: `giving-${id}`, _type: 'givingAccount', ...a, orderRank: (i + 1) * 10 }))
  FAQS.forEach((f, i) => docs.push({ _id: `faq-${i + 1}`, _type: 'faq', ...f, orderRank: (i + 1) * 10 }))

  for (const s of SERMONS) {
    docs.push({
      _id: `sermon-${s.id}`,
      _type: 'sermon',
      title: s.title,
      preacher: s.preacher,
      date: s.date,
      scripture: s.scripture,
      series: s.series,
      videoUrl: s.videoUrl,
      featured: Boolean(s.featured),
      image: await image(s.image.src, s.image.alt),
    })
  }

  // The Wednesday mid-week services from the published schedule, as repeating events.
  for (const [id, title, hour] of [
    ['wednesday-morning-service', 'Wednesday Mid-Week Service (Morning)', 8],
    ['wednesday-evening-service', 'Wednesday Mid-Week Service (Evening)', 17],
  ] as const) {
    const start = nextWednesday(hour)
    docs.push({
      _id: `event-${id}`,
      _type: 'event',
      title,
      slug: { _type: 'slug', current: id },
      summary: 'Mid-week worship with Holy Communion. All are welcome.',
      category: 'Holy Communion',
      location: hour < 12 ? 'Old Sanctuary' : 'Main Sanctuary',
      start,
      end: new Date(Date.parse(start) + 60 * 60 * 1000).toISOString(),
      allDay: false,
      recurrence: { frequency: 'weekly' },
      featured: false,
      cancelled: false,
    })
  }

  const tx = client.transaction()
  for (const doc of docs) tx.createIfNotExists(doc as { _id: string; _type: string })
  await tx.commit()
  console.log(`\nDone — ${docs.length} documents checked (existing ones were left unchanged).`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
