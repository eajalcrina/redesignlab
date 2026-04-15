import type { Metadata } from 'next'
import HeroSection from './sections/HeroSection'
import WhatIsAIStudio from './sections/WhatIsAIStudio'
import ThesisSection from './sections/ThesisSection'
import ApplicationsSection from './sections/ApplicationsSection'
import DimensionsSection from './sections/DimensionsSection'
import DiagnosticSection from './sections/DiagnosticSection'
import IndustryTabsSection from './sections/IndustryTabsSection'
import DifferenceSection from './sections/DifferenceSection'
import ResourcesSection from './sections/ResourcesSection'
import CtaSection from './sections/CtaSection'

export const metadata: Metadata = {
  title: 'Inteligencia Artificial',
  description:
    'Cómo Redesign Lab aplica inteligencia artificial a la bioeconomía. Re.·IA: VER, PENSAR, CONSTRUIR, ESCALAR. Diagnóstico interactivo por industria.',
  keywords: [
    'IA bioeconomía',
    'inteligencia artificial agroindustria',
    'AI transformation LATAM',
    'Re·IA framework',
    'maturity checker IA',
  ],
  alternates: { canonical: '/inteligencia-artificial' },
}

export default function InteligenciaArtificialPage() {
  return (
    <>
      <HeroSection />
      <WhatIsAIStudio />
      <ThesisSection />
      <ApplicationsSection />
      <DimensionsSection />
      <DiagnosticSection />
      <IndustryTabsSection />
      <DifferenceSection />
      <ResourcesSection />
      <CtaSection />
    </>
  )
}
