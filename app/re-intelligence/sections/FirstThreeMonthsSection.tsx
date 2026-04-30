'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionReveal from '@/components/animations/SectionReveal'
import { DURATION, EASE } from '@/lib/animations'

const months = [
  {
    label: 'Mes 1',
    title: 'Inmersión',
    work: [
      {
        heading: 'Negocio',
        body: 'Cómo funciona realmente la operación, cuáles son los activos diferenciales, dónde están las ineficiencias que nadie ha nombrado todavía, qué está frenando el crecimiento y qué lo está impulsando.',
      },
      {
        heading: 'Mercado',
        body: 'Cuál es el estado real del ecosistema en el que opera la empresa, qué oportunidades existen que todavía no han sido capturadas, qué amenazas están llegando antes de que sean visibles, qué están haciendo los actores más relevantes del sector.',
      },
      {
        heading: 'Los fundadores y el equipo',
        body: 'Cómo toman decisiones, cuáles son las convicciones que no se negocian, dónde están las capacidades reales y dónde están las brechas, qué tipo de crecimiento están dispuestos a gestionar y cuál no.',
      },
    ],
    closing:
      'El output del Mes 1 no es una estrategia. Es una serie de escenarios — descripciones rigurosas de cómo podría verse el negocio en 18–36 meses bajo distintas decisiones y condiciones de mercado. La empresa elige con qué escenario se identifica — con criterio, no con intuición.',
    outputs: [
      'Diagnóstico profundo del negocio, el mercado y el equipo',
      'Mapa de oportunidades y riesgos identificados con IA y criterio territorial',
      '3 a 4 escenarios estratégicos con variables, riesgos y palancas de acción por cada uno',
      'Recomendación de escenario prioritario con justificación',
    ],
  },
  {
    label: 'Mes 2',
    title: 'Definición',
    work: [
      {
        heading: 'Evaluación con los Fundadores o Gerencia General',
        body: 'Los escenarios se discuten, se tensionan, se ajustan. Las variables se calibran con información real. Los supuestos se cuestionan. Las premisas que parecían sólidas en el papel se contrastan con lo que el equipo sabe desde adentro.',
      },
      {
        heading: 'Decisión y construcción del plan',
        body: 'Al final del proceso, hay una decisión: cuál es el escenario correcto para esta empresa en este momento. Y sobre esa decisión se construye el plan.',
      },
    ],
    closing:
      'El output del Mes 2 es un plan de negocio accionable — no un documento de estrategia corporativa para presentar a un directorio. Un plan concreto: qué se va a hacer, en qué orden, con qué recursos, con qué métricas de seguimiento y con qué criterios para saber si está funcionando.',
    outputs: [
      'Evaluación detallada de cada escenario con el equipo directivo',
      'Decisión de escenario y ajuste de variables en función de la realidad del negocio',
      'Plan de negocio accionable con prioridades por trimestre, responsables, recursos, métricas y criterios de ajuste',
    ],
  },
  {
    label: 'Mes 3',
    title: 'Activación',
    work: [
      {
        heading: 'Foco en quick wins',
        body: 'El mejor plan no vale nada si no produce resultados visibles en las primeras semanas. Identificamos las iniciativas del plan que producen el mayor impacto en el menor tiempo con los recursos disponibles ahora. No las más ambiciosas. Las más accionables en este momento.',
      },
      {
        heading: 'Acompañamiento en la ejecución',
        body: 'Redesign Lab acompaña la activación: resolviendo cuellos de botella, ajustando el plan cuando la realidad operativa lo requiere, y asegurando que el equipo tiene la claridad necesaria para ejecutar sin depender de la guía externa en cada paso.',
      },
    ],
    closing:
      'Al final del Mes 3, la empresa tiene el entendimiento profundo y el plan concreto que hacen que el acompañamiento produzca valor real desde el cuarto mes en adelante.',
    outputs: [
      'Mapa de quick wins priorizados por impacto y viabilidad de ejecución inmediata',
      'Acompañamiento en la activación de las primeras iniciativas del plan',
      'Resolución de los primeros cuellos de botella de implementación',
      'Ajuste del plan en función de los primeros aprendizajes de ejecución',
      'Protocolo de seguimiento mensual para los meses siguientes',
    ],
  },
]

export default function FirstThreeMonthsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <div ref={ref}>
      <SectionReveal>
        <p className="text-body-lg text-text-secondary max-w-3xl mb-6">
          Re. Intelligence Pro no empieza con una reunión de kickoff genérica. Empieza con un proceso estructurado de tres meses para articular flujos de información, calibrar los Redesign Lab al negocio específico y producir el primer plan accionable. Desde el cuarto mes en adelante, el acompañamiento entra al ciclo mensual estándar.
        </p>
        <p className="font-mono text-mono-sm text-text-tertiary uppercase tracking-[0.18em] mb-20">
          Light no requiere onboarding · inicia con la primera sesión de trabajo
        </p>
      </SectionReveal>

      <div className="relative">
          {/* Vertical timeline line */}
          <motion.div
            className="hidden md:block absolute top-0 bottom-0 left-8 w-px bg-rl-red origin-top"
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: DURATION.verySlow * 1.5, ease: EASE.out, delay: 0.3 }}
          />

          <div className="space-y-20 md:space-y-24">
            {months.map((month, i) => (
              <motion.div
                key={month.label}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: DURATION.slow, ease: EASE.out, delay: 0.3 + i * 0.2 }}
                className="relative md:pl-24"
              >
                {/* Timeline node */}
                <div className="hidden md:flex items-center justify-center absolute left-0 top-1 w-16 h-16 rounded-full bg-rl-neutral border-2 border-rl-red">
                  <span className="font-mono text-mono-md text-rl-red">0{i + 1}</span>
                </div>

                <div className="mb-6">
                  <span className="font-mono text-mono-sm text-rl-red block mb-2 uppercase tracking-[0.18em]">
                    {month.label}
                  </span>
                  <h3 className="font-display text-display-md text-text-primary">
                    {month.title}
                  </h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16">
                  <div>
                    <p className="text-label-md uppercase text-text-tertiary mb-6">El trabajo</p>
                    <div className="space-y-6">
                      {month.work.map((w) => (
                        <div key={w.heading}>
                          <p className="font-display text-display-sm text-text-primary mb-2">{w.heading}</p>
                          <p className="text-body-md text-text-secondary">{w.body}</p>
                        </div>
                      ))}
                    </div>
                    <p className="text-body-md text-text-secondary mt-8 italic border-l-2 border-rl-red pl-4">
                      {month.closing}
                    </p>
                  </div>

                  <div className="bg-rl-dark text-text-on-dark p-8 rounded h-fit">
                    <p className="font-mono text-mono-sm text-rl-red uppercase tracking-[0.18em] mb-6">
                      Output {month.label}
                    </p>
                    <ul className="space-y-4">
                      {month.outputs.map((o) => (
                        <li key={o} className="flex items-start gap-3 text-body-sm text-text-muted">
                          <span className="w-1.5 h-1.5 rounded-full bg-rl-red mt-2 flex-shrink-0" />
                          <span>{o}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  )
}
