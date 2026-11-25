// 사업소개 — 주요 연구 분야 · 보유 기술 · 협력 분야
import { esc, btn, arrow, inquiryCta, img } from '../lib.mjs';

// 연구 분야 정의. 균주 자체(개발현황 > 균주 정보)와 구분해, 분야별 연구 목적과 내용을 설명한다.
const AREAS = [
  { key: '장 건강·면역', en: 'Gut Health & Immunity', purpose: '한국인에게서 분리한 균주 가운데 장에 잘 부착하고 안전한 균주를 찾습니다.', content: '국내 장수마을 8곳의 건강한 고령자와 한국인 모유에서 유산균을 분리하고, 병원균 억제·항생제 감수성·내산성·내담즙성·장 세포 부착능을 평가해 균주를 선발합니다.' },
  { key: '장뇌축·GABA', en: 'Gut-Brain Axis & GABA', purpose: '유산균이 발효 과정에서 만드는 GABA(감마 아미노부티르산)를 연구합니다.', content: 'GABA를 생성하는 균주를 선발하고, 부추를 이용해 GABA 생산량을 높이는 발효 방법을 개발하고 있습니다. 생쥐와 사람을 대상으로 한 연구 결과를 학술지에 발표했습니다.' },
  { key: '비타민 생성', en: 'Vitamin Production', purpose: '비타민을 스스로 생성하는 균주를 찾습니다.', content: '비타민 B9(엽산)을 생성하는 균주와 비타민 B12를 생성하는 균주를 발굴해 각각 특허로 등록했습니다.' },
  { key: '체지방·대사', en: 'Metabolism', purpose: '기능성 대사산물을 만드는 유산균과 대사의 관계를 연구합니다.', content: '공액리놀레산(CLA)을 생성하는 사람 유래 균주를 선발하고, 비만 동물 모델과 사람의 혈중 CLA 변화를 살펴본 연구를 발표했습니다.' },
  { key: '위 건강', en: 'Gastric Health', purpose: '헬리코박터 파일로리의 위세포 부착을 방해하는 유산균을 연구합니다.', content: '사람 위세포주에서 헬리코박터의 부착과 성장을 억제하는 균주를 선발해 2002년 국제 학술지에 발표했습니다.' },
  { key: '여성 건강', en: "Women's Health", purpose: '여성 건강에 적합한 후보 균주를 찾습니다.', content: '과산화수소 생성능이 높은 균주를 선발하고, 질 유래 유해균의 성장과 부착 억제를 평가했습니다.' },
  { key: '구강·골', en: 'Oral & Bone', purpose: '유산균이 구강과 골세포에 미치는 영향을 연구합니다.', content: '골세포에서의 골결절 형성과 충치균 억제를 함께 살펴본 세포 연구를 발표했습니다.' },
];
const ONGOING = ['글루텐 저감 유산균', 'GABA 유제품 유산균', '곰팡이 억제 유산균'];

const TECH = [
  { title: '균주은행 운영', en: 'Culture Collection', text: '1999년부터 항생제내성균주은행을 운영하며 균주의 수집, 동정, 보존, 분양을 수행해 왔습니다.', points: ['유산균 12개 속, 동정된 균주 3,000종 이상 보유', '항생제 내성균주 14,000주 보유 (72속 192종)', '연구용 균주 분양'] },
  { title: '균주 분리·보존', en: 'Isolation & Preservation', text: '사람과 식품에서 유산균을 분리하고, 장기간 활성을 유지하도록 보존합니다.', points: ['인체(피부, 장, 질, 모유 등), 식품, 동물에서 균주 분리', '16S 염기서열 분석으로 균주 동정', '장기 보존'] },
  { title: '균주 분석', en: 'Analysis', text: '식약처 안전성 기준에 따라 균주의 안전성과 특성을 실험으로 확인합니다.', points: ['안전성 검사: 항생제 내성, 용혈, 유해물질 생산, 세포 독성', '유산균 항생제 내성 검사', 'MIC·MBC 측정', '추출물·합성물의 세균 억제 측정', '내성 기전 연구 (베타락타메이즈, 항생제 배출·변형, 내성 유전자 확인)', 'RAPD 분석'] },
  { title: '배양·발효', en: 'Culture & Fermentation', text: '균주 특성에 맞는 배양 조건을 찾고, 발효를 통해 유용한 대사산물을 얻습니다.', points: ['GABA 생산을 높이는 부추 발효 방법 (특허 출원)', '연구용 특수 배지 제조'] },
  { title: '기능성 연구개발', en: 'Functional R&D', text: '균주의 기능을 세포·동물·인체 수준에서 단계적으로 검증합니다.', points: ['기능성 유산균 개발 연구', '시험관(in vitro)·동물(in vivo) 실험을 통한 안전성과 기능성 확인', '장 정착성, 병원균 억제능 등 평가', 'BSL2 실험실 보유'] },
];
const PROCESS = ['시료 수집', '균주 분리', '동정·안전성 확인', '기능 검증', '특허·논문', '보존·분양'];
const SERVICES = ['유산균주 분양', '유산균 내성 검사', 'B2B 유산균 공급', '기능성 유산균 개발 연구', '연구용 특수 배지 공급'];

