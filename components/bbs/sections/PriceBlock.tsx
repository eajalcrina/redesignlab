'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'
import Button from '@/components/ui/Button'
import type { BBSProgram } from '@/data/bbs'

interface PriceBlockProps {
  program: BBSProgram
  ctaHref: string
}

export default function PriceBlock({ program, ctaHref }: PriceBlockProps) {
  const isExternal = ctaHref.startsWith('http')
  const meta = [
    { label: 'Duración', value: program.duration },
    { label: 'Modalidad', value: program.modality },
    { label: 'Inicio', value: program.startDate },
    { label: 'Entregable', value: program.deliverable },
  ]

  return (
    <section className="section-neutral py-14 md:py-20">
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">
            Inversión
          </Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-primary max-w-3xl mb-10">
            Una inversión que se paga sola con el primer resultado.
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <div className="relative overflow-hidden rounded-2xl bg-rl-dark text-text-on-dark max-w-4xl shadow-xl">
            {/* Decorative brand glow */}
            <div
              aria-hidden="true"
              className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-rl-red/20 blur-3xl"
            />

            <div className="relative grid md:grid-cols-2">
              {/* Left — price + CTA */}
              <div className="p-8 md:p-12 md:border-r border-border-dark flex flex-col justify-center">
                <p className="font-mono text-mono-sm text-text-muted uppercase mb-4">
                  {program.type === 'curso' ? 'Curso Ejecutivo BBS' : 'Diplomado Ejecutivo BBS'}
                </p>
                <p className="font-display text-display-2xl leading-none text-text-on-dark">
                  {program.price.usd}
                </p>
                <p className="font-mono text-mono-lg text-rl-red mt-2 mb-8">
                  {program.price.pen}
                </p>
                <Button
                  variant="primary"
                  href={ctaHref}
                  className="w-full justify-center"
                  {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  Inscríbete aquí
                </Button>
                <p className="text-body-xs text-text-muted mt-4">
                  Cupos limitados por cohorte. Pago con tarjeta (Mercadopago) u otros medios.
                </p>
              </div>

              {/* Right — what you get */}
              <div className="p-8 md:p-12 bg-white/[0.03]">
                <p className="text-label-sm uppercase text-text-muted mb-6">El programa incluye</p>
                <dl className="space-y-5">
                  {meta.map((row) => (
                    <div key={row.label} className="flex gap-4">
                      <span
                        aria-hidden="true"
                        className="mt-2 w-1.5 h-1.5 rounded-full bg-rl-red flex-shrink-0"
                      />
                      <div>
                        <dt className="text-label-sm uppercase text-text-muted">{row.label}</dt>
                        <dd className="text-body-md text-text-on-dark">{row.value}</dd>
                      </div>
                    </div>
                  ))}
                </dl>
                <p className="text-body-sm text-text-muted mt-6 pt-6 border-t border-border-dark">
                  Certificación BBS, sustentación ante comité y acceso de por vida a la comunidad.
                </p>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
