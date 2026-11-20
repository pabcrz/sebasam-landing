# Instrucciones para agentes

Sigue el flujo de trabajo canónico del repositorio en [`docs/AI_WORKFLOW.md`](docs/AI_WORKFLOW.md).

## Reglas obligatorias

- Trabaja a partir de un issue de GitHub aprobado y mantén una rama y un PR con alcance definido por issue.
- Sigue el modelo de ramas y publicaciones en [`docs/GITFLOW.md`](docs/GITFLOW.md).
- Vincula cada PR con `Closes #N`, aplica exactamente una etiqueta `type:*` y usa Conventional Commits.
- Usa español profesional de México (es-MX), sin voseo, en la interfaz y en toda la documentación del repositorio. Conserva comandos, identificadores y convenciones técnicas válidas.
- Trata este repositorio como público: nunca agregues secretos, credenciales, datos privados de clientes ni rutas personales de equipos.
- Conserva la arquitectura de Astro con prioridad estática, TypeScript y CSS nativo.
- No agregues React, Tailwind, un CMS, una base de datos ni una integración con API sin un issue aprobado explícitamente.
- Centraliza el contenido compartido del negocio en lugar de duplicarlo entre páginas o componentes.
- Ejecuta `pnpm astro check` y `pnpm build` antes de la entrega. Informa qué comprobaciones no se pudieron ejecutar y por qué.
