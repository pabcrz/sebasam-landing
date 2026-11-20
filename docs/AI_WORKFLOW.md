# Flujo de trabajo con IA para la landing de SEBASAM

Este es el flujo de trabajo canónico para asistentes de IA en este repositorio público de Astro. Los archivos de instrucciones específicos de cada herramienta deben remitir aquí, sin duplicar ni debilitar estas reglas.

## Ruta rápida

1. Lee el issue, confirma que tenga `status:approved` e identifica sus criterios de aceptación.
2. Sigue [`docs/GITFLOW.md`](GITFLOW.md) y trabaja en una rama respaldada por un issue.
3. Inspecciona el árbol de trabajo antes de editar y conserva los cambios ajenos del usuario.
4. Implementa la solución completa más pequeña dentro del alcance aprobado.
5. Verifica contenido, accesibilidad, SEO, comprobaciones de Astro y compilación estática de producción, según corresponda.
6. Entrega la lista de archivos modificados, los resultados exactos de verificación y los riesgos pendientes.

## Reglas para issues, ramas y PR

| Tema | Regla |
|---|---|
| Issue primero | La implementación inicia únicamente a partir de un issue de GitHub con la etiqueta `status:approved`. Las ideas nuevas o el trabajo de seguimiento descubierto requieren un issue separado. |
| Alcance | Una rama y un PR cubren un issue aprobado o una sección de revisión acordada explícitamente. No incluyas limpieza ajena al alcance. |
| Rama base | Las ramas de funcionalidades, correcciones, documentación y mantenimiento parten de `develop`. Las ramas de release y hotfix siguen `docs/GITFLOW.md`. |
| Nombre de rama | Incluye el número del issue; por ejemplo, `feature/14-contact-actions`, `fix/27-canonical-url` o `docs/31-content-guide`. |
| Vinculación del issue | Cada PR incluye `Closes #<number>` para su issue aprobado. |
| Etiqueta del PR | Cada PR tiene exactamente una etiqueta `type:*` que corresponde al cambio principal. |
| Commits | Usa Conventional Commits atómicos. Mantén juntos el código, las comprobaciones y la documentación cuando formen una sola entrega. |

## Clasificación de etiquetas

| Etiqueta | Uso |
|---|---|
| `status:needs-review` | Se aplica automáticamente a los nuevos issues de errores y funcionalidades pendientes de evaluación. |
| `status:approved` | La aplica una persona responsable del mantenimiento cuando el issue está listo para implementarse. |
| `bug` | La aplica automáticamente el formulario de reporte de errores. |
| `enhancement` | La aplica automáticamente el formulario de solicitud de funcionalidades. |
| `type:bug` | El PR corrige principalmente un defecto. |
| `type:feature` | El PR agrega o mejora principalmente un comportamiento visible para el usuario. |
| `type:docs` | El PR modifica únicamente documentación. |
| `type:refactor` | El PR reorganiza código sin cambios de comportamiento previstos. |
| `type:chore` | El PR modifica principalmente mantenimiento, herramientas o configuración de compilación. |
| `type:breaking-change` | El PR introduce intencionalmente un cambio incompatible. |

Los formularios de issues solo pueden aplicar etiquetas que ya existan en el repositorio de GitHub. Las personas responsables del mantenimiento crean las etiquetas y aplican `status:approved`; quienes contribuyen seleccionan exactamente una etiqueta `type:*` para cada PR.

## Seguridad del repositorio público

- Nunca incluyas en commits secretos, credenciales, tokens, llaves privadas, archivos `.env`, datos privados de clientes ni datos operativos de uso exclusivamente interno.
- Nunca incluyas rutas personales de equipos, ajustes personales de editores ni URL de servicios locales como instrucciones del repositorio.
- Usa marcadores de posición en los ejemplos y revisa las diferencias antes de la entrega para detectar datos sensibles incluidos por accidente.
- No expongas afirmaciones comerciales sin publicar, precios, inventario, calificaciones, zonas de servicio ni información de clientes.

## Límites de arquitectura

