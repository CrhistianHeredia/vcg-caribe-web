# Congruencia presentación ↔ web y galería de proyectos — Plan de Implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Alinear cifras, servicios, proyectos e imágenes entre `presentacion/presentacion-moderna.html` y el sitio Astro, y dar a cada proyecto del portafolio una galería navegable de varias fotos.

**Architecture:** Los 17 proyectos se extraen del frontmatter de `portafolio.astro` a un módulo de datos único (`src/data/proyectos.ts`). Un script Node+sharp (`scripts/optimizar-imagenes.mjs`) lee un manifiesto `slug → rutas dentro de GALERIA VCG` y produce `public/images/projects/<slug>/{cover,01..NN}.jpg` optimizados. Un único componente `ProjectGallery.astro` monta un modal por página que lee las fotos desde un `<script type="application/json">` embebido y las resuelve por `slug`.

**Tech Stack:** Astro 5, Tailwind 3.4, TypeScript (`astro/tsconfigs/strict`), sharp (devDependency), Playwright, pnpm.

**Spec:** `docs/superpowers/specs/2026-08-14-portafolio-congruencia-galeria-design.md`

## Global Constraints

- **Idioma:** todo el contenido visible al usuario en español.
- **Gestor de paquetes:** `pnpm` siempre. Nunca `npm install` (rompe el `node_modules` de pnpm). Cualquier cambio de dependencias debe commitear `pnpm-lock.yaml` o el CI (`pnpm install --frozen-lockfile`) falla.
- **Años de experiencia:** el valor canónico es **10**. No queda ningún "15+" ni "7+" en web ni presentación.
- **Mantenimiento:** la empresa ya no presta el servicio. No debe aparecer en ningún material, incluidas keywords de SEO.
- **"Precisión milimétrica":** prohibido en cualquier material (regla previa del cliente).
- **Categorías válidas:** `Residencial | Hotelero | Comercial | Institucional`.
- **Tags sobre imágenes:** fondo sólido (`bg-accent text-deep` o `bg-deep/70`) o `text-accent-light` con `drop-shadow`. Nunca `text-accent` translúcido sobre foto.
- **Verificación bloqueante:** `pnpm astro check` debe pasar — un error de tipos en un `.astro` rompe el deploy, no solo el build local.
- **Presentación:** tras editarla, regenerar el PDF con `node generar-pdf-hq.mjs` desde `web-astro/`. Nunca `page.pdf()` de Chromium, nunca comprimir el PDF.
- **Repos separados:** `web-astro/` es su propio repo git. Los cambios de `presentacion/` se commitean en el repo padre `vcgcaribe`. Verificar siempre en cuál se está commiteando.
- **Fuera de alcance:** `astro:assets`, páginas `/portafolio/<slug>`, y sincronizar "Proyectos completados" (200+/500+/150+) y "50+ Profesionales" — siguen pendientes de confirmar con el cliente.

---

## File Structure

**Crear:**
- `web-astro/src/data/proyectos.ts` — fuente única de los 17 proyectos: tipos `Categoria`/`Proyecto`, array `proyectos`, helper `categorias`.
- `web-astro/src/components/ProjectGallery.astro` — modal/lightbox único por página.
- `web-astro/scripts/optimizar-imagenes.mjs` — manifiesto + pipeline sharp.
- `web-astro/public/images/projects/<slug>/` — 17 carpetas generadas (no versionar los originales).

**Modificar:**
- `web-astro/src/pages/portafolio.astro` — importa `proyectos.ts`, deja de declarar contenido, agrega filtro Institucional y monta la galería.
- `web-astro/src/pages/index.astro` — quita servicio Mantenimiento, cifra 10 años, migra rutas de imágenes.
- `web-astro/src/pages/nosotros.astro` — cifra 10 años, migra rutas de imágenes.
- `web-astro/src/pages/servicios.astro` — quita el servicio `mantenimiento`, migra rutas de imágenes.
- `web-astro/src/pages/contacto.astro` — quita `<option value="mantenimiento">`, migra ruta de imagen.
- `web-astro/src/config/seo.ts` — cifra 10 años, quita keywords y menciones de mantenimiento.
- `web-astro/package.json` — `sharp` como devDependency.
- `presentacion/presentacion-moderna.html` — cifra 10 años, quita tarjeta Mantenimiento, rebalancea la rejilla.

**Eliminar:**
- Las 17 imágenes sueltas de `web-astro/public/images/projects/*.jpg` (68 MB), tras migrar todas las referencias.

---

## Task 1: Cifras de experiencia a 10 años

**Files:**
- Modify: `web-astro/src/pages/index.astro:94`, `:239`
- Modify: `web-astro/src/pages/nosotros.astro:27`, `:78`
- Modify: `web-astro/src/pages/portafolio.astro:174`, `:203`
- Modify: `web-astro/src/config/seo.ts:131`, `:149` (y el `title` de `nosotros`)
- Modify: `presentacion/presentacion-moderna.html:1577`, `:1581`, `:2087`

**Interfaces:**
- Consumes: nada.
- Produces: nada en código. Establece el número canónico **10** que las tareas siguientes no deben reintroducir como 15 ni 7.

- [ ] **Step 1: Cambiar las 4 cifras de la web**

`src/pages/index.astro:94` — dentro del array `stats`:
```astro
  { number: '10', suffix: '+', label: 'Años de experiencia' },
```

`src/pages/index.astro:239`:
```astro
            title="Más de 10 años transformando espacios"
```

`src/pages/nosotros.astro:27` — primer elemento de `stats`, solo cambia `number` (conservar el `icon` completo tal cual está):
```astro
  { number: '10', suffix: '+', label: 'Años de experiencia', icon: `<svg class="w-6 h-6" ...>` },
```

`src/pages/nosotros.astro:78`:
```astro
          Más de 10 años transformando espacios con soluciones de cancelería
```

`src/pages/portafolio.astro:174`:
```astro
  { number: '10+', label: 'Años' },
```

`src/pages/portafolio.astro:203`:
```astro
        Más de 10 años creando soluciones arquitectónicas en vidrio y aluminio
```

- [ ] **Step 2: Cambiar las cifras en `seo.ts`**

