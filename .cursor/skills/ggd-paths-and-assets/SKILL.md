---
name: ggd-paths-and-assets
description: Resolves correct relative paths and asset locations for the Girls Gone Digital static site (root vs pages/, filenames with spaces). Use when fixing links, image paths, script sources, or when the user mentions wrong path, broken image, or links from pages folder.
---

# GGD Paths and Assets

The site has no build step. Paths are relative and depend on whether the current file is at **project root** or inside **`pages/`**.

## Root-level files

- **Path**: `girls gone digital.html`, `index.html` at project root.
- **To pages**: `pages/shop.html`, `pages/about.html`, `pages/events.html`, `pages/cart.html`, `pages/magazine.html`, `pages/terms-of-service.html`, `pages/product-*.html`.
- **To assets**: `assets/logo.png`, `assets/cart.js`, `assets/iteration.js`, `assets/mobile-nav.js`, `assets/mobile-nav.css`, `assets/iphone-mobile.css`, `assets/*.png`, etc.
- **Home link**: `girls gone digital.html` (same directory).

## Files inside `pages/`

- **Path**: e.g. `pages/about.html`, `pages/shop.html`, `pages/product-onesie-long-blk.html`.
- **To homepage**: `../girls gone digital.html`.
- **To other pages**: `shop.html`, `about.html`, `events.html`, `cart.html`, `magazine.html`, `terms-of-service.html`, `product-onesie-long-blk.html` (no `pages/` prefix).
- **To assets**: `../assets/logo.png`, `../assets/cart.js`, `../assets/iteration.js`, `../assets/mobile-nav.js`, `../assets/mobile-nav.css`, `../assets/iphone-mobile.css`, `../assets/*.png`, etc.
- **Fragment**: `magazine.html#digital-girl` for Digital Girl of the Month.

## Filenames with spaces

- **In HTML**: use the literal filename in href/src, e.g. `href="girls gone digital.html"`, `href="../girls gone digital.html"`. Browsers handle spaces in relative URLs.
- **In CLI/curl**: use URL-encoded path, e.g. `girls%20gone%20digital.html` (space → `%20`).

## Asset locations

- **Images**: `assets/` (e.g. `assets/logo.png`, `assets/product-onesie-long-blk-hero.png`, `assets/product-onesie-long-blk-model-1.png`).
- **Shop carousel**: `assets/shop-carousel/` (e.g. `shop-carousel-new-01.png`). Script in shop page may build URLs from a list; paths from `pages/shop.html` are `../assets/shop-carousel/...`.
- **JS/CSS**: `assets/cart.js`, `assets/iteration.js`, `assets/mobile-nav.js`, `assets/mobile-nav.css`, `assets/iphone-mobile.css`.

## Common mistakes

- Using `pages/shop.html` in an href when the current file is already in `pages/` → use `shop.html`.
- Using `assets/cart.js` from a file in `pages/` → use `../assets/cart.js`.
- Using `girls gone digital.html` from `pages/` → use `../girls gone digital.html`.
- Linking to `pages/about.html` from within `pages/` → use `about.html`.

## Checklist

- [ ] From root: links to pages use `pages/...`, assets use `assets/...`.
- [ ] From `pages/`: links to pages use no prefix; homepage and assets use `../`.
- [ ] Script and link hrefs in `pages/*.html` use `../assets/` for all JS/CSS/images.
