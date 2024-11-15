FROM node:20-alpine AS base
RUN apk add --no-cache g++ make py3-pip libc6-compat
WORKDIR /app
RUN npm install -g pnpm@9.7.0
COPY package.json pnpm-lock.yaml ./

FROM base AS builder
WORKDIR /app
COPY . .
RUN pnpm install
RUN pnpm build

FROM base as production
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs

# Copia los archivos de la etapa de construcción
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/package.json ./
COPY --from=builder /app/public ./public

EXPOSE 8080

CMD ["pnpm", "start"]
