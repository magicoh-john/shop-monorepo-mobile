import { type DefaultSession } from "next-auth";

// [타입 전용 선언 파일] 이 파일은 런타임 코드를 포함하지 않고, NextAuth(Auth.js)가
// 제공하는 기본 타입 정의를 이 프로젝트에 맞게 "모듈 보강(module augmentation)"한다.
// declare module은 기존 라이브러리 타입을 덮어쓰는 게 아니라 인터페이스에 필드를 추가(merge)하는
// TypeScript 문법이다. 파일명이 next-auth.d.ts인 이유는 TS가 .d.ts 파일을 자동으로
// 전역 타입 선언으로 인식하기 때문이며, tsconfig의 include 범위에 포함되어 있으면 별도 import 없이
// 프로젝트 전체에 적용된다.
//
// 왜 필요한가: next-auth 라이브러리의 기본 Session.user, User, JWT 타입에는
// id, role 같은 이 프로젝트의 커스텀 필드가 정의되어 있지 않다.
// auth.config.ts의 callbacks(jwt, session)에서 token.role, session.user.id 등을
// 채워주는 로직은 있지만, 그 값을 사용하는 쪽(서버 컴포넌트, API Route 등)에서
// session.user.role / session.user.id 를 타입 에러 없이 사용하려면
// 아래처럼 인터페이스를 확장해줘야 한다. 이 파일이 없으면 TypeScript가
// "Property 'role' does not exist on type ..." 오류를 낸다.
declare module "next-auth" {
  // next-auth의 Session 인터페이스에 user.id, user.role을 추가한다.
  // useSession(), auth() 등으로 가져온 session.user 객체에 이 필드들이 존재함을 TS에 알려준다.
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"]; // 기존 name, email, image 필드는 그대로 유지
  }

  // next-auth의 User 인터페이스에 role을 추가한다.
  // authorize(credentials) 콜백이 반환하는 User 객체, adapter가 다루는 User 객체 등에 적용된다.
  interface User {
    role: string;
  }
}

// next-auth/jwt 모듈의 JWT 인터페이스를 별도로 보강해야 하는 이유:
// 세션은 매 요청마다 새로 만들어지는 게 아니라, jwt 콜백에서 token에 role을 저장해두고
// session 콜백에서 token.role을 꺼내 session.user.role로 옮겨담는 구조(JWT 전략)다.
// 즉 토큰(token) 객체와 세션(session) 객체는 서로 다른 타입이므로 각각 따로 확장이 필요하다.
declare module "next-auth/jwt" {
  interface JWT {
    // 로그인 직후에는 role이 아직 토큰에 들어가기 전일 수 있어 optional(?)로 선언한다.
    role?: string;
  }
}
