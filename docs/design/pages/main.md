# 페이지 명세 — Main (홈)

> 참조 Figma: https://www.figma.com/design/8dKCcGdSGBgB1uNEicJhi6/패션뷰티-쇼핑몰?node-id=1-3
> 기준 디자인 토큰: `docs/design/DESIGN.md`

## 페이지 목적

20대 여성 타깃 패션·뷰티 쇼핑몰의 첫 화면에서 신상품과 브랜드 스토리를 에디토리얼한 비주얼로 보여주고, 카테고리 탐색·구매 전환으로 유도한다.

## 섹션 목록 (순서대로)

1. GNB (전역 레이아웃 — 모든 페이지 공통)
2. Hero Banner
3. Category Tab (Horizontal Scroll)
4. New Arrivals (신상품 그리드)
5. Brand Spotlight (Asymmetric)
6. Beauty Picks (가로 스크롤 캐러셀)
7. Newsletter

## 섹션별 명세

### 1. GNB

- **레이아웃**
  - 데스크탑: 높이 `{components.gnb.height}` (64px), 전체 폭, `{spacing.margin-desktop}`(40px) 좌우 패딩
  - 모바일: 높이 `{components.gnb-mobile.height}` (56px), `{spacing.margin-mobile}`(16px) 좌우 패딩
- **사용 컴포넌트**: `{components.gnb}` / `{components.gnb-mobile}`, 배경 `{colors.surface}`
- **반응형 브레이크포인트**: 데스크탑 풀 메뉴 노출 → 모바일은 햄버거 메뉴로 축소(아이콘 1.5px 스트로크)

### 2. Hero Banner

- **레이아웃**
  - 데스크탑: 풀블리드 이미지 위 중앙 정렬 콘텐츠, 좌우 패딩 40px, 텍스트 최대 너비 672px
  - 모바일: 동일 구조, 헤딩 크기만 `{typography.headline-lg-mobile}`(28px)로 축소
- **사용 컴포넌트**
  - 오버라인 라벨: `{typography.label-lg}`, `{colors.primary}` 텍스트 (예: "AW 2024 COLLECTION")
  - 헤딩: `{typography.display-lg}` (Libre Caslon Text, 48px) — 일부 단어 italic 강조 허용
  - CTA 버튼: `{components.button-primary}` (pill 형태, `rounded.full`)
  - 오버레이: 이미지 위 5% 불투명 블랙 스크림
- **반응형 브레이크포인트**: 데스크탑 48px → 모바일 28px 헤딩, CTA는 동일 스타일 유지

### 3. Category Tab (Horizontal Scroll)

- **레이아웃**
  - 데스크탑: 컨테이너 하단에 위치, 높이 193px 영역 내 가로 스크롤 탭 리스트, `outline-variant` 1px 하단 보더로 섹션 구분
  - 모바일: 동일하게 가로 스크롤, `{spacing.margin-mobile}` 16px 좌측 시작 패딩
- **사용 컴포넌트**: `{components.category-tab}` (기본), `{components.category-tab-active}` (활성 시 `on-surface` 텍스트 + 밑줄)
- **반응형 브레이크포인트**: 탭 개수/크기 동일, 모바일은 스크롤 스냅 권장

### 4. New Arrivals

- **레이아웃**
  - 데스크탑: 12컬럼 그리드 중 4-up 상품 카드, `max-width: {spacing.container-max}`(1280px), 좌우 40px, 카드 간 `{spacing.stack-lg}`(24px) gap, 섹션 상하 패딩 `{spacing.section-gap}`(80px)
  - 모바일: 2컬럼, gutter `{spacing.margin-mobile}`(16px)
- **사용 컴포넌트**
  - 섹션 헤더: 좌측 타이틀(`{typography.headline-lg}`) + 서브텍스트(`{typography.body-lg}`, `on-surface-variant`), 우측 "VIEW ALL" 링크(`{typography.label-lg}`, 밑줄)
  - 상품 카드: `{components.product-card}` + `{components.product-card-image}`(`rounded.md`) + `{components.product-card-name}` + `{components.product-card-price}`
  - 위시리스트 버튼: 카드 우상단, hover 시 노출(블러 배경 `rgba(255,255,255,0.8)`)
