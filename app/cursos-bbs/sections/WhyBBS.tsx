'use client'

import Link from 'next/link'
import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'
import NewsletterForm from '@/components/ui/NewsletterForm'
import CohortInterestForm from '@/components/bbs/CohortInterestForm'
import { bbsPrograms } from '@/data/bbs'

// ── Helpers ────────────────────────────────────────────────────────────────

function getProgramBySlug(slug: string) {
  return bbsPrograms.find((p) => p.slug === slug)
}

// ── Sub-block 1: Por qué BBS y Redesign Lab ────────────────────────────────

function WhyBBSBlock() {
  return (
    <section className="section-neutral py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">Por qué BBS</Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-primary max-w-3xl mb-10">
            Por qué BBS y Redesign Lab
          </h2>
        </SectionReveal>

        <div className="max-w-3xl space-y-8">
          <SectionReveal delay={0.08}>
            <p className="text-body-lg text-text-secondary">
              <strong className="text-text-primary font-medium">Eddie Ajalcriña y Lorenzo Ortiz</strong> son los co-fundadores de Redesign Lab. No son académicos que estudian los fenómenos desde afuera — son practitioners que han construido negocios, diseñado marcas, acompañado fundadores y desarrollado los frameworks propietarios que enseñan en los programas.
            </p>
            <p className="text-body-lg text-text-secondary mt-4">
              Esa es la diferencia que define cada programa: los docentes han estado en el lado del problema antes de diseñar la solución metodológica.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.14}>
            <p className="text-body-lg text-text-secondary">
              <strong className="text-text-primary font-medium">Redesign Lab</strong> es la firma de estrategia y diseño de negocios que está detrás de todos los programas. El rigor metodológico, la curaduría de referentes internacionales y la orientación a resultados que caracterizan a BBS son el mismo ADN con el que Redesign Lab trabaja con sus clientes.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <p className="text-body-lg text-text-secondary">
              <strong className="text-text-primary font-medium">Thousandfold</strong> es la iniciativa de branding regenerativo responsable del framework RIZOMA, metodología central para desarrollar marcas y negocios regenerativos conectados a mercados globales.
            </p>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}

// ── Sub-block 2: ¿No sabes por dónde empezar? ─────────────────────────────

const profileRows: { profile: string; slug: string }[] = [
  {
    profile: 'Profesional corporativo que quiere liderar la transformación con IA',
    slug: 'ia-nuevos-profesionales',
  },
  {
    profile: 'Dueño o gerente de Pyme que quiere adoptar IA con estrategia real',
    slug: 'ia-pymes-emprendimientos',
  },
  {
    profile: 'Fundador o dueño de marca con activos regenerativos o de origen territorial',
    slug: 'marcas-regenerativas',
  },
  {
    profile: 'Fundador de bionegocio, consultor de ONG o analista de fondos en bioeconomía',
    slug: 'negocios-regenerativos',
  },
  {
    profile: 'Ingeniero, técnico o consultor que lidera la transición circular en industrias',
    slug: 'economia-circular-industria',
  },
]

function WhereToStartBlock() {
  return (
    <section className="py-24 md:py-32 border-t border-border-light">
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">Orientación</Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-primary max-w-3xl mb-6">
            ¿No sabes por dónde empezar?
          </h2>
          <p className="text-body-lg text-text-secondary max-w-3xl mb-12">
            Cada programa está diseñado para un perfil específico. Si no tienes claro cuál es el tuyo, aquí va la guía rápida:
          </p>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          {/* Mobile: stacked cards */}
          <div className="md:hidden space-y-4">
            {profileRows.map(({ profile, slug }) => {
              const program = getProgramBySlug(slug)
              if (!program) return null
              return (
                <div key={slug} className="border border-border-light rounded-lg p-5">
                  <p className="text-body-md text-text-secondary mb-3">{profile}</p>
                  <Link
                    href={`/cursos-bbs/${slug}`}
                    className="font-mono text-mono-sm text-rl-red hover:underline"
                  >
                    → {program.code}: {program.title}
                  </Link>
                </div>
              )
            })}
          </div>

          {/* Desktop: table */}
          <div className="hidden md:block border border-border-light rounded-lg overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border-light bg-stone-50">
                  <th className="px-6 py-4 font-mono text-mono-sm text-text-secondary uppercase tracking-wider w-1/2">
                    Si eres…
                  </th>
                  <th className="px-6 py-4 font-mono text-mono-sm text-text-secondary uppercase tracking-wider w-1/2">
                    El programa para ti
                  </th>
                </tr>
              </thead>
              <tbody>
                {profileRows.map(({ profile, slug }, i) => {
                  const program = getProgramBySlug(slug)
                  if (!program) return null
                  return (
                    <tr
                      key={slug}
                      className={`border-b border-border-light last:border-0 ${
                        i % 2 === 0 ? 'bg-white' : 'bg-stone-50/50'
                      }`}
                    >
                      <td className="px-6 py-5 text-body-md text-text-secondary">
                        {profile}
                      </td>
                      <td className="px-6 py-5">
                        <Link
                          href={`/cursos-bbs/${slug}`}
                          className="font-mono text-mono-sm text-rl-red hover:underline"
                        >
                          → {program.code}: {program.title}
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.18}>
          <p className="mt-8 text-body-md text-text-secondary">
            ¿Tienes dudas? Escríbenos:{' '}
            <a
              href="mailto:bbs@redesignlab.org"
              className="text-rl-red hover:underline font-medium"
            >
              bbs@redesignlab.org
            </a>
          </p>
        </SectionReveal>
      </div>
    </section>
  )
}

// ── Sub-block 3: Próximas cohortes (dark) ─────────────────────────────────

function ProximasCohortes() {
  return (
    <section className="section-dark py-24 md:py-32">
      <div className="container-rl max-w-2xl">
        <SectionReveal>
          <Tag color="neutral" className="mb-4">Inscripciones</Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-on-dark mb-6">
            Próximas cohortes
          </h2>
          <p className="text-body-lg text-text-muted mb-4">
            Los programas se lanzan en cohortes con cupos limitados por una razón pedagógica: la sustentación ante comité, el feedback personalizado y la calidad de la comunidad requieren grupos donde todos puedan ser vistos y acompañados con el estándar que cada programa propone.
          </p>
          <p className="text-body-lg text-text-muted mb-10">
            Regístrate y te avisamos cuando abra la próxima cohorte:
          </p>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <CohortInterestForm className="mb-10" />
        </SectionReveal>

        <SectionReveal delay={0.18}>
          <div className="border-t border-border-dark pt-8">
            <p className="text-body-xs text-text-muted/60 mb-3">
              ¿Solo quieres novedades? Déjanos tu correo:
            </p>
            <NewsletterForm variant="compact" />
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}

// ── Default export: all three blocks ──────────────────────────────────────

export default function WhyBBS() {
  return (
    <>
      <WhyBBSBlock />
      <WhereToStartBlock />
      <ProximasCohortes />
    </>
  )
}
