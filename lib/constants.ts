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
}

export const NAV_LINKS = [
  {
    label: 'Mindset',
    href: '/como-pensamos',
    hasSubmenu: true,
    submenu: [
      { label: 'Cómo pensamos', href: '/como-pensamos' },
      { label: 'Conocimiento', href: '/conocimiento' },
      { label: 'Builders', href: '/builders' },
    ]
  },
  {
    label: 'IA',
    href: '/inteligencia-artificial',
    hasSubmenu: true,
    submenu: [
      { label: 'Inteligencia artificial', href: '/inteligencia-artificial' },
      { label: 'Diagnóstico', href: '/inteligencia-artificial/diagnostico' },
    ]
  },
  {
    label: 'Servicios',
    href: '/crear-valor',
    hasSubmenu: true,
    submenu: [
      { label: 'Crear valor', href: '/crear-valor' },
      { label: 'Rediseñar el trabajo', href: '/redisenar-el-trabajo' },
      { label: 'Transformar el modelo', href: '/transformar-el-modelo' },
      { label: 'Re. Intelligence', href: '/re-intelligence' },
    ]
  },
  { label: 'Fondos', href: '/fondos' },
  { label: 'Proyectos', href: '/proyectos' },
  { label: 'Ventures', href: '/ventures' },
] as const

export const SERVICE_PATHS = [
  { label: 'Crear valor', href: '/crear-valor' },
  { label: 'Rediseñar el trabajo', href: '/redisenar-el-trabajo' },
  { label: 'Transformar el modelo', href: '/transformar-el-modelo' },
] as const

export const FOOTER_LINKS = {
  servicios: {
    titulo: 'Servicios',
    links: [
      { label: 'Crear valor', href: '/crear-valor' },
      { label: 'Rediseñar el trabajo', href: '/redisenar-el-trabajo' },
      { label: 'Transformar el modelo', href: '/transformar-el-modelo' },
      { label: 'Para fondos', href: '/fondos' },
      { label: 'Re. Intelligence', href: '/re-intelligence' },
    ],
  },
  ecosistema: {
    titulo: 'Ecosistema',
    links: [
      { label: 'Ventures', href: '/ventures' },
      { label: 'Builders', href: '/builders' },
      { label: 'Conocimiento', href: '/conocimiento' },
      { label: 'IA para bioeconomía', href: '/inteligencia-artificial' },
      { label: 'Proyectos', href: '/proyectos' },
    ],
  },
  contacto: {
    titulo: 'Contacto',
  },
}

export const NEWSLETTER = {
  headline: 'Mantente informado',
  body: 'Cuando Redesign Lab publica algo nuevo — un recurso, un análisis, una publicación relevante para las industrias en las que trabaja — puedes recibirlo directamente. Sin frecuencia fija. Solo cuando hay algo que vale la pena compartir.',
  placeholder: 'tu@empresa.com',
  cta: 'Suscribirme →',
  success: 'Listo. Solo cuando haya algo que valga la pena.',
  disclaimer: 'Puedes darte de baja en cualquier momento.',
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
