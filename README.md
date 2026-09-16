# ACK St. Stephen's Cathedral Kisumu — Website

Next.js 14 website with a built-in admin dashboard (Sanity Studio) at **`/admin`**.

---

## For church staff: using the admin dashboard

1. Go to **https://ststephenscathedralkisumu.org/admin** (or click *Staff login* at the bottom of any page).
2. Sign in with the Google / GitHub / email account you were invited with.
3. The **Dashboard** shows what's coming up, new messages and prayer requests, and quick buttons.

| I want to… | Go to |
| --- | --- |
| Add a one-off event (conference, fundraiser, confirmation) | Dashboard → **Add an event** |
| Add a weekly/monthly activity (Bible study, choir practice) | Add an event → *Date & repeat* tab → choose how often |
| Cancel one date of a repeating event | Open the event → *Repeats* → **Skip these dates** |
| Post an announcement | Dashboard → **Post a notice** (tick *banner* for urgent notices) |
| Upload this Sunday's bulletin | Dashboard → **Upload a bulletin** (attach the PDF, add key points) |
| Add photos from a service | Dashboard → **New photo album** → drag many photos in at once |
| Change service times | Content → **Service Times** |
| Update clergy, ministries, bank accounts, FAQs | Content → the matching section |
| Change phone, email, social links, home page text/photo | Content → **Site Settings** |
| Read contact messages & prayer requests | Content → **Inbox** (set status to *Done* when handled) |

**Nothing appears on the website until you press _Publish_.** Changes are live within a minute.
Please fill in *"Describe the photo"* on images — it helps blind visitors and Google Images.

---

## For developers: setup

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000 — admin at /admin
```

Without Sanity variables the site still works, using the built-in content in `lib/data.ts`.

### One-time Sanity configuration (https://www.sanity.io/manage → your project)

1. **API → CORS origins:** add `http://localhost:3000` and `https://ststephenscathedralkisumu.org`, both with *Allow credentials*.
2. **Members:** invite staff. Use the *Editor* role (or *Administrator* for whoever manages accounts).
3. **API → Tokens:** create an *Editor* token → `SANITY_API_WRITE_TOKEN` (the contact / prayer form needs it).
4. **API → Webhooks:** create a webhook
   - URL: `https://ststephenscathedralkisumu.org/api/revalidate`
   - Trigger on: create, update, delete · Filter: *(leave empty)* · HTTP method: POST
   - Secret: a long random string → also set it as `SANITY_REVALIDATE_SECRET`
5. Copy the current website content into the CMS so staff can edit it:
   ```bash
   npx sanity login
   npm run seed
   ```
   Re-running is safe — existing documents are never overwritten.

Contact-form messages are stored with IDs beginning `inbox.`, which Sanity keeps private even in a public dataset.

### Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` / `build` / `start` | Next.js |
| `npm run typecheck` | TypeScript check |
| `npm run seed` | Import `lib/data.ts` content into Sanity |
| `npm run optimize-images` | Compress new photos in `/public` and regenerate icons + `og.jpg` (originals are kept in `/image-originals`) |

### Project structure

```
app/(site)/        public pages (home, about, services, events, ministries, sermons, gallery, bulletins, visit, contact, give)
app/admin/         admin dashboard (Sanity Studio)
app/api/revalidate Sanity webhook → instant cache refresh
app/sitemap.ts, robots.ts, manifest.ts, llms.txt/   SEO + answer-engine files
components/        UI components
lib/content.ts     all data access (Sanity with fallback to lib/data.ts)
lib/events.ts      recurring events, .ics generation, Google Calendar links
sanity/            schemas, desk structure and the custom dashboard
scripts/           seed + image optimisation
```

`_legacy/` holds the previous versions of replaced files for reference; it isn't used by the build and can be deleted.

---

## After launch: SEO checklist

- [ ] Set `NEXT_PUBLIC_SITE_URL` to the live domain.
- [ ] **Google Search Console:** verify the domain (or set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`) and submit `/sitemap.xml`.
- [ ] **Google Business Profile:** claim/update the Cathedral listing with the same name, phone and service times as the website — the biggest single factor for "church near me" searches.
- [ ] In Site Settings, add the **street location** and **map pin** so maps, directions and structured data are precise.
- [ ] Add YouTube / Instagram links in Site Settings if the Cathedral has them (used for `sameAs` in structured data).
- [ ] Test with https://search.google.com/test/rich-results (home, `/visit`, an event page).
