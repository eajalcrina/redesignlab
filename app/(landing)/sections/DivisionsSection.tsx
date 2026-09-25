import { StatementKicker, StatementNote } from '@/components/ui/Statement'
import DuotoneImage from '@/components/ui/DuotoneImage'
import ArrowIcon from '@/components/ui/ArrowIcon'
import { DIVISIONS, type Division } from '@/lib/constants'
import { cn } from '@/lib/utils'

function Row({ d }: { d: Division }) {
  const soon = d.domain === null
  const inner = (
    <>
      {d.image ? (
        <DuotoneImage src={d.image} alt="" sizes="84px" hoverColor className="h-12 w-16 rounded-[2px] md:h-16 md:w-[84px]" />
      ) : (
        <span className="grid h-12 w-16 place-items-center rounded-[2px] border border-dashed border-text-on-dark/30 text-text-on-dark/40 md:h-16 md:w-[84px]">+</span>
      )}
      <div>
        <h3 className="font-sans text-[22px] font-normal leading-[1.1] tracking-[-0.03em] transition-colors group-hover:text-white md:text-[25px]">{d.theme}</h3>
        <span className={cn('mt-2 flex items-center gap-2 text-[13px]', soon ? 'text-text-on-dark/40' : 'text-rl-red')}>
          <span aria-hidden="true" className="inline-block h-px w-3.5 bg-current" />
          {d.brand}
        </span>
      </div>
      <p className="col-span-2 text-[14px] leading-[1.55] text-text-muted md:col-span-1">{d.description}</p>
      <span className={cn('col-span-2 text-[13px] md:col-span-1 md:text-right', soon ? 'font-mono uppercase tracking-[0.15em] text-text-on-dark/40' : 'text-text-on-dark')}>
        {soon ? 'Próximamente' : d.domain}
        {d.href && <ArrowIcon className="ml-1.5 text-rl-red" />}
      </span>
    </>
  )
  const rowClass = cn(
    'group grid grid-cols-[64px_1fr] items-center gap-x-5 gap-y-3 border-b border-border-dark py-5 transition-colors md:grid-cols-[84px_1.05fr_1.1fr_190px] md:gap-7',
    soon && 'opacity-50',
    d.href && 'hover:bg-white/[0.025]'
  )
  return (
    <li>
      {d.href ? (
        <a href={d.href} target="_blank" rel="noopener noreferrer" className={rowClass}>{inner}</a>
      ) : (
        <div className={rowClass}>{inner}</div>
      )}
    </li>
  )
}

export default function DivisionsSection() {
  return (
    <section className="section-dark">
      <div className="container-rl pb-24 md:pb-[104px]">
        <div className="flex min-h-[88vh] flex-col justify-center py-24 md:py-[120px]">
          <StatementKicker n="03">Cómo escalamos el modelo</StatementKicker>
          <h2 className="max-w-[1180px] font-sans text-[44px] font-normal leading-[0.98] tracking-[-0.05em] md:text-[96px]">
            No podemos construir todas las empresas, <em className="not-italic text-rl-red">pero podemos multiplicar el impacto.</em>
          </h2>
          <StatementNote next="Seis divisiones">
            Nuestro modelo de Venture Building es, a propósito, acotado: no podemos crear cada compañía que nos gustaría. Pero esa experiencia, esa capacidad y esa red sí pueden llegar más lejos. Por eso desplegamos seis divisiones, cada una con su propio equipo y liderazgo, que amplifican nuestro impacto a más empresas de las que alcanzaríamos solos.
          </StatementNote>
        </div>
        <ul className="border-t border-border-dark">
          {DIVISIONS.map((d) => (
            <Row key={d.brand} d={d} />
          ))}
        </ul>
      </div>
    </section>
  )
}
