# Shopify checkout setup

Your site cart is wired to **Shopify’s hosted checkout**. Customers add items on your site; when they click **Proceed to checkout**, they are sent to Shopify to pay. No payment or login credentials are stored in this repo.

## What you need (no passwords in code)

1. **Shopify store**  
   Log in at [shopify.com](https://www.shopify.com) with your Shopify account. Your store URL will look like:  
   `https://your-store-name.myshopify.com`

2. **Storefront API access token**  
   This is a **token** from Shopify Admin, not your account password. It’s safe to use in front-end code for the Storefront API only.

3. **Product variant IDs**  
   Each product on your site (Zine, T‑shirts, Onesies) must match a product in Shopify. You’ll copy each variant’s ID into the config.

---

## Step 1: Create products in Shopify

### 1a. Open your store and go to Products

1. Go to [shopify.com](https://www.shopify.com) and log in.
2. Open your store (e.g. **Girls Gone Digital**).
3. In the left sidebar click **Products**.

### 1b. Add each product

Click **Add product** and create one product for each item you sell. You can match your site like this:

| Your site item | Suggested title in Shopify | Price |
|----------------|----------------------------|-------|
| Zine (Issue 1 Mar 2025) | GIRLS GONE DIGITAL (ZINE) (Issue 1 Mar 2025) | $25 |
| GGD T-SHIRT (BLK) | GGD T-SHIRT (BLK) | $35 |
| GGD T-SHIRT (WHT) | GGD T-SHIRT (WHT) | $35 |
| Short sleeve onesie Black | GGD SHORT SLEEVE ONESIE (BLK) | $35 |
| Short sleeve onesie White | GGD SHORT SLEEVE ONESIE (WHT) | $35 |
| Long sleeve onesie Black | GGD LONG SLEEVE ONESIE (BLK) | $45 |
| Long sleeve onesie White | GGD LONG SLEEVE ONESIE (WHT) | $45 |

- Fill in **Title** and **Price** (and optional description/image).
- If the product has no size/color options, leave **Variants** as the default single variant.
- Click **Save**.

### 1c. Get the variant ID for each product

You need the **variant ID** (a long number) for each product. Use either method below.

**Method A – From the product page URL**

1. In **Products**, click a product to open it.
2. If it has one variant, the URL might look like:  
   `https://admin.shopify.com/store/your-store/products/123456789`
3. If it has multiple variants, click a variant; the URL will look like:  
   `https://admin.shopify.com/store/your-store/products/123456789/variants/36485954240671`  
   The number after **`/variants/`** (e.g. `36485954240671`) is the **variant ID**.

**Method B – From the product JSON (when the URL only shows /products/ID)**

If your URL looks like `.../products/7879720075333` (no `/variants/`), the number is the **product** ID. Checkout needs the **variant** ID. Get it like this:

1. Stay on the product page in Shopify Admin.
2. In the address bar, add **`.json`** to the end of the URL and press Enter.  
   Example: `.../products/7879720075333` → `.../products/7879720075333.json`
3. The page will show raw JSON. Find the **`"variants"`** array. The first variant has an **`"id"`** (a long number). That number is the **variant ID**.
4. In config use: `gid://shopify/ProductVariant/` + that number (e.g. `gid://shopify/ProductVariant/43728938479653`).

**Format for the config**

In `shopify-config.js` you use that ID in this form:  
`gid://shopify/ProductVariant/VARIANT_ID`  
Example: if the variant ID is `36485954240671`, use:  
`gid://shopify/ProductVariant/36485954240671`

Repeat for every product (Zine, each T-shirt, each onesie) and write down each variant ID; you’ll paste them into **Step 3**.

---

## Step 2: Get the Storefront API token

1. In Shopify Admin go to **Settings** → **Apps and sales channels** → **Develop apps** → **Create an app** (e.g. “Storefront for girlsgone.digital”).
2. Open the app → **Configure Storefront API scopes**.
3. Enable at least: **unauthenticated_read_product_listings**, **unauthenticated_write_checkouts**, **unauthenticated_read_checkouts** (or the scopes that allow creating a cart and reading `checkoutUrl`).
4. **Install app** and then open **API credentials**.
5. Under **Storefront API access token**, click **Reveal** and copy the token.  
   **Do not put your Shopify account password anywhere in the code.** Only this token is used.

---

## Step 3: Fill in the config

Edit **`assets/shopify-config.js`**:

1. **Store domain**  
   Set `window.SHOPIFY_STORE` to your store’s subdomain only.  
   Example: if your store is `girls-gone-digital.myshopify.com`, use:
   ```js
   window.SHOPIFY_STORE = 'girls-gone-digital';
   ```

2. **Storefront token**  
   Set `window.SHOPIFY_STOREFRONT_TOKEN` to the token you copied in Step 2:
   ```js
   window.SHOPIFY_STOREFRONT_TOKEN = 'your-storefront-api-token-here';
   ```

3. **Variant map**  
   For each product name that your site uses, set the matching Shopify variant GID in `window.SHOPIFY_VARIANT_MAP`:
   ```js
   window.SHOPIFY_VARIANT_MAP = {
     'GIRLS GONE DIGITAL (ZINE) (Issue 1 Mar 2025)': 'gid://shopify/ProductVariant/123456789012',
     'GGD T-SHIRT (BLK)': 'gid://shopify/ProductVariant/123456789013',
     'GGD T-SHIRT (WHT)': 'gid://shopify/ProductVariant/123456789014',
     // ... etc.
   };
   ```

To find a variant ID in Shopify Admin: **Products** → open the product → **Variants** section. The ID is in the variant URL or in the variant details (you can also use the GraphQL Admin API to list variants and their IDs).

---

## Step 4: Keep the token safe (optional but recommended)

- **Do not commit a real token to a public repo.**  
  You can:
  - Add `assets/shopify-config.js` to `.gitignore` and keep a local-only copy with the real token, or
  - Use a build step that injects `SHOPIFY_STORE` and `SHOPIFY_STOREFRONT_TOKEN` from environment variables (e.g. in Vercel) and keep `shopify-config.js` as a template.

---

## Testing

1. Add items to the cart on your site.
2. Open the cart page and click **Proceed to checkout**.
3. You should be redirected to Shopify’s checkout to complete payment.

If you see an error about “not configured”, check that `SHOPIFY_STORE` and `SHOPIFY_STOREFRONT_TOKEN` are set. If it says certain items are “not yet linked”, add the missing variant IDs to `SHOPIFY_VARIANT_MAP` in `assets/shopify-config.js`.
