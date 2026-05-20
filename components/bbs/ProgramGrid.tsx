'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'
import ProgramCard from './ProgramCard'
import { bbsCourses, bbsDiplomas } from '@/data/bbs'
import type { BBSProgram } from '@/data/bbs'

function Group({
  tag,
  title,
  subtitle,
  programs,
}: {
  tag: string
  title: string
  subtitle: string
  programs: BBSProgram[]
}) {
  return (
    <div className="mb-20 last:mb-0">
      <SectionReveal>
        <div className="flex items-end justify-between gap-6 mb-10 border-b border-border-light pb-6">
          <div>
            <Tag color="red" className="mb-3">{tag}</Tag>
            <h2 className="font-display text-display-md md:text-display-lg text-text-primary">{title}</h2>
            <p className="text-body-md text-text-secondary mt-2 max-w-xl">{subtitle}</p>
          </div>
          <span className="hidden sm:block font-mono text-mono-sm text-text-tertiary whitespace-nowrap">
            {String(programs.length).padStart(2, '0')} programas
          </span>
        </div>
      </SectionReveal>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programs.map((p, i) => (
          <SectionReveal key={p.slug} delay={i * 0.05}>
            <ProgramCard program={p} />
          </SectionReveal>
        ))}
      </div>
    </div>
  )
}

export default function ProgramGrid() {
  return (
    <section className="section-neutral py-20 md:py-28">
      <div className="container-rl">
        <Group
          tag="Cursos Ejecutivos"
          title="Cursos Ejecutivos"
          subtitle="Programas intensivos de 4 semanas, en vivo, con un entregable aplicable desde la semana siguiente."
          programs={bbsCourses}
        />
        <Group
          tag="Diplomados Ejecutivos"
          title="Diplomados Ejecutivos"
          subtitle="Programas de 3 meses con Demo Day ante panel externo y certificación BBS."
          programs={bbsDiplomas}
        />
      </div>
    </section>
  )
}
