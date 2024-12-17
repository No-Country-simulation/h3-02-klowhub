FROM node:20-alpine AS base

FROM base AS deps
RUN apk add --no-cache g++ make py3-pip libc6-compat
WORKDIR /app
RUN npm install -g pnpm@9.7.0
COPY package.json pnpm-lock.yaml postcss.config.cjs tsconfig.json next.config.mjs tailwind.config.cjs ./
RUN pnpm install --prefer-frozen-lockfile --ignore-scripts

FROM base AS builder
WORKDIR /app
RUN npm install -g pnpm@9.7.0
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/next.config.mjs ./next.config.mjs
COPY --from=deps /app/postcss.config.cjs ./postcss.config.cjs
COPY --from=deps /app/tsconfig.json ./tsconfig.json
COPY --from=deps /app/tailwind.config.cjs ./tailwind.config.cjs
COPY . .

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_APP_URL=https://klowhub-800663783731.southamerica-east1.run.app
ENV NODE_ENV=production
ENV PORT=4002

RUN pnpm build && pnpm prune --prod --ignore-scripts

FROM base AS production
RUN npm install -g pnpm@9.7.0
WORKDIR /app

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001 && \
    chown -R nextjs:nodejs /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 4002

CMD ["pnpm", "start"]