`src/config/seo.ts` — en `pageMeta.home.description`:
```ts
    description: 'Expertos en cancelería de vidrio y aluminio para hoteles, residencias y comercios. +10 años de experiencia en Cancún, Riviera Maya y Yucatán. Cotiza ahora.',
```

En `pageMeta.nosotros`:
```ts
    title: 'Sobre Nosotros | +10 Años de Experiencia en Cancelería - VCG Caribe',
    description: 'Conoce a VCG Caribe: más de 10 años transformando espacios con cancelería de alta calidad. Valor, Confianza y Garantía en cada proyecto.',
```

- [ ] **Step 3: Cambiar las 3 cifras de la presentación**

`presentacion/presentacion-moderna.html:1577`:
```html
        <p class="lead" style="margin-top: 18px;">Empresa orgullosamente mexicana con más de 10 años de trayectoria en el sureste del país. <strong>Nuestro equipo</strong> combina experiencia técnica con compromiso absoluto en cada entrega.</p>
```

Línea 1581:
```html
            <div class="stat-number">10<span class="accent">+</span></div>
```

Línea 2087:
```html
            <span class="chip">10+ años</span>
```

- [ ] **Step 4: Verificar que no queda ninguna cifra vieja**

Run:
```bash
cd /home/crhist/repositorio/vcgcaribe
grep -rn "15 años\|15+ *Años\|+15\|7 años\|7+ años" web-astro/src/ presentacion/presentacion-moderna.html
```
Expected: sin resultados. (El `stat-number` de la presentación se verifica aparte con `grep -n '>7<' presentacion/presentacion-moderna.html`, también sin resultados.)

- [ ] **Step 5: Commit en los dos repos**

```bash
cd /home/crhist/repositorio/vcgcaribe/web-astro
git add src/pages/index.astro src/pages/nosotros.astro src/pages/portafolio.astro src/config/seo.ts
git commit -m "fix: unificar años de experiencia en 10 (dato canónico del cliente)"

cd /home/crhist/repositorio/vcgcaribe
git add presentacion/presentacion-moderna.html
git commit -m "fix: unificar años de experiencia en 10 en la presentación"
```

---

## Task 2: Eliminar el servicio de Mantenimiento

**Files:**
- Modify: `web-astro/src/pages/index.astro:39-45` (tarjeta del array `services`)
- Modify: `web-astro/src/pages/servicios.astro:83-99` (objeto `id: 'mantenimiento'`)
- Modify: `web-astro/src/pages/contacto.astro:166` (`<option>`)
- Modify: `web-astro/src/config/seo.ts` (keywords `services`, `longTail`, description de `servicios`)
- Modify: `presentacion/presentacion-moderna.html:1669-1723` (rejilla `grid-3` de "Tipos de trabajos")

**Interfaces:**
- Consumes: nada.
- Produces: nada en código. Deja `services` en `index.astro` con 5 elementos y el array de servicios de `servicios.astro` con 5 elementos.

- [ ] **Step 1: Quitar la tarjeta de `index.astro`**

Borrar completo el objeto del array `services`:
```astro
  {
    title: 'Mantenimiento',
    description: 'Servicio de mantenimiento preventivo y correctivo para cancelería existente.',
    icon: 'tools',
    href: '/servicios#mantenimiento',
  },
```

- [ ] **Step 2: Quitar el servicio de `servicios.astro`**

Borrar completo el objeto que empieza en `id: 'mantenimiento'` y termina con `image: '/images/projects/villa-magna-bano.jpg',` y su `},` de cierre.

- [ ] **Step 3: Quitar la opción de `contacto.astro`**

Borrar la línea:
```astro
                <option value="mantenimiento">Mantenimiento</option>
```

- [ ] **Step 4: Limpiar `seo.ts`**

En `keywords.services`, borrar `'mantenimiento de aluminio',`. En `keywords.longTail`, borrar `'mantenimiento de ventanas para hoteles',`. En `pageMeta.servicios.description`:
```ts
    description: 'Servicios completos de cancelería: ventanas, puertas, barandales, muros cortina y proyectos hoteleros. Soluciones en vidrio y aluminio para todo tipo de proyectos.',
```

Nota: `'reparación de cancelería'` en `keywords.services` también describe un servicio que ya no se presta — sustituirla por `'cancelería hotelera'`.

- [ ] **Step 5: Quitar la tarjeta de la presentación y rebalancear la rejilla**

Borrar el `<article class="ventana-aluminio">` completo cuyo `<h3>` es `Mantenimiento y reparación` (el último de la rejilla, con el párrafo "Servicio post-venta, remodelaciones y actualizaciones…").

La rejilla queda con 5 tarjetas y `grid-3` produciría un hueco en la segunda fila. Cambiar el contenedor a 6 columnas y repartir 3 + 2 centrado. Sustituir la apertura del contenedor:

```html
        <div class="grid-3" style="margin-top: 18px;">
```

por:

```html
        <div class="grid-tipos" style="margin-top: 18px;">
```

Y agregar la regla al bloque `<style>` junto a `.grid-3` (línea ~674):

```css
    .grid-tipos {
      display: grid;
      grid-template-columns: repeat(6, minmax(0, 1fr));
      gap: 20px;
    }
    .grid-tipos > article { grid-column: span 2; }
    .grid-tipos > article:nth-last-child(2) { grid-column: 2 / span 2; }
    .grid-tipos > article:last-child { grid-column: 4 / span 2; }
```

Con 5 tarjetas: fila 1 = las tres primeras (span 2 cada una), fila 2 = las dos últimas centradas ocupando las columnas 2–5. Sin huecos.

- [ ] **Step 6: Verificar que no queda ninguna referencia a mantenimiento**

Run:
```bash
cd /home/crhist/repositorio/vcgcaribe
grep -rni "mantenimiento" web-astro/src/ presentacion/presentacion-moderna.html
```
Expected: sin resultados. En particular, ningún `href` a `/servicios#mantenimiento`.

- [ ] **Step 7: Verificar que el build sigue verde**

Run: `cd /home/crhist/repositorio/vcgcaribe/web-astro && pnpm astro check`
Expected: 0 errors.

- [ ] **Step 8: Commit en los dos repos**

```bash
cd /home/crhist/repositorio/vcgcaribe/web-astro
git add src/pages/index.astro src/pages/servicios.astro src/pages/contacto.astro src/config/seo.ts
git commit -m "feat: eliminar servicio de mantenimiento del sitio"

cd /home/crhist/repositorio/vcgcaribe
git add presentacion/presentacion-moderna.html
git commit -m "feat: eliminar mantenimiento y rebalancear rejilla de tipos de trabajos"
```

