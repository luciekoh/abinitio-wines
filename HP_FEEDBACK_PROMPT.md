# Homepage Feedback — Changes Required

## LOGO
- Replace the current logo EVERYWHERE (nav, hero, footer) with the new clean logo: `AB_Initio_Logo_clean.png` — this is just "AB INITIO" without "Organic Wines" or the motto. Dark text on transparent background. Use `filter: invert(1) brightness(2)` to render white on dark backgrounds.

## NAV
- Add "Contact" to the navigation menu (links to #contact or scrolls to footer contact section)
- Add a language switcher: simple text "FR / EN" — no flags, just clean text toggle. Put it in the nav AND in the footer. For now it can be non-functional (just the UI element), we'll wire up i18n routing later.

## HERO
- Make the text MORE VISIBLE / PROMINENT on the hero image:
  - "Nihil fit sine causa" — larger, bolder, more contrast against the photo
  - "Vins biologiques · Loire · France" — larger, more visible
  - "Découvrir" — larger, more visible
- "Découvrir" + the scroll indicator line should be CLICKABLE — smooth scroll down to the intro section below the hero. Currently it does nothing.

## WINES SECTION ("La Collection")
- Too much padding/whitespace between the top of the dark section and the "La Collection" text. Reduce it.
- "La Collection" heading, "Élevés en amphore, nés de la patience", wine names, vintage, grapes — all text in this dark section needs to be MORE READABLE: bigger font size and lighter color. Currently it disappears against the black background.
- EÏDOS: Fix the tréma — must be EÏDOS everywhere throughout the entire site, consistently. Check all files.

## PHOTO BREAK
- Replace the current cellar/stainless steel tanks photo with the new amphora photo: `AB_Initio_Amphores_Large.jpeg`
- Keep the same overlay quote: « Rien n'arrive sans raison. Chaque vin est le fruit d'une intention, d'un terroir, d'un instant saisi. »

## PRO CTA ("Demander nos tarifs")
- This is the MAIN CTA of the site — it needs to be much more prominent!
- Try a different, more eye-catching background color for this band. Something that stands out from the rest of the page. Try wine-red (#6b2d3e) background with white text, or another bold approach. The current cream is too subtle, it blends in.
- Make the whole section more visually impactful — this needs to catch the eye of professionals scrolling through.

## STORY SECTION ("Histoire — Du commencement")
- Replace the current photo with: `AB_Initio_Emmanuel_Roblin_wine_in_the_vines.jpg` (Emmanuel pouring wine in the vineyard, golden hour). This is a large file (3072x4608) — resize/optimize it for web when copying to assets.

## EVENTS SECTION ("Salons 2026")
- "SALONS 2026" heading needs to be more prominent/readable — currently too subtle
- After each event's city, ADD THE COUNTRY. So:
  - Tokyo, Japon
  - Pornic, France
  - Paris, France
  - Le Landreau, France

## FOOTER
- Replace logo with new logo (same as nav/hero — see LOGO section above)
- Bio certification logos (EU leaf + AB cert): make them BIGGER (at least 30-36px height instead of current ~24px)
- "Agriculture Biologique FR-BIO-01 · Certifié ECOCERT" text: make it BIGGER and more readable
- Restructure the footer layout — currently feels cluttered:
  - Move "Suivez-nous" / Instagram under the certification info (same column as brand)
  - Swap Navigation and Contact columns so Contact is more prominent
  - Or otherwise reorganize to feel cleaner and less crowded
- REMOVE the duplicate "Certifié Agriculture Biologique FR-BIO-01" text in the bottom-right. It's already shown with the logos, no need to repeat.
- The alcohol warning "L'abus d'alcool est dangereux pour la santé..." — make it slightly bigger/more readable
- Move the "© 2026 SAS AB INITIO · Vin de France" copyright line down next to the alcohol warning, so they're together at the very bottom as small legal text instead of floating separately.

## SEO & ACCESSIBILITY
- ALL images must have descriptive alt text. Never leave alt="" empty.
- Alt text must match the page language: French alt on /fr/ pages, English alt on /en/ pages. Store both versions in the content files.
- Examples (FR / EN):
  - Logo: "Ab Initio — Vins biologiques, Loire" / "Ab Initio — Organic wines, Loire Valley"
  - Hero: "Emmanuel Roblin dans les vignes du Muscadet nantais" / "Emmanuel Roblin in the Muscadet nantais vineyards"
  - Wine labels: "Étiquette Philia 2021 — Folle Blanche" / "Philia 2021 label — Folle Blanche"
  - Amphora: "Amphores de vinification dans la cave d'Ab Initio" / "Winemaking amphoras in the Ab Initio cellar"
  - Story photo: "Emmanuel Roblin verse du vin dans les vignes" / "Emmanuel Roblin pouring wine in the vineyard"
- Add proper meta description and title tags to the page head, also bilingual
