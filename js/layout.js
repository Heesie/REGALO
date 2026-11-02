/* REGALO — shared layout: header, mobile menu, bag drawer and footer.
   Each page calls Regalo.header({ active }) / Regalo.footer() from an inline
   script, so the markup is in place before first paint (no layout flash). */
(function () {
  const logo = (cls = '') => `<span class="logo ${cls}" role="img" aria-label="REGALO"></span>`;

  const navItem = (href, label, key, active) =>
    `<a class="nav-item${active === key ? ' is-active' : ''}" href="${href}"${active === key ? ' aria-current="page"' : ''}>
       <span>${label}</span><i class="nav-item__dash" aria-hidden="true"></i>
     </a>`;

  const langSwitch = () =>
    `<div class="lang-switch" role="group" aria-label="Language">
       <button type="button" class="lang-switch__btn is-active" data-lang="en">EN</button>
       <span class="lang-switch__sep" aria-hidden="true">/</span>
       <button type="button" class="lang-switch__btn" data-lang="nl">NL</button>
     </div>`;

  // tone: 'light' for pages that open on a light background (dark header text at the top)
  function header({ active = '', tone = '' } = {}) {
    const html = `
<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header is-top${tone === 'light' ? ' site-header--on-light' : ''}" data-header>
  <div class="site-header__inner">
    <a class="site-header__logo" href="index.html" aria-label="REGALO home">${logo()}</a>
    <nav class="site-header__nav" aria-label="Main">
      ${navItem('our-story.html', 'Our Story', 'story', active)}
      ${navItem('shop.html', 'Shop', 'shop', active)}
    </nav>
    <div class="site-header__tools">
      ${langSwitch()}
      <button type="button" class="bag-link" data-bag-open aria-label="Open bag">
        <span>Bag</span><span class="bag-link__count">(<span data-bag-count>0</span>)</span>
      </button>
      <button type="button" class="menu-toggle" data-menu-toggle aria-expanded="false" aria-controls="mobile-menu" aria-label="Menu">
        <span></span><span></span>
      </button>
    </div>
  </div>
</header>

<div class="mobile-menu" id="mobile-menu" data-menu aria-hidden="true">
  <nav class="mobile-menu__nav" aria-label="Mobile">
    <a href="index.html" class="mobile-menu__link${active === 'home' ? ' is-active' : ''}"><span>Home</span></a>
    <a href="our-story.html" class="mobile-menu__link${active === 'story' ? ' is-active' : ''}"><span>Our Story</span></a>
    <a href="shop.html" class="mobile-menu__link${active === 'shop' ? ' is-active' : ''}"><span>Shop</span></a>
  </nav>
  <div class="mobile-menu__foot">
    ${langSwitch()}
    <a class="link link--light" href="shop.html#join"><span>Join the list</span><i aria-hidden="true">→</i></a>
  </div>
</div>

<div class="bag" data-bag aria-hidden="true">
  <div class="bag__scrim" data-bag-close></div>
  <aside class="bag__panel" role="dialog" aria-modal="true" aria-labelledby="bag-title">
    <div class="bag__head">
      <p class="h3" id="bag-title">Your bag</p>
      <button type="button" class="bag__close" data-bag-close aria-label="Close bag">Close</button>
    </div>
    <div class="bag__items" data-bag-items></div>
    <div class="bag__foot">
      <div class="bag__row"><span class="body-s">Subtotal</span><span class="price" data-bag-subtotal>€ 0,00</span></div>
      <p class="caption muted">Shipping calculated at checkout. Incl. VAT.</p>
      <a href="checkout.html" class="btn btn--primary btn--block" data-bag-checkout><span>Checkout</span></a>
    </div>
  </aside>
</div>
<div class="toast" data-toast role="status" aria-live="polite"></div>`;
    document.currentScript.insertAdjacentHTML('afterend', html);
  }

  function footer() {
    const html = `
<footer class="site-footer" data-reveal-footer>
  <div class="container">
    <div class="site-footer__top">
      <p class="h3 site-footer__claim" data-reveal>Timeless Elegance That Endures.</p>
      <div class="site-footer__cols">
        <div class="site-footer__col" data-reveal>
          <p class="eyebrow muted">Explore</p>
          <a class="footer-link" href="our-story.html">Our Story</a>
          <a class="footer-link" href="shop.html">Shop</a>
          <a class="footer-link" href="collection.html">The Collection</a>
        </div>
        <div class="site-footer__col" data-reveal>
          <p class="eyebrow muted">Follow</p>
          <a class="footer-link" href="https://www.instagram.com/" target="_blank" rel="noopener">Instagram</a>
        </div>
        <div class="site-footer__col" data-reveal>
          <p class="eyebrow muted">Help</p>
          <a class="footer-link" href="contact.html">Contact</a>
          <a class="footer-link" href="shop.html#join">Manage preferences</a>
        </div>
      </div>
    </div>
    <a href="index.html" class="site-footer__logo" aria-label="REGALO home">${logo('logo--xl')}</a>
    <div class="site-footer__bottom">
      <p class="caption muted">© 2026 REGALO</p>
      ${langSwitch()}
    </div>
  </div>
</footer>`;
    document.currentScript.insertAdjacentHTML('afterend', html);
  }

  function checkoutHeader() {
    const html = `
<header class="checkout-header">
  <a href="index.html" class="checkout-header__logo" aria-label="REGALO home">${logo()}</a>
  <p class="label-nav">Secure checkout</p>
</header>
<div class="toast" data-toast role="status" aria-live="polite"></div>`;
    document.currentScript.insertAdjacentHTML('afterend', html);
  }

  window.Regalo = Object.assign(window.Regalo || {}, { header, footer, checkoutHeader });
})();
