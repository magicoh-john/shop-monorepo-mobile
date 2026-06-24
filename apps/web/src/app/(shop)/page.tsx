/**
 * [Server Component] 쇼핑몰 메인 홈 페이지
 *
 * API 호출 없이 Prisma로 DB를 직접 조회한 뒤 완성된 HTML을 브라우저에 전송한다.
 * - 대카테고리 목록, 신상품(최신 8개), 베스트상품(재고 적은 순 8개)을 병렬 조회
 * - BannerSlider · ProductGrid 는 상호작용이 필요한 Client Component로 분리
 */
import Link from 'next/link';
import { prisma } from '@my-project/database';
import BannerSlider from '@/features/products/components/BannerSlider';
import ProductImage from '@/features/products/components/ProductImage';
import RecentProducts from '@/features/products/components/RecentProducts';
import ProductGrid from '@/features/products/components/ProductGrid';
import type { Product } from '@my-project/types';

/**
 * [Server Component] 상품 카드
 *
 * HomePage 안에서만 사용되는 파일-로컬 컴포넌트.
 * 외부로 export하지 않으므로 이 파일 외부에서는 호출할 수 없다.
 *
 * 호출 위치: HomePage의 신상품·베스트상품 섹션
 *   {newProducts.map((p) => <ProductCard key={p.id} product={p as any} />)}
 *   {bestProducts.map((p) => <ProductCard key={p.id} product={p as any} />)}
 *
 * 역할: 상품 한 개를 카드 형태로 렌더링하고, 클릭 시 상품 상세 페이지로 이동시킨다.
 *
 * Props:
 *   product: Product — 상품 데이터 객체 (@my-project/types의 Product 타입)
 *     - id        : 상세 페이지 링크(/products/:id) 생성에 사용
 *     - imageUrl  : 상품 이미지 URL (ProductImage 컴포넌트에 전달)
 *     - name      : 상품명
 *     - price     : 가격 (숫자, toLocaleString()으로 천 단위 포맷)
 *     - stock     : 재고 수량
 *     - category  : 카테고리 객체 (nullable — name 표시에 사용)
 */
function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="rounded-[calc(var(--radius)-2px)] border border-border overflow-hidden hover:shadow-md transition-shadow bg-background"
    >
      <div className="aspect-square overflow-hidden">
        <ProductImage src={product.imageUrl} alt={product.name} />
      </div>
      <div className="p-3">
        {product.category && (
          <p className="text-xs text-muted-foreground">{product.category.name}</p>
        )}
        <p className="text-sm text-foreground font-medium mt-0.5 line-clamp-2">{product.name}</p>
        <p className="text-sm font-bold text-foreground mt-1">{product.price.toLocaleString()}원</p>
        <p className="text-xs text-muted-foreground mt-0.5">재고 {product.stock}개</p>
      </div>
    </Link>
  );
}

/**
 * [Server Component] 쇼핑몰 메인 홈 페이지 컴포넌트
 *
 * async를 붙인 이유:
 *   서버에서 직접 DB를 조회(await prisma...)해야 하기 때문이다.
 *   Server Component는 async 함수로 선언할 수 있으며,
 *   await로 데이터를 받아온 뒤 완성된 HTML을 클라이언트에 전송한다.
 *   클라이언트에서 별도 API 요청 없이 초기 렌더링 시 데이터가 이미 포함된다.
 *
 * export default의 의미:
 *   Next.js App Router는 각 page.tsx의 default export를 해당 URL의 페이지로 인식한다.
 *   이 함수는 '/' 경로(루트)로 접속했을 때 Next.js가 자동으로 호출한다.
 *   개발자가 직접 import해서 사용하는 것이 아니라, Next.js 프레임워크가 라우팅 규칙에 따라 호출한다.
 */
