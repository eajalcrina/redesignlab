import type { Metadata } from 'next'
import { pageMetadata, breadcrumbLd } from '@/lib/seo'
import JsonLd from '@/components/seo/JsonLd'
import HeroSection from './sections/HeroSection'
import ResourcesList from './sections/ResourcesList'
import CtaSection from './sections/CtaSection'
import { resources } from '@/data/resources'
import { SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
  ...pageMetadata({
    title: 'Conocimiento',
    description:
      'Recursos abiertos de Redesign Lab: guías, frameworks, benchmarks y herramientas para líderes de bioeconomía e inteligencia artificial.',
    path: '/conocimiento',
  }),
  keywords: ['BIRF framework', 'investment readiness bioeconomía', 'guía due diligence bionegocios', 'recursos bioeconomía LATAM', 'frameworks impacto'],
}

export default function ConocimientoPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([['Conocimiento', '/conocimiento']]),
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Conocimiento — Redesign Lab',
            url: `${SITE_CONFIG.url}/conocimiento`,
            hasPart: resources.map((r) => ({
              '@type': 'DigitalDocument',
              name: r.name,
              description: r.description,
              inLanguage: 'es',
              author: { '@type': 'Organization', name: SITE_CONFIG.name },
              ...(r.available ? { encodingFormat: 'application/pdf', isAccessibleForFree: true } : {}),
            })),
          },
        ]}
      />
      <HeroSection />
      <ResourcesList />
      <CtaSection />
    </>
  )
}