---

## Task 3: Pipeline de imágenes con sharp

**Files:**
- Create: `web-astro/scripts/optimizar-imagenes.mjs`
- Modify: `web-astro/package.json` (devDependency `sharp`, script `imagenes`)
- Modify: `web-astro/pnpm-lock.yaml` (generado)

**Interfaces:**
- Consumes: las carpetas de `GALERIA VCG/` (rutas absolutas conocidas).
- Produces: `public/images/projects/<slug>/cover.jpg` y `01.jpg…NN.jpg` para los 17 slugs. Los slugs producidos aquí son exactamente los que Task 5 usa en `proyectos.ts`:
  `paravian`, `cielo-maya`, `villa-magna`, `las-olas-71`, `lote-165`, `lote-266`, `casa-chelem`, `casa-tecatito`, `marina-yucalpeten`, `hotel-calixta`, `now-jade`, `hotel-marque`, `royal-1`, `burger-king`, `bodegas-america`, `iglesia-santa-maria`, `centro-negocios-anahuac`.

- [ ] **Step 1: Instalar sharp como devDependency**

Run:
```bash
cd /home/crhist/repositorio/vcgcaribe/web-astro
pnpm add -D sharp
```
Expected: `sharp` aparece en `devDependencies` y `pnpm-lock.yaml` se actualiza. (Ya está en `pnpm.onlyBuiltDependencies`, así que compila sus binarios sin intervención.)

- [ ] **Step 2: Generar contact sheets para elegir las fotos**

Las fotos hay que elegirlas a mano: varias carpetas tienen más de 40 imágenes y muchas son de proceso de obra, no de resultado. Crear un script temporal en el scratchpad que arme un mosaico por proyecto:

```js
// scratchpad/contact-sheet.mjs
import sharp from 'sharp';
import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const [dir, salida] = process.argv.slice(2);
const COLS = 5, TH = 260;

const listar = (d) => readdirSync(d, { withFileTypes: true }).flatMap((e) => {
  const p = join(d, e.name);
  if (e.isDirectory()) return listar(p);
  return /\.(jpe?g|png)$/i.test(e.name) ? [p] : [];
}).sort();

const archivos = listar(dir);
const filas = Math.ceil(archivos.length / COLS);
const thumbs = await Promise.all(archivos.map(async (f, i) => ({
  input: await sharp(f).rotate().resize(TH, TH, { fit: 'cover' }).jpeg({ quality: 70 }).toBuffer(),
  left: (i % COLS) * TH,
  top: Math.floor(i / COLS) * TH,
})));

await sharp({ create: { width: COLS * TH, height: filas * TH, channels: 3, background: '#111' } })
  .composite(thumbs).jpeg({ quality: 75 }).toFile(salida);

console.log(archivos.map((f, i) => `${i + 1}. ${f.replace(dir + '/', '')}`).join('\n'));
```

Correrlo por proyecto y **mirar cada mosaico** antes de elegir. Criterios de selección:
- Resultado terminado, no proceso de obra ni escombro ni herramienta suelta.
- Que se vea el trabajo de cancelería (ventana, barandal, cancel, fachada), no solo el mueble o el paisaje.
- Variedad: exterior + interior + detalle, no seis tomas del mismo ángulo.
- La foto 1 es la mejor: es la que se convierte en `cover.jpg` y representa el proyecto en el mosaico.

- [ ] **Step 3: Escribir el script con el manifiesto completo**

`web-astro/scripts/optimizar-imagenes.mjs`:

```js
#!/usr/bin/env node
/**
 * Optimiza las fotos de GALERIA VCG hacia public/images/projects/<slug>/.
 * Genera cover.jpg (tarjeta del mosaico) y 01.jpg…NN.jpg (galería del lightbox).
 * Idempotente: se puede volver a correr. Los originales no se versionan.
 *
 * Uso: node scripts/optimizar-imagenes.mjs [slug]
 */
import sharp from 'sharp';
import { mkdirSync, rmSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const GALERIA = join(RAIZ, 'GALERIA VCG');
const DESTINO = join(RAIZ, 'web-astro', 'public', 'images', 'projects');

const COVER = { lado: 1200, calidad: 80 };
const GALERIA_CFG = { lado: 1600, calidad: 82 };

// slug → rutas relativas a "GALERIA VCG/". La primera foto es además el cover.
// Las fotos marcadas ← presentación son obligatorias: la presentación ya las usa
// y la regla de congruencia exige que estén en la galería del proyecto.
const MANIFIESTO = {
  // ...  se completa en el Step 2 con la selección visual
};

const optimizar = async (origen, destino, { lado, calidad }) => {
  await sharp(origen)
    .rotate()                                   // aplica orientación EXIF
    .resize(lado, lado, { fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: calidad, progressive: true, mozjpeg: true })
    .toFile(destino);                           // sharp no copia metadatos si no se pide
};

const soloSlug = process.argv[2];
let total = 0;

for (const [slug, rutas] of Object.entries(MANIFIESTO)) {
  if (soloSlug && slug !== soloSlug) continue;

  const carpeta = join(DESTINO, slug);
  rmSync(carpeta, { recursive: true, force: true });
  mkdirSync(carpeta, { recursive: true });

  for (const [i, rel] of rutas.entries()) {
    const origen = join(GALERIA, rel);
    if (!existsSync(origen)) throw new Error(`No existe: ${origen}`);

    if (i === 0) await optimizar(origen, join(carpeta, 'cover.jpg'), COVER);
    const nombre = String(i + 1).padStart(2, '0') + '.jpg';
    await optimizar(origen, join(carpeta, nombre), GALERIA_CFG);
    total += statSync(join(carpeta, nombre)).size;
  }

  console.log(`✓ ${slug.padEnd(24)} ${rutas.length} fotos`);
}

console.log(`\nTotal galería: ${(total / 1024 / 1024).toFixed(1)} MB`);
```

Reglas del manifiesto (del spec):
- **Hasta 6 fotos por proyecto.** Excepciones: `iglesia-santa-maria` lleva 7 (todas las que usa la presentación), `marina-yucalpeten` 6 (todas las que existen), `bodegas-america` 2 (antes/después).
- Fotos obligatorias por la regla de congruencia:

