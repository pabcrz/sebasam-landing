# Flujo de trabajo Gitflow

Este repositorio usa un modelo Gitflow práctico. `main` representa producción y `develop` es la rama de integración para el trabajo planeado del sitio.

## Ruta rápida

1. Comienza con un issue de GitHub que tenga la etiqueta `status:approved`.
2. Crea una rama desde `develop` con el número del issue y una descripción breve.
3. Implementa el alcance de un issue que pueda revisarse y ejecuta las comprobaciones requeridas.
4. Abre un PR hacia `develop` con `Closes #N` y exactamente una etiqueta `type:*`.
5. Promueve una versión probada de `develop` a `main` mediante un PR de release.

## Reglas de ramas

| Rama | Propósito | Origen y destino |
|---|---|---|
| `main` | Sitio listo para producción | Protegida contra commits directos; recibe PR de release y hotfix. |
| `develop` | Integración del trabajo aprobado | Recibe PR de funcionalidades, correcciones, documentación y mantenimiento. |
| `feature/<issue>-short-name` | Funcionalidad visible para el usuario | Parte de `develop`; el PR regresa a `develop`. |
| `fix/<issue>-short-name` | Defecto fuera de producción | Parte de `develop`; el PR regresa a `develop`. |
| `docs/<issue>-short-name` | Trabajo exclusivo de documentación | Parte de `develop`; el PR regresa a `develop`. |
| `chore/<issue>-short-name` | Herramientas o mantenimiento del repositorio | Parte de `develop`; el PR regresa a `develop`. |
| `release/<version-or-date>` | Preparación de una versión para producción | Parte de `develop`; el PR va a `main`; después se integran en `develop` las correcciones exclusivas del release. |
| `hotfix/<issue>-short-name` | Corrección urgente en producción | Parte de `main`; el PR va a `main`; después se integra la corrección en `develop`. |

Usa nombres en minúsculas separados por guiones; por ejemplo, `feature/14-contact-actions` o `fix/27-canonical-url`.

## Reglas de pull requests

- No hagas commits directamente en `main`.
- Usa PR para incorporar cambios a `develop` o `main`.
- Limita cada rama y PR a un issue aprobado o una sección de revisión acordada explícitamente.
- Incluye `Closes #N` en la descripción del PR.
- Aplica exactamente una etiqueta `type:*`.
- Usa Conventional Commits, como `feat(contact): add WhatsApp action` o `docs(workflow): define release flow`.
- Mantén la implementación, la verificación y la documentación relacionada en la misma unidad de trabajo.
- Nunca incluyas secretos, archivos `.env`, datos privados ni rutas personales de equipos en este repositorio público.

## Flujo de release

1. Confirma que los cambios previstos estén integrados y verificados en `develop`.
2. Crea `release/<version-or-date>` desde `develop`.
3. Limita los cambios de la rama de release a bloqueos para la publicación, metadatos y preparación del despliegue.
4. Ejecuta `pnpm astro check` y `pnpm build`.
5. Abre un PR de release hacia `main` y despliega únicamente después de la revisión y de que pasen las comprobaciones. La integración y la publicación requieren la decisión de la persona responsable del repositorio.
6. Integra en `develop` las correcciones exclusivas del release.

## Flujo de hotfix

1. Crea `hotfix/<issue>-short-name` desde `main` para un issue urgente de producción aprobado.
2. Realiza la corrección segura más pequeña y ejecuta las comprobaciones requeridas.
3. Abre un PR hacia `main`.
4. Después de su integración, incorpora la misma corrección en `develop` para evitar una regresión.
