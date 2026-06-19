import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";

// PWA Service Worker 설정
// swSrc: 빌드 시 컴파일할 SW 소스 파일 경로
// swDest: 컴파일된 SW 출력 경로 (브라우저가 /sw.js로 접근)
// disable: 개발 환경에서는 SW를 비활성화 (Turbopack 충돌 방지)
const withSerwist = withSerwistInit({
  swSrc: "src/sw.ts",
  swDest: "public/sw.js",
  disable: process.env.NODE_ENV !== "production",
});


// Next.js 기본 설정
const nextConfig: NextConfig = {
  images: {
    // <Image> 컴포넌트는 보안상 외부 이미지를 기본 차단함
    // 허용할 도메인을 remotePatterns에 명시해야 외부 이미지 사용 가능
    // 일반 <img> 태그는 이 제한을 받지 않음
    // 예) images.unsplash.com의 이미지를 <Image src="https://images.unsplash.com/...">로
    //     사용하려면 반드시 이 목록에 등록해야 함
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
};

// withSerwist로 nextConfig를 감싸서 PWA 빌드 파이프라인에 통합
export default withSerwist(nextConfig);
