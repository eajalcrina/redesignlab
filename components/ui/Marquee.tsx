'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MarqueeProps {
  items: string[]
  direction?: 'left' | 'right'
  speed?: number
  className?: string
  tone?: 'light' | 'dark'
}

function MarqueeRow({ items, direction = 'left', speed = 60, tone = 'light' }: MarqueeProps) {
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
            className={cn(
              'text-body-lg font-display hover:text-rl-red transition-colors cursor-default',
              tone === 'dark' ? 'text-text-on-dark/60' : 'text-text-primary/60'
            )}
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
  tone?: 'light' | 'dark'
}

export default function Marquee({ items, label, className, tone = 'light' }: MarqueeBlockProps) {
  const reversed = [...items].reverse()

  return (
    <section className={cn('overflow-hidden', className)}>
      {label && (
        <div className="container-rl mb-6">
          <span className={cn('text-label-sm uppercase', tone === 'dark' ? 'text-text-on-dark/40' : 'text-text-tertiary')}>
            {label}
          </span>
        </div>
      )}
      <MarqueeRow items={items} direction="left" tone={tone} />
      <MarqueeRow items={reversed} direction="right" tone={tone} />
    </section>
  )
}
