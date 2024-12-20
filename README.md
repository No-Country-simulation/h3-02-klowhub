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

## Documentacion Tecnica del Frontend

En el frontend, hemos decidido utilizar <b>Next.js</b>, un framework de React que destaca por sus capacidades avanzadas para la creación de aplicaciones web modernas. Su principal ventaja radica en su capacidad para <b>optimizar el SEO</b> (Search Engine Optimization) de las páginas, lo que mejora su posicionamiento en motores de búsqueda.

### Arquitectura

Hemos adoptado una arquitectura basada en funcionalidades <b>(Feature-based)</b> para el desarrollo del frontend. Este enfoque organiza el código en <b>módulos independientes</b>, cada uno representando una funcionalidad específica de la aplicación. 
Esta eleccion nos permite, tener:
<ul>
<li>Alta Mantenibilidad</li>
<li>Escalabilidad independiente de cada modulo</li>
<li>Agregar nuevos modulos o funcionalidades sin necesidad, de manipular otros modulos</li>
<li>Facilidad en la testabilidad</li>
</ul>

### :file_folder: Estructura de archivos

```shell
/
├── public/                   # Assets publicos del proyecto
├── src/
│   ├── app/                  # Next JS App (App Router)
│   │   ├── [locale]/         # Permite manejar el estado de traducciones
│   │   │   ├── (auth)/       # Paginas que requieren autenticacion
│   │   │   └── (unauth)/     # Paginas publicas
│   │   └── api/              # NextJS API
│   ├── core/                 # Funciones core de la pagina
│   │   ├── components/       # Componentes core, compartidos, atomos
│   │   ├── hooks/            # Hooks core, compartidos
│   │   ├── lib/              # Librerias & configuracion
│   │   ├── models/           # Modelos & interface/tipos del core
│   │   ├── schemas/          # Esquemas de validaciones (zod)
│   │   ├── services/         # Servicios del core
│   │   └── styles/           # Estilos globales & Fuentas de texto
│   ├── features/             # Modulos y funcionalidades de la App
│   │   ├── admin/            # Features del modulo de admins
│   │   ├── apps/             # Features del modulo de applicaciones
│   │   ├── auth/             # Features del modulo de Autenticacion
│   │   ├── cart/             # Features del carrito de compras
│   │   ├── courses/          # Features del modulo de cursos
│   │   ├── creator/          # Features del modulo de creador
│   │   ├── home/             # Features de la home page
│   │   ├── membership/       # Features del modulo de membresias
│   │   ├── proyects/         # Features del modulo de proyectos
│   │   ├── mentors/          # Features del modulo de mentores
│   │   ├── toast/            # Funcionalidades del toast
│   │   └── userprofiles/     # Features del modulo de perfil de usuario
│   └── locales/              # Carpeta con las diferentes traducciones
├── .env.example              # Archivo con un mock de las variables de entorno
├── .prettierignore           # Patrones que debe ignorar prettier
├── commitlint.config.cjs     # Archivo de configuracion de commitlint
├── Dockerfile                # Archivos para desplegar el frontend en Docker
├── env.config.ts             # Archivo para recuperar las variables de entorno
├── eslint.config.mjs         # Configuracion de Flat de ESLint 9
├── lint-staged.config.mjs    # La configuracion de Lint Staged
├── next.config.js            # Configuracion de Next 15
├── postcss.config.cjs        # Configuracion de PostCSS
├── setup-husky.js            # Sccript personalizado para levantar husky
├── stylelint.config.cjs      # Configuracion del CSSLinter
├── tailwind.config.cjs       # Configuracion de tailwind
├── vitest.config.ts          # Configuracion de vitest para test unitarios
└── tsconfig.json             # Configuracion de typescript
```

## 📐 Resumen de los Scripts

En el cliente podras encontrar los siguientes scripts en el: `package.json`:

- `dev`: Inicia el servidor de desarrollo
- `build`: Construye el build del proyecto
- `start`: Inicia el servidor de produccion
- `lint`: Verifica los errores de eslint
- `lint:fix`: Intenta arreglar los errores de eslint automaticamente
- `lint:css`: Valida si hay algun error en el css
- `types:check`: Valida si hay errores de tipo con typescript
- `commitlint:last`: Verifica si el ultimo commit sigue las reglas de commitlint
- `format`: Validar el formato del codigo
- `format:fix`: Arregla errores de formato automaticamente
- `prepare`: Ejecutar el script para levantar husky manualmente
- `test`: Ejecutar test unitarios
- `test:watch`: Ejecutar test unitarios en modo de observacion
- `postinstall`: Ejecuta script para preparar Husky automaticamente

