'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionReveal from '@/components/animations/SectionReveal'
import { DURATION, EASE } from '@/lib/animations'

export interface ProcessStep {
  label: string
  body: string
}

interface ThreeStepProcessProps {
  steps: ProcessStep[]
  intro?: string
}

export default function ThreeStepProcess({ steps, intro }: ThreeStepProcessProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section className="section-dark border-t border-border-dark py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <h2 className="font-display text-display-md md:text-display-lg text-text-on-dark max-w-3xl mb-4">
            Cómo trabajamos
          </h2>
          {intro && <p className="text-body-lg text-text-muted max-w-3xl mb-16">{intro}</p>}
        </SectionReveal>

        <div ref={ref} className="relative mt-16">
          <motion.div
            className="hidden md:block absolute top-0 bottom-0 left-8 w-px bg-rl-red origin-top"
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: DURATION.verySlow * 1.5, ease: EASE.out, delay: 0.2 }}
          />

          <div className="space-y-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: DURATION.slow, ease: EASE.out, delay: 0.2 + i * 0.15 }}
                className="relative md:pl-24"
              >
                <div className="hidden md:flex items-center justify-center absolute left-0 top-1 w-16 h-16 rounded-full bg-rl-dark border-2 border-rl-red">
                  <span className="font-mono text-mono-md text-rl-red">0{i + 1}</span>
                </div>
                <span className="font-mono text-mono-sm text-rl-red block mb-2 uppercase tracking-[0.18em] md:hidden">
                  Paso {i + 1}
                </span>
                <h3 className="font-display text-display-sm text-text-on-dark mb-3">{step.label}</h3>
                <p className="text-body-md text-text-muted max-w-3xl">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
