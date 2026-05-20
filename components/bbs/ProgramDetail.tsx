import Link from 'next/link'
import type { BBSProgram } from '@/data/bbs'
import ProgramHero from './ProgramHero'
import Problem from './sections/Problem'
import ProgramTabs from './ProgramTabs'
import Curriculum from './sections/Curriculum'
import FrameworkSpotlight from './sections/FrameworkSpotlight'
import Perks from './sections/Perks'
import Faculty from './sections/Faculty'
import ProgramFAQ from './sections/ProgramFAQ'
import PriceBlock from './sections/PriceBlock'
import EnrollForm from './EnrollForm'

export default function ProgramDetail({ program }: { program: BBSProgram }) {
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
        tag={program.type === 'curso' ? 'Curso Ejecutivo BBS' : 'Diplomado Ejecutivo BBS'}
        title={program.title}
        lines={program.hero.lines}
        paragraph={program.hero.paragraph}
        image={program.heroImage}
        accent={program.heroAccent}
        ctaLabel="Quiero inscribirme"
        ctaHref="#inscripcion"
      />
      {program.problem && <Problem heading={program.problem.heading} body={program.problem.body} />}
      <ProgramTabs
        forWhom={program.forWhom}
        notFor={program.notFor}
        outcomes={program.outcomes}
        includes={program.includes}
      />
      {program.curriculum && <Curriculum months={program.curriculum} />}
      {program.framework && <FrameworkSpotlight blocks={program.framework} />}
      <Perks all={program.perks.all} topHeading={program.perks.topHeading} top={program.perks.top} />
      <Faculty items={program.faculty} />
      <PriceBlock program={program} ctaHref="#inscripcion" />
      <ProgramFAQ items={program.faq} />
      <EnrollForm program={program} />
    </>
  )
}
