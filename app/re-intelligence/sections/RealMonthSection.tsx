'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'
import { DURATION, EASE } from '@/lib/animations'

const weeks = [
  {
    week: 'Semana 1',
    title: 'Briefing de inteligencia',
    detail: 'Recibes tu briefing personalizado con análisis de mercado, oportunidades detectadas y movimientos relevantes del ecosistema.',
  },
  {
    week: 'Semana 2',
    title: 'Sesión de advisory',
    detail: 'Primera sesión 1:1 con el equipo senior. Agenda abierta: estrategia, decisiones pendientes, oportunidades a evaluar.',
  },
  {
    week: 'Semana 3',
    title: 'Acceso a herramientas + red',
    detail: 'Modelos de IA actualizados con nuevos datos. Conexiones relevantes dentro de la red de 15 miembros.',
  },
  {
    week: 'Semana 4',
    title: 'Advisory + cierre',
    detail: 'Segunda sesión de advisory. Revisión de decisiones tomadas, ajuste de próximo briefing, anticipación de próximo mes.',
  },
]

export default function RealMonthSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section className="section-neutral py-24 md:py-32" ref={ref}>
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">Un mes real</Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-primary max-w-3xl mb-16">
            Así se ve un mes dentro de Re. Intelligence.
          </h2>
        </SectionReveal>

        <div className="relative">
          {/* Horizontal timeline line */}
          <motion.div
            className="hidden md:block absolute top-8 left-0 right-0 h-px bg-rl-red origin-left"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: DURATION.verySlow * 1.5, ease: EASE.out, delay: 0.3 }}
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {weeks.map((week, i) => (
              <motion.div
                key={week.week}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: DURATION.slow, ease: EASE.out, delay: 0.3 + i * 0.15 }}
              >
                {/* Timeline node */}
                <div className="hidden md:flex items-center justify-center w-4 h-4 rounded-full bg-rl-neutral border-2 border-rl-red mb-6" />

                <span className="font-mono text-mono-sm text-rl-red block mb-2">{week.week}</span>
                <h3 className="font-display text-display-sm text-text-primary mb-3">{week.title}</h3>
                <p className="text-body-sm text-text-secondary">{week.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
