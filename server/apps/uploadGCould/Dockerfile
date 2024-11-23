# Fase Base
FROM node:20-alpine AS base
RUN apk add --no-cache g++ make py3-pip libc6-compat
WORKDIR /app
# Instalar pnpm globalmente
RUN npm install -g typescript @nestjs/cli
COPY package.json package-lock.json tsconfig.json ./

# Fase de Construcción
FROM base AS builder
WORKDIR /app
COPY . ./
RUN npm ci

# Declaración de los ARGs (se pasarán desde GitHub Actions)
ARG NODE_ENV=production
ARG UPLOAD_MICROSERVICE_HOST=0.0.0.0
ARG UPLOAD_SERVICE_PORT=3003
ARG PROJECT_ID
ARG BUCKET_NAME

# Variables de entorno
ENV NODE_ENV=$NODE_ENV
ENV UPLOAD_MICROSERVICE_HOST=$UPLOAD_MICROSERVICE_HOST
ENV UPLOAD_SERVICE_PORT=$UPLOAD_SERVICE_PORT
ENV PROJECT_ID=$PROJECT_ID
ENV BUCKET_NAME=$BUCKET_NAME

# Construir el proyecto con pnpm
RUN npm run build

# Fase de Producción
FROM base AS production
WORKDIR /app

# Declaración de los ARGs (se pasarán desde GitHub Actions)
ARG NODE_ENV=production
ARG UPLOAD_MICROSERVICE_HOST=0.0.0.0
ARG UPLOAD_SERVICE_PORT=3003
ARG PROJECT_ID
ARG BUCKET_NAME

# Variables de entorno
ENV NODE_ENV=$NODE_ENV
ENV UPLOAD_MICROSERVICE_HOST=$UPLOAD_MICROSERVICE_HOST
ENV UPLOAD_SERVICE_PORT=$UPLOAD_SERVICE_PORT
ENV PROJECT_ID=$PROJECT_ID
ENV BUCKET_NAME=$BUCKET_NAME

# Configurar usuario seguro para correr la aplicación
RUN addgroup -g 1001 -S nodejs && adduser -S nestjs -u 1001
USER nestjs

# Copiar archivos relevantes de la fase de construcción
COPY --from=builder /app/package.json /app/package-lock.json /app/tsconfig.json ./
COPY --from=builder /app/dist ./dist

EXPOSE $PORT

CMD ["npm", "run", "start:prod"]
