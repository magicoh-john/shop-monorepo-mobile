// [파일 역할 한줄 요약] 미들웨어(Edge Runtime)와 서버(auth.ts)가 공유하는 라우트 보호 규칙 + 인증 설정.

import type { NextAuthConfig } from "next-auth";

// 로그인이 필요한 일반 보호 라우트. 비로그인 상태로 접근하면 /login으로 리다이렉트된다.
const protectedRoutes = ["/mypage", "/checkout", "/order"];
// role이 "admin"인 유저만 접근 가능한 라우트. 그 외 유저는 "/"로 리다이렉트된다.
const adminRoutes = ["/admin"];

// [이 파일의 역할] auth.config.ts는 "Edge Runtime에서도 안전하게 실행 가능한" NextAuth 설정만 모아둔 파일이다.
// Next.js의 미들웨어(이 프로젝트의 proxy.ts)는 Node.js가 아닌 Edge Runtime에서 동작하는데,
// Edge Runtime은 Prisma 같은 Node 전용 모듈을 import하면 빌드/런타임 에러가 난다.
// 그래서 "라우트 보호처럼 미들웨어 단계에서 꼭 필요한 가벼운 설정"을 이 파일로 분리했고,
// "DB 조회가 필요한 무거운 설정(Provider, Adapter, 실제 로그인 로직)"은 auth.ts에 둔다.
//
// 이 객체는 두 곳에서 쓰인다.
// 1) proxy.ts(미들웨어): `NextAuth(authConfig).auth` 형태로 단독 사용 — 여기서는
//    아래의 session/jwt/authorized 콜백이 그대로 "라우트 접근 허용 여부 판단"에 쓰인다.
// 2) auth.ts(서버 전체 설정): `...authConfig`로 펼쳐 넣지만, 바로 뒤에서 providers와
//    callbacks를 다시 명시적으로 정의해 덮어쓰기 때문에, 실제로는 pages 설정만 auth.ts에
//    그대로 전달되고 이 파일의 session/jwt/authorized 콜백은 auth.ts 쪽에서는 사용되지 않는다.
//    (JS 객체 스프레드는 같은 키를 다시 쓰면 나중에 쓴 값으로 완전히 교체되기 때문)
export const authConfig: NextAuthConfig = {
  // 로그인이 필요한 페이지로 이동시킬 때, 그리고 인증 에러가 발생했을 때 보여줄 페이지 경로.
  // 둘 다 /login으로 지정해, 에러도 로그인 화면에서 쿼리스트링(error=...)으로 안내한다.
  pages: { signIn: "/login", error: "/login" },
  callbacks: {
    // session 콜백: token(JWT)에 들어있는 role 값을 session.user.role로 옮겨준다.
    // 미들웨어가 `auth?.user`를 읽을 때 role까지 채워진 session.user를 받기 위해 필요하다.
    // (auth.ts에는 더 안전한 버전의 session 콜백이 따로 있고, 이건 미들웨어 전용으로만 실제 사용된다.)
    session({ session, token }) {
      if (session.user && token.role) {
        (session.user as any).role = token.role;
      }
      return session;
    },
    // jwt 콜백: 로그인 시점에 전달되는 user 객체의 role을 token에 복사해둔다.
    // 이렇게 token에 저장해두면, 매 요청마다 DB를 다시 조회하지 않고도
    // (위 session 콜백에서) token.role만 읽어서 role을 알 수 있다.
    jwt({ token, user }) {
      if (user) token.role = (user as any).role;
      return token;
    },
    // authorized 콜백: 미들웨어가 매 요청마다 호출하는 "접근 허용 여부 판단" 함수.
    // true를 반환하면 요청을 그대로 통과시키고, false를 반환하면 NextAuth가 자동으로
    // pages.signIn(/login)으로 리다이렉트한다. Response.redirect를 직접 반환하면 그 경로로 보낸다.
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const userRole = (auth?.user as any)?.role;
      const pathname = nextUrl.pathname;

      // 1) 관리자 전용 라우트(/admin) 검사: 비로그인은 차단, 로그인했지만 admin이 아니면 홈으로 리다이렉트
      const isAdminRoute = adminRoutes.some((route) =>
        pathname.startsWith(route),
      );
      if (isAdminRoute) {
        if (!isLoggedIn) return false;
        if (userRole !== "admin")
          return Response.redirect(new URL("/", nextUrl));
        return true;
      }

      // 2) 로그인 필요 라우트(/mypage, /checkout, /order) 검사: 비로그인이면 차단
      const isProtectedRoute = protectedRoutes.some((route) =>
        pathname.startsWith(route),
      );
      if (isProtectedRoute && !isLoggedIn) return false;

      // 3) 위 두 경우에 해당하지 않는 나머지 모든 라우트는 비로그인 상태에서도 접근 허용
      return true;
    },
  },
  // 여기서는 빈 배열만 둔다. 실제 Provider(Google, Kakao, Credentials)는
  // Prisma/bcrypt 등 Node 전용 모듈을 사용하므로 Edge 호환 파일인 이 곳에는 둘 수 없고,
  // auth.ts에서 정의 후 providers 키를 다시 덮어써서 사용한다.
  providers: [],
};
