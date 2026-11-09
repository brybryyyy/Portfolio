(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(pointer: fine)').matches;
  var projects = Array.isArray(window.PROJECTS) ? window.PROJECTS : [];

  var ICON_ARROW = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12h18M14 5l7 7-7 7"/></svg>';

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }
  function pad(n) { return (n < 10 ? '0' : '') + n; }

  // Footer year
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Project cards ---------- */
  var list = document.getElementById('projects');

  projects.forEach(function (p, i) {
    var screens = p.screens || [];
    var coverSrc = p.cover || (screens[0] && screens[0].src) || '';

    var card = el('button', 'project reveal');
    card.type = 'button';
    card.style.setProperty('--d', (i * 120) + 'ms');
    card.setAttribute('aria-label', 'View the screens of ' + p.title);

    var thumb = el('div', 'p-thumb');
    thumb.appendChild(el('div', 'p-ph', '[Add cover image: ' + coverSrc + ']'));
    if (coverSrc) {
      var img = new Image();
      img.alt = '';
      img.loading = 'lazy';
      img.draggable = false;
      img.onerror = function () { img.remove(); };
      img.src = coverSrc;
      thumb.appendChild(img);
    }
    var open = el('div', 'p-open');
    open.appendChild(document.createTextNode('VIEW SCREENS'));
    thumb.appendChild(open);
    thumb.appendChild(el('span', 'p-badge', screens.length + ' SCREENS'));
    card.appendChild(thumb);

    var row = el('div', 'p-row');
    row.appendChild(el('span', 'p-num', pad(i + 1)));
    var meta = el('div', 'p-meta');
    meta.appendChild(el('strong', '', p.title));
    meta.appendChild(el('small', '', p.type));
    row.appendChild(meta);
    var arrow = el('span', 'p-arrow');
    arrow.innerHTML = ICON_ARROW;
    row.appendChild(arrow);
    card.appendChild(row);

    card.addEventListener('click', function () { openViewer(i); });
    if (list) list.appendChild(card);
  });

  /* ---------- Screens viewer ---------- */
  var dlg = document.getElementById('viewer');
  var vImg = document.getElementById('vImg');
  var vCap = document.getElementById('vCap');
  var vNum = document.getElementById('vNum');
  var vTitle = document.getElementById('vTitle');
  var vType = document.getElementById('vType');
  var vSummary = document.getElementById('vSummary');
  var vRole = document.getElementById('vRole');
  var vTools = document.getElementById('vTools');
  var vCount = document.getElementById('vCount');
  var vThumbs = document.getElementById('vThumbs');
  var vPrev = document.getElementById('vPrev');
  var vNext = document.getElementById('vNext');
  var vClose = document.getElementById('vClose');

  var projIndex = 0;
  var current = 0;
  var screens = [];

  function placeholder(s) {
    return el('div', 'v-ph', '[Add this screen: ' + (s && s.src ? s.src : 'assets/...') + ']');
  }

  function showScreen(n) {
    if (!screens.length) {
      vImg.replaceChildren(placeholder(null));
      vCap.textContent = '';
      vCount.textContent = '';
      return;
    }
    current = (n + screens.length) % screens.length;
    var s = screens[current];

    var holder = placeholder(s);
    vImg.replaceChildren(holder);
    var img = new Image();
    img.alt = s.caption || (projects[projIndex].title + ' screen ' + (current + 1));
    img.draggable = false;
    img.onload = function () { vImg.replaceChildren(img); };
    img.src = s.src;

    vCap.textContent = s.caption || '';
    vCount.textContent = 'SCREEN ' + pad(current + 1) + ' / ' + pad(screens.length);
    Array.prototype.forEach.call(vThumbs.children, function (t, idx) {
      if (idx === current) t.setAttribute('aria-current', 'true');
      else t.removeAttribute('aria-current');
    });
  }

  function openViewer(i) {
    var p = projects[i];
    if (!p || !dlg || typeof dlg.showModal !== 'function') return;
    projIndex = i;
    screens = p.screens || [];

    vNum.textContent = pad(i + 1);
    vTitle.textContent = p.title;
    vType.textContent = p.type || '';
    vSummary.textContent = p.summary || '';
    vRole.textContent = p.role || '';
    vTools.textContent = (p.tools || []).join(' · ');

    vThumbs.replaceChildren();
    screens.forEach(function (s, idx) {
      var b = el('button', 'v-thumb', pad(idx + 1));
      b.type = 'button';
      b.setAttribute('aria-label', 'Show screen ' + (idx + 1) + (s.caption ? ': ' + s.caption : ''));
      var t = new Image();
      t.alt = '';
      t.draggable = false;
      t.onerror = function () { t.remove(); };
      t.src = s.src;
      b.appendChild(t);
      b.addEventListener('click', function () { showScreen(idx); });
      vThumbs.appendChild(b);
    });

    var many = screens.length > 1;
    vPrev.hidden = !many;
    vNext.hidden = !many;

    showScreen(0);
    dlg.showModal();
    document.body.style.overflow = 'hidden';
  }

  if (dlg) {
    vPrev.addEventListener('click', function () { showScreen(current - 1); });
    vNext.addEventListener('click', function () { showScreen(current + 1); });
    vClose.addEventListener('click', function () { dlg.close(); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener('close', function () { document.body.style.overflow = ''; });
    dlg.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); showScreen(current - 1); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); showScreen(current + 1); }
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (node) { revealObserver.observe(node); });
  } else {
    reveals.forEach(function (node) { node.classList.add('in'); });
  }

  /* ---------- Count-up numbers ---------- */
  var counters = document.querySelectorAll('[data-count]');
  function runCounter(node) {
    var target = parseInt(node.getAttribute('data-count'), 10) || 0;
    if (reduceMotion) { node.textContent = target; return; }
    var start = null;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / 1300, 1);
      node.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          runCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (node) { counterObserver.observe(node); });
  } else {
    counters.forEach(function (node) { node.textContent = node.getAttribute('data-count'); });
  }

  /* ---------- Fit the giant headline texts to the screen width ---------- */
  var megaText = document.getElementById('megaText');
  var megaFoot = document.getElementById('megaFoot');
  var megaFootText = document.getElementById('megaFootText');
  function fitText(box, span, cap) {
    if (!box || !span) return;
    box.style.fontSize = '100px';
    var natural = span.getBoundingClientRect().width;
    var target = box.clientWidth * 0.97;
    if (natural > 0) {
      box.style.fontSize = Math.max(60, Math.min(cap, (100 * target) / natural)) + 'px';
    }
  }
  function fitAll() {
    fitText(mega, megaText, 340);
    fitText(megaFoot, megaFootText, 340);
  }

  /* ---------- Scroll progress and hero parallax ---------- */
  var progress = document.getElementById('progress');
  var mega = document.getElementById('mega');
  var heroPhoto = document.getElementById('heroPhoto');
  var ticking = false;

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.transform = 'scaleX(' + (max > 0 ? Math.min(y / max, 1) : 0) + ')';
    if (!reduceMotion && y < window.innerHeight * 1.3) {
      if (mega) mega.style.transform = 'translateY(' + (y * 0.3) + 'px)';
      if (heroPhoto) heroPhoto.style.transform = 'translateY(' + (y * -0.06) + 'px)';
    }
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();
  fitAll();
  window.addEventListener('resize', fitAll);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitAll);

  /* ---------- Cursor spotlight on cards (mouse only) ---------- */
  if (finePointer && !reduceMotion) {
    document.querySelectorAll('.spot').forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        card.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
  }

  /* ---------- Highlight current section in the nav ---------- */
  var navLinks = document.querySelectorAll('.topbar nav a');
  var sections = ['work', 'about', 'skills', 'contact']
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);
  if ('IntersectionObserver' in window) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (a) {
            a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { navObserver.observe(s); });
  }
})();
