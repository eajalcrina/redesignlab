'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'
import { DURATION, EASE } from '@/lib/animations'

interface ProcessStep {
  number: string
  title: string
  description: string
}

interface ProcessSectionProps {
  title?: string
  steps: ProcessStep[]
  highlightStep?: ProcessStep
  note?: string
}

export default function ProcessSection({
  title = 'Un proceso diseñado para generar resultados, no informes.',
  steps,
  highlightStep,
  note,
}: ProcessSectionProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section className="section-neutral py-24 md:py-32" ref={ref}>
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">
            Cómo trabajamos
          </Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-primary max-w-3xl mb-16">
            {title}
          </h2>
        </SectionReveal>

        <div className="relative max-w-2xl">
          {/* Vertical connector line */}
          <motion.div
            className="absolute left-[15px] top-0 bottom-0 w-px bg-rl-red origin-top"
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: DURATION.verySlow * 2, ease: EASE.out }}
          />

          {/* Highlight step (e.g., Re. Sprint) */}
          {highlightStep && (
            <SectionReveal delay={0.1}>
              <div className="relative pl-12 pb-12">
                <div className="absolute left-0 top-1 w-[30px] h-[30px] rounded-full bg-rl-red flex items-center justify-center">
                  <span className="font-mono text-[10px] text-white font-medium">
                    {highlightStep.number}
                  </span>
                </div>
                <div className="bg-rl-red/10 border border-rl-red/20 p-6 rounded">
                  <h3 className="font-display text-display-sm text-rl-red mb-2">
                    {highlightStep.title}
                  </h3>
                  <p className="text-body-sm text-text-secondary">
                    {highlightStep.description}
                  </p>
                </div>
              </div>
            </SectionReveal>
          )}

          {/* Regular steps */}
          {steps.map((step, i) => (
            <SectionReveal key={step.number} delay={(i + 1) * 0.15}>
              <div className="relative pl-12 pb-12 last:pb-0">
                <div className="absolute left-0 top-1 w-[30px] h-[30px] rounded-full border border-border-light bg-rl-neutral flex items-center justify-center">
                  <span className="font-mono text-mono-sm text-text-secondary">
                    {step.number}
                  </span>
                </div>
                <h3 className="font-display text-display-sm text-text-primary mb-2">
                  {step.title}
                </h3>
                <p className="text-body-sm text-text-secondary max-w-md">
                  {step.description}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>

        {note && (
          <SectionReveal delay={0.4}>
            <p className="mt-12 text-body-sm text-text-secondary max-w-2xl italic">
              {note}
            </p>
          </SectionReveal>
        )}
      </div>
    </section>
  )
}
