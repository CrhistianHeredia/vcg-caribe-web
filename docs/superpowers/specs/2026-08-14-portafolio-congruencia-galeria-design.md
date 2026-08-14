# Congruencia presentación ↔ web y galería de proyectos

**Fecha:** 2026-08-14
**Estado:** Aprobado, pendiente de plan de implementación

## Problema

El sitio y la presentación comercial cuentan historias distintas de la misma empresa:

1. **Años de experiencia:** la web dice 15+, la presentación 7+. El dato real es **10**.
2. **Mantenimiento:** se ofrece como servicio en ambos materiales, pero la empresa ya no lo presta.
3. **Proyectos:** seis proyectos que la presentación destaca no existen en el portafolio web.
4. **Etiquetas:** Paravian (torres de departamentos) aparece como "Hotelero" en la web y como
   "Residencial" en la presentación. Hotel Marque, que sí es hotel, aparece como "Comercial".
   Las Olas 71 es una casa y está etiquetada como hotelera.
5. **Repetición:** Paravian ocupa 3 tarjetas, Cielo Maya 3 y Villa Magna 2 — el mismo proyecto
   partido en varias entradas, como si fueran obras distintas.
6. **Sin profundidad:** el botón "Ver Detalles" del mosaico no hace nada; cada proyecto muestra
   una sola foto pese a que la galería interna tiene decenas por obra.

## Objetivo

Que la web y la presentación coincidan en cifras, servicios, proyectos e imágenes, y que cada
proyecto del portafolio se pueda explorar con varias fotos.

## Alcance

### 1. Textos y cifras

**Años → 10** en:

| Archivo | Qué dice hoy |
|---|---|
| `src/pages/index.astro` (~L94) | stat `15+ Años de experiencia` |
| `src/pages/index.astro` (~L239) | `Más de 15 años transformando espacios` |
| `src/pages/nosotros.astro` (~L27) | stat `15+ Años de experiencia` |
| `src/pages/nosotros.astro` (~L78) | `Más de 15 años transformando espacios…` |
| `src/pages/portafolio.astro` (~L174, L203) | stat `15+ Años` y `Más de 15 años creando…` |
| `src/config/seo.ts` (`pageMeta`) | `+15 años` en title/description de home y nosotros |
| `presentacion/presentacion-moderna.html` (~L1577) | `más de 7 años de trayectoria` |
| `presentacion/presentacion-moderna.html` (~L1582) | stat `7+` |
| `presentacion/presentacion-moderna.html` (~L2087) | chip `7+ años` |

**Mantenimiento fuera** de:

- `src/pages/index.astro` (~L41): tarjeta de servicio "Mantenimiento" y su `href`.
- `src/pages/servicios.astro` (~L84): objeto completo con `id: 'mantenimiento'`.
- `src/pages/contacto.astro` (~L166): `<option value="mantenimiento">`.
- `presentacion/presentacion-moderna.html` (~L1716): bloque "Mantenimiento y reparación".
  La rejilla de "Tipos de trabajos" baja de 6 a 5 tarjetas y hay que rebalancear el layout
  para que no quede un hueco.

Revisar que ningún enlace interno apunte a `/servicios#mantenimiento` tras el borrado.

### 2. Fuente única de proyectos

Los proyectos se extraen del frontmatter de `portafolio.astro` a **`src/data/proyectos.ts`**.

```ts
export type Categoria = 'Residencial' | 'Hotelero' | 'Comercial' | 'Institucional';

export interface Proyecto {
  slug: string;          // 'paravian' — define la carpeta de imágenes
  title: string;
  category: Categoria;
  location: string;
  year: string;
  description: string;
  specs: string[];
  size: 'featured' | 'tall' | 'wide' | 'normal';
  status?: string;       // 'En ejecución' — chip opcional sobre la tarjeta
  images: string[];      // rutas a /images/projects/<slug>/NN.jpg — solo galería
}
```

La portada de la tarjeta no se declara: siempre es `/images/projects/<slug>/cover.jpg`, que el
script genera a partir de la misma toma que `01.jpg`. `images[]` es exclusivamente lo que
muestra el lightbox.

`portafolio.astro` importa el array; deja de declarar contenido. La página baja de 566 líneas
a markup + filtros.

#### Inventario de proyectos (17)

Origen = carpeta dentro de `GALERIA VCG/`.

