# 🎓 인공지능강사협회 웹사이트 컨셉

**섹션 4: 디자인 시스템**

---

## 4. 디자인 시스템

### 4.1 선택 근거

#### 🎨 Material Design 3 (Primary Framework)

**선택 이유:**
1. **접근성 우수**: WCAG 2.1 AA 기준 충족
2. **한국 사용자 친숙도**: Android 생태계 익숙함
3. **반응형 최적화**: 모바일 퍼스트 철학
4. **확장성**: 컴포넌트 라이브러리 풍부
5. **Dynamic Color**: 브랜드 색상 자동 적용

**적용 범위:**
- 전체 레이아웃 그리드
- 버튼, 카드, 폼 등 기본 컴포넌트
- 모션 & 인터랙션 패턴
- 색상 시스템 (Material You)

#### 💼 Carbon for AI (Secondary Reference)

**선택 이유:**
1. **AI 전문성**: IBM의 AI 서비스 경험 반영
2. **데이터 시각화**: 통계, 그래프 표현 우수
3. **엔터프라이즈 신뢰감**: B2B 수요처 설득력
4. **일관된 톤**: 전문적이되 접근 가능

**적용 범위:**
- AI 관련 섹션 (강사 AI 활용도 표시 등)
- 데이터 대시보드 (통계 카운터)
- 프로페셔널 톤의 타이포그래피

#### 🍎 Apple HIG (Tertiary Reference)

**적용 원칙:**
- 미니멀리즘: 불필요한 요소 제거
- 여백의 미: 타이트하지 않은 레이아웃
- 타이포그래피 중심: 텍스트 가독성 최우선

---

### 4.2 색상 팔레트

#### 브랜드 컬러 시스템 (Material Design 3 기반)

**Primary Color: 따뜻한 블루 (Warm Blue)**
```
등불의 빛, 희망, 신뢰
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Light   #E3F2FD  ████████  배경, 서브 영역
Main    #1976D2  ████████  주요 버튼, 링크
Dark    #0D47A1  ████████  호버, 강조
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HEX: #1976D2
RGB: rgb(25, 118, 210)
용도: CTA 버튼, 주요 네비게이션, 링크
```

**Secondary Color: 활기찬 오렌지 (Vibrant Orange)**
```
열정, 성장, 기회
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Light   #FFE0B2  ████████  하이라이트
Main    #FF9800  ████████  액센트, 아이콘
Dark    #E65100  ████████  중요 정보
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HEX: #FF9800
RGB: rgb(255, 152, 0)
용도: 액센트, 성공 사례 강조, 아이콘
```

**Tertiary Color: 그린 (Fresh Green)**
```
성장, 승인, 긍정
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Light   #C8E6C9  ████████  성공 메시지
Main    #4CAF50  ████████  배지, 상태
Dark    #2E7D32  ████████  인증 마크
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HEX: #4CAF50
RGB: rgb(76, 175, 80)
용도: 상태 표시, 인증 배지, 성공 피드백
```

#### Neutral & Surface Colors

```yaml
Surface:
  Background: #FFFFFF     # 순백
  Surface: #F5F5F5        # 연한 회색
  Surface-Variant: #E0E0E0 # 구분선, 카드 경계

Text:
  Primary: #212121        # 본문
  Secondary: #757575      # 보조 텍스트
  Disabled: #BDBDBD       # 비활성

Elevation:
  Shadow-Light: rgba(0, 0, 0, 0.05)
  Shadow-Medium: rgba(0, 0, 0, 0.1)
  Shadow-Strong: rgba(0, 0, 0, 0.2)
```

#### 색상 활용 가이드

| 요소 | Primary | Secondary | Tertiary | Neutral |
|:---|:---:|:---:|:---:|:---:|
| **Hero CTA** | ✅ | ❌ | ❌ | ❌ |
| **서브 CTA** | ❌ | ✅ | ❌ | ❌ |
| **링크** | ✅ | ❌ | ❌ | ❌ |
| **아이콘** | ❌ | ✅ | ✅ | ❌ |
| **배지/칩** | ❌ | ❌ | ✅ | ✅ |
| **통계 카운터** | ✅ | ✅ | ❌ | ❌ |
| **성공 메시지** | ❌ | ❌ | ✅ | ❌ |
| **본문 텍스트** | ❌ | ❌ | ❌ | ✅ |

---

### 4.3 타이포그래피

#### 폰트 패밀리

**Primary: Pretendard** (한글)
```yaml
이유:
  - 한글 최적화 가독성
  - Variable Font 지원
  - 오픈소스 무료
  - 모던하고 친근한 인상

Weights:
  - Regular (400): 본문
  - Medium (500): 강조 텍스트
  - SemiBold (600): 소제목
  - Bold (700): 제목

CDN:
  <link rel="stylesheet" as="style" crossorigin
  href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css" />
```