| slug | Archivos que la presentación ya usa |
|---|---|
| `paravian` | `image00003`, `image00005`, `image00007`, `image00010`, `image00015` (en `wetransfer_ptoaventurasyplayadc_2025-07-05_2340/`) |
| `villa-magna` | `20200608_160909.jpg`, `20200608_160932.jpg`, `20200608_161028.jpg` |
| `cielo-maya` | `image00075.jpeg`, `image00076.jpeg` |
| `casa-tecatito` | `barandal casa corona 1.jpg` |
| `casa-chelem` | `IMG_20240925_091121.jpg` |
| `centro-negocios-anahuac` | `IMG20210106110615.jpg` |
| `marina-yucalpeten` | `IMG-20260420-WA0078/0079`, `IMG-20260424-WA0054/0055/0056/0057` |
| `bodegas-america` | `20211115_115809.jpg` (antes), `WhatsApp Image 2023-01-10 at 10.15.28.jpeg` (después) |
| `iglesia-santa-maria` | `20220129_092316`, `_092341`, `_092510`, `_092528`, `_092553`, `_092605`, `IMG_20221216_094654.jpg` |

Carpetas de origen (relativas a `GALERIA VCG/`):

| slug | carpeta |
|---|---|
| `paravian` | `2025/PARAVIAN TORRE A Y B/wetransfer_ptoaventurasyplayadc_2025-07-05_2340` |
| `cielo-maya` | `2025/CIELO MAYA PUERTO AVENTURAS` |
| `villa-magna` | `2019/VILLA MAGNA NAPOLES 10` |
| `las-olas-71` | `2025/LAS OLAS 71 BAHIA PRINCIPE` |
| `lote-165` | `2025/LOTE 165 ARQ SANTIAGO SILANES PUERTO CANCUN` |
| `lote-266` | `2025/CASA LOTE 266 PUERTO CANCUNC` |
| `casa-chelem` | `2025/CASA CHELEM LUIS ESCALANTE` |
| `casa-tecatito` | `2022/CASA TECATITO CORONA CORONA` |
| `marina-yucalpeten` | `2026/TORRE BONANZA MARINA YUCALPETEN` |
| `hotel-calixta` | `2019/HOTEL CALIXTA` |
| `now-jade` | `2020/NOW JADE PUERTO MORELOS` |
| `hotel-marque` | `2019/HOTEL MARQUE` |
| `royal-1` | `2023/ROYAL 1` |
| `burger-king` | `2022/BURGER KING LA GRAN PLAZA CANCUN` |
| `bodegas-america` | `2021/BODEGAS AMERICA COLOSIO` |
| `iglesia-santa-maria` | `2022/IGLESIA SANTA MARIA DE GUADALUPE UNIVERSIDAD ANAHUAC` |
| `centro-negocios-anahuac` | `2019/CENTRO DE NEGOCIOS UNIVERSIDAD ANAHUAC` |

Ojo con `hotel-marque`: la carpeta tiene duplicados con sufijo `_DESKTOP-N0I75FT_..._Conflict.jpg`. Usar siempre la versión sin sufijo.

- [ ] **Step 4: Agregar el script a `package.json`**

En `scripts`:
```json
    "imagenes": "node scripts/optimizar-imagenes.mjs",
```

- [ ] **Step 5: Correr el pipeline**

Run:
```bash
cd /home/crhist/repositorio/vcgcaribe/web-astro && pnpm imagenes
```
Expected: 17 líneas `✓ <slug> N fotos` y un total de galería bajo ~25 MB.

- [ ] **Step 6: Verificar tamaños y que las portadas existen**

Run:
```bash
cd /home/crhist/repositorio/vcgcaribe/web-astro
ls public/images/projects/*/cover.jpg | wc -l          # → 17
du -sh public/images/projects/
find public/images/projects -name 'cover.jpg' -size +200k    # → sin resultados
```
Expected: 17 covers, cada uno por debajo de 200 KB.

- [ ] **Step 7: Commit**

```bash
cd /home/crhist/repositorio/vcgcaribe/web-astro
git add package.json pnpm-lock.yaml scripts/optimizar-imagenes.mjs public/images/projects/
git commit -m "feat: pipeline de optimización de imágenes con sharp"
```

---

## Task 4: Fuente única de proyectos (`src/data/proyectos.ts`)

**Files:**
- Create: `web-astro/src/data/proyectos.ts`

**Interfaces:**
- Consumes: los slugs y las carpetas generadas en Task 3.
- Produces:
  - `export type Categoria = 'Residencial' | 'Hotelero' | 'Comercial' | 'Institucional'`
  - `export interface Proyecto { slug, title, category, location, year, description, specs, size, status?, images }`
  - `export const proyectos: Proyecto[]` (17 elementos)
  - `export const categorias: readonly ['Todos', 'Residencial', 'Hotelero', 'Comercial', 'Institucional']`
  - `export const coverDe: (slug: string) => string`

  Task 5 (portafolio) y Task 6 (galería) consumen exactamente estos nombres.

- [ ] **Step 1: Escribir el módulo de datos**

```ts
export type Categoria = 'Residencial' | 'Hotelero' | 'Comercial' | 'Institucional';

export type Tamano = 'featured' | 'tall' | 'wide' | 'normal';

export interface Proyecto {
  /** Define la carpeta de imágenes: /images/projects/<slug>/ */
  slug: string;
  title: string;
  category: Categoria;
  location: string;
  year: string;
  description: string;
  specs: string[];
  size: Tamano;
  /** Chip opcional sobre la tarjeta, p. ej. 'En ejecución' */
  status?: string;
  /** Fotos de la galería (lightbox). La portada NO va aquí: es siempre cover.jpg */
  images: string[];
}

/** La portada de la tarjeta nunca se declara: se deriva del slug. */
export const coverDe = (slug: string): string => `/images/projects/${slug}/cover.jpg`;

export const categorias = ['Todos', 'Residencial', 'Hotelero', 'Comercial', 'Institucional'] as const;

export const proyectos: Proyecto[] = [
  // 17 entradas — ver Step 2 para el contenido
];
```

- [ ] **Step 2: Poblar los 17 proyectos**

