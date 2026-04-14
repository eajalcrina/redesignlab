'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'
import { ventures } from '@/data/ventures'

export default function PortfolioSection() {
  const [expandedVenture, setExpandedVenture] = useState<string | null>(null)

  return (
    <section className="section-dark py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">VII. El portafolio</Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-on-dark max-w-3xl mb-12">
            Las ventures que estan redefiniendo sus categorias.
          </h2>
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ventures.map((venture, i) => {
            const isExpanded = expandedVenture === venture.name

            return (
              <SectionReveal key={venture.name} delay={i * 0.06}>
                <motion.div
                  layout
                  onClick={() => setExpandedVenture(isExpanded ? null : venture.name)}
                  className="relative bg-rl-dark rounded-lg overflow-hidden p-6 md:p-8 cursor-pointer border border-border-dark hover:border-rl-red/20 transition-colors min-h-[200px] flex flex-col justify-end"
                >
                  {/* Background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-rl-dark to-[#1a1a1a] opacity-100" />

                  <div className="relative z-10">
                    <span className="text-label-sm uppercase text-rl-red mb-2 block">
                      {venture.category}
                    </span>

                    <h3 className="font-display text-display-sm text-text-on-dark mb-1">
                      {venture.name}
                    </h3>

                    <p className="text-body-xs text-text-muted mb-3">
                      {venture.location}
                    </p>

                    <p className="text-body-sm text-text-muted line-clamp-2">
                      {venture.tagline || venture.description}
                    </p>

                    {/* Expanded content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 mt-3 border-t border-white/10">
                            <p className="text-body-sm text-text-muted mb-4">
                              {venture.description}
                            </p>

                            {venture.hito && (
                              <div className="mb-3">
                                <h4 className="text-label-sm uppercase text-text-muted/60 mb-1">Hito</h4>
                                <p className="text-body-sm text-rl-red">{venture.hito}</p>
                              </div>
                            )}

                            {venture.projection && (
                              <div className="mb-3">
                                <h4 className="text-label-sm uppercase text-text-muted/60 mb-1">Proyeccion</h4>
                                <p className="font-mono text-mono-sm text-rl-red">{venture.projection}</p>
                              </div>
                            )}

                            <div className="flex flex-wrap gap-2 mt-3">
                              {venture.tags.map((tag) => (
                                <span key={tag} className="text-label-sm uppercase text-text-muted/50">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </SectionReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
