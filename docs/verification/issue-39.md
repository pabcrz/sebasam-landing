# Verificación del issue #39

## Alcance

H1 textual con contenido confirmado, contacto inicial sin duplicación, servicios descubribles en móvil, foco perceptible del menú e idioma es-MX. Se conservan Astro estático, TypeScript, CSS nativo y los datos comerciales centralizados. No incluye contactos nuevos (#40), imagen social (#41), CI (#42), merge ni publicación.

Base local: `f00f139`. Unidades de implementación: `5048db0` (documentación) y `9254aac` (interfaz y regresión). Un único PR a `develop`, según lo solicitado; la traducción documental representa la mayor parte de las líneas modificadas.

## Reproducción antes del cambio

Con teclado real, a 390 × 844: Tab lleva al enlace de salto, a la marca y al checkbox del menú. El checkbox recibe foco, pero mide 1 × 1 px y tiene opacidad 0; su etiqueta visible de 44 × 44 px no muestra contorno. Espacio abre el menú y Tab recorre sus seis enlaces. Se confirmó así la diferencia entre operabilidad y foco perceptible antes de editar fuentes.

Además:

- El H1 de portada no contenía texto y dependía de una imagen.
- El primer WhatsApp del contenido quedaba debajo del primer pliegue en móvil y tablet.
- Los servicios usaban un carril horizontal a 320 y 390 px.
- Movimiento reducido ya conservaba el contenido y la X del menú: se mantuvo y se comprobó, sin reescribir CSS global.

## Resultado por criterio

| Criterio | Evidencia final |
|---|---|
| H1 sin imágenes | Texto del descriptor centralizado presente y legible; logo conservado. |
| WhatsApp | El grupo existente se reubica junto a la propuesta, dentro del primer viewport a 320/390/768/1440 px. Mismos destinos y cantidad de enlaces; sin llamada móvil nueva. |
| Servicios | Cinco servicios confirmados, accesibles por desplazamiento vertical; una/dos/cinco columnas según ancho. Sin desbordamiento horizontal. |
| Teclado y foco | Tab/Espacio, apertura/cierre, orden de seis enlaces y exclusión de enlaces cerrados comprobados. El foco del checkbox se proyecta sobre su etiqueta visible. |
| Movimiento reducido | Contenido visible, apertura/cierre y X del menú conservados. Foco perceptible tanto con movimiento normal como reducido. |
| Idioma | `lang="es-MX"`, eliminación de voseo en muelles y 404, documentación y formularios traducidos; instrucciones de idioma alineadas. |
| Compatibilidad | Títulos, descripciones, canónicas, contactos y datos estructurados preservados en las rutas comparadas, salvo los cambios de idioma solicitados. |

Las capturas del build final se inspeccionaron a 320, 390, 768 y 1440 px, además de los estados de foco, menú abierto/cerrado con movimiento reducido y H1 sin imágenes. No se realizó un rediseño general ni se agregaron fotografías o JavaScript cliente.

## Comprobaciones y salidas

- `pnpm astro check`, antes y después: código **0**, **0 errores, 0 advertencias y 3 hints**. Permanecen los hints previos de `pathname`, `rel` y `onload`; su revisión corresponde al #42, no se ocultaron diagnósticos.
- `pnpm build`, antes y después: código **0**, salida estática de `/`, `/info`, `/muelles`, `/404.html` y sitemap.
- `sh tests/issue-39-browser.sh`: **RED 1** antes de implementar S1/S2/S3/S4/S6; S5 ya pasaba. **GREEN 0** después, tanto en desarrollo como sobre la compilación estática local. El envoltorio exige `ISSUE_39_OK` porque el CLI puede devolver 0 aunque haya errores de aserción.
- Comparación diferencial mediante un único script temporal de interfaces públicas: **16 comparaciones conformes** de `/info` y `/muelles`, cuatro anchos y dos preferencias de movimiento; diferencias admitidas solo para idioma y foco solicitados. La prueba versionada no consulta historial Git.
- Análisis YAML y comparación estructural contra la base: código **0**; identificadores, etiquetas, orden y restricciones obligatorias conservados. Comparación de destinos Markdown: código **0** después de restaurar un enlace detectado durante la traducción.
- `git diff --check` y `sh -n tests/issue-39-browser.sh`: código **0**.
- `shellcheck`: no disponible; no se instaló. Se realizó comprobación sintáctica POSIX, que no sustituye todo el análisis de ShellCheck.

La ejecución de la regresión con una sesión local se describe en [la arquitectura](../architecture.md#regresión-de-navegador-para-39). Playwright CLI no se añadió como dependencia del proyecto.

## Lighthouse móvil comparable

Lighthouse **13.5.0**, perfil móvil Moto G Power 2022, red y CPU simuladas con las mismas opciones, una ejecución por versión sobre compilaciones estáticas locales. No es una medición del sitio desplegado ni una garantía de puntaje.

| Métrica | Antes | Después |
|---|---:|---:|
| Rendimiento | 83 | 84 |
| Accesibilidad | 100 | 100 |
| SEO | 100 | 100 |
| FCP | 2643 ms | 2636 ms |
| LCP | 3834 ms | 3754 ms |
| TBT | 5 ms | 74 ms |
| CLS | 0.00183 | 0.00071 |

Se investigó el aumento de TBT: la auditoría de tareas largas atribuyó la tarea mayor al Google Tag Manager existente (60 → 124 ms) y registró otra tarea local de 52 ms. No se agregó JavaScript cliente. Esta observación no prueba causalidad ni descarta toda variación; se conserva el resultado, sin repetir auditorías para buscar un puntaje favorable. El 100 de accesibilidad inicial tampoco detectó el foco imperceptible: no sustituye la comprobación manual con teclado.

## Limitaciones y entrega

- `ASSESS` informó que los archivos sin seguimiento requieren declaración explícita, incluso al solicitar un rango de commits. La persona responsable eligió resolver la revisión antes de publicar. Tras inspección y exclusión explícita de archivos sin seguimiento, el proveedor admitió el candidato del PR hasta `9254aac`: 19 archivos, 815 líneas modificadas, lentes de legibilidad y confiabilidad. La revisión `review-00349367ba9e442c` terminó aprobada; el reconocimiento exacto finalizó con `native-approved-acknowledgement-completed` y autoridad consumida. Esto no autoriza publicar, integrar ni desplegar.
- El proveedor clasificó alto el candidato por `shell_process` en el nuevo envoltorio. La primera ejecución independiente salió con código 1 porque no encontró la sesión de navegador existente; el envoltorio conservó el código del CLI. Con nueva autorización humana se abrió una sesión propia en el mismo entorno aislado: apertura **0**, una ejecución de la regresión **0** (siete PASS, `ISSUE_39_OK`, `CLI=0`), stderr vacío y cierre **0**. El verificador confirmó que ambos scripts coinciden byte a byte con `9254aac` y no observó mutaciones del repositorio. La verificación independiente quedó aprobada; el fallo previo se conserva como incidente de entorno, no como defecto del sitio. La publicación remota requiere autorización separada.
- El primer intento de navegador falló por la longitud del socket; se resolvió con autorización humana para herramientas temporales, sin cambiar dependencias del proyecto. Un servidor de desarrollo entregó CSS anterior y se reinició; la evidencia final corresponde también a producción local, no solo al servidor de desarrollo.
- Confirmar el commit integrado en producción requiere merge y despliegue posteriores autorizados. Esa verificación permanece pendiente y no se afirma realizada.

Risk: item 5 — entorno de verificación: el nuevo envoltorio ejecuta Playwright como proceso externo. Riesgo nativo alto por `shell_process`; revisión nativa y ejecución independiente en entorno aislado aprobadas. No se modifican almacenamiento, dependencias del proyecto ni entrega automatizada.
