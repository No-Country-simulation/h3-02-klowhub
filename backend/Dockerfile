# Fase Base
FROM node:20-alpine AS base
RUN apk add --no-cache g++ make py3-pip libc6-compat
WORKDIR /app
RUN npm install -g typescript @nestjs/cli

# Fase de Construcción
FROM base AS builder
WORKDIR /app
COPY package.json package-lock.json tsconfig.json ./
COPY ./src ./src
COPY ./test ./test
RUN npm ci
# Declaración de los ARGs (se pasaran desde GitHub Actions)
ARG POSTGRES_URL
ARG POSTGRES_PRISMA_URL
ARG POSTGRES_URL_NO_SSL
ARG POSTGRES_USER
ARG POSTGRES_HOST
ARG POSTGRES_PASSWORD
ARG POSTGRES_DATABASE
# Variables de entorno
ENV POSTGRES_URL=$POSTGRES_URL
ENV POSTGRES_PRISMA_URL=$POSTGRES_PRISMA_URL
ENV POSTGRES_URL_NO_SSL=$POSTGRES_URL_NO_SSL
ENV POSTGRES_USER=$POSTGRES_USER
ENV POSTGRES_HOST=$POSTGRES_HOST
ENV POSTGRES_PASSWORD=$POSTGRES_PASSWORD
ENV POSTGRES_DATABASE=$POSTGRES_DATABASE
ENV NODE_ENV=production
ENV PORT=3000
RUN npm run build

# Fase de Producción
FROM base AS production
WORKDIR /app
# Declaración de los ARGs (se pasaran desde GitHub Actions)
ARG POSTGRES_URL
ARG POSTGRES_PRISMA_URL
ARG POSTGRES_URL_NO_SSL
ARG POSTGRES_USER
ARG POSTGRES_HOST
ARG POSTGRES_PASSWORD
ARG POSTGRES_DATABASE
# Variables de entorno
ENV POSTGRES_URL=$POSTGRES_URL
ENV POSTGRES_PRISMA_URL=$POSTGRES_PRISMA_URL
ENV POSTGRES_URL_NO_SSL=$POSTGRES_URL_NO_SSL
ENV POSTGRES_USER=$POSTGRES_USER
ENV POSTGRES_HOST=$POSTGRES_HOST
ENV POSTGRES_PASSWORD=$POSTGRES_PASSWORD
ENV POSTGRES_DATABASE=$POSTGRES_DATABASE
ENV NODE_ENV=production
ENV PORT=3000

# Copiar archivos relevantes de la fase de construcción
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src ./src

RUN addgroup -g 1001 -S nodejs && adduser -S nestjs -u 1001
USER nestjs

EXPOSE 3000

CMD ["npm", "run", "start:prod"]