# Botón Flotante de WhatsApp — Plan de Implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Botón flotante de WhatsApp en todas las páginas con panel selector de sucursal (Mérida / Cancún) y mensaje pre-llenado.

**Architecture:** Un componente Astro autocontenido (`WhatsAppFloat.astro`) con su script inline, incluido una sola vez en `Layout.astro` después de `<slot />`. Sin dependencias nuevas.

**Tech Stack:** Astro 5, Tailwind CSS 3.4 (tokens del proyecto: `deep`, `text`, `muted`, `animate-fade-in-up`).

**Spec:** `docs/superpowers/specs/2026-07-08-whatsapp-float-design.md`

## Global Constraints

- Usar SIEMPRE `pnpm` (nunca `npm`).
- Mensaje pre-llenado exacto: `Hola, vengo del sitio web de VCG Caribe y me gustaría una cotización.`
- Números: Mérida `529992456823`, Cancún `529981178422`.
- Etiquetas: `Matriz — Mérida`, `Sucursal — Cancún`.
- Sin librerías de terceros; JS mínimo inline.
- El repo `web-astro` despliega automáticamente al pushear a `main` — commitear local, NO pushear hasta que la verificación pase.

---

### Task 1: Componente WhatsAppFloat + inclusión en Layout

**Files:**
- Create: `src/components/WhatsAppFloat.astro`
- Modify: `src/layouts/Layout.astro:54-56` (insertar el componente después de `<slot />`)

**Interfaces:**
- Consumes: tokens Tailwind existentes (`bg-deep`, `text-text`, `text-muted`, `animate-fade-in-up`).
- Produces: componente sin props; ids DOM `wa-float`, `wa-toggle`, `wa-panel` (usados por la verificación de Task 2).

- [ ] **Step 1: Crear `src/components/WhatsAppFloat.astro`**

```astro
---
const mensaje = encodeURIComponent(
  'Hola, vengo del sitio web de VCG Caribe y me gustaría una cotización.'
);
const sucursales = [
  { nombre: 'Matriz — Mérida', telefono: '999 245 6823', href: `https://wa.me/529992456823?text=${mensaje}` },
  { nombre: 'Sucursal — Cancún', telefono: '998 117 8422', href: `https://wa.me/529981178422?text=${mensaje}` },
];
---

<div id="wa-float" class="fixed bottom-6 right-6 z-50 animate-fade-in-up">
  <div
    id="wa-panel"
    class="hidden absolute bottom-[4.5rem] right-0 w-72 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden"
  >
    <div class="bg-deep px-4 py-3">
      <p class="text-white font-semibold text-sm">¿Con qué sucursal quieres hablar?</p>
    </div>
    <nav class="p-2" aria-label="Sucursales de WhatsApp">
      {sucursales.map((s) => (
        <a
          href={s.href}
          target="_blank"
          rel="noopener"
          class="flex items-center gap-3 p-3 rounded-lg hover:bg-green-50 focus-visible:bg-green-50 transition-colors duration-200"
        >
          <span class="w-10 h-10 shrink-0 bg-green-500 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="w-5 h-5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </span>
          <span>
            <span class="block text-text font-semibold text-sm">{s.nombre}</span>
            <span class="block text-muted text-xs">{s.telefono}</span>
          </span>
        </a>
      ))}
    </nav>
  </div>

  <button
    id="wa-toggle"
    type="button"
    aria-label="Chatear por WhatsApp"
    aria-expanded="false"
    aria-controls="wa-panel"
    class="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 transition-all duration-300 hover:scale-105"
  >
    <svg id="wa-icon-chat" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="w-7 h-7">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
    <svg id="wa-icon-close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" class="w-6 h-6 hidden">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>
</div>

<script>
  const root = document.getElementById('wa-float');
  const toggle = document.getElementById('wa-toggle');
  const panel = document.getElementById('wa-panel');
  const iconChat = document.getElementById('wa-icon-chat');
  const iconClose = document.getElementById('wa-icon-close');

  function setOpen(open: boolean) {
    if (!panel || !toggle || !iconChat || !iconClose) return;
    panel.classList.toggle('hidden', !open);
    iconChat.classList.toggle('hidden', open);
    iconClose.classList.toggle('hidden', !open);
    toggle.setAttribute('aria-expanded', String(open));
  }

  toggle?.addEventListener('click', () => {
    setOpen(panel?.classList.contains('hidden') ?? false);
  });

  document.addEventListener('click', (e) => {
    if (root && !root.contains(e.target as Node)) setOpen(false);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });
