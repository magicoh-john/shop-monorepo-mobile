# 🎓 인공지능강사협회 웹사이트 컨셉

**섹션 10: 실행 가이드 (AI 프롬프트 템플릿)**

---

## 10. 실행 가이드

### 10.1 프로젝트 시작 프롬프트 (전체)

#### 🤖 Claude / ChatGPT에게 줄 마스터 프롬프트

```markdown
# 인공지능강사협회 웹사이트 디자인 프롬프트

## 역할
당신은 Material Design 3와 Carbon for AI 전문가입니다.
한국의 AI 교육 플랫폼을 위한 웹사이트를 디자인합니다.

## 프로젝트 개요
- **서비스명**: 인공지능강사협회
- **타겟**: AI 강사 희망자 (25-40세, IT 경력자)
- **목적**: 강사 가입 유도 (회원가입 전환율 최대화)
- **톤**: 전문적이되 친근한, 희망적인

## 디자인 시스템
**기반 프레임워크**: Material Design 3
- 참고: https://m3.material.io/

**색상 팔레트**:
```css
Primary: #1976D2 (Warm Blue - 신뢰, 전문성)
Secondary: #FF9800 (Vibrant Orange - 열정, 성장)
Success: #4CAF50 (Green - 승인, 긍정)

Text Primary: #212121
Text Secondary: #757575
Surface: #FFFFFF
Background: #F5F5F5
```

**타이포그래피**:
- 한글: Pretendard Variable (400, 500, 600, 700)
- 영문/숫자: Inter (400, 500, 600)
- 본문 최소: 16px
- 줄간격: 1.5~1.6

**그리드**:
- 12-Column Grid
- Desktop Margin: 24px
- Mobile Margin: 16px
- Gutter: 24px (Desktop), 16px (Mobile)

## 핵심 메타포
1. 🔦 등불 (Lighthouse) - 사명감, 계몽
2. 🌉 브릿지 (Bridge) - 연결, 기회
3. 🦅 날개 (Wings) - 성장, 도약

## 페이지 구조
Single Page Application (SPA) - 8개 섹션:

1. Hero Section (100vh)
2. 협회 소개
3. 숫자로 보는 협회 (통계 카운터)
4. 강사가 되면 달라지는 것들 (4개 카드)
5. 가입 프로세스 (4단계 Stepper)
6. 성공 사례 (Carousel)
7. FAQ (Accordion)
8. Final CTA

## 필수 요구사항
- ✅ 모바일 퍼스트 (Mobile First)
- ✅ WCAG 2.1 AA 접근성 준수
- ✅ 페이지 로드 3초 이내
- ✅ 부드러운 스크롤 애니메이션
- ✅ Lighthouse 90+ 점수

## 우선순위
1. **명확성**: 3초 안에 가치 전달
2. **신뢰성**: 데이터와 증거 기반
3. **전환**: CTA 명확, 가입 프로세스 간소화

이 정보를 바탕으로 [원하는 작업]을 수행해주세요.
```

---

### 10.2 섹션별 상세 프롬프트

#### 📍 Hero Section 디자인 프롬프트

```markdown
# Hero Section 디자인 요청

## 요구사항
Material Design 3 스타일의 Hero Section을 디자인해주세요.

## 레이아웃
- 높이: 100vh
- 배경: 따뜻한 블루(#1976D2)에서 오렌지(#FF9800)로의 그라데이션 (135도)
- 오버레이: 빛 입자 효과 (opacity 0.3)

## 콘텐츠
**메인 슬로건**:
```
AI 교육의 등불이 되어,
함께 성장합니다
```
- 폰트: Pretendard Bold, 57px
- 색상: #FFFFFF
- 애니메이션: 페이드인 + 위에서 아래 (0.5초 delay)

**서브 카피**:
```
대한민국 AI 교육을 선도하는 전문가 네트워크
```
- 폰트: Pretendard Regular, 20px
- 색상: #FFFFFF, opacity 0.9

**CTA 버튼**:
- Primary: "지금 가입하기" (Filled Button, #FFFFFF bg, #1976D2 text)
- Secondary: "더 알아보기" (Outlined Button, #FFFFFF border)
- 간격: 16px
- 호버: Scale(1.05), Shadow 강화

## 모션
- 타이틀: fadeInUp (1s, cubic-bezier(0.2, 0, 0, 1))
- 서브: fadeInUp (0.8s, 0.5s delay)
- 버튼: fadeInUp (0.6s, 0.7s delay)
- 배경: Parallax scroll (0.5x speed)

## 반응형
- Desktop (>1440px): 슬로건 57px
- Tablet (768-1439px): 슬로건 42px
- Mobile (<768px): 슬로건 32px, 버튼 세로 배치

React + Tailwind 또는 HTML + CSS로 코드를 작성해주세요.
```

