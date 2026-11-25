/* PLBNB contact.js — 온라인 문의 / 사업 제휴 문의 양식
   · 필수 항목, 이메일 형식, 개인정보 동의를 확인한다.
   · data-endpoint 가 있으면 그 주소로 전송하고, 서버가 정상 응답한 경우에만 '접수 완료'를 표시한다.
   · data-endpoint 가 없으면(정적 호스팅) 방문자의 메일 프로그램을 열어 내용을 전달한다.
     이때는 메일을 실제로 보내야 접수되므로 '접수 완료'라고 표시하지 않는다. */
(function () {
  'use strict';
  var form = document.getElementById('inquiryForm');
  if (!form) return;
  var status = document.getElementById('formStatus');
  var endpoint = form.getAttribute('data-endpoint');
  var mailto = form.getAttribute('data-mailto');
  var MAX_FILE = 5 * 1024 * 1024;

  /* 다른 페이지에서 ?type=균주 공급 문의 로 넘어오면 문의 유형을 미리 선택 */
  var type = new URLSearchParams(location.search).get('type');
  if (type) Array.prototype.forEach.call(form.type.options, function (o) { if (o.text === type) form.type.value = o.value || o.text; });

  var rules = {
    company: function (v) { return v ? '' : '기업명을 입력해 주세요.'; },
    name: function (v) { return v ? '' : '담당자명을 입력해 주세요.'; },
    phone: function (v) { return !v ? '연락처를 입력해 주세요.' : (/^[0-9+\-() ]{8,20}$/.test(v) ? '' : '연락처는 숫자와 하이픈(-)으로 입력해 주세요.'); },
    email: function (v) { return !v ? '이메일을 입력해 주세요.' : (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? '' : '이메일 형식이 올바르지 않습니다. 예: name@company.com'); },
    type: function (v) { return v ? '' : '문의 유형을 선택해 주세요.'; },
    subject: function (v) { return v ? '' : '문의 제목을 입력해 주세요.'; },
    message: function (v) { return v.length >= 10 ? '' : '문의 내용을 10자 이상 입력해 주세요.'; }
  };
  function setErr(name, msg) {
    var el = form.elements[name], box = document.getElementById('e-' + name);
    if (box) box.textContent = msg;
    if (el) { if (msg) el.setAttribute('aria-invalid', 'true'); else el.removeAttribute('aria-invalid'); }
  }
  function check(name) {
    var el = form.elements[name];
    var msg = name === 'agree' ? (el.checked ? '' : '개인정보 수집 및 이용에 동의해 주세요.') : rules[name](el.value.trim());
    setErr(name, msg);
    return !msg;
  }
  Object.keys(rules).forEach(function (n) { form.elements[n].addEventListener('blur', function () { check(n); }); });
  form.elements.agree.addEventListener('change', function () { check('agree'); });

  function say(cls, html) { status.className = 'formStatus ' + cls; status.innerHTML = html; }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (form.website.value) return; /* 자동 입력 프로그램 차단용 숨김 칸 */
    var names = Object.keys(rules).concat('agree');
    var bad = names.filter(function (n) { return !check(n); });
    var file = form.file && form.file.files[0];
    if (endpoint && file && file.size > MAX_FILE) { bad.push('file'); say('fail', '첨부파일은 5MB 이하만 보낼 수 있습니다.'); }
    if (bad.length) {
      if (bad[0] !== 'file') say('fail', '입력 내용을 다시 확인해 주세요. (' + bad.length + '개 항목)');
      var first = form.elements[bad[0]]; if (first) first.focus();
      return;
    }
    var data = {}; Object.keys(rules).forEach(function (n) { data[n] = form.elements[n].value.trim(); });
    var btn = form.querySelector('button[type=submit]');

    if (!endpoint) {
      var body = ['기업명: ' + data.company, '담당자명: ' + data.name, '연락처: ' + data.phone, '이메일: ' + data.email, '문의 유형: ' + data.type, '', data.message].join('\n');
      var href = 'mailto:' + mailto + '?subject=' + encodeURIComponent('[' + data.type + '] ' + data.subject) + '&body=' + encodeURIComponent(body);
      say('info', '메일 프로그램이 열립니다. <strong>열린 메일에서 보내기를 눌러야 문의가 접수됩니다.</strong><br>메일 프로그램이 열리지 않으면 <a href="mailto:' + mailto + '">' + mailto + '</a> 로 직접 보내 주세요.');
      window.location.href = href;
      return;
    }

    var fd = new FormData();
    Object.keys(data).forEach(function (k) { fd.append(k, data[k]); });
    fd.append('agree', 'Y');
    if (file) fd.append('file', file);
    btn.disabled = true; say('info', '문의를 보내는 중입니다…');
    fetch(endpoint, { method: 'POST', body: fd, headers: { 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest' } })
      .then(function (res) { return res.json().catch(function () { return {}; }).then(function (j) { return { ok: res.ok, j: j }; }); })
      .then(function (r) {
        /* 서버가 저장·전송을 확인해 준 경우에만 완료로 표시한다. (자체 서버: {status:true}, 폼 수신 서비스: {ok:true}) */
        if (r.ok && r.j.status !== false && r.j.ok !== false) { form.reset(); say('ok', '<strong>문의가 접수되었습니다.</strong> 담당자가 확인 후 연락드리겠습니다.'); }
        else throw new Error(r.j.message || 'fail');
      })
      .catch(function () { say('fail', '문의가 접수되지 않았습니다. 잠시 후 다시 시도하시거나 <a href="mailto:' + mailto + '">' + mailto + '</a> 또는 전화로 연락해 주세요.'); })
      .then(function () { btn.disabled = false; });
  });
})();
