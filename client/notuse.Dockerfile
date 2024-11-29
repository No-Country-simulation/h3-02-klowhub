FROM node:20-alpine AS base

FROM base AS deps
RUN apk add --no-cache g++ make py3-pip libc6-compat
WORKDIR /app
RUN npm install -g pnpm@9.7.0 typescript
COPY package.json pnpm-lock.yaml postcss.config.cjs tsconfig.json next.config.mjs ./

FROM deps AS builder
WORKDIR /app
RUN npm install -g pnpm@9.7.0 typescript
COPY . .
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_APP_URL=https://klowhub-824410275969.southamerica-east1.run.app
ENV NODE_ENV=production
ENV PORT=8080

RUN pnpm install --ignore-scripts
RUN pnpm build

FROM base AS production
RUN apk add --no-cache libc6-compat
WORKDIR /app

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001 && \
    chown -R nextjs:nodejs /app

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NODE_ENV=production
ENV PORT=8080

# Copia los archivos de la etapa de construcción
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/postcss.config.cjs ./
COPY --from=builder /app/package.json ./
COPY --from=builder /app/public ./public

USER nextjs

EXPOSE 3000

CMD ["pnpm", "start"]
