#!/usr/bin/env node
/**
 * Optimiza las fotos de GALERIA VCG hacia public/images/projects/<slug>/.
 * Genera cover.jpg (tarjeta del mosaico) y 01.jpg…NN.jpg (galería del lightbox).
 * Idempotente: se puede volver a correr, cada corrida borra y regenera la carpeta
 * del slug afectado. Los originales de GALERIA VCG/ solo se leen, nunca se tocan.
 *
 * Uso:
 *   node scripts/optimizar-imagenes.mjs           # todos los proyectos del manifiesto
 *   node scripts/optimizar-imagenes.mjs paravian   # solo un slug
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
const LIMITE_COVER_BYTES = 200 * 1024; // requisito: ningún cover.jpg puede superar 200 KB

// slug → rutas relativas a "GALERIA VCG/". El orden importa: la primera foto de
// cada proyecto es además la portada (cover.jpg). Selección visual ya revisada y
// aprobada (ver .superpowers/sdd/2026-08-14-portafolio-congruencia-galeria/seleccion-*.md).
const MANIFIESTO = {
  paravian: [
    '2025/PARAVIAN TORRE A Y B/wetransfer_ptoaventurasyplayadc_2025-07-05_2340/image00010.jpeg',
    '2025/PARAVIAN TORRE A Y B/wetransfer_ptoaventurasyplayadc_2025-07-05_2340/image00007.jpeg',
    '2025/PARAVIAN TORRE A Y B/wetransfer_ptoaventurasyplayadc_2025-07-05_2340/image00005.jpeg',
    '2025/PARAVIAN TORRE A Y B/wetransfer_ptoaventurasyplayadc_2025-07-05_2340/image00003.jpeg',
    '2025/PARAVIAN TORRE A Y B/wetransfer_ptoaventurasyplayadc_2025-07-05_2340/image00015.jpeg',
    '2025/PARAVIAN TORRE A Y B/wetransfer_ptoaventurasyplayadc_2025-07-05_2340/image00060.jpeg',
  ],
  'cielo-maya': [
    '2025/CIELO MAYA PUERTO AVENTURAS/IMG-20250404-WA0038.jpg',
    '2025/CIELO MAYA PUERTO AVENTURAS/image00075.jpeg',
    '2025/CIELO MAYA PUERTO AVENTURAS/image00076.jpeg',
    '2025/CIELO MAYA PUERTO AVENTURAS/image00081.jpeg',
    '2025/CIELO MAYA PUERTO AVENTURAS/image00087.jpeg',
    '2025/CIELO MAYA PUERTO AVENTURAS/IMG-20250404-WA0034.jpg',
  ],
  'las-olas-71': [
    '2025/LAS OLAS 71 BAHIA PRINCIPE/image00172.jpeg',
    '2025/LAS OLAS 71 BAHIA PRINCIPE/image00201.jpeg',
    '2025/LAS OLAS 71 BAHIA PRINCIPE/image00208.jpeg',
    '2025/LAS OLAS 71 BAHIA PRINCIPE/image00184.jpeg',
    '2025/LAS OLAS 71 BAHIA PRINCIPE/image00139.jpeg',
    '2025/LAS OLAS 71 BAHIA PRINCIPE/image00129.jpeg',
  ],
  'lote-165': [
    '2025/LOTE 165 ARQ SANTIAGO SILANES PUERTO CANCUN/image00090.jpeg',
    '2025/LOTE 165 ARQ SANTIAGO SILANES PUERTO CANCUN/image00044.jpeg',
    '2025/LOTE 165 ARQ SANTIAGO SILANES PUERTO CANCUN/image00094.jpeg',
    '2025/LOTE 165 ARQ SANTIAGO SILANES PUERTO CANCUN/image00100.jpeg',
    '2025/LOTE 165 ARQ SANTIAGO SILANES PUERTO CANCUN/image00105.jpeg',
    '2025/LOTE 165 ARQ SANTIAGO SILANES PUERTO CANCUN/image00051.jpeg',
  ],
  'villa-magna': [
    '2019/VILLA MAGNA NAPOLES 10/20200608_161456.jpg',
    '2019/VILLA MAGNA NAPOLES 10/20200608_160909.jpg',
    '2019/VILLA MAGNA NAPOLES 10/20200608_160932.jpg',
    '2019/VILLA MAGNA NAPOLES 10/20200608_161028.jpg',
    '2019/VILLA MAGNA NAPOLES 10/20200608_161302.jpg',
    '2019/VILLA MAGNA NAPOLES 10/20200608_161353.jpg',
  ],
  'lote-266': [
    '2025/CASA LOTE 266 PUERTO CANCUNC/IMG_20240111_130114.jpg',
    '2025/CASA LOTE 266 PUERTO CANCUNC/IMG_20240111_125538.jpg',
    '2025/CASA LOTE 266 PUERTO CANCUNC/IMG_20240111_130105.jpg',
    '2025/CASA LOTE 266 PUERTO CANCUNC/IMG_20240111_131600.jpg',
    '2025/CASA LOTE 266 PUERTO CANCUNC/IMG_20240111_131735.jpg',
    '2025/CASA LOTE 266 PUERTO CANCUNC/IMG_20240111_131809.jpg',
  ],
  'casa-chelem': [
    '2025/CASA CHELEM LUIS ESCALANTE/IMG_20240925_091444.jpg',
    '2025/CASA CHELEM LUIS ESCALANTE/IMG_20240925_091121.jpg',
    '2025/CASA CHELEM LUIS ESCALANTE/IMG_20240925_091720.jpg',
    '2025/CASA CHELEM LUIS ESCALANTE/IMG_20240925_091146.jpg',
    '2025/CASA CHELEM LUIS ESCALANTE/IMG_20240925_091957.jpg',
    '2025/CASA CHELEM LUIS ESCALANTE/IMG_20240925_101326.jpg',
  ],
  'casa-tecatito': [
    '2022/CASA TECATITO CORONA CORONA/IMG_20230923_111432.jpg',
    '2022/CASA TECATITO CORONA CORONA/barandal casa corona 1.jpg',
    '2022/CASA TECATITO CORONA CORONA/IMG_20230923_111551.jpg',
    '2022/CASA TECATITO CORONA CORONA/IMG_20230923_111210.jpg',
    '2022/CASA TECATITO CORONA CORONA/IMG_20230201_093254.jpg',
    '2022/CASA TECATITO CORONA CORONA/IMG_20230204_122324.jpg',
  ],
  'marina-yucalpeten': [
    '2026/TORRE BONANZA MARINA YUCALPETEN/IMG-20260424-WA0056.jpg',
    '2026/TORRE BONANZA MARINA YUCALPETEN/IMG-20260424-WA0057.jpg',
    '2026/TORRE BONANZA MARINA YUCALPETEN/IMG-20260424-WA0055.jpg',
    '2026/TORRE BONANZA MARINA YUCALPETEN/IMG-20260424-WA0054.jpg',
    '2026/TORRE BONANZA MARINA YUCALPETEN/IMG-20260420-WA0078.jpg',
    '2026/TORRE BONANZA MARINA YUCALPETEN/IMG-20260420-WA0079.jpg',
  ],
  'hotel-calixta': [
    '2019/HOTEL CALIXTA/20200716_144112.jpg',
    '2019/HOTEL CALIXTA/20191129_101807.jpg',
    '2019/HOTEL CALIXTA/20191129_101621.jpg',
    '2019/HOTEL CALIXTA/20200716_144118.jpg',
    '2019/HOTEL CALIXTA/20191129_095704.jpg',
    '2019/HOTEL CALIXTA/20191129_101754.jpg',
  ],
  'now-jade': [
    '2020/NOW JADE PUERTO MORELOS/PERGOLA/Photos-1-001 (2)/20211130_162428.jpg',
    '2020/NOW JADE PUERTO MORELOS/BARANDAL ASIATICO/IMG20210106100759.jpg',
    '2020/NOW JADE PUERTO MORELOS/BARANDAL ASIATICO/IMG20210106100749.jpg',
    '2020/NOW JADE PUERTO MORELOS/BARANDAL ASIATICO/20180817_100007.jpg',
    '2020/NOW JADE PUERTO MORELOS/PERGOLA/Photos-1-001 (2)/20211130_162518.jpg',
    '2020/NOW JADE PUERTO MORELOS/PERGOLA/Photos-1-001 (2)/20211130_162610.jpg',
  ],
  'hotel-marque': [
    '2019/HOTEL MARQUE/20200716_142452.jpg',
    '2019/HOTEL MARQUE/20200716_143644.jpg',
    '2019/HOTEL MARQUE/IMG-20180219-WA0010.jpg',
    '2019/HOTEL MARQUE/IMG-20180712-WA0004.jpg',
    '2019/HOTEL MARQUE/20190220_143741.jpg',
    '2019/HOTEL MARQUE/20200716_142441.jpg',
  ],
  'royal-1': [
    '2023/ROYAL 1/WhatsApp Image 2023-02-23 at 11.51.04 (4).jpeg',
    '2023/ROYAL 1/WhatsApp Image 2023-02-23 at 11.51.04 (2).jpeg',
    '2023/ROYAL 1/WhatsApp Image 2023-02-23 at 11.51.05.jpeg',
    '2023/ROYAL 1/WhatsApp Image 2023-02-23 at 11.51.07.jpeg',
    '2023/ROYAL 1/WhatsApp Image 2023-02-23 at 11.51.04.jpeg',
    '2023/ROYAL 1/WhatsApp Image 2023-02-23 at 11.51.05 (1).jpeg',
  ],
  'burger-king': [
    '2022/BURGER KING LA GRAN PLAZA CANCUN/image00113.jpeg',
    '2022/BURGER KING LA GRAN PLAZA CANCUN/IMG_20230516_135939.jpg',
    '2022/BURGER KING LA GRAN PLAZA CANCUN/image00117.jpeg',
    '2022/BURGER KING LA GRAN PLAZA CANCUN/image00120.jpeg',
    '2022/BURGER KING LA GRAN PLAZA CANCUN/image00118.jpeg',
    '2022/BURGER KING LA GRAN PLAZA CANCUN/image00122.jpeg',
  ],
  'bodegas-america': [
    '2021/BODEGAS AMERICA COLOSIO/20211115_115809.jpg',
    '2021/BODEGAS AMERICA COLOSIO/WhatsApp Image 2023-01-10 at 10.15.28.jpeg',
  ],
  'iglesia-santa-maria': [
    '2022/IGLESIA SANTA MARIA DE GUADALUPE UNIVERSIDAD ANAHUAC/20220129_092510.jpg',
    '2022/IGLESIA SANTA MARIA DE GUADALUPE UNIVERSIDAD ANAHUAC/20220129_092341.jpg',
    '2022/IGLESIA SANTA MARIA DE GUADALUPE UNIVERSIDAD ANAHUAC/20220129_092316.jpg',
    '2022/IGLESIA SANTA MARIA DE GUADALUPE UNIVERSIDAD ANAHUAC/20220129_092528.jpg',
    '2022/IGLESIA SANTA MARIA DE GUADALUPE UNIVERSIDAD ANAHUAC/20220129_092605.jpg',
    '2022/IGLESIA SANTA MARIA DE GUADALUPE UNIVERSIDAD ANAHUAC/20220129_092553.jpg',
    '2022/IGLESIA SANTA MARIA DE GUADALUPE UNIVERSIDAD ANAHUAC/IMG_20221216_094654.jpg',
  ],
  'centro-negocios-anahuac': [
    '2019/CENTRO DE NEGOCIOS UNIVERSIDAD ANAHUAC/IMG20210106111025.jpg',
    '2019/CENTRO DE NEGOCIOS UNIVERSIDAD ANAHUAC/IMG20210106110615.jpg',
    '2019/CENTRO DE NEGOCIOS UNIVERSIDAD ANAHUAC/IMG20210106110903.jpg',
    '2019/CENTRO DE NEGOCIOS UNIVERSIDAD ANAHUAC/IMG20210106111101.jpg',
    '2019/CENTRO DE NEGOCIOS UNIVERSIDAD ANAHUAC/IMG20210106110846.jpg',
    '2019/CENTRO DE NEGOCIOS UNIVERSIDAD ANAHUAC/IMG20210106110855.jpg',
  ],
};

/** Optimiza una imagen: corrige orientación EXIF, redimensiona y comprime a JPEG. */
const optimizar = async (origen, destino, { lado, calidad }) => {
  try {
    await sharp(origen)
      .rotate() // aplica orientación EXIF
      .resize(lado, lado, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: calidad, progressive: true, mozjpeg: true })
      .toFile(destino); // sharp no copia metadatos si no se pide
  } catch (err) {
    // Reporte claro: qué archivo de origen falló y por qué, sin stack trace ilegible.
    throw new Error(`Error al procesar "${origen}": ${err.message}`);
  }
};

