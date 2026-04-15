import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { projects, findProjectBySlug, getProjectSlug } from '@/data/projects'
import Tag from '@/components/ui/Tag'
import Divider from '@/components/ui/Divider'
import Button from '@/components/ui/Button'
import SectionReveal from '@/components/animations/SectionReveal'
import { SITE_CONFIG } from '@/lib/constants'

interface ProjectPageProps {
  params: { slug: string }
}

// Generate static params for all 13 projects
export function generateStaticParams() {
  return projects.map((p) => ({ slug: getProjectSlug(p) }))
}

// Dynamic metadata per project
export function generateMetadata({ params }: ProjectPageProps): Metadata {
  const project = findProjectBySlug(params.slug)
  if (!project) return { title: 'Proyecto no encontrado' }

  return {
    title: project.title,
    description: project.keyline,
    keywords: project.tags,
    alternates: { canonical: `/proyectos/${params.slug}` },
    openGraph: {
      title: project.title,
      description: project.keyline,
      type: 'article',
      url: `/proyectos/${params.slug}`,
    },
  }
}

const categoryLabels: Record<string, string> = {
  'crear-valor': 'Crear valor',
  'redisenar-trabajo': 'Rediseñar el trabajo',
  'transformar-modelo': 'Transformar el modelo',
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = findProjectBySlug(params.slug)
  if (!project) notFound()

  // Find next and previous projects for navigation
  const currentIndex = projects.findIndex((p) => getProjectSlug(p) === params.slug)
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null

  return (
    <>
      {/* Back button bar */}
      <div className="section-dark border-b border-border-dark pt-24 pb-6">
        <div className="container-rl">
          <Link
            href="/proyectos"
            className="inline-flex items-center gap-2 text-body-sm text-text-muted hover:text-text-on-dark transition-colors group"
          >
            <span className="inline-block transition-transform group-hover:-translate-x-1">&larr;</span>
            Volver a todos los proyectos
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="section-dark pt-12 md:pt-16 pb-16 md:pb-24">
        <div className="container-rl">
          <SectionReveal>
            <div className="flex items-center gap-4 mb-8">
              <span className="font-mono text-mono-lg text-rl-red">{project.number}</span>
              <Tag color="neutral">{categoryLabels[project.category]}</Tag>
            </div>

            <h1 className="font-display text-display-lg md:text-display-xl text-text-on-dark max-w-4xl mb-6">
              {project.title}
            </h1>

            <p className="text-body-xl text-rl-red max-w-3xl mb-8 font-medium">
              {project.keyline}
            </p>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-body-sm text-text-muted mb-8">
              <span>
                <span className="text-text-on-dark">Industria: </span>
                {project.industry}
              </span>
              <span>
                <span className="text-text-on-dark">Geografía: </span>
                {project.geo}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block border border-border-dark text-text-muted text-label-sm uppercase px-3 py-1.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* La oportunidad */}
      <section className="section-neutral py-16 md:py-24">
        <div className="container-rl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <SectionReveal className="md:col-span-4">
              <div className="md:sticky md:top-24">
                <span className="text-label-sm uppercase text-rl-red block mb-3">01</span>
                <h2 className="font-display text-display-md text-text-primary">
                  La oportunidad
                </h2>
                <Divider variant="red" className="w-10 mt-4" />
              </div>
            </SectionReveal>
            <SectionReveal delay={0.15} className="md:col-span-8">
              <p className="text-body-lg text-text-secondary whitespace-pre-line">
                {project.challenge}
              </p>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* La solución */}
      <section className="section-dark py-16 md:py-24">
        <div className="container-rl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <SectionReveal className="md:col-span-4">
              <div className="md:sticky md:top-24">
                <span className="text-label-sm uppercase text-rl-red block mb-3">02</span>
                <h2 className="font-display text-display-md text-text-on-dark">
                  La solución
                </h2>
                <Divider variant="red" className="w-10 mt-4" />
              </div>
            </SectionReveal>
            <SectionReveal delay={0.15} className="md:col-span-8">
              <p className="text-body-lg text-text-muted whitespace-pre-line">
                {project.approach}
              </p>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* El impacto */}
      <section className="section-neutral py-16 md:py-24">
        <div className="container-rl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <SectionReveal className="md:col-span-4">
              <div className="md:sticky md:top-24">
                <span className="text-label-sm uppercase text-rl-red block mb-3">03</span>
                <h2 className="font-display text-display-md text-text-primary">
                  El impacto
                </h2>
                <Divider variant="red" className="w-10 mt-4" />
              </div>
            </SectionReveal>
            <SectionReveal delay={0.15} className="md:col-span-8">
              <ul className="space-y-4">
                {project.results.map((r, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-body-lg text-text-secondary"
                  >
                    <span className="font-mono text-mono-sm text-rl-red mt-2 flex-shrink-0 w-8">
                      0{i + 1}
                    </span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Next/Prev navigation */}
      <section className="section-dark border-t border-border-dark py-16">
        <div className="container-rl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {prevProject ? (
              <Link
                href={`/proyectos/${getProjectSlug(prevProject)}`}
                className="group border border-border-dark rounded p-6 hover:border-rl-red/30 transition-colors"
              >
                <span className="text-label-sm uppercase text-text-muted block mb-2">
                  &larr; Proyecto anterior
                </span>
                <span className="font-display text-display-sm text-text-on-dark group-hover:text-rl-red transition-colors">
                  {prevProject.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {nextProject ? (
              <Link
                href={`/proyectos/${getProjectSlug(nextProject)}`}
                className="group border border-border-dark rounded p-6 hover:border-rl-red/30 transition-colors md:text-right"
              >
                <span className="text-label-sm uppercase text-text-muted block mb-2">
                  Proyecto siguiente &rarr;
                </span>
                <span className="font-display text-display-sm text-text-on-dark group-hover:text-rl-red transition-colors">
                  {nextProject.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#080808] py-24 md:py-32">
        <div className="container-rl text-center">
          <SectionReveal>
            <h2 className="font-display text-display-md md:text-display-lg text-text-on-dark max-w-3xl mx-auto mb-6">
              ¿Tu organización tiene un desafío similar?
            </h2>
            <p className="text-body-lg text-text-muted max-w-xl mx-auto mb-12">
              Conversemos sobre cómo Redesign Lab puede construir la solución para tu industria.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="primary"
                size="lg"
                href={`mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent(
                  `Consulta — ${project.title}`
                )}`}
              >
                Escribir al equipo &rarr;
              </Button>
              <Button
                variant="secondary"
                size="lg"
                href="/proyectos"
                className="text-text-on-dark border-text-on-dark/20"
              >
                Ver todos los proyectos
              </Button>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  )
}
