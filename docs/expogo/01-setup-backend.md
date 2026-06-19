> 📖 이 문서는 GUIDE.md를 3개로 나눈 시리즈 중 **1/3**입니다. → 다음: [02-screens.md](02-screens.md)

# shop-mobile-expo — Expo/React Native 학습 튜토리얼

> 이 문서는 `shop-monorepo-mobile`(쇼핑몰 모노레포) 학생들이 **네이티브 모바일 앱 경험**을 위해
> Expo/React Native로 같은 쇼핑몰의 일부 기능(로그인 → 상품 목록/상세 → 장바구니)을
> 처음부터 직접 만들어보는 실습 자료다.
>
> **이 튜토리얼은 `apps/mobile`을 메인 모노레포(`shop-monorepo-mobile`) 안에 만든다.**
> 과거에는 `shop-mobile-expo`라는 완전히 별도의 저장소로 만들었지만, 한 프로젝트 안에
> PWA와 RN 두 갈래로 모바일 대응이 나뉘어 있으면 수업 중 "지금 뭘 보고 있는 건지" 혼선이
> 생긴다는 판단으로, PWA 구현은 제거하고 RN을 `apps/mobile`로 흡수했다.

---

## 0. 개요

### 왜 이 튜토리얼이 필요한가

`shop-monorepo-mobile`은 과거 PWA(Service Worker + manifest)로 "모바일에서 앱처럼 동작하는 웹"을
시도한 적이 있다. 하지만 PWA는 결국 브라우저 위에서 동작하는 웹이라, **진짜 네이티브 화면 전환·터치
인터랙션**은 경험할 수 없었고, 같은 목적의 두 구현(PWA + RN)을 동시에 유지하면 학생들이 헷갈리기만
했다. 그래서 PWA는 걷어내고, 같은 백엔드(API)를 그대로 재사용하면서 화면만 React Native로 새로
만들어 "웹과 네이티브가 무엇이 다른지"를 직접 체감하는 쪽으로 정리했다.

### 무엇을 만드는가?

메인 모노레포 안에 `apps/mobile`이라는 **워크스페이스 앱**으로 Expo 앱 1개를 만든다.
DB나 비즈니스 로직은 새로 만들지 않고, `apps/web`이 이미 제공하는 API를 그대로 호출한다
(중복 구현 금지 — 모노레포의 SSOT 원칙). 같은 워크스페이스이므로 `packages/types`에 이미
정의된 타입(`Product`, `CartItem` 등)은 **복사하지 않고 그대로 import**한다.

```
shop-monorepo-mobile/
├── apps/
│   ├── web/      ← Next.js (기존, PWA 제거됨)
│   └── mobile/   ← Expo (이번 튜토리얼에서 만드는 부분)
└── packages/
    ├── database/ ← Prisma (web만 사용)
    └── types/    ← Product, CartItem 등 — mobile도 그대로 import
```

```
[Expo 앱 (apps/mobile)]
        ↓ fetch (REST, Authorization: Bearer <JWT>)
[apps/web의 API Route]  ← 이번 튜토리얼에서 CORS + 모바일 로그인 API 추가
        ↓ Prisma
[PostgreSQL / Redis]
```

> ⚠️ **같은 모노레포라고 같은 서버는 아니다.** `apps/mobile`(Expo 개발 서버)과 `apps/web`(Next
> 서버)은 워크스페이스 안에서 코드와 타입만 공유할 뿐, 실행 시에는 여전히 서로 다른 포트(그리고
> 스마트폰에서 보면 다른 호스트)에서 떠 있는 별개의 프로세스다. 그래서 CORS 설정과 LAN IP
> 설정은 모노레포로 합친 것과 무관하게 **그대로 필요하다.**

### 범위 (이번 튜토리얼에서 만드는 화면 3개)

