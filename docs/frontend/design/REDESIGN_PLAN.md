# 🎓 인공지능강사협회 웹사이트 재기획안

**작성일**: 2026-02-14
**기반 문서**: Material Design 3 디자인 시스템

---

## 📌 기존 계획과의 차이점

| 항목 | 기존 계획 | 새 디자인 컨셉 |
|------|----------|---------------|
| **디자인 시스템** | 커스텀 (네이비+골드) | Material Design 3 (블루+오렌지) |
| **페이지 구조** | 멀티 페이지 (9개) | SPA - 8개 섹션 |
| **컬러 팔레트** | 딥 네이비 + 골드 | Warm Blue + Vibrant Orange |
| **핵심 메타포** | 없음 | 등불, 브릿지, 날개 |
| **브랜드 톤** | 전문적, 권위적 | 전문적이되 친근한 |

---

## 🎨 새 디자인 시스템

### 색상 팔레트 (Material Design 3)

```css
/* Primary: 따뜻한 블루 (신뢰, 희망) */
--primary-light: #E3F2FD;
--primary-main: #1976D2;
--primary-dark: #0D47A1;

/* Secondary: 활기찬 오렌지 (열정, 성장) */
--secondary-light: #FFE0B2;
--secondary-main: #FF9800;
--secondary-dark: #E65100;

/* Tertiary: 그린 (성장, 승인) */
--tertiary-light: #C8E6C9;
--tertiary-main: #4CAF50;
--tertiary-dark: #2E7D32;

/* Neutral */
--surface: #FFFFFF;
--background: #F5F5F5;
--text-primary: #212121;
--text-secondary: #757575;
```

### 타이포그래피

```yaml
Primary Font: Pretendard Variable
  - Display Large: 57px/64px (Bold) - Hero 타이틀
  - Headline Large: 32px/40px (Bold) - 섹션 제목
  - Title Large: 22px/28px (SemiBold) - 카드 제목
  - Body Large: 16px/24px (Regular) - 본문

Secondary Font: Inter
  - 숫자, 영문 전용
  - Tabular 숫자 (통계용)
```

### 컴포넌트 (Material Design 3)

- **Buttons**: Filled, Outlined, Text (100px 완전 둥근 모서리)
- **Cards**: Elevated, Filled, Outlined (12px 모서리)
- **Forms**: Material Text Fields
- **Navigation**: Top App Bar (Sticky)
- **Motion**: Standard Easing Curves

---

## 🏗️ 새 페이지 구조 (SPA)

### Single Page Application - 8개 섹션

```
┌─────────────────────────────────────────────┐
│  Navigation (Sticky)                         │
├─────────────────────────────────────────────┤
│  1. Hero Section (100vh)                    │
│     - 슬로건: "AI 교육의 등불이 되어..."      │
│     - 2 CTA 버튼                             │
│     - 그라데이션 배경 + 입자 효과             │
├─────────────────────────────────────────────┤
│  2. 협회 소개                                │
│     - 2-Column (텍스트 + 비주얼)             │
│     - 핵심 가치 3가지                        │
├─────────────────────────────────────────────┤
│  3. 숫자로 보는 협회                         │
│     - 4-Column Grid                         │
│     - 카운터 애니메이션                      │
│     - 등록강사 100+ / 파견 50+ / 수요처 20+  │
├─────────────────────────────────────────────┤
│  4. 강사가 되면 달라지는 것들                │
│     - 4-Column Cards                        │
│     - 💼 강의기회 / 💰 수익보장              │
│     - 📈 성장지원 / 🎓 브랜딩                │
├─────────────────────────────────────────────┤
│  5. 가입 프로세스 (How it Works)             │
│     - Horizontal Stepper (4단계)            │
│     - 온라인신청 → 서류검토 → 승인 → 매칭    │
├─────────────────────────────────────────────┤
│  6. 성공 사례 (Success Stories)              │
│     - Carousel (3개씩)                      │
│     - 강사 사진 + 성과 + 후기                │
├─────────────────────────────────────────────┤
│  7. FAQ                                     │
│     - Accordion (펼침/접기)                  │
│     - 검색 기능                              │
├─────────────────────────────────────────────┤
│  8. Final CTA                               │
│     - Full-Width Gradient                  │
│     - Large 가입 버튼                        │
└─────────────────────────────────────────────┘
```

