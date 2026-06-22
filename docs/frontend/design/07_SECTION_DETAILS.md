# 🎓 인공지능강사협회 웹사이트 컨셉

**섹션 7: 섹션별 상세 설계**

---

## 7. 섹션별 상세 설계

### 7.1 Hero Section (첫인상)

#### 레이아웃 구조
```
┌────────────────────────────────────────────────────────────┐
│                     [Navigation]                            │
├────────────────────────────────────────────────────────────┤
│                                                             │
│                    100vh Full Height                        │
│                                                             │
│              ╔════════════════════════╗                     │
│              ║   메인 슬로건 (큼)      ║                     │
│              ║                        ║                     │
│              ║   서브 카피 (중간)     ║                     │
│              ╚════════════════════════╝                     │
│                                                             │
│         [Primary CTA]  [Secondary CTA]                      │
│                                                             │
│                     ↓ Scroll Down                           │
│                                                             │
│  배경: 등불 빛 그라데이션 + 입자 효과                        │
└────────────────────────────────────────────────────────────┘
```

#### 콘텐츠 명세

**메인 슬로건**
```
AI 교육의 등불이 되어,
함께 성장합니다

[영문]
Illuminate with AI, Grow Together
```

**서브 카피**
```
대한민국 AI 교육을 선도하는 전문가 네트워크
검증된 강사와 수요처를 연결하는 신뢰의 플랫폼
```

**CTA 버튼**
```html
<!-- Primary CTA -->
<button class="btn-primary btn-large">
  지금 가입하기
  <icon>→</icon>
</button>

<!-- Secondary CTA -->
<button class="btn-outlined">
  더 알아보기
</button>
```

#### 시각 요소

**배경 이미지 / 그라데이션**
```css
.hero-background {
  background: linear-gradient(
    135deg,
    #1976D2 0%,    /* Primary Blue */
    #42A5F5 50%,   /* Light Blue */
    #FF9800 100%   /* Secondary Orange */
  );
  opacity: 0.9;
}

/* 오버레이 패턴 */
.hero-overlay {
  background-image: url('light-particles.svg');
  mix-blend-mode: screen;
  opacity: 0.3;
}
```

**애니메이션**
```javascript
// 타이틀 페이드인 (순차)
gsap.timeline()
  .from('.hero-title', {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  })
  .from('.hero-subtitle', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  }, '-=0.5')
  .from('.hero-cta', {
    y: 20,
    opacity: 0,
    duration: 0.6,
    stagger: 0.2
  }, '-=0.4');

// 배경 입자 애니메이션 (Parallax)
```

---

### 7.2 협회 소개 Section

#### 레이아웃
```
┌────────────────────────────────────────────────────────────┐
│                    [섹션 제목]                              │
│               "우리는 누구인가"                              │
├───────────────────────┬────────────────────────────────────┤
│                       │                                    │
│   [텍스트 영역]        │      [비주얼 영역]                  │
│                       │                                    │
│   • 협회 비전          │      [등불 일러스트]                │
│   • 설립 배경          │          +                         │
│   • 핵심 가치          │      [브릿지 심볼]                  │
│                       │                                    │
│   50% Width          │      50% Width                     │
└───────────────────────┴────────────────────────────────────┘
```

#### 콘텐츠

**섹션 제목**
```
우리는 AI 교육의 등불입니다
```

**본문**
```markdown
인공지능강사협회는 대한민국 AI 교육의 새로운 표준을 만듭니다.

대학, 기업, 공공기관에 검증된 AI 전문 강사를 연결하고,
강사 한 분 한 분의 지속적인 성장을 지원합니다.

우리는 단순한 인력 중개가 아닌,
AI 교육 생태계를 함께 만들어가는 커뮤니티입니다.
```

**핵심 가치 3가지**
```
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│ 🎯 전문성    │  │ 🤝 신뢰      │  │ 📈 성장      │
│             │  │             │  │             │
│ 검증된      │  │ 투명하고    │  │ 지속적인    │
│ 강사 풀      │  │ 체계적인    │  │ 역량 개발   │
└─────────────┘  └─────────────┘  └─────────────┘
```

---

### 7.3 숫자로 보는 협회 Section

#### 레이아웃 (4-Column Grid)
```
┌─────────────────────────────────────────────────────────┐
│              [섹션 제목: "숫자로 보는 협회"]              │
├─────────┬─────────┬──────────┬─────────────────────────┤
│         │         │          │                         │
│  [통계1] │  [통계2] │  [통계3]  │  [통계4]                │
│         │         │          │                         │
│   100+  │   50+   │    20+   │     4.5                 │
│  등록강사 │  파견건수 │  수요처   │    평균만족도           │
│         │         │          │                         │
└─────────┴─────────┴──────────┴─────────────────────────┘
```

