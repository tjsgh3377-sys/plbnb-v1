/* PLBNB main.js — 공통 스크립트: 메가 메뉴 · 모바일 아코디언 메뉴 · 협력사 흐름 · 스크롤 등장 · 맨 위로 */
(function () {
  'use strict';
  document.documentElement.classList.add('js');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- PC 메가 메뉴 (마우스 · 키보드) ---------- */
  var header = document.getElementById('header');
  var gnb = document.getElementById('gnb');
  if (header && gnb) {
    var closeTimer;
    var open = function () { clearTimeout(closeTimer); header.classList.add('gnb-open'); };
    var close = function () { closeTimer = setTimeout(function () { header.classList.remove('gnb-open'); }, 120); };
    gnb.addEventListener('mouseenter', open);
    header.addEventListener('mouseleave', close);
    gnb.addEventListener('focusin', open);
    gnb.addEventListener('focusout', function (e) { if (!gnb.contains(e.relatedTarget)) close(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && header.classList.contains('gnb-open')) { header.classList.remove('gnb-open'); if (gnb.contains(document.activeElement)) document.activeElement.blur(); }
    });
  }

  /* ---------- 모바일 메뉴 (대메뉴 아코디언) ---------- */
  var mNav = document.getElementById('mNav');
  var openBtn = document.querySelector('.mobileMenuBtn');
  if (mNav && openBtn) {
    var setNav = function (show) {
      mNav.hidden = !show;
      openBtn.setAttribute('aria-expanded', String(show));
      document.body.classList.toggle('nav-open', show);
      if (show) mNav.querySelector('.mNavClose').focus(); else openBtn.focus();
    };
    openBtn.addEventListener('click', function () { setNav(true); });
    mNav.querySelector('.mNavClose').addEventListener('click', function () { setNav(false); });
    mNav.querySelectorAll('.mDep1').forEach(function (b) {
      b.addEventListener('click', function () {
        var willOpen = b.getAttribute('aria-expanded') !== 'true';
        mNav.querySelectorAll('.mDep1').forEach(function (o) { o.setAttribute('aria-expanded', 'false'); document.getElementById(o.getAttribute('aria-controls')).hidden = true; });
        b.setAttribute('aria-expanded', String(willOpen));
        document.getElementById(b.getAttribute('aria-controls')).hidden = !willOpen;
      });
    });
    document.addEventListener('keydown', function (e) {
      if (mNav.hidden) return;
      if (e.key === 'Escape') { setNav(false); return; }
      if (e.key !== 'Tab') return; /* 메뉴 안에서만 초점 이동 */
      var f = mNav.querySelectorAll('a[href], button:not([disabled])');
      var list = Array.prototype.filter.call(f, function (el) { return el.offsetParent !== null; });
      if (!list.length) return;
      if (e.shiftKey && document.activeElement === list[0]) { e.preventDefault(); list[list.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === list[list.length - 1]) { e.preventDefault(); list[0].focus(); }
    });
    window.matchMedia('(min-width: 1101px)').addEventListener('change', function (e) { if (e.matches && !mNav.hidden) setNav(false); });
  }

  /* ---------- 협력사 흐름 (자동 이동 · 마우스/초점 시 정지 · 화살표 이동) ---------- */
  var GAP = 24, SPEED = 40; /* px/s */
  var desktop = window.matchMedia('(min-width: 768px)');
  document.querySelectorAll('.matWrap').forEach(function (box) {
    var el = box.querySelector('.matMarquee');
    var wrap = el && el.querySelector('.swiper-wrapper');
    if (!wrap || !desktop.matches) return; /* 모바일은 손가락 가로 스크롤 */
    var setW = wrap.scrollWidth + GAP;
    var originals = Array.prototype.slice.call(wrap.children);
    var container = el.getBoundingClientRect().width || 1200;
    while (wrap.scrollWidth < setW + container + 100) {
      originals.forEach(function (s) { var c = s.cloneNode(true); c.setAttribute('aria-hidden', 'true'); wrap.appendChild(c); });
    }
    var pos = 0, paused = false, tween = null, last = null;
    var step = originals[0].getBoundingClientRect().width + GAP;
    var apply = function () { wrap.style.transform = 'translateX(' + (-((pos % setW) + setW) % setW) + 'px)'; };
    var tick = function (t) {
      if (last !== null && !paused && !tween && !reduceMotion) { pos += SPEED * Math.min(t - last, 100) / 1000; apply(); }
      if (tween) {
        var k = Math.min((t - tween.t0) / 300, 1);
        pos = tween.from + (tween.to - tween.from) * (1 - Math.pow(1 - k, 3)); apply();
        if (k >= 1) tween = null;
      }
      last = t; requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    box.addEventListener('mouseenter', function () { paused = true; });
    box.addEventListener('mouseleave', function () { paused = false; });
    box.addEventListener('focusin', function () { paused = true; });
    box.addEventListener('focusout', function () { paused = false; });
    var jump = function (dir) {
      var from = tween ? tween.to : pos;
      if (reduceMotion) { pos = from + dir * step; tween = null; apply(); return; }
      tween = { from: pos, to: from + dir * step, t0: performance.now() };
    };
    box.querySelector('.matArrow.prev').addEventListener('click', function () { jump(-1); });
    box.querySelector('.matArrow.next').addEventListener('click', function () { jump(1); });
  });

  /* ---------- 스크롤 등장 ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) reveals.forEach(function (el) { el.classList.add('in-view'); });
    else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in-view'); io.unobserve(en.target); } });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      reveals.forEach(function (el) { io.observe(el); });
    }
  }

  /* ---------- 맨 위로 ---------- */
  var top = document.querySelector('.topBtn');
  if (top) top.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    var logo = document.querySelector('#header .logo'); if (logo) logo.focus({ preventScroll: true });
  });
})();
