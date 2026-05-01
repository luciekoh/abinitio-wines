# Hotfix — CTA Styling + Final Tweaks

## 1. CTA SECTION IS BROKEN — MISSING ALL STYLES

The Pro CTA + Trust Strip section has lost all its styling. It's rendering as unstyled plain text on a white/light background. Fix this urgently:

### Part A: Teal CTA band
- Background: `#1a3d3d`
- Padding: `clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 5vw, 4rem)`
- Layout: flex, space-between, centered vertically, gap 2rem, wrapping on mobile
- Heading "Professionnel·le du vin ?": color `#d4e8e0`, font-family Cormorant Garamond, font-size clamp(1.2rem, 2.2vw, 1.5rem), font-weight 300
- Subtitle "Tarifs, animations, accords — parlons-en ensemble.": color `#8ab8a8`, font-family DM Sans, font-size 0.85rem
- Button "NOUS CONTACTER": background `#f5f2eb`, color `#1a3d3d`, font-family DM Sans, font-size 0.72rem, font-weight 400, letter-spacing 0.12em, text-transform uppercase, padding 0.85rem 2.8rem, no border-radius or very small (2px)
- Button hover: background `#c4a35a`, color `#1a1918`
- Button links to mailto:contact@abinitio-wines.com

### Part B: Trust strip (directly below, no gap)
- Background: `#152e2e`
- Padding: 1rem same horizontal padding as CTA above
- Header "Ravis de travailler avec les passionné·es": font-family DM Sans, font-size 0.6rem, letter-spacing 0.2em, text-transform uppercase, color `rgba(212,232,224,0.35)`
- Names line: font-family Cormorant Garamond, font-size 0.85rem, color `rgba(212,232,224,0.55)`, names separated by " · " (middle dot with spaces)
- Link "Trouver nos vins en France et au-delà →": font-family DM Sans, font-size 0.68rem, letter-spacing 0.12em, text-transform uppercase, color `#8ab8a8`, border-bottom 1px solid rgba(138,184,168,0.3) on hover, margin-top 0.75rem, links to /distributeurs

Make sure the CTA section has proper max-width (e.g., 1100px centered) for the inner content, while the background colors go full-width.

---

## 2. SALONS 2026

- "SALONS 2026" title: make it the SAME COLOR as "TOUS LES ÉVÉNEMENTS →" link (offwhite, not the current muted gray). And slightly bigger.
- Add a visible separator/spacing between the Salons section and the Footer below it. Currently they bleed into each other. Either add bottom padding to Salons, or a subtle border-top on the footer, or both.

---

## 3. FOOTER TWEAKS

**Logo:** Still a different color than the text below it. Make the logo THE SAME warm gray as "Nihil fit sine causa" text. Adjust the CSS filter opacity until it matches. Try `filter: invert(1) brightness(2) opacity(0.55)` or similar. Also make it ~10% bigger.

**"Nihil fit sine causa.":** REVERT to cursive/italic. It was better in italic. Use font-style: italic, font-family: Cormorant Garamond.

**Bio certification section — reorder:**
1. Text "Agriculture Biologique FR-BIO-01 · Certifié ECOCERT" FIRST (above)
2. Logos (EU leaf + AB cert) BELOW the text
3. Add more vertical spacing (~1.5rem) between "Nihil fit sine causa" and this certification block

**"SUIVEZ-NOUS SUR INSTAGRAM":**
- Make it ONE LINE (not wrapping)
- Pull it out of the center column — position it as a CENTERED element spanning the full footer width, like a separator between the 3-column content and the bottom strip
- Add generous spacing above it (~2rem from the columns above)
- Link the entire text to: https://www.instagram.com/abinitio_wine/
- Style: DM Sans, same small-caps letter-spaced style as other headings, warm gray, hover to offwhite

**AB Initio logo in footer** — make sure it's the same `#b8b2a6` warm gray as ALL other text in the left column. One color for everything.
