# Arquitectura, diseño y entrega

La primera versión debe mantenerse rápida, diseñada primero para móviles, honesta, accesible y fácil de mantener. Este documento conserva las decisiones de implementación y los criterios de calidad del sitio.

## Arquitectura de implementación

```text
src/
├── components/
│   ├── BusinessHours.astro
│   ├── ContactActions.astro
│   ├── Footer.astro
│   └── Header.astro
├── content/
│   └── business.ts
├── layouts/
│   └── BaseLayout.astro
├── pages/
│   ├── index.astro
│   ├── info.astro
│   └── muelles.astro
└── styles/
    ├── global.css
    └── tokens.css
```

Reglas:

- `business.ts` es la única fuente para datos comerciales compartidos.
- `BaseLayout.astro` centraliza idioma, metadatos, favicons, URL canónica y estructura base.
- `/`, `/info` y `/muelles` reutilizan datos centralizados y componentes compartidos; no duplican teléfonos, dirección, horarios ni enlaces.
- La salida es HTML estático por defecto. Agregar JavaScript cliente únicamente cuando una interacción no pueda resolverse con HTML y CSS.
- La landing no consulta Supabase ni depende de la aplicación operativa en v1.

### Experiencia móvil e idioma (#39)

- El logo se conserva como imagen; el H1 de la portada presenta el descriptor textual confirmado de `business.ts`, independiente de las imágenes.
- El grupo inicial de contacto existente se ubica junto al descriptor y la propuesta de valor. No se duplican acciones ni se cambian destinos, y no se agrega una acción telefónica nueva.
- Los cinco servicios de la portada usan una cuadrícula visible: una columna en pantallas angostas, dos desde 700 px y cinco desde 960 px. No requieren desplazamiento horizontal.
- El menú móvil conserva el checkbox nativo, su estado marcado y su control por Espacio. El nombre «Menú de navegación» describe ambos estados; `:focus-visible` del checkbox dibuja un contorno sobre la etiqueta visible de 44 × 44 px. Los enlaces cerrados siguen fuera del recorrido de Tab.
- `BaseLayout.astro` declara `lang="es-MX"`. Las preguntas frecuentes de muelles y la página 404 usan español de México sin voseo.
- Se conservan las reglas globales de movimiento reducido: el contenido permanece visible y la X del menú sigue indicando el estado abierto.

