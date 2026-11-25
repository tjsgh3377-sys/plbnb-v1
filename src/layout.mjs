// 공통 레이아웃 — 헤더·푸터·서브페이지 틀. 메뉴는 data/site.json 한 곳에서 관리한다.
import { esc, arrow, extIcon } from './lib.mjs';

const shopLink = (site, cls = '') => site.shop.url
  ? `<a class="${cls}" href="${esc(site.shop.url)}" target="_blank" rel="noopener noreferrer">${esc(site.shop.label)} ${extIcon}<span class="sr-only">(새 창)</span></a>`
  : `<a class="${cls}" href="@/shop/index.html">${esc(site.shop.label)}</a>`;

function header(site, page) {
  const gnb = site.menu.map((g) => `
        <li${page.group === g.key ? ' class="on"' : ''}>
          <a href="@/${g.href}"${page.group === g.key ? ' aria-current="true"' : ''}>${esc(g.label)}</a>
          <ul class="dep2">${g.items.map((i) => `
            <li><a href="@/${i.href}"${page.group === g.key && page.item === i.key ? ' class="on" aria-current="page"' : ''}>${esc(i.label)}</a></li>`).join('')}
          </ul>
        </li>`).join('');
  const mnav = site.menu.map((g, n) => `
      <li>
        <button type="button" class="mDep1" aria-expanded="${page.group === g.key}" aria-controls="mDep2-${n}">${esc(g.label)}</button>
        <ul class="mDep2" id="mDep2-${n}"${page.group === g.key ? '' : ' hidden'}>${g.items.map((i) => `
          <li><a href="@/${i.href}"${page.group === g.key && page.item === i.key ? ' aria-current="page"' : ''}>${esc(i.label)}</a></li>`).join('')}
        </ul>
      </li>`).join('');
  return `
<a class="skip-link" href="#main">본문 바로가기</a>
<header id="header">
  <div class="inner">
    <a class="logo" href="@/index.html" aria-label="PLBNB 홈"><img src="@/images/logo.svg" alt="PLBNB 주식회사 피엘비앤비" width="164" height="72"></a>
    <nav id="gnb" aria-label="주 메뉴">
      <ul>${gnb}
        <li class="shop${page.group === 'shop' ? ' on' : ''}">${shopLink(site)}</li>
      </ul>
    </nav>
    <div class="util">
      <a class="contact-link" href="@/support/contact.html">온라인 문의</a>
      <button type="button" class="mobileMenuBtn" aria-label="전체 메뉴 열기" aria-expanded="false" aria-controls="mNav"><span></span><span></span><span></span></button>
    </div>
  </div>
  <div class="gnbBg" aria-hidden="true"></div>
</header>
<div class="mNav" id="mNav" hidden>
  <div class="mNavHead">
    <img src="@/images/logo.svg" alt="PLBNB 주식회사 피엘비앤비" width="120" height="53">
    <button type="button" class="mNavClose" aria-label="전체 메뉴 닫기"></button>
  </div>
  <nav aria-label="모바일 메뉴">
    <ul class="mNavList">${mnav}
    </ul>
  </nav>
  <div class="mNavFoot">
    <a class="btn" href="@/support/contact.html">온라인 문의 ${arrow}</a>
    ${shopLink(site, 'btn btn--line')}
  </div>
</div>`;
}

function footer(site) {
  return `
<footer id="footer">
  <div class="container">
    <div class="ftMain">
      <div class="ftLogo">
        <img src="@/images/logo.svg" alt="PLBNB 주식회사 피엘비앤비" width="150" height="66" loading="lazy">
        <p class="ftState">${esc(site.slogan)}</p>
        <p class="ftStateEn">${esc(site.sloganEn)}</p>
      </div>
      <nav class="ftNav" aria-label="사이트맵">${site.menu.map((g) => `
        <div>
          <h2>${esc(g.label)}</h2>
          <ul>${g.items.map((i) => `<li><a href="@/${i.href}">${esc(i.label)}</a></li>`).join('')}</ul>
        </div>`).join('')}
        <div>
          <h2>고객지원</h2>
          <ul>
            <li><a href="@/support/contact.html">온라인 문의</a></li>
            <li>${shopLink(site)}</li>
            <li><a href="@/support/privacy.html">개인정보처리방침</a></li>
          </ul>
        </div>
      </nav>
    </div>
    <address class="ftAddr">
      <strong>${esc(site.legalNameShort)}</strong> <span>대표 ${esc(site.ceo)}</span> <span>사업자등록번호 ${esc(site.bizNo)}</span><br>
      <span>${esc(site.address)}</span> <span>TEL <a href="tel:${esc(site.tel)}">${esc(site.tel)}</a></span> <span>E-MAIL <a href="mailto:${esc(site.email)}">${esc(site.email)}</a></span>
    </address>
    <p class="ftCopy">COPYRIGHT © ${esc(site.name)}. ALL RIGHTS RESERVED.</p>
  </div>
  <a class="topBtn" href="#header" aria-label="맨 위로"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20V5M5 12l7-7 7 7"/></svg></a>
</footer>`;
}

