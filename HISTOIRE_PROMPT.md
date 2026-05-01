# HISTOIRE PAGE — Claude Code Prompt
## AB Initio — src/pages/histoire.astro

Build the `/histoire` page for the Ab Initio website. This is a subpage with its own layout, fully consistent with the existing design system (fonts, CSS variables, nav, footer). Study the existing homepage and cuvées pages before starting to ensure consistency.

---

## DESIGN SYSTEM REFERENCE

Reuse existing CSS variables and components exactly:
- `--black`: near-black background
- `--offwhite` / `--cream`: light backgrounds
- `--warm-gray`, `--mid-gray`: muted text
- `--pro-blue`: navy CTA (not used on this page)
- `--wine-gold`: accent, used sparingly
- Fonts: `Bebas Neue` (display), `Cormorant Garamond` (editorial serif), `DM Sans` (functional sans)
- Nav: identical to all other pages — Nos Vins · Histoire · Salons · Trouver nos vins + FR/EN toggle. "Histoire" is the active link.
- Footer: identical to all other pages
- `color-scheme: light only` — no dark mode

---

## PAGE STRUCTURE

### 1. NAV
Standard nav. "Histoire" marked active.

---

### 2. HERO — typographic, cream background
```
background: var(--cream) or var(--offwhite)
text-align: center
padding: 56px 48px 0
```

- Eyebrow (DM Sans, 10px, letter-spacing 0.22em, uppercase, `--warm-gray`):
  `L'histoire, depuis le commencement`
- H1 (Bebas Neue, ~104px, line-height 0.88):
  `AB` / `INITIO` (two lines)

No image in the hero. No "Rien n'arrive" here — that comes in the next section.

---

### 3. GRANDFATHER SECTION — editorial overlap, desktop only

**Desktop layout:**
```
position: relative
height: ~420px (adjust to match photo natural proportions)
```

- Left: grandfather photo, absolutely positioned, `left: 0`, `width: 46%`, `height: 100%`, `object-fit: cover`, `object-position: center`
- Right: text block, absolutely positioned, `left: 30%`, `width: 62%`, vertically centered, cream background (`var(--offwhite)`), padding 32px. This creates the overlap effect — the text box sits partly over the photo.

Text content:
```
Rien n'arrive
sans raison…
```
Font: Cormorant Garamond, italic, weight 300, ~42px, line-height 1.25, color `var(--black)`.

**Mobile layout (max-width: 600px):**
Stack vertically — photo full width (aspect-ratio 4/5), then text below, no overlap, no absolute positioning. "Rien n'arrive" at ~32px.

**Asset:** `src/assets/histoire/grandpere-yves.jpg`
Alt text (FR): `Yves, grand-père d'Emmanuel, marin pêcheur`
Alt text (EN): `Yves, Emmanuel's grandfather, fisherman`

---

### 4. TEXT COLUMN — paragraphs 1 & 2

```
max-width: 580px
margin: 0 auto
padding: 56px 48px
font-family: Cormorant Garamond
font-size: 19px
line-height: 1.82
font-weight: 300
```

Bold (`font-weight: 400` in Cormorant) used for skimmability on key phrases as marked below.

**Paragraph 1:**
> **Octobre 2015, un ami caviste m'emmène à un salon près de Nantes.** Sur le stand du Domaine de l'Écu, Fred Niger me fait déguster son Melon de Bourgogne élevé en amphore. Ce vin me bouleverse, littéralement — je m'en souviens encore très précisément.

**Paragraph 2:**
> Six mois plus tard, je rejoins Fred à l'Écu pour quelques semaines de stage, suivi des vendanges. **Saisi par la passion, je quitte un poste confortable dans le design haut de gamme pour me plonger dans la terre et le vivant.** La formation à l'école de viticulture d'Amboise, à l'époque la seule en France spécialisée en agriculture et vinification biologiques et biodynamiques, me fait rencontrer des formateurs remarquables — Damien Delecheneau, Vincent Carême, Tanguy Perraud, Philippe Chigard…

---

### 5. VIGNES PHOTO BREAK — full width

```
width: 100%
aspect-ratio: 21/9
object-fit: cover
object-position: center
margin: 48px 0
display: block
```

No caption. No text overlay.

**Asset:** `src/assets/histoire/vignes-providence.jpg`
Alt text (FR): `Les vignes de la Providence au coucher du soleil, Vallet`
Alt text (EN): `Vineyards at Domaine de la Providence at sunset, Vallet`

---

### 6. PROVIDENCE + KAÏROS — text left, bottle photo right

```
display: grid
grid-template-columns: 1fr 196px
gap: 40px
align-items: start
max-width: 760px
margin: 0 auto
padding: 0 48px
```

**Text (left):**
> **Vendanges 2018, Fred me parle d'un petit domaine pas loin de l'Écu.** Arrivé au Domaine de la Providence, un coup de foudre pour ces vignes centenaires profondément enracinées dans des sous-sols de granite et de schiste et ses pratiques culturales douces. J'emménage dans une petite maison attenante au chai et commence la taille de la vigne. L'année suivante, l'aventure commence vraiment : je vendange une parcelle de Gamay à la Providence et en fais mon premier vin, avec une amphore et le soutien administratif prêtés par Fred et Claire. **Dix-huit mois plus tard, mon rêve devient réalité : le vin est mis en bouteille et baptisé Kaïros — le moment opportun, l'instant juste.**

