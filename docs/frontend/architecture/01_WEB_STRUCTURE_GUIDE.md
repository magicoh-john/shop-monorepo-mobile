# 웹 구조 가이드

> **버전**: 1.0
> **최종 업데이트**: 2026-02-13
> **상태**: Active

---

## 1. Next.js App Router 구조

### admin-web (핵심 앱)

```
apps/admin-web/
├── app/
│   ├── layout.tsx                 # 루트 레이아웃
│   ├── page.tsx                   # → /admin/dashboard 리다이렉트
│   │
│   ├── (auth)/                    # 인증 라우트 그룹
│   │   └── login/
│   │       └── page.tsx
│   │
│   ├── admin/                     # 관리자 라우트
│   │   ├── layout.tsx             # 사이드바 레이아웃
│   │   ├── dashboard/page.tsx
│   │   ├── instructors/page.tsx
│   │   ├── clients/page.tsx
│   │   ├── dispatches/page.tsx
│   │   ├── contracts/page.tsx
│   │   ├── settlements/page.tsx
│   │   ├── evaluations/page.tsx
│   │   └── settings/page.tsx
│   │
│   ├── _components/               # 페이지 전용 컴포넌트
│   ├── _lib/api/                  # API 호출 함수
│   └── _contexts/                 # React Context
│
├── public/                        # 정적 자산
├── next.config.js
├── tsconfig.json
└── package.json
```

---

## 2. 라우트 구성 규칙

| 규칙 | 설명 | 예시 |
|:---|:---|:---|
| 라우트 그룹 `()` | URL에 영향 없는 그룹 | `(auth)/login` → `/login` |
| Private 폴더 `_` | 라우팅에서 제외 | `_components/`, `_lib/` |
| 동적 라우트 `[]` | 파라미터 | `[id]/page.tsx` |
| 레이아웃 | 하위 라우트 공유 | `admin/layout.tsx` |

---

## 3. 각 앱 역할

| 앱 | 대상 사용자 | 핵심 페이지 |
|:---|:---|:---|
| company-web | 일반 방문자 | 서비스 소개, 상담 신청 |
| association-web | 강사 지원자 | 협회 소개, 가입 신청 |
| admin-web | 어드민, 강사 | 대시보드, 강사/수요처/파견 관리 |

---

## 4. API 호출 패턴

```
Next.js (CSR/SSR)
    │  fetch / axios
    ▼
BFF (NestJS :4000)
    │  axios
    ▼
Backend (Spring Boot :8080)
```

프론트엔드는 **반드시 BFF를 통해** 백엔드에 접근한다. 직접 Spring Boot API를 호출하지 않는다.

---

## 변경 이력

| 버전 | 날짜 | 변경 내용 |
|:---|:---|:---|
| 1.0 | 2026-02-13 | 초기 문서 작성 |
