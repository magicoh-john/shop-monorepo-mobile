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
