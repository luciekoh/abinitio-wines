# SALONS PAGE BUILD — Claude Code Prompt

## Context

Implementing the `/salons` page for the Ab Initio website (Astro + Decap CMS). The page lists upcoming and past wine fairs/salons. The featured upcoming salon gets hero treatment, the rest go in an "Et puis" list, and past salons appear in a compact archive. Date-based partition happens at build time so the page rotates automatically when the site rebuilds.

Design language matches the existing site (Cuvées page is the reference): `Bebas Neue` display, `Cormorant Garamond` italic for editorial accents, `DM Sans` for functional text. Palette: cream `#f3eee0`, bone `#d9d0bb`, black `#0e0e0c`, wine-red `#6b1f24`, navy `#1e3a8a`, navy-soft `#c5d0eb`, grey-warm `#6b6557`, grey-mute `#8a8478`. No wine-gold on this page (kept in the design system for future use, but not applied here).

---

## Deliverables checklist

1. Add `salons` collection to Decap config (`public/admin/config.yml`)
2. Add `salons` schema to Astro content collections (`src/content/config.ts`)
3. Create `src/components/SeoBreadcrumbs.astro` (reusable SEO helper)
4. Create `src/pages/salons.astro` (FR page)
5. Create `src/pages/en/salons.astro` (EN page; same template, EN strings)
6. Modify the existing nav component: active link gets a thin cream underline (applied sitewide)
7. Confirm `public/images/eidos-bg.jpg` exists; if not, Lucie will add it before deploy

---

## 1. Decap config addition (`public/admin/config.yml`)

Add a new collection after the existing `cuvees` one:

```yaml
- name: "salons"
  label: "Salons"
  label_singular: "Salon"
  folder: "src/content/salons"
  create: true
  slug: "{{year}}-{{slug}}"
  fields:
    - { name: "name", label: "Nom du salon", widget: "string" }
    - { name: "name_en", label: "Nom (EN, si différent)", widget: "string", required: false }
    - { name: "start_date", label: "Date de début", widget: "date", format: "YYYY-MM-DD" }
    - { name: "end_date", label: "Date de fin", widget: "date", format: "YYYY-MM-DD" }
    - { name: "city", label: "Ville", widget: "string" }
    - { name: "country", label: "Pays", widget: "string", default: "France" }
    - name: "type"
      label: "Type"
      widget: "select"
      options:
        - { label: "Professionnels", value: "pro" }
        - { label: "Public", value: "public" }
        - { label: "Pro et Public", value: "mixte" }
      default: "pro"
    - { name: "url", label: "Site du salon (URL externe)", widget: "string", required: false }
    - { name: "notes", label: "Notes (optionnel, FR)", widget: "markdown", required: false }
    - { name: "notes_en", label: "Notes (optionnel, EN)", widget: "markdown", required: false }
```

The slug format `{{year}}-{{slug}}` produces filenames like `2026-raw-wine-tokyo.md`, which sort naturally and stay readable in Git.

---

## 2. Astro content collection schema (`src/content/config.ts`)

Add to the existing `defineCollection` exports:

```ts
import { defineCollection, z } from 'astro:content';

const salons = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    name_en: z.string().optional(),
    start_date: z.coerce.date(),
    end_date: z.coerce.date(),
    city: z.string(),
    country: z.string().default('France'),
    type: z.enum(['pro', 'public', 'mixte']),
    url: z.string().url().optional(),
    notes: z.string().optional(),
    notes_en: z.string().optional(),
  }),
});

export const collections = {
  // ...existing collections,
  salons,
};
```

---

## 3. `src/components/SeoBreadcrumbs.astro`

Reusable component that emits invisible `BreadcrumbList` JSON-LD for SEO. Use this on every interior page going forward. Does not render any visible UI.

```astro
---
export interface BreadcrumbItem {
  name: string;
  url: string;
}
interface Props {
  items: BreadcrumbItem[];
  baseUrl?: string;
}
const { items, baseUrl = 'https://abinitio-wines.com' } = Astro.props;

const data = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: `${baseUrl}${item.url}`,
  })),
};
---
<script type="application/ld+json" set:html={JSON.stringify(data)} />
```

