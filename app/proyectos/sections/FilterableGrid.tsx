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
      {/* Sticky filter bar — native dropdowns for clarity */}
      <div className="sticky top-16 md:top-20 z-30 bg-rl-neutral/95 backdrop-blur-sm border-b border-border-light">
        <div className="container-rl py-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
            <FilterSelect
              label="Categoría"
              value={activeCategory}
              onChange={setActiveCategory}
              options={projectCategories.map((c) => ({ value: c.value, label: c.label }))}
            />
            <FilterSelect
              label="Industria"
              value={activeIndustry}
              onChange={setActiveIndustry}
              options={projectIndustries.map((i) => ({ value: i, label: i }))}
            />
            <span className="text-body-xs text-text-tertiary sm:ml-auto">
              {filtered.length} proyecto{filtered.length === 1 ? '' : 's'}
            </span>
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
                  className="h-full"
                >
                  <Link
                    href={`/proyectos/${getProjectSlug(project)}`}
                    className={cn(
                      bgColor,
                      'group relative overflow-hidden rounded-lg block h-full min-h-[280px] p-6 flex flex-col justify-end',
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

interface FilterSelectProps {
  label: string
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
}

function FilterSelect({ label, value, onChange, options }: FilterSelectProps) {
  return (
    <label className="flex-1 sm:max-w-xs relative block">
      <span className="sr-only">{label}</span>
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-label-sm text-text-tertiary pointer-events-none">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none w-full h-11 pl-[92px] pr-10 bg-white border border-border-light rounded text-body-sm text-text-primary cursor-pointer hover:border-rl-red/40 focus:outline-none focus:border-rl-red transition-colors"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </label>
  )
}