#### 카드 구조
```html
<div class="stat-card">
  <div class="stat-icon">
    <img src="icon-instructors.svg" alt="강사">
  </div>
  
  <div class="stat-number" data-target="100">
    0  <!-- 카운터 애니메이션 -->
  </div>
  <div class="stat-unit">+</div>
  
  <div class="stat-label">
    등록 강사
  </div>
  
  <div class="stat-description">
    검증된 AI 전문가
  </div>
</div>
```

#### 스타일
```css
.stat-card {
  background: #FFFFFF;
  border-radius: 16px;
  padding: 32px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}

.stat-number {
  font-family: 'Inter', sans-serif;
  font-size: 48px;
  font-weight: 700;
  color: #1976D2;
  line-height: 1;
}

.stat-label {
  font-size: 16px;
  font-weight: 600;
  color: #212121;
  margin-top: 8px;
}

.stat-description {
  font-size: 14px;
  color: #757575;
  margin-top: 4px;
}
```

---

### 7.4 강사가 되면 달라지는 것들 Section

#### 레이아웃 (3-Column Cards)
```
┌────────────────────────────────────────────────────────────┐
│        [섹션 제목: "강사가 되면 달라지는 것들"]              │
├──────────────┬──────────────┬──────────────────────────────┤
│              │              │                              │
│   [Card 1]   │   [Card 2]   │   [Card 3]                   │
│   💼 강의기회 │   💰 수익보장 │   📈 성장지원                 │
│              │              │                              │
│   33.33%     │   33.33%     │   33.33%                     │
└──────────────┴──────────────┴──────────────────────────────┘
│              │              │                              │
│   [Card 4]   │              │                              │
│   🎓 브랜딩   │   (Optional) │                              │
│              │              │                              │
└──────────────┴──────────────┴──────────────────────────────┘
```

#### Card 상세 설계

**Card 1: 안정적인 강의 기회**
```html
<div class="benefit-card">
  <!-- 아이콘 -->
  <div class="card-icon">
    💼
  </div>
  
  <!-- 제목 -->
  <h3 class="card-title">
    안정적인 강의 기회
  </h3>
  
  <!-- 설명 -->
  <p class="card-description">
    대학, 기업, 공공기관 등 다양한 수요처와
    지속적으로 매칭됩니다.
  </p>
  
  <!-- 주요 수치 -->
  <div class="card-stats">
    <div class="stat-item">
      <span class="stat-value">연평균 12회</span>
      <span class="stat-label">강의 기회</span>
    </div>
    <div class="stat-item">
      <span class="stat-value">3-5일</span>
      <span class="stat-label">평균 매칭 기간</span>
    </div>
  </div>
  
  <!-- 세부 항목 -->
  <ul class="card-features">
    <li>✓ 맞춤형 기회 제안</li>
    <li>✓ 일정 자동 조율</li>
    <li>✓ 사전 준비 지원</li>
  </ul>
</div>
```

**Card 2: 투명한 수익 보장**
```
[아이콘] 💰

투명한 수익 보장

명확한 강사료 체계와 정산 프로세스로
안정적인 수익을 보장합니다.

[주요 수치]
• 월 평균 200-400만원 (활동 강사 기준)
• 15% 수수료 (업계 최저 수준)

[세부 항목]
✓ 투명한 정산 내역
✓ 월 2회 정기 정산
✓ 세금계산서 자동 발행
```

**Card 3: 지속적 성장 지원**
```
[아이콘] 📈

지속적 성장 지원

최신 AI 트렌드와 교수법을 학습하며
전문가로 성장할 수 있습니다.

[주요 수치]
• 월 2회 전문가 워크숍
• 100+ 강의 자료 라이브러리

[세부 항목]
✓ 커리큘럼 무료 제공
✓ 피드백 & 코칭
✓ 강사 커뮤니티 네트워킹
```

**Card 4: 전문가 브랜딩**
```
[아이콘] 🎓

전문가 브랜딩

협회 인증으로 신뢰도를 높이고
개인 브랜드를 구축하세요.

[세부 항목]
✓ 협회 인증 배지
✓ 프로필 페이지 제공
✓ 강의 실적 포트폴리오
```

#### 스타일
```css
.benefit-card {
  background: #FFFFFF;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  transition: all 0.3s ease;
  height: 100%;
}

.benefit-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}

.card-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.card-title {
  font-size: 24px;
  font-weight: 600;
  color: #212121;
  margin-bottom: 12px;
}

.card-description {
  font-size: 16px;
  line-height: 1.6;
  color: #757575;
  margin-bottom: 24px;
}

.card-features li {
  padding: 8px 0;
  font-size: 15px;
  color: #424242;
}

.card-features li::before {
  content: '✓';
  color: #4CAF50;
  font-weight: bold;
  margin-right: 8px;
}
```

---

