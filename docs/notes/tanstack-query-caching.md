# 쇼핑몰에서 TanStack Query 캐싱이 일어나는 곳

## 1. 루트 레이아웃이 모든 페이지 트리를 Providers로 감싼다

`apps/web/src/app/layout.tsx`

Next.js App Router는 현재 접속한 URL에 해당하는 페이지 트리 전체를 `children`이라는 하나의 "상자"로 묶어 `RootLayout`에 넘겨준다. `RootLayout`은 그 상자를 열어보지 않고 그대로 `Providers`에게 건네준다.

```tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

- `(shop)`, `(auth)`, `(protected)`, `admin` 등 모든 라우트 그룹이 이 레이아웃을 공통으로 거쳐가므로, 앱의 모든 화면이 예외 없이 `Providers`에 감싸인다.

---

## 2. Providers가 마운트될 때 QueryClient 인스턴스를 한 번 생성해 전체에 공급한다

`apps/web/src/components/layout/Providers.tsx`

```tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 60초 동안은 캐시를 fresh하다고 간주 (기본값 0)
        retry: 1,             // 실패 시 재시도 1회 (기본값 3)
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
```

- `new QueryClient({...})`로 만들어지는 객체가 **queryKey → 캐시 데이터 매핑(QueryCache)** 을 관리하는 실제 캐시 저장소다.
- `useState(() => new QueryClient(...))`로 감싸 **컴포넌트 생명주기 동안 단 한 번만** 생성한다. 그냥 `const`로 쓰면 리렌더링마다 새 빈 캐시가 만들어져 기존 캐싱이 날아간다.
- `QueryClientProvider`가 이 인스턴스를 **React Context**로 트리 전체에 뿌려서, 그 안의 모든 컴포넌트가 `useQuery`/`useInfiniteQuery`를 props 없이도 바로 쓸 수 있게 한다.
- `defaultOptions`는 "캐싱을 켜는" 옵션이 아니라 **기준값**을 바꾸는 옵션이다. 캐싱·재조회 자체는 TanStack Query의 기본 동작이며, `refetchOnMount`/`refetchOnWindowFocus`/`refetchOnReconnect` 등은 설정하지 않았으므로 라이브러리 기본값(모두 `true`)이 그대로 적용된다.

---

## 3. ProductGrid는 마운트 시점에 캐시를 사용하고, 스크롤은 다음 페이지만 추가로 요청한다

`apps/web/src/features/products/components/ProductGrid.tsx`

```tsx
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
```

**자주 헷갈리는 부분 — `useInfiniteQuery()`는 스크롤로 호출되는 함수가 아니다.**

| 시점 | 일어나는 일 |
|---|---|
| `ProductGrid` 마운트 즉시 | `useInfiniteQuery`가 실행 → `queryKey`(`['products', 'infinite', { categorySlug }]`)로 캐시 확인 → 있고 60초 이내면 캐시 그대로 사용, 없거나 stale이면 `queryFn` 실행해 첫 페이지를 가져와 캐싱 |
| 스크롤로 하단 트리거 div 노출 | `useInView`가 `inView=true` 감지 → `fetchNextPage()` 호출(이미 존재하던 useInfiniteQuery가 반환한 함수) → 다음 페이지를 같은 캐시 엔트리(`data.pages`)에 누적 |

또한 `queryFn`은 DB를 직접 조회하지 않는다. `fetch('/api/products?...')`로 **Next.js API Route**(`apps/web/src/app/api/products/route.ts`)를 호출하고, 그 API Route가 서버에서 **Prisma**로 DB를 조회한 뒤 JSON을 응답한다.

```
클라이언트 캐시 확인 → (캐시 없음/stale) → fetch('/api/products') → API Route가 Prisma로 DB 조회 → 응답을 캐시에 저장
```

---

## 전체 흐름 요약

```
layout.tsx
  └─ <Providers>{children}</Providers>          ← 페이지 트리 전체를 한 번에 전달
       └─ new QueryClient() (마운트 시 1회 생성)   ← queryKey 캐시 맵 생성
            └─ <QueryClientProvider client={queryClient}>
                 └─ ProductGrid (마운트 즉시 useInfiniteQuery 실행)
                      ├─ 캐시 있음(60초 이내) → 캐시 데이터 사용
                      └─ 캐시 없음/stale → /api/products 호출 → Prisma DB 조회 → 캐시 저장
                           └─ 스크롤 시 fetchNextPage()로 다음 페이지만 추가 누적
```
