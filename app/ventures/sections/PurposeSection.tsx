'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'
import { DURATION, EASE } from '@/lib/animations'

const circles = [
  { label: 'Rentabilidad', color: 'border-rl-red' },
  { label: 'Impacto', color: 'border-text-on-dark/30' },
  { label: 'Biodiversidad', color: 'border-text-muted/30' },
]

export default function PurposeSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <section className="section-dark py-24 md:py-32" ref={ref}>
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">II. Rentabilidad con propósito</Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-on-dark max-w-3xl mb-16">
            Donde la biodiversidad, la rentabilidad y el impacto se encuentran.
          </h2>
        </SectionReveal>

        {/* Intersection diagram */}
        <div className="flex justify-center mb-12">
          <div className="relative w-[300px] h-[260px] md:w-[400px] md:h-[340px]">
            {circles.map((circle, i) => {
              const positions = [
                { left: '15%', top: '0%' },
                { left: '35%', top: '0%' },
                { left: '25%', top: '25%' },
              ]
              return (
                <motion.div
                  key={circle.label}
                  className={`absolute w-[180px] h-[180px] md:w-[240px] md:h-[240px] rounded-full border-2 ${circle.color} flex items-center justify-center`}
                  style={positions[i]}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: DURATION.slow, ease: EASE.out, delay: i * 0.15 }}
                >
                  <span className="text-body-sm text-text-muted font-medium">{circle.label}</span>
                </motion.div>
              )
            })}

            {/* Center label */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/4 z-10"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6, duration: DURATION.normal }}
            >
              <span className="font-mono text-mono-sm text-rl-red bg-rl-dark px-2 py-1">Ventures</span>
            </motion.div>
          </div>
        </div>

        <SectionReveal delay={0.4}>
          <p className="text-body-lg text-text-muted max-w-3xl mx-auto text-center">
            No creemos en el trade-off entre impacto y rentabilidad. Nuestras ventures nacen en la intersección de tres fuerzas: el despliegue de modelos financieros competitivos orientados a la rentabilidad, la generación de impacto ambiental y social medible (desde los márgenes para la comunidad hasta toneladas de carbono), y la conexión profunda con la biodiversidad del territorio (Perú y América Latina) donde operan.
          </p>
        </SectionReveal>
      </div>
    </section>
  )
}