### :spades: Manejador de paquetes

En el caso del frontend optamos por usar como manejador de paquetes <b>pnpm</b>, esta alternativa a <b>npm</b> nos permite mayor velocidad a la hora de manejar las instalaciones de las dependencias

### ✨ Tecnologias principales
La elección de las tecnologías utilizadas en el frontend del proyecto se ha basado en principios de rendimiento, escalabilidad y facilidad de mantenimiento.

<ul>
<li>
<a style="text-decoration: none;"  href="https://nextjs.org/" target="_blank" rel="noopener noreferrer"> <img src="https://cdn.simpleicons.org/nextdotjs/01000f" alt="Nextjs" width=17 height=17> <b>Next.js</b>
  </a> - NextJS Framework de React
</li>
<li style="padding-top: 4px;">
<a style="text-decoration: none;" href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer"> <img src="https://cdn.simpleicons.org/tailwindcss/06B6D4" alt="Tailwind css" width=17 height=17> <b>TailwindCSS</b>
  </a> - Tailwind CSS
</li>
<li style="padding-top: 4px;">
  <a style="text-decoration: none;" href="https://eslint.org/" target="_blank" rel="noopener noreferrer"> <img src="https://cdn.simpleicons.org/eslint/4B32C3" alt="Eslint"  width=17 height=17> <b>Eslint</b>
  </a> - Para mantener codigo limpio y encontrar errores
</li>
<li style="padding-top: 4px;">
<a style="text-decoration: none;" href="https://prettier.io/" target="_blank" rel="noopener noreferrer"> <img src="https://cdn.simpleicons.org/prettier/F7B93E" alt="Prettier"  width=17 height=17> <b>Prettier</b>
  </a> - Para mantener un mismo formateo en el codigo
</li>
<li style="padding-top: 4px;">
<a style="text-decoration: none;" href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer"> <img src="https://cdn.simpleicons.org/typescript/3178C6" alt="Typescript" width=17 height=17> <b>Typescript</b>
  </a> - Typescript para tipar el codigo y tener mayor seguridad en los objetos
</li>
<li style="padding-top: 4px;">
<a style="text-decoration: none;" href="https://vitest.dev/" target="_blank" rel="noopener noreferrer"> <img src="https://cdn.simpleicons.org/vitest/6E9F18" alt="Vitest" width=17 height=17>  <b>Vitest</b>
  </a> and <a style="text-decoration: none;" href="https://testing-library.com/react" target="_blank" rel="noopener noreferrer"> <img src="https://cdn.simpleicons.org/testinglibrary/E33332" alt="Testing Library"  width=17 height=17> <b>Testing Library</b>
  </a> - Para test unitarios y de integracion
</li>
<li style="padding-top: 4px;">
<a style="text-decoration: none;" href="https://github.com/typicode/husky#readme" target="_blank" rel="noopener noreferrer"> <img src="https://cdn.simpleicons.org/precommit/FAB040" alt="Pre commit" width=17 height=17> <b>Husky</b>
  </a> - Configurado para ejecutar git hooks
</li>
<li style="padding-top: 4px;">
<a style="text-decoration: none;" href="https://commitlint.js.org/" target="_blank" rel="noopener noreferrer"> <img src="https://cdn.simpleicons.org/commitlint/000000" alt="Commitlint" width=17 height=17> <b>Commitlint</b>
  </a> with <a style="text-decoration: none;" href="https://www.conventionalcommits.org/en/v1.0.0/" target="_blank" rel="noopener noreferrer"> <img src="https://cdn.simpleicons.org/conventionalcommits/FE5196" alt="Pre commit" width=17 height=17> <b>Conventional commit</b></a> - Para lintar commits y mantener un historial de commits solido.
</li>
<li style="padding-top: 4px;">
<a style="text-decoration: none;" href="https://github.com/features/actions" target="_blank" rel="noopener noreferrer"> <img src="https://cdn.simpleicons.org/githubactions/2088FF" alt="Github Action" width=17 height=17> <b>Github Actions</b>
  </a> - Github Actions para automatizar la ejecucion de validacion. Y el despliegue a produccion.
</li>
<li style="padding-top: 4px;">
<a style="text-decoration: none;" href="https://zod.dev/" target="_blank" rel="noopener noreferrer"> <img src="https://cdn.simpleicons.org/zod/3E67B1" alt="Zod" width=17 height=17> <b>Zod</b>
  </a> - Para validacion de tipos
