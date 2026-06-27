# ⚠️ AI 필수 체크 — 매 작업 시작 전 반드시 확인

1. **커밋 먼저** — 미커밋 변경사항이 있으면 작업 전 커밋 권고
2. **브랜치 확인** — 현재 브랜치와 무관한 작업이면 새 브랜치 생성 권고
3. **기획 먼저** — 구현 전 반드시 기획안 제시 → 사용자 승인 후 구현
4. **완료 후 커밋** — 작업 완료 후 커밋 권고

---

## 🎨 디자인 작업 시 필수 참조 순서

UI/페이지 구현 작업 전 AI는 반드시 아래 순서로 확인한다.

1. `docs/design/DESIGN.md` 먼저 읽기 — 색상/타이포그래피/spacing/컴포넌트 토큰의 단일 기준(디자인 헌법)
2. 해당 페이지의 `docs/design/pages/<page>.md` 읽기 — 섹션 구성, 레이아웃, 사용 컴포넌트 명세
3. Figma 원본 raw 값(hex, px)보다 `DESIGN.md` 토큰을 항상 우선한다 — Figma는 레이아웃 참고용 초안이며 토큰 매핑이 기준
4. **hex 값/임의 px 직접 사용 금지** — 항상 `{colors.*}`, `{typography.*}`, `{spacing.*}`, `{rounded.*}` 토큰 참조로 구현
5. 새 페이지 명세 작성 시 `docs/design/page-template.md` 구조를 따른다

### 🔍 Figma 화면 생성/수정 후 필수 검증

Figma에서 화면을 만들거나 수정한 직후, 코드화 이전에 반드시 아래를 검증한다.
raw 값이 `DESIGN.md`와 일치해도 Figma Variable/Text Style 바인딩이 없으면 미완료로 간주한다 — 바인딩이 없으면 디자이너가 토큰을 바꿔도 코드가 따라가지 못해 일관성·확장성이 깨진다.

1. 색상(fills/strokes) → Figma **Variable** 바인딩 확인
2. 타이포그래피 → Figma **Text Style**(`setTextStyleIdAsync`) 연결 확인 — 숫자값 직접 입력 금지
3. spacing/padding/radius → Figma **Variable** 바인딩 확인
4. 대응 토큰/Variable이 없으면 임의 생성 금지 → 사용자 확인 후 신규 등록 + `DESIGN.md` 동시 갱신
5. 검증 결과(바인딩 비율)를 사용자에게 보고

---

# CLAUDE.md — 쇼핑몰 앱 (Shopping Mall)

이 파일은 이 프로젝트에 특화된 내용만 기술한다.
범용 원칙(워크플로우, 네이밍 컨벤션, 브랜치 전략 등)은 `~/.claude/CLAUDE.md`(전역)에 있으며
이 파일에 중복 기술하지 않는다.

---

## Tech Stack & Version Control (AI Strict Policy)

**🚨 [치명적 주의사항 - AI 버전 통제 정책]**
AI는 아래 명시된 기술 스택의 **정확한 버전**만을 사용하여 코드를 작성하고 패키지를 설치해야 합니다. 교육용 프로젝트의 안정성을 위해, 임의로 `latest` 태그를 사용하거나 상위 버전으로 업데이트하여 강의 환경의 일관성을 훼손하는 행위를 엄격히 금지합니다. 버전 변경이 불가피한 경우 반드시 사용자(강사)에게 먼저 사유를 설명하고 명시적인 승인을 받아야 합니다.

| 기술 | 고정 버전 (`package.json` 기준) | 역할 |
| --- | --- | --- |
| Next.js (App Router) | `16.2.6` | 풀스택 프레임워크 (서버 컴포넌트, API Route) |
| React | `19.2.4` | UI 라이브러리 |
| Prisma | `7.8.0` | 직관적인 ORM, SQL 스키마 자동 생성 및 타입 제공 |
| PostgreSQL (`pg`) | `^8.21.0` | 관계형 데이터베이스 드라이버 |
| NextAuth.js | `^5.0.0-beta.31` | 인증 및 보안 세션 관리 (Auth.js) |
| Zustand | `^5.0.13` | 장바구니 등 클라이언트 상태 전역 관리 |
| TailwindCSS | `^4.0.0` | 유틸리티 클래스 기반 스타일링 |
| Shadcn UI | `^4.7.0` | Tailwind 기반 컴포넌트 라이브러리 |
| React Hook Form | `^7.76.0` | 폼 상태 관리 및 유효성 검사 |
| Zod | `^4.4.3` | 스키마 검증 |
| TanStack Query | `^5.100.11` | 비동기 데이터 패칭 및 서버 상태 관리 |
| bcryptjs | `^3.0.3` | 비밀번호 단방향 암호화 (보안) |
| lucide-react | `^1.16.0` | UI 아이콘 라이브러리 |
| @hookform/resolvers | `^5.2.2` | React Hook Form과 Zod 스키마 연결 |

---

