'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'
import { DURATION, EASE } from '@/lib/animations'

interface VerticalBlock {
  heading: string
  body: string
}

interface Vertical {
  number: string
  title: string
  intro?: string
  body?: string
  blocks?: VerticalBlock[]
}

const verticales: Vertical[] = [
  {
    number: 'I',
    title: 'Estrategia de Negocios y Tecnología',
    intro:
      'La estrategia de negocio y la tecnología no son dimensiones separadas. La tecnología es una palanca de la estrategia, no un área de soporte. Este bloque trabaja ambas dimensiones de forma integrada.',
    blocks: [
      {
        heading: 'Negocios',
        body: 'Escenarios de crecimiento, posicionamiento competitivo, validación y evolución del modelo de negocio, identificación de palancas de valor y decisiones de dirección de largo plazo. El eje integrador de todos los demás.',
      },
      {
        heading: 'Tecnología',
        body: 'Diagnóstico del stack tecnológico actual, identificación de oportunidades de automatización e integración, evaluación de herramientas de IA aplicables al negocio, y alineación de las decisiones tecnológicas con la estrategia de crecimiento.',
      },
    ],
  },
  {
    number: 'II',
    title: 'Estrategia de Operaciones y Finanzas',
    intro:
      'Las dos dimensiones de eficiencia y sostenibilidad del modelo. Se analizan juntas porque las decisiones operativas tienen consecuencias financieras directas, y las restricciones financieras definen el espacio de lo operativamente posible.',
    blocks: [
      {
        heading: 'Operaciones',
        body: 'Análisis de eficiencia operativa, detección de ineficiencias sistémicas, diseño de estructuras de proceso, mapeo de capacidades del equipo y cuellos de botella que frenan el escalamiento.',
      },
      {
        heading: 'Finanzas',
        body: 'Análisis de estado financiero, proyecciones, estructura de costos, rentabilidad por línea de negocio, gestión del capital de trabajo y criterios para decisiones de inversión y asignación de recursos.',
      },
    ],
  },
  {
    number: 'III',
    title: 'Estrategia Comercial',
    body: 'Análisis de desempeño comercial, diagnóstico de pipeline y conversión, identificación de oportunidades de mercado, ajuste de propuesta de valor y estrategia de crecimiento de ingresos. Monitoreo del ecosistema competitivo y de los movimientos de los actores más relevantes del sector.',
  },
  {
    number: 'IV',
    title: 'Estrategia de Impacto',
    body: 'Medición y comunicación del impacto generado por la empresa: ambiental, social, económico. Alineación entre la estrategia de negocio y los compromisos de impacto, y su traducción en valor diferencial ante clientes, inversores y aliados. En las industrias de bioeconomía, el impacto no es un reporte de sostenibilidad. Es parte de la tesis de valor.',
  },
]

export default function RealMonthSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="section-dark py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">Las cuatro verticales estratégicas</Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-on-dark max-w-3xl mb-6">
            Un mismo marco. Cuatro frentes que mueven el negocio.
          </h2>
          <p className="text-body-lg text-text-muted max-w-3xl mb-16">
            Re. Intelligence trabaja sobre cuatro verticales estratégicas que cubren el espacio completo de decisiones que mueven una empresa mediana. Ambas versiones (Lite y Pro) operan sobre el mismo marco. El nivel de profundidad y la forma de intervención varía, pero el alcance temático es el mismo.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {verticales.map((v, i) => (
            <SectionReveal key={v.number} delay={i * 0.08}>
              <div
                className="border border-border-dark p-8 rounded cursor-pointer hover:border-rl-red/40 transition-colors h-full"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="font-mono text-mono-sm text-rl-red block mb-2 uppercase tracking-[0.18em]">
                      Vertical {v.number}
                    </span>
                    <h3 className="font-display text-display-sm text-text-on-dark">{v.title}</h3>
                  </div>
                  <motion.span
                    animate={{ rotate: openIndex === i ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-rl-red text-xl flex-shrink-0 mt-1"
                  >
                    +
                  </motion.span>
                </div>

                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: DURATION.fast, ease: EASE.out }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t border-border-dark space-y-5">
                        {v.intro && (
                          <p className="text-body-sm text-text-muted italic">{v.intro}</p>
                        )}
                        {v.body && <p className="text-body-sm text-text-muted">{v.body}</p>}
                        {v.blocks?.map((b) => (
                          <div key={b.heading}>
                            <p className="text-label-sm uppercase text-rl-red mb-2">{b.heading}</p>
                            <p className="text-body-sm text-text-muted">{b.body}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
