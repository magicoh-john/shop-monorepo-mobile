/**
 * [Server Component] 로그인 화면 — 정적 프리뷰
 *
 * 목적: 실제 인증 로직(LoginForm.tsx의 Server Action, react-hook-form, NextAuth)을 건드리지 않고,
 * 디자인 헌법(DESIGN.md)과 Figma 디자인(node-id 43:4)만 반영한 정적 화면을 먼저 완성해 검증하기 위한
 * 별도 라우트다. 시각 검증 통과 후 LoginForm.tsx에 동일한 마크업/토큰을 통합한다.
 */
const imgGoogle = 'https://www.figma.com/api/mcp/asset/c7ab5751-6d4b-43c6-8671-ec3abd24e1e0';
const imgKakao = 'https://www.figma.com/api/mcp/asset/3f77cd25-aec9-49c2-8285-a1b9a2011e31';

export default function LoginPreviewPage() {
  return (
    <div className="flex flex-col items-center gap-4 px-4">
      <h1 className="font-dm-display text-2xl text-dm-on-surface">로그인</h1>

      <div className="bg-dm-surface-container-lowest border border-dm-outline-variant rounded-dm-md p-6 w-full max-w-[400px] flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="font-dm-ko text-[11px] font-medium text-dm-on-surface-variant">이메일</label>
          <div className="bg-dm-surface-container-low rounded-dm-md p-3">
            <p className="font-dm-body text-sm text-dm-on-surface-variant">name@example.com</p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-dm-ko text-[11px] font-medium text-dm-on-surface-variant">비밀번호</label>
          <div className="bg-dm-surface-container-low rounded-dm-md p-3">
            <p className="font-dm-body text-sm text-dm-on-surface-variant">••••••</p>
          </div>
        </div>

        <button
          type="button"
          className="w-full bg-dm-primary text-dm-on-primary rounded-dm-md px-6 py-3 font-dm-body text-xs font-bold tracking-[0.08em]"
        >
          로그인
        </button>

        <div className="flex items-center justify-center gap-6">
          <div className="flex items-center gap-2 rounded-dm-md px-6 py-3">
            <img src={imgGoogle} alt="" className="size-4" />
            <span className="font-dm-body text-xs font-bold tracking-[0.08em] text-dm-on-surface">Google</span>
          </div>
          <div className="flex items-center gap-2 rounded-dm-md px-6 py-3">
            <img src={imgKakao} alt="" className="size-4" />
            <span className="font-dm-body text-xs font-bold tracking-[0.08em] text-dm-on-surface">카카오</span>
          </div>
        </div>

        <p className="font-dm-ko text-center text-sm text-dm-on-surface">
          계정이 없으신가요? <span className="underline underline-offset-4">회원가입</span>
        </p>
      </div>
    </div>
  );
}
