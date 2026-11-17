# Design language

**Status:** Inventory of current UI plus proposed consistency rules.

## Current visual foundation

- The application loads Geist Sans and Geist Mono in the root layout.
- Global styles expose semantic background, foreground, card, border, input,
  primary, secondary, muted, destructive, chart, and radius tokens.
- The homepage currently defines a local warm palette in its CSS module:
  paper `#fbfaf7`, ink `#202a27`, muted `#75807a`, accent `#ee7655`, and line
  `#e9e7e0`.
- Some preview feature UI, including the admin dashboard, uses local inline
  colors and spacing rather than the shared semantic tokens.

These are observations, not a final approved brand specification. The
homepage palette and global theme are not yet a single unified token system.

## Proposed design principles

1. **Clear first:** Use readable hierarchy and explicit labels for event time,
   venue, price, availability, and booking status.
2. **Trustworthy:** Use consistent status language and avoid color as the only
   status cue.
3. **Inclusive:** Build keyboard access, visible focus, semantic HTML, and
   contrast into components from the start.
4. **Responsive:** Support narrow mobile layouts, zoom, and long localized
   content without hiding key actions.
5. **Consistent:** Prefer shared semantic tokens and reusable primitives over
   duplicated one-off styles.

## Token guidance

Before expanding the system, consolidate tokens in the global theme or a
dedicated shared theme file. Prefer semantic names such as:

- `background`, `foreground`, `surface`, `muted`, `border`, `accent`,
  `success`, `warning`, `danger`, and `focus`.
- A documented spacing scale, typography scale, radius scale, and elevation
  scale.
- Component states for default, hover, focus-visible, active, disabled,
  loading, and error.

The actual brand colors and numeric scale require design approval. Do not
silently promote isolated preview colors into brand tokens.

## Component guidance

- Use shared UI primitives for common buttons, fields, dialogs, badges, and
  feedback patterns.
- Keep feature-specific composition near its feature; promote a component to
  `src/shared` only when it has multiple real consumers.
- Prefer CSS Modules or existing project styling conventions for complex
  layouts. Avoid growing long inline style objects for page-level designs.
- Every interactive control needs an accessible name, a keyboard-operable
  interaction, and a visible focus treatment.
- Use headings in a logical order, associate labels and errors with fields,
  announce asynchronous feedback, and provide non-color status text.
- Respect reduced-motion preferences and avoid motion that blocks task
  completion.

## Responsive and accessibility checks

Review key flows at mobile, tablet, and desktop widths; at 200% zoom; with
keyboard-only navigation; and with a screen reader on representative controls.
Adopt a formal WCAG conformance target and supported browser/device matrix
before launch (**decision needed**).
