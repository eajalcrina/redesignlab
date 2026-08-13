import type { Metadata } from 'next'
import CollapsibleSection from '@/components/sections/CollapsibleSection'
import HeroSection from './sections/HeroSection'
import ProblemSection from './sections/ProblemSection'
import ArchetypesSection from './sections/ArchetypesSection'
import QuienesSomosSection from './sections/QuienesSomosSection'
import FourVerticalsSection from './sections/FourVerticalsSection'
import ProProcessSection from './sections/ProProcessSection'
import RelatedServicesLinks from './sections/RelatedServicesLinks'
import IntegracionIASection from './sections/IntegracionIASection'
import CtaSection from './sections/CtaSection'

export const metadata: Metadata = {
  title: 'ACELERA',
  description:
    'Un equipo de gerentes externos con más de 15 años de experiencia, para empresas en crecimiento que necesitan pensar su estrategia sin armar un equipo interno.',
  keywords: [
    'acompañamiento estratégico Perú',
    'gerentes externos empresa en crecimiento',
    'advisory fundadores Perú',
    'estrategia empresa mediana',
  ],
  alternates: { canonical: '/acelera' },
}

export default function AceleraPage() {
  return (
    <>
      <HeroSection />
      <ProblemSection />

      <CollapsibleSection
        id="para-quien-es"
        tag="Para quién es este servicio"
        heading="Tres perfiles donde el valor es inmediato."
        preview="3 perfiles donde el valor de ACELERA es inmediato."
        tone="neutral"
        defaultOpen
      >
        <ArchetypesSection />
      </CollapsibleSection>

      <QuienesSomosSection />
      <FourVerticalsSection />

      <CollapsibleSection
        id="como-funciona"
        tag="Cómo funciona"
        heading="De la información del negocio a un plan que tu equipo puede ejecutar."
        preview="5 pasos: articulación de flujos · procesamiento · traducción · sesiones · ejecución."
        tone="neutral"
      >
        <ProProcessSection />
      </CollapsibleSection>

      <RelatedServicesLinks />

      <IntegracionIASection />

      <CtaSection />
    </>
  )
}
