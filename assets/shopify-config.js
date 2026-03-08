/**
 * Shopify Storefront API config for checkout.
 * Do NOT put your Shopify login password here.
 * Use the Storefront API access token from Shopify Admin (see SHOPIFY_SETUP.md).
 */
(function () {
  'use strict';

  // Your Shopify store domain (e.g. "girlsgonedigital-2" from girlsgonedigital-2.myshopify.com)
  window.SHOPIFY_STORE = window.SHOPIFY_STORE || 'girlsgonedigital-2';

  // Storefront API access token from Shopify Admin → Settings → Apps → Develop apps → Your app → API credentials
  window.SHOPIFY_STOREFRONT_TOKEN = window.SHOPIFY_STOREFRONT_TOKEN || 'ddf19093dcc8ad91fc96815ab04bf02f';

  /**
   * Map our site product names to Shopify Product Variant GIDs.
   * In Shopify Admin: Products → [product] → Variants → copy variant ID, then use: gid://shopify/ProductVariant/VARIANT_ID
   * For size-based products, you can map by "PRODUCT NAME - SIZE" (example: "GGD T-SHIRT (BLK) - M").
   */
  window.SHOPIFY_VARIANT_MAP = window.SHOPIFY_VARIANT_MAP || {
    'GIRLS GONE DIGITAL (ZINE) (Issue 1 Mar 2025)': 'gid://shopify/ProductVariant/44762668531781',
    'GIRLS GONE DIGITAL (Issue 1 Mar 2025)': 'gid://shopify/ProductVariant/44762668531781',
    'GGD T-SHIRT (BLK)': '',
    'GGD T-SHIRT (WHT)': '',
    'GGD CROP TOP (BLK)': 'gid://shopify/ProductVariant/44220620406853',
    'GGD CROP TOP (BLK) - XS': 'gid://shopify/ProductVariant/44220620406853',
    'GGD CROP TOP (BLK) - S': 'gid://shopify/ProductVariant/44220620439621',
    'GGD CROP TOP (BLK) - M': 'gid://shopify/ProductVariant/44220620472389',
    'GGD CROP TOP (BLK) - L': 'gid://shopify/ProductVariant/44220620505157',
    'GGD CROP TOP (BLK) - XL': 'gid://shopify/ProductVariant/44220620537925',
    'GGD CROP TOP (WHT)': 'gid://shopify/ProductVariant/44220724740165',
    'GGD CROP TOP (WHT) - XS': 'gid://shopify/ProductVariant/44220724740165',
    'GGD CROP TOP (WHT) - S': 'gid://shopify/ProductVariant/44220724772933',
    'GGD CROP TOP (WHT) - M': 'gid://shopify/ProductVariant/44220724805701',
    'GGD CROP TOP (WHT) - L': 'gid://shopify/ProductVariant/44220724838469',
    'GGD CROP TOP (WHT) - XL': 'gid://shopify/ProductVariant/44220724871237',
    'GGD SHORT SLEEVE ONESIE (BLK)': 'gid://shopify/ProductVariant/44221110255685',
    'GGD SHORT SLEEVE ONESIE (BLK) - XS': 'gid://shopify/ProductVariant/44221110255685',
    'GGD SHORT SLEEVE ONESIE (BLK) - S': 'gid://shopify/ProductVariant/44221110288453',
    'GGD SHORT SLEEVE ONESIE (BLK) - M': 'gid://shopify/ProductVariant/44221110321221',
    'GGD SHORT SLEEVE ONESIE (BLK) - L': 'gid://shopify/ProductVariant/44221110353989',
    'GGD SHORT SLEEVE ONESIE (WHT)': 'gid://shopify/ProductVariant/44220996419653',
    'GGD SHORT SLEEVE ONESIE (WHT) - XS': 'gid://shopify/ProductVariant/44220996419653',
    'GGD SHORT SLEEVE ONESIE (WHT) - S': 'gid://shopify/ProductVariant/44220996452421',
    'GGD SHORT SLEEVE ONESIE (WHT) - M': 'gid://shopify/ProductVariant/44220996485189',
    'GGD SHORT SLEEVE ONESIE (WHT) - L': 'gid://shopify/ProductVariant/44220996517957',
    'GGD LONG SLEEVE ONESIE (BLK)': 'gid://shopify/ProductVariant/44220901359685',
    'GGD LONG SLEEVE ONESIE (BLK) - XS': 'gid://shopify/ProductVariant/44220901359685',
    'GGD LONG SLEEVE ONESIE (BLK) - S': 'gid://shopify/ProductVariant/44220901392453',
    'GGD LONG SLEEVE ONESIE (BLK) - M': 'gid://shopify/ProductVariant/44220901425221',
    'GGD LONG SLEEVE ONESIE (BLK) - L': 'gid://shopify/ProductVariant/44220901457989',
    'GGD LONG SLEEVE ONESIE (WHT)': 'gid://shopify/ProductVariant/44220811313221',
    'GGD LONG SLEEVE ONESIE (WHT) - XS': 'gid://shopify/ProductVariant/44220811313221',
    'GGD LONG SLEEVE ONESIE (WHT) - S': 'gid://shopify/ProductVariant/44220811345989',
    'GGD LONG SLEEVE ONESIE (WHT) - M': 'gid://shopify/ProductVariant/44220811378757',
    'GGD LONG SLEEVE ONESIE (WHT) - L': 'gid://shopify/ProductVariant/44220811411525'
  };
})();
