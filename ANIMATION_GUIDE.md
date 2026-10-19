# PLBNB 메인페이지 애니메이션 가이드

## 🎬 추가된 다양한 모션 효과 (30+ 애니메이션)

### 📐 CSS 애니메이션 (@keyframes)

#### 1. 진입 애니메이션 (Entrance Animations)
- **fadeInUp** - 위에서 아래로 페이드 인
- **fadeInLeft** - 좌측에서 우측으로 페이드 인
- **fadeInRight** - 우측에서 좌측으로 페이드 인
- **slideInDown** - 위에서 아래로 슬라이드
- **slideInUp** - 아래에서 위로 슬라이드
- **slideInLeft** - 좌측에서 우측으로 슬라이드
- **slideInRight** - 우측에서 좌측으로 슬라이드
- **slideUpBounce** - 바운스 효과와 함께 위에서 아래로 슬라이드

#### 2. 스케일 및 확대 애니메이션
- **scaleIn** - 작은 크기에서 정상 크기로 확대
- **zoomInSmooth** - 부드러운 줌 인 효과
- **heartbeat** - 심장 박동처럼 크기 변화

#### 3. 회전 애니메이션
- **spinRotate** - 360도 연속 회전
- **rotateBounce** - 바운스 효과와 함께 회전
- **swing** - 진자 운동처럼 좌우 회전
- **tada** - 축하할 때의 춤 같은 회전
- **flipInX** - X축 기준 3D 플립
- **flipInY** - Y축 기준 3D 플립

#### 4. 변형 애니메이션
- **rubberBand** - 고무줄처럼 늘어났다 줄어드는 효과
- **jiggle** - 자잘한 흔들림
- **wave** - 물결 모양으로 위아래 움직임

#### 5. 특수 효과
- **bounce** - 탄성 있는 바운스
- **float** - 떠다니는 듯한 움직임
- **pulse** - 투명도 맥박 효과
- **glow** - 빛나는 그림자 효과
- **shimmer** - 반짝거리는 그라데이션 효과
- **blurIn** - 흐릿함에서 선명함으로 변화

---

### 🎯 JavaScript 인터랙션 애니메이션

#### 1. 스크롤 트리거 애니메이션
```javascript
IntersectionObserver를 활용한 자동 애니메이션 트리거
- 요소가 뷰포트에 진입할 때 자동으로 애니메이션 시작
- 섹션 헤더, 카드, 리스트 아이템 자동 애니메이션
- 스태거 효과로 연쇄적 애니메이션 (0.1s ~ 0.5s 지연)
```

#### 2. 파라렉스 효과 (Parallax Scrolling)
```javascript
requestAnimationFrame으로 부드러운 성능 구현
- 배경 이미지: 스크롤 시 0.5배 속도로 움직임
- 텍스트 요소: 스크롤 시 회전 효과 (회전각 = 스크롤 * 0.02)
- 백그라운드 이미지: 스크롤 시 스케일 증가 (1 + 스크롤 * 0.0001)
```

#### 3. 숫자 카운터 애니메이션
```javascript
- 스크롤로 요소가 보일 때 시작
- 2초 동안 부드럽게 숫자 증가
- easeOutQuad 이징으로 자연스러운 감속
- 한국어 포맷팅 (천 단위 구분)
```

#### 4. 호버 인터랙션
```javascript
3D 마우스 호버 효과:
- 마우스 위치 기반 rotateX, rotateY 계산
- perspective(1000px)으로 3D 효과
- scale(1.02)로 약간의 확대

버튼 호버:
- 마우스 진입 시 heartbeat 애니메이션
- 색상 변화 (hue-rotate)
- 그림자 강화
```

#### 5. 텍스트 글자별 애니메이션
```javascript
- 제목 텍스트를 글자별로 분할
- 각 글자에 개별 애니메이션 적용
- 약간의 지연으로 연쇄 효과 (각 글자마다 0.05s)
- slideUpBounce 애니메이션 사용
```

#### 6. 마우스 트래킹 효과
```javascript
- 마우스 위치 감지
- 섹션의 --mouse-x, --mouse-y CSS 변수 업데이트
- 광선 효과 (radial-gradient) 호버 시 표시
```

#### 7. 고급 스크롤 트리거
```javascript
- 섹션별로 다양한 애니메이션 자동 선택
- 무작위 애니메이션으로 다양성 제공
- slideInLeft, slideInRight, slideInDown, zoomInSmooth, flipInY 중 선택
```

---

### 🎨 호버 및 상호작용 효과

#### 카드 호버 효과
```css
기본 호버:
- translateY(-12px) - 위로 12px 상승
- box-shadow 강화 - 깊이감 추가

추가 효과:
- rotate-bounce 회전
- 아이콘 회전 (5deg) 및 확대 (1.1배)
- 광선 애니메이션 (gradient 슬라이드)
```

