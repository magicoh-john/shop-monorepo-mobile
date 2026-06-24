/**
 * [Server Component] 쇼핑몰 메인 홈 페이지
 *
 * docs/design/pages/main.md(Figma node 1:3 실제 콘텐츠 기준 명세) + docs/design/DESIGN.md
 * (Serene Editorial 디자인 토큰)를 기준으로 구현한 화면이다. GNB는 (shop)/layout.tsx의
 * Header가 담당하므로 이 파일은 Hero Banner / Category Tab / New Arrivals / Brand Spotlight /
 * The Beauty Ritual / Join The Circle 6개 섹션을 구현한다.
 *
 * 콘텐츠 출처: Hero·Brand Spotlight·The Beauty Ritual 타이틀·Join The Circle은 Figma 원문
 * (영문)을 그대로 사용한다 — DB에 대응하는 데이터가 없는 정적 콘텐츠다.
 * New Arrivals·The Beauty Ritual 상품 목록은 기존 Prisma 쿼리(newProducts, bestProducts)를
 * 재사용한다 — 완벽한 의미적 매칭(뷰티 전용 쿼리 등)은 요구하지 않는다.
 */
import Link from 'next/link';
import { prisma } from '@my-project/database';
import ProductImage from '@/features/products/components/ProductImage';
import RecentProducts from '@/features/products/components/RecentProducts';
import ProductGrid from '@/features/products/components/ProductGrid';
import type { Product } from '@my-project/types';

