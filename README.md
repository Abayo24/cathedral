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

## Search visibility

### What the website already does

- Unique title/description/canonical per page, sitemap, robots, `llms.txt` for AI assistants.
- Structured data: `Church` + `Organization` (with address, phone, service opening hours, area served
  and `sameAs` links to the Wikipedia/Wikidata entries for this Cathedral), `Event`, `FAQPage`, `BreadcrumbList`.
- Fast, static pages — speed is a ranking factor, especially on mobile data.
- Questions answered in plain language on `/visit`, which is what Google and AI assistants quote.

### Which searches are realistic

Aim at searches that bring people to *this* church:

- "ACK St Stephen's Cathedral Kisumu", "St Stephens Cathedral Kisumu" — should be first; it's your name.
- "Anglican church Kisumu", "ACK church Kisumu", "churches in Kisumu", "church service times Kisumu",
  "Deaf church service Kisumu" — winnable with the steps below.

Broad searches like "churches in Kenya" or "churches in Africa" are held by Wikipedia, news and
directories. A single parish site will not rank there, and content written to chase those phrases
reads as spam to both people and Google. Better to own Kisumu and the Cathedral's own name.

### What still has to be done by a person (this matters more than the code)

1. [ ] **Google Business Profile** — claim and verify the Cathedral at https://business.google.com.
       This, not the website, decides who appears in the map pack for "church near me" and
       "churches in Kisumu". Use exactly the same name, phone and address as this site, add service
       times, photos, and ask members to leave reviews. Single highest-impact action.
2. [ ] **Google Search Console** — verify the domain, submit `/sitemap.xml`, then check "Performance"
       monthly to see the searches people actually use.
3. [ ] **Street address and map pin** — add them in Site Settings. Wikipedia only records that the
       *old* building stood on Omolo Agar Road, with coordinates rounded to about 2 km, so the exact
       location has to come from you.
4. [ ] **Links from other sites** — the strongest remaining factor. Ask for a link from
       ackenya.org (the ACK national site), the Diocese of Maseno South, Riara/other partner
       organisations, and local news covering Cathedral events. A handful of genuine links from
       Kenyan church and news sites outweighs any amount of on-page tuning.
5. [ ] **Keep the site active** — events, notices and bulletins posted regularly are a strong
       freshness signal and give Google more pages to show.
6. [ ] **Bing Webmaster Tools** — free, takes five minutes, feeds ChatGPT and Copilot answers.
7. [ ] Add YouTube / Instagram links in Site Settings if they exist (used in `sameAs`).
8. [ ] Test with https://search.google.com/test/rich-results (home, `/visit`, an event page).

Expect branded searches to improve within days of Search Console verification, and competitive local
searches to take one to three months, mostly depending on the Business Profile and links.
