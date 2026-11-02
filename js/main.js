/* REGALO — interactions: smooth scroll, header, reveals, bag, product cards,
   carousel, forms and the page-specific bits (collection, product, checkout). */
(function () {
  const R = window.Regalo;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = matchMedia('(hover: hover)').matches;

  /* ---------- Smooth scroll ---------- */
  let lenis = null;
  if (window.Lenis && !reduced) {
    lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true });
    const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }
  const lockScroll = (on) => {
    document.documentElement.style.overflow = on ? 'hidden' : '';
    if (lenis) on ? lenis.stop() : lenis.start();
  };
  const scrollToEl = (el, offset = -80) => {
    if (lenis) lenis.scrollTo(el, { offset, duration: 1.4 });
    else window.scrollTo({ top: el.getBoundingClientRect().top + scrollY + offset, behavior: reduced ? 'auto' : 'smooth' });
  };

  /* ---------- Page transitions ---------- */
  document.body.classList.add('is-loaded');
  window.addEventListener('pageshow', (e) => { if (e.persisted) document.body.classList.remove('is-leaving'); });
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || a.hasAttribute('download') || url.protocol === 'mailto:') return;
    // Same-page anchor: smooth scroll instead of navigating
    if (url.pathname === location.pathname && url.hash) {
      const target = document.getElementById(url.hash.slice(1));
      if (target) { e.preventDefault(); closeMenu(); scrollToEl(target); history.replaceState(null, '', url.hash); }
      return;
    }
    if (reduced) return;
    e.preventDefault();
    document.body.classList.add('is-leaving');
    setTimeout(() => { location.href = url.href; }, 320);
  });
  // Arriving with a hash: land on the section after layout settles
  if (location.hash) {
    const t = document.getElementById(location.hash.slice(1));
    if (t) setTimeout(() => scrollToEl(t), 400);
  }

  /* ---------- Header: hide on scroll down, show on scroll up ---------- */
  const header = $('[data-header]');
  let lastY = scrollY;
  const onScroll = () => {
    const y = scrollY;
    if (header) {
      const top = y <= 24;
      header.classList.toggle('is-top', top);
      const hide = y > lastY && !top && !document.body.classList.contains('menu-open');
      if (top) header.classList.remove('is-hidden');
      else if (Math.abs(y - lastY) > 4) header.classList.toggle('is-hidden', hide);
      document.body.classList.toggle('has-header-visible', !header.classList.contains('is-hidden'));
    }
    lastY = y;
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const menuBtn = $('[data-menu-toggle]');
  const menu = $('[data-menu]');
  function closeMenu() {
    if (!document.body.classList.contains('menu-open')) return;
    document.body.classList.remove('menu-open');
    menuBtn?.setAttribute('aria-expanded', 'false');
    menu?.setAttribute('aria-hidden', 'true');
    lockScroll(false);
  }
  menuBtn?.addEventListener('click', () => {
    const open = !document.body.classList.contains('menu-open');
    if (!open) return closeMenu();
    document.body.classList.add('menu-open');
    menuBtn.setAttribute('aria-expanded', 'true');
    menu.setAttribute('aria-hidden', 'false');
    header.classList.remove('is-hidden');
    lockScroll(true);
  });
  addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeMenu(); closeBag(); closeOverlays(); } });
  matchMedia('(min-width: 901px)').addEventListener('change', (m) => m.matches && closeMenu());

  /* ---------- Language switch (translation lives in i18n.js) ---------- */
  R.i18n.set(R.i18n.get());
  $$('.lang-switch__btn').forEach((b) => b.addEventListener('click', () => R.i18n.set(b.dataset.lang)));

  /* ---------- Toast ---------- */
  let toastTimer;
  function toast(msg) {
    const t = $('[data-toast]');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('is-visible'), 2800);
  }

  /* ---------- Reveal on scroll ---------- */
  // Plain vertical position check instead of IntersectionObserver: clip-path
  // reveals and horizontal scrollers report zero intersection and never fire.
  const pending = new Set();
  // Until the first scroll, everything already on screen reveals right away;
  // after that elements wait until they are a little way into the viewport.
  let scrolled = false;
  addEventListener('scroll', () => { scrolled = true; }, { passive: true, once: true });
  const checkReveal = () => {
    if (!pending.size) return;
    const line = scrolled ? innerHeight * 0.92 : innerHeight;
    pending.forEach((el) => {
      if (el.getBoundingClientRect().top < line) { el.classList.add('is-in'); pending.delete(el); }
    });
  };
  const observe = (root = document) => {
    $$('[data-reveal], .media-reveal, .split-line, .section-index, [data-reveal-footer]', root).forEach((el) => pending.add(el));
    checkReveal();
  };
  addEventListener('scroll', checkReveal, { passive: true });
  addEventListener('resize', checkReveal);
  addEventListener('load', checkReveal);
  // Stagger siblings inside a group
  $$('[data-stagger]').forEach((g) => [...g.children].forEach((c, i) => c.style.setProperty('--d', `${i * 0.09}s`)));
  observe();

  /* ---------- Shop images: fade in once loaded and decoded ---------- */
  const FADE_IMG = '.product-card__media > img, .category-tile__media img, .editorial__media img';
  const showImg = (img) => {
    if (img.classList.contains('is-loaded')) return;
    (img.decode ? img.decode() : Promise.resolve()).catch(() => {}).then(() => img.classList.add('is-loaded'));
  };
  const watchImgs = (root = document) => $$(FADE_IMG, root).forEach((img) => {
    img.decoding = 'async';
    if (img.complete && img.naturalWidth) showImg(img);
    else {
      img.addEventListener('load', () => showImg(img), { once: true });
      img.addEventListener('error', () => img.classList.add('is-loaded'), { once: true });
    }
  });
  watchImgs();
  new MutationObserver((list) => list.forEach((m) => m.addedNodes.forEach((n) => n.nodeType === 1 && watchImgs(n))))
    .observe(document.body, { childList: true, subtree: true });

  /* ---------- Parallax ---------- */
  const parallax = $$('[data-parallax]');
  if (parallax.length && !reduced) {
    const tick = () => {
      parallax.forEach((el) => {
        const r = el.parentElement.getBoundingClientRect();
        if (r.bottom < 0 || r.top > innerHeight) return;
        const speed = parseFloat(el.dataset.parallax) || 0.15;
        el.style.transform = `translate3d(0, ${(-r.top * speed).toFixed(1)}px, 0)`;
      });
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ---------- Bag (localStorage) ---------- */
  const KEY = 'regalo-bag';
  const read = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } };
  const write = (items) => { try { localStorage.setItem(KEY, JSON.stringify(items)); } catch (e) {} renderBag(); };
  const bag = $('[data-bag]');

  function addToBag(id, colour, size) {
    const items = read();
    const key = `${id}|${colour}|${size}`;
    const hit = items.find((i) => i.key === key);
    hit ? hit.qty++ : items.push({ key, id, colour, size, qty: 1 });
    write(items);
    const link = $('.bag-link');
    if (link) { link.classList.remove('is-bump'); void link.offsetWidth; link.classList.add('is-bump'); }
  }
  const subtotal = (items) => items.reduce((s, i) => s + (R.find(i.id)?.price || 0) * i.qty, 0);

  function lineItem(i, editable = true) {
    const p = R.find(i.id);
    if (!p) return '';
    return `<div class="line-item" data-key="${i.key}">
      <a class="line-item__img" href="product.html?id=${p.id}"><img src="${R.img(p.img)}" alt="" loading="lazy"></a>
      <div class="line-item__body">
        <div class="line-item__top"><a class="body-s" href="product.html?id=${p.id}">${p.name}</a><span class="price">${R.euro(p.price * i.qty)}</span></div>
        <p class="caption muted">${i.colour}  ·  ${i.size}${editable ? '' : `  ·  Qty ${i.qty}`}</p>
        ${editable ? `<div class="line-item__actions">
          <div class="qty"><button type="button" data-qty="-1" aria-label="Decrease">−</button><span>${i.qty}</span><button type="button" data-qty="1" aria-label="Increase">+</button></div>
          <button type="button" class="line-item__remove" data-remove>Remove</button>
        </div>` : ''}
      </div>
    </div>`;
  }

  function renderBag() {
    const items = read();
    const count = items.reduce((n, i) => n + i.qty, 0);
    $$('[data-bag-count]').forEach((el) => (el.textContent = count));
    const list = $('[data-bag-items]');
    if (list) {
      list.innerHTML = items.length
        ? items.map((i) => lineItem(i)).join('')
        : `<div class="bag__empty"><p class="body muted">Your bag is empty.</p><a class="link" href="collection.html"><span>Discover the collection</span><i aria-hidden="true">→</i></a></div>`;
    }
    $$('[data-bag-subtotal]').forEach((el) => (el.textContent = R.euro(subtotal(items))));
    $('[data-bag-checkout]')?.classList.toggle('is-disabled', !items.length);
    document.dispatchEvent(new CustomEvent('bag:change', { detail: items }));
  }

  function openBag() {
    if (!bag) return;
    closeMenu();
    bag.classList.add('is-open');
    bag.setAttribute('aria-hidden', 'false');
    lockScroll(true);
    setTimeout(() => $('.bag__close', bag)?.focus(), 50);
  }
  function closeBag() {
    if (!bag?.classList.contains('is-open')) return;
    bag.classList.remove('is-open');
    bag.setAttribute('aria-hidden', 'true');
    lockScroll(false);
  }
  $$('[data-bag-open]').forEach((b) => b.addEventListener('click', openBag));
  $$('[data-bag-close]').forEach((b) => b.addEventListener('click', closeBag));
  $('[data-bag-items]')?.addEventListener('click', (e) => {
    const row = e.target.closest('[data-key]');
    if (!row) return;
    const items = read();
    const it = items.find((i) => i.key === row.dataset.key);
    if (!it) return;
    if (e.target.closest('[data-remove]')) { write(items.filter((i) => i !== it)); return; }
    const d = e.target.closest('[data-qty]');
    if (d) { it.qty += +d.dataset.qty; write(it.qty < 1 ? items.filter((i) => i !== it) : items); }
  });
  addEventListener('storage', (e) => e.key === KEY && renderBag());
  renderBag();

  /* ---------- Product cards ---------- */
  const swatches = (p, sel = 0) => p.colours.map((c, i) =>
    `<button type="button" class="swatch${i === sel ? ' is-selected' : ''}" style="--c:${c.hex}" data-colour="${c.name}" aria-label="${c.name}" aria-pressed="${i === sel}"></button>`).join('');
  const chips = (p, sel) => R.sizes.map((s) =>
    `<button type="button" class="chip${s === sel ? ' is-selected' : ''}" data-size="${s}" ${p.unavailable.includes(s) ? 'disabled aria-label="' + s + ' unavailable"' : ''} aria-pressed="${s === sel}">${s}</button>`).join('');

  function card(p, { locked = false, delay = 0, reveal = true } = {}) {
    const meta = `${p.cat}  ·  ${p.colours.length} colours`;
    if (locked) {
      return `<a class="product-card product-card--locked" href="shop.html#join" style="--d:${delay}s"${reveal ? ' data-reveal' : ''}>
        <div class="product-card__media">
          <img src="${R.img(p.img)}" alt="${p.name}" loading="lazy">
          <div class="product-card__overlay"></div>
          <div class="product-card__locked">
            <img src="assets/svg/lock.svg" alt="" width="16" height="21">
            <p class="eyebrow swap"><span>Coming soon</span><span>Join the list</span></p>
          </div>
        </div>
        <div class="product-card__info">
          <div class="product-card__row"><p class="product-card__name">${p.name}</p><p class="price muted">Coming soon</p></div>
          <p class="caption muted">${p.cat}</p>
        </div>
      </a>`;
    }
    const sold = p.tag === 'sold';
    return `<article class="product-card${sold ? ' is-sold' : ''}" data-product="${p.id}" style="--d:${delay}s">
      <div class="product-card__media">
        <img src="${R.img(p.img)}" alt="${p.name}" loading="lazy">
        ${p.tag ? `<span class="tag${sold ? ' tag--sold' : ''}">${sold ? 'Sold out' : 'New'}</span>` : ''}
        ${sold ? '' : `<button type="button" class="quick-toggle" data-quick-toggle aria-label="Quick add ${p.name}" aria-expanded="false">+</button>
        <div class="quick-add" data-quick>
          <div class="quick-add__row"><span class="caption muted quick-add__label">Color</span>${swatches(p)}</div>
          <div class="quick-add__row chips">${chips(p, null)}</div>
          <button type="button" class="btn btn--primary btn--block" data-quick-add><span>Add to bag</span></button>
        </div>`}
      </div>
      <div class="product-card__info">
        <div class="product-card__row"><p class="product-card__name">${p.name}</p><p class="price">${R.euro(p.price)}</p></div>
        <p class="caption muted product-card__meta">${meta}</p>
      </div>
      <a class="product-card__link" href="product.html?id=${p.id}" aria-label="${p.name}"></a>
    </article>`;
  }

  // Option pickers (swatches / size chips) — shared by quick add and the product page
  document.addEventListener('click', (e) => {
    const sw = e.target.closest('.swatch');
    if (sw) {
      $$('.swatch', sw.parentElement).forEach((s) => { s.classList.toggle('is-selected', s === sw); s.setAttribute('aria-pressed', s === sw); });
      sw.closest('[data-pdp]') && ($('[data-colour-name]').textContent = sw.dataset.colour);
      return;
    }
    const ch = e.target.closest('.chip');
    if (ch && !ch.disabled) {
      $$('.chip', ch.parentElement).forEach((c) => { c.classList.toggle('is-selected', c === ch); c.setAttribute('aria-pressed', c === ch); });
      ch.parentElement.classList.remove('is-error');
    }
  });

  function selected(scope) {
    return {
      colour: $('.swatch.is-selected', scope)?.dataset.colour,
      size: $('.chip.is-selected', scope)?.dataset.size,
    };
  }
  function confirmAdd(btn, id, scope) {
    const { colour, size } = selected(scope);
    if (!size) {
      const row = $('.chips', scope) || $('[data-sizes]', scope);
      row.classList.remove('is-error'); void row.offsetWidth; row.classList.add('is-error');
      toast('Please select a size');
      return false;
    }
    const label = $('span', btn);
    const original = label.textContent;
    btn.classList.add('is-loading');
    setTimeout(() => {
      addToBag(id, colour, size);
      btn.classList.remove('is-loading');
      btn.classList.add('is-done');
      label.textContent = 'Added ✓';
      setTimeout(() => { btn.classList.remove('is-done'); label.textContent = original; }, 1600);
      setTimeout(openBag, 450);
    }, 500);
    return true;
  }

  function bindCards(root) {
    $$('.product-card[data-product]', root).forEach((c) => {
      if (c.dataset.bound) return;
      c.dataset.bound = 1;
      const id = c.dataset.product;
      let timer;
      // Design spec: Quick Add opens after 2 s of hover
      if (canHover) {
        c.addEventListener('mouseenter', () => { timer = setTimeout(() => c.classList.add('is-quick'), 2000); });
        c.addEventListener('mouseleave', () => { clearTimeout(timer); c.classList.remove('is-quick'); });
      }
      const toggle = $('[data-quick-toggle]', c);
      toggle?.addEventListener('click', () => {
        const open = c.classList.toggle('is-quick');
        toggle.setAttribute('aria-expanded', open);
      });
      c.addEventListener('focusin', (e) => { if (e.target.closest('[data-quick]')) c.classList.add('is-quick'); });
      $('[data-quick-add]', c)?.addEventListener('click', (e) => confirmAdd(e.currentTarget, id, c));
    });
  }

  /* ---------- Hero video: fades in over the photo once it actually plays ---------- */
  const heroVideo = $('[data-hero-video]');
  if (heroVideo) {
    const drop = () => heroVideo.remove();
    if (reduced) drop();
    else {
      heroVideo.addEventListener('playing', () => heroVideo.classList.add('is-playing'), { once: true });
      $$('source', heroVideo).pop().addEventListener('error', drop);
      heroVideo.play()?.catch(() => {});
    }
  }

  /* ---------- Lookbook carousel: infinite loop with drag, arrows, counter ---------- */
  // The track holds three copies of the looks and is moved with a transform.
  // Position x grows without bounds; it is wrapped into one set width when
  // drawn, so the strip loops endlessly in both directions.
  $$('[data-carousel]').forEach((wrap) => {
    const strip = $('.strip', wrap);
    const track = $('.strip__track', wrap);
    const items = $$('.strip__item', track);
    const n = items.length;
    const prev = $('[data-prev]', wrap), next = $('[data-next]', wrap), count = $('[data-count]', wrap);
    const hint = $('[data-drag-hint]', wrap);
    if (hint && !canHover) hint.textContent = 'Swipe to explore';

    const clone = (el) => { const c = el.cloneNode(true); c.setAttribute('aria-hidden', 'true'); c.tabIndex = -1; $('img', c).alt = ''; return c; };
    items.slice().reverse().forEach((it) => track.prepend(clone(it)));
    items.forEach((it) => track.append(clone(it)));
    observe(track);

    // Measured relative to the track: offsets of each look, width of one set,
    // and the shift that puts the first original look on the page gutter
    let setW = 0, offsets = [], lead = 0;
    const measure = () => {
      const left = (el) => el.offsetLeft - track.children[0].offsetLeft;
      offsets = items.map((it) => left(it) - left(items[0]));
      setW = left(track.children[2 * n]) - left(items[0]);
      lead = left(items[0]) - setW - parseFloat(getComputedStyle($('.lookbook__head', wrap)).paddingLeft);
    };
    const mod = (v, m) => ((v % m) + m) % m;
    let x = 0, target = 0, raf = 0, dragging = false;

    // Nearest item position (in unbounded x) from a given x
    const snap = (from) => {
      const base = Math.floor(from / setW) * setW;
      let best = from, dist = Infinity;
      [base - setW, base, base + setW].forEach((b) => offsets.forEach((o) => {
        const d = Math.abs(b + o - from);
        if (d < dist) { dist = d; best = b + o; }
      }));
      return best;
    };
    const index = () => {
      const r = mod(snap(x), setW);
      return offsets.findIndex((o) => Math.abs(o - r) < 1) + 1 || 1;
    };
    const draw = () => {
      track.style.transform = `translate3d(${-(lead + setW + mod(x, setW))}px,0,0)`;
      count && (count.textContent = `${index()} / ${n}`);
    };
    const loop = () => {
      x += (target - x) * 0.12;
      if (Math.abs(target - x) < 0.3) x = target;
      draw();
      raf = x === target && !dragging ? 0 : requestAnimationFrame(loop);
    };
    const run = () => { raf ||= requestAnimationFrame(loop); };
    const go = (dir) => {
      const cur = snap(target);
      const r = mod(cur, setW);
      const i = offsets.findIndex((o) => Math.abs(o - r) < 1);
      const j = i + dir;
      const wrapStep = j < 0 ? -setW : j >= n ? setW : 0;
      target = cur - r + offsets[mod(j, n)] + wrapStep;
      run();
    };
    prev?.addEventListener('click', () => go(-1));
    next?.addEventListener('click', () => go(1));

    // Pointer drag (mouse and touch) with a flick, then settle on the nearest look
    let startX = 0, startT = 0, lastX = 0, lastT = 0, vel = 0, pid = null, moved = false;
    strip.addEventListener('pointerdown', (e) => {
      if (e.button > 0) return;
      pid = e.pointerId; dragging = true; moved = false;
      startX = lastX = e.clientX; startT = target = x; lastT = performance.now(); vel = 0;
      run();
    });
    strip.addEventListener('pointermove', (e) => {
      if (e.pointerId !== pid) return;
      const dx = e.clientX - startX;
      if (!moved && Math.abs(dx) > 4) { moved = true; strip.classList.add('is-dragging'); try { strip.setPointerCapture(pid); } catch (err) {} }
      if (!moved) return;
      const now = performance.now();
      vel = Math.max(-2.5, Math.min(2.5, (e.clientX - lastX) / Math.max(8, now - lastT)));
      lastX = e.clientX; lastT = now;
      target = x = startT - dx;
    });
    const end = (e) => {
      if (e.pointerId !== pid) return;
      pid = null; dragging = false;
      strip.classList.remove('is-dragging');
      if (moved) target = snap(x - vel * 280);
      run();
      setTimeout(() => { moved = false; }, 0); // after the click that follows pointerup
    };
    strip.addEventListener('pointerup', end);
    strip.addEventListener('pointercancel', end);
    strip.addEventListener('lostpointercapture', end);
    // A drag should not open the look underneath the pointer
    strip.addEventListener('click', (e) => { if (moved) { e.preventDefault(); e.stopPropagation(); } }, true);

    // Horizontal trackpad swipes move the strip; vertical scrolling passes through
    let wheelTimer;
    strip.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      target += e.deltaX; run();
      clearTimeout(wheelTimer);
      wheelTimer = setTimeout(() => { target = snap(target); run(); }, 140);
    }, { passive: false });
    strip.setAttribute('data-lenis-prevent-horizontal', '');

    const reset = () => { const i = index() - 1; measure(); x = target = offsets[i] || 0; draw(); };
    measure(); draw();
    addEventListener('resize', reset);
    addEventListener('load', reset);
  });

  /* ---------- Join the list forms ---------- */
  const validEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
  $$('[data-join]').forEach((section) => {
    const form = $('form', section);
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const field = $('.field', form), input = $('input[type=email]', form), help = $('.field__help', field);
      if (!validEmail(input.value.trim())) {
        field.classList.add('is-invalid');
        help.textContent = 'Please enter a valid email address.';
        input.focus();
        return;
      }
      field.classList.remove('is-invalid');
      const btn = $('button[type=submit]', form);
      btn.classList.add('is-loading');
      setTimeout(() => { btn.classList.remove('is-loading'); section.classList.add('is-done'); }, 700);
    });
    $('input[type=email]', section)?.addEventListener('input', (e) => {
      const f = e.target.closest('.field');
      if (f.classList.contains('is-invalid') && validEmail(e.target.value.trim())) {
        f.classList.remove('is-invalid');
        $('.field__help', f).textContent = 'We respect your inbox. Unsubscribe anytime.';
      }
    });
  });

  /* ---------- Overlays (lightbox / dialog) ---------- */
  function closeOverlays() {
    $$('.lightbox.is-open, .dialog.is-open').forEach((o) => { o.classList.remove('is-open'); lockScroll(false); });
  }
  document.addEventListener('click', (e) => {
    const open = e.target.closest('[data-dialog-open]');
    if (open) { $(open.dataset.dialogOpen).classList.add('is-open'); lockScroll(true); return; }
    if (e.target.closest('[data-dialog-close]') || e.target.closest('.lightbox')) closeOverlays();
  });

  /* =====================================================================
     Page: Shop coming soon — locked "first look" cards
     ===================================================================== */
  const firstLook = $('[data-first-look]');
  if (firstLook) {
    const ids = ['crew-tee', 'cardigan', 'pleated', 'tank', 'merino', 'wide', 'chino', 'track-jacket', 'cap'];
    // Revealed by the GSAP queued scroll reveal (js/queued-reveal.js)
    firstLook.innerHTML = ids.map((id) => card(R.find(id), { locked: true, reveal: false })).join('');
    observe(firstLook);
  }
  const homeLocked = $('[data-home-locked]');
  if (homeLocked) {
    homeLocked.insertAdjacentHTML('beforeend', ['crew-tee', 'pleated'].map((id, i) => card(R.find(id), { locked: true, delay: 0.1 + i * 0.1 })).join(''));
    observe(homeLocked);
  }

  /* =====================================================================
     Page: Collection (shop fase 2)
     ===================================================================== */
  const grid = $('[data-collection]');
  if (grid) {
    const PAGE = 12;
    let filter = 'All', sort = 'newest', shown = PAGE;
    const editorials = {
      3: `<article class="editorial editorial--dark">
            <div class="editorial__text">
              <p class="eyebrow champagne">Material &amp; Craft</p>
              <p class="h2">Chosen for how it feels, and how it ages.</p>
              <p class="body-s">Mid-weight cotton, merino knits and wool blends. Every piece carries a short note on its fabric, weight and finishing.</p>
              <a class="link link--light" href="our-story.html"><span>Read about our fabrics</span><i aria-hidden="true">→</i></a>
            </div>
            <div class="editorial__media"><img src="assets/img/story-8.jpg" alt="Detail of fabric and finishing" loading="lazy"></div>
          </article>`,
      10: `<article class="editorial editorial--terracotta editorial--reverse">
            <div class="editorial__text">
              <p class="eyebrow champagne">Leisurewear</p>
              <p class="h2">Comfort, considered.</p>
              <p class="body-s">Tracksuits in soft cotton and wool, cut with the same care as our tailoring. From the morning walk to the evening terrace.</p>
              <button type="button" class="link link--light" data-filter-to="Leisurewear"><span>Shop Leisurewear</span><i aria-hidden="true">→</i></button>
            </div>
            <div class="editorial__media"><img src="assets/img/ed-leisure.jpg" alt="Man in white on a terrace overlooking the sea" loading="lazy"></div>
          </article>`,
    };
    const list = () => {
      let l = R.products.filter((p) => filter === 'All' || p.cat === filter);
      if (sort === 'low') l = [...l].sort((a, b) => a.price - b.price);
      if (sort === 'high') l = [...l].sort((a, b) => b.price - a.price);
      return l;
    };
    const render = (append = false) => {
      const l = list();
      const visible = l.slice(0, shown);
      let html = '';
      visible.forEach((p, i) => {
        if (filter === 'All' && sort === 'newest' && editorials[i]) html += editorials[i];
        html += card(p, { delay: append ? 0 : (i % 3) * 0.08 });
      });
      const kept = append ? grid.children.length : 0;
      grid.innerHTML = html;
      // Cards already on screen before "Load more" should not animate again
      [...grid.children].slice(0, kept).forEach((el) => el.setAttribute('data-queued-skip', ''));
      bindCards(grid);
      $('[data-count-total]').textContent = l.length;
      $('[data-shown]').textContent = `Showing ${visible.length} of ${l.length}`;
      $('[data-progress]').style.width = `${(visible.length / l.length) * 100}%`;
      $('[data-load-more]').hidden = visible.length >= l.length;
      // Let the queued scroll reveal pick up the freshly rendered cards
      document.dispatchEvent(new CustomEvent('regalo:render'));
    };
    // After filtering or sorting, bring the start of the results into view just
    // below the sticky filter bar and the header (which slides back in on the
    // way up). Only moves the page when it is scrolled past that point.
    const toGridTop = () => {
      const bar = $('.filter-bar');
      const headerH = $('[data-header]')?.offsetHeight || 0;
      const target = grid.closest('section').getBoundingClientRect().top + scrollY - bar.offsetHeight - headerH + 24;
      if (scrollY > target + 4) {
        if (lenis) lenis.scrollTo(target, { duration: 1 });
        else window.scrollTo({ top: target, behavior: reduced ? 'auto' : 'smooth' });
      }
    };
    const setFilter = (f) => {
      filter = f; shown = PAGE;
      $$('[data-filter]').forEach((t) => { t.classList.toggle('is-active', t.dataset.filter === f); t.setAttribute('aria-selected', t.dataset.filter === f); });
      render();
      toGridTop();
    };
    $$('[data-filter]').forEach((t) => t.addEventListener('click', () => setFilter(t.dataset.filter)));
    // Phones: fade the tab row's edges only where there are more categories to swipe to
    const tabs = $('.tabs');
    const tabFade = () => {
      const max = tabs.scrollWidth - tabs.clientWidth;
      tabs.classList.toggle('has-more-l', tabs.scrollLeft > 4);
      tabs.classList.toggle('has-more-r', tabs.scrollLeft < max - 4);
    };
    tabs.addEventListener('scroll', tabFade, { passive: true });
    addEventListener('resize', tabFade);
    tabFade();
    grid.addEventListener('click', (e) => { const b = e.target.closest('[data-filter-to]'); b && setFilter(b.dataset.filterTo); });
    // Sort dropdown (custom listbox instead of the native select menu)
    const sortEl = $('[data-sort]');
    const sortBtn = $('.sort__toggle', sortEl);
    const options = $$('.sort__option', sortEl);
    let focus = 0;
    const setFocus = (i) => { focus = (i + options.length) % options.length; options.forEach((o, j) => o.classList.toggle('is-focus', j === focus)); };
    const openSort = (open) => {
      sortEl.classList.toggle('is-open', open);
      sortBtn.setAttribute('aria-expanded', open);
      if (open) { setFocus(options.findIndex((o) => o.getAttribute('aria-selected') === 'true')); $('.sort__menu', sortEl).focus({ preventScroll: true }); }
      else options.forEach((o) => o.classList.remove('is-focus'));
    };
    const pickSort = (o) => {
      options.forEach((x) => x.setAttribute('aria-selected', x === o));
      $('[data-sort-label]', sortEl).textContent = o.textContent;
      openSort(false);
      sortBtn.focus({ preventScroll: true });
      if (sort !== o.dataset.value) { sort = o.dataset.value; render(); toGridTop(); }
    };
    sortBtn.addEventListener('click', () => openSort(!sortEl.classList.contains('is-open')));
    sortBtn.addEventListener('keydown', (e) => { if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); openSort(true); } });
    options.forEach((o, i) => {
      o.addEventListener('click', () => pickSort(o));
      o.addEventListener('mouseenter', () => setFocus(i));
    });
    $('.sort__menu', sortEl).addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); setFocus(focus + 1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setFocus(focus - 1); }
      else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pickSort(options[focus]); }
      else if (e.key === 'Escape' || e.key === 'Tab') { openSort(false); if (e.key === 'Escape') sortBtn.focus(); }
    });
    document.addEventListener('click', (e) => { if (!sortEl.contains(e.target)) openSort(false); });
    $('[data-load-more]').addEventListener('click', (e) => {
      const btn = e.currentTarget;
      btn.classList.add('is-loading');
      setTimeout(() => { btn.classList.remove('is-loading'); shown += PAGE; render(true); }, 500);
    });
    render();
  }

  /* =====================================================================
     Page: Product
     ===================================================================== */
  const pdp = $('[data-pdp]');
  if (pdp) {
    const id = new URLSearchParams(location.search).get('id') || 'crew-tee';
    const p = R.find(id) || R.find('crew-tee');
    document.title = `${p.name} — REGALO`;
    $$('[data-p-name]').forEach((el) => (el.textContent = p.name));
    $$('[data-p-cat]').forEach((el) => (el.textContent = p.cat));
    $('[data-p-price]').textContent = R.euro(p.price);
    $('[data-p-desc]').textContent = p.desc;
    $('[data-p-fabric]').textContent = p.fabric;
    $('[data-colour-name]').textContent = p.colours[0].name;
    $('[data-swatches]').innerHTML = swatches(p);
    $('[data-sizes]').innerHTML = chips(p, null);
    $('[data-p-main]').src = R.img(p.img);
    $('[data-p-main]').alt = `${p.name}, front view`;
    if (p.id !== 'crew-tee') $('[data-p-back]').src = R.img(R.products[(R.products.indexOf(p) + 5) % R.products.length].img);
    const add = $('[data-add]');
    if (p.tag === 'sold') { add.classList.add('is-disabled'); $('span', add).textContent = 'Sold out'; }
    add.addEventListener('click', () => confirmAdd(add, p.id, pdp));

    // Complete the look: three other pieces
    const look = $('[data-look]');
    const others = ['pleated', 'cardigan', 'cap', 'wide', 'merino'].filter((x) => x !== p.id).slice(0, 3);
    look.innerHTML = others.map((x, i) => card(R.find(x), { delay: i * 0.1 })).join('');
    bindCards(look);

    // Accordions
    $$('.acc__head').forEach((h) => h.addEventListener('click', () => {
      const acc = h.parentElement;
      const open = acc.classList.toggle('is-open');
      h.setAttribute('aria-expanded', open);
    }));
    // Lightbox
    const lb = $('.lightbox');
    $$('.gallery .frame').forEach((f) => f.addEventListener('click', () => {
      $('img', lb).src = $('img', f).src;
      lb.classList.add('is-open');
      lockScroll(true);
    }));
  }

  /* =====================================================================
     Page: Look (shop the look) — template filled from R.looks
     ===================================================================== */
  const lookPage = $('[data-look-page]');
  if (lookPage) {
    const id = new URLSearchParams(location.search).get('id');
    const look = R.findLook(id) || R.looks[0];
    const n = R.looks.indexOf(look);
    const label = `Look ${String(n + 1).padStart(2, '0')}`;
    const pieces = look.items.map((it) => ({ ...it, p: R.find(it.id) })).filter((it) => it.p);

    document.title = `${label} · ${look.title} — REGALO`;
    $$('[data-look-label]').forEach((el) => (el.textContent = label));
    $('[data-look-title]').textContent = look.title;
    $('[data-look-desc]').textContent = look.desc;
    $('[data-look-count]').textContent = pieces.length;
    $('[data-look-total]').textContent = R.euro(pieces.reduce((t, it) => t + it.p.price, 0));

    // Photo with numbered hotspots
    const frame = $('[data-look-frame]');
    frame.style.setProperty('--ratio', `${look.w} / ${look.h}`);
    frame.style.setProperty('--ar', (look.w / look.h).toFixed(4));
    const img = $('[data-look-img]');
    img.src = R.img(look.img);
    img.alt = `${label} — ${look.title}`;
    frame.insertAdjacentHTML('beforeend', pieces.map((it, i) =>
      `<button type="button" class="hotspot" data-hotspot="${i}" style="left:${it.x}%;top:${it.y}%;--d:${0.6 + i * 0.12}s" aria-label="${it.p.name}"><span>${i + 1}</span></button>`).join(''));

    // Pieces with colour (as styled), size and add to bag
    const list = $('[data-look-items]');
    list.innerHTML = pieces.map((it, i) => {
      const sel = Math.max(0, it.p.colours.findIndex((c) => c.name === it.colour));
      const sold = it.p.tag === 'sold';
      return `<li class="look-item${sold ? ' is-sold' : ''}" data-look-item="${i}" data-reveal style="--d:${0.1 + i * 0.08}s">
        <span class="look-item__num" aria-hidden="true">${i + 1}</span>
        <a class="look-item__img" href="product.html?id=${it.p.id}"><img src="${R.img(it.p.img)}" alt="${it.p.name}" loading="lazy"></a>
        <div class="look-item__body">
          <div class="look-item__top">
            <a class="look-item__name" href="product.html?id=${it.p.id}">${it.p.name}</a>
            <span class="price">${R.euro(it.p.price)}</span>
          </div>
          <p class="caption muted">${it.p.cat}</p>
          <div class="look-item__opts">
            <div class="pdp__opt">${swatches(it.p, sel)}</div>
            <div class="pdp__opt chips">${chips(it.p, null)}</div>
          </div>
          <button type="button" class="btn btn--secondary look-item__add${sold ? ' is-disabled' : ''}" data-look-add><span>${sold ? 'Sold out' : 'Add to bag'}</span></button>
        </div>
      </li>`;
    }).join('');
    observe(list);

    const items = $$('.look-item', list);
    const info = $('[data-look-info]');
    info.addEventListener('scroll', checkReveal, { passive: true });
    const spots = $$('.hotspot', frame);
    const focusPiece = (i, on) => {
      items[i]?.classList.toggle('is-active', on);
      spots[i]?.classList.toggle('is-active', on);
    };
    spots.forEach((s, i) => {
      s.addEventListener('mouseenter', () => focusPiece(i, true));
      s.addEventListener('mouseleave', () => focusPiece(i, false));
      // Scroll only the pieces column (desktop) to the piece; the page itself stays put
      s.addEventListener('click', () => {
        if (info.scrollHeight > info.clientHeight + 1) {
          const top = info.scrollTop + items[i].getBoundingClientRect().top - info.getBoundingClientRect().top - 24;
          info.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' });
        }
        items.forEach((_, j) => focusPiece(j, j === i));
        setTimeout(() => focusPiece(i, false), 1800);
      });
    });
    items.forEach((li, i) => {
      li.addEventListener('mouseenter', () => focusPiece(i, true));
      li.addEventListener('mouseleave', () => focusPiece(i, false));
      $('[data-look-add]', li).addEventListener('click', (e) => confirmAdd(e.currentTarget, pieces[i].p.id, li));
    });

    // Add the full look: every available piece needs a size first
    const addAll = $('[data-look-add-all]');
    addAll.addEventListener('click', () => {
      const todo = items.filter((li) => !li.classList.contains('is-sold'));
      const missing = todo.filter((li) => !selected(li).size);
      if (missing.length) {
        missing.forEach((li) => { const row = $('.chips', li); row.classList.remove('is-error'); void row.offsetWidth; row.classList.add('is-error'); });
        scrollToEl(missing[0], -140);
        toast('Choose a size for each piece');
        return;
      }
      const label = $('span', addAll);
      const original = label.textContent;
      addAll.classList.add('is-loading');
      setTimeout(() => {
        todo.forEach((li) => { const { colour, size } = selected(li); addToBag(pieces[+li.dataset.lookItem].p.id, colour, size); });
        addAll.classList.remove('is-loading');
        addAll.classList.add('is-done');
        label.textContent = 'Added ✓';
        setTimeout(() => { addAll.classList.remove('is-done'); label.textContent = original; }, 1600);
        setTimeout(openBag, 450);
      }, 500);
    });

    // Previous / next and the other looks
    const at = (k) => R.looks[(n + k + R.looks.length) % R.looks.length];
    $('[data-look-prev]').href = `look.html?id=${at(-1).id}`;
    $('[data-look-next]').href = `look.html?id=${at(1).id}`;
    const more = $('[data-look-more]');
    more.innerHTML = R.looks.map((l, i) => ({ l, i })).filter(({ l }) => l !== look).map(({ l, i }, k) =>
      `<a class="look-card" href="look.html?id=${l.id}" data-reveal style="--d:${k * 0.08}s">
        <div class="look-card__media"><img src="${R.img(l.img)}" alt="${l.title}" loading="lazy"></div>
        <p class="caption muted">Look ${String(i + 1).padStart(2, '0')}</p>
        <p class="look-card__title">${l.title}</p>
      </a>`).join('');
    observe(more);
  }

  /* =====================================================================
     Page: Contact — validates, then opens a ready-to-send email
     ===================================================================== */
  const contact = $('[data-contact]');
  if (contact) {
    const form = $('form', contact);
    const t = (str) => R.i18n?.t(str) || str;
    const check = (f) => {
      const input = $('input, textarea', f);
      const v = input.value.trim();
      const ok = input.type === 'email' ? validEmail(v) : !input.required || v.length > 0;
      f.classList.toggle('is-invalid', !ok);
      $('.field__help', f).textContent = ok ? '' : t(input.type === 'email' ? 'Please enter a valid email address.' : 'This field is required.');
      return ok;
    };
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fields = $$('.field', form);
      const bad = fields.filter((f) => !check(f));
      if (bad.length) {
        scrollToEl(bad[0], -140);
        setTimeout(() => $('input, textarea', bad[0]).focus({ preventScroll: true }), 500);
        return;
      }
      const val = (n) => form.elements[n].value.trim();
      const name = `${val('fname')} ${val('lname')}`;
      const details = [`${t('Name')}: ${name}`, `${t('Email')}: ${val('email')}`];
      if (val('phone')) details.push(`${t('Phone')}: ${val('phone')}`);
      const body = `${val('message')}\n\n—\n${details.join('\n')}`;
      const subject = `${t('Message from')} ${name}`;
      const btn = $('button[type=submit]', form);
      btn.classList.add('is-loading');
      setTimeout(() => {
        location.href = `mailto:${contact.dataset.mail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        btn.classList.remove('is-loading');
        contact.classList.add('is-sent');
        scrollToEl(contact, -40);
      }, 500);
    });
    $$('.field input, .field textarea', form).forEach((i) => i.addEventListener('input', () => {
      const f = i.closest('.field');
      if (f.classList.contains('is-invalid')) check(f);
    }));
    $('[data-contact-again]').addEventListener('click', () => {
      form.reset();
      contact.classList.remove('is-sent');
    });
  }

  /* =====================================================================
     Page: Checkout
     ===================================================================== */
  const checkout = $('[data-checkout]');
  if (checkout) {
    const renderSummary = () => {
      const items = read();
      $('[data-summary-items]').innerHTML = items.length
        ? items.map((i) => lineItem(i, false)).join('')
        : `<p class="body-s muted">Your bag is empty. <a class="link" href="collection.html"><span>Shop the collection</span><i aria-hidden="true">→</i></a></p>`;
      const total = subtotal(items);
      $$('[data-sum-subtotal], [data-sum-total]').forEach((el) => (el.textContent = R.euro(total)));
      $('[data-sum-count]').textContent = items.reduce((n, i) => n + i.qty, 0);
    };
    renderSummary();
    document.addEventListener('bag:change', renderSummary);

    const form = $('form', checkout);
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let first = null;
      $$('.field', form).forEach((f) => {
        const input = $('input, select', f);
        if (!input || input.disabled) return;
        let ok = input.checkValidity();
        if (input.type === 'email') ok = validEmail(input.value.trim());
        f.classList.toggle('is-invalid', !ok);
        const help = $('.field__help', f);
        if (help) { help.dataset.default ??= help.textContent; help.textContent = ok ? help.dataset.default : (input.type === 'email' ? 'Please enter a valid email address.' : 'This field is required.'); }
        if (!ok && !first) first = input;
      });
      if (first) { scrollToEl(first.closest('.field'), -120); setTimeout(() => first.focus({ preventScroll: true }), 600); return; }
      if (!read().length) { toast('Your bag is empty'); return; }
      const btn = $('button[type=submit]', form);
      btn.classList.add('is-loading');
      const order = 'REG-' + (1000 + Math.floor(Math.random() * 9000));
      try { sessionStorage.setItem('regalo-order', JSON.stringify({ order, email: $('#email').value.trim() })); } catch (err) {}
      setTimeout(() => {
        try { localStorage.removeItem(KEY); } catch (err) {}
        document.body.classList.add('is-leaving');
        setTimeout(() => (location.href = 'confirmation.html'), 320);
      }, 900);
    });
    $$('.field input', form).forEach((i) => i.addEventListener('input', () => {
      const f = i.closest('.field');
      if (f.classList.contains('is-invalid') && i.checkValidity()) { f.classList.remove('is-invalid'); const h = $('.field__help', f); if (h?.dataset.default != null) h.textContent = h.dataset.default; }
    }));
  }

  /* =====================================================================
     Page: Confirmation
     ===================================================================== */
  const orderEl = $('[data-order]');
  if (orderEl) {
    try {
      const o = JSON.parse(sessionStorage.getItem('regalo-order'));
      if (o?.order) orderEl.textContent = o.order;
    } catch (e) {}
  }

  bindCards(document);
  R.toast = toast;
  R.lenis = lenis;
})();