### 내비게이션 간소화

```yaml
Desktop Navigation:
  - 협회소개 (Scroll to #about)
  - 강사혜택 (Scroll to #benefits)
  - 성공사례 (Scroll to #testimonials)
  - FAQ (Scroll to #faq)
  - [가입하기] (Primary CTA Button)

Mobile Navigation:
  - Hamburger Menu
  - Bottom Navigation (선택)
```

---

## 🎯 핵심 메타포와 비주얼 컨셉

### 3가지 핵심 메타포

**1. 🔦 등불 (Lighthouse)**
- **상징**: 사명감, 방향 제시, 계몽
- **적용**:
  - Hero 배경에 빛의 그라데이션
  - 로딩 애니메이션에 레이 효과
  - 로고 디자인에 등불 모티프

**2. 🌉 브릿지 (Bridge)**
- **상징**: 연결, 기회, 성장의 통로
- **적용**:
  - 강사-수요처 매칭 섹션에 연결선
  - 프로세스 스텝에 화살표 브릿지
  - 네트워크 그래프 시각화

**3. 🦅 날개 (Wings)**
- **상징**: 꿈, 도약, 가능성
- **적용**:
  - 성공 사례에 상승 모션
  - 통계 카운터 확장 애니메이션
  - 스크롤 시 부드러운 날아오름 효과

---

## 📱 사용자 여정 (User Journey)

```
방문자 입장 → Hero (3초 안에 가치 인지)
           ↓
   협회 소개 읽기 → 신뢰 구축
           ↓
   통계 확인 → 사회적 증거
           ↓
   혜택 탐색 → 가치 인식
           ↓
   프로세스 확인 → 불안 해소
           ↓
   성공 사례 → 공감 & 확신
           ↓
   FAQ → 마지막 의문 해결
           ↓
   가입 CTA 클릭 → 전환 ✅
```

**감정 설계**:
- 첫인상: 호기심 → 관심
- 중반: 기대 → 신뢰
- 후반: 확신 → 결단

---

## 🎬 애니메이션 & 인터랙션

### Material Motion System

**Easing Curves**:
```javascript
Standard: cubic-bezier(0.2, 0.0, 0, 1.0)  // 기본
Decelerate: cubic-bezier(0.0, 0.0, 0, 1)  // 진입
Accelerate: cubic-bezier(0.3, 0.0, 1, 1)  // 종료
```

**주요 애니메이션**:
1. **Hero 타이틀**: FadeInUp (순차 등장, stagger 0.2s)
2. **통계 카운터**: 0→100 카운팅 (2초, ease-out)
3. **카드 호버**: TranslateY(-4px) + Shadow
4. **스크롤 진입**: FadeInUp with Intersection Observer
5. **Parallax**: Hero 배경 (0.5x scroll speed)

---

## 🛠️ 기술 스택 (제안)

### Frontend

```yaml
Framework: Next.js 15
  - App Router (React Server Components)
  - Image Optimization
  - SEO 최적화

UI Library:
  - Tailwind CSS v4
  - Material Tailwind (Optional)
  - Headless UI

Animation:
  - Framer Motion (선호)
  - 또는 GSAP + ScrollTrigger

Form:
  - React Hook Form
  - Zod (검증)

Icons:
  - Material Symbols (Google)
  - 또는 Lucide React
```

### 컴포넌트 구조

