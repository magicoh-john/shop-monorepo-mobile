// [파일 역할 한줄 요약] 로그인 수단(Provider) 정의, DB 조회/비밀번호 검증, JWT 생성·세션 구성까지
// "실제 로그인 처리"를 담당하는 Node.js 전용 NextAuth 설정 파일.
//
// "라우트 보호처럼 미들웨어 단계에서 꼭 필요한 가벼운 설정"은 auth.config.ts로 분리했고,
// "DB 조회와 같은 무거운 작업이 필요한 설정(Provider, Adapter, 실제 로그인 로직)"은 auth.ts에 둔다.
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Kakao from "next-auth/providers/kakao";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { authConfig } from "@/auth.config";
import { loginSchema } from "@/schemas/auth.schema";
import { mergeGuestCart } from "@/lib/cart";
import { prisma } from "@my-project/database";

// NextAuth()가 반환하는 4가지를 그대로 다른 곳에서 가져다 쓴다.
// - handlers: /api/auth/[...nextauth] 라우트에서 GET/POST 요청을 처리하는 핸들러
//   (소셜 로그인 콜백 URL, 로그아웃 요청 등 NextAuth가 내부적으로 쓰는 엔드포인트들을 전부 처리한다)
// - auth: 서버 컴포넌트/서버 액션/API Route에서 현재 로그인한 유저의 session을 읽는 함수
// - signIn / signOut: 클라이언트나 서버 액션에서 로그인/로그아웃을 트리거하는 함수
export const { handlers, auth, signIn, signOut } = NextAuth({
  // [소셜 로그인] PrismaAdapter: 소셜 로그인 최초 시도 시 users + accounts row를 자동 생성한다.
  // 2회 이후 로그인에서는 accounts 테이블의 (provider, providerAccountId)로 기존 유저를 찾아 반환한다.
  // 이메일/비밀번호(Credentials) 로그인은 어댑터를 거치지 않는다.
  adapter: PrismaAdapter(prisma),

  // auth.config.ts에서 정의한 라우트 보호, 페이지 설정, 기본 콜백을 병합한다.
  // auth.config.ts는 Edge Runtime(미들웨어)에서도 실행되므로 Prisma import가 없다.
  ...authConfig,

  // JWT 전략: 세션을 DB가 아닌 쿠키(JWT)에 저장한다.
  // PrismaAdapter 기본값은 DB 세션이지만, Edge Runtime 호환을 위해 JWT로 유지한다.
  // 따라서 sessions 테이블은 스키마에 존재하지만 실제 데이터가 쓰이지 않는다.
  session: { strategy: "jwt" },

  providers: [
    // [소셜 로그인 - Google]
    // 로그인 흐름: Google 로그인 페이지 → 동의 → /api/auth/callback/google → PrismaAdapter
    // PrismaAdapter가 users(password=null) + accounts(provider="google") row를 자동 생성한다.
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // [소셜 로그인 - 카카오]
    // 로그인 흐름: 카카오 로그인 페이지 → 동의 → /api/auth/callback/kakao → PrismaAdapter
    // PrismaAdapter가 users(password=null) + accounts(provider="kakao") row를 자동 생성한다.
    //
    // 주의: 카카오는 개인 앱에서 이메일을 "선택 동의"로만 설정할 수 있다.
    // 사용자가 이메일 제공을 거부하면 user.email이 null이 되는데,
    // 이 프로젝트는 이메일을 고유 식별자로 사용하므로 signIn 콜백에서 차단한다.
    //
    // clientId: Kakao Developers → 앱 키 → REST API 키
    // clientSecret: Kakao Developers → 카카오 로그인 → 보안 → Client Secret
    Kakao({
      clientId: process.env.KAKAO_REST_API_KEY!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),

    // [이메일/비밀번호 로그인]
    // PrismaAdapter를 거치지 않으며, users 테이블 조회 및 bcrypt 비교를 직접 수행한다.
    Credentials({
      // authorize(): 로그인 폼에서 제출된 email/password를 직접 검증하는 함수.
      // 여기서 null을 반환하면 로그인 실패(틀린 비밀번호와 동일하게 처리), 객체를 반환하면 로그인 성공으로 간주된다.
      // 로그인 성공 시 NextAuth가 이 반환값을 user로 받아 바로 아래 jwt 콜백을 호출하고,
      // 거기서 만들어진 token을 서명(sign)해서 암호화된 JWT 쿠키로 클라이언트 응답에 심어준다.
      // 이 서명/쿠키 발급 과정 자체는 우리가 작성하는 코드가 아니라 NextAuth 라이브러리가
      // AUTH_SECRET 환경변수를 이용해 내부적으로 처리한다.
      async authorize(credentials) {
        // 1) 요청 형식 검증: email/password가 올바른 형태인지 Zod 스키마로 먼저 확인
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        // 2) DB 조회: 입력받은 email로 users 테이블에서 해당 유저를 찾는다
        const { email, password } = parsed.data;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return null;

        // 소셜 로그인으로만 가입한 유저는 password가 null이므로 로그인 차단
        if (!user.password) return null;

        // 3) 비밀번호 검증: DB에는 평문이 아닌 bcrypt 해시가 저장되어 있으므로
        //    입력받은 평문 비밀번호를 해시와 비교(bcrypt.compare)한다
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return null;

        // 4) 검증 통과: 이 객체가 jwt 콜백의 user 파라미터로 전달된다
        return { id: user.id, email: user.email, name: user.name, role: user.role };
      },
    }),
  ],

  callbacks: {
    // [소셜 로그인] signIn 콜백: PrismaAdapter가 DB에 row를 생성하기 직전에 실행된다.
    // 카카오 이메일 미동의 시 user.email이 null이므로, 어댑터가 row를 만들기 전에 여기서 차단한다.
    // Google이나 동일 이메일 충돌(OAuthAccountNotLinked)은 어댑터가 자동 처리하므로 별도 처리 불필요.
    async signIn({ user, account }) {
      if (account?.provider === "kakao" && !user.email) {
        return "/login?error=KakaoEmailRequired";
      }

      // 비로그인 상태로 담아둔 게스트 장바구니를 로그인 계정 장바구니로 병합한다.
      // Redis 오류가 로그인 자체를 막으면 안 되므로 실패를 흡수한다.
      if (user.id) {
        try {
          const cookieStore = await cookies();
          const sessionId = cookieStore.get("cart_session")?.value;
          await mergeGuestCart(sessionId, user.id);
        } catch {
          // 장바구니 병합 실패는 로그인 흐름에 영향을 주지 않는다.
        }
      }

      return true;
    },

    // jwt 콜백: 로그인 직후 1회 실행되며 token에 role을 저장한다.
    // 이후 요청에서는 token에서 role을 읽으므로 DB 조회가 발생하지 않는다.
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role ?? "user";
      }
      return token;
    },

    // session 콜백: 클라이언트가 세션을 조회할 때마다 실행된다.
    // token.sub는 PrismaAdapter가 보장하는 DB users.id다 (Credentials/소셜 로그인 모두 동일).
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
        (session.user as any).role = token.role as string;
      }
      return session;
    },
  },
});