| # | Proyecto | Categoría | Origen |
|---|---|---|---|
| 1 | Paravian Torre A y B | Residencial | `2025/PARAVIAN TORRE A Y B/wetransfer_…/` |
| 2 | Cielo Maya | Residencial | `2025/CIELO MAYA PUERTO AVENTURAS/` |
| 3 | Villa Magna Nápoles | Residencial | `2019/VILLA MAGNA NAPOLES 10/` |
| 4 | Las Olas 71 | Residencial | `2025/LAS OLAS 71 BAHIA PRINCIPE/` |
| 5 | Lote 165 Arq. Santiago Silanes | Residencial | `2025/LOTE 165 ARQ SANTIAGO SILANES PUERTO CANCUN/` |
| 6 | Lote 266 Puerto Cancún | Residencial | `2025/CASA LOTE 266 PUERTO CANCUNC/` |
| 7 | Casa Chelem | Residencial | `2025/CASA CHELEM LUIS ESCALANTE/` |
| 8 | Casa Tecatito Corona | Residencial | `2022/CASA TECATITO CORONA CORONA/` |
| 9 | Marina Yucalpetén · Torre Bonanza | Residencial (`status: 'En ejecución'`) | `2026/TORRE BONANZA MARINA YUCALPETEN/` |
| 10 | Hotel Calixta | Hotelero | `2019/HOTEL CALIXTA/` |
| 11 | Now Jade Resort | Hotelero | `2020/NOW JADE PUERTO MORELOS/` |
| 12 | Hotel Marque | Hotelero | `2019/HOTEL MARQUE/` |
| 13 | Royal 1 | Hotelero | `2023/ROYAL 1/` |
| 14 | Burger King Gran Plaza | Comercial | `2022/BURGER KING LA GRAN PLAZA CANCUN/` |
| 15 | Bodegas América | Comercial | `2021/BODEGAS AMERICA COLOSIO/` |
| 16 | Iglesia Santa María de Guadalupe | Institucional | `2022/IGLESIA SANTA MARIA DE GUADALUPE UNIVERSIDAD ANAHUAC/` |
| 17 | Centro de Negocios Universidad Anáhuac | Institucional | `2019/CENTRO DE NEGOCIOS UNIVERSIDAD ANAHUAC/` |

Nuevos: 7, 8, 9, 15, 16, 17. Consolidados: Paravian (3 tarjetas → 1), Cielo Maya (3 → 1),
Villa Magna (2 → 1).

Filtros del mosaico: `Todos · Residencial · Hotelero · Comercial · Institucional`.

#### Correcciones de contenido