**Secondary: Inter** (영문, 숫자)
```yaml
이유:
  - 영문 가독성 우수
  - 숫자 폭 균일 (Tabular)
  - Material Design 권장
  
Weights:
  - Regular (400)
  - Medium (500)
  - SemiBold (600)

Google Fonts:
  https://fonts.google.com/specimen/Inter
```

#### 타이포그래피 스케일 (Material Type Scale)

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Display Large (Hero)
  Font: Pretendard Bold
  Size: 57px / 64px (line height)
  용도: Hero 섹션 메인 타이틀
  예시: "AI 교육의 등불이 되어"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Headline Large (섹션 제목)
  Font: Pretendard Bold
  Size: 32px / 40px
  용도: 각 섹션 주제
  예시: "강사가 되면 달라지는 것들"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Title Large (카드 제목)
  Font: Pretendard SemiBold
  Size: 22px / 28px
  용도: 카드 헤더, 중요 정보
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Body Large (본문)
  Font: Pretendard Regular
  Size: 16px / 24px
  용도: 주요 설명 텍스트
  Color: #212121
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Body Medium (보조 본문)
  Font: Pretendard Regular
  Size: 14px / 20px
  용도: 보조 설명, 캡션
  Color: #757575
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Label Large (버튼)
  Font: Pretendard Medium
  Size: 14px / 20px
  용도: 버튼 텍스트, 탭
  Letter Spacing: 0.1px
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

#### 가독성 규칙

| 항목 | 기준 | 근거 |
|:---|:---|:---|
| **최소 본문 크기** | 16px | 모바일 가독성 |
| **최대 줄 길이** | 70자 | 눈의 피로도 최소화 |
| **줄간격** | 1.5배 이상 | WCAG 권장 |
| **문단 간격** | 1em 이상 | 호흡 공간 |
| **대비율** | 4.5:1 이상 | WCAG AA 기준 |

---

### 4.4 레이아웃 & 그리드

#### Material Design 3 Grid System

**12-Column Grid**
```
Desktop (1440px 기준)
┌─────────────────────────────────────────────┐
│ [Margin 24px] [12 Columns] [Margin 24px]   │
│                                             │
│  Column Width: 96px                         │
│  Gutter: 24px                               │
└─────────────────────────────────────────────┘

Tablet (768px ~ 1439px)
┌─────────────────────────────────────────────┐
│ [Margin 16px] [12 Columns] [Margin 16px]   │
│                                             │
│  Column Width: Variable                     │
│  Gutter: 16px                               │
└─────────────────────────────────────────────┘

Mobile (< 768px)
┌─────────────────────────────────────────────┐
│ [Margin 16px] [4 Columns] [Margin 16px]    │
│                                             │
│  Column Width: Variable                     │
│  Gutter: 16px                               │
└─────────────────────────────────────────────┘
```

#### 반응형 브레이크포인트

```yaml
Mobile:
  Min: 360px
  Max: 767px
  Columns: 4

Tablet:
  Min: 768px
  Max: 1439px
  Columns: 8

Desktop:
  Min: 1440px
  Max: 1920px
  Columns: 12

Wide:
  Min: 1921px
  Max-Content: 1920px (중앙 정렬)
```

#### 여백 시스템 (8px Grid)

```
Spacing Scale (Material Design 3)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4px   ▌ 아주 작은 간격 (아이콘-텍스트)
8px   ▌▌ 작은 간격 (버튼 패딩)
16px  ▌▌▌▌ 중간 간격 (카드 내부)
24px  ▌▌▌▌▌▌ 큰 간격 (섹션 내부)
32px  ▌▌▌▌▌▌▌▌ 섹션 간격
48px  ▌▌▌▌▌▌▌▌▌▌▌▌ 주요 섹션 구분
64px  ▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌ 대형 섹션 구분
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

### 4.5 컴포넌트 라이브러리

#### 핵심 컴포넌트 정의

**1. Buttons (Material Design 3)**

```css
/* Filled Button (Primary CTA) */
.btn-primary {
  background: #1976D2;
  color: #FFFFFF;
  padding: 10px 24px;
  border-radius: 100px; /* Fully rounded */
  font: Pretendard Medium 14px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.3);
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background: #1565C0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.4);
  transform: translateY(-1px);
}

/* Outlined Button (Secondary) */
.btn-secondary {
  background: transparent;
  color: #1976D2;
  border: 1px solid #1976D2;
  padding: 10px 24px;
  border-radius: 100px;
}

/* Text Button (Tertiary) */
.btn-text {
  background: transparent;
  color: #1976D2;
  padding: 10px 12px;
}
```

**2. Cards (Material Elevation)**

```css
.card {
  background: #FFFFFF;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12);
  transition: box-shadow 0.3s ease;
}

.card:hover {
  box-shadow: 0 4px 8px rgba(0,0,0,0.16);
}