/**
 * Genera el cover.jpg garantizando que pese menos de LIMITE_COVER_BYTES: algunas
 * fotos con mucho detalle (fachadas de vidrio, texturas) superan el límite con la
 * calidad base, así que baja la calidad en pasos y, si aún así no alcanza, reduce
 * también el lado máximo.
 */
const generarCover = async (origen, destino) => {
  const pasosCalidad = [COVER.calidad, 72, 65, 58, 51, 45, 40];
  const pasosLado = [COVER.lado, 1000, 800];

  for (const lado of pasosLado) {
    for (const calidad of pasosCalidad) {
      await optimizar(origen, destino, { lado, calidad });
      if (statSync(destino).size <= LIMITE_COVER_BYTES) return;
    }
  }

  throw new Error(
    `No se pudo bajar "${destino}" de ${LIMITE_COVER_BYTES / 1024} KB ni en el intento más agresivo (lado ${pasosLado.at(-1)}px, calidad ${pasosCalidad.at(-1)}). Origen: "${origen}"`
  );
};

const soloSlug = process.argv[2];
let total = 0;
let procesados = 0;

for (const [slug, rutas] of Object.entries(MANIFIESTO)) {
  if (soloSlug && slug !== soloSlug) continue;

  const carpeta = join(DESTINO, slug);
  rmSync(carpeta, { recursive: true, force: true });
  mkdirSync(carpeta, { recursive: true });

  for (const [i, rel] of rutas.entries()) {
    const origen = join(GALERIA, rel);
    if (!existsSync(origen)) {
      throw new Error(`No existe en GALERIA VCG: "${rel}" (proyecto "${slug}")`);
    }

    if (i === 0) await generarCover(origen, join(carpeta, 'cover.jpg'));
    const nombre = String(i + 1).padStart(2, '0') + '.jpg';
    await optimizar(origen, join(carpeta, nombre), GALERIA_CFG);
    total += statSync(join(carpeta, nombre)).size;
  }

  console.log(`✓ ${slug.padEnd(24)} ${rutas.length} fotos`);
  procesados++;
}

if (soloSlug && procesados === 0) {
  throw new Error(`Slug desconocido: "${soloSlug}". No está en el MANIFIESTO.`);
}

console.log(`\nTotal galería: ${(total / 1024 / 1024).toFixed(1)} MB`);
