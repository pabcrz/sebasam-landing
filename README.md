# SEBASAM Landing

Sitio público de SEBASAM para presentar el taller, explicar sus servicios y facilitar el contacto por WhatsApp, teléfono y Google Maps.

El sitio se construye como un proyecto independiente de la aplicación operativa. La primera versión debe ser rápida, mobile-first, honesta y fácil de mantener.

## Objetivo

Convertir visitas en conversaciones reales con el taller.

La jerarquía de conversión es:

1. Contactar por WhatsApp.
2. Llamar al taller.
3. Obtener indicaciones para llegar.

## Arquitectura pública

| Ruta | Propósito |
|---|---|
| `sebasam.online/` | Landing comercial principal. |
| `sebasam.online/info` | Tarjeta informativa para compartir mediante QR. |

La aplicación operativa de cotizaciones, pagos y administración vive en otro proyecto y no forma parte de este repositorio.

## Stack

- Astro 7.
- TypeScript estricto.
- CSS nativo.
- HTML estático por defecto.
- Vercel para despliegue.
- Lucide cuando se requieran iconos de interfaz.

No se usará Tailwind, React, un CMS ni una base de datos en la primera versión.

## Desarrollo local

```bash
pnpm install
pnpm dev
```

El servidor local inicia en `http://localhost:4321`.

### Comandos

| Comando | Acción |
|---|---|
| `pnpm dev` | Inicia el servidor local. |
| `pnpm build` | Genera el sitio estático en `dist/`. |
| `pnpm preview` | Sirve localmente el build de producción. |
| `pnpm astro check` | Verifica tipos y componentes Astro. |

## Identidad de marca

### Nombre principal

**SEBASAM**

### Descriptor comercial

**Servicio y refacciones para suspensiones de aire y muelles.**

SEBASAM es la marca. El descriptor explica la especialidad del taller, pero no se presenta como el significado literal del acrónimo.

### Historia del nombre

SEBASAM nació como:

> **SE**rvicio **BAS**ico **A** Suspensiones de **A**ire y **M**uelles.

La historia puede aparecer en una sección breve de la landing:

> SEBASAM nació como “Servicio Básico a Suspensiones de Aire y Muelles”. Después de 30 años de experiencia, el nombre continúa representando nuestra especialidad y compromiso con cada cliente.

### Logotipos

Se manejarán dos variantes:

| Variante | Uso |
|---|---|
| Logo completo | Header, footer y piezas amplias. |
| Símbolo corto | Favicon, navegación móvil, avatar social y marca compacta. |

Archivos objetivo:

```text
public/brand/
├── sebasam-logo.svg
├── sebasam-mark.svg
├── favicon.svg
├── favicon-32.png
├── favicon-48.png
└── apple-touch-icon.png
```

El SVG original debe conservarse intacto. La versión web debe copiarse, optimizarse y probarse en tamaños pequeños. El favicon debe usar un fondo oscuro con el símbolo blanco para mantener contraste en pestañas claras y oscuras.

## Propuesta de valor

### Mensaje principal

> **30 años manteniendo tu unidad en movimiento.**

### Mensaje de confianza

> **Tu unidad y tu presupuesto van primero.**

### Explicación

> No cambiamos piezas por cambiar. Revisamos cada caso, explicamos las opciones y buscamos la mejor solución según las necesidades y el presupuesto del cliente, aunque no sea la alternativa que más dinero deje al taller.

La honestidad debe expresarse mediante comportamientos concretos. Evitar frases genéricas como “somos los mejores” o promesas que no puedan demostrarse.

## Contacto público

### WhatsApp y teléfono móvil

- Número visible: `55 3623 9346`
- WhatsApp: `https://wa.me/525536239346`
- Llamada: `tel:+525536239346`

CTA principal sugerido:

> **Cotizar por WhatsApp**

### Teléfono fijo

- Número visible: `55 5600 7675`
- Llamada: `tel:+525556007675`

### Dirección

**Batalla de Casa Blanca 1719B**  
**Leyes de Reforma 3.ª Sección, Iztapalapa, CDMX**

- Google Maps: <https://maps.app.goo.gl/mPve4xkMJr73Lxya8>
- CTA sugerido: **Cómo llegar**

### Horarios

- Lunes a viernes: 9:00 a. m. – 6:00 p. m.
- Sábado: 9:00 a. m. – 3:00 p. m.

El domingo no se menciona en el contenido público.

## Servicios

- Alineación a ejes traseros.
- Brio a muelles.
- Refuerzos.
- Soldadura.
- Ajuste de quinta rueda.

## Productos y refacciones

- Abrazaderas.
- Bujes.
- Perchas.
- Columpios.
- Tensores.
- Balancines.

Los productos no deben mostrarse como ecommerce. No publicar precios, inventario ni promesas de existencia. Usar el CTA:

> **Consulta disponibilidad por WhatsApp**

## Vehículos y clientes

SEBASAM atiende:

