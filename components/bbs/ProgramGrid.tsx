'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'
import ProgramCard from './ProgramCard'
import { bbsCourses, bbsDiplomas } from '@/data/bbs'
import type { BBSProgram } from '@/data/bbs'

function Group({ tag, title, programs }: { tag: string; title: string; programs: BBSProgram[] }) {
  return (
    <div className="mb-20 last:mb-0">
      <SectionReveal>
        <Tag color="red" className="mb-4">{tag}</Tag>
        <h2 className="font-display text-display-md md:text-display-lg text-text-primary mb-10">{title}</h2>
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
    <section className="section-neutral py-24 md:py-32">
      <div className="container-rl">
        <Group tag="Cursos Ejecutivos" title="Cursos Ejecutivos" programs={bbsCourses} />
        <Group tag="Diplomados Ejecutivos" title="Diplomados Ejecutivos" programs={bbsDiplomas} />
      </div>
    </section>
  )
}