### 7.5 가입 프로세스 Section

#### 레이아웃 (Horizontal Stepper)
```
┌────────────────────────────────────────────────────────────┐
│          [섹션 제목: "4단계로 시작하는 AI 강사"]             │
├────────────────────────────────────────────────────────────┤
│                                                             │
│   ① ────→  ② ────→  ③ ────→  ④                           │
│  온라인   서류검토   승인완료  첫 강의                       │
│  신청     1-2일     즉시알림   매칭                         │
│  (3분)                                                      │
│                                                             │
│  [각 스텝 상세 설명]                                        │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

#### Step Card 디자인
```html
<div class="step-container">
  
  <div class="step-card">
    <div class="step-number">1</div>
    <div class="step-icon">📝</div>
    <h4 class="step-title">온라인 신청</h4>
    <p class="step-time">약 3분 소요</p>
    <p class="step-description">
      간단한 정보 입력과 경력 증빙만으로
      신청이 완료됩니다.
    </p>
    <ul class="step-details">
      <li>기본 정보 입력</li>
      <li>경력 증빙 첨부</li>
      <li>전문 분야 선택</li>
    </ul>
  </div>
  
  <div class="step-arrow">→</div>
  
  <div class="step-card">
    <div class="step-number">2</div>
    <div class="step-icon">🔍</div>
    <h4 class="step-title">서류 검토</h4>
    <p class="step-time">1-2 영업일</p>
    <p class="step-description">
      협회 담당자가 신속하게 검토하고
      결과를 이메일로 안내합니다.
    </p>
  </div>
  
  <div class="step-arrow">→</div>
  
  <div class="step-card">
    <div class="step-number">3</div>
    <div class="step-icon">✅</div>
    <h4 class="step-title">승인 완료</h4>
    <p class="step-time">즉시 알림</p>
    <p class="step-description">
      승인 즉시 관리 솔루션 접근 권한이
      부여됩니다.
    </p>
  </div>
  
  <div class="step-arrow">→</div>
  
  <div class="step-card">
    <div class="step-number">4</div>
    <div class="step-icon">🎓</div>
    <h4 class="step-title">첫 강의 매칭</h4>
    <p class="step-time">승인 후 7일 내</p>
    <p class="step-description">
      맞춤형 강의 기회가 제안되고
      강사 활동이 시작됩니다.
    </p>
  </div>
  
</div>
```

---

### 7.6 성공 사례 Section

#### 레이아웃 (Carousel)
```
┌────────────────────────────────────────────────────────────┐
│        [섹션 제목: "함께 성장하는 강사들의 이야기"]          │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  ←  [Card 1]    [Card 2]    [Card 3]  →                    │
│                                                             │
│     ● ● ○ ○ ○  (Pagination Dots)                          │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

#### Success Story Card
```html
<div class="success-card">
  
  <!-- 강사 사진 -->
  <div class="instructor-photo">
    <img src="instructor-1.jpg" alt="김민수 강사">
  </div>
  
  <!-- 기본 정보 -->
  <div class="instructor-info">
    <h4 class="instructor-name">김민수</h4>
    <p class="instructor-field">머신러닝 전문</p>
    <p class="instructor-background">전 네이버 개발자</p>
  </div>
  
  <!-- 주요 성과 -->
  <div class="achievement-stats">
    <div class="stat">
      <span class="stat-number">15</span>
      <span class="stat-label">강의 건수</span>
    </div>
    <div class="stat">
      <span class="stat-number">300만원</span>
      <span class="stat-label">월 평균 수익</span>
    </div>
  </div>
  
  <!-- 후기 -->
  <blockquote class="testimonial">
    "퇴사 후 걱정이 많았는데, 협회 덕분에 안정적으로
     강의하며 더 많은 사람들과 AI 지식을 나누고 있습니다."
  </blockquote>
  
  <!-- 가입 시기 -->
  <p class="join-date">2025년 8월 가입</p>
  
</div>
```

#### 스타일
```css
.success-card {
  background: #FFFFFF;
  border-radius: 16px;
  padding: 32px;
  text-align: center;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
}

.instructor-photo img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #E3F2FD;
  margin-bottom: 16px;
}

.testimonial {
  font-size: 16px;
  line-height: 1.6;
  color: #424242;
  font-style: italic;
  padding: 20px;
  background: #F5F5F5;
  border-radius: 8px;
  border-left: 4px solid #FF9800;
  margin: 24px 0;
}

.testimonial::before {
  content: '"';
  font-size: 36px;
  color: #FF9800;
  line-height: 0;
}
```

---

### 7.7 FAQ Section