Estos cambios no incluyen contactos adicionales (#40), imagen social, CI ni confirmación de despliegue.

## Dirección visual

- Diseño primero para móviles.
- Fotografías reales del taller y trabajos.
- Contraste alto y tipografía legible.
- Superficies oscuras inspiradas en el azul marino de SEBASAM.
- Animaciones con propósito, no decoraciones constantes.
- La honestidad visual importa: no presentar imágenes generadas como evidencia de trabajos reales.

Usar CSS nativo con variables en `src/styles/tokens.css` y `src/styles/global.css`. Los tokens deben representar colores, tipografía, espacios, radios, sombras y velocidades de animación. Los componentes Astro pueden usar estilos con alcance por componente.

Se puede recrear con CSS nativo un efecto inspirado en Magic UI Border Beam, sin instalar Magic UI ni React. Usarlo únicamente en el llamado a la acción (CTA) principal de WhatsApp, la tarjeta de contacto en `/info` o un elemento importante de la sección principal si mejora la jerarquía. No aplicarlo a todas las tarjetas y ofrecer una alternativa sin animación mediante `prefers-reduced-motion`.

## Fotografía y sección principal

### Versión actual

- No usar fotografías de catálogo o generadas como evidencia de trabajos reales.
- La implementación actual usa PNG de marca y superficies CSS; no incorpora fotografías del taller.
- La selección de fotografías queda para una etapa futura. Usar imágenes reales del taller, unidades, trabajos o refacciones, optimizadas para web responsiva, con dimensiones explícitas y texto alternativo útil.

### Exploración futura

Explorar una transición visual: `Camión completo → vista trasera → chasis descubierto → acercamiento a ejes y suspensión`. Para funcionar profesionalmente, las imágenes deben conservar cámara, perspectiva, escala e iluminación. La implementación puede usar una secuencia controlada por desplazamiento, fundidos cruzados o máscaras.

No implementar esta transición en la primera versión si compromete rendimiento, accesibilidad o fecha de lanzamiento.

## Accesibilidad y rendimiento

- HTML semántico y navegación completa mediante teclado.
- Contraste suficiente y áreas táctiles de al menos 44 px.
- `alt` descriptivo en fotografías informativas.
- `prefers-reduced-motion` en todas las animaciones.
- Imágenes en formatos modernos y tamaños responsivos.
- Evitar JavaScript cliente cuando HTML y CSS sean suficientes.
- Objetivo Lighthouse alto en rendimiento, accesibilidad, buenas prácticas y SEO.

## SEO mínimo

- Título y descripción únicos para `/` y `/info`.
- URL canónica, Open Graph y tarjeta social.
- Favicon e icono de Apple.
- Información estructurada de negocio local cuando la información esté confirmada.
- Nombre, dirección y teléfonos consistentes en todas las páginas.
- Sitemap y `robots.txt`.

Agregar JSON-LD de Schema.org con un tipo compatible con taller automotriz, preferentemente `AutoRepair`, usando los mismos datos de `business.ts`: nombre y descriptor, teléfonos, dirección postal, horarios, URL canónica y enlace de Google Maps. No publicar precios, inventario, calificaciones ni áreas de servicio no confirmadas.

## Recursos actuales

El repositorio actualmente incluye estos recursos PNG e ICO; no se requieren archivos SVG para el sitio actual:

```text
public/
├── apple-touch-icon.png
├── favicon-32x32.png
├── favicon-48x48.png
├── favicon.ico
└── brand/
    ├── sebasam-logo-dark.png
    ├── sebasam-logo-light.png
    ├── sebasam-mark-192.png
    ├── sebasam-mark-512.png
    ├── sebasam-mark-dark.png
    └── sebasam-mark-light.png
```

No es necesario crear SVG para el sitio actual. La selección de fotografías queda para un cambio futuro; deberán ser reales, optimizadas, contar con dimensiones explícitas y texto alternativo adecuado cuando transmitan información.

## Verificación automatizada

La entrega mínima debe ejecutar:

```bash
pnpm astro check
pnpm build
```

Las pruebas o verificaciones de contenido deben confirmar que `/`, `/info` y `/muelles` se generan en la compilación estática, las rutas consumen `business.ts`, WhatsApp, teléfonos y Maps usan enlaces válidos, los metadatos y las URL canónicas son distintos por ruta, y no existen dependencias de Supabase, CMS o APIs en v1.

### Regresión de navegador para #39

`tests/issue-39-browser.js` se ejecuta mediante `run-code --filename` de una instalación disponible de `playwright-cli`; la herramienta no es una dependencia del proyecto y estos comandos no la instalan. Con el servidor local de prueba ya iniciado, sustituye `<URL_LOCAL_DE_PRUEBA>` por su dirección de loopback:

```sh
export PW_SESSION=b39
playwright-cli -s="$PW_SESSION" open '<URL_LOCAL_DE_PRUEBA>'
sh tests/issue-39-browser.sh
```

El script toma el origen de la página abierta en la sesión y rechaza destinos que no sean HTTP(S) de loopback (`localhost`, `127.0.0.1` o `::1`). No fija un puerto. El envoltorio usa `PW_SESSION` si está definida, o `b39` por defecto. Si el entorno requiere `PWTEST_SOCKETS_DIR`, expórtala con el directorio temporal autorizado antes de abrir la sesión; tanto el CLI como el envoltorio heredan esa variable sin modificarla.

La prueba comprueba el DOM servido, Tab y Espacio reales, cuatro anchos, contenido sin imágenes, contactos y metadatos preservados, y movimiento reducido. El envoltorio imprime la salida completa del CLI, conserva sus códigos de error y devuelve código 1 si falta el marcador final de éxito o aparece `FAIL`, aunque la herramienta devuelva 0. Los casos fallidos se informan individualmente; no basta con el código de salida de la herramienta.

La comparación de producción, Lighthouse y la inspección visual final son verificaciones separadas.

## Alcance de v1

### Incluido

- Landing `/`, tarjeta pública `/info` y página de servicio `/muelles`.
- Contenido centralizado.
- Logo y favicon.
- Contacto por WhatsApp y teléfono.
- Dirección, Maps y horarios.
- Servicios, productos y unidades atendidas.
- Recursos PNG de marca y favicon existentes; selección futura de fotografías reales fuera de este cambio.
- SEO y accesibilidad base.
- Despliegue en Vercel.

### Fuera de alcance

- CMS o edición desde un panel de administración.
- Base de datos.
- Formularios con almacenamiento.
- Comercio electrónico o pagos.
- Inventario en línea.
- Precios públicos.
- Chat automático.
- Animación avanzada de despiece del camión.
- Integración con la aplicación operativa.

## Hoja de ruta inicial

1. Copiar y optimizar los recursos de marca.
2. Crear tokens y estilos globales.
3. Implementar `business.ts`.
4. Construir la plantilla base, el encabezado y el pie de página.
5. Construir `/info` como primera página funcional.
6. Construir la sección principal y las secciones de `/`.
7. Seleccionar y optimizar fotografías reales.
8. Agregar metadatos, sitemap, robots y datos estructurados.
9. Verificar móvil, accesibilidad y rendimiento.
10. Desplegar en Vercel y conectar `sebasam.online`.

## Criterios de terminado para v1

- [ ] WhatsApp abre una conversación con el número correcto.
- [ ] Ambos teléfonos pueden marcarse desde móvil.
- [ ] Google Maps abre la ubicación correcta.
- [ ] Horarios, servicios y productos coinciden con [`docs/content-brief.md`](content-brief.md).
- [ ] `/`, `/info` y `/muelles` funcionan en móvil y escritorio.
- [ ] Las fotografías futuras publicadas son reales o están claramente tratadas como ilustración.
- [ ] Las animaciones respetan `prefers-reduced-motion`.
- [ ] `pnpm astro check` pasa.
- [ ] `pnpm build` pasa.
- [ ] La URL final usa HTTPS y metadatos sociales correctos.
