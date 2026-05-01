# Homepage Revision — Round 2 (Final)

Implement all changes below. Work section by section from top to bottom.
This supersedes any previous feedback prompts.

---

## 1. NAV

**Logo behavior on homepage:**
- HIDE the nav logo while the hero section is visible (user is at the top)
- FADE IN the nav logo once the user scrolls past the hero
- Use the same scroll listener that handles the nav background (transparent → dark blur)
- On all OTHER pages (subpages), the nav logo is always visible
- When visible, the nav logo should be the SAME COLOR as the nav link text (warm off-white, NOT bright white). It should blend with the menu items, not pop out.

**Menu items — 4 items:**
- Nos Vins · Histoire · Salons · Trouver nos vins
- "Trouver nos vins" replaces "Distribution" (more natural, less trade jargon, links to /distributeurs page)
- REMOVE "Contact" from the nav

**Language toggle:**
- Show only the current language (e.g., "FR") as a subtle text element at the far right of the nav
- On hover/click, reveal the alternative ("EN")
- Minimal, no flags, no dropdown — just clean text
- Non-functional for now (UI only), i18n routing later
- Also place FR / EN toggle in the footer

**GLOBAL RULE: No blue underlines anywhere on the site, ever.** All links use the site's own styling (color changes, border-bottom, opacity — never default browser blue underlines). Add a global CSS reset: `a { color: inherit; text-decoration: none; }`

---

## 2. LOGO

Replace the logo EVERYWHERE (nav, hero, footer) with `AB_Initio_Logo_clean.png` — just "AB INITIO" without motto or "Organic Wines". Dark on transparent. Use `filter: invert(1) brightness(2)` for white on dark backgrounds.

---

## 3. HERO

**Text visibility — everything below the logo needs to be significantly more prominent:**
- "Nihil fit sine causa" — increase font size ~30%, opacity to at least 0.85, add `text-shadow: 0 1px 8px rgba(0,0,0,0.5)`
- "Vins biologiques · Loire · France" — same treatment, bigger, brighter
- "Découvrir" — bigger, more visible, absolutely NO blue underline

**"Découvrir" scroll behavior:**
- Make it clickable — smooth scroll to the intro section below the hero
- Add an animated downward chevron/arrow below it that gently pulses or bounces (CSS animation only)
- The animation should be subtle and universally understood as "scroll down"
- Style: thin line or chevron, same warm off-white color, pulsing opacity or gentle bounce

---

## 4. WINES SECTION ("La Collection")

**Reduce top padding** — cut by ~40%.

**Reduce bottom padding** — the space after the last wine row before the next section also feels wide. Cut by ~25%.

**Improve text readability on dark background:**
- "LA COLLECTION" label — lighter color: use `rgba(245,242,235,0.7)` to match the style of the italic descriptors below
- "Chaque cuvée porte un nom..." heading — slightly larger
- "Élevés en amphore, nés de la patience" / "L'élan, le partage..." — increase font size ~15%, lighten to `rgba(245,242,235,0.65)`
- Wine names (PHILIA, EÏDOS, etc.) — bright white
- Vintage + grape text under each wine — lighten slightly, increase by ~10%

**EÏDOS tréma:** Must be EÏDOS everywhere. Search ALL files and fix any "Eidos" without tréma.

---

## 5. SECTION ORDER (REVISED)

The new page order, top to bottom:

1. Hero (dark photo, full viewport)
2. Intro (cream)
3. Wines / La Collection (dark)
4. **PRO CTA + Trust Strip (teal)** ← right after wines
5. **Amphora photo break (dark)**
6. Story / Histoire (cream)
7. Salons 2026 (dark)
8. Footer (dark)

**REMOVE the "Nos vins voyagent" / Distribution strip entirely.** It no longer exists as a standalone section. Its job is now handled by the trust strip link and the "Trouver nos vins" nav item.

---

## 6. PRO CTA BAND + TRUST STRIP

This is the most important CTA on the site. Two parts stacked:

### Part A: Teal CTA band
- Background: `#1a3d3d`
- Heading: "Professionnel·le du vin ?" — color `#d4e8e0`, serif font (Cormorant Garamond), ~20px
- Subtitle: "Tarifs, animations, accords — parlons-en ensemble." — color `#8ab8a8`, sans font, ~13px
- Button: "NOUS CONTACTER" — background `#f5f2eb`, text `#1a3d3d`, uppercase, letter-spaced
- Button hover: background `#c4a35a` (gold), text `#1a1918`
- Button links to `mailto:contact@abinitio-wines.com`

