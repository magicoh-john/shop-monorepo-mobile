/**
 * [Server Component] 회원가입 페이지
 *
 * 레이아웃 역할만 담당하며, 실제 폼 UI와 제출 로직은
 * Client Component인 RegisterForm에 위임한다.
 *
 * 흐름: RegisterPage(Server) → RegisterForm(Client) → register(Server Action)
 */
import RegisterForm from "@/features/auth/components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="bg-card text-card-foreground rounded-[var(--radius)] border border-border shadow-sm p-6 w-full max-w-sm space-y-4">
      <RegisterForm />
    </div>
  );
}
