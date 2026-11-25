// 협력사 — 협력사 소개 · 협력 사례 · 사업 제휴 문의
import { esc, btn, ext, arrow, relatedBlock, inquiryCta } from '../lib.mjs';
import { inquiryForm } from './support.mjs';

export default function (db) {
  const { site } = db;
  const fields = [...new Set(db.partners.map((p) => p.field))];

  const list = {
    path: 'partners/index.html', group: 'partners', item: 'partners', title: '협력사 소개',
    desc: `PLBNB와 함께하는 협력사 ${db.partners.length}곳. 기업명, 협력 분야, 제품 브랜드를 소개합니다.`,
    lead: 'PLBNB의 균주와 기술이 닿아 있는 기업들입니다.',
    body: `
<section>
  <table class="partnerTable">
    <caption class="sr-only">협력사 목록: 기업명, 협력 분야, 제품 브랜드, 협력 내용</caption>
    <thead><tr><th scope="col">기업명</th><th scope="col">협력 분야</th><th scope="col">제품 브랜드</th><th scope="col">협력 내용</th></tr></thead>
    <tbody>${db.partners.map((p) => `
      <tr id="${p.id}">
        <th scope="row">${p.logo ? `<img src="@/${p.logo}" alt="" loading="lazy">` : ''}<span class="wordmark">${esc(p.company)}</span></th>
        <td data-th="협력 분야">${esc(p.field)}</td>
        <td data-th="제품 브랜드">${p.brands.length ? p.brands.map((b, i) => (p.products && p.products[i]) ? `<a class="chip" href="@/business/products/${p.products[i]}.html">${esc(b)}</a>` : `<span class="chip">${esc(b)}</span>`).join('') : '—'}</td>
        <td data-th="협력 내용">${p.summary ? `<span class="sum">${esc(p.summary)}</span>` : ''}${p.url ? ext(p.url, '공식 홈페이지', 'textLink') : ''}${!p.summary && !p.url ? '—' : ''}</td>
      </tr>`).join('')}
    </tbody>
  </table>
  <p class="note">기업명과 제품 브랜드를 구분해 표기했습니다. 협력사 정보는 가나다순이 아닌 등록순이며, 각 회사의 상호와 브랜드는 해당 회사의 자산입니다.</p>
</section>
<section>
  <h2 class="secTit">협력 분야</h2>
  <ul class="tagRow">${fields.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>
  <div class="btnRow">${btn('@/partners/cases.html', '협력 사례 보기')}${btn('@/business/products.html', '적용 제품 보기', 'btn btn--line')}</div>
</section>
${inquiryCta('새로운 협력을 기다립니다.', '균주 공급, 공동 연구, 기술 협력 등 협력 방식을 함께 찾겠습니다.', '사업 제휴 문의')}`,
  };

  const cases = {
    path: 'partners/cases.html', group: 'partners', item: 'cases', title: '협력 사례',
    desc: 'PLBNB의 협력 사례. 협력 배경과 내용, 관련 균주와 적용 제품, 성과를 사례별로 소개합니다.',
    lead: '연구가 제품과 협약으로 이어진 사례입니다.',
    body: `
<section class="caseList">${db.cases.map((c, n) => {
    const r = db.rel.of('cases', c.id);
    return `
  <article class="case" id="${c.id}">
    <header><span class="no">CASE ${String(n + 1).padStart(2, '0')}</span><h2>${esc(c.title)}</h2><p>${esc(c.partner)} · ${esc(c.year)}</p></header>
    <dl>
      <div><dt>협력 배경</dt><dd>${esc(c.background)}</dd></div>
      <div><dt>협력 내용</dt><dd>${esc(c.content)}</dd></div>
      <div><dt>협력 성과</dt><dd>${esc(c.result)}</dd></div>
      ${(r.strains || []).length ? `<div><dt>관련 균주</dt><dd>${r.strains.map((s) => `<a class="chip" href="@/business/strains/${s.id}.html">${esc(s.name)}</a>`).join('')}</dd></div>` : ''}
      ${(r.products || []).length ? `<div><dt>관련 적용 제품</dt><dd>${r.products.map((s) => `<a class="chip" href="@/business/products/${s.id}.html">${esc(s.company)} ${esc(s.name)}</a>`).join('')}</dd></div>` : ''}
      ${(r.patents || []).length ? `<div><dt>관련 특허</dt><dd>${r.patents.map((s) => `<a class="chip" href="@/business/patents/${s.id}.html">제 ${esc(s.number)} 호</a>`).join('')}</dd></div>` : ''}
      ${(r.media || []).length ? `<div><dt>관련 보도</dt><dd>${r.media.map((s) => `<a class="textLink" href="@/board/media/${s.id}.html">${esc(s.press)} · ${esc(s.title)} ${arrow}</a>`).join('<br>')}</dd></div>` : ''}
    </dl>
  </article>`; }).join('')}
</section>
${inquiryCta('함께 만들 다음 사례를 기다립니다.', '협력 방식과 범위는 협의를 통해 정합니다.', '사업 제휴 문의')}`,
  };

  const inquiry = {
    path: 'partners/inquiry.html', group: 'partners', item: 'inquiry', title: '사업 제휴 문의', scripts: ['contact.js'],
    desc: 'PLBNB 사업 제휴 문의. 균주 공급, 공동 연구, 기술 협력 등 기업 간 협업 문의를 접수합니다.',
    lead: '기업 간 협업과 연구 제안을 접수합니다. 담당자가 확인 후 연락드리겠습니다.',
    body: inquiryForm(site, '사업 제휴 문의'),
  };

  return [list, cases, inquiry];
}
