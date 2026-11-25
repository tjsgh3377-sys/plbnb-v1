#!/usr/bin/env node
// PLBNB 정적 사이트 생성기 — 실행: node src/build.mjs
// data/*.json + src/pages/*.mjs → HTML 전체, sitemap.xml, robots.txt 를 프로젝트 루트에 만든다. 외부 패키지 없음.
import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { render } from './layout.mjs';
import { buildRelations } from './lib.mjs';
import main from './pages/main.mjs';
import company from './pages/company.mjs';
import business from './pages/business.mjs';
import development from './pages/development.mjs';
import partners from './pages/partners.mjs';
import board from './pages/board.mjs';
import support from './pages/support.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const load = (n) => JSON.parse(readFileSync(join(ROOT, 'data', `${n}.json`), 'utf8'));
const pub = (arr) => (arr || []).filter((i) => i.published !== false);

const site = load('site');
const companyData = load('company');
const strains = load('strains'), patents = load('patents'), products = load('products'), ach = load('achievements'), part = load('partners'), brd = load('board');
const byDate = (a, b) => String(b.date).localeCompare(String(a.date));

const db = {
  site, company: companyData,
  strainMeta: strains, achMeta: ach, columnCategories: brd.columnCategories,
  strains: pub(strains.items),
  patents: pub(patents.items).sort(byDate),
  products: pub(products.items),
  achievements: pub(ach.items).sort((a, b) => b.year - a.year),
  partners: pub(part.partners),
  cases: pub(part.cases),
  notices: pub(brd.notices).sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) || byDate(a, b)),
  columns: pub(brd.columns).sort(byDate),
  media: pub(brd.media).sort(byDate),
};
db.rel = buildRelations(db);
db.buildDate = new Date().toISOString().slice(0, 10);

const pages = [main, company, business, development, partners, board, support].flatMap((f) => f(db));

// 이전에 만든 상세페이지 중 더 이상 없는 항목(삭제·비공개)을 지운다.
for (const d of ['business/strains', 'business/patents', 'business/products', 'business/achievements', 'board/notice', 'board/column', 'board/media']) {
  rmSync(join(ROOT, d), { recursive: true, force: true });
}

const seen = new Set();
for (const p of pages) {
  if (seen.has(p.path)) throw new Error(`주소가 겹칩니다: ${p.path}`);
  seen.add(p.path);
  const out = join(ROOT, p.path);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, render(site, p, p.path.split('/').length - 1));
}

// 내부 링크 점검 — 끊어진 링크가 있으면 빌드를 실패시킨다.
const broken = [];
for (const p of pages) {
  const html = readFileSync(join(ROOT, p.path), 'utf8');
  for (const m of html.matchAll(/(?:href|src|poster)="([^"#?]+)[^"]*"/g)) {
    const ref = m[1];
    if (/^(https?:|mailto:|tel:|data:)/.test(ref)) continue;
    const target = resolve(dirname(join(ROOT, p.path)), ref);
    if (!existsSync(target)) broken.push(`${p.path} → ${ref}`);
  }
}

const indexable = pages.filter((p) => !p.noindex && !p.redirect);
writeFileSync(join(ROOT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable.map((p) => `  <url><loc>${site.baseUrl}/${p.path.replace(/(^|\/)index\.html$/, '$1')}</loc><lastmod>${p.lastmod || db.buildDate}</lastmod></url>`).join('\n')}
</urlset>
`);
writeFileSync(join(ROOT, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /_reference/\nDisallow: /src/\nDisallow: /docs/\n\nSitemap: ${site.baseUrl}/sitemap.xml\n`);

console.log(`페이지 ${pages.length}개 생성 (검색 등록 대상 ${indexable.length}개)`);
if (db.rel.missing.length) console.warn('연결 대상이 없어 제외된 관계:\n  ' + db.rel.missing.join('\n  '));
if (broken.length) { console.error('끊어진 링크:\n  ' + [...new Set(broken)].join('\n  ')); process.exit(1); }
