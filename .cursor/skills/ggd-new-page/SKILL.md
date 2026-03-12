---
name: ggd-new-page
description: Adds new content pages to the Girls Gone Digital static site with correct header, footer, nav, and script paths. Use when creating a new page, adding FAQ/contact/content page, or when the user asks for a new page in the GGD project.
---

# GGD New Page

Use when adding any new HTML page to the Girls Gone Digital site (e.g. FAQ, contact, editorial). Ensures layout and links match the rest of the site.

## Page location

- **Content pages** (about, events, FAQ, etc.): create in `pages/` (e.g. `pages/faq.html`).
- **Homepage**: `girls gone digital.html` at project root (do not duplicate).

## Required structure

1. **Doctype and head**
   - `<meta charset="UTF-8">`, `<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">`.
   - `<title>[Page Title] – Girls Gone Digital</title>`.

2. **Root and body**
   - In `<style>`: `:root { --ice-header-h: 28px; }`, `* { box-sizing: border-box; margin: 0; padding: 0; }`.
   - `body`: `font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; font-weight: 500; background: #f8e8f0; color: #111; padding-top: var(--ice-header-h);`.

3. **Header** (copy from `pages/about.html` or another page in `pages/`)
   - Class `custom-header`, fixed, height `var(--ice-header-h)`, white background, border-bottom.
   - Left nav: Magazine, (optional) Digital Girl of the Month link to `magazine.html#digital-girl`.
   - Center: logo link. **From pages/**: `<a class="custom-header-logo" href="../girls gone digital.html">`, `<img src="../assets/logo.png" alt="Girls Gone Digital">`.
   - Right nav: Shop now → `shop.html`, Home → `../girls gone digital.html`, About → `about.html`, Events → `events.html`, Cart button with `<span id="cartCount">0</span>`.
   - Cart: `<button class="custom-header-cart-toggle" type="button">Cart <span id="cartCount">0</span></button>` (no `id` on button except when needed for product pages).

4. **Main**
   - One or more `<section>` elements with page-specific content and classes.

5. **Footer** (copy from existing pages)
   - Class `ice-footer`, inner wrapper `ice-footer-inner`.
   - Links: founder @brandonalmengo, mailto, optional Terms → `terms-of-service.html`.
   - `© 2026 Girls Gone Digital`.
   - Iteration: `<div class="ice-footer-iteration">GitHub update Iteration #<span id="footerIteration">0010</span></div>`.

6. **Scripts** (order matters; paths are for files in `pages/`)
   - `<script src="../assets/iteration.js"></script>`
   - Footer iteration display script (see `pages/about.html`).
   - Page-specific inline scripts if any.
   - `<script src="../assets/mobile-nav.js"></script>`
   - `<script src="../assets/cart.js"></script>`

7. **Stylesheets**
   - `<link rel="stylesheet" href="../assets/mobile-nav.css">`
   - `<link rel="stylesheet" href="../assets/iphone-mobile.css">`

## Links from within `pages/`

- Home: `../girls gone digital.html`
- Shop: `shop.html`
- About: `about.html`
- Events: `events.html`
- Magazine: `magazine.html` (Digital Girl: `magazine.html#digital-girl`)
- Terms: `terms-of-service.html`
- Assets: `../assets/...`

Do **not** use `pages/` in hrefs when the current file is already in `pages/`.

## Checklist

- [ ] Title ends with ` – Girls Gone Digital`
- [ ] `--ice-header-h` and body padding-top set
- [ ] Header nav and logo links use correct relative paths for `pages/`
- [ ] Footer includes iteration span and script
- [ ] `iteration.js`, `mobile-nav.js`, and `cart.js` loaded in that order; paths use `../assets/` for pages in `pages/`
