# 쇼핑몰 앱 (shop-monorepo-oauth)
- 이 버전은 쇼핑몰에 PWA기능이 일부 구현되어 있지만 더 이상 진행하지 않았다.
  왜냐하면 여기에는 React Native를 Expo를 통해서 구현하기 때문이다.

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
