# Fase de dependencias
FROM node:20-alpine AS deps
RUN apk add --no-cache g++ make py3-pip libc6-compat
WORKDIR /app

COPY package.json package-lock.json tsconfig.json ./
RUN npm ci --only=production

# Fase de Construcción
FROM deps AS builder
WORKDIR /app
COPY package.json package-lock.json tsconfig.json ./
RUN npm ci --legacy-peer-deps  
COPY . ./
RUN npm run build  
RUN npm prune --production 


# Fase de producción
FROM node:20-alpine AS production
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Configuración de usuario no-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001 && \
    chown -R nestjs:nodejs /app

# Declaración de los ARGs (se pasarán desde GitHub Actions)
ARG NODE_ENV=production
ARG PORT=3000
ARG USERS_MICROSERVICE_HOST=0.0.0.0
ARG USERS_SERVICE_PORT=3001
ARG COURSES_SERVICE_HOST=0.0.0.0
ARG COURSES_SERVICE_PORT=3002
ARG UPLOAD_MICROSERVICE_HOST=0.0.0.0
ARG UPLOAD_SERVICE_PORT=3003
ARG JWT_SECRET
ARG FRONTEND_URL

# Variables de entorno
ENV NODE_ENV=$NODE_ENV
ENV PORT=$PORT
ENV USERS_MICROSERVICE_HOST=$USERS_MICROSERVICE_HOST
ENV USERS_SERVICE_PORT=$USERS_SERVICE_PORT
ENV COURSES_SERVICE_HOST=$COURSES_SERVICE_HOST
ENV COURSES_SERVICE_PORT=$COURSES_SERVICE_PORT
ENV UPLOAD_MICROSERVICE_HOST=$UPLOAD_MICROSERVICE_HOST
ENV UPLOAD_SERVICE_PORT=$UPLOAD_SERVICE_PORT
ENV JWT_SECRET=$JWT_SECRET
ENV FRONTEND_URL=$FRONTEND_URL

# Copiar archivos relevantes de la fase de construcción
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package.json ./

USER nestjs

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
