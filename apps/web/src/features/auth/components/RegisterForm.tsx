"use client";

/**
 * [Client Component] 회원가입 폼
 *
 * RegisterPage(Server Component)에서 렌더링된다.
 * React Hook Form + Zod로 클라이언트 유효성 검사 후
 * Server Action(register)을 직접 호출해 DB에 유저를 생성한다.
 *
 * 흐름: RegisterPage(Server) → RegisterForm(Client) → register(Server Action)
 */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterInput } from "@/schemas/auth.schema";
import { register } from "@/features/auth/auth.actions";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterForm() {
  const router = useRouter();
  // useForm() — Zod 스키마를 통해 입력값 검증 파이프라인 설정
  // zodResolver(registerSchema) 가 React Hook Form 과 Zod를 연결한다
  //
  // formRegister  : <input {...formRegister("email")} /> 형태로 필드를 등록 —
  //                 값 변화를 추적하고 Zod 검증 대상으로 연결
  //                 (useForm의 register와 Server Action의 register 이름 충돌로 formRegister로 별칭)
  // handleSubmit  : 폼 제출 시 Zod 검증 먼저 실행 → 통과하면 onSubmit 호출,
  //                 실패하면 errors에 오류를 채우고 onSubmit은 실행하지 않음
  // formState     : 폼 현재 상태 객체
  //   errors      : 각 필드별 Zod 검증 오류 메시지
  //   isSubmitting: 제출 진행 중 여부 — 버튼 비활성화에 사용
  const {
    register: formRegister, // Server Action 이름(register)과 충돌을 피하기 위해 별칭 사용
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) }); // Zod 스키마로 유효성 검사 연결

  const onSubmit = async (data: RegisterInput) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("name", data.name);

    const result = await register(formData);
    if (result?.error) return alert(result.error);

    alert("회원가입 완료! 로그인 페이지로 이동합니다.");
    router.push("/login"); // 회원가입 성공 시 로그인 페이지로 이동
  };

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        회원가입
      </h1>
      <div className="space-y-1">
        <Label
          htmlFor="name"
          className="text-xs font-medium text-muted-foreground"
        >
          이름
        </Label>
        <Input
          id="name"
          {...formRegister("name")}
          placeholder="홍길동"
          aria-invalid={!!errors.name}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>
      <div className="space-y-1">
        <Label
          htmlFor="email"
          className="text-xs font-medium text-muted-foreground"
        >
          이메일
        </Label>
        <Input
          id="email"
          {...formRegister("email")}
          type="email"
          placeholder="name@example.com"
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>
      <div className="space-y-1">
        <Label
          htmlFor="password"
          className="text-xs font-medium text-muted-foreground"
        >
          비밀번호
        </Label>
        <Input
          id="password"
          {...formRegister("password")}
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
        {isSubmitting ? "처리 중..." : "회원가입"}
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        이미 계정이 있으신가요?{" "}
        <Link
          href="/login"
          className="text-foreground underline underline-offset-4 hover:text-primary"
        >
          로그인
        </Link>
      </p>
    </>
  );
}
