// 로그인 화면 — 이메일/비밀번호를 받아 apps/web의 모바일 로그인 API(POST /api/mobile/auth/login)를
// 호출하고, 성공 시 받은 JWT 토큰을 SecureStore에 저장한 뒤 상품 목록(/products)으로 이동한다.
import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginInput } from "@/src/schemas/auth.schemas";
import { saveToken } from "@/src/lib/token";

export default function LoginScreen() {
  const router = useRouter();
  const [error, setError] = useState("");
  const { control, handleSubmit } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setError("");
    const res = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/api/mobile/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },
    );
    const json = await res.json();
    if (!res.ok) return setError(json.error ?? "로그인 실패");

    await saveToken(json.token);
    router.replace("/products");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 24, gap: 12 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>로그인</Text>
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <TextInput
            placeholder="이메일"
            value={field.value}
            onChangeText={field.onChange}
            autoCapitalize="none"
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 8,
              padding: 12,
            }}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <TextInput
            placeholder="비밀번호"
            value={field.value}
            onChangeText={field.onChange}
            secureTextEntry
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 8,
              padding: 12,
            }}
          />
        )}
      />
      {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
      <Pressable
        onPress={handleSubmit(onSubmit)}
        style={{
          backgroundColor: "#111",
          padding: 14,
          borderRadius: 8,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "600" }}>로그인</Text>
      </Pressable>
    </View>
  );
}