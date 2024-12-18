# BackEnd

![Logo](https://res.cloudinary.com/ddv3ckyxa/image/upload/v1731885444/Logo_dzf5dh.png)

## Descripción

Este es un proyecto backend desarrollado con NestJS, que utiliza una arquitectura de microservicios para garantizar escalabilidad y modularidad. Está diseñado para manejar usuarios, autenticación, gestión de cursos y otras funcionalidades relacionadas. La comunicación entre microservicios se realiza mediante TCP. Este proyecto está enfocado en proporcionar una base sólida para aplicaciones web modernas con múltiples servicios distribuidos.

## Estructura del Proyecto

El proyecto está organizado en las siguientes ramas y servicios:

### Ramas

- main: Contiene la versión estable del proyecto.

- backend : Ramas para pruebas e integración de nuevas funcionalidades.

- backup-2024-12-15: Rama Backup posee la version de microservicio con prontocolo tcp.

### Servicios

- Gateway: Punto de entrada para la comunicación con los microservicios.

- Users: Microservicio para gestión de usuarios y autenticación.

- Courses: Microservicio para la creación y gestión de cursos.

### Dependencias

- @grpc/grpc-js
Implementa gRPC para aplicaciones Node.js.
Uso: Comunicación eficiente entre microservicios usando el protocolo gRPC.

- @nestjs/axios
Proporciona un módulo Axios integrado con NestJS para realizar solicitudes HTTP.
Uso: Consultar APIs externas dentro de tus microservicios o gateway.

- @nestjs/common
Contiene herramientas y clases comunes necesarias para el desarrollo de aplicaciones NestJS (decoradores, interfaces, excepciones, pipes, etc.).

- @nestjs/core
El núcleo del framework NestJS, necesario para la ejecución de la aplicación.

- @nestjs/jwt
Proporciona utilidades para manejar JWT (JSON Web Tokens) dentro de NestJS.
Uso: Autenticación y autorización mediante tokens.

 - @nestjs/microservices
Ofrece soporte para crear microservicios en diferentes patrones de comunicación (TCP, gRPC, RabbitMQ, etc.).
Uso: Desarrollo de microservicios en tu proyecto.

- @nestjs/passport
Integración de Passport.js con NestJS.
Uso: Autenticación basada en estrategias (JWT, Google, GitHub, etc.).

 - @nestjs/platform-express
Soporte para Express.js como plataforma subyacente en NestJS.
Uso: Manejo de HTTP y middleware dentro del proyecto.
cookie-parser

- Middleware para analizar cookies en solicitudes HTTP.
Uso: Lectura y manejo de cookies, como el token de autenticación.

- dotenv
Carga variables de entorno desde un archivo .env.
Uso: Configuración de entornos de desarrollo, prueba y producción.

- express
Framework minimalista para crear servidores HTTP.
Uso: NestJS lo usa como base para manejar solicitudes HTTP.

- passport
Biblioteca de autenticación con soporte para múltiples estrategias.
Uso: Manejo de autenticación (local, OAuth, etc.).

 - passport-jwt
Extensión de Passport.js para autenticación basada en JWT.
Uso: Validar y procesar JWT en tu backend.

- reflect-metadata
Necesaria para utilizar decoradores en TypeScript.
Uso: Gestión de metadatos en la aplicación.

- rxjs
Biblioteca para programación reactiva con Observables.
Uso: Gestión de flujos de datos asíncronos en NestJS.

- zod
Biblioteca para validación y esquemas de datos.
Uso: Validar datos recibidos y enviados por tu backend.


### Dependencias de desarrollo

- @nestjs/cli
CLI oficial de NestJS para generar y administrar proyectos.
Uso: Crear módulos, controladores, servicios y compilar el proyecto.

- @nestjs/schematics
Herramientas para integrar con la CLI de NestJS.
Uso: Creación de estructuras de código con patrones definidos.

- @nestjs/testing
Proporciona utilidades para realizar pruebas unitarias y de integración en NestJS.

- @types/...
Paquetes de definiciones de tipos TypeScript para diversas bibliotecas.
Uso: Garantizar tipado estricto al usar módulos externos.

- eslint
Herramienta para identificar y corregir problemas en el código.
Uso: Mantenimiento de un código limpio y uniforme.

- eslint-config-prettier
Desactiva reglas conflictivas entre ESLint y Prettier.
Uso: Evitar conflictos al usar ambas herramientas.

- eslint-plugin-jest
Agrega reglas específicas para usar Jest con ESLint.
Uso: Asegurar mejores prácticas en pruebas.

- jest
Framework de pruebas para aplicaciones JavaScript.
Uso: Ejecutar pruebas unitarias y de integración.

- prettier
Herramienta para formatear código de forma consistente.
Uso: Mantener el estilo de código uniforme en el proyecto.

- ts-jest
Extensión de Jest para usar TypeScript.
Uso: Permite realizar pruebas directamente en archivos TypeScript.

- ts-node
Permite ejecutar código TypeScript directamente en Node.js.
Uso: Ejecutar el proyecto en entornos de desarrollo sin compilar.

- typescript
Lenguaje utilizado para el desarrollo del proyecto.
Uso: Código más seguro y mantenible.

<br/>

## 🛠 Skills

<div align="left">
  <img src="https://skillicons.dev/icons?i=docker" height="40" alt="docker logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=git" height="40" alt="git logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=github" height="40" alt="github logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" height="40" alt="google logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=gcp" height="40" alt="googlecloud logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=kubernetes" height="40" alt="kubernetes logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=mongodb" height="40" alt="mongodb logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=nestjs" height="40" alt="nestjs logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=nodejs" height="40" alt="nodejs logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" height="40" alt="npm logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=postgres" height="40" alt="postgresql logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=ts" height="40" alt="typescript logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=vscode" height="40" alt="vscode logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=postman" height="40" alt="postman logo"  />
</div>

## Instalación

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local.

Prerrequisitos

* Node.js v18 o superior.

* Docker y Docker Compose.

* PostgreSQL y MongoDB si no usas Docker.

Configuración Local

## 🔗 Links

```bash
  git clone https://github.com/No-Country-simulation/h3-02-klowhub.git
```

* Opcion 1 uno Correr los servicios individualmente:

- GateWay

instalar Dependencias 
```bash
cd server/apps/gateway
npm install
```
crear un archivo .env dentro de la carpeta gateway

```bash
PORT=3000
NODE_ENV=development
JWT_SECRET=secret_tokenauth
MONGO_URI=
FRONTEND_URL=http://localhost:8080
USERS_MICROSERVICE_URL=http://localhost:3001
COURSES_MICROSERVICE_URL=http://localhost:3002
UPLOAD_MICROSERVICE_URL=http://localhost:3003
```

Iniciar el Gateway
```bash
npm run start 

ó 

npm run start:dev
```

#

- Users

instalar Dependencias 
```bash
#asegurese de estar en la raiz del repositorio clonado
cd server/apps/users
npm install
```
crear un archivo .env dentro de la carpeta users

```bash
#Users
NODE_ENV=development
JWT_SECRET=secret_tokenauth
USERS_MICROSERVICE_HOST=users
USERS_MICROSERVICE_PORT=3001
JWT_SECRET=secret_tokenauth
FRONTEND_URL= frontend
SMTP_USER=
SMTP_PASS=
SMTP_HOST=
SMTP_PORT=
SMTP_SECURE=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=
POSTGRES_URL=
```

Iniciar Microservicio Users
```bash
npm run start 
ó 
npm run start:dev
```
#

- Courses

instalar Dependencias 
```bash
#asegurese de estar en la raiz del repositorio clonado
cd server/apps/courses
npm install
```
crear un archivo .env dentro de la carpeta courses

```bash
#Courses
NODE_ENV=development
JWT_SECRET=secret_tokenauth
MONGO_URI=
COURSES_MICROSERVICE_HOST=courses
COURSES_MICROSERVICE_PORT=3002
```

Iniciar Microservicio Courses
```bash
npm run start 
ó 
npm run start:dev
```

```javascript
NOTA: IMPORTANTE SI NO POSEE UNA CONEXION A LAS BASE DE DATOS LOS SERVICIOS NO INICIARAN 
```

#
opcion 2 Usnaod Docker


<p>Asegurece tener instalado en su S.O Docker visite la pagina oficial para mas detalles ya que son pasos muy especificos y existe cambio de versiones continuamente</p>

- crear un archivo .env dentro de la Carpeta server

```.env
PORT=3000
NODE_ENV=development
JWT_SECRET=secret_tokenauth
MONGO_URI=
FRONTEND_URL=
USERS_MICROSERVICE_URL=http://users:3001
USERS_MICROSERVICE_HOST= users
USERS_MICROSERVICE_PORT= 3001
COURSES_MICROSERVICE_URL=http://courses:3002
COURSES_MICROSERVICE_HOST= courses
COURSES_MICROSERVICE_PORT= 3002
UPLOAD_MICROSERVICE_URL=http://upload:3003
UPLOAD_MICROSERVICE_HOST=upload
UPLOAD_MICROSERVICE_PORT=3003
SMTP_USER=
SMTP_PASS=
SMTP_HOST=
SMTP_PORT=
SMTP_SECURE=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=
POSTGRES_URL=
UPLOAD_MICROSERVICE_HOST=upload
PROJECT_ID=
BUCKET_NAME=
```
- iniciar Docker componse 

```bash
# Asegurate que este en la misma ruta donde esta del archivo docker-componse.dev.yml

docker-compose up
```