**Photo (right):**
```
aspect-ratio: 2/3
object-fit: cover
```
**Asset:** `src/assets/histoire/kairos-bouteille.jpg`
Alt text (FR): `Bouteille Kaïros, première cuvée AB Initio`
Alt text (EN): `Kaïros bottle, first AB Initio cuvée`

**Mobile:** single column, photo below text, full width, aspect-ratio 4/3.

---

### 7. AB INITIO CREATION — portrait photo left, text right

```
display: grid
grid-template-columns: 186px 1fr
gap: 40px
align-items: start
max-width: 760px
margin: 32px auto 0
padding: 0 48px
```

**Photo (left):**
```
aspect-ratio: 3/4
object-fit: cover
object-position: center top
```
**Asset:** `src/assets/histoire/emmanuel-claire-fred.jpg`
Alt text (FR): `Emmanuel Roblin, Claire Niger et Fred Niger, associés AB Initio`
Alt text (EN): `Emmanuel Roblin, Claire Niger and Fred Niger, AB Initio partners`

**Text (right):**
> **Motivés par ce premier succès, Claire, Fred et moi créons AB Initio en août 2020.** Moi dans le rôle d'artisan-vinificateur qui sélectionne les vignerons et les parcelles, crée et élabore les vins et les commercialise, avec l'indispensable soutien matériel et logistique de Fred et Claire. **Une gamme de vins de passion, de philosophie et de copains.**

**Mobile:** single column, photo above text, full width.

---

### 8. TEXT COLUMN — paragraphs 5 & 6

Same column style as section 4.

**Paragraph 5:**
> Le commencement — *initio* — des vins se trouve souvent dans la taille, un autre moment crucial ! Presto, une proposition singulière des trois cépages du Nantais, s'inspire d'une parcelle complantée. Philia, l'image des étés bretons chez grand-père pêcheur, est née en taillant des vieilles Folles Blanches sous une pluie battante.

**Paragraph 6:**
> **Pas à pas, je crée un univers à mon image.** AB Initio est l'estuaire naturel de mon fleuve de vie (pas tranquille), un projet de conviction empreint de tout ce qui m'a formé, de tout ce qui m'est cher : mon grand-père et son bateau qui partait pêcher à la ligne dans la baie de Douarnenez, à Saint-Jean-de-Luz ou à Saint-Nazaire, où mes parents se marient et où je suis né. L'océan, force omniprésente pour ma famille. Une abondance de poissons, de crustacés, d'huîtres — le quotidien de mon enfance, naturellement reflété dans la personnalité de mes vins, dans la salinité, la tension, mais aussi la légèreté. Ma Bretagne, une ancre identitaire ; le Muscadet, un chez-moi adopté, un terroir découvert. Mes études de philosophie, mon besoin d'aller au fond des choses qu'on retrouve dans les noms des cuvées, dans le regard que je porte sur la vigne, le vin, l'humain. **Tous ces moments de bascule, des rencontres qui nous font vibrer.**

---

### 9. NIHIL — closing line

```
text-align: center
padding: 64px 48px 56px
font-family: Cormorant Garamond
font-size: 21px
font-style: italic
font-weight: 300
color: var(--wine-gold) or warm muted gold tone
letter-spacing: 0.05em
```

Text:
> Car rien n'arrive sans raison — *nihil fit sine causa…*

No dark background section. No button. Just this line, centered, quiet.

---

### 10. ARCHIVE PHOTOS — silent closing

```
display: grid
grid-template-columns: 1fr 1fr
gap: 3px
width: 100%
```

Two photos side by side, no captions, no alt text visible, no border. Silent.

```
aspect-ratio: 4/3
object-fit: cover
```

**Assets:**
- Left: `src/assets/histoire/parents-life-ring.jpg` — black and white, parents framed by life ring "MARC HELENE / St NAZAIRE"
- Right: `src/assets/histoire/parents-bateau.jpg` — black and white, parents on the Marc-Hélène with flags

Alt text (screen readers only, visually hidden):
- FR: `Parents d'Emmanuel sur le Marc-Hélène, Saint-Nazaire` / `Mariage des parents d'Emmanuel à bord du Marc-Hélène`
- EN: `Emmanuel's parents on the Marc-Hélène, Saint-Nazaire` / `Emmanuel's parents' wedding aboard the Marc-Hélène`

**Mobile:** stack vertically, each photo full width, aspect-ratio 4/3.

---

### 11. FOOTER
Standard footer, identical to all other pages.

---

## ASSETS CHECKLIST

Place all assets in `src/assets/histoire/`:

