import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { projects, findProjectBySlug, getProjectSlug } from '@/data/projects'
import SectionLabel from '@/components/ui/SectionLabel'
import FillPanel from '@/components/ui/FillPanel'
import ArrowIcon from '@/components/ui/ArrowIcon'
import CalendarButton from '@/components/ui/CalendarButton'
import { buttonClasses } from '@/components/ui/buttonStyles'
import SectionReveal from '@/components/animations/SectionReveal'
import { cn } from '@/lib/utils'

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
      // las fichas usan la imagen de su sección (app/proyectos/opengraph-image.png)
      images: [{ url: '/proyectos/opengraph-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.keyline,
      images: ['/proyectos/twitter-image.png'],
      creator: '@redesignlab',
    },
  }
}

const categoryLabels: Record<string, string> = {
  'crear-valor': 'Crear valor',
  'redisenar-trabajo': 'Rediseñar el trabajo',
  'transformar-modelo': 'Transformar el modelo',
}

const H2 = 'font-sans text-[32px] font-normal leading-[1.04] tracking-[-0.035em] md:text-[44px]'
const BODY = 'text-[17px] leading-[1.7] md:text-[18px]'

/** Bloque de dos columnas: etiqueta + título fijos a la izquierda, contenido a la derecha. */
function Block({
  n,
  title,
  dark,
  children,
}: {
  n: string
  title: string
  dark?: boolean
  children: React.ReactNode
}) {
  return (
    <section className={dark ? 'section-dark' : 'section-neutral'}>
      <div className="container-rl py-20 md:py-28">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
          <SectionReveal className="md:col-span-4">
            <div className="md:sticky md:top-28">
              <SectionLabel n={n} tone={dark ? 'dark' : 'light'} className="mb-4">
                {null}
              </SectionLabel>
              <h2 className={cn(H2, dark ? 'text-text-on-dark' : 'text-text-primary')}>{title}</h2>
            </div>
          </SectionReveal>
          <SectionReveal delay={0.15} className="md:col-span-8 md:pt-1">
            {children}
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = findProjectBySlug(params.slug)
  if (!project) notFound()

  // Find next and previous projects for navigation
  const currentIndex = projects.findIndex((p) => getProjectSlug(p) === params.slug)
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://redesignlab.org' },
      { '@type': 'ListItem', position: 2, name: 'Proyectos', item: 'https://redesignlab.org/proyectos' },
      { '@type': 'ListItem', position: 3, name: project.title, item: `https://redesignlab.org/proyectos/${params.slug}` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Back button bar */}
      <div className="section-dark border-b border-border-dark pb-3 pt-20 md:pt-24">
        <div className="container-rl">
          <Link
            href="/proyectos"
            className="group inline-flex min-h-[44px] items-center gap-2 text-[14px] text-text-muted transition-colors hover:text-text-on-dark"
          >
            <span className="inline-block transition-transform group-hover:-translate-x-1">&larr;</span>
            Volver a todos los proyectos
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="section-dark">
        <div className="container-rl pb-20 pt-14 md:pb-28 md:pt-20">
          <SectionReveal>
            <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="font-mono text-[13px] tracking-[0.1em] text-rl-red">{project.number}</span>
              <span aria-hidden="true" className="inline-block h-px w-[18px] bg-text-on-dark/30" />
              <span className="font-mono text-[10.5px] uppercase leading-[1.5] tracking-[0.15em] text-text-on-dark">{categoryLabels[project.category]}</span>
            </div>

            <h1 className="max-w-[1000px] font-sans text-[36px] font-normal leading-[1.02] tracking-[-0.04em] text-text-on-dark sm:text-[44px] md:text-[60px]">
              {project.title}
            </h1>

            <p className="mt-6 max-w-[760px] text-[18px] font-medium leading-[1.5] text-rl-red md:text-[20px]">
              {project.keyline}
            </p>

            <dl className="mt-12 grid max-w-[1000px] grid-cols-1 border-t border-border-dark md:grid-cols-2">
              <div className="border-b border-border-dark py-4 md:pr-8">
                <dt className="mb-1.5 font-mono text-[10.5px] uppercase tracking-[0.15em] text-text-on-dark/40">Industria</dt>
                <dd className="text-[15px] leading-[1.55] text-text-on-dark">{project.industry}</dd>
              </div>
              <div className="border-b border-border-dark py-4 md:border-l md:pl-8">
                <dt className="mb-1.5 font-mono text-[10.5px] uppercase tracking-[0.15em] text-text-on-dark/40">Geografía</dt>
                <dd className="text-[15px] leading-[1.55] text-text-on-dark">{project.geo}</dd>
              </div>
            </dl>

            <ul className="mt-7 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-border-dark px-3 py-1.5 font-mono text-[10px] uppercase leading-[1.5] tracking-[0.12em] text-text-muted"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </SectionReveal>
        </div>
      </section>

      {/* La oportunidad */}
      <Block n="01" title="La oportunidad">
        <p className={cn(BODY, 'whitespace-pre-line text-text-secondary')}>{project.challenge}</p>
      </Block>

      {/* La solución */}
      <Block n="02" title="La solución" dark>
        <p className={cn(BODY, 'whitespace-pre-line text-text-muted')}>{project.approach}</p>
      </Block>

      {/* El impacto */}
      <Block n="03" title="El impacto">
        <ol className="border-t border-rl-dark">
          {project.results.map((r, i) => (
            <li
              key={i}
              className="grid grid-cols-[36px_minmax(0,1fr)] gap-4 border-b border-border-light py-5 md:grid-cols-[48px_minmax(0,1fr)]"
            >
              <span className="pt-[5px] font-mono text-[10.5px] tracking-[0.15em] text-rl-red">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className={cn(BODY, 'text-text-primary')}>{r}</span>
            </li>
          ))}
        </ol>
      </Block>

      {/* Next/Prev navigation */}
      <section className="section-dark">
        <div className="container-rl py-20 md:py-24">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {prevProject ? (
              <FillPanel
                href={`/proyectos/${getProjectSlug(prevProject)}`}
                tone="ink"
                kicker="← Proyecto anterior"
                title={prevProject.title}
                cta="Ver caso completo"
                titleClassName="text-[26px] leading-[1.05] md:text-[32px]"
                className="h-full"
              >
                {prevProject.keyline}
              </FillPanel>
            ) : (
              <div className="hidden md:block" />
            )}
            {nextProject ? (
              <FillPanel
                href={`/proyectos/${getProjectSlug(nextProject)}`}
                tone="ink"
                kicker="Proyecto siguiente →"
                title={nextProject.title}
                cta="Ver caso completo"
                titleClassName="text-[26px] leading-[1.05] md:text-[32px]"
                className="h-full"
              >
                {nextProject.keyline}
              </FillPanel>
            ) : (
              <div className="hidden md:block" />
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-neutral" data-no-announce>
        <div className="container-rl py-24 md:py-32">
          <SectionReveal>
            <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12 lg:gap-6">
              <div className="lg:col-span-8">
                <h2 className="font-sans text-[34px] font-normal leading-[1.02] tracking-[-0.035em] text-text-primary md:text-[46px]">
                  ¿Tu organización tiene un desafío similar?
                </h2>
                <p className="mt-5 max-w-[560px] text-[17px] leading-[1.65] text-text-secondary">
                  Conversemos sobre cómo Redesign Lab puede construir la solución para tu industria.
                </p>
              </div>
              <div className="flex flex-col items-start gap-3 sm:flex-row lg:col-span-4 lg:flex-col lg:items-end">
                <CalendarButton location="proyecto_ficha" context={project.title}>Escribir al equipo</CalendarButton>
                <Link href="/proyectos" className={buttonClasses('outlineInk')}>
                  Ver todos los proyectos
                  <ArrowIcon />
                </Link>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  )
}
