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
    <div className="max-w-5xl mx-auto px-6 py-10">
      <RecentTracker product={productForClient} />

      {/* 상단: 이미지 + 정보/액션 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* 좌: 상품 이미지 */}
        <div className="aspect-square rounded-[var(--radius)] overflow-hidden border border-border">
          <ProductImage src={product.imageUrl} alt={product.name} />
        </div>

        {/* 우: 상품 정보 + 액션 */}
        <div className="flex flex-col gap-3">
          {product.category && (
            <p className="text-sm text-muted-foreground">{product.category.name}</p>
          )}
          <h1 className="text-2xl font-bold text-foreground">{product.name}</h1>
          <p className="text-3xl font-bold text-primary mt-1">{product.price.toLocaleString()}원</p>

          <hr className="border-border my-2" />

          <ProductActions product={productForClient} />
        </div>
      </div>

      {/* 리뷰 섹션 */}
      <section className="mt-16">
        <h2 className="text-xl font-semibold text-foreground mb-4">리뷰</h2>
        <div className="border border-border rounded-[var(--radius)] p-10 text-center text-muted-foreground text-sm">
          아직 리뷰가 없습니다.
        </div>
      </section>

      {/* 상품 상세정보 섹션 */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold text-foreground mb-4">상품 상세정보</h2>
        <div className="border border-border rounded-[var(--radius)] overflow-hidden">
          {product.imageUrl && (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full object-cover"
            />
          )}
          <div className="p-6">
            {product.description ? (
              <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-6">상세 정보가 없습니다.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
