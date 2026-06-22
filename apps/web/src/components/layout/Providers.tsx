/**
 * [Client Component] 전역 Provider 묶음
 *
 * 역할:
 *   앱 전체에서 하나만 만들어 공유해야 하는 것들(여기서는 TanStack Query의 캐시 저장소)을
 *   최상단에서 한 번 만들어서, 그 아래 모든 페이지/컴포넌트가 같은 것을 쓸 수 있게 "제공"한다.
 *
 * 누가 호출하는가:
 *   `app/layout.tsx`(루트 레이아웃, Server Component)가 `<Providers>{children}</Providers>`로
 *   감싸서 호출한다 ([layout.tsx:32]). 루트 레이아웃은 모든 페이지의 가장 바깥쪽 껍데기이므로,
 *   이 Providers도 결과적으로 모든 페이지를 감싸게 된다.
 *
 * children에는 무엇이 들어있는가:
 *   호출하는 쪽(layout.tsx)이 받은 `children` 그대로다. 즉 사용자가 지금 접속한 URL에 해당하는
 *   실제 페이지 트리 전체 — 예를 들어 홈이면 `(shop)/page.tsx`가 렌더링한 결과,
 *   상품 상세면 `products/[id]/page.tsx`가 렌더링한 결과가 children으로 들어온다.
 *   레이아웃 입장에선 "그 안에 뭐가 들어있는지는 몰라도 되고, 그냥 감싸서 화면에 꽂아주는" 역할.
 *
 * QueryClientProvider로 children을 감싸면 생기는 일:
 *   React의 Context API로 `queryClient` 인스턴스를 트리 전체에 뿌려준다.
 *   그 결과 children 안의 어떤 컴포넌트든(예: ProductGrid) import만 하면
 *   `useQuery`, `useInfiniteQuery`, `useMutation` 같은 훅을 바로 쓸 수 있고,
 *   모두 같은 캐시(같은 queryClient)를 공유하므로 같은 queryKey를 쓰는 컴포넌트끼리는
 *   서버에 새로 요청하지 않고 캐시된 결과를 재사용할 수 있다.
 *   감싸지 않으면 "QueryClient를 찾을 수 없다"는 에러가 나서 React Query 훅을 쓸 수 없다.
 */
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function Providers({ children }: { children: React.ReactNode }) {
  // new QueryClient(...)가 바로 브라우저(클라이언트)에 캐싱할 queryKey 맵을 만드는 부분이다.
  // 이 인스턴스 내부에 QueryCache(queryKey를 직렬화한 문자열을 키로 쓰는 Map)가 들어있고,
  // 이후 useQuery/useInfiniteQuery가 호출될 때마다 이 맵에서 조회·저장이 이루어진다.
  // useState로 감싸서 한 번만 생성 — 리렌더링 때마다 새 QueryClient(=새 캐시)가 만들어지는 걸 방지한다.
  // (그냥 const로 쓰면 Providers가 리렌더링될 때마다 새 빈 캐시가 생겨 기존 캐싱 결과가 날아간다)
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        retry: 1,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
