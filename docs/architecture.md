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
│   └── info.astro
└── styles/
    ├── global.css
    └── tokens.css
```

Reglas:

- `business.ts` es la única fuente para datos comerciales compartidos.
- `BaseLayout.astro` centraliza idioma, metadata, favicons, canonical y estructura base.
- `/` y `/info` reutilizan acciones de contacto, horarios y footer; no duplican teléfonos, dirección ni enlaces.
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

### V1

- Usar una fotografía real potente del taller, una unidad o un trabajo.
- Aplicar overlay para garantizar legibilidad.
- Permitir movimiento CSS sutil, como zoom lento o desplazamiento controlado.
- Mantener una versión estática para usuarios con movimiento reducido.

### V2

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

## Activos necesarios

Antes de publicar v1 deben existir activos web optimizados:

- [ ] Logo completo en SVG.
- [ ] Símbolo compacto en SVG.
- [ ] Favicon de alto contraste.
- [ ] Apple touch icon.
- [ ] Fotografía horizontal real para el hero.
- [ ] Fotografías reales de trabajos, unidades o refacciones.
- [ ] Imagen Open Graph de `1200 × 630` px.

Cada imagen debe tener una versión responsiva, dimensiones explícitas y texto alternativo cuando aporte información. Las imágenes decorativas deben usar `alt=""`.

## Verificación automatizada

La entrega mínima debe ejecutar:

```bash
pnpm astro check
pnpm build
```

Las pruebas o verificaciones de contenido deben confirmar que `/` y `/info` se generan en el build estático, ambas rutas consumen `business.ts`, WhatsApp, teléfonos y Maps usan enlaces válidos, la metadata y canonical son distintas por ruta, y no existen dependencias de Supabase, CMS o APIs en v1.

## Alcance de v1

### Incluido

- Landing `/` y tarjeta pública `/info`.
- Contenido centralizado.
- Logo y favicon.
- Contacto por WhatsApp y teléfono.
- Dirección, Maps y horarios.
- Servicios, productos y unidades atendidas.
- Fotografías reales.
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
- [ ] `/` y `/info` funcionan en móvil y desktop.
- [ ] Las fotografías publicadas son reales o están claramente tratadas como ilustración.
- [ ] Las animaciones respetan `prefers-reduced-motion`.
- [ ] `pnpm astro check` pasa.
- [ ] `pnpm build` pasa.
- [ ] La URL final usa HTTPS y metadata social correcta.
