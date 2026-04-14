'use client'

import { motion } from 'framer-motion'
import { ALLIES, ALLIES_LABEL } from '@/lib/constants'

function MarqueeRow({ items, direction = 'left', speed = 60 }: { items: string[]; direction?: 'left' | 'right'; speed?: number }) {
  const doubled = [...items, ...items]
  const x = direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%']

  return (
    <div className="overflow-hidden py-1.5 group">
      <motion.div
        className="flex gap-10 whitespace-nowrap"
        animate={{ x }}
        transition={{ duration: speed, ease: 'linear', repeat: Infinity }}
        whileHover={{ animationPlayState: 'paused' }}
      >
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="text-body-sm font-display text-text-on-dark/50 hover:text-rl-red transition-colors cursor-default tracking-wide"
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
    <div className="bg-[#141414] text-text-on-dark py-5 md:py-6 border-y border-border-dark">
      <div className="container-rl mb-3">
        <span className="text-[10px] uppercase tracking-[0.2em] text-text-muted/70">{ALLIES_LABEL}</span>
      </div>
      <MarqueeRow items={ALLIES.row1} direction="left" />
      <MarqueeRow items={ALLIES.row2} direction="right" />
    </div>
  )
}