| 화면                     | 연동 API                                                  |
| ------------------------ | --------------------------------------------------------- |
| 로그인 (이메일/비밀번호) | `POST /api/mobile/auth/login` (신규)                      |
| 상품 목록 / 상세         | `GET /api/products` (기존 재사용)                          |
| 장바구니                 | `GET/POST/DELETE/PATCH /api/cart` (기존 + 토큰 인증 추가) |

> 소셜 로그인(Google/Kakao)은 범위에서 제외한다. RN에서는 `expo-auth-session` 같은 별도 SDK가
> 필요해 학습 범위를 벗어난다.

### 왜 별도 저장소가 아니라 모노레포 워크스페이스로 두는가

처음 이 튜토리얼을 설계할 때는 "Expo 앱 1개뿐이라 워크스페이스가 불필요하다"고 판단해 완전히
별도 저장소로 만들었다. 하지만 운영해보니 단점이 더 컸다:

- 두 프로젝트를 각각 클론·실행해야 해서 수업 중 "어느 폴더에서 무슨 명령을 치는지" 혼선이 발생
- `packages/types`의 타입을 손으로 복사해야 해서, 웹 쪽 타입이 바뀌면 모바일이 조용히 깨짐
- 같은 쇼핑몰 기능을 두 군데서 따로 관리하는 비용

모노레포로 합친 뒤에도 Turborepo 같은 빌드 오케스트레이션 도구는 추가하지 않는다 — `apps/mobile`은
`pnpm --filter mobile <script>`로 단독 실행되므로 워크스페이스(pnpm)만으로 충분하고, 빌드 도구가
늘어나면 학생이 디버깅해야 할 레이어도 늘어난다.

### 버전 정책

`apps/web/package.json`과 겹치는 라이브러리는 **동일 버전을 그대로 고정**한다.

| 라이브러리              | 버전 (apps/web과 동일) |
| ----------------------- | ----------------------- |
| `typescript`            | `^5`                    |
| `zod`                   | `^4.4.3`                 |
| `@tanstack/react-query` | `^5.100.14`              |
| `zustand`               | `^5.0.14`                 |
| `react-hook-form`       | `^7.76.1`                 |
| `@hookform/resolvers`   | `^5.4.0`                  |

> **예외 — React / React Native**: Expo SDK는 React·React Native 버전을 서로 짝지어 강제한다
> (마음대로 올리거나 내리면 빌드가 깨진다). 따라서 `react`만큼은 웹 버전을 강제로 맞추지 않고
> `npx create-expo-app`이 설치하는 **Expo SDK 호환 버전을 그대로 사용**한다. 이 한 가지만 유일한
> 예외다.

### 전체 흐름 한눈에 보기

| STEP | 내용 |
|---|---|
| STEP 1 | Expo 프로젝트 생성 |
| STEP 2 | 백엔드(로그인 API, CORS, 장바구니 JWT 인증) |
| STEP 3 | 타입/스키마 연결 |
| STEP 4 | 로그인 화면 |
| STEP 5 | 상품 목록/상세 화면 |
| STEP 6 | 장바구니 화면 |
| STEP 7 | 실기기 테스트 |

---

## 1. 사전 준비

- [ ] Node.js `>=20.0.0` 설치 확인
- [ ] pnpm `10.27.0` 설치 확인 (루트 `package.json`의 `packageManager`와 동일 버전 — 워크스페이스
      전체가 같은 pnpm을 쓰므로 따로 설치할 필요 없음)
- [ ] 스마트폰에 **Expo Go** 앱 설치 (App Store / Play Store)
- [ ] PC와 스마트폰이 **같은 Wi-Fi**에 연결되어 있을 것 (LAN으로 통신하기 때문)
- [ ] `apps/web`이 로컬에서 실행 중일 것

```bash
# 📍 위치: C:\project\shop-monorepo-mobile (루트)
pnpm dev
```

> 루트의 `pnpm dev`는 `pnpm --filter web dev`로 연결되어 있어 `apps/web`만 켜진다.

실행 후 PC의 LAN IP를 확인해둔다 (스마트폰이 `localhost`로는 PC에 접근할 수 없기 때문).