- **Paravian** pasa de Hotelero a Residencial. Su descripción actual ("desarrollo hotelero de
  lujo") se reescribe: son torres de departamentos con fachada de aluminio, louvers de madera,
  balcones con vidrio templado y ventanería de piso a techo.
- **Las Olas 71** pasa de Hotelero a Residencial. La descripción actual habla de barandales de
  balcón y herrajes grado marino; las fotos muestran una casa con corredizas de gran formato
  hacia la alberca y baño con cancel de vidrio.
- **Hotel Marque** pasa de Comercial a Hotelero.
- Cada descripción debe corresponder a lo que muestran sus fotos. Verificar imagen por imagen
  al armar cada galería; si una descripción no cuadra, se reescribe.

#### Regla de congruencia

Toda foto usada en `presentacion-moderna.html` debe estar en la galería del proyecto que le
corresponde en la web. Fotos comprometidas por la presentación:

| Proyecto | Archivos que la presentación ya usa |
|---|---|
| Paravian | `image00003`, `image00005`, `image00007`, `image00010`, `image00015` |
| Villa Magna | `20200608_160909`, `20200608_160932`, `20200608_161028` |
| Cielo Maya | `image00075`, `image00076` |
| Casa Tecatito | `barandal casa corona 1.jpg` |
| Casa Chelem | `IMG_20240925_091121.jpg` |
| Centro de Negocios Anáhuac | `IMG20210106110615.jpg` |
| Marina Yucalpetén | `IMG-20260420-WA0078`, `WA0079`, `IMG-20260424-WA0054`, `WA0055`, `WA0056`, `WA0057` |
| Bodegas América | `20211115_115809` (antes), `WhatsApp Image 2023-01-10 at 10.15.28.jpeg` (después) |
| Iglesia Santa María | `20220129_092316`, `092341`, `092510`, `092528`, `092553`, `092605`, `IMG_20221216_094654` |

### 3. Pipeline de imágenes

Hoy `public/images/projects/` pesa **68 MB** en 17 archivos (hasta 10.6 MB uno). Con galerías
serían ~85 fotos: sin optimizar, ~400 MB. Es requisito, no mejora opcional.

**`scripts/optimizar-imagenes.mjs`** (Node + sharp) lee un manifiesto explícito
`slug → [rutas dentro de GALERIA VCG]` y escribe:

- `public/images/projects/<slug>/cover.jpg` — lado largo 1200px, calidad 80 (~120 KB)
- `public/images/projects/<slug>/01.jpg` … `06.jpg` — lado largo 1600px, calidad 82 (~250 KB)

Reglas:

- `cover.jpg` es la misma toma que `01.jpg`, en tamaño de tarjeta.
- **Hasta 6 fotos por proyecto.** Excepciones: Iglesia Santa María lleva 7 (todas las que usa
  la presentación); Marina Yucalpetén 6 (todas las que existen); Bodegas América 2 (antes/después).
- Orientación EXIF aplicada (`.rotate()`), metadatos eliminados, JPEG progresivo.
- El script es idempotente y se puede volver a correr; no se versionan los originales.
- Las 17 imágenes sueltas actuales de `public/images/projects/` se eliminan tras migrar.

`sharp` se declara como devDependency (hoy solo llega como transitiva de Astro y pnpm no la
enlaza al top level). No agrega peso al sitio publicado.

Objetivo medible: `/portafolio` baja de ~68 MB a ~2 MB de carga inicial.

### 4. Galería (lightbox)

**`src/components/ProjectGallery.astro`** — un único modal por página, no uno por tarjeta.

- Las fotos de cada proyecto viajan en un `<script type="application/json">` que el modal lee
  por `slug`; las tarjetas solo llevan `data-slug`.
- "Ver Detalles" abre el modal en la foto 1. También abre al hacer click en la tarjeta.
- Controles: flechas ←/→ (botón y teclado), contador `3 / 6`, título del proyecto, cierre con
  Esc, con el botón ✕ y con click en el fondo.
- Móvil: swipe horizontal (`touchstart`/`touchend`, umbral ~50px).
- Accesibilidad: `role="dialog"`, `aria-modal="true"`, foco al abrir sobre el botón de cierre,
  foco atrapado dentro del modal, y devolución del foco a la tarjeta al cerrar.
- Las fotos de galería se cargan bajo demanda (`loading="lazy"`), nunca en el render inicial.
- Sin librerías nuevas: TypeScript en `<script>` de Astro, mismo patrón que `WhatsAppFloat.astro`.
- Respeta la convención de tags del proyecto: badges sobre foto con fondo sólido, nunca
  `text-accent` translúcido.

### 5. Verificación

- `pnpm astro check` y `pnpm build` en verde (el check bloquea el deploy).
- Playwright: mosaico completo, cada filtro, lightbox abierto en desktop y en móvil, navegación
  con flechas y cierre con Esc.
- Medir el peso de `/portafolio` antes y después.
- Regenerar el PDF con `web-astro/generar-pdf-hq.mjs` tras editar la presentación.
- Revisar que la rejilla de "Tipos de trabajos" de la presentación se vea bien con 5 tarjetas.

## Fuera de alcance

- Migrar a `astro:assets` (requeriría importar ~85 imágenes; el pipeline con sharp resuelve el
  peso sin tocar el build).
- Páginas de detalle por proyecto (`/portafolio/<slug>`): se eligió lightbox.
- Sincronizar "Proyectos completados" (presentación 200+, web 500+/150+) y "50+ Profesionales":
  siguen pendientes de confirmar con el cliente y no forman parte de este trabajo.

## Riesgos

- **Reasignar `size` en el mosaico:** al pasar de 16 a 17 tarjetas con proyectos distintos, la
  distribución `featured/tall/wide/normal` hay que rehacerla o quedarán huecos.
- **Selección de fotos:** hay que abrir cada carpeta de origen y elegir a mano; varias tienen
  más de 40 fotos y muchas son de proceso de obra, no de resultado.
- **Bodegas América** solo aporta 2 fotos (antes/después). Su tarjeta debe ser `normal`, no
  `featured`, para no prometer una galería que no existe.
