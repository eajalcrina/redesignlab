'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'
import { DURATION, EASE } from '@/lib/animations'

const steps = [
  { number: '01', title: 'Ingreso a la red', detail: 'Ingreso a través de proyectos de consultoría y diseño estratégico remunerados, trabajando con Redesign Lab.' },
  { number: '02', title: 'Oportunidad identificada', detail: 'Conexión de una oportunidad validada en el campo con la capacidad operativa del builder.' },
  { number: '03', title: 'Co-construcción', detail: 'Se estructura la nueva venture. Asumes rol de Co-Founder operativo con un cap table definido.' },
  { number: '04', title: 'Escala', detail: 'Acceso a la red de fondos de impacto liderando la operación de tu venture hacia etapas de crecimiento.' },
]

export default function InvestmentPathSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section className="section-dark py-24 md:py-32" ref={ref}>
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">El &apos;Venture Path&apos;</Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-on-dark max-w-3xl mb-16">
            La ruta de escalamiento interno.
          </h2>
        </SectionReveal>

        <div className="relative max-w-2xl">
          <motion.div
            className="absolute left-[15px] top-0 bottom-0 w-px bg-rl-red origin-top"
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: DURATION.verySlow * 2, ease: EASE.out }}
          />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="relative pl-12 pb-12 last:pb-0"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: DURATION.slow, ease: EASE.out, delay: 0.3 + i * 0.15 }}
            >
              <div className="absolute left-0 top-1 w-[30px] h-[30px] rounded-full border border-border-dark bg-rl-dark flex items-center justify-center">
                <span className="font-mono text-mono-sm text-rl-red">{step.number}</span>
              </div>
              <h3 className="font-display text-display-sm text-text-on-dark mb-2">{step.title}</h3>
              <p className="text-body-sm text-text-muted max-w-md">{step.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