---

#### 📍 통계 카운터 프롬프트 (JavaScript)

```markdown
# 통계 카운터 애니메이션 구현

## 요구사항
스크롤 시 트리거되는 숫자 카운팅 애니메이션을 만들어주세요.

## 데이터
```javascript
const stats = [
  { icon: '👥', number: 100, unit: '+', label: '등록 강사', desc: '검증된 AI 전문가' },
  { icon: '📚', number: 50, unit: '+', label: '파견 건수', desc: '성공적인 매칭' },
  { icon: '🏢', number: 20, unit: '+', label: '수요처', desc: '대학·기업·공공' },
  { icon: '⭐', number: 4.5, unit: '', label: '평균 만족도', desc: '5점 만점' }
];
```

## 기능
1. Intersection Observer로 뷰포트 진입 감지
2. 0부터 타겟 숫자까지 카운팅 (2초 동안)
3. Ease-out 곡선 적용
4. 한 번만 실행 (재진입 시 실행 X)

## 애니메이션
- Duration: 2000ms
- Easing: ease-out
- 소수점: 1자리까지 표시 (4.5 같은 경우)

## 스타일
- Card: 16px 둥근 모서리, 그림자
- 숫자: Inter Bold, 48px, #1976D2
- 라벨: Pretendard Medium, 16px, #212121

Vanilla JavaScript + CSS 또는 React + Framer Motion으로 구현해주세요.
```

---

#### 📍 가입 폼 프롬프트

```markdown
# 강사 가입 신청 폼 구현

## 요구사항
Material Design 3 스타일의 다단계 폼을 만들어주세요.

## 폼 필드
**Step 1: 기본 정보**
```javascript
{
  name: { type: 'text', required: true, label: '이름' },
  email: { type: 'email', required: true, label: '이메일' },
  phone: { type: 'tel', required: true, label: '연락처', format: '010-0000-0000' }
}
```

**Step 2: 경력 정보**
```javascript
{
  expertise: { 
    type: 'checkbox-group', 
    required: true,
    label: '전문 분야 (복수선택)',
    options: ['머신러닝', '딥러닝', 'NLP', 'Computer Vision', 'LLM/RAG', '기타']
  },
  experience: {
    type: 'select',
    required: true,
    label: '경력 년수',
    options: ['1년 미만', '1-3년', '3-5년', '5-10년', '10년 이상']
  },
  background: {
    type: 'textarea',
    required: true,
    label: '주요 이력',
    placeholder: '예) 삼성전자 AI 연구소 5년, PyTorch 기반 NLP 모델 개발'
  }
}
```

**Step 3: 첨부 파일**
```javascript
{
  resume: {
    type: 'file',
    required: true,
    label: '이력서',
    accept: '.pdf,.doc,.docx',
    maxSize: '5MB'
  },
  certificate: {
    type: 'file',
    required: false,
    label: '수료증/자격증 (선택)',
    accept: '.pdf,.jpg,.png',
    maxSize: '5MB'
  }
}
```

## 검증
- 실시간 유효성 검사
- 이메일 형식 체크
- 전화번호 형식: 010-0000-0000
- 필수 항목 미입력 시 빨간 테두리 + 에러 메시지

## UI/UX
- Progress Bar (상단): 0% → 33% → 66% → 100%
- 버튼: "다음", "이전", "제출"
- 제출 중: 버튼 비활성 + 로딩 스피너
- 성공 시: 체크 아이콘 + "신청 완료!" 메시지

## 애니메이션
- Step 전환: Slide (300ms)
- 에러: Shake (200ms)
- 성공: Scale + Fade (500ms)

React Hook Form + Zod 또는 Vanilla JavaScript로 구현해주세요.
```

