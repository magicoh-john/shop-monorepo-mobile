> 📖 이 문서는 GUIDE.md를 3개로 나눈 시리즈 중 **2/3**입니다. ← 이전: [01-setup-backend.md](01-setup-backend.md) | 다음: [03-test-wrapup.md](03-test-wrapup.md)

## 4. STEP 3 — 타입/스키마 연결

`apps/mobile`은 이제 같은 워크스페이스 멤버이므로, `packages/types`를 **손으로 복사하지 않고
워크스페이스 의존성으로 직접 import**한다.

> **왜 같은 워크스페이스인가**: 워크스페이스란 한 저장소(`shop-monorepo-mobile`) 안에 `apps/web`,
> `apps/mobile`, `packages/types`처럼 **여러 개의 독립된 프로젝트를 같이 묶어서 관리하는 단위**다.
> 루트의 `pnpm-workspace.yaml`에 `apps/*`, `packages/*` 패턴이 등록돼 있어서, 이 패턴에 맞는
> 폴더는 전부 자동으로 같은 워크스페이스의 멤버가 된다. `apps/mobile`도 `apps/*`에 해당하므로
> 별도 설정 없이 `packages/types`와 같은 한 가족이 된 것이다. 같은 워크스페이스 멤버끼리는
> npm 레지스트리에 올리지 않고도 서로의 코드를 패키지처럼 가져다 쓸 수 있는데, 그게 바로
> `pnpm add @my-project/types --filter mobile`이 하는 일이다 — "복사"가 아니라 "같은 가족의
> 코드를 직접 연결"하는 것이다.

> **`@my-project/types`라는 이름은 어디서 오는가**: `packages/types/package.json`의
> `"name": "@my-project/types"` 값 그대로다. 다른 워크스페이스(`apps/web`, `apps/mobile`)에서
> `packages/types` 안의 모듈을 가져다 쓰려면, 실제 파일 경로(`src/product.ts`, `src/cart.ts`
> 등)를 신경 쓸 필요 없이 **이 `name` 값을 패키지명으로 그대로 import**하면 된다.
>
> ```ts
> import { Product, CartItem } from "@my-project/types";
> ```
>
> 이게 가능한 이유는 `packages/types/package.json`이 진입점을 명시적으로 지정해두기
> 때문이다:
>
> ```json
> {
>   "name": "@my-project/types",
>   "main": "./src/index.ts",
>   "types": "./src/index.ts"
> }
> ```
>
> `main`은 실제 코드(런타임)가 시작되는 파일, `types`는 TypeScript가 타입 정보를 가져올
> 파일을 가리킨다(둘 다 같은 `src/index.ts`를 가리키고 있다). 즉 "폴더 바로 아래에 있는
> `index.ts`를 자동으로 찾는" 게 아니라, `package.json`에 적힌 경로를 따라가는 것이다.
> 사용하는 쪽은 이 경로를 몰라도 되고, 항상 `@my-project/types`라는 패키지명 하나로만
> import하면 된다.

`apps/mobile`이 `@my-project/types`를 의존성으로 갖도록 추가한다. 방법은 두 가지다 — 결과는
동일하니 편한 쪽을 쓴다.

**방법 1 — 명령어로 추가**

```bash
# 📍 위치: C:\project\shop-monorepo-mobile (루트)
pnpm add @my-project/types@workspace:* --filter mobile
```

> ⚠️ **`@workspace:*` 버전 표시를 반드시 붙인다.** 버전을 빼고 `pnpm add @my-project/types`로만
> 실행하면 pnpm이 "이건 npm 레지스트리(인터넷)에 있는 패키지겠지"라고 판단해 그곳에서 찾다가
> 아래처럼 404 에러가 난다.
> ```
> ERR_PNPM_FETCH_404  GET https://registry.npmjs.org/@my-project%2Ftypes: Not Found - 404
> @my-project/types is not in the npm registry, or you have no permission to fetch it.
> ```
> `@my-project/types`는 인터넷이 아니라 이 프로젝트 안에만 있는 워크스페이스 패키지이므로,
> 버전 자리에 `workspace:*`를 붙여 "같은 워크스페이스 안의 그 패키지를 그대로 가져와"라고
> 명시해야 한다.

**방법 2 — `apps/mobile/package.json`에 직접 추가**

`dependencies`에 아래 줄을 손으로 추가한다(`apps/web/package.json`이 이미 같은 방식으로
`@my-project/types`를 쓰고 있다):

