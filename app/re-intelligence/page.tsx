import type { Metadata } from 'next'
import HeroSection from './sections/HeroSection'
import WhatItIsSection from './sections/WhatItIsSection'
import BenefitsSection from './sections/BenefitsSection'
import RealMonthSection from './sections/RealMonthSection'
import ArchetypesSection from './sections/ArchetypesSection'
import WhyFifteenSection from './sections/WhyFifteenSection'
import ApplicationProcess from './sections/ApplicationProcess'
import CtaSection from './sections/CtaSection'

export const metadata: Metadata = {
  title: 'Re. Intelligence',
  description:
    'Inteligencia estratégica para líderes de bioeconomía. USD 3,000/mes. Máximo 15 miembros. Briefings, modelos de IA, red de decisores y advisory 1:1.',
}

export default function ReIntelligencePage() {
  return (
    <>
      <HeroSection />
      <WhatItIsSection />
      <BenefitsSection />
      <RealMonthSection />
      <ArchetypesSection />
      <WhyFifteenSection />
      <ApplicationProcess />
      <CtaSection />
    </>
  )
}
