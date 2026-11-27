---
name: tehospeda · Hotel Website
description: One-page public hotel website template, fed per hotel by the ERP, built to the category standard of international chain sites.
colors:
  night: "#1e2a3a"
  night-2: "#2c3b4f"
  ink: "#1b222c"
  muted: "#5b6573"
  line: "#e4ded3"
  sand: "#f6f3ee"
  sand-2: "#efe9df"
  surface: "#ffffff"
  bronze: "#9a6b32"
  bronze-dark: "#7f5726"
  bronze-light: "#b8874b"
  ok: "#2f6b45"
  danger: "#a83a2c"
typography:
  display:
    fontFamily: "Libre Caslon Display, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(2.75rem, 8vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Libre Caslon Display, Iowan Old Style, Georgia, serif"
    fontSize: "3rem"
    fontWeight: 400
    lineHeight: 1
  wordmark:
    fontFamily: "Libre Caslon Display, Iowan Old Style, Georgia, serif"
    fontSize: "1.75rem"
    fontWeight: 400
    lineHeight: 1
  figure:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.33
  title:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.4
  value:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.55
  body-lg:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  nav:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 500
    lineHeight: 1.5
  small:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.43
  label:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.33
    letterSpacing: "0.06em"
  caption:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  control: "6px"
  card: "8px"
  panel: "12px"
  pill: "9999px"
spacing:
  gutter-mobile: "16px"
  gutter: "32px"
  container: "76rem"
  cell: "12px 20px"
  card: "24px"
  section-mobile: "80px"
  section: "112px"
  header-mobile: "64px"
  header: "80px"
  demo-banner: "36px"
components:
  button-primary:
    backgroundColor: "{colors.bronze}"
    textColor: "{colors.surface}"
    typography: "{typography.nav}"
    rounded: "{rounded.control}"
    padding: "0 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.bronze-dark}"
  button-primary-disabled:
    backgroundColor: "#c9b79f"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.night}"
    rounded: "{rounded.control}"
    padding: "0 24px"
    height: "48px"
  button-outline-hover:
    backgroundColor: "{colors.night}"
    textColor: "{colors.surface}"
  field-input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "0 12px"
    height: "44px"
  booking-bar:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.panel}"
  booking-cell:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.night}"
    typography: "{typography.value}"
    padding: "{spacing.cell}"
  booking-cell-hover:
    backgroundColor: "{colors.sand}"
  room-card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.card}"
    padding: "{spacing.card}"
  badge-last-rooms:
    backgroundColor: "{colors.sand-2}"
    textColor: "{colors.bronze-dark}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
  request-dialog:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    width: "min(36rem, calc(100vw - 2rem))"
  demo-banner:
    backgroundColor: "{colors.night}"
    textColor: "{colors.surface}"
    height: "{spacing.demo-banner}"
  header-solid:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.night}"
    height: "{spacing.header}"
---

# Design System: tehospeda · Hotel Website

Scope: the public, per-hotel website in `apps/site` (served at `<slug>.tehospeda.com`). This is a separate visual world from the back-office dashboard documented in the repository-root `DESIGN.md`; nothing here applies there, and vice versa.

## Overview

**Creative North Star: "The Chain-Standard Front Desk"**

The hotel website the traveller already knows how to use, finished to the level of a Marriott, Hyatt or Hilton page: a large bleed photograph, a date search in plain view, and room cards that show the real cost of the stay. It does not try to be original. It tries to have no careless detail. The product commitment behind it is explicit: the category standard, executed without irony.

The palette is hospitality-neutral: white and warm sand grounds, a deep night blue for text, header and the location band, and one bronze reserved for the primary action and small accents. A high-contrast display serif carries the hotel's name and the section titles; a clean geometric sans carries everything that has to be read, compared or tapped, including room names and prices. Density is generous and calm (80 to 112px between sections), one column of intent per section.

It is a **multi-tenant template**. Every hotel gets the same system; what changes is content pulled from that hotel's ERP record. The system never varies per hotel (no per-hotel colours, fonts or layouts); a hotel is expressed only through its photographs, name, words and data.

**Key Characteristics:**
- One bronze action colour; everything else is night, ink, muted, sand and white.
- Display serif only at display sizes (the hero name, section titles, the hotel wordmark); sans for all reading and data.
- Bleed photography with night gradients for legibility, always credited when the photo is not the hotel's own.
- A white booking bar overlapping the bottom edge of the hero photo, built from hairline-divided cells over invisible native controls.
- Prices are honest: the stay total with tax is the headline figure, the breakdown sits under it.
- Honesty is a visual rule: demo sites say so in a fixed banner; borrowed photos carry visible credit.

