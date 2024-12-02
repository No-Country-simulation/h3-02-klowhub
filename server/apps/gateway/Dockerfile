FROM node:20-alpine AS base
RUN npm install -g npm@10.9.1

FROM base AS deps
RUN apk add --no-cache g++ make py3-pip libc6-compat
WORKDIR /app

COPY package.json package-lock.json tsconfig.json ./
RUN npm ci --ignore-scripts

# Fase de Construcción
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/tsconfig.json ./tsconfig.json
COPY . .

RUN npm run build && npm prune --production

# Fase de producción
FROM base AS production
WORKDIR /app

# Declaración de los ARGs (se pasarán desde GitHub Actions)
ARG USERS_MICROSERVICE_HOST
ARG COURSES_MICROSERVICE_HOST
ARG UPLOAD_MICROSERVICE_HOST
ARG JWT_SECRET

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=3000
ENV USERS_MICROSERVICE_HOST=$USERS_MICROSERVICE_HOST
ENV USERS_MICROSERVICE_PORT=4441
ENV COURSES_MICROSERVICE_HOST=$COURSES_MICROSERVICE_HOST
ENV COURSES_MICROSERVICE_PORT=3002
ENV UPLOAD_MICROSERVICE_HOST=$UPLOAD_MICROSERVICE_HOST
ENV UPLOAD_SERVICE_PORT=3003
ENV JWT_SECRET=$JWT_SECRET
ENV FRONTEND_URL=https://klowhub-824410275969.southamerica-east1.run.app

# Configuración de usuario no-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001 && \
    chown -R nestjs:nodejs /app

# Copiar archivos relevantes de la fase de construcción
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package.json ./
COPY /protos ./protos

USER nestjs

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
