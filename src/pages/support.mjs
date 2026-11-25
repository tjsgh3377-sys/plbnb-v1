// 온라인 문의 · 개인정보처리방침 · 쇼핑몰 안내 · 이전 주소 연결
import { esc, btn, ext, arrow } from '../lib.mjs';

// 온라인 문의와 사업 제휴 문의가 함께 쓰는 양식. defaultType 으로 문의 유형 기본값만 다르게 한다.
export function inquiryForm(site, defaultType = '') {
  const cfg = site.inquiry;
  return `
<section class="contactGrid">
  <form class="inqForm" id="inquiryForm" novalidate data-endpoint="${esc(cfg.endpoint)}" data-mailto="${esc(site.email)}">
    <p class="req-note"><span class="req" aria-hidden="true">*</span> 표시는 필수 입력 항목입니다.</p>
    <div class="row2">
      <div class="f"><label for="company">기업명 <span class="req" aria-hidden="true">*</span></label><input id="company" name="company" type="text" required autocomplete="organization" aria-describedby="e-company"><p class="err" id="e-company" role="alert"></p></div>
      <div class="f"><label for="name">담당자명 <span class="req" aria-hidden="true">*</span></label><input id="name" name="name" type="text" required autocomplete="name" aria-describedby="e-name"><p class="err" id="e-name" role="alert"></p></div>
    </div>
    <div class="row2">
      <div class="f"><label for="phone">연락처 <span class="req" aria-hidden="true">*</span></label><input id="phone" name="phone" type="tel" required autocomplete="tel" inputmode="tel" placeholder="010-0000-0000" aria-describedby="e-phone"><p class="err" id="e-phone" role="alert"></p></div>
      <div class="f"><label for="email">이메일 <span class="req" aria-hidden="true">*</span></label><input id="email" name="email" type="email" required autocomplete="email" placeholder="name@company.com" aria-describedby="e-email"><p class="err" id="e-email" role="alert"></p></div>
    </div>
    <div class="f"><label for="type">문의 유형 <span class="req" aria-hidden="true">*</span></label>
      <select id="type" name="type" required aria-describedby="e-type"><option value="">선택해 주세요</option>${cfg.types.map((t) => `<option${t === defaultType ? ' selected' : ''}>${esc(t)}</option>`).join('')}</select><p class="err" id="e-type" role="alert"></p></div>
    <div class="f"><label for="subject">문의 제목 <span class="req" aria-hidden="true">*</span></label><input id="subject" name="subject" type="text" required maxlength="100" aria-describedby="e-subject"><p class="err" id="e-subject" role="alert"></p></div>
    <div class="f"><label for="message">문의 내용 <span class="req" aria-hidden="true">*</span></label><textarea id="message" name="message" rows="8" required maxlength="3000" aria-describedby="e-message"></textarea><p class="err" id="e-message" role="alert"></p></div>
    <div class="f" data-file-field${cfg.endpoint ? '' : ' hidden'}><label for="file">첨부파일</label><input id="file" name="file" type="file" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.hwp" aria-describedby="h-file"><p class="hint" id="h-file">PDF, 이미지, 문서 파일 1개 (최대 5MB)</p></div>
    ${cfg.endpoint ? '' : `<p class="hint">첨부파일은 문의 접수 후 열리는 메일에 직접 첨부하시거나 <a href="mailto:${esc(site.email)}">${esc(site.email)}</a>로 보내 주세요.</p>`}
    <fieldset class="agree">
      <legend>개인정보 수집 및 이용 동의 <span class="req" aria-hidden="true">*</span></legend>
      <dl>
        <div><dt>수집 항목</dt><dd>${esc(site.privacy.items)}</dd></div>
        <div><dt>수집 목적</dt><dd>${esc(site.privacy.purpose)}</dd></div>
        <div><dt>보유 기간</dt><dd>${esc(site.privacy.retention)}</dd></div>
      </dl>
      <p class="small">동의를 거부하실 수 있으나, 거부 시 문의 접수가 제한됩니다. 자세한 내용은 <a href="@/support/privacy.html" target="_blank" rel="noopener">개인정보처리방침</a>을 확인해 주세요.</p>
      <label class="check"><input type="checkbox" id="agree" name="agree" required aria-describedby="e-agree"> <span>개인정보 수집 및 이용에 동의합니다.</span></label>
      <p class="err" id="e-agree" role="alert"></p>
    </fieldset>
    <input type="text" name="website" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">
    <button type="submit" class="btn btn--lg">문의 보내기 ${arrow}</button>
    <div class="formStatus" id="formStatus" role="status" aria-live="polite"></div>
  </form>
  <aside class="contactSide" aria-label="연락처">
    <h2>직접 연락하기</h2>
    <dl>
      <div><dt>전화</dt><dd><a href="tel:${esc(site.tel)}">${esc(site.tel)}</a></dd></div>
      <div><dt>이메일</dt><dd><a href="mailto:${esc(site.email)}">${esc(site.email)}</a></dd></div>
      <div><dt>업무 시간</dt><dd>${esc(site.businessHours)}</dd></div>
      <div><dt>주소</dt><dd>${esc(site.address)}</dd></div>
    </dl>
    <a class="textLink" href="@/company/location.html">오시는 길 ${arrow}</a>
  </aside>
</section>`;
}

