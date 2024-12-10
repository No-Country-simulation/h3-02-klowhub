# :computer: Hackathon 3 - Equipo 2 - Proyecto "KlowHub"

## Industria
General, Marketplace, Comunidad, No-Code

## Descripción

KlowHub es una comunidad de desarrolladores, entusiastas y organizaciones que utilizan aplicaciones "No Code" o "Low Code" para cubrir necesidades

Consiste en 4 módulos
- Cursos
- Proyectos
- Consultoría
- Foro

## Tecnologías
*Frontend contiene*

| [<img src="https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg" alt="gcp" width="40" height="40"/>](https://cloud.google.com) | [<img src="https://www.vectorlogo.zone/logos/kubernetes/kubernetes-icon.svg" alt="kubernetes" width="40" height="40"/>](https://kubernetes.io) | [<img src="https://cdn.worldvectorlogo.com/logos/nextjs-2.svg" alt="nextjs" width="40" height="40"/>](https://nextjs.org/) |
|---|---|---|
| [<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/>](https://www.typescriptlang.org/) | [<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/>](https://www.w3schools.com/css/) | [<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg" alt="docker" width="40" height="40"/>](https://www.docker.com/) |
| [<img src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" alt="tailwind" width="40" height="40"/>](https://tailwindcss.com/) |  |  |


*Backend contiene*


| [<img src="https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg" alt="gcp" width="40" height="40"/>](https://cloud.google.com) | [<img src="https://www.vectorlogo.zone/logos/kubernetes/kubernetes-icon.svg" alt="kubernetes" width="40" height="40"/>](https://kubernetes.io) | [<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/>](https://www.typescriptlang.org/) |
|---|---|---|
| [<img src="https://docs.nestjs.com/assets/logo-small-gradient.svg" alt="nestjs" width="40" height="40"/>](https://nestjs.com/) | [<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg" alt="postgresql" width="40" height="40"/>](https://www.postgresql.org) | [<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg" alt="docker" width="40" height="40"/>](https://www.docker.com/) |
| [<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="40" height="40"/>](https://www.mongodb.com/) | [<img src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" alt="postman" width="40" height="40"/>](https://postman.com) |  |


## Instrucciones de Instalación Local
### Frontend
   *Estos pasos son para instalar el FRONTEND*. Para empezar a usar esto, sigua estos pasos:

1. Forkee y Clone el repositorio:

```bash
git clone https://github.com/No-Country-simulation/h3-02-klowhub.git
```

1.5. Ingresar a carpeta client con `cd client` en su terminal.

2. Instale las dependencias:
   En este caso puede usar el Gestor de Packetes que quiera. Recomendamos `pnpm`

```bash
pnpm install
```

3. Comience el servidor de desarrollo:

```bash
pnpm dev
```

4. Abra `http://localhost:8080` en su navegador preferido.

5. El proyecto usa husky y patch-package para automatizar hooks de git y validar dependencias. Esto es ejecutado, con el "postinstall" cada vez que instale:

```bash
npx patch-package && node setup-husky.js
```

Si no quiere correr husky en cada instalación, quite esto `&& node setup-husky.js` desde `postinstall` en el `package.json`

### Backend
   *Estos pasos son para instalar el BACKEND*. Para empezar a usar esto, sigua estos pasos:

1. Forkee y Clone el repositorio:

```bash
git clone https://github.com/No-Country-simulation/h3-02-klowhub.git
```

1.5. Ingresar a carpeta client con `cd server` en su terminal.

2. Instale las dependencias:
   En este caso puede usar el Gestor de Paquetes que quiera. Recomendamos `pnpm`

```bash
pnpm install
```

3. Comience el servidor de desarrollo:

```bash
pnpm start:all
```

4. El comando anterior levantará todos los microservicios. El servicio principal accede al puerto `http://localhost:3000`

### **Alternativa**: Luego de clonar el repositorio puede acceder a la carpeta server con:

```bash
cd server
docker-compose up
```

## Caso de Uso diagramado y Arquitectura
![Untitled-2024-12-06-1141](https://github.com/user-attachments/assets/216ee27d-d300-4c58-a0ce-c5328ceeae5c)

## Links de interés
- Google Doc: [Requerimiento MVP](https://docs.google.com/document/d/1384qS4swbR3EJarHDEN6JStyf-U_L6RKgHSfzssLfbE/edit?tab=t.0)
- Excalidraw (un tablero) del trabajo y progreso del equipo: [Link](https://excalidraw.com/#room=5e439aab375eec8c0d21,MJms9xmhQwIa0jXMSSZIlQ)
- Seguimiento de tareas en [Github Projects](https://github.com/orgs/No-Country-simulation/projects/127/views/1)
- [Figma de diseño](https://www.figma.com/design/MsyB0jfdKAU2dOIoIB9rW2/AppSheetHub?node-id=0-1&t=58VSLDh2ABj6y82K-1)
- Comunicación a través de Servidor Privado de Discord: *Pedir link al privado*

## Proceso
Debido al poco tiempo disponible de desarrollo, y el tamaño del proyecto, decidimos encarar esto teniendo en cuenta prolijidad, comunicación constante, escalabilidad y desarrollo robusto.
Para las 5 semanas disponibles planeamos tener 2 Casos de Uso de 1 Módulo, el de Cursos, y que estos funcionen fluídos y sin problemas. De esta manera entregamos un módulo funcional, bien desarrollado y listo para escalarlo.
Aplicando Metodología Agil Lean, nos reuníamos diariamente para hablar del progreso, ajustar lo necesario y coordinar el día. Se apuntó a resultados tangibles diarios.

## Colaboradores
- Orlando Cardenas - Backend - [Github](https://www.linkedin.com/in/orlando-cardenas-villegas-7a2390248/)
- Freddy Moya - Frontend - [Github](https://www.linkedin.com/in/freddymoya/)
- Cesar Lopez - Conexión Back-Front - [Github](https://www.linkedin.com/in/cesar-lopez-a7226625a/)
- Marcos Lopez - Líder técnico Front - [Github](https://www.linkedin.com/in/marcos-lopez-dev)
- Seba - Project Manager - [Github](https://www.linkedin.com/in/sebadigiuseppe/)
- Lorena - Team Lead

Edición y creación de este documento: Sebastián Di Giuseppe (@scanevaro). Para detalles sobre las lecciones aprendidas y artefáctos del proyecto u otros detalles, escribir a scanevaro87@gmail.com
