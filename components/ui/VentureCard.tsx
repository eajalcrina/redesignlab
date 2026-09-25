'use client'

import { motion } from 'framer-motion'

interface VentureCardProps {
  name: string
  category: string
  location: string
  description: string
  projection?: string
  tags: string[]
}

export default function VentureCard({
  name,
  category,
  location,
  description,
  projection,
  tags,
}: VentureCardProps) {
  return (
    <motion.div
      data-cursor="Conocer →"
      className="relative bg-rl-dark rounded overflow-hidden p-6 md:p-8 group cursor-pointer border border-border-dark hover:border-rl-red/20 transition-colors"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative z-10">
        <span className="mb-3 block font-mono text-[10px] uppercase leading-[1.5] tracking-[0.14em] text-rl-red md:text-[10.5px]">
          {category}
        </span>

        <h3 className="font-display text-display-sm text-text-on-dark mb-2">
          {name}
        </h3>

        <p className="text-body-xs text-text-muted mb-4">
          {location}
        </p>

        <p className="text-body-sm text-text-muted mb-4">
          {description}
        </p>

        {projection && (
          <p className="font-mono text-mono-sm text-rl-red mb-4">
            {projection}
          </p>
        )}

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="font-mono text-[10px] uppercase leading-[1.5] tracking-[0.14em] text-text-muted/50">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
