'use client'

import { motion } from 'framer-motion'
import { DURATION, EASE, STAGGER } from '@/lib/animations'
import Tag from '@/components/ui/Tag'

export default function HeroSection() {
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: STAGGER.fast } },
  }
  const item = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: DURATION.normal, ease: EASE.out } },
  }

  return (
    <section className="section-dark">
      <div className="container-rl pb-20 pt-36 md:pb-28 md:pt-44">
        <motion.div initial="hidden" animate="visible" variants={container}>
          <motion.div variants={item}>
            <Tag color="neutral" className="mb-3">Conocimiento</Tag>
          </motion.div>
          <motion.h1
            variants={item}
            className="max-w-[1000px] font-sans text-[38px] font-normal leading-none tracking-[-0.04em] text-text-on-dark sm:text-[46px] md:text-[64px]"
          >
            Lo que sabemos, lo compartimos.
          </motion.h1>
          <motion.p variants={item} className="mt-7 max-w-[600px] text-[17px] leading-[1.6] text-text-muted md:text-[18px]">
            Recursos, frameworks y datos que usamos internamente, abiertos para el ecosistema.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