```powershell
# 📍 위치: 어디서든 실행 가능
ipconfig
```

`IPv4 주소` 값을 메모해둔다 (예: `192.168.0.12`).

---

## 2. STEP 1 — 프로젝트 생성

```bash
# 📍 위치: C:\project\shop-monorepo-mobile\apps
pnpm create expo-app@latest mobile
- For learning with Expo Go (SDK 54) 선택
- 설치 로그는 다음과 같다.
  √ Select an Expo SDK version: » For learning with Expo Go (SDK 54)
  Creating mobile using the default template.

  Tip:
    • pnpx create-expo-app --template  to pick from other templates
    • pnpx create-expo-app --example   to explore https://github.com/expo/examples

  √ Downloaded and extracted project files.
  > pnpm install
  Scope: all 5 workspace projects

    ╭─────────────────────────────────────────╮
    │                                         │
    │   Update available! 10.27.0 → 11.8.0.   │
    │   Changelog: https://pnpm.io/v/11.8.0   │
    │    To update, run: pnpm add -g pnpm     │
    │                                         │
    ╰─────────────────────────────────────────╯
  Downloading react-native@0.81.5: 24.77 MB/24.77 MB, done
   WARN  5 deprecated subdependencies found: glob@7.2.3, inflight@1.0.6, rimraf@3.0.2, source-map@0.8.0-beta.0, uuid@7.0.3
  ../..                                    |    +1078 +++++++++++++++++++++++++++++++++++++++++++++++++++
  ../..                                    | Progress: resolved 1178, reused 247, downloaded 833, added 957

   WARN  Issues with peer dependencies found
  apps/mobile
  └─┬ @types/react-dom 19.2.3
    └── ✕ unmet peer @types/react@^19.2.0: found 19.1.17
 (중략).............
  ✅ Your project is ready!

  To run your project, navigate to the directory and run one of the following pnpm commands.

  - cd mobile
  - pnpm run android
  - pnpm run ios # you need to use macOS to build the iOS project - use the Expo app if you need to do iOS development without a Mac
  - pnpm run web
```

`apps/mobile/package.json`의 `name` 필드는 폴더명을 그대로 받아 이미 `"mobile"`로 생성된다
(`apps/web`의 `name`이 `"web"`인 것과 같은 이유 — `pnpm --filter mobile ...`로 가리키려면 이
값이 폴더명과 일치해야 한다). 다른 값으로 되어 있다면 `"mobile"`로 바꾼다.

> **왜 `apps/*`는 짧은 이름이고 `packages/*`는 `@my-project/...`인가**: 역할이 다르기
> 때문이다. `apps/web`, `apps/mobile`은 그 자체로 실행되는 최종 애플리케이션이라 다른
> 워크스페이스가 이걸 import해서 쓸 일이 없다 — 그래서 `pnpm --filter`로 가리키기 쉽게
> 폴더명 그대로 짧게(`"web"`, `"mobile"`) 짓는다. 반면 `packages/database`, `packages/types`는
> 다른 워크스페이스에 **import되어 쓰이는 공유 라이브러리**다(`import ... from
> "@my-project/types"`처럼 코드에서 직접 패키지명으로 참조됨). 그래서 `@my-project/` 스코프를
> 붙여서 1) "이 프로젝트 내부 공유 패키지"임을 명확히 구분하고 2) 일반 npm 공개 패키지
> 이름과의 충돌을 피한다. 즉 "import해서 쓰일 패키지"는 스코프를 붙이고, "실행만 되는 앱"은
> 폴더명 그대로 쓰는 컨벤션이다.

루트의 `pnpm-workspace.yaml`은 이미 `apps/*` 패턴을 포함하고 있으므로, **별도 설정 없이**
`apps/mobile`이 자동으로 워크스페이스에 편입된다. `pnpm create expo-app`은 설치 과정에서
워크스페이스를 감지해 루트 기준으로 `pnpm install`까지 자동으로 실행하므로(설치 로그의
"Scope: all 5 workspace projects" 부분), **별도로 `pnpm install`을 다시 실행할 필요는 없다.**