function subChrome(site, page) {
  const g = page.group === 'support' ? { ...site.support, items: [] }
    : page.group === 'shop' ? { key: 'shop', label: site.shop.label, en: 'Shop', visual: site.support.visual, items: [] }
    : site.menu.find((m) => m.key === page.group);
  const item = g.items.find((i) => i.key === page.item);
  const trail = [{ label: '홈', href: 'index.html' }];
  if (g.href && (item || page.crumb)) trail.push({ label: g.label, href: g.href }); else trail.push({ label: g.label });
  if (item) trail.push(page.crumb ? { label: item.label, href: item.href } : { label: item.label });
  if (page.crumb) trail.push({ label: page.crumb });
  const crumbs = trail.map((t, i) => i === trail.length - 1
    ? `<li aria-current="page">${esc(t.label)}</li>`
    : `<li>${t.href ? `<a href="@/${t.href}">${esc(t.label)}</a>` : esc(t.label)}</li>`).join('');
  const snb = g.items.length ? `
<nav class="snb" aria-label="${esc(g.label)} 하위 메뉴">
  <ul>${g.items.map((i) => `<li${i.key === page.item ? ' class="on"' : ''}><a href="@/${i.href}"${i.key === page.item && !page.crumb ? ' aria-current="page"' : ''}>${esc(i.label)}</a></li>`).join('')}</ul>
</nav>` : '';
  const html = `
<div class="subVisual" style="background-image:url('@/${g.visual}')">
  <div class="inner">
    <p class="en">${esc(g.en)}</p>
    <p class="ko">${esc(g.label)}</p>
  </div>
</div>
<div class="subBar">
  <nav class="crumb" aria-label="현재 위치"><ol>${crumbs}</ol></nav>
</div>${snb}`;
  return { html, trail };
}

export function render(site, page, depth) {
  const root = depth ? '../'.repeat(depth) : './';
  const url = `${site.baseUrl}/${page.path}`.replace(/\/index\.html$/, '/');
  const title = page.path === 'index.html' ? page.title : `${page.title} | ${site.name} ${site.legalName}`;
  const ld = [...(page.jsonld || [])];
  let chrome = '';
  if (page.type !== 'main') {
    const c = subChrome(site, page);
    chrome = c.html;
    ld.push({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: c.trail.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.label, ...(t.href ? { item: `${site.baseUrl}/${t.href}` } : {}) })) });
  }
  const main = page.type === 'main' ? `<main id="main">${page.body}</main>` : `
<main id="main" class="sub${page.wide ? ' sub--wide' : ''}">
  <div class="pageHead">
    ${page.eyebrow ? `<p class="eyebrow">${esc(page.eyebrow)}</p>` : ''}
    <h1>${esc(page.h1 || page.title)}</h1>
    ${page.lead ? `<p class="lead">${esc(page.lead)}</p>` : ''}
  </div>
  ${page.body}
</main>`;
  const html = `<!DOCTYPE html>
<html lang="ko">
<head>
<!-- 이 파일은 src/build.mjs 가 자동으로 생성합니다. 직접 고치지 말고 data/ 또는 src/ 를 수정한 뒤 다시 빌드하세요. -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(page.desc)}">
${page.noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${esc(page.canonical ? `${site.baseUrl}/${page.canonical}` : url)}">`}
<meta property="og:type" content="${page.ogType || 'website'}">
<meta property="og:site_name" content="${esc(site.name)} ${esc(site.legalName)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(page.desc)}">
<meta property="og:url" content="${esc(url)}">
<meta property="og:image" content="${site.baseUrl}/${page.ogImage || 'images/og-default.png'}">
<meta property="og:locale" content="ko_KR">
<link rel="icon" href="@/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="@/images/favicon-32.png">
<link rel="apple-touch-icon" href="@/images/apple-touch-icon.png">
<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css">
<link rel="stylesheet" href="@/css/main.css">
${page.type === 'main' ? '' : '<link rel="stylesheet" href="@/css/sub.css">'}
${ld.map((o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`).join('\n')}
${page.redirect ? `<meta http-equiv="refresh" content="0; url=${page.redirect}">` : ''}
</head>
<body${page.bodyClass ? ` class="${page.bodyClass}"` : ''}>
${header(site, page)}
${chrome}
${main}
${footer(site)}
<script src="@/js/main.js" defer></script>
${(page.scripts || []).map((s) => `<script src="@/js/${s}" defer></script>`).join('\n')}
</body>
</html>
`;
  return html.replace(/@\//g, root).replace(/\n{3,}/g, '\n\n');
}
