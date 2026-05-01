# PARTNERS LIST — UPDATE EXISTING TRUST STRIP

## What this is

The "Ravis de travailler avec les passionné·es" section already exists on the homepage. **Do not rebuild it.** This task only changes:

1. The way each name + town is rendered inside the existing list (italic, with a non-breaking unit so lines never start with a separator)
2. The list content (15 specific names below)
3. The data source: move from whatever it currently uses to a Decap collection so Lucie can edit it from the CMS

No other markup, no other sections, no padding/background/header/title changes. Just the list block inside the existing section.

---

## 1. Decap collection

Add a `partners` collection to `public/admin/config.yml`. Files-based collection (single source list), not folder-based:

```yaml
- name: "partners"
  label: "Partenaires (HP)"
  files:
    - name: "partners_list"
      label: "Liste des partenaires"
      file: "src/content/partners/list.json"
      fields:
        - name: "items"
          label: "Adresses"
          widget: "list"
          fields:
            - { name: "name", label: "Nom", widget: "string" }
            - { name: "town", label: "Ville", widget: "string" }
```

Then create the seed file at `src/content/partners/list.json` with the 15 entries below (in this exact order):

```json
{
  "items": [
    { "name": "Manoir de Régate", "town": "Nantes" },
    { "name": "Château de Maubreuil", "town": "Carquefou" },
    { "name": "Panorama", "town": "Romainville" },
    { "name": "Gush!", "town": "Paris 20" },
    { "name": "Etna Mazarine", "town": "Paris 6" },
    { "name": "Auberge de la Madeleine", "town": "Gétigné" },
    { "name": "Le Saint Paul", "town": "Préfailles" },
    { "name": "La Part Belle", "town": "Cangey" },
    { "name": "Sybarite", "town": "Pornic" },
    { "name": "Cave de la Ria", "town": "Pornic" },
    { "name": "La Cave des Quais", "town": "Paris 10" },
    { "name": "Cave la Félicité", "town": "Paris 17" },
    { "name": "Caves de Prague", "town": "Paris 12" },
    { "name": "Antinéa", "town": "Nantes" },
    { "name": "Muscadothèque", "town": "Nantes" }
  ]
}
```

---

## 2. Update the existing trust strip section

Find the existing trust strip on the homepage (the section with the eyebrow "Ravis de travailler avec les passionné·es"). Inside that section, locate the block that renders the list of partners. Replace **only that list rendering** with the markup below. Leave the section's background, padding, eyebrow, coda, and any wrapping container untouched.

In the page's frontmatter, import the JSON:

```astro
---
import partnersData from '../content/partners/list.json';
const partners = partnersData.items;
// ...keep any other existing imports
---
```

Replace the existing list block with:

```astro
<p class="trust-line">
  {partners.map((p) => (
    <span class="partner-unit">{p.name} <span class="place">{p.town}</span><span class="sep">·</span></span>
  ))}
  <span class="more">et aussi…</span>
</p>
```

If the existing section has a `<p class="trust-line">` already, replace its contents only. If the list is currently rendered with different class names, update the markup to use `trust-line`, `partner-unit`, `place`, `sep`, `more` so the styles below match. If those classes already exist on the existing section but with different rules, **add** the rules below to the existing styles, do not delete the existing block.

---

## 3. Styles for the list rendering

Add these rules (or update existing matching selectors) inside the existing section's `<style>` block. **Do not touch other rules in the same style block.**

```css
.trust-line {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: clamp(1rem, 1.4vw, 1.15rem);
  color: var(--black, #0e0e0c);
  line-height: 2.1;
}

/* Each Name place · is one non-breaking unit; line wraps only BETWEEN units */
.partner-unit {
  display: inline-block;
  white-space: nowrap;
}
.partner-unit .place {
  font-family: 'DM Sans', sans-serif;
  font-style: normal;
  font-size: 0.78rem;
  color: var(--grey-warm, #6b6557);
  letter-spacing: 0.04em;
  margin-left: 0.3em;
}
.partner-unit .sep {
  color: var(--pro-blue, #1e3a8a);
  opacity: 0.45;
  margin: 0 0.4rem 0 0.8rem;
}
.trust-line .more {
  color: var(--grey-mute, #8a8478);
}
```

---

## Acceptance test

1. List renders the 15 entries above, in that order, ending with "et aussi…" after a separator.
2. Each name is italic Cormorant Garamond. Each town is small grey DM Sans (non-italic).
3. Resize the browser from wide to narrow: lines wrap cleanly, no line ever starts with `·`.
4. Decap CMS shows a "Partenaires (HP)" entry. Editing it (adding/removing/reordering items) and saving updates `src/content/partners/list.json`. After rebuild, the homepage reflects the change.
5. The rest of the trust strip section (eyebrow, link coda, padding, background) is byte-identical to before this change. Nothing outside the list block was modified.
