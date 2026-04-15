import type { Metadata } from 'next'
import ServiceHero from '@/components/sections/ServiceHero'
import ReIntelligenceBlock from '@/components/sections/ReIntelligenceBlock'
import AccordionSection from '@/components/sections/AccordionSection'
import ServiceGridSection from '@/components/sections/ServiceGridSection'
import ProcessSection from '@/components/sections/ProcessSection'
import CrossNavSection from '@/components/sections/CrossNavSection'
import { transformarModeloServices } from '@/data/services'

export const metadata: Metadata = {
  title: 'Transformar el modelo',
  description:
    'Transformamos el modelo operativo de tu organización con diseño de modelo operativo, roadmap de IA, AI Leadership Sprint y estrategia de escala.',
  keywords: [
    'transformación digital bioeconomía',
    'modelo operativo',
    'AI transformation roadmap',
    'escala bioeconomía',
  ],
  alternates: { canonical: '/transformar-el-modelo' },
}

const accordionItems = [
  {
    question: '¿Has llegado al límite de lo que el modelo actual puede producir y la próxima etapa requiere repensar la arquitectura completa?',
    answer:
      'Operating Model Design rediseña la estructura completa de cómo tu organización crea, entrega y captura valor — desde la estructura de decisión hasta los mecanismos de aprendizaje.',
  },
  {
    question: '¿Necesitas integrar la IA en el núcleo del modelo operativo — no solo como herramienta que el equipo usa ocasionalmente?',
    answer:
      'El AI Transformation Roadmap diseña la hoja de ruta con tres horizontes, combinando conocimiento de la tecnología con conocimiento de la operación.',
  },
  {
    question: '¿Estás escalando a nuevas geografías o mercados y necesitas el modelo estratégico que haga que esa escala no destruya lo que te hizo exitoso?',
    answer:
      'Scale Strategy diseña el modelo de escala considerando los factores de éxito no replicables, la gobernanza y el financiamiento del crecimiento.',
  },
  {
    question: '¿Tu equipo directivo necesita operar con un nivel de inteligencia estratégica que el mercado de hoy exige?',
    answer:
      'AI Leadership Sprint cierra la brecha más crítica en la adopción de IA: la comprensión del equipo directivo sobre qué puede y qué no puede hacer la tecnología.',
  },
]

const processSteps = [
  {
    number: '01',
    title: 'Diagnóstico profundo',
    description:
      'Siempre comienza con un entendimiento honesto del modelo actual: qué funciona, qué limita el crecimiento y cuál es la brecha real entre el estado presente y el objetivo.',
  },
  {
    number: '02',
    title: 'Diseño colaborativo',
    description:
      'La transformación se diseña con el equipo directivo, no para él. Las mejores soluciones emergen del criterio de Redesign Lab combinado con el conocimiento interno de la organización.',
  },
  {
    number: '03',
    title: 'Implementación acompañada',
    description:
      'Los proyectos en esta dirección no terminan en una presentación. Incluyen acompañamiento durante la implementación inicial para garantizar que el diseño sobrevive el contacto con la realidad operativa.',
  },
]

export default function TransformarElModeloPage() {
  return (
    <>
      <ServiceHero
        tag="Transformar el modelo"
        line1="Optimizar lo que existe..."
        line2="ya no es suficiente."
        line1Style="muted"
        subtitle="Algunas organizaciones no tienen un problema de operación ni de oportunidad. Tienen un modelo que funcionó — y que ya no alcanza para llevarlas a donde necesitan llegar. Lo que necesitan no es hacer mejor lo que hacen. Es repensar cómo están organizadas para crear valor."
      />

      <ReIntelligenceBlock expanded />

      <AccordionSection
        title="¿Es este tu camino?"
        items={accordionItems}
      />

      <ServiceGridSection
        title="Servicios para transformar cómo opera tu organización."
        services={transformarModeloServices}
      />

      <ProcessSection steps={processSteps} />

      <CrossNavSection
        links={[
          { label: 'Crear valor', href: '/crear-valor' },
          { label: 'Rediseñar el trabajo', href: '/redisenar-el-trabajo' },
        ]}
      />
    </>
  )
}