### Per-hotel content vs. fixed system

| Per hotel (from the ERP `Site` record) | Fixed by the system |
|---|---|
| Hotel name, tagline, description | Colours, type faces, type ramp, radii, shadows |
| Photos (hero = 1st, "El hotel" figure = 2nd, location band = 3rd) with `alt`, `credit`, `license`, `sourceUrl` | Section order: hero + booking bar, Habitaciones, El hotel, Alrededor de {city}, Contacto, footer |
| Rooms: name, beds, capacity, description, base rate, photo | Room card layout, price presentation, CTA logic |
| Currency, tax rate, check-in/out times, business date (minimum arrival) | Booking bar cells and limits (1–6 adults, 0–4 children) |
| Amenity keys (mapped to fixed Spanish labels and one check icon) | Amenity list style |
| Nearby places (name + detail) | Divided-list style, night band treatment |
| Address, city/region/country, phone, WhatsApp, email | Contact list rows and icons |
| `demo` flag | Demo banner, `noindex` |

Sections with no content disappear rather than render empty (no nearby places → no location band; no second photo → no figure; no credit → no caption).

## Colors

A warm-neutral hospitality palette: night blue and ink for authority, sand and white for air, bronze as the single voice of action.

### Primary
- **Lobby Bronze** (`bronze`): the primary action colour. Fills every "Reservar", "Ver disponibilidad", "Solicitar" and "Enviar solicitud" button; colours contact-row icons, the amenity check, the text caret and the focus outline. Never used for large fills or body text.
- **Deep Bronze** (`bronze-dark`): hover state of the primary button; text of the "Últimas habitaciones" badge.
- **Pale Bronze** (`bronze-light`): text-selection highlight only.

### Neutral
- **Night Blue** (`night`): headings, prices and values, the solid header's text, the outline button, the demo banner, the location band ground, the hero placeholder behind photos, and every photo gradient (`night` at 55% / 15% / 85% top-to-bottom on the hero; 95% / 75% / 10% left-to-right on the location band). Also the browser `theme-color`.
- **Night Blue Raised** (`night-2`): declared as the one step up from night; reserved, not yet used by the page.
- **Ink** (`ink`): base body text on light grounds (often at 85% for long paragraphs).
- **Slate Muted** (`muted`): secondary copy, labels, breakdown lines, helper text.
- **Sand Hairline** (`line`): every 1px divider and border on light grounds: booking-bar cell rules, card footers, divided lists, dialog sections, input borders, the header's bottom rule.
- **Sand** (`sand`): the Habitaciones and footer section grounds; hover/focus fill of a booking cell.
- **Deep Sand** (`sand-2`): room-photo placeholder, amenity icon disc, badge ground.
- **Surface White** (`surface`): page ground, cards, booking bar, dialog, solid header.

### Status
- **Confirmation Green** (`ok`): the check icon in the "Solicitud enviada" state. Nowhere else.
- **Brick Red** (`danger`): validation messages, invalid input border, "Sin disponibilidad" line, booking-bar error.

### Named Rules
**The One Bronze Rule.** Bronze means "this moves you toward a booking". If it is not the primary action, a focus ring, or a small accent icon, it is not bronze.

**The Night Gradient Rule.** Text never sits on a raw photograph. Every photo that carries text gets a `night` gradient weighted toward the text's edge.

## Typography

**Display Font:** Libre Caslon Display (with Iowan Old Style, Georgia, serif), weight 400 only.
**Body Font:** Figtree (with ui-sans-serif, system-ui, sans-serif), weights 400, 500, 600.

Both are self-hosted through `@fontsource` (imported in the root layout); no font CDN.

**Character:** A thin, high-contrast Caslon gives the hotel's name the gravity of a sign over the door; Figtree is friendly, legible and neutral enough to carry prices, forms and room details without competing.