/** [Server Component] 상품 카드 — New Arrivals 섹션 전용 (이미지 rounded.lg = 16px, Figma 실측값) */
function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="relative aspect-square overflow-hidden rounded-dm-lg bg-dm-surface-container">
        <ProductImage src={product.imageUrl} alt={product.name} />
        <button
          type="button"
          aria-label="위시리스트에 추가"
          className="absolute top-3 right-3 size-10 rounded-dm-full bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="size-4 text-dm-on-surface">
            <path d="M12 21s-7.5-4.6-10-9.1C.5 8.7 2 5 5.5 5 8 5 10 6.8 12 9c2-2.2 4-4 6.5-4C22 5 23.5 8.7 22 11.9 19.5 16.4 12 21 12 21z" />
          </svg>
        </button>
      </div>
      <div className="mt-3 font-dm-ko">
        {product.category && (
          <p className="text-[11px] font-medium text-dm-on-surface-variant uppercase tracking-wide">{product.category.name}</p>
        )}
        <p className="text-base font-bold text-dm-on-surface mt-1 line-clamp-1">{product.name}</p>
        <p className="text-base text-dm-on-surface mt-0.5">{product.price.toLocaleString()}원</p>
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
      take: 4,
      orderBy: { createdAt: 'desc' },
      include: { category: true },
    }),
    prisma.product.findMany({
      take: 4,
      orderBy: { stock: 'asc' },
      include: { category: true },
    }),
  ]);

  return (
    <div className="bg-dm-surface min-h-full font-dm-body">

      {/* 2. Hero Banner */}
      <section className="relative w-full min-h-[640px] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1600&h=1200&fit=crop&auto=format"
          alt="AW 2024 Collection"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/5" />
        <div className="relative z-10 max-w-[672px] mx-auto px-6 text-center">
          <p className="font-dm-body text-xs font-bold tracking-[0.08em] uppercase text-dm-primary">
            AW 2024 COLLECTION
          </p>
          <h1 className="font-dm-display text-[28px] md:text-5xl leading-[1.2] mt-4 text-dm-primary">
            <em className="italic">The New Silence:</em><br />Refined Winter Minimalism
          </h1>
          <Link
            href="/products"
            className="inline-block mt-8 px-10 py-4 rounded-dm-full bg-dm-primary text-dm-on-primary font-dm-body text-xs font-bold tracking-[0.08em] uppercase hover:opacity-90 transition-opacity"
          >
            DISCOVER THE EDIT
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
            <h2 className="font-dm-display text-2xl md:text-[32px] text-dm-primary">New Arrivals</h2>
            <p className="font-dm-body text-sm md:text-base text-dm-on-surface-variant mt-1">
              Discover the latest pieces from Seoul&apos;s top designers.
            </p>
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
      <section className="bg-dm-surface-container-low max-w-[1280px] mx-auto px-4 md:px-10 py-12 md:py-20 my-4 rounded-dm-lg">
        <div className="grid md:grid-cols-12 gap-8 items-stretch">
          <div className="md:col-span-7">
            <div className="aspect-[4/3] md:aspect-auto md:h-full rounded-dm-xl overflow-hidden bg-dm-surface-container-high">
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&h=900&fit=crop&auto=format"
                alt="Designer of the month"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="md:col-span-5 flex flex-col">
            <p className="font-dm-body text-xs font-bold tracking-[0.08em] uppercase text-dm-secondary">
              DESIGNER OF THE MONTH
            </p>
            <h2 className="font-dm-display text-[28px] md:text-[32px] text-dm-primary mt-3">
              Maison De Sèoul:<br />Quiet Elegance
            </h2>
            <p className="font-dm-body text-sm md:text-base text-dm-on-surface-variant mt-4 leading-relaxed">
              Founded in the heart of Hannam-dong, Maison De Sèoul redefines contemporary luxury
              through a lens of extreme minimalism. Every stitch is intentional, every fabric is
              sourced for its sensory experience. This season explores the dialogue between rigid
              architecture and the fluid human form.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="aspect-square rounded-dm-lg overflow-hidden bg-dm-surface-container-high">
                <img
                  src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&h=600&fit=crop&auto=format"
                  alt="텍스처 디테일"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-dm-lg overflow-hidden bg-dm-surface-container-high">
                <img
                  src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=600&fit=crop&auto=format"
                  alt="텍스처 디테일"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <Link href="/products" className="inline-flex items-center gap-2 mt-6 font-dm-body text-xs font-bold tracking-[0.08em] uppercase text-dm-primary">
              EXPLORE THE COLLECTION <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. The Beauty Ritual */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-10 py-12 md:py-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-dm-display italic text-2xl md:text-[32px] text-dm-primary">The Beauty Ritual</h2>
          <div className="hidden md:flex gap-3">
            <button type="button" aria-label="이전" className="size-12 rounded-dm-full border border-dm-outline flex items-center justify-center hover:bg-dm-surface-container-low transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="size-4"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button type="button" aria-label="다음" className="size-12 rounded-dm-full border border-dm-outline flex items-center justify-center hover:bg-dm-surface-container-low transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="size-4"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </div>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {bestProducts.map((p) => (
            <Link key={p.id} href={`/products/${p.id}`} className="shrink-0 w-[260px] md:w-[320px]">
              <div className="aspect-square rounded-dm-md overflow-hidden bg-dm-surface-container">
                <ProductImage src={p.imageUrl} alt={p.name} />
              </div>
              <div className="mt-3 font-dm-ko">
                {p.category && (
                  <p className="text-[11px] font-medium text-dm-secondary uppercase tracking-wide">{p.category.name}</p>
                )}
                <p className="text-base font-bold text-dm-on-surface mt-1 line-clamp-1">{p.name}</p>
                <p className="text-base text-dm-on-surface-variant mt-0.5">{p.price.toLocaleString()}원</p>
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

      {/* 7. Join The Circle (Newsletter) */}
      <section className="bg-dm-primary py-12 md:py-20">
        <div className="max-w-[448px] mx-auto px-6 text-center">
          <h2 className="font-dm-display italic text-2xl md:text-[32px] text-dm-on-primary">
            Join The Circle
          </h2>
          <p className="font-dm-body text-sm md:text-base text-dm-on-primary/80 mt-3">
            Subscribe for early access to new drops and curated styling guides from our editorial team.
          </p>
          <form className="mt-6 flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 rounded-dm-md bg-transparent border border-white/30 px-4 py-3 text-sm text-dm-on-primary placeholder:text-white/40 focus:outline-none focus:border-dm-on-primary"
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
