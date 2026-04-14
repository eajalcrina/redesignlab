'use client'

import { motion } from 'framer-motion'
import { ALLIES, ALLIES_LABEL } from '@/lib/constants'

function MarqueeRow({ direction = 'left', items }: { direction?: 'left' | 'right'; items: string[] }) {
  const doubled = [...items, ...items]
  const x = direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%']

  return (
    <div className="overflow-hidden py-3">
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x }}
        transition={{ duration: 60, ease: 'linear', repeat: Infinity }}
      >
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="text-body-lg text-text-primary/60 font-display hover:text-rl-red transition-colors cursor-default"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export default function MarqueeSection() {
  return (
    <section className="section-neutral py-12 md:py-16 overflow-hidden">
      <div className="container-rl mb-6">
        <span className="text-label-sm uppercase text-text-tertiary">{ALLIES_LABEL}</span>
      </div>
      <MarqueeRow direction="left" items={ALLIES.row1} />
      <MarqueeRow direction="right" items={ALLIES.row2} />
    </section>
  )
}
