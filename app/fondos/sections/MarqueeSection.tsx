'use client'

import { motion } from 'framer-motion'

const allies = [
  'ProInversión', 'CAF', 'BID Lab', 'GIZ', 'USAID',
  'Concytec', 'Produce', 'Sierra y Selva Exportadora',
  'PNUD', 'FAO', 'IFC', 'Endeavor',
]

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
            className="text-body-lg text-text-primary/40 font-display hover:text-text-muted transition-colors cursor-default"
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
        <span className="text-label-sm uppercase text-text-tertiary">Red institucional</span>
      </div>
      <MarqueeRow direction="left" items={allies} />
      <MarqueeRow direction="right" items={[...allies].reverse()} />
    </section>
  )
}
