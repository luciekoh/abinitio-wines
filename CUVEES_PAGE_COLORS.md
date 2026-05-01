# Cuvées Grid Page + Color System Update + Remaining Wine Pages

Three tasks in this prompt.

---

## TASK 1: GLOBAL COLOR UPDATE

Replace TWO colors across the ENTIRE site (homepage, wine detail pages, all components):

### A. CTA background: teal → Atlantic blue
- OLD: any teal shade (#1a3d3d, #1e4a4a, or similar)
- NEW: `#0a2f6a`
- Applies to: CTA band on homepage, CTA band on wine detail pages, CTA on the new cuvées page
- Trust strip background (darker shade): change to `#061d45`
- Button on CTA: background `#f5f2eb`, text `#0a2f6a`
- Button hover: background becomes transparent, border `1px solid #f5f2eb`, text `#f5f2eb` (NO gold hover, keep it clean)
- Subtitle/body text on CTA: `#709cc4`
- Heading text on CTA: `#ccdcec`

### B. Accent color: wine-red → Atlantic blue
- OLD: `#6b2d3e` (wine-red)
- NEW: `#0a2f6a` (on light/cream backgrounds) and `#4a7aaa` (on dark backgrounds)
- Applies to ALL italic slogans, intro highlights, and accent text across the site:
  - Homepage intro: "Loire et Bretagne" and "amphores" italic highlights → `#0a2f6a`
  - Homepage wine card slogans (on dark bg) → `#4a7aaa`
  - Wine detail page slogan → `#0a2f6a`
  - Cuvées grid page slogans (on cream bg) → `#0a2f6a`
  - Any other instance of `#6b2d3e` → replace with the appropriate blue shade
- KEEP the gold `#c4a35a` for etymology text. Don't change that.
- Search all CSS files, components, and templates for `#6b2d3e` or `var(--wine-red)` and replace.
- Update the CSS variable: `--wine-red` → rename to `--accent` with value `#0a2f6a`. Add `--accent-light: #4a7aaa` for use on dark backgrounds.

---

## TASK 2: CUVÉES GRID PAGE

Create a new page at `/cuvees` (or `/cuvees/index`).

### Structure:

**Nav** — same component as all other pages, dark background, logo always visible

**Breadcrumb** — cream strip: "Accueil / Cuvées" (Accueil links to /, Cuvées is current page in lighter gray)

**Banner** — ocean photo background (`Eidos_Inspiration_Oceal_a_l_Ile_Dieu_.jpg` — look for this in the project root or assets) with dark overlay:
- Centered text, three lines:
  - "LA COLLECTION" — small caps, letter-spaced, `rgba(245,242,235,0.45)`
  - "NOS CUVÉES" — Bebas Neue (display font), ~34px, white
  - "Vins biologiques — Muscadet & Rhône — par Emmanuel Roblin, artisan vinificateur" — Cormorant Garamond italic, ~13px, `rgba(245,242,235,0.45)`
- If the ocean photo doesn't exist, use a CSS gradient fallback: `linear-gradient(135deg, #1a3a5a 0%, #2a5a6a 25%, #1a4a5a 55%, #0a2a3a 100%)`

**Wine Grid** — cream background `#f5f2eb`:

Category 1: VINS DE LA PHILOSOPHIE
- Label: "VINS DE LA PHILOSOPHIE" (small caps, letter-spaced, dark)
- Subtitle: "Élevés en amphore, nés de la patience" (italic, Cormorant Garamond, warm gray)
- Border-bottom separator
- 5-column grid on desktop: Philia, Eïdos, Logos, Kedron, Kaïros
- On tablet (< 1024px): 3 columns. On mobile (< 640px): 2 columns.

Category 2: VINS DES COPAINS
- Label: "VINS DES COPAINS"
- Subtitle: "L'élan, le partage, la joie immédiate"
- Border-bottom separator
- 3 wines in same 5-column grid (left-aligned, 2 empty slots): Presto, Ekko, Illico

### Wine Card Design:

Each card links to `/cuvees/[slug]`.

**Image area** (aspect-ratio 3/4, cream `#ede8dd` background):
- DEFAULT state: shows bottle image (centered, ~70% height)
- HOVER state: bottle crossfades to label artwork image (0.4s ease transition)
- HOVER state also: dark overlay `rgba(10,10,8,0.3)` appears with centered "DÉCOUVRIR →" text (DM Sans, 11px, letter-spaced, uppercase, white)
- Implementation: two absolutely-positioned layers inside the image container. Bottle layer (z-index 2, opacity 1→0 on hover). Label layer (z-index 1, opacity 0→1 on hover). Hover text layer (z-index 3, always on top).
- Use bottle images from assets. If no bottle image exists for a wine, show label artwork as default (no swap).

**Text below image:**
- Wine name: 15px, dark, letter-spaced slightly
- Vintage + color: 12px, mid-gray (e.g., "2021 · Blanc")
- Slogan: 12px, italic, Cormorant Garamond, Atlantic blue `#0a2f6a`

**No cépages on the grid cards.** Keep it clean.

### CTA — Atlantic blue `#0a2f6a`:
- Same CTA component as homepage but WITHOUT the trust strip
- Heading: "Professionnel·le du vin ?"
- Subtitle: "Tarifs, animations, accords — parlons-en ensemble."
- Button: "NOUS CONTACTER" → mailto:contact@abinitio-wines.com

**Footer** — same component as all other pages

### SEO:
- Title: "Nos Cuvées — Vins biologiques Ab Initio, Muscadet & Rhône"
- Meta description: "Découvrez les cuvées Ab Initio : vins biologiques élevés en amphore par Emmanuel Roblin. Folle Blanche, Melon de Bourgogne, Chardonnay, Gamay, Grenache. Muscadet nantais et Vallée du Rhône."
- H1: "NOS CUVÉES" (the visible title in the banner)
- Hidden sr-only text if needed for additional SEO context

### CMS:
- The page should pull wine data from the existing content collection (same Markdown files used by detail pages)
- Category grouping based on the `category` field in each wine's frontmatter
- All wine data (name, vintage, color, slogan, images) comes from the content files

### Nav Update:
- Update the "Cuvées" nav link across the entire site to point to `/cuvees` instead of `#wines` anchor on the homepage
- The homepage wine section stays as-is (it's a preview/teaser), but the nav now goes to the dedicated page

---

## TASK 3: REMAINING 7 WINE DETAIL PAGES

The Philia wine detail page is approved. Generate the same template for all remaining wines:
- eidos
- logos
- kedron
- kairos
- presto
- ekko
- illico

Use the same template. Pull data from each wine's content file. Copy their bottle images and tech sheet PDFs from the project root to the proper asset folders.

Update the prev/next navigation on ALL wine pages with the correct order:
Philia → Eïdos → Logos → Kedron → Kaïros → Presto → Ekko → Illico → (back to Philia)

Update ALL 8 wine card hover links on the homepage to point to their respective `/cuvees/[slug]` pages.

---

## TASK 4: CODE CLEANUP

After implementing everything:
- Search for any remaining instances of the old teal color (#1a3d3d, #1e4a4a, etc.) and replace
- Search for any remaining instances of wine-red (#6b2d3e) and replace
- Make sure the --accent CSS variable is used consistently instead of hardcoded hex values
- Verify Eïdos tréma is correct everywhere
- Remove any dead CSS or unused components
