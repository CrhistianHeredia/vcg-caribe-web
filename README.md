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
