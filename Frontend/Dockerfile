# ------------------------------------------------------------
# 1) Build Stage con Bun (super rápido)
# ------------------------------------------------------------
FROM oven/bun:1 AS builder

WORKDIR /app

# Copiamos dependencias
COPY package.json bun.lockb* ./

# Instala dependencias
RUN bun install

# Copiamos el código fuente
COPY . .

# Compila la app con Vite
RUN bun run build



# ------------------------------------------------------------
# 2) Production Stage con NGINX
# ------------------------------------------------------------
FROM nginx:1.25-alpine

# Eliminamos config default de nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiamos build generado por Bun + Vite
COPY --from=builder /app/dist /usr/share/nginx/html

# Configuración personalizada (SPA routing)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
