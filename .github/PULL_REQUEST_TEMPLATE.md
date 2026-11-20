## Issue vinculado

Closes #N

El issue vinculado debe tener `status:approved` antes de abrir este PR.

## Tipo

Marca exactamente una opción y aplica al PR la etiqueta `type:*` correspondiente.

- [ ] `type:bug` - Corrección de un error
- [ ] `type:feature` - Funcionalidad nueva o mejora
- [ ] `type:docs` - Solo documentación
- [ ] `type:refactor` - Reorganización interna sin cambios de comportamiento
- [ ] `type:chore` - Mantenimiento, herramientas o compilación
- [ ] `type:breaking-change` - Cambio incompatible

## Resumen

- <!-- Resume el resultado en uno a tres puntos. -->

## Cambios

| Archivo o área | Cambio |
|---|---|
| `path/to/file` | Describe el cambio relevante. |

## Plan de pruebas

- [ ] `pnpm astro check`
- [ ] `pnpm build`
- [ ] Revisé las páginas afectadas en tamaños de móvil y escritorio, cuando corresponde.
- [ ] Verifiqué el acceso con teclado, el foco, el contraste, el movimiento reducido y los textos alternativos de imágenes, cuando corresponde.
- [ ] Verifiqué los metadatos por ruta, las URL canónicas, los datos estructurados y la coherencia del contenido público, cuando corresponde.

Registra las comprobaciones omitidas o bloqueadas y su riesgo pendiente:

<!-- Comprobación: motivo por el que no se ejecutó; riesgo pendiente. -->

## Lista de verificación para contribuciones

- [ ] Vinculé un issue aprobado con `Closes #N`.
- [ ] Seleccioné y apliqué exactamente una etiqueta `type:*`.
- [ ] Este PR contiene una unidad de trabajo con alcance definido que puede revisarse.
- [ ] Los mensajes de commit siguen Conventional Commits.
- [ ] Conservé los cambios ajenos del árbol de trabajo y evité cambios fuera del alcance.
- [ ] No agregué secretos, archivos `.env`, datos privados ni rutas personales de equipos.
- [ ] El contenido compartido del negocio sigue centralizado y contiene únicamente afirmaciones confirmadas.
- [ ] No agregué React, Tailwind, un CMS, una base de datos ni una API sin aprobación explícita en el issue.
- [ ] Actualicé la documentación pertinente cuando cambió el comportamiento o el flujo de trabajo.