</script>
```

- [ ] **Step 2: Incluir en `src/layouts/Layout.astro`**

Agregar el import en el frontmatter (línea 2, junto al import existente):

```astro
import WhatsAppFloat from '../components/WhatsAppFloat.astro';
```

Y en el body (líneas 54-56), insertar el componente después de `<slot />`:

```astro
  <body class="min-h-screen flex flex-col custom-scrollbar overflow-x-hidden">
    <slot />
    <WhatsAppFloat />
  </body>
```

- [ ] **Step 3: Verificar que el build pasa**

Run: `pnpm build`
Expected: `astro check` sin errores (0 errors) y build completo en `dist/`.

- [ ] **Step 4: Commit**

```bash
git add src/components/WhatsAppFloat.astro src/layouts/Layout.astro
git commit -m "feat: boton flotante de WhatsApp con selector de sucursal"
```

---

### Task 2: Verificación funcional con Playwright

**Files:**
- Create (temporal, en scratchpad — NO commitear): `verify-wa-float.mjs`

**Interfaces:**
- Consumes: ids DOM `wa-float`, `wa-toggle`, `wa-panel` de Task 1; servidor dev en `http://localhost:4321`.
- Produces: confirmación de los criterios de verificación del spec.

- [ ] **Step 1: Levantar el servidor de desarrollo**

Run: `pnpm dev` (en background)
Expected: `curl -s -o /dev/null -w "%{http_code}" http://localhost:4321/` → `200`

- [ ] **Step 2: Crear y correr el script de verificación**

```javascript
import { chromium } from 'playwright';

const PAGES = ['/', '/nosotros', '/servicios', '/portafolio', '/contacto'];
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
let fallos = 0;

for (const url of PAGES) {
  await page.goto(`http://localhost:4321${url}`);
  const visible = await page.locator('#wa-toggle').isVisible();
  if (!visible) { console.log(`FALLO: boton no visible en ${url}`); fallos++; }
}

// Interacción (en la home)
await page.goto('http://localhost:4321/');
await page.click('#wa-toggle');
if (!(await page.locator('#wa-panel').isVisible())) { console.log('FALLO: panel no abre'); fallos++; }

const links = await page.locator('#wa-panel a').evaluateAll(as => as.map(a => a.href));
const esperados = [
  'https://wa.me/529992456823?text=Hola%2C%20vengo%20del%20sitio%20web%20de%20VCG%20Caribe%20y%20me%20gustar%C3%ADa%20una%20cotizaci%C3%B3n.',
  'https://wa.me/529981178422?text=Hola%2C%20vengo%20del%20sitio%20web%20de%20VCG%20Caribe%20y%20me%20gustar%C3%ADa%20una%20cotizaci%C3%B3n.',
];
for (const e of esperados) {
  if (!links.includes(e)) { console.log(`FALLO: falta enlace ${e}`); fallos++; }
}

await page.keyboard.press('Escape');
if (await page.locator('#wa-panel').isVisible()) { console.log('FALLO: Esc no cierra'); fallos++; }

await page.click('#wa-toggle');
await page.click('body', { position: { x: 10, y: 300 } });
if (await page.locator('#wa-panel').isVisible()) { console.log('FALLO: clic fuera no cierra'); fallos++; }

// Overflow horizontal en móvil
for (const width of [320, 375, 414]) {
  await page.setViewportSize({ width, height: 800 });
  await page.goto('http://localhost:4321/');
  const overflow = await page.evaluate(() =>
    document.documentElement.scrollWidth > document.documentElement.clientWidth
  );
  if (overflow) { console.log(`FALLO: overflow horizontal a ${width}px`); fallos++; }
}

await browser.close();
console.log(fallos === 0 ? 'OK: todas las verificaciones pasaron' : `${fallos} fallos`);
process.exit(fallos === 0 ? 0 : 1);
```

Run: `node <scratchpad>/verify-wa-float.mjs` (desde `web-astro/` para resolver `playwright`)
Expected: `OK: todas las verificaciones pasaron`

- [ ] **Step 3: Captura visual para revisión del usuario**

Con el panel abierto en la home a 1280×800, tomar screenshot y enviarla al usuario.

- [ ] **Step 4: Detener el servidor dev**

No commitear nada en esta task. El push a `main` (deploy) se decide con el usuario después de la revisión visual.