```json
"@my-project/types": "workspace:*"
```

추가한 뒤에는 루트에서 한 번 더 설치를 돌려 실제로 연결한다.

```bash
# 📍 위치: C:\project\shop-monorepo-mobile (루트)
pnpm install
```

> **`pnpm install`을 실행하면 일어나는 일**:
> 1. **심볼릭 링크 생성**: `apps/mobile/node_modules/@my-project/types`가 만들어지는데,
>    실제 파일이 아니라 루트의 `packages/types` 폴더를 가리키는 **링크**다(STEP 1에서 확인한
>    pnpm 호이스팅 구조와 동일).
> 2. **`pnpm-lock.yaml` 갱신**: `apps/mobile`이 이 워크스페이스 패키지에 의존한다는 내용이
>    루트 lockfile에 기록된다.
> 3. 이제 `apps/mobile`의 코드에서 `import { Product } from "@my-project/types";`처럼
>    바로 가져다 쓸 수 있게 된다.

> ⚠️ **`@my-project/database`는 추가하지 않는다.** Prisma 클라이언트는 Node.js 서버
> (`apps/web`)에서만 의미가 있다. Expo 앱(스마트폰에서 실행되는 React Native)은 DB에 직접
> 접속할 수 없고 반드시 `apps/web`의 API를 거쳐야 하므로, `apps/mobile`에 `@my-project/database`를
> 추가해도 쓸 일이 없고 오히려 불필요한 의존성(또는 Metro 번들링 에러 원인)이 될 수 있다.

`packages/types`에는 이미 `Product`, `Category`, `CartItem` 등이 정의되어 있다. 이후 화면에서는

```ts
import { Product, CartItem } from "@my-project/types";
```

처럼 바로 가져다 쓴다. `apps/web/src/types/...` 같은 복사본을 새로 만들지 않는다. (지금 당장
실행하는 코드는 아니다 — STEP 5~6에서 화면을 만들 때 이 import를 실제로 쓰게 된다.)

> **이런 import를 쓴 화면을 실행했을 때 Metro 모듈 해석 에러가 나면**: 우리가 짜는 코드는
> 파일이 여러 개로 나뉘어 있고 서로 `import`로 연결돼 있다. 그런데 스마트폰(또는 브라우저)은
> 그 여러 파일을 하나씩 따로 받는 게 아니라, **누군가가 그 파일들을 전부 추적해서 한 덩어리로
> 합쳐준 결과물**을 받아서 실행한다. 이 "여러 파일을 추적해서 하나로 합쳐주는 도구"를
> **번들러**라고 부른다. **Metro**가 Expo/RN 프로젝트에서 그 역할을 하는 번들러다(웹
> 프로젝트의 Webpack/Turbopack과 같은 역할을 RN 쪽에서 담당하는 도구). 번들러가 파일을
> 합치다가 `import`로 연결된 어떤 모듈을 찾지 못하면 바로 이런 "Unable to resolve module"
> 에러를 낸다. 위처럼
> `@my-project/types`를 import한 화면 코드를 만든 뒤 `pnpm --filter mobile start`로
> 실행했을 때, Metro가 기본적으로 `apps/mobile` 폴더 밖(워크스페이스 루트의 `packages/`)을
> 보지 못해서 `Unable to resolve module @my-project/types` 같은 에러를 낼 수 있다. 이때는
> `apps/mobile/metro.config.js`를 다음과 같이 구성한다(파일이 없으면 새로 만든다).
>
> ```js
> const { getDefaultConfig } = require("expo/metro-config");
> const path = require("path");
>
> const projectRoot = __dirname;
> const workspaceRoot = path.resolve(projectRoot, "../..");
>
> const config = getDefaultConfig(projectRoot);
>
> config.watchFolders = [workspaceRoot];
> config.resolver.nodeModulesPaths = [
>   path.resolve(projectRoot, "node_modules"),
>   path.resolve(workspaceRoot, "node_modules"),
> ];
>
> module.exports = config;
> ```