| Filename | Description | Orientation |
|---|---|---|
| `grandpere-yves.jpg` | Grandfather on the boat, colour, vintage | Portrait 4:5 |
| `vignes-providence.jpg` | Vines at sunset | Landscape, crops well at 21:9 |
| `kairos-bouteille.jpg` | Kaïros bottle | Portrait 2:3 |
| `emmanuel-claire-fred.jpg` | Three partners | Portrait 3:4 |
| `parents-life-ring.jpg` | Life ring wedding portrait, b&w | Landscape 4:3 |
| `parents-bateau.jpg` | Full boat with flags, b&w | Landscape 4:3 |

Use Astro's `<Image>` component for all photos with appropriate `width`, `height`, and `loading="lazy"` (except grandpere-yves which is above the fold — use `loading="eager"`).

---

## BILINGUAL — EN VERSION

Create `src/pages/en/histoire.astro` in parallel.

All text translated to English. Structure and layout identical. FR is default.

EN text translations:

**Hero eyebrow:** `The story, from the beginning`
**H1:** `AB INITIO` (unchanged)
**Rien n'arrive:** `Nothing happens without reason…`

**Para 1:** In October 2015, a wine merchant friend took me to a trade fair near Nantes. At the Domaine de l'Écu stand, Fred Niger poured me his Melon de Bourgogne aged in amphora. That wine shook me to the core — I still remember it precisely.

**Para 2:** Six months later, I joined Fred at l'Écu for a few weeks' internship, then harvest. Seized by passion, I left a comfortable position in high-end design to plunge into the earth and the living. My training at the Amboise viticulture school — at the time the only one in France specialising in organic and biodynamic viticulture and winemaking — brought me remarkable teachers: Damien Delecheneau, Vincent Carême, Tanguy Perraud, Philippe Chigard…

**Para 3:** In the 2018 harvest, Fred mentioned a small domaine near l'Écu. Arriving at Domaine de la Providence, it was love at first sight — century-old vines rooted deep in granite and schist subsoil, gentle farming practices. I moved into a small house next to the cellar and began pruning. The following year, the adventure truly began: I harvested a Gamay plot at la Providence and made my first wine, with an amphora and administrative support lent by Fred and Claire. Eighteen months later, my dream became reality: the wine was bottled and named Kaïros — the opportune moment, the right instant.

**Para 4:** Spurred by this first success, Claire, Fred and I created AB Initio together in August 2020. Me as artisan winemaker — selecting growers and plots, creating and crafting the wines, bringing them to market — with the indispensable material and logistical support of Fred and Claire. A range of wines born of passion, philosophy and friendship.

**Para 5:** The beginning — *initio* — of our wines is often found in the pruning, another pivotal moment. Presto, a singular blend of the three Nantais grape varieties, was inspired by a field blend plot. Philia, the image of Breton summers at my fisherman grandfather's, was born while pruning old Folle Blanche vines in the driving December rain.

**Para 6:** Step by step, I build a world in my own image. AB Initio is the natural estuary of my river of life (not a quiet one) — a project of conviction shaped by everything that formed me, everything I hold dear: my grandfather and his boat, fishing with line and net in the bay of Douarnenez, at Saint-Jean-de-Luz, or at Saint-Nazaire, where my parents married and where I was born. The ocean, an ever-present force for my family. An abundance of fish, shellfish, oysters — the everyday of my childhood, naturally reflected in the personality of my wines: salinity, tension, and lightness. Brittany, an identity anchor; Muscadet, an adopted home, a discovered terroir. My philosophy studies, my need to go to the root of things — found in the names of the cuvées, in the way I look at the vine, the wine, the human.  **All these turning-point moments, encounters that make us vibrate.**

**Nihil:** For nothing happens without reason — *nihil fit sine causa…*

---

## SEO — BOTH LANGUAGES

**FR:**
- `<title>`: Histoire | AB Initio — Vins biologiques, Loire
- `<meta description>`: L'histoire d'Emmanuel Roblin et d'AB Initio : une rencontre, des vignes centenaires, une conviction. Vins biologiques élevés en amphore, Loire.
- `<h1>`: AB Initio (in page)
- Canonical: `https://www.abinitio-wines.com/histoire`

**EN:**
- `<title>`: Our Story | AB Initio — Organic Wines, Loire Valley
- `<meta description>`: The story of Emmanuel Roblin and AB Initio: an encounter, century-old vines, a conviction. Organic wines aged in amphora, Loire Valley.
- Canonical: `https://www.abinitio-wines.com/en/histoire`

---

## NOTES FOR CLAUDE CODE

- No CTA band on this page. Goes directly from archive photos to footer.
- No captions on any photo.
- No dark section at the end — the nihil line is the closing moment, cream background.
- The grandfather overlap effect is desktop only — use a CSS class with `@media (max-width: 600px)` to switch to stacked layout.
- Bold in Cormorant Garamond = `font-weight: 400` (not 700 — Cormorant's 400 reads as bold against the 300 body weight).
- `initio` and `nihil fit sine causa` in italic where marked.
- Tréma required: Eïdos, Kaïros (check cuvée names throughout).
- `color-scheme: light only` in `<head>` — already set globally, confirm it carries through.
