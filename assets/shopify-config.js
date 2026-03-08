/**
 * Shopify Storefront API config for checkout.
 * Do NOT put your Shopify login password here.
 * Use the Storefront API access token from Shopify Admin (see SHOPIFY_SETUP.md).
 */
(function () {
  'use strict';

  // Your Shopify store domain (e.g. "girls-gone-digital" from girls-gone-digital.myshopify.com)
  window.SHOPIFY_STORE = window.SHOPIFY_STORE || '';

  // Storefront API access token from Shopify Admin → Settings → Apps → Develop apps → Your app → API credentials
  window.SHOPIFY_STOREFRONT_TOKEN = window.SHOPIFY_STOREFRONT_TOKEN || '';

  /**
   * Map our site product names to Shopify Product Variant GIDs.
   * In Shopify Admin: Products → [product] → Variants → copy variant ID, then use: gid://shopify/ProductVariant/VARIANT_ID
   */
  window.SHOPIFY_VARIANT_MAP = window.SHOPIFY_VARIANT_MAP || {
    'GIRLS GONE DIGITAL (ZINE) (Issue 1 Mar 2025)': '',
    'GIRLS GONE DIGITAL (Issue 1 Mar 2025)': '',
    'GGD T-SHIRT (BLK)': '',
    'GGD T-SHIRT (WHT)': '',
    'GGD SHORT SLEEVE ONESIE (BLK)': '',
    'GGD SHORT SLEEVE ONESIE (WHT)': '',
    'GGD LONG SLEEVE ONESIE (BLK)': '',
    'GGD LONG SLEEVE ONESIE (WHT)': ''
  };
})();