## 🚨 이 버전 Next.js의 비표준 규칙 (AI 혼동 방지)

이 프로젝트의 Next.js(`16.2.6`)는 일반 버전과 다른 규칙을 따른다.
**AI는 학습 데이터 기반의 Next.js 표준을 이 프로젝트에 그대로 적용하면 안 된다.**
Next.js 관련 코드 작성 전 반드시 `docs/nextjs16.md` 를 먼저 확인한다.

> **재발 방지 원칙**: "표준과 다르다"고 판단되는 파일/패턴을 발견했을 때,
> 임의로 수정하기 전에 반드시 사용자에게 먼저 확인한다.

---

## 🚨 DB 컬럼명 규칙 (절대 준수)

**모든 DB 컬럼명은 snake_case로 지정한다.** camelCase 컬럼명은 Prisma가 큰따옴표를 강제로 붙여 SQL 혼란을 유발한다.
Prisma 필드명은 camelCase 유지, `@map()`으로 snake_case DB 컬럼명을 반드시 명시한다.

```prisma
// ❌ 금지
imageUrl   String?

// ✅ 필수
imageUrl   String? @map("image_url")
```

---

## 폴더 구조 (apps/web/src/)

→ `docs/ARCHITECTURE.md` 섹션 3 참고

> **규칙**: `components/ui/`는 Shadcn 전용. 커스텀 컴포넌트는 반드시 `features/<domain>/components/` 또는 `components/layout/`에 작성한다.

---

## 테스트 계정

| 역할 | 이메일 | 비밀번호 |
|---|---|---|
| 관리자 | admin@test.com | 123456 |

---

## Commands

### 개발 서버

```bash
# 루트에서 실행 (pnpm workspace 전체)
pnpm dev

# apps/web만 실행
pnpm --filter web dev
```

### 패키지 추가 / 삭제

> **⚠️ 모노레포 규칙**: 반드시 `--filter`로 대상 워크스페이스를 지정한다.
> 지정하지 않으면 루트에 설치되어 동작하지 않을 수 있다.

```bash
# apps/web에 패키지 추가
pnpm add <패키지명> --filter web

# apps/web에 devDependency 추가
pnpm add -D <패키지명> --filter web

# apps/web에서 패키지 삭제
pnpm remove <패키지명> --filter web

# packages/database에 패키지 추가
pnpm add <패키지명> --filter @my-project/database

# packages/types에 패키지 추가
pnpm add <패키지명> --filter @my-project/types

# 루트(모든 워크스페이스 공통)에 추가
pnpm add -D <패키지명> -w
```

### Prisma (packages/database 기준)

```bash
# 스키마 변경 후 마이그레이션 적용 (Prisma 7+: generate 자동 실행 안 됨)
pnpm --filter @my-project/database exec npx prisma migrate dev --name <마이그레이션명>

# 클라이언트 재생성 (migrate dev 후 반드시 별도 실행 필요)
pnpm --filter @my-project/database exec npx prisma generate

# DB 초기 데이터 삽입 (seed)
pnpm --filter @my-project/database exec npx prisma db seed

# Prisma Studio (GUI로 DB 확인)
pnpm --filter @my-project/database exec npx prisma studio

# 마이그레이션 상태 확인
pnpm --filter @my-project/database exec npx prisma migrate status
```

### Git

> **⚠️ 모노레포 규칙**: git 명령은 반드시 **루트(`shop-monorepo/`)** 에서 실행한다.
> 하위 워크스페이스(`apps/web/`, `packages/database/` 등)에서 실행하면
> 모노레포 전체가 아닌 해당 폴더 기준으로 동작해 다른 패키지 변경사항이 누락될 수 있다.

```bash
# 올바른 위치 (루트)
git add .
git commit -m "feat: ..."
git push

# 잘못된 위치 (하위 워크스페이스)
cd apps/web && git add .   # ❌
```

### 워크스페이스 이름 참조

| 경로 | `--filter` 값 |
|---|---|
| `apps/web` | `web` |
| `packages/database` | `@my-project/database` |
| `packages/types` | `@my-project/types` |

---

## ERD 툴