### Part B: Trust strip (below CTA, slightly darker teal)
- Background: `#152e2e`
- Header: "Ravis de travailler avec les passionné·es" — small caps, very subdued `rgba(212,232,224,0.35)`, letter-spaced
- Names in a flowing line separated by · dots: serif font (Cormorant Garamond), ~13px, color `rgba(212,232,224,0.55)`. Names wrap naturally on smaller screens.
- Placeholder names: La Dégustation Bohème Bourgeoise · Gamin · La Muscadothèque · Personnes · Gush! · Merold
- Below names: "Trouver nos vins en France et au-delà →" — small caps link, color `#8ab8a8`, border-bottom on hover, links to /distributeurs page
- On mobile: names wrap into multiple lines, link sits below

### CMS requirements (IMPORTANT):
ALL text in this section must be editable through Decap CMS:
- CTA heading (FR + EN)
- CTA subtitle (FR + EN)
- CTA button text (FR + EN)
- CTA button link (mailto or URL)
- Trust strip header (FR + EN)
- Trust strip names: a **repeatable list field** — each entry is a name string. Admin can add/remove/reorder.
- Trust strip link text (FR + EN)
- Trust strip link URL

---

## 7. AMPHORA PHOTO BREAK

Use `AB_Initio_Amphores_Large.jpeg`.
Keep overlay quote: « Rien n'arrive sans raison. Chaque vin est le fruit d'une intention, d'un terroir, d'un instant saisi. »

---

## 8. STORY SECTION ("Histoire")

Replace photo with `AB Initio Emmanuel Roblin cellar.jpg` (B&W, stainless tanks).

---

## 9. EVENTS SECTION ("Salons 2026")

**Layout: single column, left-aligned.** NOT two-column layout. Everything stacks vertically:

```
SALONS 2026          ← section label style (small caps, letter-spaced, sans)

10-11 MAI    RAW WINE                          Tokyo, Japon
23 MAI       Salon des Vins, Cave de la Ria    Pornic, France
6-8 JUIN     Sous les Pavés la Vigne           Paris, France
28-29 JUIN   Le Temps des Copains              Le Landreau, France

TOUS LES ÉVÉNEMENTS →
```

**Heading:** "SALONS 2026" uses the SAME section-label style as "LA COLLECTION", "HISTOIRE" etc. (small caps, letter-spaced, DM Sans). NOT a different/wild typeface. Consistent.

**Font size:** Increase all text by ~15-20%. Currently feels small.

**Countries after cities** as shown above.

---

## 10. FOOTER — COMPLETE REDESIGN

### Layout: 3 columns

**Left column:**
- Logo: warm gray `#b8b2a6`, NOT bright white. Adjust filter/opacity.
- "Nihil fit sine causa." — same `#b8b2a6`, NON-cursive, regular weight, DM Sans
- Bio cert logos (EU leaf + AB cert): ~48-54px height, same warm gray
- "Agriculture Biologique FR-BIO-01 · Certifié ECOCERT" — 13px, same `#b8b2a6`
- **Entire left column: ONE consistent color.** No 4 different grays.

**Center column:**
- CONTACT heading (letter-spaced caps)
- Address, email, phone
- ~2rem gap
- SUIVEZ-NOUS SUR INSTAGRAM — ALL CAPS, same heading style as "CONTACT", entire line is ONE clickable link

**Right column — PUSH TO RIGHT EDGE, RIGHT-ALIGN TEXT:**
- NAVIGATION heading (right-aligned)
- Nos Vins / Histoire / Salons / Trouver nos vins (right-aligned)
- FR / EN toggle below, right-aligned

### Bottom strip:
- Left: "© 2026 SAS AB INITIO" (no "Vin de France")
- Right: "L'abus d'alcool est dangereux pour la santé. À consommer avec modération."
- MINIMUM 12px. Warm gray.

**REMOVE** any duplicate certification text.
**NO blue underlines.** Warm gray links, lighter on hover.

---

## 11. SEO & ACCESSIBILITY

- ALL images: descriptive alt text, NEVER empty
- Alt text matches page language
- Proper `<title>` and `<meta description>`, bilingual

---

## 12. LEGAL (Loi Évin)

- Footer alcohol warning: 12px minimum
- No e-shop = no age verification needed
- Required text: "L'abus d'alcool est dangereux pour la santé. À consommer avec modération."
- No images of people consuming alcohol in positive/festive contexts

---

## 13. NAMING

Rename "Distribution" to "Trouver nos vins" everywhere: nav, footer nav, any links. Page URL stays /distributeurs but display text is "Trouver nos vins" (FR) / "Find our wines" (EN).
