---
name: ggd-new-product
description: Adds a new product to the Girls Gone Digital shop with product page, shop grid entry, and cart wiring. Use when adding a new product, new SKU, new item to the shop, or new product page in the GGD project.
---

# GGD New Product

Adding a new product requires three places to stay in sync: the product page, `assets/cart.js` (PRODUCT_URLS), and the shop grid in `pages/shop.html`. The **product name** must match exactly everywhere.

## 1. Product page (`pages/product-<slug>.html`)

- **Slug**: lowercase, hyphens (e.g. `product-onesie-long-blk.html`).
- **Title**: `[Display Name] – Girls Gone Digital` (e.g. `GGD Long Sleeve Onesie (Black) – Girls Gone Digital`).
- **Structure**: Same as existing product pages (e.g. `pages/product-onesie-long-blk.html`):
  - Shared header/footer (see ggd-new-page skill for header/footer and script paths).
  - `<section class="product-section">` with:
    - Product carousel (unique `id` e.g. `id="onesieCarousel"`), `.carousel-track`, `.carousel-slide` (first can have `carousel-slide-hero`), prev/next buttons, `.carousel-dots`.
    - `<h1 class="product-name">` with the **exact** product name (e.g. `GGD LONG SLEEVE ONESIE (BLK)`).
    - `<div class="product-price">$XX.00</div>`.
    - Size radios: `name="size"`, values XS, S, M, L, XL.
    - Add to cart button: `id="addBtn"` and **`data-name="EXACT PRODUCT NAME"`** and **`data-price="XX.00"`** (no dollar sign in data-price).
  - Inline script: read `data-name` and `data-price` from the button, get selected size, push `{ name, price, qty: 1, size }` to `localStorage` key `ggdCart`, then call `window.ggdCartRender()` if defined.
  - Carousel script: same pattern as existing (track, prev/next, dots, goTo index).
- **Images**: Use `../assets/` paths (e.g. `../assets/product-onesie-long-blk-hero.png`). Place assets in `assets/`.

## 2. Cart.js (`assets/cart.js`)

- In the `PRODUCT_URLS` object, add one entry:
  - **Key**: exact product name string (same as `data-name` on the product page and shop button). Example: `'GGD LONG SLEEVE ONESIE (BLK)'`.
  - **Value**: product page filename only, e.g. `'product-onesie-long-blk.html'`.
- Cart uses this to link cart line items to the product page. If the name does not match exactly, the link will fall back to shop.

## 3. Shop grid (`pages/shop.html`)

- Add a new `.merch-item` in the `.merch-grid` (copy an existing one).
- **Link**: `href="product-<slug>.html"` (e.g. `product-onesie-long-blk.html`) for the product image and name.
- **Display name**: same as product name (e.g. `GGD LONG SLEEVE ONESIE (BLK)`).
- **Price**: `$45.00` in the display; button: `data-name="GGD LONG SLEEVE ONESIE (BLK)"` and `data-price="45.00"`.
- **Images**: use `../assets/...`; can use multiple slides in `.merch-item-image-track` if needed.
- **Button**: `<button type="button" class="add-to-cart" data-name="EXACT NAME" data-price="XX.00">Add to Cart</button>` — `data-name` must match `PRODUCT_URLS` key and product page `data-name`.

## Name consistency

The same string must appear as:

- `PRODUCT_URLS['EXACT NAME']` in `cart.js`
- `data-name="EXACT NAME"` on the product page Add to Cart button
- `data-name="EXACT NAME"` on the shop grid Add to Cart button
- `<h1 class="product-name">EXACT NAME</h1>` on the product page (and in the `<title>` in a human form if desired)

## Checklist

- [ ] Product page created in `pages/product-<slug>.html` with correct header/footer/scripts
- [ ] Product name identical on product page (h1 and button data-name), shop button (data-name), and cart.js PRODUCT_URLS key
- [ ] PRODUCT_URLS entry added in `assets/cart.js` with value `product-<slug>.html`
- [ ] New merch item added in `pages/shop.html` with correct href, name, price, and data-name/data-price
- [ ] Product images added under `assets/` and referenced with `../assets/` from pages
