# 페이지 명세 — Login (로그인)

> 참조 Figma: (아직 Figma 화면 없음 — 이 명세를 기준으로 신규 제작)
> 기준 디자인 토큰: `docs/design/DESIGN.md`
> 참조 코드: `apps/web/src/app/(auth)/login/page.tsx`, `apps/web/src/features/auth/components/LoginForm.tsx`

## 페이지 목적

20대 여성 타깃 패션·뷰티 쇼핑몰 회원이 이메일/비밀번호(또는 소셜 계정)로 로그인하는 화면. 신규 회원은 회원가입 화면으로 이동할 수 있어야 한다.

## 섹션 목록 (순서대로)

1. 브랜드 로고/타이틀 영역
2. 로그인 폼 (이메일 입력 + 비밀번호 입력 + 에러 메시지)
3. 로그인 버튼 (Primary CTA)
4. 소셜 로그인 (구분선 + Google + 카카오)
5. 회원가입 링크

## 섹션별 명세

### 1. 브랜드 로고/타이틀 영역

- **레이아웃**
  - 데스크탑: 화면 중앙 정렬, 폼 카드 상단에 위치, 카드 최대 너비 400px, `{spacing.stack-md}`(16px) 하단 마진
  - 모바일: 동일 구조, 좌우 `{spacing.margin-mobile}`(16px) 패딩
- **사용 컴포넌트**: `{typography.headline-md}` (24px, Libre Caslon Text)
- **콘텐츠**
  - 타이틀 텍스트: "로그인"
  - 별도 로고 이미지 없음 — 텍스트 타이틀만 사용 (기존 코드 기준)
- **반응형 브레이크포인트**: 폰트 크기 변경 없음, 카드 폭만 모바일에서 화면 전체 폭(좌우 패딩 16px)으로 축소

### 2. 로그인 폼

- **레이아웃**
  - 데스크탑: 카드 형태, 배경 `{colors.surface-container-lowest}`, `{rounded.md}`(12px), 1px 테두리 `{colors.outline-variant}`, 내부 패딩 24px, 필드 간 `{spacing.stack-sm}`(8px) → 그룹 간 `{spacing.stack-md}`(16px)
  - 모바일: 동일 구조, 카드 폭만 화면 전체로 확장
- **사용 컴포넌트**
  - 이메일 입력: `{components.input-field}` (배경 `{colors.surface-container-low}`, `{rounded.md}`, `{typography.body-md}`)
  - 비밀번호 입력: `{components.input-field}` (동일, type=password)
  - 포커스 상태: `{components.input-field-focus}` (1px solid `{colors.primary}` 아웃라인)
  - 라벨: `{typography.label-md}`, `{colors.on-surface-variant}` 텍스트
  - 에러 메시지: `{colors.error}` 텍스트, 배경 `{colors.error-container}` 10% 톤, `{typography.body-md}`
- **콘텐츠**
  - 이메일 라벨: "이메일"
  - 이메일 placeholder: "name@example.com"
  - 비밀번호 라벨: "비밀번호"
  - 비밀번호 placeholder: "••••••"
  - 필드 유효성 에러: 각 필드 하단에 Zod 스키마 에러 메시지 노출 (예: "올바른 이메일 형식이 아닙니다" 등 — 실제 문구는 `schemas/auth.schema.ts`의 Zod 메시지로 대체, 디자인 단계에서는 placeholder 텍스트로만 표기)
  - 로그인 실패 알림(공통 에러): "이미 이메일로 가입된 계정입니다. 이메일로 로그인해주세요." / "카카오 로그인 시 이메일 제공에 동의해주세요." (조건부 노출, 둘 다 카드 상단에 배치)
- **반응형 브레이크포인트**: 변경 없음 (입력 필드 높이/타이포 고정)

### 3. 로그인 버튼

- **레이아웃**
  - 데스크탑/모바일 공통: 폼 너비 100%, 폼 하단 `{spacing.stack-md}`(16px) 마진
- **사용 컴포넌트**: `{components.button-primary}` (배경 `{colors.primary}`, 텍스트 `{colors.on-primary}`, `{rounded.md}`, `{typography.label-lg}`, padding 12px 24px), hover 시 `{components.button-primary-hover}`
- **콘텐츠**
  - 기본 라벨: "로그인"
  - 제출 중 라벨: "로그인 중..." (버튼 비활성화 상태)
- **반응형 브레이크포인트**: 변경 없음

### 4. 소셜 로그인

- **레이아웃**
  - 구분선 좌우에 "또는" 텍스트, 구분선은 1px `{colors.outline-variant}`, 좌우 텍스트 간격 `{spacing.stack-sm}`(8px)
  - 버튼 간 `{spacing.stack-sm}`(8px) 마진, 각 버튼 너비 100%
- **사용 컴포넌트**: `{components.button-ghost}` 형태 기반 (배경 transparent/브랜드색, `{rounded.md}`, `{typography.label-lg}`), 좌측에 16px 아이콘 + 8px 간격
- **콘텐츠**
  - 구분선 텍스트: "또는"
  - Google 버튼: 흰 배경(`{colors.surface-container-lowest}`) + `{colors.outline-variant}` 테두리, Google 4색 로고 아이콘, 라벨 "Google로 로그인"
  - 카카오 버튼: 배경 `#FEE500`(카카오 브랜드 고정색 — 외부 브랜드 가이드 예외, DESIGN.md 토큰 미적용), 텍스트는 검정 85% 불투명, 카카오 말풍선 아이콘, 라벨 "카카오로 로그인"
- **반응형 브레이크포인트**: 변경 없음

### 5. 회원가입 링크

- **레이아웃**
  - 폼 카드 하단, 중앙 정렬, `{spacing.stack-md}`(16px) 상단 마진
- **사용 컴포넌트**: `{typography.body-md}`, 링크 텍스트는 `{colors.on-surface}` + underline, hover 시 `{colors.primary}`
- **콘텐츠**
  - 안내 텍스트: "계정이 없으신가요? "
  - 링크 텍스트: "회원가입" (→ `/register` 이동)
- **반응형 브레이크포인트**: 변경 없음

## 페이지 전용 예외 규칙

- 카카오 로그인 버튼의 배경색(`#FEE500`)은 카카오 공식 브랜드 가이드 고정값으로, DESIGN.md 색상 토큰을 적용하지 않는다. 이 페이지에서만 허용되는 예외다.
- "비밀번호 찾기" 링크는 현재 코드(`LoginForm.tsx`)에 존재하지 않으므로 이 명세에도 포함하지 않는다. 추후 기능 추가 시 명세를 갱신한다.
