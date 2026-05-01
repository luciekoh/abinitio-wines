# Wine Detail Pages + Analytics Setup

Two major tasks in this prompt. Build all 8 wine detail pages, then set up site-wide analytics.

---

## PART 1: WINE DETAIL PAGES

Build a dynamic wine detail page template at `/cuvees/[slug]` but ONLY generate the page for PHILIA first. We will iterate on this one wine page until it's right, then multiply to all 8 wines.

### IMPORTANT — carried over from homepage iterations:
- **Dark mode protection:** The base layout already has `<meta name="color-scheme" content="light only">` and `html { color-scheme: light only; }`. Make sure these are NOT overridden on wine detail pages. All pages must render correctly when the user has OS dark mode enabled.
- **Text legibility on dark sections:** Use `rgba(245,242,235,0.55)` minimum for body text on dark backgrounds. Headings/labels should be brighter. We iterated on this extensively for the homepage — match those values.
- **No blue underlines anywhere.** Global CSS reset `a { color: inherit; text-decoration: none; }` must apply.
- **CTA button hover:** Background changes to `#c4a35a` (gold), text to `#1a1918`. Same behavior as homepage CTA.
- **Footer:** Use the same footer component as the homepage. Do NOT create a separate footer for wine pages.
- **Nav:** Same nav component as homepage. On wine detail pages the logo is always visible (no hide/reveal behavior — that's homepage-only).

### Page Structure (top to bottom):

**1. Breadcrumb (off-white #faf9f6)**
`Cuvées / [Wine Name] [Vintage]`
"Cuvées" links to #wines on the homepage (for now, until we build a collection page).

**2. Hero Split (two columns)**
- LEFT (42% width, cream #ede8dd background): Bottle photo, centered vertically and horizontally. Use the bottle images from the project folder. If no bottle image exists for a wine, show the label artwork as fallback. On mobile: bottle goes full-width above the content.
- RIGHT (58% width, off-white #f5f2eb background): Wine info stack:
  1. Category badge: "VINS DE LA PHILOSOPHIE · BLANC" or "VINS DES COPAINS · ROUGE" (small caps, letter-spaced, mid-gray)
  2. **Slogan** first — italic, wine-red (#6b2d3e), Cormorant Garamond, ~15px
  3. Wine name — Bebas Neue, ~38px, dark
  4. Vintage year — Cormorant Garamond, ~15px, mid-gray
  5. Cépages on its own line — DM Sans, ~13px, dark (e.g., "Folle Blanche 80%, Melon de Bourgogne 20%")
  6. Data points row (flex, wrapping):
     - Terroir: e.g., "Granite et Schistes"
     - Élevage: e.g., "Amphore, 16 mois"
     - Agriculture: "Biologique · Certifié ECOCERT" (for standard bio wines) or "Biologique et biodynamique · Certifié ECOCERT" (for wines with biodynamic practices — check each wine's certification field)
  
  Each data point: label in small caps (11px, letter-spaced, mid-gray) above value (13px, dark).

**3. Story Section (off-white #faf9f6)**
- Label: "L'HISTOIRE DE CETTE CUVÉE" (section label style)
- Text: Use the `about` field from the wine's content file. Cormorant Garamond, 14px, mid-gray, line-height 1.8.
- If the wine has a `nameMeaning` field, show it below in gold italic (#c4a35a): e.g., "Philia (φιλία) — l'amitié, l'affection profonde"

**4. Tasting + Pairing Section (dark #0a0a08)**
- Label: "DÉGUSTATION" (section label, light)
- Tasting notes: Use the `degustation` field. Cormorant Garamond, 14px, rgba(245,242,235,0.6), line-height 1.8. Keep it concise — if the text is very long, use the first 2-3 sentences only.
- Sub-label: "ACCORDS" 
- Pairing suggestions: Use the `table_notes` field. Display as a clean list with gold (#c4a35a) dot separators. Cormorant Garamond, 13px.
- Serving temperature: Same font as tasting notes (Cormorant Garamond), same size (14px), same color. Show as: "Servir frais, environ 10–12°C". Add generous top margin (~1.5rem) to separate it visually from the pairings above. NOT smaller, NOT italic — consistent with section.

**5. Vinification Section (off-white #faf9f6)**
- Label: "VINIFICATION"
- One line summary from content data: "Vendanges manuelles · Presse pneumatique · Levures indigènes · Élevage en amphore 16 mois · Pas de collage · Pas de filtration"
- Use the wine's vinification fields. Format as single line with · separators. Cormorant Garamond, 13px, mid-gray.

**6. Download Section (off-white #faf9f6, no top padding — continues from vinification)**
- Label: "TÉLÉCHARGER"
- List tech sheet PDFs. Each entry shows: PDF icon + filename. No file size.
- The tech sheet field in CMS should be a list (repeatable) to support multiple vintages in the future.
- Link each to the actual PDF file.

**7. B2B CTA (teal #1a3d3d)**
- Same teal CTA as homepage but with wine-specific copy:
  - Heading: "Ce vin vous intéresse ?" — Cormorant Garamond, ~16px, #d4e8e0
  - Subtitle: "Tarifs et conditions pour les professionnels." — DM Sans, 12px, #8ab8a8
  - Button: "NOUS CONTACTER" — same style as homepage CTA button
  - Button links to mailto:contact@abinitio-wines.com
- Make this section slightly larger/more padded than the homepage version since it's the main conversion point.
- NO secondary "Trouver ce vin" link. Removed intentionally to keep focus on B2B conversion.
- ALL CTA text (heading, subtitle, button text, button link) must be editable through Decap CMS, same as the homepage CTA.

**8. Prev/Next Navigation (off-white #f5f2eb)**
- Two links, left and right: "← [Previous Wine Name]" and "[Next Wine Name] →"
- Wrap around (last wine links to first, first links to last)
- Style: DM Sans, small caps, letter-spaced, mid-gray, border-bottom on hover

### Wine Order for Prev/Next:
Build the template with prev/next logic, but since only Philia exists right now, the prev/next links can point to `#` temporarily. When we add all 8 wines later, the order will be:
Philia → Eïdos → Logos → Kedron → Kaïros → Presto → Ekko → Illico → (back to Philia)

### Bottle Images (in project root, copy to assets):
- `AB Initio Presto bottle.jpg` → presto
- `AB Initio Philia bottle.jpg` → philia
- `AB Initio Logos bottle.jpg` → logos
- `AB Initio Kedron bottle.jpg` → kedron
- `AB Initio Kaïros bottle.jpg` → kairos
- `AB Initio Illico bottle.jpg` → illico
- `AB Initio Ekko bottle.jpg` → ekko
- `AB Initio Eidos bottle.jpg` → eidos

### Tech Sheet PDFs (in project root, copy to public/techsheets/):
Each wine has FR + EN versions. Display the correct language version based on page language.

- Presto: `AB Initio Presto 2023 FR.pdf` / `AB Initio Presto 2023 EN.pdf`
- Philia: `AB Initio Philia 2021 FR.pdf` / `AB Initio Philia 2021 EN.pdf`
- Logos: `AB Initio Logos 2023 FR.pdf` / `AB Initio Logos 2023 EN.pdf` (also has 18m version: `AB Initio Logos 2023 18m FR.pdf` / `AB Initio Logos 2023 18m EN.pdf`)
- Kedron: `AB Initio Kedron 2020 FR.pdf` / `AB Initio Kedron 2020 EN.pdf`
- Kaïros: `AB Initio Kairos 2021 FR.pdf` / `AB Initio Kairos 2021 EN.pdf`
- Illico: `AB Initio Illico 2021 FR.pdf` / `AB Initio Illico 2021 EN.pdf`
- Ekko: `AB Initio Ekko 2023 FR.pdf` / `AB Initio Ekko 2023 EN.pdf`
- Eïdos: `AB Initio Eidos 2022 FR.pdf` / `AB Initio Eidos 2022 EN.pdf`

For the download section, show "Fiche technique [Wine] [Vintage]" on FR pages and "Technical sheet [Wine] [Vintage]" on EN pages. Link to the correct language PDF.

For Logos which has two versions (regular and 18m), show both as separate download links.

### SEO for Each Wine Page:
- Title: "[Wine Name] [Vintage] — [Grape] · Ab Initio" (e.g., "Philia 2021 — Folle Blanche · Ab Initio")
- Meta description: Use the slogan + first sentence of the about text
- H1: "[Wine Name] [Vintage]" (can be the visible wine name heading)
- Schema.org Product markup:
```json
{
  "@type": "Product",
  "@context": "https://schema.org",
  "name": "Philia 2021",
  "brand": { "@type": "Brand", "name": "Ab Initio" },
  "description": "[slogan + about text]",
  "category": "Wine",
  "material": "[grape varieties]",
  "manufacturer": {
    "@type": "Organization",
    "name": "SAS AB INITIO",
    "address": { "addressLocality": "Le Landreau", "addressCountry": "FR" }
  }
}
```
- Alt text on images: bilingual (FR on /fr/ pages, EN on /en/ pages)

### CMS (Decap):
The wine content files already have all the fields needed. Make sure the Astro template reads:
- name, vintage, color, category, grapes, terroir, taille, certification, vendanges
- slogan (FR), about (FR), degustation (FR), table_notes (FR), servir
- vinification fields (chai_pressing, chai_fermentation, chai_elevage, chai_fining)
- analyse (soufre, alcool, appellation)
- nameMeaning (optional, only some wines have it)
- label image, bottle image (add bottle_image field to schema if not present)
- tech sheet PDF (add techsheet field as a list/array)

### Responsive:
- Mobile: bottle image goes full-width above the text content (stacked, not side-by-side)
- All text sizes scale with clamp()
- CTA button goes full-width on mobile
- Prev/next stays as two links side by side

---

## PART 2: ANALYTICS SETUP (SITE-WIDE)

### Google Tag Manager
Add GTM to the BASE LAYOUT (so every page gets it):

In `<head>`:
```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WP5BMJ26');</script>
<!-- End Google Tag Manager -->
```

After opening `<body>`:
```html
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WP5BMJ26"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager -->
```

The GTM container ID is GTM-WP5BMJ26. Use this real ID, not a placeholder.

### Tarteaucitron (Cookie Consent)
Install tarteaucitron for RGPD-compliant cookie consent:

1. Add tarteaucitron.js to the project (download from GitHub or use CDN)
2. Initialize in the base layout BEFORE GTM:

```html
<script src="/tarteaucitron/tarteaucitron.js"></script>
<script>
tarteaucitron.init({
  "privacyUrl": "/politique-de-confidentialite",
  "bodyPosition": "bottom",
  "hashtag": "#tarteaucitron",
  "cookieName": "tarteaucitron",
  "orientation": "bottom",
  "groupServices": false,
  "showDetailsOnClick": true,
  "serviceDefaultState": "wait",
  "showAlertSmall": false,
  "cookieslist": false,
  "showIcon": true,
  "iconPosition": "BottomRight",
  "highPrivacy": true,
  "handleBrowserDNTRequest": false,
  "removeCredit": true,
  "moreInfoLink": true,
  "readmoreLink": "/politique-de-confidentialite",
  "mandatory": false,
  "mandatoryCta": true
});
</script>
```

3. Configure GA4 through tarteaucitron (so it only loads after consent):
```html
<script>
tarteaucitron.user.gtagUa = 'G-XWTNVDDGWW'; // GA4 measurement ID
(tarteaucitron.job = tarteaucitron.job || []).push('gtag');
</script>
```

4. Configure Microsoft Clarity through tarteaucitron:
```html
<script>
tarteaucitron.user.clarityId = 'wh6p7x4mfw'; // Clarity project ID
(tarteaucitron.job = tarteaucitron.job || []).push('clarity');
</script>
```

### Update Privacy Policy
Update `/politique-de-confidentialite` to reflect the new cookies:

Replace the "Données collectées" and "Cookies" sections with:

**Données collectées**
Ce site utilise des outils d'analyse de trafic pour améliorer votre expérience. Ces outils sont soumis à votre consentement via le bandeau cookies affiché lors de votre première visite.

**Cookies**
Ce site utilise les cookies suivants, activés uniquement après votre consentement :
- Google Analytics (Google LLC) : mesure d'audience, pages visitées, durée des visites. Données anonymisées.
- Microsoft Clarity (Microsoft) : analyse du comportement de navigation (clics, défilement). Données anonymisées.

Vous pouvez modifier vos préférences à tout moment en cliquant sur l'icône cookies en bas de page ou en visitant #tarteaucitron.

Les cookies strictement nécessaires au fonctionnement du site ne requièrent pas de consentement.

### Google Search Console
Add the verification meta tag to the base layout `<head>`:
```html
<meta name="google-site-verification" content="5Ot_bwAJjeZY3Y4-SszuNRtjKGCan_iuDBne3j7Ddd8" />
```
This covers both www and non-www versions.

---

## PART 3: HOMEPAGE NAV UPDATE

Update the "Cuvées" nav link on the homepage: currently it anchors to #wines. For now this is fine, but once the /cuvees collection page exists, it should link there. Add a TODO comment noting this.

Also: the "Découvrir →" hover link on the PHILIA wine card on the homepage should now link to `/cuvees/philia`. Leave the other 7 wine cards linking to `#` for now — we'll update them once all pages are built.
