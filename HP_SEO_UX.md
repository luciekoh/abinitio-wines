# SEO, Performance & UX Improvements

Implement all sections below. This is the final round of homepage improvements before deployment.

---

## 1. HIDDEN H1 TAG

Add a visually-hidden H1 to the homepage inside the hero section:

```html
<h1 class="sr-only">Ab Initio — Vins biologiques élevés en amphore, Muscadet nantais, Loire Valley</h1>
```

CSS:
```css
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
```

---

## 2. PAGE TITLE & META

```html
<title>Ab Initio — Vins biologiques, Muscadet nantais, Loire</title>
<meta name="description" content="Ab Initio, vins biologiques élevés en amphore. Folle Blanche, Melon de Bourgogne, Chardonnay, Gamay. Vignoble du Muscadet nantais entre Loire et Bretagne. Certifié agriculture biologique ECOCERT.">
```

---

## 3. INTRO TEXT UPDATE

Replace the current intro section text with this SEO-optimized version:

**FR label:** DEPUIS LE COMMENCEMENT

**FR main text (serif, large):**
Né entre Loire et Bretagne, sur les coteaux du Muscadet nantais, Ab Initio est un projet de vins biologiques vivants. Folle Blanche, Melon de Bourgogne, Chardonnay, Gamay : des cépages enracinés dans le granite et le schiste, vinifiés en amphores de terre cuite ou en cuves béton souterraines. Rien d'ajouté, rien de retiré. La conviction que rien n'arrive sans raison.

Note: "Loire et Bretagne" should still be italic/wine-red. "amphores" should also be italic/wine-red.

**FR detail text (sans, smaller):**
Emmanuel Roblin, vigneron et vinificateur au Clos de l'Écu au Landreau, sélectionne ses terroirs sur des parcelles centenaires pour donner naissance à des vins d'émotion, certifiés en agriculture biologique.

**B2B signal line (after the detail text):**
Add one more line below, in a slightly different style: same sans font, slightly smaller (~0.8rem), warm gray mid-tone color (`var(--mid-gray)` / `#6b665c`):

"Cavistes, restaurateurs, importateurs — nos vins sont disponibles pour les professionnels."