Usage example (in any page):

```astro
<SeoBreadcrumbs items={[
  { name: 'Accueil', url: '/' },
  { name: 'Salons', url: '/salons' },
]} />
```

---

## 4. `src/pages/salons.astro` (FR)

Full template. Imports the existing layout (assumed to be `src/layouts/Layout.astro` with header/footer slots; adapt import path if different).

```astro
---
import Layout from '../layouts/Layout.astro';
import SeoBreadcrumbs from '../components/SeoBreadcrumbs.astro';
import { getCollection } from 'astro:content';

// --- Data partition (build-time) ---
const allSalons = await getCollection('salons');
const today = new Date();
today.setHours(0, 0, 0, 0);

const upcoming = allSalons
  .filter(e => new Date(e.data.end_date) >= today)
  .sort((a, b) => new Date(a.data.start_date).getTime() - new Date(b.data.start_date).getTime());

const past = allSalons
  .filter(e => new Date(e.data.end_date) < today)
  .sort((a, b) => new Date(b.data.start_date).getTime() - new Date(a.data.start_date).getTime());

const featured = upcoming[0];
const restUpcoming = upcoming.slice(1);

const pastByYear = past.reduce<Record<string, typeof past>>((acc, salon) => {
  const year = String(new Date(salon.data.start_date).getFullYear());
  if (!acc[year]) acc[year] = [];
  acc[year].push(salon);
  return acc;
}, {});
const pastYears = Object.keys(pastByYear).sort((a, b) => parseInt(b) - parseInt(a));

// --- Helpers ---
const monthsFR = ['jan', 'fév', 'mars', 'avr', 'mai', 'juin', 'juil', 'août', 'sept', 'oct', 'nov', 'déc'];

function formatRange(startISO: Date, endISO: Date, includeYear = true): string {
  const s = new Date(startISO), e = new Date(endISO);
  const sameDay = s.toDateString() === e.toDateString();
  const sameMonth = s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear();
  const yearStr = includeYear ? ` ${s.getFullYear()}` : '';
  if (sameDay) return `${s.getDate()} ${monthsFR[s.getMonth()]}${yearStr}`;
  if (sameMonth) return `${s.getDate()}–${e.getDate()} ${monthsFR[s.getMonth()]}${yearStr}`;
  return `${s.getDate()} ${monthsFR[s.getMonth()]} – ${e.getDate()} ${monthsFR[e.getMonth()]}${yearStr}`;
}

function shortRange(startISO: Date, endISO: Date): string {
  // For inline archive: "14–15 mars" without the year
  return formatRange(startISO, endISO, false);
}

function tagLabel(type: string): string {
  if (type === 'pro') return 'Professionnels';
  if (type === 'public') return 'Public';
  if (type === 'mixte') return 'Pro · Public';
  return type;
}

function rdvMailto(name: string): string {
  const subject = encodeURIComponent(`Rendez-vous au salon ${name}`);
  return `mailto:contact@abinitio-wines.com?subject=${subject}`;
}
---

<Layout title="Salons · AB INITIO" description="Là où nous retrouver, saison 2026.">
  <SeoBreadcrumbs items={[
    { name: 'Accueil', url: '/' },
    { name: 'Salons', url: '/salons' },
  ]} />

  <section class="opener">
    <h1>SALONS</h1>
    <p class="subtitle">Où nous retrouver — Saison {new Date().getFullYear()}</p>
  </section>

  {featured && (
    <section class="featured">
      <div class="featured-inner">
        <div>
          <div class="label">Prochain rendez-vous</div>
          <div class="featured-date">{formatRange(featured.data.start_date, featured.data.end_date)}</div>
          <div class="featured-tag">{tagLabel(featured.data.type)}</div>
        </div>
        <div>
          <h2>{featured.data.name}</h2>
          <p class="venue">{featured.data.city}{featured.data.country !== 'France' ? `, ${featured.data.country}` : ''}</p>

          {featured.data.notes && (
            <div class="notes" set:html={featured.data.notes} />
          )}

          <div class="cta-row">
            <a href={rdvMailto(featured.data.name)} class="btn btn-primary">Prenez rendez-vous</a>
            {featured.data.url && (
              <a href={featured.data.url} target="_blank" rel="noopener noreferrer" class="btn btn-ghost">Site du salon</a>
            )}
          </div>
        </div>
      </div>
    </section>
  )}

  {!featured && (
    <section class="featured-empty">
      <p>Calendrier {new Date().getFullYear() + 1} en cours de préparation. Restez en contact.</p>
    </section>
  )}

  {restUpcoming.length > 0 && (
    <section class="upcoming">
      <div class="upcoming-inner">
        <div class="mini-header"><span class="eyebrow">Et puis</span></div>
        <div class="events-list">
          {restUpcoming.map(salon => (
            salon.data.url ? (
              <a href={salon.data.url} target="_blank" rel="noopener noreferrer" class="event">
                <div class="event-date">{formatRange(salon.data.start_date, salon.data.end_date)}</div>
                <div class="event-name">
                  {salon.data.name}
                  <span class="place">{salon.data.city}, {salon.data.country}</span>
                </div>
                <div class="event-tag">{tagLabel(salon.data.type)}</div>
              </a>
            ) : (
              <div class="event event-no-link">
                <div class="event-date">{formatRange(salon.data.start_date, salon.data.end_date)}</div>
                <div class="event-name">
                  {salon.data.name}
                  <span class="place">{salon.data.city}, {salon.data.country}</span>
                </div>
                <div class="event-tag">{tagLabel(salon.data.type)}</div>
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  )}

  <section class="pro-cta">
    <div class="pro-cta-inner">
      <div>
        <h3>Pas de salon près de chez vous ?</h3>
        <p>Pas de problème, on va trouver un point commun.</p>
      </div>
      <a href="mailto:contact@abinitio-wines.com" class="btn-pro">Nous contacter</a>
    </div>
  </section>

  {pastYears.length > 0 && (
    <section class="archive">
      <div class="archive-inner">
        <div class="mini-header"><span class="eyebrow">Archive</span></div>
        {pastYears.map(year => (
          <div class="year-row">
            <div class="year-num">{year}</div>
            <div class="events-inline">
              {pastByYear[year].map((salon, i) => (
                <>
                  {salon.data.url ? (
                    <a href={salon.data.url} target="_blank" rel="noopener noreferrer" class="archive-link">{salon.data.name}</a>
                  ) : (
                    <span>{salon.data.name}</span>
                  )}
                  <span class="place">{salon.data.city}, {shortRange(salon.data.start_date, salon.data.end_date)}</span>
                  {i < pastByYear[year].length - 1 && <span class="sep">·</span>}
                </>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )}
</Layout>

<style>
  /* Opener */
  .opener {
    background: var(--cream, #f3eee0);
    padding: 5.5rem 3rem 5rem;
    text-align: center;
  }
  .opener h1 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(2.4rem, 5vw, 4rem);
    letter-spacing: 0.04em;
    line-height: 1;
    color: var(--pro-blue, #1e3a8a);
    margin-bottom: 1.6rem;
  }
  .opener .subtitle {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.8rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--grey-warm, #6b6557);
  }

  /* Featured */
  .featured {
    color: var(--cream, #f3eee0);
    padding: 5.5rem 3rem 6rem;
    position: relative;
    overflow: hidden;
    background:
      linear-gradient(rgba(15, 22, 40, 0.45), rgba(15, 22, 40, 0.55)),
      url('/images/eidos-bg.jpg') center/cover;
  }
  .featured-inner {
    max-width: 1240px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 0.85fr 1.15fr;
    gap: 5rem;
    align-items: start;
    position: relative;
    z-index: 1;
  }
  .featured .label {
    font-size: 0.7rem;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: var(--bone, #d9d0bb);
    margin-bottom: 1.6rem;
    opacity: 0.85;
  }
  .featured-date {
    font-family: 'DM Sans', sans-serif;
    font-size: clamp(1.4rem, 2.2vw, 2rem);
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--cream, #f3eee0);
    line-height: 1.3;
    margin-bottom: 1rem;
  }
  .featured-tag {
    font-size: 0.78rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--bone, #d9d0bb);
    opacity: 0.7;
    margin-top: 0.6rem;
  }
  .featured h2 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(2.6rem, 4.6vw, 4rem);
    line-height: 1;
    letter-spacing: 0.03em;
    margin-bottom: 1rem;
  }
  .featured .venue {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-size: 1.4rem;
    color: var(--bone, #d9d0bb);
    margin-bottom: 2.2rem;
  }
  .featured .notes {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-size: 1.15rem;
    color: var(--bone, #d9d0bb);
    line-height: 1.6;
    margin-bottom: 2.4rem;
    padding-left: 1.4rem;
    border-left: 1px solid rgba(217, 208, 187, 0.3);
    max-width: 36em;
  }
  .featured .notes :global(p) { margin: 0; }

  .featured-empty {
    background: var(--cream, #f3eee0);
    padding: 4rem 3rem;
    text-align: center;
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    color: var(--grey-warm, #6b6557);
    font-size: 1.15rem;
  }

  /* Buttons */
  .cta-row {
    margin-top: 2rem;
    display: flex;
    gap: 1.4rem;
    align-items: center;
    flex-wrap: wrap;
  }
  .btn {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.78rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    padding: 1.1rem 2.2rem;
    text-decoration: none;
    transition: all 0.2s;
    display: inline-block;
  }
  .btn-primary {
    background: var(--cream, #f3eee0);
    color: #1d3258;
    border: 1px solid var(--cream, #f3eee0);
  }
  .btn-primary:hover { background: transparent; color: var(--cream, #f3eee0); }
  .btn-ghost {
    background: transparent;
    color: var(--cream, #f3eee0);
    border: 1px solid rgba(245, 241, 232, 0.3);
  }
  .btn-ghost:hover { border-color: var(--cream, #f3eee0); }

  /* Mini section header */
  .mini-header {
    text-align: center;
    margin-bottom: 2.8rem;
  }
  .mini-header .eyebrow {
    font-size: 0.72rem;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: var(--wine-red, #6b1f24);
  }

  /* Upcoming list */
  .upcoming {
    background: var(--cream, #f3eee0);
    padding: 5rem 3rem 5.5rem;
  }
  .upcoming-inner { max-width: 1100px; margin: 0 auto; }
  .events-list { border-top: 1px solid var(--bone, #d9d0bb); }
  .event {
    display: grid;
    grid-template-columns: 1.1fr 2.4fr 0.8fr;
    gap: 2.5rem;
    align-items: center;
    padding: 1.8rem 1rem;
    border-bottom: 1px solid var(--bone, #d9d0bb);
    transition: background 0.2s;
    cursor: pointer;
    text-decoration: none;
    color: inherit;
  }
  .event-no-link { cursor: default; }
  .event:hover:not(.event-no-link) { background: rgba(217, 208, 187, 0.3); }
  .event:hover:not(.event-no-link) .event-name {
    text-decoration: underline;
    text-decoration-color: var(--wine-red, #6b1f24);
    text-decoration-thickness: 1px;
    text-underline-offset: 5px;
  }
  .event-date {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.92rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--black, #0e0e0c);
  }
  .event-name {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-size: 1.35rem;
    color: var(--black, #0e0e0c);
    transition: text-decoration 0.2s;
  }
  .event-name .place {
    font-family: 'DM Sans', sans-serif;
    font-style: normal;
    font-size: 0.85rem;
    color: var(--grey-warm, #6b6557);
    display: block;
    margin-top: 0.2rem;
    letter-spacing: 0.02em;
    text-decoration: none !important;
  }
  .event-tag {
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--grey-mute, #8a8478);
    text-align: right;
  }

  /* Pro CTA */
  .pro-cta {
    background: var(--pro-blue, #1e3a8a);
    color: var(--cream, #f3eee0);
    padding: 4rem 3rem;
  }
  .pro-cta-inner {
    max-width: 1240px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1.6fr 1fr;
    gap: 3rem;
    align-items: center;
  }
  .pro-cta h3 {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-weight: 500;
    font-size: clamp(1.5rem, 2.4vw, 2rem);
    margin-bottom: 0.7rem;
    line-height: 1.2;
  }
  .pro-cta p {
    font-family: 'DM Sans', sans-serif;
    font-weight: 300;
    color: var(--pro-blue-soft, #c5d0eb);
    font-size: 0.95rem;
  }
  .pro-cta .btn-pro {
    justify-self: end;
    background: var(--cream, #f3eee0);
    color: var(--pro-blue, #1e3a8a);
    border: 1px solid var(--cream, #f3eee0);
    padding: 1.2rem 2.4rem;
    font-size: 0.78rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    text-decoration: none;
    transition: all 0.2s;
  }
  .pro-cta .btn-pro:hover { background: transparent; color: var(--cream, #f3eee0); }

  /* Archive */
  .archive {
    background: var(--cream, #f3eee0);
    padding: 4rem 3rem 5rem;
  }
  .archive-inner { max-width: 1100px; margin: 0 auto; }
  .year-row {
    display: grid;
    grid-template-columns: 80px 1fr;
    gap: 2rem;
    align-items: baseline;
    padding: 1.4rem 0;
    border-top: 1px solid var(--bone, #d9d0bb);
  }
  .year-row:last-child { border-bottom: 1px solid var(--bone, #d9d0bb); }
  .year-num {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.5rem;
    color: var(--black, #0e0e0c);
    letter-spacing: 0.04em;
  }
  .events-inline {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-size: 1.05rem;
    line-height: 1.8;
    color: var(--black, #0e0e0c);
  }
  .events-inline .archive-link {
    color: inherit;
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-color 0.2s;
  }
  .events-inline .archive-link:hover {
    border-bottom-color: var(--wine-red, #6b1f24);
  }
  .events-inline .place {
    font-family: 'DM Sans', sans-serif;
    font-style: normal;
    font-size: 0.78rem;
    color: var(--grey-warm, #6b6557);
    letter-spacing: 0.04em;
    margin-left: 0.3em;
  }
  .events-inline .sep {
    color: var(--wine-red, #6b1f24);
    opacity: 0.5;
    margin: 0 0.7rem;
  }

  /* Mobile */
  @media (max-width: 880px) {
    .opener, .featured, .upcoming, .archive, .pro-cta { padding-left: 1.2rem; padding-right: 1.2rem; }
    .featured-inner { grid-template-columns: 1fr; gap: 2.4rem; }
    .event { grid-template-columns: 1fr; gap: 0.4rem; padding: 1.4rem 0.5rem; }
    .event-tag { text-align: left; margin-top: 0.3rem; }
    .year-row { grid-template-columns: 1fr; gap: 0.4rem; }
    .pro-cta-inner { grid-template-columns: 1fr; gap: 1.6rem; }
    .pro-cta .btn-pro { justify-self: start; }
  }
</style>
```

