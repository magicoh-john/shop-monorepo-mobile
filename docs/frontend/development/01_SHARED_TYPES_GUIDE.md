# 공유 타입 가이드 (@bridgeai/shared-types)

> **버전**: 1.0
> **최종 업데이트**: 2026-02-13
> **상태**: Active

---

## 1. 개요

`@bridgeai/shared-types`는 프론트엔드 앱과 BFF에서 공통으로 사용하는 TypeScript 타입을 정의한다.

---

## 2. 파일 구조

```
packages/shared-types/src/
├── index.ts           # 전체 export
├── auth.ts            # LoginRequest, LoginResponse, UserInfo, UserRole
├── instructor.ts      # InstructorDto, InstructorGrade, ApprovalStatus
├── client.ts          # ClientDto, ClientType, EducationRequestDto
├── dispatch.ts        # DispatchDto, ContractDto, SettlementDto, EvaluationDto
└── common.ts          # ApiResponse<T>, PageResponse<T>, ErrorResponse
```

---

## 3. Backend ↔ Frontend 타입 매핑

| Backend (Java) | Frontend (TypeScript) |
|:---|:---|
| `InstructorDetailResponse` | `InstructorDto` |
| `ClientDetailResponse` | `ClientDto` |
| `DispatchDetailResponse` | `DispatchDto` |

**규칙**: Backend는 `~Response`, Frontend는 `~Dto`

---

## 4. 타입 수정 워크플로우

```
1. packages/shared-types/src/xxx.ts 수정
2. pnpm --filter @bridgeai/shared-types build   (또는 dev 모드에서 자동)
3. 사용하는 앱에서 import 확인
4. pnpm type-check 으로 전체 타입 검증
```

---

## 5. 새 타입 추가 시

1. 해당 도메인 파일에 타입 정의 (예: `instructor.ts`)
2. `index.ts`에 export 추가
3. 빌드 후 사용하는 앱에서 import

---

## 변경 이력

| 버전 | 날짜 | 변경 내용 |
|:---|:---|:---|
| 1.0 | 2026-02-13 | 초기 문서 작성 |
