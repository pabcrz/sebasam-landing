# Brief de producto y contenido

Este documento concentra el contenido confirmado y las reglas de comunicación del sitio público de SEBASAM. El objetivo es convertir visitas en conversaciones reales con el taller, en este orden: WhatsApp, llamada telefónica e indicaciones para llegar.

## Identidad de marca

- **Nombre principal:** SEBASAM.
- **Descriptor comercial:** **Servicio y refacciones para suspensiones de aire y muelles.**

SEBASAM es la marca. El descriptor explica la especialidad del taller, pero no se presenta como el significado literal del acrónimo.

SEBASAM nació como:

> **SE**rvicio **BAS**ico **A** Suspensiones de **A**ire y **M**uelles.

La historia puede aparecer en una sección breve de la landing:

> SEBASAM nació como “Servicio Básico a Suspensiones de Aire y Muelles”. Después de 30 años de experiencia, el nombre continúa representando nuestra especialidad y compromiso con cada cliente.

### Logotipos

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

> **30 años manteniendo tu unidad en movimiento.**

> **Tu unidad y tu presupuesto van primero.**

> No cambiamos piezas por cambiar. Revisamos cada caso, explicamos las opciones y buscamos la mejor solución según las necesidades y el presupuesto del cliente, aunque no sea la alternativa que más dinero deje al taller.

La honestidad debe expresarse mediante comportamientos concretos. Evitar frases genéricas como “somos los mejores” o promesas que no puedan demostrarse.

## Contacto público

### WhatsApp y teléfono móvil

- Número visible: `55 3623 9346`
- WhatsApp: <https://wa.me/525536239346>
- Llamada: `tel:+525536239346`
- CTA principal: **Cotizar por WhatsApp**

### Teléfono fijo

- Número visible: `55 5600 7675`
- Llamada: `tel:+525556007675`

### Dirección

**Batalla de Casa Blanca 1719B**  
**Leyes de Reforma 3.ª Sección, Iztapalapa, CDMX**

- Google Maps: <https://maps.app.goo.gl/mPve4xkMJr73Lxya8>
- CTA: **Cómo llegar**

### Horarios

- Lunes a viernes: 9:00 a. m. – 6:00 p. m.
- Sábado: 9:00 a. m. – 3:00 p. m.

El domingo no se menciona en el contenido público.

## Servicios y productos

### Servicios

- Alineación a ejes traseros.
- Brio a muelles.
- Refuerzos.
- Soldadura.
- Ajuste de quinta rueda.

### Productos y refacciones

- Abrazaderas.
- Bujes.
- Perchas.
- Columpios.
- Tensores.
- Balancines.

Los productos no deben mostrarse como ecommerce. No publicar precios, inventario ni promesas de existencia. Usar el CTA: **Consulta disponibilidad por WhatsApp**.

## Vehículos y clientes

SEBASAM atiende:

- Pickups y camionetas de trabajo.
- Camiones ligeros y medianos.
- Rabones, tortones y tándem.
- Tractocamiones y remolques.
- Unidades de flotilla mediante programación periódica.

Ejemplo reconocible:

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

## Reglas de contenido

- Los datos comerciales no deben repetirse manualmente entre páginas.
- La fuente central prevista es `src/content/business.ts` y debe contener nombre, descriptor, teléfonos y enlaces, dirección y Google Maps, horarios, servicios, productos, tipos de vehículos y textos de confianza.
- En una versión futura puede sustituirse por una API, CMS o integración con la aplicación operativa; queda fuera de la primera versión.
- No inventar ni publicar precios, inventario, calificaciones o áreas de servicio no confirmadas.