**정리하면**: 이번 STEP 제목이 "타입/스키마 연결"인 이유가 여기 있다 — **타입**(`Product`,
`CartItem`)은 `packages/types`라는 공유 패키지에 있어서 워크스페이스 import로 그대로 가져다
쓰고, **스키마**(`loginSchema`)는 사정이 다르다. `loginSchema`는 공유 패키지가 아니라
`apps/web/src/schemas/auth.schema.ts`에 있는 **웹 전용 파일**이라 워크스페이스로 공유되지
않는다. 이번 튜토리얼 범위에서는 이 파일만 예외적으로 그대로 복사한다(웹 전용 파일을 공유
패키지로 옮기는 작업은 범위 밖이라 다루지 않는다).

```bash
# 📍 위치: C:\project\shop-monorepo-mobile (루트)
pnpm add zod@^4.4.3 --filter mobile
```

📍 신규 파일: `C:\project\shop-monorepo-mobile\apps\mobile\src\schemas\auth.schema.ts`

```ts
// apps/web/src/schemas/auth.schema.ts 에서 그대로 복사
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("올바른 이메일 형식이 아닙니다"),
  password: z.string().min(6, "비밀번호는 6자 이상이어야 합니다"),
});

export type LoginInput = z.infer<typeof loginSchema>;
```

---

## 5. STEP 4 — 로그인 화면

### 5-1. 패키지 설치

```bash
# 📍 위치: C:\project\shop-monorepo-mobile\apps\mobile
npx expo install expo-secure-store
```

> **`expo-secure-store`는 어떤 라이브러리인가**: 스마트폰의 **안전한 저장소**(iOS의
> Keychain, Android의 Keystore)에 데이터를 암호화해서 저장하는 라이브러리다. 이번
> 튜토리얼에서는 로그인 성공 시 받는 **JWT 토큰을 저장**하는 데 쓴다 — 일반 `AsyncStorage`는
> 평문으로 저장되어 기기가 루팅/탈옥되어 있으면 다른 앱이 들여다볼 수 있지만, `SecureStore`는
> OS가 제공하는 암호화 저장소를 쓰기 때문에 토큰처럼 민감한 값을 저장할 때 더 안전하다.
> 웹의 `localStorage`/쿠키 자리에 RN에서는 이게 들어간다고 보면 되는데, OS 레벨 암호화까지
> 같이 제공한다는 점이 다르다.

```bash
# 📍 위치: C:\project\shop-monorepo-mobile (루트)
pnpm add react-hook-form@^7.76.1 @hookform/resolvers@^5.4.0 --filter mobile
```

> `expo-secure-store`는 Expo가 관리하는 패키지라 `npx expo install`로 설치해야 SDK와 호환되는
> 버전이 자동으로 맞춰진다 (`pnpm add`로 직접 설치하면 버전이 어긋날 수 있다). 이 명령은
> `apps/mobile` 안에서 실행해야 한다 — 루트에서 `--filter`로 실행하면 Expo CLI가 워크스페이스
> 루트를 자기 프로젝트로 오인할 수 있다.

### 5-2. API 베이스 URL 환경변수

📍 신규 파일: `C:\project\shop-monorepo-mobile\apps\mobile\.env`

```
EXPO_PUBLIC_API_URL=http://192.168.0.12:3000
```

> `192.168.0.12`는 예시다. 1단계에서 확인한 본인 PC의 실제 LAN IP로 바꿔야 한다.
> `localhost`로 적으면 스마트폰에서 PC에 접근할 수 없어 동작하지 않는다.

### 5-3. 토큰 저장 유틸

📍 신규 파일: `C:\project\shop-monorepo-mobile\apps\mobile\src\lib\token.ts`

```ts
import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "auth_token";

export const saveToken = (token: string) =>
  SecureStore.setItemAsync(TOKEN_KEY, token);
export const getToken = () => SecureStore.getItemAsync(TOKEN_KEY);
export const clearToken = () => SecureStore.deleteItemAsync(TOKEN_KEY);
```
 
### 5-4. 로그인 화면

**0) 기본 템플릿의 `(tabs)` 화면을 먼저 정리한다**

`app/(tabs)/index.tsx`와 새로 만들 `app/index.tsx`는 둘 다 결국 같은 경로(`"/"`)를 가리킨다 —
`(tabs)`처럼 괄호로 된 폴더명은 **URL 경로에 영향을 주지 않는 그룹**일 뿐이기 때문이다. 두
파일이 같은 경로를 두고 충돌하면 Expo Router가 `(tabs)` 그룹(기본 "Welcome!" 화면)을 계속
보여주고, 새로 만든 로그인 화면은 보이지 않는다. 그래서 `app/(tabs)` 폴더 전체를 먼저 지운다.

