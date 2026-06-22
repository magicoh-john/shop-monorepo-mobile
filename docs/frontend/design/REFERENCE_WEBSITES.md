# 참고 웹사이트 분석

> **작성일**: 2026-02-14
> **목적**: association-web 디자인 및 구조 참고

---

## 개요

인공지능강사협회 웹사이트 개발 시 참고한 5개 웹사이트의 분석 내용과 적용 사항을 정리합니다.

---

## 1. Jeton.com

**URL**: https://www.jeton.com/

### 참고 목적
- 현대적인 디자인 트렌드 파악
- Glassmorphism, Scroll Animations 등 UI/UX 요소

### 분석 결과

**디자인 요소:**
- **Glassmorphism (글래스모피즘)**
  - `backdrop-filter: blur()` 효과
  - 반투명 배경 + 블러 처리
  - 현대적이고 세련된 느낌

- **Geometric Shapes (기하학적 도형)**
  - 배경에 subtle한 패턴
  - Grid, Dots 등

- **Scroll Animations**
  - Parallax 효과
  - Fade-in, Slide-up 애니메이션

- **Gradient**
  - 부드러운 색상 전환
  - 텍스트 그라디언트

### 우리 사이트 적용

✅ **Hero 섹션:**
- Glassmorphism 카드 (텍스트 영역)
- Subtle gradient 배경 (#E8F4F8 → #F5E6F1)
- Geometric pattern (CSS radial-gradient 점 패턴)
- Parallax scroll effect
- Gradient text (3색: Blue → Purple → Orange)

✅ **Navigation:**
- Glassmorphism 효과
- `backdrop-filter: blur(20px)`
- 스크롤 시 배경 변화

**적용 코드 예시:**
```tsx
// Hero.tsx
<div
  style={{
    background: 'rgba(255, 255, 255, 0.4)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.6)',
  }}
>
```

---

## 2. 한국강사교육협회 (ChatGPT1st)

**URL**: https://www.chatgpt1st.co.kr/

### 참고 목적
- 메뉴 구성 참고
- 강사진 소개 레이아웃

### 분석 결과

**메뉴 구조:** (추출 실패 - 동적 로딩)

**강사진 소개 레이아웃:**
- 한 줄에 2명씩 배치 (2열 그리드)
- 큰 프로필 카드
- 상세한 강사 정보 제공

### 우리 사이트 적용

✅ **Instructors 섹션:**
- 2열 그리드 레이아웃 (`md:grid-cols-2`)
- 6명의 강사 프로필
- 각 카드 구성:
  - 큰 아바타 (24x24)
  - 이름 + 등급 별점
  - 소속, 경력
  - 상세 소개 (3-4줄)
  - 전문 분야 태그
  - 학력 및 자격

**적용 코드 예시:**
```tsx
<div className="grid md:grid-cols-2 gap-8">
  {instructors.map((instructor) => (
    <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8">
      {/* 큰 프로필 카드 */}
    </div>
  ))}
</div>
```

---

## 3. 한국인공지능융합교육협회 (KoreaAI)

**URL**: https://koreaai.or.kr/member/

### 참고 목적
- 메뉴 체계 참고

### 분석 결과

**메뉴 구조:**
```
1. 협회 소개
   ├── 협회 소개
   ├── 강사 소개
   ├── 조직도
   └── CI 소개

2. 자격증
   ├── 자격증 소개
   ├── 시험 접수
   ├── 시험 응시
   └── 증명서 진위 확인

3. 교육
   ├── 교육 프로그램
   ├── 교재
   └── 강의실

4. 참여하기
   ├── 협회 가입
   └── 강사 모집

5. 커뮤니티
   ├── 공지 사항
   ├── 데일리 뉴스
   ├── 카드뉴스
   ├── 교육 사례
   └── 언론 보도

6. 문의
```

### 우리 사이트 적용

❌ **직접 적용하지 않음**
- 우리 사이트는 강사 파견 중심
- KoreaAI는 자격증 중심
- 메뉴 구조가 다름

---

## 4. KAITA (한국인공지능기술협회)

**URL**: https://www.kaita.kr/

### 참고 목적
- 메뉴 체계 참고

### 분석 결과

**메뉴 구조:**
```
1. 협회소개
2. 교육 실적
3. 활동
4. 강사진
5. 교육 프로그램
6. 문의하기
```

### 우리 사이트 적용

✅ **메뉴 구조 채택:**
```
1. 협회소개
2. 교육 실적
3. 활동
4. 강사진
5. 교육 프로그램
6. 문의하기
```

**Navigation.tsx 적용:**
```tsx
const navLinks = [
  { label: '협회소개', href: '#about' },
  { label: '교육 실적', href: '#education-results' },
  { label: '활동', href: '#activities' },
  { label: '강사진', href: '#instructors' },
  { label: '교육 프로그램', href: '#programs' },
  { label: '문의하기', href: '#contact' },
];
```

---

## 5. KAITA 교육 프로그램

**URL**: https://www.kaita.kr/programs

### 참고 목적
- 교육 프로그램 내용 및 구조 참고

### 분석 결과

**AI 인재 양성 프로그램:**

1. **초중고 AI 교육 프로그램**
   - 블록 코딩부터 Python 기반 AI 개발까지 단계별 학습
   - 대상: 초중고 학생

2. **대학교/취업기관 AI 실무 교육**
   - 최신 AI 기술 트렌드 및 산업 사례
   - 딥러닝, 머신러닝 모델 개발
   - TensorFlow, PyTorch 활용 실습
   - 포트폴리오 구축 및 자격증 지원

3. **AI 진로/실무 멘토링**
   - AI 전문가들과의 1:1 멘토링
   - 커리어 로드맵 설계
   - 포트폴리오 피드백

4. **해커톤/경진대회**
   - 경쟁과 협업을 통한 실무 능력 배양
   - 행사 기획 및 운영
   - 기술 멘토링 제공

**기업 맞춤형 AI 교육 프로그램:**

1. **기업 AI 강의**
   - 기업별 맞춤형 AI 교육 커리큘럼
   - 실무 데이터 활용 실습
   - 수준별 교육 트랙

2. **기업 AI 컨설팅**
   - 현황 진단
   - 도입 전략 수립
   - 시스템 구축 지원

3. **AI 브릿지**
   - 기업과 AI 전문가 연결
   - 프로젝트 매칭 및 협업 지원

4. **기업 워크샵**
   - 산업별 트렌드 교육
   - 팀 프로젝트 수행

### 우리 사이트 적용

✅ **파견 프로그램 섹션 (CourseOverview.tsx):**

6개 프로그램으로 재구성:

1. **초중고 AI 교육 프로그램**
   - 블록 코딩 기초 (Scratch, Entry)
   - Python 프로그래밍 단계별 교육
   - AI 윤리 및 책임감 있는 활용
   - 실생활 문제 해결 프로젝트

2. **대학교/취업기관 AI 실무 교육**
   - 최신 AI 기술 트렌드 및 산업 사례
   - 딥러닝, 머신러닝 모델 개발
   - TensorFlow, PyTorch 활용 실습
   - 포트폴리오 구축 및 자격증 지원

3. **기업 맞춤형 AI 교육**
   - 실무 데이터 활용 실습
   - 수준별 교육 트랙 (입문/실무/전문가)
   - AI 도입 전략 및 컨설팅
   - 팀 프로젝트 및 워크샵

4. **공공기관 AI 정책 교육**
   - AI 정책 및 규제 이해
   - 공공서비스 AI 적용 사례
   - AI 윤리 및 사회적 영향
   - 디지털 전환(DX) 전략

5. **AI 진로/실무 멘토링**
   - 커리어 로드맵 설계
   - 포트폴리오 피드백
   - 네트워킹 기회 제공
   - 면접 준비 및 취업 지원

6. **해커톤/경진대회**
   - 행사 기획 및 운영 지원
   - 기술 멘토링 제공
   - 심사 및 평가
   - 우수 참가자 채용 연계

---
## https://www.jetonbank.com/
- 제톤뱅크

## https://gangsaya.co.kr/intro.html
- 강사야

## https://hrd.hunet.co.kr/
- 휴넷 

## 적용 요약

### 디자인
- **Jeton.com**: Glassmorphism, Gradient, Scroll Animations → Hero, Navigation에 적용

### 레이아웃
- **ChatGPT1st**: 2열 강사진 레이아웃 → Instructors 섹션에 적용

### 메뉴 구조
- **KAITA**: 메뉴 체계 → Navigation에 적용

### 콘텐츠
- **KAITA Programs**: 교육 프로그램 내용 → 파견 프로그램 섹션에 적용 (강사 파견 관점으로 재해석)

---

## 차별화 포인트

### 우리만의 특화 내용

1. **강사 파견 중심** (vs. 강사 양성)
   - KAITA, KoreaAI: 교육 제공 기관
   - 우리: 강사 파견 협회

2. **AI 강사 매칭 시스템**
   - 검증 → 교육 → 인증 → AI 매칭 → 파견
   - 강사 등급 체계 (Entry ~ Expert)
   - 자동 추천 알고리즘

3. **품질 관리 프로세스**
   - 체계적인 강사 인증
   - 지속적인 피드백 및 개선
   - 만족도 기반 등급 조정

---

## 관련 문서

- [AI 강사 매칭 시스템](../../features/AI_INSTRUCTOR_MATCHING_SYSTEM.md)
- [디자인 시스템](./04_DESIGN_SYSTEM.md)
- [WORK_CONTEXT.md](../../WORK_CONTEXT.md)
