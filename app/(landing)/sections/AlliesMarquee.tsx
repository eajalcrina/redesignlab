'use client'

import { motion } from 'framer-motion'
import { ALLIES } from '@/lib/constants'

function MarqueeRow({ items, direction = 'left', speed = 60 }: { items: string[]; direction?: 'left' | 'right'; speed?: number }) {
  const doubled = [...items, ...items]
  const x = direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%']

  return (
    <div className="overflow-hidden py-3 group">
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x }}
        transition={{ duration: speed, ease: 'linear', repeat: Infinity }}
        whileHover={{ animationPlayState: 'paused' }}
      >
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="text-body-lg font-display text-text-primary/40 hover:text-rl-red transition-colors cursor-default"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export default function AlliesMarquee() {
  return (
    <div className="section-neutral py-12 md:py-16">
      <div className="container-rl mb-6">
        <span className="text-label-sm uppercase text-text-tertiary">Aliados institucionales</span>
      </div>
      <MarqueeRow items={ALLIES.row1} direction="left" />
      <MarqueeRow items={ALLIES.row2} direction="right" />
    </div>
  )
}