> **참고 — `apps/mobile`도 pnpm 호이스팅 규칙의 영향을 받는다**: pnpm은 패키지 실물을 한 곳
> (루트 `node_modules/.pnpm`)에만 저장하고, 각 워크스페이스(`apps/web`, `apps/mobile`)의
> `node_modules`에는 그곳을 가리키는 심볼릭 링크만 둔다. `apps/mobile`도 예외가 아니라
> 이 구조에 똑같이 편입된다. 문제는 React Native/Expo 생태계의 일부 도구가 이 심볼릭 링크
> 구조를 잘 못 찾는 경우가 있다는 것이다 — 당장은 정상 동작하지만, 이후 워크스페이스 패키지
> (`@my-project/types` 등)를 import하거나 특정 네이티브 모듈을 추가할 때 `Unable to resolve
> module` 같은 에러가 나면 이 구조가 원인일 가능성이 높다. 바로 아래 Metro 관련 안내가 그
> 대응 방법이다.

생성된 폴더 구조 중 알아야 할 것만 정리:

```
apps/mobile/
├── app/                  ← 화면 파일 (Expo Router — 파일 경로 = 라우트 경로)
│   ├── (tabs)/index.tsx  ← 기본 홈 화면 (이후 삭제하고 우리 화면으로 교체)
│   └── _layout.tsx       ← 전체 레이아웃
├── package.json
└── tsconfig.json
```

> `app/` 폴더 기반 라우팅은 `apps/web`의 Next.js App Router와 같은 개념이다 — 파일 위치가 곧
> 화면 경로가 된다는 점이 동일해서 익숙하게 느껴질 것이다. 다만 **파일명 규칙은 다르다.**
> `apps/web`(Next.js 16)은 레이아웃 파일을 언더스코어 없이 `layout.tsx`로 쓰지만, Expo
> Router는 `_layout.tsx`처럼 **언더스코어(`_`) 접두사**를 붙인다. Next.js에서는 언더스코어
> 접두사가 "라우팅에서 제외"라는 별도 의미로 쓰이므로(Private Folder 컨벤션), `apps/web`
> 코드를 보다가 `apps/mobile`로 넘어올 때 이 차이를 헷갈리지 않도록 주의한다.

> **모노레포 + Expo/Metro 참고**: **Metro**는 Expo/React Native 프로젝트가 코드를 한 번에
> 묶어 스마트폰으로 전달하는 번들러다 — 웹의 Next.js/Webpack/Turbopack과 같은 역할을 RN
> 진영에서 담당하는 도구라고 보면 된다. Metro는 기본적으로 워크스페이스 루트를 자동으로
> 인식하지 못해 `packages/types` 같은 워크스페이스 패키지 import에서 모듈을 못 찾는 에러가
> 날 수 있다(바로 위 pnpm 호이스팅 참고 박스에서 언급한 문제). STEP 3에서 `@my-project/types`를
> 처음 import할 때 에러가 나면, `apps/mobile/metro.config.js`에 워크스페이스 루트를
> `watchFolders`에 추가하는 설정이 필요하다 — 이 시점에 실제로 막히면 별도로 안내한다.

동작 확인:

```bash
# 📍 위치: C:\project\shop-monorepo-mobile (루트)
pnpm --filter mobile start
```

> **왜 `apps/mobile`로 들어가지 않고 루트에서 실행하는가**: `--filter mobile`은 pnpm에게
> "워크스페이스 중 이름이 `mobile`인 패키지(`apps/mobile`)의 `start` 스크립트를 실행하라"고
> 지시하는 것이다. 즉 `cd apps/mobile && pnpm start`와 결과는 같지만, 실행 위치를 옮길 필요가
> 없다. 모노레포 작업 중에는 `apps/web`, `apps/mobile`, `packages/*`를 계속 오가며 명령을
> 치게 되는데, 매번 폴더를 옮기다 보면 "지금 내가 어디 있지?"라는 혼란이 생기기 쉽다. 그래서
> 이 가이드의 모든 pnpm 명령은 **항상 루트에서, `--filter`로 대상을 지정**하는 방식으로
> 통일했다 (`CLAUDE.md`의 모노레포 규칙과 동일).

