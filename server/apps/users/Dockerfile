FROM node:20-alpine AS base

FROM base AS deps
RUN apk add --no-cache g++ make py3-pip libc6-compat
WORKDIR /app
COPY package.json package-lock.json tsconfig.json ./
RUN npm install -g npm@10.9.1
RUN npm install

# Fase de Construcción
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/tsconfig.json ./tsconfig.json
COPY . .

RUN npm install -g npm@10.9.1
RUN npm run build && npm prune --production
    
# Fase de producción
FROM base AS production
WORKDIR /app
RUN npm install -g npm@10.9.1

ARG USERS_MICROSERVICE_HOST
ARG POSTGRES_DB_NAME
ARG POSTGRES_DB_HOST
ARG POSTGRES_DB_PASSWORD
ARG POSTGRES_DB_USER
ARG JWT_SECRET
ARG SMTP_USER
ARG SMTP_PASS
ARG SMTP_HOST
ARG SMTP_PORT
ARG SMTP_SECURE
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET
ARG GOOGLE_CALLBACK_URL
ARG POSTGRES_URL
ARG MONGO_URI

# Variables de entorno
ENV NODE_ENV=production
ENV POSTGRES_DB_NAME=$POSTGRES_DB_NAME
ENV POSTGRES_DB_HOST=$POSTGRES_DB_HOST
ENV POSTGRES_DB_PASSWORD=$POSTGRES_DB_PASSWORD
ENV POSTGRES_DB_USER=$POSTGRES_DB_USER
ENV USERS_MICROSERVICE_HOST=users
ENV USERS_MICROSERVICE_PORT=4441
ENV JWT_SECRET=$JWT_SECRET
ENV SMTP_USER=$SMTP_USER
ENV SMTP_PASS=$SMTP_PASS
ENV SMTP_HOST=$SMTP_HOST
ENV SMTP_PORT=$SMTP_PORT
ENV SMTP_SECURE=$SMTP_SECURE
ENV GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID
ENV GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET
ENV GOOGLE_CALLBACK_URL=$GOOGLE_CALLBACK_URL
ENV POSTGRES_URL=$POSTGRES_URL
ENV MONGO_URI=$MONGO_URI

# Configuración de usuario no-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001 && \
    chown -R nestjs:nodejs /app

# Copiar archivos relevantes de la fase de construcción
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package.json ./

USER nestjs

EXPOSE 4441

CMD ["npm", "run", "start:prod"]
