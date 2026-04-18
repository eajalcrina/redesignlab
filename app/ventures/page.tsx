import type { Metadata } from 'next'
import HeroSection from './sections/HeroSection'
import RiskSection from './sections/RiskSection'
import PurposeSection from './sections/PurposeSection'
import PillarsSection from './sections/PillarsSection'
import RouteSection from './sections/RouteSection'
import StrategySection from './sections/StrategySection'
import MetricsSection from './sections/MetricsSection'
import PortfolioSection from './sections/PortfolioSection'
import AlliesSection from './sections/AlliesSection'
import ConnectSection from './sections/ConnectSection'

export const metadata: Metadata = {
  title: 'Ventures',
  description:
    'Portafolio de ventures de Redesign Lab en bioeconomía latinoamericana: algodón, fibras amazónicas, biomateriales y clima. +USD 26MM facturación.',
  keywords: ['venture studio LATAM', 'portafolio bioeconomía', 'Cotton Nation', 'Neofibers', 'biocomercio amazónico', 'co-fundadores bioeconomía'],
  alternates: { canonical: '/ventures' },
}

export default function VenturesPage() {
  return (
    <>
      <HeroSection />
      <RiskSection />
      <PurposeSection />
      <PillarsSection />
      <RouteSection />
      <StrategySection />
      <MetricsSection />
      <PortfolioSection />
      <AlliesSection />
      <ConnectSection />
    </>
  )
}
