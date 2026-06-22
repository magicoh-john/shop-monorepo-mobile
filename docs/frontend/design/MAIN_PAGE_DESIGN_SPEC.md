# 🏠 인공지능강사협회 메인 페이지 디자인 명세서

**버전**: 1.0 (Prototype)
**작성일**: 2026-02-14
**페이지 타입**: SPA (Single Page Application)

---

## 🎯 디자인 컨셉

**핵심 메타포**:
- 🧭 나침반 (Compass) - 방향 제시
- 🌉 브릿지 (Bridge) - 연결
- 🦅 날개 (Wings) - 성장

**디자인 톤**:
- 전문적이되 따뜻한
- 모던하되 과하지 않은
- 사명감과 꿈을 강조

---

## 📐 페이지 구조 (8개 섹션)

```
┌─────────────────────────────────────────────┐
│  Navigation (Sticky)                         │ 64px
├─────────────────────────────────────────────┤
│  1. Hero Section                            │ 100vh
├─────────────────────────────────────────────┤
│  2. 협회 소개 (About)                        │ auto
├─────────────────────────────────────────────┤
│  3. 숫자로 보는 협회 (Stats)                 │ auto
├─────────────────────────────────────────────┤
│  4. 강사가 되면 달라지는 것들 (Benefits)      │ auto
├─────────────────────────────────────────────┤
│  5. 가입 프로세스 (Process)                  │ auto
├─────────────────────────────────────────────┤
│  6. 성공 사례 (Testimonials)                │ auto
├─────────────────────────────────────────────┤
│  7. FAQ                                     │ auto
├─────────────────────────────────────────────┤
│  8. Final CTA                               │ 60vh
├─────────────────────────────────────────────┤
│  Footer                                     │ auto
└─────────────────────────────────────────────┘
```

---

## 🎨 색상 시스템

### 배경 색상 (톤 다운)

```css
/* Hero Section 배경 */
--hero-bg-start: #1E2329;    /* 약간 밝은 다크 */
--hero-bg-end: #2A3139;      /* 그라데이션 끝 */

/* 일반 섹션 배경 */
--section-bg-light: #FFFFFF;
--section-bg-gray: #F5F7FA;

/* Accent 색상 */
--primary: #1976D2;          /* Warm Blue */
--secondary: #FF9800;        /* Vibrant Orange */
--tertiary: #4CAF50;         /* Fresh Green */

/* Text */
--text-primary: #212121;
--text-secondary: #757575;
--text-inverse: #FFFFFF;
```

### 색상 사용 가이드

| 섹션 | 배경 | 텍스트 | Accent |
|------|------|--------|--------|
| Hero | Dark Gradient | White | Blue |
| About | White | Dark | Orange |
| Stats | Light Gray | Dark | Blue + Orange |
| Benefits | White | Dark | Green |
| Process | Light Gray | Dark | Blue |
| Testimonials | White | Dark | Orange |
| FAQ | Light Gray | Dark | Blue |
| Final CTA | Gradient (Blue→Orange) | White | - |

---

## 📱 반응형 브레이크포인트

```yaml
Mobile:
  - Max Width: 767px
  - Columns: 1 (Stack)
  - Font Scale: 0.8x

Tablet:
  - Min: 768px, Max: 1279px
  - Columns: 2
  - Font Scale: 0.9x

Desktop:
  - Min: 1280px, Max: 1920px
  - Columns: 2-4 (섹션별)
  - Font Scale: 1.0x

Wide:
  - Min: 1921px
  - Max Content: 1920px (중앙 정렬)
```

---

## 🔲 섹션별 상세 디자인

### 1. Hero Section (100vh)

#### 레이아웃
```
┌─────────────────────────────────────────────┐
│                                             │
│         [AI 기하학 배경 + Gradient Orb]      │
│                                             │
│         ┌─────────────────────┐             │
│         │  글라스모피즘 카드     │             │
│         │                     │             │
│         │  메인 타이틀 (크게)   │             │
│         │  서브 카피          │             │
│         │  [CTA] [CTA]        │             │
│         │                     │             │
│         └─────────────────────┘             │
│                                             │
│              ↓ Scroll                       │
│                                             │
└─────────────────────────────────────────────┘
```

