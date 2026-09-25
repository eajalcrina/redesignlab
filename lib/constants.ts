export const SITE_CONFIG = {
  name: 'Redesign Lab',
  tagline: 'The AI Studio for Bioeconomy Industries',
  taglineEs: 'Negocios que funcionan. En industrias que importan.',
  url: 'https://redesignlab.org',
  email: 'eddie@redesignlab.org',
  emailFrom: 'hola@redesignlab.org',
  phone: '+51 989 338 401',
  address: 'Av. Roosevelt 5957, Miraflores',
  city: 'Lima — Perú',
  copyright: '© 2026 Redesign Ventures SAC',
  calendarUrl: 'https://calendar.app.google/C8nGhVz5m6SAR61r5',
  calendarUrlFit: 'https://calendar.app.google/8w3Q2gRY87vVBtMCA',
}

// Placeholder del Google Form de inscripción BBS (reemplazar cuando esté disponible).
export const BBS_FORM_URL = '#'

export const BBS_WHATSAPP_NUMBER = '51989338401'
export const BIOBUILDERS_FORM_URL = 'https://forms.gle/V4DgjHSDM589hJ1W9'
export const BIOBUILDERS_WHATSAPP_URL = `https://wa.me/${BBS_WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola, soy un bionegocio')}`
export const BIOBUILDERS_BOOKING_URL = 'https://calendar.app.google/j4bJRNs2ZhHvuXqP6'

export const bbsWhatsappUrl = (programTitle: string) =>
  `https://wa.me/${BBS_WHATSAPP_NUMBER}?text=${encodeURIComponent(`Quiero inscribirme al programa ${programTitle}`)}`

// WhatsApp directo del equipo, para CTAs de Servicios (mismo número que SITE_CONFIG.phone).
export const WHATSAPP_NUMBER = '51989338401'
export const whatsappUrl = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

export const NAV_LINKS = [
  { label: 'Empresas', href: '/empresas' },
  {
    label: 'Bio/Builders',
    href: '/biobuilders',
    hasSubmenu: true,
    submenu: [
      { label: 'Bio/Builders', href: '/biobuilders' },
      { label: 'Ventures', href: '/ventures' },
    ],
  },
  // La URL se mantiene en /fondos por SEO; en el menú se llama Instituciones.
  { label: 'Instituciones', href: '/fondos' },
  { label: 'Proyectos', href: '/proyectos' },
  { label: 'Conocimiento', href: '/conocimiento' },
] as const

// Páginas vivas y en el sitemap, pero sin enlaces internos (ver spec §2.2).
export const HIDDEN_PATHS = [
  '/acelera',
  '/pon-orden',
  '/consigue-capital',
  '/vende-mas',
  '/crear-valor',
  '/transformar-el-modelo',
  '/como-pensamos',
  '/inteligencia-artificial/diagnostico',
] as const

// Rutas cuyo código se conserva, pero que next.config.mjs redirige.
export const REDIRECTED_PATHS = ['/inteligencia-artificial', '/cursos-bbs'] as const

export const SERVICE_PATHS = [
  { label: 'ACELERA', href: '/acelera' },
  { label: 'Pon Orden', href: '/pon-orden' },
  { label: 'Consigue Capital', href: '/consigue-capital' },
  { label: 'Vende más', href: '/vende-mas' },
] as const

export const FOOTER_LINKS = {
  audiencias: {
    titulo: 'Trabaja con nosotros',
    links: [
      { label: 'Empresas', href: '/empresas' },
      { label: 'Bio/Builders', href: '/biobuilders' },
      { label: 'Instituciones', href: '/fondos' },
    ],
  },
  portafolio: {
    titulo: 'Portafolio',
    links: [
      { label: 'Proyectos', href: '/proyectos' },
      { label: 'Ventures', href: '/ventures' },
      { label: 'Conocimiento', href: '/conocimiento' },
    ],
  },
  contacto: {
    titulo: 'Contacto',
  },
}