---

### 10.3 컴포넌트별 프롬프트

#### 🎴 Card 컴포넌트

```markdown
# Material Design 3 Card 컴포넌트

## 요구사항
재사용 가능한 Card 컴포넌트를 만들어주세요.

## Props
```typescript
interface CardProps {
  variant?: 'elevated' | 'filled' | 'outlined';
  padding?: 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  clickable?: boolean;
  children: React.ReactNode;
}
```

## 스타일 (variant별)
**Elevated** (기본):
- Background: #FFFFFF
- Shadow: 0 1px 3px rgba(0,0,0,0.12)
- Hover: 0 4px 8px rgba(0,0,0,0.16)

**Filled**:
- Background: #F5F5F5
- Shadow: none

**Outlined**:
- Background: #FFFFFF
- Border: 1px solid #E0E0E0
- Shadow: none

## 호버 효과 (hoverable=true)
- Transform: translateY(-4px)
- Transition: 0.3s ease
- Cursor: pointer (clickable=true일 때)

## 사용 예시
```jsx
<Card variant="elevated" hoverable>
  <h3>카드 제목</h3>
  <p>카드 내용</p>
</Card>
```

React + TypeScript + Tailwind CSS로 구현해주세요.
```

---

#### 🔘 Button 컴포넌트

```markdown
# Material Design 3 Button 컴포넌트

## Variants
1. **Filled**: Primary CTA
2. **Outlined**: Secondary CTA
3. **Text**: Tertiary CTA

## Props
```typescript
interface ButtonProps {
  variant?: 'filled' | 'outlined' | 'text';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}
```

## 스타일
**Filled**:
```css
background: #1976D2
color: #FFFFFF
padding: 10px 24px (md)
border-radius: 100px
font: Pretendard Medium 14px

hover:
  background: #1565C0
  shadow: 0 2px 4px rgba(0,0,0,0.4)
  transform: translateY(-1px)
```

**Outlined**:
```css
background: transparent
color: #1976D2
border: 1px solid #1976D2
padding: 10px 24px
border-radius: 100px
```

**Text**:
```css
background: transparent
color: #1976D2
padding: 10px 12px
border-radius: 4px
```

## Size 변형
- sm: padding 8px 16px, font 12px
- md: padding 10px 24px, font 14px (기본)
- lg: padding 16px 48px, font 18px

## Loading 상태
- 스피너 표시
- 버튼 텍스트 opacity 0.6
- disabled 적용

React + TypeScript로 구현해주세요.
```

---

### 10.4 애니메이션 프롬프트

```markdown
# 스크롤 애니메이션 구현

## 라이브러리
GSAP + ScrollTrigger 또는 Framer Motion

## 애니메이션 패턴

**1. Fade In Up**
```javascript
gsap.from('.section', {
  scrollTrigger: {
    trigger: '.section',
    start: 'top 80%',
    end: 'top 50%',
    scrub: true
  },
  y: 50,
  opacity: 0,
  duration: 1,
  ease: 'power3.out'
});
```

**2. Stagger (순차 등장)**
```javascript
gsap.from('.card', {
  scrollTrigger: {
    trigger: '.card-container',
    start: 'top 70%'
  },
  y: 30,
  opacity: 0,
  duration: 0.6,
  stagger: 0.2,  // 0.2초 간격
  ease: 'power2.out'
});
```

**3. Number Counter**
```javascript
gsap.to('.stat-number', {
  scrollTrigger: {
    trigger: '.stat-number',
    start: 'top 80%',
    once: true
  },
  textContent: 100,
  duration: 2,
  ease: 'power1.out',
  snap: { textContent: 1 },  // 정수로 snap
  onUpdate: function() {
    this.targets()[0].textContent = Math.ceil(this.targets()[0].textContent);
  }
});
```

## 성능 최적화
- will-change: transform, opacity
- transform: translateZ(0) (하드웨어 가속)
- Intersection Observer로 뷰포트 체크

GSAP 3 + ScrollTrigger로 구현해주세요.
```

---

### 10.5 완성된 페이지 생성 프롬프트

