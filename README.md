# Sitio público de SEBASAM

Sitio público de SEBASAM para presentar el taller, explicar sus servicios y facilitar el contacto por WhatsApp, teléfono y Google Maps. Es un proyecto independiente de la aplicación operativa.

## Rutas públicas

| Ruta | Propósito |
|---|---|
| `/` | Página comercial principal con servicios, unidades, refacciones, ubicación, horarios y contacto. |
| `/info` | Tarjeta pública ligera para compartir mediante QR; incluye contacto, dirección, horarios, servicios y productos desde el contenido centralizado. |
| `/muelles` | Página de servicio enfocada en trabajos de muelles, refacciones relacionadas, preguntas frecuentes y contacto. |

La aplicación operativa de cotizaciones, pagos y administración vive en otro proyecto y no forma parte de este repositorio.

## Tecnologías

- Astro 7 con TypeScript estricto.
- HTML estático por defecto y CSS nativo.
- Vercel para despliegue.
- Lucide solo cuando se requieran iconos de interfaz.

La primera versión no usa Tailwind, React, CMS, base de datos ni API.

## Desarrollo local

```bash
pnpm install
pnpm dev
```

El comando muestra en la terminal la dirección del servidor de desarrollo.

| Comando | Acción |
|---|---|
| `pnpm dev` | Inicia el servidor local. |
| `pnpm astro check` | Verifica tipos y componentes Astro. |
| `pnpm build` | Genera el sitio estático en `dist/`. |
| `pnpm preview` | Sirve localmente la compilación de producción. |

## Estructura

Las páginas y componentes Astro reutilizan los datos comerciales centralizados en `src/content/business.ts`. La estructura actual incluye `/`, `/info` y `/muelles`, con plantilla base, encabezado, pie de página, acciones de contacto y horarios compartidos; está descrita en [`docs/architecture.md`](docs/architecture.md).

## Documentación

- [`docs/content-brief.md`](docs/content-brief.md): producto, contenido confirmado, contactos, rutas y reglas de comunicación.
- [`docs/architecture.md`](docs/architecture.md): implementación, dirección visual, accesibilidad, SEO, recursos, verificación, alcance y hoja de ruta.
- [`docs/AI_WORKFLOW.md`](docs/AI_WORKFLOW.md): flujo canónico para asistentes y contribuciones.
- [`docs/GITFLOW.md`](docs/GITFLOW.md): ramas, pull requests, releases y hotfixes.
- [`AGENTS.md`](AGENTS.md): reglas no negociables del repositorio.

La interfaz y la documentación usan español profesional de México (es-MX), sin voseo; los comandos e identificadores técnicos conservan su forma válida.

El trabajo se organiza mediante issues aprobados y ramas enfocadas. Cada pull request debe cerrar un issue aprobado mediante `Closes #N`, incluir exactamente una etiqueta `type:*` y mantener fuera del repositorio público cualquier secreto, dato privado o ruta personal de un equipo.
