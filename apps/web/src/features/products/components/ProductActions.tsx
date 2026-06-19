'use client';

/**
 * [Client Component] 상품 상세 페이지 — 수량 선택 · 장바구니 · 주문 액션
 *
 * - Server Component(상품 상세 페이지)로부터 product props를 전달받는다
 * - 수량 변경: 로컬 state로 관리
 * - 장바구니 담기: product.id를 포함해 POST /api/cart (Route Handler) 호출
 * - 주문하기: 장바구니 추가 후 /checkout 으로 이동
 */
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heart } from 'lucide-react';
import type { Product } from '@my-project/types';

export default function ProductActions({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);  // 장바구니 수량 상태를 1로 초기화
  const router = useRouter(); // Next.js 라우터 훅, 페이지 이동과 새로고침에 사용

  // 장바구니에 추가하는 함수로 Api Route Handler에 POST 요청을 보내는 역할을 함
  //
  // fetch(url, options)
  //   url     : 요청을 보낼 Route Handler 주소
  //   method  : HTTP 메서드 — POST(생성), GET(조회), PUT/PATCH(수정), DELETE(삭제)
  //   headers : 요청 헤더 — 'Content-Type: application/json' 은 body가 JSON임을 서버에 알림
  //   body    : 서버로 전송할 데이터 — 객체를 JSON 문자열로 직렬화해서 전송
  const addToCart = async () => {
    await fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity,
        imageUrl: product.imageUrl ?? undefined,
      }),
    });
    router.refresh(); // 장바구니 상태가 변경되었으므로 페이지를 새로고침하여 최신 상태 반영 (예: 장바구니 아이콘의 수량 배지 업데이트)
  };

  // 장바구니에 추가 버튼 클릭 시 호출되는 함수
  const handleAddToCart = async () => {
    await addToCart();
    alert('장바구니에 추가되었습니다.');
  };

  // 바로 주문하기 버튼 클릭 시 호출되는 함수
  const handleOrder = async () => {
    await addToCart();
    router.push('/checkout');
  };

  const soldOut = product.stock === 0;  // 재고가 0인 경우 품절로 간주

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground w-8">수량</span>
        <div className="flex items-center border border-border rounded-[calc(var(--radius)-2px)]">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1}
            className="w-9 h-9 flex items-center justify-center hover:bg-accent transition-colors disabled:opacity-40"
          >
            −
          </button>
          <span className="w-10 text-center text-sm font-medium">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
            disabled={soldOut || quantity >= product.stock}
            className="w-9 h-9 flex items-center justify-center hover:bg-accent transition-colors disabled:opacity-40"
          >
            +
          </button>
        </div>
        {!soldOut && (
          <span className="text-xs text-muted-foreground">재고 {product.stock}개</span>
        )}
      </div>

      <div className="flex flex-col gap-2 mt-2">
        <button
          type="button"
          onClick={handleOrder}
          disabled={soldOut}
          className="w-full bg-primary text-primary-foreground py-3 rounded-[calc(var(--radius)-2px)] font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {soldOut ? '품절' : '주문하기'}
        </button>
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={soldOut}
          className="w-full border border-primary text-primary py-3 rounded-[calc(var(--radius)-2px)] font-semibold hover:bg-accent transition-colors disabled:opacity-50"
        >
          장바구니 담기
        </button>
        <button
          type="button"
          className="w-full border border-border text-foreground py-3 rounded-[calc(var(--radius)-2px)] font-medium hover:bg-accent transition-colors flex items-center justify-center gap-2"
        >
          <Heart size={16} />
          찜하기
        </button>
      </div>
    </div>
  );
}
