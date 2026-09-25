import type { Metadata } from 'next'
import EmpresasHero from './sections/EmpresasHero'
import PartnerSection from './sections/PartnerSection'
import HelpSection from './sections/HelpSection'
import StrengthsSection from './sections/StrengthsSection'
import AISection from './sections/AISection'
import EmpresasClosing from './sections/EmpresasClosing'
import JsonLd from '@/components/seo/JsonLd'
import { serviceLd } from '@/lib/seo'

const DESCRIPTION =
  'Diseñamos, escalamos e invertimos en bionegocios con potencial real en América Latina: estrategia, operaciones, marca, impacto e IA como socios.'

export const metadata: Metadata = {
  title: 'Empresas',
  description: DESCRIPTION,
  alternates: { canonical: '/empresas' },
  openGraph: {
    title: 'Empresas | Redesign Lab',
    description: DESCRIPTION,
    url: 'https://redesignlab.org/empresas',
    siteName: 'Redesign Lab',
    locale: 'es_PE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Empresas | Redesign Lab',
    description: DESCRIPTION,
    creator: '@redesignlab',
  },
}

const BREADCRUMB = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://redesignlab.org' },
    { '@type': 'ListItem', position: 2, name: 'Empresas', item: 'https://redesignlab.org/empresas' },
  ],
}

export default function EmpresasPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB) }} />
      <JsonLd data={serviceLd({ name: 'Venture building y asesoría para bionegocios', description: DESCRIPTION, audience: 'Empresas y bionegocios', path: '/empresas' })} />
      <EmpresasHero />
      <PartnerSection />
      <HelpSection />
      <StrengthsSection />
      <AISection />
      <EmpresasClosing />
    </>
  )
}
