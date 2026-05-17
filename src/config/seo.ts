/**
 * Configuración SEO centralizada para VCG Caribe
 * Actualiza este archivo para modificar el SEO de todo el sitio
 */

export const siteConfig = {
  // Información básica del sitio
  name: 'VCG Caribe',
  tagline: 'Valor, Confianza y Garantía',
  description: 'Expertos en cancelería de vidrio y aluminio para proyectos hoteleros, residenciales y comerciales en Cancún, Riviera Maya y la Península de Yucatán.',

  // URLs
  url: 'https://vcgcaribe.com',

  // Información de contacto
  contact: {
    phones: ['998 234 4274', '998 204 2369'],
    emails: ['servicioalcliente.vcg@gmail.com', 'acua.vcg@gmail.com'],
    whatsapp: '529982344274',
  },

  // Ubicaciones
  locations: {
    cancun: {
      name: 'Matriz Cancún',
      address: 'Av. Talleres, Región 92, Cancún, Q. Roo',
      mapUrl: 'https://maps.google.com/?q=Av+Talleres+Region+92+Cancun',
    },
    merida: {
      name: 'Sucursal Mérida',
      address: 'Calle 92 No. 503 D, Centro, CP. 97000, Mérida, Yucatán',
      mapUrl: 'https://maps.google.com/?q=Calle+92+503+Centro+Merida',
    },
  },

  // Horarios
  hours: {
    weekdays: 'Lunes a Viernes: 8:00 AM - 6:00 PM',
    saturday: 'Sábado: 8:00 AM - 1:00 PM',
    sunday: 'Domingo: Cerrado',
  },

  // Redes sociales
  social: {
    facebook: 'https://facebook.com/vcgcaribe',
    instagram: 'https://instagram.com/vcgcaribe',
    // linkedin: '',
  },
};

// Palabras clave principales
export const keywords = {
  // Palabras clave primarias (más importantes)
  primary: [
    'cancelería Cancún',
    'vidrio y aluminio Cancún',
    'ventanas de aluminio Riviera Maya',
    'cancelería hotelera',
    'barandales de vidrio',
    'muros cortina Cancún',
  ],

  // Palabras clave secundarias
  secondary: [
    'puertas de aluminio',
    'ventanas corredizas',
    'vidrio templado',
    'cancelería residencial',
    'fachadas de vidrio',
    'herrajes de acero inoxidable',
    'aluminio arquitectónico',
    'mamparas de baño',
  ],

  // Palabras clave geográficas
  geographic: [
    'Cancún',
    'Riviera Maya',
    'Playa del Carmen',
    'Tulum',
    'Puerto Morelos',
    'Puerto Aventuras',
    'Mérida',
    'Yucatán',
    'Quintana Roo',
    'Península de Yucatán',
  ],

  // Palabras clave de servicios
  services: [
    'instalación de ventanas',
    'reparación de cancelería',
    'mantenimiento de aluminio',
    'proyectos hoteleros',
    'proyectos residenciales',
    'proyectos comerciales',
    'ventanas anti-huracán',
    'vidrio de seguridad',
  ],

  // Palabras clave long-tail (frases específicas)
  longTail: [
    'cancelería de aluminio para hoteles en Cancún',
    'instalación de ventanas en Riviera Maya',
    'barandales de vidrio templado para balcones',
    'muros cortina para edificios comerciales',
    'ventanas corredizas de aluminio precio',
    'empresa de cancelería en Quintana Roo',
    'proveedor de vidrio y aluminio Yucatán',
    'mantenimiento de ventanas para hoteles',
  ],
};

// Meta tags por página
export const pageMeta = {
  home: {
    title: 'VCG Caribe | Cancelería de Vidrio y Aluminio en Cancún y Riviera Maya',
    description: 'Expertos en cancelería de vidrio y aluminio para hoteles, residencias y comercios. +15 años de experiencia en Cancún, Riviera Maya y Yucatán. Cotiza ahora.',
    keywords: [...keywords.primary, ...keywords.geographic.slice(0, 4)].join(', '),
  },

  servicios: {
    title: 'Servicios de Cancelería | Ventanas, Barandales y Muros Cortina - VCG Caribe',
    description: 'Servicios completos de cancelería: ventanas, puertas, barandales, muros cortina y mantenimiento. Soluciones en vidrio y aluminio para todo tipo de proyectos.',
    keywords: [...keywords.services, ...keywords.secondary.slice(0, 4)].join(', '),
  },

  portafolio: {
    title: 'Portafolio de Proyectos | Hoteles, Residencias y Comercios - VCG Caribe',
    description: 'Explora nuestros proyectos de cancelería en hoteles de lujo, residencias exclusivas y edificios comerciales en Cancún, Riviera Maya y Yucatán.',
    keywords: ['proyectos de cancelería', 'portafolio cancelería', ...keywords.geographic.slice(0, 3)].join(', '),
  },

  nosotros: {
    title: 'Sobre Nosotros | +15 Años de Experiencia en Cancelería - VCG Caribe',
    description: 'Conoce a VCG Caribe: más de 15 años transformando espacios con cancelería de alta calidad. Valor, Confianza y Garantía en cada proyecto.',
    keywords: ['empresa de cancelería', 'VCG Caribe', 'cancelería de calidad', 'experiencia en aluminio'].join(', '),
  },

  contacto: {
    title: 'Contacto | Cotiza tu Proyecto de Cancelería - VCG Caribe',
    description: 'Contáctanos para cotizar tu proyecto de cancelería. Atendemos en Cancún, Riviera Maya y Mérida. Llámanos: 998 234 4274 o envía WhatsApp.',
    keywords: ['cotización cancelería', 'contacto VCG Caribe', ...keywords.geographic.slice(0, 2)].join(', '),
  },
};

// Schema.org para negocio local
export const schemaOrg = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  telephone: siteConfig.contact.phones[0],
  email: siteConfig.contact.emails[0],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Av. Talleres, Región 92',
    addressLocality: 'Cancún',
    addressRegion: 'Quintana Roo',
    postalCode: '77516',
    addressCountry: 'MX',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 21.1619,
    longitude: -86.8515,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '08:00',
      closes: '13:00',
    },
  ],
  priceRange: '$$',
  image: `${siteConfig.url}/images/logo-vcg.png`,
  sameAs: Object.values(siteConfig.social).filter(Boolean),
};

// Open Graph defaults
export const openGraph = {
  type: 'website',
  locale: 'es_MX',
  siteName: siteConfig.name,
  defaultImage: '/images/og-vcg.jpg',
};

// Helper para canonical URL
export function getCanonicalUrl(page: keyof typeof pageMeta): string {
  const slugs: Record<string, string> = {
    home: '',
    servicios: 'servicios',
    portafolio: 'portafolio',
    nosotros: 'nosotros',
    contacto: 'contacto',
  };
  const slug = slugs[page] || '';
  return slug ? `${siteConfig.url}/${slug}` : siteConfig.url;
}

// Helper para generar todas las keywords como string
export function getAllKeywords(): string {
  return [
    ...keywords.primary,
    ...keywords.secondary,
    ...keywords.geographic,
  ].join(', ');
}

// Helper para generar meta tags de una página
export function getPageMeta(page: keyof typeof pageMeta) {
  return pageMeta[page] || pageMeta.home;
}