Reglas de contenido, del spec:

- **Paravian Torre A y B** → `Residencial` (hoy dice Hotelero). Reescribir la descripción: son **torres de departamentos** con fachada de aluminio, louvers de madera, balcones con vidrio templado y ventanería de piso a techo. Ubicación **Playa del Carmen** (nunca Puerto Aventuras). Consolida las 3 tarjetas actuales (`Paravian Torre A y B`, `Paravian Exterior`, `Paravian Interiores`) en una.
- **Las Olas 71** → `Residencial` (hoy Hotelero). La descripción actual habla de barandales de balcón y herrajes grado marino; las fotos muestran **una casa** con corredizas de gran formato hacia la alberca y baño con cancel de vidrio. Reescribirla acorde.
- **Hotel Marque** → `Hotelero` (hoy Comercial).
- **Cielo Maya** consolida 3 tarjetas en una; **Villa Magna** consolida 2 en una.
- **Marina Yucalpetén · Torre Bonanza** → `status: 'En ejecución'`.
- **Cada descripción debe corresponder a lo que muestran sus fotos.** Al armar cada galería en Task 3 se miraron las fotos: si una descripción heredada no cuadra con ellas, se reescribe.
- `images` lista las rutas reales generadas: `/images/projects/<slug>/01.jpg` … según cuántas produjo el manifiesto. No inventar archivos que el pipeline no generó.

Distribución de `size` (rehecha para 17 tarjetas; el grid es de 4 columnas en desktop, `grid-auto-flow: dense`):

| # | slug | Categoría | size |
|---|---|---|---|
| 1 | `paravian` | Residencial | `featured` |
| 2 | `cielo-maya` | Residencial | `wide` |
| 3 | `las-olas-71` | Residencial | `tall` |
| 4 | `marina-yucalpeten` | Residencial | `normal` |
| 5 | `lote-165` | Residencial | `normal` |
| 6 | `lote-266` | Residencial | `normal` |
| 7 | `casa-chelem` | Residencial | `normal` |
| 8 | `casa-tecatito` | Residencial | `normal` |
| 9 | `villa-magna` | Residencial | `wide` |
| 10 | `hotel-calixta` | Hotelero | `tall` |
| 11 | `now-jade` | Hotelero | `normal` |
| 12 | `hotel-marque` | Hotelero | `wide` |
| 13 | `royal-1` | Hotelero | `normal` |
| 14 | `burger-king` | Comercial | `normal` |
| 15 | `bodegas-america` | Comercial | `normal` |
| 16 | `iglesia-santa-maria` | Institucional | `tall` |
| 17 | `centro-negocios-anahuac` | Institucional | `wide` |

**Bodegas América es `normal` a propósito:** solo tiene 2 fotos (antes/después) y una tarjeta `featured` prometería una galería que no existe.

Ejemplo de entrada completa (Paravian), como referencia de forma y tono:

```ts
  {
    slug: 'paravian',
    title: 'Paravian Torre A y B',
    category: 'Residencial',
    location: 'Playa del Carmen, Q. Roo',
    year: '2025',
    description: 'Torres de departamentos con fachada de aluminio y louvers de madera, balcones con barandal de vidrio templado de 12 mm y ventanería de piso a techo con sistema euro de alta hermeticidad, en acabados resistentes al ambiente costero.',
    specs: ['Louvers madera', 'Vidrio 12mm', 'Sistema euro', 'Anti-corrosivo'],
    size: 'featured',
    images: [
      '/images/projects/paravian/01.jpg',
      '/images/projects/paravian/02.jpg',
      '/images/projects/paravian/03.jpg',
      '/images/projects/paravian/04.jpg',
      '/images/projects/paravian/05.jpg',
      '/images/projects/paravian/06.jpg',
    ],
  },
```

- [ ] **Step 3: Verificar tipos y coherencia con el disco**

Run:
```bash
cd /home/crhist/repositorio/vcgcaribe/web-astro && pnpm astro check
```
Expected: 0 errors.

Verificar que toda ruta declarada existe:
```bash
cd /home/crhist/repositorio/vcgcaribe/web-astro
node -e "
const { proyectos, coverDe } = await import('./src/data/proyectos.ts').catch(() => ({}));
" 2>/dev/null || \
grep -o "'/images/projects/[^']*'" src/data/proyectos.ts | tr -d "'" | \
  while read r; do [ -f "public$r" ] || echo "FALTA: $r"; done
```
Expected: sin líneas `FALTA:`.

Verificar también que cada slug tiene su cover:
```bash
grep -o "slug: '[^']*'" src/data/proyectos.ts | sed "s/slug: '//;s/'//" | \
  while read s; do [ -f "public/images/projects/$s/cover.jpg" ] || echo "SIN COVER: $s"; done
```
Expected: sin resultados.

- [ ] **Step 4: Commit**

```bash
cd /home/crhist/repositorio/vcgcaribe/web-astro
git add src/data/proyectos.ts
git commit -m "feat: fuente única de proyectos en src/data/proyectos.ts"
```

---

## Task 5: `portafolio.astro` consume los datos

**Files:**
- Modify: `web-astro/src/pages/portafolio.astro` (frontmatter completo + markup del mosaico + filtros)

**Interfaces:**
- Consumes: `proyectos`, `categorias`, `coverDe`, tipo `Proyecto` de `src/data/proyectos.ts`.
- Produces: cada tarjeta del mosaico lleva `data-slug="<slug>"` y `data-category="<categoría en minúsculas>"`. Task 6 depende de `data-slug`.

- [ ] **Step 1: Reemplazar el frontmatter**

Borrar el array `projects` (líneas 5–167) y la constante `categories` (línea 169). El frontmatter queda:

```astro
---
import PageLayout from '../layouts/PageLayout.astro';
import Button from '../components/ui/Button.astro';
import ProjectGallery from '../components/ProjectGallery.astro';
import { proyectos, categorias, coverDe } from '../data/proyectos';

const stats = [
  { number: '150+', label: 'Proyectos' },
  { number: '10+', label: 'Años' },
  { number: '50+', label: 'Hoteles' },
  { number: '100%', label: 'Satisfacción' },
];
---
```

(La cifra `10+` ya viene de Task 1. Las otras tres siguen fuera de alcance hasta confirmar con el cliente.)

- [ ] **Step 2: Adaptar el markup del mosaico**