```cmd
rmdir /s /q "C:\project\shop-monorepo-mobile\apps\mobile\app\(tabs)"
```

폴더를 지운 뒤에는 `app/_layout.tsx`에 남아있는 `(tabs)` 참조 두 곳도 정리해야 한다(지운
폴더를 계속 가리키고 있어서 에러가 날 수 있다).

`app/modal.tsx`도 같이 지운다 — 기본 템플릿이 보여주기용으로 넣어둔 데모 화면일 뿐, 이번
쇼핑몰 튜토리얼(로그인 → 상품 목록/상세 → 장바구니)에는 모달이 필요한 화면이 없다.

```cmd
rmdir /s /q "C:\project\shop-monorepo-mobile\apps\mobile\app\(tabs)"
del "C:\project\shop-monorepo-mobile\apps\mobile\app\modal.tsx"
```

> **`app/_layout.tsx`는 왜 중요한가**: 이 파일은 Expo Router의 **루트 레이아웃**으로, 모든
> 화면을 감싸는 공통 틀(`<Stack>` 네비게이터)과 테마(`ThemeProvider`), 상태바 스타일을
> 담당한다. 이 파일이 없어도 Expo Router가 아무 설정 없는 기본 `Stack`을 자동으로 만들어주기
> 때문에 앱이 아예 안 뜨는 건 아니지만, 다크모드 테마 같은 설정이 사라진다. 즉 **파일 자체를
> 지우는 게 아니라, 안에 남은 `(tabs)`/`modal` 참조만 정리**하면 된다.

`app/_layout.tsx`에서 다음 세 곳을 지운다:

```diff
- export const unstable_settings = {
-   anchor: '(tabs)',
- };
```

```diff
- <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
- <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
+ {/* (tabs), modal 둘 다 지웠으므로 화면 옵션을 따로 줄 라우트가 없다 — 빈 <Stack />이면 된다 */}
```

수정 후 `<Stack>...</Stack>`은 자식 없는 `<Stack />`이 된다.

📍 수정 파일: `C:\project\shop-monorepo-mobile\apps\mobile\app\index.tsx` (기본 템플릿 화면을 교체)

```tsx
import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginInput } from "@/src/schemas/auth.schema";
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
```

### 동작 확인

1. 탭 1(web)·탭 2(mobile) 두 서버가 모두 켜져 있는지 확인한다 — 1번 섹션의
   "개발 서버 두 개 띄우기" 표 참고. 꺼져 있다면 다시 켠다.
   > 화면이 바뀌었는데도 스마트폰에 옛날 화면(또는 엉뚱한 화면)이 계속 뜨는 등 캐시 때문인
   > 것 같은 증상이 있으면, 캐시를 지우고 다시 시작한다.
   > ```bash
   > # 📍 위치: C:\project\shop-monorepo-mobile (루트)
   > pnpm --filter mobile start -c
   > ```
   > `-c` 옵션이 Metro의 번들 캐시를 지우고 새로 빌드하게 만든다.
2. 스마트폰 Expo Go 앱으로 QR코드를 다시 스캔한다 — STEP 1의 "Welcome!" 기본 화면 대신,
   방금 만든 로그인 화면(이메일/비밀번호 입력창 + "로그인" 버튼)이 보여야 한다.
3. 이메일 칸에 `admin@test.com`, 비밀번호 칸에 `123456`을 입력하고 "로그인" 버튼을 누른다
   (`apps/web`에 미리 만들어둔 테스트 계정과 동일하다).
4. 정상 동작 시:
   - 에러 문구 없이 화면이 `/products`로 전환된다(현재는 아직 만들지 않은 라우트라
     "화면을 찾을 수 없다"는 에러가 떠도 정상이다 — `/products` 화면은 STEP 5에서 만든다.
     여기서 확인할 건 **로그인 자체가 성공해서 화면 전환이 시도됐는지**다).
   - 토큰이 정상 저장됐는지는 `expo-secure-store`라 코드로 직접 들여다보기 까다로우니,
     일단 "에러 없이 다음 화면으로 넘어가려고 했다"는 것으로 로그인 성공을 판단한다.
