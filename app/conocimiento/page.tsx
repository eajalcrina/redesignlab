import type { Metadata } from 'next'
import HeroSection from './sections/HeroSection'
import ResourcesList from './sections/ResourcesList'
import CtaSection from './sections/CtaSection'

export const metadata: Metadata = {
  title: 'Conocimiento',
  description:
    'Recursos abiertos de Redesign Lab: guías, frameworks, benchmarks y herramientas para líderes de bioeconomía e inteligencia artificial.',
}

export default function ConocimientoPage() {
  return (
    <>
      <HeroSection />
      <ResourcesList />
      <CtaSection />
    </>
  )
}