En el `.map()` del grid, renombrar `projects` → `proyectos` y `project` → `proyecto`, y:

- La imagen de la tarjeta pasa a la portada derivada:
```astro
                <img
                  src={coverDe(proyecto.slug)}
                  alt={proyecto.title}
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
```

- El contenedor de la tarjeta lleva `data-slug` y se vuelve accionable:
```astro
          <div
            class={`mosaic-item mosaic-${proyecto.size} project-item reveal group cursor-pointer`}
            data-category={proyecto.category.toLowerCase()}
            data-slug={proyecto.slug}
            style={`animation-delay: ${index * 100}ms`}
          >
```

- Agregar el chip de estado junto a los tags de año/categoría, solo si existe (fondo sólido, según la convención del proyecto):
```astro
                  {proyecto.status && (
                    <span class="px-3 py-1.5 bg-deep/80 text-accent-light text-xs font-bold rounded-full shadow-lg backdrop-blur-sm border border-accent/40">
                      {proyecto.status}
                    </span>
                  )}
```

- El botón "Ver Detalles" deja de ser un `<span>` inerte y pasa a ser un botón real que abre la galería:
```astro
                  <button
                    type="button"
                    class="abrir-galeria inline-flex items-center gap-2 px-4 py-2 bg-accent text-deep font-semibold text-sm rounded-lg group/btn hover:bg-accent/90 transition-colors"
                    data-slug={proyecto.slug}
                  >
                    Ver Detalles
                    <svg class="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                    </svg>
                  </button>
```

- El hero de la página usa hoy `/images/projects/paravian-fachada.jpg`, que se borra en Task 7. Cambiarlo a:
```astro
        src="/images/projects/paravian/cover.jpg"
```

- [ ] **Step 3: Montar la galería al final del `PageLayout`**

Justo antes de `</PageLayout>`, después de la sección CTA:
```astro
  <ProjectGallery proyectos={proyectos} />
```

- [ ] **Step 4: Verificar los filtros**

Los botones se generan desde `categorias`, que ahora incluye `Institucional`. El script de filtrado compara `data-category` contra `data-category` del botón en minúsculas — funciona sin cambios. Confirmar que ninguna categoría queda vacía:

Run:
```bash
cd /home/crhist/repositorio/vcgcaribe/web-astro
grep -o "category: '[^']*'" src/data/proyectos.ts | sort | uniq -c
```
Expected: las 4 categorías presentes, ninguna con 0.

- [ ] **Step 5: Verificar tipos y build**

Run: `pnpm astro check && pnpm build`
Expected: 0 errors, build exitoso.

- [ ] **Step 6: Commit**

```bash
cd /home/crhist/repositorio/vcgcaribe/web-astro
git add src/pages/portafolio.astro
git commit -m "refactor: portafolio consume src/data/proyectos.ts"
```

---

## Task 6: Lightbox `ProjectGallery.astro`

**Files:**
- Create: `web-astro/src/components/ProjectGallery.astro`

**Interfaces:**
- Consumes: prop `proyectos: Proyecto[]`; los elementos `[data-slug]` y `.abrir-galeria[data-slug]` que Task 5 renderiza.
- Produces: un único `#project-gallery` por página. Ningún otro componente depende de él.

- [ ] **Step 1: Escribir el componente**

Un solo modal por página, no uno por tarjeta. Las fotos viajan en un `<script type="application/json">` que el modal lee por slug; las tarjetas solo llevan `data-slug`. Sin librerías nuevas: mismo patrón de `<script>` de Astro que `WhatsAppFloat.astro`.

