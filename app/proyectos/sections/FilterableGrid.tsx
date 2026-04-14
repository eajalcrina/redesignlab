'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { projects, projectCategories, projectIndustries, getProjectSlug } from '@/data/projects'
import { cn } from '@/lib/utils'

const cardBgColors = ['bg-rl-dark', 'bg-[#1a1a1a]', 'bg-[#222]']

export default function FilterableGrid() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeIndustry, setActiveIndustry] = useState('Todas')

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const catMatch = activeCategory === 'all' || p.category === activeCategory
      const indMatch = activeIndustry === 'Todas' || p.industry.toLowerCase().includes(activeIndustry.toLowerCase())
      return catMatch && indMatch
    })
  }, [activeCategory, activeIndustry])

  return (
    <section className="section-neutral">
      {/* Sticky filter bar */}
      <div className="sticky top-16 md:top-20 z-30 bg-rl-neutral/95 backdrop-blur-sm border-b border-border-light">
        <div className="container-rl py-4">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            {/* Category filters */}
            <div className="flex overflow-x-auto gap-2 pb-1 -mx-1 px-1 scrollbar-none" style={{ scrollbarWidth: 'none' }}>
              {projectCategories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={cn(
                    'px-4 py-2 text-body-sm transition-all duration-200 rounded whitespace-nowrap flex-shrink-0',
                    activeCategory === cat.value
                      ? 'bg-rl-dark text-text-on-dark'
                      : 'text-text-secondary hover:text-text-primary'
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Industry filter */}
            <div className="flex overflow-x-auto gap-2 pb-1 -mx-1 px-1 scrollbar-none" style={{ scrollbarWidth: 'none' }}>
              {projectIndustries.map((ind) => (
                <button
                  key={ind}
                  onClick={() => setActiveIndustry(ind)}
                  className={cn(
                    'px-3 py-1.5 text-body-xs transition-all duration-200 whitespace-nowrap flex-shrink-0',
                    activeIndustry === ind
                      ? 'text-rl-red font-medium'
                      : 'text-text-tertiary hover:text-text-secondary'
                  )}
                >
                  {ind}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Project card grid */}
      <div className="container-rl py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => {
              const bgColor = cardBgColors[i % cardBgColors.length]

              return (
                <motion.div
                  key={project.number}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    href={`/proyectos/${getProjectSlug(project)}`}
                    className={cn(
                      bgColor,
                      'group relative overflow-hidden rounded-lg block min-h-[220px] p-6 flex-col justify-end',
                      'border border-border-dark hover:border-rl-red/50 transition-all duration-300',
                      'hover:-translate-y-1'
                    )}
                  >
                    {/* Large background number */}
                    <span className="absolute top-2 right-4 font-display text-display-xl leading-none select-none pointer-events-none text-white opacity-[0.07] group-hover:opacity-[0.12] transition-opacity">
                      {project.number}
                    </span>

                    {/* Card content */}
                    <div className="relative z-10 flex flex-col h-full justify-end">
                      <span className="text-label-sm uppercase text-rl-red mb-2 block">
                        {project.industry}
                      </span>
                      <h3 className="font-display text-display-sm text-text-on-dark mb-2 group-hover:text-rl-red transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-body-xs text-text-muted mb-2">
                        {project.geo}
                      </p>
                      <p className="text-body-sm text-white line-clamp-2 mb-4">
                        {project.keyline}
                      </p>
                      <span className="inline-flex items-center gap-1 text-body-xs text-rl-red opacity-0 group-hover:opacity-100 transition-opacity">
                        Ver caso completo
                        <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                      </span>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-body-lg text-text-tertiary">
              No hay proyectos con estos filtros.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
