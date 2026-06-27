# WORK.md

바이브코딩 쇼핑몰 프로젝트 진행 현황을 관리합니다.
완료된 작업은 `history.md`로 이동합니다.

---

## 구현 진척도

`docs/specs/` 기준 스펙 단위로 관리합니다.

| 스펙 | 내용 | 상태 |
|---|---|---|
| 00 | 환경 설정 (모노레포, DB, 인증, 라우트) | ✅ 완료 |
| 01 | 공통 레이아웃 & TanStack Query Provider | ✅ 완료 |
| 01-1 | 홈 페이지 디자인 (네이버 쇼핑 레이아웃, 배너 슬라이더) | ✅ 완료 |
| 01-2 | 카테고리 시스템 (Category 테이블, 대/중카테고리, 홈 섹션 구조) | ✅ 완료 |
| 02 | 상품 목록 (무한 스크롤) & 상품 상세 | ✅ 완료 |
| 03 | 장바구니 (Zustand) | ✅ 완료 |
| 04 | 주문 & 결제 | ✅ 완료 |
| 05 | 마이페이지 & 주문 취소 | ✅ 완료 |
| 06 | 관리자 백오피스 | ✅ 완료 |
| 11 | 보안 취약점 수정 (주문 가격 서버 검증) | ✅ 완료 |
| 07 | 키워드 검색 | 🔲 |
| 08 | 위시리스트 & 최근 본 상품 | 🔲 |
| 09 | 리뷰 & 별점 | 🔲 |
| 10 | Google 소셜 로그인 (`docs/oauth/` 참고) | 🔲 |

---

## 검증 대기 — 메인 페이지 디자인 리디자인 (2026-06-24)

브랜치 `claude/confident-bardeen-vkbwl5`에 메인 페이지(`apps/web/src/app/(shop)/page.tsx`) Figma 기반
리디자인이 커밋·푸시되어 있다. AI 작업 환경(샌드박스)은 네트워크 제한으로 Prisma 엔진 다운로드가
실패해 `pnpm dev` 실행 및 브라우저 확인을 하지 못했다 — **로컬에서 아래 절차로 직접 확인 필요**.

### 로컬 테스트 절차

1. **브랜치 가져오기 & 전환**
   ```bash
   git fetch origin claude/confident-bardeen-vkbwl5
   git checkout claude/confident-bardeen-vkbwl5
   ```
2. **의존성 설치 (최초 1회 또는 package.json 변경 시)**
   ```bash
   pnpm install
   ```
3. **Prisma 클라이언트 생성** (이 작업에서 새 마이그레이션은 없지만, 로컬에 클라이언트가 없다면 필요)
   ```bash
   pnpm --filter @my-project/database exec npx prisma generate
   ```
4. **개발 서버 실행**
   ```bash
   pnpm --filter web dev
   ```
5. **브라우저 확인**: `http://localhost:3000` (또는 콘솔에 출력된 포트) 접속

### 확인 포인트 (체크리스트)

- [ ] Hero Banner — 다크 그린 배경(`colors.primary`) 위 중앙 정렬 헤딩 + "SHOP NOW" pill 버튼 노출
- [ ] Category Tab — 대카테고리들이 가로 스크롤 탭으로 노출, 클릭 시 `/categories/[slug]`로 이동
- [ ] New Arrivals — 신상품 8개가 4-up(데스크탑)/2-up(모바일) 그리드로 표시, "VIEW ALL" 링크 동작
- [ ] Brand Spotlight — 이미지(좌)+텍스트(우) 비대칭 배치, 모바일에서는 세로 스택으로 전환
- [ ] Beauty Picks — 베스트상품(8개)이 가로 스크롤 카드로 표시 (별도 "뷰티" DB 쿼리가 없어 베스트상품 데이터를 재사용한 것이 의도된 동작임)
- [ ] Newsletter — 다크 그린 배경, 중앙 정렬 이메일 입력 폼 + SUBMIT 버튼
- [ ] 한글 텍스트(상품명, 카테고리명 등)가 Pretendard 폰트로 깨지지 않고 렌더링되는지 확인
- [ ] 기존 기능(전체상품 무한스크롤, 최근 본 상품, 장바구니 이동 등) 회귀 없이 정상 동작하는지 확인
- [ ] 반응형: 브라우저 너비를 줄여 모바일 레이아웃(2컬럼, 가로 스크롤 등) 확인

### 문제 발견 시
- 화면이 비정상이면 브라우저 개발자도구 콘솔 에러를 먼저 확인 (Prisma 클라이언트 미생성 시 타입/런타임 에러 가능)
- 디자인 토큰 불일치(hex 직접 사용 등) 발견 시 `docs/design/DESIGN.md` 토큰 기준으로 수정 요청

---

## 다음 작업

**스펙 07 — 키워드 검색** (`docs/specs/07-search.md` 참고)
**브랜치**: `feature/search` (생성 완료)

### 구현 범위 (미결)

| 파일 | 작업 |
|---|---|
| `src/lib/queryKeys.ts` | `infinite()` 파라미터에 `keyword` 추가 (캐시 키 버그 수정) |
| `src/features/products/components/ProductGrid.tsx` | queryKey에 `keyword` 포함 |
| `src/features/products/components/SearchResults.tsx` | 신규 생성 — 검색 결과 표시 컴포넌트 |
| `src/app/(shop)/search/page.tsx` | 플레이스홀더 → 실제 검색 페이지 (Next.js 16 searchParams Promise 대응) |

### 완료 기준
- SearchBar 검색어 입력 후 엔터 → `/search?q=키워드` 이동
- 검색 결과 상품 그리드 표시 (TanStack Query 캐싱)
- 결과 없을 때 "검색 결과가 없습니다" 메시지
