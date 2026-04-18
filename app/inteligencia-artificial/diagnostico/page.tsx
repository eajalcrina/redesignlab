import type { Metadata } from 'next'
import Link from 'next/link'
import MaturityChecker from '@/components/sections/MaturityChecker'

export const metadata: Metadata = {
  title: 'Diagnóstico de Madurez IA',
  description:
    'Evalúa la madurez de tu organización frente a la IA. 12 preguntas, 4 minutos, resultado por industria y plan de 90 días en bioeconomía.',
  keywords: [
    'diagnóstico madurez IA',
    'RE·IA Maturity Checker',
    'autoevaluación IA bioeconomía',
    'nivel de madurez inteligencia artificial',
    'diagnóstico organizacional IA LATAM',
  ],
  alternates: { canonical: '/inteligencia-artificial/diagnostico' },
  openGraph: {
    title: 'Diagnóstico de Madurez IA — Redesign Lab',
    description:
      'Evalúa el nivel de madurez de tu organización frente a la IA. 12 preguntas, 4 minutos, resultado personalizado por industria y plan de 90 días.',
    type: 'article',
    url: '/inteligencia-artificial/diagnostico',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Diagnóstico de Madurez IA — Redesign Lab',
    description:
      'Evalúa el nivel de madurez de tu organización frente a la inteligencia artificial aplicada a la bioeconomía.',
  },
}

export default function DiagnosticoPage() {
  return (
    <>
      {/* Hero visible — H1 y primer párrafo contextual */}
      <section className="section-dark pt-32 md:pt-40 pb-12 md:pb-16">
        <div className="container-rl">
          <span className="text-label-sm uppercase text-rl-red block mb-4">
            Re·IA Maturity Checker
          </span>
          <h1 className="font-display text-display-lg md:text-display-xl text-text-on-dark max-w-4xl mb-6">
            Diagnóstico de Madurez IA para industrias de bioeconomía
          </h1>
          <p className="text-body-lg text-text-muted max-w-3xl mb-10">
            Evalúa el nivel de preparación de tu organización frente a la inteligencia
            artificial aplicada a la bioeconomía. 12 preguntas en 5 dimensiones críticas
            — estrategia, datos, talento, procesos y tecnología — en aproximadamente 4 minutos.
          </p>
          <a
            href="#checker"
            className="inline-flex items-center gap-2 text-body-sm uppercase tracking-wide text-rl-red hover:gap-3 transition-all"
          >
            Comenzar diagnóstico
            <span aria-hidden="true">&darr;</span>
          </a>
        </div>
      </section>

      {/* SEO depth — párrafos adicionales indexables pero no visibles */}
      <div className="sr-only">
        <p>
          El resultado es un diagnóstico personalizado por industria (agroindustria, pesca,
          acuicultura, forestal, cosmética, turismo regenerativo) con un plan accionable de 90 días:
          qué habilitar primero, qué pilotos correr y cómo medir retorno. Diseñado para líderes
          de bioeconomía en América Latina que necesitan pasar del entusiasmo genérico por la IA
          a decisiones verificables sobre dónde invertir.
        </p>
        <p>
          Completar el diagnóstico es gratuito y no requiere registro previo. Al finalizar,
          el equipo de Redesign Lab puede acompañarte en la interpretación de resultados y
          el diseño del roadmap de adopción adaptado a tu cadena de valor.
        </p>
      </div>

      {/* Breadcrumb back link — sits above the checker */}
      <div className="fixed top-16 md:top-20 left-0 right-0 z-40 pointer-events-none">
        <div className="container-rl pt-4 pointer-events-auto">
          <Link
            href="/inteligencia-artificial"
            className="inline-flex items-center gap-2 text-body-sm text-text-muted hover:text-white transition-colors group"
          >
            <span className="inline-block transition-transform group-hover:-translate-x-1">&larr;</span>
            Volver a Inteligencia Artificial
          </Link>
        </div>
      </div>
      <div id="checker">
        <MaturityChecker inline />
      </div>
    </>
  )
}
