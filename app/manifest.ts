import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Redesign Lab — The AI Studio for Bioeconomy Industries',
    short_name: 'Redesign Lab',
    description:
      'El primer AI Studio de América Latina dedicado a transformar industrias cuya ventaja competitiva depende de regenerar los sistemas naturales.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0D0D0D',
    theme_color: '#0D0D0D',
    lang: 'es',
    icons: [
      { src: '/icon.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png', purpose: 'any' },
    ],
  }
}
