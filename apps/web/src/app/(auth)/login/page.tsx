import LoginForm from "@/features/auth/components/LoginForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="flex flex-col items-center gap-4 px-4">
      <h1 className="font-dm-display text-2xl text-dm-on-surface">로그인</h1>
      <div className="bg-dm-surface-container-lowest border border-dm-outline-variant rounded-dm-md p-6 w-full max-w-[400px] flex flex-col gap-4">
        <LoginForm error={error} />
      </div>
    </div>
  );
}
