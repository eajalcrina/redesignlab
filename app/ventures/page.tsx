import type { Metadata } from 'next'
import { pageMetadata, breadcrumbLd, itemListLd } from '@/lib/seo'
import JsonLd from '@/components/seo/JsonLd'
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
import { ventures, getVentureSlug } from '@/data/ventures'

export const metadata: Metadata = {
  ...pageMetadata({
    title: 'Ventures',
    description:
      'Portafolio de ventures de Redesign Lab en bioeconomía latinoamericana: algodón, fibras amazónicas, biomateriales y clima. +USD 26MM facturación.',
    path: '/ventures',
  }),
  keywords: ['venture studio LATAM', 'portafolio bioeconomía', 'Cotton Nation', 'Neofibers', 'biocomercio amazónico', 'co-fundadores bioeconomía'],
}

export default function VenturesPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([['Bio/Builders', '/biobuilders'], ['Ventures', '/ventures']]),
          itemListLd('Portafolio de ventures de Redesign Lab', ventures.map((x) => ({ name: x.name, path: `/ventures/${getVentureSlug(x)}` }))),
        ]}
      />
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
