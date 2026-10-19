# 🚀 PLBNB 애니메이션 시스템 - 빠른 시작 가이드

## ⚡ 즉시 사용 가능한 애니메이션

### 1️⃣ HTML에 클래스 추가하기

```html
<!-- 진입 애니메이션 -->
<div class="animate-fade-in-up">아래에서 위로 나타남</div>
<div class="animate-fade-in-left">좌측에서 나타남</div>
<div class="animate-fade-in-right">우측에서 나타남</div>

<!-- 회전 애니메이션 -->
<div class="animate-rotate">계속 회전</div>
<div class="animate-tada">축하 춤</div>
<div class="animate-swing">진자 운동</div>

<!-- 바운스 애니메이션 -->
<div class="animate-bounce">탄성 바운스</div>
<div class="animate-heartbeat">심장 박동</div>

<!-- 특수 효과 -->
<div class="animate-glow">빛나는 효과</div>
<div class="animate-shimmer">반짝거림</div>
```

### 2️⃣ 스크롤 트리거 애니메이션 (자동)

```html
<!-- 스크롤로 진입할 때 자동으로 나타남 -->
<div class="reveal">
  <p>스크롤하면 나타납니다</p>
</div>

<!-- 연쇄 애니메이션 (지연 적용) -->
<div class="reveal stagger-1">첫 번째</div>
<div class="reveal stagger-2">두 번째 (0.1s 지연)</div>
<div class="reveal stagger-3">세 번째 (0.2s 지연)</div>
```

### 3️⃣ 카운터 애니메이션

```html
<!-- 스크롤로 진입할 때 숫자가 세어집니다 -->
<span data-count="1000">0</span>
<span data-count="3000">0</span>
<span data-count="2026">0</span>
```

---

## 🎯 가장 자주 사용하는 애니메이션

| 클래스 | 효과 | 사용 예시 |
|--------|------|---------|
| `.animate-fade-in-up` | 위로 올라오며 나타남 | 본문 텍스트 |
| `.animate-fade-in-left` | 좌측에서 나타남 | 좌측 이미지 |
| `.animate-fade-in-right` | 우측에서 나타남 | 우측 이미지 |
| `.animate-scale-in` | 작아서 커지며 나타남 | 아이콘, 배지 |
| `.animate-rotate` | 계속 회전 | 로딩 아이콘 |
| `.animate-bounce` | 탄성있게 튀는 효과 | CTA 버튼 |
| `.animate-pulse` | 투명도 맥박 | 강조 텍스트 |
| `.animate-glow` | 빛나는 그림자 | 강조 박스 |
| `.animate-wave` | 물결 효과 | 리스트 아이템 |
| `.animate-float` | 둥둥 떠다니는 효과 | 이미지, 요소 |

---

## 🎬 현재 페이지에 적용된 위치

### ✅ 자동으로 작동하는 애니메이션

1. **히어로 섹션**
   - 제목 바운스 애니메이션
   - 배경 파라렉스 효과

2. **섹션 헤더들**
   - 제목 회전 바운스
   - 부제목 글로우 효과

3. **카드 (서비스, 사업소개)**
   - 스크롤 진입 시 나타남
   - 호버 시 3D 회전
   - 호버 시 아이콘 회전

4. **통계 / 숫자**
   - 자동 카운팅 애니메이션
   - 글로우 펄스 효과

5. **리스트 아이템**
   - 스크롤 진입 시 물결 효과
   - 호버 시 3D 회전

---

## 💡 커스텀 애니메이션 만들기

### 방법 1: 기존 클래스 조합

```html
<!-- 여러 효과를 함께 사용 -->
<div class="animate-bounce animate-glow">
  바운스하면서 빛남
</div>
```

### 방법 2: 인라인 스타일로 커스텀 지연 추가

```html
<div class="animate-fade-in-up" style="animation-delay: 0.5s;">
  0.5초 후에 나타남
</div>

<div class="animate-fade-in-up" style="animation-duration: 1.5s;">
  1.5초에 걸쳐 나타남
</div>
```

### 방법 3: JavaScript로 동적 적용

```javascript
// 요소에 클래스 추가
document.querySelector('.my-element').classList.add('animate-fade-in-up');

// 또는 스타일 직접 지정
document.querySelector('.my-element').style.animation = 
  'slideUpBounce 0.8s ease-out forwards';
```

---

## 🎨 애니메이션 세부 조정

### 애니메이션 속도 변경

```css
/* 기본: 0.8s (빠름) */
/* 느리게: 1.5s */
.my-element {
  animation: fadeInUp 1.5s ease-out forwards;
}

/* 매우 느리게: 2.5s */
.my-element {
  animation: fadeInUp 2.5s ease-out forwards;
}
```

