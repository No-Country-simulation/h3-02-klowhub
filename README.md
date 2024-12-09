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
- Nextjs
- Typescript
- CSS
- Docker
- Tailwind

*Backend contiene*
- Nestjs
- Docker
- PostgreSQL
- MongoDB

## Instrucciones de Instalación Local
   *Estos pasos son para instalar el FRONTEND*. Para empezar a usar esto, sigua estos pasos:

1. Forkee y Clone el repositorio:

```bash
git clone https://github.com/No-Country-simulation/h3-02-klowhub.git
```

2. Instale las dependencias:
   En este caso puede usar el Package Manager que quiera. Recomendamos `pnpm`

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
