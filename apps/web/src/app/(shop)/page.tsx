/**
 * [Server Component] 쇼핑몰 메인 홈 페이지
 *
 * docs/design/pages/main.md(Figma node 1:3 기반 명세) + docs/design/DESIGN.md(Serene Editorial
 * 디자인 토큰)를 기준으로 리디자인한 화면이다. GNB는 (shop)/layout.tsx의 Header가 담당하므로
 * 이 파일은 Hero Banner / Category Tab / New Arrivals / Brand Spotlight / Beauty Picks /
 * Newsletter 6개 섹션을 구현한다.
 *
 * 데이터: 기존 Prisma 쿼리(categories, newProducts, bestProducts)를 그대로 재사용한다.
 * Brand Spotlight·Beauty Picks·Newsletter처럼 DB에 의미상 정확히 대응하는 데이터가 없는
 * 섹션은 정적 콘텐츠 또는 기존 쿼리 결과(bestProducts)를 재활용한다 — 완벽한 의미적 매칭은
 * 요구하지 않는다.
 */
import Link from 'next/link';
import { prisma } from '@my-project/database';
import ProductImage from '@/features/products/components/ProductImage';
import RecentProducts from '@/features/products/components/RecentProducts';
import ProductGrid from '@/features/products/components/ProductGrid';
import type { Product } from '@my-project/types';

/**
 * [Server Component] 상품 카드 — New Arrivals 섹션 전용
 * `{components.product-card}` 토큰 명세를 따른다: 외곽선/그림자 없음, 이미지 rounded.md,
 * 상품명 body-md bold, 가격 body-md regular.
 */
function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="relative aspect-square overflow-hidden rounded-dm-md bg-dm-surface-container-low">
        <ProductImage src={product.imageUrl} alt={product.name} />
      </div>
      <div className="mt-3 font-dm-ko">
        {product.category && (
          <p className="text-xs text-dm-on-surface-variant">{product.category.name}</p>
        )}
        <p className="text-sm font-semibold text-dm-on-surface mt-1 line-clamp-1">{product.name}</p>
        <p className="text-sm text-dm-on-surface-variant mt-0.5">{product.price.toLocaleString()}원</p>
      </div>
    </Link>
  );
}

