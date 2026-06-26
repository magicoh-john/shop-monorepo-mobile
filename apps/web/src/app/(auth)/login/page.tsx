import LoginForm from "@/features/auth/components/LoginForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="bg-card text-card-foreground rounded-[var(--radius)] border border-border shadow-sm p-6 w-full max-w-sm space-y-4">
      <LoginForm error={error} />
    </div>
  );
}