### Hierarchy
- **Display** (Caslon 400, `clamp(2.75rem, 8vw, 6rem)`, line-height 0.95, -0.01em): the hotel name in the hero. One per page.
- **Headline** (Caslon 400, 2.25rem below 640px, 3rem from 640px, line-height 1): section titles ("Habitaciones", "El hotel", "Alrededor de {city}", "Contacto"), and the single title on the 404 and root pages.
- **Wordmark** (Caslon 400, 1.5rem on mobile, 1.75rem from 640px, line-height 1): the hotel name in the header.
- **Figure** (Figtree 600, 1.5rem): prices, stay totals and check-in/out times; the numbers a guest compares.
- **Title** (Figtree 600, 1.25rem): room names and the dialog title. Room names are sans on purpose: they are data the guest scans across cards.
- **Value** (Figtree 600, 1.125rem): the formatted value inside each booking-bar cell (date, guest count).
- **Body large** (Figtree 400, 1.125rem): section intros, hero tagline (1.25rem from 640px), nearby place names (500).
- **Body** (Figtree 400, 1rem, line-height 1.6): default; long paragraphs capped at 60ch.
- **Nav** (Figtree 500, 0.9375rem): header links; buttons use the same size at 600 with 0.01em tracking.
- **Small** (Figtree 400, 0.875rem): room meta (beds, capacity), price breakdowns, errors.
- **Label** (Figtree 600, 0.75rem, 0.06em, uppercase, `muted`): form field labels, booking-bar cell labels, check-in/out terms, contact-row labels. Always labels a value or control directly below or beside it.
- **Caption** (Figtree 400, 0.6875rem, white at 75%): photo credit over the hero.

### Named Rules
**The Display-Size Rule.** Libre Caslon Display appears only at display sizes: the hero name and section titles at 32px and above, plus the header wordmark (24–28px) as the hotel's name lockup. Everything a guest reads, compares or taps is Figtree, including room names.

