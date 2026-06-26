/**
 * [Server Component] 상품 상세 페이지
 *
 * URL 파라미터(id)로 단일 상품을 DB에서 직접 조회해 완성된 HTML을 브라우저에 전송한다.
 * - 상품이 없으면 404(notFound) 처리
 * - Date 타입은 toISOString()으로 직렬화 후 Client Component에 props로 전달
 * - RecentTracker · ProductActions 는 상호작용이 필요한 Client Component로 분리
 */
import { notFound } from 'next/navigation';
import { prisma } from '@my-project/database';
import ProductImage from '@/features/products/components/ProductImage';
import RecentTracker from '@/features/products/components/RecentTracker';
import ProductActions from '@/features/products/components/ProductActions';
import RecentlyViewedSection from '@/features/products/components/RecentlyViewedSection';
/**
 * 상품 상세 페이지 컴포넌트
 * - 서버 컴포넌트로, 상품 ID를 받아 해당 상품의 상세 정보를 데이터베이스에서 조회하여 렌더링
 * @param param0 
 * @returns 
 */
export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });

  if (!product) notFound();
  // 클라이언트에 전달할 데이터 변환
  const productForClient = {
    id: product.id,
    name: product.name,
    price: product.price,
    description: product.description ?? undefined,
    imageUrl: product.imageUrl ?? undefined,
    stock: product.stock,
    createdAt: product.createdAt.toISOString(),
    categoryId: product.categoryId ?? undefined,
    category: product.category
      ? { id: product.category.id, name: product.category.name, slug: product.category.slug, sortOrder: product.category.sortOrder }
      : undefined,
  };

  return (
    <div className="flex flex-col gap-20 bg-dm-surface font-dm-body px-10 pt-10 pb-20">
      <RecentTracker product={productForClient} />

      {/* Section 1-2: 이미지 + 정보 */}
      <div className="flex flex-col md:flex-row gap-6 w-full">
        {/* 좌: 상품 이미지 */}
        <div className="rounded-dm-md overflow-hidden bg-dm-surface-container-low shrink-0 size-full md:size-[588px]">
          <ProductImage src={product.imageUrl} alt={product.name} />
        </div>

        {/* 우: 상품 정보 + 액션 */}
        <div className="flex flex-1 flex-col gap-4 min-w-0">
          {product.category && (
            <p className="font-dm-ko text-[11px] font-medium text-dm-on-surface-variant">{product.category.name}</p>
          )}
          <h1 className="font-dm-display text-2xl text-dm-on-surface">{product.name}</h1>
          <p className="font-dm-body text-lg font-semibold text-dm-on-surface tracking-[0.02em]">{product.price.toLocaleString()}원</p>

          <hr className="border-dm-outline-variant" />

          <ProductActions product={productForClient} />

          <hr className="border-dm-outline-variant" />

          <div className="flex flex-col gap-2 font-dm-ko text-sm text-dm-on-surface-variant">
            <p>🚚 무료배송 · 오늘 출고 시 내일 도착 예정</p>
            <p>💰 구매 시 적립금 2% 지급</p>
          </div>
        </div>
      </div>

      {/* Section 4: 상세 설명 */}
      <section className="flex flex-col gap-6 w-full">
        <h2 className="font-dm-display text-2xl text-dm-on-surface">상세 설명</h2>
        {product.description ? (
          <p className="font-dm-ko text-base text-dm-on-surface-variant leading-relaxed whitespace-pre-line">
            {product.description}
          </p>
        ) : (
          <p className="font-dm-ko text-sm text-dm-on-surface-variant text-center py-6">상세 정보가 없습니다.</p>
        )}
        {product.imageUrl && (
          <div className="rounded-dm-md overflow-hidden bg-dm-surface-container-low">
            <img src={product.imageUrl} alt={product.name} className="w-full object-cover" />
          </div>
        )}
      </section>

      {/* Section 5: 리뷰 */}
      <section className="flex flex-col gap-4 w-full">
        <h2 className="font-dm-display text-2xl text-dm-on-surface">리뷰</h2>
        <p className="font-dm-ko text-sm text-dm-on-surface-variant">아직 리뷰가 없습니다</p>
      </section>

      {/* Section 6: 최근 본 상품 */}
      <RecentlyViewedSection />
    </div>
  );
}