export const NEWSLETTER = {
  headline: 'Mantente informado',
  body: 'Cuando Redesign Lab publica algo nuevo — un recurso, un análisis, una publicación relevante para las industrias en las que trabaja — puedes recibirlo directamente. Sin frecuencia fija. Solo cuando hay algo que vale la pena compartir.',
  cta: 'Suscribirme →',
  disclaimer: 'Puedes darte de baja en cualquier momento.',
  subscribeUrl: 'https://campaigns.redesignlab.org/subscription/form?l=5cd15323-897f-4e0a-b4a7-876d608bfa07',
}

export const ALLIES_LABEL = 'Hemos colaborado con'

export const ALLIES = {
  row1: [
    'IDB', 'IDB Lab', 'IDB Invest', 'Wyss Academy for Nature', 'WWF',
    'NESsT', 'Beneficial Returns', 'Conservation International', 'CI Ventures',
    'Textile Exchange', 'Fibral Material Alliance', 'The Sustainable Angle',
    'GIZ', 'Singularity University', 'CleantechHUB', 'C Minds', 'CATAL1.5T', 'GRIDX',
  ],
  row2: [
    'FIT State University of New York', 'ImpactAlpha', 'elea', 'IMD',
    'UAL University of the Arts London', 'Tecnológico de Monterrey', 'MIT',
    'PromPerú', 'ProInnóvate', 'Agromercado',
    'Ministerio del Ambiente Perú', 'Ministerio de la Producción',
    'SNI', 'ADEX', 'ECOAGE', 'Unión Europea', 'Green Climate Fund',
  ],
}

export const ALLIES_FLAT = [...ALLIES.row1, ...ALLIES.row2]

export interface Division {
  theme: string
  brand: string
  description: string
  /** null = sin enlace (sitio caído o división aún sin web) */
  href: string | null
  domain: string | null
  image: string | null
}

export const DIVISIONS: Division[] = [
  {
    theme: 'Acceso a capital de impacto',
    brand: 'Fondo de Impacto',
    description: 'Estudio especializado en facilitar el acceso a capital de impacto y canalizar inversión privada hacia empresas de alto potencial.',
    href: 'https://fondodeimpacto.pe',
    domain: 'fondodeimpacto.pe',
    image: '/assets/hero/hero-17.jpg',
  },
  {
    theme: 'Marcas regenerativas',
    brand: 'ThousandFold',
    description: 'Estudio de branding que construye la identidad y narrativa de marcas con propósito verificable.',
    href: 'https://www.thousandfold.la',
    domain: 'thousandfold.la',
    image: '/assets/ventures/thousandfold.jpg',
  },
  {
    theme: 'Bioeconomía',
    brand: 'Bio Business School',
    description: 'Concentra nuestro conocimiento trabajando con bionegocios en los territorios y lo convierte en consultoría y formación especializada.',
    href: 'https://biobusinessschool.org',
    domain: 'biobusinessschool.org',
    image: '/assets/ventures/bio-business-school.jpg',
  },
  {
    theme: 'Negocios regenerativos',
    brand: 'Regenerative Platform Latam',
    description: 'Plataforma que promueve negocios regenerativos en toda América Latina.',
    href: 'https://regenerativelatam.org',
    domain: 'regenerativelatam.org',
    image: '/assets/hero/hero-07.jpg',
  },
  {
    theme: 'Economía circular',
    brand: 'Circular Club',
    description: 'Comunidad de expertos que diseñan soluciones para la transición circular.',
    // circularclub.la no responde por HTTPS (2026-09-24). Poner 'https://circularclub.la' cuando se arregle.
    href: null,
    domain: 'circularclub.la',
    image: '/assets/hero/hero-08.jpg',
  },
  {
    theme: 'Inteligencia artificial',
    brand: 'IA para Empresas · nueva división',
    description: 'Integramos inteligencia artificial en la operación de empresas de toda América Latina, no solo de bioeconomía.',
    href: null,
    domain: null,
    image: null,
  },
]
