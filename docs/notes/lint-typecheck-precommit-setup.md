# 이 프로젝트의 ESLint·타입체크·커밋훅은 왜, 무엇을, 어떻게 검증하는가

## 1. 왜 필요한가 — 도입이 늦어지면 무슨 일이 벌어지는가

이 프로젝트는 `apps/web`에 ESLint 자체가 설치되어 있지 않은 상태로 한동안 개발이 진행됐다. `lint`/`typecheck` 스크립트도, git 커밋 시점 검증도 없었다.

뒤늦게 ESLint를 도입해서 처음 `pnpm --filter web run lint`를 돌려보니, 기존 코드에서 **오류 11건, 경고 92건**이 한꺼번에 쏟아졌다(`any` 타입 사용, `<img>` 대신 `next/image` 미사용 등). 이 오류들은 새로 작성된 코드가 아니라 이미 커밋되어 있던 코드에서 나온 것이다.

여기서 얻은 교훈: **린트·타입체크·커밋훅은 "나중에 추가하는 옵션"이 아니라 "프로젝트 시작 시점에 갖춰야 하는 인프라"**다. 코드가 0줄일 때 도입하면 위반사항도 0건이지만, 코드가 쌓인 뒤 도입하면 그동안의 위반사항을 한꺼번에 떠안게 된다.

## 2. 무엇인가 — 두 개의 검증 계층

검증이 일어나는 시점에 따라 강제력이 다른 두 계층으로 나뉜다.

| 계층 | 시점 | 강제력 | 우회 가능성 |
|---|---|---|---|
| 에디터(저장 시) | 파일을 저장하는 순간 | 편의 — 사람이 바로 알아채게 도와줄 뿐 | VSCode를 안 쓰거나 확장 미설치 시 무력화 |
| git(커밋 시) | `git commit` 실행 순간 | 강제 — 오류가 있으면 커밋 자체가 거부됨 | `git commit --no-verify`로 우회 가능 |

TypeScript 타입 오류는 VSCode가 `apps/web/tsconfig.json`만 있으면 **이미 실시간으로**(저장과 무관하게 타이핑 즉시) 빨간 줄로 보여준다. 별도 설정이 필요한 건 **ESLint 자동 수정을 저장 시 실행**하는 부분이다.

## 3. 어떻게 쓰는가 — 실제 설정

### 3-1. ESLint 설정 — 왜 `next lint`가 아닌가

이 프로젝트의 Next.js `16.2.6`은 `next lint` 명령이 완전히 제거됐다(Next.js 공식 문서: "Starting with Next.js 16, `next lint` is removed"). 그래서 ESLint CLI를 flat config로 직접 구성했다.

루트의 [`eslint.config.mjs`](../../eslint.config.mjs)에서 `apps/web`에만 `eslint-config-next`(core-web-vitals + typescript)를 적용하고, `apps/mobile`(자체 `eslint-config-expo` 보유)과 `packages/*`는 제외한다.

```js
// eslint.config.mjs (루트)
{
  files: ["apps/web/**/*.{js,jsx,ts,tsx}"],
  extends: [...nextVitals, ...nextTs],
  settings: { next: { rootDir: "apps/web/" } },
}
```

`apps/web/package.json`에는 `lint`(`eslint .`), `typecheck`(`tsc --noEmit`) 스크립트가 있다.

### 3-2. git 커밋 시 강제 — husky + lint-staged

`.husky/pre-commit`이 `npx lint-staged`를 실행하고, 루트의 [`lint-staged.config.mjs`](../../lint-staged.config.mjs)가 무엇을 검사할지 정의한다.

```js
export default {
  "apps/web/**/*.{js,jsx,ts,tsx}": ["eslint --fix"],
  "apps/web/**/*.{ts,tsx}": () => "pnpm --filter web run typecheck",
};
```

ESLint는 **스테이징된 파일만** 검사한다. TypeScript는 파일 단위 검사가 불가능(프로젝트 전체 타입 컨텍스트 필요)하므로, `.ts`/`.tsx` 파일이 하나라도 스테이징되면 `apps/web` 전체에 대해 `tsc --noEmit`을 1회 실행한다. 둘 중 하나라도 오류가 있으면 커밋이 차단된다.

### 3-3. 에디터 저장 시 자동 수정 — `.vscode/`

[`.vscode/settings.json`](../../.vscode/settings.json)이 저장 시 ESLint 자동 수정을 켜고, [`.vscode/extensions.json`](../../.vscode/extensions.json)이 ESLint 확장을 추천한다. 둘 다 커밋되어 있어서 이 저장소를 여는 모든 사람이 같은 동작을 갖는다.

이건 git 훅과 달리 **강제력이 없다** — VSCode가 아닌 에디터를 쓰거나 확장을 설치하지 않으면 그냥 동작하지 않는다. 빠른 피드백을 위한 보조 장치일 뿐, 진짜 안전망은 3-2의 git 훅이다.

## 참고 — 아직 갖추지 않은 것

- **GitHub Actions CI**: push/PR 시점에 서버 쪽에서 다시 검증하는 워크플로우가 없다. `git commit --no-verify`로 로컬 훅을 우회하면 잡아낼 방법이 없다.
- **브랜치 보호 규칙**: `main` 머지 전 체크 통과를 강제하는 GitHub 설정이 없다.

이 둘을 추가하면 "로컬에서 정직하게 커밋하면 걸린다" 수준에서 "우회해도 결국 걸린다" 수준으로 강제력이 한 단계 올라간다.
