# Botón flotante de WhatsApp con selector de sucursal

**Fecha:** 2026-07-08
**Estado:** Aprobado por el usuario

## Objetivo

Agregar un botón flotante de WhatsApp visible en todas las páginas del sitio que
permita al visitante elegir sucursal (Mérida o Cancún) y abrir una conversación de
WhatsApp con mensaje pre-llenado. Sin dependencias de terceros ni impacto en
rendimiento.

Contexto: el negocio opera por WhatsApp. Los enlaces `wa.me` actuales del sitio
apuntan solo a Cancún; este componente da presencia a la matriz (Mérida). La cuenta
de WhatsApp Business puede activar Meta Business Agent (IA) de su lado — eso es
independiente del sitio y queda fuera de alcance.

## Diseño

### Componente nuevo: `src/components/WhatsAppFloat.astro`

Se incluye una sola vez en `src/layouts/Layout.astro` (antes de cerrar `<body>`),
de modo que aparece en todas las páginas.

**Botón flotante:**
- Posición fija abajo a la derecha (`fixed bottom-6 right-6`, `z-50`).
- Círculo de ~56 px, verde WhatsApp (`bg-green-500`, hover `bg-green-600`), ícono
  oficial de WhatsApp en SVG inline blanco, sombra suave.
- Animación sutil de entrada (reutilizar `fade-in-up` del sistema de diseño).
- En móvil mantiene la misma posición; no tapa CTAs existentes (ninguna página
  tiene elementos fijos en esa esquina).

**Panel selector (abre al tocar el botón):**
- Tarjeta blanca (`rounded-xl`, sombra, borde sutil) anclada sobre el botón.
- Encabezado breve: "¿Con qué sucursal quieres hablar?".
- Dos opciones, cada una con nombre y teléfono visibles:
  - **Matriz — Mérida** → `https://wa.me/529992456823?text=<mensaje>`
  - **Sucursal — Cancún** → `https://wa.me/529981178422?text=<mensaje>`
- Mensaje pre-llenado (URL-encoded), igual para ambas:
  > Hola, vengo del sitio web de VCG Caribe y me gustaría una cotización.
- Enlaces con `target="_blank" rel="noopener"`.
- Estilo consistente con el sitio: acentos `deep`/`accent`, fuente Inter.

**Interacción (JS mínimo inline, sin librerías):**
- Clic en el botón alterna el panel (abrir/cerrar).
- Clic fuera del panel lo cierra.
- Tecla `Esc` lo cierra.
- El ícono del botón cambia a "X" (o rota) cuando el panel está abierto.

**Accesibilidad:**
- Botón con `aria-label="Chatear por WhatsApp"` y `aria-expanded`.
- Panel navegable con teclado (enlaces `<a>` normales, foco visible).

## Datos canónicos usados

- Mérida (matriz): 999 245 6823 → `529992456823`
- Cancún (sucursal): 998 117 8422 → `529981178422`

(Coinciden con CLAUDE.md del repo padre; si cambian, actualizar ambos lugares.)

## Fuera de alcance

- Meta Business Agent / automatización del lado de WhatsApp (se configura en la
  app de WhatsApp Business, no en el sitio).
- Cambiar los enlaces `wa.me` existentes en páginas y footer.
- Chat en vivo embebido o widgets de terceros.

## Verificación

- `pnpm build` pasa (`astro check` incluido).
- Manual en `pnpm dev`: el botón aparece en las 5 páginas; el panel abre/cierra
  (clic, clic fuera, Esc); cada opción abre `wa.me` correcto con el mensaje
  pre-llenado; sin overflow horizontal en móvil (320–414 px).
