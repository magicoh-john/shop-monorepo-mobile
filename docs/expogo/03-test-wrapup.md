> 📖 이 문서는 GUIDE.md를 3개로 나눈 시리즈 중 **3/3**입니다. ← 이전: [02-screens.md](02-screens.md)

## 8. STEP 7 — 실기기 테스트

```bash
# 📍 위치: C:\project\shop-monorepo-mobile (루트)
pnpm dev
```

```bash
# 📍 위치: C:\project\shop-monorepo-mobile (루트, 다른 터미널)
pnpm --filter mobile start
```

체크리스트:

- [ ] 스마트폰과 PC가 같은 Wi-Fi에 연결되어 있는가
- [ ] `apps/mobile/.env`의 `EXPO_PUBLIC_API_URL`이 실제 LAN IP로 되어 있는가 (`localhost` 아님)
- [ ] `admin@test.com` / `123456`으로 로그인 → 토큰 저장 확인
- [ ] 상품 목록 → 상세 화면 이동
- [ ] 장바구니에 담기 → 장바구니 화면에서 확인 → 삭제까지 동작

---

## 9. 마무리 — PWA와 비교 회고

같은 백엔드를 두고 두 가지 모바일 접근 방식을 모두 경험했다(PWA는 이전 버전에서, RN은 이번에).
다음 질문에 직접 답을 정리해보면 포트폴리오 면접에서 트레이드오프를 설명하는 연습이 된다.

1. PWA는 코드를 거의 재사용했는데, RN은 화면 코드를 전부 새로 짰다. 왜 그런 차이가 생겼는가?
2. NextAuth(쿠키 세션)는 왜 RN에서 그대로 쓸 수 없었는가? JWT 방식은 무엇을 해결했는가?
3. `apps/mobile`을 모노레포 안에 두니 `packages/types`를 그대로 import할 수 있었다. 만약
   별도 저장소였다면 이 타입들을 어떻게 동기화했을까?
4. 만약 이 쇼핑몰을 실제 서비스로 출시한다면, PWA와 RN 중 어떤 선택을 하겠는가? (둘 다일 수도 있다)

---

## 부록 — 전체 명령어 모음 (위치별)

```bash
# 📍 C:\project\shop-monorepo-mobile\apps
pnpm create expo-app@latest mobile

# 📍 C:\project\shop-monorepo-mobile (루트)
pnpm install
pnpm add jose --filter web
pnpm dev
pnpm add @my-project/types --filter mobile
pnpm add zod@^4.4.3 --filter mobile

# 📍 C:\project\shop-monorepo-mobile\apps\mobile
npx expo install expo-secure-store

# 📍 C:\project\shop-monorepo-mobile (루트)
pnpm add react-hook-form@^7.76.1 @hookform/resolvers@^5.4.0 --filter mobile
pnpm add @tanstack/react-query@^5.100.14 --filter mobile
pnpm add zustand@^5.0.14 --filter mobile

# 📍 C:\project\shop-monorepo-mobile\apps\mobile
npx expo install @react-native-async-storage/async-storage

# 📍 C:\project\shop-monorepo-mobile (루트)
pnpm --filter mobile start
```
