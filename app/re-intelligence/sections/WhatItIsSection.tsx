'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'

const versions = [
  {
    mark: '◎',
    name: 'Re. Intelligence Light',
    price: 'USD 900 / mes',
    headline: 'Acceso directo al criterio estratégico senior — en el momento que más importa.',
    description:
      'Acompañamiento estratégico continuo a través de las cuatro verticales, aplicado a las decisiones y desafíos que el equipo directivo trae a cada sesión. No hay integración de flujos de datos — el criterio se aplica sobre la información que la empresa comparte en el espacio de trabajo conjunto.',
    forWhom:
      'Fundadores o equipos directivos que necesitan un interlocutor externo de criterio para contrastar decisiones, validar pivots y mantener el foco en el escalamiento — sin requerir la integración sistemática de los datos del negocio.',
    accent: false,
  },
  {
    mark: '◉',
    name: 'Re. Intelligence Pro',
    price: 'USD 3,000 / mes',
    extra: 'máximo 15 empresas activas',
    headline: 'La inteligencia del negocio, procesada y convertida en planes que tu equipo puede ejecutar.',
    description:
      'Integra el equipo de inteligencia estratégica de Redesign Lab a los procesos y flujos de información de la empresa. El trabajo sobre las cuatro verticales parte del análisis sistemático de la información real que el negocio genera, procesada en los Redesign Lab y traducida en planes accionables que se presentan al comité de gerencia.',
    forWhom:
      'Empresas que necesitan que alguien articule la información del negocio, la procese con inteligencia y entregue análisis, brechas, oportunidades y planes accionables — mes a mes, en todos los frentes críticos.',
    accent: true,
  },
]

interface ComparisonRow {
  key: string
  row: ReactNode
  light: string
  pro: string
}

const comparison: ComparisonRow[] = [
  { key: 'precio', row: 'Precio', light: 'USD 900 / mes', pro: 'USD 3,000 / mes' },
  { key: 'verticales-cubiertas', row: 'Verticales cubiertas', light: 'Las 4 verticales', pro: 'Las 4 verticales' },
  { key: 'horas', row: 'Horas de acompañamiento', light: '4 h / mes', pro: '4 h / mes' },
  { key: 'sesiones', row: 'Sesiones con comité de gerencia', light: 'Sí', pro: 'Sí' },
  {
    key: 'integracion',
    row: 'Nivel de integración',
    light: 'Criterio aplicado a lo que la empresa trae',
    pro: 'Articulación e integración de flujos de datos del negocio',
  },
  { key: 'procesamiento', row: 'Procesamiento en los Redesign Lab', light: 'No', pro: 'Sí' },
  { key: 'analisis', row: 'Análisis sistemático de brechas y oportunidades', light: 'No', pro: 'Sí — por vertical, cada mes' },
  { key: 'planes', row: 'Planes accionables estructurados', light: 'No', pro: 'Sí — entregados mensualmente' },
  { key: 'brief', row: 'Re. Intelligence Brief mensual', light: 'No', pro: 'Sí' },
  { key: 'alertas', row: 'Alertas de oportunidades de financiamiento', light: 'Sí — mensual', pro: 'Sí — mensual, integradas al análisis' },
  { key: 'limite', row: 'Límite de empresas activas', light: 'Abierto', pro: 'Máximo 15' },
  { key: 'fundraising', row: 'Inversión / Fundraising', light: 'Add-on', pro: 'Add-on' },
  {
    key: 'builders',
    row: (
      <Link
        href="/builders"
        className="underline decoration-rl-red/40 hover:decoration-rl-red transition-colors"
      >
        Acceso a red de Builders
      </Link>
    ),
    light: 'Prioritario',
    pro: 'Prioritario',
  },
]

export default function WhatItIsSection() {
  return (
    <section className="section-dark py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">Dos versiones · un mismo marco</Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-on-dark max-w-3xl mb-6">
            Distinto nivel de integración. Mismas cuatro verticales.
          </h2>
          <p className="text-body-lg text-text-muted max-w-3xl mb-16">
            Re. Intelligence existe en dos modalidades. Ambas trabajan sobre las mismas cuatro verticales estratégicas — la diferencia no es de scope temático, sino de profundidad de integración con los procesos y la información de la empresa.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-20">
          {versions.map((v, i) => (
            <SectionReveal key={v.name} delay={i * 0.1}>
              <div
                className={`p-8 md:p-10 rounded h-full flex flex-col ${
                  v.accent
                    ? 'border-2 border-rl-red bg-rl-red/5'
                    : 'border border-border-dark'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-rl-red font-mono text-mono-lg">{v.mark}</span>
                  <p className="font-mono text-mono-sm text-text-muted uppercase tracking-[0.18em]">
                    {v.name}
                  </p>
                </div>

                <p className="font-display text-display-md text-text-on-dark mt-4">{v.price}</p>
                {v.extra && (
                  <p className="font-mono text-mono-sm text-rl-red mt-1">{v.extra}</p>
                )}

                <p className="text-body-md text-text-on-dark mt-6 mb-6 font-medium">
                  {v.headline}
                </p>

                <p className="text-body-md text-text-muted mb-8">{v.description}</p>

                <div className="mt-auto pt-6 border-t border-border-dark">
                  <p className="text-label-sm uppercase text-rl-red mb-2">Para quién es</p>
                  <p className="text-body-sm text-text-muted">{v.forWhom}</p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={0.2}>
          <p className="font-mono text-mono-sm uppercase tracking-[0.18em] text-rl-red mb-4">
            Tabla comparativa
          </p>

          {/* Desktop / tablet: 3-column table */}
          <div className="hidden md:block border border-border-dark rounded overflow-hidden">
            <div className="grid grid-cols-[1.4fr_1fr_1fr] bg-rl-red/10 border-b border-border-dark">
              <div className="px-5 py-4 text-label-sm uppercase text-text-muted">Variable</div>
              <div className="px-5 py-4 text-label-sm uppercase text-text-on-dark border-l border-border-dark">Light</div>
              <div className="px-5 py-4 text-label-sm uppercase text-rl-red border-l border-border-dark">Pro</div>
            </div>
            {comparison.map((row, i) => (
              <div
                key={row.key}
                className={`grid grid-cols-[1.4fr_1fr_1fr] ${
                  i !== comparison.length - 1 ? 'border-b border-border-dark/60' : ''
                }`}
              >
                <div className="px-5 py-4 text-body-sm text-text-on-dark">{row.row}</div>
                <div className="px-5 py-4 text-body-sm text-text-muted border-l border-border-dark/60">
                  {row.light}
                </div>
                <div className="px-5 py-4 text-body-sm text-text-on-dark border-l border-border-dark/60">
                  {row.pro}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: stacked cards per row */}
          <div className="md:hidden space-y-3">
            {comparison.map((row) => (
              <div
                key={row.key}
                className="border border-border-dark rounded p-5"
              >
                <p className="text-label-sm uppercase text-text-muted mb-4">{row.row}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-on-dark/70 mb-1.5">
                      Light
                    </p>
                    <p className="text-body-sm text-text-muted leading-snug">{row.light}</p>
                  </div>
                  <div className="border-l border-border-dark/60 pl-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-rl-red mb-1.5">
                      Pro
                    </p>
                    <p className="text-body-sm text-text-on-dark leading-snug">{row.pro}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
