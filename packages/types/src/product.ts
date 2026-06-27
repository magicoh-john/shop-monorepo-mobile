/**
 * ============================================================
 * product.ts 의 역할에 대한 학습 노트
 * ============================================================
 *
 * ── Q1 ──────────────────────────────────────────────────────
 * 지금 보이는 이 모듈은 공유 타입인가? 이것들은 앱에서 어떤 역할을 하는가?
 *
 * ── A1 ──────────────────────────────────────────────────────
 * 네, packages/types/src/product.ts 는 모노레포 전체에서 공유하는 타입 패키지
 * (@my-project/types)의 일부입니다.
 *
 * [역할]
 * - Category, Product, ProductListResponse 인터페이스를 정의 — DB(Prisma) 모델과
 *   1:1로 대응하는 게 아니라, 클라이언트(웹/모바일)가 API 응답을 받을 때 사용하는
 *   계약(contract)입니다.
 * - index.ts에서 auth.ts, cart.ts, order.ts, common.ts와 함께 전부 export *로
 *   재노출되어, 앱 쪽에서는 import { Product, Category } from '@my-project/types'
 *   한 줄로 가져다 쓸 수 있습니다.
 *
 * [누가 쓰는가] (@my-project/types import 기준)
 * - apps/web: app/(shop)/page.tsx, CategoryFilter, CategoryNavClient,
 *   AddToCartButton, ProductActions, RecentTracker, recentStore.ts 등 —
 *   상품 목록/상세, 카테고리 네비게이션, 최근 본 상품, 장바구니 버튼에서 사용
 * - apps/mobile: app/products/[id].tsx, app/products/index.tsx,
 *   app/cart/index.tsx — 모바일 앱도 동일한 Product/Category 타입으로 화면을 그림
 *
 * [왜 패키지로 분리했는가]
 * 웹과 모바일이 같은 백엔드(API Route)를 호출하므로, 응답 형태(Product, Category 등)를
 * 한 곳에서 정의해 두 앱이 동시에 import합니다. 한쪽에서 필드를 추가/변경하면 다른 쪽도
 * 타입 에러로 즉시 알 수 있어, 웹·모바일 간 데이터 모델 불일치를 막는 것이 목적입니다.
 *
 * 참고로 id/categoryId가 모두 string인 것은 Prisma 스키마에서 해당 컬럼이
 * cuid()/uuid 등 문자열 PK이기 때문이고, imageUrl?, description?처럼 옵셔널인
 * 필드는 DB에서 nullable로 정의된 컬럼과 대응됩니다.
 *
 *
 * ── Q2 ──────────────────────────────────────────────────────
 * 클라이언트(웹/모바일)가 API 응답을 받을 때 사용하는 계약(contract) 입니다.
 *
 * ── A2 ──────────────────────────────────────────────────────
 * 좋은 예시가 마침 이 프로젝트에 있습니다.
 *
 * 1. 왜 필요한가
 * 서버 코드와 클라이언트 코드는 완전히 분리되어 있고, 둘 사이를 네트워크(HTTP)로
 * 주고받는 JSON이 연결합니다. JSON 자체에는 타입이 없습니다. 서버가 어떤 필드를
 * 어떤 이름·타입으로 보내는지, 클라이언트 쪽 코드만 보면 알 방법이 없습니다.
 * 예를 들어 서버가 imageUrl을 image_url로 바꿔도, 클라이언트 코드는 컴파일
 * 시점엔 멀쩡해 보이고 실제로 화면을 띄울 때(런타임)에야 undefined로 깨집니다.
 *
 * 2. 무엇인가
 * Product 인터페이스는 "서버가 이런 모양의 객체를 보내줄 것이다"라는 약속을
 * 코드로 적어둔 것입니다. 서버(API Route)와 클라이언트(웹/모바일)가 같은
 * @my-project/types 패키지를 import하면, 양쪽이 같은 약속을 보고 있다는 게
 * 보장됩니다.
 *
 * 3. 어떻게 쓰는가 — 실제 코드로
 * - 서버 쪽: apps/web/src/app/api/products/route.ts:38 에서
 *   prisma.product.findMany(...)로 DB 조회 후
 *   Response.json({ items, nextCursor })로 응답
 * - 클라이언트 쪽: apps/mobile/app/products/[id].tsx:5 에서
 *   import { Product, CartItem } from "@my-project/types" 후, fetch 결과를
 *   Product 타입으로 다룸 → product.imageUrl, product.price 같은 필드에
 *   자동완성이 뜨고, 오타나 존재하지 않는 필드를 쓰면 컴파일 에러로 즉시 잡힙니다
 *
 * 4. 한계도 같이 보여드릴게요 — "계약"은 강제가 아니라 합의입니다
 * product.ts:23에 ProductListResponse { products, total }이 정의돼 있는데,
 * 실제 apps/web/src/app/api/products/route.ts:58은 { items, nextCursor }를
 * 반환합니다. 즉 이 타입은 정의돼 있지만 아무 데서도 쓰이지 않고, 실제 응답
 * 모양과도 다릅니다.
 *
 * TypeScript는 "서버가 실제로 이 타입대로 응답하는지"를 검증해주지 않습니다.
 * 서버 핸들러에 응답 타입을 명시(: Promise<Product[]> 같은)하지 않으면, 계약은
 * 그냥 사람이 지키기로 한 약속일 뿐이고 어긋날 수 있습니다. 그래서 새 API를
 * 만들 때는 응답 타입을 직접 지정해 컴파일러가 검증하도록 하는 게 안전합니다.
 *
 *
 * ── Q3 ──────────────────────────────────────────────────────
 * api route에서 클라이언트의 요청을 받을 때도 이 타입이 사용되는가?
 *
 * ── A3 ──────────────────────────────────────────────────────
 * 결론: 지금 이 프로젝트에서는 거의 안 쓰입니다 — 응답에만 쓰이고, 요청을
 * 받을 때는 별도 타입을 씁니다.
 *
 * 근거를 코드로 보면:
 * - apps/web/src/app/api/products/route.ts — GET 요청, 응답에만
 *   Product/Category 데이터가 들어가지만 정작 응답 타입을 명시적으로
 *   지정하지 않음
 * - apps/web/src/app/api/cart/route.ts:86 —
 *   const item: CartItem = await req.json(); 처럼 요청 바디(body)를 받을 때
 *   타입을 명시하긴 합니다. 하지만 이때 쓰는 CartItem은 @my-project/types가
 *   아니라 apps/web/src/lib/cart.ts:3에 별도로 정의된 CartItem입니다.
 *   우연히 모양은 똑같지만(productId, productName, price, quantity,
 *   imageUrl), import 경로가 다른 별개의 타입입니다.
 *
 * 왜 이렇게 됐을까 — 그리고 실무적으로 더 중요한 문제
 * await req.json()은 런타임에 Promise<any>를 반환합니다.
 * const item: CartItem = ...처럼 타입을 적어도, 이건 TypeScript에게
 * "이 모양이라고 믿어줘"라고 우기는 것일 뿐 — 실제로 클라이언트가 quantity를
 * 문자열로 보내든, 필드를 빼먹고 보내든 컴파일러는 잡아주지 못합니다.
 * 응답에 쓰는 타입(서버→클라이언트)은 "내가 이렇게 줄게"라는 약속이라
 * 비교적 안전하지만, 요청에 쓰는 타입(클라이언트→서버)은 "남이 이렇게
 * 줄 것"이라는 가정이라 훨씬 위험합니다. 그래서 보통 요청 바디는 타입
 * 캐스팅만으로 끝내지 않고 Zod 같은 런타임 검증 스키마(zod)로 실제 값을
 * 확인합니다 — 이 프로젝트의 auth.ts 쪽 회원가입/로그인 폼에서는 이미
 * Zod 스키마를 그렇게 쓰고 있고, 같은 패턴을 /api/cart, /api/order의
 * 요청 바디 검증에도 적용하면 더 안전해집니다.
 *
 *
 * ── Q4 ──────────────────────────────────────────────────────
 * zod schema가 클라이언트에서 입력되는 정보를 검증하는데도 사용되고 서버
 * 측에서 값의 타입을 검증할 때도 사용한다는 말인가?
 *
 * ── A4 ──────────────────────────────────────────────────────
 * 네, 정확히 그 말입니다 — 그리고 이 프로젝트에 실제로 그렇게 쓰인 예가
 * 있습니다. 같은 Zod 스키마 객체 하나를 클라이언트와 서버 양쪽에서
 * import해서 쓰되, 용도가 다릅니다.
 *
 * 예: 로그인 — loginSchema (apps/web/src/schemas/auth.schema.ts)
 *
 *   export const loginSchema = z.object({
 *     email: z.string().email("올바른 이메일 형식이 아닙니다"),
 *     password: z.string().min(6, "비밀번호는 6자 이상이어야 합니다"),
 *   });
 *
 * - 클라이언트: apps/web/src/features/auth/components/LoginForm.tsx:29
 *     resolver: zodResolver(loginSchema)
 *   React Hook Form이 사용자가 타이핑할 때마다 이 스키마로 검사해서, 제출
 *   전에 "이메일 형식이 아닙니다" 같은 에러 메시지를 화면에 보여줍니다.
 *   목적은 UX — 서버까지 요청을 보내기 전에 사용자에게 빨리 피드백을
 *   주는 것입니다.
 *
 * - 서버: apps/web/src/app/api/mobile/auth/login/route.ts:21
 *     const body = await req.json();
 *     const parsed = loginSchema.safeParse(body);
 *     if (!parsed.success) { ... 400 응답 ... }
 *   여기서는 같은 스키마로 들어온 JSON 바디를 실제로 검사합니다.
 *   parsed.success가 true일 때만 parsed.data(타입이 보장된 값)를 꺼내 씁니다.
 *
 * 왜 둘 다 필요한가
 * 클라이언트 검증(zodResolver)은 친절함이고, 서버 검증(safeParse)은 보안
 * 경계입니다. 클라이언트 검증은 우회가 너무 쉽습니다 — 브라우저
 * 개발자도구로 폼을 건너뛰거나, Postman/curl로
 * /api/mobile/auth/login에 아무 JSON이나 직접 보낼 수 있기 때문입니다.
 * 그래서 cart/route.ts:86의 const item: CartItem = await req.json()처럼
 * 타입 캐스팅만 해둔 코드는 실제로는 아무것도 검증하지 않는 것이고, 이
 * login/route.ts처럼 safeParse를 거쳐야 비로소 "이 값이 실제로 이
 * 모양이다"가 보장됩니다.
 *
 * 정리하면: 타입(@my-project/types, interface)은 컴파일 시점에만 존재하고
 * 런타임엔 사라지는 약속이고, Zod 스키마는 컴파일 시점 타입 + 런타임에
 * 실제 값을 검사하는 코드까지 같이 만들어주는 것이라서, 신뢰할 수 없는
 * 입력(사용자 폼, 외부 요청 바디)을 다룰 때는 Zod 같은 런타임 검증이
 * 필요합니다.
 * ============================================================
 */

export interface Category {
  id: string;
  name: string;
  slug: string;
  emoji?: string;
  parentId?: string;
  sortOrder: number;
  children?: Category[];
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
  stock: number;
  createdAt: string;
  categoryId?: string;
  category?: Category;
}

export interface ProductListResponse {
  products: Product[];
  total: number;
}