터미널에 뜨는 QR코드를 스마트폰 Expo Go 앱으로 스캔하면 기본 템플릿 화면이 뜬다.

**스캔 후 스마트폰에 뜨는 화면**:

- 상단에 React 로고(원자 모양 아이콘)가 있는 배너
- "Welcome! 👋"
- **Step 1: Try it** — `app/(tabs)/index.tsx`를 수정하면 변경 사항이 반영된다는 안내,
  개발자 도구는 `cmd + m`(Mac 기준. Windows에서 Expo Go 앱은 기기를 흔들거나 메뉴에서
  "Open Dev Menu"로 연다)으로 연다는 안내
- **Step 2: Explore** — 하단의 "Explore" 탭을 누르면 기본 템플릿에 포함된 기능들을
  더 살펴볼 수 있다는 안내

이 화면이 뜨면 Expo 개발 서버 ↔ 스마트폰 Expo Go 앱 사이의 연결이 정상이라는 뜻이다. 이후
STEP 4~6에서 이 기본 템플릿 화면(`app/(tabs)/index.tsx` 등)을 우리가 만들 로그인/상품/장바구니
화면으로 교체해 나간다. 여기까지 되면 STEP 1 완료.

---

## 3. STEP 2 — 백엔드 준비 (apps/web 수정)

> ⚠️ 이번 STEP은 `apps/mobile`이 아니라 **기존 `apps/web`**을 수정한다. 헷갈리지 않도록 모든
> 명령 앞에 위치를 표시했다.

### 3-1. JWT 라이브러리 설치

> **왜 JWT가 필요한가**: `apps/web`의 기존 로그인(NextAuth)은 로그인에 성공하면 브라우저에
> **쿠키**로 세션을 심어준다. 이후 요청마다 브라우저가 그 쿠키를 자동으로 같이 보내주기 때문에
> 서버는 "누가 요청했는지"를 쿠키만 보고 알 수 있다. 그런데 Expo 앱(스마트폰)은 브라우저가
> 아니라서 이 쿠키 메커니즘을 쓸 수 없다. 그래서 모바일에서는 로그인 성공 시 "이 사람이
> 누구인지"를 증명하는 토큰을 직접 발급해서 스마트폰에 저장해두고, 이후 요청마다 그 토큰을
> 수동으로 같이 보내는 방식을 쓴다 — 이때 가장 널리 쓰이는 토큰 형식이 **JWT(JSON Web
> Token)**다. `jose`는 Node.js/Next.js 환경에서 JWT를 만들고(서명) 검증하는 라이브러리다.

```bash
# 📍 위치: C:\project\shop-monorepo-mobile (루트)
pnpm add jose --filter web
```

### 3-2. 모바일 로그인 API 신규 생성

`src/auth.ts`의 Credentials provider와 동일한 검증 로직(이메일 조회 + bcrypt 비교)을 그대로 가져와
JWT를 발급하는 라우트를 추가한다.

> **왜 검증 로직을 그대로 재사용하는가**: "이메일로 사용자를 찾고, 입력한 비밀번호와 DB에
> 저장된 암호화된 비밀번호를 `bcrypt`로 비교한다"는 로직 자체는 **누가 로그인을 시도하든
> (웹이든 모바일이든) 동일해야 하는 보안 규칙**이다. 다른 점은 그 검증이 끝난 뒤의 처리뿐이다
> — 웹은 검증 성공 시 쿠키를 심어주고, 모바일은 검증 성공 시 JWT를 발급해준다. 같은 검증
> 로직을 두 곳에 따로 만들면 한쪽만 비밀번호 규칙이 바뀌었을 때 다른 쪽이 보안적으로
> 어긋나는 버그가 생길 수 있다(SSOT 원칙과 같은 이유). 그래서 "검증"은 기존 로직을 그대로
> 가져오고, "검증 후 무엇을 발급하는가"만 모바일용으로 새로 추가한다.

