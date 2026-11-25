// 회사소개 — 회사 개요 · 회사 연혁 · 대표이사 소개 · 리즈 스토리 · 오시는 길
import { esc, btn, ext, paras, img, arrow } from '../lib.mjs';

export default function (db) {
  const { site, company } = db;
  const { ceo, story } = company;
  const storyLabel = site.menu[0].items.find((i) => i.key === 'story').label;
  const reg = db.patents.filter((p) => p.status === '등록').length;
  const mapQ = encodeURIComponent(site.addressMapQuery);

  const about = {
    path: 'company/about.html', group: 'company', item: 'about', title: '회사 개요',
    desc: `${site.legalName}(PLBNB)는 30년 이상의 유산균 연구 경험을 바탕으로 설립된 프로바이오틱스 연구개발 기업입니다. 설립 배경, 연구개발 전문성, 핵심 가치와 기업 정보를 소개합니다.`,
    lead: site.slogan,
    eyebrow: site.sloganEn,
    body: `
<section class="split">
  <div class="split__text">
    <h2 class="secTit">연구에서 출발한 기업</h2>
    <p>${esc(site.legalName)}는 미생물 연구자가 30년 넘게 수집하고 검증해 온 유산균을 산업 현장에 연결하기 위해 ${esc(site.founded)}년 설립되었습니다.</p>
    <p>회사의 뿌리는 1999년부터 운영해 온 항생제내성균주은행과 2001년 시작한 마이크로바이옴 연구에 있습니다. 균주를 발굴하고, 기능을 실험으로 검증하고, 특허와 논문으로 근거를 남기는 연구 방식이 지금의 균주와 기술을 만들었습니다.</p>
    <p>${esc(company.vision)}</p>
  </div>
  <div class="split__media">${img('images/hero/research.jpg', 'DNA 이중나선 그래픽', '', 1200, 900)}</div>
</section>

<section>
  <h2 class="secTit">연구개발 전문성</h2>
  <p class="secLead">PLBNB가 보유한 균주 자원입니다. 수치는 회사 소개 자료(2026년 7월) 기준입니다.</p>
  <dl class="statRow">${company.holdings.map((h) => `
    <div><dt>${esc(h.label)}</dt><dd><strong>${esc(h.value)}</strong><span>${esc(h.note)}</span></dd></div>`).join('')}
    <div><dt>특허</dt><dd><strong>등록 ${reg}건</strong><span>출원 ${db.patents.length - reg}건 · 홈페이지 공개 기준</span></dd></div>
  </dl>
</section>

<section>
  <h2 class="secTit">주요 경쟁력</h2>
  <ol class="numList">
    <li><h3>연구자가 직접 발굴한 균주</h3><p>국내 장수마을, 모유 등 한국인에게서 분리한 균주를 직접 선발하고 보존합니다.</p></li>
    <li><h3>논문과 특허로 남긴 근거</h3><p>균주별 연구 결과를 국제 학술지 논문과 특허로 공개해 왔습니다. 연구 단계와 적용 범위를 구분해 안내합니다.</p></li>
    <li><h3>균주은행 운영 경험</h3><p>균주의 수집·동정·보존·분양을 오랫동안 수행해 온 경험이 균주 품질 관리의 바탕입니다.</p></li>
    <li><h3>제품 적용 실적</h3><p>PLBNB의 균주는 유제품, 건강기능식품, 화장품 분야 고객사 제품에 적용되었습니다.</p></li>
  </ol>
  <div class="btnRow">${btn('@/business/strains.html', '균주 정보 보기')}${btn('@/business/patents.html', '특허 현황 보기', 'btn btn--line')}${btn('@/business/products.html', '적용 제품 보기', 'btn btn--line')}</div>
</section>

<section>
  <h2 class="secTit">핵심 가치</h2>
  <ul class="valueList">${company.values.map((v) => `
    <li><span class="en">${esc(v.en)}</span><strong>${esc(v.ko)}</strong><p>${esc(v.text)}</p></li>`).join('')}
  </ul>
</section>

<section>
  <h2 class="secTit">기업 정보</h2>
  <dl class="infoTable">
    <div><dt>회사명</dt><dd>${esc(site.legalName)} (${esc(site.name)})</dd></div>
    <div><dt>대표이사</dt><dd>${esc(site.ceo)}</dd></div>
    <div><dt>설립</dt><dd>${esc(site.founded)}년</dd></div>
    <div><dt>사업자등록번호</dt><dd>${esc(site.bizNo)}</dd></div>
    <div><dt>주소</dt><dd>${esc(site.address)}</dd></div>
    <div><dt>전화</dt><dd><a href="tel:${esc(site.tel)}">${esc(site.tel)}</a></dd></div>
    <div><dt>이메일</dt><dd><a href="mailto:${esc(site.email)}">${esc(site.email)}</a></dd></div>
  </dl>
</section>

<nav class="nextLinks" aria-label="관련 페이지">
  <a href="@/business/business.html"><span>사업소개</span><strong>주요 연구 분야</strong>${arrow}</a>
  <a href="@/business/technology.html"><span>사업소개</span><strong>보유 기술</strong>${arrow}</a>
  <a href="@/company/story.html"><span>회사소개</span><strong>${esc(storyLabel)}</strong>${arrow}</a>
</nav>`,
  };

  const history = {
    path: 'company/history.html', group: 'company', item: 'history', title: '회사 연혁',
    desc: `${site.legalName}(PLBNB)의 설립 이후 연혁과, 설립 이전부터 이어진 유산균 연구 이력을 연도별로 소개합니다.`,
    lead: '균주은행에서 시작된 연구가 기업으로 이어지기까지의 기록입니다.',
    body: `
<section>
  <h2 class="secTit">${esc(site.legalNameShort)} 연혁</h2>
  <ol class="timeline">${company.history.map((y) => `
    <li>
      <h3 class="year">${esc(y.year)}</h3>
      <ul>${y.items.map((i) => `<li><span class="tag tag--${esc(i.tag)}">${esc(i.tag)}</span>${esc(i.text)}</li>`).join('')}</ul>
    </li>`).join('')}
  </ol>
</section>
<section>
  <h2 class="secTit">설립 이전의 연구 이력</h2>
  <p class="secLead">PLBNB의 균주와 기술은 회사 설립 이전부터 이어진 연구에서 비롯되었습니다.</p>
  <ol class="timeline timeline--plain">${company.heritage.map((y) => `
    <li><h3 class="year">${esc(y.year)}</h3><ul><li>${esc(y.text)}</li></ul></li>`).join('')}
  </ol>
  <div class="btnRow">${btn('@/company/story.html', `${storyLabel} 보기`)}${btn('@/business/achievements.html', '연구 성과 보기', 'btn btn--line')}</div>
</section>`,
  };

  const ceoPage = {
    path: 'company/ceo.html', group: 'company', item: 'ceo', title: '대표이사 소개',
    desc: `${site.legalName} ${ceo.name} 대표이사의 인사말, 학력, 주요 경력, 연구 분야와 수상 내역을 소개합니다.`,
    lead: '연구자가 직접 이끄는 프로바이오틱스 기업입니다.',
    jsonld: [{ '@context': 'https://schema.org', '@type': 'Person', name: ceo.name, alternateName: 'Yeonhee Lee', jobTitle: ceo.title, worksFor: { '@type': 'Organization', name: site.legalName }, alumniOf: ['서울대학교', 'University of California, Los Angeles'], image: `${site.baseUrl}/${ceo.photo}` }],
    body: `
<section class="profile">
  <figure class="profile__photo">
    ${img(ceo.photo, `${ceo.name} ${ceo.title}`, '', 900, 1350)}
    <figcaption><strong>${esc(ceo.name)}</strong> ${esc(ceo.title)}<span>${esc(ceo.nameEn)}</span></figcaption>
  </figure>
  <div class="profile__body">
    <h2 class="secTit">인사말</h2>
    <div class="prose">${paras(ceo.greeting)}</div>
    <p class="sign">${esc(site.legalName)} ${esc(ceo.title)} <strong>${esc(ceo.name)}</strong></p>
  </div>
</section>

<section class="cvGrid">
  <div>
    <h2 class="secTit">학력</h2>
    <ul class="dotList">${ceo.education.map((e) => `<li>${esc(e)}</li>`).join('')}</ul>
    <h2 class="secTit">연구 분야</h2>
    <ul class="dotList">${ceo.fields.map((e) => `<li>${esc(e)}</li>`).join('')}</ul>
  </div>
  <div>
    <h2 class="secTit">주요 경력</h2>
    <dl class="cvList">${ceo.career.map((c) => `<div><dt>${esc(c.period)}</dt><dd>${esc(c.text)}</dd></div>`).join('')}</dl>
  </div>
</section>

<section>
  <h2 class="secTit">주요 수상</h2>
  <dl class="cvList cvList--wide">${ceo.awards.map((c) => `<div><dt>${esc(c.year)}</dt><dd>${esc(c.text)}</dd></div>`).join('')}</dl>
</section>

<section class="cta">
  <div><h2>${esc(storyLabel)}</h2><p>${esc(story.lead)}</p></div>
  <a class="btn btn--white" href="@/company/story.html">${esc(storyLabel)} 보기 ${arrow}</a>
</section>`,
  };

  const papers = db.achievements.filter((a) => a.type === '연구 논문').slice(0, 5);
  const press = db.media.slice(0, 5);
  const storyPage = {
    path: 'company/story.html', group: 'company', item: 'story', title: storyLabel, h1: story.title,
    desc: `${ceo.name} 대표의 30년 미생물 연구 이야기. 균주은행 운영, 유산균 기능 연구, 국제 표준 활동과 수상 내역을 소개합니다.`,
    lead: story.lead, eyebrow: storyLabel, ogType: 'article',
    body: `
<article class="story">
  <header class="story__intro">
    ${img(ceo.photo, `${ceo.name} ${ceo.title}`, '', 900, 1350)}
    <div>
      <p class="name"><strong>${esc(ceo.name)}</strong> ${esc(ceo.nameEn)}</p>
      <p>${esc(site.legalName)} ${esc(ceo.title)}</p>
      <ul class="dotList">${ceo.fields.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>
    </div>
  </header>
  ${story.chapters.map((c, n) => `
  <section class="chapter">
    <div class="chapter__head"><span class="no">${String(n + 1).padStart(2, '0')}</span><p class="period">${esc(c.period)}</p><h2>${esc(c.title)}</h2></div>
    <div class="chapter__body">
      <div class="prose">${paras(c.text)}</div>
      ${c.image ? `<figure>${img(c.image, c.caption)}<figcaption>${esc(c.caption)}</figcaption></figure>` : ''}
      ${c.gallery ? `<div class="gallery">${c.gallery.map((g) => `<figure>${img(g.image, g.caption)}<figcaption>${esc(g.caption)}</figcaption></figure>`).join('')}</div>` : ''}
    </div>
  </section>`).join('')}

  <section class="chapter chapter--list">
    <div class="chapter__head"><span class="no">★</span><p class="period">Awards</p><h2>주요 수상</h2></div>
    <div class="chapter__body"><dl class="cvList cvList--wide">${ceo.awards.map((c) => `<div><dt>${esc(c.year)}</dt><dd>${esc(c.text)}</dd></div>`).join('')}</dl></div>
  </section>

  <section class="chapter chapter--list">
    <div class="chapter__head"><span class="no">★</span><p class="period">Research</p><h2>대표 연구 성과</h2></div>
    <div class="chapter__body">
      <ul class="lineList">${papers.map((p) => `<li><a href="@/business/achievements/${p.id}.html"><span class="meta">${p.year}</span><span class="t">${esc(p.title)}</span>${arrow}</a></li>`).join('')}</ul>
      <div class="btnRow">${btn('@/business/achievements.html', '연구 성과 전체 보기', 'btn btn--line')}${btn('@/business/patents.html', '특허 현황 보기', 'btn btn--line')}</div>
    </div>
  </section>

  <section class="chapter chapter--list">
    <div class="chapter__head"><span class="no">★</span><p class="period">Press</p><h2>주요 언론 보도</h2></div>
    <div class="chapter__body">
      <ul class="lineList">${press.map((p) => `<li><a href="@/board/media/${p.id}.html"><span class="meta">${esc(p.press)}</span><span class="t">${esc(p.title)}</span>${arrow}</a></li>`).join('')}</ul>
      <div class="btnRow">${btn('@/board/media.html', '언론 보도 전체 보기', 'btn btn--line')}</div>
    </div>
  </section>
</article>`,
  };

  const location = {
    path: 'company/location.html', group: 'company', item: 'location', title: '오시는 길',
    desc: `${site.legalName}(PLBNB) 오시는 길. ${site.address}. 전화 ${site.tel}.`,
    lead: '방문 전에 전화나 온라인 문의로 일정을 알려 주시면 안내해 드리겠습니다.',
    body: `
<section class="locGrid">
  <div class="map">
    <iframe title="${esc(site.legalName)} 위치 지도" src="https://maps.google.com/maps?q=${mapQ}&z=16&hl=ko&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
  </div>
  <div>
    <dl class="infoTable infoTable--stack">
      <div><dt>주소</dt><dd>${esc(site.address)}</dd></div>
      <div><dt>전화</dt><dd><a href="tel:${esc(site.tel)}">${esc(site.tel)}</a></dd></div>
      <div><dt>이메일</dt><dd><a href="mailto:${esc(site.email)}">${esc(site.email)}</a></dd></div>
      <div><dt>업무 시간</dt><dd>${esc(site.businessHours)}</dd></div>
    </dl>
    <div class="btnRow">
      ${ext(`https://map.naver.com/p/search/${mapQ}`, '네이버 지도에서 보기')}
      ${ext(`https://map.kakao.com/?q=${mapQ}`, '카카오맵에서 보기')}
    </div>
  </div>
</section>
<section>
  <h2 class="secTit">교통 안내</h2>
  <dl class="infoTable">
    <div><dt>대중교통</dt><dd>지도 앱의 길찾기에서 도착지를 「${esc(site.addressMapQuery)}」로 검색해 주세요. 가까운 정류장과 노선은 방문 일정에 맞춰 전화로도 안내해 드립니다.</dd></div>
    <div><dt>자동차</dt><dd>내비게이션에 「${esc(site.addressMapQuery)}」를 입력해 주세요. 주차는 방문 전에 전화로 문의해 주시기 바랍니다.</dd></div>
  </dl>
</section>`,
  };

  return [about, history, ceoPage, storyPage, location];
}