/* Card with Image */
.card-image {
  border-radius: 12px 12px 0 0;
  overflow: hidden;
}
```

**3. Navigation (Top App Bar)**

```yaml
Desktop Navigation:
  Height: 64px
  Background: #FFFFFF
  Shadow: 0 2px 4px rgba(0,0,0,0.08)
  
  Logo:
    Position: Left
    Size: 180px × 40px
  
  Menu:
    Position: Center
    Items: [협회소개, 강사혜택, 성공사례, FAQ, 가입하기]
    Font: Pretendard Medium 15px
    Color: #212121
    Hover: #1976D2
  
  CTA Button:
    Position: Right
    Type: Filled Button
    Text: "지금 가입하기"

Mobile Navigation:
  Type: Bottom Navigation (Material Design 3)
  Height: 56px
  Icons: Material Symbols
```

**4. Form Fields**

```css
.text-field {
  border: 1px solid #E0E0E0;
  border-radius: 4px;
  padding: 12px 16px;
  font: Pretendard Regular 16px;
  background: #FAFAFA;
}

.text-field:focus {
  border-color: #1976D2;
  background: #FFFFFF;
  outline: none;
  box-shadow: 0 0 0 3px rgba(25,118,210,0.1);
}

/* Helper Text */
.helper-text {
  font: Pretendard Regular 12px;
  color: #757575;
  margin-top: 4px;
}
```

**5. Badges & Chips**

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 16px;
  font: Pretendard Medium 12px;
}

.badge-success {
  background: #E8F5E9;
  color: #2E7D32;
}

.badge-info {
  background: #E3F2FD;
  color: #1976D2;
}
```

---

### 4.6 모션 & 인터랙션

#### Material Motion System

**Easing (가속도 곡선)**
```javascript
// Material Design 3 Easing
Standard: cubic-bezier(0.2, 0.0, 0, 1.0)  // 기본 전환
Decelerate: cubic-bezier(0.0, 0.0, 0, 1)  // 진입
Accelerate: cubic-bezier(0.3, 0.0, 1, 1)  // 종료
```

**Duration (지속 시간)**
```yaml
Micro-interactions: 100ms    # 버튼 호버, 리플
Simple: 200ms                # 카드 확장, 메뉴
Complex: 300ms               # 페이지 전환, 모달
```

#### 핵심 애니메이션 패턴

**1. Fade In (섹션 진입)**
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.section-enter {
  animation: fadeInUp 0.6s cubic-bezier(0.2, 0.0, 0, 1.0);
}
```

**2. Scale (통계 카운터)**
```css
@keyframes scaleIn {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.stat-number {
  animation: scaleIn 0.4s cubic-bezier(0.2, 0.0, 0, 1.0);
}
```

**3. Ripple Effect (버튼)**
```javascript
// Material Ripple (JavaScript)
button.addEventListener('click', (e) => {
  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  button.appendChild(ripple);
  
  setTimeout(() => ripple.remove(), 600);
});
```

**4. Parallax Scroll (Hero)**
```javascript
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  hero.style.transform = `translateY(${scrolled * 0.5}px)`;
});
```

---

### 4.7 디자인 토큰 (CSS Variables)

```css
:root {
  /* Colors */
  --color-primary: #1976D2;
  --color-primary-hover: #1565C0;
  --color-secondary: #FF9800;
  --color-success: #4CAF50;
  
  --color-text-primary: #212121;
  --color-text-secondary: #757575;
  
  --color-surface: #FFFFFF;
  --color-background: #F5F5F5;
  
  /* Typography */
  --font-family: 'Pretendard Variable', -apple-system, sans-serif;
  --font-size-display: 57px;
  --font-size-headline: 32px;
  --font-size-title: 22px;
  --font-size-body: 16px;
  
  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  
  /* Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 100px;
  
  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.12);
  --shadow-md: 0 4px 8px rgba(0,0,0,0.16);
  --shadow-lg: 0 8px 16px rgba(0,0,0,0.2);
  
  /* Transitions */
  --transition-fast: 0.1s cubic-bezier(0.2, 0.0, 0, 1.0);
  --transition-base: 0.2s cubic-bezier(0.2, 0.0, 0, 1.0);
  --transition-slow: 0.3s cubic-bezier(0.2, 0.0, 0, 1.0);
}
```

---

## 📌 디자인 시스템 체크리스트

```yaml
✅ Framework: Material Design 3 (Primary)
✅ 색상: 따뜻한 블루 + 활기찬 오렌지 + 그린
✅ 폰트: Pretendard (한글) + Inter (영문)
✅ 그리드: 12-Column Responsive
✅ 컴포넌트: Button, Card, Form, Badge
✅ 모션: Fade, Scale, Ripple, Parallax
✅ 접근성: WCAG 2.1 AA 준수
```

---

*다음: 3. 웹사이트 구조 (사이트맵 & 사용자 여정)*