const COOP = [
  { title: '균주 개발 및 공급', type: '균주 공급 문의', text: '보유 균주 가운데 제품 목적에 맞는 균주를 제안하고 공급합니다.', flow: ['용도·제형 협의', '후보 균주 제안', '시료 제공', '공급'] },
  { title: '공동 연구개발', type: '공동 연구 문의', text: '기능성 유산균의 발굴과 검증을 기업·기관과 함께 수행합니다.', flow: ['연구 주제 협의', '연구 계획 수립', '공동 연구', '성과 공유'] },
  { title: '제품 적용 연구', type: '적용 제품 관련 문의', text: '균주를 실제 제품에 적용하기 위한 연구를 지원합니다.', flow: ['제품 요건 확인', '적용 조건 검토', '적용 시험', '자료 제공'] },
  { title: '기술이전 및 기술 협력', type: '기술 협력 문의', text: '특허와 배양·발효 기술의 활용 방안을 협의합니다.', flow: ['기술 소개', '활용 범위 협의', '계약', '기술 지원'] },
  { title: '연구 및 분석 서비스', type: '기술 협력 문의', text: '항생제 내성 검사, 세균 억제 측정 등 분석 서비스를 제공합니다.', flow: ['분석 항목 협의', '시료 접수', '분석', '결과 제공'] },
];