</li>
<li style="padding-top: 4px;">
<a style="text-decoration: none;" href="https://www.radix-ui.com/" target="_blank" rel="noopener noreferrer"> <img src="https://cdn.simpleicons.org/radixui/161618" alt="RadixUI" width=17 height=17> <b>Radix UI</b>
  </a> - Libreria de componentes primitivos, que otorgan implementacion de funcionalidades comunes.
</li>
<li style="padding-top: 4px;">
<a style="text-decoration: none;" href="https://www.radix-ui.com/" target="_blank" rel="noopener noreferrer"> <img src="https://cdn.simpleicons.org/stylelint/263238" alt="Stylelint" width=17 height=17> <b>Stylelint</b>
  </a> - Libreria para lintar CSS.
</li>
</ul>

### ⚡ Manejador de estado

El frontend opta por usar como manejador de estado la libreria [<b>Jotai</b>](https://jotai.org/) como manejador de estado. Jotai, creada por el mismo autor de Zustand, ofrece un enfoque innovador basado en <b>átomos</b>, lo que proporciona una gran flexibilidad para gestionar estados de manera sencilla y modular. La principal razón detrás de esta elección son dos características clave de Jotai Primero: Simplicidad en la API, mantiene un API simple de mantener y pequeña para el bundle final. La segunda es: <b>minimiza los re-renderizados innecesarios</b> al actualizar el estado. Esto se traduce en:
<ul>
<li>Mejor rendimiento.</li>
<li>Mayor escalabilidad.</li>
<li>Simplicidad en el desarrollo.</li>
</ul>

### 🎨 Manejo de estilos

El proyecto cuenta con una estructura definida y clara para el manejo de estilos, diseñada para optimizar tanto la flexibilidad como la productividad.

#### TailwindCSS
Como framework principal de estilos, hemos optado por <b>TailwindCSS</b>. Este framework ofrece gran flexibilidad y velocidad al implementar estilos y componentes nuevos. Gracias a su enfoque basado en clases utilitarias, es posible construir interfaces de usuario de forma eficiente y consistente.

#### CSS Modules
Si bien TailwindCSS es una herramienta poderosa, no cubre todos los casos de uso avanzados. En situaciones que requieren un control más detallado de los estilos, utilizamos <b>CSS Modules</b>. Estos archivos permiten escribir CSS tradicional, con la ventaja de que:
<ul>
<li>Se importan directamente en el código JavaScript.</li>
<li>Aplican automáticamente un hashing único a las clases, resolviendo de manera eficiente problemas de colisión o compatibilidad de nombres entre estilos.</li>
</ul>

#### Estilos globales
El proyecto también cuenta con un archivo de <b>CSS global</b> para definir estilos que deben aplicarse a nivel general. Este archivo complementa el uso de TailwindCSS y CSS Modules, asegurando una estructura clara y ordenada para los estilos globales.

#### Nomenclatura en las clases
- Las clases definidas en los <b>CSS Modules</b> utilizan el formato `camelCase`
- Las clases definidas en el archivo <b>global</b> de CSS siguen el formato `kebab-case`

### 🎨 Componentes

Para la creación y organización de los componentes, seguimos una serie de reglas y buenas prácticas con el fin de mantener un código limpio, modular y escalable: 
- **Nomenclatura**: Los nombres de los componentes deben seguir la convención de `PascalCase` lo que facilita su identificación y consistencia en el proyecto.
- **Nombre de archivos**: Cada componente debe estar dentro de su propia carpeta, y el archivo principal debe estar nombrado como `index.tsx` eEsto simplifica las importaciones y evita redundancias en los nombres de los archivos.
- **Tamaño**: Si un componente se vuelve demasiado grande o complejo, debe dividirse en componentes más pequeños y reutilizables. Estos componentes secundarios deben permanecer dentro de la misma carpeta que el componente principal, con el objetivo de mantener una estructura jerárquica y cohesiva. Esto también incluye componentes como átomos, que representan unidades más pequeñas dentro de la estructura. Ejemplo:
```shell
├── components/
    └── Carousel/
         ├── index.tsx                # Padre componente principal
         ├── CarouselContent.tsx      # Componente hijo (Atomo)
         ├── CarouselItem.tsx         # Componente hijo (Atomo)
         ├── CarouselNext.tsx         # Componente hijo (Atomo)
         └── CarouselPrevious.tsx     # Componente hijo (Atomo)

# Estos 5 componentes forman un todo (Carrusel)
# Los hijos forman parte de la infrastructura interna del carrusel
```

### 🎯 i18n
Las traducciones del contenido estático se gestionan mediante archivos JSON, donde cada archivo corresponde a un idioma específico. Por ejemplo: `es.json`, `en.json`.  El idioma actual se define a través de la ruta, lo que ofrece dos ventajas clave:

1. **Estado global**: No es necesario almacenar el idioma de forma interna, lo que simplifica la gestión y hace que el estado sea accesible globalmente.

2. **Persistencia en navegación**: Al incluir el idioma en la ruta, el estado se mantiene al compartir el enlace o al regresar al sitio. Esto asegura que el idioma seleccionado persista entre páginas, proporcionando una experiencia de usuario consistente.

Actualmente, las traducciones disponibles son:
- Español
- Ingles
- Portugues
- Frances
- Italiano

### 🎯 Implementacion del Reproductor
Para la implementación del reproductor de video, se ha utilizado la librería [**VideoJS**](https://videojs.com/) que ofrece excelentes funcionalidades para la reproducción de videos. Entre sus principales características se encuentran:

- **Live Streaming**: Soporte para formatos de video en **live-streaming** estos formatos son mas seguros y optimos, lo que hacen es partir el video en segmentos los cuales son entregados al usuario on-demand. Esto provoca mayor fluidos y seguridad, entregando siempre segmentos y nunca el video completo.

- **Mini Reproductor**: Ofrece una opción de mini reproductor, permitiendo a los usuarios seguir viendo el video mientras navegan por la página.

- **Estilo personalizado**: Se ha implementado un diseño customizado para el reproductor, adaptándolo a la estética y requerimientos del proyecto.


### :shipit: Herramientas de codigo

En esta sección se describen las herramientas que utilizamos para mejorar la calidad del código y mantener una estructura sólida y consistente en el proyecto.

#### Eslint
<b>ESLint</b> es la herramienta principal que utilizamos como linter de código. Esta herramienta nos permite identificar rápidamente errores comunes que pueden pasar desapercibidos durante el desarrollo.

#### Prettier
<b>Prettier</b> es una herramienta que permite formatear automáticamente el código. Su propósito es garantizar un estilo homogéneo, evitando que cada desarrollador aplique un formato diferente. Configurando reglas específicas, Prettier asegura que todo el proyecto mantenga un estilo visual coherente, mejorando la legibilidad y la colaboración.

#### Stylelint
De forma similar a ESLint, pero enfocado en los archivos de estilos (CSS/SCSS), <b>Stylelint</b> se encarga de verificar problemas como:
<ul>
<li>Clases no utilizadas o repetidas.</li>
<li>Variables innecesarias.</li>
<li>Inconsistencias en la estructura de los estilos..</li>
</ul>

#### Commitlint & Conventional Commit
<b>Commitlint</b> valida los mensajes de commit para cumplir con las reglas definidas por convenciones como <b>Conventional Commits</b>. Esto es útil para mantener un historial de cambios claro y estructurado.
Por ejemplo, los commits pueden clasificarse por tipo (feat, fix, docs, etc.), lo que facilita la identificación de cambios específicos.

#### Conclusion
En conjunto, estas herramientas garantizan que el código del proyecto sea más limpio, consistente y fácil de mantener, lo que contribuye a un flujo de trabajo más eficiente y colaborativo.

### :shipit: Testing
En el proyecto utilizamos principalmente <b>Vitest</b> junto con <b>Testing Library</b>. para las pruebas.

<b>Vitest</b> es una biblioteca moderna que ofrece una API casi idéntica a la de Jest, pero con algunas diferencias que hacen que prefiramos esta alternativa. Entre las principales ventajas de Vitest se incluyen:

- Soporte nativo para ESM (ECMAScript Modules), lo que facilita su integración con proyectos que usan módulos de ES.
- Mejor rendimiento en la ejecución de las pruebas, lo que reduce el tiempo de espera durante el ciclo de desarrollo.
- Ecosistema optimizado para proyectos en React y Next.js, lo que lo convierte en una opción ideal para nuestro stack tecnológico.

<b>Testing Library</b> es una biblioteca de soporte que ofrece utilidades para facilitar las pruebas de los componentes, promoviendo las mejores prácticas de pruebas centradas en el comportamiento y la accesibilidad de los componentes en lugar de su implementación interna.

### :fishsticks: Husky

 <b>Husky</b> es una herramienta que mejora la experiencia de desarrollo al gestionar la creación y ejecución de <b>git-hooks</b>. Los <b>git-hooks</b> son funciones que permiten ejecutar scripts durante el ciclo de vida de los comandos de Git. Gracias a esta funcionalidad, podemos ejecutar scripts antes de realizar un commit, antes de validar el mensaje de un commit o incluso antes de hacer un push a GitHub.

 Con Husky, podemos automatizar la ejecución de pruebas, linters y formateadores, asegurando que los desarrolladores ejecuten los tests y pasen las validaciones correspondientes antes de subir cualquier cambio.

 #### Integracion con Lint Staged
 Junto con Husky, utilizamos <b>Lint-Staged</b>, una herramienta que ejecuta scripts exclusivamente sobre los archivos que se encuentran en el staging area de Git. Esto permite que las validaciones solo se apliquen a los cambios realizados por el desarrollador, en lugar de ejecutar validaciones sobre todo el proyecto.

 #### Validacion de mensajes de commit
 Husky también nos permite ejecutar un script para validar los mensajes de commit, integrándose con <b>Commitlint</b>, garantizamos la ejecucion automatica de las reglas definidas para los commits.

### Github Actions

Para el frontend, se implementaron dos workflows en GitHub Actions:

- **Workflow de Validación y Pre-Build**: Este workflow se encarga de ejecutar las validaciones necesarias sobre el código, como linters y pruebas, además de realizar un pre-build para asegurarse de que todo esté correcto antes de continuar con el despliegue.

- **Workflow de Despliegue Automático**: Este workflow se ocupa de realizar el despliegue automático del cliente, utilizando herramientas como Docker, Artifact Registry para almacenar la imagen y Google Cloud Run para ejecutar el servicio en la nube.

### 🎯 Lighthouse Test

A continuación se muestran los resultados de las auditorías de Lighthouse para evaluar el rendimiento, la accesibilidad y las mejores prácticas de la aplicación tanto en escritorio como en móvil. Estos tests son cruciales para asegurar que la aplicación cumple con los estándares de calidad y proporciona una experiencia óptima al usuario.

- **Resultado en Ordenadores**
![image](https://github.com/user-attachments/assets/acb57f21-0de4-4385-87b5-3a978d20d268)

- **Resultado en dispositivos mobiles**
![image](https://github.com/user-attachments/assets/47d7166e-6c03-4e8f-8617-cb1d3b7097cf)

## Links de interés
- Deploy: [link](https://klowhub-800663783731.southamerica-east1.run.app/) (Deployado en Google Cloud, puede necesitar mantenimiento)
- Google Doc: [Requerimiento MVP](https://docs.google.com/document/d/1384qS4swbR3EJarHDEN6JStyf-U_L6RKgHSfzssLfbE/edit?tab=t.0)
- Excalidraw (un tablero) del trabajo y progreso del equipo: [Link](https://excalidraw.com/#room=5e439aab375eec8c0d21,MJms9xmhQwIa0jXMSSZIlQ)
- Seguimiento de tareas en [Github Projects](https://github.com/orgs/No-Country-simulation/projects/127/views/1)
- [Figma de diseño](https://www.figma.com/design/MsyB0jfdKAU2dOIoIB9rW2/AppSheetHub?node-id=0-1&t=58VSLDh2ABj6y82K-1)
- Comunicación a través de Servidor Privado de Discord: *Pedir link al privado*

## Proceso
Debido al poco tiempo disponible de desarrollo, y el tamaño del proyecto, decidimos encarar esto teniendo en cuenta prolijidad, comunicación constante, escalabilidad y desarrollo robusto.
Para las 5 semanas disponibles planeamos tener 2 Casos de Uso de 1 Módulo, el de Cursos, y que estos funcionen fluídos y sin problemas. De esta manera entregamos un módulo funcional, bien desarrollado y listo para escalarlo.
Aplicando Metodología Agil Lean, nos reuníamos diariamente para hablar del progreso, ajustar lo necesario y coordinar el día. Se apuntó a resultados tangibles diarios.

## 

## Colaboradores
- Orlando Cardenas - Backend - [LinkedIn](https://www.linkedin.com/in/orlando-cardenas-villegas-7a2390248/)
- Freddy Moya - Frontend - [LinkedIn](https://www.linkedin.com/in/freddymoya/)
- Cesar Lopez - Conexión Back-Front - [LinkedIn](https://www.linkedin.com/in/cesar-lopez-a7226625a/)
- Marcos Lopez - Líder técnico Front - [LinkedIn](https://www.linkedin.com/in/marcos-lopez-dev)
- Seba - Project Manager - [LinkedIn](https://www.linkedin.com/in/sebadigiuseppe/)
- Lorena - Team Lead

Edición y creación de este documento: Sebastián Di Giuseppe (@scanevaro). Para detalles sobre las lecciones aprendidas y artefáctos del proyecto u otros detalles, escribir a scanevaro87@gmail.com
