# FreireDev Blog

Blog personal de Ramon Freire sobre TypeScript, IoT, Programación y Linux.

## Stack

- **Astro 5+**: Framework web moderno y rápido
- **Content Collections**: Gestión de contenido con TypeScript
- **Git Submodules**: Contenido separado del código
- **Vercel**: Deploy automático

## Quick Start

```bash
# Clonar con submodules
git clone --recursive git@github.com:tuusuario/freiredev.git
cd freiredev

# Instalar dependencias
npm install

# Desarrollo
npm run dev
# Visita: http://localhost:4321
```

## Estructura

```
freiredev/
├── src/
│   ├── content/blog/     # Git submodule (freiredev-content)
│   ├── layouts/          # Layouts de Astro
│   ├── pages/            # Páginas del sitio
│   └── styles/           # Estilos CSS
├── public/               # Assets estáticos
└── documentation/        # Documentación completa
```

## Categorías

- **TypeScript**: Tutoriales y tips
- **IoT**: Internet de las Cosas
- **Programación**: Conceptos generales
- **Linux**: Administración y uso

## Comandos

```bash
npm run dev       # Servidor de desarrollo
npm run build     # Build de producción
npm run preview   # Preview del build
```

## Actualizar Contenido

Cuando hay nuevo contenido en el repositorio `freiredev-content`:

```bash
# Opción 1: Comando rápido (recomendado)
git submodule update --remote && npm run dev

# Opción 2: Paso a paso
cd freiredev-content
git pull origin main
cd ..
npm run dev
```

### Detección Automática

El sistema detecta automáticamente:
- Nuevas categorías (sin modificar código)
- Nuevas subcategorías (sin modificar código)
- Nuevos posts
- Asigna colores automáticamente a nuevas categorías

**No necesitas modificar código** cuando agregues nuevo contenido. Solo actualiza el submodule y reconstruye el sitio.

## Documentación

Para documentación completa sobre arquitectura, configuración y uso, ver:
**[documentation/README.md](documentation/README.md)**

## Licencia

MIT - Ramon Freire
