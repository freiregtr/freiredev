# FreireDev Blog - Documentación

## Arquitectura del Software

### Stack Tecnológico

```
Frontend/Backend: Astro 5+
Styling: CSS nativo con variables
Content: Markdown con MDX
Deployment: Vercel
Content Management: GitHub + Git Submodules
```

### Estructura del Proyecto

```
freiredev/                          # Este repositorio
├── src/
│   ├── content/
│   │   ├── blog/                   # Git submodule → freiredev-content
│   │   └── config.ts               # Schema de Content Collections
│   ├── layouts/
│   │   ├── BaseLayout.astro        # Layout base
│   │   └── BlogPost.astro          # Layout para posts
│   ├── pages/
│   │   ├── index.astro             # Página principal
│   │   ├── categorias.astro        # Listado de categorías
│   │   ├── blog/
│   │   │   ├── index.astro         # Listado de posts
│   │   │   └── [...slug].astro    # Post individual
│   │   └── categoria/
│   │       └── [category].astro    # Posts por categoría
│   ├── components/                 # Componentes reutilizables
│   └── styles/
│       └── global.css              # Estilos globales
├── public/
│   └── favicon.svg
├── astro.config.mjs
├── package.json
└── tsconfig.json

freiredev-content/                  # Repositorio separado
├── typescript/                     # Categoría
│   ├── intro-typescript.md
│   └── tipos-avanzados.md
├── iot/                            # Categoría
│   └── raspberry-pi-setup.md
├── programacion/                   # Categoría
│   └── patrones-diseno.md
├── linux/                          # Categoría
│   └── bash-scripting.md
└── images/                         # Imágenes compartidas
    └── covers/
```

### Content Collections Schema

Los posts deben seguir este formato:

```markdown
---
title: "Título del post"
description: "Descripción corta para SEO"
pubDate: 2025-01-15
updatedDate: 2025-01-16  # Opcional
heroImage: "/images/covers/post-cover.jpg"  # Opcional
category: "typescript"  # typescript, iot, programacion, linux
tags: ["tutorial", "beginner"]  # Opcional
author: "Ramon Freire"  # Default
draft: false  # Default
---

# Contenido del post aquí

Tu contenido en Markdown
```

## Posts de Ejemplo

El blog viene con 4 posts de ejemplo (uno por cada categoría) que puedes usar como referencia:

- **TypeScript**: `intro-typescript.md` - Introducción a TypeScript para JavaScript developers
- **IoT**: `intro-raspberry-pi.md` - Primeros pasos con Raspberry Pi 5
- **Programación**: `patrones-diseno-esenciales.md` - 5 patrones de diseño esenciales
- **Linux**: `bash-scripting-fundamentos.md` - Bash scripting de cero a automatización

Estos posts sirven como:
1. Demostración del formato correcto de frontmatter
2. Ejemplo de estructura y contenido
3. Contenido temporal mientras creas tus propios posts

### Reemplazar posts de ejemplo

Cuando estés listo para publicar tu propio contenido:

1. **Opción A - Borrar los ejemplos**:
   ```bash
   rm -rf src/content/blog/*
   # Luego añade tus propios posts
   ```

2. **Opción B - Marcar como draft**:
   ```markdown
   ---
   title: "..."
   draft: true  # No se publicará
   ---
   ```

3. **Opción C - Usar como plantillas**:
   Copia el frontmatter y estructura, reemplaza el contenido

## Guía de Uso

### Configuración Inicial

#### 1. Crear repositorio de contenido en GitHub

```bash
# En GitHub, crear repo: freiredev-content
# Clonar localmente y crear estructura
mkdir -p freiredev-content/{typescript,iot,programacion,linux,images/covers}
cd freiredev-content
git init
git add .
git commit -m "Initial commit: estructura de categorías"
git remote add origin git@github.com:tuusuario/freiredev-content.git
git push -u origin main
```

#### 2. Añadir submodule al blog

```bash
# Desde el directorio freiredev
rm -rf src/content/blog/.gitkeep
git submodule add git@github.com:tuusuario/freiredev-content.git src/content/blog
git commit -m "Add content submodule"
```

#### 3. Subir blog a GitHub

```bash
# Crear repo en GitHub: freiredev
git init
git add .
git commit -m "Initial commit: Astro blog setup"
git remote add origin git@github.com:tuusuario/freiredev.git
git push -u origin main
```

#### 4. Configurar Vercel

1. Ir a https://vercel.com
2. Importar proyecto desde GitHub (`freiredev`)
3. Configurar build:
   - **Framework Preset**: Astro
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `git submodule update --init --recursive && npm install`

4. Variables de entorno (si necesitas):
   ```
   # Ninguna necesaria por ahora
   ```

5. Deploy

### Desarrollo Local

```bash
# Clonar el blog con submodules
git clone --recursive git@github.com:tuusuario/freiredev.git
cd freiredev

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
# Visita: http://localhost:4321

# Build para producción
npm run build

# Preview del build
npm run preview
```

### Publicar un Nuevo Post

```bash
# 1. Ir al repo de contenido
cd src/content/blog  # Si estás en freiredev
# O si estás trabajando directamente en freiredev-content

# 2. Crear nuevo post en la categoría correspondiente
cd typescript
nano mi-nuevo-post.md

# 3. Escribir el post con el formato requerido
# (Ver schema arriba)

# 4. Commit y push
git add mi-nuevo-post.md
git commit -m "Post: Mi nuevo post sobre TypeScript"
git push origin main

# 5. Actualizar submodule en el blog
cd ../../../../  # Volver a raíz de freiredev
git submodule update --remote
git add src/content/blog
git commit -m "Update content: nuevo post sobre TypeScript"
git push origin main

# 6. Vercel automáticamente hará deploy
```

### Actualizar un Post Existente

```bash
# 1. Editar el post en freiredev-content
cd src/content/blog/typescript
nano mi-post.md
# Actualizar campo updatedDate en el frontmatter

# 2. Commit y push
git add mi-post.md
git commit -m "Update: correcciones en post de TypeScript"
git push origin main

# 3. Actualizar submodule en blog (igual que antes)
cd ../../../../
git submodule update --remote
git add src/content/blog
git commit -m "Update content"
git push origin main
```

## Comandos Útiles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run preview      # Preview del build

# Git Submodules
git submodule update --init --recursive    # Clonar submodules
git submodule update --remote              # Actualizar submodules
git submodule foreach git pull origin main # Pull en todos los submodules

# Content
npm run astro add <integration>  # Añadir integraciones
npm run astro check              # Type-check
```

## Personalización

### Cambiar colores de categorías

Edita `src/content/config.ts` y las páginas que usen `categoryColors`:

```typescript
const categoryColors = {
  typescript: '#3178c6',
  iot: '#00979d',
  programacion: '#10b981',
  linux: '#fbbf24'
};
```

### Añadir nueva categoría

1. Actualiza `src/content/config.ts`:
```typescript
category: z.enum(['typescript', 'iot', 'programacion', 'linux', 'nueva-categoria']),
```

2. Crea el directorio en `freiredev-content`:
```bash
mkdir src/content/blog/nueva-categoria
```

3. Actualiza las páginas que listen categorías:
   - `src/pages/index.astro`
   - `src/pages/categorias.astro`
   - `src/pages/categoria/[category].astro`

### Cambiar dominio

Edita `astro.config.mjs`:
```javascript
export default defineConfig({
  site: 'https://tudominio.com',
  // ...
});
```