#### HTML 구조
```html
<section id="hero" class="hero-section">
  <!-- 배경 레이어 -->
  <div class="hero-background">
    <div class="gradient-layer"></div>
    <canvas id="tech-grid"></canvas>
    <div class="gradient-orb orb-blue"></div>
    <div class="gradient-orb orb-purple"></div>
  </div>

  <!-- 콘텐츠 -->
  <div class="container">
    <div class="glass-card">
      <h1 class="hero-title">
        AI 교육의 미래를<br>
        함께 만들어갑니다
      </h1>

      <p class="hero-subtitle">
        당신의 전문성이 세상을 변화시킵니다
      </p>

      <div class="hero-cta-group">
        <button class="btn-primary btn-large">
          여정 시작하기
          <svg class="icon-arrow">...</svg>
        </button>
        <button class="btn-outlined btn-large">
          더 알아보기
        </button>
      </div>
    </div>
  </div>

  <!-- 스크롤 인디케이터 -->
  <div class="scroll-indicator">
    <span>Scroll</span>
    <div class="scroll-line"></div>
  </div>
</section>
```

#### CSS 스타일
```css
.hero-section {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* 배경 */
.hero-background {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.gradient-layer {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, #1E2329 0%, #2A3139 100%);
}

/* AI Gradient Orb */
.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.25;
  animation: float 25s ease-in-out infinite;
}

.orb-blue {
  width: 700px;
  height: 700px;
  background: radial-gradient(circle, #1976D2, #64B5F6);
  top: -15%;
  left: -10%;
}

.orb-purple {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, #9C27B0, #BA68C8);
  bottom: -15%;
  right: -10%;
  animation-delay: -12s;
}

/* 글라스모피즘 카드 */
.glass-card {
  position: relative;
  z-index: 10;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(30px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 32px;
  padding: 80px;
  max-width: 900px;
  text-align: center;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

/* 타이틀 */
.hero-title {
  font-family: 'Pretendard Variable', sans-serif;
  font-size: clamp(40px, 6vw, 72px);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 24px;

  /* 그라데이션 텍스트 */
  background: linear-gradient(135deg, #FFFFFF 0%, #B3D9FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-family: 'Pretendard Variable', sans-serif;
  font-size: clamp(18px, 2.5vw, 24px);
  font-weight: 400;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.6;
  margin-bottom: 48px;
}

/* CTA 버튼 */
.hero-cta-group {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-large {
  padding: 16px 40px;
  font-size: 16px;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.2, 0, 0, 1);
}

.btn-primary {
  background: linear-gradient(135deg, #1976D2, #42A5F5);
  color: #FFFFFF;
  border: none;
  box-shadow: 0 4px 16px rgba(25, 118, 210, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(25, 118, 210, 0.4);
}

.btn-outlined {
  background: transparent;
  color: #FFFFFF;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.btn-outlined:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.5);
}

/* 스크롤 인디케이터 */
.scroll-indicator {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.scroll-line {
  width: 1px;
  height: 40px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.6),
    transparent
  );
  animation: scrollPulse 2s ease-in-out infinite;
}

/* 애니메이션 */
@keyframes float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(30px, -30px) scale(1.05);
  }
  50% {
    transform: translate(-20px, 20px) scale(0.95);
  }
  75% {
    transform: translate(20px, 30px) scale(1.02);
  }
}

@keyframes scrollPulse {
  0%, 100% { opacity: 0.6; transform: translateY(0); }
  50% { opacity: 1; transform: translateY(10px); }
}

/* 반응형 */
@media (max-width: 767px) {
  .glass-card {
    padding: 48px 32px;
    border-radius: 24px;
  }

  .hero-cta-group {
    flex-direction: column;
    width: 100%;
  }

  .btn-large {
    width: 100%;
  }
}
```

#### JavaScript (기하학 그리드 + 파티클)
```javascript
// 기하학적 그리드 그리기
class TechGrid {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    this.draw();

    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  draw() {
    const gridSize = 50;
    const { width, height } = this.canvas;

    this.ctx.strokeStyle = 'rgba(25, 118, 210, 0.1)';
    this.ctx.lineWidth = 1;

    // 수직선
    for (let x = 0; x < width; x += gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, height);
      this.ctx.stroke();
    }

    // 수평선
    for (let y = 0; y < height; y += gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(width, y);
      this.ctx.stroke();
    }

    // 랜덤 점 (AI 느낌)
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const radius = Math.random() * 3 + 1;

      this.ctx.fillStyle = 'rgba(66, 165, 245, 0.4)';
      this.ctx.beginPath();
      this.ctx.arc(x, y, radius, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }
}

// 초기화
document.addEventListener('DOMContentLoaded', () => {
  new TechGrid('tech-grid');

  // 스크롤 인터랙션
  const orbs = document.querySelectorAll('.gradient-orb');

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    orbs.forEach((orb, index) => {
      const speed = (index + 1) * 0.3;
      orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
});
```

---

### 2. 협회 소개 (About)