5. 이메일/비밀번호를 일부러 틀리게 입력해서 에러 문구("이메일 또는 비밀번호가 올바르지
   않습니다")가 화면에 빨간 글씨로 뜨는지도 확인한다 — 에러 처리 분기가 정상 동작하는지
   보는 것이다.

---

## 6. STEP 5 — 상품 목록 / 상세 화면

### 6-1. TanStack Query 설치 및 Provider 등록

```bash
# 📍 위치: C:\project\shop-monorepo-mobile (루트)
pnpm add @tanstack/react-query@^5.100.14 --filter mobile
```

> **TanStack Query는 왜 필요하고 무슨 역할을 하는가**: 서버(API)에서 데이터를 가져오고,
> 그 결과를 화면에서 쉽게 쓸 수 있게 관리해주는 라이브러리다. `fetch`만 써도 되긴 하지만:
> - **로딩/에러 상태 자동 관리**: `fetch`만 쓰면 "로딩 중인지", "에러가 났는지", "데이터가
>   왔는지"를 `useState`로 일일이 직접 만들어야 한다. TanStack Query는 `useQuery` 한 번
>   호출로 `isLoading`, `data`, `error`를 자동으로 제공한다.
> - **캐싱**: 같은 데이터(예: 상품 목록)를 같은 화면에 여러 번 들어가도 매번 새로 요청하지
>   않고, 한 번 받아온 결과를 재사용한다.
> - **자동 재요청**: 화면에 다시 포커스가 오거나 네트워크가 복구되면 자동으로 최신 데이터를
>   다시 가져온다.
>
> 이번 STEP에서는 `GET /api/products`를 호출할 때 다음처럼 쓴다:
> ```ts
> const { data, isLoading } = useQuery({
>   queryKey: ["products"],
>   queryFn: fetchProducts,
> });
> ```
> `apps/web`도 이미 같은 라이브러리로 데이터를 가져오고 있어서(버전 정책에 따라
> `^5.100.14`로 통일), 웹과 모바일이 같은 방식으로 서버 데이터를 다루게 된다는 것도 이점이다.

📍 수정 파일: `C:\project\shop-monorepo-mobile\apps\mobile\app\_layout.tsx`

⚠️ **이 파일을 통째로 교체하는 게 아니다.** STEP 4에서 `(tabs)`/`modal` 잔재를 정리하면서
이미 `ThemeProvider`, `StatusBar`, `Stack.Screen name="modal"`이 남아있는 상태다. 그 내용을
지우지 말고, **`QueryClientProvider`로 기존 내용을 감싸기만** 한다. 지금 파일은 이런
모습이어야 한다(STEP 4에서 정리한 내용 + 이번에 추가하는 부분):

```tsx
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // ← 추가

import { useColorScheme } from '@/hooks/use-color-scheme';

const queryClient = new QueryClient(); // ← 추가

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack />
        <StatusBar style="auto" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
```

바뀐 부분은 두 가지뿐이다: 1) `QueryClient`/`QueryClientProvider` import와 인스턴스 생성,
2) 기존 `<ThemeProvider>...</ThemeProvider>` 전체를 `<QueryClientProvider>`로 한 번 더
감싸는 것. 그 안의 `ThemeProvider`, `Stack`, `StatusBar`는 STEP 4 그대로 둔다.

### 6-2. 상품 목록 화면

📍 신규 파일: `C:\project\shop-monorepo-mobile\apps\mobile\app\products\index.tsx`

```tsx
import { FlatList, Text, View, Image, Pressable } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Product } from "@my-project/types";

async function fetchProducts() {
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/products`);
  const json = await res.json();
  return json.items as Product[];
}