---

## 5. EN page (`src/pages/en/salons.astro`)

Same template as above with these string substitutions:

| FR string | EN string |
|---|---|
| `Salons · AB INITIO` (title) | `Trade Shows · AB INITIO` |
| `Où nous retrouver — Saison ${year}` | `Where to find us — ${year} season` |
| `Prochain rendez-vous` | `Next event` |
| `Prenez rendez-vous` | `Book a meeting` |
| `Site du salon` | `Event website` |
| `Et puis` | `And then` |
| `Pas de salon près de chez vous ?` | `No event near you?` |
| `Pas de problème, on va trouver un point commun.` | `No problem, we'll find common ground.` |
| `Nous contacter` | `Get in touch` |
| `Archive` | `Archive` (same) |
| `Calendrier ${year+1} en cours de préparation. Restez en contact.` | `${year+1} schedule in preparation. Stay in touch.` |

For the EN page, also use English month abbreviations in the `monthsFR` helper (rename to `monthsEN`: `['jan','feb','mar','apr','may','jun','jul','aug','sept','oct','nov','dec']`) and use `name_en` and `notes_en` from each salon entry, falling back to `name` / `notes` if the EN versions are empty:

```ts
const displayName = salon.data.name_en || salon.data.name;
const displayNotes = salon.data.notes_en || salon.data.notes;
```

