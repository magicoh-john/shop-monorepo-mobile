/**
 * [Server Component] 상품 상세 화면 — 정적 프리뷰
 *
 * 목적: 실제 상품 조회(Prisma)·장바구니 로직(ProductActions.tsx)을 건드리지 않고,
 * 디자인 헌법(DESIGN.md)과 Figma 디자인(node-id 64:3)만 반영한 정적 화면을 먼저 완성해 검증하기 위한
 * 별도 라우트다. 시각 검증 통과 후 (shop)/products/[id]/page.tsx · ProductActions.tsx에 동일한 마크업/토큰을 통합한다.
 */
const recentProducts = [
  { category: '스킨케어', name: '수분 진정 토너 200ml', price: '28,000원' },
  { category: '메이크업', name: '벨벳 매트 립스틱', price: '19,000원' },
  { category: '바디케어', name: '시어버터 핸드크림', price: '12,000원' },
  { category: '헤어케어', name: '댐티지 리페어 샴푸', price: '21,000원' },
];

export default function ProductPreviewPage() {
  return (
    <div className="flex flex-col gap-20 max-w-[1280px] mx-auto px-10 py-10">
      <div className="flex gap-6 items-start">
        <div className="bg-dm-surface-container-low rounded-dm-md size-[588px] shrink-0 flex items-end p-5">
          <p className="font-dm-body text-xs font-bold tracking-[0.08em] text-dm-on-surface-variant">
            상품 이미지 영역 (DB: imageUrl)
          </p>
        </div>

        <div className="flex flex-col gap-4 flex-1">
          <p className="font-dm-body text-[11px] font-medium text-dm-on-surface-variant">스킨케어</p>
          <h1 className="font-dm-display text-2xl text-dm-on-surface">수분 진정 토너 200ml</h1>
          <p className="font-dm-body text-lg font-semibold tracking-[0.02em] text-dm-on-surface">28,000원</p>

          <div className="h-px w-full bg-dm-outline-variant" />

          <div className="flex items-center gap-4">
            <p className="font-dm-body text-sm text-dm-on-surface-variant">수량</p>
            <div className="flex items-center rounded-dm-md border border-dm-outline-variant font-dm-body text-sm text-dm-on-surface">
              <div className="flex size-9 items-center justify-center">−</div>
              <div className="flex h-9 w-10 items-center justify-center">1</div>
              <div className="flex size-9 items-center justify-center">+</div>
            </div>
            <p className="font-dm-body text-[11px] font-medium text-dm-on-surface-variant">재고 32개</p>
          </div>

          <div className="h-px w-full bg-dm-outline-variant" />

          <div className="flex flex-col gap-2 w-full">
            <button
              type="button"
              className="w-full bg-dm-primary text-dm-on-primary rounded-dm-md px-6 py-3 font-dm-body text-xs font-bold tracking-[0.08em]"
            >
              주문하기
            </button>
            <button
              type="button"
              className="w-full border border-dm-primary text-dm-primary rounded-dm-md px-6 py-3 font-dm-body text-xs font-bold tracking-[0.08em]"
            >
              장바구니 담기
            </button>
            <button
              type="button"
              className="w-full border border-dm-outline-variant text-dm-on-surface rounded-dm-md px-6 py-3 font-dm-body text-xs font-bold tracking-[0.08em]"
            >
              ♡ 찜하기
            </button>
          </div>

          <div className="h-px w-full bg-dm-outline-variant" />

          <div className="flex flex-col gap-2 font-dm-body text-sm text-dm-on-surface-variant">
            <p>🚚 무료배송 · 오늘 출고 시 내일 도착 예정</p>
            <p>💰 구매 시 적립금 2% 지급</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="font-dm-display text-2xl text-dm-on-surface">상세 설명</h2>
        <p className="font-dm-body text-base text-dm-on-surface-variant">
          은행 추출물과 히알루론산이 함유되어 피부 결을 정돈하고 수분을 채워주는 진정 토너입니다. 민감성 피부도 자극 없이 사용 가능합니다.
        </p>
        <div className="flex flex-col gap-6">
          {['상세 이미지 1', '상세 이미지 2', '상세 이미지 3'].map((label) => (
            <div key={label} className="bg-dm-surface-container-low rounded-dm-md h-[600px] flex items-end p-5">
              <p className="font-dm-body text-xs font-bold tracking-[0.08em] text-dm-on-surface-variant">
                {label} (placeholder)
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-dm-display text-2xl text-dm-on-surface">리뷰</h2>
        <p className="font-dm-body text-sm text-dm-on-surface-variant">아직 리뷰가 없습니다</p>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-dm-display text-2xl text-dm-on-surface">최근 본 상품</h2>
        <div className="flex gap-6">
          {recentProducts.map((p) => (
            <div key={p.name} className="flex flex-1 flex-col gap-2">
              <div className="bg-dm-surface-container-low rounded-dm-md h-[280px] w-full" />
              <p className="font-dm-body text-[11px] font-medium text-dm-on-surface-variant">{p.category}</p>
              <p className="font-dm-body text-sm text-dm-on-surface">{p.name}</p>
              <p className="font-dm-body text-sm text-dm-on-surface">{p.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
