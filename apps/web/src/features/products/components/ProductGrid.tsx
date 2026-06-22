/**
 * [Client Component] 무한 스크롤 상품 그리드
 *
 * 쇼핑몰 메인페이지에서의 역할:
 *   홈 화면 맨 아래 "전체상품" 섹션을 담당한다 (`(shop)/page.tsx`의 ProductGrid 호출 위치).
 *   신상품·베스트상품처럼 서버에서 8개만 미리 박아넣는 정적 섹션과 달리,
 *   이 컴포넌트는 사용자가 스크롤할 때마다 `/api/products`를 호출해
 *   상품을 계속 추가로 불러오는 유일한 "동적" 섹션이다.
 *   카테고리 페이지(`/categories/[slug]`)나 검색 페이지에서도 categorySlug/keyword를 바꿔
 *   재사용된다.
 */
'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import Link from 'next/link';
import { queryKeys } from '@/lib/queryKeys';
import ProductImage from './ProductImage';

/**
 * Props (이 컴포넌트를 부를 때 넘길 수 있는 값들의 "타입 명세서")
 *
 * 타입스크립트 관점:
 *   `interface Props { ... }`는 "ProductGrid를 사용할 때 전달 가능한 값의 모양"을 정의한다.
 *   `?:`(물음표)가 붙은 필드는 "선택(optional) 속성" — 안 넘겨도 컴파일 에러가 나지 않는다.
 *   안 넘기면 자바스크립트에서는 그냥 `undefined`가 된다.
 *
 *   categorySlug?: string  → 카테고리 페이지에서만 넘김 (예: "fashion"). 메인페이지처럼
 *                            카테고리 구분 없이 "전체상품"을 보여줄 땐 넘기지 않는다.
 *   keyword?: string       → 검색 페이지에서만 넘김 (예: "셔츠"). 검색이 아니면 넘기지 않는다.
 */
interface Props {
  categorySlug?: string;
  keyword?: string;
}

/**
 * ProductGrid 컴포넌트
 *
 * 역할:
 *   1) `useInfiniteQuery`로 상품을 페이지 단위(cursor 기반)로 가져와 누적 렌더링한다.
 *   2) `useInView`로 화면 하단 트리거 div의 노출을 감지해 다음 페이지를 자동 요청한다.
 *
 * Props를 전달받는 방식 (타입스크립트 관점):
 *   함수 시그니처 `({ categorySlug, keyword }: Props)`는 두 단계가 합쳐진 것이다.
 *   ① `: Props` — "이 함수의 첫 번째 매개변수는 Props 타입의 객체여야 한다"고 타입을 고정한다.
 *      즉 `<ProductGrid foo="bar" />`처럼 Props에 없는 속성을 넘기면 타입 에러가 난다.
 *   ② `{ categorySlug, keyword }` — 구조 분해 할당(destructuring). 부모 컴포넌트가
 *      `<ProductGrid categorySlug="fashion" />`처럼 JSX 속성으로 넘긴 객체
 *      `{ categorySlug: "fashion", keyword: undefined }`를 받아서, 그 안의
 *      `categorySlug`, `keyword` 값을 바로 변수로 꺼내 쓰는 문법이다.
 *      풀어서 쓰면 `function ProductGrid(props: Props) { const categorySlug = props.categorySlug; ... }`와 동일하다.
 */
export default function ProductGrid({ categorySlug, keyword }: Props) {
  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: queryKeys.products.infinite({ categorySlug }),
      queryFn: async ({ pageParam }) => {
        const params = new URLSearchParams();
        if (categorySlug) params.set('category', categorySlug);
        if (keyword) params.set('keyword', keyword);
        if (pageParam) params.set('cursor', pageParam as string);
        const res = await fetch(`/api/products?${params}`);
        return res.json();
      },
      initialPageParam: null,
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    });

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  const products = data?.pages.flatMap((page) => page.items) ?? [];

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-[calc(var(--radius)-2px)] border border-border overflow-hidden animate-pulse">
            <div className="aspect-square bg-muted" />
            <div className="p-3 space-y-2">
              <div className="h-3 bg-muted rounded w-1/2" />
              <div className="h-4 bg-muted rounded" />
              <div className="h-4 bg-muted rounded w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-muted-foreground">상품이 없습니다.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="rounded-[calc(var(--radius)-2px)] border border-border overflow-hidden hover:shadow-md transition-shadow bg-card"
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
        ))}
      </div>

      {/* 무한 스크롤 트리거 */}
      <div ref={ref} className="h-10 flex items-center justify-center mt-4">
        {isFetchingNextPage && (
          <p className="text-sm text-muted-foreground">불러오는 중...</p>
        )}
        {!hasNextPage && products.length > 0 && (
          <p className="text-sm text-muted-foreground">모든 상품을 불러왔습니다.</p>
        )}
      </div>
    </>
  );
}