export default async function HomePage() {
  const [categories, newProducts, bestProducts] = await Promise.all([
    prisma.category.findMany({
      where: { parentId: null },
      orderBy: { sortOrder: 'asc' },
    }),
    prisma.product.findMany({
      take: 8,
      orderBy: { createdAt: 'desc' },
      include: { category: true },
    }),
    prisma.product.findMany({
      take: 8,
      orderBy: { stock: 'asc' },
      include: { category: true },
    }),
  ]);

  return (
    <div className="bg-dm-surface min-h-full font-dm-body">

      {/* 2. Hero Banner */}
      <section className="relative w-full min-h-[480px] flex items-center justify-center overflow-hidden bg-dm-primary">
        <div className="absolute inset-0 bg-black/5" />
        <div className="relative z-10 max-w-[672px] mx-auto px-6 text-center text-dm-on-primary">
          <p className="font-dm-body text-xs font-bold tracking-[0.08em] uppercase text-dm-secondary-container">
            AW 2024 COLLECTION
          </p>
          <h1 className="font-dm-display text-[28px] md:text-5xl leading-[1.2] mt-4">
            계절을 입다, <em className="italic">새로운</em> 무드
          </h1>
          <Link
            href="/products"
            className="inline-block mt-8 px-6 py-3 rounded-dm-full bg-dm-on-primary text-dm-primary font-dm-body text-xs font-bold tracking-[0.08em] uppercase hover:opacity-90 transition-opacity"
          >
            SHOP NOW
          </Link>
        </div>
      </section>

      {/* 3. Category Tab (Horizontal Scroll) */}
      <section className="border-b border-dm-outline-variant">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10 overflow-x-auto">
          <div className="flex gap-8 py-6 min-w-max">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="font-dm-ko text-xs font-bold tracking-[0.04em] text-dm-on-surface-variant hover:text-dm-on-surface whitespace-nowrap pb-1 border-b-2 border-transparent hover:border-dm-on-surface transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. New Arrivals */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-10 py-12 md:py-20">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-2">
          <div>
            <h2 className="font-dm-display text-2xl md:text-[32px] text-dm-on-surface">New Arrivals</h2>
            <p className="font-dm-ko text-sm text-dm-on-surface-variant mt-1">새로 들어온 상품</p>
          </div>
          <Link href="/products?sort=new" className="font-dm-body text-xs font-bold tracking-[0.08em] uppercase underline text-dm-on-surface">
            VIEW ALL
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {newProducts.map((p) => <ProductCard key={p.id} product={p as any} />)}
        </div>
      </section>

      {/* 개인 추천상품 — 최근 본 상품 (없으면 숨김) */}
      <RecentProducts />

      {/* 5. Brand Spotlight (Asymmetric) */}
      <section className="bg-dm-surface-container-low rounded-dm-lg max-w-[1280px] mx-auto px-4 md:px-10 py-12 md:py-20 my-4">
        <div className="grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 aspect-[4/3] rounded-dm-lg overflow-hidden bg-dm-surface-container-high">
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&h=900&fit=crop&auto=format"
              alt="Designer of the month"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:col-span-5">
            <p className="font-dm-body text-xs font-bold tracking-[0.08em] uppercase text-dm-secondary">
              DESIGNER OF THE MONTH
            </p>
            <h2 className="font-dm-display text-[28px] md:text-[32px] text-dm-on-surface mt-3">
              브랜드 스토리, 그 안의 디테일
            </h2>
            <p className="font-dm-ko text-sm md:text-base text-dm-on-surface-variant mt-4 leading-relaxed">
              한 땀 한 땀의 디테일에 집중한 이번 시즌 컬렉션을 만나보세요.
            </p>
            <Link href="/products" className="inline-flex items-center gap-2 mt-6 font-dm-body text-xs font-bold tracking-[0.08em] uppercase text-dm-on-surface">
              EXPLORE THE COLLECTION <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Beauty Picks — 별도 뷰티 큐레이션 쿼리가 없어 bestProducts 데이터를 재사용 */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-10 py-12 md:py-20">
        <h2 className="font-dm-display italic text-2xl md:text-[32px] text-dm-on-surface mb-8">Beauty Picks</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {bestProducts.map((p) => (
            <Link key={p.id} href={`/products/${p.id}`} className="shrink-0 w-[260px] md:w-[320px]">
              <div className="aspect-square rounded-dm-md overflow-hidden bg-dm-surface-container-low">
                <ProductImage src={p.imageUrl} alt={p.name} />
              </div>
              <div className="mt-3 font-dm-ko">
                {p.category && (
                  <p className="text-[11px] font-medium text-dm-secondary">{p.category.name}</p>
                )}
                <p className="text-sm font-bold text-dm-on-surface mt-1 line-clamp-1">{p.name}</p>
                <p className="text-sm text-dm-on-surface mt-0.5">{p.price.toLocaleString()}원</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 전체상품 — 무한 스크롤 (기존 기능 유지) */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-10 pb-12 md:pb-20">
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-dm-display text-2xl md:text-[32px] text-dm-on-surface">전체상품</h2>
          <Link href="/products" className="font-dm-body text-xs font-bold tracking-[0.08em] uppercase underline text-dm-on-surface">
            VIEW ALL
          </Link>
        </div>
        <ProductGrid />
      </section>

      {/* 7. Newsletter */}
      <section className="bg-dm-primary py-12 md:py-20">
        <div className="max-w-[512px] mx-auto px-6 text-center">
          <h2 className="font-dm-display italic text-2xl md:text-[32px] text-dm-on-primary">
            새 소식을 가장 먼저 받아보세요
          </h2>
          <p className="font-dm-ko text-sm text-dm-on-primary/80 mt-3">
            신상품과 단독 혜택을 이메일로 안내드립니다.
          </p>
          <form className="mt-6 flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="이메일 주소"
              className="flex-1 rounded-dm-md bg-transparent border border-white/30 px-4 py-3 text-sm text-dm-on-primary placeholder:text-dm-on-primary/50 focus:outline-none focus:border-dm-on-primary"
            />
            <button
              type="submit"
              className="rounded-dm-md bg-dm-on-primary text-dm-primary px-6 py-3 text-xs font-bold tracking-[0.08em] uppercase hover:opacity-90 transition-opacity"
            >
              SUBMIT
            </button>
          </form>
        </div>
      </section>

    </div>
  );
}
