"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginInput } from "@/schemas/auth.schema";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ERROR_MESSAGES: Record<string, string> = {
  OAuthAccountNotLinked: "이미 이메일로 가입된 계정입니다. 이메일로 로그인해주세요.",
  KakaoEmailRequired: "카카오 로그인 시 이메일 제공에 동의해주세요.",
};

interface LoginFormProps {
  error?: string;
}

export default function LoginForm({ error }: LoginFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    const result = await signIn("credentials", { ...data, redirect: false });
    if (result?.error)
      return alert("로그인 실패: 이메일 또는 비밀번호를 확인해주세요.");

    router.push("/");
    router.refresh();
  };

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        로그인
      </h1>

      {error && ERROR_MESSAGES[error] && (
        <p className="text-sm text-destructive bg-destructive/10 rounded-[calc(var(--radius)-2px)] px-3 py-2">
          {ERROR_MESSAGES[error]}
        </p>
      )}

      <div className="space-y-1">
        <Label htmlFor="email" className="text-xs font-medium text-muted-foreground">
          이메일
        </Label>
        <Input
          id="email"
          {...register("email")}
          type="email"
          placeholder="name@example.com"
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="password" className="text-xs font-medium text-muted-foreground">
          비밀번호
        </Label>
        <Input
          id="password"
          {...register("password")}
          type="password"
          placeholder="••••••"
          aria-invalid={!!errors.password}
        />
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        )}
      </div>

      <Button
        className="w-full"
        onClick={handleSubmit(onSubmit)}
        disabled={isSubmitting}
      >
        {isSubmitting ? "로그인 중..." : "로그인"}
      </Button>

      <div className="flex items-center gap-3">
        <div className="flex-1 border-t border-border" />
        <span className="text-xs text-muted-foreground">또는</span>
        <div className="flex-1 border-t border-border" />
      </div>

      <button
        type="button"
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="w-full flex items-center justify-center gap-2 rounded-[calc(var(--radius)-2px)] border border-border bg-background hover:bg-accent hover:text-accent-foreground py-2 px-4 text-sm font-medium transition-colors"
      >
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
        Google로 로그인
      </button>

      <button
        type="button"
        onClick={() => signIn("kakao", { callbackUrl: "/" })}
        className="w-full flex items-center justify-center gap-2 rounded-[calc(var(--radius)-2px)] py-2 px-4 text-sm font-medium transition-colors bg-[#FEE500] hover:bg-[#e6cf00] text-black/85"
      >
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3C6.477 3 2 6.477 2 10.5c0 2.525 1.518 4.749 3.818 6.098l-.964 3.576c-.088.327.283.594.572.411L9.668 18.4A11.3 11.3 0 0 0 12 18.6c5.523 0 10-3.477 10-8.1S17.523 3 12 3z" />
        </svg>
        카카오로 로그인
      </button>

      <p className="text-center text-sm text-muted-foreground">
        계정이 없으신가요?{" "}
        <Link href="/register" className="text-foreground underline underline-offset-4 hover:text-primary">
          회원가입
        </Link>
      </p>
    </>
  );
}
