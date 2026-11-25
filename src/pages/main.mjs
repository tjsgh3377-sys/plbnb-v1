// 메인페이지 — 확정된 B안(DNA 이중나선 히어로)의 구성을 유지하고 내용만 보완한다.
import { esc, fmtDate, arrow, btn } from '../lib.mjs';

export default function (db) {
  const { site, company } = db;
  const reg = db.patents.filter((p) => p.status === '등록').length;
  const app = db.patents.length - reg;
  const news = [
    ...db.media.slice(0, 3).map((m) => ({ kind: '언론 보도', title: m.title, date: m.date, meta: m.press, href: `@/board/media/${m.id}.html`, thumb: m.thumb })),
    ...db.columns.slice(0, 2).map((c) => ({ kind: '연구 칼럼', title: c.title, date: c.date, meta: c.category, href: `@/board/column/${c.id}.html`, thumb: c.thumb })),
    ...db.notices.slice(0, 2).map((n) => ({ kind: '공지사항', title: n.title, date: n.date, meta: '', href: `@/board/notice/${n.id}.html` })),
  ].sort((a, b) => String(b.date).localeCompare(String(a.date))).slice(0, 4);

  const core = [
    { no: '01', title: '균주 정보', fig: `${db.strains.length}`, unit: '종 공개', text: '연구 내용과 관련 특허·적용 제품을 균주별로 확인할 수 있습니다.', href: '@/business/strains.html', cta: '균주 정보 보기' },
    { no: '02', title: '특허 현황', fig: `${reg}`, unit: `건 등록 · ${app}건 출원`, text: '등록 특허와 공개 가능한 출원 정보를 목록으로 정리했습니다.', href: '@/business/patents.html', cta: '특허 현황 보기' },
    { no: '03', title: '적용 제품', fig: `${db.products.length}`, unit: '개 사례', text: 'PLBNB의 균주와 기술이 고객사 제품에 적용된 사례입니다.', href: '@/business/products.html', cta: '적용 제품 보기' },
    { no: '04', title: '보유 기술', fig: '균주은행', unit: '운영 경험', text: '균주의 분리·보존·분석과 연구 서비스 역량을 소개합니다.', href: '@/business/technology.html', cta: '보유 기술 보기' },
  ];
  const fields = [
    { ko: '건강기능식품', en: 'Health Functional Food', text: '프로바이오틱스 제품에 적용되는 기능성 균주를 공급합니다.' },
    { ko: '유제품', en: 'Dairy', text: '발효유 제품에 적용되는 균주를 공급합니다.' },
    { ko: '화장품', en: 'Cosmetics', text: '유산균 배양액을 화장품 소재로 적용하는 연구를 함께합니다.' },
    { ko: '의약', en: 'Pharmaceutical', text: '유산균 연구 성과를 바탕으로 신약 공동 개발에 참여합니다.' },
  ];

  const body = `
<!-- SECTION 01. Main Visual -->
<section class="heroSingle" aria-label="PLBNB 소개">
  <video class="bg" autoplay muted loop playsinline preload="metadata" poster="@/images/hero/poster.jpg" aria-hidden="true">
    <source src="@/assets/video/dna-helix.mp4" type="video/mp4">
  </video>
  <div class="inner">
    <p class="eyebrow">Research, Innovation and Microbial Technology</p>
    <h1>30년 이상의 연구 경험,<br>유산균 기술의 새로운 가능성을 연구합니다.</h1>
    <p class="sub">PLBNB는 균주를 발굴하고, 기능을 검증하고, <br>특허와 논문으로 근거를 남기는 프로바이오틱스 연구개발 기업입니다.</p>
    <div class="heroCards">
      <a class="hc hc--mfg" href="@/business/business.html">
        <span class="label">사업소개</span>
        <strong>연구 분야 · 보유 기술 · 협력</strong>
        <span class="go">사업소개 보기 ${arrow}</span>
      </a>
      <a class="hc hc--consult" href="@/business/development.html">
        <span class="label">개발현황</span>
        <strong>균주 · 특허 · 적용 제품</strong>
        <span class="go">개발현황 보기 ${arrow}</span>
      </a>
    </div>
  </div>
</section>

<!-- SECTION 02. 기업 및 사업 소개 -->
<section class="section" id="about">
  <div class="container introGrid">
    <div class="introText reveal">
      <p class="bluetext">About PLBNB</p>
      <h2 class="txt2">연구에서 출발한<br>프로바이오틱스 기업</h2>
      <p class="txt3">${esc(site.legalName)}는 미생물 연구자가 30년 넘게 수집하고 검증해 온 유산균을 바탕으로 설립되었습니다. 기업 고객에게 균주 공급, 공동 연구, 기술 협력을 제공합니다.</p>
      <div class="btnRow">
        ${btn('@/business/business.html', '주요 연구 분야')}
        ${btn('@/business/cooperation.html', '협력 분야', 'btn btn--line')}
      </div>
    </div>
    <dl class="figList reveal">${company.holdings.map((h) => `
      <div><dt>${esc(h.label)}</dt><dd><strong>${esc(h.value)}</strong><span>${esc(h.note)}</span></dd></div>`).join('')}
      <div><dt>특허</dt><dd><strong>등록 ${reg}건</strong><span>출원 ${app}건 · 홈페이지 공개 기준</span></dd></div>
    </dl>
  </div>
</section>

<!-- SECTION 03. 주요 협력사 -->
<section class="section section--soft mfgSec" id="partners">
  <div class="container">
    <div class="secHead">
      <div>
        <p class="bluetext">Partners</p>
        <h2 class="txt2">주요 협력사</h2>
      </div>
      ${btn('@/partners/index.html', '협력사 전체 보기', 'add-button')}
    </div>
    <div class="matWrap">
      <button class="matArrow prev" type="button" aria-label="이전 협력사 보기"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg></button>
      <button class="matArrow next" type="button" aria-label="다음 협력사 보기"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>
      <div class="matMarquee" aria-label="주요 협력사 목록">
        <div class="swiper-wrapper">${db.partners.map((p) => `
          <div class="matCard">
            <div class="logoBox">${p.logo ? `<img src="@/${p.logo}" alt="" loading="lazy">` : `<span>${esc(p.company)}</span>`}</div>
            <p class="en">${esc(p.field)}</p>
            <h3>${esc(p.company)}</h3>
            <dl class="brand"><dt>제품 브랜드</dt><dd>${p.brands.length ? esc(p.brands.join(' · ')) : '—'}</dd></dl>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </div>
</section>

<!-- SECTION 04. 연구개발 핵심 경쟁력 -->
<section class="section" id="development">
  <div class="container">
    <div class="secHead consult">
      <div>
        <p class="bluetext">Research &amp; Development</p>
        <h2 class="txt2">연구개발 핵심 경쟁력</h2>
      </div>
    </div>
    <div class="consultGrid">${core.map((c) => `
      <article class="consultCard reveal">
        <div class="fig"><span class="no">${c.no}</span><strong>${esc(c.fig)}</strong><span class="unit">${esc(c.unit)}</span></div>
        <div class="body">
          <h3>${esc(c.title)}</h3>
          <p>${esc(c.text)}</p>
          <a class="more" href="${c.href}">${esc(c.cta)} ${arrow}</a>
        </div>
      </article>`).join('')}
    </div>
  </div>
</section>

<!-- SECTION 05. 연구자 스토리 -->
<section class="section section--tint" id="story">
  <div class="container">
    <div class="whyGrid">
      <div class="whyImg reveal"><img src="@/${company.ceo.photo}" alt="${esc(company.ceo.name)} ${esc(company.ceo.title)}" loading="lazy" width="900" height="1350"></div>
      <div class="reveal">
        <p class="bluetext">Researcher's Story</p>
        <h2 class="txt2">과학자가 직접 연구한<br>균주로 시작합니다.</h2>
        <p class="txt3">${esc(company.story.lead)} ${esc(company.ceo.name)} 대표는 항생제내성균주은행과 연구소재중앙센터를 이끌며 미생물을 수집하고, 보존하고, 그 기능을 검증해 왔습니다.</p>
        <ul class="whyList">${company.ceo.awards.slice(0, 4).map((a) => `
          <li><div class="whyRow"><span class="no">${esc(a.year)}</span>${esc(a.text)}</div></li>`).join('')}
        </ul>
        <div class="btnRow">
          ${btn('@/company/story.html', `${site.menu[0].items.find((i) => i.key === 'story').label} 보기`)}
          ${btn('@/company/ceo.html', '대표이사 소개', 'btn btn--line')}
        </div>
      </div>
    </div>
  </div>
</section>

<!-- SECTION 06. 주요 산업 및 협력 분야 -->
<section class="section" id="industries">
  <div class="container">
    <div class="secHead">
      <div>
        <p class="bluetext">Industries</p>
        <h2 class="txt2">주요 산업 및 협력 분야</h2>
      </div>
      ${btn('@/business/cooperation.html', '협력 분야 보기', 'add-button')}
    </div>
    <ul class="indGrid">${fields.map((f, i) => `
      <li class="indCard reveal">
        <span class="no">0${i + 1}</span>
        <h3>${esc(f.ko)}</h3>
        <span class="en">${esc(f.en)}</span>
        <p>${esc(f.text)}</p>
      </li>`).join('')}
    </ul>
  </div>
</section>

<!-- SECTION 07. 회사 연혁 -->
<section class="section section--soft" id="history">
  <div class="container">
    <div class="histWrap">
      <div class="histIntro">
        <p class="bluetext">History</p>
        <h2 class="txt2">PLBNB가<br>걸어온 길</h2>
        <p class="histLead">1999년 항생제내성균주은행에서 시작된 연구가 ${esc(site.founded)}년 ${esc(site.legalNameShort)} 설립으로 이어졌습니다.</p>
        ${btn('@/company/history.html', '회사 연혁 전체 보기')}
      </div>
      <ol class="histYears">${company.history.slice(0, 4).map((y) => `
        <li>
          <p class="year">${esc(y.year)}</p>
          <ul>${y.items.slice(0, 3).map((i) => `<li>${esc(i.text)}</li>`).join('')}</ul>
        </li>`).join('')}
      </ol>
    </div>
  </div>
</section>

<!-- SECTION 08. Research & News -->
<section class="section" id="news">
  <div class="container">
    <div class="secHead">
      <div>
        <p class="bluetext">Research &amp; News</p>
        <h2 class="txt2">연구 소식</h2>
      </div>
      <div class="btnRow">
        ${btn('@/board/column.html', '연구 칼럼', 'add-button')}
        ${btn('@/board/media.html', '언론 보도', 'add-button')}
        ${btn('@/board/notice.html', '공지사항', 'add-button')}
      </div>
    </div>
    <ul class="newsGrid">${news.map((n) => `
      <li>
        <a class="newsCard" href="${n.href}">
          ${n.thumb ? `<span class="thumb"><img src="@/${n.thumb}" alt="" loading="lazy"></span>` : `<span class="thumb thumb--text" aria-hidden="true">${esc(n.meta || n.kind)}</span>`}
          <span class="kind">${esc(n.kind)}</span>
          <strong>${esc(n.title)}</strong>
          <time datetime="${n.date}">${fmtDate(n.date)}</time>
        </a>
      </li>`).join('')}
    </ul>
  </div>
</section>

<!-- SECTION 09. Business Inquiry -->
<section class="contactBand" id="contact">
  <div class="inner">
    <div>
      <p class="bluetext">Business Inquiry</p>
      <h2>균주 공급부터 공동 연구까지,<br>연구 파트너로 함께하겠습니다.</h2>
      <p>TEL ${esc(site.tel)} · ${esc(site.address)}</p>
    </div>
    <ul class="inqList">${['균주 공급 문의', '공동 연구 문의', '기술 협력 문의'].map((t) => `
      <li><a href="@/support/contact.html?type=${encodeURIComponent(t)}">${esc(t)} ${arrow}</a></li>`).join('')}
      <li><a class="primary" href="@/support/contact.html">온라인 문의하기 ${arrow}</a></li>
    </ul>
  </div>
</section>`;

  return [{
    path: 'index.html', type: 'main', bodyClass: 'home',
    title: `${site.name} ${site.legalName} | 프로바이오틱스 연구개발 기업`,
    desc: site.description,
    body,
    jsonld: [
      { '@context': 'https://schema.org', '@type': 'Organization', name: site.legalName, alternateName: site.name, url: `${site.baseUrl}/`, logo: `${site.baseUrl}/images/logo.png`, email: site.email, telephone: site.tel, address: { '@type': 'PostalAddress', streetAddress: site.address, addressLocality: '구리시', addressRegion: '경기도', addressCountry: 'KR' } },
      { '@context': 'https://schema.org', '@type': 'WebSite', name: `${site.name} ${site.legalName}`, url: `${site.baseUrl}/`, inLanguage: 'ko' },
    ],
  }];
}
