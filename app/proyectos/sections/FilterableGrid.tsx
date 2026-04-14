'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects, projectCategories, projectIndustries, type Project } from '@/data/projects'
import { cn } from '@/lib/utils'

const cardBgColors = ['bg-rl-dark', 'bg-[#1a1a1a]', 'bg-[#222]']

export default function FilterableGrid() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeIndustry, setActiveIndustry] = useState('Todas')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [selectedProject])

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
            <div className="flex flex-wrap gap-2">
              {projectCategories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={cn(
                    'px-4 py-2 text-body-sm transition-all duration-200 rounded',
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
            <div className="flex flex-wrap gap-2">
              {projectIndustries.map((ind) => (
                <button
                  key={ind}
                  onClick={() => setActiveIndustry(ind)}
                  className={cn(
                    'px-3 py-1.5 text-body-xs transition-all duration-200',
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
                  onClick={() => setSelectedProject(project)}
                  className={cn(
                    bgColor,
                    'relative overflow-hidden rounded-lg cursor-pointer min-h-[220px] p-6 flex flex-col justify-end',
                    'border border-border-dark hover:border-rl-red/30 transition-colors'
                  )}
                >
                  {/* Large background number */}
                  <span className="absolute top-2 right-4 font-display text-display-xl leading-none select-none pointer-events-none text-white opacity-[0.07]">
                    {project.number}
                  </span>

                  {/* Card content */}
                  <div className="relative z-10">
                    <span className="text-label-sm uppercase text-rl-red mb-2 block">
                      {project.industry}
                    </span>
                    <h3 className="font-display text-display-sm text-text-on-dark mb-2">
                      {project.title}
                    </h3>
                    <p className="text-body-xs text-text-muted mb-2">
                      {project.geo}
                    </p>
                    <p className="text-body-sm text-white line-clamp-2">
                      {project.keyline}
                    </p>
                  </div>
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

      {/* Full-screen project modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            key="project-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm overflow-y-auto"
            onClick={() => setSelectedProject(null)}
          >
            <div className="min-h-screen flex items-start justify-center px-4 py-12 md:py-20">
              <motion.div
                key="project-modal-panel"
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 24, scale: 0.97 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative w-full max-w-3xl bg-[#141414] rounded-lg border border-border-dark p-8 md:p-12"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-text-muted hover:text-white transition-colors"
                  aria-label="Cerrar"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>

                {/* Project number */}
                <span className="font-display text-display-lg leading-none text-white/10 mb-4 block">
                  {selectedProject.number}
                </span>

                {/* Industry label */}
                <span className="text-label-sm uppercase tracking-[0.18em] text-rl-red mb-3 block">
                  {selectedProject.industry}
                </span>

                {/* Title */}
                <h2 className="font-display text-display-md text-text-on-dark mb-3">
                  {selectedProject.title}
                </h2>

                {/* Geography */}
                <p className="text-body-sm text-text-muted mb-4">
                  {selectedProject.geo}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-body-xs text-text-muted bg-white/5 rounded-full border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Keyline */}
                <p className="text-body-lg text-rl-red font-medium mb-6">
                  {selectedProject.keyline}
                </p>

                {/* Divider */}
                <div className="h-px bg-white/10 mb-8" />

                {/* La oportunidad */}
                {selectedProject.challenge && (
                  <div className="mb-8">
                    <h4 className="text-label-sm uppercase tracking-[0.18em] text-text-muted mb-3">
                      La oportunidad
                    </h4>
                    <p className="text-body-md text-text-muted leading-relaxed">
                      {selectedProject.challenge}
                    </p>
                  </div>
                )}

                {/* La solucion */}
                {selectedProject.approach && (
                  <div className="mb-8">
                    <h4 className="text-label-sm uppercase tracking-[0.18em] text-text-muted mb-3">
                      La solucion
                    </h4>
                    <p className="text-body-md text-text-muted leading-relaxed">
                      {selectedProject.approach}
                    </p>
                  </div>
                )}

                {/* El impacto */}
                {selectedProject.results && selectedProject.results.length > 0 && (
                  <div>
                    <h4 className="text-label-sm uppercase tracking-[0.18em] text-text-muted mb-3">
                      El impacto
                    </h4>
                    <ul className="space-y-2.5">
                      {selectedProject.results.map((r) => (
                        <li key={r} className="flex items-start gap-3 text-body-md text-text-muted">
                          <span className="w-1.5 h-1.5 rounded-full bg-rl-red mt-2 flex-shrink-0" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