#### 레이아웃
```
┌─────────────────────────────────────────────┐
│                                             │
│  [섹션 제목]                                 │
│  "AI 지식을 나누는 사명"                      │
│                                             │
│  ┌──────────────────┬──────────────────┐   │
│  │                  │                  │   │
│  │  [텍스트]         │  [비주얼]         │   │
│  │                  │                  │   │
│  │  • 사명 설명      │  [나침반 아이콘]   │   │
│  │  • 핵심 가치      │  [일러스트]       │   │
│  │                  │                  │   │
│  │  50%            │  50%             │   │
│  └──────────────────┴──────────────────┘   │
│                                             │
│  [핵심 가치 3가지 - 3 Column]                │
│  ┌──────┬──────┬──────┐                    │
│  │ 🧭   │ 🌉   │ 🦅   │                    │
│  └──────┴──────┴──────┘                    │
│                                             │
└─────────────────────────────────────────────┘
```

#### HTML
```html
<section id="about" class="about-section">
  <div class="container">

    <!-- 섹션 헤더 -->
    <div class="section-header">
      <h2 class="section-title">AI 지식을 나누는 사명</h2>
      <p class="section-subtitle">
        우리는 단순한 강사가 아닌, AI 시대를 이끄는 교육 리더입니다
      </p>
    </div>

    <!-- 2-Column 레이아웃 -->
    <div class="about-grid">
      <div class="about-content">
        <h3 class="content-title">
          전문가 커뮤니티로서의 협회
        </h3>
        <p class="content-text">
          인공지능강사협회는 AI 지식을 나누는 사명을 가진
          전문가들의 커뮤니티입니다.
        </p>
        <p class="content-text">
          대학, 기업, 사회 곳곳에 AI의 가능성을 전파하며,
          함께 성장하고, 함께 꿈을 실현합니다.
        </p>
        <p class="content-text">
          AI 시대를 이끄는 교육 리더로서 당신의 비전을 펼쳐보세요.
        </p>
      </div>

      <div class="about-visual">
        <!-- 나침반 아이콘 SVG -->
        <svg class="compass-icon" viewBox="0 0 200 200">
          <!-- SVG 코드 -->
        </svg>
      </div>
    </div>

    <!-- 핵심 가치 3가지 -->
    <div class="values-grid">
      <div class="value-card">
        <div class="value-icon">🧭</div>
        <h4 class="value-title">방향 제시</h4>
        <p class="value-description">
          AI 교육의 올바른 방향을 제시하는 전문가 집단
        </p>
      </div>

      <div class="value-card">
        <div class="value-icon">🌉</div>
        <h4 class="value-title">연결</h4>
        <p class="value-description">
          강사와 교육 기회를 연결하는 신뢰의 플랫폼
        </p>
      </div>

      <div class="value-card">
        <div class="value-icon">🦅</div>
        <h4 class="value-title">성장</h4>
        <p class="value-description">
          함께 성장하고 도약하는 전문가 네트워크
        </p>
      </div>
    </div>

  </div>
</section>
```

#### CSS
```css
.about-section {
  padding: 120px 0;
  background: #FFFFFF;
}

/* 섹션 헤더 */
.section-header {
  text-align: center;
  margin-bottom: 80px;
}

.section-title {
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 700;
  color: #212121;
  margin-bottom: 16px;
}

.section-subtitle {
  font-size: 18px;
  color: #757575;
  line-height: 1.6;
}

/* 2-Column Grid */
.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  margin-bottom: 80px;
}

.content-title {
  font-size: 28px;
  font-weight: 600;
  color: #212121;
  margin-bottom: 24px;
}

.content-text {
  font-size: 16px;
  line-height: 1.8;
  color: #424242;
  margin-bottom: 16px;
}

.compass-icon {
  width: 100%;
  max-width: 400px;
  height: auto;
}

/* 핵심 가치 3-Column */
.values-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}

.value-card {
  text-align: center;
  padding: 40px 24px;
  background: #F5F7FA;
  border-radius: 16px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.value-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.value-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.value-title {
  font-size: 20px;
  font-weight: 600;
  color: #212121;
  margin-bottom: 12px;
}

.value-description {
  font-size: 14px;
  line-height: 1.6;
  color: #757575;
}

/* 반응형 */
@media (max-width: 1023px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 48px;
  }

  .values-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
```

---

### 3. 숫자로 보는 협회 (Stats)

#### 레이아웃
```
┌─────────────────────────────────────────────┐
│                                             │
│  [섹션 제목]                                 │
│  "숫자로 보는 협회"                          │
│                                             │
│  ┌────────┬────────┬────────┬────────┐     │
│  │   👥   │   📚   │   🏢   │   ⭐   │     │
│  │  100+  │  50+   │  20+   │  4.5   │     │
│  │ 등록강사 │ 파견건수 │ 수요처  │ 만족도  │     │
│  └────────┴────────┴────────┴────────┘     │
│                                             │
└─────────────────────────────────────────────┘
```

