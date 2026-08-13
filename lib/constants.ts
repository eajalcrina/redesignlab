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
export const bbsWhatsappUrl = (programTitle: string) =>
  `https://wa.me/${BBS_WHATSAPP_NUMBER}?text=${encodeURIComponent(`Quiero inscribirme al programa ${programTitle}`)}`

// WhatsApp directo del equipo, para CTAs de Servicios (mismo número que SITE_CONFIG.phone).
export const WHATSAPP_NUMBER = '51989338401'
export const whatsappUrl = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

export const NAV_LINKS = [
  {
    label: 'Mindset',
    href: '/como-pensamos',
    hasSubmenu: true,
    submenu: [
      { label: 'Cómo pensamos', href: '/como-pensamos' },
      { label: 'Conocimiento', href: '/conocimiento' },
      { label: 'Builders', href: '/builders' },
      { label: 'Cursos BBS', href: '/cursos-bbs' },
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
    href: '/acelera',
    hasSubmenu: true,
    submenu: [
      { label: 'ACELERA', href: '/acelera' },
      { label: 'Pon Orden', href: '/pon-orden' },
      { label: 'Consigue Capital', href: '/consigue-capital' },
      { label: 'Vende más', href: '/vende-mas' },
    ]
  },
  { label: 'Fondos', href: '/fondos' },
  { label: 'Proyectos', href: '/proyectos' },
  { label: 'Ventures', href: '/ventures' },
] as const

export const SERVICE_PATHS = [
  { label: 'ACELERA', href: '/acelera' },
  { label: 'Pon Orden', href: '/pon-orden' },
  { label: 'Consigue Capital', href: '/consigue-capital' },
  { label: 'Vende más', href: '/vende-mas' },
] as const

export const FOOTER_LINKS = {
  servicios: {
    titulo: 'Servicios',
    links: [
      { label: 'ACELERA', href: '/acelera' },
      { label: 'Pon Orden', href: '/pon-orden' },
      { label: 'Consigue Capital', href: '/consigue-capital' },
      { label: 'Vende más', href: '/vende-mas' },
      { label: 'Para fondos', href: '/fondos' },
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