- **반응형 브레이크포인트**: 4-up → 2-up, 헤더는 줄바꿈 가능

### 5. Brand Spotlight (Asymmetric)

- **레이아웃**
  - 데스크탑: 12컬럼 그리드, 이미지 7컬럼 + 텍스트 5컬럼 비대칭 배치, 배경 `{colors.surface-container-low}`, 섹션 패딩 `{spacing.section-gap}`(80px), 컨테이너 `{rounded.lg}`(16px) 이미지 모서리
  - 모바일: 1컬럼 스택(이미지 위 → 텍스트 아래)
- **사용 컴포넌트**: `{components.brand-spotlight}` — 오버라인 라벨(`{colors.secondary}` 텍스트, 예: "DESIGNER OF THE MONTH"), 헤딩(`{typography.display-lg}`), 본문(`{typography.body-lg}`), 보조 이미지 2개(가로 분할), CTA 텍스트 링크("EXPLORE THE COLLECTION" + 화살표 아이콘)
- **반응형 브레이크포인트**: 7:5 비대칭 그리드 → 모바일 풀폭 스택, `section-gap`은 최소 48px까지만 축소 가능(DESIGN.md Do's/Don'ts 준수)

### 6. Beauty Picks

- **레이아웃**
  - 데스크탑: 헤딩 + 좌우 화살표 버튼(원형, `outline` 보더) 헤더 / 하단 가로 스크롤 카드 리스트(카드 최소 너비 320px)
  - 모바일: 동일 가로 스크롤 패턴 유지, 카드 너비만 화면에 맞게 조정
- **사용 컴포넌트**
  - 섹션 타이틀: `{typography.headline-lg}` italic
  - 카드: `{components.product-card}` 변형 — 이미지 `rounded.md`, 카테고리 라벨(`{colors.secondary}` 텍스트, `{typography.label-md}`), 상품명(`{typography.body-lg}` bold), 가격(`{typography.body-lg}`)
  - 네비게이션 버튼: 48px 원형, `{colors.outline}` 1px 보더
- **반응형 브레이크포인트**: 캐러셀 동작 동일, 화살표 버튼은 모바일에서 숨기고 스와이프만 허용 가능

### 7. Newsletter

- **레이아웃**
  - 데스크탑: 풀폭 다크 배경(`{colors.primary}`), 중앙 정렬 콘텐츠 최대폭 512px, 섹션 패딩 `{spacing.section-gap}`(80px)
  - 모바일: 동일 중앙 정렬, 폭 100% - `{spacing.margin-mobile}` 좌우 패딩
- **사용 컴포넌트**
  - 헤딩: `{typography.headline-lg}` italic, `{colors.on-primary}` 텍스트
  - 본문: `{typography.body-lg}`, 80% 불투명도
  - 입력 폼: `{components.input-field}` 변형(다크 배경에서는 `rgba(255,255,255,0.3)` 보더) + `{components.button-primary}` 형태의 SUBMIT 버튼
- **반응형 브레이크포인트**: 폼은 데스크탑 가로 배치(인풋+버튼) 유지, 모바일은 인풋 위 버튼 아래로 줄바꿈 가능

## 페이지 전용 예외 규칙

- Hero Banner와 Newsletter 섹션은 DESIGN.md의 "warm surface background(#fbf9f8) 전 페이지 유지" 규칙의 예외다 — Hero는 이미지 풀블리드, Newsletter는 `colors.primary` 다크 배경을 의도적으로 사용한다.
- Brand Spotlight의 비대칭 7:5 그리드는 이 페이지에만 적용되는 레이아웃이며 다른 페이지에 재사용 시 별도 검토 필요.