Email subject for EN should be: `Meeting at ${displayName}`.

---

## 6. Sitewide active nav indicator

In the existing `src/components/Nav.astro` (or wherever the nav lives), the active link should get a thin cream underline. CSS rule:

```css
nav a {
  color: var(--cream, #f3eee0);
  text-decoration: none;
  opacity: 0.78;
  padding-bottom: 4px;
  border-bottom: 1px solid transparent;
  transition: opacity 0.2s;
}
nav a:hover { opacity: 1; }
nav a.active {
  opacity: 1;
  border-bottom-color: var(--cream, #f3eee0);
}
```

Detect active state by comparing `Astro.url.pathname` to each link's href in the nav component. Apply `class="active"` to the matching link. Make sure this rule applies on every interior page (Cuvées, Histoire, Salons, Trouver nos vins). If there's already an active state using wine-gold, replace the gold reference with `var(--cream)` to align.

While there: visible breadcrumbs are dropped sitewide. If the Cuvées index or any Cuvées detail page (`/cuvees/[slug]`) currently renders a visible breadcrumb strip, remove it. Keep the `<SeoBreadcrumbs />` component on every page for SEO.

---

## 7. Image asset

The featured section uses `/images/eidos-bg.jpg` (or matching path under `public/`). Lucie will provide this image. Recommended specs: at least 1920px wide, optimized JPG (~200–400 KB), portrait or landscape orientation both work since the section is `center/cover`. The dark gradient overlay in CSS handles text contrast, so the image itself can be richly colored.

