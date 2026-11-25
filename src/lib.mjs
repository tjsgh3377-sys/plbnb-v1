// 공통 유틸 — 문자열 이스케이프, 날짜, 아이콘, 콘텐츠 연결(관계) 처리
export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const fmtDate = (d) => (d ? String(d).replace(/-/g, '.') : '');
export const arrow = '<svg class="ic" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
export const extIcon = '<svg class="ic" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/></svg>';
export const btn = (href, label, cls = 'btn') => `<a class="${cls}" href="${href}">${esc(label)} ${arrow}</a>`;
export const ext = (href, label, cls = 'btn btn--line') => `<a class="${cls}" href="${esc(href)}" target="_blank" rel="noopener noreferrer">${esc(label)} ${extIcon}<span class="sr-only">(새 창)</span></a>`;
export const paras = (arr) => (arr || []).map((p) => `<p>${esc(p)}</p>`).join('\n');

// 콘텐츠 종류별 주소·이름 규칙
export const TYPES = {
  strains: { label: '관련 균주', url: (i) => `@/business/strains/${i.id}.html`, text: (i) => `${i.name} · ${i.species}` },
  patents: { label: '관련 특허', url: (i) => `@/business/patents/${i.id}.html`, text: (i) => `[${i.status}] ${i.title}`, sub: (i) => `제 ${i.number} 호` },
  products: { label: '관련 적용 제품', url: (i) => `@/business/products/${i.id}.html`, text: (i) => `${i.name}`, sub: (i) => i.company },
  achievements: { label: '관련 연구 자료', url: (i) => `@/business/achievements/${i.id}.html`, text: (i) => i.title, sub: (i) => i.source },
  media: { label: '관련 언론 보도', url: (i) => `@/board/media/${i.id}.html`, text: (i) => i.title, sub: (i) => `${i.press} · ${fmtDate(i.date)}` },
  columns: { label: '관련 연구 칼럼', url: (i) => `@/board/column/${i.id}.html`, text: (i) => i.title, sub: (i) => fmtDate(i.date) },
  cases: { label: '관련 협력 사례', url: (i) => `@/partners/cases.html#${i.id}`, text: (i) => i.title, sub: (i) => i.partner },
};

// 관계를 양방향으로 정리한다. 한쪽에만 적어도 반대쪽 상세페이지에 자동으로 나타나고,
// 비공개(published:false)·삭제된 항목은 연결에서 빠진다. 연결 기준은 제목이 아니라 id.
export function buildRelations(db) {
  const index = new Map();
  for (const type of Object.keys(TYPES)) for (const item of db[type] || []) index.set(`${type}:${item.id}`, { type, item });
  const edges = new Map();
  const add = (a, b) => { if (!edges.has(a)) edges.set(a, new Set()); edges.get(a).add(b); };
  const missing = [];
  for (const [key, { item }] of index) {
    for (const [t, ids] of Object.entries(item.related || {})) for (const id of ids) {
      const other = `${t}:${id}`;
      if (!index.has(other)) { missing.push(`${key} → ${other}`); continue; }
      add(key, other); add(other, key);
    }
  }
  const of = (type, id) => {
    const out = {};
    for (const k of edges.get(`${type}:${id}`) || []) { const n = index.get(k); (out[n.type] ||= []).push(n.item); }
    return out;
  };
  return { of, missing };
}

export function relatedBlock(rel, order = Object.keys(TYPES), title = '관련 콘텐츠') {
  const groups = order.filter((t) => rel[t]?.length).map((t) => `
    <div class="relGroup">
      <h3>${TYPES[t].label}</h3>
      <ul class="relList">${rel[t].map((i) => `
        <li><a href="${TYPES[t].url(i)}"><span class="t">${esc(TYPES[t].text(i))}</span>${TYPES[t].sub ? `<span class="s">${esc(TYPES[t].sub(i))}</span>` : ''}${arrow}</a></li>`).join('')}
      </ul>
    </div>`);
  if (!groups.length) return '';
  return `<section class="related" aria-labelledby="relTit"><h2 id="relTit" class="secTit">${esc(title)}</h2>${groups.join('')}</section>`;
}

// 이미지가 아직 없는 자리. 사진이 준비되면 데이터에 경로만 넣으면 교체된다.
export const slot = (label, cls = '') => `<div class="imgSlot ${cls}" role="img" aria-label="${esc(label)} (이미지 준비 중)"><span>${esc(label)}</span><small>이미지 준비 중</small></div>`;
export const img = (src, alt, cls = '', w, h) => `<img class="${cls}" src="@/${src}" alt="${esc(alt)}" loading="lazy"${w ? ` width="${w}" height="${h}"` : ''}>`;

export const inquiryCta = (title, text, type) => `
<section class="cta">
  <div>
    <h2>${esc(title)}</h2>
    <p>${esc(text)}</p>
  </div>
  <a class="btn btn--white" href="@/support/contact.html${type ? `?type=${encodeURIComponent(type)}` : ''}">${type ? esc(type) + '하기' : '온라인 문의하기'} ${arrow}</a>
</section>`;
