'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MarqueeProps {
  items: string[]
  direction?: 'left' | 'right'
  speed?: number
  className?: string
}

function MarqueeRow({ items, direction = 'left', speed = 60 }: MarqueeProps) {
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
            className="text-body-lg font-display text-text-primary/40 hover:text-text-muted transition-colors cursor-default"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

interface MarqueeBlockProps {
  items: string[]
  label?: string
  className?: string
}

export default function Marquee({ items, label, className }: MarqueeBlockProps) {
  const reversed = [...items].reverse()

  return (
    <section className={cn('overflow-hidden', className)}>
      {label && (
        <div className="container-rl mb-6">
          <span className="text-label-sm uppercase text-text-tertiary">{label}</span>
        </div>
      )}
      <MarqueeRow items={items} direction="left" />
      <MarqueeRow items={reversed} direction="right" />
    </section>
  )
}
