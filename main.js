/* portfolio — minimal interactions: mobile menu + scroll reveal */
(function () {
  // mobile nav
  var toggle = document.querySelector('.nav__toggle');
  var menu = document.getElementById('menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.textContent = open ? 'close' : 'menu';
    });
    menu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = 'menu';
      }
    });
  }

  // scroll reveal
  var els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || els.length === 0) {
    els.forEach(function (el) { el.classList.add('is-in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  els.forEach(function (el) { io.observe(el); });
})();

/* ---------------------------------------------------------------
   lightbox — click any content image to open it full-screen.
   Images inside a link are left alone (they navigate instead).
   --------------------------------------------------------------- */
(function () {
  var imgs = Array.prototype.slice.call(document.querySelectorAll('.media img'))
    .filter(function (im) { return !im.closest('a'); });
  if (!imgs.length) return;

  var box = document.createElement('div');
  box.className = 'lb';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.setAttribute('aria-label', 'Image viewer');
  box.tabIndex = -1;
  box.hidden = true;
  box.innerHTML =
    '<button class="lb__btn lb__x" aria-label="Close">close</button>' +
    '<button class="lb__btn lb__nav lb__prev" aria-label="Previous image">←</button>' +
    '<button class="lb__btn lb__nav lb__next" aria-label="Next image">→</button>' +
    '<figure class="lb__fig"><img alt="" /><figcaption class="lb__cap"></figcaption>' +
    '<span class="lb__count"></span></figure>';
  document.body.appendChild(box);

  var full = box.querySelector('.lb__fig img');
  var cap = box.querySelector('.lb__cap');
  var count = box.querySelector('.lb__count');
  var btnX = box.querySelector('.lb__x');
  var btnPrev = box.querySelector('.lb__prev');
  var btnNext = box.querySelector('.lb__next');
  var i = 0;
  var lastFocus = null;

  function show(n) {
    i = (n + imgs.length) % imgs.length;
    var src = imgs[i];
    full.src = src.currentSrc || src.src;
    full.alt = src.alt || '';
    cap.textContent = src.alt || '';
    cap.hidden = !src.alt;
    count.textContent = (i + 1) + ' / ' + imgs.length;
    var solo = imgs.length < 2;
    btnPrev.hidden = solo;
    btnNext.hidden = solo;
    count.hidden = solo;
  }

  function open(n) {
    lastFocus = document.activeElement;
    show(n);
    box.hidden = false;
    document.documentElement.classList.add('lb-open');
    document.documentElement.style.overflow = 'hidden';
    box.focus();
  }

  function close() {
    box.hidden = true;
    full.src = '';
    document.documentElement.classList.remove('lb-open');
    document.documentElement.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  imgs.forEach(function (im, n) {
    im.classList.add('is-zoomable');
    im.setAttribute('tabindex', '0');
    im.setAttribute('role', 'button');
    im.setAttribute('aria-label', 'Open image' + (im.alt ? ': ' + im.alt : ''));
    im.addEventListener('click', function () { open(n); });
    im.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(n); }
    });
  });

  btnX.addEventListener('click', close);
  btnPrev.addEventListener('click', function () { show(i - 1); });
  btnNext.addEventListener('click', function () { show(i + 1); });
  box.addEventListener('click', function (e) { if (e.target === box) close(); });

  document.addEventListener('keydown', function (e) {
    if (box.hidden) return;
    if (e.key === 'Escape') { close(); }
    else if (e.key === 'ArrowLeft') { show(i - 1); }
    else if (e.key === 'ArrowRight') { show(i + 1); }
    else if (e.key === 'Tab') {
      // keep focus inside the dialog
      var f = Array.prototype.filter.call(box.querySelectorAll('button'), function (b) { return !b.hidden; });
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  // swipe on touch
  var x0 = null;
  box.addEventListener('touchstart', function (e) { x0 = e.changedTouches[0].clientX; }, { passive: true });
  box.addEventListener('touchend', function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 50) { show(dx > 0 ? i - 1 : i + 1); }
    x0 = null;
  }, { passive: true });
})();
