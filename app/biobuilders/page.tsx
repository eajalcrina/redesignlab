import type { Metadata } from 'next'
import HeroSection from './sections/HeroSection'
import ThesisSection from './sections/ThesisSection'
import WhoSection from './sections/WhoSection'
import HowItWorksSection from './sections/HowItWorksSection'
import GoalsSection from './sections/GoalsSection'
import BioBusinessWedge from './sections/BioBusinessWedge'
import BusinessTypesSection from './sections/BusinessTypesSection'
import CtaSection from './sections/CtaSection'

export const metadata: Metadata = {
  title: 'Bio/Builders',
  description:
    'Bio/Builders es la red que conecta a expertos en escalar empresas con bionegocios de América Latina que necesitan activar su potencial para competir en el mercado.',
  keywords: ['Bio/Builders', 'bionegocios', 'desarrolladores de negocio', 'bioeconomía América Latina', 'co-founder bionegocios', 'Redesign Lab'],
  alternates: { canonical: '/biobuilders' },
}

export default function BioBuildersPage() {
  return (
    <>
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