```markdown
# 인공지능강사협회 완전한 랜딩페이지 생성

## 요청
위에서 제공한 모든 디자인 시스템과 섹션 정보를 바탕으로
완전한 싱글 페이지 웹사이트를 생성해주세요.

## 기술 스택
**추천 Option 1**: Next.js 14 + TypeScript + Tailwind CSS
**추천 Option 2**: React + Vite + TypeScript + Tailwind CSS
**추천 Option 3**: HTML + CSS + Vanilla JavaScript (순수)

## 필수 포함 사항
✅ 모든 섹션 (Hero ~ Final CTA)
✅ 반응형 디자인 (Mobile / Tablet / Desktop)
✅ 부드러운 스크롤 애니메이션
✅ 통계 카운터 애니메이션
✅ 가입 폼 (검증 포함)
✅ FAQ 아코디언
✅ 성공 사례 Carousel
✅ Material Design 3 컴포넌트

## 폴더 구조
```
src/
├── components/
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Stats.tsx
│   ├── Benefits.tsx
│   ├── Process.tsx
│   ├── Testimonials.tsx
│   ├── FAQ.tsx
│   ├── FinalCTA.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       └── Input.tsx
├── styles/
│   └── globals.css
├── utils/
│   └── animations.ts
└── App.tsx
```

## 최적화
- 이미지: WebP 포맷, Lazy Loading
- 폰트: Variable Font (Pretendard)
- Code Splitting: 섹션별 동적 import
- CSS: Critical CSS 인라인

## 접근성
- ARIA 레이블
- 키보드 네비게이션
- Alt 텍스트
- 충분한 대비율

전체 코드를 생성해주세요.
```

---

### 10.6 배포 & 테스트 가이드

```markdown
# 배포 체크리스트

## Pre-launch
□ Lighthouse 테스트 (Performance 90+)
□ 모바일 반응형 확인 (iPhone, Galaxy)
□ 크로스 브라우저 테스트 (Chrome, Safari, Firefox)
□ 접근성 검사 (WAVE, axe)
□ 로딩 속도 (<3초)
□ 폼 제출 테스트
□ GA4 / GTM 설정
□ 메타 태그 (OG, Twitter Card)
□ Favicon 세트
□ robots.txt, sitemap.xml

## 배포 플랫폼
**추천**: Vercel (Next.js) 또는 Netlify (React)

## 환경 변수
```env
NEXT_PUBLIC_FORM_ENDPOINT=
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_GTM_ID=
```

## 성능 목표
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- Time to Interactive: < 3.5s
```

---

## 📌 실행 가이드 요약

```yaml
마스터_프롬프트:
  - 전체 프로젝트 컨텍스트 제공
  - 디자인 시스템 명시
  - 핵심 요구사항 정리

섹션별_프롬프트:
  - Hero: 그라데이션 + 애니메이션
  - Stats: 카운터 애니메이션
  - Form: 다단계 + 검증

컴포넌트_프롬프트:
  - Card: 3가지 variant
  - Button: 3가지 크기
  - Input: Material Design 3

완성_프롬프트:
  - 전체 페이지 생성
  - 기술 스택 지정
  - 최적화 포함

배포:
  - Vercel / Netlify
  - Lighthouse 90+
  - 접근성 준수
```

---

## 🎯 AI에게 요청하는 최종 팁

### ✅ 좋은 프롬프트
```
"Material Design 3 기반으로 Hero Section을 만들되,
배경은 #1976D2에서 #FF9800로의 그라데이션,
메인 타이틀은 Pretendard Bold 57px,
페이드인 애니메이션을 포함해주세요.
React + Tailwind로 구현하고, 모바일 반응형도 고려해주세요."
```

### ❌ 나쁜 프롬프트
```
"멋진 Hero Section 만들어줘"
```

### 핵심 원칙
1. **구체적으로**: 색상, 크기, 폰트 명시
2. **기술 스택 지정**: React? Vanilla JS?
3. **반응형 언급**: 모바일도 고려
4. **애니메이션 명시**: 어떤 효과를 원하는지

---

*모든 섹션 완료! 🎉*
*이제 AI에게 프롬프트를 제공하여 실제 웹사이트를 생성할 수 있습니다.*
