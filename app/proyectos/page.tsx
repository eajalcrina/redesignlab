import type { Metadata } from 'next'
import HeroSection from './sections/HeroSection'
import FilterableGrid from './sections/FilterableGrid'
import CtaSection from './sections/CtaSection'

export const metadata: Metadata = {
  title: 'Proyectos',
  description:
    'Portafolio de proyectos de consultoría de Redesign Lab en bioeconomía: agroindustria, pesca, acuicultura, cosmética, turismo y biotecnología en América Latina.',
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
