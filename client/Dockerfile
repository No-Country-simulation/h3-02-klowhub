FROM node:20-alpine AS deps
RUN apk add --no-cache g++ make py3-pip libc6-compat
WORKDIR /app
RUN npm install -g pnpm@9.7.0 typescript
COPY tsconfig.json types.d.ts package.json pnpm-lock.yaml postcss.config.cjs ./
RUN pnpm install --ignore-scripts --prod --frozen-lockfile --prefer-offline

FROM deps AS builder
WORKDIR /app
RUN pnpm install --ignore-scripts --frozen-lockfile --legacy-peer-deps
COPY . .
RUN pnpm run build && pnpm prune --prod

FROM node:20-alpine AS production
RUN apk add --no-cache libc6-compat
WORKDIR /app

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001 && \
    chown -R nestjs:nodejs /app

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NODE_ENV=production
ENV PORT=8080

# Copia los archivos de la etapa de construcción
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/postcss.config.cjs ./
COPY --from=builder /app/package.json ./
COPY --from=builder /app/public ./public

USER nestjs

EXPOSE 3000

CMD ["pnpm", "start"]
