# HISTOIRE PAGE — Hotfix Prompt
## src/pages/histoire.astro — single pass, all changes below

Read the current `histoire.astro` file in full before making any changes. Do not restructure the page — make targeted fixes only. All changes listed below.

---

## 1. COLUMN WIDTH LOGIC

There are two distinct layout zones on this page. They must have different max-widths:

**Pure text paragraphs** (no photo alongside):
```css
max-width: 640px;
margin-left: auto;
margin-right: auto;
padding: 0 24px;
```

**Aside sections** (text + photo side by side):
```css
max-width: 920px;
margin-left: auto;
margin-right: auto;
padding: 0 48px;
```

Apply this distinction consistently. The pure text column should feel like a book — narrow, comfortable, ~65 characters per line. The aside sections need room for the photo without cramping the text.

---

## 2. PARAGRAPH SPACING

Current paragraph margin-bottom is too generous — it creates a blog-like double-spaced feel.

Reduce to:
```css
.para {
  margin-bottom: 1.4rem;
}
```

Between distinct sections (e.g. after the grandfather block before the running text begins, after the vignes photo, between the aside sections) use a spacer of `48px` — not more.

---

## 3. GRANDFATHER SECTION — clean side by side, no overlap, no transparency

Remove any transparency or overlay effect from the current implementation. Replace with a clean two-column grid:

```css
.gf-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  max-width: 920px;
  margin: 0 auto;
  padding: 0 48px;
  gap: 56px;
}
```

- Left: grandfather photo, `aspect-ratio: 4/5`, `object-fit: cover`, no border, no overlay
- Right: "Rien n'arrive sans raison…" in Cormorant Garamond italic, weight 300, ~38px, color `var(--black)`, line-height 1.25. Nothing else in this column — just the line, vertically centered.

**Mobile (max-width: 600px):** stack vertically. Photo full width, aspect-ratio 4/5. Text below, font-size 28px, padding 24px.

---

## 4. SECTION PADDING — breathing room between blocks

Add deliberate padding between each major section so the page feels like it has rhythm rather than one continuous scroll.

Between the grandfather section and the first text paragraph: `72px`
Between the first text column and the vignes photo: already handled by the photo break margin
Between the vignes photo and the Providence/Kaïros aside: `56px`
Between the Providence aside and the AB Initio aside: `48px`
Between the AB Initio aside and the pull quote: `64px`
Between the pull quote and the final text column: `56px`
Between the final text column and the CTA section: `72px`

---

## 5. PULL QUOTE — mid-page visual moment

Insert a pull quote between the AB Initio creation paragraph and the Presto/Philia paragraph.

```html
<blockquote class="pull-quote">
  L'estuaire naturel de mon fleuve de vie — pas tranquille.
</blockquote>
```

```css
.pull-quote {
  max-width: 640px;
  margin: 0 auto;
  padding: 0 48px;
  font-family: var(--serif);
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  font-style: italic;
  font-weight: 300;
  color: var(--black);
  line-height: 1.4;
  border-left: 1.5px solid var(--wine-gold);
  padding-left: 32px;
}
```

No quotation marks. No attribution. Just the line.

---

## 6. INLINE CUVÉES LINK — after Presto/Philia paragraph

Directly after the paragraph ending "…sous une pluie battante." add a subtle inline link:

```html
<p class="cuvees-nudge">
  <a href="/cuvees">Découvrir toutes nos cuvées →</a>
</p>
```

```css
.cuvees-nudge {
  max-width: 640px;
  margin: 20px auto 0;
  padding: 0 48px;
  font-family: var(--sans);
  font-size: 0.75rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--dark-gray);
  text-decoration: none;
}

.cuvees-nudge a {
  color: var(--dark-gray);
  text-decoration: none;
  border-bottom: 0.5px solid var(--dark-gray);
  padding-bottom: 1px;
  transition: color 0.2s, border-color 0.2s;
}

.cuvees-nudge a:hover {
  color: var(--black);
  border-color: var(--black);
}
```

---

## 7. SUBTLE BACKGROUND SHIFT — final reflective paragraph

The final long paragraph ("Pas à pas, je crée un univers à mon image…") has a different emotional register — more reflective, personal, conclusive. Wrap it in a section with a slightly warmer background to signal the shift:

```css
.final-section {
  background: #EDE8DF; /* one shade warmer/deeper than the page cream */
  padding: 56px 0;
  margin: 0;
  width: 100%;
}
```

The text column inside stays at `max-width: 640px`, centered, same typography. The background change is subtle — not a dark section, just a perceptible warmth shift. If `--cream` is already `#F5F0E8`, this value `#EDE8DF` is the right step darker.

---

## 8. CTA SECTION — quiet, centered, cream

Add a CTA section after the nihil line and before the archive photos.

```html
<section class="histoire-cta">
  <p class="histoire-cta-title">Prochaine rencontre — vous.</p>
  <p class="histoire-cta-sub">La suite de cette histoire s'écrit sur votre carte des vins.</p>
  <a href="mailto:contact@abinitio-wines.com" class="histoire-cta-btn">
    Contactez-nous
  </a>
</section>
```

```css
.histoire-cta {
  background: var(--offwhite);
  padding: 72px 48px;
  text-align: center;
}

.histoire-cta-title {
  font-family: var(--serif);
  font-size: clamp(1.6rem, 2.5vw, 2.2rem);
  font-style: italic;
  font-weight: 300;
  color: var(--black);
  margin-bottom: 16px;
  line-height: 1.3;
}

.histoire-cta-sub {
  font-family: var(--serif);
  font-size: clamp(1rem, 1.5vw, 1.2rem);
  font-style: italic;
  font-weight: 300;
  color: var(--dark-gray);
  margin-bottom: 36px;
  line-height: 1.5;
}

.histoire-cta-btn {
  display: inline-block;
  font-family: var(--sans);
  font-size: 0.72rem;
  font-weight: 400;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--black);
  text-decoration: none;
  padding: 12px 32px;
  border: 0.5px solid var(--black);
  transition: background 0.25s, color 0.25s;
}

.histoire-cta-btn:hover {
  background: var(--black);
  color: var(--offwhite);
}
```

No navy band. No pro-blue. Cream background, Cormorant text, minimal DM Sans button. Consistent with the tone of the page.

---

## ORDER OF SECTIONS — confirm this is the final sequence

1. Nav (black, Histoire active)
2. Hero — eyebrow HISTOIRE + H1 DEPUIS LE COMMENCEMENT (centered, cream)
3. Grandfather section — photo left, "Rien n'arrive sans raison…" right, clean grid
4. Text column — paragraphs 1 & 2 (Octobre 2015 + school)
5. Vignes photo — full bleed 21:9
6. Providence + Kaïros aside — text left, bottle photo right
7. AB Initio creation aside — portrait photo left, text right
8. Pull quote — "L'estuaire naturel de mon fleuve de vie — pas tranquille."
9. Text column — Presto/Philia paragraph + "Découvrir toutes nos cuvées →" link
10. Final section (slightly warmer bg) — "Pas à pas…" paragraph
11. Nihil — centered, italic, wine-gold color
12. CTA section — "Prochaine rencontre — vous." + button
13. Archive photos — two side by side, no captions
14. Footer

---

## NOTES

- Do not touch the nav or footer
- Do not touch the vignes photo or the archive photos
- Do not touch any text content — copy is final
- The nihil line stays exactly as is — centered, italic, wine-gold, no dark background section
- Test column width at 1280px, 1024px, and 768px — the pure text column should never exceed 640px, the aside sections should never feel cramped
- `color-scheme: light only` must remain in head
