import { chromium } from 'playwright';

const htmlPath = '/home/crhist/repositorio/vcgcaribe/presentacion/presentacion-moderna.html';
const pdfPath = '/home/crhist/repositorio/vcgcaribe/presentacion/VCG-Caribe-Presentacion-Moderna.pdf';

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
try {
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
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

  await page.pdf({
    path: pdfPath,
    printBackground: true,     // conserva fondos y gradientes
    preferCSSPageSize: true,   // respeta @page { size: 1920px 1080px }
    width: '1920px',
    height: '1080px',
    landscape: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
  });

  console.log('PDF creado en:', pdfPath);
} finally {
  await browser.close();
}