export default function (db) {
  const { site } = db;
  const strainsIn = (k) => db.strains.filter((s) => s.fields.includes(k));

  const research = {
    path: 'business/business.html', group: 'business', item: 'research', title: '주요 연구 분야',
    desc: 'PLBNB의 주요 연구 분야. 장 건강·면역, 장뇌축·GABA, 비타민 생성, 체지방·대사, 위 건강, 여성 건강, 구강·골 분야의 연구 목적과 내용, 관련 균주를 소개합니다.',
    lead: '균주마다 무엇을 하는지 실험으로 확인하고, 그 결과를 논문과 특허로 남깁니다.',
    body: `
<section>
  <ol class="areaList">${AREAS.map((a, n) => {
    const ss = strainsIn(a.key);
    const pats = [...new Map(ss.flatMap((s) => db.rel.of('strains', s.id).patents || []).map((p) => [p.id, p])).values()];
    const papers = [...new Map(ss.flatMap((s) => db.rel.of('strains', s.id).achievements || []).map((p) => [p.id, p])).values()];
    return `
    <li class="area" id="area-${n + 1}">
      <div class="area__head"><span class="no">${String(n + 1).padStart(2, '0')}</span><h2>${esc(a.key)}</h2><p class="en">${esc(a.en)}</p></div>
      <div class="area__body">
        <dl>
          <div><dt>연구 목적</dt><dd>${esc(a.purpose)}</dd></div>
          <div><dt>주요 연구 내용</dt><dd>${esc(a.content)}</dd></div>
          <div><dt>관련 균주</dt><dd class="chips">${ss.map((s) => `<a class="chip" href="@/business/strains/${s.id}.html">${esc(s.name)}</a>`).join('') || '—'}</dd></div>
          <div><dt>관련 성과</dt><dd>특허 ${pats.length}건 · 논문 ${papers.length}편 <a class="textLink" href="@/business/strains.html?field=${encodeURIComponent(a.key)}">이 분야 균주 보기 ${arrow}</a></dd></div>
        </dl>
      </div>
    </li>`; }).join('')}
  </ol>
  <p class="note">위 내용은 세포·동물·인체 연구 단계의 결과를 소개한 것이며, 완제품의 효능이나 기능성 인정과는 구분됩니다.</p>
</section>
<section>
  <h2 class="secTit">진행 중인 연구</h2>
  <ul class="tagRow">${ONGOING.map((o) => `<li>${esc(o)}</li>`).join('')}</ul>
</section>
${inquiryCta('함께 연구할 주제가 있으신가요?', '연구 분야와 목적을 알려 주시면 담당자가 검토 후 연락드리겠습니다.', '공동 연구 문의')}`,
  };

  const technology = {
    path: 'business/technology.html', group: 'business', item: 'technology', title: '보유 기술',
    desc: 'PLBNB의 보유 기술. 균주은행 운영 경험, 균주 분리·보존, 균주 분석, 배양·발효, 기능성 연구개발 역량과 연구 서비스를 소개합니다.',
    lead: '균주 자체가 아니라, 균주를 찾고 지키고 검증하는 기술을 소개합니다.',
    body: `
<section>
  <h2 class="secTit">연구개발 과정</h2>
  <ol class="process" aria-label="균주 연구개발 과정">${PROCESS.map((p, i) => `<li><span>${i + 1}</span>${esc(p)}</li>`).join('')}</ol>
</section>
<section class="techList">${TECH.map((t, n) => `
  <article class="tech">
    <div class="tech__head"><span class="no">${String(n + 1).padStart(2, '0')}</span><h2>${esc(t.title)}</h2><p class="en">${esc(t.en)}</p></div>
    <div class="tech__body"><p>${esc(t.text)}</p><ul class="dotList">${t.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul></div>
  </article>`).join('')}
</section>
<section class="split split--rev">
  <div class="split__text">
    <h2 class="secTit">연구 서비스</h2>
    <p>기업과 연구기관을 대상으로 다음 서비스를 제공합니다. 세부 범위와 일정은 문의 시 안내해 드립니다.</p>
    <ul class="checkList">${SERVICES.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
    <div class="btnRow">${btn('@/business/cooperation.html', '협력 분야 보기')}${btn('@/business/strains.html', '균주 정보 보기', 'btn btn--line')}</div>
  </div>
  <div class="split__media">${img('images/hero/molecule.jpg', '분자 구조 그래픽', '', 1200, 800)}</div>
</section>
${inquiryCta('분석·연구 서비스가 필요하신가요?', '필요한 항목을 알려 주시면 가능 여부와 절차를 안내해 드리겠습니다.', '기술 협력 문의')}`,
  };

  const cooperation = {
    path: 'business/cooperation.html', group: 'business', item: 'cooperation', title: '협력 분야',
    desc: 'PLBNB와 협력하는 방법. 균주 개발 및 공급, 공동 연구개발, 제품 적용 연구, 기술이전 및 기술 협력, 연구·분석 서비스를 안내합니다.',
    lead: '기업 고객이 PLBNB와 함께할 수 있는 다섯 가지 방식입니다.',
    body: `
<section class="coopList">${COOP.map((c, n) => `
  <article class="coop">
    <div class="coop__head"><span class="no">${String(n + 1).padStart(2, '0')}</span><h2>${esc(c.title)}</h2></div>
    <div class="coop__body">
      <p>${esc(c.text)}</p>
      <ol class="flow" aria-label="${esc(c.title)} 진행 절차">${c.flow.map((f) => `<li>${esc(f)}</li>`).join('')}</ol>
      <a class="textLink" href="@/support/contact.html?type=${encodeURIComponent(c.type)}">${esc(c.type)} ${arrow}</a>
    </div>
  </article>`).join('')}
</section>
<section>
  <h2 class="secTit">적용 산업</h2>
  <dl class="infoTable">
    <div><dt>건강기능식품</dt><dd>프로바이오틱스 제품용 기능성 균주 공급</dd></div>
    <div><dt>유제품</dt><dd>발효유 제품용 균주 공급</dd></div>
    <div><dt>화장품</dt><dd>유산균 배양액의 화장품 소재 적용 연구</dd></div>
    <div><dt>의약</dt><dd>유산균 연구 성과를 바탕으로 한 신약 공동 개발</dd></div>
  </dl>
  <div class="btnRow">${btn('@/business/products.html', '적용 제품 보기', 'btn btn--line')}${btn('@/partners/cases.html', '협력 사례 보기', 'btn btn--line')}</div>
</section>
${inquiryCta('사업 제휴를 검토하고 계신가요?', '협력 방식과 범위는 협의를 통해 정합니다. 편하게 문의해 주세요.', '사업 제휴 문의')}`,
  };

  return [research, technology, cooperation];
}
