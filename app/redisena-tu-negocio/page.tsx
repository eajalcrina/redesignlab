import type { Metadata } from 'next'
import CollapsibleSection from '@/components/sections/CollapsibleSection'
import HeroSection from './sections/HeroSection'
import ProblemSection from './sections/ProblemSection'
import FourVerticalsSection from './sections/FourVerticalsSection'
import QuienesSomosSection from './sections/QuienesSomosSection'
import RelatedServicesLinks from './sections/RelatedServicesLinks'
import ProProcessSection from './sections/ProProcessSection'
import FirstThreeMonthsSection from './sections/FirstThreeMonthsSection'
import WhyFifteenSection from './sections/WhyFifteenSection'
import AddonSection from './sections/AddonSection'
import ArchetypesSection from './sections/ArchetypesSection'
import IntegracionIASection from './sections/IntegracionIASection'
import ApplicationProcess from './sections/ApplicationProcess'
import ClosingNoteSection from './sections/ClosingNoteSection'
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
      <FourVerticalsSection />
      <QuienesSomosSection />
      <RelatedServicesLinks />

      <CollapsibleSection
        id="como-funciona"
        tag="Cómo funciona · proceso de integración"
        heading="De la información del negocio a un plan que tu equipo puede ejecutar."
        preview="5 pasos: articulación de flujos · procesamiento · traducción · sesiones · ejecución."
        tone="neutral"
      >
        <ProProcessSection />
      </CollapsibleSection>

      <CollapsibleSection
        id="primeros-tres-meses"
        tag="Los primeros tres meses"
        heading="El onboarding que hace posible la integración."
        preview="Inmersión → Definición → Activación."
        tone="neutral"
      >
        <FirstThreeMonthsSection />
      </CollapsibleSection>

      <CollapsibleSection
        id="por-que-quince"
        tag="Sobre el límite de empresas"
        heading="¿Por qué 15 empresas y no más?"
        preview="El límite estructural del servicio, explicado."
        tone="dark"
      >
        <WhyFifteenSection />
      </CollapsibleSection>

      <CollapsibleSection
        id="fundraising"
        tag="Servicio complementario"
        heading="Inversión y Fundraising."
        preview="Add-on disponible · estructura caso a caso según el momento de la empresa."
        tone="neutral"
      >
        <AddonSection />
      </CollapsibleSection>

      <CollapsibleSection
        id="para-quien-es"
        tag="Para quién es Rediseña tu negocio"
        heading="Tres perfiles donde el valor es inmediato."
        preview="3 perfiles donde aplica · 3 situaciones donde no es el servicio correcto."
        tone="neutral"
      >
        <ArchetypesSection />
      </CollapsibleSection>

      <IntegracionIASection />

      <CollapsibleSection
        id="proceso-de-entrada"
        tag="El proceso de entrada"
        heading="Tres pasos. Sin burocracia."
        preview="Formulario → reunión de 30 minutos → onboarding. Compromiso mínimo de 3 meses."
        tone="neutral"
      >
        <ApplicationProcess />
      </CollapsibleSection>

      <ClosingNoteSection />
      <CtaSection />
    </>
  )
}
