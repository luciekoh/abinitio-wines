# Ab Initio Wines — Astro Website Build

## What this is

Build the production website for **Ab Initio**, a Loire Valley organic wine brand. We have an approved HTML prototype (v4), all the design decisions made, assets collected, and content ready. Your job is to scaffold the complete Astro project, implement all pages matching the approved design, set up Decap CMS, configure i18n for FR/EN, and prepare for deployment on OVH shared hosting via GitHub.

## Tech Stack (decided)

- **Framework:** Astro (static site generator, zero JS by default)
- **CMS:** Decap CMS (git-based admin UI at /admin, edits Markdown files, free)
- **Repo:** GitHub (triggers rebuild on commit)
- **Hosting:** OVH Cloud shared hosting (static HTML/CSS/JS via FTP/SSH)
- **i18n:** Astro i18n routing (`/fr/` and `/en/` prefixes), French is default
- **Map:** Leaflet.js (open-source, no API key) for distributeurs page
- **Fonts:** Google Fonts — Bebas Neue (display/logo), Cormorant Garamond (editorial serif), DM Sans (functional sans)
- **Cost:** Zero additional ongoing cost

## Brand Identity

- **Company:** SAS AB INITIO, Clos de l'Écu, 44430 Le Landreau, Loire-Atlantique, France
- **Founded:** 2020 by Emmanuel Roblin (vigneron), Claire & Fred Niger (Domaine de l'Écu)
- **Identity:** Organic wines, amphora-aged, natural, Loire Valley / Bretagne border, Muscadet nantais region
- **Motto:** «NIHIL FIT SINE CAUSA» — Nothing happens without reason
- **Certification:** Agriculture Biologique FR-BIO-01, certified by ECOCERT SAS
- **Contact:** contact@abinitio-wines.com / +33 (0)2 40 06 40 91 / www.abinitio-wines.com
- **Tone:** Poetic, evocative, personal. French and English. Don't overuse em dashes.
- **Important:** Don't showcase Domaine de l'Écu too prominently. The brand is emancipating from theirs. Mention Bretagne — it's important to Emmanuel.

## Design System (approved in prototype v4)

### Colors
```css
--black: #0a0a08;
--offwhite: #f5f2eb;
--cream: #ede8dd;
--warm-gray: #b8b2a6;
--mid-gray: #6b665c;
--dark-gray: #2c2a26;
--wine-red: #6b2d3e;    /* sparse accent */
--wine-gold: #c4a35a;   /* quotes/highlights */
```

### Typography
```css
--serif: 'Cormorant Garamond', Georgia, serif;   /* editorial, body text, quotes */
--sans: 'DM Sans', -apple-system, sans-serif;     /* labels, UI, small text */
--display: 'Bebas Neue', Impact, sans-serif;       /* headings, wine names, nav */
```

### Logo Rendering
The logo PNG (`Logo_AB_Initio.png`) has a transparent background with dark content. To render it white on dark backgrounds: `filter: invert(1) brightness(2)`. The file `AB_Initio_Logo_sans_Organic.png` is CORRUPTED (all-black pixels) — Emmanuel needs to re-export. Use the full logo for now.

### Motion
- Scroll-triggered fade-ins (IntersectionObserver, threshold 0.1)
- Staggered card reveals with transition-delay
- Hero entrance animation (fade up)
- Scroll indicator pulse animation
- Nav background transitions on scroll (transparent → dark blur)

## Wine Data

### Categories
- **Les Amphores / Vins de la Philosophie:** "Élevés en amphore, nés de la patience"
- **Les Copains / Vins des Copains:** "L'élan, le partage, la joie immédiate"

### Complete Wine List

NOTE: Pricing/tarifs are CONFIDENTIAL and must NOT appear anywhere on the website. They are only shared directly by the winery.

**BLANCS (0.75L):**

| Wine | Vintage | Grapes | Vinification | Category |
|------|---------|--------|-------------|----------|
| PHILIA | 2021 | Folle Blanche 80%, Melon de Bourgogne 20% | amphore 16 mois | Philosophie |
| EÏDOS | 2022 | Melon de Bourgogne 40%, Folle Blanche 26%, Chardonnay 34% | amphore 22 mois | Philosophie |
| LOGOS | 2023 | Chardonnay 100% | amphore 9 mois (Tava) | Philosophie |
| PRESTO | 2023 | Melon de Bourgogne 70%, Folle Blanche 14%, Chardonnay 16% | cuve béton 16 mois | Copains |
| EKKO | 2023 | Melon de Bourgogne 100% | cuve béton 18 mois | Copains |

**ROUGES (0.75L):**

| Wine | Vintage | Grapes | Vinification | Category |
|------|---------|--------|-------------|----------|
| KAÏROS | 2021 | Gamay 100% | amphore 14 mois | Philosophie |
| KEDRON | 2020 | Grenache 95%, Syrah 5% | amphore 12 mois | Philosophie |
| ILLICO | 2021 | Grenache 75%, Syrah 25% | cuve béton 12 mois | Copains |

### Label Artworks (one per wine, square images)
- **Philia:** Green/yellow watercolor wave, abstract botanical
- **Eïdos:** Blue/gold celestial abstract (inspired by the ocean at l'Île-d'Yeu)
- **Logos:** Teal/dark blue rock textures, deep ocean feel
- **Kedron:** Dark botanical night, blue/teal/black, painterly
- **Kaïros:** Purple/blue octopus painting, dramatic
- **Presto:** Vintage penny-farthing bicycle race illustration
- **Ekko:** Vintage coastal car/motorcycle race illustration
- **Illico:** Vintage locomotive racing red car illustration

## Site Architecture

### Navigation (approved)
- Nos Vins
- Histoire (not "L'Histoire")
- Salons
- Distribution (not "Professionnels" — too prominent, "Distribution" is clearer)

### Homepage Flow (approved order)
1. **Hero:** Full-viewport, Emmanuel in vineyard (B&W), logo white via CSS filter, motto "Nihil fit sine causa", subtitle "Vins biologiques · Loire · France", scroll indicator
2. **Intro:** "Depuis le commencement" — paragraph about Loire/Bretagne, amphores, Emmanuel's vision
3. **Wines Section** (dark background): Two categories with horizontal scroll (mobile) / grid (desktop) wine cards showing label artwork
4. **Photo Break:** Emmanuel in cellar, overlay quote "Rien n'arrive sans raison..."
5. **Pro CTA:** Cream background, "Distributeurs, cavistes, restaurateurs" / "Des vins bio d'auteur pour votre établissement." / Button "Demander nos tarifs" → mailto
6. **Story:** Two-column, text left (short version), vineyard photo right, "Lire la suite" link
7. **Events Strip:** Dark background, "Salons 2026" label, event list, "Tous les événements" link below last event
8. **Distribution Strip:** Cream, country names only (France · Allemagne · Belgique · Pays-Bas · Japon), "Trouver nos vins" link
9. **Footer:** Logo (white), motto, navigation, contact info, Instagram, EU organic leaf logo (white via filter) + "Agriculture Biologique FR-BIO-01 · ECOCERT", alcohol warning

### Subpages
- **/nos-vins/[wine]:** Individual wine detail page (DESIGN NOT YET FINALIZED — will be designed later). Will likely include: label artwork, bottle photo, slogan, about text, brief vinification, tasting notes, food pairing, and a downloadable tech sheet PDF. Store all content data in the CMS but don't build this page yet.
- **/histoire:** Full story (text from Emmanuel's PDF — see below)
- **/salons:** All events, past and upcoming
- **/distributeurs:** Leaflet.js map with stockist pins, filterable by country

### Current Events (placeholder data)
- RAW WINE Tokyo — 10-11 mai 2026
- Salon des Vins, Cave de la Ria — Pornic, 23 mai 2026
- Sous les Pavés la Vigne — Paris, 6-7-8 juin 2026
- Le Temps des Copains — Le Landreau, 28-29 juin 2026

### Distribution Countries
France, Allemagne, Belgique, Pays-Bas, Japon
(Département-level detail is for the /distributeurs map page, not homepage)

## Emmanuel's Story (from PDF, use as Histoire page content)

Key points to weave into the story text (translate to English for /en/ version):

- SAS created August 2020, three partners: Claire & Fred Niger (Domaine de l'Écu), Emmanuel Roblin
- Emmanuel started working at Domaine de l'Écu in May 2016 (ébourgeonnage, décuvaison, mise en bouteilles, vendanges)
- Followed with a CS Viti bio at Lycée viticole d'Amboise, alternating with Domaine de l'Écu
- Diploma obtained June 2017, worked at several organic/biodynamic domains to learn
- Always stayed in contact with Claire and Fred, built a relationship of trust
- Did vendanges 2018 at l'Écu, Fred told him about Domaine de la Providence in Vallet
- Discovered century-old vines on granite and schist subsoil, variety of white grapes (Folle Blanche, Melon de Bourgogne, Chardonnay) and red (Gamay, Cabernet Franc), gentle cultural practices, natural grass cover
- June 2019, returned to work at l'Écu, asked to harvest the Gamay parcel, Fred lent him an amphora — first wine became Kaïros
- The owners of Providence stopped selling in bottles; Emmanuel proposed buying their grapes
- Created ABINITIO in association, August 2020, all wines vinified at l'Écu (but everything is properly separated and accredited)
- "Ab Initio n'est pas un simple négoce. Nous sommes proches des vignerons, nous y mettons l'intention, nous donnons l'impulsion."
- "Des vins de terroirs, authentiques et vivants."

## Content File Structure

```
src/
  content/
    wines/
      philia.md
      eidos.md
      logos.md
      kairos.md
      kedron.md
      presto.md
      ekko.md
      illico.md
    events/
      raw-wine-tokyo-2026.md
      cave-ria-pornic-2026.md
      sous-les-paves-2026.md
      temps-des-copains-2026.md
    stockists/
      stockists.yaml    ← name, city, country, lat, lng
  pages/
    fr/
      index.astro       ← homepage FR
      histoire.astro
      salons.astro
      distributeurs.astro
    en/
      index.astro       ← homepage EN
      story.astro
      events.astro
      stockists.astro
  layouts/
    Base.astro          ← html, head, fonts, global styles
    Page.astro          ← nav + footer wrapper
  components/
    Nav.astro
    Hero.astro
    Intro.astro
    WineGrid.astro
    WineCard.astro
    PhotoBreak.astro
    ProCTA.astro
    StoryPreview.astro
    EventStrip.astro
    DistribStrip.astro
    Footer.astro
    Map.astro           ← Leaflet component
  styles/
    global.css          ← design system variables, base styles
  assets/
    images/
      labels/           ← wine label artwork JPGs
      photos/           ← Emmanuel portraits, vineyard, cellar
      logo/             ← Logo_AB_Initio.png
      certs/            ← EU organic logo, AB cert
public/
  admin/
    index.html          ← Decap CMS entry point
    config.yml          ← Decap CMS configuration
```

## Decap CMS Configuration

The admin panel at `/admin` should allow editing:
- **Wines collection:** name, vintage, color (blanc/rouge), category (philosophie/copains), cépages, terroir, vinification (brief), slogan FR, slogan EN, about FR, about EN, millésime FR, millésime EN, dégustation FR, dégustation EN, accords/table FR, accords/table EN, serving temp, analyse (sulphites, alcohol), label image, tech sheet PDF (downloadable), bottle image
- **Events collection:** name, date, location, description FR/EN
- **Stockists:** name, city, country, coordinates
- **Pages:** Homepage intro text, story text

NOTE: No pricing/tarif fields in the CMS. Tarifs are confidential and shared only directly by the winery.

Auth via GitHub OAuth (Decap's built-in GitHub backend).

## Shipping/Legal Info (NOT for the website — internal reference only)

This information is confidential and shared only directly by the winery. Do NOT display on the website.

## Assets Available

All images are in the project root directory. NOTE: Some filenames contain spaces — when organizing into subfolders, rename them to use hyphens (e.g., `ab-initio-philia-label.jpg`). Key files:

- `Logo AB Initio.png` — master logo (PNG with alpha, render white with `filter: invert(1) brightness(2)`)
- `AB Initio Emmanuel Roblin vineyard.jpg` — B&W portrait, Emmanuel in vineyard (hero background)
- `AB Initio Emmanuel Roblin cellar.jpg` — B&W portrait, Emmanuel in cellar (photo break)
- `AB Initio KAIROS label.jpeg` — Kaïros label artwork (purple octopus)
- `AB Initio EIDOS label.jpeg` — Eïdos label artwork (blue/gold)
- `AB Initio PHILIA label.jpg` — Philia label (green watercolor wave)
- `AB Initio LOGOS label.jpg` — Logos label (teal rock textures)
- `AB Initio KEDRON label.jpg` — Kedron label (dark botanical)
- `AB Initio PRESTO label.jpg` — Presto label (penny-farthing)
- `AB Initio EKKO label.jpg` — Ekko label (vintage cars)
- `AB Initio ILLICO label.jpg` — Illico label (locomotive/car)
- `EU organic logo png transparent.png` — EU organic leaf logo
- `AB_cert_BW.png` — French "Agriculture Biologique" certification mark (black on transparent). Render white in footer using `filter: invert(1) brightness(2)`.
- `abinitio-v4 (1).html` — Approved design prototype (reference only, don't deploy)

## Footer Certification Logos

The footer should show two certification marks side by side, rendered white (via CSS filter) on the dark background:
1. The **EU organic leaf** (Eurofeuille) — from EU_organic_logo_png_transparent.png
2. The **French AB certification** mark — PNG file, black on transparent. Use `filter: invert(1) brightness(2)` to render white.

Both should be small (around 24-30px height), subtle, with the text "Agriculture Biologique FR-BIO-01 · Certifié ECOCERT" next to them.

## Dark Mode / Color Scheme

CRITICAL: The site must render correctly when users have dark mode enabled on their phone or browser. Without protection, iOS and Android dark mode makes text invisible by inverting colors.

The site does NOT need a togglable dark/light mode. The design intentionally alternates dark and light sections. But we must prevent OS-level dark mode from breaking things.

Add this meta tag in the HTML head:
```html
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light only">
```

And in the global CSS:
```css
html {
  color-scheme: light only;
}
```

This tells browsers: "This site manages its own colors. Do not apply system dark mode." Test on mobile with dark mode ON to confirm all text remains visible.

## Reference: Approved Prototype

The file `abinitio-v4.html` in the outputs directory is the approved design prototype. Match its layout, typography, spacing, colors, and overall feel exactly. The prototype has all images embedded as base64 — in the Astro build, use normal image files from the assets directory.

## Key Design Details from Prototype

- Nav: fixed, transparent → dark blur on scroll, logo left, links right
- Hero: 100vh, background image with gradient overlay, logo centered via filter:invert
- Wine cards: square aspect-ratio artwork, hover scale, horizontal scroll on mobile with snap
- Photo break: 60vh, object-fit cover, dark overlay with centered italic quote
- Pro CTA: cream background, flex layout, black button with wine-red hover
- Events: dark strip, label left, event list right, CTA below last event
- Distribution: cream strip, centered, country names with dot separators
- Footer: dark, 4-column grid, logo + motto + EU cert in first column
- All scroll animations use IntersectionObserver with fade-in and stagger classes

## Responsive Design (IMPORTANT)

The site must look good on every screen size and every OS. Test at these widths:
- **Mobile:** 375px (iPhone SE), 390px (iPhone 14), 428px (iPhone 14 Pro Max)
- **Tablet:** 768px (iPad), 1024px (iPad Pro)
- **Desktop:** 1280px, 1440px, 1920px

Key responsive behaviors:
- **Nav:** On mobile (< 768px), collapse nav links into a hamburger menu
- **Hero:** Logo and text scale with `clamp()` — already in prototype
- **Wine cards:** Horizontal scroll with snap on mobile, grid wrap on desktop (> 900px)
- **Story grid:** Two columns on desktop, single column on mobile
- **Events strip:** Side by side on desktop, stacked on mobile
- **Footer:** 4-column grid on desktop, 2-column on tablet, stacked on mobile
- **All text:** Use `clamp()` for font sizes so they scale smoothly — no text should overflow or be cut off at any width
- **Images:** All images use `object-fit: cover` and responsive widths, no horizontal overflow anywhere
- **Touch targets:** All buttons and links at least 44px tap target on mobile

Use mobile-first CSS where possible. Test the `color-scheme: light only` dark mode fix on actual iOS and Android devices.

## Start Here

1. Initialize the Astro project with `npm create astro@latest`
2. Set up the directory structure above
3. Install dependencies: `@astrojs/sitemap`, `decap-cms-app`
4. Create the global CSS with the design system
5. Build the layout components (Nav, Footer)
6. Build the homepage matching v4 exactly
7. Set up content collections for wines and events
8. Configure Decap CMS
9. Build subpages (wine detail, histoire, salons, distributeurs)
10. Add i18n routing

Prioritize getting the homepage pixel-perfect first, then iterate on subpages.
