'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionReveal from '@/components/animations/SectionReveal'
import { DURATION, EASE } from '@/lib/animations'

interface FamiliarSectionProps {
  heading: string
  bullets: string[]
  closing: string
}

export default function FamiliarSection({ heading, bullets, closing }: FamiliarSectionProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="section-neutral border-t border-border-light py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <h2 className="font-display text-display-md md:text-display-lg text-text-primary max-w-3xl mb-12">
            {heading}
          </h2>
        </SectionReveal>

        <div ref={ref} className="max-w-3xl space-y-5 mb-10">
          {bullets.map((bullet, i) => (
            <motion.div
              key={bullet}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: DURATION.normal, ease: EASE.out, delay: i * 0.06 }}
              className="flex items-start gap-4"
            >
              <span className="font-mono text-mono-sm text-rl-red mt-1 flex-shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-body-lg text-text-secondary">{bullet}</p>
            </motion.div>
          ))}
        </div>

        <SectionReveal delay={0.2}>
          <p className="text-body-lg text-text-primary italic max-w-2xl border-l-2 border-rl-red pl-6">
            {closing}
          </p>
        </SectionReveal>
      </div>
    </section>
  )
}
