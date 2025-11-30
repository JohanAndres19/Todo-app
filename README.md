# Proyecto de gestion de tareas con React y TypeScript
# Todo-app — Aplicación de gestión de tareas

Proyecto fullstack de ejemplo con API y frontend para gestionar tareas.

Estructura principal:
- `Back/` — Código del backend (API REST con Express y TypeScript).
- `Frontend/` — Aplicación cliente con React, Vite y TypeScript.

**Resumen rápido**: la API expone endpoints para crear, listar y modificar tareas; el frontend consume esos endpoints y presenta una interfaz para gestionar las tareas.

**Nota sobre Bun**: se utilizó Bun como entorno de ejecución y gestor de paquetes en el proyecto. El backend incluye scripts que usan `bun` directamente; para el frontend se recomienda usar `bun` para instalar dependencias y ejecutar los scripts de `package.json` (por ejemplo `bun install` y `bun run dev`). Bun acelera la instalación y la ejecución en desarrollo.

## Requisitos

- Docker y Docker Compose (para ejecutar la versión conteinerizada).
- Opcional: Bun (https://bun.sh) si quieres ejecutar localmente con Bun en vez de npm/pnpm/yarn.

## Ejecutar localmente (desarrollo)

Backend:

1. Entra en la carpeta del backend:

```
cd Back
```

2. Instala dependencias (con Bun):

```
bun install
```

3. Ejecuta en modo desarrollo:

```
bun run dev
```

Frontend:

1. Entra en la carpeta del frontend:

```
cd Frontend
```

2. Instala dependencias (con Bun):

```
bun install
```

3. Ejecuta en modo desarrollo (usa el script `dev` definido en `package.json`):

```
bun run dev
```

> Si no usas Bun, puedes usar `npm install` / `npm run dev` o el gestor que prefieras.

## Ejecutar con contenedores (Docker Compose)

El repositorio incluye un `docker-compose.yml` en la raíz que levanta tres servicios principales:
- `mongo` (base de datos MongoDB) en el puerto `27017`.
- `api` (backend) en el puerto `3000`.
- `frontend` (servicio de frontend) en el puerto `5173` redirigido al puerto `80` del contenedor.

Pasos básicos para ejecutar los contenedores:

1. Crear un archivo `.env` en la raíz del proyecto con las variables necesarias (ejemplo abajo).

2. Construir y levantar los servicios:

```
docker-compose up --build -d
```

3. Ver logs (opcional):

```
docker-compose logs -f api
docker-compose logs -f frontend
```

4. Parar y eliminar contenedores y red:

```
docker-compose down
```

Ejemplo de `.env` (colócalo en la raíz del repo):

```
# Variables de ejemplo
AUTH0_DOMAIN=your-auth0-domain
AUTH0_AUDIENCE=your-auth0-audience
AUTH0_CLIENT_ID=your-auth0-client-id

# URL base si necesitas sobreescribir (opcional)
# VITE_API_URL=http://localhost:3000/api/tasks
```

Notas importantes:

- Asegúrate de que los nombres de las variables (`AUTH0_DOMAIN`, `AUTH0_AUDIENCE`, `AUTH0_CLIENT_ID`) estén configuradas en tu cuenta de Auth0 si utilizas autenticación.
- El `docker-compose.yml` expone el backend en `http://localhost:3000` y el frontend en `http://localhost:5173`.
- Si modificas puertos o nombres de servicio en `docker-compose.yml`, actualiza las variables de entorno correspondientes.

## Scripts útiles

- Backend (en `Back/package.json`):
	- `dev`: ejecuta el servidor en modo desarrollo (usa `bun run src/index.ts`).
	- `build`: compila con `bun build`.
	- `start`: ejecuta el artefacto compilado.

- Frontend (en `Frontend/package.json`):
	- `dev`: arranca Vite en modo desarrollo.
	- `build`: compila la aplicación para producción.
	- `preview`: sirve la versión construida para pruebas locales.

## Tecnologías principales

- Bun (recomendado para desarrollo y gestor de paquetes)
- Node / Express (API)
- MongoDB (persistencia)
- React + Vite + TypeScript (Frontend)
- Tailwind CSS, Axios, MobX, Auth0 (integraciones)

## Arquitectura

El proyecto está organizado siguiendo los principios de la **Clean Architecture** para separar responsabilidades en capas (por ejemplo, capa de dominio, casos de uso, adaptadores/entradas y persistencia). Esto facilita el mantenimiento, las pruebas y la escalabilidad.

En el backend se siguió el patrón **MVC (Modelo-Vista-Controlador)** para estructurar la API: los modelos (Mongoose) gestionan la persistencia, los controladores contienen la lógica para cada endpoint y las rutas exponen los controladores como puntos de entrada HTTP.

