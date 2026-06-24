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
  // new QueryClient({...}) 호출로 만들어지는 이 객체가 queryKey map과
  // 서버 쿼리 결과를 저장할 캐시 공간을 관리하는 객체다.
  //
  // 이 queryClient 객체 하나가:
  //   - queryKey → 캐시된 데이터를 매핑하는 저장소(QueryCache) 관리
  //   - staleTime, retry 같은 기본 옵션 보관
  //   - (mutation 쓸 경우) MutationCache도 함께 관리
  // 를 모두 담당하고, QueryClientProvider가 이 객체를 React Context로 트리 전체에
  // 뿌려서 useQuery/useInfiniteQuery 훅들이 같은 캐시 공간을 공유해서 읽고 쓰게 된다.
  //
  // useState로 감싸서 한 번만 생성 — 리렌더링 때마다 새 QueryClient(=새 캐시)가 만들어지는 걸 방지한다.
  // (그냥 const로 쓰면 Providers가 리렌더링될 때마다 새 빈 캐시가 생겨 기존 캐싱 결과가 날아간다)
  const [queryClient] = useState(() => new QueryClient({
    // defaultOptions는 "캐싱/재조회를 켜는" 옵션이 아니다 — 캐싱과 재조회는
    // defaultOptions 없이도 TanStack Query의 기본 동작으로 항상 일어난다.
    // 여기서 바꾸는 건 그 동작의 세부 기준값뿐이다.
    //
    //   staleTime: 60 * 1000  → 캐시가 "fresh"하다고 간주되는 시간.
    //     기본값은 0(즉시 stale)인데 60초로 늘려서, 60초 동안은 재요청 없이 캐시를 그대로 쓴다.
    //   retry: 1              → 쿼리 실패 시 재시도 횟수. 기본값 3에서 1로 줄임.
    //
    // refetchOnMount / refetchOnWindowFocus / refetchOnReconnect처럼 "언제 재조회를
    // 시도하느냐"를 결정하는 옵션은 여기서 설정하지 않았으므로 라이브러리 기본값(모두 true)
    // 그대로다. 즉 마운트/창 포커스 복귀/재연결 시 재조회를 "시도"는 하지만, staleTime
    // 60초 이내라면 fresh하다고 판단해 실제 네트워크 요청 없이 캐시를 그대로 사용한다.
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
