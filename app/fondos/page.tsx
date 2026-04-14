import type { Metadata } from 'next'
import HeroSection from './sections/HeroSection'
import ProblemsSection from './sections/ProblemsSection'
import CycleSection from './sections/CycleSection'
import FundServicesSection from './sections/FundServicesSection'
import PortfolioIntelligence from './sections/PortfolioIntelligence'
import WhySection from './sections/WhySection'
import InstrumentsSection from './sections/InstrumentsSection'
import MarqueeSection from './sections/MarqueeSection'
import FondoNote from './sections/FondoNote'
import CtaSection from './sections/CtaSection'

export const metadata: Metadata = {
  title: 'Para Fondos de Inversión',
  description:
    'Redesign Lab reduce el riesgo técnico de inversiones en bioeconomía. Due diligence en campo, BIRF, y Re. Portfolio Intelligence para fondos de impacto en LATAM.',
  keywords: [
    'due diligence bioeconomía',
    'fondos impacto LATAM',
    'investment readiness bionegocios',
  ],
}

export default function FondosPage() {
  return (
    <>
      <HeroSection />
      <ProblemsSection />
      <CycleSection />
      <FundServicesSection />
      <PortfolioIntelligence />
      <WhySection />
      <InstrumentsSection />
      <MarqueeSection />
      <FondoNote />
      <CtaSection />
    </>
  )
}
