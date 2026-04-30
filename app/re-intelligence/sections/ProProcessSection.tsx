'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionReveal from '@/components/animations/SectionReveal'
import { DURATION, EASE } from '@/lib/animations'

const steps = [
  {
    number: '01',
    title: 'Articulación de flujos de información',
    body: 'Re. Intelligence trabaja junto con la empresa para mapear y estructurar los flujos de información que el negocio ya genera — datos operativos, financieros, comerciales, tecnológicos, de impacto — y los conecta a los Redesign Lab, la plataforma de procesamiento de información de Redesign Lab.',
  },
  {
    number: '02',
    title: 'Procesamiento y análisis',
    body: 'Los Redesign Lab procesan la información con IA y criterio territorial sobre las cuatro verticales estratégicas. El resultado no son dashboards — son análisis de brechas, mapas de oportunidades y escenarios calibrados con la realidad específica de cada empresa.',
  },
  {
    number: '03',
    title: 'Traducción a inteligencia accionable',
    body: 'Los análisis se convierten en insights para el comité de gerencia y en planes de acción ágiles: qué hacer, en qué orden, con qué métricas de seguimiento y con qué criterios para ajustar en tiempo real.',
  },
  {
    number: '04',
    title: 'Sesiones de trabajo con el equipo de gerencia',
    body: 'Los planes e insights se presentan y trabajan en sesiones directas con el equipo directivo. Las 4 horas mensuales se destinan a estas sesiones — donde hay un entregable estructurado que ancla la conversación y las decisiones.',
  },
  {
    number: '05',
    title: 'Ejecución a cargo del equipo de la empresa',
    body: 'Re. Intelligence produce la inteligencia. La ejecución es del equipo de la empresa — con la claridad que el análisis externo hace posible.',
  },
]

export default function ProProcessSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <div ref={ref}>
      <SectionReveal>
        <p className="text-body-lg text-text-secondary max-w-3xl mb-16">
          En Pro, las 4 horas mensuales no se gastan nivelando contexto. Llegan con análisis ya hecho — porque el ciclo de cinco pasos corre cada mes, antes y después de la sesión.
        </p>
      </SectionReveal>

      <div className="relative">
        <motion.div
          className="hidden md:block absolute top-0 bottom-0 left-8 w-px bg-rl-red origin-top"
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: DURATION.verySlow * 1.5, ease: EASE.out, delay: 0.3 }}
        />

        <div className="space-y-12">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: DURATION.slow, ease: EASE.out, delay: 0.3 + i * 0.12 }}
              className="relative md:pl-24"
            >
              <div className="hidden md:flex items-center justify-center absolute left-0 top-1 w-16 h-16 rounded-full bg-rl-neutral border-2 border-rl-red">
                <span className="font-mono text-mono-md text-rl-red">{step.number}</span>
              </div>

              <span className="font-mono text-mono-sm text-rl-red block mb-2 uppercase tracking-[0.18em] md:hidden">
                Paso {step.number}
              </span>
              <h3 className="font-display text-display-sm text-text-primary mb-3">{step.title}</h3>
              <p className="text-body-md text-text-secondary max-w-3xl">{step.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
