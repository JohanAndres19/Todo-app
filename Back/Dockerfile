# ---- STAGE 1: BUILD (Compila el código) ----
FROM oven/bun:1.3.3

WORKDIR /app
COPY package.json bun.lock tsconfig.json ./

# 1. Instalamos todas las dependencias (incluyendo devDependencies si aplican a la compilación)
RUN bun install 

COPY src ./src

EXPOSE 3000

CMD ["bun", "run", "dev"]