**The Price-in-Sans Rule.** Money is always Figtree 600 in `night`, formatted by the system (`es-VE` locale, the hotel's currency); totals show two decimals.

## Layout

- **Container:** max 76rem, centred, side gutter 16px on mobile and 32px from 640px.
- **Section rhythm:** 80px vertical padding on mobile, 112px from 640px. Sections alternate grounds: hero photo → sand (Habitaciones) → white (El hotel) → night photo band (Alrededores) → white (Contacto) → sand footer with a hairline top border.
- **Section heads:** title plus an optional one-line intro, held to max 42rem, 40px above the content.
- **Grids:** rooms 1 column → 2 from 768px → 3 from 1024px, 24px gaps. "El hotel" and the location band split into two columns from 1024px; contact splits 1 : 1.2 with the title on the left.
- **Breakpoints:** Tailwind defaults in use: 640px (`sm`), 768px (`md`), 1024px (`lg`).

### Hero and first viewport
- Hero height is **58svh (min 420px) on mobile** and 86svh (min 560px) from 768px. The mobile height is deliberately short so that the booking bar and its "Ver disponibilidad" action land inside the first viewport.
- The hotel name and tagline sit bottom-left over the photo. From 768px the copy is lifted 128px off the bottom to clear the bar.
- **Booking bar overlap:** from 768px the bar pulls up 80px over the photo's bottom edge. On mobile it does not overlap; it sits 12px below the photo, full width.
- The location line (pin + city, region, country) is shown from 640px only.

### Header
- Fixed; 64px tall on mobile, 80px from 640px; shifts down 36px when the demo banner is present.
- Transparent with white text over the hero; becomes white with a 1px `line` bottom rule once the page scrolls past 40px or the mobile menu opens (200ms colour transition).
- From 1024px: wordmark left, four section links and a 44px "Reservar" button right.
- Below 1024px: wordmark left; a compact 40px **"Reservar" button stays visible** next to the menu toggle, so booking is one tap from anywhere. The menu opens as a stacked list of 18px links divided by hairlines, ending with a full-width "Reservar".
- In-page anchors scroll smoothly with an 80px scroll-padding (smooth scroll is turned off under reduced motion).

### Named Rules
**The First-Viewport Search Rule.** On every screen size, the date search and its action are visible without scrolling. Any change to hero height, header height or banner height is checked against this.

## Elevation & Depth

Mostly flat, lifted in exactly two places. Depth on the page comes from photography and the night gradients; shadows are reserved for the objects a guest acts on.

### Shadow Vocabulary
- **Card** (`box-shadow: 0 1px 2px rgb(30 42 58 / 0.06), 0 8px 24px rgb(30 42 58 / 0.08)`): room cards and the "El hotel" photo figure. Soft, night-tinted.
- **Bar** (`box-shadow: 0 2px 4px rgb(30 42 58 / 0.08), 0 18px 40px rgb(30 42 58 / 0.18)`): the booking bar and the request dialog: the floating, task-carrying surfaces.
- **Header rule** (`box-shadow: 0 1px 0 #e4ded3`): the solid header's hairline; a border, not elevation.
- The dialog backdrop is `night` at 60%.

### Named Rules
**The Two Lifts Rule.** Only cards (Card shadow) and task surfaces (Bar shadow) float. Lists, sections and buttons stay flat.

## Shapes

Gently rounded, never pill-shaped except for the one badge and the amenity discs.

- **Controls** (6px): buttons and form inputs.
- **Cards** (8px): room cards, the photo figure.
- **Panels** (12px): the booking bar and the request dialog, the two largest interactive surfaces.
- **Full round:** the "Últimas habitaciones" badge and the 36px amenity icon discs.
- **Hairlines:** 1px `line` rules divide rather than box: booking cells, card price footers, list rows, dialog header and total. On the night band the same rule is white at 15%.
- Photos are cropped with `object-cover` to 4:3 in cards and the figure; bleed photos fill their section.

## Components

### Buttons
Confident, compact, always labelled with a verb.
- **Shape:** gently rounded (6px), 48px tall, 24px side padding, Figtree 600 at 15px with 0.01em tracking; icon + label gap 8px.
- **Primary:** `bronze` fill, white text; hover `bronze-dark`; disabled a pale bronze (#c9b79f) with a not-allowed cursor. While working, a spinning loader icon replaces or precedes the label.
- **Outline:** 1px `night` border, `night` text; hover fills `night` with white text. Used for secondary moves ("Elegir fechas", "Volver a la web").
- **On night ground:** the outline variant in white at 70% opacity, hover white fill with `night` text ("Ver en el mapa").
- **Sizes in use:** 48px default; 44px in the desktop header; 40px with 16px padding and 14px text in the mobile header.
- **Transitions:** background, text and border colour at 160ms ease. No transforms.
- **Focus:** global 2px `bronze` outline, 3px offset, on every focusable element.

### Booking bar (signature component)
The chain-standard date search, overlapping the hero.
- White panel, 12px corners, Bar shadow, clipped so cell fills reach the rounded edge.
- **Cells:** Llegada, Salida, Adultos, Niños, each 12px × 20px padding with an uppercase label (with a 14px icon for dates and adults) above a 18px `night` value. The Salida label carries the live night count ("Salida · 3 noches").
- **Hairline-divided:** cells are separated by 1px `line` rules, not boxed. Desktop is one row `1fr 1fr 1fr auto` (the two guest cells share the third column); mobile is a 2-column grid: dates side by side, guests side by side, action full width.
- **Invisible native controls:** each cell wraps the real `<input type="date">` or `<select>`, stretched over the cell at zero opacity. The visible value is the formatted text (`shortDate`, e.g. "vie 28 nov"), while keyboard use, screen readers and the phone's native date picker keep working. Selects show a muted chevron.
- **States:** hover and focus-within fill the cell with `sand`. Arrival is clamped to the hotel's business date; departure to arrival + 1 day.
- **Action:** "Ver disponibilidad", primary, at least 208px wide on desktop, inset 12px from the bar edges, search icon swapping to a spinner while loading.
- **Error:** a `danger` line in 14px below a hairline, announced as an alert.

### Room cards
Same grid in every card so guests compare across them.
- White, 8px corners, Card shadow, 24px padding; optional 4:3 photo on a `sand-2` placeholder.
- Order: optional "Últimas habitaciones" badge (pill, `sand-2` ground, `bronze-dark` 12px 600 text) → room name (Title, sans) → beds and capacity with icons (Small, `muted`) → description (15px, ink 85%) → price footer pinned to the card bottom above a hairline.
- **Before a search:** "Desde, por noche" over the nightly base rate as the Figure, with "+ IVA n %" in muted 16px; outline "Elegir fechas" button that jumps to the bar.
- **After a search, available:** the **stay total with tax** is the Figure (two decimals); under it, in Small `muted`: nights, "impuestos incluidos", and the breakdown (net + IVA %). Primary "Solicitar" button.
- **After a search, not possible:** "Sin disponibilidad en esas fechas" in `danger`, or "No admite n huéspedes" in `muted`; no button.
- A summary line above the grid restates the searched dates and guests, politely announced, and says plainly when nothing is left. The grid dims to 60% while a search runs.

### Request dialog
A native modal `<dialog>` opened from "Solicitar" with the search already applied.
- White, 12px corners, Bar shadow, width `min(36rem, 100vw − 2rem)`, max height `100dvh − 2rem`, `night` 60% backdrop. Close on Esc or the top-right X.
- **Header:** room name (Title) and the stay line (dates · nights · guests) in Small `muted`, above a hairline.
- **Form:** two columns from 640px: Nombre, Apellidos, Correo (full width), Teléfono and Hora estimada de llegada (optional), Comentarios. Labels are the uppercase Label style, inputs the field style. A hidden honeypot field is present but never visible.
- **Total row:** "Total con impuestos" with the breakdown in 12px under it, the total as the Figure on the right, above a hairline.
- **Validation state:** client checks name, surname and email; each error appears in 14px `danger` under its field, the input border turns `danger`, and the message is wired with `aria-describedby`. Server 422 errors map onto the same fields; other failures show one form-level alert in plain Spanish (never raw server text for 5xx).
- **Sending state:** the submit button disables and shows a spinner.
- **Sent state:** the title becomes "Solicitud enviada"; a 40px `ok` check, a sentence naming the email the hotel will reply to, a muted line saying nothing has been charged and the room is confirmed only when the hotel answers, and an outline "Volver a la web".
- A centred 12px muted note under the submit button states that nothing is charged now.

### Inputs / Fields
- **Style:** 44px tall, 1px `line` border, 6px corners, white, 12px side padding, 16px `ink` text (16px avoids mobile zoom), `bronze` caret.
- **Hover:** border warms to #cbbfae. **Focus:** border `bronze`, no outline ring. **Invalid:** border `danger`.
- Textareas use the same style at auto height.

### Navigation
See Layout → Header. Desktop links are Nav type with an underline on hover (8px offset); the solid state swaps white text for `night`.

### Divided lists (nearby places, contact)
Rows divided by hairlines with a hairline above the first and below the last; no boxes, no cards.
- **Nearby (on the night band):** white-15% rules; each 20px-padded row puts the place name (18px, 500) left and its detail (white 75%) right, wrapping on narrow screens.
- **Contact (on white):** `line` rules; each row is a full-width link: `bronze` 20px icon, a 96px-wide uppercase label (Teléfono, WhatsApp, Correo, Dirección), then the value in `night` 500, underlined on hover. Only channels the hotel has filled in are shown.

### Amenities and house times
- Amenity list: 2 columns from 640px; each item a 36px `sand-2` disc with a `bronze` check, then the label in `ink`. Labels come from a fixed map of amenity keys.
- Check-in/out: a hairline-topped pair with uppercase clock labels ("Entrada", "Salida") over the time as the Figure ("desde 14:00").

### Demo banner (honesty rule)
- When the hotel's site is flagged `demo`, a 36px `night` strip is fixed at the very top with centred 13px white-90% text: "Sitio de demostración: habitaciones, precios y fotos son de ejemplo." (shortened to "Demostración: datos y fotos de ejemplo" below 640px). The header moves down beneath it, and the page is marked `noindex`.

### Photo credits (honesty rule)
- When a photo is not the hotel's own, it carries its credit. Over the hero: a Caption line, right-aligned, giving the photo's description, "Foto: author" and licence; pinned near the bottom edge on mobile and lifted above the booking bar from 768px. In the footer: a "Fotos:" sentence crediting every credited photo, linked to its source when known.

### Footer
Sand ground with a hairline top; hotel name in Caslon and the place on the left, photo credits and "Reservas gestionadas con tehospeda." on the right (stacked on mobile).

## Do's and Don'ts

### Do:
- **Do** keep bronze for the primary action, the focus ring and small accent icons only (The One Bronze Rule).
- **Do** lay a `night` gradient under every photograph that carries text.
- **Do** show the stay total with tax as the main price once dates are known, with the net amount and IVA rate underneath.
- **Do** keep the booking bar's visible values as formatted text over the real native controls, so keyboard, screen readers and mobile pickers keep working.
- **Do** keep the search action inside the first viewport on mobile (hero 58svh, min 420px) and keep the compact "Reservar" in the mobile header.
- **Do** show the demo banner and `noindex` whenever a site is a demonstration, and credit every borrowed photo both on the hero and in the footer.
- **Do** hide a section, figure or caption when the hotel has no content for it instead of showing a placeholder.
- **Do** use Figtree for room names, prices, labels and forms; reserve Caslon for the hotel name and section titles.

### Don't:
- **Don't** vary colours, fonts or layout per hotel; a hotel is expressed only through its photos, words and data.
- **Don't** set Libre Caslon Display below the wordmark's 24px or use it for room names, prices or body copy.
- **Don't** add testimonials, ratings, scarcity counters or prices the ERP did not provide; "Últimas habitaciones" appears only when the availability data says so.
- **Don't** box the nearby and contact lists in cards; they are hairline-divided rows.
- **Don't** add shadows beyond the Card and Bar shadows, or lift buttons and lists.
- **Don't** put text directly on an ungraded photograph.