#### 레이아웃
```
┌────────────────────────────────────────────────────────────┐
│                 [섹션 제목: "자주 묻는 질문"]                │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  [검색창] 🔍 궁금한 내용을 검색하세요                        │
│                                                             │
│  ┌─────────────────────────────────────────────┐           │
│  │ Q. AI 교육 경험이 없어도 가입할 수 있나요?  │ ▼         │
│  └─────────────────────────────────────────────┘           │
│                                                             │
│  ┌─────────────────────────────────────────────┐           │
│  │ Q. 강사료는 어떻게 정해지나요?              │ ▼         │
│  └─────────────────────────────────────────────┘           │
│                                                             │
│  ┌─────────────────────────────────────────────┐           │
│  │ Q. 정산은 언제 이루어지나요?                │ ▲         │
│  ├─────────────────────────────────────────────┤           │
│  │ [답변 내용 펼침]                             │           │
│  │ 매월 15일과 말일, 월 2회 정산이 이루어집니다.│           │
│  │ 세금계산서는 자동으로 발행되며...            │           │
│  └─────────────────────────────────────────────┘           │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

#### 주요 FAQ 항목

```yaml
가입 조건:
  - Q: AI 교육 경험이 없어도 가입할 수 있나요?
    A: 네, 가능합니다. AI 관련 개발/연구 경력이 있다면 교육 경험이 없어도 협회가 교수법을 지원합니다.
  
  - Q: 정부 양성과정 수료자만 가입 가능한가요?
    A: 아니요. 실무 경력, 자격증, 학위 등 다양한 경로로 전문성을 인정받을 수 있습니다.

강사료 & 정산:
  - Q: 강사료는 어떻게 정해지나요?
    A: 교육 분야, 난이도, 시간에 따라 차등 적용됩니다. 평균적으로 시간당 8~15만원 수준입니다.
  
  - Q: 수수료는 얼마인가요?
    A: 15%의 플랫폼 수수료가 적용됩니다. (업계 평균 20~30% 대비 낮은 수준)

강의 준비:
  - Q: 강의 자료는 직접 만들어야 하나요?
    A: 협회에서 제공하는 표준 커리큘럼을 활용하거나, 직접 제작하실 수 있습니다.

계약 & 운영:
  - Q: 계약 기간은 어떻게 되나요?
    A: 협회 가입 후 자유롭게 활동하실 수 있으며, 별도 의무 기간은 없습니다.
```

---

### 7.8 Final CTA Section

#### 레이아웃
```
┌────────────────────────────────────────────────────────────┐
│                                                             │
│                  [Full-Width Gradient BG]                   │
│                                                             │
│              ╔══════════════════════════╗                   │
│              ║  지금 시작하세요          ║                   │
│              ║  기회는 준비된 자의 것     ║                   │
│              ╚══════════════════════════╝                   │
│                                                             │
│                 [Large CTA Button]                          │
│                   "가입 신청하기"                            │
│                                                             │
│              또는 문의: 02-1234-5678                        │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

#### HTML
```html
<section class="final-cta">
  <div class="container">
    
    <h2 class="cta-headline">
      지금 시작하세요
    </h2>
    
    <p class="cta-subheadline">
      기회는 준비된 자의 것입니다
    </p>
    
    <button class="btn-primary btn-xl" onclick="scrollToForm()">
      가입 신청하기 →
    </button>
    
    <p class="cta-contact">
      또는 전화 문의: <a href="tel:02-1234-5678">02-1234-5678</a>
    </p>
    
  </div>
</section>
```

#### 스타일
```css
.final-cta {
  background: linear-gradient(135deg, #1976D2, #FF9800);
  padding: 80px 0;
  text-align: center;
  color: #FFFFFF;
}

.cta-headline {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 16px;
}

.cta-subheadline {
  font-size: 20px;
  opacity: 0.9;
  margin-bottom: 32px;
}

.btn-xl {
  padding: 16px 48px;
  font-size: 18px;
  background: #FFFFFF;
  color: #1976D2;
  border-radius: 100px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.2);
}

.btn-xl:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 24px rgba(0,0,0,0.3);
}
```

---

## 📌 섹션별 설계 요약

```yaml
Hero: 
  - 100vh 전체 화면
  - 등불 그라데이션 배경
  - 명확한 2-CTA 구조

통계:
  - 4-Column 카드
  - 카운터 애니메이션
  - 호버 효과

혜택:
  - 3-4 Column 카드
  - 아이콘 + 통계 + 설명
  - 세부 체크리스트

프로세스:
  - Horizontal Stepper
  - 4단계 시각화
  - 화살표 연결

사례:
  - Carousel (3개)
  - 사진 + 통계 + 후기
  - 자동재생 + 수동조작

FAQ:
  - Accordion (펼침/접기)
  - 검색 기능
  - 카테고리 분류

Final CTA:
  - Full-width Gradient
  - Large Button
  - 연락처 제공
```

---

*다음: 10. 실행 가이드 (AI 프롬프트 템플릿)*