📍 신규 파일: `C:\project\shop-monorepo-mobile\apps\web\src\app\api\mobile\auth\login\route.ts`

> **이 파일이 하는 일**: Expo 앱이 이메일/비밀번호를 보내면(`POST` 요청), 이 라우트가
> 1) 입력값이 올바른 형식인지 확인하고 2) DB에서 그 이메일의 사용자를 찾아 비밀번호가
> 맞는지 확인한 다음, 3) 맞으면 "이 사람이 누구인지" 증명하는 JWT 토큰을 만들어 응답으로
> 돌려준다. Expo 앱은 이 토큰을 받아서 스마트폰에 저장해두고, 이후 상품 조회·장바구니 같은
> API를 호출할 때마다 이 토큰을 같이 보내 "로그인된 사용자"임을 증명한다. 즉 **모바일 전용
> 로그인 창구**라고 보면 된다 — 기존 웹 로그인(NextAuth)과 같은 검증 규칙을 쓰지만, 결과로
> 쿠키가 아니라 토큰을 돌려준다는 점만 다르다.

```ts
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { prisma } from "@my-project/database";
import { loginSchema } from "@/schemas/auth.schema";

const secret = new TextEncoder().encode(process.env.AUTH_SECRET!);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0].message },
      { status: 400 },
    );
  }

  const { email, password } = parsed.data;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.password) {
    return NextResponse.json(
      { error: "이메일 또는 비밀번호가 올바르지 않습니다" },
      { status: 401 },
    );
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json(
      { error: "이메일 또는 비밀번호가 올바르지 않습니다" },
      { status: 401 },
    );
  }

  const token = await new SignJWT({ role: user.role })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);

  return NextResponse.json({
    token,
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
  });
}
```

> `AUTH_SECRET`은 `apps/web`이 NextAuth용으로 이미 `.env.local`에 가지고 있는 값을 그대로
> 재사용한다 (새로 만들지 않는다).

### 3-3. CORS 허용 추가

> **왜 필요한가**: Expo 앱은 `localhost:3000`이 아닌 다른 주소(LAN IP)에서 실행된다. 같은
> 모노레포 안에 있어도 실행 중인 프로세스 기준으로는 서로 다른 오리진이라, 서버가 "이 출처
> (origin)는 허용한다"는 헤더를 응답에 넣어주지 않으면 Expo 앱의 요청이 막힌다.
> **규칙은 하나다**: 응답을 보내는 모든 곳(`NextResponse.json(...)`, `Response.json(...)`)의
> 두 번째 인자에 `headers: CORS_HEADERS`를 끼워 넣는다. 이미 `{ status: ... }`가 있으면 그 안에
> 같이 넣고, 없으면 `{ headers: CORS_HEADERS }`를 새로 추가한다.

#### (a) 모바일 로그인 API — `api/mobile/auth/login/route.ts`

`const secret = ...` 아래에 추가:

```ts
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new Response(null, { headers: CORS_HEADERS });
}
```

이 파일에는 응답을 보내는 곳이 **4군데**다. 전부 아래처럼 `headers: CORS_HEADERS`를 추가한다.

```ts
// 1) 입력값 검증 실패
return NextResponse.json(
  { error: parsed.error.issues[0].message },
  { status: 400, headers: CORS_HEADERS },
);

// 2) 사용자 없음
return NextResponse.json(
  { error: "이메일 또는 비밀번호가 올바르지 않습니다" },
  { status: 401, headers: CORS_HEADERS },
);

// 3) 비밀번호 불일치
return NextResponse.json(
  { error: "이메일 또는 비밀번호가 올바르지 않습니다" },
  { status: 401, headers: CORS_HEADERS },
);

// 4) 로그인 성공 — 원래 두 번째 인자가 없던 곳이라 새로 추가
return NextResponse.json(
  {
    token,
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
  },
  { headers: CORS_HEADERS },
);
```