#### HTML
```html
<section id="stats" class="stats-section">
  <div class="container">

    <div class="section-header">
      <h2 class="section-title">숫자로 보는 협회</h2>
    </div>

    <div class="stats-grid">

      <div class="stat-card" data-count="100">
        <div class="stat-icon">👥</div>
        <div class="stat-number">0</div>
        <div class="stat-unit">+</div>
        <div class="stat-label">등록 강사</div>
        <div class="stat-description">검증된 AI 전문가</div>
      </div>

      <div class="stat-card" data-count="50">
        <div class="stat-icon">📚</div>
        <div class="stat-number">0</div>
        <div class="stat-unit">+</div>
        <div class="stat-label">교육 파견</div>
        <div class="stat-description">성공적인 매칭</div>
      </div>

      <div class="stat-card" data-count="20">
        <div class="stat-icon">🏢</div>
        <div class="stat-number">0</div>
        <div class="stat-unit">+</div>
        <div class="stat-label">수요처</div>
        <div class="stat-description">대학·기업·공공</div>
      </div>

      <div class="stat-card" data-count="4.5" data-decimal="1">
        <div class="stat-icon">⭐</div>
        <div class="stat-number">0</div>
        <div class="stat-unit"></div>
        <div class="stat-label">평균 만족도</div>
        <div class="stat-description">5점 만점</div>
      </div>

    </div>

  </div>
</section>
```

#### CSS
```css
.stats-section {
  padding: 120px 0;
  background: #F5F7FA;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
}

.stat-card {
  background: #FFFFFF;
  border-radius: 20px;
  padding: 48px 32px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
}

.stat-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.stat-number {
  font-family: 'Inter', sans-serif;
  font-size: 56px;
  font-weight: 700;
  color: #1976D2;
  line-height: 1;
  margin-bottom: 8px;
  display: inline-block;
}

.stat-unit {
  font-family: 'Inter', sans-serif;
  font-size: 32px;
  font-weight: 600;
  color: #1976D2;
  display: inline-block;
  margin-left: 4px;
}

.stat-label {
  font-size: 18px;
  font-weight: 600;
  color: #212121;
  margin-bottom: 8px;
}

.stat-description {
  font-size: 14px;
  color: #757575;
}

/* 반응형 */
@media (max-width: 1023px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 767px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
```

#### JavaScript (카운터 애니메이션)
```javascript
class StatCounter {
  constructor() {
    this.observeStats();
  }

  observeStats() {
    const statCards = document.querySelectorAll('.stat-card');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
          this.animateCounter(entry.target);
          entry.target.classList.add('counted');
        }
      });
    }, { threshold: 0.5 });

    statCards.forEach(card => observer.observe(card));
  }

  animateCounter(card) {
    const numberEl = card.querySelector('.stat-number');
    const target = parseFloat(card.dataset.count);
    const decimal = parseInt(card.dataset.decimal) || 0;
    const duration = 2000;
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(duration / frameDuration);
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const currentValue = target * this.easeOutQuad(progress);

      numberEl.textContent = currentValue.toFixed(decimal);

      if (frame === totalFrames) {
        clearInterval(counter);
      }
    }, frameDuration);
  }

  easeOutQuad(t) {
    return t * (2 - t);
  }
}

// 초기화
document.addEventListener('DOMContentLoaded', () => {
  new StatCounter();
});
```

---

## 📦 필요한 에셋

### 이미지
- [ ] 나침반 일러스트 (SVG)
- [ ] 강사 프로필 사진 3-5장 (200x250px 이상)

### 아이콘
- Material Symbols (Google Fonts)
- 또는 Lucide React

### 폰트
```html
<!-- Pretendard Variable -->
<link rel="stylesheet" as="style" crossorigin
  href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css" />

<!-- Inter -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

---

## 🎬 애니메이션 요약

| 요소 | 애니메이션 | Duration | Easing |
|------|-----------|----------|--------|
| Hero Orb | float | 25s | ease-in-out |
| Hero Title | fadeInUp | 1s | cubic-bezier |
| Scroll Line | pulse | 2s | ease-in-out |
| Stat Number | countUp | 2s | easeOutQuad |
| Card Hover | translateY | 0.3s | ease |

---

## ✅ 다음 단계

1. **색상 최종 선택**: Hero 배경 톤 (Option A/B/C)
2. **프로토타입 구현**: Hero + About + Stats 섹션
3. **검토 및 피드백**
4. **승인 후 나머지 섹션 진행**

---

**프로토타입 구현 준비 완료!** 🚀