#### 버튼 호버
```css
- translateY(-4px) - 약간의 위치 변화
- box-shadow 강화
- ::before 요소의 left 애니메이션 (슬라이드)
- heartbeat 펄스 효과
```

#### 링크 호버
```css
- ::after 요소로 언더라인 애니메이션
- width: 0 → 100% 변화
- cubic-bezier(0.34, 1.56, 0.64, 1) 바운싱 이징
```

---

### 🔧 애니메이션 유틸리티 클래스

모든 애니메이션은 CSS 클래스로도 직접 적용 가능:

```css
.animate-fade-in-up
.animate-fade-in-down
.animate-fade-in-left
.animate-fade-in-right
.animate-scale-in
.animate-zoom-in
.animate-bounce
.animate-heartbeat
.animate-rubber-band
.animate-rotate
.animate-rotate-bounce
.animate-swing
.animate-tada
.animate-float
.animate-wave
.animate-jiggle
.animate-slide-left-bounce
.animate-slide-right-bounce
.animate-flip-x
.animate-flip-y
.animate-blur-in
.animate-pulse
.animate-glow
.animate-shimmer
```

---

### ⚡ 성능 최적화

1. **requestAnimationFrame 사용**
   - 부드러운 60fps 애니메이션 보장
   - 불필요한 리플로우/리페인트 최소화

2. **will-change 속성**
   - GPU 가속을 통한 성능 향상
   - transform, opacity 변경 요소에 적용

3. **IntersectionObserver**
   - 뷰포트 진입 감지로 불필요한 애니메이션 방지
   - 메모리 효율적인 구현

4. **Passive Event Listeners**
   - 스크롤 성능 향상
   - 부드러운 스크롤링 환경 제공

---

### 📱 적응형 애니메이션

- 모든 애니메이션은 반응형 디자인 고려
- 모바일 환경에서도 자연스러운 동작
- CSS 미디어 쿼리로 조정 가능

---

### 🎯 주요 애니메이션 위치

#### 히어로 섹션
- eyebrow: slideUpBounce (0.2s 지연)
- h2: slideUpBounce (0.4s 지연)
- p.sub: slideUpBounce (0.6s 지연)
- 배경: 파라렉스 + 스케일 변형

#### 섹션 헤더
- 제목: rotateBounce 또는 다양한 slideIn 애니메이션
- 부제목: glow 또는 다양한 진입 애니메이션
- 연쇄 지연: 0.15s 간격

#### 카드 (hc)
- 초기: slideUpBounce (지연 0.8s, 1.0s)
- 호버: 3D perspective 회전 + scale
- 스크롤 시: wave 애니메이션 (물결 효과)

#### 리스트 아이템 (matList)
- 초기: reveal + stagger (0.1s ~ 0.5s)
- 호버: 3D perspective 회전 + scale
- 스크롤 시: wave 애니메이션

#### 통계 박스
- 숫자: data-count 속성으로 카운터 애니메이션
- 배경: glow 펄스 효과
- 호버: scale + translateY

---

## 🚀 추가 활용 팁

### HTML에서 직접 적용
```html
<div class="animate-fade-in-up">콘텐츠</div>
<button class="animate-bounce">버튼</button>
<img class="animate-rotate" src="icon.png">
```

### 커스텀 지연 추가
```css
.my-element {
  animation: slideUpBounce 0.8s ease-out forwards;
  animation-delay: 0.5s;
}
```

### 애니메이션 조합
```css
.combined {
  animation: 
    slideUpBounce 0.8s ease-out,
    glow 2s ease-in-out infinite;
}
```

---

## 📊 애니메이션 통계

- **총 keyframe 애니메이션**: 23개
- **CSS 유틸리티 클래스**: 24개
- **JavaScript 인터랙션**: 7가지
- **호버 효과**: 5가지 이상
- **스크롤 트리거**: IntersectionObserver 기반

---

## ✅ 테스트 체크리스트

- [ ] 히어로 섹션 텍스트 바운스 애니메이션
- [ ] 섹션 진입 시 reveal 애니메이션
- [ ] 카드 호버 3D 효과
- [ ] 버튼 호버 pulse/heartbeat
- [ ] 숫자 카운터 애니메이션
- [ ] 파라렉스 스크롤 효과
- [ ] 텍스트 글자 분할 애니메이션
- [ ] 마우스 트래킹 광선 효과
- [ ] 모바일 반응형 애니메이션

---

**마지막 업데이트**: 2026-10-19
**애니메이션 시스템**: 활성화 (30+ 다양한 모션 효과)
