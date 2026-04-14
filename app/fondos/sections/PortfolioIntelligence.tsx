'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'
import Button from '@/components/ui/Button'
import { SITE_CONFIG } from '@/lib/constants'
import { DURATION, EASE } from '@/lib/animations'

const features = [
  'Monitoreo mensual con semáforo de estado por empresa y dimensión BIRF',
  'Reporte ejecutivo mensual con alertas de riesgo identificadas',
  'Acceso a dashboard de portafolio en tiempo real',
  'Alertas tempranas sobre variables críticas del portafolio',
  'Reunión trimestral de revisión de portafolio con el equipo del fondo',
  'Diagnóstico semestral de madurez actualizado por empresa',
  'Acompañamiento técnico directo a empresas del portafolio',
  'Estrategia de preparación para siguiente ronda',
]

export default function PortfolioIntelligence() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section className="section-dark py-24 md:py-32" ref={ref}>
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">Re. Portfolio Intelligence</Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-on-dark max-w-3xl mb-4">
            Inteligencia continua para tu portafolio.
          </h2>
          <p className="text-body-lg text-text-muted max-w-2xl mb-16">
            Un solo producto diseñado para fondos que invierten en bioeconomía en América Latina.
          </p>
        </SectionReveal>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: DURATION.slow, ease: EASE.out, delay: 0.1 }}
            className="p-8 rounded border border-rl-red bg-rl-red/5 ring-1 ring-rl-red/20"
          >
            <h3 className="font-display text-display-sm text-text-on-dark mb-2">
              Re. Portfolio Intelligence
            </h3>
            <p className="font-mono text-mono-md text-rl-red mb-6">
              USD 3,000 / mes
            </p>
            <ul className="space-y-3 mb-8">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-body-sm text-text-muted">
                  <span className="w-1 h-1 rounded-full bg-rl-red mt-2 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              variant="primary"
              size="sm"
              href={`mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent('Re. Portfolio Intelligence')}`}
            >
              Consultar &rarr;
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
