/**
 * Fuente única de datos del portafolio de proyectos VCG Caribe.
 *
 * Cada proyecto vive en `public/images/projects/<slug>/`: la portada es
 * siempre `cover.jpg` (no se declara en `images`) y las fotos de galería
 * son `01.jpg`, `02.jpg`, ... según cuántas haya generado el pipeline de
 * Task 3 para ese proyecto (no todos tienen la misma cantidad).
 *
 * Las descripciones y specs provienen de la revisión visual de las fotos
 * originales hecha en Task 3 (ver `.superpowers/sdd/2026-08-14-portafolio-
 * congruencia-galeria/seleccion-{A,B,C,D}.md`): no son afirmaciones
 * genéricas, corresponden a lo que las fotos de cada proyecto muestran.
 */

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
  {
    slug: 'paravian',
    title: 'Paravian Torre A y B',
    category: 'Residencial',
    location: 'Playa del Carmen, Q. Roo',
    year: '2025',
    description:
      'Torres de departamentos residenciales con fachada de balcones apilados protegidos por barandales de vidrio templado sobre estructura de concreto y piedra. En circulaciones y accesos se usan celosías de aluminio con acabado símil madera que filtran la luz, y al interior, puertas corredizas de aluminio con vidrio de piso a techo y marco negro comunican los pasillos con las áreas exteriores.',
    specs: ['Barandal vidrio templado', 'Louvers aluminio símil madera', 'Puerta corrediza piso-techo', 'Perfil aluminio negro'],
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
  {
    slug: 'cielo-maya',
    title: 'Cielo Maya',
    category: 'Residencial',
    location: 'Puerto Aventuras, Q. Roo',
    year: '2025',
    description:
      'Complejo residencial con fachada de balcones apilados protegidos por barandales de vidrio templado y ventanería de aluminio en perfil negro en todos los niveles. El proyecto suma puertas corredizas de piso a techo con vista al mar, un barandal curvo de vidrio en escalera y cancelería de baño en vidrio templado sin marco (frameless).',
    specs: ['Barandal vidrio templado', 'Perfil aluminio negro', 'Puerta corrediza panorámica', 'Cancel de baño frameless'],
    size: 'wide',
    images: [
      '/images/projects/cielo-maya/01.jpg',
      '/images/projects/cielo-maya/02.jpg',
      '/images/projects/cielo-maya/03.jpg',
      '/images/projects/cielo-maya/04.jpg',
      '/images/projects/cielo-maya/05.jpg',
      '/images/projects/cielo-maya/06.jpg',
    ],
  },
  {
    slug: 'las-olas-71',
    title: 'Las Olas 71',
    category: 'Residencial',
    location: 'Riviera Maya, Q. Roo',
    year: '2025',
    description:
      'Casa residencial de arquitectura angular con extensa cancelería de aluminio en perfil negro: ventanales fijos de piso a techo —incluidas piezas de geometría trapezoidal que siguen los muros inclinados de la fachada— y puertas corredizas multipanel que conectan el interior con la alberca y el jardín. Se complementa con un barandal de escalera en vidrio templado sin marco con herrajes tipo araña, y vidrio esmerilado en el cancel de baño.',
    specs: ['Perfil aluminio negro', 'Ventanas geometría angular', 'Puerta corrediza multipanel', 'Barandal vidrio frameless'],
    size: 'tall',
    images: [
      '/images/projects/las-olas-71/01.jpg',
      '/images/projects/las-olas-71/02.jpg',
      '/images/projects/las-olas-71/03.jpg',
      '/images/projects/las-olas-71/04.jpg',
      '/images/projects/las-olas-71/05.jpg',
      '/images/projects/las-olas-71/06.jpg',
    ],
  },
  {
    slug: 'marina-yucalpeten',
    title: 'Marina Yucalpetén · Torre Bonanza',
    category: 'Residencial',
    location: 'Progreso, Yucatán',
    year: '2026',
    description:
      'Torre residencial en etapa de obra donde ya se aprecia instalado el sistema de barandales de vidrio templado con tinte azul en el borde de cada balcón, a lo largo de toda la fachada. En planta baja ya están colocados los ventanales de aluminio de gran formato; los paneles de fachada superiores aún conservan película de protección plástica propia de la etapa de instalación.',
    specs: ['Vidrio templado', 'Tinte azul', 'Ventanal gran formato', 'Balcón perimetral'],
    size: 'normal',
    status: 'En ejecución',
    images: [
      '/images/projects/marina-yucalpeten/01.jpg',
      '/images/projects/marina-yucalpeten/02.jpg',
      '/images/projects/marina-yucalpeten/03.jpg',
      '/images/projects/marina-yucalpeten/04.jpg',
      '/images/projects/marina-yucalpeten/05.jpg',
      '/images/projects/marina-yucalpeten/06.jpg',
    ],
  },
  {
    slug: 'lote-165',
    title: 'Lote 165',
    category: 'Residencial',
    location: 'Puerto Cancún, Q. Roo',
    year: '2025',
    description:
      'Residencia con azoteas y terrazas protegidas por barandales de vidrio templado sobre postes de acero inoxidable, con vista a la marina. La casa integra una escalera interior curva con pasamanos de acero y panel de vidrio, celosías de aluminio tipo louver en un volumen de fachada, y una pérgola con lamas de aluminio sostenida por una aleta estructural de vidrio templado.',
    specs: ['Barandal vidrio + acero inox', 'Louvers aluminio', 'Aleta vidrio estructural', 'Escalera vidrio y acero'],
    size: 'normal',
    images: [
      '/images/projects/lote-165/01.jpg',
      '/images/projects/lote-165/02.jpg',
      '/images/projects/lote-165/03.jpg',
      '/images/projects/lote-165/04.jpg',
      '/images/projects/lote-165/05.jpg',
      '/images/projects/lote-165/06.jpg',
    ],
  },
  {
    slug: 'lote-266',
    title: 'Lote 266',
    category: 'Residencial',
    location: 'Puerto Cancún, Q. Roo',
    year: '2025',
    description:
      'Residencia junto a un canal navegable, con terrazas en voladizo que usan barandales de vidrio templado sin remate superior fijados con perfil metálico inferior, combinados con celosías de lamas de madera vertical en la fachada. Las ventanas son de aluminio con vidrio fijo integradas a los muros de concreto y madera; en interiores, los baños incorporan mamparas de vidrio templado con perfil de aluminio oscuro para las regaderas.',
    specs: ['Barandal sin remate', 'Celosía de madera', 'Aluminio oscuro', 'Mampara de baño'],
    size: 'normal',
    images: [
      '/images/projects/lote-266/01.jpg',
      '/images/projects/lote-266/02.jpg',
      '/images/projects/lote-266/03.jpg',
      '/images/projects/lote-266/04.jpg',
      '/images/projects/lote-266/05.jpg',
      '/images/projects/lote-266/06.jpg',
    ],
  },
  {
    slug: 'casa-chelem',
    title: 'Casa Chelem',
    category: 'Residencial',
    location: 'Chelem, Yucatán',
    year: '2025',
    description:
      'Residencia frente a playa cuyo elemento central es un muro corredizo de vidrio de piso a techo con marco de aluminio en tono oscuro, que abre la sala por completo hacia una terraza con vista al mar. Un pasillo interior techado usa un muro cortina de vidrio con tragaluz cenital y marco tono madera/bronce, y las recámaras se resuelven con ventanas abatibles de aluminio con vidrio. El baño principal incorpora una mampara de vidrio templado con bisagra para la regadera.',
    specs: ['Muro corredizo vidrio', 'Aluminio tono bronce', 'Ventana abatible', 'Mampara con bisagra'],
    size: 'normal',
    images: [
      '/images/projects/casa-chelem/01.jpg',
      '/images/projects/casa-chelem/02.jpg',
      '/images/projects/casa-chelem/03.jpg',
      '/images/projects/casa-chelem/04.jpg',
      '/images/projects/casa-chelem/05.jpg',
      '/images/projects/casa-chelem/06.jpg',
    ],
  },
  {
    slug: 'casa-tecatito',
    title: 'Casa Tecatito',
    category: 'Residencial',
    location: 'Sureste de México',
    year: '2022',
    description:
      'Residencia que combina un muro corredizo panorámico de vidrio templado con marco de aluminio en tono bronce, que abre la sala hacia una terraza cubierta, con una escalera interior resuelta con barandal de vidrio templado sin remate superior (frameless) anclado al canto de los escalones. Se aprecian también rieles empotrados en piso de piedra para las puertas corredizas y un muro cortina interior con marco oscuro que separa un salón de juegos de la caja de escalera.',
    specs: ['Corrediza panorámica', 'Barandal frameless', 'Aluminio tono bronce', 'Riel empotrado'],
    size: 'normal',
    images: [
      '/images/projects/casa-tecatito/01.jpg',
      '/images/projects/casa-tecatito/02.jpg',
      '/images/projects/casa-tecatito/03.jpg',
      '/images/projects/casa-tecatito/04.jpg',
      '/images/projects/casa-tecatito/05.jpg',
      '/images/projects/casa-tecatito/06.jpg',
    ],
  },
  {
    slug: 'villa-magna',
    title: 'Villa Magna',
    category: 'Residencial',
    location: 'Ciudad de México',
    year: '2020',
    description:
      'Residencia de dos niveles con alberca donde predomina el vidrio templado en paños fijos y corredizos con marco de aluminio en tono negro, que conectan el interior con el jardín y la alberca. Los balcones usan barandales de vidrio templado sin remate superior sobre postes de acero inoxidable, y destaca una ventana estructural de vidrio en un muro interior que deja ver el agua de la alberca desde dentro de la casa. En baños se combinan puertas de ducha de vidrio templado con acabados en mármol y madera.',
    specs: ['Vidrio templado', 'Poste inoxidable', 'Aluminio negro', 'Corrediza panorámica'],
    size: 'wide',
    images: [
      '/images/projects/villa-magna/01.jpg',
      '/images/projects/villa-magna/02.jpg',
      '/images/projects/villa-magna/03.jpg',
      '/images/projects/villa-magna/04.jpg',
      '/images/projects/villa-magna/05.jpg',
      '/images/projects/villa-magna/06.jpg',
    ],
  },
  {
    slug: 'hotel-calixta',
    title: 'Hotel Calixta',
    category: 'Hotelero',
    location: 'Playa del Carmen, Q. Roo',
    year: '2019',
    description:
      'Hotel boutique de cuatro niveles con fachada dominada por ventanería fija de aluminio en perfil negro y barandales de vidrio templado en cada balcón. En la azotea se combina un muro de vidrio estructural con herrajes tipo araña en el acceso con un sistema de puertas corredizas de aluminio de gran formato que abre el lounge hacia la alberca, además de barandal de vidrio sin marco en la terraza con vista al mar.',
    specs: ['Aluminio negro', 'Vidrio estructural', 'Barandal sin marco', 'Corrediza gran formato'],
    size: 'tall',
    images: [
      '/images/projects/hotel-calixta/01.jpg',
      '/images/projects/hotel-calixta/02.jpg',
      '/images/projects/hotel-calixta/03.jpg',
      '/images/projects/hotel-calixta/04.jpg',
      '/images/projects/hotel-calixta/05.jpg',
      '/images/projects/hotel-calixta/06.jpg',
    ],
  },
  {
    slug: 'now-jade',
    title: 'Now Jade Resort',
    category: 'Hotelero',
    location: 'Puerto Morelos, Q. Roo',
    year: '2020',
    description:
      'Complejo hotelero con dos sistemas de cancelería distintos: barandales horizontales de aluminio con acabado madera oscura y diseño de listones estilo asiático en puentes y pasillos sobre espejos de agua, y pérgolas de aluminio con vigas en acabado vino que cubren las terrazas de los restaurantes, combinadas con muros de lamas horizontales y mamparas corredizas de vidrio y aluminio gris.',
    specs: ['Estilo asiático', 'Acabado madera', 'Pérgola de aluminio', 'Mampara corrediza'],
    size: 'normal',
    images: [
      '/images/projects/now-jade/01.jpg',
      '/images/projects/now-jade/02.jpg',
      '/images/projects/now-jade/03.jpg',
      '/images/projects/now-jade/04.jpg',
      '/images/projects/now-jade/05.jpg',
      '/images/projects/now-jade/06.jpg',
    ],
  },
  {
    slug: 'hotel-marque',
    title: 'Hotel Marque',
    category: 'Hotelero',
    location: 'Playa del Carmen, Q. Roo',
    year: '2019',
    description:
      'Hotel de varios niveles con fachada de volúmenes de balcón escalonados y recubrimiento de madera, resuelta con ventanería fija de aluminio en perfil negro y barandales de vidrio templado en cada balcón. En planta baja, los locales comerciales usan el mismo lenguaje de ventanería negra de gran formato con cristal oscuro.',
    specs: ['Aluminio negro', 'Vidrio templado', 'Balcón en voladizo', 'Fachada de madera'],
    size: 'wide',
    images: [
      '/images/projects/hotel-marque/01.jpg',
      '/images/projects/hotel-marque/02.jpg',
      '/images/projects/hotel-marque/03.jpg',
      '/images/projects/hotel-marque/04.jpg',
      '/images/projects/hotel-marque/05.jpg',
      '/images/projects/hotel-marque/06.jpg',
    ],
  },
  {
    slug: 'royal-1',
    title: 'Royal 1',
    category: 'Hotelero',
    location: 'Riviera Maya, Q. Roo',
    year: '2023',
    description:
      'Proyecto hotelero centrado en herrería y cancelería interior de circulaciones: pasamanos de acero inoxidable y de tubular pintado en escaleras y pasillos, barandales de vidrio templado con perfilería de aluminio en descansillos, y ventanería de aluminio de piso a techo en corredores. Se complementa con una mampara de cristal con herraje de control de acceso en un punto de paso.',
    specs: ['Barandal inox', 'Vidrio templado', 'Ventanería aluminio', 'Circulaciones'],
    size: 'normal',
    images: [
      '/images/projects/royal-1/01.jpg',
      '/images/projects/royal-1/02.jpg',
      '/images/projects/royal-1/03.jpg',
      '/images/projects/royal-1/04.jpg',
      '/images/projects/royal-1/05.jpg',
      '/images/projects/royal-1/06.jpg',
    ],
  },
  {
    slug: 'burger-king',
    title: 'Burger King',
    category: 'Comercial',
    location: 'Cancún, Q. Roo',
    year: '2022',
    description:
      'Fachada comercial resuelta con muro cortina curvo de vidrio y perfilería de aluminio negro, que envuelve la esquina del local sobre un zócalo de tabique aparente. Incluye paneles de vidrio serigrafiado con gráficos de marca y vidriera interior de piso a techo que conecta el comedor con el área de juegos exterior.',
    specs: ['Muro cortina curvo', 'Aluminio negro', 'Vidrio serigrafiado', 'Fachada comercial'],
    size: 'normal',
    images: [
      '/images/projects/burger-king/01.jpg',
      '/images/projects/burger-king/02.jpg',
      '/images/projects/burger-king/03.jpg',
      '/images/projects/burger-king/04.jpg',
      '/images/projects/burger-king/05.jpg',
      '/images/projects/burger-king/06.jpg',
    ],
  },
  {
    slug: 'bodegas-america',
    title: 'Bodegas América',
    category: 'Comercial',
    location: 'Cancún, Q. Roo',
    year: '2021',
    description:
      'El antes y después documenta la transformación de una estructura metálica en obra negra a la fachada terminada: un muro cortina de vidrio con retícula de aluminio en la cara frontal, combinado con ventanas de aluminio individuales en la fachada lateral y remates de concreto pintado. La esquina acristalada es el elemento distintivo del edificio ya terminado.',
    specs: ['Antes y después', 'Muro cortina', 'Vidrio verde/gris', 'Ventanas aluminio'],
    size: 'normal',
    images: [
      '/images/projects/bodegas-america/01.jpg',
      '/images/projects/bodegas-america/02.jpg',
    ],
  },
  {
    slug: 'iglesia-santa-maria',
    title: 'Iglesia Santa María de Guadalupe',
    category: 'Institucional',
    location: 'Cancún, Q. Roo',
    year: '2022',
    description:
      'Proyecto institucional religioso con cancelería de vidrio templado en el acceso principal, con puertas sin marco tipo mampara, y una serie de vitrales artísticos de vidrio de color montados en perfilería metálica que recorren la nave y las capillas laterales. El conjunto se remata con un paño de vidrio en la base de la torre-campanario exterior.',
    specs: ['Vitrales artísticos', 'Puertas sin marco', 'Vidrio templado', 'Institucional religioso'],
    size: 'tall',
    images: [
      '/images/projects/iglesia-santa-maria/01.jpg',
      '/images/projects/iglesia-santa-maria/02.jpg',
      '/images/projects/iglesia-santa-maria/03.jpg',
      '/images/projects/iglesia-santa-maria/04.jpg',
      '/images/projects/iglesia-santa-maria/05.jpg',
      '/images/projects/iglesia-santa-maria/06.jpg',
      '/images/projects/iglesia-santa-maria/07.jpg',
    ],
  },
  {
    slug: 'centro-negocios-anahuac',
    title: 'Centro de Negocios Anáhuac',
    category: 'Institucional',
    location: 'Cancún, Q. Roo',
    year: '2019',
    description:
      'Edificio de oficinas institucional con fachada de bandas de ventanería en vidrio verde/gris y perfilería de aluminio, reforzada con quiebrasoles de aluminio en las esquinas superiores. Al interior, las oficinas se dividen con mamparas de cristal templado con vinil serigrafiado y acentos de aluminio color naranja, y los accesos a nivel de calle combinan puertas de cristal con barandales de acero inoxidable en rampas.',
    specs: ['Fachada acristalada', 'Mamparas oficina', 'Quiebrasoles aluminio', 'Institucional'],
    size: 'wide',
    images: [
      '/images/projects/centro-negocios-anahuac/01.jpg',
      '/images/projects/centro-negocios-anahuac/02.jpg',
      '/images/projects/centro-negocios-anahuac/03.jpg',
      '/images/projects/centro-negocios-anahuac/04.jpg',
      '/images/projects/centro-negocios-anahuac/05.jpg',
      '/images/projects/centro-negocios-anahuac/06.jpg',
    ],
  },
];
