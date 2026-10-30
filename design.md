# Design: Nalluri Associates

The locked system. Every Hallmark run reads this first and pages share it. Change it on purpose; the file is the rule.

## System
- Genre: editorial
- Shape of the first page: Marquee Hero (branch homes), with a Ledge hero
- Theme: Ink (paper colourway), the accent swapped for the brand red
- Axes: light/grotesk-sans/chromatic-red · posture: restrained
- Brand: the logo (`public/images/brand/`) is never redrawn or recoloured. Its red is the one accent; its yellow stays inside the logo.

## Tokens
`src/styles/tokens.css` is the source of truth. The roles:
```css
:root {
  --color-paper: oklch(99.5% 0.003 100);  --color-paper-2: oklch(97% 0.004 100);  --color-paper-3: oklch(94% 0.006 100);
  --color-ink: oklch(16% 0 0);  --color-ink-2: oklch(28% 0 0);  --color-muted: oklch(44% 0 0);  --color-rule: oklch(89% 0.004 100);
  --color-accent: oklch(56.2% 0.219 26.9);  --color-accent-ink: oklch(99.5% 0.003 100);  --color-focus: oklch(54% 0.21 27);
  --color-accent-soft: oklch(95.5% 0.022 27);  --color-accent-soft-ink: oklch(38% 0.13 27);
  --font-display: "Epilogue", ui-sans-serif, system-ui, sans-serif;  --font-body: var(--font-display);
  --radius-card: 12px;  --radius-pill: 999px;  --radius-control: 10px;  --rule-hair: 1px;  --shadow-card: only under a floating menu or dialog;
}
```
Spacing, type scale, easings and durations are the scaffold's and live in `tokens.css`. Never a literal colour, font-family or spacing length past the token block.

## Type
- Epilogue only: 700 for heads and big figures (tracking -0.04em, sentence case), 600 for links, names in rows and buttons, 400 for reading. Three weights, no more.
- Labels, captions, table heads, meta: Epilogue 400 a step smaller, sentence case, untracked. Never tracked capitals, never an eyebrow over a heading.

## Surfaces
- Lists and tables open on a 1px ink rule and continue on `--color-rule` hairlines (`.ruled`).
- Photographs: the client's own, 12px radius, hairline, colour turned down slightly (`.photo`). Type never sits on a photograph; a caption sits under it and states a fact.
- Wells: `--color-paper-2` with a hairline (`.well`). Bands: `.band` (paper-2) or `.band--ink`; two a page at most.
- No card inside a card, no resting shadow, no gradient, no emoji or icon tiles.

## Controls
- Primary: ink fill, paper text, 10px radius, 48px tall (`.btn.btn--primary`). One per page.
- Secondary: transparent with a `--color-muted` hairline, same radius and height (`.btn`), or a typographic link (`.link`).
- Red means "here" or "this one": the current nav item, a link's hover underline, the focus ring, one figure a screen. Never a red field, never red running text.

## Motion
- Still. State changes only (hover colour, underline), `transform`/`opacity`/colour only, never `transition: all`. No reveal, no marquee, no counters. Reduced motion is handled in `base.css`.

## Chrome
- Nav: the floating pill (`src/layout.mjs`): logo to the root chooser, branch switch, section links, Call. Under 66rem it folds into a `<details>` menu.
- Footer: colophon (addresses, phone, email) over index columns (Services, Company, Branches, Follow).

## Pages
- Every page module in `src/pages/<name>.mjs` returns `{ title, description, body, scripts? }`; the layout wraps it. Inner pages open with `pageHead()` (Banner) from `src/lib/blocks.mjs`, then their own sections.
- Shared blocks: `pageHead`, `crumbs`, `offices`, `lenderLogos` (`src/lib/blocks.mjs`); helpers `html`, `raw`, `rel`, `img` (`src/lib/html.mjs`). Always `img()` (it writes width and height) and `rel()` (links stay relative).
- Page CSS lives only in `src/styles/pages/<name>.css`. Shared rules go in `components.css`.
- Facts come only from the crawl of the live site; nothing is invented (no figures, quotes, logos or dates the site does not state).

## Exports
`src/styles/tokens.css` in this project.
