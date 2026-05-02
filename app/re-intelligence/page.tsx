import type { Metadata } from 'next'
import CollapsibleSection from '@/components/sections/CollapsibleSection'
import HeroSection from './sections/HeroSection'
import ForWhomIntroSection from './sections/ForWhomIntroSection'
import RealMonthSection from './sections/RealMonthSection'
import WhatItIsSection from './sections/WhatItIsSection'
import BenefitsSection from './sections/BenefitsSection'
import ProProcessSection from './sections/ProProcessSection'
import FirstThreeMonthsSection from './sections/FirstThreeMonthsSection'
import WhyFifteenSection from './sections/WhyFifteenSection'
import AddonSection from './sections/AddonSection'
import ArchetypesSection from './sections/ArchetypesSection'
import ApplicationProcess from './sections/ApplicationProcess'
import ClosingNoteSection from './sections/ClosingNoteSection'
import CtaSection from './sections/CtaSection'

export const metadata: Metadata = {
  title: 'Re. Intelligence | Redesign Lab — Lite & Pro: Inteligencia estratégica continua para empresas medianas en bioeconomía',
  description:
    'Re. Intelligence es el equipo de inteligencia estratégica externo de tu empresa. Dos versiones: Lite (USD 900/mes) y Pro (USD 3,000/mes, máximo 15 empresas). Para fundadores y gerencia general que necesitan decidir mejor sobre las cuatro verticales del negocio.',
  keywords: [
    'acompañamiento estratégico bioeconomía',
    'advisory fundadores LATAM',
    'inteligencia estratégica IA',
    'Re Intelligence Lite',
    'Re Intelligence Pro',
    'estrategia empresa mediana',
  ],
  alternates: { canonical: '/re-intelligence' },
}

export default function ReIntelligencePage() {
  return (
    <>
      <HeroSection />
      <ForWhomIntroSection />
      <RealMonthSection />
      <WhatItIsSection />

      <CollapsibleSection
        id="lo-que-incluye"
        tag="Lo que incluye cada mes"
        heading="Cada versión, en detalle."
        preview="11 entregables al mes: 5 en Lite, 6 en Pro. La bolsa de 4 horas es el corazón de ambos."
        tone="neutral"
      >
        <BenefitsSection />
      </CollapsibleSection>

      <CollapsibleSection
        id="como-funciona-pro"
        tag="Cómo funciona Pro · proceso de integración"
        heading="De la información del negocio a un plan que tu equipo puede ejecutar."
        preview="5 pasos: articulación de flujos · procesamiento · traducción · sesiones · ejecución."
        tone="neutral"
      >
        <ProProcessSection />
      </CollapsibleSection>

      <CollapsibleSection
        id="onboarding-pro"
        tag="Pro · Los primeros tres meses"
        heading="El onboarding que hace posible la integración."
        preview="Inmersión → Definición → Activación. Lite arranca directo, sin onboarding."
        tone="neutral"
      >
        <FirstThreeMonthsSection />
      </CollapsibleSection>

      <CollapsibleSection
        id="por-que-quince"
        tag="Aplica a Re. Intelligence Pro"
        heading="¿Por qué 15 empresas y no más?"
        preview="El límite estructural de Pro, explicado. Lite no tiene límite de empresas activas."
        tone="dark"
      >
        <WhyFifteenSection />
      </CollapsibleSection>

      <CollapsibleSection
        id="fundraising"
        tag="Servicio complementario"
        heading="Inversión y Fundraising."
        preview="Add-on disponible para Lite y Pro · estructura caso a caso según el momento de la empresa."
        tone="neutral"
      >
        <AddonSection />
      </CollapsibleSection>

      <CollapsibleSection
        id="para-quien-es"
        tag="Para quién es Re. Intelligence"
        heading="Tres perfiles donde el valor es inmediato."
        preview="3 perfiles donde aplica · 3 situaciones donde no es el servicio correcto."
        tone="neutral"
      >
        <ArchetypesSection />
      </CollapsibleSection>

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
