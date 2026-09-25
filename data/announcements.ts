import type { Announcement } from '@/lib/announcements'
import { BIOBUILDERS_FORM_URL } from '@/lib/constants'

// Una campaña a la vez: se muestra la primera vigente. Para rotar, agregar otra
// arriba con sus fechas. `end` es exclusivo: ajustarlo al cierre real de la convocatoria.
export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'biobuilders-2026',
    kicker: 'Convocatoria abierta',
    title: 'Súmate a la red de Bio/Builders 2026.',
    handleLabel: 'Bio/Builders 2026',
    primary: { label: 'Postula aquí ↗', href: BIOBUILDERS_FORM_URL, external: true },
    secondary: { label: 'Descubre más →', href: '/biobuilders' },
    start: '2026-09-01',
    end: '2027-01-01',
    excludePaths: ['/biobuilders'],
  },
]
