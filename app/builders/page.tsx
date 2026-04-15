import type { Metadata } from 'next'
import HeroSection from './sections/HeroSection'
import ParticipationSection from './sections/ParticipationSection'
import ReShareSection from './sections/ReShareSection'
import SpecialtiesSection from './sections/SpecialtiesSection'
import NetworkOffersSection from './sections/NetworkOffersSection'
import InvestmentPathSection from './sections/InvestmentPathSection'
import ApplicationSection from './sections/ApplicationSection'
import CtaSection from './sections/CtaSection'

export const metadata: Metadata = {
  title: 'Builders',
  description:
    'Red de expertos de alto perfil que co-construyen ventures y proyectos de bioeconomía con Redesign Lab. Dos formas de participar: Colaborador y Socio.',
  keywords: ['red de expertos bioeconomía', 'builders LATAM', 'colaboradores Redesign Lab', 'venture co-building'],
  alternates: { canonical: '/builders' },
}

export default function BuildersPage() {
  return (
    <>
      <HeroSection />
      <ParticipationSection />
      <ReShareSection />
      <SpecialtiesSection />
      <NetworkOffersSection />
      <InvestmentPathSection />
      <ApplicationSection />
      <CtaSection />
    </>
  )
}