| 환경 | 툴 | 용도 |
| --- | --- | --- |
| 온라인 | [DrawDB](https://www.drawdb.app/) | 브라우저에서 ERD 작성 & 시각화. 가입 불필요, 완전 무료 |
| 오프라인 | [DBeaver](https://dbeaver.io/) | 로컬 DB 연결 및 ERD 확인. Community Edition 무료 |

---

## 스펙 단위 작업 패턴 (AI 필수 준수)

새로운 스펙 작업을 시작할 때 아래 7단계를 반드시 순서대로 따른다.

```
1. 브랜치 준비
   main pull → feature/<기능-내용> 브랜치 생성
   (예: feature/common-layout, feature/product-list, feature/cart-zustand)

2. 사전 조건 확인
   스펙 파일에 명시된 전제 조건 점검
   (예: DB seed 데이터, 스키마 마이그레이션 여부)

3. 스펙 검토 & 기획안 제시
   docs/specs/<N>.md + 관련 코드(스키마, 기존 파일) 읽기
   → 구현 범위·방법을 계획으로 정리해 사용자에게 제시

4. 승인 후 구현
   사용자 승인 → 파일 생성/수정

5. 브라우저 검증
   Playwright로 실제 동작 확인 (pnpm dev 상시 실행 중)

6. 커밋 → 푸시 → PR
   작업 단위 커밋 메시지 작성 → origin push → GitHub PR 생성

7. 문서 업데이트
   work.md 진척도 반영 (🔲 → ✅)
```

> **원칙**: 3단계에서 사용자 승인 없이 4단계로 넘어가지 않는다.
> 5단계 검증 없이 완료를 선언하지 않는다.

---

## 작업 시작 전 규칙 (AI 자동 권고)

작업을 시작하기 전 AI는 아래 두 가지를 반드시 사용자에게 먼저 확인하고 권고한다.

### 1. 커밋 먼저
현재 변경사항이 있다면 작업 시작 전 커밋을 권고한다.
작업 중간에 코드가 섞이면 이력 추적이 어려워지고 롤백이 힘들어진다.

```bash
git add .
git commit -m "feat: 작업 내용 요약"
```

### 2. 브랜치 분리 권고 기준
아래 조건 중 하나라도 해당하면 별도 브랜치 생성을 권고한다.

| 조건 | 이유 |
|---|---|
| DB 스키마 변경 (migrate) 포함 | 되돌리기 어려움 |
| 3개 이상 파일 동시 변경 | 영향 범위가 넓음 |
| 새로운 기능 단위 스펙 시작 | 기능별 이력 분리 |
| types/package 변경 포함 | 전체 앱에 영향 |

```bash
git checkout -b feature/기능명   # 기능 개발
git checkout -b fix/버그명       # 버그 수정
git checkout -b hotfix/긴급수정  # 긴급 수정
```

### 3. 디버깅 중 범위 이탈 방지 (중요)

디버깅 또는 문제 해결 중 **현재 브랜치 범위를 벗어나는 작업**이 필요하다고 판단되면
즉시 구현하지 않고 아래 순서를 따른다.

```
1. "이 수정은 현재 브랜치(feature/xxx) 범위 밖입니다" 사용자에게 알림
2. "현재 작업을 먼저 커밋할까요?" 제안
3. "새 브랜치(feature/yyy)에서 작업할까요?" 제안
4. 사용자 승인 후 커밋 → 새 브랜치 생성 → 구현
```

> **근본 원칙**: 버그를 발견했을 때 그 수정이 다른 스펙의 영역이라면,
> 현재 스펙을 먼저 완료/커밋하고 새 브랜치에서 수정한다.

---

## Development Notes

- 진행 현황: `work.md` (루트) — 다음 작업 확인
- 완료 이력: `history.md` (루트) — 완료된 작업 기록

### 현재 완료 (2026-05-31)

- 모노레포 구조 (pnpm workspace, pnpm-workspace.yaml)
- DB 스키마 + 마이그레이션 (User, Product, Order, OrderItem, Cart, CartItem, SystemCode)
- `packages/database` Prisma 클라이언트
- `packages/types` 공유 인터페이스 (auth, product, order)
- NextAuth 설정 (auth.ts, auth.config.ts, proxy.ts)
- 로그인 / 회원가입 페이지 + Server Action
- 라우트 그룹 구조 ((shop), (auth), (protected), admin)
- Zod 스키마 (auth, order, product)
- Shadcn 컴포넌트 (button, input, label)
- 기본 API Route 파일 (products, order, admin, auth)

### 주요 결정 사항

- 장바구니: Zustand(클라이언트) 사용. DB의 Cart/CartItem 모델은 현재 미사용
- Review 모델 없음 → 스펙 09에서 Prisma 스키마에 추가
- User.password는 현재 필수값 → Google OAuth 도입 시 nullable로 마이그레이션
- 카테고리(Category 테이블) → 스펙 01-2에서 추가. Product.category(String)를 categoryId(관계)로 변경
- 오늘특가/신상품/베스트는 카테고리가 아닌 큐레이션 — 홈 화면 별도 섹션으로 구성

### 카테고리 전략

카테고리(분류)와 큐레이션(필터)을 명확히 분리한다.

| 구분 | 예시 | 구현 방식 |
|---|---|---|
| 카테고리 | 패션의류, 신발, 뷰티 | Category 테이블 (DB) |
| 큐레이션 | 신상품, 베스트, 오늘특가 | 홈 화면 별도 섹션 (쿼리) |

**대카테고리 구성 (5개)**
- 패션의류 (slug: fashion) → 상의, 하의, 아우터
- 신발/가방 (slug: shoes-bags) → 신발, 가방
- 액세서리 (slug: accessories) → 주얼리, 모자/스카프
- 뷰티 (slug: beauty) → 스킨케어, 메이크업
- 스포츠 (slug: sports) → 운동복, 운동용품
