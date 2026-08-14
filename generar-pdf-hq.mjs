// Exporta la presentación a PDF en alta calidad.
// A diferencia de page.pdf() (que recomprime y baja la resolución de las imágenes),
// captura cada slide como imagen a 2x y la incrusta sin recomprimir en el PDF.
import { chromium } from 'playwright';
import { PDFDocument } from 'pdf-lib';
import { writeFileSync } from 'fs';

const htmlPath = '/home/crhist/repositorio/vcgcaribe/presentacion/presentacion-moderna.html';
const pdfPath = '/home/crhist/repositorio/vcgcaribe/presentacion/VCG-Caribe-Presentacion-Moderna.pdf';
const SCALE = 2;            // 1920x1080 → captura a 3840x2160
const JPEG_QUALITY = 95;

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
try {
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: SCALE,
  });
  await page.goto('file://' + htmlPath, { waitUntil: 'load', timeout: 90000 });

  // Forzar carga de todas las imágenes lazy y recorrer los slides
  await page.evaluate(async () => {
    document.querySelectorAll('img[loading="lazy"]').forEach(img => (img.loading = 'eager'));
    for (const slide of document.querySelectorAll('.slide')) {
      slide.scrollIntoView();
      await new Promise(r => setTimeout(r, 200));
    }
    window.scrollTo(0, 0);
  });

  // Esperar a que todas las imágenes terminen de cargar
  await page.evaluate(async () => {
    const imgs = Array.from(document.querySelectorAll('img'));
    await Promise.all(imgs.map(img => img.complete ? null : new Promise(res => {
      img.onload = res; img.onerror = res;
    })));
  });
  await page.waitForTimeout(1500);

  const slides = await page.$$('.slide');
  console.log(`Capturando ${slides.length} slides a ${SCALE}x...`);

  const pdf = await PDFDocument.create();
  for (let i = 0; i < slides.length; i++) {
    await slides[i].scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    const shot = await slides[i].screenshot({ type: 'jpeg', quality: JPEG_QUALITY });
    const img = await pdf.embedJpg(shot);
    // Página a tamaño 1920x1080 pt con la imagen 2x incrustada (≈192 DPI efectivos)
    const pdfPage = pdf.addPage([1920, 1080]);
    pdfPage.drawImage(img, { x: 0, y: 0, width: 1920, height: 1080 });
    console.log(`  slide ${i + 1}/${slides.length}`);
  }

  writeFileSync(pdfPath, await pdf.save());
  console.log('PDF creado en:', pdfPath);
} finally {
  await browser.close();
}
