import type { Metadata } from 'next'
import InstitucionesHero from './sections/InstitucionesHero'
import AudienceSwitch from './sections/AudienceSwitch'
import CapabilitiesSection from './sections/CapabilitiesSection'
import ProcessTimeline from './sections/ProcessTimeline'
import TrackRecordNote from './sections/TrackRecordNote'
import InstitucionesClosing from './sections/InstitucionesClosing'
import JsonLd from '@/components/seo/JsonLd'
import { serviceLd } from '@/lib/seo'

const DESCRIPTION =
  'Acompañamos a fondos de impacto y agencias de cooperación en bioeconomía: sourcing, due diligence en campo, value building, monitoreo y reporte de impacto.'

export const metadata: Metadata = {
  title: 'Instituciones: fondos y cooperación',
  description: DESCRIPTION,
  keywords: ['due diligence bioeconomía', 'fondos impacto LATAM', 'cooperación internacional bioeconomía', 'investment readiness bionegocios', 'capital de impacto'],
  alternates: { canonical: '/fondos' },
  openGraph: {
    title: 'Instituciones | Redesign Lab',
    description: DESCRIPTION,
    url: 'https://redesignlab.org/fondos',
    siteName: 'Redesign Lab',
    locale: 'es_PE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Instituciones | Redesign Lab',
    description: DESCRIPTION,
    creator: '@redesignlab',
  },
}

const BREADCRUMB = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://redesignlab.org' },
    { '@type': 'ListItem', position: 2, name: 'Instituciones', item: 'https://redesignlab.org/fondos' },
  ],
}

export default function FondosPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB) }} />
      <JsonLd data={serviceLd({ name: 'Acompañamiento en territorio para fondos de impacto y agencias de cooperación', description: DESCRIPTION, audience: 'Fondos de inversión de impacto y agencias de cooperación', path: '/fondos' })} />
      <InstitucionesHero />
      <AudienceSwitch />
      <CapabilitiesSection />
      <ProcessTimeline />
      <TrackRecordNote />
      <InstitucionesClosing />
    </>
  )
}
