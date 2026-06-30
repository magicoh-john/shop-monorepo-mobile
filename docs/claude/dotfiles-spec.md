# Dotfiles 저장소 스펙

작성일: 2026-06-30

---

## 1. 왜 필요한가

Claude Code 설정(전역 지시문, 스킬, 서브에이전트, 커스텀 명령어)은 로컬 PC의
`~/.claude/`에 저장된다. 집 PC와 회사 PC는 별개 환경이므로 한쪽에서 만든 설정이
다른 쪽에 반영되지 않는다.

GitHub 저장소에 보관하고 각 PC에서 심볼릭 링크로 연결하면, 어느 PC에서 수정해도
push/pull 한 번으로 모든 환경이 동기화된다.

---

## 2. 관리 대상

### 포함
| 경로 | 설명 |
|---|---|
| `~/.claude/CLAUDE.md` | 모든 프로젝트에 적용되는 전역 지시문 |
| `~/.claude/settings.json` | Claude Code 전역 설정 |
| `~/.claude/commands/` | 커스텀 슬래시 명령어 (레거시, 호환 유지) |
| `~/.claude/skills/` | 커스텀 스킬 (`~/.claude/skills/<이름>/SKILL.md`) |
| `~/.claude/agents/` | 커스텀 서브에이전트 (`~/.claude/agents/<이름>.md`) |

### 제외
| 경로 | 제외 이유 |
|---|---|
| `~/.claude/projects/` | 프로젝트별 메모리 — 민감·개인 정보 포함 가능 |
| `~/.claude/sessions/` | 세션 기록 — 임시 데이터 |
| `~/.claude/cache/` | 캐시 — 재생성 가능 |
| `~/.claude/history.jsonl` | 대화 이력 — 민감 정보 포함 가능 |

---

## 3. 저장소 구조

```
dotfiles/                          ← GitHub 저장소 루트
└── claude/                        ← ~/.claude/ 미러
    ├── CLAUDE.md
    ├── settings.json
    ├── commands/
    │   └── start.md
    ├── skills/
    │   └── <skill-name>/
    │       └── SKILL.md
    └── agents/
        └── <agent-name>.md
```

---

## 4. 설치 절차 (새 PC)

> ⚠️ `~/.claude` 전체를 심볼릭 링크로 교체하는 방식은 `.credentials.json`(OAuth 토큰)이
> git 작업 트리에 편입되어 `git clean` 한 번으로 토큰이 삭제되는 사고를 유발한다.
> 반드시 아래 **개별 링크** 방식을 사용한다.

### Windows (PowerShell)

```powershell
# 1. 저장소 clone
git clone https://github.com/<본인>/dotfiles "$env:USERPROFILE\dotfiles"

# 2. Claude Code 실행 후 로그인 (~/.claude 와 .credentials.json 자동 생성)
claude

# 3. 설치 스크립트 실행 (개별 링크 자동 생성 + 검증)
& "$env:USERPROFILE\dotfiles\install.ps1"
```

### macOS / Linux

```bash
df=~/dotfiles/claude
live=~/.claude
mkdir -p "$live"

# 파일: 하드링크
ln "$df/CLAUDE.md"     "$live/CLAUDE.md"
ln "$df/settings.json" "$live/settings.json"

# 디렉터리: 심볼릭 링크
ln -s "$df/commands" "$live/commands"
ln -s "$df/skills"   "$live/skills"
ln -s "$df/agents"   "$live/agents"
```

이후 Claude Code를 재시작하면 전역 설정(`CLAUDE.md`, `settings.json`)이 적용된다.

---

## 5. 업데이트 워크플로우

```bash
# 어느 PC에서 설정을 수정한 후
git -C ~/dotfiles add .
git -C ~/dotfiles commit -m "feat: 스킬 추가 - summarize-changes"
git -C ~/dotfiles push

# 다른 PC에서 동기화
git -C ~/dotfiles pull
```

Claude Code는 `~/.claude/skills/`를 실시간 감지하므로 pull 후 재시작 없이 바로 반영된다.
(새 최상위 디렉토리 생성 시에는 재시작 필요 — 공식 문서 기준)

---

## 6. .gitignore

```gitignore
# Claude Code 런타임/인증 파일 — 절대 커밋 금지
claude/.credentials.json
claude/.claude.json
claude/cache/
claude/sessions/
claude/history.jsonl
claude/file-history/
claude/shell-snapshots/
claude/session-env/
claude/backups/
claude/projects/
claude/chrome/
claude/ide/
claude/mcp-needs-auth-cache.json
claude/.last-update-result.json
claude/.last-cleanup

# OS
.DS_Store
Thumbs.db
```

---

## 7. 저장소 공개 범위

**Private 권장.**
`CLAUDE.md`에 작업 스타일·프로젝트 맥락 등 개인 정보가 포함될 수 있다.
Public으로 공개할 경우 `CLAUDE.md`와 `agents/` 파일에 민감 내용이 없는지 반드시 확인한다.

---

## 8. 완료 기준

- [x] GitHub에 `dotfiles` 저장소 생성 (private)
- [x] `claude/` 디렉토리 구조 생성 및 기존 파일 이동
- [x] `install.ps1` 자동화 스크립트 작성 (사전 조건 검증 + 개별 링크 생성 + 결과 검증)
- [x] 현재 PC에 개별 링크(HardLink/Junction) 연결 후 Claude Code 정상 동작 확인
- [x] README.md에 올바른 설치 절차 기록
