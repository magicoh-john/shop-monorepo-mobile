# 01. 비로그인(게스트) 장바구니를 Redis에 보존하는 이유

## 결정

비로그인 상태로 장바구니에 담은 상품 데이터는 브라우저(localStorage)가 아니라 **서버의 Redis**에 저장한다.

## 왜 Redis인가

- **localStorage는 신뢰할 수 없다.** 브라우저 캐시/사이트 데이터를 지우면 그냥 사라진다. 결제까지 이어지는 흐름에서 서버가 장바구니 내용을 신뢰성 있게 들고 있어야, 주문 생성 시점에 가격·재고를 다시 검증하는 등의 처리가 안정적으로 가능하다.
- **TTL로 자동 정리된다.** Redis 키에 만료 시간(7일)을 걸어두면, 둘러보기만 하고 떠난 비활성 사용자의 데이터가 무한정 쌓이지 않고 자동으로 사라진다. 이건 DB(영구 저장)보다 캐시(Redis)가 이 용도에 더 적합한 이유다.

## 메커니즘

브라우저에는 실제 장바구니 데이터가 없다. `cart_session`이라는 httpOnly 쿠키 하나만 있고, 이 쿠키 값은 그 데이터를 가리키는 **식별자**일 뿐이다.

```
브라우저 쿠키: cart_session = ec7be757-731b-4028-bbe1-bda2a5bff0d6
                     │
                     ▼
Redis 키: cart:session:ec7be757-731b-4028-bbe1-bda2a5bff0d6
        → [{"productId": "...", "productName": "에코백", "price": 18000, "quantity": 1, ...}]
```

관련 코드: [lib/cart.ts](../../apps/web/src/lib/cart.ts), [api/cart/route.ts](../../apps/web/src/app/api/cart/route.ts)

## 로그인 사용자는 다른 키를 쓴다

로그인하면 식별자가 `userId`(DB의 `User.id`)로 바뀌고, Redis 키도 `cart:user:{userId}`로 바뀐다. 이 키는 웹(PWA)이든 같은 계정으로 로그인한 다른 클라이언트든 동일하게 가리키므로, **로그인 사용자에 한해서는 별도 동기화 작업 없이도 장바구니가 공유**된다.

## 오해하지 말아야 할 부분 — Redis가 "기기 간 비로그인 동기화"를 해결해주지는 않는다

처음에는 "비로그인 사용자의 장바구니를 웹과 모바일 양쪽에서 동기화하기 위해 Redis를 도입했다"는 가설이 있었으나, 검토 결과 **그건 Redis의 역할이 아니다.**

- 게스트 식별자(`cart_session` 쿠키)는 그 브라우저(그 기기)에만 존재한다.
- 다른 기기(예: 같은 사람의 스마트폰 앱)는 이 쿠키 자체를 알 방법이 없다.
- Redis든 DB든 어떤 저장소를 쓰든, **두 클라이언트에 같은 키를 줄 방법이 없으면 동기화는 원천적으로 불가능**하다. 이건 저장 기술의 한계가 아니라 신원(identity) 문제다.

비로그인 상태에서 기기 간 장바구니를 공유하고 싶다면 유일한 해법은 **로그인**이다. 로그인하는 순간 식별자가 `userId`로 통일되기 때문이다.

이 프로젝트의 `apps/mobile`(Expo RN 네이티브 앱)은 쿠키 메커니즘이 없어서 비로그인 게스트 장바구니 자체가 동작하지 않는다(담기 시도 시 400 에러). 다만 현재 수업 진행상 RN 앱은 우선순위가 아니며, "모바일"이라는 표현은 기본적으로 PWA(`apps/web`)를 가리키는 것으로 합의되어 있다.

## 게스트 → 로그인 전환 시 데이터가 사라지지 않게 하는 처리

게스트로 담아두고 나중에 로그인하면, `cart:session:*` → `cart:user:*`로 데이터를 병합하는 처리가 별도로 필요하다(저장소를 Redis로 했다고 자동으로 해결되는 부분이 아니다). 이 프로젝트에서는 NextAuth `signIn` 콜백에서 `mergeGuestCart()`로 처리한다.

→ 상세 구현: [docs/specs/02-guest-cart-merge-on-login.md](../specs/02-guest-cart-merge-on-login.md)

## 관련 문서

- [docs/specs/01-cart-bottomnav-badge-sync.md](../specs/01-cart-bottomnav-badge-sync.md) — 장바구니 뱃지 표시 버그 수정
- [docs/specs/02-guest-cart-merge-on-login.md](../specs/02-guest-cart-merge-on-login.md) — 게스트 카트 병합 구현
