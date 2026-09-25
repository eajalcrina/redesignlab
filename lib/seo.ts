import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/constants'

const SITE = SITE_CONFIG.url

/** Metadatos de una página: canonical + Open Graph + Twitter con su propio título y descripción.
 *  Las imágenes salen de los archivos opengraph-image/twitter-image de cada carpeta. */
export function pageMetadata({ title, description, path, image }: { title: string; description: string; path: string; image?: string }): Metadata {
  const full = `${title} | ${SITE_CONFIG.name}`
  // páginas sin imagen propia (p. ej. /privacidad) pasan la de la Home
  const images = image ? [{ url: image, width: 1200, height: 630 }] : undefined
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: full, description, url: `${SITE}${path}`, siteName: SITE_CONFIG.name, locale: 'es_PE', type: 'website', ...(images && { images }) },
    twitter: { card: 'summary_large_image', title: full, description, creator: '@redesignlab', ...(images && { images: [image as string] }) },
  }
}

/** BreadcrumbList: siempre empieza en Inicio. */
export function breadcrumbLd(items: [name: string, path: string][]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [['Inicio', ''] as [string, string], ...items].map(([name, path], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: `${SITE}${path}`,
    })),
  }
}

/** ItemList de URLs internas (portafolios, recursos). */
export function itemListLd(name: string, items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, url: `${SITE}${it.path}` })),
  }
}

/** Servicio ofrecido por Redesign Lab a una audiencia. */
export function serviceLd({ name, description, audience, path }: { name: string; description: string; audience: string; path: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: `${SITE}${path}`,
    areaServed: { '@type': 'Place', name: 'América Latina' },
    audience: { '@type': 'Audience', audienceType: audience },
    provider: { '@type': 'Organization', name: SITE_CONFIG.name, url: SITE },
  }
}
