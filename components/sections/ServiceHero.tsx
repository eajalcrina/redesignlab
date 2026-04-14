'use client'

import { motion } from 'framer-motion'
import { DURATION, EASE, STAGGER } from '@/lib/animations'
import Tag from '@/components/ui/Tag'

interface ServiceHeroProps {
  tag: string
  line1: string
  line2: string
  line1Style?: 'muted' | 'bright'
  subtitle?: string
}

export default function ServiceHero({
  tag,
  line1,
  line2,
  line1Style = 'muted',
  subtitle,
}: ServiceHeroProps) {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: STAGGER.slow } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: DURATION.normal, ease: EASE.out },
    },
  }

  return (
    <section className="section-dark min-h-[70vh] flex items-center">
      <div className="container-rl py-32 md:py-40">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <Tag color="neutral" className="mb-8">
              {tag}
            </Tag>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className={`font-display text-display-lg md:text-display-xl lg:text-[80px] lg:leading-[0.97] lg:font-normal max-w-5xl ${
              line1Style === 'muted' ? 'text-text-muted' : 'text-text-on-dark'
            }`}
          >
            {line1}
          </motion.h1>

          <motion.div
            variants={{
              hidden: { scaleX: 0, originX: 0 },
              visible: {
                scaleX: 1,
                transition: { duration: DURATION.slow, ease: EASE.out },
              },
            }}
            className="h-0.5 bg-rl-red w-24 my-6"
          />

          <motion.h2
            variants={itemVariants}
            className="font-display text-display-lg md:text-display-xl lg:text-[80px] lg:leading-[0.97] lg:font-normal text-text-on-dark max-w-5xl"
          >
            {line2}
          </motion.h2>

          {subtitle && (
            <motion.p
              variants={itemVariants}
              className="mt-8 text-body-xl text-text-muted max-w-2xl"
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