```
apps/association-web/
├── app/
│   ├── layout.tsx
│   ├── page.tsx (SPA - All sections)
│   └── globals.css
├── components/
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Stats.tsx
│   │   ├── Benefits.tsx
│   │   ├── Process.tsx
│   │   ├── Testimonials.tsx
│   │   ├── FAQ.tsx
│   │   └── FinalCTA.tsx
│   ├── layout/
│   │   ├── Navigation.tsx
│   │   └── Footer.tsx
│   └── ui/ (Material Design 3)
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Input.tsx
│       └── Badge.tsx
└── lib/
    ├── animations.ts
    └── utils.ts
```

---

## 📋 개발 우선순위 (Phase 1 MVP)

### Week 1: 기반 작업
- [x] 디자인 시스템 파일명 영문 변경 ✅
- [ ] Material Design 3 컴포넌트 라이브러리 구축
  - Button (Filled, Outlined, Text)
  - Card (Elevated, Filled, Outlined)
  - Input (Material Text Field)
- [ ] 색상/타이포 CSS 변수 설정
- [ ] Navigation + Footer 구현

### Week 2: 핵심 섹션
- [ ] Hero Section (등불 그라데이션 + 애니메이션)
- [ ] 통계 카운터 (Intersection Observer)
- [ ] 강사 혜택 카드 (4-Column Grid)
- [ ] 프로세스 Stepper (4단계)

### Week 3: 콘텐츠 & 인터랙션
- [ ] 성공 사례 Carousel (Framer Motion)
- [ ] FAQ Accordion
- [ ] 협회 소개 섹션
- [ ] Final CTA

### Week 4: 통합 & 최적화
- [ ] Smooth Scroll 구현
- [ ] 반응형 테스트 (Mobile/Tablet/Desktop)
- [ ] Lighthouse 최적화 (90+ 목표)
- [ ] 접근성 검사 (WCAG 2.1 AA)

---

## 🎨 디자인 자산 필요 목록

### 이미지
- [ ] Hero 배경 (등불/빛 테마)
- [ ] 협회 로고 (SVG)
- [ ] 강사 프로필 사진 3-5장 (성공 사례용)
- [ ] 아이콘 세트 (Material Symbols)

### 일러스트레이션
- [ ] 등불 일러스트 (협회 소개용)
- [ ] 브릿지 연결선 (프로세스용)
- [ ] 성장 그래프 (혜택용)

### 애니메이션 리소스
- [ ] 빛 입자 SVG/Lottie
- [ ] 로딩 스피너 (등불 모티프)

---

## 📊 성능 목표

```yaml
Lighthouse Scores:
  Performance: 90+
  Accessibility: 95+
  Best Practices: 95+
  SEO: 100

Core Web Vitals:
  LCP: < 2.5s
  FID: < 100ms
  CLS: < 0.1

Page Weight:
  Initial: < 500KB
  Total: < 2MB
```

---

## 🚀 다음 단계

1. **Task 재구성**:
   - 기존 Task #6~11 삭제
   - Material Design 3 기반 새 Task 생성

2. **컴포넌트 라이브러리 구축**:
   - Button, Card, Input 컴포넌트 먼저 제작
   - Storybook 설정 (선택)

3. **Hero Section부터 시작**:
   - 첫인상이 가장 중요
   - 그라데이션 배경 + 애니메이션 구현

4. **점진적 구축**:
   - 섹션별로 순차 개발
   - 각 섹션 완성 후 테스트

---

## 💡 핵심 포인트

**이 재기획의 차별점**:
1. ✅ **Material Design 3 기반** - 검증된 디자인 시스템
2. ✅ **SPA 구조** - 부드러운 사용자 경험
3. ✅ **명확한 메타포** - 등불, 브릿지, 날개
4. ✅ **감정 설계** - 호기심 → 신뢰 → 확신 → 전환
5. ✅ **성능 우선** - Lighthouse 90+ 목표

**기대 효과**:
- 🎯 전환율 향상 (명확한 CTA, 간소화된 여정)
- 🚀 빠른 로딩 (SPA, 최적화)
- 📱 모바일 친화적 (Material Design 3)
- ♿ 접근성 우수 (WCAG 준수)

---

**최종 승인 후 즉시 개발 시작 가능합니다!** 🎉
