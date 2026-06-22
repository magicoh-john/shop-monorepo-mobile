# PACKAGE-LIFECYCLE-SCRIPTS.md — `pnpm install` 시 자동 실행되는 스크립트

**최종 수정**: 2026-06-22
**목적**: `package.json`의 lifecycle 스크립트(`postinstall` 등)가 왜 중요한지 이해하고, 이 프로젝트에 적용할 때 어떻게 설정하는지 안다.

---

## 1. 왜 필요한가

방금 겪은 일을 떠올려보자.

`pnpm dev`를 실행했더니 이런 에러가 났다.

```
Error: Cannot find module '.prisma/client/default'
```

원인은 코드 버그가 아니었다. `pnpm install`은 `node_modules`에 패키지 파일들을 내려받기만 했을 뿐, Prisma가 스키마(`schema.prisma`)를 기반으로 **실제 사용할 클라이언트 코드를 생성하는 단계**(`prisma generate`)는 별도로 실행해야 했다. 이걸 사람이 기억해서 따로 실행해야 하는 구조였고, 그걸 안 하니 에러가 났다.

이런 "설치 후 한 단계 더 필요한" 패키지가 Prisma만 있는 게 아니다. 그리고 이 한 단계를 사람이 기억하는 방식은 반드시 깨진다.

- 새 팀원이 레포를 클론하고 `pnpm install`만 실행하고 바로 `pnpm dev`를 돌린다
- 기존 팀원이 `node_modules`를 지우고 재설치한다
- CI/CD 서버가 빌드 전에 `pnpm install`을 실행한다
- 교육 환경이라면 수강생 여러 명이 각자 PC에서 같은 실수를 반복한다

이 모든 경우에 "그 다음에 `prisma generate`도 실행해야 한다"는 사실을 README나 CLAUDE.md에 적어둬도, 안 보고 넘어가면 그대로 에러가 난다. **사람이 기억해야 하는 단계는 설정으로 자동화하는 게 맞다.**

## 2. 무엇인가

`package.json`의 `scripts`에는 npm/pnpm이 특정 시점에 **자동으로** 실행해주는 예약된 이름들이 있다. 이를 **lifecycle 스크립트**라고 부른다.

가장 많이 쓰는 것:

| 스크립트 이름 | 실행 시점 |
| --- | --- |
| `preinstall` | `install` 시작 **직전** |
| `postinstall` | `install` 완료 **직후** |
| `prepare` | `install` 직후 (git hooks 설정 등에도 쓰임) |

즉 `postinstall`에 `prisma generate`를 적어두면, **누가 `pnpm install`을 실행하든 그 즉시 Prisma 클라이언트도 같이 생성된다.** 사람이 따로 기억할 필요가 없어진다.

## 3. 어떻게 쓰는가

`packages/database/package.json`의 `scripts`에 추가한다.

```json
{
  "scripts": {
    "postinstall": "prisma generate"
  }
}
```

pnpm workspace 구조에서는 **루트에서 `pnpm install`을 한 번만 실행해도** 하위 워크스페이스(`packages/database`)의 `postinstall`까지 함께 실행된다. `apps/web`에서 따로 처리할 필요는 없다.

### 적용 후 동작 확인

```bash
# node_modules와 생성된 클라이언트를 지우고 재현
rm -rf node_modules packages/database/node_modules

# 설치만 실행 — postinstall이 자동으로 prisma generate까지 실행하는지 확인
pnpm install
```

설치 로그에 `prisma generate` 실행 결과(`✔ Generated Prisma Client ...`)가 자동으로 찍히면 정상 적용된 것이다.

## 4. 참고 — 이 설정이 막지 못하는 것

`postinstall`은 **"내 패키지의 `package.json`"**에 적은 스크립트만 자동 실행한다. `schema.prisma` 자체를 수정한 뒤 DB에 반영하는 **마이그레이션**(`prisma migrate dev`)은 별도 명령이며 자동화 대상이 아니다. 마이그레이션은 DB 스키마를 바꾸는 행위라 실행 시점을 사람이 판단해야 하기 때문이다.

- 의존성 설치 → 클라이언트 코드 생성: `postinstall`로 자동화 ✅
- DB 스키마 변경 반영: `prisma migrate dev`는 여전히 수동 실행 (CLAUDE.md의 Commands 섹션 참고)
