// 게시판 — 공지사항 · 연구 칼럼 · 언론 보도 (목록 + 고유 주소 상세페이지)
import { esc, fmtDate, btn, ext, arrow, relatedBlock, paras } from '../lib.mjs';

const pager = '<nav class="pager" data-pager aria-label="페이지 이동" hidden></nav>';
const search = (id, label) => `
  <form class="filterBar" role="search" aria-label="${label}" onsubmit="return false">
    <div class="field"><label for="${id}">${label}</label><input type="search" id="${id}" data-search placeholder="검색어를 입력하세요" autocomplete="off"></div>
    <p class="count" aria-live="polite">전체 <strong data-count></strong>건</p>
  </form>`;
const empty = (msg) => `<div class="boardEmpty"><p>${msg}</p></div>`;
const noResult = '<p class="listEmpty" data-empty hidden>검색 결과가 없습니다.</p>';
const prevNext = (list, i, url) => `
<nav class="prevNext" aria-label="이전 글, 다음 글">
  ${list[i - 1] ? `<a href="${url(list[i - 1])}"><span>다음 글</span><strong>${esc(list[i - 1].title)}</strong></a>` : '<span class="none"><span>다음 글</span>다음 글이 없습니다.</span>'}
  ${list[i + 1] ? `<a href="${url(list[i + 1])}"><span>이전 글</span><strong>${esc(list[i + 1].title)}</strong></a>` : '<span class="none"><span>이전 글</span>이전 글이 없습니다.</span>'}
</nav>`;

