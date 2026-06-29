/**
 * 장바구니 관련 공통 타입
 *
 * Cart는 PostgreSQL이 아닌 Redis에 저장된다 (key: cart:user:<id> 또는 cart:session:<id>, TTL 7일).
 * 클라이언트의 Zustand(cartStore, localStorage)는 일부 화면(BottomNav 카운트)의 보조 캐시일 뿐,
 * 실제 장바구니 데이터는 /api/cart를 통해 Redis에서 조회·변경된다.
 * Order(주문)와 개념이 다르므로 별도 파일로 분리한다.
 *
 * Cart → Order 흐름:
 *   1. 사용자가 상품을 CartItem으로 장바구니에 담는다 (Redis에 저장)
 *   2. 결제 완료 시 CartItem → OrderItem으로 변환되어 PostgreSQL DB에 저장된다
 *   3. 장바구니는 비워진다 (clearCart, Redis에서 삭제)
 */

export interface CartItem {
  productId: string;
  productName: string;
  price: number;        // 담은 시점의 가격 (이후 가격이 바뀌어도 유지)
  quantity: number;
  imageUrl?: string;
}
