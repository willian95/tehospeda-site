---
version: 1
slug: "src-app-s-slug-page-tsx"
primary_target: "src/app/s/[slug]/page.tsx"
related_targets: ["src"]
---

# Web pública del hotel (apps/site)

Mode: persuade. Página de cada hotel en <slug>.tehospeda.com, primer caso: Hotel Santa Ana (Coro, Venezuela).
Audience: viajeros que buscan alojamiento en Coro (turismo del casco colonial y los Médanos, viajes de trabajo), mayoritariamente en el móvil.
Action: elegir fechas y personas, ver habitaciones disponibles con el total de la estancia y enviar una solicitud de reserva que el hotel confirma.
Proof/content: datos reales del hotel desde el ERP (habitaciones, tarifas, horarios, servicios); fotos libres de Coro con crédito mientras no haya fotos del hotel. Sin testimonios ni valoraciones inventadas; si el sitio es demostración, se dice.
Constraints: idioma español; una plantilla para todos los hoteles, alimentada por los datos de cada uno.
Chosen direction: el estándar de la categoría (salida canónica), elegido por el usuario; vara de medir: webs de Marriott, Hyatt y Hilton.

## Direction contract

THESIS: La web de hotel que el viajero ya sabe usar, hecha al nivel de una gran cadena: foto grande, buscador de fechas a la vista y habitaciones con precio real de la estancia. No intenta ser original; intenta no tener ni un detalle descuidado.

OWN-WORLD: Blanco y arena #F6F3EE como fondos, azul noche #1E2A3A para texto y cabecera fija, bronce #9A6B32 para la acción principal y detalles. Serif de display para el nombre del hotel y los títulos, sans limpia para el resto; fotos a sangre con degradado para legibilidad; tarjetas blancas con sombra suave y esquinas de 8px.

STORY: El visitante entiende al instante dónde está el hotel y qué ofrece, pone fechas, ve qué habitaciones quedan y cuánto cuesta la estancia, y envía la solicitud sin salir de la página. Después encuentra servicios, entorno de Coro, ubicación y contacto.

FIRST VIEWPORT: Cabecera transparente sobre la foto (nombre del hotel a la izquierda, Habitaciones, Servicios, Ubicación, Contacto y botón Reservar a la derecha). Foto del casco de Coro a sangre con el nombre del hotel en serif grande y la frase principal abajo a la izquierda. Barra blanca de reserva superpuesta al borde inferior de la foto: Llegada, Salida, Huéspedes y «Ver disponibilidad», que funciona.

FORM: salida canónica (estándar de la categoría) elegida en la ronda de dirección; seed:e8882659c7f012ea. Interacción firma: al buscar, las fichas de habitación muestran la disponibilidad y el total de la estancia, y «Solicitar» abre el formulario con las fechas ya puestas.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
