# VCG Caribe - Sitio Web

Sitio web profesional para **VCG Caribe** (Valor, Confianza y Garantía), empresa especializada en cancelería de vidrio y aluminio en la Riviera Maya.

## Enlaces

- **Sitio en vivo**: [https://vcg-caribe.pages.dev](https://vcg-caribe.pages.dev)
- **Repositorio**: [https://github.com/CrhistianHeredia/vcg-caribe-web](https://github.com/CrhistianHeredia/vcg-caribe-web)

## Tecnologías

- [Astro](https://astro.build/) 4.15.0 - Framework web
- [Tailwind CSS](https://tailwindcss.com/) 3.4.0 - Estilos
- [Anime.js](https://animejs.com/) - Animaciones
- [Cloudflare Pages](https://pages.cloudflare.com/) - Hosting

## Estructura del Proyecto

```
/
├── public/
│   └── images/          # Imágenes optimizadas del sitio
├── src/
│   ├── components/      # Componentes Astro reutilizables
│   ├── config/
│   │   └── seo.ts       # Configuración centralizada de SEO
│   ├── layouts/         # Layouts de página
│   ├── pages/           # Páginas del sitio
│   │   ├── index.astro
│   │   ├── nosotros.astro
│   │   ├── servicios.astro
│   │   ├── portafolio.astro
│   │   └── contacto.astro
│   └── styles/          # Estilos globales
└── package.json
```

## Desarrollo Local

### Requisitos

- Node.js >= 22.12.0
- pnpm (recomendado)

### Instalación

```bash
# Clonar repositorio
git clone https://github.com/CrhistianHeredia/vcg-caribe-web.git
cd vcg-caribe-web

# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev
```

El sitio estará disponible en `http://localhost:4321`

### Comandos

| Comando         | Acción                                          |
| :-------------- | :---------------------------------------------- |
| `pnpm install`  | Instala dependencias                            |
| `pnpm dev`      | Inicia servidor de desarrollo en `localhost:4321` |
| `pnpm build`    | Compila el sitio para producción en `./dist/`   |
| `pnpm preview`  | Vista previa del build antes de desplegar       |
| `pnpm deploy`   | Compila y despliega a Cloudflare Pages          |

## Despliegue a Cloudflare Pages

### 1. Crear Token de API en Cloudflare

1. Ir a [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navegar a **My Profile** → **API Tokens**
3. Click en **Create Token**
4. Usar la plantilla **"Edit Cloudflare Workers"** (incluye permisos necesarios para Pages)
5. Configurar:
   - **Account Resources**: Seleccionar tu cuenta
   - **Zone Resources**: All zones (o la zona específica)
6. Crear el token y guardarlo de forma segura

### 2. Configurar Variables de Entorno

```bash
# Copiar el archivo de ejemplo
cp .env.example .env

# Editar .env y agregar tu token
CLOUDFLARE_API_TOKEN=tu_token_aqui
```

### 3. Crear Proyecto en Cloudflare Pages (primera vez)

```bash
# Crear el proyecto
npx wrangler@3 pages project create vcg-caribe --production-branch=main
```

### 4. Desplegar

```bash
# Build y deploy
pnpm deploy
```

O manualmente:

```bash
pnpm build
npx wrangler@3 pages deploy dist --project-name=vcg-caribe
```

### Notas sobre Wrangler

- Este proyecto usa **Wrangler 3** para compatibilidad con Node 20
- Wrangler 4+ requiere Node 22+
- El token de API se lee automáticamente desde `.env`

## Testing Responsivo con Playwright

El proyecto incluye Playwright como dependencia de desarrollo para validar el comportamiento responsivo del sitio.

### Instalación de Browsers

```bash
# Instalar Chromium para Playwright
npx playwright install chromium
```

### Script de Validación Responsiva

Crear `test-responsive.mjs` para validar todas las páginas en múltiples viewports:

```javascript
import { chromium } from 'playwright';

const VIEWPORTS = [
  { name: 'mobile-sm', width: 320, height: 568 },  // iPhone SE
  { name: 'mobile-md', width: 375, height: 667 },  // iPhone 8
  { name: 'mobile-lg', width: 414, height: 896 },  // iPhone 11 Pro Max
  { name: 'tablet', width: 768, height: 1024 },    // iPad
  { name: 'desktop', width: 1280, height: 800 },   // Desktop
];

const PAGES = ['/', '/servicios', '/portafolio', '/nosotros', '/contacto'];

async function testResponsive() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  for (const pageUrl of PAGES) {
    for (const viewport of VIEWPORTS) {
      await page.setViewportSize(viewport);
      await page.goto(`http://localhost:4321${pageUrl}`);

      // Detectar scroll horizontal (problema común en móvil)
      const hasOverflow = await page.evaluate(() =>
        document.documentElement.scrollWidth > document.documentElement.clientWidth
      );

      if (hasOverflow) {
        console.log(`⚠️ Overflow en ${pageUrl} @ ${viewport.name}`);
      }

      // Capturar screenshot
      await page.screenshot({
        path: `screenshots/${pageUrl.slice(1) || 'home'}-${viewport.name}.png`,
        fullPage: true
      });
    }
  }

  await browser.close();
}

testResponsive();
```

### Ejecución

```bash
# Iniciar servidor de desarrollo
pnpm dev

# En otra terminal, ejecutar tests
node test-responsive.mjs
```

### Debug de Elementos con Overflow

Para identificar qué elemento causa scroll horizontal:

```javascript
const overflowingElements = await page.evaluate(() => {
  const docWidth = document.documentElement.clientWidth;
  const results = [];

  document.querySelectorAll('*').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.right > docWidth) {
      results.push({
        element: el.tagName + (el.id ? `#${el.id}` : ''),
        overflow: Math.round(rect.right - docWidth) + 'px'
      });
    }
  });

  return results;
});
```

### Problemas Comunes y Soluciones

| Problema | Causa | Solución |
|----------|-------|----------|
| Scroll horizontal | Elementos con `translate-x-full` o posición absoluta fuera del viewport | Agregar `overflow-x-hidden` a `<html>` y `<body>` |
| Menú móvil transparente | `height: 0` por uso incorrecto de `inset-0` + `top-N` | Usar altura explícita: `h-[calc(100vh-5rem)]` |
| Menú sin fondo sólido | `backdrop-blur` sin background opaco | Usar `bg-[#color]` en lugar de `bg-color/opacity` |

## SEO

La configuración de SEO está centralizada en `src/config/seo.ts`:

- Keywords organizadas por categoría (primarias, secundarias, geográficas, servicios, long-tail)
- Meta tags específicos por página
- Schema.org LocalBusiness para SEO local
- Open Graph tags para redes sociales

Para actualizar keywords o meta tags, editar `src/config/seo.ts`.

## Información de Contacto

**VCG Caribe**
- Tel: 998 234 4274 / 998 204 2369
- Email: servicioalcliente.vcg@gmail.com
- Matriz Cancún: Av. Talleres, Región 92
- Sucursal Mérida: Calle 92 No. 503 D, Centro

---

Desarrollado para VCG Caribe
