// [파일 역할 한줄 요약] 모든 페이지 요청이 서버에 도달하기 전, 쿠키의 JWT를 읽어
// 라우트 접근을 허용/차단/리다이렉트하는 Next.js 미들웨어. (Edge Runtime에서 실행됨)
//
// 이 파일은 Prisma 등 Node 전용 모듈을 쓰지 않는 authConfig만 사용한다.
// auth.ts(Provider, Adapter 포함)를 그대로 가져오면 Edge Runtime에서 빌드/실행 에러가 나기 때문에,
// 미들웨어 전용으로 가벼운 설정(authConfig)만 따로 NextAuth에 넘겨 사용한다.
import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

// NextAuth(authConfig)는 매번 새로운 NextAuth 인스턴스를 만든다(auth.ts의 인스턴스와는 별개).
// 그중 .auth만 꺼내서 Next.js 미들웨어 함수로 그대로 export한다.
// 요청이 오면 이 함수가 쿠키의 JWT를 복호화 → authConfig.callbacks.session으로 session 구성
// → authConfig.callbacks.authorized로 통과/차단/리다이렉트 여부를 결정하는 순서로 동작한다.
export default NextAuth(authConfig).auth;

// 이 미들웨어를 적용할 경로 패턴.
// /api, /_next/static, /_next/image, /favicon.ico는 제외하고 나머지 모든 경로에 적용한다.
// (API 라우트나 정적 파일까지 매번 인증 체크를 거치면 불필요한 오버헤드가 생기기 때문)
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
