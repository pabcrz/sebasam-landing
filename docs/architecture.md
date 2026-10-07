# Arquitectura, diseño y entrega

La primera versión debe mantenerse rápida, mobile-first, honesta, accesible y fácil de mantener. Este documento conserva las decisiones de implementación y los criterios de calidad del sitio.

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
- `BaseLayout.astro` centraliza idioma, metadata, favicons, canonical y estructura base.
- `/`, `/info` y `/muelles` reutilizan datos centralizados y componentes compartidos; no duplican teléfonos, dirección, horarios ni enlaces.
- La salida es HTML estático por defecto. Agregar JavaScript cliente únicamente cuando una interacción no pueda resolverse con HTML y CSS.
- La landing no consulta Supabase ni depende de la aplicación operativa en v1.

## Dirección visual

- Mobile-first.
- Fotografías reales del taller y trabajos.
- Contraste alto y tipografía legible.
- Superficies oscuras inspiradas en el azul navy de SEBASAM.
- Animaciones con propósito, no decoraciones constantes.
- La honestidad visual importa: no presentar imágenes generadas como evidencia de trabajos reales.

Usar CSS nativo con variables en `src/styles/tokens.css` y `src/styles/global.css`. Los tokens deben representar colores, tipografía, espacios, radios, sombras y velocidades de animación. Los componentes Astro pueden usar estilos scoped.

Se puede recrear con CSS nativo un efecto inspirado en Magic UI Border Beam, sin instalar Magic UI ni React. Usarlo únicamente en el CTA principal de WhatsApp, la tarjeta de contacto en `/info` o un elemento importante del hero si mejora la jerarquía. No aplicarlo a todas las tarjetas y ofrecer una alternativa sin animación mediante `prefers-reduced-motion`.

## Fotografía y hero

### Versión actual

- No usar fotografías de stock o generadas como evidencia de trabajos reales.
- La implementación actual usa PNG de marca y superficies CSS; no incorpora fotografías del taller.
- La selección de fotografías queda para una etapa futura. Usar imágenes reales del taller, unidades, trabajos o refacciones, optimizadas para web responsiva, con dimensiones explícitas y texto alternativo útil.

### Exploración futura

Explorar una transición visual: `Camión completo → vista trasera → chasis descubierto → acercamiento a ejes y suspensión`. Para funcionar profesionalmente, las imágenes deben conservar cámara, perspectiva, escala e iluminación. La implementación puede usar una secuencia controlada por scroll, crossfades o máscaras.

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
- Favicon y Apple touch icon.
- Información estructurada de negocio local cuando la información esté confirmada.
- Nombre, dirección y teléfonos consistentes en todas las páginas.
- Sitemap y `robots.txt`.

Agregar JSON-LD de Schema.org con un tipo compatible con taller automotriz, preferentemente `AutoRepair`, usando los mismos datos de `business.ts`: nombre y descriptor, teléfonos, dirección postal, horarios, URL canónica y enlace de Google Maps. No publicar precios, inventario, calificaciones ni áreas de servicio no confirmadas.

## Activos actuales

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

Las pruebas o verificaciones de contenido deben confirmar que `/`, `/info` y `/muelles` se generan en el build estático, las rutas consumen `business.ts`, WhatsApp, teléfonos y Maps usan enlaces válidos, la metadata y canonical son distintas por ruta, y no existen dependencias de Supabase, CMS o APIs en v1.

## Alcance de v1

### Incluido

- Landing `/`, tarjeta pública `/info` y página de servicio `/muelles`.
- Contenido centralizado.
- Logo y favicon.
- Contacto por WhatsApp y teléfono.
- Dirección, Maps y horarios.
- Servicios, productos y unidades atendidas.
- Activos PNG de marca y favicon existentes; selección futura de fotografías reales fuera de este cambio.
- SEO y accesibilidad base.
- Despliegue en Vercel.

### Fuera de alcance

- CMS o edición desde admin.
- Base de datos.
- Formularios con almacenamiento.
- Ecommerce o pagos.
- Inventario en línea.
- Precios públicos.
- Chat automático.
- Animación avanzada de despiece del camión.
- Integración con la aplicación operativa.

## Roadmap inicial

1. Copiar y optimizar los activos de marca.
2. Crear tokens y estilos globales.
3. Implementar `business.ts`.
4. Construir layout, header y footer.
5. Construir `/info` como primera página funcional.
6. Construir el hero y secciones de `/`.
7. Seleccionar y optimizar fotografías reales.
8. Agregar metadata, sitemap, robots y datos estructurados.
9. Verificar móvil, accesibilidad y rendimiento.
10. Desplegar en Vercel y conectar `sebasam.online`.

## Criterios de terminado para v1

- [ ] WhatsApp abre una conversación con el número correcto.
- [ ] Ambos teléfonos pueden marcarse desde móvil.
- [ ] Google Maps abre la ubicación correcta.
- [ ] Horarios, servicios y productos coinciden con [`docs/content-brief.md`](content-brief.md).
- [ ] `/`, `/info` y `/muelles` funcionan en móvil y desktop.
- [ ] Las fotografías futuras publicadas son reales o están claramente tratadas como ilustración.
- [ ] Las animaciones respetan `prefers-reduced-motion`.
- [ ] `pnpm astro check` pasa.
- [ ] `pnpm build` pasa.
- [ ] La URL final usa HTTPS y metadata social correcta.
