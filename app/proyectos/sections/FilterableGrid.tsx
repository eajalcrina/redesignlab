'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import ArrowIcon from '@/components/ui/ArrowIcon'
import { projects, projectCategories, projectIndustries, getProjectSlug } from '@/data/projects'

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
      <div className="container-rl pt-20 md:pt-28">
        <SectionLabel n="01" className="mb-6">
          <span aria-live="polite">
            {filtered.length} proyecto{filtered.length === 1 ? '' : 's'}
          </span>
        </SectionLabel>
      </div>

      {/* Sticky filter bar — native dropdowns for clarity */}
      <div className="sticky top-16 z-30 border-y border-border-light bg-rl-neutral/95 backdrop-blur-sm md:top-20">
        <div className="container-rl py-3.5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
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
          </div>
        </div>
      </div>

      {/* Project index — rows with thin lines, same language as the Home divisions */}
      <div className="container-rl pb-24 pt-10 md:pb-32 md:pt-14">
        <ul className="border-t border-rl-dark">
          <AnimatePresence mode="popLayout" initial={false}>
            {filtered.map((project) => (
              <motion.li
                key={project.number}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  href={`/proyectos/${getProjectSlug(project)}`}
                  className="group grid grid-cols-[32px_minmax(0,1fr)] items-start gap-x-4 gap-y-3 md:items-center border-b border-border-light py-6 transition-colors hover:bg-white/60 md:grid-cols-[48px_minmax(0,1.15fr)_minmax(0,1fr)_200px] md:gap-x-8 md:py-7"
                >
                  <span className="pt-[3px] font-mono md:pt-0 text-[10.5px] tracking-[0.15em] text-text-tertiary">
                    {project.number}
                  </span>

                  <div className="min-w-0">
                    <span className="block font-mono text-[10px] uppercase leading-[1.5] tracking-[0.14em] text-rl-red md:text-[10.5px]">
                      {project.industry}
                    </span>
                    <h3 className="mt-2 font-sans text-[22px] font-normal leading-[1.1] tracking-[-0.03em] text-text-primary transition-colors group-hover:text-rl-red md:text-[25px]">
                      {project.title}
                    </h3>
                  </div>

                  <p className="col-start-2 text-[15px] leading-[1.6] text-text-secondary md:col-start-auto">
                    {project.keyline}
                  </p>

                  <div className="col-start-2 text-[13px] leading-[1.5] md:col-start-auto md:text-right">
                    <span className="block text-text-tertiary">{project.geo}</span>
                    <span className="mt-2.5 inline-flex items-center gap-1.5 font-medium text-text-primary">
                      Ver caso completo
                      <ArrowIcon className="text-rl-red" />
                    </span>
                  </div>
                </Link>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        {filtered.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-[17px] leading-[1.6] text-text-tertiary">
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
    <label className="relative block min-w-0 flex-1 sm:max-w-xs">
      <span className="sr-only">{label}</span>
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-mono text-[10px] uppercase tracking-[0.15em] text-text-tertiary">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 w-full min-w-0 cursor-pointer appearance-none truncate rounded-[3px] border border-border-light bg-white pl-[104px] pr-10 text-[14px] text-text-primary transition-colors hover:border-rl-dark/40 focus:border-rl-red focus:outline-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </label>
  )
}