#### (b) 상품 API — `api/products/route.ts`

`const PAGE_SIZE = 12;` 아래에 추가:

```ts
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new Response(null, { headers: CORS_HEADERS });
}
```

응답을 보내는 곳은 **1군데**뿐이다.

```ts
// 기존: return Response.json({ items, nextCursor });
return Response.json({ items, nextCursor }, { headers: CORS_HEADERS });
```

> 학습 단계라 `*`(전체 허용)을 쓴다. 실제 배포 시에는 Expo 앱 도메인으로 좁혀야 한다는 점을
> 기억해둔다.

### 3-4. 장바구니 API — CORS + JWT 인증 추가

📍 수정 파일: `C:\project\shop-monorepo-mobile\apps\web\src\app\api\cart\route.ts`

> **왜 필요한가**: 지금 `/api/cart`는 누가 요청했는지 확인할 때 웹 쿠키(`session?.user?.id`)만
> 본다. Expo 앱은 쿠키가 없으니, 로그인 때 받은 JWT를 `Authorization` 헤더로 보내면 서버가
> 그걸 풀어서 사용자를 알아내도록 만들어야 한다. "쿠키로 확인" 방식에 "토큰으로 확인" 방식을
> 하나 더 추가하는 작업이다.

**1) 맨 위 import 추가**

```ts
import { jwtVerify } from "jose";
```

**2) `resolveKey` 함수 위에 추가**

```ts
const secret = new TextEncoder().encode(process.env.AUTH_SECRET!);

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,DELETE,PATCH,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new Response(null, { headers: CORS_HEADERS });
}

// Authorization: Bearer <토큰> 헤더를 풀어서 user id를 꺼내는 함수
async function getMobileUserId(req: NextRequest): Promise<string | null> {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;
  try {
    const { payload } = await jwtVerify(authHeader.slice(7), secret);
    return (payload.sub as string) ?? null;
  } catch {
    return null;
  }
}
```

**3) GET, POST, DELETE, PATCH 4개 함수를 전부 같은 패턴으로 수정**

공통 규칙: `session?.user?.id`를 직접 쓰던 곳을 전부 `userId` 변수로 바꾸고, 그 변수는
각 함수 맨 위(`const session = await auth();` 바로 다음 줄)에서
`const userId = session?.user?.id ?? (await getMobileUserId(req)); // ← 추가`로 한 번만 구한다.
응답을 보내는 곳마다 `headers: CORS_HEADERS`도 추가한다.

아래 함수들 마다 추가한다.
**GET**

```ts
export async function GET(req: NextRequest) {
  const session = await auth();
  const userId = session?.user?.id ?? (await getMobileUserId(req)); // ← 추가
  const key = resolveKey(userId, req); // ← session?.user?.id → userId
  const items = await getCart(key);

  const res = NextResponse.json({ items }, { headers: CORS_HEADERS }); // ← headers 추가

  // 비로그인 첫 접근 시 세션 ID 발급
  if (!userId && !req.cookies.get("cart_session")) { // ← session?.user → userId
    res.cookies.set("cart_session", crypto.randomUUID(), {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
  }

  return res;
}
```

**POST**

```ts
export async function POST(req: NextRequest) {
  const session = await auth();
  const userId = session?.user?.id ?? (await getMobileUserId(req)); // ← 추가

  let sessionId = req.cookies.get("cart_session")?.value;
  let newSessionId: string | undefined;

  if (!userId && !sessionId) { // ← session?.user → userId
    newSessionId = crypto.randomUUID();
    sessionId = newSessionId;
  }

  const key = userId // ← session?.user?.id → userId
    ? `cart:user:${userId}` // ← session.user.id → userId
    : sessionId
      ? `cart:session:${sessionId}`
      : "";

  if (!key)
    return NextResponse.json(
      { error: "Invalid session" },
      { status: 400, headers: CORS_HEADERS }, // ← headers 추가
    );

  const item: CartItem = await req.json();
  const items = await getCart(key);

  const existing = items.find((i) => i.productId === item.productId);
  if (existing) {
    existing.quantity += item.quantity;
  } else {
    items.push(item);
  }

  await setCart(key, items);

  const res = NextResponse.json({ items }, { headers: CORS_HEADERS }); // ← headers 추가
  if (newSessionId) {
    res.cookies.set("cart_session", newSessionId, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
  }
  return res;
}
```

