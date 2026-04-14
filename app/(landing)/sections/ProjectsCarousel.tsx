'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import SectionReveal from '@/components/animations/SectionReveal'
import ProjectCard from '@/components/ui/ProjectCard'
import Tag from '@/components/ui/Tag'
import Button from '@/components/ui/Button'
import { projects } from '@/data/projects'

export default function ProjectsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    const amount = dir === 'left' ? -400 : 400
    scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' })
  }

  // Auto-scroll every 4 seconds, pause on hover
  useEffect(() => {
    if (isHovered) return

    const interval = setInterval(() => {
      if (!scrollRef.current) return
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        scrollRef.current.scrollBy({ left: 420, behavior: 'smooth' })
      }
    }, 5500)

    return () => clearInterval(interval)
  }, [isHovered])

  return (
    <section className="section-neutral py-24 md:py-32">
      <div className="container-rl">
        <div className="flex items-end justify-between mb-12">
          <SectionReveal>
            <Tag color="red" className="mb-4">Proyectos</Tag>
            <h2 className="font-display text-display-md md:text-display-lg text-text-primary max-w-2xl">
              Lo que hemos construido con clientes.
            </h2>
            <p className="text-body-xl text-text-secondary max-w-2xl mt-4">
              Proyectos estratégicos en campo, en los mercados y en las mesas de inversión que más importan en América Latina.
            </p>
          </SectionReveal>

          {/* Carousel nav */}
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-16 h-16 border-2 border-rl-red/40 bg-rl-red/5 rounded-full flex items-center justify-center text-rl-red hover:border-rl-red hover:bg-rl-red hover:text-white transition-all duration-200 text-2xl font-bold"
              aria-label="Anterior"
            >
              &larr;
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-16 h-16 border-2 border-rl-red/40 bg-rl-red/5 rounded-full flex items-center justify-center text-rl-red hover:border-rl-red hover:bg-rl-red hover:text-white transition-all duration-200 text-2xl font-bold"
              aria-label="Siguiente"
            >
              &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal scroll */}
      <div
        ref={scrollRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex gap-6 overflow-x-auto px-6 md:px-8 lg:px-12 xl:px-16 pb-4 snap-x snap-mandatory scrollbar-none"
        style={{ scrollbarWidth: 'none' }}
      >
        {projects.map((project) => (
          <motion.div
            key={project.number}
            className="min-w-[320px] md:min-w-[400px] snap-start flex-shrink-0"
          >
            <ProjectCard {...project} />
          </motion.div>
        ))}
      </div>

      <div className="container-rl mt-8">
        <Button variant="text" href="/proyectos" className="text-text-primary">
          Ver todos los proyectos &rarr;
        </Button>
      </div>
    </section>
  )
}
