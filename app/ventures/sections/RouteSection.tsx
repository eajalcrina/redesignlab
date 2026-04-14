'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'
import { DURATION, EASE } from '@/lib/animations'

const steps = [
  { number: '01', title: 'Origen y Oportunidad', detail: 'Identificamos potenciales a partir de activos naturales de alta calidad con potencial de mercado y regeneración.' },
  { number: '02', title: 'Diagnóstico y Validación', detail: 'Validamos no solo los aspectos financieros y regulatorios, sino también la viabilidad y compromiso de los actores clave.' },
  { number: '03', title: 'Estructuración y Diseño', detail: 'Construimos el "blueprint" operativo, definimos arquitecturas tecnológicas de IA y esquemas equitativos de apropiación de valor.' },
  { number: '04', title: 'Construcción y Go-to-market', detail: 'Operamos con el equipo local probando hipótesis de modelo de ingresos e integración a mercado piloto.' },
  { number: '05', title: 'Investment Readiness', detail: 'Preparamos la estructura de datos para que interactúen a la misma velocidad que el due diligence del fondo o inversionista interesado.' },
  { number: '06', title: 'Escala Global', detail: 'Transición de startup a proveedor o referente de su propia categoría en la región o internacionalmente.' },
]

export default function RouteSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="section-dark py-24 md:py-32" ref={ref}>
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">IV. La ruta de transformación de Redesign Lab</Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-on-dark max-w-3xl mb-16">
            El proceso detrás de nuestras startups.
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
              transition={{ duration: DURATION.slow, ease: EASE.out, delay: 0.2 + i * 0.12 }}
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