export default async function HomePage() {
  // Promise.all: 세 쿼리를 순차 실행이 아닌 동시에 실행해 응답 시간을 단축한다.
  // 구조 분해로 결과를 순서대로 각 변수에 바인딩한다.
  const [categories, newProducts, bestProducts] = await Promise.all([

    // findMany(): 조건에 맞는 여러 행을 배열로 반환하는 Prisma 메서드
    // ─ 대카테고리: parentId가 null인 최상위 카테고리만 조회, sortOrder 오름차순 정렬
    prisma.category.findMany({
      where: { parentId: null },   // 최상위 카테고리만 (소카테고리 제외)
      orderBy: { sortOrder: 'asc' }, // 지정된 정렬 순서대로 표시
    }),

    // ─ 신상품: 가장 최근에 등록된 상품 8개 (createdAt 내림차순)
    prisma.product.findMany({
      take: 8,                        // 상위 8개만 가져옴 (SQL LIMIT 8)
      orderBy: { createdAt: 'desc' }, // 최신 등록순
      include: { category: true },    // category 관계 테이블을 JOIN해서 함께 조회
    }),

    // ─ 베스트상품: 재고가 적은 순 8개 (많이 팔렸을수록 재고가 적다는 가정)
    //   실제 주문 집계 데이터가 없어 재고 수량을 판매 인기의 대리 지표로 사용
    prisma.product.findMany({
      take: 8,                      // 상위 8개만
      orderBy: { stock: 'asc' },   // 재고 적은 순 (오름차순)
      include: { category: true },  // category 관계 테이블 JOIN
    }),
  ]);

  return (
    <div className="bg-muted min-h-full">

      {/* 배너 슬라이더 */}
      <section className="w-full">
        <BannerSlider />
      </section>

      {/* 퀵 카테고리 — DB 대카테고리 기반 */}
      <section className="max-w-5xl mx-auto px-6 py-6">
        <div className="bg-card rounded-[var(--radius)] border border-border px-6 py-5">
          <div className="flex items-center justify-around">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="flex flex-col items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center text-3xl">
                  {cat.emoji}
                </div>
                <span className="text-xs text-foreground text-center leading-tight">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 개인 추천상품 — 최근 본 상품 (없으면 숨김) */}
      <RecentProducts />

      {/* 신상품 */}
      <section className="max-w-5xl mx-auto px-6 pb-6">
        <div className="bg-card rounded-[var(--radius)] border border-border overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-primary to-blue-400" />
          <div className="p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-bold text-foreground">신상품</h2>
                <p className="text-xs text-muted-foreground mt-0.5">새로 들어온 상품</p>
              </div>
              <Link href="/products?sort=new" className="text-sm text-primary hover:opacity-80 font-medium">
                전체보기 →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {newProducts.map((p) => <ProductCard key={p.id} product={p as any} />)}
            </div>
          </div>
        </div>
      </section>

      {/* 베스트상품 */}
      <section className="max-w-5xl mx-auto px-6 pb-6">
        <div className="bg-card rounded-[var(--radius)] border border-border overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-destructive to-orange-400" />
          <div className="p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-bold text-foreground">베스트상품</h2>
                <p className="text-xs text-muted-foreground mt-0.5">가장 많이 팔린 상품</p>
              </div>
              <Link href="/products?sort=best" className="text-sm text-primary hover:opacity-80 font-medium">
                전체보기 →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {bestProducts.map((p) => <ProductCard key={p.id} product={p as any} />)}
            </div>
          </div>
        </div>
      </section>

      {/* 전체상품 — 무한 스크롤 */}
      <section className="max-w-5xl mx-auto px-6 pb-10">
        <div className="bg-card rounded-[var(--radius)] border border-border overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-muted-foreground to-slate-400" />
          <div className="p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-bold text-foreground">전체상품</h2>
                <p className="text-xs text-muted-foreground mt-0.5">스크롤하면 더 보입니다</p>
              </div>
              <Link href="/products" className="text-sm text-primary hover:opacity-80 font-medium">
                상품 페이지 →
              </Link>
            </div>
            <ProductGrid />
          </div>
        </div>
      </section>

    </div>
  );
}
