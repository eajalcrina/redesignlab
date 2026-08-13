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
import ApplicationProcess from './sections/ApplicationProcess'
import CtaSection from './sections/CtaSection'

export const metadata: Metadata = {
  title: 'Rediseña tu negocio',
  description:
    'Un equipo de gerentes externos con más de 15 años de experiencia, para empresas en crecimiento que necesitan pensar su estrategia sin armar un equipo interno. S/ 2,000/mes.',
  keywords: [
    'acompañamiento estratégico Perú',
    'gerentes externos empresa en crecimiento',
    'advisory fundadores Perú',
    'estrategia empresa mediana',
  ],
  alternates: { canonical: '/redisena-tu-negocio' },
}

export default function RedisenaTuNegocioPage() {
  return (
    <>
      <HeroSection />
      <ProblemSection />

      <CollapsibleSection
        id="para-quien-es"
        tag="Para quién es este servicio"
        heading="Tres perfiles donde el valor es inmediato."
        preview="3 perfiles donde aplica · 3 situaciones donde no es el servicio correcto."
        tone="neutral"
        defaultOpen
      >
        <ArchetypesSection />
      </CollapsibleSection>

      <QuienesSomosSection />
      <FourVerticalsSection />

      <CollapsibleSection
        id="como-funciona"
        tag="Cómo funciona · proceso de integración"
        heading="De la información del negocio a un plan que tu equipo puede ejecutar."
        preview="5 pasos: articulación de flujos · procesamiento · traducción · sesiones · ejecución."
        tone="neutral"
      >
        <ProProcessSection />
      </CollapsibleSection>

      <RelatedServicesLinks />

      <IntegracionIASection />

      <CollapsibleSection
        id="proceso-de-entrada"
        tag="El proceso de entrada"
        heading="Empieza aquí."
        preview="Un formulario. Nosotros te contactamos para agendar la conversación de fit."
        tone="neutral"
      >
        <ApplicationProcess />
      </CollapsibleSection>

      <CtaSection />
    </>
  )
}
