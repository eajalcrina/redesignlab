import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ventures, findVentureBySlug, getVentureSlug } from '@/data/ventures'
import Tag from '@/components/ui/Tag'
import Divider from '@/components/ui/Divider'
import Button from '@/components/ui/Button'
import SectionReveal from '@/components/animations/SectionReveal'
import { SITE_CONFIG } from '@/lib/constants'

// Slugs that have a hero cover image in /public/assets/ventures/.
// Ventures not listed here fall back to the plain dark hero.
const VENTURES_WITH_HERO = new Set([
  'cotton-nation',
  'neofibers',
  'endemics',
  'rare-by',
  'greenprod',
  'ecovive',
  'startups4climate',
  'bio-business-school',
  'thousandfold',
])

// Per-venture overlay tint class. Default is /80; bump up where the underlying
// photo is bright/busy and the hero text loses contrast.
const HERO_OVERLAY_CLASS: Record<string, string> = {
  startups4climate: 'bg-rl-dark/90',
}
const DEFAULT_HERO_OVERLAY = 'bg-rl-dark/80'

interface VenturePageProps {
  params: { slug: string }
}

// Generate static params for all ventures
export function generateStaticParams() {
  return ventures.map((v) => ({ slug: getVentureSlug(v) }))
}

// Dynamic metadata per venture
export function generateMetadata({ params }: VenturePageProps): Metadata {
  const venture = findVentureBySlug(params.slug)
  if (!venture) return { title: 'Venture no encontrada' }

  return {
    title: venture.name,
    description: venture.tagline || venture.description.slice(0, 160),
    keywords: venture.tags,
  }
}

export default function VenturePage({ params }: VenturePageProps) {
  const venture = findVentureBySlug(params.slug)
  if (!venture) notFound()

  const currentIndex = ventures.findIndex((v) => getVentureSlug(v) === params.slug)
  const prevVenture = currentIndex > 0 ? ventures[currentIndex - 1] : null
  const nextVenture = currentIndex < ventures.length - 1 ? ventures[currentIndex + 1] : null

  return (
    <>
      {/* Back button bar */}
      <div className="section-dark border-b border-border-dark pt-24 pb-6">
        <div className="container-rl">
          <Link
            href="/ventures#portafolio"
            scroll
            className="inline-flex items-center gap-2 text-body-sm text-text-muted hover:text-text-on-dark transition-colors group"
          >
            <span className="inline-block transition-transform group-hover:-translate-x-1">&larr;</span>
            Volver al portafolio
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="section-dark pt-12 md:pt-16 pb-16 md:pb-24 relative overflow-hidden">
        {VENTURES_WITH_HERO.has(params.slug) && (
          <>
            <Image
              src={venture.heroImage || `/assets/ventures/${params.slug}.jpg`}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover pointer-events-none select-none"
              aria-hidden="true"
            />
            <div className={`absolute inset-0 pointer-events-none ${HERO_OVERLAY_CLASS[params.slug] || DEFAULT_HERO_OVERLAY}`} />
          </>
        )}
        <div className="container-rl relative z-10">
          <SectionReveal>
            <Tag color="red" className="mb-6">{venture.category}</Tag>

            <h1 className="font-display text-display-lg md:text-display-xl text-text-on-dark max-w-4xl mb-6">
              {venture.name}
            </h1>

            {venture.tagline && (
              <p className="text-body-xl text-rl-red max-w-3xl mb-8 font-medium">
                {venture.tagline}
              </p>
            )}

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-body-sm text-text-muted mb-8">
              <span>
                <span className="text-text-on-dark">Ubicación: </span>
                {venture.location}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {venture.tags.map((tag) => (
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

      {/* La venture (description) */}
      <section className="section-neutral py-16 md:py-24">
        <div className="container-rl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <SectionReveal className="md:col-span-4">
              <div className="md:sticky md:top-24">
                <span className="text-label-sm uppercase text-rl-red block mb-3">01</span>
                <h2 className="font-display text-display-md text-text-primary">
                  La venture
                </h2>
                <Divider variant="red" className="w-10 mt-4" />
              </div>
            </SectionReveal>
            <SectionReveal delay={0.15} className="md:col-span-8">
              <p className="text-body-lg text-text-secondary whitespace-pre-line">
                {venture.description}
              </p>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Hito */}
      {venture.hito && (
        <section className="section-dark py-16 md:py-24">
          <div className="container-rl">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
              <SectionReveal className="md:col-span-4">
                <div className="md:sticky md:top-24">
                  <span className="text-label-sm uppercase text-rl-red block mb-3">02</span>
                  <h2 className="font-display text-display-md text-text-on-dark">
                    Hito clave
                  </h2>
                  <Divider variant="red" className="w-10 mt-4" />
                </div>
              </SectionReveal>
              <SectionReveal delay={0.15} className="md:col-span-8">
                <p className="font-display text-display-sm md:text-display-md text-text-on-dark leading-tight">
                  {venture.hito}
                </p>
              </SectionReveal>
            </div>
          </div>
        </section>
      )}

      {/* Proyección */}
      {venture.projection && (
        <section className="section-neutral py-16 md:py-24">
          <div className="container-rl">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
              <SectionReveal className="md:col-span-4">
                <div className="md:sticky md:top-24">
                  <span className="text-label-sm uppercase text-rl-red block mb-3">
                    {venture.hito ? '03' : '02'}
                  </span>
                  <h2 className="font-display text-display-md text-text-primary">
                    Proyección
                  </h2>
                  <Divider variant="red" className="w-10 mt-4" />
                </div>
              </SectionReveal>
              <SectionReveal delay={0.15} className="md:col-span-8">
                <p className="text-body-lg text-text-secondary">
                  {venture.projection}
                </p>
              </SectionReveal>
            </div>
          </div>
        </section>
      )}

      {/* Next/Prev navigation */}
      <section className="section-dark border-t border-border-dark py-16">
        <div className="container-rl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {prevVenture ? (
              <Link
                href={`/ventures/${getVentureSlug(prevVenture)}`}
                className="group border border-border-dark rounded p-6 hover:border-rl-red/30 transition-colors"
              >
                <span className="text-label-sm uppercase text-text-muted block mb-2">
                  &larr; Venture anterior
                </span>
                <span className="font-display text-display-sm text-text-on-dark group-hover:text-rl-red transition-colors">
                  {prevVenture.name}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {nextVenture ? (
              <Link
                href={`/ventures/${getVentureSlug(nextVenture)}`}
                className="group border border-border-dark rounded p-6 hover:border-rl-red/30 transition-colors md:text-right"
              >
                <span className="text-label-sm uppercase text-text-muted block mb-2">
                  Venture siguiente &rarr;
                </span>
                <span className="font-display text-display-sm text-text-on-dark group-hover:text-rl-red transition-colors">
                  {nextVenture.name}
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
              ¿Quieres invertir o aliarte con {venture.name}?
            </h2>
            <p className="text-body-lg text-text-muted max-w-xl mx-auto mb-12">
              Conversemos sobre cómo conectar tu capital o tu organización con esta venture.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="primary"
                size="lg"
                href={`mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent(
                  `Consulta — ${venture.name}`
                )}`}
              >
                Escribir al equipo &rarr;
              </Button>
              <Button
                variant="secondary"
                size="lg"
                href="/ventures#portafolio"
                className="text-text-on-dark border-text-on-dark/20"
              >
                Ver todo el portafolio
              </Button>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  )
}
