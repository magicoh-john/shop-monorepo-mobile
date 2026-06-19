
# ---- 1단계: 의존성 설치 ----
FROM node:20-alpine AS deps
RUN corepack enable && corepack prepare pnpm@10.27.0 --activate
WORKDIR /app

# 모노레포 전체 패키지 파일 복사 (워크스페이스 의존성 설치에 필요)
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/web/package.json ./apps/web/
COPY packages/database/package.json ./packages/database/
COPY packages/types/package.json ./packages/types/

RUN pnpm install --frozen-lockfile

# ---- 2단계: 빌드 ----
FROM node:20-alpine AS builder
RUN corepack enable && corepack prepare pnpm@10.27.0 --activate
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/web/node_modules ./apps/web/node_modules
COPY --from=deps /app/packages/database/node_modules ./packages/database/node_modules
COPY . .

# Prisma 클라이언트 생성 (빌드 전 필수)
# DATABASE_URL: prisma generate는 DB에 연결하지 않지만 prisma.config.ts가 undefined를 허용하지 않아 더미값 필요
RUN DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy" pnpm --filter @my-project/database exec npx prisma generate

ENV NODE_ENV=production
RUN pnpm --filter web build

# ---- 3단계: 실행 이미지 ----
FROM node:20-alpine AS runner
RUN corepack enable && corepack prepare pnpm@10.27.0 --activate
WORKDIR /app

ENV NODE_ENV=production

# 실행에 필요한 파일만 복사
COPY --from=builder /app/apps/web/.next ./apps/web/.next
COPY --from=builder /app/apps/web/public ./apps/web/public
COPY --from=builder /app/apps/web/package.json ./apps/web/
COPY --from=builder /app/apps/web/server.ts ./apps/web/
COPY --from=builder /app/packages ./packages
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/web/node_modules ./apps/web/node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-workspace.yaml ./

EXPOSE 3000
WORKDIR /app

CMD ["pnpm", "--filter", "web", "start"]