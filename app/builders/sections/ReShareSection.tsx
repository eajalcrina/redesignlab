'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Tag from '@/components/ui/Tag'
import { DURATION, EASE } from '@/lib/animations'

export default function ReShareSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <section className="section-dark py-24 md:py-32" ref={ref}>
      <div className="container-rl">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: DURATION.slow, ease: EASE.out }}
          >
            <Tag color="red" className="mb-6">Re. Share</Tag>

            {/* Animated equation */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: DURATION.slow, ease: EASE.out, delay: 0.2 }}
                className="text-center"
              >
                <span className="font-display text-display-sm text-text-on-dark block">Tu expertise</span>
                <span className="text-body-sm text-text-muted">Conocimiento + tiempo</span>
              </motion.div>

              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: DURATION.normal, ease: EASE.out, delay: 0.4 }}
                className="text-display-md text-rl-red font-display"
              >
                +
              </motion.span>

              <motion.div
                initial={{ opacity: 0, x: 0 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: DURATION.slow, ease: EASE.out, delay: 0.5 }}
                className="text-center"
              >
                <span className="font-display text-display-sm text-text-on-dark block">Nuestro ecosistema</span>
                <span className="text-body-sm text-text-muted">Red + ventures + capital</span>
              </motion.div>

              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: DURATION.normal, ease: EASE.out, delay: 0.7 }}
                className="text-display-md text-rl-red font-display"
              >
                =
              </motion.span>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: DURATION.slow, ease: EASE.out, delay: 0.8 }}
                className="text-center bg-rl-red/10 border border-rl-red/20 px-6 py-4 rounded"
              >
                <span className="font-display text-display-sm text-rl-red block">Participación</span>
                <span className="text-body-sm text-text-muted">Equity + revenue share</span>
              </motion.div>
            </div>

            <p className="text-body-lg text-text-muted max-w-xl mx-auto">
              Re. Share es el modelo de participación que alinea incentivos. No eres un proveedor — eres un co-constructor con skin in the game.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
