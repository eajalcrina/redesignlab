import { Fragment } from 'react'
import { ALLIES_FLAT, ALLIES_LABEL } from '@/lib/constants'

export default function AlliesLine() {
  return (
    <section className="section-dark border-t border-border-dark">
      <div className="container-rl grid grid-cols-1 gap-4 py-7 md:grid-cols-[180px_1fr] md:gap-8 md:py-9">
        <p className="pt-1 font-mono text-[10.5px] uppercase tracking-[0.15em] text-text-muted">{ALLIES_LABEL}</p>
        <p className="text-[13px] leading-[2.05] text-text-on-dark/40">
          {ALLIES_FLAT.map((a, i) => (
            <Fragment key={a}>
              {i > 0 && <>{'\u00A0'}<span aria-hidden="true" className="mx-1.5 text-text-on-dark/15">/</span> </>}
              {a}
            </Fragment>
          ))}
        </p>
      </div>
    </section>
  )
}
