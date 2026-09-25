import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'
import DuotoneImage from '@/components/ui/DuotoneImage'
import { team } from '@/data/team'

export default function FoundersSection() {
  return (
    <section className="section-dark">
      <div className="container-rl py-24 md:py-[104px]">
        <SectionLabel n="06" tone="dark" className="mb-4">Los fundadores</SectionLabel>
        <h2 className="max-w-[860px] font-sans text-[30px] font-normal leading-[1.06] tracking-[-0.03em] md:text-[40px]">
          Eddie y Lorenzo fundaron Redesign Lab sobre una red activa de expertos, operadores y fondos, que hoy co-construye algunos de los proyectos más ambiciosos de bioeconomía en la región.
        </h2>
        <div className="mt-16 grid grid-cols-1 gap-14 md:grid-cols-2">
          {team.map((m) => (
            <article key={m.name} className="group">
              <div className="mb-5 flex items-end gap-5 border-b border-border-dark pb-5">
                {m.photo && <DuotoneImage src={m.photo} alt={m.name} sizes="112px" hoverColor className="h-[140px] w-28 shrink-0 rounded-[3px]" />}
                <div>
                  <h3 className="font-sans text-[28px] font-normal tracking-[-0.03em]">{m.name}</h3>
                  <p className="mb-3 mt-2 font-mono text-[10.5px] uppercase tracking-[0.15em] text-rl-red">{m.role}</p>
                  {m.linkedin && (
                    <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="border-b border-border-dark pb-0.5 text-[12px] text-text-muted hover:text-text-on-dark">LinkedIn ↗</a>
                  )}
                </div>
              </div>
              <div className="space-y-3 text-[14px] leading-[1.72] text-text-muted">
                {m.bio.split('\n\n').map((para, i) => <p key={i}>{para}</p>)}
              </div>
              {m.quote && (
                <blockquote className="mt-5 border-l-2 border-rl-red pl-4 text-[17px] leading-[1.45] tracking-[-0.01em]">“{m.quote}”</blockquote>
              )}
            </article>
          ))}
        </div>
        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-border-dark pt-7 md:flex-row md:items-center">
          <p className="max-w-[620px] text-[15px] leading-[1.6] text-text-muted">
            El equipo se extiende más allá de los fundadores. Expertos senior co-construyen con nosotros los negocios más ambiciosos de bioeconomía en América Latina.
          </p>
          <Link href="/biobuilders" className="text-[16px] font-medium">Súmate a Bio/Builders <span className="text-rl-red">→</span></Link>
        </div>
      </div>
    </section>
  )
}
