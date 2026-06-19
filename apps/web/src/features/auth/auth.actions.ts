"use server";

/**
 * [Server Action] 인증 관련 서버 액션
 *
 * RegisterForm(Client Component)에서 import해 직접 호출한다.
 * URL 엔드포인트 없이 서버에서 실행되며, Prisma로 DB에 직접 접근한다.
 *
 * 흐름: RegisterPage(Server) → RegisterForm(Client) → register(Server Action)
 */
import bcrypt from "bcryptjs";
import { prisma } from "@my-project/database";
import { registerSchema } from "@/schemas/auth.schema";

export async function register(formData: FormData) {
  const raw = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    name: formData.get("name") as string,
  };

  // 서버 단에서 Zod 스키마로 유효성 검사 수행
  const parsed = registerSchema.safeParse(raw);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const { email, password, name } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return { error: "이미 사용 중인 이메일입니다" };

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: { email, password: hashedPassword, name },
  });

  return { success: true };
}
