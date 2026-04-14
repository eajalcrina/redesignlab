'use client'

import { motion } from 'framer-motion'
import { DURATION, EASE, STAGGER } from '@/lib/animations'
import Tag from '@/components/ui/Tag'

export default function HeroSection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: STAGGER.slow },
    },
  }

  const wordVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: DURATION.normal, ease: EASE.out },
    },
  }

  return (
    <section className="section-dark min-h-screen flex items-center relative overflow-hidden">
      <div className="container-rl py-32 md:py-40">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={wordVariants}>
            <Tag color="neutral" className="mb-8">
              Cómo pensamos
            </Tag>
          </motion.div>

          {/* Act 1 */}
          <motion.h1
            variants={wordVariants}
            className="font-display text-display-lg md:text-display-xl lg:text-[96px] lg:leading-[0.95] lg:font-normal text-text-muted max-w-5xl"
          >
            La bioeconomía no necesita más consultores.
          </motion.h1>

          {/* Red divider */}
          <motion.div
            variants={{
              hidden: { scaleX: 0, originX: 0 },
              visible: {
                scaleX: 1,
                transition: { duration: DURATION.slow, ease: EASE.out, delay: 0.1 },
              },
            }}
            className="h-0.5 bg-rl-red w-32 my-8"
          />

          {/* Act 2 */}
          <motion.h2
            variants={wordVariants}
            className="font-display text-display-lg md:text-display-xl lg:text-[96px] lg:leading-[0.95] lg:font-normal text-text-on-dark max-w-5xl"
          >
            Necesita un estudio que construya.
          </motion.h2>

          <motion.p
            variants={wordVariants}
            className="mt-8 text-body-xl text-text-muted max-w-2xl"
          >
            Un modelo que combina diseño estratégico, operaciones reales e inteligencia artificial para transformar industrias de alto impacto.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