**DELETE**

```ts
export async function DELETE(req: NextRequest) {
  const session = await auth();
  const userId = session?.user?.id ?? (await getMobileUserId(req)); // ← 추가
  const key = resolveKey(userId, req); // ← session?.user?.id → userId
  if (!key) return NextResponse.json({ items: [] }, { headers: CORS_HEADERS }); // ← headers 추가

  const url = new URL(req.url);

  if (url.searchParams.get("clear") === "true") {
    await clearCart(key);
    return NextResponse.json({ items: [] }, { headers: CORS_HEADERS }); // ← headers 추가
  }

  const { productId } = await req.json();
  const items = await getCart(key);
  const updated = items.filter((i) => i.productId !== productId);
  await setCart(key, updated);

  return NextResponse.json({ items: updated }, { headers: CORS_HEADERS }); // ← headers 추가
}
```

**PATCH**

```ts
export async function PATCH(req: NextRequest) {
  const session = await auth();
  const userId = session?.user?.id ?? (await getMobileUserId(req)); // ← 추가
  const key = resolveKey(userId, req); // ← session?.user?.id → userId
  if (!key) return NextResponse.json({ items: [] }, { headers: CORS_HEADERS }); // ← headers 추가

  const { productId, quantity } = await req.json();
  const items = await getCart(key);
  const updated = items.map((i) =>
    i.productId === productId ? { ...i, quantity } : i,
  );
  await setCart(key, updated);

  return NextResponse.json({ items: updated }, { headers: CORS_HEADERS }); // ← headers 추가
}
```

### 확인

> **`pnpm dev` 전에 Prisma client 생성 여부를 먼저 확인한다.** `apps/mobile`을 만드는 과정에서
> 워크스페이스 전체에 `pnpm install`이 다시 실행되면, Prisma 7부터는 `generate`가 설치 시
> 자동으로 실행되지 않기 때문에 `Cannot find module '.prisma/client/default'` 에러가 날 수
> 있다. 이 에러가 나면 아래 명령으로 Prisma client를 다시 생성한다.
>
> ```bash
> # 📍 위치: C:\project\shop-monorepo-mobile (루트)
> pnpm --filter @my-project/database exec npx prisma generate
> ```

```bash
# 📍 위치: C:\project\shop-monorepo-mobile (루트)
pnpm dev
```

> **테스트 전에 해당 계정이 DB에 실제로 있는지 먼저 확인한다.** `admin@test.com` 계정이 DB에
> 없으면(시드가 안 되어 있거나 DB를 새로 만든 경우) "이메일 또는 비밀번호가 올바르지 않습니다"
> 에러가 난다. 이 경우 먼저 `apps/web`을 브라우저로 열어 회원가입 페이지에서
> `admin@test.com` / `123456`으로 **직접 회원가입을 한 번 해둔 뒤** 아래 테스트를 진행한다.

브라우저(또는 Postman/Thunder Client)로 `http://localhost:3000/api/mobile/auth/login`에 테스트 계정
(`admin@test.com` / `123456`)으로 POST 요청을 보내 토큰이 응답되는지 확인한다.

```cmd
curl -X POST http://localhost:3000/api/mobile/auth/login -H "Content-Type: application/json" -d "{\"email\":\"admin@test.com\",\"password\":\"123456\"}"
```

토큰과 사용자 정보가 JSON으로 응답되면 정상이다.

---