- Pickups y camionetas de trabajo.
- Camiones ligeros y medianos.
- Rabones, tortones y tándem.
- Tractocamiones y remolques.
- Unidades de flotilla mediante programación periódica.

Ejemplos reconocibles:

> Desde Nissan Estacas y NP300 hasta Ford F-350, RAM 3500, rabones y tortones.

Las flotillas se atienden por unidades programadas semanal, quincenal o mensualmente. No presentar al taller como un centro de recepción masiva de flotillas.

## Estructura de contenido

### `/` — Landing principal

Orden inicial recomendado:

1. Header con logo, navegación y CTA de WhatsApp.
2. Hero con propuesta de valor, experiencia y contacto principal.
3. Bloque de honestidad y confianza.
4. Servicios.
5. Tipos de unidades atendidas.
6. Productos y refacciones.
7. Galería de trabajos reales.
8. Ubicación, horarios y teléfonos.
9. CTA final de WhatsApp.
10. Footer con logo e información esencial.

### `/info` — Tarjeta pública para QR

Debe priorizar información accionable:

1. Logo y nombre.
2. Descriptor comercial.
3. WhatsApp.
4. Teléfonos móvil y fijo.
5. Dirección y Maps.
6. Horarios.
7. Servicios.
8. Productos.

Debe funcionar correctamente desde un teléfono y cargar rápido incluso con conexión limitada.

## Contenido centralizado

Los datos comerciales no deben repetirse manualmente entre páginas. Crear una fuente central:

```text
src/content/business.ts
```

Esta fuente debe contener:

- nombre y descriptor;
- teléfonos y enlaces;
- dirección y Google Maps;
- horarios;
- servicios;
- productos;
- tipos de vehículos;
- textos de confianza.

En una versión futura puede sustituirse por una API, CMS o integración con la aplicación operativa. Eso queda fuera de la primera versión.

## Dirección visual

### Principios

- Mobile-first.
- Fotografías reales del taller y trabajos.
- Contraste alto y tipografía legible.
- Superficies oscuras inspiradas en el azul navy de SEBASAM.
- Animaciones con propósito, no decoraciones constantes.
- La honestidad visual importa: no presentar imágenes generadas como evidencia de trabajos reales.

### CSS

Usar CSS nativo con variables de diseño:

```text
src/styles/
├── tokens.css
└── global.css
```

Los componentes Astro pueden usar estilos scoped. Los tokens deben representar colores, tipografía, espacios, radios, sombras y velocidades de animación.

### Border Beam

Se puede recrear con CSS nativo un efecto inspirado en Magic UI Border Beam. No instalar Magic UI ni React para implementarlo.

Usarlo únicamente en elementos destacados:

- CTA principal de WhatsApp.
- Tarjeta de contacto en `/info`.
- Un elemento importante del hero, si mejora la jerarquía.

No aplicarlo a todas las tarjetas. Debe existir una alternativa sin animación mediante `prefers-reduced-motion`.

## Fotografía y hero

### Versión 1

- Usar una fotografía real potente del taller, una unidad o un trabajo.
- Aplicar overlay para garantizar legibilidad.
- Permitir movimiento CSS sutil, como zoom lento o desplazamiento controlado.
- Mantener una versión estática para usuarios con movimiento reducido.

### Versión 2

Explorar una transición visual:

```text
Camión completo
→ vista trasera
→ chasis descubierto
→ acercamiento a ejes y suspensión
```

Para que funcione profesionalmente, las imágenes deben conservar cámara, perspectiva, escala e iluminación. La implementación puede usar una secuencia controlada por scroll, crossfades o máscaras.

No implementar esta transición en la primera versión si compromete rendimiento, accesibilidad o fecha de lanzamiento.

## Accesibilidad y rendimiento

- HTML semántico.
- Navegación completa mediante teclado.
- Contraste suficiente.
- `alt` descriptivo en fotografías informativas.
- Áreas táctiles de al menos 44 px.
- `prefers-reduced-motion` en todas las animaciones.
- Imágenes en formatos modernos y tamaños responsivos.
- Evitar JavaScript cliente cuando HTML y CSS sean suficientes.
- Objetivo Lighthouse alto en rendimiento, accesibilidad, buenas prácticas y SEO.

## SEO mínimo

- Título y descripción únicos para `/` y `/info`.
- URL canónica.
- Open Graph y tarjeta social.
- Favicon y Apple touch icon.
- Información estructurada de negocio local cuando la información esté confirmada.
- Nombre, dirección y teléfonos consistentes en todas las páginas.
- Sitemap y robots.txt.

## Alcance de la primera versión

### Incluido

- Landing `/`.
- Tarjeta pública `/info`.
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
- [ ] Horarios, servicios y productos coinciden con este documento.
- [ ] `/` y `/info` funcionan en móvil y desktop.
- [ ] Las fotografías publicadas son reales o están claramente tratadas como ilustración.
- [ ] Las animaciones respetan `prefers-reduced-motion`.
- [ ] `pnpm astro check` pasa.
- [ ] `pnpm build` pasa.
- [ ] La URL final usa HTTPS y metadata social correcta.