const redirect = (path, to, title) => ({
  path, group: 'support', title, desc: `${title} 페이지로 이동합니다.`, noindex: true, redirect: to,
  body: `<section><p class="prose">페이지 주소가 변경되었습니다. 자동으로 이동하지 않으면 아래 버튼을 눌러 주세요.</p><div class="btnRow">${btn(to, `${title} 바로가기`)}</div></section>`,
});

export default function (db) {
  const { site } = db;
  const pv = site.privacy;

  const contact = {
    path: 'support/contact.html', group: 'support', title: '온라인 문의', scripts: ['contact.js'],
    desc: 'PLBNB 온라인 문의. 균주 공급, 공동 연구, 기술 협력, 적용 제품, 사업 제휴에 관한 문의를 접수합니다.',
    lead: '균주 공급, 공동 연구, 기술 협력에 관한 문의를 남겨 주시면 담당자가 확인 후 연락드리겠습니다.',
    body: inquiryForm(site),
  };

  const privacy = {
    path: 'support/privacy.html', group: 'support', title: '개인정보처리방침',
    desc: `${site.legalName}(PLBNB)의 개인정보처리방침. 수집 항목, 수집 목적, 보유 기간과 이용자의 권리를 안내합니다.`,
    lead: `${site.legalName}는 온라인 문의를 통해 수집한 개인정보를 아래와 같이 처리합니다.`,
    body: `
<section class="policy">
  <h2 class="secTit">1. 수집하는 개인정보 항목</h2>
  <p>${esc(pv.items)}</p>
  <h2 class="secTit">2. 개인정보의 수집 및 이용 목적</h2>
  <p>${esc(pv.purpose)}</p>
  <h2 class="secTit">3. 개인정보의 보유 및 이용 기간</h2>
  <p>${esc(pv.retention)}. 보유 기간이 지나거나 처리 목적이 달성되면 지체 없이 파기합니다.</p>
  <h2 class="secTit">4. 개인정보의 제3자 제공</h2>
  <p>수집한 개인정보를 이용자의 동의 없이 제3자에게 제공하지 않습니다. 다만 법령에 따라 요구되는 경우는 예외로 합니다.</p>
  <h2 class="secTit">5. 이용자의 권리</h2>
  <p>이용자는 언제든지 본인의 개인정보에 대한 열람, 정정, 삭제, 처리 정지를 요청할 수 있습니다. 아래 연락처로 요청하시면 지체 없이 조치하겠습니다.</p>
  <h2 class="secTit">6. 개인정보 보호책임자</h2>
  <dl class="infoTable">
    <div><dt>책임자</dt><dd>${esc(pv.officer)}</dd></div>
    <div><dt>전화</dt><dd><a href="tel:${esc(site.tel)}">${esc(site.tel)}</a></dd></div>
    <div><dt>이메일</dt><dd><a href="mailto:${esc(site.email)}">${esc(site.email)}</a></dd></div>
  </dl>
  <p class="note">시행일: ${db.buildDate.replace(/-/g, '.')}</p>
</section>`,
  };

  const shop = {
    path: 'shop/index.html', group: 'shop', title: site.shop.label, noindex: !site.shop.url,
    desc: `${site.name} 공식 쇼핑몰 안내.`,
    lead: site.shop.url ? '공식 쇼핑몰은 외부 사이트에서 운영됩니다.' : '공식 쇼핑몰을 준비하고 있습니다.',
    body: site.shop.url
      ? `<section><p class="prose">아래 버튼을 누르면 ${esc(site.name)} 공식 쇼핑몰이 새 창으로 열립니다.</p><div class="btnRow">${ext(site.shop.url, '공식 쇼핑몰 바로가기', 'btn')}</div></section>`
      : `<section><p class="prose">${esc(site.name)} 공식 쇼핑몰은 현재 준비 중입니다. 문을 여는 대로 이 메뉴에서 바로 연결됩니다.</p><p class="prose">기업 고객의 균주 공급과 사업 제휴 문의는 온라인 문의를 이용해 주세요.</p><div class="btnRow">${btn('@/support/contact.html', '온라인 문의')}${btn('@/board/notice.html', '공지사항 보기', 'btn btn--line')}</div></section>`,
  };

  return [contact, privacy, shop,
    redirect('support/partners.html', '../partners/index.html', '협력사 소개'),
    redirect('support/notice.html', '../board/notice.html', '공지사항'),
  ];
}
