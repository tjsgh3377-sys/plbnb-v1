// 개발현황 — 균주 정보 · 특허 현황 · 적용 제품 · 기타 연구 성과 (목록 + 고유 주소 상세페이지)
import { esc, fmtDate, btn, ext, arrow, relatedBlock, slot, img, inquiryCta } from '../lib.mjs';

const searchBox = (id, label, placeholder) => `
  <div class="field">
    <label for="${id}">${label}</label>
    <input type="search" id="${id}" data-search placeholder="${placeholder}" autocomplete="off">
  </div>`;
const selectBox = (id, label, key, options) => `
  <div class="field">
    <label for="${id}">${label}</label>
    <select id="${id}" data-filter="${key}"><option value="">전체</option>${options.map((o) => `<option>${esc(o)}</option>`).join('')}</select>
  </div>`;
const emptyMsg = '<p class="listEmpty" data-empty hidden>조건에 맞는 항목이 없습니다. 검색어나 분류를 바꿔 보세요.</p>';
const backBtn = (href, label) => `<div class="detailFoot"><a class="btn btn--line" href="${href}">${label} 목록으로</a></div>`;

export default function (db) {
  const { site } = db;
  const reg = db.patents.filter((p) => p.status === '등록');
  const app = db.patents.filter((p) => p.status === '출원');
  const pages = [];

  /* ---------- 개발현황 개요 ---------- */
  pages.push({
    path: 'business/development.html', group: 'development', title: '개발현황',
    desc: 'PLBNB 개발현황. 균주 정보, 특허 현황, 적용 제품, 기타 연구 성과를 한곳에서 확인하고 서로 연결된 정보를 따라가 볼 수 있습니다.',
    lead: '균주, 특허, 적용 제품, 연구 성과를 서로 연결해 보여 드립니다.',
    body: `
<section>
  <ul class="hubList">
    <li><a href="@/business/strains.html"><span class="no">01</span><h2>균주 정보</h2><p>공개 균주 ${db.strains.length}종의 학명, 분리원, 연구 내용</p><strong>균주 정보 보기 ${arrow}</strong></a></li>
    <li><a href="@/business/patents.html"><span class="no">02</span><h2>특허 현황</h2><p>등록 ${reg.length}건, 출원 ${app.length}건의 특허 목록과 상세 정보</p><strong>특허 현황 보기 ${arrow}</strong></a></li>
    <li><a href="@/business/products.html"><span class="no">03</span><h2>적용 제품</h2><p>PLBNB 균주·기술이 적용된 고객사 제품 ${db.products.length}건</p><strong>적용 제품 보기 ${arrow}</strong></a></li>
    <li><a href="@/business/achievements.html"><span class="no">04</span><h2>기타 연구 성과</h2><p>연구 논문, 연구 과제, 인증 ${db.achievements.length}건</p><strong>연구 성과 보기 ${arrow}</strong></a></li>
  </ul>
</section>
<section>
  <h2 class="secTit">정보가 연결되는 방식</h2>
  <p class="secLead">하나의 균주에서 관련 특허와 적용 제품, 논문, 언론 보도까지 이어서 확인할 수 있습니다.</p>
  <ol class="process process--link" aria-label="콘텐츠 연결 구조"><li>균주</li><li>특허</li><li>적용 제품</li><li>논문·연구 자료</li><li>언론 보도</li></ol>
</section>
${inquiryCta('찾으시는 균주나 기술이 있으신가요?', '공개되지 않은 균주와 자료는 문의를 통해 안내해 드립니다.', '균주 공급 문의')}`,
  });

  /* ---------- 균주 정보 ---------- */
  pages.push({
    path: 'business/strains.html', group: 'development', item: 'strains', title: '균주 정보', scripts: ['sub.js'],
    desc: `PLBNB가 공개하는 유산균 균주 ${db.strains.length}종. 균주명 검색, 분류·연구 분야 필터로 찾고 관련 특허와 적용 제품을 확인할 수 있습니다.`,
    lead: '균주명을 누르면 연구 내용과 관련 특허, 적용 제품을 확인할 수 있습니다.',
    body: `
<section data-list>
  <form class="filterBar" role="search" aria-label="균주 검색" onsubmit="return false">
    ${searchBox('q-strain', '균주명 검색', '예: PL9988, fermentum')}
    ${selectBox('f-cat', '균주 분류', 'cat', db.strainMeta.categories)}
    ${selectBox('f-field', '연구 분야', 'field', db.strainMeta.fields)}
    <p class="count" aria-live="polite">전체 <strong data-count>${db.strains.length}</strong>종</p>
  </form>
  <ul class="strainList">${db.strains.map((s) => {
    const r = db.rel.of('strains', s.id);
    return `
    <li data-item data-text="${esc([s.name, s.species, s.speciesKo, s.formerName, s.code].join(' ').toLowerCase())}" data-cat="${esc(s.category)}" data-field="${esc(s.fields.join('|'))}">
      <a href="@/business/strains/${s.id}.html">
        <div class="strain__name"><strong>${esc(s.name)}</strong><em>${esc(s.species)}</em><span>${esc(s.speciesKo)}</span></div>
        <div class="strain__body">
          <p>${esc(s.summary)}</p>
          <p class="chips">${s.fields.map((f) => `<span class="chip">${esc(f)}</span>`).join('')}</p>
        </div>
        <dl class="strain__meta"><div><dt>관련 특허</dt><dd>${(r.patents || []).length}건</dd></div><div><dt>적용 제품</dt><dd>${(r.products || []).length}건</dd></div></dl>
        <span class="go">상세보기 ${arrow}</span>
      </a>
    </li>`; }).join('')}
  </ul>
  ${emptyMsg}
  <p class="note">공개된 균주는 보유 균주의 일부입니다. 균주별 연구 내용은 세포·동물·인체 연구 단계의 결과이며, 완제품의 효능이나 기능성 인정과는 구분됩니다.</p>
</section>
${inquiryCta('균주 공급을 검토하고 계신가요?', '용도와 제형을 알려 주시면 적합한 균주를 안내해 드리겠습니다.', '균주 공급 문의')}`,
  });
  for (const s of db.strains) {
    const r = db.rel.of('strains', s.id);
    pages.push({
      path: `business/strains/${s.id}.html`, group: 'development', item: 'strains', crumb: s.name, title: `${s.name} (${s.species}) 균주 정보`, h1: s.name,
      eyebrow: s.species, lead: s.summary,
      desc: `${s.species} ${s.name} 균주 정보. ${s.summary} 관련 특허 ${(r.patents || []).length}건, 적용 제품 ${(r.products || []).length}건.`,
      body: `
<section>
  <h2 class="secTit">기본 정보</h2>
  <dl class="infoTable">
    <div><dt>균주명</dt><dd>${esc(s.name)}</dd></div>
    <div><dt>학명</dt><dd><em>${esc(s.species)}</em> (${esc(s.speciesKo)})${s.formerName ? `<br><span class="sub">이전 학명: <em>${esc(s.formerName)}</em></span>` : ''}</dd></div>
    <div><dt>균주 식별번호</dt><dd>${esc(s.code)}</dd></div>
    <div><dt>균주 분류</dt><dd>${esc(s.category)}</dd></div>
    ${s.origin ? `<div><dt>분리원</dt><dd>${esc(s.origin)}</dd></div>` : ''}
    <div><dt>연구 분야</dt><dd class="chips">${s.fields.map((f) => `<a class="chip" href="@/business/strains.html?field=${encodeURIComponent(f)}">${esc(f)}</a>`).join('')}</dd></div>
  </dl>
</section>
<section>
  <h2 class="secTit">연구 내용</h2>
  <ul class="researchList">${s.research.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
  ${s.note ? `<p class="note">${esc(s.note)}</p>` : ''}
</section>
${relatedBlock(r, ['patents', 'products', 'achievements', 'media', 'columns', 'cases'])}
${inquiryCta(`${s.name} 균주가 필요하신가요?`, '공급 조건과 시료 제공은 문의를 통해 안내해 드립니다.', '균주 공급 문의')}
${backBtn('@/business/strains.html', '균주 정보')}`,
    });
  }

  /* ---------- 특허 현황 ---------- */
  const strainNames = (p) => { const ss = db.rel.of('patents', p.id).strains || []; return ss.length ? ss.map((s) => s.name).join(', ') : (p.strainText || '—'); };
  pages.push({
    path: 'business/patents.html', group: 'development', item: 'patents', title: '특허 현황', scripts: ['sub.js'],
    desc: `PLBNB 특허 현황. 등록 특허 ${reg.length}건과 공개 가능한 출원 ${app.length}건을 특허명, 번호, 관련 균주로 검색할 수 있습니다.`,
    lead: `등록 ${reg.length}건, 출원 ${app.length}건. 특허명을 누르면 상세 정보와 관련 균주·적용 제품을 확인할 수 있습니다.`,
    body: `
<section data-list>
  <div class="tabs" role="group" aria-label="특허 상태 선택">
    <button type="button" class="on" data-tab="status" data-value="" aria-pressed="true">전체 <span>${db.patents.length}</span></button>
    <button type="button" data-tab="status" data-value="등록" aria-pressed="false">등록 특허 <span>${reg.length}</span></button>
    <button type="button" data-tab="status" data-value="출원" aria-pressed="false">출원 <span>${app.length}</span></button>
  </div>
  <form class="filterBar" role="search" aria-label="특허 검색" onsubmit="return false">
    ${searchBox('q-patent', '특허명 · 특허번호 · 관련 균주 검색', '예: 비타민, 10-2973622, PL186')}
    <p class="count" aria-live="polite">검색 결과 <strong data-count>${db.patents.length}</strong>건</p>
  </form>
  <ol class="patentList">${db.patents.map((p) => `
    <li data-item data-status="${esc(p.status)}" data-text="${esc([p.title, p.titleEn, p.number, p.number.replace(/-/g, ''), strainNames(p)].join(' ').toLowerCase())}">
      <span class="badge badge--${p.status === '등록' ? 'reg' : 'app'}">${esc(p.status)}</span>
      <div class="patent__main">
        <h2><a href="@/business/patents/${p.id}.html">${esc(p.title)}</a></h2>
        <dl>
          <div><dt>${p.status === '등록' ? '특허번호' : '출원번호'}</dt><dd>제 ${esc(p.number)} 호</dd></div>
          <div><dt>${p.status === '등록' ? '등록일' : '출원일'}</dt><dd><time datetime="${p.date}">${fmtDate(p.date)}</time></dd></div>
          <div><dt>관련 균주</dt><dd>${esc(strainNames(p))}</dd></div>
        </dl>
      </div>
      <a class="btn btn--line btn--sm" href="@/business/patents/${p.id}.html" aria-label="${esc(p.title)} 상세보기">상세보기 ${arrow}</a>
    </li>`).join('')}
  </ol>
  ${emptyMsg}
  <p class="note">출원 정보는 공개 가능한 범위만 게시합니다. 권리 관계와 실시 조건은 문의해 주시기 바랍니다.</p>
</section>
${inquiryCta('특허 기술의 활용을 검토하고 계신가요?', '기술이전과 기술 협력 방안을 안내해 드리겠습니다.', '기술 협력 문의')}`,
  });
  for (const p of db.patents) {
    const r = db.rel.of('patents', p.id);
    const isReg = p.status === '등록';
    pages.push({
      path: `business/patents/${p.id}.html`, group: 'development', item: 'patents', crumb: `제 ${p.number} 호`, title: `[${p.status}특허 ${p.number}] ${p.title}`, h1: p.title,
      eyebrow: `${p.status} 특허 · 제 ${p.number} 호`, scripts: p.certImage ? ['sub.js'] : [],
      desc: `${p.status} 특허 제 ${p.number} 호 「${p.title}」. ${p.summary}`,
      body: `
<section>
  <h2 class="secTit">특허 정보</h2>
  <dl class="infoTable">
    <div><dt>특허명</dt><dd>${esc(p.title)}${p.titleEn ? `<br><span class="sub">${esc(p.titleEn)}</span>` : ''}</dd></div>
    <div><dt>상태</dt><dd><span class="badge badge--${isReg ? 'reg' : 'app'}">${esc(p.status)}</span></dd></div>
    <div><dt>${isReg ? '특허번호' : '출원번호'}</dt><dd>제 ${esc(p.number)} 호</dd></div>
    <div><dt>${isReg ? '등록일' : '출원일'}</dt><dd><time datetime="${p.date}">${fmtDate(p.date)}</time></dd></div>
    ${p.appNumber ? `<div><dt>출원번호</dt><dd>제 ${esc(p.appNumber)} 호 (${fmtDate(p.appDate)} 출원)</dd></div>` : ''}
    <div><dt>관련 균주</dt><dd>${(r.strains || []).length ? r.strains.map((s) => `<a class="chip" href="@/business/strains/${s.id}.html">${esc(s.name)}</a>`).join('') : esc(p.strainText || '—')}</dd></div>
  </dl>
</section>
<section>
  <h2 class="secTit">특허 개요</h2>
  <p class="prose">${esc(p.summary)}</p>
</section>
${p.certImage ? `
<section>
  <h2 class="secTit">특허증</h2>
  <figure class="cert">
    <button type="button" data-zoom="@/${p.certImage}" aria-label="특허증 크게 보기">${img(p.certImage, `특허 제 ${p.number} 호 특허증`, '', 1190, 1682)}<span>크게 보기</span></button>
  </figure>
  ${p.certPdf ? `<div class="btnRow">${ext(`@/${p.certPdf}`, '특허증 PDF 열기')}</div>` : ''}
</section>` : ''}
${relatedBlock(r, ['strains', 'products', 'achievements', 'media', 'columns', 'cases'])}
${(p.links || []).length ? `<section><h2 class="secTit">외부 자료</h2><div class="btnRow">${p.links.map((l) => ext(l.url, l.label)).join('')}</div></section>` : ''}
${backBtn('@/business/patents.html', '특허 현황')}`,
    });
  }

  /* ---------- 적용 제품 ---------- */
  pages.push({
    path: 'business/products.html', group: 'development', item: 'products', title: '적용 제품',
    desc: `PLBNB의 균주와 기술이 고객사 제품에 적용된 사례 ${db.products.length}건. 제품별 적용 균주와 관련 특허, 언론 보도를 확인할 수 있습니다.`,
    lead: 'PLBNB의 균주와 기술이 고객사 제품에 적용된 사례입니다. 완제품의 개발·제조·판매는 각 고객사가 수행합니다.',
    body: `
<section>
  <ul class="productList">${db.products.map((p) => {
    const r = db.rel.of('products', p.id);
    return `
    <li>
      <div class="product__img">${p.image ? img(p.image, `${p.company} ${p.name}`) : slot(`${p.company} ${p.name}`)}</div>
      <div class="product__body">
        <p class="company">${esc(p.company)} <span>${esc(p.category)}</span></p>
        <h2><a href="@/business/products/${p.id}.html">${esc(p.name)}</a></h2>
        <dl>
          <div><dt>적용 균주</dt><dd>${(r.strains || []).map((s) => `<a class="chip" href="@/business/strains/${s.id}.html">${esc(s.name)}</a>`).join('') || '—'}</dd></div>
          <div><dt>관련 연구·기술</dt><dd>${esc(p.techText)}</dd></div>
        </dl>
        <a class="btn btn--line btn--sm" href="@/business/products/${p.id}.html" aria-label="${esc(p.name)} 상세보기">상세보기 ${arrow}</a>
      </div>
    </li>`; }).join('')}
  </ul>
  <p class="note">제품명과 브랜드는 각 회사의 자산입니다. 제품의 구성과 판매 여부는 시점에 따라 달라질 수 있으며, 정확한 정보는 각 회사의 공식 안내를 확인해 주시기 바랍니다.</p>
</section>
${inquiryCta('제품에 적용할 균주를 찾고 계신가요?', '제품 유형에 맞는 균주와 적용 연구를 안내해 드리겠습니다.', '적용 제품 관련 문의')}`,
  });
  for (const p of db.products) {
    const r = db.rel.of('products', p.id);
    pages.push({
      path: `business/products/${p.id}.html`, group: 'development', item: 'products', crumb: p.name, title: `${p.company} ${p.name} | 적용 제품`, h1: p.name,
      eyebrow: `${p.company} · ${p.category}`, lead: p.summary,
      desc: `${p.company} ${p.name}에 적용된 PLBNB 균주와 기술. ${p.summary}`,
      body: `
<section class="split">
  <div class="split__media">${p.image ? img(p.image, `${p.company} ${p.name}`) : slot(`${p.company} ${p.name}`, 'imgSlot--lg')}</div>
  <div class="split__text">
    <h2 class="secTit">제품 정보</h2>
    <dl class="infoTable infoTable--stack">
      <div><dt>제품명</dt><dd>${esc(p.name)}</dd></div>
      <div><dt>고객사</dt><dd>${esc(p.company)}</dd></div>
      <div><dt>분류</dt><dd>${esc(p.category)}</dd></div>
      <div><dt>적용 균주</dt><dd>${(r.strains || []).map((s) => `<a class="chip" href="@/business/strains/${s.id}.html">${esc(s.name)} · ${esc(s.species)}</a>`).join('') || '—'}</dd></div>
      <div><dt>적용 기술</dt><dd>${esc(p.techText)}</dd></div>
    </dl>
    ${p.officialUrl ? `<div class="btnRow">${ext(p.officialUrl, '공식 제품 페이지')}</div>` : ''}
  </div>
</section>
<p class="note">이 제품은 ${esc(p.company)}의 제품입니다. ${esc(site.name)}는 균주와 관련 기술을 제공했으며, 완제품의 개발·제조·판매는 ${esc(p.company)}가 수행합니다.</p>
${relatedBlock(r, ['strains', 'patents', 'media', 'achievements', 'cases', 'columns'])}
${backBtn('@/business/products.html', '적용 제품')}`,
    });
  }

  /* ---------- 기타 연구 성과 ---------- */
  pages.push({
    path: 'business/achievements.html', group: 'development', item: 'achievements', title: '기타 연구 성과', scripts: ['sub.js'],
    desc: `PLBNB의 연구 논문, 연구 과제, 인증 등 연구 성과 ${db.achievements.length}건을 연도별로 소개합니다.`,
    lead: '특허와 적용 제품 외의 연구 성과를 모았습니다.',
    body: `
<section data-list>
  <div class="tabs" role="group" aria-label="연구 성과 분류 선택">
    <button type="button" class="on" data-tab="type" data-value="" aria-pressed="true">전체 <span>${db.achievements.length}</span></button>
    ${db.achMeta.types.filter((t) => db.achievements.some((a) => a.type === t)).map((t) => `<button type="button" data-tab="type" data-value="${esc(t)}" aria-pressed="false">${esc(t)} <span>${db.achievements.filter((a) => a.type === t).length}</span></button>`).join('')}
  </div>
  <ol class="achList">${db.achievements.map((a) => `
    <li data-item data-type="${esc(a.type)}" data-text="${esc([a.title, a.source].join(' ').toLowerCase())}">
      <span class="year">${a.year}</span>
      <div>
        <p class="kind">${esc(a.type)}</p>
        <h2><a href="@/business/achievements/${a.id}.html">${esc(a.title)}</a></h2>
        ${a.source ? `<p class="src">${esc(a.source)}</p>` : ''}
      </div>
      <a class="btn btn--line btn--sm" href="@/business/achievements/${a.id}.html" aria-label="${esc(a.title)} 상세보기">상세보기 ${arrow}</a>
    </li>`).join('')}
  </ol>
  ${emptyMsg}
</section>`,
  });
  for (const a of db.achievements) {
    const r = db.rel.of('achievements', a.id);
    pages.push({
      path: `business/achievements/${a.id}.html`, group: 'development', item: 'achievements', crumb: `${a.year} ${a.type}`, title: `${a.title} | ${a.type}`, h1: a.title,
      eyebrow: `${a.type} · ${a.year}`,
      desc: `${a.type} (${a.year}) ${a.title}. ${a.summary}`,
      body: `
<section>
  <dl class="infoTable">
    <div><dt>분류</dt><dd>${esc(a.type)}</dd></div>
    <div><dt>연도</dt><dd>${a.year}</dd></div>
    ${a.source ? `<div><dt>${a.type === '연구 논문' ? '게재지' : '기관'}</dt><dd>${esc(a.source)}</dd></div>` : ''}
  </dl>
</section>
<section>
  <h2 class="secTit">내용</h2>
  <p class="prose">${esc(a.summary)}</p>
  <div class="btnRow">${a.url ? ext(a.url, a.type === '연구 논문' ? '논문 원문 보기' : '관련 자료 보기') : ''}${(a.files || []).map((f) => ext(`@/${f.path}`, f.label)).join('')}</div>
</section>
${relatedBlock(r, ['strains', 'patents', 'products', 'media', 'columns'])}
${backBtn('@/business/achievements.html', '연구 성과')}`,
    });
  }

  return pages;
}
