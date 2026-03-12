---
name: ggd-style-consistency
description: Enforces Girls Gone Digital design system for typography, colors, header, and footer so new or edited pages stay consistent. Use when matching the rest of the site, fixing styling, keeping header/footer consistent, or applying GGD design tokens.
---

# GGD Style and Layout Consistency

When adding or editing pages, use these tokens and patterns so the site stays visually consistent.

## CSS variables

- `--ice-header-h: 28px` — header height. Set in `:root` and use for `body` padding-top and header height.

## Colors

- **Background (content)**: `#f8e8f0` (homepage can use `#ffffff`).
- **Text primary**: `#111`.
- **Text secondary**: `#333`, `#666` for muted.
- **White**: `#fff` or `#ffffff` for header bar.
- **Borders**: `rgba(0,0,0,0.06)` or `rgba(0,0,0,0.1)`.

## Typography

- **Font**: `"Helvetica Neue", Helvetica, Arial, sans-serif`.
- **Body**: `font-weight: 500`, `color: #111`.
- **Nav / small UI**: `font-size: 11px`, `font-weight: 400`, `letter-spacing: 0.02em`.
- **Section headings**: `font-size: 14px`, `letter-spacing: 0.08em`–`0.1em`, `text-transform: uppercase` where appropriate.
- **Product name**: `font-size: 12px`, `font-weight: 700`, `letter-spacing: 0.02em`, `text-transform: uppercase`.

## Header

- **Container**: `.custom-header`, `position: fixed`, `top: 0`, `left: 0`, `right: 0`, `z-index: 100`, `height: var(--ice-header-h)`.
- **Bar**: white background, `border-bottom: 1px solid rgba(0,0,0,0.06)`, flex, `padding: 0 1.5rem`.
- **Logo**: centered (`position: absolute; left: 50%; transform: translateX(-50%)`), img height `24px`.
- **Nav links**: 11px, no underline, hover opacity 0.6; cart toggle shows `Cart <span id="cartCount">0</span>`.

## Footer

- **Container**: `.ice-footer`, `.ice-footer-inner` for flex/wrap.
- **Links**: `color: #111`, hover `opacity: 0.6`, include founder, email, Terms and Conditions where appropriate.
- **Copyright**: `© 2026 Girls Gone Digital`.
- **Iteration**: small (e.g. 10px), `color: #666`, “GitHub update Iteration #” + span `id="footerIteration"`.

## Buttons (primary)

- **Add to cart / CTA**: background `#111`, color `#fff`, 11px, letter-spacing, uppercase.
- **Secondary**: e.g. outline or text-only; match nav style (11px, letter-spacing).

## When editing

- Prefer reusing existing class names (e.g. `.custom-header`, `.ice-footer`, `.product-name`) rather than inventing new ones for the same purpose.
- Keep spacing consistent: section padding (e.g. `2rem 1rem 4rem`), gaps (e.g. `1.5rem` in nav).
- If a page already has the correct header/footer from another page, avoid changing colors or font in the main content unless the design intent is different.