| Tema | Regla |
|---|---|
| Renderizado | Prefiere componentes de Astro y HTML estático. Agrega JavaScript del lado del cliente solo cuando el requisito no pueda resolverse con HTML y CSS. |
| Estilos | Usa CSS nativo, tokens de diseño compartidos y estilos con alcance por componente cuando corresponda. No agregues Tailwind. |
| Frameworks de interfaz | No agregues React ni otro framework del cliente sin un issue aprobado explícitamente y una necesidad documentada. |
| Fuentes de datos | La primera versión no tiene CMS, base de datos, dependencia de Supabase ni API en tiempo de ejecución. No agregues ninguno sin un issue aprobado explícitamente. |
| Dependencias | Prefiere las capacidades de la plataforma y de Astro. Agrega un paquete solo cuando el requisito aprobado justifique su costo de mantenimiento y de rendimiento en el cliente. |
| Salida | Mantén la compatibilidad del sitio con la salida estática de Astro, salvo que un issue aprobado cambie la arquitectura de despliegue. |

## Disciplina de fuentes de contenido

- Usa [`docs/content-brief.md`](content-brief.md) como documento de referencia del producto y del contenido.
- Centraliza los datos compartidos y confirmados del negocio en `src/content/business.ts`.
- Las páginas y los componentes deben consumir los datos compartidos del negocio, en lugar de duplicar teléfonos, direcciones, horarios, servicios, productos o enlaces de mapas.
- Mantén los metadatos específicos de cada ruta separados y deriva los datos comunes de la organización de la misma fuente confirmada.
- No inventes ni infieras datos del negocio. Señala el contenido faltante o contradictorio para que lo confirme una persona responsable del mantenimiento.
- Usa español profesional de México (es-MX), sin voseo, tanto en el contenido público como en toda la documentación del repositorio, conforme a [`docs/content-brief.md`](content-brief.md). Conserva comandos, identificadores, nombres de archivo, URL, etiquetas y convenciones técnicas cuando su traducción altere su validez.

## Accesibilidad y SEO

- Usa HTML semántico y conserva una estructura lógica de encabezados.
- Asegura acceso completo con teclado, estados de foco visibles, contraste suficiente y objetivos táctiles de al menos 44 píxeles CSS.
- Proporciona texto alternativo útil para imágenes informativas y `alt=""` para imágenes decorativas.
- Respeta `prefers-reduced-motion` y evita movimiento que impida comprender o utilizar la interfaz.
- Mantén todas las rutas públicas utilizables sin JavaScript del lado del cliente, salvo que un requisito aprobado indique lo contrario.
- Proporciona títulos, descripciones y URL canónicas únicos por ruta.
- Mantén los datos de Open Graph, los datos estructurados del negocio local, los datos de contacto, el sitemap y `robots.txt` alineados con el contenido confirmado.
- No publiques afirmaciones sin verificar en los datos estructurados.

## Comprobaciones antes de la entrega

Ejecuta las comprobaciones adecuadas al cambio, con estos comandos como base mínima de implementación:

```bash
pnpm astro check
pnpm build
```

Revisa también los enlaces Markdown modificados, la sintaxis YAML, las rutas generadas, los metadatos, el comportamiento con teclado, los diseños adaptables y la coherencia del contenido cuando se vean afectados.

Si `pnpm astro check` solicita un paquete opcional que no está instalado, informa esa limitación. No agregues dependencias salvo que el issue las requiera claramente o lo apruebe una persona responsable del mantenimiento.

Registra el comando exacto y el resultado de cada comprobación. Si se omite o bloquea una comprobación, explica el motivo y describe el riesgo pendiente.

## Referencias

- [`docs/GITFLOW.md`](GITFLOW.md): flujo de ramas, PR, releases y hotfixes.
- [`docs/content-brief.md`](content-brief.md): documento de referencia confirmado del producto y del contenido.
- [`docs/architecture.md`](architecture.md): expectativas de implementación, diseño, accesibilidad, SEO, recursos, alcance, hoja de ruta y verificación.
- [`.github/PULL_REQUEST_TEMPLATE.md`](../.github/PULL_REQUEST_TEMPLATE.md): evidencia y lista de verificación requeridas para los PR.
