/* PLBNB sub.js — 목록 검색 · 필터 · 탭 · 페이지 나누기, 특허증 확대 보기
   목록은 HTML에 모두 들어 있고(검색엔진·스크립트 미사용 환경 대응), 여기서는 보이기/숨기기만 한다. */
(function () {
  'use strict';

  document.querySelectorAll('[data-list]').forEach(function (root) {
    var items = Array.prototype.slice.call(root.querySelectorAll('[data-item]'));
    var search = root.querySelector('[data-search]');
    var selects = Array.prototype.slice.call(root.querySelectorAll('[data-filter]'));
    var tabs = Array.prototype.slice.call(root.querySelectorAll('[data-tab]'));
    var countEl = root.querySelector('[data-count]');
    var emptyEl = root.querySelector('[data-empty]');
    var pagerEl = root.querySelector('[data-pager]');
    var pageSize = parseInt(root.getAttribute('data-page-size'), 10) || 0;
    var state = { q: '', filters: {}, page: 1 };

    /* 주소의 ?field=… 같은 값으로 초기 필터 지정 (다른 페이지에서 넘어온 경우) */
    var params = new URLSearchParams(location.search);
    selects.forEach(function (s) {
      var v = params.get(s.getAttribute('data-filter'));
      if (v && Array.prototype.some.call(s.options, function (o) { return o.value === v || o.text === v; })) s.value = v;
      state.filters[s.getAttribute('data-filter')] = s.value;
    });
    if (search && params.get('q')) { search.value = params.get('q'); state.q = search.value.trim().toLowerCase(); }

    function match(el) {
      if (state.q && (el.getAttribute('data-text') || '').indexOf(state.q) === -1) return false;
      for (var k in state.filters) {
        var want = state.filters[k];
        if (want && (el.getAttribute('data-' + k) || '').split('|').indexOf(want) === -1) return false;
      }
      return true;
    }
    function render() {
      var shown = items.filter(match);
      var pages = pageSize ? Math.max(1, Math.ceil(shown.length / pageSize)) : 1;
      if (state.page > pages) state.page = pages;
      items.forEach(function (el) { el.hidden = true; });
      shown.forEach(function (el, i) { el.hidden = pageSize ? (i < (state.page - 1) * pageSize || i >= state.page * pageSize) : false; });
      if (countEl) countEl.textContent = shown.length;
      if (emptyEl) emptyEl.hidden = shown.length > 0;
      if (pagerEl) drawPager(pages);
    }
    function drawPager(pages) {
      pagerEl.hidden = pages < 2;
      pagerEl.textContent = '';
      if (pages < 2) return;
      var add = function (label, page, opts) {
        var b = document.createElement('button');
        b.type = 'button'; b.textContent = label;
        if (opts && opts.aria) b.setAttribute('aria-label', opts.aria);
        if (opts && opts.current) b.setAttribute('aria-current', 'page');
        if (opts && opts.disabled) b.disabled = true;
        b.addEventListener('click', function () { state.page = page; render(); root.scrollIntoView({ block: 'start' }); });
        pagerEl.appendChild(b);
      };
      add('‹', state.page - 1, { aria: '이전 페이지', disabled: state.page === 1 });
      for (var p = 1; p <= pages; p++) add(String(p), p, { aria: p + '페이지', current: p === state.page });
      add('›', state.page + 1, { aria: '다음 페이지', disabled: state.page === pages });
    }

    if (search) search.addEventListener('input', function () { state.q = search.value.trim().toLowerCase(); state.page = 1; render(); });
    selects.forEach(function (s) { s.addEventListener('change', function () { state.filters[s.getAttribute('data-filter')] = s.value; state.page = 1; render(); }); });
    tabs.forEach(function (t) {
      t.addEventListener('click', function () {
        tabs.forEach(function (o) { var on = o === t; o.classList.toggle('on', on); o.setAttribute('aria-pressed', String(on)); });
        state.filters[t.getAttribute('data-tab')] = t.getAttribute('data-value'); state.page = 1; render();
      });
    });
    render();
  });

  /* ---------- 특허증 확대 보기 ---------- */
  document.querySelectorAll('[data-zoom]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (!window.HTMLDialogElement) { window.open(btn.getAttribute('data-zoom'), '_blank', 'noopener'); return; }
      var dlg = document.createElement('dialog');
      dlg.className = 'zoomDlg';
      dlg.setAttribute('aria-label', '특허증 확대 보기');
      var img = document.createElement('img');
      img.src = btn.getAttribute('data-zoom');
      img.alt = (btn.querySelector('img') || {}).alt || '';
      var x = document.createElement('button');
      x.type = 'button'; x.setAttribute('aria-label', '닫기'); x.textContent = '×';
      x.addEventListener('click', function () { dlg.close(); });
      dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
      dlg.addEventListener('close', function () { dlg.remove(); btn.focus(); });
      dlg.appendChild(x); dlg.appendChild(img);
      document.body.appendChild(dlg);
      dlg.showModal();
    });
  });
})();
