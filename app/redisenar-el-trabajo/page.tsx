import type { Metadata } from 'next'
import ServiceHero from '@/components/sections/ServiceHero'
import ReSprintHighlight from './sections/ReSprintHighlight'
import AccordionSection from '@/components/sections/AccordionSection'
import ServiceGridSection from '@/components/sections/ServiceGridSection'
import ProcessSection from '@/components/sections/ProcessSection'
import CrossNavSection from '@/components/sections/CrossNavSection'
import { redisenarTrabajoServices, reSprint } from '@/data/services'

export const metadata: Metadata = {
  title: 'Rediseñar el trabajo',
  description:
    'Rediseñamos las operaciones de tu industria con circularidad, inteligencia de cadena de suministro e IA aplicada. Re. Sprint: 3 semanas, USD 4,000.',
  keywords: [
    'operaciones circulares',
    'supply chain intelligence',
    'IA operativa bioeconomía',
    'rediseño operativo',
  ],
  alternates: { canonical: '/redisenar-el-trabajo' },
}

const accordionItems = [
  {
    question: '¿Tiene tu operación potencial que no estás capturando: mermas que podrían ser recursos, cuellos de botella que frenan la escala?',
    answer:
      'El Circular Operations Redesign identifica dónde están esas oportunidades en la operación existente y diseña el camino para capturarlas.',
  },
  {
    question: '¿Falta visibilidad y trazabilidad en tu cadena de suministro para acceder a los mercados que pagan el precio premium?',
    answer:
      'Supply Chain Intelligence diseña el sistema de trazabilidad que tu cadena necesita para acceder a mercados que exigen visibilidad completa.',
  },
  {
    question: '¿Sabes que la IA puede transformar cómo trabajas pero no tienes claridad sobre dónde aplicarla primero?',
    answer:
      'Re.·IA Application diagnostica la madurez de tu operación y diseña la implementación de IA sobre procesos preparados para recibirla.',
  },
  {
    question: '¿Necesitas demostrar circularidad real en tu operación, como ventaja competitiva que reduce costos y abre mercados?',
    answer:
      'El Circular Operations Redesign mapea flujos de materiales y energía, identifica oportunidades circulares y diseña iniciativas priorizadas con métricas de seguimiento.',
  },
]

const processSteps = [
  {
    number: '01',
    title: 'Diseño de la intervención',
    description:
      'Con el contexto claro, se define el alcance exacto: qué se transforma, con qué metodología, en qué tiempo y con qué entregables verificables.',
  },
  {
    number: '02',
    title: 'Implementación iterativa',
    description:
      'El trabajo se ejecuta en ciclos cortos con revisión constante, no en un proceso lineal que termina con una presentación que nadie puede implementar.',
  },
  {
    number: '03',
    title: 'Transferencia y activación',
    description:
      'El equipo queda operando la solución, no dependiendo de Redesign Lab para sostenerla. Ese es el criterio de éxito de cada proyecto.',
  },
]

const reSprintStep = {
  number: '00',
  title: 'Re. Sprint (si aplica)',
  description:
    'Diagnóstico del punto de partida real. Recomendación de la intervención correcta. 3 semanas · USD 4,000.',
}

export default function RedisenarElTrabajoPage() {
  return (
    <>
      <ServiceHero
        tag="Rediseñar el trabajo"
        line1="El modelo de negocio puede ser correcto."
        line2="La forma en que se ejecuta puede estar destruyendo su potencial."
        line1Style="muted"
        subtitle="Hay organizaciones que no necesitan una nueva estrategia. Necesitan que lo que ya existe funcione mucho mejor: más eficiente, más trazable, más circular, más inteligente. Sin cambiar lo que las hace únicas. Cambiando la forma en que lo hacen."
      />

      <ReSprintHighlight service={reSprint} />

      <AccordionSection
        title="¿Es este tu camino?"
        items={accordionItems}
      />

      <ServiceGridSection
        title="Servicios para rediseñar cómo trabaja tu industria."
        services={redisenarTrabajoServices}
      />

      <ProcessSection steps={processSteps} highlightStep={reSprintStep} />

      <CrossNavSection
        links={[
          { label: 'Crear valor', href: '/crear-valor' },
          { label: 'Transformar el modelo', href: '/transformar-el-modelo' },
        ]}
      />
    </>
  )
}