The word "professionnels" is a link that smooth-scrolls to the teal CTA section (#pro). Styled with the consistent CTA link style (no underline by default, border-bottom on hover). This is NOT a button or banner — just a quiet sentence that B2B visitors will catch.

---

## 4. WINE CARD HOVER STATE

Add a hover overlay to each wine card:
- On hover, a semi-transparent dark overlay appears: `background: rgba(10,10,8,0.4)`, transition 0.3s
- Centered text "DÉCOUVRIR →" fades in: font-family DM Sans, font-size 0.68rem, letter-spacing 0.15em, text-transform uppercase, color #f5f2eb, opacity transition 0.3s
- Wrap the entire card in a link (for now use `href="#"` — wine detail pages don't exist yet)
- Add `cursor: pointer`
- Keep the existing subtle scale animation on the image

---

## 5. STRUCTURED DATA (Schema.org)

Add JSON-LD structured data in the `<head>`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Ab Initio",
  "alternateName": "SAS AB INITIO",
  "url": "https://www.abinitio-wines.com",
  "logo": "https://www.abinitio-wines.com/images/logo-ab-initio.png",
  "description": "Vins biologiques élevés en amphore, Muscadet nantais, Loire Valley",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Clos de l'Écu",
    "addressLocality": "Le Landreau",
    "postalCode": "44430",
    "addressCountry": "FR"
  },
  "telephone": "+33240064091",
  "email": "contact@abinitio-wines.com",
  "sameAs": ["https://www.instagram.com/abinitio_wine/"],
  "founder": {
    "@type": "Person",
    "name": "Emmanuel Roblin",
    "jobTitle": "Vigneron"
  },
  "knowsAbout": ["organic wine", "amphora winemaking", "natural wine", "Loire Valley wines"],
  "hasCredential": {
    "@type": "EducationalOccupationalCredential",
    "credentialCategory": "certification",
    "name": "Agriculture Biologique FR-BIO-01 ECOCERT"
  }
}
</script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Ab Initio — Vins Biologiques",
  "url": "https://www.abinitio-wines.com",
  "inLanguage": ["fr", "en"]
}
</script>
```

---

## 6. IMAGE OPTIMIZATION

Check if the current code uses Astro's `<Image>` component or plain `<img>` tags. If plain `<img>`:
- Replace ALL images with Astro's `<Image>` or `<Picture>` component from `astro:assets`
- This automatically generates WebP, responsive srcset, and optimized sizes
- Set appropriate `width` and `height` attributes to prevent layout shift
- Hero image: `loading="eager"` (loads immediately)
- All other images: `loading="lazy"` (loads as user scrolls)

---

## 7. FONT OPTIMIZATION

Self-host Google Fonts instead of loading from Google's CDN:

1. Download font files for:
   - Bebas Neue (400)
   - Cormorant Garamond (300, 400, 500, 600, 300italic, 400italic)
   - DM Sans (300, 400, 500, 300italic)
2. Place them in `src/assets/fonts/`
3. Use `@font-face` declarations in global CSS with `font-display: swap`
4. Remove the Google Fonts `<link>` tags from HTML head
5. Subset the fonts to Latin + Latin Extended using the `unicode-range` descriptor. This MUST include all French characters (àâäéèêëïîôùûüÿçœæ and their uppercase equivalents ÀÂÄÉÈÊËÏÎÔÙÛÜŸÇŒÆ) and all English characters. Also include curly quotes, em dash, en dash, middot, and common punctuation. Do NOT omit any characters that could appear in French or English wine descriptions.

This eliminates external network requests and makes fonts load faster.

---

## 8. MENTIONS LÉGALES PAGE

Create a `/mentions-legales` page. Use the same layout/nav/footer as the homepage.

Content:

**Éditeur du site**
SAS AB INITIO
Clos de l'Écu, 44430 Le Landreau, France
SIRET : [À COMPLÉTER — TODO]
contact@abinitio-wines.com
+33 (0)2 40 06 40 91
Directeur de la publication : Emmanuel Roblin

**Hébergement**
[À COMPLÉTER — TODO: OVH or Netlify details depending on final hosting]

**Propriété intellectuelle**
L'ensemble du contenu de ce site (textes, images, photographies, illustrations, logos) est la propriété exclusive de SAS AB INITIO ou de ses partenaires et est protégé par les lois françaises et internationales relatives à la propriété intellectuelle. Toute reproduction, représentation, modification ou exploitation, même partielle, est interdite sans autorisation écrite préalable.

**Crédits photographiques**
[À COMPLÉTER — TODO: photographer names]

Add "Mentions légales" link in the footer bottom strip next to the copyright.

---

## 9. POLITIQUE DE CONFIDENTIALITÉ PAGE

Create a `/politique-de-confidentialite` page. Same layout.

Content:

**Responsable du traitement**
SAS AB INITIO
Clos de l'Écu, 44430 Le Landreau, France
contact@abinitio-wines.com

**Données collectées**
Ce site ne collecte aucune donnée personnelle via des formulaires. Aucun cookie de suivi ou publicitaire n'est utilisé. Aucun outil d'analyse de trafic n'est actuellement en place.

**Cookies**
Ce site utilise uniquement des cookies strictement nécessaires au fonctionnement technique du site. Aucun cookie tiers, analytique ou publicitaire n'est déposé.

**Vos droits**
Conformément au Règlement Général sur la Protection des Données (RGPD — Règlement UE 2016/679), vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données, ainsi que d'un droit d'opposition et de limitation du traitement. Pour exercer ces droits, contactez-nous : contact@abinitio-wines.com

**Mise à jour**
La présente politique peut être modifiée à tout moment. Dernière mise à jour : avril 2026.

Add "Politique de confidentialité" link in the footer bottom strip.

---

## 10. FOOTER BOTTOM STRIP UPDATE

The footer bottom strip should now contain, on one line (wrapping on mobile):

Left side: © 2026 SAS AB INITIO · Mentions légales · Politique de confidentialité
Right side: L'abus d'alcool est dangereux pour la santé. À consommer avec modération.

"Mentions légales" links to /mentions-legales
"Politique de confidentialité" links to /politique-de-confidentialite
All at 12px minimum, warm gray.
