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

ARG COURSES_SERVICE_HOST
ARG JWT_SECRET
ARG MONGO_URI

# Variables de entorno
ENV NODE_ENV=production
ENV COURSES_SERVICE_HOST=0.0.0.0
ENV COURSES_MICROSERVICE_PORT=3002
ENV JWT_SECRET=$JWT_SECRET
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

USER nestjs

EXPOSE 3002

CMD ["npm", "run", "start:prod"]
