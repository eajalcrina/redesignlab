import type { Metadata } from 'next'
import HeroSection from './sections/HeroSection'
import ForWhomIntroSection from './sections/ForWhomIntroSection'
import WhatItIsSection from './sections/WhatItIsSection'
import FirstThreeMonthsSection from './sections/FirstThreeMonthsSection'
import RealMonthSection from './sections/RealMonthSection'
import BenefitsSection from './sections/BenefitsSection'
import WhyFifteenSection from './sections/WhyFifteenSection'
import ArchetypesSection from './sections/ArchetypesSection'
import ApplicationProcess from './sections/ApplicationProcess'
import ClosingNoteSection from './sections/ClosingNoteSection'
import CtaSection from './sections/CtaSection'

export const metadata: Metadata = {
  title: 'Re. Intelligence | Redesign Lab — Acompañamiento estratégico continuo para líderes de bioeconomía',
  description:
    'Re. Intelligence es el equipo de estrategia, análisis e inteligencia que tu empresa necesita — sin la estructura que no puedes sostener. Para líderes de empresas medianas en bioeconomía que toman decisiones de alta consecuencia solos.',
  keywords: [
    'acompañamiento estratégico bioeconomía',
    'advisory fundadores LATAM',
    'inteligencia estratégica IA',
    'Re Intelligence',
    'estrategia empresa mediana',
  ],
  alternates: { canonical: '/re-intelligence' },
}

export default function ReIntelligencePage() {
  return (
    <>
      <HeroSection />
      <ForWhomIntroSection />
      <WhatItIsSection />
      <FirstThreeMonthsSection />
      <RealMonthSection />
      <BenefitsSection />
      <WhyFifteenSection />
      <ArchetypesSection />
      <ApplicationProcess />
      <ClosingNoteSection />
      <CtaSection />
    </>
  )
}