export default function ProductListScreen() {
  const router = useRouter();
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) return <Text>로딩 중...</Text>;

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 16, gap: 12 }}
      renderItem={({ item }) => (
        <Pressable
          onPress={() =>
            router.push({ pathname: "/products/[id]", params: { id: item.id } })
          }
          style={{
            flexDirection: "row",
            gap: 12,
            borderBottomWidth: 1,
            borderColor: "#eee",
            paddingBottom: 12,
          }}
        >
          {item.imageUrl ? (
            <Image
              source={{ uri: item.imageUrl }}
              style={{ width: 64, height: 64, borderRadius: 8 }}
            />
          ) : null}
          <View>
            <Text style={{ fontWeight: "600" }}>{item.name}</Text>
            <Text>{item.price.toLocaleString()}원</Text>
          </View>
        </Pressable>
      )}
    />
  );
}
```

> **왜 `router.push(\`/products/${item.id}\`)`처럼 문자열을 직접 안 쓰는가**: `app.json`의
> `"experiments": { "typedRoutes": true }` 설정 때문에 Expo Router가 실제 존재하는 라우트
> 파일을 기준으로 `href`에 들어갈 수 있는 문자열을 엄격하게 타입 검사한다. 템플릿 리터럴로
> 동적으로 만든 문자열은 타입이 너무 넓어서(`string`) 이 검사를 통과하지 못하고 타입 에러가
> 난다. 동적 라우트(`[id].tsx`처럼 `[ ]`가 들어간 경로)로 이동할 때는 객체 형태로
> `pathname`(라우트 파일 경로 그대로, `[id]` 포함)과 `params`(실제 값)를 나눠서 전달해야
> 타입 체크를 통과한다.

### 6-3. 상품 상세 화면

📍 신규 파일: `C:\project\shop-monorepo-mobile\apps\mobile\app\products\[id].tsx`

```tsx
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { View, Text, Image } from "react-native";
import { Product } from "@my-project/types";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data } = useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/api/products`,
      );
      const json = await res.json();
      return (json.items as Product[]).find((p) => p.id === id);
    },
  });

  if (!data) return <Text>로딩 중...</Text>;

  return (
    <View style={{ padding: 16, gap: 12 }}>
      {data.imageUrl ? (
        <Image
          source={{ uri: data.imageUrl }}
          style={{ width: "100%", height: 240, borderRadius: 8 }}
        />
      ) : null}
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>{data.name}</Text>
      <Text style={{ fontSize: 18 }}>{data.price.toLocaleString()}원</Text>
      <Text style={{ color: "#666" }}>{data.description}</Text>
    </View>
  );
}
```

> `/api/products`에 단건 조회 엔드포인트가 없어 목록에서 필터링했다. 실제로는 `apps/web`에
> `GET /api/products/[id]`를 추가하는 편이 효율적이지만, 이번 튜토리얼 범위에서는 기존 API를
> 최대한 그대로 쓰는 것을 우선한다.
>
> **참고 — `apps/web`의 상품 상세 페이지(`app/(shop)/products/[id]/page.tsx`)는 왜 API를 안
> 쓰는가**: 그 파일은 Server Component라서 `prisma.product.findUnique(...)`로 **DB를 직접
> 조회**한다. Next.js 서버 컴포넌트는 서버에서 실행되기 때문에 굳이 REST API를 거칠 필요가
> 없는 구조다. 반대로 Expo 앱(모바일)은 서버가 아니라 스마트폰에서 실행되므로 DB에 직접
> 접근할 수 없고, 반드시 API를 거쳐야 한다 — 그래서 지금처럼 목록 API를 받아와 `id`로
> 필터링하는 방식이 맞는 접근이다.
>
> **참고 — `[id]/page.tsx`와 `[id].tsx`의 차이**: 둘 다 "동적 경로"(`/products/123`처럼 끝이
> 바뀌는 주소)를 만드는 같은 개념이고, 표기법만 다르다.
>
> | | Next.js (`apps/web`) | Expo Router (`apps/mobile`) |
> |---|---|---|
> | 만드는 방법 | **폴더**를 `[id]`로 만들고, 그 안에 `page.tsx` 파일 | **파일** 자체를 `[id].tsx`로 만듦 |
> | 실제 경로 | `app/products/[id]/page.tsx` | `app/products/[id].tsx` |
>
> Next.js는 "폴더 이름에 동적 표시를 하고, 그 안에 항상 `page.tsx`라는 정해진 이름의 파일을
> 둔다"는 규칙이고, Expo Router는 "파일 이름 자체에 바로 동적 표시를 한다"는 규칙이다. 둘 다
> 같은 결과(`/products/123`, `/products/456`... 다 같은 화면이 처리)를 만들어내는 다른
> 문법일 뿐이다.

---

## 7. STEP 6 — 장바구니 화면

### 7-1. Zustand + AsyncStorage 설치

```bash
# 📍 위치: C:\project\shop-monorepo-mobile (루트)
pnpm add zustand@^5.0.14 --filter mobile
```

```bash
# 📍 위치: C:\project\shop-monorepo-mobile\apps\mobile
npx expo install @react-native-async-storage/async-storage
```

> **`@react-native-async-storage/async-storage`는 왜 필요한가**: 웹은 브라우저가 기본
> 제공하는 `localStorage`로 데이터를 기기에 저장해둔다(새로고침해도 유지). 그런데 React
> Native에는 브라우저가 없으니 `localStorage`도 없다 — 그 자리를 대신하는 것이 `AsyncStorage`
> 다. zustand의 `persist` 미들웨어(상태를 자동으로 저장/복원해주는 기능)를 쓸 때, 웹에서는
> 기본값으로 `localStorage`를 쓰지만 RN에서는 저장소를 `AsyncStorage`로 지정해줘야 한다.
> 패턴(상태 관리 + 영속화)은 웹과 동일하고, 실제 저장 매체만 다른 것이다.
>
> (참고: 앞서 STEP 4에서 토큰 저장에 쓴 `expo-secure-store`와는 용도가 다르다.
> `expo-secure-store`는 암호화가 필요한 민감한 값(토큰)에, `AsyncStorage`는 암호화가
> 필요 없는 일반 상태(장바구니 내용 등)를 저장하는 데 적합하다.)

### 7-2. 인증된 fetch 래퍼

📍 신규 파일: `C:\project\shop-monorepo-mobile\apps\mobile\src\lib\api.ts`

> **이 파일이 하는 일**: 장바구니 API(`/api/cart`)는 누가 요청했는지 알아야 한다 — STEP 2에서
> 만든 대로, 로그인 때 받은 JWT 토큰을 `Authorization` 헤더에 담아 보내야 서버가 사용자를
> 인식한다. 그런데 화면 코드(`app/cart/index.tsx` 등)에서 매번 "토큰 꺼내오기 +
> `Authorization` 헤더 붙이기"를 직접 반복하면 코드가 지저분해지고 빠뜨리기도 쉽다. 그래서
> `apiFetch`라는 **공용 fetch 함수**를 하나 만들어서, 토큰을 꺼내 헤더에 자동으로 붙여주는
> 일을 한 곳에서 처리한다. 이후 화면에서는 `fetch` 대신 `apiFetch("/api/cart")`처럼만 호출하면
> 인증 헤더가 자동으로 붙는다 — STEP 7-3(장바구니 화면)에서 바로 이 함수를 쓴다.

```ts
import { getToken } from "./token";

