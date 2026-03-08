/**
 * Shopify checkout: create cart via Storefront API and redirect to Shopify checkout.
 * Requires shopify-config.js (store domain, token, variant map).
 */
(function () {
  'use strict';

  var CART_KEY = 'ggdCart';
  var API_VERSION = '2024-01';

  function getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
  }

  function getConfig() {
    var store = (window.SHOPIFY_STORE || '').trim().replace(/\.myshopify\.com$/i, '');
    var token = (window.SHOPIFY_STOREFRONT_TOKEN || '').trim();
    var map = window.SHOPIFY_VARIANT_MAP || {};
    return { store: store, token: token, variantMap: map };
  }

  /**
   * Build cart lines for cartCreate. Returns { lines: [...], missing: [product names] }.
   */
  function buildCartLines(cart, variantMap) {
    var lines = [];
    var missing = [];
    cart.forEach(function (item) {
      var name = (item && item.name ? String(item.name) : '').trim();
      var size = (item && item.size ? String(item.size) : '').trim().toUpperCase();
      var nameWithSize = size ? (name + ' - ' + size) : '';
      var baseName = name.replace(/\s*-\s*[A-Z0-9]+\s*$/, '');
      var gid = (nameWithSize && variantMap[nameWithSize]) || variantMap[name] || variantMap[baseName];
      if (!gid || gid.length < 10) {
        var missingKey = nameWithSize || name;
        if (missing.indexOf(missingKey) === -1) missing.push(missingKey);
        return;
      }
      var qty = Math.max(1, parseInt(item.qty, 10) || 1);
      lines.push({ merchandiseId: gid, quantity: qty });
    });
    return { lines: lines, missing: missing };
  }

  function showError(msg) {
    if (typeof alert === 'function') alert(msg);
    else if (typeof console !== 'undefined' && console.error) console.error(msg);
  }

  function setCheckoutLoading(btn, loading) {
    if (!btn) return;
    btn.disabled = loading;
    btn.textContent = loading ? 'Redirecting to checkout…' : 'Proceed to checkout';
  }

  /**
   * Run Shopify checkout: create cart via Storefront API, then redirect to checkoutUrl.
   * btn: optional button element to show loading state.
   */
  window.ggdShopifyCheckout = function (btn) {
    var cart = getCart();
    if (cart.length === 0) {
      showError('Your cart is empty. Add items from the shop first.');
      return;
    }

    var config = getConfig();
    if (!config.store || !config.token) {
      showError('Shopify checkout is not configured. Add your store domain and Storefront API token in shopify-config.js (see SHOPIFY_SETUP.md).');
      return;
    }

    var built = buildCartLines(cart, config.variantMap);
    if (built.missing.length > 0) {
      showError('These items are not yet linked to Shopify. Add their variant IDs in shopify-config.js: ' + built.missing.join(', '));
      return;
    }
    if (built.lines.length === 0) {
      showError('No cart lines could be built. Check SHOPIFY_VARIANT_MAP in shopify-config.js.');
      return;
    }

    setCheckoutLoading(btn, true);

    var url = 'https://' + config.store + '.myshopify.com/api/' + API_VERSION + '/graphql.json';
    var body = JSON.stringify({
      query: 'mutation cartCreate($input: CartInput!) { cartCreate(input: $input) { cart { checkoutUrl } userErrors { code message field } } }',
      variables: {
        input: { lines: built.lines }
      }
    });

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': config.token
      },
      body: body
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        setCheckoutLoading(btn, false);
        var payload = data.data && data.data.cartCreate;
        var errs = (payload && payload.userErrors) || [];
        if (errs.length > 0) {
          showError('Checkout error: ' + (errs.map(function (e) { return e.message; }).join('. ')));
          return;
        }
        var cartObj = payload && payload.cart;
        var checkoutUrl = cartObj && cartObj.checkoutUrl;
        if (checkoutUrl) {
          window.location.href = checkoutUrl;
        } else {
          showError('Could not get checkout URL. Check your Shopify variant IDs and API token.');
        }
      })
      .catch(function (err) {
        setCheckoutLoading(btn, false);
        showError('Checkout failed: ' + (err && err.message ? err.message : 'Network or server error.'));
      });
  };
})();
