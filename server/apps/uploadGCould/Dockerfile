FROM node:20-alpine AS base
RUN npm install -g npm@10.9.1

FROM base AS deps
RUN apk add --no-cache g++ make py3-pip libc6-compat
WORKDIR /app

COPY gccKey.json package.json package-lock.json tsconfig.json ./
RUN npm ci --ignore-scripts

# Fase de Construcción
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/tsconfig.json ./tsconfig.json
COPY . .

# Declaración de los ARGs (se pasarán desde GitHub Actions)
ARG UPLOAD_MICROSERVICE_HOST
ARG MONGO_URI
ARG PROJECT_ID
ARG BUCKET_NAME

# Variables de entorno
ENV NODE_ENV=production
ENV UPLOAD_MICROSERVICE_HOST=$UPLOAD_MICROSERVICE_HOST
ENV UPLOAD_SERVICE_PORT=3003
ENV PROJECT_ID=$PROJECT_ID
ENV BUCKET_NAME=$BUCKET_NAME
ENV MONGO_URI=$MONGO_URI

RUN npm run build && npm prune --production

# Fase de producción
FROM base AS production
WORKDIR /app

# Configuración de usuario no-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001 && \
    chown -R nestjs:nodejs /app

# Copiar archivos relevantes de la fase de construcción
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package.json ./
COPY gccKey.json ./
COPY /protos ./protos

USER nestjs

EXPOSE 3003

CMD ["npm", "run", "start:prod"]
