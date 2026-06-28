# 02. 비로그인 게스트 장바구니 → 로그인 시 병합

## 한 줄 요약

비로그인 상태로 장바구니에 담아두고 로그인(이메일/Google/카카오)하면, 그동안 게스트로 담아둔 상품이 로그인 계정 장바구니로 그대로 합쳐지도록 한다.

## 배경 / 문제

게스트 장바구니는 `cart_session` 쿠키 값으로 만든 Redis 키(`cart:session:{id}`)에 저장되고, 로그인 사용자는 `cart:user:{userId}` 키를 쓴다([lib/cart.ts](../../apps/web/src/lib/cart.ts), [api/cart/route.ts](../../apps/web/src/app/api/cart/route.ts)).

문제는 **둘을 이어주는 코드가 없다**는 점이다. 비로그인으로 상품을 담고 → 로그인하면, 그 시점부터 모든 요청이 `cart:user:{userId}`를 보게 되고, 로그인 전에 쓰던 `cart:session:{id}`는 그대로 버려진 채 TTL(7일) 뒤 소멸한다. 사용자 입장에서는 "로그인하자마자 장바구니가 갑자기 비어 보이는" 현상으로 나타난다.

## 결정

NextAuth(Auth.js) `signIn` 콜백([auth.ts:97](../../apps/web/src/auth.ts#L97))에서, 로그인이 확정된 시점에 `cart_session` 쿠키가 있으면 그 게스트 장바구니를 방금 로그인한 사용자의 장바구니로 병합한다.

- 이메일/비밀번호(Credentials), Google, 카카오 로그인 모두 같은 `signIn` 콜백을 거치므로 한 곳만 수정하면 세 가지 로그인 방식 전부 커버된다.
- 병합 규칙은 기존 `POST /api/cart`의 담기 로직과 동일하게 둔다: 같은 `productId`가 이미 있으면 수량을 더하고, 없으면 새로 추가한다.
- 게스트 Redis 키(`cart:session:{id}`)는 병합 후 삭제한다. `cart_session` 쿠키 자체는 별도로 지우지 않는다 — 로그인 후에는 `resolveKey`가 `userId`를 항상 우선하므로 쿠키가 남아 있어도 더 이상 읽히지 않고, 자체 만료(7일)로 자연 소멸한다.
- Redis 호출이 실패해도 로그인 자체는 막히면 안 되므로 병합 로직은 try/catch로 감싸 실패를 흡수한다(로그인이라는 핵심 흐름이 장바구니라는 부가 기능 때문에 깨지면 안 됨).

## 범위

### 변경 파일

| 파일 | 변경 내용 |
|---|---|
| `apps/web/src/lib/cart.ts` | `mergeGuestCart(sessionId, userId)` 함수 추가 — 게스트 장바구니를 사용자 장바구니로 병합 후 게스트 키 삭제 |
| `apps/web/src/auth.ts` | `signIn` 콜백에서 `cookies()`로 `cart_session` 값을 읽어 `mergeGuestCart` 호출 (카카오 이메일 검증 통과 이후) |

### 범위 밖 (이번에 다루지 않음)

- `apps/mobile`(RN 네이티브 앱)의 별도 로그인 라우트(`/api/mobile/auth/login`)는 NextAuth를 거치지 않으므로 이번 변경에 포함되지 않는다. RN은 현재 우선순위가 아니다.
- 기기 간(웹 게스트 ↔ 모바일 게스트) 비로그인 동기화는 식별자 자체가 없어 기술적으로 불가능 — 별도 논의에서 이미 결론 내림.
- `CartIcon`/`cart/page.tsx`/`checkout/page.tsx`에 중복된 키 계산 인라인 로직 정리는 spec 01과 동일하게 이번에도 범위 밖.

## 검증 방법

1. 비로그인 상태로 상품 1~2개를 장바구니에 담는다 (`cart_session` 쿠키 발급 확인)
2. 같은 브라우저에서 회원가입했던 테스트 계정으로 로그인한다
3. `/cart` 페이지에서 로그인 전에 담았던 상품이 그대로 보이는지 확인
4. 로그인 전부터 같은 상품을 장바구니(로그인 계정 쪽)에 이미 가지고 있던 상태에서 게스트로 같은 상품을 추가로 담고 로그인했을 때, 수량이 합산되는지 확인
5. Redis CLI로 `cart:session:{쿠키값}` 키가 로그인 후 삭제되었는지 확인 (`docker exec -it redis redis-cli get cart:session:...`)
