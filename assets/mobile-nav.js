(function() {
  if (typeof window === 'undefined') return;
  function init() {
    var header = document.querySelector('.custom-header');
    var bar = document.querySelector('.custom-header-bar') || header;
    if (!header) return;
    var leftNav = header.querySelector('.custom-header-left .custom-header-nav');
    var rightNav = header.querySelector('.custom-header-right .custom-header-nav');
    var cartBtn = header.querySelector('.custom-header-cart-toggle');
    if (!leftNav && !rightNav && !cartBtn) return;
    var hamburger = document.getElementById('navHamburger');
    if (hamburger) return;
    hamburger = document.createElement('button');
    hamburger.type = 'button';
    hamburger.className = 'nav-hamburger';
    hamburger.id = 'navHamburger';
    hamburger.setAttribute('aria-label', 'Open menu');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.innerHTML = '&#9776;';
    var overlay = document.createElement('div');
    overlay.className = 'nav-mobile-overlay';
    overlay.id = 'navMobileOverlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-label', 'Navigation menu');
    var ul = document.createElement('ul');
    function addLink(href, text) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = href;
      a.textContent = text;
      li.appendChild(a);
      ul.appendChild(li);
    }
    function addCart() {
      if (!cartBtn) return;
      var li = document.createElement('li');
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'nav-mobile-cart';
      btn.innerHTML = 'Cart ' + (cartBtn.querySelector('#cartCount') ? '<span id="navMobileCartCount">' + (cartBtn.querySelector('#cartCount').textContent || '0') + '</span>' : '');
      btn.addEventListener('click', function() {
        closeMenu();
        if (cartBtn.tagName === 'A') window.location.href = cartBtn.href;
        else if (cartBtn.click) cartBtn.click();
      });
      li.appendChild(btn);
      ul.appendChild(li);
    }
    var base = '';
    if (window.location.pathname.indexOf('/pages/') !== -1 || (window.location.pathname.split('/').length > 2 && document.querySelector('a[href="../girls gone digital.html"]'))) {
      base = '../';
    }
    if (leftNav) {
      leftNav.querySelectorAll('a').forEach(function(a) {
        var href = a.getAttribute('href');
        if (href && href !== '#') addLink(href, a.textContent.trim());
      });
    }
    if (rightNav) {
      rightNav.querySelectorAll('a').forEach(function(a) {
        var href = a.getAttribute('href');
        if (href && href !== '#') addLink(href, a.textContent.trim());
      });
    }
    addCart();
    overlay.appendChild(ul);
    var backdrop = document.createElement('div');
    backdrop.className = 'nav-mobile-backdrop';
    backdrop.id = 'navMobileBackdrop';
    document.body.appendChild(backdrop);
    document.body.appendChild(overlay);
    var leftWrap = header.querySelector('.custom-header-left');
    if (leftWrap) {
      leftWrap.insertBefore(hamburger, leftWrap.firstChild);
    } else {
      header.insertBefore(hamburger, header.firstChild);
    }
    function openMenu() {
      overlay.classList.add('is-open');
      backdrop.classList.add('is-open');
      hamburger.setAttribute('aria-expanded', 'true');
      hamburger.setAttribute('aria-label', 'Close menu');
      hamburger.innerHTML = '&times;';
      hamburger.style.fontSize = '28px';
      document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
      overlay.classList.remove('is-open');
      backdrop.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Open menu');
      hamburger.innerHTML = '&#9776;';
      hamburger.style.fontSize = '';
      document.body.style.overflow = '';
    }
    hamburger.addEventListener('click', function() {
      if (overlay.classList.contains('is-open')) closeMenu();
      else openMenu();
    });
    backdrop.addEventListener('click', closeMenu);
    overlay.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', closeMenu);
    });
    var syncCart = function() {
      var countEl = overlay.querySelector('#navMobileCartCount');
      var mainCount = document.getElementById('cartCount');
      if (countEl && mainCount) countEl.textContent = mainCount.textContent;
    };
    if (window.ggdCartRender) {
      var orig = window.ggdCartRender;
      window.ggdCartRender = function() { orig(); syncCart(); };
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
