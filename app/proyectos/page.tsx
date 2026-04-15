import type { Metadata } from 'next'
import HeroSection from './sections/HeroSection'
import FilterableGrid from './sections/FilterableGrid'
import CtaSection from './sections/CtaSection'

export const metadata: Metadata = {
  title: 'Proyectos',
  description:
    'Portafolio de proyectos de consultoría de Redesign Lab en bioeconomía: agroindustria, pesca, acuicultura, cosmética, turismo y biotecnología en América Latina.',
  keywords: ['casos consultoría bioeconomía', 'proyectos LATAM', 'agroindustria pesca acuicultura', 'biocomercio amazónico', 'climate tech LATAM'],
  alternates: { canonical: '/proyectos' },
}

export default function ProyectosPage() {
  return (
    <>
      <HeroSection />
      <FilterableGrid />
      <CtaSection />
    </>
  )
}
