# 쇼핑몰 앱 (shop-monorepo-oauth)
- 이 버전은 쇼핑몰에 PWA 기능이 완전히 구현되어 있다(`apps/web` + Serwist).
- `apps/mobile`(Expo/React Native 네이티브 앱)도 별도로 존재하지만, 현재 수업 진행상 우선순위가 아니다.
  자세한 비교는 아래 "모바일 구현 방식 (PWA + RN)" 섹션 참고.

## 모바일 구현 방식 (PWA + RN)

이 프로젝트는 "모바일" 경험을 두 가지 방식으로 따로 구현한다.

| 구분 | 위치 | 정체 | 동작 방식 |
|---|---|---|---|
| PWA | `apps/web` | Next.js + Serwist(Service Worker) + manifest | 폰 브라우저로 접속(또는 홈 화면 설치) — 브라우저 엔진에서 실행, 쿠키 등 브라우저 기능을 그대로 사용 |
| RN (네이티브 앱) | `apps/mobile` | Expo + React Native (`expo-router`) | 앱스토어/플레이스토어 설치형, 네이티브 런타임에서 실행, `apiFetch`로 동일한 API를 호출 |

### 핵심 차이 — 비로그인(게스트) 장바구니 동작

- **PWA**는 결국 브라우저이므로, 쿠키(`cart_session`) 기반 게스트 장바구니가 데스크톱 웹과 동일하게 동작한다.
- **RN 앱**은 브라우저가 아니라 쿠키 메커니즘이 없고, `Authorization: Bearer {JWT}` 헤더로만 로그인 사용자를 식별한다. 그래서 RN 앱에서 비로그인 상태로 장바구니에 담으려 하면 `/api/cart`의 `resolveKey`가 빈 문자열을 반환해 400 에러로 막힌다.
- 로그인한 사용자는 두 플랫폼 모두 같은 DB의 `User.id`를 키로 쓰므로(`cart:user:{userId}`), 로그인 상태에서는 PWA와 RN 앱이 같은 장바구니를 공유한다.

### 이 저장소에서 "모바일"이라는 표현의 기본값

수업 진행상 `apps/mobile`(RN)은 현재 우선순위가 아니다. 별도 언급이 없는 한 "모바일"은 **PWA로 접속한 `apps/web`**을 가리킨다. RN 앱을 다루려면 "네이티브 앱" 또는 "Expo 앱"이라고 명시적으로 지칭한다.

### 왜 PWA와 RN을 동시에 갖췄는가 (참고)

실제 업계에서도 PWA(설치 없이 가볍게 접근, 검색엔진 노출에 유리)와 네이티브 앱(푸시 알림, OS 깊은 기능, 앱스토어 마케팅 채널)을 동시에 운영하는 경우가 있다(예: 스타벅스, Twitter Lite). 다만 장바구니·인증 같은 기능을 양쪽에 각각 구현해야 해서 유지보수 비용이 두 배에 가깝다는 트레이드오프가 있다.

이 프로젝트가 두 방식을 함께 둔 이유는 비교 학습 목적이 아니라, 다음과 같다.
- **PWA가 메인이다.** 모바일 기능(설치, 오프라인, 홈 화면 추가 등)을 가장 손쉽게 보여줄 수 있는 방법이라서, 모바일 학습은 기본적으로 PWA로 진행한다.
- **RN(`apps/mobile`)은 교육과정 범위 밖이다.** 다만 나중에 학생들에게 "네이티브 앱은 이런 방식으로도 만든다"는 것을 살짝 맛보여주기 위한 용도로만 남겨둔 것이다.

이 프로젝트의 모노레포 구조도 실제 업계 관례와 맞다. `packages/types`, `packages/database`처럼 비즈니스 로직/타입은 공유하고, UI 레이어만 플랫폼별로 따로 두는 방식(Next.js ↔ React Native)은 "멀티 플랫폼 모노레포" 전략으로 실제로 많이 쓰인다.

## 개발 환경 실행 순서

`pnpm dev` 전에 아래 두 가지가 반드시 실행 중이어야 한다.

### 1. Docker Redis 컨테이너 시작

```powershell
docker start redis
```

처음 설치하는 경우:

```powershell
docker run -d --name redis -p 6379:6379 redis:latest
```

연결 확인:

```powershell
docker exec -it redis redis-cli ping
# PONG 출력되면 정상
```

> Redis 설정 상세: `docs/redis/05-setup.md`

### 2. 개발 서버 시작

```powershell
pnpm dev
```

---

## Next.js 4요소 구성

> 상세 설명: `docs/api_route/nextjs-4elements-report.md`

### Server Component + Client Component 조합

| URL | Server Component | 포함된 Client Component |
|---|---|---|
| `/` | `(shop)/page.tsx` | `BannerSlider`, `ProductGrid`, `RecentProducts` |
| `/products/[id]` | `(shop)/products/[id]/page.tsx` | `ProductImage`, `RecentTracker`, `ProductActions` |
| `/cart` | `(shop)/cart/page.tsx` | `CartList` |
| `/checkout` | `(protected)/checkout/page.tsx` | `CheckoutForm` |
| `/mypage` | `(protected)/mypage/page.tsx` | `OrderCard` |
| `/login` | `(auth)/login/page.tsx` | `LoginForm` |
| `/register` | `(auth)/register/page.tsx` | `RegisterForm` |
| `/admin` | `admin/page.tsx` | `OrderTable`, `ProductForm` |

### Client Component → Route Handler 호출

| Client Component | Route Handler | 메서드 | 역할 |
|---|---|---|---|
| `ProductGrid` | `/api/products` | GET | 상품 목록 무한 스크롤 |
| `ProductActions` | `/api/cart` | POST | 장바구니 추가 |
| `CartList` | `/api/cart` | PATCH | 수량 변경 |
| `CartList` | `/api/cart` | DELETE | 상품 삭제 |
| `CheckoutForm` | `/api/cart?clear=true` | DELETE | 주문 완료 후 장바구니 비우기 |
| `LoginForm` | `/api/auth/...` (NextAuth) | POST | 이메일 · 소셜 로그인 |

### Server Action 목록

| 파일 | 함수 | 역할 |
|---|---|---|
| `auth.actions.ts` | `register()` | 회원가입 — bcrypt 암호화 후 DB 저장 |
| `order.actions.ts` | `createOrder()` | 주문 생성 — 서버에서 가격 재검증 + DB 트랜잭션 |
| `order.actions.ts` | `cancelOrder()` | 주문 취소 — 본인 주문만 상태 변경 |
| `admin.actions.ts` | `createProduct()` | 상품 등록 — admin 권한 확인 후 DB 저장 |
| `admin.actions.ts` | `updateProduct()` | 상품 수정 — admin 권한 확인 후 DB 업데이트 |
| `admin.actions.ts` | `deleteProduct()` | 상품 삭제 — admin 권한 확인 후 DB 삭제 |

---

## 주요 문서

| 문서 | 내용 |
|---|---|
| `CLAUDE.md` | AI 작업 규칙, 기술 스택, 폴더 구조 |
| `work.md` | 진행 중인 작업 현황 |
| `history.md` | 완료된 작업 이력 |
| `docs/ARCHITECTURE.md` | 전체 아키텍처 |
| `docs/oauth/` | OAuth(소셜 로그인) 설계 및 설정 가이드 |
| `docs/redis/` | Redis 설계 및 설정 가이드 |
| `docs/specs/` | 기능별 스펙 문서 |