### 애니메이션 지연

```css
/* 0.3초 후 시작 */
.my-element {
  animation: fadeInUp 0.8s ease-out 0.3s both;
}

/* 1초 후 시작 */
.my-element {
  animation: fadeInUp 0.8s ease-out 1s both;
}
```

### 이징 함수 변경

```css
/* 선형 진행 */
animation: fadeInUp 0.8s linear forwards;

/* 빠르게 시작, 느리게 끝남 */
animation: fadeInUp 0.8s ease-in-out forwards;

/* 바운싱 효과 */
animation: fadeInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
```

---

## 🔄 애니메이션 무한 반복

### 부호 표시하기 위한 반짝임

```html
<div class="animate-shimmer">
  주목할 콘텐츠
</div>

<div class="animate-glow">
  강조 요소
</div>

<div class="animate-pulse">
  중요 알림
</div>
```

### 로딩 표시기

```html
<div class="animate-rotate" style="width: 30px; height: 30px;">
  ⟳
</div>
```

---

## 📱 모바일에서의 애니메이션

모든 애니메이션은 모바일에서도 작동합니다!

```html
<!-- 모바일에서는 자동으로 최적화됨 -->
<div class="animate-fade-in-up">
  모바일에서도 부드럽게 작동
</div>
```

---

## ⚡ 성능 팁

### ✅ 좋은 예시

```html
<!-- 변환만 사용 (GPU 가속) -->
<div class="animate-fade-in-up">빠름</div>

<!-- opacity 변경 (빠름) -->
<div class="animate-pulse">빠름</div>
```

### ❌ 피해야 할 예시

```html
<!-- 많은 레이아웃 변경은 피하기 -->
<!-- width 애니메이션은 성능 저하 -->
```

---

## 🎯 실제 사용 예시

### 예시 1: 히어로 섹션 개선

```html
<section class="heroSingle">
  <div class="inner">
    <p class="eyebrow animate-fade-in-up">소개글</p>
    <h2 class="animate-fade-in-up" style="animation-delay: 0.2s;">
      PLBNB 유산균
    </h2>
    <button class="add-button animate-bounce" 
            style="animation-delay: 0.4s;">
      시작하기
    </button>
  </div>
</section>
```

### 예시 2: 카드 리스트 개선

```html
<div class="matList">
  <a href="#" class="reveal stagger-1">
    <h3>제품 1</h3>
  </a>
  <a href="#" class="reveal stagger-2">
    <h3>제품 2</h3>
  </a>
  <a href="#" class="reveal stagger-3">
    <h3>제품 3</h3>
  </a>
</div>
```

### 예시 3: 통계 섹션

```html
<div class="stat-box">
  <div class="stat-number">
    <span data-count="20">0</span>
  </div>
  <div class="stat-label">특허</div>
</div>
```

---

## 🆘 문제 해결

### 애니메이션이 작동하지 않음

```javascript
// 콘솔에서 확인
console.log(document.querySelector('.animate-fade-in-up').className);

// animation이 제대로 적용되었는지 확인
console.log(window.getComputedStyle(document.querySelector('.animate-fade-in-up')).animation);
```

### 스크롤 트리거가 작동하지 않음

```javascript
// reveal 클래스가 있는지 확인
console.log(document.querySelectorAll('.reveal').length);

// IntersectionObserver 확인
console.log('IntersectionObserver' in window);
```

### 성능이 느림

```javascript
// 동시에 실행 중인 애니메이션 수 확인
console.log(document.querySelectorAll('[style*="animation"]').length);
```

---

## 📚 더 알아보기

- **상세 가이드**: `ANIMATION_GUIDE.md`
- **변경사항**: `CHANGELOG.md`
- **기술 사항**: `UPDATES_SUMMARY.md`

---

## 🎓 애니메이션 이름 의미

| 이름 | 의미 | 효과 |
|------|------|------|
| Fade | 페이드 | 투명도 변화 |
| Slide | 슬라이드 | 위치 이동 |
| Bounce | 바운스 | 탄성 있는 움직임 |
| Rotate | 회전 | 각도 회전 |
| Scale | 스케일 | 크기 변화 |
| Flip | 플립 | 3D 뒤집기 |
| Glow | 글로우 | 빛 효과 |
| Pulse | 펄스 | 맥박 효과 |
| Wave | 물결 | 파동 효과 |
| Shimmer | 반짝임 | 반짝거림 |
| Blur | 블러 | 흐릿함 |
| Float | 떠다님 | 부유 효과 |

---

**마지막 수정**: 2026-10-19
**상태**: ✅ 30+ 애니메이션 활성화
**문서**: 빠른 시작 가이드