export async function apiFetch(path: string, options: RequestInit = {}) {
  const token = await getToken();
  return fetch(`${process.env.EXPO_PUBLIC_API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
}
```

### 7-3. 장바구니 화면

📍 신규 파일: `C:\project\shop-monorepo-mobile\apps\mobile\app\cart\index.tsx`

```tsx
import { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { apiFetch } from "@/src/lib/api";
import { CartItem } from "@my-project/types";

export default function CartScreen() {
  const [items, setItems] = useState<CartItem[]>([]);

  const load = async () => {
    const res = await apiFetch("/api/cart");
    const json = await res.json();
    setItems(json.items);
  };

  useEffect(() => {
    load();
  }, []);

  const removeItem = async (productId: string) => {
    await apiFetch("/api/cart", {
      method: "DELETE",
      body: JSON.stringify({ productId }),
    });
    load();
  };

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.productId}
      contentContainerStyle={{ padding: 16, gap: 12 }}
      renderItem={({ item }) => (
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>
            {item.productName} x {item.quantity}
          </Text>
          <Pressable onPress={() => removeItem(item.productId)}>
            <Text style={{ color: "red" }}>삭제</Text>
          </Pressable>
        </View>
      )}
      ListEmptyComponent={<Text>장바구니가 비어 있습니다</Text>}
    />
  );
}
```

### 7-4. 상품 상세 화면에 "담기" 버튼 추가 (연습 문제)

지금까지 만든 화면들을 연결하는 마지막 조각이다. **STEP 6-3에서 만든 `app/products/[id].tsx`를
수정**해서, 상세 화면에 "담기" 버튼을 추가한다. 새 파일을 만드는 게 아니라 **기존 파일에
버튼 하나와 그 버튼이 호출할 함수만 추가**하면 된다.

**무엇을 추가해야 하는가**:
1. `apiFetch`를 import한다 (`import { apiFetch } from "@/src/lib/api";`) — 7-2에서 만든
   그 함수다.
2. `CartItem` 타입을 import한다 (`import { CartItem } from "@my-project/types";`).
3. 버튼을 눌렀을 때 실행할 함수를 만든다. `apiFetch`로 `/api/cart`에 `POST` 요청을 보내는데,
   본문(`body`)은 `apps/web`의 `CartItem` 형태(`productId`, `productName`, `price`,
   `quantity`, `imageUrl`)에 맞춰서 현재 보고 있는 상품(`data`) 정보로 채운다.
4. 화면에 `<Pressable>` 버튼을 하나 추가해서, 누르면 3번 함수가 실행되도록 `onPress`를
   연결한다 (`app/index.tsx`의 로그인 버튼이나 `app/products/index.tsx`의 목록 아이템과
   똑같은 `<Pressable onPress={...}>` 패턴이다).

STEP 6-3에서 만든 파일과 비교하면 바뀐 곳은 정확히 이 4곳이다:

```diff
- import { useLocalSearchParams } from "expo-router";
+ import { useLocalSearchParams, useRouter } from "expo-router";
+ import { Pressable } from "react-native"; // 기존 import 줄에 Pressable 추가
+ import { apiFetch } from "@/src/lib/api";
```

```diff
  const { id } = useLocalSearchParams<{ id: string }>();
+ const router = useRouter();
+ const [added, setAdded] = useState(false);
```

```diff
  if (!data) return <Text>로딩 중...</Text>;
+
+ const addToCart = async () => { /* 본문은 아래 전체 코드 참고 */ };
```

```diff
      <Text style={{ color: "#666" }}>{data.description}</Text>
+
+     <Pressable onPress={addToCart}>...담기 버튼...</Pressable>
+     {added ? <Text>장바구니에 담았습니다</Text> : null}
+     <Pressable onPress={() => router.push("/cart")}>...장바구니 보기...</Pressable>
    </View>
```

**`app/products/[id].tsx` 전체 교체 코드** — 위 4곳을 반영한 완성된 파일이다. 이 파일을
통째로 이 내용으로 바꾸면 된다:

```tsx
import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { View, Text, Image, Pressable } from "react-native";
import { Product, CartItem } from "@my-project/types";
import { apiFetch } from "@/src/lib/api";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [added, setAdded] = useState(false);

  const { data } = useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/api/products`,
      );
      const json = await res.json();
      return (json.items as Product[]).find((p) => p.id === id);
    },
  });

  if (!data) return <Text>로딩 중...</Text>;

  const addToCart = async () => {
    setAdded(false);
    await apiFetch("/api/cart", {
      method: "POST",
      body: JSON.stringify({
        productId: data.id,
        productName: data.name,
        price: data.price,
        quantity: 1,
        imageUrl: data.imageUrl,
      } satisfies CartItem),
    });
    setAdded(true);
  };

  return (
    <View style={{ padding: 16, gap: 12 }}>
      {data.imageUrl ? (
        <Image
          source={{ uri: data.imageUrl }}
          style={{ width: "100%", height: 240, borderRadius: 8 }}
        />
      ) : null}
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>{data.name}</Text>
      <Text style={{ fontSize: 18 }}>{data.price.toLocaleString()}원</Text>
      <Text style={{ color: "#666" }}>{data.description}</Text>

      <Pressable
        onPress={addToCart}
        style={{
          backgroundColor: "#111",
          padding: 14,
          borderRadius: 8,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "600" }}>담기</Text>
      </Pressable>
      {added ? <Text style={{ color: "green" }}>장바구니에 담았습니다</Text> : null}

      <Pressable onPress={() => router.push("/cart")}>
        <Text style={{ color: "#1a73e8" }}>장바구니 보기</Text>
      </Pressable>
    </View>
  );
}
```

상세 화면에서 장바구니로 이동하는 버튼이 필요한 건 임시 디버깅용이 아니라 실제 쇼핑몰에도
있는 정상적인 네비게이션이라, "담기" 버튼 아래에 "장바구니 보기" 링크를 정식으로 포함시켰다.

**장바구니 담기 어떻게 테스트하는가**:
1. 상품 목록 → 아무 상품이나 눌러 상세 화면으로 들어간다.
2. "담기" 버튼을 누른다 — 버튼 아래에 초록색 "장바구니에 담았습니다" 문구가 뜨면 요청이
   성공했다는 뜻이다.
3. "장바구니 보기"를 눌러 `app/cart/index.tsx`로 이동한다.
4. 방금 담은 상품이 목록으로 보이면, STEP 6까지 전체 흐름(로그인 → 상품 조회 → 장바구니
   담기 → 장바구니 조회)이 정상 연결된 것이다.

---

