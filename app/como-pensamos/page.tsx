import type { Metadata } from 'next'
import HeroSection from './sections/HeroSection'
import ThreeAxes from '../(landing)/sections/ThreeAxes'
import DriversSection from './sections/DriversSection'
import PrinciplesSection from './sections/PrinciplesSection'
import CriteriaSection from './sections/CriteriaSection'
import CtaSection from './sections/CtaSection'

export const metadata: Metadata = {
  title: 'Cómo pensamos',
  description:
    'Nuestra tesis: la bioeconomía necesita un nuevo modelo de consultoría. Uno que combine diseño estratégico, operaciones reales e inteligencia artificial.',
  keywords: ['tesis Redesign Lab', 'principios bioeconomía', 'criterio estratégico', 'manifiesto bioeconomía'],
  alternates: { canonical: '/como-pensamos' },
}

export default function ComoPensamosPage() {
  return (
    <>
      <HeroSection />
      <ThreeAxes />
      <DriversSection />
      <PrinciplesSection />
      <CriteriaSection />
      <CtaSection />
    </>
  )
}
