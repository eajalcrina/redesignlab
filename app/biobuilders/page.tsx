import type { Metadata } from 'next'
import { pageMetadata, breadcrumbLd } from '@/lib/seo'
import JsonLd from '@/components/seo/JsonLd'
import HeroSection from './sections/HeroSection'
import ThesisSection from './sections/ThesisSection'
import WhoSection from './sections/WhoSection'
import HowItWorksSection from './sections/HowItWorksSection'
import GoalsSection from './sections/GoalsSection'
import BioBusinessWedge from './sections/BioBusinessWedge'
import BusinessTypesSection from './sections/BusinessTypesSection'
import CtaSection from './sections/CtaSection'

export const metadata: Metadata = {
  ...pageMetadata({
    title: 'Bio/Builders',
    description:
      'Bio/Builders es la red que conecta a expertos en escalar empresas con bionegocios de América Latina que necesitan activar su potencial para competir en el mercado.',
    path: '/biobuilders',
  }),
  keywords: ['Bio/Builders', 'bionegocios', 'desarrolladores de negocio', 'bioeconomía América Latina', 'co-founder bionegocios', 'Redesign Lab'],
}

export default function BioBuildersPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([['Bio/Builders', '/biobuilders']])} />
      <HeroSection />
      <ThesisSection />
      <WhoSection />
      <HowItWorksSection />
      <GoalsSection />
      <BioBusinessWedge />
      <BusinessTypesSection />
      <CtaSection />
    </>
  )
}
