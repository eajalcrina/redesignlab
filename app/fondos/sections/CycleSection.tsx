'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'
import { DURATION, EASE } from '@/lib/animations'

const nodes = [
  {
    id: 'sourcing',
    label: 'Sourcing',
    detail: 'Identificamos oportunidades de inversión en bioeconomía antes de que lleguen al mercado. Nuestra red de campo detecta deals que los canales tradicionales no ven.',
  },
  {
    id: 'diligence',
    label: 'Due Diligence',
    detail: 'Due diligence técnica y operativa en campo. Validamos el modelo, la cadena, el equipo y el territorio — no solo los números.',
  },
  {
    id: 'building',
    label: 'Value Building',
    detail: 'Post-inversión, aceleramos el valor del deal: transformación operacional u organizacional de las empresas del portafolio, adopción de IA y conexión con la red de Redesign Lab.',
  },
  {
    id: 'monitoring',
    label: 'Monitoring',
    detail: 'Re. Portfolio Intelligence: monitoreo continuo con datos de campo, alertas tempranas y reportes de inteligencia para el comité de inversión.',
  },
  {
    id: 'impact',
    label: 'Impact Reporting',
    detail: 'Definimos métricas de impacto del portafolio, implementamos sistemas de monitoreo continuo y generamos los reportes que los LP y el mercado exigen — con datos verificables de campo.',
  },
]

export default function CycleSection() {
  const [activeNode, setActiveNode] = useState<string | null>(null)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <section className="section-dark py-24 md:py-32" ref={ref}>
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">Los cinco momentos del ciclo</Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-on-dark max-w-3xl mb-16">
            Acompañamos al fondo y a las empresas de su portafolio en cada etapa.
          </h2>
        </SectionReveal>

        {/* Horizontal diagram */}
        <div className="relative">
          {/* Connector line */}
          <motion.div
            className="hidden md:block absolute top-6 left-0 right-0 h-px bg-rl-red origin-left"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: DURATION.verySlow, ease: EASE.out, delay: 0.3 }}
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {nodes.map((node, i) => (
              <SectionReveal key={node.id} delay={i * 0.1}>
                <div
                  className="relative cursor-pointer group"
                  onMouseEnter={() => setActiveNode(node.id)}
                  onMouseLeave={() => setActiveNode(null)}
                  onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
                >
                  {/* Node dot */}
                  <motion.div
                    className="w-3 h-3 rounded-full bg-rl-red mb-6 hidden md:block"
                    animate={{ scale: activeNode === node.id ? 1.8 : 1 }}
                    transition={{ duration: 0.2 }}
                  />

                  <span className="font-mono text-mono-sm text-rl-red block mb-2">0{i + 1}</span>
                  <h3 className="font-display text-display-sm text-text-on-dark mb-3 group-hover:text-rl-red transition-colors">
                    {node.label}
                  </h3>

                  <motion.p
                    className="text-body-sm text-text-muted"
                    initial={false}
                    animate={{ opacity: activeNode === node.id || !activeNode ? 1 : 0.4 }}
                    transition={{ duration: 0.2 }}
                  >
                    {node.detail}
                  </motion.p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
