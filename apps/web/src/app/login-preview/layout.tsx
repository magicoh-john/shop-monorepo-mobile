/**
 * 정적 프리뷰(/login-preview) 전용 레이아웃.
 * (auth) 그룹의 실제 인증 레이아웃을 거치지 않고, Figma 디자인을 그대로 검증하기 위한 독립 라우트다.
 */
export default function LoginPreviewLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-dm-surface font-dm-body">
      {children}
    </main>
  );
}
