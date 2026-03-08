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

In **Shopify Admin** → **Products**:

- Create one product per item you sell (e.g. Zine, GGD T‑Shirt Black, GGD T‑Shirt White, Short Sleeve Onesie Black/White, Long Sleeve Onesie Black/White).
- Set titles and prices to match your site ($25 for Zine, $35 for T‑shirts/short onesies, $45 for long onesies, etc.).
- For each product, open it and go to the **Variants** section. Each variant has an ID (numeric). You’ll use it in the form:  
  `gid://shopify/ProductVariant/VARIANT_ID`

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