If the image isn't available at deploy time, the fallback gradient should kick in. Add this safety:

```css
.featured {
  background:
    linear-gradient(rgba(15, 22, 40, 0.45), rgba(15, 22, 40, 0.55)),
    url('/images/eidos-bg.jpg') center/cover,
    linear-gradient(135deg, #182238 0%, #1d3258 40%, #234070 65%, #182640 100%);
}
```

The third gradient stop is the fallback; if the image 404s, it shows under the dark overlay.

---

## Implementation notes for Claude Code

**Date partition logic.** Runs at build time. The page rotates automatically on every rebuild. Lucie is editing in Decap regularly, which triggers builds, so manual rebuilds are unlikely to be needed. (A daily cron rebuild is on the backlog but not in this task.)

**Mailto pattern.** Each "Prenez rendez-vous" button on the featured event pre-fills a `mailto:` with the salon name in the subject line. The page-level CTA at the bottom uses a plain `mailto:contact@abinitio-wines.com` with no subject. Both arrive in the same inbox; the subject lets Emmanuel/Claire spot which salon a request is about.

**External link safety.** Every `<a>` to an external salon URL must include `target="_blank" rel="noopener noreferrer"`. The internal "Nous contacter" mailto stays default.

**Empty states.** If `featured` is null (no upcoming salon at all), the empty placeholder renders. If `restUpcoming` is empty, the "Et puis" section is hidden entirely. If `pastYears` is empty, the archive is hidden entirely. The page should still look complete with just the opener and CTA.

**Markdown notes.** The `notes` field in Decap is markdown. Render with `set:html` (it goes through Astro's markdown processor since the collection is `type: 'content'`). For most entries this will be one short italic sentence, but the field accepts more.

**Bilingual gotcha.** When adding a salon in Decap, `name_en` and `notes_en` are optional. If left blank, the EN page falls back to the FR strings (acceptable since salon names are often the same in both languages, e.g., "RAW Wine"). Emmanuel/Claire don't have to translate every entry.

**Acceptance test once built.** Add three test entries to `/src/content/salons/`: one with `end_date` in the past, one with `end_date` today or future (will become featured), one further in the future (will go in "Et puis"). Confirm the page partitions them correctly. Then add a fourth without a `url` field and confirm that row renders without click affordance.