export default function (db) {
  const { site } = db;
  const pages = [];
  const org = { '@type': 'Organization', name: site.legalName, url: `${site.baseUrl}/` };

  /* ---------- 공지사항 ---------- */
  const nUrl = (n) => `@/board/notice/${n.id}.html`;
  pages.push({
    path: 'board/notice.html', group: 'board', item: 'notice', title: '공지사항', scripts: ['sub.js'],
    desc: 'PLBNB 공지사항. 회사 소식과 안내 사항을 전해 드립니다.',
    lead: '회사 소식과 안내 사항을 전해 드립니다.',
    body: db.notices.length ? `
<section data-list data-page-size="10">
  ${search('q-notice', '공지사항 검색')}
  <table class="boardTable">
    <caption class="sr-only">공지사항 목록: 번호, 제목, 첨부, 등록일</caption>
    <thead><tr><th scope="col" class="c-no">번호</th><th scope="col">제목</th><th scope="col" class="c-file">첨부</th><th scope="col" class="c-date">등록일</th></tr></thead>
    <tbody>${db.notices.map((n, i) => `
      <tr data-item data-text="${esc(n.title.toLowerCase())}"${n.pinned ? ' class="pinned"' : ''}>
        <td class="c-no">${n.pinned ? '<span class="badge badge--reg">공지</span>' : db.notices.length - i}</td>
        <td class="c-tit"><a href="${nUrl(n)}">${esc(n.title)}</a></td>
        <td class="c-file">${(n.files || []).length ? `<span aria-label="첨부파일 ${n.files.length}개">📎 ${n.files.length}</span>` : '<span class="sr-only">없음</span>'}</td>
        <td class="c-date"><time datetime="${n.date}">${fmtDate(n.date)}</time></td>
      </tr>`).join('')}
    </tbody>
  </table>
  ${noResult}${pager}
</section>` : empty('등록된 공지사항이 없습니다.'),
  });
  db.notices.forEach((n, i) => pages.push({
    path: `board/notice/${n.id}.html`, group: 'board', item: 'notice', crumb: '공지 상세', title: `${n.title} | 공지사항`, h1: n.title, eyebrow: `공지사항 · ${fmtDate(n.date)}`,
    desc: (n.body || []).join(' ').slice(0, 150), ogType: 'article', lastmod: n.updated || n.date,
    jsonld: [{ '@context': 'https://schema.org', '@type': 'Article', headline: n.title, datePublished: n.date, dateModified: n.updated || n.date, author: org, publisher: org, mainEntityOfPage: `${site.baseUrl}/board/notice/${n.id}.html` }],
    body: `
<article class="post">
  <div class="prose">${paras(n.body)}</div>
  ${(n.files || []).length ? `<div class="files"><h2>첨부파일</h2><ul>${n.files.map((f) => `<li><a href="@/${f.path}" download>${esc(f.label)}</a></li>`).join('')}</ul></div>` : ''}
</article>
${prevNext(db.notices, i, nUrl)}
<div class="detailFoot"><a class="btn btn--line" href="@/board/notice.html">공지사항 목록으로</a></div>`,
  }));

  /* ---------- 연구 칼럼 ---------- */
  const cUrl = (c) => `@/board/column/${c.id}.html`;
  pages.push({
    path: 'board/column.html', group: 'board', item: 'column', title: '연구 칼럼', scripts: ['sub.js'],
    desc: 'PLBNB 연구 칼럼. 유산균 연구 정보와 PLBNB의 연구 성과를 연구자의 시선으로 전합니다.',
    lead: '유산균 연구 정보와 PLBNB의 연구 성과를 연구자의 시선으로 전합니다.',
    body: db.columns.length ? `
<section data-list data-page-size="9">
  ${search('q-column', '연구 칼럼 검색')}
  <ul class="columnList">${db.columns.map((c) => `
    <li data-item data-text="${esc([c.title, c.summary, c.category].join(' ').toLowerCase())}">
      <a href="${cUrl(c)}">
        ${c.thumb ? `<span class="thumb"><img src="@/${c.thumb}" alt="" loading="lazy"></span>` : `<span class="thumb thumb--text" aria-hidden="true">${esc(c.category || '연구 칼럼')}</span>`}
        <span class="kind">${esc(c.category || '')}</span>
        <strong>${esc(c.title)}</strong>
        <span class="sum">${esc(c.summary || '')}</span>
        <span class="meta">${esc(c.author || site.name)} · <time datetime="${c.date}">${fmtDate(c.date)}</time></span>
      </a>
    </li>`).join('')}
  </ul>
  ${noResult}${pager}
</section>` : empty('연구 칼럼을 준비하고 있습니다. 유산균 연구 정보와 PLBNB의 연구 성과를 차례로 소개해 드리겠습니다.') + `<div class="btnRow btnRow--center">${btn('@/business/achievements.html', '연구 성과 보기', 'btn btn--line')}${btn('@/board/media.html', '언론 보도 보기', 'btn btn--line')}</div>`,
  });
  db.columns.forEach((c, i) => pages.push({
    path: `board/column/${c.id}.html`, group: 'board', item: 'column', crumb: '칼럼 상세', title: `${c.title} | 연구 칼럼`, h1: c.title,
    eyebrow: `${c.category || '연구 칼럼'} · ${c.author || site.name}`, lead: c.summary, ogType: 'article', ogImage: c.thumb, lastmod: c.updated || c.date,
    desc: c.summary || (c.body || []).join(' ').slice(0, 150),
    jsonld: [{ '@context': 'https://schema.org', '@type': 'Article', headline: c.title, description: c.summary, datePublished: c.date, dateModified: c.updated || c.date, author: c.author ? { '@type': 'Person', name: c.author } : org, publisher: org, ...(c.thumb ? { image: `${site.baseUrl}/${c.thumb}` } : {}), mainEntityOfPage: `${site.baseUrl}/board/column/${c.id}.html` }],
    body: `
<article class="post">
  <p class="postMeta">최초 등록 <time datetime="${c.date}">${fmtDate(c.date)}</time>${c.updated ? ` · 수정 <time datetime="${c.updated}">${fmtDate(c.updated)}</time>` : ''}</p>
  ${c.thumb ? `<figure><img src="@/${c.thumb}" alt="${esc(c.thumbAlt || '')}"></figure>` : ''}
  <div class="prose">${(c.body || []).map((b) => typeof b === 'string' ? `<p>${esc(b)}</p>` : `<h2>${esc(b.h)}</h2>`).join('\n')}</div>
  ${(c.references || []).length ? `<div class="files"><h2>참고 자료</h2><ul>${c.references.map((r) => `<li>${r.url ? `<a href="${esc(r.url)}" target="_blank" rel="noopener noreferrer">${esc(r.label)}</a>` : esc(r.label)}</li>`).join('')}</ul></div>` : ''}
</article>
${relatedBlock(db.rel.of('columns', c.id), ['strains', 'patents', 'products', 'achievements', 'media'])}
${prevNext(db.columns, i, cUrl)}
<div class="detailFoot"><a class="btn btn--line" href="@/board/column.html">연구 칼럼 목록으로</a></div>`,
  }));

  /* ---------- 언론 보도 ---------- */
  const mUrl = (m) => `@/board/media/${m.id}.html`;
  pages.push({
    path: 'board/media.html', group: 'board', item: 'media', title: '언론 보도', scripts: ['sub.js'],
    desc: `PLBNB와 ${db.company.ceo.name} 대표의 연구를 다룬 언론 보도 ${db.media.length}건. 기사 요약과 원문 링크를 제공합니다.`,
    lead: 'PLBNB와 연구진의 연구를 다룬 언론 보도입니다. 기사 요약과 원문 링크를 제공합니다.',
    body: `
<section data-list data-page-size="10">
  ${search('q-media', '언론 보도 검색')}
  <ol class="mediaList">${db.media.map((m) => `
    <li data-item data-text="${esc([m.title, m.press, m.summary].join(' ').toLowerCase())}">
      <div class="media__date"><time datetime="${m.date}"><strong>${m.date.slice(0, 4)}</strong>${m.date.slice(5).replace('-', '.')}</time></div>
      <div class="media__body">
        ${m.thumb ? `<a class="media__thumb" href="${mUrl(m)}" tabindex="-1" aria-hidden="true"><img src="@/${m.thumb}" alt="" loading="lazy"></a>` : ''}
        <p class="press">${esc(m.press)}</p>
        <h2><a href="${mUrl(m)}">${esc(m.title)}</a></h2>
        <p class="sum">${esc(m.summary)}</p>
      </div>
      <div class="media__act">${m.url ? ext(m.url, '기사 원문', 'btn btn--line btn--sm') : ''}<a class="btn btn--line btn--sm" href="${mUrl(m)}" aria-label="${esc(m.title)} 상세보기">상세보기 ${arrow}</a></div>
    </li>`).join('')}
  </ol>
  ${noResult}${pager}
  <p class="note">기사의 저작권은 각 언론사에 있으며, 이곳에는 요약과 원문 링크만 게시합니다.</p>
</section>`,
  });
  db.media.forEach((m, i) => pages.push({
    path: `board/media/${m.id}.html`, group: 'board', item: 'media', crumb: '보도 상세', title: `${m.title.replace(/"/g, '')} | ${m.press}`, h1: m.title, eyebrow: `${m.press} · ${fmtDate(m.date)}`,
    desc: `${m.press} ${fmtDate(m.date)} 보도. ${m.summary}`, lastmod: m.date,
    body: `
<article class="post">
  <dl class="infoTable">
    <div><dt>언론사</dt><dd>${esc(m.press)}</dd></div>
    <div><dt>보도일</dt><dd><time datetime="${m.date}">${fmtDate(m.date)}</time></dd></div>
  </dl>
  <h2 class="secTit">기사 요약</h2>
  <p class="prose">${esc(m.summary)}</p>
  ${m.thumb ? `<figure class="clip"><img src="@/${m.thumb}" alt="${esc(m.press)} ${fmtDate(m.date)} 지면 기사 미리보기" loading="lazy"><figcaption>지면 기사 미리보기 (저작권 보호를 위해 작은 크기로만 제공합니다)</figcaption></figure>` : ''}
  ${m.url ? `<div class="btnRow">${ext(m.url, '기사 원문 보기', 'btn')}</div>` : '<p class="note">이 보도는 온라인 원문 링크가 확인되지 않아 요약만 제공합니다.</p>'}
</article>
${relatedBlock(db.rel.of('media', m.id), ['strains', 'patents', 'products', 'achievements', 'cases', 'columns'])}
${prevNext(db.media, i, mUrl)}
<div class="detailFoot"><a class="btn btn--line" href="@/board/media.html">언론 보도 목록으로</a></div>`,
  }));

  return pages;
}
