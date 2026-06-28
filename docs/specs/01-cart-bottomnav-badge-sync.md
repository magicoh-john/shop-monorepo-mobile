# 01. 장바구니 뱃지(BottomNav) 동기화 수정

## 한 줄 요약

화면 위쪽(헤더) 장바구니 아이콘(`CartIcon`)에는 담은 개수가 정확히 반영되는데, 모바일 쪽에서 보이는 화면 아래쪽 탭바(`BottomNav`)의 장바구니 뱃지에는 반영되지 않는 문제를 고치는 작업이다.

## 배경 / 문제

`apps/web`에는 장바구니 개수를 보여주는 뱃지가 두 군데 있다.

| 컴포넌트        | 위치                           | 데이터 소스                                                                |
| --------------- | ------------------------------ | -------------------------------------------------------------------------- |
| `CartIcon.tsx`  | 헤더(데스크톱, `Header.tsx`)   | Server Component — `getCart(key)`로 Redis에서 직접 조회                    |
| `BottomNav.tsx` | 하단 탭바(모바일, `md:hidden`) | Client Component — `useCartStore`(Zustand + `persist` → localStorage) 구독 |

`CartIcon`은 정상 동작한다. 장바구니에 담으면 `AddToCartButton`이 `router.refresh()`를 호출해 `CartIcon`(Server Component)이 재렌더링되며 Redis의 실제 값을 다시 읽어오기 때문이다.

반면 `BottomNav`가 구독하는 `cartStore.ts`는 애초에 "낙관적 UI(Optimistic UI)" — 클릭 즉시 화면에 반영하고 서버 요청은 뒤에서 처리하려는 의도로 만들어졌으나, 실제 담기/삭제/수량변경 로직(`AddToCartButton.tsx`, `CartList.tsx`)이 이 store의 액션(`addItem`/`removeItem`/`updateQuantity`)을 한 번도 호출하지 않는다. 그 결과 `cartStore`는 항상 빈 상태이고, `BottomNav`의 장바구니 뱃지는 실제 장바구니 내용과 무관하게 표시된다.

## 결정

낙관적 UI를 완성하는 대신(서버 데이터와의 동기화 로직이 추가로 필요해 범위가 커짐), 이미 검증된 `CartIcon`의 패턴을 `BottomNav`에도 동일하게 적용한다. 즉 `BottomNav`를 Server Component 상위에서 `totalCount`를 받는 순수 Presentational Client Component로 바꾼다.

## 범위

### 변경 파일

| 파일                                           | 변경 내용                                                                                                              |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `apps/web/src/components/layout/BottomNav.tsx` | `useCartStore` 제거, `totalCount: number`를 prop으로 받도록 변경                                                       |
| `apps/web/src/app/(shop)/layout.tsx`           | `async` 전환, `auth()` + `cookies()` + `getCart()`로 `totalCount` 계산 후 `<BottomNav totalCount={totalCount} />` 전달 |
| `apps/web/src/app/(protected)/layout.tsx`      | 이미 가져온 `session`을 재사용해 동일하게 `totalCount` 계산 후 전달                                                    |
| `apps/web/src/store/cartStore.ts`              | 삭제 (사용처가 없어지므로 죽은 코드 제거)                                                                              |

### 구현 메모

- 키 계산은 기존에 export되어 있었지만 미사용 상태였던 `buildCartKey(userId, sessionId)`(`apps/web/src/lib/cart.ts`)를 재사용한다. `CartIcon.tsx`/`cart/page.tsx`/`checkout/page.tsx`에 이미 같은 로직이 인라인으로 중복되어 있는데, 이번 변경 범위에서는 그 기존 중복까지 정리하지 않고 새 코드에서만 기존 헬퍼를 사용한다(범위 확대 방지).
- `totalCount` 계산식은 `CartIcon.tsx`와 동일하게 `items.reduce((sum, i) => sum + i.quantity, 0)`.

### 범위 밖 (이번에 다루지 않음)

- `apps/mobile`(RN 네이티브 앱)의 장바구니 — 별도로 우선순위가 아님 ([[project-native-deprioritized]])
- 비로그인 → 로그인 시점 게스트 카트 병합(merge) 로직 — 별도 스펙으로 분리
- `CartIcon`/`cart/page.tsx`/`checkout/page.tsx`에 중복된 키 계산 인라인 로직 정리 — 별도 스펙으로 분리

## 검증 방법

1. 비로그인 상태로 PC 화면 폭에서 상품을 장바구니에 담고 헤더의 `CartIcon` 뱃지 숫자 확인(기존에도 정상 동작 — 회귀 확인용)
2. 브라우저 창을 모바일 폭(`md` 이하)으로 줄이거나 모바일 기기로 접속해 하단 탭바 `BottomNav`의 장바구니 뱃지가 실제 담은 개수와 일치하는지 확인
3. 수량 변경/삭제 후에도 양쪽 뱃지가 같은 값을 보여주는지 확인
4. `cartStore.ts` 삭제 후 빌드 에러(미사용 import 등) 없는지 확인