```astro
---
import type { Proyecto } from '../data/proyectos';

interface Props {
  proyectos: Proyecto[];
}

const { proyectos } = Astro.props;

const datos = Object.fromEntries(
  proyectos.map((p) => [p.slug, { title: p.title, images: p.images }])
);
---

<script type="application/json" id="gallery-data" set:html={JSON.stringify(datos)}></script>

<div
  id="project-gallery"
  class="fixed inset-0 z-[100] hidden items-center justify-center bg-deep/95 backdrop-blur-sm p-4"
  role="dialog"
  aria-modal="true"
  aria-labelledby="gallery-title"
>
  <!-- Cerrar -->
  <button
    type="button"
    id="gallery-close"
    class="absolute top-4 right-4 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-deep/80 text-white hover:bg-accent hover:text-deep transition-colors"
    aria-label="Cerrar galería"
  >
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
    </svg>
  </button>

  <div id="gallery-inner" class="relative w-full max-w-5xl">
    <!-- Encabezado -->
    <div class="flex items-center justify-between gap-4 mb-3 pr-16">
      <h3 id="gallery-title" class="text-white text-lg md:text-2xl font-bold"></h3>
      <span id="gallery-counter" class="shrink-0 px-3 py-1 bg-accent text-deep text-sm font-bold rounded-full"></span>
    </div>

    <!-- Imagen -->
    <div class="relative rounded-2xl overflow-hidden bg-deep aspect-[4/3] md:aspect-[16/10]">
      <img id="gallery-image" src="" alt="" class="w-full h-full object-contain" loading="lazy" />

      <button
        type="button"
        id="gallery-prev"
        class="absolute left-2 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-deep/80 text-white hover:bg-accent hover:text-deep transition-colors"
        aria-label="Foto anterior"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>

      <button
        type="button"
        id="gallery-next"
        class="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-deep/80 text-white hover:bg-accent hover:text-deep transition-colors"
        aria-label="Foto siguiente"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  </div>
</div>

<script>
  interface DatosProyecto {
    title: string;
    images: string[];
  }

  document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('project-gallery');
    const datosEl = document.getElementById('gallery-data');
    if (!modal || !datosEl) return;

    const datos: Record<string, DatosProyecto> = JSON.parse(datosEl.textContent || '{}');

    const imagen = document.getElementById('gallery-image') as HTMLImageElement | null;
    const titulo = document.getElementById('gallery-title');
    const contador = document.getElementById('gallery-counter');
    const btnCerrar = document.getElementById('gallery-close') as HTMLButtonElement | null;
    const btnPrev = document.getElementById('gallery-prev') as HTMLButtonElement | null;
    const btnNext = document.getElementById('gallery-next') as HTMLButtonElement | null;
    const inner = document.getElementById('gallery-inner');
    if (!imagen || !titulo || !contador || !btnCerrar || !btnPrev || !btnNext || !inner) return;

    let fotos: string[] = [];
    let actual = 0;
    let disparador: HTMLElement | null = null;

    const pintar = () => {
      imagen.src = fotos[actual] ?? '';
      imagen.alt = `${titulo.textContent} — foto ${actual + 1}`;
      contador.textContent = `${actual + 1} / ${fotos.length}`;
      const varias = fotos.length > 1;
      btnPrev.classList.toggle('hidden', !varias);
      btnNext.classList.toggle('hidden', !varias);
    };

    const abrir = (slug: string, origen: HTMLElement) => {
      const proyecto = datos[slug];
      if (!proyecto || proyecto.images.length === 0) return;

      disparador = origen;
      fotos = proyecto.images;
      actual = 0;
      titulo.textContent = proyecto.title;
      pintar();

      modal.classList.remove('hidden');
      modal.classList.add('flex');
      document.body.style.overflow = 'hidden';
      btnCerrar.focus();
    };

    const cerrar = () => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      document.body.style.overflow = '';
      disparador?.focus();
      disparador = null;
    };

    const mover = (delta: number) => {
      if (fotos.length === 0) return;
      actual = (actual + delta + fotos.length) % fotos.length;
      pintar();
    };

    // Abrir: botón "Ver Detalles" y click en la tarjeta
    document.querySelectorAll<HTMLElement>('.project-item[data-slug]').forEach((tarjeta) => {
      const slug = tarjeta.dataset.slug;
      if (!slug) return;
      tarjeta.addEventListener('click', () => abrir(slug, tarjeta));
    });

    btnCerrar.addEventListener('click', cerrar);
    btnPrev.addEventListener('click', () => mover(-1));
    btnNext.addEventListener('click', () => mover(1));

    // Click en el fondo cierra; click dentro del contenido no
    modal.addEventListener('click', (e) => {
      if (e.target === modal) cerrar();
    });

    // Teclado: Esc cierra, flechas navegan, Tab queda atrapado en el modal
    document.addEventListener('keydown', (e) => {
      if (modal.classList.contains('hidden')) return;

      if (e.key === 'Escape') { cerrar(); return; }
      if (e.key === 'ArrowLeft') { mover(-1); return; }
      if (e.key === 'ArrowRight') { mover(1); return; }

      if (e.key === 'Tab') {
        const focusables = [btnCerrar, btnPrev, btnNext].filter(
          (b) => !b.classList.contains('hidden')
        );
        const i = focusables.indexOf(document.activeElement as HTMLButtonElement);
        e.preventDefault();
        const siguiente = e.shiftKey
          ? focusables[(i - 1 + focusables.length) % focusables.length]
          : focusables[(i + 1) % focusables.length];
        siguiente?.focus();
      }
    });

    // Móvil: swipe horizontal
    let inicioX = 0;
    inner.addEventListener('touchstart', (e) => { inicioX = e.changedTouches[0].screenX; }, { passive: true });
    inner.addEventListener('touchend', (e) => {
      const delta = e.changedTouches[0].screenX - inicioX;
      if (Math.abs(delta) < 50) return;
      mover(delta < 0 ? 1 : -1);
    }, { passive: true });
  });
</script>
```

Nota sobre el click en la tarjeta: el botón "Ver Detalles" está dentro de `.project-item`, así que su click burbujea a la tarjeta y abre el modal con el mismo slug. No hace falta un listener aparte para `.abrir-galeria`, pero el botón debe seguir siendo `<button type="button">` para que sea alcanzable por teclado.

- [ ] **Step 2: Verificar tipos**

Run: `cd /home/crhist/repositorio/vcgcaribe/web-astro && pnpm astro check`
Expected: 0 errors. (Si `document.activeElement as HTMLButtonElement` da problema con `strict`, usar `focusables.findIndex((b) => b === document.activeElement)`.)

- [ ] **Step 3: Probar en el navegador**

Run: `pnpm dev` y abrir `http://localhost:4321/portafolio`

Comprobar a mano:
- Click en una tarjeta abre el modal en la foto 1.
- Contador dice `1 / N` con la N correcta del proyecto.
- Flechas (botón y teclado ←/→) avanzan y dan la vuelta al llegar al final.
- Esc, ✕ y click en el fondo cierran; el foco vuelve a la tarjeta.
- Tab no se escapa del modal.
- Bodegas América (2 fotos) muestra `1 / 2`; ningún proyecto muestra flechas si tuviera 1 sola foto.

- [ ] **Step 4: Commit**

```bash
cd /home/crhist/repositorio/vcgcaribe/web-astro
git add src/components/ProjectGallery.astro
git commit -m "feat: lightbox de galería por proyecto en el portafolio"
```

---

## Task 7: Migrar el resto de referencias y borrar las imágenes sueltas

**Files:**
- Modify: `web-astro/src/pages/index.astro` (hero + array `projects`)
- Modify: `web-astro/src/pages/nosotros.astro` (2 imágenes)
- Modify: `web-astro/src/pages/servicios.astro` (hero + 5 `image:` restantes)
- Modify: `web-astro/src/pages/contacto.astro` (1 imagen)
- Delete: `web-astro/public/images/projects/*.jpg` (los 17 archivos sueltos)

**Interfaces:**
- Consumes: `coverDe`/las carpetas por slug de Tasks 3–4.
- Produces: `public/images/projects/` sin archivos sueltos en la raíz.

Este paso no estaba enumerado en el spec pero es consecuencia directa de "las 17 imágenes sueltas se eliminan tras migrar": esas rutas también se usan fuera de `portafolio.astro`, y borrarlas sin migrar deja imágenes rotas en home, nosotros, servicios y contacto.

- [ ] **Step 1: Mapear cada ruta vieja a su equivalente nuevo**

