import Link from 'next/link'
import type { BBSProgram } from '@/data/bbs'
import { BBS_FORM_URL } from '@/lib/constants'
import ProgramHero from './ProgramHero'
import Problem from './sections/Problem'
import ForWhom from './sections/ForWhom'
import Outcomes from './sections/Outcomes'
import Includes from './sections/Includes'
import Curriculum from './sections/Curriculum'
import FrameworkSpotlight from './sections/FrameworkSpotlight'
import Perks from './sections/Perks'
import Faculty from './sections/Faculty'
import ProgramFAQ from './sections/ProgramFAQ'
import PriceBlock from './sections/PriceBlock'

export default function ProgramDetail({ program }: { program: BBSProgram }) {
  const enrollHref = program.enrollUrl || BBS_FORM_URL
  return (
    <>
      <nav aria-label="Breadcrumb" className="section-dark">
        <div className="container-rl pt-24 pb-2 text-body-xs text-text-muted">
          <Link href="/" className="hover:text-rl-red">Inicio</Link>{' · '}
          <Link href="/cursos-bbs" className="hover:text-rl-red">Cursos BBS</Link>{' · '}
          <span className="text-text-on-dark">{program.title}</span>
        </div>
      </nav>
      <ProgramHero
        tag={program.code}
        lines={program.hero.lines}
        paragraph={program.hero.paragraph}
        ctaLabel="Quiero inscribirme"
        ctaHref={enrollHref}
      />
      {program.problem && <Problem heading={program.problem.heading} body={program.problem.body} />}
      {program.forWhom && <ForWhom items={program.forWhom} notFor={program.notFor} />}
      {program.outcomes && <Outcomes items={program.outcomes} />}
      {program.includes && <Includes items={program.includes} />}
      {program.curriculum && <Curriculum months={program.curriculum} />}
      {program.framework && <FrameworkSpotlight blocks={program.framework} />}
      <Perks all={program.perks.all} topHeading={program.perks.topHeading} top={program.perks.top} />
      <Faculty items={program.faculty} />
      <PriceBlock
        price={program.price}
        note={`Incluye ${program.deliverable}. Cupos limitados por cohorte.`}
        ctaHref={enrollHref}
      />
      <ProgramFAQ items={program.faq} />
    </>
  )
}