| Ruta vieja | Ruta nueva |
|---|---|
| `paravian.jpg`, `paravian-fachada.jpg`, `paravian-exterior.jpg`, `paravian-interior.jpg` | `paravian/cover.jpg` (o `paravian/0N.jpg` si se quiere una toma distinta) |
| `cielo-maya.jpg`, `cielo-maya-ventana.jpg`, `cielo-maya-arquitectura.jpg` | `cielo-maya/cover.jpg` |
| `villa-magna-bano.jpg`, `villa-magna-ventana.jpg` | `villa-magna/cover.jpg` |
| `las-olas-71.jpg` | `las-olas-71/cover.jpg` |
| `lote-165.jpg` | `lote-165/cover.jpg` |
| `lote-266.jpg` | `lote-266/cover.jpg` |
| `hotel-calixta.jpg` | `hotel-calixta/cover.jpg` |
| `hotel-marque.jpg` | `hotel-marque/cover.jpg` |
| `now-jade.jpg` | `now-jade/cover.jpg` |
| `royal-1.jpg` | `royal-1/cover.jpg` |
| `burger-king.jpg` | `burger-king/cover.jpg` |

Donde dos rutas viejas colapsan a la misma portada y quedan lado a lado (p. ej. el array `projects` de `index.astro`), sustituir una por otro proyecto para no repetir la misma foto en la misma retícula.

- [ ] **Step 2: Corregir las categorías también en `index.astro`**

El array `projects` de la home repite las etiquetas mal asignadas. Aplicar las mismas correcciones que en `proyectos.ts`: `Hotel Marque` → `Hotelero`, `Las Olas 71` → `Residencial`. Y actualizar `image` a las rutas nuevas.

- [ ] **Step 3: Verificar que no queda ninguna referencia suelta**

Run:
```bash
cd /home/crhist/repositorio/vcgcaribe/web-astro
grep -rn "images/projects/[a-z0-9-]*\.jpg" src/
```
Expected: sin resultados (toda ruta debe tener la forma `images/projects/<slug>/<archivo>.jpg`).

- [ ] **Step 4: Borrar las imágenes sueltas**

Run:
```bash
cd /home/crhist/repositorio/vcgcaribe/web-astro
git rm public/images/projects/*.jpg
du -sh public/images/projects/
```
Expected: la carpeta baja de 68 MB a unos ~20 MB.

- [ ] **Step 5: Verificar que el sitio no tiene imágenes rotas**

Run: `pnpm build && pnpm preview`, y con Playwright recorrer `/`, `/nosotros`, `/servicios`, `/portafolio`, `/contacto` comprobando que no hay respuestas 404 de imagen en la consola de red.

- [ ] **Step 6: Commit**

```bash
cd /home/crhist/repositorio/vcgcaribe/web-astro
git add -A src/pages public/images/projects
git commit -m "refactor: migrar referencias de imágenes a carpetas por proyecto"
```

---

## Task 8: Verificación final y regeneración del PDF

**Files:**
- Modify: ninguno (salvo correcciones que surjan).
- Genera: el PDF de la presentación (ignorado por git).

- [ ] **Step 1: Chequeo de tipos y build**

Run:
```bash
cd /home/crhist/repositorio/vcgcaribe/web-astro && pnpm astro check && pnpm build
```
Expected: 0 errors, build exitoso.

- [ ] **Step 2: Medir el peso de `/portafolio`**

Con `pnpm preview` corriendo, sumar el peso de lo que carga la página inicial:

```bash
cd /home/crhist/repositorio/vcgcaribe/web-astro
du -ch dist/images/projects/*/cover.jpg | tail -1
```
Expected: la suma de las 17 portadas por debajo de ~2 MB. Las fotos de galería no cuentan: solo se piden al abrir el lightbox (`loading="lazy"` + `src` asignado en el click).

- [ ] **Step 3: Recorrido con Playwright**

Comprobar en `http://localhost:4321/portafolio`:
- El mosaico muestra las 17 tarjetas sin huecos, en desktop (4 col), tablet (3 col) y móvil (2 col).
- Cada filtro (`Todos`, `Residencial`, `Hotelero`, `Comercial`, `Institucional`) deja visibles solo las tarjetas de esa categoría, y ninguno cae en el estado vacío.
- El lightbox abre en desktop y en móvil, navega con flechas y cierra con Esc.
- El chip `En ejecución` aparece solo en Marina Yucalpetén.

- [ ] **Step 4: Revisar la presentación**

Abrir `presentacion/presentacion-moderna.html` en el navegador y confirmar que la rejilla de "Tipos de trabajos" se ve equilibrada con 5 tarjetas (3 arriba, 2 centradas abajo), sin hueco.

- [ ] **Step 5: Regenerar el PDF**

Run:
```bash
cd /home/crhist/repositorio/vcgcaribe/web-astro && node generar-pdf-hq.mjs
```
Expected: PDF regenerado. No comprimirlo. (Está en `.gitignore`.)

- [ ] **Step 6: Actualizar `CLAUDE.md`**

Los datos canónicos cambiaron. Actualizar en `/home/crhist/repositorio/vcgcaribe/CLAUDE.md`:
- Tabla de datos canónicos: agregar fila **Años de experiencia = 10**, y **Mantenimiento = servicio descontinuado, no mencionar**.
- Quitar de "Discrepancias pendientes" la línea de años de experiencia (ya resuelta); dejar las de proyectos completados y profesionales.
- Tabla "Dónde viven las cifras": los stats de `index`/`nosotros`/`portafolio` ahora dicen `10+ Años`.
- Estructura del repo: agregar `src/data/proyectos.ts`, `src/components/ProjectGallery.astro` y `scripts/optimizar-imagenes.mjs`.
- Sección de portafolio: documentar que el contenido ya no vive en el frontmatter de la página sino en `src/data/proyectos.ts`, y que las imágenes se generan con `pnpm imagenes`.

- [ ] **Step 7: Commit final**

```bash
cd /home/crhist/repositorio/vcgcaribe
git add CLAUDE.md
git commit -m "docs: actualizar datos canónicos y estructura tras la congruencia del portafolio"
```

---

## Notas de ejecución

- **Orden:** Tasks 1 y 2 son independientes del resto y se pueden hacer primero para dejar las cifras cerradas. Task 3 (imágenes) bloquea a 4, 5, 6 y 7.
- **Deploy:** el push a `main` de `vcg-caribe-web` dispara el deploy automático a Cloudflare Pages. Pushear solo cuando Task 8 esté en verde, y desde la cuenta gh `CrhistianHeredia` (la default es de solo lectura).
- **Riesgo abierto:** la selección de fotos es el paso más lento y el único que no se puede automatizar — hay que mirar los mosaicos proyecto por proyecto.
